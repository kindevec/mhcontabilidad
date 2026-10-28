import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, ShieldCheck, FileSpreadsheet, Cpu, TrendingUp } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const StatsBanner: React.FC = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola Jorge Hernandez / MH Contabilidad, requiero agendar una asesoria contable y tributaria para mi negocio.')}`;

  return (
    <section className="w-full bg-[#005BB2] border-b border-blue-950/20 shadow-xs relative z-20 overflow-hidden text-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 lg:py-2.5 flex flex-col xl:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-6">
        {/* BLOQUE 1: Cifras Clave en Fondo Azul (A la izquierda) */}
        <div className="flex items-center justify-around sm:justify-start gap-4 sm:gap-6 shrink-0">
          {/* Cifra 1 */}
          <div className="flex items-center gap-2">
            <div className="text-lg sm:text-xl lg:text-[22px] font-black text-white tracking-tight leading-none">
              99.8%
            </div>
            <p className="text-[9.5px] sm:text-[10px] font-semibold text-sky-100 uppercase tracking-wider leading-tight">
              Cumplimiento SRI<br className="hidden sm:inline" /> sin multas
            </p>
          </div>

          {/* Cifra 2 */}
          <div className="flex items-center gap-2">
            <div className="text-lg sm:text-xl lg:text-[22px] font-black text-white tracking-tight leading-none">
              +10 Años
            </div>
            <p className="text-[9.5px] sm:text-[10px] font-semibold text-sky-100 uppercase tracking-wider leading-tight">
              Experiencia<br className="hidden sm:inline" /> contable real
            </p>
          </div>
        </div>

        {/* BLOQUE 2: 4 Íconos Limpios con Título PERFECTAMENTE CENTRADOS (sin líneas de separación) */}
        <div className="flex-1 flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 my-1 xl:my-0">
          {/* Ícono 1 */}
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-200 shrink-0 drop-shadow-xs" />
            <span className="text-[11px] sm:text-xs font-bold text-white leading-tight whitespace-nowrap">
              Blindaje SRI
            </span>
          </div>

          {/* Ícono 2 */}
          <div className="flex items-center gap-1.5">
            <FileSpreadsheet className="w-4 h-4 text-sky-200 shrink-0 drop-shadow-xs" />
            <span className="text-[11px] sm:text-xs font-bold text-white leading-tight whitespace-nowrap">
              Balances & NIIF
            </span>
          </div>

          {/* Ícono 3 */}
          <div className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-sky-200 shrink-0 drop-shadow-xs" />
            <span className="text-[11px] sm:text-xs font-bold text-white leading-tight whitespace-nowrap">
              Facturación & ERP
            </span>
          </div>

          {/* Ícono 4 */}
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-sky-200 shrink-0 drop-shadow-xs" />
            <span className="text-[11px] sm:text-xs font-bold text-white leading-tight whitespace-nowrap">
              Asesoría Pymes
            </span>
          </div>
        </div>

        {/* BLOQUE 3: Botones de Acción en Naranja (A la derecha) */}
        <div className="flex items-center gap-2 shrink-0 pt-0.5 xl:pt-0">
          {/* Botón 1: Ver Servicios (Naranja) */}
          <Link
            to="/servicios"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-none text-[11px] font-bold text-white bg-[#FC6412] hover:bg-[#e05308] border border-orange-400/40 transition-all shadow-xs hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span>Ver Servicios</span>
            <ArrowRight className="w-3 h-3 text-white" />
          </Link>

          {/* Botón 2: Agendar Asesoría (Naranja) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-none text-[11px] font-bold text-white bg-[#FC6412] hover:bg-[#e05308] border border-orange-400/40 transition-all shadow-xs hover:-translate-y-0.5 whitespace-nowrap"
            title="Agendar Asesoría"
          >
            <MessageSquare className="w-3 h-3 text-white" />
            <span>Agendar Asesoría</span>
          </a>
        </div>
      </div>
    </section>
  );
};
