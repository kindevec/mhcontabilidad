import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { siteConfig } from '../data/siteConfig';
import { ServicesCarousel } from '../components/ServicesCarousel';
import { HeroSection } from '../components/HeroSection';
import { HeroAccordionBanner } from '../components/HeroAccordionBanner';
import { SystemAccessSection } from '../components/SystemAccessSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { LeaveNumbersSection } from '../components/LeaveNumbersSection';
import teamGroupImg from '../assets/images/equipo_mh_completo_panoramico.webp';
import { motion, AnimatePresence } from 'motion/react';

export const HomePage: React.FC = () => {
  const [isTeamHovered, setIsTeamHovered] = useState(false);
  const teamContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      if (
        isTeamHovered &&
        teamContainerRef.current &&
        !teamContainerRef.current.contains(e.target as Node)
      ) {
        setIsTeamHovered(false);
      }
    };

    document.addEventListener('click', handleOutsideInteraction);
    document.addEventListener('touchstart', handleOutsideInteraction);
    return () => {
      document.removeEventListener('click', handleOutsideInteraction);
      document.removeEventListener('touchstart', handleOutsideInteraction);
    };
  }, [isTeamHovered]);

  const whatsappGeneralUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola Jorge Hernandez / MH Contabilidad, requiero asesoria contable y tributaria personalizada.')}`;

  return (
    <div className="space-y-0">
      {/* 1. Hero Principal de Alto Impacto */}
      <HeroSection />

      {/* Cinta Acordeón Plegada 3D justo donde termina el Hero (calibrada más abajo) */}
      <div className="relative z-30 max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 lg:-mt-7 mb-6 sm:mb-8">
        <HeroAccordionBanner />
      </div>

      {/* 2. Sección Nuestros Servicios: Encabezado centrado ARRIBA y carrusel debajo a ancho completo (w-full) */}
      <section className="relative isolate z-10 py-12 sm:py-16 bg-white overflow-hidden border-y border-slate-100 w-full">
        <div className="w-full">
          <ServicesCarousel
            centerLabel={
              <div className="flex flex-col justify-center items-center text-center max-w-2xl mx-auto px-4 sm:px-6 space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#172B3A] tracking-tight leading-tight">
                  Nuestros servicios
                </h2>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xl">
                  Acompañamos a autónomos, pymes y medianas empresas con orden contable riguroso, blindaje tributario y herramientas tecnológicas avanzadas.
                </p>

                <div className="pt-2 flex justify-center">
                  <Link
                    to="/servicios"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-none text-xs sm:text-sm font-bold text-white bg-[#005BB2] hover:bg-[#004a91] transition-all shadow-sm"
                  >
                    <span>Ver catálogo de servicios</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* 3. Sección Quiénes Somos / Nuestra Convicción con foto grupal que empieza después del título y contenedor interactivo centrado */}
      <section className="relative bg-[#F8FAFC] border-y border-slate-200/80 overflow-hidden">
        {/* Encabezado: Título principal centrado que precede a la imagen */}
        <div className="text-center pt-10 sm:pt-12 pb-5 sm:pb-6 relative z-10 bg-[#F8FAFC]">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#172B3A] tracking-tight leading-tight">
            Quiénes somos
          </h2>
        </div>

        {/* Banner con la imagen del equipo que inicia estrictamente después del título */}
        <div className="relative w-full h-[580px] sm:h-[600px] lg:h-[620px] overflow-hidden bg-slate-900">
          {/* Foto grupal completa como fondo anclada para ocupar todo el espacio vertical de la sección */}
          <div className="absolute inset-0 z-0">
            <img
              src={teamGroupImg}
              alt="Equipo de consultores y asesores de MH Contabilidad en Ecuador"
              className="w-full h-full object-cover object-center filter brightness-[0.88]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {/* Overlay sutil para realzar la nitidez de la foto y el contenedor */}
            <div className="absolute inset-0 bg-slate-950/40" />
          </div>

          <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-10 flex justify-center items-end">
            {/* Contenedor Azul Semitransparente Cuadrado: Se expande al tocar (móvil) o pasar el mouse (PC) y se recoge al tocar fuera */}
            <motion.div
              ref={teamContainerRef}
              layout
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => {
                e.stopPropagation();
                setIsTeamHovered((prev) => !prev);
              }}
              onMouseEnter={() => setIsTeamHovered(true)}
              onMouseLeave={() => setIsTeamHovered(false)}
              className="w-full max-w-2xl bg-[#002D5A]/85 hover:bg-[#002D5A]/95 backdrop-blur-md text-white p-6 sm:p-7 lg:p-8 rounded-none shadow-2xl border border-white/20 transition-all space-y-4 cursor-pointer select-none"
            >
              {/* Frase / Convicción principal: Directa sin contenedor interior */}
              <p className="text-white font-bold text-sm sm:text-base lg:text-[16px] leading-relaxed tracking-tight text-center sm:text-left drop-shadow-sm">
                “Nacimos con una convicción clara: la contabilidad no debería ser un dolor de cabeza, sino la herramienta más poderosa para tu crecimiento.”
              </p>

              {/* Indicador interactivo en estado de reposo (cuando no se pasa el mouse o toca) */}
              {!isTeamHovered && (
                <div className="flex items-center justify-center gap-2 pt-1 text-[11px] sm:text-xs text-sky-200/90 font-medium tracking-wide">
                  <span className="hidden sm:inline">Pasa el cursor aquí para ver la información completa</span>
                  <span className="sm:hidden inline">Toca aquí para ver la información completa</span>
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
                        <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
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

      {/* 4. Bloque Destacado de Web de Sistema (Tu Contabilidad con nuestro Sistema Contable) */}
      <SystemAccessSection />

      {/* 5. Sección de Testimonios: ¿Qué opinan nuestros clientes? */}
      <TestimonialsSection />

      {/* 6. Sección Déjanos los Números (Split Layout con formulario moderno) */}
      <LeaveNumbersSection />
    </div>
  );
};