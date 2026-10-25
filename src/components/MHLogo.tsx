import React from 'react';

interface MHLogoProps {
  variant?: 'full' | 'compact' | 'light';
  className?: string;
}

export const MHLogo: React.FC<MHLogoProps> = ({ variant = 'full', className = '' }) => {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Isotipo: Monograma MH con barras ascendentes y flecha financiera de crecimiento */}
      <div className="relative w-10 h-10 shrink-0">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
          aria-hidden="true"
        >
          {/* Base Contenedor estilizado */}
          <rect width="48" height="48" rx="10" fill={isLight ? '#FFFFFF' : '#005BB2'} />

          {/* Barras ascendentes financieras (Inspiradas en el isotipo original de contabilidad) */}
          <rect x="8" y="24" width="4" height="14" rx="1.5" fill={isLight ? '#005BB2' : '#FFFFFF'} />
          <rect x="15" y="18" width="4" height="20" rx="1.5" fill={isLight ? '#005BB2' : '#FFFFFF'} />
          <rect x="22" y="12" width="4" height="26" rx="1.5" fill={isLight ? '#FC6412' : '#FC6412'} />

          {/* Letra M y H vectorizadas */}
          <path
            d="M29 38V22H32.5L35.5 28L38.5 22H42V38H39V28L36.5 33H34.5L32 28V38H29Z"
            fill={isLight ? '#005BB2' : '#FFFFFF'}
          />

          {/* Flecha dinámica superior hacia la derecha en naranja institucional */}
          <path
            d="M12 12L24 8L20 14"
            stroke="#FC6412"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {variant !== 'compact' && (
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xl font-extrabold tracking-tight ${
                isLight ? 'text-white' : 'text-[#005BB2]'
              }`}
            >
              MH
            </span>
            <span
              className={`text-base font-bold tracking-normal ${
                isLight ? 'text-white/90' : 'text-[#172B3A]'
              }`}
            >
              CONTABILIDAD
            </span>
          </div>
          <span
            className={`text-[9px] font-semibold uppercase tracking-wider ${
              isLight ? 'text-orange-300' : 'text-[#FC6412]'
            }`}
          >
            Servicios Contables y Tributarios
          </span>
        </div>
      )}
    </div>
  );
};
