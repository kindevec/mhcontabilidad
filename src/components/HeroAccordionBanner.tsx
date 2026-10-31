import React, { useState } from 'react';
import { Calculator, ShieldCheck, TrendingUp, FileCheck } from 'lucide-react';

interface PillarItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  clipPathDesktop: string;
  bgGradient: string;
  accentBar: string;
  link: string;
}

const pillars: PillarItem[] = [
  {
    id: 'contabilidad',
    title: 'CONTABILIDAD GENERAL',
    subtitle: 'Balances mensuales y orden financiero',
    icon: Calculator,
    clipPathDesktop: 'polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)',
    bgGradient: 'from-[#004B96] via-[#004080] to-[#00346B]',
    accentBar: 'from-[#FC6412] to-[#ff7e36]',
    link: '/servicios',
  },
  {
    id: 'tributario',
    title: 'BLINDAJE TRIBUTARIO',
    subtitle: 'Cumplimiento SRI y declaraciones a tiempo',
    icon: ShieldCheck,
    clipPathDesktop: 'polygon(0% 8%, 100% 0%, 100% 100%, 0% 92%)',
    bgGradient: 'from-[#006EC9] via-[#005BB2] to-[#004B96]',
    accentBar: 'from-[#38BDF8] to-[#005BB2]',
    link: '/servicios',
  },
  {
    id: 'estrategia',
    title: 'ASESORÍA ESTRATÉGICA',
    subtitle: 'Decisiones financieras y flujo de caja',
    icon: TrendingUp,
    clipPathDesktop: 'polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)',
    bgGradient: 'from-[#004080] via-[#00366E] to-[#002A57]',
    accentBar: 'from-[#FC6412] to-[#ff7e36]',
    link: '/servicios',
  },
  {
    id: 'facturacion',
    title: 'FACTURACIÓN & FIRMAS',
    subtitle: 'Software contable y emisión de firmas',
    icon: FileCheck,
    clipPathDesktop: 'polygon(0% 8%, 100% 0%, 100% 100%, 0% 92%)',
    bgGradient: 'from-[#007ACF] via-[#0066BC] to-[#0052A3]',
    accentBar: 'from-[#38BDF8] to-[#005BB2]',
    link: '/servicios',
  },
];

export const HeroAccordionBanner: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string | null>(null);

  const togglePillar = (id: string) => {
    setActivePillar((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full select-none" aria-label="Pilares de servicio MH Contabilidad">
      {/* Contenedor Adaptado con Acordeón Plegado 3D (diseño idéntico de PC adaptado en escala a móvil) */}
      <div className="grid grid-cols-4 gap-0 relative filter drop-shadow-md sm:drop-shadow-xl">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activePillar === item.id;
          return (
            <div
              key={item.id}
              onClick={() => togglePillar(item.id)}
              style={{ clipPath: item.clipPathDesktop }}
              className={`relative group flex flex-col items-center justify-center text-center px-1 xs:px-2 sm:px-3 md:px-4 py-3.5 xs:py-4.5 sm:py-5 md:py-6 lg:py-7 bg-gradient-to-b ${item.bgGradient} text-white transition-all duration-300 ${
                isActive ? 'brightness-110' : 'hover:brightness-110'
              } -ml-[1px] first:ml-0 overflow-hidden cursor-pointer select-none`}
            >
              {/* Franja superior de acento con colores de marca MH */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r ${item.accentBar} ${
                  isActive ? 'opacity-100 h-2' : 'opacity-90 group-hover:opacity-100 group-hover:h-2'
                } transition-all duration-300`}
              />

              {/* Efecto de pliegue / luz en la arista */}
              <div
                className={`absolute inset-y-0 ${
                  idx % 2 === 0 ? 'right-0 bg-black/20 w-1.5 sm:w-2.5 md:w-3' : 'left-0 bg-white/10 w-1.5 sm:w-2.5 md:w-3'
                } pointer-events-none`}
              />

              {/* Icono corporativo en halo esmerilado con cambio de color al pasar el cursor o pulsar */}
              <div
                className={`relative mb-1.5 sm:mb-2 md:mb-2.5 flex items-center justify-center w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full ${
                  isActive
                    ? 'bg-[#FC6412] border-[#FC6412] scale-110 shadow-lg'
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 group-hover:scale-110 group-hover:bg-[#FC6412] group-hover:border-[#FC6412]'
                } transition-all duration-300 shadow-inner shrink-0`}
              >
                <Icon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
              </div>

              {/* Título en alta jerarquía con cambio de color */}
              <h3
                className={`text-[8px] xs:text-[9.5px] sm:text-[11px] md:text-xs lg:text-[13px] font-black tracking-tight xs:tracking-normal sm:tracking-wider uppercase leading-[1.15] ${
                  isActive ? 'text-amber-200' : 'text-white group-hover:text-amber-200'
                } transition-colors px-0.5`}
              >
                {item.title}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};