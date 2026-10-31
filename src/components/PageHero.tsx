import React from 'react';

interface PageHeroProps {
  badge?: string;
  titleLine1: string;
  titleHighlight: string;
  description?: string;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  titleLine1,
  titleHighlight,
  description,
  image,
  imageAlt,
  children,
}) => {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#0A131F] md:bg-[#F8FAFC] md:min-h-[480px] lg:min-h-[540px] xl:min-h-[580px]"
      aria-label={titleLine1}
    >
      {/* ============================================================== */}
      {/* VISTA MÓVIL (< md): Textos y dos botones centrados dentro del bloque azul */}
      {/* ============================================================== */}
      <div className="md:hidden flex flex-col w-full bg-[#0A131F]">
        {/* Contenedor azul superior: aloja holgadamente textos y botones centrados */}
        <div className="w-full px-5 pt-20 xs:pt-24 pb-7 space-y-3.5 text-center flex flex-col items-center justify-center z-10">
          {badge && (
            <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#38BDF8] uppercase tracking-wider mx-auto">
              <span className="w-2.5 h-0.5 bg-[#FC6412]" />
              <span>{badge}</span>
            </div>
          )}

          <h1 className="text-2xl xs:text-3xl font-black text-white tracking-tight leading-tight text-center">
            <span className="block">{titleLine1}</span>
            <span className="text-[#38BDF8] block mt-1">{titleHighlight}</span>
          </h1>

          {description && (
            <p className="text-xs xs:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto text-center">
              {description}
            </p>
          )}

          {children && (
            <div className="pt-2 w-full flex justify-center [&>div]:justify-center [&>div]:pt-1">
              {children}
            </div>
          )}
        </div>

        {/* Línea divisoria naranja */}
        <div className="w-full h-1 bg-[#FC6412] relative z-10" />

        {/* Imagen inferior en móvil */}
        <div className="w-full h-44 xs:h-52 relative overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover object-center"
            loading="eager"
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
          {/* Imagen integrada en la base derecha */}
          <div className="absolute inset-y-0 right-0 w-[58%] lg:w-[62%] xl:w-[65%] overflow-hidden">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-full object-cover object-center select-none filter brightness-[0.98]"
              loading="eager"
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

            {/* Faceta inferior derecha con ribete naranja perimetral completo en ambos segmentos */}
            <polygon points="870,650 1000,650 1000,520 935,560" fill="#005BB2" opacity="0.95" />
            <polygon points="864,650 870,650 935,560 1000,520 1000,512 928,554" fill="#FC6412" />

            {/* Polígono oscuro principal izquierdo (#0A131F) */}
            <polygon
              points="0,0 350,0 490,650 0,650"
              fill="#0A131F"
            />

            {/* Franja continua azul a lo largo de toda la diagonal recta */}
            <polygon
              points="356,0 376,0 516,650 496,650"
              fill="#005BB2"
            />

            {/* Franja continua naranja MH completa, nítida e ininterrumpida de extremo a extremo */}
            <polygon
              points="350,0 356,0 496,650 490,650"
              fill="#FC6412"
            />

            {/* Faceta de acento inferior izquierda */}
            <polygon points="0,540 60,650 0,650" fill="#005BB2" />
            <polygon points="0,534 6,540 66,650 60,650" fill="#FC6412" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[480px] lg:min-h-[540px] xl:min-h-[580px]">
            
            {/* Columna Izquierda: Información oficial sobre el fondo oscuro */}
            <div className="lg:col-span-6 xl:col-span-5 pt-32 lg:pt-36 pb-10 sm:pb-14 lg:pb-16 space-y-4 sm:space-y-5 text-left">
              {badge && (
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#38BDF8] uppercase tracking-wider">
                  <span className="w-2.5 h-0.5 bg-[#FC6412]" />
                  <span>{badge}</span>
                </div>
              )}

              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                <span className="block">{titleLine1}</span>
                <span className="text-[#38BDF8] block mt-1 sm:mt-2">{titleHighlight}</span>
              </h1>

              {description && (
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
                  {description}
                </p>
              )}

              {children && <div className="pt-2">{children}</div>}
            </div>

            {/* Columna Derecha: Área libre diáfana que deja ver la imagen integrada en el fondo */}
            <div className="hidden lg:block lg:col-span-6 xl:col-span-7 min-h-[400px] pointer-events-none" aria-hidden="true" />

          </div>
        </div>
      </div>
    </section>
  );
};
