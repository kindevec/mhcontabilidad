import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
    'Hola Jorge Hernández / MH Contabilidad, requiero asesoría contable o tributaria para mi negocio.'
  )}`;

  return (
    <aside
      aria-label="Atención rápida vía WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
    >
      {/* Tooltip opcional interactivo */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-white rounded-xl shadow-lg border border-slate-200 p-3 max-w-xs text-xs text-[#172B3A]"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-[#005BB2]">¿Consulta rápida?</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Escríbanos a WhatsApp y un asesor de MH Contabilidad le responderá.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTooltip(false)}
                className="text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Cerrar sugerencia"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante con microinteracción */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa4f] text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        aria-label="Contactar a MH Contabilidad por WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          Atención en Línea
        </span>
      </motion.a>
    </aside>
  );
};
