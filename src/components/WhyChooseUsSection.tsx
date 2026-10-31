import React from 'react';
import { FileCheck2, Calculator, ShieldCheck, TrendingUp } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { siteConfig } from '../data/siteConfig';
import equipoReunionImg from '../assets/images/equipo_mh_contabilidad.webp';

export const WhyChooseUsSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola Jorge Hernandez / MH Contabilidad, me gustaria agendar una asesoria sobre sus servicios contables y tributarios.')}`;

  const processItems = [
    {
      num: '1',
      title: 'Diagnóstico Inicial',
      desc: 'Evaluamos tu historial tributario y detectamos contingencias a tiempo.',
      icon: FileCheck2,
      badgeBg: 'bg-[#005BB2]',
    },
    {
      num: '2',
      title: 'Puesta al Día',
      desc: 'Organizamos balances, facturación y cuentas bancarias sin retrasos.',
      icon: Calculator,
      badgeBg: 'bg-[#FC6412]',
    },
    {
      num: '3',
      title: 'Cumplimiento SRI',
      desc: 'Declaraciones y anexos puntuales con blindaje contra multas.',
      icon: ShieldCheck,
      badgeBg: 'bg-[#005BB2]',
    },
    {
      num: '4',
      title: 'Decisiones con Datos',
      desc: 'Informes claros para que tomes el control y crezcas seguro.',
      icon: TrendingUp,
      badgeBg: 'bg-[#FC6412]',
    },
  ];

  return (
    <section className="relative w-full bg-white overflow-hidden border-t-4 border-[#FC6412]">
      <div className="relative w-full min-h-[540px] lg:min-h-[600px] flex flex-col lg:flex-row items-stretch">
        
        {/* Imagen del Equipo en Desktop (Lado Derecho con corte limpio sin elementos intrusivos) */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[46%] xl:w-[48%] overflow-hidden">
          <img
            src={equipoReunionImg}
            alt="Equipo de consultores MH Contabilidad trabajando con clientes"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Divisor diagonal limpio corporativo (#0A131F) sin solapar a las personas */}
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10"
          aria-hidden="true"
        >
          <polygon
            points="540,0 565,0 505,600 480,600"
            fill="#0A131F"
          />
        </svg>

        {/* Contenido Principal Izquierdo */}
        <div className="relative z-20 w-full lg:w-[58%] xl:w-[56%] px-4 sm:px-10 lg:pl-12 lg:pr-14 py-10 sm:py-16 flex flex-col justify-center bg-white">
          <div className="max-w-3xl space-y-6 text-left">
            
            {/* Título Principal */}
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] font-black text-[#172B3A] tracking-tight leading-[1.15] text-center sm:text-left">
              ¿Por qué contratarnos?
            </h2>

            {/* Cita / Metodología de Acompañamiento */}
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal italic border-l-2 border-[#FC6412] pl-3 sm:pl-4">
              "Trabajamos con un proceso estructurado paso a paso para que delegues tus obligaciones contables y tributarias con total tranquilidad y te dediques 100% a hacer crecer tu empresa."
            </p>

            {/* Línea de Tiempo Ondulada Ascendente estilo Referencia */}
            <div className="relative pt-6 pb-2 w-full">
              {/* Línea curva conectora SVG ondulada con arcos puente entre círculos */}
              <div className="hidden sm:block absolute inset-x-0 top-1 h-[140px] pointer-events-none z-0" aria-hidden="true">
                <svg
                  viewBox="0 0 1000 160"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                >
                  <path
                    d="M 125,140 C 200,85 290,85 375,105 C 450,50 540,50 625,70 C 700,15 790,10 875,25"
                    fill="none"
                    stroke="#005BB2"
                    strokeWidth="2.5"
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </div>

              {/* 4 Nodos en línea de tiempo ondulada con arcos entre ellos */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-7 relative z-10">
                {processItems.map((item, idx) => {
                  const IconComp = item.icon;
                  // Desplazamiento vertical ascendente en escritorio
                  const offsetClasses = [
                    'sm:translate-y-18', // Paso 1: Base
                    'sm:translate-y-12', // Paso 2: Medio-bajo
                    'sm:translate-y-6',  // Paso 3: Medio-alto
                    'sm:translate-y-0',  // Paso 4: Cumbre
                  ];
                  return (
                    <div
                      key={item.num}
                      className={`flex flex-col items-center text-center group transition-transform ${offsetClasses[idx]}`}
                    >
                      {/* Nodo Circular con Anillo Punteado que oculta la línea detrás */}
                      <div className="relative mb-3 shrink-0">
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-dashed border-[#005BB2]/40 p-1.5 flex items-center justify-center bg-white shadow-xs group-hover:border-[#005BB2] transition-colors z-10 relative">
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F0F7FF] to-[#E2EEFC] border-2 border-white flex items-center justify-center text-[#005BB2] shadow-xs">
                            <IconComp className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                          </div>
                        </div>
                      </div>

                      {/* Textos del Ítem */}
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#172B3A] tracking-tight mt-1 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-[#64748B] mt-1 leading-relaxed font-normal max-w-[130px]">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botón de Acción Principal Naranja Oficial MH Centrado */}
            <div className="pt-8 sm:pt-12 lg:pt-14 flex justify-center w-full">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-9 py-3 sm:py-3.5 bg-[#FC6412] hover:bg-[#e05308] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all rounded-none uppercase tracking-wider text-center"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>Agendar Asesoría</span>
              </a>
            </div>

          </div>
        </div>

        {/* Imagen en Dispositivos Móviles (Limpia al final) */}
        <div className="lg:hidden w-full h-72 sm:h-80 overflow-hidden relative">
          <img
            src={equipoReunionImg}
            alt="Equipo de consultores MH Contabilidad"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
};