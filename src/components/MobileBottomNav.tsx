import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatedTabBar, TabItem } from './ui/animated-tab-bar';
import { Home, Layers, Users, Globe, Send } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  // Mapear rutas de MH Contabilidad a los 5 ítems de la barra
  const routes = ['/', '/servicios', '/nosotros', '/portal-clientes', '/contacto'];

  // Sincronizar índice activo al cambiar la ruta
  useEffect(() => {
    const currentPath = location.pathname;
    const foundIndex = routes.findIndex((r) => (r === '/' ? currentPath === '/' : currentPath.startsWith(r)));
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
  }, [location.pathname]);

  const mobileTabItems: TabItem[] = [
    {
      label: 'Inicio',
      icon: <Home className="w-5 h-5" />,
      onClick: () => navigate('/'),
    },
    {
      label: 'Servicios',
      icon: <Layers className="w-5 h-5" />,
      onClick: () => navigate('/servicios'),
    },
    {
      label: 'Nosotros',
      icon: <Users className="w-5 h-5" />,
      onClick: () => navigate('/nosotros'),
    },
    {
      label: 'Portal',
      icon: <Globe className="w-5 h-5" />,
      onClick: () => navigate('/portal-clientes'),
    },
    {
      label: 'Contacto',
      icon: <Send className="w-5 h-5" />,
      onClick: () => navigate('/contacto'),
    },
  ];

  const handleTabChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <aside
      aria-label="Navegación Móvil de MH Contabilidad"
      className="fixed -bottom-[1px] inset-x-0 z-40 w-full lg:hidden pointer-events-auto select-none"
    >
      <AnimatedTabBar
        items={mobileTabItems}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
    </aside>
  );
};

export default MobileBottomNav;
