import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceCategories, servicesData } from '../data/services';
import { siteConfig } from '../data/siteConfig';
import { ServiceItem } from '../types';
import {
  Calculator,
  FileText,
  TrendingUp,
  Building2,
  ShieldCheck,
  Receipt,
  PieChart,
  Briefcase,
  MessageSquare,
  Check,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import heroImg from '../assets/images/hero_contabilidad_asesoria_1792699795005.jpg';

export const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredServices =
    selectedCategory === 'all'
      ? servicesData
      : servicesData.filter((s) => s.category === selectedCategory);

  const getServiceIcon = (iconName: ServiceItem['iconName']) => {
    const props = { className: 'w-6 h-6 text-[#005BB2]' };
    switch (iconName) {
      case 'Calculator':
        return <Calculator {...props} />;
      case 'FileText':
        return <FileText {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'Building2':
        return <Building2 {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Receipt':
        return <Receipt {...props} />;
      case 'PieChart':
        return <PieChart {...props} />;
      case 'Briefcase':
        return <Briefcase {...props} />;
      default:
        return <Calculator {...props} />;
    }
  };

  const createWhatsAppUrl = (message: string) => {
    return `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-0">
      {/* 1. Encabezado de Servicios sin contenedores: única forma para la imagen derecha */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] items-center relative">
            
            {/* Columna Izquierda: Información de Servicios */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 py-6 sm:py-8 lg:py-10 flex flex-col justify-between space-y-6 z-10 relative"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
                  <span className="w-2.5 h-0.5 bg-[#FC6412]" />
                  <span>Catálogo Profesional</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>MH Contabilidad</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172B3A] tracking-tight leading-[1.15]">
                  Servicios Contables, Tributarios y Financieros
                </h1>

                <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl">
                  Soluciones integrales diseñadas para garantizar el estricto cumplimiento tributario ante el
                  SRI y proporcionar orden contable y financiero a empresas y profesionales independientes en Ecuador.
                </p>
              </div>

              {/* Badges de Especialidades */}
              <div className="pt-6 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs text-[#172B3A]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#EBF3FA] text-[#005BB2] flex items-center justify-center shrink-0 border border-blue-100">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">Contabilidad</strong>
                      <span className="text-slate-500 text-[11px]">NIIF & Balances</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#EBF3FA] text-[#005BB2] flex items-center justify-center shrink-0 border border-blue-100">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">Tributación SRI</strong>
                      <span className="text-slate-500 text-[11px]">Declaraciones & Anexos</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#FFF0E6] text-[#FC6412] flex items-center justify-center shrink-0 border border-orange-100">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">Finanzas</strong>
                      <span className="text-slate-500 text-[11px]">Control Estratégico</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Columna Derecha: ÚNICA FORMA azul para la imagen con corte diagonal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:col-span-5 relative flex items-end justify-center min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#005BB2] lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0%_100%)] z-0 rounded-2xl lg:rounded-none">
                <div className="absolute top-8 right-8 w-60 h-60 rounded-full border-2 border-white/20 pointer-events-none" />
                <div className="absolute top-16 right-16 w-40 h-40 rounded-full border border-white/25 pointer-events-none" />
              </div>

              <div className="relative z-10 w-full h-full flex items-end justify-center lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0%_100%)]">
                <img
                  src={heroImg}
                  alt="Servicios contables y tributarios profesionales en Ecuador"
                  className="w-full h-72 sm:h-80 lg:h-[420px] object-cover object-top drop-shadow-xl"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Curva / Onda Blanca Inferior */}
              <div className="absolute -bottom-0.5 left-0 right-0 w-full z-20 pointer-events-none">
                <svg
                  viewBox="0 0 1440 180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-14 sm:h-20 text-white"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,180 L0,80 Q720,160 1440,30 L1440,180 Z"
                    fill="#FFFFFF"
                  />
                </svg>
                <div className="absolute bottom-2 right-8 w-7 h-7 rounded-full border-2 border-[#005BB2]/30 pointer-events-none hidden sm:block" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. Catálogo Interactivo con Pestañas y Animación */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Barra de Filtros */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12" role="tablist">
            {serviceCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005BB2] ${
                    isActive
                      ? 'bg-[#005BB2] text-white shadow-xs'
                      : 'bg-slate-100 text-[#172B3A] hover:bg-slate-200/80'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Grilla de Tarjetas con Transiciones Fluidas */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => {
                const waUrl = createWhatsAppUrl(service.whatsappMessage);
                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    whileHover={{ y: -4 }}
                    className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 hover:border-[#005BB2]/50 hover:shadow-lg transition-all duration-300 text-left"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-blue-50/80 group-hover:bg-[#005BB2] text-[#005BB2] group-hover:text-white transition-colors duration-200">
                          {getServiceIcon(service.iconName)}
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          {service.categoryLabel}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#172B3A] group-hover:text-[#005BB2] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-[#64748B] leading-relaxed mt-2">
                          {service.description}
                        </p>
                      </div>

                      {/* Entregables y puntos clave */}
                      <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-[#172B3A]">
                        {service.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#FC6412] shrink-0 mt-0.5" />
                            <span className="text-slate-600">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Acciones */}
                    <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 transition-all shadow-2xs"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Consultar por WhatsApp</span>
                      </a>

                      <Link
                        to="/contacto"
                        className="hidden sm:inline-flex items-center text-xs font-semibold text-[#005BB2] hover:underline"
                      >
                        <span>Formulario formal →</span>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 3. Preguntas Frecuentes Contables y Tributarias de Ecuador */}
      <section className="py-16 bg-[#F3F6FA] border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Dudas Frecuentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B3A]">
              Preguntas Frecuentes sobre la Gestión Contable
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold text-[#172B3A]">
                ¿Quiénes están obligados a llevar contabilidad en Ecuador?
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                De acuerdo a la Ley de Régimen Tributario Interno, están obligadas a llevar contabilidad todas
                las sociedades y las personas naturales que operen con un capital propio superior a $180,000,
                tengan ingresos brutos anuales superiores a $300,000 o costos y gastos anuales superiores a $240,000.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold text-[#172B3A]">
                ¿Cómo funciona el régimen RIMPE (Negocio Popular vs. Emprendedor)?
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                El RIMPE Negocio Popular aplica a personas naturales con ingresos brutos de hasta $20,000 anuales.
                El RIMPE Emprendedor aplica a personas y sociedades con ingresos entre $20,001 y $300,000 anuales.
                En MH Contabilidad le ayudamos a clasificar correctamente sus actividades para aplicar las tarifas
                impositivas y retenciones correctas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold text-[#172B3A]">
                ¿Qué necesito para migrar mi contabilidad a MH Contabilidad?
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Únicamente necesitamos su clave de acceso al SRI en Línea, los últimos estados financieros o
                declaraciones presentadas, y su archivo de comprobantes electrónicos. Nosotros nos encargamos de
                la revisión, conciliación de saldos y continuidad ordenada.
              </p>
            </div>
          </div>

          {/* Banner de Llamada a Contacto */}
          <div className="text-center pt-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold text-white bg-[#005BB2] hover:bg-[#004a91] hover:-translate-y-0.5 transition-all shadow-xs"
            >
              <span>Solicitar cotización personalizada de servicios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
