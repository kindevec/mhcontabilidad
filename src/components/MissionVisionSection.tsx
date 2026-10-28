import React from 'react';
import { Target, Eye } from 'lucide-react';
import contadoresImg from '../assets/images/mision_vision_contadores.webp';

export const MissionVisionSection: React.FC = () => {
  return (
    <section className="relative pt-12 sm:pt-16 pb-0 overflow-hidden border-y border-slate-100">
      {/* Fondo Dual Dividido 50/50 de extremo a extremo sin contenedores cerrados */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 pointer-events-none z-0">
        <div className="bg-white" />
        <div className="bg-[#FFF8EA]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] lg:min-h-[420px] items-center relative">
          
          {/* Lado Izquierdo: Misión (Cols 1 a 4) */}
          <div className="lg:col-span-4 py-4 sm:py-6 pr-0 lg:pr-4 flex flex-col justify-center space-y-3.5 text-left z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center text-amber-500 shrink-0 shadow-xs">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-[#172B3A] tracking-tight">
                Misión
              </h3>
            </div>

            <p className="text-sm sm:text-[15px] text-[#475569] leading-relaxed font-normal">
              Impulsar el éxito de autónomos, Pymes y medianas empresas simplificando su gestión contable y fiscal. Brindando total tranquilidad y cumplimiento normativo, transformando los números en información estratégica, clara y accesible para que nuestros clientes tomen decisiones seguras y se enfoquen en hacer crecer su negocio.
            </p>
          </div>

          {/* Centro Mobile: Imagen visible entre Misión y Visión con cajita de slogan */}
          <div className="lg:hidden flex flex-col items-center justify-center pt-4 pb-4 bg-gradient-to-b from-white via-[#FFF8EA]/70 to-[#FFF8EA] space-y-3">
            <img
              src={contadoresImg}
              alt="Equipo de contadores MH Contabilidad"
              className="w-64 sm:w-72 h-auto object-contain object-bottom drop-shadow-xl"
              loading="lazy"
            />
            {/* Cajita de slogan mobile */}
            <div className="bg-[#002D5A] text-white px-5 py-2.5 rounded-full shadow-lg border border-white/20 text-center max-w-xs">
              <span className="text-[11px] font-bold tracking-wide text-white">
                Tu respaldo contable <span className="text-[#FC6412]">Tu impulso estratégico</span>
              </span>
            </div>
          </div>

          {/* Centro Desktop (Cols 5 a 8): Espacio diáfano amplio de 4 columnas reservado para los contadores */}
          <div className="hidden lg:block lg:col-span-4 min-h-[380px] lg:min-h-[420px] pointer-events-none" aria-hidden="true" />

          {/* Lado Derecho: Visión (Cols 9 a 12, desplazada holgadamente a la derecha) */}
          <div className="lg:col-span-4 py-4 sm:py-6 pl-0 lg:pl-6 xl:pl-10 flex flex-col justify-center space-y-3.5 text-left z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#005BB2]/10 border-2 border-[#005BB2]/40 flex items-center justify-center text-[#005BB2] shrink-0 shadow-xs">
                <Eye className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-[#FC6412] tracking-tight">
                Visión
              </h3>
            </div>

            <p className="text-sm sm:text-[15px] text-[#475569] leading-relaxed font-normal">
              Ser la firma contable y el aliado estratégico de referencia para el tejido empresarial y los profesionales independientes, reconocidos por redefinir la confianza financiera a través de la innovación, la claridad absoluta y una cercanía que impulsa el desarrollo sostenible de cada negocio.
            </p>
          </div>

          {/* Imagen Desktop: Con Cajita de texto Flotante con el Slogan Institucional justo debajo */}
          <div className="hidden lg:flex flex-col absolute left-1/2 -translate-x-1/2 bottom-0 h-full max-h-[430px] items-center justify-end pointer-events-none z-20">
            <img
              src={contadoresImg}
              alt="Contadores profesionales MH Contabilidad - Misión y Visión"
              className="h-[82%] w-auto max-w-none object-contain object-bottom drop-shadow-2xl select-none"
              loading="eager"
            />
            {/* Cajita de texto con el slogan de MH centrada en la base */}
            <div className="pointer-events-auto -mt-3 mb-2 bg-[#002D5A]/95 hover:bg-[#002D5A] backdrop-blur-md text-white px-6 py-2.5 rounded-full shadow-xl border border-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-[#FC6412] animate-pulse shrink-0" />
              <p className="text-xs sm:text-[13px] font-extrabold tracking-wide">
                Tu respaldo contable <span className="text-[#FC6412] ml-1">Tu impulso estratégico</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
