import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Layers,
  CheckCircle2,
  Server,
  MessageSquare,
  Sparkles,
  Menu,
  X,
  PhoneCall,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { MHLogo } from '../components/MHLogo';
import { ServicesCarousel } from '../components/ServicesCarousel';
import { motion, AnimatePresence } from 'motion/react';
import heroImg from '../assets/images/hero_contabilidad_asesoria_1792699795005.jpg';
import consultingTeamImg from '../assets/images/corporate_consulting_team_1792700513952.jpg';

export const HomePage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappGeneralUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
    'Hola Jorge Hernández / MH Contabilidad, requiero asesoría contable y tributaria personalizada.'
  )}`;
  return (
    <div className="space-y-0">
      {/* 1. Hero Principal sin contenedores exteriores: única forma de fondo para la imagen derecha */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] items-center relative">
            
            {/* Columna Izquierda: Título Principal, Descripción, Acciones y Métricas */}
            <div className="lg:col-span-7 py-6 sm:py-8 lg:py-10 flex flex-col justify-between space-y-8 z-10 relative">
              {/* Anillo decorativo tenue detrás del titular (igual a la referencia) */}
              <div className="w-28 sm:w-36 h-28 sm:h-36 rounded-full border-2 border-[#005BB2]/15 absolute top-2 -left-4 pointer-events-none -z-10" />

              <div className="space-y-4">
                {/* Título de Impacto en Gran Tamaño */}
                <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-extrabold text-[#172B3A] tracking-tight leading-[1.12]">
                  Gestión contable rigurosa y cumplimiento tributario estratégico
                </h1>

                {/* Bajada Descriptiva */}
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-lg pt-1">
                  Brindamos asesoría especializada a empresas y profesionales independientes en Ecuador.
                  Mantenemos sus cuentas al día, aseguramos el cumplimiento puntual de sus obligaciones ante el
                  SRI y proporcionamos información financiera oportuna para impulsar su negocio.
                </p>

                {/* Fila de Botones: Pill Principal + Botón Secundario con Ícono Circular */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  {/* Botón Principal (Get Started) */}
                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] active:bg-[#c94703] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    <span>Solicitar asesoría</span>
                  </Link>

                  {/* Botón Secundario (Call us now!) */}
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

              {/* Fila de 3 Métricas con Íconos Circulares (50+ Clinics, 2K+ Doctors, 50K+ Patients) */}
              <div className="pt-6 border-t border-slate-100 relative">
                {/* Pequeño círculo decorativo en la base izquierda */}
                <div className="w-9 h-9 rounded-full border-2 border-[#005BB2]/20 absolute -bottom-2 -left-2 pointer-events-none hidden sm:block" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-[#172B3A]">
                  {/* Stat 1 */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#EBF3FA] text-[#005BB2] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-extrabold text-[#172B3A] leading-tight">100%</div>
                      <div className="text-[11px] text-[#64748B] font-medium">Cumplimiento SRI</div>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#EBF3FA] text-[#005BB2] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-extrabold text-[#172B3A] leading-tight">NIIF</div>
                      <div className="text-[11px] text-[#64748B] font-medium">Orden Contable</div>
                    </div>
                  </div>

                  {/* Stat 3 */}
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

            {/* Columna Derecha: ÚNICA FORMA para la imagen en fondo azul corporativo con corte diagonal */}
            <div className="lg:col-span-5 relative flex items-end justify-center min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] overflow-hidden">
              {/* Forma Azul Corporativa con Corte Diagonal (única forma del hero) */}
              <div className="absolute inset-0 bg-[#005BB2] lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0%_100%)] z-0 rounded-2xl lg:rounded-none">
                {/* Anillos concéntricos blancos translúcidos dentro de la forma */}
                <div className="absolute top-10 right-10 w-72 h-72 rounded-full border-2 border-white/20 pointer-events-none" />
                <div className="absolute top-20 right-20 w-52 h-52 rounded-full border border-white/25 pointer-events-none" />
                <div className="absolute top-36 right-36 w-28 h-28 rounded-full border border-white/30 pointer-events-none" />
              </div>

              {/* Fotografía de Jorge Hernández y Equipo Contable Integrado Sin Caja Rígida */}
              <div className="relative z-10 w-full h-full flex items-end justify-center lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0%_100%)]">
                <img
                  src={heroImg}
                  alt="Asesoría contable personalizada de MH Contabilidad en Ecuador"
                  className="w-full h-80 sm:h-96 lg:h-[500px] object-cover object-top drop-shadow-xl"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Curva / Onda Blanca Inferior que corta la base del equipo de forma orgánica */}
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
                {/* Pequeño círculo decorativo en la curva blanca inferior derecha (idéntico a la referencia) */}
                <div className="absolute bottom-3 right-8 w-8 h-8 rounded-full border-2 border-[#005BB2]/30 pointer-events-none hidden sm:block" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Sección Resumen Institucional con Enlace a Nosotros */}
      <section className="py-20 bg-[#F3F6FA] border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
                <span className="w-2.5 h-0.5 bg-[#FC6412]" />
                <span>Sobre la Firma</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B3A] tracking-tight">
                Una relación de confianza construida con rigor y confidencialidad
              </h2>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Representada por <strong>Jorge Hernández</strong>, MH Contabilidad se enfoca en brindar
                un servicio preventivo y cercano. Trabajamos con empresas, emprendedores y profesionales
                que buscan no solo cumplir formalidades con el SRI, sino comprender sus balances para tomar
                decisiones seguras.
              </p>
              <div className="pt-2">
                <Link
                  to="/nosotros"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold text-[#005BB2] bg-white border border-slate-200 hover:bg-blue-50 hover:border-[#005BB2]/40 transition-all shadow-xs"
                >
                  <span>Conocer nuestra firma y valores</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-white">
                <img
                  src={consultingTeamImg}
                  alt="Equipo y representante Jorge Hernández en reunión con clientes"
                  className="w-full h-72 sm:h-80 object-cover object-top"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Carrusel Moderno de Servicios Destacados */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#FC6412]" />
              <span>Servicios Destacados</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B3A] tracking-tight">
              Portafolio Integral para su Empresa
            </h2>
            <p className="text-sm text-[#64748B]">
              Explore las áreas de práctica profesional disponibles para personas naturales y sociedades en Ecuador.
            </p>
          </div>

          {/* Carrusel interactivo responsive */}
          <ServicesCarousel />
        </div>
      </section>

      {/* 4. Bloque Destacado de Portal Clientes */}
      <section className="py-16 bg-[#005BB2] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-300 uppercase tracking-wider">
                <Server className="w-4 h-4" />
                <span>Interoperabilidad Contable</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Portal Clientes y Conectividad con Software Contable
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-2xl">
                Facilitamos la conciliación de sus comprobantes electrónicos y el enlace con sistemas como
                Perseo ERP para mantener su contabilidad permanentemente al día.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                to="/portal-clientes"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold text-[#172B3A] bg-white hover:bg-slate-100 hover:-translate-y-0.5 transition-all shadow-sm"
              >
                <span>Acceder al Portal de Clientes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Llamada a la Acción Final hacia Contacto */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
            <span className="w-2.5 h-0.5 bg-[#FC6412]" />
            <span>Atención Inmediata</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172B3A] tracking-tight">
            ¿Listo para ordenar la contabilidad de su negocio?
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Comuníquese con nosotros hoy mismo. Evaluamos su estado tributario actual y le brindamos una
            propuesta de acompañamiento integral adaptada a sus obligaciones fiscales.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 transition-all shadow-xs"
            >
              <span>Ir a la página de Contacto</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
                'Hola Jorge Hernández / MH Contabilidad, quisiera agendar una asesoría contable.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#005BB2] bg-blue-50/70 hover:bg-blue-100 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
