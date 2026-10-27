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
  pendingRequirements: string[];
  versionRequirement?: string;
}

export interface PerseoQueryRequest {
  identificacion: string;
  tipoDocumento: 'RUC' | 'CEDULA' | 'PASAPORTE';
  tipoConsulta: 'estado_cuenta' | 'facturas_pendientes' | 'retenciones' | 'comprobante_electronico';
  numeroDocumento?: string;
}

export interface PerseoQueryResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data?: unknown;
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
