import React from 'react';
import mhHeroBannerImg from '../assets/images/mh_banner_hero_oficial.webp';

export const HeroSection: React.FC = () => {

  return (
    <section
      className="relative w-full min-h-[580px] lg:min-h-[640px] xl:min-h-[680px] overflow-hidden bg-[#F8FAFC]"
      aria-label="Presentación principal de MH Contabilidad"
    >
      {/* Fondo Geométrico en Diagonal con Aristas Facetadas estilo Active Business Growth */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Imagen adaptada que rellena el espacio derecho sin huecos en blanco */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-[66%] lg:w-[70%] xl:w-[73%] overflow-hidden">
          <img
            src={mhHeroBannerImg}
            alt="Servicios tributarios en Ecuador - MH Contabilidad"
            className="w-full h-full object-cover object-right select-none filter brightness-[0.98]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Versión SVG vectorizada responsiva con línea divisora recta y bordes geométricos continuos */}
        <svg
          viewBox="0 0 1000 650"
          preserveAspectRatio="none"
          className="hidden md:block absolute inset-0 w-full h-full"
        >

          {/* Faceta superior derecha con ribete naranja perimetral completo */}
          <polygon points="930,0 1000,0 1000,160 965,120" fill="#005BB2" opacity="0.95" />
          <polygon points="924,0 930,0 965,120 1000,160 1000,168 958,124" fill="#FC6412" />

          {/* Faceta inferior derecha con ribete naranja perimetral completo (calibrada más abajo para no tapar textos) */}
          <polygon points="900,650 1000,650 1000,585 950,615" fill="#005BB2" opacity="0.95" />
          <polygon points="894,650 900,650 950,615 1000,585 1000,577 944,609" fill="#FC6412" />

          {/* Polígono oscuro principal izquierdo (#0A131F) desplazado más a la izquierda */}
          <polygon
            points="0,0 285,0 425,650 0,650"
            fill="#0A131F"
          />

          {/* Franja continua azul a lo largo de toda la diagonal recta */}
          <polygon
            points="291,0 311,0 451,650 431,650"
            fill="#005BB2"
          />

          {/* Franja continua naranja MH completa, nítida e ininterrumpida de extremo a extremo */}
          <polygon
            points="285,0 291,0 431,650 425,650"
            fill="#FC6412"
          />

          {/* Faceta de acento inferior izquierda */}
          <polygon points="0,540 60,650 0,650" fill="#005BB2" />
          <polygon points="0,534 6,540 66,650 60,650" fill="#FC6412" />
        </svg>

        {/* Fondo móvil adaptado (pantallas pequeñas < 768px) */}
        <div className="md:hidden absolute inset-0 flex flex-col">
          <div className="h-[56%] w-full bg-[#0A131F] relative">
            <div className="absolute bottom-0 left-0 w-16 h-8 bg-[#005BB2]" />
          </div>
          <div className="h-[44%] w-full relative overflow-hidden">
            <img
              src={mhHeroBannerImg}
              alt="Servicios tributarios en Ecuador - MH Contabilidad"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A131F]/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#FC6412]" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:pl-5 lg:pr-8 xl:pl-6 xl:pr-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] xl:min-h-[680px]">
          
          {/* Columna Izquierda: Información oficial desplazada a la izquierda sobre el fondo oscuro */}
          <div className="lg:col-span-5 xl:col-span-5 pt-24 xs:pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-14 lg:pb-20 space-y-5 sm:space-y-7 text-center lg:text-left">
            {/* Título Principal con salto de línea tras 'Contable' */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-black text-white tracking-tight leading-[1.15]">
              <span className="block">Tu Respaldo Contable</span>
              <span className="text-[#38BDF8] block mt-1 sm:mt-2">Tu Impulso Estratégico</span>
            </h1>
          </div>

          {/* Columna Derecha: Área libre diáfana que deja lucir el banner integrado en toda la altura del fondo */}
          <div className="hidden lg:block lg:col-span-7 xl:col-span-7 min-h-[460px] pointer-events-none" aria-hidden="true" />

        </div>
      </div>
    </section>
  );
};