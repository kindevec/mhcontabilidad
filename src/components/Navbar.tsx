import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MHLogo } from './MHLogo';
import { siteConfig } from '../data/siteConfig';
import { Calendar } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { motion } from 'motion/react';

export const Navbar: React.FC = () => {
  const whatsappGeneralUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola Jorge Hernandez / MH Contabilidad, requiero asesoria contable y tributaria personalizada.')}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-2.5 sm:py-3">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
          
          {/* Zona 1: Logo Oficial */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005BB2] rounded-lg group"
            aria-label="MH Contabilidad - Ir a la página de Inicio"
          >
            <MHLogo />
          </Link>

          {/* Zona 2: Enlaces de Navegación limpios en mayúsculas (Desktop / Tablet) */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold uppercase tracking-wider"
            aria-label="Navegación principal multipágina"
          >
            {siteConfig.navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative py-1.5 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
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
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#FC6412]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Zona 3: Botones de Acción (En móvil: Agenda Asesoría en lugar de hamburguesa) */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0">
            {/* Botón 1: Agenda Asesoría (Visible en Móvil, Tablet y Desktop) */}
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#c94703] transition-all shadow-sm hover:shadow-md whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6412]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agenda Asesoría</span>
            </Link>

            {/* Botón 2: WhatsApp (Visible en Tablet y Desktop) */}
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#1da851] transition-all shadow-sm hover:shadow-md whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
