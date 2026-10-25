import { ServiceItem } from '../types';

export const serviceCategories = [
  { id: 'all', label: 'Todos los servicios' },
  { id: 'contable', label: 'Servicios Contables' },
  { id: 'tributario', label: 'Servicios Tributarios' },
  { id: 'financiero', label: 'Asesoría Financiera' },
  { id: 'empresarial', label: 'Empresas y Profesionales' },
] as const;

export const servicesData: ServiceItem[] = [
  // 1. Servicios Contables
  {
    id: 'contabilidad-general',
    category: 'contable',
    categoryLabel: 'Servicios Contables',
    title: 'Contabilidad General y Libros Obligatorios',
    description: 'Registro sistemático de compras, ventas, cobranzas y pagos conforme a las Normas Internacionales de Información Financiera (NIIF).',
    iconName: 'Calculator',
    highlights: [
      'Libros diario, mayor y balances de comprobación',
      'Conciliaciones bancarias y arqueos periódicos',
      'Organización de comprobantes físicos y digitales',
    ],
    whatsappMessage: 'Hola Jorge Hernández / MH Contabilidad, requiero información sobre el servicio de Contabilidad General y Libros Obligatorios.',
  },
  {
    id: 'estados-financieros',
    category: 'contable',
    categoryLabel: 'Servicios Contables',
    title: 'Elaboración y Emisión de Estados Financieros',
    description: 'Preparación de balance general, estado de resultados, flujos de efectivo y notas aclaratorias para socios, bancos y entidades de control.',
    iconName: 'FileText',
    highlights: [
      'Balance General y Estado de Pérdidas y Ganancias',
      'Notas a los Estados Financieros bajo NIIF',
      'Informes para la Superintendencia de Compañías',
    ],
    whatsappMessage: 'Hola Jorge Hernández / MH Contabilidad, deseo consultar sobre la elaboración de Estados Financieros para mi empresa.',
  },

  // 2. Servicios Tributarios
  {
    id: 'declaraciones-sri',
    category: 'tributario',
    categoryLabel: 'Servicios Tributarios',
    title: 'Declaraciones Tributarias ante el SRI',
    description: 'Planificación, cálculo y presentación puntual de obligaciones tributarias para personas naturales y jurídicas sin riesgos de recargos.',
    iconName: 'Receipt',
    highlights: [
      'Declaraciones mensuales y semestrales de IVA',
      'Retenciones en la fuente de Impuesto a la Renta',
      'Liquidación anual de Impuesto a la Renta',
    ],
    whatsappMessage: 'Hola Jorge Hernández / MH Contabilidad, requiero asesoría para mis declaraciones tributarias ante el SRI.',
  },
  {
    id: 'anexos-tributarios',
    category: 'tributario',
    categoryLabel: 'Servicios Tributarios',
    title: 'Anexos Transaccionales y Cumplimiento Fiscal',
    description: 'Estructuración y validación del Anexo Transaccional Simplificado (ATS), Anexo de Accionistas (APS) y requerimientos de control tributario.',
    iconName: 'ShieldCheck',
    highlights: [
      'Validación de XML para el sistema DIMM / SRI en Línea',
      'Análisis preventivo de cruces de información',
      'Atención a notificaciones y requerimientos del SRI',
    ],
    whatsappMessage: 'Hola Jorge Hernández / MH Contabilidad, necesito soporte para la preparación y validación de Anexos Transaccionales (ATS).',
  },

  // 3. Asesoría Financiera
  {
    id: 'flujo-caja',
    category: 'financiero',
    categoryLabel: 'Asesoría Financiera',
    title: 'Control de Flujo de Caja y Presupuestos',
    description: 'Proyección ordenada de ingresos y egresos para salvaguardar la liquidez operativa y anticipar compromisos comerciales y fiscales.',
    iconName: 'TrendingUp',
    highlights: [
      'Presupuesto maestro de operaciones anuales',
      'Monitoreo semanal y mensual de flujo de caja libre',
      'Identificación de desviaciones de gasto y costos',
    ],
    whatsappMessage: 'Hola Jorge Hernández / MH Contabilidad, me interesa recibir asesoría financiera sobre Flujo de Caja y Presupuestos.',
  },
  {
    id: 'analisis-rentabilidad',
    category: 'financiero',
    categoryLabel: 'Asesoría Financiera',
    title: 'Diagnóstico Financiero y Márgenes de Rentabilidad',
    description: 'Evaluación integral de razones financieras (liquidez, solvencia, endeudamiento) y cálculo de punto de equilibrio por línea de negocio.',
    iconName: 'PieChart',
    highlights: [
      'Cálculo de punto de equilibrio y margen de contribución',
      'Análisis de indicadores clave de desempeño (KPIs)',
      'Estrategias para optimización de estructura de costos',
    ],
    whatsappMessage: 'Hola Jorge Hernández / MH Contabilidad, solicito un diagnóstico financiero y de rentabilidad para mi actividad económica.',
  },

  // 4. Asesoría para Empresas y Profesionales
  {
    id: 'constitucion-empresas',
    category: 'empresarial',
    categoryLabel: 'Empresas y Profesionales',
    title: 'Apertura de RUC y Constitución Empresarial',
    description: 'Asesoramiento técnico para la formalización de actividades económicas, apertura y actualización de RUC, RIMPE y régimen general.',
    iconName: 'Building2',
    highlights: [
      'Clasificación en regímenes tributarios (RIMPE Negocio Popular / Emprendedor / General)',
      'Actualización de establecimientos y actividades económicas',
      'Acompañamiento en trámites societarios iniciales',
    ],
    whatsappMessage: 'Hola Jorge Hernández / MH Contabilidad, quiero consultar sobre formalización de RUC y constitución empresarial.',
  },
  {
    id: 'facturacion-electronica',
    category: 'empresarial',
    categoryLabel: 'Empresas y Profesionales',
    title: 'Implementación de Facturación Electrónica',
    description: 'Orientación para la obtención de firma electrónica, configuración del esquema de comprobantes digitales y enlace con sistemas contables.',
    iconName: 'Briefcase',
    highlights: [
      'Gestión y configuración de firma electrónica (archivo .p12)',
      'Cumplimiento de estándares de comprobantes electrónicos SRI',
      'Asesoría para enlace con software contable y ERP (ej. Perseo)',
    ],
    whatsappMessage: 'Hola Jorge Hernández / MH Contabilidad, deseo implementar y regularizar la Facturación Electrónica de mi negocio.',
  },
];
