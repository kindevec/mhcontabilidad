import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/siteConfig';

/**
 * Ícono Oficial de WhatsApp con trazado vectorial de alta definición (idéntico al de Casa Kinti)
 */
export const WhatsAppOfficialIcon: React.FC<{ className?: string }> = ({
  className = 'w-6 h-6',
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
};

export const WhatsAppFloatingButton: React.FC = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola Jorge Hernandez / MH Contabilidad, requiero asesoria contable o tributaria para mi negocio.')}`;

  const [isHovered, setIsHovered] = useState(false);
  const [isRevealedMobile, setIsRevealedMobile] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar el botón si el usuario hace click/touch fuera en móvil (idéntico a Casa Kinti)
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsRevealedMobile(false);
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      }
    };

    document.addEventListener('touchstart', handleOutsideClick, { passive: true });
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('mousedown', handleOutsideClick);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobileView = typeof window !== 'undefined' && window.innerWidth < 768;

    if (isMobileView) {
      // Si en móvil está recogido en el lateral, el primer toque NO salta a WhatsApp, solo lo revela
      if (!isRevealedMobile) {
        e.preventDefault();
        setIsRevealedMobile(true);

        // Si el cliente no lo aplasta, vuelve a ocultarse tras 5.5 segundos
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => {
          setIsRevealedMobile(false);
        }, 5500);
        return;
      }

      // Si ya estaba revelado y el cliente lo aplasta, navega normalmente a WhatsApp
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    }
  };

  const isVisible = isHovered || isRevealedMobile;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:bottom-[calc(2rem+env(safe-area-inset-bottom,0px))] right-0 z-50 flex items-center select-none pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip / Píldora de Atención al revelar */}
      <div
        className={`hidden md:flex items-center gap-2 mr-3 px-4 py-2 rounded-full bg-[#002D5A]/95 text-white shadow-xl border border-white/20 backdrop-blur-md transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#FC6412] animate-pulse shrink-0" />
        <span className="text-xs font-bold text-white whitespace-nowrap">
          ¿Consulta rápida? <span className="text-[#FC6412]">Escríbenos</span>
        </span>
      </div>

      {/* Botón Flotante con el mecanismo de Casa Kinti: Semi-oculto en el margen derecho que sale en hover/touch */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-button"
        onClick={handleButtonClick}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={`relative group flex items-center justify-center w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-[#FC6412] via-[#ff782d] to-[#e05308] border-2 border-white/90 shadow-[0_6px_22px_rgba(252,100,18,0.45),0_0_15px_rgba(252,100,18,0.35)] hover:shadow-[0_10px_28px_rgba(252,100,18,0.6),0_0_22px_rgba(0,91,178,0.4)] transition-all duration-400 ease-out cursor-pointer active:scale-95 ${
          isVisible
            ? '-translate-x-3 sm:-translate-x-4 md:-translate-x-5 md:scale-110'
            : 'translate-x-6 sm:translate-x-7 md:translate-x-7 md:hover:translate-x-0'
        }`}
        aria-label="Contactar por WhatsApp a MH Contabilidad"
      >
        {/* Anillo de pulso con naranja institucional MH */}
        <span
          className={`absolute inset-0 rounded-full bg-[#FC6412] transition-opacity duration-300 pointer-events-none ${
            isVisible ? 'opacity-0' : 'opacity-40 animate-ping'
          }`}
        />

        {/* Ícono Oficial de WhatsApp en blanco de alta nitidez */}
        <WhatsAppOfficialIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-7.5 md:h-7.5 text-white relative z-10 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
      </a>
    </div>
  );
};
