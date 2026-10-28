import React from 'react';
import {
  LayoutDashboard,
  Building2,
  FileCheck2,
  MessageSquare,
  BarChart3,
  BookOpenText,
  X,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { NavSection } from '../types/jobie';
import { MHBrandLogo } from './CompanyLogo';
import { Link } from 'react-router-dom';

interface SidebarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const NAV_ITEMS: {
  id: NavSection;
  label: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { id: 'dashboard', label: 'Panel General', icon: LayoutDashboard },
  { id: 'applications', label: 'Trámites y Asesorías', icon: FileCheck2 },
  { id: 'search-job', label: 'Empresas Clientes', icon: Building2 },
  { id: 'message', label: 'Consultas Clientes', icon: MessageSquare },
  { id: 'statistics', label: 'Métricas y Balances', icon: BarChart3 },
  { id: 'news', label: 'Actualidad SRI', icon: BookOpenText },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  mobileOpen,
  onCloseMobile,
}) => {
  const handleNavClick = (id: NavSection) => {
    onSelectSection(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Sidebar de Navegación MH Contabilidad"
        className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 z-50 w-[275px] h-screen bg-[#005BB2] text-white flex flex-col justify-between shrink-0 select-none shadow-xl transition-transform duration-200 ease-out overflow-hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Top Brand Header */}
          <div className="px-6 pt-6 pb-6 border-b border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleNavClick('dashboard')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-xl transition-opacity hover:opacity-95"
              aria-label="MH Contabilidad Dashboard"
            >
              <MHBrandLogo />
              <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-sky-200 tracking-wide uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FC6412]" />
                <span>Panel Administrativo</span>
              </div>
            </button>
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              aria-label="Cerrar navegación"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick link to main site */}
          <div className="px-5 pt-4 pb-2">
            <Link
              to="/"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-sky-100 hover:text-white font-medium transition-all group border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#FC6412] group-hover:-translate-x-0.5 transition-transform" />
              <span>Volver a la Web Principal</span>
            </Link>
          </div>

          {/* Navigation Menu with signature curved active tab matching #F3F6FA */}
          <nav className="pl-4 pt-2 space-y-1" aria-label="Menú Principal">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <div key={item.id} className="relative">
                  {/* Top concave curve connector when active */}
                  {isActive && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:block absolute -top-5 right-0 w-5 h-5 bg-[#F3F6FA] pointer-events-none"
                    >
                      <div className="w-full h-full bg-[#005BB2] rounded-br-[20px]" />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center gap-3.5 px-5 py-3.5 text-[14px] transition-colors relative z-10 cursor-pointer ${
                      isActive
                        ? 'bg-[#F3F6FA] text-[#005BB2] font-bold rounded-l-full shadow-none'
                        : 'text-white/85 hover:text-white hover:bg-white/10 font-medium rounded-l-full'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 transition-colors ${
                        isActive ? 'text-[#FC6412]' : 'text-sky-200'
                      }`}
                    />
                    <span className="whitespace-nowrap truncate tracking-tight">
                      {item.label}
                    </span>
                  </button>

                  {/* Bottom concave curve connector when active */}
                  {isActive && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:block absolute -bottom-5 right-0 w-5 h-5 bg-[#F3F6FA] pointer-events-none"
                    >
                      <div className="w-full h-full bg-[#005BB2] rounded-tr-[20px]" />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer Brand Info */}
        <div className="px-6 pb-6 pt-4 border-t border-white/10 text-[11px] leading-relaxed text-white/70">
          <p className="font-bold text-white text-xs mb-0.5">
            MH Contabilidad
          </p>
          <p className="text-sky-200 text-[11px]">Servicios Contables y Tributarios</p>
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
            <span>STP Industrial</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FC6412]" />
            <span>Ecuador 2026</span>
          </div>
        </div>
      </aside>
    </>
  );
};
