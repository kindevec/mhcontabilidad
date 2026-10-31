import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { siteConfig } from '../data/siteConfig';
import mhHeroBannerImg from '../assets/images/mh_banner_hero_oficial.webp';

export const HeroSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola Jorge Hernandez / MH Contabilidad, deseo cotizar una asesoría contable y tributaria personalizada.')}`;

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0A131F] md:bg-[#F8FAFC] md:min-h-[580px] lg:min-h-[640px] xl:min-h-[680px]"
      aria-label="Presentación principal de MH Contabilidad"
    >
      {/* ============================================================== */}
      {/* VISTA MÓVIL (< md): Textos y dos botones centrados dentro del bloque azul */}
      {/* ============================================================== */}
      <div className="md:hidden flex flex-col w-full bg-[#0A131F]">
        {/* Contenedor azul superior: aloja holgadamente textos y botones centrados */}
        <div className="w-full px-5 pt-20 xs:pt-24 pb-7 space-y-3.5 text-center flex flex-col items-center justify-center z-10">
          <h1 className="text-2xl xs:text-3xl font-black text-white tracking-tight leading-tight text-center">
            <span className="block">Tu Respaldo Contable</span>
            <span className="text-[#38BDF8] block mt-1">Tu Impulso Estratégico</span>
          </h1>

          <p className="text-xs xs:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto text-center">
            Asesoría contable, tributaria y financiera especializada para autónomos, pymes y empresas en Ecuador. Blindaje fiscal y cumplimiento riguroso ante el SRI.
          </p>

          <div className="pt-2 w-full flex justify-center items-center gap-2.5 xs:gap-3 flex-wrap">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span>Cotizar Asesoría</span>
            </a>
            <Link
              to="/servicios"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>Conocer Servicios</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>

        {/* Línea divisoria naranja */}
        <div className="w-full h-1 bg-[#FC6412] relative z-10" />

        {/* Imagen inferior en móvil */}
        <div className="w-full h-44 xs:h-52 relative overflow-hidden">
          <img
            src={mhHeroBannerImg}
            alt="Servicios tributarios en Ecuador - MH Contabilidad"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A131F]/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* VISTA DESKTOP (md+): 100% idéntica e inalterada */}
      {/* ============================================================== */}
      <div className="hidden md:block">
        {/* Fondo Geométrico en Diagonal con Aristas Facetadas estilo Active Business Growth */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Imagen adaptada que rellena el espacio derecho sin huecos en blanco */}
          <div className="absolute inset-y-0 right-0 w-[66%] lg:w-[70%] xl:w-[73%] overflow-hidden">
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
            className="absolute inset-0 w-full h-full"
          >
            {/* Faceta superior derecha con ribete naranja perimetral completo */}
            <polygon points="930,0 1000,0 1000,160 965,120" fill="#005BB2" opacity="0.95" />
            <polygon points="924,0 930,0 965,120 1000,160 1000,168 958,124" fill="#FC6412" />

            {/* Faceta inferior derecha con ribete naranja perimetral completo */}
            <polygon points="900,650 1000,650 1000,585 950,615" fill="#005BB2" opacity="0.95" />
            <polygon points="894,650 900,650 950,615 1000,585 1000,577 944,609" fill="#FC6412" />

            {/* Polígono oscuro principal izquierdo (#0A131F) */}
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
        </div>

        <div className="relative z-10 max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:pl-5 lg:pr-8 xl:pl-6 xl:pr-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] xl:min-h-[680px]">
            
            {/* Columna Izquierda: Información oficial desplazada a la izquierda sobre el fondo oscuro */}
            <div className="lg:col-span-6 xl:col-span-5 pt-32 lg:pt-36 pb-10 sm:pb-14 lg:pb-20 space-y-4 sm:space-y-5 text-left">
              {/* Título Principal con salto de línea tras 'Contable' */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-black text-white tracking-tight leading-[1.15]">
                <span className="block">Tu Respaldo Contable</span>
                <span className="text-[#38BDF8] block mt-1 sm:mt-2">Tu Impulso Estratégico</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
                Asesoría contable, tributaria y financiera especializada para autónomos, pymes y empresas en Ecuador. Blindaje fiscal y cumplimiento riguroso ante el SRI.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  <span>Cotizar Asesoría</span>
                </a>
                <Link
                  to="/servicios"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>Conocer Servicios</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Área libre diáfana que deja lucir el banner integrado en toda la altura del fondo */}
            <div className="hidden lg:block lg:col-span-6 xl:col-span-7 min-h-[460px] pointer-events-none" aria-hidden="true" />

          </div>
        </div>
      </div>
    </section>
  );
};