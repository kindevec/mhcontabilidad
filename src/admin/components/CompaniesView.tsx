import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  SlidersHorizontal,
  Search,
  ChevronDown,
  ArrowDownWideNarrow,
  List,
  LayoutGrid,
  Users,
  Star,
  FileCheck2,
  CheckCircle2,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { CompanyItem, SortOrder } from '../types/jobie';
import { CompanyLogo } from './CompanyLogo';

interface CompaniesViewProps {
  companies: CompanyItem[];
  keyword: string;
  onKeywordChange: (val: string) => void;
  locationFilter: string;
  onLocationFilterChange: (loc: string) => void;
  suggestionSkill: string | null;
  onSuggestionSkillChange: (skill: string | null) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (sort: SortOrder) => void;
  onViewApplicationsForCompany: (companyName: string) => void;
}

const SUGGESTION_SERVICES = [
  'Declaraciones IVA',
  'Retenciones SRI',
  'Sistema Perseo',
  'Nómina IESS',
  'Auditoría Externa',
];

const LOCATIONS = [
  'Cobertura Nacional',
  'Quito & Pichincha',
  'Guayaquil & Guayas',
  'Cuenca & Azuay',
  'Machala & El Oro',
  'Ambato & Sierra Centro',
];

export const CompaniesView: React.FC<CompaniesViewProps> = ({
  companies,
  keyword,
  onKeywordChange,
  locationFilter,
  onLocationFilterChange,
  suggestionSkill,
  onSuggestionSkillChange,
  sortOrder,
  onSortOrderChange,
  onViewApplicationsForCompany,
}) => {
  const [showFee, setShowFee] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(
    companies[0]?.id || 'comp-1'
  );
  const [followedIds, setFollowedIds] = useState<string[]>(['comp-1', 'comp-3']);
  const [showAdvancedFilterPanel, setShowAdvancedFilterPanel] = useState(false);

  const selectedCompany =
    companies.find((c) => c.id === selectedCompanyId) || companies[0];

  const toggleFollow = (id: string) => {
    setFollowedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      aria-label="Directorio de Empresas Clientes"
      className="px-5 sm:px-8 pb-10"
    >
      {/* Breadcrumb */}
      <div className="mb-5 text-xs font-medium flex items-center gap-1.5">
        <span className="font-bold text-[#005BB2]">Portal Administrativo</span>
        <span className="text-[#9A9AA8]">/</span>
        <span className="text-[#172B3A] font-semibold">Directorio de Empresas Asesoradas</span>
      </div>

      {/* Main Content Split: Left/Center Search + Grid, Right Detail Sidebar Card */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-7 items-start">
        {/* Left 9 Columns */}
        <div className="xl:col-span-9">
          {/* Advanced Search Bar Card */}
          <div className="bg-white rounded-[22px] p-2.5 shadow-[0_10px_30px_rgba(31,31,46,0.04)] flex flex-col md:flex-row items-stretch md:items-center gap-2 border border-slate-100">
            {/* Location Selector */}
            <div className="relative flex items-center px-3 py-2 md:w-56 shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#EBF3FC] flex items-center justify-center mr-2.5 shrink-0">
                <MapPin className="w-4 h-4 text-[#005BB2]" />
              </div>
              <label htmlFor="company-location-select" className="sr-only">
                Seleccionar Ciudad o Región
              </label>
              <select
                id="company-location-select"
                value={locationFilter}
                onChange={(e) => onLocationFilterChange(e.target.value)}
                className="appearance-none w-full bg-transparent text-xs font-bold text-[#172B3A] pr-6 focus:outline-none cursor-pointer truncate"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="w-4 h-4 text-[#64748B] absolute right-4 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Vertical Divider */}
            <div
              className="hidden md:block w-px h-8 bg-slate-200 shrink-0"
              aria-hidden="true"
            />

            {/* Keyword Input */}
            <div className="flex-1 flex items-center px-3">
              <label htmlFor="company-keyword-input" className="sr-only">
                Buscar por razón social, sector, servicio o RUC
              </label>
              <input
                id="company-keyword-input"
                type="text"
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                placeholder="Buscar por empresa, RUC, sector económico o servicio contable..."
                className="w-full text-xs text-[#172B3A] placeholder-[#94A3B8] py-2 focus:outline-none"
              />
            </div>

            {/* Action Buttons: FILTER & FIND */}
            <div className="flex items-center gap-2 px-1">
              <button
                type="button"
                onClick={() => setShowAdvancedFilterPanel((prev) => !prev)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#EBF3FC] hover:bg-[#D9EAFB] text-[#005BB2] text-xs font-bold tracking-wide transition-colors cursor-pointer whitespace-nowrap"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#FC6412]" />
                <span>FILTRAR</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (companies.length > 0) {
                    setSelectedCompanyId(companies[0].id);
                  }
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#005BB2] hover:bg-[#004a91] text-white text-xs font-bold tracking-wide shadow-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5 text-white" />
                <span>BUSCAR</span>
              </button>
            </div>
          </div>

          {/* Optional expandable filter panel */}
          {showAdvancedFilterPanel && (
            <div className="mt-3 bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-[#172B3A]">Filtros Rápidos:</span>
                <button
                  type="button"
                  onClick={() => {
                    onLocationFilterChange('Cobertura Nacional');
                    onSuggestionSkillChange(null);
                    onKeywordChange('');
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#F3F6FA] text-[#005BB2] font-semibold hover:bg-slate-200 cursor-pointer"
                >
                  Restablecer
                </button>
                <button
                  type="button"
                  onClick={() => onKeywordChange('Comercio')}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-[#172B3A] font-medium hover:bg-slate-200 cursor-pointer"
                >
                  Sector Comercial
                </button>
                <button
                  type="button"
                  onClick={() => onKeywordChange('Industrial')}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-[#172B3A] font-medium hover:bg-slate-200 cursor-pointer"
                >
                  Sector Industrial
                </button>
              </div>
              <button
                type="button"
                onClick={() => setShowAdvancedFilterPanel(false)}
                className="text-[#005BB2] font-bold hover:underline cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* Suggestions Row */}
          <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs text-[#64748B] font-semibold mr-1">
              Servicio frecuente:
            </span>
            {SUGGESTION_SERVICES.map((skill) => {
              const isActive = suggestionSkill === skill;
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() =>
                    onSuggestionSkillChange(isActive ? null : skill)
                  }
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#005BB2] text-white shadow-xs'
                      : 'bg-[#EBF3FC] text-[#005BB2] hover:bg-[#D9EAFB]'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>

          {/* Subheader: Showing X Companies + Fee Toggle + Sort + View Mode */}
          <div className="mt-8 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-[15px] font-bold text-[#172B3A] tabular-nums">
                Mostrando {companies.length} Clientes Asesorados
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Cartera activa de contribuyentes y sociedades en Ecuador
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Fee Toggle Switch */}
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-semibold text-[#172B3A]">
                  Honorarios
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={showFee}
                  aria-label="Alternar visualización de honorarios"
                  onClick={() => setShowFee((prev) => !prev)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center cursor-pointer ${
                    showFee ? 'bg-[#CBE1F8] justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full transition-colors shadow-xs ${
                      showFee ? 'bg-[#005BB2]' : 'bg-white'
                    }`}
                  />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex items-center">
                <ArrowDownWideNarrow
                  className="w-4 h-4 text-[#005BB2] absolute left-4 pointer-events-none"
                  aria-hidden="true"
                />
                <label htmlFor="companies-sort-select" className="sr-only">
                  Ordenar clientes
                </label>
                <select
                  id="companies-sort-select"
                  value={sortOrder}
                  onChange={(e) =>
                    onSortOrderChange(e.target.value as SortOrder)
                  }
                  className="appearance-none bg-transparent border border-slate-300 hover:border-[#005BB2] text-xs font-bold text-[#172B3A] pl-10 pr-9 py-2 rounded-full focus:outline-none cursor-pointer"
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

              {/* List / Grid View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  aria-label="Vista en lista"
                  aria-pressed={viewMode === 'list'}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-[#005BB2] text-white border-[#005BB2] shadow-xs'
                      : 'bg-transparent text-[#005BB2] border-slate-300 hover:bg-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="Vista en cuadrícula"
                  aria-pressed={viewMode === 'grid'}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#005BB2] text-white border-[#005BB2] shadow-xs'
                      : 'bg-transparent text-[#005BB2] border-slate-300 hover:bg-white'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Companies Cards Grid or List */}
          {companies.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-xs border border-slate-100">
              <p className="font-bold text-[#172B3A] text-sm mb-1">
                No se encontraron empresas con esos criterios de búsqueda
              </p>
              <p className="text-xs text-[#64748B] mb-4">
                Prueba borrando el término de búsqueda o cambiando el filtro de servicio.
              </p>
              <button
                type="button"
                onClick={() => {
                  onKeywordChange('');
                  onLocationFilterChange('Cobertura Nacional');
                  onSuggestionSkillChange(null);
                }}
                className="px-5 py-2.5 rounded-full bg-[#005BB2] hover:bg-[#004a91] text-white text-xs font-semibold cursor-pointer"
              >
                Ver Todas las Empresas
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {companies.map((comp) => {
                const isSelected = selectedCompany?.id === comp.id;
                return (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => setSelectedCompanyId(comp.id)}
                    className={`group text-center bg-white rounded-[24px] px-5 py-7 transition-all flex flex-col items-center cursor-pointer border ${
                      isSelected
                        ? 'ring-2 ring-[#005BB2] border-[#005BB2] shadow-md -translate-y-0.5'
                        : 'border-slate-100 hover:border-slate-300 shadow-xs hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="mb-4 transition-transform duration-200 group-hover:scale-105">
                      <CompanyLogo variant={comp.logoVariant} size="lg" />
                    </div>
                    <h3 className="font-bold text-[14px] text-[#172B3A] group-hover:text-[#005BB2] transition-colors leading-tight line-clamp-2">
                      {comp.name}
                    </h3>
                    <p className="text-[11px] text-[#64748B] mt-1 line-clamp-1">
                      {comp.category}
                    </p>

                    {showFee && (
                      <p className="mt-3 text-[11px] font-bold text-[#005BB2] tabular-nums bg-[#EBF3FC] px-2.5 py-1 rounded-full">
                        {comp.salaryRange}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {companies.map((comp) => {
                const isSelected = selectedCompany?.id === comp.id;
                return (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => setSelectedCompanyId(comp.id)}
                    className={`w-full text-left bg-white rounded-2xl p-4 flex items-center justify-between gap-4 transition-all cursor-pointer border ${
                      isSelected
                        ? 'ring-2 ring-[#005BB2] border-[#005BB2] shadow-md'
                        : 'border-slate-100 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <CompanyLogo variant={comp.logoVariant} size="md" />
                      <div>
                        <h3 className="font-bold text-sm text-[#172B3A]">
                          {comp.name}
                        </h3>
                        <p className="text-xs text-[#64748B]">
                          {comp.category} · {comp.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {showFee && (
                        <p className="text-xs font-bold text-[#005BB2] tabular-nums">
                          {comp.salaryRange}
                        </p>
                      )}
                      <p className="text-[11px] text-[#FC6412] font-semibold tabular-nums">
                        {comp.openPositions} Módulos Activos
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right 3 Columns: Selected Company Detail Sidebar */}
        {selectedCompany && (
          <aside
            aria-label="Detalles de la Empresa Seleccionada"
            className="xl:col-span-3 bg-white rounded-[28px] p-6 shadow-xs border border-slate-100 sticky top-6"
          >
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
              <div className="mb-4">
                <CompanyLogo variant={selectedCompany.logoVariant} size="lg" />
              </div>
              <h3 className="text-base font-black text-[#172B3A]">
                {selectedCompany.name}
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                {selectedCompany.category}
              </p>

              <button
                type="button"
                onClick={() => toggleFollow(selectedCompany.id)}
                className={`mt-4 w-full py-2.5 rounded-full text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  followedIds.includes(selectedCompany.id)
                    ? 'bg-[#005BB2] text-white border-[#005BB2]'
                    : 'bg-white text-[#005BB2] border-[#005BB2] hover:bg-[#EBF3FC]'
                }`}
              >
                {followedIds.includes(selectedCompany.id) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#FC6412]" />
                    <span>Cliente Prioritario</span>
                  </>
                ) : (
                  <span>+ Marcar Prioritario</span>
                )}
              </button>
            </div>

            {/* Key Company Metrics */}
            <div className="py-5 space-y-4 border-b border-slate-100">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#EBF3FC] text-[#005BB2] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#172B3A] tabular-nums whitespace-nowrap">
                      {selectedCompany.employees}
                    </p>
                    <p className="text-[11px] text-[#64748B]">Personal Nómina</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#172B3A] tabular-nums whitespace-nowrap">
                      {selectedCompany.rating} / 5.0
                    </p>
                    <p className="text-[11px] text-[#64748B]">Cumplimiento</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <div className="w-9 h-9 rounded-full bg-[#F3F6FA] text-[#005BB2] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#172B3A]">
                    {selectedCompany.location}
                  </p>
                  <p className="text-[11px] text-[#64748B]">Sede / Jurisdicción</p>
                </div>
              </div>
            </div>

            {/* About Company */}
            <div className="py-5">
              <h4 className="text-xs font-bold text-[#172B3A] mb-2">
                Perfil de Asesoría Tributaria
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {selectedCompany.about}
              </p>

              <div className="mt-4 p-3.5 rounded-2xl bg-[#EBF3FC] border border-[#005BB2]/10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#005BB2]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FC6412]" />
                  <span>Servicio Principal</span>
                </div>
                <p className="text-xs font-bold text-[#172B3A] mt-1">
                  {selectedCompany.featuredPosition}
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5 tabular-nums">
                  {selectedCompany.salaryRange}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  onViewApplicationsForCompany(selectedCompany.name)
                }
                className="mt-4 w-full py-2.5 rounded-full bg-[#EBF3FC] hover:bg-[#005BB2] text-[#005BB2] hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-[#FC6412]" />
                <span>Ver Trámites Asociados ({selectedCompany.openPositions})</span>
              </button>
            </div>
          </aside>
        )}
      </div>
    </motion.section>
  );
};
