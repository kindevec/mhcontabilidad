import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';
import { MobileBottomNav } from './MobileBottomNav';
import { ScrollToTop } from './ScrollToTop';

export const Layout: React.FC = () => {

  return (
    <div className="min-h-screen bg-white text-[#172B3A] flex flex-col selection:bg-[#FC6412]/20 selection:text-[#005BB2] overflow-x-clip">
      {/* Scroll to top al navegar a una nueva ruta */}
      <ScrollToTop />

      {/* Header común consistente con navegación multipágina */}
      <Navbar />

      {/* Contenido dinámico de cada página con renderizado inmediato y fluido */}
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      {/* Footer común compartido */}
      <Footer />

      {/* Barra de navegación inferior móvil animada estilo MR RÓTULOS */}
      <MobileBottomNav />

      {/* Botón flotante persistente de WhatsApp */}
      <WhatsAppFloatingButton />
    </div>
  );
};