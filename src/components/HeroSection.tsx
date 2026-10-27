import React from 'react';
import heroVideo from '../assets/videos/hero_background.mp4';

export const HeroSection: React.FC = () => {
  return (
    <section
      className="relative w-full h-[45vh] sm:h-[52vh] lg:h-[58vh] min-h-[350px] max-h-[580px] overflow-hidden bg-slate-900"
      aria-label="Presentación visual de MH Contabilidad"
    >
      {/* Video de fondo limpio y claro que llega hasta el header desde la coordenada superior */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-center"
      >
        <source src={heroVideo} type="video/mp4" />
        <source src="/hero_background.mp4" type="video/mp4" />
      </video>

      {/* Sombra sutil superior derecha idéntica al diseño de referencia para máxima legibilidad del menú */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/40 via-black/15 to-transparent pointer-events-none z-1" />
    </section>
  );
};
