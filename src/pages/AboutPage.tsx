import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import {
  Shield,
  Clock,
  Lock,
  CheckCircle,
  Target,
  Compass,
  ArrowRight,
  UserCheck,
  Search,
  FileSpreadsheet,
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import consultingTeamImg from '../assets/images/corporate_consulting_team_1792700513952.jpg';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 1. Encabezado sin contenedores: única forma para la imagen derecha */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] items-center relative">
            
            {/* Columna Izquierda: Información Institucional */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 py-6 sm:py-8 lg:py-10 flex flex-col justify-between space-y-6 z-10 relative"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
                  <span className="w-2.5 h-0.5 bg-[#FC6412]" />
                  <span>Página Institucional</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>MH Contabilidad</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172B3A] tracking-tight leading-[1.15]">
                  Nosotros: Rigor, ética y cercanía profesional
                </h1>

                <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl">
                  Conozca la filosofía de trabajo, los valores éticos y el compromiso que rige cada servicio
                  en MH Contabilidad, bajo la representación de Jorge Hernández.
                </p>
              </div>

              {/* Badges de Respaldo */}
              <div className="pt-6 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs text-[#172B3A]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#EBF3FA] text-[#005BB2] flex items-center justify-center shrink-0 border border-blue-100">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">Jorge Hernández</strong>
                      <span className="text-slate-500 text-[11px]">Representante</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#EBF3FA] text-[#005BB2] flex items-center justify-center shrink-0 border border-blue-100">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">Normativa Vigente</strong>
                      <span className="text-slate-500 text-[11px]">SRI & NIIF</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#FFF0E6] text-[#FC6412] flex items-center justify-center shrink-0 border border-orange-100">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">Cobertura</strong>
                      <span className="text-slate-500 text-[11px]">Nacional Ecuador</span>
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
                  src={consultingTeamImg}
                  alt="Equipo y representante Jorge Hernández en reunión con clientes"
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

      {/* 2. Presentación y Filosofía de Trabajo */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B3A]">
                Nuestra Firma
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                <strong className="text-[#172B3A]">MH Contabilidad</strong> nació con el propósito fundamental
                de brindar a empresas, profesionales y negocios en Ecuador una asesoría contable transparente,
                eficiente y oportuna. Comprendemos que las normas tributarias emitidas por el SRI y los organismos
                de control exigen precisión absoluta para salvaguardar la estabilidad de cada negocio.
              </p>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Nuestra filosofía se basa en la <strong className="text-[#005BB2]">atención personalizada</strong>.
                No tratamos los balances como simples números fríos; acompañamos a los contribuyentes a comprender
                la salud financiera de sus operaciones, planificar sus impuestos dentro del marco legal vigente y
                prevenir cualquier contingencia o sanción económica.
              </p>

              {/* Perfil Representante */}
              <div className="p-5 rounded-2xl bg-[#F3F6FA] border border-slate-200/90 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#005BB2] text-white shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#172B3A]">
                    Representante: {siteConfig.representative}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Profesional a cargo de la gestión, revisión y validación de los servicios contables y
                    tributarios. Comunicación directa sin filtros para resolver inquietudes inmediatas de cada cliente.
                  </p>
                </div>
              </div>
            </div>

            {/* Misión y Visión */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-[#005BB2]">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#172B3A]">Nuestra Misión</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Proporcionar servicios contables, tributarios y de consultoría financiera con los más altos
                  estándares de calidad y responsabilidad profesional, facilitando a nuestros clientes el
                  cumplimiento cabal de sus deberes formales y el control óptimo de sus recursos económicos.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-orange-50 text-[#FC6412]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#172B3A]">Nuestra Visión</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Consolidarnos como la firma contable de referencia y confianza para el ecosistema productivo y
                  profesional de Ecuador, destacándonos por la solidez técnica, la ética inquebrantable y la
                  adopción progresiva de herramientas tecnológicas e interoperabilidad contable.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Valores Fundamentales */}
      <section className="py-16 bg-[#F3F6FA] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B3A]">
              Valores que Rigen Nuestra Práctica
            </h2>
            <p className="text-sm text-[#64748B]">
              Principios innegociables aplicados en la custodia y procesamiento de su información contable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="p-3 w-fit rounded-xl bg-blue-50 text-[#005BB2]">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#172B3A]">Integridad Absoluta</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Actuamos con apego estricto a las leyes tributarias y normas contables, ofreciendo claridad en cada balance.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="p-3 w-fit rounded-xl bg-orange-50 text-[#FC6412]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#172B3A]">Puntualidad en Plazos</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Anticipamos los calendarios de vencimiento del SRI para que sus declaraciones se presenten siempre a tiempo.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="p-3 w-fit rounded-xl bg-blue-50 text-[#005BB2]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#172B3A]">Confidencialidad Total</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Garantizamos reserva y secreto profesional respecto a la situación patrimonial y documental del cliente.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="p-3 w-fit rounded-xl bg-orange-50 text-[#FC6412]">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#172B3A]">Atención Directa</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Acompañamiento sin intermediarios burocráticos; comunicación ágil a través de canales modernos como WhatsApp.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Nuestra Metodología de Acompañamiento Paso a Paso */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
              <span className="w-2.5 h-0.5 bg-[#FC6412]" />
              <span>Metodología</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B3A]">
              ¿Cómo gestionamos sus obligaciones contables?
            </h2>
            <p className="text-sm text-[#64748B]">
              Un proceso estructurado para llevar orden, trazabilidad y control a su negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3 relative hover:border-[#005BB2]/40 transition-colors">
              <div className="text-2xl font-black text-[#005BB2]/20 font-mono">01</div>
              <div className="flex items-center gap-2 font-bold text-sm text-[#172B3A]">
                <Search className="w-4 h-4 text-[#005BB2]" />
                <span>Diagnóstico Inicial</span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Revisión del estado de su RUC, declaraciones históricas ante el SRI y detección de inconsistencias o pasivos fiscales pendientes.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3 relative hover:border-[#FC6412]/40 transition-colors">
              <div className="text-2xl font-black text-[#FC6412]/20 font-mono">02</div>
              <div className="flex items-center gap-2 font-bold text-sm text-[#172B3A]">
                <FileSpreadsheet className="w-4 h-4 text-[#FC6412]" />
                <span>Regularización y Libros</span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Clasificación de comprobantes de venta y compra, actualización de libros diarios, mayores y asientos de ajuste correspondientes.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3 relative hover:border-[#005BB2]/40 transition-colors">
              <div className="text-2xl font-black text-[#005BB2]/20 font-mono">03</div>
              <div className="flex items-center gap-2 font-bold text-sm text-[#172B3A]">
                <CalendarCheck className="w-4 h-4 text-[#005BB2]" />
                <span>Declaración Mensual</span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Liquidación oportuna de IVA, retenciones en la fuente y anexos transaccionales (ATS) antes de las fechas límite establecidas.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3 relative hover:border-[#FC6412]/40 transition-colors">
              <div className="text-2xl font-black text-[#FC6412]/20 font-mono">04</div>
              <div className="flex items-center gap-2 font-bold text-sm text-[#172B3A]">
                <CheckCircle2 className="w-4 h-4 text-[#FC6412]" />
                <span>Reportes y Asesoría</span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Entrega de estados financieros claros y recomendaciones estratégicas para optimizar la estructura financiera de su actividad.
              </p>
            </div>
          </div>

          {/* Banner de Enlace a Contacto */}
          <div className="mt-16 p-8 rounded-2xl bg-[#005BB2] text-white text-center max-w-3xl mx-auto space-y-4 shadow-sm">
            <h3 className="text-xl font-bold">
              ¿Desea iniciar una revisión de su situación tributaria?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
              Agende una reunión telemática o presencial con Jorge Hernández para evaluar las necesidades
              particulares de su empresa.
            </p>
            <div className="pt-2">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold text-[#172B3A] bg-white hover:bg-slate-100 hover:-translate-y-0.5 transition-all shadow-xs"
              >
                <span>Ir al formulario de contacto</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
