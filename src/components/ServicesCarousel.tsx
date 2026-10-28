import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Marquee } from './ui/cta-with-marquee';
import { siteConfig } from '../data/siteConfig';

// Fotografías profesionales reales para los 5 servicios oficiales
import contabilidadImg from '../assets/images/hero_contabilidad_asesoria_1792699795005.webp';
import fiscalImg from '../assets/images/corporate_consulting_team_1792700513952.webp';
import consultoriaImg from '../assets/images/hero_financial_advisor_skyline.webp';
import nominaImg from '../assets/images/equipo_mh_contabilidad.webp';
import tecnologiaImg from '../assets/images/digital_fintech_portal_1792700528199.webp';

export interface ServiceCardData {
  id: string;
  title: string;
  tagline: string;
  img: string;
  whatsappMessage: string;
  detailsUrl: string;
}

// 5 Tarjetas oficiales de MH Contabilidad
const officialServices: ServiceCardData[] = [
  {
    id: 'contabilidad-general',
    title: 'Contabilidad General y Orden Financiero',
    tagline: 'Mantén la radiografía de tu negocio siempre clara y al día.',
    img: contabilidadImg,
    whatsappMessage:
      'Hola MH Contabilidad, requiero informacion sobre Contabilidad General y Orden Financiero.',
    detailsUrl: '/servicios',
  },
  {
    id: 'impuestos-blindaje-fiscal',
    title: 'Impuestos y Blindaje Fiscal',
    tagline: 'Duerme tranquilo sabiendo que cumples las normas y proteges tu capital.',
    img: fiscalImg,
    whatsappMessage:
      'Hola MH Contabilidad, requiero asesoria sobre Impuestos y Blindaje Fiscal para mi negocio.',
    detailsUrl: '/servicios',
  },
  {
    id: 'consultoria-estrategia',
    title: 'Consultoría y Estrategia de Crecimiento',
    tagline: 'Transformamos los números fríos en decisiones inteligentes de negocio.',
    img: consultoriaImg,
    whatsappMessage:
      'Hola MH Contabilidad, me interesa la Consultoría y Estrategia de Crecimiento para mi empresa.',
    detailsUrl: '/servicios',
  },
  {
    id: 'gestion-nomina-laboral',
    title: 'Gestion de Nomina y Soporte Laboral',
    tagline: 'Aliviamos tu carga administrativa para que manejes tu equipo con total seguridad jurídica.',
    img: nominaImg,
    whatsappMessage:
      'Hola MH Contabilidad, necesito soporte en Gestion de Nomina y Soporte Laboral.',
    detailsUrl: '/servicios',
  },
  {
    id: 'tecnologia-facturacion-firmas',
    title: 'Tecnología, Facturación y Firmas Electrónicas',
    tagline: 'Automatiza tu negocio y cumple con la ley digital en un solo lugar.',
    img: tecnologiaImg,
    whatsappMessage:
      'Hola MH Contabilidad, solicito informacion sobre Tecnologia, Facturacion y Firmas Electronicas.',
    detailsUrl: '/servicios',
  },
];

export interface ServicesCarouselProps {
  centerLabel?: React.ReactNode;
}

export const ServicesCarousel: React.FC<ServicesCarouselProps> = ({ centerLabel }) => {
  const getWhatsappUrl = (msg: string) =>
    `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(msg)}`;

  const renderCard = (item: ServiceCardData, key: React.Key) => (
    <div
      key={key}
      className="relative w-80 sm:w-96 h-[480px] sm:h-[540px] rounded-none overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 group select-none transition-transform duration-300 hover:scale-[1.02] shrink-0"
    >
      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover brightness-[0.72] group-hover:scale-105 transition-transform duration-500 rounded-none"
      />
      {/* Degradado oscuro para garantizar legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A] via-[#172B3A]/80 to-transparent pointer-events-none" />

      {/* Contenido: Título, Frase y Dos Botones centrados */}
      <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-end items-center text-white text-center space-y-3">
        <h4 className="text-lg sm:text-2xl font-bold leading-snug text-white drop-shadow-sm line-clamp-2">
          {item.title}
        </h4>
        <p className="text-xs sm:text-base text-slate-200 line-clamp-3 leading-relaxed max-w-xs">
          {item.tagline}
        </p>

        {/* Dos Botones: Consultar y Detalles cuadrados y centrados */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <a
            href={getWhatsappUrl(item.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] active:bg-[#c94703] transition-colors shadow-sm whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Consultar</span>
          </a>
          <Link
            to={item.detailsUrl}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-none text-xs sm:text-sm font-semibold text-white/90 hover:text-white bg-white/20 hover:bg-white/30 border border-white/25 transition-all whitespace-nowrap"
          >
            <span>Detalles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Encabezado institucional completo centrado ARRIBA del carrusel */}
      {centerLabel && (
        <div className="w-full mb-8 sm:mb-10 flex justify-center">
          {centerLabel}
        </div>
      )}

      {/* Carrusel en UNA SOLA FILA HORIZONTAL a ancho completo */}
      <div className="w-full overflow-hidden py-2">
        <Marquee speed={32} pauseOnHover className="[--gap:2rem]">
          {officialServices.map((item, idx) => renderCard(item, `card-${idx}`))}
        </Marquee>
      </div>
    </div>
  );
};

export default ServicesCarousel;
