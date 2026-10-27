import { ServiceItem } from '../types';

export const serviceCategories = [
  { id: 'all', label: 'Todos los servicios' },
  { id: 'contable', label: 'Contabilidad y Finanzas' },
  { id: 'tributario', label: 'Impuestos y Blindaje' },
  { id: 'consultoria', label: 'Estrategia y Costos' },
  { id: 'nomina', label: 'Nómina y Laboral' },
  { id: 'tecnologia', label: 'Facturación y Firmas' },
] as const;

export const servicesData: ServiceItem[] = [
  // 1. Contabilidad General y Orden Financiero
  {
    id: 'contabilidad-general',
    category: 'contable',
    categoryLabel: 'Contabilidad y Finanzas',
    title: 'Contabilidad General y Orden Financiero',
    tagline: 'Mantén la radiografía de tu negocio siempre clara y al día.',
    description: 'Capturamos cada movimiento, conciliamos cuentas y entregamos balances claros para que conozcas con exactitud la salud y rentabilidad de tu empresa.',
    iconName: 'Calculator',
    detailedHighlights: [
      {
        title: 'Registro Impecable',
        description: 'Capturamos cada ingreso y egreso para que tus libros contables estén libres de errores.',
      },
      {
        title: 'Conciliación Bancaria',
        description: 'Cruzamos tus cuentas bancarias con tus facturas para que no se pierda rastro de ningún centavo.',
      },
      {
        title: 'Salud Financiera',
        description: 'Te entregamos balances claros que te permiten saber con precisión cuánto está ganando tu empresa.',
      },
    ],
    highlights: [
      'Registro Impecable: ingresos y egresos libres de errores',
      'Conciliación Bancaria: cuadre exacto de facturas y cuentas',
      'Salud Financiera: balances claros de rentabilidad real',
    ],
    whatsappMessage: 'Hola MH Contabilidad / Jorge Hernández, requiero información sobre el servicio de Contabilidad General y Orden Financiero.',
  },

  // 2. Impuestos y Blindaje Fiscal
  {
    id: 'impuestos-blindaje-fiscal',
    category: 'tributario',
    categoryLabel: 'Impuestos y Blindaje',
    title: 'Impuestos y Blindaje Fiscal',
    tagline: 'Duerme tranquilo sabiendo que cumples las normas y proteges tu capital.',
    description: 'Preparamos y presentamos tus obligaciones tributarias a tiempo, optimizamos deducciones legales y te respaldamos activamente ante la autoridad fiscal.',
    iconName: 'ShieldCheck',
    detailedHighlights: [
      {
        title: 'Declaraciones Oportunas',
        description: 'Preparamos y presentamos tus obligaciones tributarias a tiempo para evitar costosas multas.',
      },
      {
        title: 'Optimización Legal',
        description: 'Analizamos tu estructura para aplicar deducciones y beneficios fiscales que reduzcan legalmente tu carga impositiva.',
      },
      {
        title: 'Respaldo ante el Fisco',
        description: 'Respondemos y te defendemos ante cualquier requerimiento o auditoría de la autoridad fiscal.',
      },
    ],
    highlights: [
      'Declaraciones Oportunas: cero multas ante el SRI',
      'Optimización Legal: deducciones y beneficios aplicados con rigor',
      'Respaldo ante el Fisco: atención a requerimientos y auditorías',
    ],
    whatsappMessage: 'Hola MH Contabilidad / Jorge Hernández, requiero asesoría sobre Impuestos y Blindaje Fiscal para mi negocio.',
  },

  // 3. Consultoría y Estrategia de Crecimiento
  {
    id: 'consultoria-estrategia',
    category: 'consultoria',
    categoryLabel: 'Estrategia y Costos',
    title: 'Consultoría y Estrategia de Crecimiento',
    tagline: 'Transformamos los números fríos en decisiones inteligentes de negocio.',
    description: 'Convertimos datos contables complejos en reportes de dirección ejecutivos, evaluamos márgenes de rentabilidad y proyectamos liquidez para operar sin estrés.',
    iconName: 'TrendingUp',
    detailedHighlights: [
      {
        title: 'Reportes de Dirección',
        description: 'Traducimos la contabilidad pesada en informes visuales y sencillos para guiar tu negocio.',
      },
      {
        title: 'Análisis de Costos',
        description: 'Evaluamos a fondo tus márgenes para identificar qué productos o clientes son los más rentables.',
      },
      {
        title: 'Flujo de Caja',
        description: 'Proyectamos tus finanzas para garantizar que siempre tengas liquidez para operar y pagar nóminas sin estrés.',
      },
    ],
    highlights: [
      'Reportes de Dirección: informes ejecutivos visuales y claros',
      'Análisis de Costos: margen real por producto y cliente',
      'Flujo de Caja: previsión de liquidez y pago de nóminas seguro',
    ],
    whatsappMessage: 'Hola MH Contabilidad / Jorge Hernández, me interesa la Consultoría y Estrategia de Crecimiento para mi empresa.',
  },

  // 4. Gestión de Nómina y Soporte Laboral
  {
    id: 'gestion-nomina-laboral',
    category: 'nomina',
    categoryLabel: 'Nómina y Laboral',
    title: 'Gestión de Nómina y Soporte Laboral',
    tagline: 'Aliviamos tu carga administrativa para que manejes tu equipo con total seguridad jurídica.',
    description: 'Elaboramos roles de pago, cálculo exacto de horas extras y liquidaciones, gestionando altas, bajas y aportes ante la seguridad social con estricto apego a la ley laboral.',
    iconName: 'Users',
    detailedHighlights: [
      {
        title: 'Cálculo de Sueldos',
        description: 'Elaboramos roles de pago, horas extra, bonificaciones y liquidaciones con exactitud exacta.',
      },
      {
        title: 'Seguridad Social',
        description: 'Gestionamos las altas, bajas y aportes obligatorios de tus empleados cumpliendo estrictamente la ley laboral.',
      },
    ],
    highlights: [
      'Cálculo de Sueldos: roles de pago, horas extras y liquidaciones',
      'Seguridad Social: gestión de altas, bajas y aportes obligatorios',
      'Seguridad Jurídica: cumplimiento estricto de la normativa laboral',
    ],
    whatsappMessage: 'Hola MH Contabilidad / Jorge Hernández, necesito soporte en Gestión de Nómina y Administración Laboral.',
  },

  // 5. Tecnología, Facturación y Firmas Electrónicas
  {
    id: 'tecnologia-facturacion-firmas',
    category: 'tecnologia',
    categoryLabel: 'Facturación y Firmas',
    title: 'Tecnología, Facturación y Firmas Electrónicas',
    tagline: 'Automatiza tu negocio y cumple con la ley digital en un solo lugar.',
    description: 'Implementamos facturación electrónica en la nube, conectamos tu software contable para sincronizar ventas y emitimos tu firma electrónica oficial de forma inmediata.',
    iconName: 'Laptop',
    detailedHighlights: [
      {
        title: 'Sistema de Facturación Electrónica',
        description: 'Te implementamos una plataforma ágil y moderna en la nube para que emitas tus facturas, notas de crédito y retenciones de forma rápida, segura y desde cualquier dispositivo.',
      },
      {
        title: 'Programa Contable Integrado',
        description: 'Conecta tus ventas directamente con nuestro software contable. Esto nos permite automatizar tus reportes, reducir errores humanos y darte acceso en tiempo real a la información de tu negocio.',
      },
      {
        title: 'Emisión de Firmas Electrónicas',
        description: 'Somos proveedores autorizados. Emitimos y renovamos tu firma electrónica (en archivo o token) de manera inmediata para que puedas facturar y firmar contratos digitales con total validez legal, sin filas ni trámites complejos.',
      },
    ],
    highlights: [
      'Facturación Electrónica en la nube para cualquier dispositivo',
      'Integración con software contable y sincronización de ventas',
      'Emisión inmediata de Firmas Electrónicas (archivo o token)',
    ],
    whatsappMessage: 'Hola MH Contabilidad / Jorge Hernández, solicito información sobre Facturación Electrónica y Firma Electrónica.',
  },
];
