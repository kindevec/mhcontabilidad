import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MHLogo } from './MHLogo';
import { siteConfig } from '../data/siteConfig';
import { servicesData } from '../data/services';
import { WhatsAppIcon } from './WhatsAppIcon';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowUp } from 'lucide-react';

const kindevIcon = '/kindev_icon.webp';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="relative z-10 border-t border-[#005BB2]/40 pt-6 sm:pt-10 pb-24 md:pb-8 overflow-hidden text-white shadow-[0_-8px_30px_rgba(0,0,0,0.25)] bg-gradient-to-b from-[#0A131F] via-[#00203F] to-[#0A131F]"
    >
      {/* ========================================================
          AURA LUMINOSA Y DESTELLOS AMBIENTALES
         ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#005BB2]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#FC6412]/10 blur-3xl pointer-events-none" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
          <circle cx="200" cy="100" r="1.8" fill="#38BDF8" />
          <circle cx="700" cy="180" r="1.4" fill="#FFFFFF" />
          <circle cx="1200" cy="80" r="2.0" fill="#FC6412" />
          <circle cx="1000" cy="400" r="1.6" fill="#38BDF8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================
            GRID DE 4 COLUMNAS BALANCEADO (ESTILO CASA KINTI)
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 mb-5 sm:mb-8 items-start">
          
          {/* ----------------------------------------------------
              COLUMNA 1: Logo Oficial, Misión & Redes Sociales
             ---------------------------------------------------- */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col gap-2.5 sm:gap-3 text-left">
            <div className="flex items-center justify-between sm:justify-start gap-2">
              <Link
                to="/"
                onClick={scrollToTop}
                className="flex items-center gap-2 sm:gap-3 group cursor-pointer select-none shrink-0 relative"
                aria-label="MH Contabilidad - Volver arriba"
              >
                <MHLogo variant="light" />
              </Link>

              {/* En móvil: redes sociales compactas en la misma fila superior */}
              <div className="flex sm:hidden items-center gap-1.5 shrink-0">
                <motion.a
                  href={`https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola MH Contabilidad, requiero asesoria contable y tributaria personalizada.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp MH Contabilidad"
                  whileTap={{ scale: 0.95 }}
                  className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FC6412] via-[#FF7A29] to-[#E05308] flex items-center justify-center text-white shadow-xs"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                </motion.a>
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook MH Contabilidad"
                  whileTap={{ scale: 0.95 }}
                  className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#005BB2] via-[#006CD6] to-[#00488F] flex items-center justify-center text-white shadow-xs"
                >
                  <Facebook className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                </motion.a>
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram MH Contabilidad"
                  whileTap={{ scale: 0.95 }}
                  className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#005BB2] via-[#006CD6] to-[#00488F] flex items-center justify-center text-white shadow-xs"
                >
                  <Instagram className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                </motion.a>
              </div>
            </div>

            {/* Misión y Propuesta de Valor */}
            <p className="text-[11px] sm:text-[12.5px] text-slate-300 font-medium leading-snug sm:leading-relaxed max-w-sm text-left">
              Firma de consultoría contable, tributaria y financiera en Ecuador. Claridad absoluta, blindaje riguroso ante el SRI y acompañamiento proactivo para el crecimiento seguro de tu empresa.
            </p>

            {/* Redes Sociales Oficiales en PC/Tablet */}
            <div className="hidden sm:block pt-1">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-2">
                Síguenos en Redes
              </span>
              <div className="flex items-center gap-2">
                <motion.a
                  href={`https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola MH Contabilidad, requiero asesoria contable y tributaria personalizada.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp MH Contabilidad"
                  whileHover={{ scale: 1.12, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FC6412] via-[#FF7A29] to-[#E05308] hover:from-[#FF8A40] hover:to-[#FC6412] flex items-center justify-center text-white shadow-[0_0_10px_rgba(252,100,18,0.35)] transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                </motion.a>

                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook MH Contabilidad"
                  whileHover={{ scale: 1.12, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#005BB2] via-[#006CD6] to-[#00488F] hover:from-[#0070DD] hover:to-[#005BB2] flex items-center justify-center text-white shadow-[0_0_10px_rgba(0,91,178,0.35)] transition-all"
                >
                  <Facebook className="w-4 h-4 text-white stroke-[2.2]" />
                </motion.a>

                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram MH Contabilidad"
                  whileHover={{ scale: 1.12, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#005BB2] via-[#006CD6] to-[#00488F] hover:from-[#0070DD] hover:to-[#005BB2] flex items-center justify-center text-white shadow-[0_0_10px_rgba(0,91,178,0.35)] transition-all"
                >
                  <Instagram className="w-4 h-4 text-white stroke-[2.2]" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------
              COLUMNA 2: Secciones / Navegación (Solo PC / Tablet)
             ---------------------------------------------------- */}
          <div className="hidden md:block col-span-1 space-y-1.5 sm:space-y-2.5 text-left">
            <h4 className="text-xs sm:text-base font-bold uppercase tracking-wider text-white pb-0.5 sm:pb-1 border-b border-white/15">
              Secciones
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-[11px] sm:text-[13px] font-medium">
              {siteConfig.navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    onClick={scrollToTop}
                    className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 sm:gap-1.5 py-0.5"
                  >
                    <span className="text-[#FC6412] text-[9px] sm:text-[10px]">✦</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ----------------------------------------------------
              COLUMNA 3: Especialidades Contables (Solo PC / Tablet)
             ---------------------------------------------------- */}
          <div className="hidden md:block col-span-1 space-y-1.5 sm:space-y-2.5 text-left">
            <h4 className="text-xs sm:text-base font-bold uppercase tracking-wider text-white pb-0.5 sm:pb-1 border-b border-white/15">
              Especialidades
            </h4>
            
            <ul className="space-y-1 sm:space-y-2 text-[11px] sm:text-[13px] text-slate-300 font-medium">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    to="/servicios"
                    onClick={scrollToTop}
                    className="flex items-start gap-1 sm:gap-1.5 hover:text-white hover:translate-x-1 transition-all duration-200 py-0.5"
                  >
                    <span className="text-[#FC6412] text-[9px] sm:text-[10px] mt-0.5">✦</span>
                    <span className="leading-snug">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ----------------------------------------------------
              COLUMNA 4: Contacto & Horarios (Móvil y PC)
             ---------------------------------------------------- */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 space-y-1.5 sm:space-y-2.5 text-left">
            <h4 className="text-xs sm:text-base font-bold uppercase tracking-wider text-white pb-0.5 sm:pb-1 border-b border-white/15">
              Contacto
            </h4>

            <div className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-[12.5px] font-medium">
              
              {/* Ubicación */}
              <motion.div
                whileHover={{ x: 3 }}
                className="flex items-start gap-2 sm:gap-2.5 group cursor-default select-none"
              >
                <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-gradient-to-tr from-[#FC6412] via-[#FF7A29] to-[#E05308] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[2.4]" />
                </div>
                <div className="leading-snug pt-0.5">
                  <span className="text-slate-200 block font-semibold">
                    {siteConfig.location.city} · {siteConfig.location.country}
                  </span>
                  <span className="text-[10px] text-slate-400 block pt-0.5">
                    {siteConfig.location.addressNote}
                  </span>
                </div>
              </motion.div>

              {/* Fila compacta de Teléfono y Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {/* Teléfono */}
                <motion.div
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer"
                >
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-gradient-to-tr from-[#FC6412] via-[#FF7A29] to-[#E05308] flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[2.4]" />
                  </div>
                  <a
                    href={`tel:${siteConfig.phone.international}`}
                    className="text-slate-200 group-hover:text-white transition-colors font-semibold"
                  >
                    {siteConfig.phone.display}
                  </a>
                </motion.div>

                {/* Email */}
                <motion.div
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer"
                >
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-gradient-to-tr from-[#FC6412] via-[#FF7A29] to-[#E05308] flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[2.4]" />
                  </div>
                  <a
                    href={`mailto:${siteConfig.email.general}`}
                    className="text-slate-200 group-hover:text-white transition-colors truncate max-w-[220px] font-semibold"
                  >
                    {siteConfig.email.general}
                  </a>
                </motion.div>
              </div>

              {/* Horarios de Atención */}
              <motion.div
                whileHover={{ x: 3 }}
                className="flex items-center gap-2 sm:gap-2.5 group cursor-default select-none"
              >
                <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-gradient-to-tr from-[#005BB2] via-[#006CD6] to-[#00488F] flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[2.4]" />
                </div>
                <div className="leading-snug text-slate-300 select-none text-[10.5px] sm:text-xs">
                  <span>{siteConfig.schedule.weekdays}</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* ========================================================
            BARRA INFERIOR / SUB-FOOTER
           ======================================================== */}
        <div className="pt-3 sm:pt-4 border-t border-white/10 text-[10.5px] sm:text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-medium">
          
          {/* Izquierda: Copyright y Enlaces Legales */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-center sm:text-left">
            <p>
              © {currentYear} {siteConfig.companyName}. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2">
              <Link
                to="/contacto"
                className="text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Privacidad
              </Link>
              <span>·</span>
              <Link
                to="/contacto"
                className="text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Términos
              </Link>
            </div>
          </div>

          {/* Derecha: Botón Volver Arriba y Firma Oficial KINDEV */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-[11px]"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#FC6412]" />
              <span>Arriba</span>
            </button>

            <a 
              href="https://www.kindevsas.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-95 transition-all text-[11px] sm:text-sm flex items-center gap-1.5 sm:gap-2 group"
              title="Desarrollado por KINDEV"
              aria-label="Desarrollado por KINDEV"
            >
              <div className="relative inline-flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#005BB2]/40 blur-md opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
                
                <img 
                  src={kindevIcon} 
                  alt="KINDEV Logo" 
                  width="28" 
                  height="28" 
                  loading="lazy" 
                  decoding="async" 
                  className="relative z-10 w-6 h-6 sm:w-7.5 sm:h-7.5 object-contain drop-shadow-[0_2px_8px_rgba(0,91,178,0.5)] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 ease-out inline-block"
                />
              </div>
              <span className="text-[10.5px] sm:text-xs text-slate-300 group-hover:text-white transition-colors font-semibold tracking-wide">
                Desarrollado por{" "}
                <span className="font-bold text-white inline-block">
                  KINDEV
                </span>
              </span>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};
