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
}

export const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      title,
      tagline,
      highlights = [],
      whatsappUrl,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative w-full h-[420px] sm:h-[460px] overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-950 shadow-md',
          'transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1.5 select-none',
          className
        )}
        {...props}
      >
        {/* Foto de fondo real con efecto zoom al pasar el cursor */}
        <img
          src={imageUrl}
          alt={imageAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 brightness-[0.70] group-hover:brightness-[0.45]"
        />

        {/* Degradado oscuro para garantizar legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent pointer-events-none" />

        {/* Contenedor de Contenido */}
        <div className="relative flex h-full flex-col justify-end p-6 sm:p-7 text-white z-10 gap-3">
          
          {/* Título (siempre visible) y Bloque desplegable en hover */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-sm">
              {title}
            </h3>

            {/* Contenido revelado exclusivamente al pasar el cursor: Frase y Entregables */}
            <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-64 group-hover:opacity-100 space-y-2.5">
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed pt-1 border-t border-white/10">
                {tagline}
              </p>

              {highlights.length > 0 && (
                <ul className="space-y-1.5 pt-0.5">
                  {highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-100 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#FC6412] shrink-0 mt-0.5" />
                      <span className="leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Botón de WhatsApp (siempre visible) */}
          <div className="pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] active:bg-[#c94703] transition-all duration-300 shadow-md hover:shadow-lg group-hover:shadow-orange-500/20"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Consultar aquí</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

        </div>
      </div>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';
