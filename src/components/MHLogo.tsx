import React from 'react';
import officialLogo from '../assets/images/mh_logo_official.webp';

interface MHLogoProps {
  variant?: 'full' | 'compact' | 'light';
  className?: string;
}

export const MHLogo: React.FC<MHLogoProps> = ({ variant = 'full', className = '' }) => {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Isotipo Oficial */}
      <img
        src={officialLogo}
        alt="MH Contabilidad - Logotipo Oficial"
        className="h-10 sm:h-11 md:h-12 w-auto object-contain shrink-0 filter drop-shadow-xs transition-transform duration-200 hover:scale-[1.02]"
        loading="eager"
      />

      {variant !== 'compact' && (
        <div className="flex flex-col items-center justify-center leading-tight text-center">
          {/* Título Principal con palabras alternadas: Azul y Negro */}
          <div className="flex items-center justify-center gap-1.5">
            <span
              className={`text-lg sm:text-xl font-black tracking-tight ${
                isLight ? 'text-sky-400' : 'text-[#005BB2]'
              }`}
            >
              MH
            </span>
            <span
              className={`text-sm sm:text-base font-extrabold tracking-normal ${
                isLight ? 'text-white' : 'text-[#172B3A]'
              }`}
            >
              CONTABILIDAD
            </span>
          </div>

          {/* Subtítulo con palabras alternadas: Naranja, Azul, Negro y Naranja */}
          <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] tracking-wider uppercase font-bold pt-0.5">
            <span className={isLight ? 'text-orange-400' : 'text-[#FC6412]'}>
              SERVICIOS
            </span>
            <span className={isLight ? 'text-sky-300' : 'text-[#005BB2]'}>
              CONTABLES
            </span>
            <span className={isLight ? 'text-slate-300' : 'text-[#172B3A]'}>
              Y
            </span>
            <span className={isLight ? 'text-orange-300' : 'text-[#FC6412]'}>
              TRIBUTARIOS
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
