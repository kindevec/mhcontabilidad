import React, { useRef, useState, useEffect, useCallback } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cuadruplicamos la lista para garantizar un ciclo infinito continuo y sin vacíos
  const infiniteServices = [
    ...officialServices,
    ...officialServices,
    ...officialServices,
    ...officialServices,
  ];

  const getWhatsappUrl = (msg: string) =>
    `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(msg)}`;

  // Envoltorio cíclico infinito invisible al ojo
  const handleBoundaryWrap = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 4;
    if (singleSetWidth <= 0) return;

    if (el.scrollLeft >= singleSetWidth * 2.5) {
      el.scrollLeft -= singleSetWidth;
    } else if (el.scrollLeft <= singleSetWidth * 0.5) {
      el.scrollLeft += singleSetWidth;
    }
  }, []);

  // Posicionar en el segundo bloque al cargar para permitir deslizamiento previo inmediato
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 4;
    if (singleSetWidth > 0 && el.scrollLeft === 0) {
      el.scrollLeft = singleSetWidth;
    }
  }, []);

  const pauseTemporarily = (duration = 2200) => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, duration);
  };

  // Deslizamiento continuo infinito a 60fps
  useEffect(() => {
    let lastTime = performance.now();
    let animId: number;

    const autoSlide = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isInteracting && scrollRef.current && !isDraggingRef.current) {
        const el = scrollRef.current;
        el.scrollLeft += 36 * delta; // 36 px/segundo de deslizamiento fluido
        handleBoundaryWrap();
      }

      animId = requestAnimationFrame(autoSlide);
    };

    animId = requestAnimationFrame(autoSlide);
    return () => cancelAnimationFrame(animId);
  }, [isInteracting, handleBoundaryWrap]);

  // Arrastre con ratón (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    startScrollLeftRef.current = el.scrollLeft;
    setIsInteracting(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const el = scrollRef.current;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = startScrollLeftRef.current - walk;
    handleBoundaryWrap();
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      pauseTemporarily(1800);
    }
  };

  const renderCard = (item: ServiceCardData, key: React.Key) => (
    <div
      key={key}
      className="relative w-[280px] xs:w-80 sm:w-96 h-[440px] sm:h-[520px] rounded-none overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 group select-none transition-transform duration-300 hover:scale-[1.01] shrink-0"
    >
      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover brightness-[0.72] group-hover:scale-105 transition-transform duration-500 rounded-none"
      />
      {/* Degradado oscuro para garantizar legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A] via-[#172B3A]/80 to-transparent pointer-events-none" />

      {/* Contenido: Título, Frase y Botón centrados */}
      <div className="relative z-10 p-5 sm:p-8 h-full flex flex-col justify-end items-center text-white text-center space-y-3">
        <h4 className="text-lg sm:text-2xl font-bold leading-snug text-white drop-shadow-sm line-clamp-2">
          {item.title}
        </h4>
        <p className="text-xs sm:text-base text-slate-200 line-clamp-3 leading-relaxed max-w-xs">
          {item.tagline}
        </p>

        {/* Botón oficial: Consultar aquí */}
        <div className="pt-3 flex items-center justify-center">
          <a
            href={getWhatsappUrl(item.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-none text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] active:bg-[#c94703] transition-colors shadow-sm whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Consultar aquí</span>
          </a>
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

      {/* Contenedor deslizante interactivo e infinito */}
      <div className="relative w-full group/slider py-2">
        {/* Pista deslizante infinita con soporte táctil nativo en móvil y drag en desktop */}
        <div
          ref={scrollRef}
          onScroll={handleBoundaryWrap}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={() => {
            handleMouseUpOrLeave();
            setIsInteracting(false);
          }}
          onMouseEnter={() => setIsInteracting(true)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => pauseTemporarily(2000)}
          className="w-full flex items-center gap-4 sm:gap-6 overflow-x-auto select-none cursor-grab active:cursor-grabbing px-4 sm:px-8 py-1"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {infiniteServices.map((item, idx) => renderCard(item, `service-infinite-${idx}`))}
        </div>
      </div>
    </div>
  );
};

export default ServicesCarousel;