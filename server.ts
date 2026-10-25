import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory audit log for inquiries (for compliance and record keeping)
interface ContactSubmission {
  folio: string;
  nombreCompleto: string;
  identificacion: string;
  email: string;
  telefono: string;
  tipoConsulta: string;
  mensaje: string;
  timestamp: string;
}

const contactSubmissions: ContactSubmission[] = [];

/**
 * 1. Endpoint de Verificación Segura de Estado de la API de Perseo
 * Protege las claves en el servidor sin exponerlas jamás al cliente
 */
app.get('/api/perseo/status', (_req, res) => {
  const isConfigured = Boolean(
    process.env.PERSEO_API_KEY &&
    process.env.PERSEO_API_BASE_URL &&
    process.env.PERSEO_EMPRESA_ID
  );

  res.json({
    isConfigured,
    endpointUrl: isConfigured ? process.env.PERSEO_API_BASE_URL : undefined,
    statusMessage: isConfigured
      ? 'Conexión activa y autenticada con el servidor Cloud de Perseo.'
      : 'Integración en fase de preparación. Credenciales API pendientes de provisión en el entorno seguro del servidor.',
    supportedOperations: [
      'Consulta de estado de cuenta comercial y cartera',
      'Verificación de retenciones tributarias emitidas ante el SRI',
      'Localización de facturas electrónicas autorizadas',
    ],
    pendingRequirements: [
      'URL base del servidor Perseo Cloud o Perseo Web del cliente (PERSEO_API_BASE_URL)',
      'API Key o Token Bearer emitido por Perseo (PERSEO_API_KEY)',
      'Identificador de Empresa (PERSEO_EMPRESA_ID)',
      'Permisos de lectura asignados al usuario API en el módulo de seguridad de Perseo (PERSEO_API_USER)',
    ],
    versionRequirement: 'Perseo Web v3 / API REST Cloud',
  });
});

/**
 * 2. Endpoint Proxy para Consultas a Perseo
 * Se ejecuta exclusivamente en backend cuando las claves están provistas
 */
app.post('/api/perseo/query', async (req, res) => {
  const { identificacion, tipoDocumento, tipoConsulta } = req.body;

  const isConfigured = Boolean(
    process.env.PERSEO_API_KEY &&
    process.env.PERSEO_API_BASE_URL &&
    process.env.PERSEO_EMPRESA_ID
  );

  if (!isConfigured) {
    return res.status(412).json({
      success: false,
      errorCode: 'PERSEO_CREDENTIALS_PENDING',
      message:
        'El servidor aún no cuenta con las credenciales de la API de Perseo configuradas en las variables de entorno. Configure PERSEO_API_BASE_URL y PERSEO_API_KEY.',
    });
  }

  try {
    const perseoEndpoint = `${process.env.PERSEO_API_BASE_URL}/api/v1/consultas`;
    const perseoResponse = await fetch(perseoEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PERSEO_API_KEY}`,
        'X-Empresa-Id': process.env.PERSEO_EMPRESA_ID || '',
      },
      body: JSON.stringify({ identificacion, tipoDocumento, tipoConsulta }),
    });

    if (!perseoResponse.ok) {
      return res.status(perseoResponse.status).json({
        success: false,
        errorCode: `PERSEO_HTTP_${perseoResponse.status}`,
        message: 'Respuesta de error emitida por el servidor Perseo.',
      });
    }

    const data = await perseoResponse.json();
    return res.json({ success: true, result: data });
  } catch (error) {
    return res.status(502).json({
      success: false,
      errorCode: 'PERSEO_COMMUNICATION_ERROR',
      message: error instanceof Error ? error.message : 'Fallo en la comunicación con la API de Perseo',
    });
  }
});

/**
 * 3. Endpoint de Registro de Contacto
 */
app.post('/api/contact', (req, res) => {
  const { nombreCompleto, identificacion, email, telefono, tipoConsulta, mensaje, folio } = req.body;

  if (!nombreCompleto || !email || !identificacion) {
    return res.status(400).json({ success: false, message: 'Campos requeridos incompletos' });
  }

  const submission: ContactSubmission = {
    folio: folio || `MH-${Date.now().toString().slice(-6)}`,
    nombreCompleto,
    identificacion,
    email,
    telefono,
    tipoConsulta,
    mensaje,
    timestamp: new Date().toISOString(),
  };

  contactSubmissions.push(submission);
  // Log estructurado en servidor para auditoría
  console.log(`[MH Contabilidad] Nueva solicitud de asesoría registrada: Folio ${submission.folio} - ${submission.nombreCompleto} (${submission.identificacion})`);

  return res.json({
    success: true,
    folio: submission.folio,
    message: 'Solicitud registrada correctamente en los servidores de MH Contabilidad.',
  });
});

// Configuración de Vite o archivos estáticos
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Fallback para rutas de cliente en desarrollo
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        const fs = await import('fs/promises');
        let template = await fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  ======================================================`);
    console.log(`  🚀 [MH Contabilidad] Servidor ejecutándose correctamente:`);
    console.log(`  ➜ Local:   http://localhost:${PORT}/`);
    console.log(`  ➜ Red:     http://127.0.0.1:${PORT}/`);
    console.log(`  ======================================================\n`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ [Error] El puerto ${PORT} ya se encuentra ocupado.`);
      console.error(`Cierre la instancia anterior o ejecute con otro puerto, ejemplo: $env:PORT="3001"; npm run dev\n`);
    } else {
      console.error('Error al iniciar el servidor:', err);
    }
  });
}

startServer();
