import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <div className="w-full select-none" aria-label="Pilares de servicio MH Contabilidad">
      {/* Contenedor Desktop: Acordeón plegado 3D con clip-path geométrico */}
      <div className="hidden md:grid grid-cols-4 gap-0 relative filter drop-shadow-xl">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.link}
              style={{ clipPath: item.clipPathDesktop }}
              className={`relative group flex flex-col items-center justify-center text-center px-4 py-6 lg:py-7 bg-gradient-to-b ${item.bgGradient} text-white transition-all duration-300 hover:brightness-110 -ml-[1px] first:ml-0 overflow-hidden cursor-pointer`}
            >
              {/* Franja superior de acento con colores de marca MH */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.accentBar} opacity-90 group-hover:opacity-100 group-hover:h-2 transition-all duration-300`}
              />

              {/* Efecto de pliegue / luz en la arista */}
              <div
                className={`absolute inset-y-0 ${
                  idx % 2 === 0 ? 'right-0 bg-black/20 w-3' : 'left-0 bg-white/10 w-3'
                } pointer-events-none`}
              />

              {/* Icono corporativo */}
              <div className="relative mb-2.5 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:scale-110 group-hover:bg-[#FC6412] group-hover:border-[#FC6412] transition-all duration-300 shadow-inner">
                <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>

              {/* Título en alta jerarquía */}
              <h3 className="text-xs lg:text-[13px] font-black tracking-wider text-white uppercase leading-snug group-hover:text-amber-200 transition-colors">
                {item.title}
              </h3>
            </Link>
          );
        })}
      </div>

      {/* Contenedor Móvil (< 768px): Cuadrícula ergonómica 2x2 adaptada al pulgar */}
      <div className="grid grid-cols-2 md:hidden gap-2 px-1 sm:px-1.5">
        {pillars.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.link}
              className={`flex flex-col items-center justify-center text-center p-2.5 sm:p-3.5 rounded-xl bg-gradient-to-b ${item.bgGradient} text-white shadow-md border-t-2 ${
                item.accentBar.includes('FC6412') ? 'border-t-[#FC6412]' : 'border-t-[#38BDF8]'
              } active:scale-[0.98] transition-transform`}
            >
              <div className="mb-1.5 p-2 rounded-lg bg-white/10">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-[11px] font-black tracking-wide uppercase text-white leading-tight">
                {item.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
