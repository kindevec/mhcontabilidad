import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';
import { ScrollToTop } from './ScrollToTop';
import { motion, AnimatePresence } from 'motion/react';

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-[#172B3A] flex flex-col selection:bg-[#FC6412]/20 selection:text-[#005BB2]">
      {/* Scroll to top al navegar a una nueva ruta */}
      <ScrollToTop />

      {/* Header común consistente con navegación multipágina */}
      <Navbar />

      {/* Contenido dinámico de cada página independiente con transición suave */}
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer común compartido */}
      <Footer />

      {/* Botón flotante persistente de WhatsApp */}
      <WhatsAppFloatingButton />
    </div>
  );
};
