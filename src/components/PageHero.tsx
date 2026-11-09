import React from 'react';

interface PageHeroProps {
  badge?: string;
  titleLine1: string;
  titleHighlight: string;
  titleClassName?: string;
  description?: string;
  image: string;
  mobileImage?: string;
  imageAlt: string;
  imageClassName?: string;
  mobileImageClassName?: string;
  mobileContainerHeightClassName?: string;
  diagonalOffset?: number;
  contentClassName?: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  titleLine1,
  titleHighlight,
  titleClassName,
  description,
  image,
  mobileImage,
  imageAlt,
  imageClassName,
  mobileImageClassName,
  mobileContainerHeightClassName,
  diagonalOffset = 0,
  contentClassName,
  children,
}) => {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#0A131F] md:bg-[#F8FAFC] md:min-h-[560px] lg:min-h-[640px] xl:min-h-[700px]"
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

          <h1 className={`text-2xl xs:text-3xl font-black text-white tracking-tight leading-tight text-center ${titleClassName || ''}`}>
            <span className="block">{titleLine1}</span>
            <span className="text-[#38BDF8] block mt-1">{titleHighlight}</span>
          </h1>



          {children && (
            <div className="pt-2 w-full flex justify-center [&>div]:justify-center [&>div]:pt-1">
              {children}
            </div>
          )}
        </div>

        {/* Línea divisoria naranja */}
        <div className="w-full h-1 bg-[#FC6412] relative z-10" />

        {/* Imagen inferior en móvil */}
        <div className={`w-full ${mobileContainerHeightClassName || 'h-56 xs:h-64 sm:h-72'} relative overflow-hidden bg-[#0A131F]`}>
          <img
            src={mobileImage || image}
            alt={imageAlt}
            className={`w-full h-full object-cover ${mobileImageClassName || imageClassName || 'object-center'}`}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A131F]/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* VISTA DESKTOP (md+): 100% idéntica e inalterada */}
      {/* ============================================================== */}
      <div className="hidden md:block">
        {/* Fondo Geométrico en Diagonal con Aristas Facetadas estilo Active Business Growth */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Imagen integrada en la base derecha */}
          <div className="absolute inset-y-0 right-0 w-[72%] lg:w-[75%] xl:w-[76%] 2xl:w-[72%] overflow-hidden">
            <img
              src={image}
              alt={imageAlt}
              className={`w-full h-full select-none filter brightness-[0.98] ${imageClassName || 'object-cover object-center'}`}
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
            <polygon points="900,650 1000,650 1000,585 950,615" fill="#005BB2" opacity="0.95" />
            <polygon points="894,650 900,650 950,615 1000,585 1000,577 944,609" fill="#FC6412" />

            {/* Polígono oscuro principal izquierdo (#0A131F) */}
            <polygon
              points={`0,0 ${295 + diagonalOffset},0 ${435 + diagonalOffset},650 0,650`}
              fill="#0A131F"
            />

            {/* Franja continua azul a lo largo de toda la diagonal recta */}
            <polygon
              points={`${301 + diagonalOffset},0 ${321 + diagonalOffset},0 ${461 + diagonalOffset},650 ${441 + diagonalOffset},650`}
              fill="#005BB2"
            />

            {/* Franja continua naranja MH completa, nítida e ininterrumpida de extremo a extremo */}
            <polygon
              points={`${295 + diagonalOffset},0 ${301 + diagonalOffset},0 ${441 + diagonalOffset},650 ${435 + diagonalOffset},650`}
              fill="#FC6412"
            />

            {/* Faceta de acento inferior izquierda */}
            <polygon points="0,540 60,650 0,650" fill="#005BB2" />
            <polygon points="0,534 6,540 66,650 60,650" fill="#FC6412" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[560px] lg:min-h-[640px] xl:min-h-[700px]">
            
            {/* Columna Izquierda: Información oficial centrada sobre el fondo oscuro con holgura respecto a la diagonal */}
            <div className={`lg:col-span-6 xl:col-span-5 pt-32 lg:pt-36 pb-10 sm:pb-14 lg:pb-16 space-y-4 sm:space-y-5 text-center flex flex-col items-center justify-center md:-translate-x-6 lg:-translate-x-16 xl:-translate-x-24 ${contentClassName || ''}`}>
              {badge && (
                <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#38BDF8] uppercase tracking-wider mx-auto">
                  <span className="w-2.5 h-0.5 bg-[#FC6412]" />
                  <span>{badge}</span>
                </div>
              )}

              <h1 className={`text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] text-center ${titleClassName || ''}`}>
                <span className="block">{titleLine1}</span>
                <span className="text-[#38BDF8] block mt-1 sm:mt-2">{titleHighlight}</span>
              </h1>

              {description && (
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg mx-auto text-center">
                  {description}
                </p>
              )}

              {children && (
                <div className="pt-2 w-full flex justify-center [&>div]:justify-center">
                  {children}
                </div>
              )}
            </div>

            {/* Columna Derecha: Área libre diáfana que deja ver la imagen integrada en el fondo */}
            <div className="hidden lg:block lg:col-span-6 xl:col-span-7 min-h-[400px] pointer-events-none" aria-hidden="true" />

          </div>
        </div>
      </div>
    </section>
  );
};
