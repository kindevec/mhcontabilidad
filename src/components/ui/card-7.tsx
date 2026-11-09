import * as React from 'react';
import { cn } from '../../lib/utils';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '../WhatsAppIcon';

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  imageAlt: string;
  logo?: React.ReactNode;
  categoryLabel?: string;
  title: string;
  tagline: string;
  overview?: string;
  highlights?: string[];
  whatsappUrl: string;
  isActive?: boolean;
  onToggle?: () => void;
}

export const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      logo,
      title,
      tagline,
      highlights = [],
      whatsappUrl,
      isActive = false,
      onToggle,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        onClick={onToggle}
        className={cn(
          'service-card-item group relative w-full h-[355px] xs:h-[390px] sm:h-[510px] overflow-hidden rounded-none border border-slate-200/90 bg-slate-950 shadow-md cursor-pointer select-none',
          'transition-all duration-300 ease-in-out sm:hover:shadow-2xl sm:hover:-translate-y-1.5',
          isActive && 'is-active',
          className
        )}
        {...props}
      >
        {/* Foto de fondo con zoom y ajuste de iluminación en hover */}
        <img
          src={imageUrl}
          alt={imageAlt}
          loading="lazy"
          className="service-card-bg absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out sm:group-hover:scale-110 brightness-95 sm:group-hover:brightness-[0.70]"
        />

        {/* Degradado para garantizar legibilidad del texto manteniendo imagen luminosa */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

        {/* Icono / Logo flotante del servicio que se ilumina en naranja al pasar el mouse */}
        {logo && (
          <div className="service-card-badge absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all duration-300 shadow-md">
            {logo}
          </div>
        )}

        {/* Contenedor de Contenido */}
        <div className="relative flex h-full flex-col justify-end p-2.5 xs:p-3 sm:p-7 text-white z-10 gap-2 sm:gap-3">
          
          {/* Título (centrado en móvil y desktop) y Bloque desplegable */}
          <div className="space-y-1 sm:space-y-2 text-center">
            <h3 className="text-[11px] xs:text-xs sm:text-2xl font-extrabold text-white leading-snug sm:leading-tight drop-shadow-sm text-center line-clamp-2 sm:line-clamp-none">
              {title}
            </h3>

            {/* Contenido extra: Se despliega siempre al pasar el mouse (hover) o al tocar (móvil) */}
            <div
              className={cn(
                "service-card-reveal overflow-hidden transition-all duration-300 ease-in-out space-y-1.5 sm:space-y-2",
                isActive
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0 sm:group-hover:max-h-96 sm:group-hover:opacity-100 pointer-events-none sm:pointer-events-auto"
              )}
            >
              <p className="text-[10px] xs:text-xs sm:text-sm text-slate-200 font-medium leading-snug sm:leading-relaxed pt-1 border-t border-white/20 text-center sm:text-left line-clamp-3 sm:line-clamp-none">
                {tagline}
              </p>

              {highlights.length > 0 && (
                <ul className="space-y-1 sm:space-y-1.5 pt-0.5">
                  {highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-[9px] xs:text-[10px] sm:text-xs text-slate-100 font-medium text-left">
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#FC6412] shrink-0 mt-0.5" />
                      <span className="leading-tight sm:leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Botón de WhatsApp (siempre visible) */}
          <div className="pt-0.5 sm:pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full inline-flex items-center justify-center gap-1 sm:gap-2 px-1.5 sm:px-5 py-2 sm:py-3 rounded-none text-[10px] xs:text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] active:bg-[#c94703] transition-all duration-300 shadow-md hover:shadow-lg group-hover:shadow-orange-500/20 text-center"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Consultar aquí</span>
            </a>
          </div>

        </div>
      </div>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';
