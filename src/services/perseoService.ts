import { PerseoConfigStatus, PerseoQueryRequest, PerseoQueryResponse } from '../types';

/**
 * Servicio de Integración Modular para el Sistema Contable Perseo.
 *
 * Cumplimiento del contrato técnico:
 * - No expone secretos ni credenciales en el cliente frontend.
 * - No simula consultas falsas presentándolas como datos reales.
 * - Proporciona diagnóstico explícito de conectividad y preparación de endpoints.
 */

export interface PerseoEndpointSpec {
  name: string;
  method: 'GET' | 'POST';
  purpose: string;
  status: 'PENDIENTE_DOC_OFICIAL' | 'ESPECIFICADO' | 'CONECTADO';
  expectedParams: string[];
}

export const PERSEO_PLANNED_ENDPOINTS: PerseoEndpointSpec[] = [
  {
    name: '/api/v1/clientes/consulta',
    method: 'POST',
    purpose: 'Verificación de estado de cuenta y cartera de clientes registrados en Perseo',
    status: 'PENDIENTE_DOC_OFICIAL',
    expectedParams: ['identificacion', 'tipo_documento', 'empresa_id'],
  },
  {
    name: '/api/v1/comprobantes/retenciones',
    method: 'GET',
    purpose: 'Consulta de retenciones emitidas y autorizadas por el SRI en el sistema Perseo',
    status: 'PENDIENTE_DOC_OFICIAL',
    expectedParams: ['ruc_emisor', 'periodo_fiscal'],
  },
  {
    name: '/api/v1/facturacion/comprobante',
    method: 'GET',
    purpose: 'Localización de comprobante electrónico por clave de acceso o secuencial',
    status: 'PENDIENTE_DOC_OFICIAL',
    expectedParams: ['clave_acceso', 'numero_autorizacion'],
  },
];

/**
 * Consulta el estado de configuración de la API de Perseo a través de la capa de servidor seguro
 */
export async function getPerseoStatus(): Promise<PerseoConfigStatus> {
  try {
    const res = await fetch('/api/perseo/status', {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // Si el backend no está disponible en este momento, retornar estado offline/diagnóstico seguro
  }

  return {
    isConfigured: false,
    statusMessage: 'Integración en fase de preparación de credenciales y autorización de API Perseo.',
    supportedOperations: [
      'Consulta de estado de cuenta comercial',
      'Verificación de retenciones tributarias emitidas',
      'Localización de comprobantes electrónicos autorizados',
    ],
    pendingRequirements: [
      'URL base del servidor Perseo Cloud o Perseo Web del cliente',
      'API Key o Token de autenticación Bearer emitido por Perseo',
      'Identificador de Empresa (Empresa ID / Código de Empresa)',
      'Permisos de lectura asignados al usuario API en el módulo de seguridad de Perseo',
    ],
    versionRequirement: 'Perseo Web v3 / API REST Cloud',
  };
}

/**
 * Ejecuta una solicitud de consulta hacia el backend que conecta con Perseo.
 * Si las credenciales aún no están provistas, retorna un estado informativo claro sin falsear datos.
 */
export async function queryPerseo(request: PerseoQueryRequest): Promise<PerseoQueryResponse> {
  const status = await getPerseoStatus();

  if (!status.isConfigured) {
    return {
      success: false,
      message: 'La conexión directa con Perseo se encuentra en estado PENDIENTE DE CREDENCIALES. Los datos ingresados han sido validados sintácticamente, pero la consulta remota requiere la configuración previa de las claves API en el servidor.',
      errorCode: 'API_CREDENTIALS_PENDING',
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch('/api/perseo/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return {
        success: false,
        message: errData.message || `Error del servidor al consultar Perseo (${res.status})`,
        errorCode: `HTTP_${res.status}`,
        timestamp: new Date().toISOString(),
      };
    }

    const data = await res.json();
    return {
      success: true,
      message: 'Consulta realizada con éxito en el sistema contable Perseo.',
      data: data.result,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error inesperado al conectar con el servidor',
      errorCode: 'NETWORK_OR_TIMEOUT_ERROR',
      timestamp: new Date().toISOString(),
    };
  }
}
