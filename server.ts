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
  const baseUrl = process.env.PERSEO_API_BASE_URL || 'https://tu-contabilidad.com';
  const apiKey = process.env.PERSEO_API_KEY || '';
  const isConfigured = Boolean(baseUrl && apiKey);

  res.json({
    isConfigured,
    endpointUrl: isConfigured ? baseUrl : undefined,
    statusMessage: isConfigured
      ? 'Conexión activa y autenticada con el servidor Cloud de Perseo.'
      : 'Credenciales API pendientes de provisión en el entorno seguro del servidor.',
    supportedOperations: [
      'Consulta de facturas electrónicas y RIDE / XML',
      'Consulta de retenciones tributarias (ventas y compras)',
      'Consulta de estado de cuenta comercial y cartera',
      'Consulta de guías de remisión electrónicas',
      'Consulta de liquidaciones de compra',
      'Consulta de cobros y abonos realizados',
      'Consulta de proformas y cotizaciones',
      'Consulta de pedidos',
    ],
    versionRequirement: 'Perseo Web v3 / API REST Cloud',
  });
});

/**
 * 2. Endpoint Proxy para Consultas a Perseo
 * Se ejecuta exclusivamente en backend protegiendo la API Key en el servidor
 */
app.post('/api/perseo/query', async (req, res) => {
  const { identificacion, tipoConsulta, periodo, fechaDesde, fechaHasta } = req.body;

  const baseUrl = (process.env.PERSEO_API_BASE_URL || 'https://tu-contabilidad.com').replace(/\/+$/, '');
  const apiKey = process.env.PERSEO_API_KEY || '';

  if (!baseUrl || !apiKey) {
    return res.status(412).json({
      success: false,
      errorCode: 'PERSEO_CREDENTIALS_PENDING',
      message: 'El servidor aún no cuenta con las credenciales de la API de Perseo configuradas.',
    });
  }

  // Rango de fechas según periodo
  let fDesde = fechaDesde || '20200101';
  let fHasta = fechaHasta || '20291231';
  const currentYear = new Date().getFullYear().toString();

  if (periodo === '2026') {
    fDesde = '20260101';
    fHasta = '20261231';
  } else if (periodo === '2025') {
    fDesde = '20250101';
    fHasta = '20251231';
  } else if (periodo === 'ultimo_mes') {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    fDesde = `${d.getFullYear()}${m}${day}`;
    fHasta = '20291231';
  } else if (!fechaDesde && !periodo) {
    // Por defecto año actual o histórico amplio
    fDesde = `${currentYear}0101`;
    fHasta = `${currentYear}1231`;
  }

  const cleanId = (identificacion || '').trim().replace(/[-\s]/g, '');

  try {
    // Buscar cliente asociado si se envió identificación
    let matchedCliente: any = null;
    let allClientes: any[] = [];
    try {
      const cr = await fetch(`${baseUrl}/api/clientes_consulta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: apiKey, clienteid: '', clientescodigo: '', identificacion: '', contenido: '' }),
      });
      const cj = await cr.json();
      allClientes = cj.clientes || [];
      if (cleanId && allClientes.length > 0) {
        matchedCliente = allClientes.find(c => c.identificacion === cleanId || c.identificacion?.includes(cleanId)) || null;
      }
    } catch (err) {
      console.warn('[Perseo Proxy] No se pudo precargar clientes:', err);
    }

    let resultData: any = null;
    let totalItems = 0;

    switch (tipoConsulta) {
      case 'facturacion': {
        const resp = await fetch(`${baseUrl}/api/facturas_consulta`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api_key: apiKey, fechadesde: fDesde, fechahasta: fHasta }),
        });
        const json = await resp.json();
        let facturas: any[] = json.facturas || [];
        if (cleanId) {
          facturas = facturas.filter(f =>
            f.identificacion === cleanId ||
            f.identificacion?.includes(cleanId) ||
            (matchedCliente && f.clientesid === matchedCliente.clientesid) ||
            f.razonsocial?.toLowerCase().includes(cleanId.toLowerCase())
          );
        }
        totalItems = facturas.length;
        resultData = {
          facturas,
          total: totalItems,
        };
        break;
      }

      case 'retenciones': {
        // 1. Retenciones en ventas (de facturas de venta)
        const respFac = await fetch(`${baseUrl}/api/facturas_consulta`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api_key: apiKey, fechadesde: fDesde, fechahasta: fHasta }),
        });
        const jsonFac = await respFac.json();
        let facList: any[] = jsonFac.facturas || [];
        if (cleanId) {
          facList = facList.filter(f =>
            f.identificacion === cleanId ||
            (matchedCliente && f.clientesid === matchedCliente.clientesid) ||
            f.razonsocial?.toLowerCase().includes(cleanId.toLowerCase())
          );
        }

        const retencionesVentas = facList
          .filter(f => (f.totalretenidoiva > 0 || f.totalretenidorenta > 0 || f.autorizacionretencion || f.secuenciaretencion))
          .map(f => ({
            tipo: 'VENTA',
            secuencia: f.secuenciaretencion ? `${f.establecimientoretencion || '001'}-${f.puntoemisionretencion || '001'}-${f.secuenciaretencion}` : 'S/N',
            fechaEmision: f.emisionretencion || f.emision,
            autorizacion: f.autorizacionretencion || '',
            totalRenta: Number(f.totalretenidorenta || 0),
            totalIva: Number(f.totalretenidoiva || 0),
            total: Number(f.totalretenidorenta || 0) + Number(f.totalretenidoiva || 0),
            facturaAfectada: `${f.establecimiento}-${f.puntoemision}-${f.secuencial}`,
            clienteOProveedor: f.razonsocial,
            identificacion: f.identificacion,
          }));

        // 2. Retenciones en compras (emitidas a proveedores)
        let retencionesCompras: any[] = [];
        try {
          const respComp = await fetch(`${baseUrl}/api/consulta_compras`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ api_key: apiKey, fechainicio: fDesde, fechafin: fHasta, mostrarcxp: true }),
          });
          const jsonComp = await respComp.json();
          let compList: any[] = jsonComp.compras || [];
          if (cleanId) {
            compList = compList.filter(c =>
              c.identificacion === cleanId ||
              c.identificacion?.includes(cleanId) ||
              c.razonsocial?.toLowerCase().includes(cleanId.toLowerCase())
            );
          }
          retencionesCompras = compList
            .filter(c => (c.retenciontotal > 0 || c.retencionautorizacion || c.retencionsecuencia))
            .map(c => ({
              tipo: 'COMPRA',
              secuencia: c.retencionsecuencia ? `${c.retencionestablecimiento || '001'}-${c.retencionpuntoemision || '001'}-${c.retencionsecuencia}` : 'S/N',
              fechaEmision: c.retencionemision || c.emision,
              autorizacion: c.retencionautorizacion || '',
              totalRenta: Number(c.retenciontotalrenta || 0),
              totalIva: Number(c.retenciontotaliva || 0),
              total: Number(c.retenciontotal || 0),
              facturaAfectada: `${c.establecimiento}-${c.puntoemision}-${c.secuencia}`,
              clienteOProveedor: c.razonsocial,
              identificacion: c.identificacion,
            }));
        } catch (err) {
          console.warn('[Perseo Proxy] Error consultando retenciones compras:', err);
        }

        const allRetenciones = [...retencionesVentas, ...retencionesCompras];
        totalItems = allRetenciones.length;
        resultData = {
          retenciones: allRetenciones,
          total: totalItems,
        };
        break;
      }

      case 'estado_cuenta': {
        const resp = await fetch(`${baseUrl}/api/consulta_cliente_estadocuenta`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api_key: apiKey, detallado: 1 }),
        });
        const json = await resp.json();
        let cxc: any[] = json.cxc || [];

        if (cleanId) {
          cxc = cxc.filter(c =>
            (matchedCliente && c.clientesid === matchedCliente.clientesid) ||
            (matchedCliente && c.razonsocial?.toLowerCase() === matchedCliente.razonsocial?.toLowerCase()) ||
            c.razonsocial?.toLowerCase().includes(cleanId.toLowerCase())
          );
        }

        const totalFacturado = cxc.reduce((acc, curr) => acc + Number(curr.valor || 0), 0);
        const totalSaldoPendiente = cxc.reduce((acc, curr) => acc + Number(curr.saldo || 0), 0);
        const totalAbonado = Math.max(0, totalFacturado - totalSaldoPendiente);

        totalItems = cxc.length;
        resultData = {
          cxc,
          total: totalItems,
          resumen: {
            totalFacturado: Number(totalFacturado.toFixed(2)),
            totalSaldoPendiente: Number(totalSaldoPendiente.toFixed(2)),
            totalAbonado: Number(totalAbonado.toFixed(2)),
          },
        };
        break;
      }

      case 'guias_remision': {
        const resp = await fetch(`${baseUrl}/api/guias_remision_consulta`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api_key: apiKey }),
        });
        const json = await resp.json();
        let guias: any[] = json.guias || [];

        if (cleanId) {
          guias = guias.filter(g =>
            g.identificacioncliente === cleanId ||
            g.identificacioncliente?.includes(cleanId) ||
            g.identificaciontransportista === cleanId ||
            (matchedCliente && g.nombrecliente?.toLowerCase().includes(matchedCliente.razonsocial.toLowerCase()))
          );
        }

        totalItems = guias.length;
        resultData = {
          guias,
          total: totalItems,
        };
        break;
      }

      case 'liquidaciones': {
        const respComp = await fetch(`${baseUrl}/api/consulta_compras`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api_key: apiKey, fechainicio: fDesde, fechafin: fHasta, mostrarcxp: true }),
        });
        const jsonComp = await respComp.json();
        let compList: any[] = jsonComp.compras || [];

        // Filtrar liquidaciones (sri_documentoscodigo === '03' o secuenciasid_liquidacion)
        let liquidaciones = compList.filter(c =>
          c.sri_documentoscodigo === '03' ||
          (c.secuenciasid_liquidacion && c.secuenciasid_liquidacion > 0) ||
          c.concepto?.toLowerCase().includes('liquidacion')
        );

        if (cleanId) {
          liquidaciones = liquidaciones.filter(l =>
            l.identificacion === cleanId ||
            l.identificacion?.includes(cleanId) ||
            l.razonsocial?.toLowerCase().includes(cleanId.toLowerCase())
          );
        }

        totalItems = liquidaciones.length;
        resultData = {
          liquidaciones,
          total: totalItems,
        };
        break;
      }

      case 'cobros': {
        const resp = await fetch(`${baseUrl}/api/consulta_cobros`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api_key: apiKey, fechadesde: fDesde, fechahasta: fHasta }),
        });
        const json = await resp.json();
        let cobros: any[] = json.cobros || [];

        if (cleanId && matchedCliente) {
          cobros = cobros.filter(cb =>
            cb.clientesid === matchedCliente.clientesid ||
            cb.concepto?.toLowerCase().includes(matchedCliente.razonsocial.toLowerCase())
          );
        } else if (cleanId) {
          cobros = cobros.filter(cb => cb.concepto?.toLowerCase().includes(cleanId.toLowerCase()));
        }

        totalItems = cobros.length;
        resultData = {
          cobros,
          total: totalItems,
        };
        break;
      }

      case 'proformas': {
        const resp = await fetch(`${baseUrl}/api/proformas_obtener`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api_key: apiKey, fecha_desde: fDesde, fecha_hasta: fHasta }),
        });
        const json = await resp.json();
        const proformas: any[] = json.proformas || [];
        totalItems = proformas.length;
        resultData = {
          proformas,
          total: totalItems,
        };
        break;
      }

      case 'pedidos': {
        const resp = await fetch(`${baseUrl}/api/pedidos_consulta`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api_key: apiKey, fecha_desde: fDesde, fecha_hasta: fHasta }),
        });
        const json = await resp.json();
        const pedidos: any[] = json.pedidos || [];
        totalItems = pedidos.length;
        resultData = {
          pedidos,
          total: totalItems,
        };
        break;
      }

      default:
        return res.status(400).json({
          success: false,
          errorCode: 'INVALID_QUERY_TYPE',
          message: `El tipo de consulta "${tipoConsulta}" no es válido.`,
        });
    }

    return res.json({
      success: true,
      tipoConsulta,
      periodo: periodo || 'historico',
      matchedCliente: matchedCliente
        ? {
            id: matchedCliente.clientesid,
            razonSocial: matchedCliente.razonsocial,
            identificacion: matchedCliente.identificacion,
            email: matchedCliente.email,
            telefono: matchedCliente.telefono1,
            direccion: matchedCliente.direccion,
          }
        : null,
      total: totalItems,
      result: resultData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Perseo Proxy Error]:', error);
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
