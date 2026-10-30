export interface SiteConfig {
  companyName: string;
  businessEntity: string;
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
  systemUrl: string;
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
  businessEntity: "STP Industrial",
  tradeName: "MH Contabilidad – Servicios Contables y Tributarios",
  tagline: "Tu respaldo contable. Tu impulso estratégico.",
  representative: "Jorge Hernández",
  phone: {
    display: "+593 96 839 2931",
    international: "+593968392931",
    whatsappNumber: "593968392931",
  },
  email: {
    general: "contacto@tu-contabilidad.com",
    support: "asesoria@tu-contabilidad.com",
  },
  systemUrl: "https://tu-contabilidad.com/sistema",
  location: {
    city: "Ecuador",
    country: "Cobertura Nacional",
    addressNote: "Atención telemática y presencial para autónomos, pymes y medianas empresas",
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
      description: "Misión, visión, valores comerciales y quiénes somos",
    },
    {
      id: "servicios",
      label: "Servicios",
      path: "/servicios",
      description: "Servicios contables, tributarios, consultoría, nómina y facturación",
    },
    {
      id: "portal-clientes",
      label: "Portal Clientes",
      path: "/portal-clientes",
      description: "Acceso al sistema en línea y consultas",
    },
    {
      id: "contacto",
      label: "Contacto",
      path: "/contacto",
      description: "Canal directo de WhatsApp y atención personalizada",
    },
  ],
  socials: [
    {
      name: "WhatsApp",
      url: "https://wa.me/593968392931",
      isConfirmed: true,
    },
    {
      name: "TikTok",
      url: "https://tiktok.com",
      isConfirmed: true,
    },
  ],
};