export interface SiteConfig {
  companyName: string;
  tradeName: string;
  tagline: string;
  representative: string;
  phone: {
    display: string;
    international: string;
    whatsappNumber: string; // digits only with country code 593...
  };
  email: {
    general: string;
    support: string;
  };
  location: {
    city: string;
    country: string;
    addressNote: string;
  };
  schedule: {
    weekdays: string;
    saturdays: string;
  };
  navLinks: {
    id: string;
    label: string;
    path: string;
    description: string;
  }[];
  socials: {
    name: string;
    url: string;
    isConfirmed: boolean;
  }[];
}

export const siteConfig: SiteConfig = {
  companyName: "MH Contabilidad",
  tradeName: "MH Contabilidad – Servicios Contables y Tributarios",
  tagline: "Rigor profesional, orden contable y cumplimiento tributario estratégico",
  representative: "Jorge Hernández",
  phone: {
    display: "+593 99 283 1742",
    international: "+593992831742",
    whatsappNumber: "593992831742",
  },
  email: {
    general: "contacto@mhcontabilidad.ec",
    support: "asesoria@mhcontabilidad.ec",
  },
  location: {
    city: "Quito / Guayaquil",
    country: "Ecuador (Cobertura Nacional)",
    addressNote: "Atención telemática integral en todo el territorio ecuatoriano y reuniones presenciales previa cita",
  },
  schedule: {
    weekdays: "Lunes a Viernes: 08:30 – 18:00",
    saturdays: "Sábados: 09:00 – 13:00 (Citas programadas)",
  },
  navLinks: [
    {
      id: "inicio",
      label: "Inicio",
      path: "/",
      description: "Portada corporativa y propuesta de valor",
    },
    {
      id: "nosotros",
      label: "Nosotros",
      path: "/nosotros",
      description: "Presentación institucional, enfoque de trabajo y valores",
    },
    {
      id: "servicios",
      label: "Servicios",
      path: "/servicios",
      description: "Catálogo completo de servicios contables y tributarios",
    },
    {
      id: "portal-clientes",
      label: "Portal Clientes",
      path: "/portal-clientes",
      description: "Consultas de comprobantes, cartera y gestión digital",
    },
    {
      id: "contacto",
      label: "Contacto",
      path: "/contacto",
      description: "Formulario de asesoría, ubicación y canales de comunicación",
    },
  ],
  socials: [
    {
      name: "WhatsApp",
      url: "https://wa.me/593992831742",
      isConfirmed: true,
    },
    {
      name: "LinkedIn",
      url: "#",
      isConfirmed: false,
    },
  ],
};
