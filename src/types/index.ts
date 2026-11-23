export type ServiceCategory =
  | 'contable'
  | 'tributario'
  | 'consultoria'
  | 'nomina'
  | 'tecnologia';

export interface ServiceHighlight {
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  categoryLabel: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  detailedHighlights: ServiceHighlight[];
  highlights: string[];
  whatsappMessage: string;
}

export interface PerseoConfigStatus {
  isConfigured: boolean;
  endpointUrl?: string;
  statusMessage: string;
  supportedOperations: string[];
  pendingRequirements?: string[];
  versionRequirement?: string;
}

export type PerseoQueryType =
  | 'facturacion'
  | 'retenciones'
  | 'estado_cuenta'
  | 'guias_remision'
  | 'liquidaciones'
  | 'cobros'
  | 'proformas'
  | 'pedidos'
  | 'proveedor_cxp'
  | 'proveedor_pagos'
  | 'proveedor_retenciones'
  | 'proveedor_facturas';

export interface PerseoQueryRequest {
  identificacion: string;
  tipoDocumento?: 'RUC' | 'CEDULA' | 'PASAPORTE';
  tipoConsulta: PerseoQueryType;
  portalTipo?: 'cliente' | 'proveedor';
  periodo?: string; // '2026' | 'ultimo_mes' | '2025' | 'todos'
  fechaDesde?: string;
  fechaHasta?: string;
  numeroDocumento?: string;
}

export interface MatchedClienteInfo {
  id: number;
  razonSocial: string;
  identificacion: string;
  email?: string;
  telefono?: string;
  direccion?: string;
}

export interface MatchedProveedorInfo {
  id: number;
  razonSocial: string;
  nombreComercial?: string;
  identificacion: string;
  direccion?: string;
  telefono?: string;
}

export interface PerseoFacturaItem {
  nombreproducto: string;
  productocodigo: string;
  cantidad: number;
  precio: number;
  iva: number;
  precioiva: number;
  almacen?: string;
}

export interface PerseoFactura {
  facturasid: number;
  establecimiento: string;
  puntoemision: string;
  secuencial: string;
  emision: string;
  vence: string;
  razonsocial: string;
  identificacion: string;
  subtotal: number;
  subtotalconiva: number;
  subtotalsiniva: number;
  total_iva: number;
  total: number;
  claveacceso: string;
  numeroautorizacion: string;
  concepto: string;
  facturasd?: {
    detalles?: PerseoFacturaItem[];
  };
}

export interface PerseoRetencion {
  tipo: 'VENTA' | 'COMPRA';
  secuencia: string;
  fechaEmision: string;
  autorizacion: string;
  totalRenta: number;
  totalIva: number;
  total: number;
  facturaAfectada: string;
  clienteOProveedor: string;
  identificacion: string;
}

export interface PerseoEstadoCuentaItem {
  clientesid: number;
  razonsocial: string;
  documentosid: number;
  secuencia: string;
  tipo: string;
  valor: number;
  saldo: number;
  emision: string;
  vence: string;
}

export interface PerseoGuiaRemision {
  secuencialguia: string;
  establecimientoguia: string;
  puntoemisionguia: string;
  nombrecliente: string;
  identificacioncliente: string;
  nombretransportista: string;
  identificaciontransportista: string;
  placa: string;
  direccionpartida: string;
  direccionllegada: string;
  fechahorasalida: string;
  fechahorallegada: string;
  motivo: string;
  autorizacion: string;
  establecimientofactura?: string;
  puntoemisionfactura?: string;
  secuencialfactura?: string;
}

export interface PerseoCobro {
  cobrosid: number;
  cobroscodigo: string;
  fechaemision: string;
  importeTotal: number;
  concepto: string;
  tipo?: string;
  formapago?: Array<{
    forma_pago_empresaid: string;
    importe: number;
    numerodocumento?: string;
  }>;
}

export interface PerseoPago {
  pagosid: number;
  cobroscodigo: string;
  fechaemision: string;
  importeTotal: number;
  concepto: string;
  tipo?: string;
  documentos?: Array<{
    documentosid: number;
    secuencia: string;
    importe: number;
  }>;
  formapago?: Array<{
    forma_pago_empresaid: number | string;
    importe: number;
    numerodocumento?: string;
    emision?: string;
    vence?: string;
  }>;
}

export interface PerseoProveedorCxpItem {
  proveedoresid: number;
  razonsocial: string;
  documentosid: number;
  secuencia: string;
  tipo: string;
  valor: number;
  saldo: number;
  emision: string;
  vence: string;
}

export interface PerseoQueryResponse {
  success: boolean;
  message?: string;
  timestamp: string;
  tipoConsulta?: PerseoQueryType;
  portalTipo?: 'cliente' | 'proveedor';
  periodo?: string;
  matchedCliente?: MatchedClienteInfo | null;
  matchedProveedor?: MatchedProveedorInfo | null;
  total?: number;
  result?: {
    facturas?: PerseoFactura[];
    retenciones?: PerseoRetencion[];
    cxc?: PerseoEstadoCuentaItem[];
    cxp?: PerseoProveedorCxpItem[];
    guias?: PerseoGuiaRemision[];
    liquidaciones?: any[];
    cobros?: PerseoCobro[];
    pagos?: PerseoPago[];
    proformas?: any[];
    pedidos?: any[];
    compras?: any[];
    resumen?: {
      totalFacturado: number;
      totalSaldoPendiente: number;
      totalAbonado?: number;
      totalPagado?: number;
    };
  };
  errorCode?: string;
}

export interface ContactFormData {
  nombreCompleto: string;
  email?: string;
  telefono: string;
  identificacion?: string; // RUC o Cédula
  tipoConsulta: string;
  mensaje: string;
}

export interface ContactFormResult {
  success: boolean;
  message: string;
  whatsappUrl?: string;
  folio?: string;
}
