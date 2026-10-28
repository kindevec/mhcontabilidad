import React, { useState } from 'react';
import {
  Search,
  MessageSquare,
  Bell,
  CheckCheck,
  FileCheck2,
  Building2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavSection } from '../types/jobie';
import { AdminAvatar } from './CompanyLogo';

interface HeaderProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onToggleMobileMenu: () => void;
  unreadMessagesCount: number;
  notificationsCount: number;
  onClearNotifications: () => void;
}

const SECTION_TITLES: Record<NavSection, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Panel General',
    subtitle: 'Resumen ejecutivo de asesorías, trámites SRI y empresas',
  },
  'search-job': {
    title: 'Directorio de Clientes',
    subtitle: 'Empresas, personas naturales y sociedades asesoradas',
  },
  applications: {
    title: 'Trámites y Asesorías',
    subtitle: 'Gestión de obligaciones fiscales, SRI, nómina y declaraciones',
  },
  message: {
    title: 'Consultas Clientes',
    subtitle: 'Bandeja de mensajes, WhatsApp y solicitudes de asesoría',
  },
  statistics: {
    title: 'Balances y Métricas',
    subtitle: 'Indicadores contables, cumplimiento y estados tributarios',
  },
  news: {
    title: 'Actualidad SRI & Normativa',
    subtitle: 'Resoluciones vigentes, reformas tributarias y calendarios fiscales',
  },
};

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  searchQuery,
  onSearchChange,
  onToggleMobileMenu,
  unreadMessagesCount,
  notificationsCount,
  onClearNotifications,
}) => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const sectionInfo = SECTION_TITLES[activeSection] || {
    title: 'Panel Administrativo',
    subtitle: 'MH Contabilidad',
  };

  return (
    <header className="px-5 sm:px-8 pt-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-30">
      <div className="flex items-center justify-between md:justify-start gap-4">
        {/* Left Zone: Hamburger + Section Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="p-2 -ml-2 rounded-xl text-[#172B3A] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Abrir Menú"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="2.4" rx="1.2" fill="#005BB2" />
              <rect x="3" y="11" width="13" height="2.4" rx="1.2" fill="#FC6412" />
              <rect x="3" y="17" width="18" height="2.4" rx="1.2" fill="#172B3A" />
            </svg>
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#172B3A] tracking-tight whitespace-nowrap">
              {sectionInfo.title}
            </h1>
            <p className="hidden sm:block text-[11px] text-[#64748B] font-medium leading-tight">
              {sectionInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Quick View Switcher Pill (Trámites <-> Clientes) */}
        <div
          className="flex items-center bg-[#EBF3FC] p-1 rounded-full ml-1 sm:ml-2 border border-[#005BB2]/10"
          role="group"
          aria-label="Acceso Rápido"
        >
          <button
            type="button"
            onClick={() => onSelectSection('applications')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'applications'
                ? 'bg-[#005BB2] text-white shadow-xs'
                : 'text-[#005BB2] hover:bg-white/80'
            }`}
          >
            <FileCheck2 className="w-3 h-3 text-[#FC6412]" />
            <span>Trámites</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectSection('search-job')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'search-job'
                ? 'bg-[#005BB2] text-white shadow-xs'
                : 'text-[#005BB2] hover:bg-white/80'
            }`}
          >
            <Building2 className="w-3 h-3 text-[#FC6412]" />
            <span>Clientes</span>
          </button>
        </div>
      </div>

      {/* Center Zone: Rounded Pill Search Bar */}
      <div className="w-full md:max-w-[340px] lg:max-w-[380px] flex-1">
        <label htmlFor="global-header-search" className="sr-only">
          Buscar trámites, clientes o RUC
        </label>
        <div className="relative flex items-center">
          <input
            id="global-header-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar trámite, cliente, RUC o servicio..."
            className="w-full bg-[#EBF0F7] hover:bg-[#E2EAF3] focus:bg-white text-xs sm:text-sm text-[#172B3A] placeholder-[#64748B] pl-6 pr-11 py-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#005BB2]/30 border border-transparent focus:border-[#005BB2]/30"
          />
          <Search
            className="w-4 h-4 sm:w-5 sm:h-5 text-[#005BB2] absolute right-4 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Right Zone: Notifications & Admin Profile */}
      <div className="flex items-center justify-end gap-3 sm:gap-4 shrink-0">
        {/* Messages Icon Button */}
        <button
          type="button"
          onClick={() => onSelectSection('message')}
          className="relative w-11 h-11 rounded-full bg-white hover:bg-[#F3F6FA] border border-slate-200/80 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          aria-label={`Consultas (${unreadMessagesCount} sin leer)`}
        >
          <MessageSquare className="w-5 h-5 text-[#172B3A]" />
          {unreadMessagesCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-[#FC6412] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#F3F6FA] tabular-nums">
              {unreadMessagesCount}
            </span>
          )}
        </button>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifDropdown((prev) => !prev);
              setShowProfileDropdown(false);
            }}
            className="relative w-11 h-11 rounded-full bg-white hover:bg-[#F3F6FA] border border-slate-200/80 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            aria-label={`Notificaciones (${notificationsCount} alertas)`}
            aria-expanded={showNotifDropdown}
          >
            <Bell className="w-5 h-5 text-[#172B3A]" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-[#005BB2] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#F3F6FA] tabular-nums">
                {notificationsCount}
              </span>
            )}
          </button>

          {showNotifDropdown && (
            <div className="absolute right-0 mt-3 w-84 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-[#172B3A]">
                  Alertas Tributarias ({notificationsCount})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClearNotifications();
                    setShowNotifDropdown(false);
                  }}
                  className="text-xs font-semibold text-[#005BB2] hover:text-[#004a91] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-[#FC6412]" />
                  Marcar todo leído
                </button>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto mt-1">
                <div className="py-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#172B3A]">
                      Declaración IVA Aprobada
                    </p>
                    <span className="text-[10px] text-[#FC6412] font-semibold">SRI</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    Comercial San Carlos S.A. completó el formulario 104 correspondiente al período mensual.
                  </p>
                </div>
                <div className="py-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#172B3A]">
                      Vencimiento 9no dígito RUC
                    </p>
                    <span className="text-[10px] text-red-600 font-semibold">Urgente</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    Recordatorio de presentación para contribuyentes especiales y personas naturales obligadas.
                  </p>
                </div>
                <div className="py-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#172B3A]">
                      Sincronización Perseo Web
                    </p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Online</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    28 nuevos comprobantes electrónicos recibidos y contabilizados automáticamente.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Lockup: Jorge Hernández, MH Contabilidad */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfileDropdown((prev) => !prev);
              setShowNotifDropdown(false);
            }}
            className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full hover:bg-black/5 transition-colors text-left cursor-pointer"
            aria-expanded={showProfileDropdown}
          >
            <AdminAvatar />
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-black text-[#172B3A] whitespace-nowrap">
                Jorge Hernández
              </p>
              <p className="text-[11px] font-semibold text-[#005BB2] whitespace-nowrap">
                Director & Asesor Principal
              </p>
            </div>
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="font-black text-[#172B3A]">Jorge Hernández</p>
                <p className="text-slate-500 text-[11px]">asesoria@tu-contabilidad.com</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-[#EBF3FC] text-[#005BB2] text-[10px] font-bold rounded-full">
                  Administrador General MH
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectSection('applications');
                  setShowProfileDropdown(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F3F6FA] text-[#172B3A] font-medium cursor-pointer"
              >
                <span>Gestión de Trámites</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectSection('search-job');
                  setShowProfileDropdown(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F3F6FA] text-[#172B3A] font-medium cursor-pointer"
              >
                <span>Directorio de Clientes</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectSection('statistics');
                  setShowProfileDropdown(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F3F6FA] text-[#172B3A] font-medium cursor-pointer"
              >
                <span>Balances y Métricas</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <div className="pt-1 mt-1 border-t border-slate-100">
                <Link
                  to="/"
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#EBF3FC] hover:bg-[#D9EAFB] text-[#005BB2] font-bold transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-[#FC6412]" />
                    Ir a la Web Pública
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
