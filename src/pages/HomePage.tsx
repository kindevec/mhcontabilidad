import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Server,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { ServicesCarousel } from '../components/ServicesCarousel';
import { HeroSection } from '../components/HeroSection';
import { StatsBanner } from '../components/StatsBanner';
import teamGroupImg from '../assets/images/equipo_mh_completo_panoramico.jpg';
import { motion, AnimatePresence } from 'motion/react';

export const HomePage: React.FC = () => {
  const [isTeamHovered, setIsTeamHovered] = useState(false);

  const whatsappGeneralUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
    'Hola Jorge Hernández / MH Contabilidad, requiero asesoría contable y tributaria personalizada.'
  )}`;

  return (
    <div className="space-y-0">
      {/* 1. Hero Principal de Alto Impacto */}
      <HeroSection />

      {/* Franja Bicolor de Dos Colores con Cifras y Respaldo Estratégico */}
      <StatsBanner />

      {/* 2. Sección Quiénes Somos / Nuestra Convicción con foto grupal que empieza después del título y contenedor interactivo centrado */}
      <section className="relative bg-[#F8FAFC] border-y border-slate-200/80 overflow-hidden">
        {/* Encabezado: Título limpio centrado sin flechas que precede a la imagen */}
        <div className="text-center pt-8 sm:pt-9 pb-4 sm:pb-5 relative z-10 bg-[#F8FAFC]">
          <h2 className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#005BB2] uppercase">
            QUIÉNES SOMOS
          </h2>
        </div>

        {/* Banner con la imagen del equipo que inicia estrictamente después del título */}
        <div className="relative w-full overflow-hidden bg-slate-900 group">
          {/* Foto grupal completa como fondo anclada arriba para que no se corten las cabezas */}
          <div className="absolute inset-0 z-0">
            <img
              src={teamGroupImg}
              alt="Equipo de consultores y asesores de MH Contabilidad en Ecuador"
              className="w-full h-full object-cover object-center filter brightness-[0.88] transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {/* Overlay sutil para realzar la nitidez de la foto y el contenedor */}
            <div className="absolute inset-0 bg-slate-950/40 transition-colors duration-500 group-hover:bg-slate-950/55" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-48 pb-6 sm:pb-8 lg:pb-10 flex justify-center items-end min-h-[420px] sm:min-h-[460px] lg:min-h-[500px]">
            {/* Contenedor Azul Semitransparente Cuadrado: Se expande ÚNICAMENTE al pasar el mouse sobre él */}
            <motion.div
              layout
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onMouseEnter={() => setIsTeamHovered(true)}
              onMouseLeave={() => setIsTeamHovered(false)}
              className="w-full max-w-2xl bg-[#002D5A]/85 hover:bg-[#002D5A]/95 backdrop-blur-md text-white p-6 sm:p-7 lg:p-8 rounded-none shadow-2xl border border-white/20 transition-all space-y-4 cursor-pointer"
            >
              {/* Frase / Convicción principal: Directa sin contenedor interior */}
              <p className="text-white font-bold text-sm sm:text-base lg:text-[16px] leading-relaxed tracking-tight text-center sm:text-left drop-shadow-sm">
                “Nacimos con una convicción clara: la contabilidad no debería ser un dolor de cabeza, sino la herramienta más poderosa para tu crecimiento.”
              </p>

              {/* Indicador interactivo en estado de reposo (cuando no se pasa el mouse) */}
              {!isTeamHovered && (
                <div className="flex items-center justify-center gap-2 pt-1 text-[11px] sm:text-xs text-sky-200/90 font-medium tracking-wide">
                  <span>Pasa el cursor aquí para ver la información completa</span>
                  <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                </div>
              )}

              {/* Contenido completo que se despliega al pasar el mouse por la imagen */}
              <AnimatePresence>
                {isTeamHovered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="space-y-4 overflow-hidden pt-1"
                  >
                    <p className="text-xs sm:text-[13px] text-slate-100 leading-relaxed font-normal">
                      En el mundo de los negocios, detrás de cada gran idea, de cada pyme que se consolida y de cada mediana empresa que se expande, hay una realidad inevitable: los números. Sin embargo, sabemos que tú no fundaste tu negocio para pasar horas ordenando facturas, descifrando leyes fiscales complejas o preocupándote por sorpresas de última hora con los impuestos.
                    </p>

                    <p className="text-xs sm:text-[13px] text-slate-100 leading-relaxed font-normal">
                      Somos una firma de servicios contables y fiscales diseñada específicamente para ser el respaldo de autónomos, pymes y medianas empresas. Nos alejamos del modelo del contador tradicional y distante que solo aparece a final de mes. Nos convertimos en tus aliados estratégicos cotidianos, combinando el máximo rigor técnico con un trato cercano, humano y sin tecnicismos difíciles de entender.
                    </p>

                    {/* Botones de acción completos cuadrados centrados */}
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <Link
                        to="/nosotros"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none text-xs font-bold text-white bg-[#FC6412] hover:bg-[#e05308] active:bg-[#c94703] transition-all shadow-md hover:-translate-y-0.5 whitespace-nowrap"
                      >
                        <span>Conocer más sobre nosotros</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={whatsappGeneralUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-none text-xs font-bold text-white bg-white/15 hover:bg-white/25 border border-white/30 transition-all shadow-xs whitespace-nowrap"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-white" />
                        <span>Hablar con un asesor</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Sección Nuestros Servicios: contenida estrictamente dentro de su propio bloque */}
      <section className="relative isolate z-10 py-12 sm:py-16 bg-white overflow-hidden border-y border-slate-100">
        <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Encabezado visible en móvil donde el ancho de pantalla es compacto */}
          <div className="lg:hidden text-center mb-6 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#FC6412]" />
              <span>Nuestros Servicios</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#172B3A]">
              Soluciones Integrales para Tu Empresa
            </h2>
            <p className="text-xs text-[#64748B]">
              Mantén el orden contable, blinda tu negocio y automatiza tu facturación.
            </p>
          </div>

          <ServicesCarousel
            centerLabel={
              <div className="hidden lg:flex flex-col justify-center items-start text-left max-w-md ml-auto pr-4 space-y-5 pointer-events-auto">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#FC6412]" />
                  <span>Nuestros 5 Servicios Oficiales</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B3A] tracking-tight leading-tight">
                  Soluciones Integrales para Tu Empresa
                </h2>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  Acompañamos a autónomos, pymes y medianas empresas con orden contable riguroso, blindaje tributario y herramientas tecnológicas avanzadas.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    to="/servicios"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#005BB2] hover:bg-[#004a91] transition-all shadow-sm"
                  >
                    <span>Ver catálogo de servicios</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={whatsappGeneralUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-bold text-[#172B3A] bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#FC6412]" />
                    <span>Hablar con un asesor</span>
                  </a>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* 4. Bloque Destacado de Web de Sistema */}
      <section className="py-16 bg-[#005BB2] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-300 uppercase tracking-wider">
                <Server className="w-4 h-4" />
                <span>Web de Sistema</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Acceso a la Plataforma y Sistema Contable
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-2xl">
                Accede directamente a la plataforma en línea para sincronizar comprobantes, consultar reportes
                y gestionar tus operaciones comerciales en tiempo real.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end gap-3">
              <a
                href={siteConfig.systemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold text-[#172B3A] bg-white hover:bg-slate-100 hover:-translate-y-0.5 transition-all shadow-sm"
              >
                <span>Abrir Web de Sistema</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Llamada a la Acción Final hacia WhatsApp */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
            <span className="w-2.5 h-0.5 bg-[#FC6412]" />
            <span>Cercanía Proactiva</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172B3A] tracking-tight">
            Déjanos los números a nosotros. Concéntrate en crecer.
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            ¿Tienes dudas con tus declaraciones, facturación electrónica o necesitas poner al día tus libros contables?
            Escríbenos directamente y te asesoramos de forma personalizada.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 transition-all shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chatear por WhatsApp ({siteConfig.phone.display})</span>
            </a>

            <Link
              to="/contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#005BB2] bg-blue-50/70 hover:bg-blue-100 transition-colors"
            >
              <span>Ver medios de contacto</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
