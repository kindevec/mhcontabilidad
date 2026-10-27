import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import {
  Shield,
  Eye,
  TrendingUp,
  MessageSquare,
  Target,
  Compass,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import consultingTeamImg from '../assets/images/corporate_consulting_team_1792700513952.jpg';

export const AboutPage: React.FC = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
    'Hola Jorge Hernández / MH Contabilidad, me gustaría conversar sobre sus servicios contables y tributarios.'
  )}`;

  return (
    <div className="space-y-0">
      {/* 1. Encabezado Institucional */}
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
                  <span>Nuestra Firma</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>MH Contabilidad</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172B3A] tracking-tight leading-[1.15]">
                  Tu respaldo contable. <br />
                  <span className="text-[#005BB2]">Tu impulso estratégico.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl">
                  Somos una firma de servicios contables y fiscales diseñada específicamente para ser el respaldo de
                  autónomos, pymes y medianas empresas en Ecuador, bajo el liderazgo de {siteConfig.representative}.
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
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">{siteConfig.representative}</strong>
                      <span className="text-slate-500 text-[11px]">{siteConfig.businessEntity}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#EBF3FA] text-[#005BB2] flex items-center justify-center shrink-0 border border-blue-100">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">Precisión Segura</strong>
                      <span className="text-slate-500 text-[11px]">Rigor y cumplimiento</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#FFF0E6] text-[#FC6412] flex items-center justify-center shrink-0 border border-orange-100">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">Cercanía Proactiva</strong>
                      <span className="text-slate-500 text-[11px]">Trato humano directo</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Columna Derecha: Imagen Institucional */}
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
                  alt="Equipo de asesoría contable y tributaria MH Contabilidad"
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

      {/* 2. Quiénes Somos (Texto Oficial Completo) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
                <span className="w-2.5 h-0.5 bg-[#FC6412]" />
                <span>Nuestra Historia & Convicción</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B3A]">
                Quiénes Somos
              </h2>
              
              <div className="prose prose-slate max-w-none space-y-4 text-sm sm:text-base text-[#64748B] leading-relaxed">
                <p>
                  En el mundo de los negocios, detrás de cada gran idea, de cada pyme que se consolida y de cada
                  mediana empresa que se expande, hay una realidad inevitable: <strong>los números</strong>. Sin embargo,
                  sabemos que tú no fundaste tu negocio para pasar horas ordenando facturas, descifrando leyes
                  fiscales complejas o preocupándote por sorpresas de última hora con los impuestos.
                </p>
                <div className="p-5 rounded-2xl bg-[#FFF5EF] border border-[#FC6412]/20 text-[#172B3A] font-semibold text-base sm:text-lg">
                  "Nacimos con una convicción clara: la contabilidad no debería ser un dolor de cabeza, sino la herramienta más poderosa para tu crecimiento."
                </div>
                <p>
                  Somos una firma de servicios contables y fiscales diseñada específicamente para ser el respaldo de
                  autónomos, pymes y medianas empresas. Nos alejamos del modelo del contador tradicional y
                  distante que solo aparece a final de mes. Nos convertimos en tus aliados estratégicos cotidianos,
                  combinando el máximo rigor técnico con un trato cercano, humano y sin tecnicismos difíciles de entender.
                </p>
              </div>

              {/* Manifiesto y Cierre */}
              <div className="p-6 rounded-2xl bg-[#F3F6FA] border border-slate-200/90 space-y-3">
                <p className="text-sm font-semibold text-[#172B3A] italic">
                  "Creemos que cuando tienes tus números en orden, recuperas el control y el tiempo para hacer lo que mejor sabes hacer: liderar tu éxito."
                </p>
                <p className="text-base font-extrabold text-[#005BB2]">
                  Déjanos los números a nosotros. Concéntrate en crecer.
                </p>
              </div>
            </div>

            {/* Misión y Visión (Oficiales del PDF) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Misión */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-7 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#005BB2]" />
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-[#005BB2]">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Propósito Fundamental</span>
                    <h3 className="text-lg font-bold text-[#172B3A]">Misión</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  "Impulsar el éxito de autónomos, Pymes y medianas empresas simplificando su gestión contable y
                  fiscal. Brindando total tranquilidad y cumplimiento normativo, transformando los números en
                  información estratégica, clara y accesible para que nuestros clientes tomen decisiones seguras y se
                  enfoquen en hacer crecer su negocio."
                </p>
              </motion.div>

              {/* Visión */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-7 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FC6412]" />
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-orange-50 text-[#FC6412]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Dirección Futura</span>
                    <h3 className="text-lg font-bold text-[#172B3A]">Visión</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  "Ser la firma contable y el aliado estratégico de referencia para el tejido empresarial y los
                  profesionales independientes, reconocidos por redefinir la confianza financiera a través de la
                  innovación, la claridad absoluta y una cercanía que impulsa el desarrollo sostenible de cada
                  negocio."
                </p>
              </motion.div>

              {/* Diferenciador / Por qué contratarnos */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#005BB2] to-[#004282] text-white space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-300 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>¿Por qué contratarnos?</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-50 leading-relaxed italic">
                  "Nosotros nos diferenciamos porque creemos en la <strong>Claridad Absoluta</strong>: te explicamos tus números
                  sin enredos, y en la <strong>Cercanía Proactiva</strong>: te llamamos nosotros antes de que tú tengas que
                  buscarnos."
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Valores Comerciales (Oficiales del PDF) */}
      <section className="py-20 bg-[#F3F6FA] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
              <span className="w-2.5 h-0.5 bg-[#FC6412]" />
              <span>Nuestros Pilares</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172B3A]">
              Valores Comerciales
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
              No solo hacemos tu contabilidad; cambiamos la forma en que te relacionas con las finanzas de tu
              empresa a través de nuestros valores comerciales:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Claridad Absoluta */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 hover:border-[#005BB2]/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#005BB2] flex items-center justify-center font-bold">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#172B3A]">Claridad Absoluta</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mt-2">
                    Explicamos las finanzas y los impuestos en un idioma simple, directo y sin tecnicismos complejos.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] font-semibold text-[#005BB2]">
                Cero enredos fiscales
              </div>
            </motion.div>

            {/* 2. Cercanía Proactiva */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 hover:border-[#FC6412]/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FC6412] flex items-center justify-center font-bold">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#172B3A]">Cercanía Proactiva</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mt-2">
                    No somos el contador que solo aparece a fin de mes para pedir facturas. Monitoreamos activamente el negocio y nos anticipamos a los problemas o a las oportunidades de ahorro fiscal.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] font-semibold text-[#FC6412]">
                Te contactamos nosotros
              </div>
            </motion.div>

            {/* 3. Precisión Segura */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 hover:border-[#005BB2]/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#005BB2] flex items-center justify-center font-bold">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#172B3A]">Precisión Segura</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mt-2">
                    Aplicamos el máximo rigor técnico y actualización normativa en cada proceso para garantizar un cumplimiento fiscal impecable y sin errores.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] font-semibold text-[#005BB2]">
                Cero errores y multas
              </div>
            </motion.div>

            {/* 4. Visión de Crecimiento */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 hover:border-[#FC6412]/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FC6412] flex items-center justify-center font-bold">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#172B3A]">Visión de Crecimiento</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mt-2">
                    Diseñamos soluciones contables que se adaptan al tamaño actual del cliente, pero con la estructura necesaria para soportar su crecimiento futuro.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] font-semibold text-[#FC6412]">
                Estructura escalable
              </div>
            </motion.div>
          </div>

          {/* Banner de Llamada Directa a WhatsApp */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#005BB2] text-white text-center max-w-4xl mx-auto space-y-5 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-extrabold">
              ¿Listo para ordenar tus finanzas e impulsar tu crecimiento?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
              Comunícate directamente con Jorge Hernández por WhatsApp y recibe una atención cercana, ágil y transparente desde el primer día.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Escríbenos al {siteConfig.phone.display}</span>
              </a>
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 transition-all border border-white/20"
              >
                <span>Ver catálogo de servicios</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
