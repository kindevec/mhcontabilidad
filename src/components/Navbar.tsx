import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { MHLogo } from './MHLogo';
import { siteConfig } from '../data/siteConfig';
import { MessageSquare, Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const whatsappGeneralUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
    'Hola Jorge Hernández / MH Contabilidad, requiero asesoría contable y tributaria personalizada.'
  )}`;

  // Modo Hero Transparente: Activo en la página principal cuando no se ha hecho scroll
  const isHomePage = location.pathname === '/';
  const isHeroMode = isHomePage && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHeroMode
          ? 'bg-transparent py-3 sm:py-4'
          : 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-2.5 sm:py-3'
      }`}
    >
      {/* 1. Forma curva circular suave y tendida idéntica al diseño de referencia Tony Underhill con mayor alcance vertical */}
      <div
        className={`absolute top-0 left-0 h-28 sm:h-32 md:h-36 lg:h-40 xl:h-44 w-[96%] sm:w-[86%] md:w-[72%] lg:w-[60%] xl:w-[56%] max-w-[850px] pointer-events-none z-0 transition-all duration-300 ${
          isHeroMode ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 140"
          preserveAspectRatio="none"
          className="w-full h-full filter drop-shadow-[0_10px_24px_rgba(0,35,75,0.42)]"
        >
          {/* Franja de contorno azul del logo (mismo azul de la franja #005BB2) en capa inferior */}
          <path
            d="M 0,0 L 0,114 Q 300,146 1015,0 Z"
            fill="#005BB2"
          />
          {/* Fondo blanco puro con arco circular tendido que desciende un poco más verticalmente */}
          <path
            d="M 0,0 L 0,100 Q 300,130 1000,0 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      <div className="w-full px-6 sm:px-10 lg:px-14 relative z-10">
        <div className="flex items-center justify-between gap-6">
          
          {/* Zona 1: Logo Oficial con textos institucionales desplazado más a la derecha */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005BB2] rounded-lg group pl-10 sm:pl-16 md:pl-24 lg:pl-32 xl:pl-40 pt-1.5"
            aria-label="MH Contabilidad - Ir a la página de Inicio"
          >
            <MHLogo />
          </Link>

          {/* Zona 2: Enlaces de Navegación limpios en mayúsculas estilo diseño de referencia */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-8 text-xs font-bold uppercase tracking-wider"
            aria-label="Navegación principal multipágina"
          >
            {siteConfig.navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative py-1.5 whitespace-nowrap shrink-0 transition-colors ${
                    isHeroMode
                      ? isActive
                        ? 'text-white font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]'
                        : 'text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]'
                      : isActive
                        ? 'text-[#005BB2] font-extrabold'
                        : 'text-slate-600 hover:text-[#005BB2]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                          isHeroMode ? 'bg-[#FC6412] shadow-[0_0_8px_#FC6412]' : 'bg-[#FC6412]'
                        }`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Zona 3: Botón de Acción Principal estilo Pill Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#c94703] transition-all shadow-md hover:shadow-lg whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6412] focus-visible:ring-offset-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Directo</span>
            </a>
          </div>

          {/* Botón menú móvil adaptado al fondo transparente o sólido */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 ${
                isHeroMode
                  ? 'text-white hover:bg-white/10 focus-visible:ring-white'
                  : 'text-[#172B3A] hover:bg-slate-100 focus-visible:ring-[#005BB2]'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable con Animación */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-200 bg-white shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {siteConfig.navLinks.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-[#005BB2]'
                        : 'text-[#172B3A] hover:bg-slate-50 hover:text-[#005BB2]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <a
                  href={whatsappGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full text-xs font-bold text-white bg-[#FC6412] hover:bg-[#e05308] transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp: {siteConfig.phone.display}</span>
                </a>
                <a
                  href={`tel:${siteConfig.phone.international}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full text-xs font-semibold text-[#005BB2] bg-blue-50 border border-blue-200/60"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Llamada Directa</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
