import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Mail,
  MoreVertical,
  ArrowDownWideNarrow,
  ChevronDown,
  Plus,
  X,
  Check,
  CheckCircle2,
  Clock,
  PauseCircle,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import {
  ApplicationFilter,
  ApplicationItem,
  ApplicationStatus,
  EmploymentType,
  LogoVariant,
  SortOrder,
} from '../types/jobie';
import { CompanyLogo } from './CompanyLogo';
import { getApplicationCounts } from '../utils/jobieLogic';

interface ApplicationsViewProps {
  applications: ApplicationItem[];
  filteredApplications: ApplicationItem[];
  statusFilter: ApplicationFilter;
  onStatusFilterChange: (filter: ApplicationFilter) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (sort: SortOrder) => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onAddApplication: (newApp: Omit<ApplicationItem, 'id' | 'timestamp'>) => void;
}

const FILTER_TABS: { key: ApplicationFilter; label: string }[] = [
  { key: 'All', label: 'Todos los Trámites' },
  { key: 'Candidate', label: 'Completados SRI' },
  { key: 'Pending', label: 'Pendientes' },
  { key: 'On-Hold', label: 'En Revisión' },
];

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  applications,
  filteredApplications,
  statusFilter,
  onStatusFilterChange,
  sortOrder,
  onSortOrderChange,
  onUpdateStatus,
  onAddApplication,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [activeContactToast, setActiveContactToast] = useState<{
    id: string;
    type: 'phone' | 'email';
    value: string;
    company: string;
  } | null>(null);
  const [inspectingApplicant, setInspectingApplicant] =
    useState<ApplicationItem | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // New application form state
  const [companyName, setCompanyName] = useState('');
  const [companyDepartment, setCompanyDepartment] = useState(
    'Comercio y Servicios'
  );
  const [position, setPosition] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [employmentType, setEmploymentType] =
    useState<EmploymentType>('FULLTIME');
  const [status, setStatus] = useState<ApplicationStatus>('Pending');
  const [formError, setFormError] = useState('');

  const counts = getApplicationCounts(applications);

  const allSelected =
    filteredApplications.length > 0 &&
    filteredApplications.every((item) => selectedIds.includes(item.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApplications.map((i) => i.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const cycleStatus = (current: ApplicationStatus): ApplicationStatus => {
    if (current === 'Pending') return 'On-Hold';
    if (current === 'On-Hold') return 'Candidate';
    return 'Pending';
  };

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !position.trim() || !applicantName.trim()) {
      setFormError('Por favor ingresa el Representante, Empresa o RUC y Trámite.');
      return;
    }

    const logos: LogoVariant[] = [
      'orange-arch',
      'cyan-arch',
      'magenta-c',
      'green-arch',
      'blue-arch',
    ];
    const randomLogo = logos[applications.length % logos.length];
    const nextCode = `#TRM-01${10 + applications.length}`;

    onAddApplication({
      code: nextCode,
      dateApplied: '27 Oct 2026, 04:00 PM',
      companyName: companyName.trim(),
      companyDepartment: companyDepartment.trim() || 'Servicios Contables',
      logoVariant: randomLogo,
      type: employmentType,
      position: position.trim(),
      hasPhone: true,
      hasEmail: true,
      phone: '+593 96 839 2931',
      email: `tributario@${companyName.trim().toLowerCase().replace(/[^a-z0-9]/g, '') || 'empresa'}.ec`,
      status,
      applicantName: applicantName.trim(),
      expectedSalary: '$1,200.00 Honorarios',
      experience: 'RUC 1792984102001',
    });

    setCompanyName('');
    setPosition('');
    setApplicantName('');
    setFormError('');
    setShowNewModal(false);
  };

  const renderStatusPill = (item: ApplicationItem) => {
    if (item.status === 'Pending') {
      return (
        <button
          type="button"
          onClick={() => onUpdateStatus(item.id, cycleStatus(item.status))}
          title="Clic para cambiar estado (Pendiente → En Revisión → Completado SRI)"
          className="min-w-[110px] px-3.5 py-1.5 rounded-full text-xs font-bold border border-slate-300 text-slate-600 bg-white hover:border-[#005BB2] hover:text-[#005BB2] transition-colors cursor-pointer"
        >
          Pendiente
        </button>
      );
    }
    if (item.status === 'On-Hold') {
      return (
        <button
          type="button"
          onClick={() => onUpdateStatus(item.id, cycleStatus(item.status))}
          title="Clic para cambiar estado (En Revisión → Completado SRI → Pendiente)"
          className="min-w-[110px] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#FC6412]/60 text-[#FC6412] bg-[#FFF2EB] hover:bg-[#FC6412] hover:text-white transition-colors cursor-pointer"
        >
          En Revisión
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={() => onUpdateStatus(item.id, cycleStatus(item.status))}
        title="Clic para cambiar estado (Completado SRI → Pendiente → En Revisión)"
        className="min-w-[110px] px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#005BB2] text-white shadow-xs hover:bg-[#004a91] transition-colors cursor-pointer"
      >
        Validado SRI
      </button>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      aria-label="Gestión de Trámites y Asesorías MH Contabilidad"
      className="px-5 sm:px-8 pb-10"
    >
      {/* Top Filter & Sort Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 my-5">
        <div className="flex flex-wrap items-center gap-6 sm:gap-10">
          <div>
            <h2 className="text-[15px] font-black text-[#172B3A] tabular-nums">
              Mostrando {filteredApplications.length} Trámites Activos
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Declaraciones SRI, nómina IESS y auditorías vigentes
            </p>
          </div>

          {/* Filter Pills */}
          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Filtrar trámites por estado tributario"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = statusFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onStatusFilterChange(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#005BB2] text-white shadow-xs'
                      : 'bg-[#EBF3FC] text-[#005BB2] hover:bg-[#D9EAFB]'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-1.5 text-[11px] tabular-nums ${
                      isActive ? 'text-white/80' : 'text-[#005BB2]/70'
                    }`}
                  >
                    ({counts[tab.key]})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Controls: New Application + Sort Dropdown */}
        <div className="flex items-center gap-3 self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#005BB2] hover:bg-[#004a91] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-[#FC6412]" />
            <span>Registrar Trámite</span>
          </button>

          <div className="relative flex items-center">
            <ArrowDownWideNarrow
              className="w-4 h-4 text-[#005BB2] absolute left-4 pointer-events-none"
              aria-hidden="true"
            />
            <label htmlFor="applications-sort-select" className="sr-only">
              Ordenar trámites
            </label>
            <select
              id="applications-sort-select"
              value={sortOrder}
              onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
              className="appearance-none bg-transparent border border-slate-300 hover:border-[#005BB2] text-xs font-bold text-[#172B3A] pl-10 pr-9 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#005BB2]/25 cursor-pointer"
            >
              <option value="Newest">Más recientes</option>
              <option value="Oldest">Más antiguos</option>
              <option value="Company A-Z">Empresa (A-Z)</option>
            </select>
            <ChevronDown
              className="w-4 h-4 text-[#005BB2] absolute right-3.5 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Contact quick notification bar */}
      <AnimatePresence>
        {activeContactToast && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mb-4 px-5 py-3 rounded-2xl bg-[#005BB2] text-white text-xs flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-2.5">
              {activeContactToast.type === 'phone' ? (
                <Phone className="w-4 h-4 text-[#FC6412]" />
              ) : (
                <Mail className="w-4 h-4 text-[#FC6412]" />
              )}
              <span>
                Contactando a <strong>{activeContactToast.company}</strong> vía{' '}
                {activeContactToast.type === 'phone' ? 'WhatsApp/Teléfono' : 'Correo'}:{' '}
                <strong className="font-mono underline">
                  {activeContactToast.value}
                </strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveContactToast(null)}
              className="p-1 rounded-lg hover:bg-white/15 cursor-pointer"
              aria-label="Cerrar notificación"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main White Rounded Table Card */}
      <div className="bg-white rounded-[28px] shadow-[0_10px_35px_rgba(31,31,46,0.04)] overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[840px]">
            <thead>
              <tr className="border-b border-slate-100 text-[12px] font-bold text-[#64748B] uppercase tracking-wider bg-slate-50/60">
                <th className="py-4 pl-6 pr-2 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    aria-label="Seleccionar todos"
                    className="w-4 h-4 rounded border-slate-300 text-[#005BB2] focus:ring-[#005BB2] cursor-pointer accent-[#005BB2]"
                  />
                </th>
                <th className="py-4 px-3">Código / Fecha</th>
                <th className="py-4 px-3">Empresa / Razón Social</th>
                <th className="py-4 px-3">Modalidad</th>
                <th className="py-4 px-3">Trámite o Gestión Tributaria</th>
                <th className="py-4 px-3">Contacto</th>
                <th className="py-4 px-3">Estado Fiscal</th>
                <th className="py-4 pl-1 pr-5 w-10">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px]">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-14 text-center text-slate-500 text-sm"
                  >
                    <p className="font-bold text-[#172B3A] mb-1">
                      No hay trámites que coincidan con el filtro
                    </p>
                    <p className="text-xs text-slate-400 mb-4">
                      Intenta limpiar la búsqueda o cambiar la pestaña de estado.
                    </p>
                    <button
                      type="button"
                      onClick={() => onStatusFilterChange('All')}
                      className="px-4 py-2 rounded-full bg-[#005BB2] hover:bg-[#004a91] text-white text-xs font-semibold cursor-pointer"
                    >
                      Mostrar Todos los Trámites
                    </button>
                  </td>
                </tr>
              ) : (
                filteredApplications.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`group transition-colors ${
                        isSelected ? 'bg-[#EBF3FC]/50' : 'hover:bg-slate-50/70'
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 pl-6 pr-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(item.id)}
                          aria-label={`Seleccionar trámite ${item.code} para ${item.companyName}`}
                          className="w-4 h-4 rounded border-slate-300 text-[#005BB2] focus:ring-[#005BB2] cursor-pointer accent-[#005BB2]"
                        />
                      </td>

                      {/* Code & Date */}
                      <td className="py-4 px-3 tabular-nums whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setInspectingApplicant(item)}
                          className="font-black text-[#005BB2] hover:text-[#FC6412] transition-colors cursor-pointer block text-left"
                        >
                          {item.code}
                        </button>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {item.dateApplied}
                        </span>
                      </td>

                      {/* Company with Thumbnail Logo */}
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3">
                          <CompanyLogo variant={item.logoVariant} size="sm" />
                          <div className="min-w-0">
                            <p className="font-bold text-[#172B3A] text-[13.5px] leading-snug truncate">
                              {item.companyName}
                            </p>
                            <p className="text-[11px] text-[#64748B] truncate">
                              {item.applicantName} ({item.experience})
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Modalidad */}
                      <td className="py-4 px-3 font-semibold text-[11px] text-slate-600 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {item.type}
                        </span>
                      </td>

                      {/* Position / Service */}
                      <td className="py-4 px-3 font-medium text-[#172B3A]">
                        <span className="font-semibold text-slate-800 line-clamp-1">
                          {item.position}
                        </span>
                        <span className="text-[11px] text-[#005BB2] font-bold">
                          {item.expectedSalary}
                        </span>
                      </td>

                      {/* Contact Icons */}
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2">
                          {item.hasPhone && (
                            <button
                              type="button"
                              onClick={() =>
                                setActiveContactToast({
                                  id: item.id,
                                  type: 'phone',
                                  value: item.phone,
                                  company: item.companyName,
                                })
                              }
                              aria-label={`Llamar o WhatsApp a ${item.companyName} al ${item.phone}`}
                              className="w-8 h-8 rounded-full bg-[#EBF3FC] hover:bg-[#005BB2] text-[#005BB2] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <Phone className="w-3.5 h-3.5 fill-current" />
                            </button>
                          )}
                          {item.hasEmail && (
                            <button
                              type="button"
                              onClick={() =>
                                setActiveContactToast({
                                  id: item.id,
                                  type: 'email',
                                  value: item.email,
                                  company: item.companyName,
                                })
                              }
                              aria-label={`Enviar correo a ${item.companyName} al ${item.email}`}
                              className="w-8 h-8 rounded-full bg-[#EBF3FC] hover:bg-[#005BB2] text-[#005BB2] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Status Pill */}
                      <td className="py-4 px-3">{renderStatusPill(item)}</td>

                      {/* 3-dots Action Menu */}
                      <td className="py-4 pl-1 pr-5 relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(openMenuId === item.id ? null : item.id)
                          }
                          aria-label={`Más acciones para ${item.code} ${item.companyName}`}
                          className="p-1.5 rounded-full text-slate-400 hover:text-[#172B3A] hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {openMenuId === item.id && (
                          <div className="absolute right-8 top-12 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30 text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                setInspectingApplicant(item);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-[#EBF3FC] font-bold text-[#172B3A] cursor-pointer"
                            >
                              Ver Expediente Completo
                            </button>
                            <div className="my-1 border-t border-slate-100" />
                            <p className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Actualizar Estado
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                onUpdateStatus(item.id, 'Candidate');
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-1.5 hover:bg-emerald-50 text-emerald-700 font-semibold flex items-center gap-2 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Marcar Validado SRI
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onUpdateStatus(item.id, 'On-Hold');
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-1.5 hover:bg-amber-50 text-amber-700 font-semibold flex items-center gap-2 cursor-pointer"
                            >
                              <PauseCircle className="w-3.5 h-3.5 text-[#FC6412]" />
                              Poner En Revisión
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onUpdateStatus(item.id, 'Pending');
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-1.5 hover:bg-slate-100 text-slate-700 font-semibold flex items-center gap-2 cursor-pointer"
                            >
                              <Clock className="w-3.5 h-3.5" />
                              Marcar Pendiente
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Pagination Row */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p className="font-medium tabular-nums">
          Mostrando {filteredApplications.length} trámites de la cartera MH
        </p>

        <div className="flex items-center gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              aria-label={`Página ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`w-9 h-9 rounded-full text-xs font-bold transition-all tabular-nums cursor-pointer ${
                currentPage === page
                  ? 'bg-[#005BB2] text-white shadow-xs'
                  : 'bg-white text-[#005BB2] border border-slate-200 hover:bg-[#EBF3FC]'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Inspect Detail Modal */}
      <AnimatePresence>
        {inspectingApplicant && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100"
              role="dialog"
              aria-modal="true"
              aria-labelledby="applicant-modal-title"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3.5">
                  <CompanyLogo
                    variant={inspectingApplicant.logoVariant}
                    size="md"
                  />
                  <div>
                    <span className="text-xs font-black text-[#005BB2] tabular-nums">
                      {inspectingApplicant.code}
                    </span>
                    <h3
                      id="applicant-modal-title"
                      className="text-base font-black text-[#172B3A]"
                    >
                      {inspectingApplicant.companyName}
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      {inspectingApplicant.position}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectingApplicant(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#F3F6FA] p-4 rounded-2xl text-xs mb-5">
                <div>
                  <p className="text-slate-400 font-medium">Representante / Titular</p>
                  <p className="font-bold text-[#172B3A] mt-0.5">
                    {inspectingApplicant.applicantName}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Identificación Fiscal</p>
                  <p className="font-bold text-[#005BB2] mt-0.5">
                    {inspectingApplicant.experience}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Modalidad Contable</p>
                  <p className="font-bold text-[#172B3A] mt-0.5">
                    {inspectingApplicant.type}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Honorarios / Tarifa</p>
                  <p className="font-bold text-[#FC6412] mt-0.5 tabular-nums">
                    {inspectingApplicant.expectedSalary}
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <p className="text-xs font-bold text-[#172B3A] mb-2">
                  Actualizar Estado del Trámite Fiscal
                </p>
                <div className="flex items-center gap-2">
                  {(['Pending', 'On-Hold', 'Candidate'] as ApplicationStatus[]).map(
                    (st) => {
                      const active = inspectingApplicant.status === st;
                      const label =
                        st === 'Pending'
                          ? 'Pendiente'
                          : st === 'On-Hold'
                          ? 'En Revisión'
                          : 'Validado SRI';
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => {
                            onUpdateStatus(inspectingApplicant.id, st);
                            setInspectingApplicant({
                              ...inspectingApplicant,
                              status: st,
                            });
                          }}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            active
                              ? 'bg-[#005BB2] text-white border-[#005BB2]'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-[#005BB2]'
                          }`}
                        >
                          {active && <Check className="w-3.5 h-3.5 text-[#FC6412]" />}
                          {label}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setInspectingApplicant(null)}
                  className="px-5 py-2.5 rounded-full bg-[#005BB2] hover:bg-[#004a91] text-white text-xs font-bold cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Application Modal */}
      <AnimatePresence>
        {showNewModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100"
              role="dialog"
              aria-modal="true"
              aria-labelledby="new-app-modal-title"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#FC6412]" />
                  <h3
                    id="new-app-modal-title"
                    className="text-base font-black text-[#172B3A]"
                  >
                    Registrar Nuevo Trámite MH
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateApplication} className="space-y-3.5">
                {formError && (
                  <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-xl font-medium">
                    {formError}
                  </p>
                )}

                <div>
                  <label
                    htmlFor="input-company-name"
                    className="block text-xs font-bold text-[#172B3A] mb-1"
                  >
                    Razón Social / Empresa / Cliente
                  </label>
                  <input
                    id="input-company-name"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ej. Distribuidora Andina S.A."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#005BB2]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="input-applicant-name"
                    className="block text-xs font-bold text-[#172B3A] mb-1"
                  >
                    Representante Legal / Titular
                  </label>
                  <input
                    id="input-applicant-name"
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Ej. Ing. Carlos Zambrano"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#005BB2]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="input-position"
                    className="block text-xs font-bold text-[#172B3A] mb-1"
                  >
                    Trámite / Servicio Contable
                  </label>
                  <input
                    id="input-position"
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Ej. Declaración Mensual IVA Form. 104 & Retenciones"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#005BB2]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="input-type"
                      className="block text-xs font-bold text-[#172B3A] mb-1"
                    >
                      Modalidad
                    </label>
                    <select
                      id="input-type"
                      value={employmentType}
                      onChange={(e) =>
                        setEmploymentType(e.target.value as EmploymentType)
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#005BB2]"
                    >
                      <option value="FULLTIME">MENSUAL CONTINUO</option>
                      <option value="PART TIME">SEMESTRAL RIMPE</option>
                      <option value="FREELANCE">TRÁMITE PUNTUAL</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="input-status"
                      className="block text-xs font-bold text-[#172B3A] mb-1"
                    >
                      Estado Inicial
                    </label>
                    <select
                      id="input-status"
                      value={status}
                      onChange={(e) =>
                        setStatus(e.target.value as ApplicationStatus)
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#005BB2]"
                    >
                      <option value="Pending">Pendiente</option>
                      <option value="On-Hold">En Revisión</option>
                      <option value="Candidate">Validado SRI</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#005BB2] hover:bg-[#004a91] text-white text-xs font-bold cursor-pointer"
                  >
                    Guardar Trámite
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
