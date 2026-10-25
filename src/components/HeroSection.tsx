import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileCheck,
  Layers,
  MessageSquare,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import heroImg from '../assets/images/hero_contabilidad_asesoria_1792699795005.jpg';

export const HeroSection: React.FC = () => {
  const whatsappGeneralUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
    'Hola Jorge Hernández / MH Contabilidad, requiero asesoría contable y tributaria personalizada.'
  )}`;

  return (
    <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] items-center relative">
          
          {/* Columna Izquierda: Título Principal, Descripción, Acciones y Métricas */}
          <div className="lg:col-span-7 py-6 sm:py-8 lg:py-10 flex flex-col justify-between space-y-8 z-10 relative">
            <div className="w-28 sm:w-36 h-28 sm:h-36 rounded-full border-2 border-[#005BB2]/15 absolute top-2 -left-4 pointer-events-none -z-10" />

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-extrabold text-[#172B3A] tracking-tight leading-[1.12]">
                Gestión contable rigurosa y cumplimiento tributario estratégico
              </h1>

              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-lg pt-1">
                Brindamos asesoría especializada a empresas y profesionales independientes en Ecuador.
                Mantenemos sus cuentas al día, aseguramos el cumplimiento puntual de sus obligaciones ante el
                SRI y proporcionamos información financiera oportuna para impulsar su negocio.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] active:bg-[#c94703] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <span>Solicitar asesoría</span>
                </Link>

                <a
                  href={whatsappGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-semibold text-[#005BB2] hover:text-[#004a91] transition-colors group whitespace-nowrap"
                >
                  <span className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200/60 flex items-center justify-center text-[#005BB2] shadow-2xs group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4 fill-[#005BB2]/20" />
                  </span>
                  <span>Contáctenos ahora</span>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 relative">
              <div className="w-9 h-9 rounded-full border-2 border-[#005BB2]/20 absolute -bottom-2 -left-2 pointer-events-none hidden sm:block" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-[#172B3A]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#EBF3FA] text-[#005BB2] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-extrabold text-[#172B3A] leading-tight">100%</div>
                    <div className="text-[11px] text-[#64748B] font-medium">Cumplimiento SRI</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#EBF3FA] text-[#005BB2] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-extrabold text-[#172B3A] leading-tight">NIIF</div>
                    <div className="text-[11px] text-[#64748B] font-medium">Orden Contable</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#FFF0E6] text-[#FC6412] flex items-center justify-center shrink-0 border border-orange-100 shadow-2xs">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-extrabold text-[#172B3A] leading-tight">ERP</div>
                    <div className="text-[11px] text-[#64748B] font-medium">Perseo & Sistemas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: ÚNICA FORMA para la imagen en azul corporativo con corte diagonal */}
          <div className="lg:col-span-5 relative flex items-end justify-center min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] overflow-hidden">
            <div className="absolute inset-0 bg-[#005BB2] lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0%_100%)] z-0 rounded-2xl lg:rounded-none">
              <div className="absolute top-10 right-10 w-72 h-72 rounded-full border-2 border-white/20 pointer-events-none" />
              <div className="absolute top-20 right-20 w-52 h-52 rounded-full border border-white/25 pointer-events-none" />
              <div className="absolute top-36 right-36 w-28 h-28 rounded-full border border-white/30 pointer-events-none" />
            </div>

            <div className="relative z-10 w-full h-full flex items-end justify-center lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0%_100%)]">
              <img
                src={heroImg}
                alt="Asesoría contable personalizada de MH Contabilidad en Ecuador"
                className="w-full h-80 sm:h-96 lg:h-[500px] object-cover object-top drop-shadow-xl"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="absolute -bottom-0.5 left-0 right-0 w-full z-20 pointer-events-none">
              <svg
                viewBox="0 0 1440 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-16 sm:h-24 text-white"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,180 L0,80 Q720,160 1440,30 L1440,180 Z"
                  fill="#FFFFFF"
                />
              </svg>
              <div className="absolute bottom-3 right-8 w-8 h-8 rounded-full border-2 border-[#005BB2]/30 pointer-events-none hidden sm:block" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
