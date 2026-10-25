import React from 'react';
import { Link } from 'react-router-dom';
import { MHLogo } from './MHLogo';
import { siteConfig } from '../data/siteConfig';
import { MessageSquare, Mail, MapPin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#172B3A] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Columna 1: Marca y Representación */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-block" aria-label="Ir a Inicio">
              <MHLogo variant="light" />
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm pt-2">
              Firma especializada en asesoría contable, planificación tributaria ante el SRI, estados financieros
              y gestión estratégica para empresas y profesionales en Ecuador.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <span className="text-slate-200 font-semibold">Representante:</span> {siteConfig.representative}
            </div>
            <div className="text-xs text-slate-400">
              <span className="text-slate-200 font-semibold">Área:</span> {siteConfig.location.country}
            </div>
          </div>

          {/* Columna 2: Navegación de 5 Páginas Principales */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Páginas del Sitio
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {siteConfig.navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto Directo */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Canales de Comunicación
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#FC6412] shrink-0" />
                <a
                  href={`https://wa.me/${siteConfig.phone.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {siteConfig.phone.display}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#005BB2] shrink-0" />
                <a
                  href={`mailto:${siteConfig.email.general}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.email.general}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FC6412] shrink-0 mt-0.5" />
                <span>{siteConfig.location.addressNote}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
                  'Hola Jorge Hernández / MH Contabilidad, me gustaría agendar una consulta contable.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#FC6412] hover:bg-[#e05308] text-white transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Iniciar Chat de WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Fila Inferior: Copyright, Aviso de Privacidad y Botón Volver Arriba */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {currentYear} {siteConfig.tradeName}. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">
              Información tributaria y contable protegida bajo secreto profesional
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus:outline-none"
              aria-label="Volver al inicio de la página"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
