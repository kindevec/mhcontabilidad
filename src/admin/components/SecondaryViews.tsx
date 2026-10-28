import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileCheck2,
  Building2,
  CheckCircle2,
  Clock,
  Send,
  ArrowUpRight,
  BookOpen,
  TrendingUp,
  Percent,
} from 'lucide-react';
import {
  ApplicationItem,
  CompanyItem,
  MessageItem,
  NavSection,
  NewsItem,
} from '../types/jobie';
import { CompanyLogo } from './CompanyLogo';
import { getApplicationCounts } from '../utils/jobieLogic';

export const DashboardOverview: React.FC<{
  applications: ApplicationItem[];
  companies: CompanyItem[];
  onNavigate: (section: NavSection) => void;
}> = ({ applications, companies, onNavigate }) => {
  const counts = getApplicationCounts(applications);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      aria-label="Resumen Ejecutivo MH Contabilidad"
      className="px-5 sm:px-8 pb-10 space-y-6"
    >
      {/* Top KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <button
          type="button"
          onClick={() => onNavigate('applications')}
          className="text-left bg-white rounded-[24px] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer border border-slate-100/80 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#EBF3FC] text-[#005BB2] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <FileCheck2 className="w-5 h-5 text-[#005BB2]" />
          </div>
          <p className="text-2xl font-black text-[#172B3A] tabular-nums">
            {counts.All}
          </p>
          <p className="text-xs text-[#64748B] font-medium mt-1">Trámites y Obligaciones</p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('applications')}
          className="text-left bg-white rounded-[24px] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer border border-slate-100/80 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-[#172B3A] tabular-nums">
            {counts.Candidate}
          </p>
          <p className="text-xs text-[#64748B] font-medium mt-1">Validados y Presentados</p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('applications')}
          className="text-left bg-white rounded-[24px] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer border border-slate-100/80 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#FFF0E6] text-[#FC6412] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-[#172B3A] tabular-nums">
            {counts.Pending + counts['On-Hold']}
          </p>
          <p className="text-xs text-[#64748B] font-medium mt-1">En Revisión / Pendientes</p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('search-job')}
          className="text-left bg-white rounded-[24px] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer border border-slate-100/80 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-sky-50 text-[#005BB2] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5 text-[#FC6412]" />
          </div>
          <p className="text-2xl font-black text-[#172B3A] tabular-nums">
            {companies.length}
          </p>
          <p className="text-xs text-[#64748B] font-medium mt-1">Empresas Asesoradas</p>
        </button>
      </div>

      {/* Dual Preview Cards for Applications & Companies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-[28px] p-6 shadow-xs border border-slate-100/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#172B3A]">
                Trámites Fiscales Recientes
              </h2>
              <p className="text-xs text-[#64748B]">
                Últimas declaraciones, auditorías y formularios procesados
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('applications')}
              className="flex items-center gap-1 text-xs font-bold text-[#005BB2] hover:text-[#004a91] hover:underline cursor-pointer"
            >
              <span>Ver todos</span>
              <ArrowUpRight className="w-4 h-4 text-[#FC6412]" />
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {applications.slice(0, 4).map((app) => (
              <div
                key={app.id}
                className="py-3 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <CompanyLogo variant={app.logoVariant} size="sm" />
                  <div className="min-w-0">
                    <p className="font-bold text-[#172B3A] truncate">{app.position}</p>
                    <p className="text-[#64748B] truncate">
                      {app.companyName} · {app.applicantName}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-[11px] px-2.5 py-1 rounded-full bg-[#EBF3FC] text-[#005BB2] tabular-nums shrink-0">
                  {app.code}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-xs border border-slate-100/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#172B3A]">
                Clientes Corporativos
              </h2>
              <p className="text-xs text-[#64748B]">
                Compañías con soporte contable y tributario continuo
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('search-job')}
              className="flex items-center gap-1 text-xs font-bold text-[#005BB2] hover:text-[#004a91] hover:underline cursor-pointer"
            >
              <span>Ver directorio</span>
              <ArrowUpRight className="w-4 h-4 text-[#FC6412]" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {companies.slice(0, 4).map((comp) => (
              <button
                key={comp.id}
                type="button"
                onClick={() => onNavigate('search-job')}
                className="p-3.5 rounded-2xl bg-[#F8FAFC] hover:bg-[#EBF3FC] transition-colors text-left flex items-center gap-3 cursor-pointer border border-slate-100"
              >
                <CompanyLogo variant={comp.logoVariant} size="sm" />
                <div className="min-w-0">
                  <p className="font-bold text-xs text-[#172B3A] truncate">
                    {comp.name}
                  </p>
                  <p className="text-[11px] text-[#64748B] truncate">
                    {comp.location}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export const MessagesView: React.FC<{
  messages: MessageItem[];
  onSendMessage: (threadId: string, text: string) => void;
}> = ({ messages, onSendMessage }) => {
  const [selectedId, setSelectedId] = useState(messages[0]?.id || 'msg-1');
  const [draft, setDraft] = useState('');

  const activeThread =
    messages.find((m) => m.id === selectedId) || messages[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || !activeThread) return;
    onSendMessage(activeThread.id, draft.trim());
    setDraft('');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      aria-label="Consultas de Asesoría Tributaria"
      className="px-5 sm:px-8 pb-10"
    >
      <div className="bg-white rounded-[28px] shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[520px] border border-slate-100">
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-100 p-5 space-y-2">
          <h2 className="text-sm font-bold text-[#172B3A] px-2 pb-2">
            Consultas Activas de Clientes
          </h2>
          {messages.map((thread) => {
            const active = thread.id === activeThread?.id;
            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => setSelectedId(thread.id)}
                className={`w-full text-left p-3.5 rounded-2xl transition-colors flex items-start gap-3 cursor-pointer ${
                  active ? 'bg-[#EBF3FC] border border-[#005BB2]/20' : 'hover:bg-slate-50'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                  style={{ backgroundColor: thread.avatarBg }}
                >
                  {thread.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-[#172B3A] truncate">
                      {thread.sender}
                    </p>
                    <span className="text-[10px] text-[#64748B] tabular-nums">
                      {thread.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#005BB2] font-semibold truncate">
                    {thread.company}
                  </p>
                  <p className="text-xs text-slate-500 truncate mt-1">
                    {thread.preview}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {activeThread && (
          <div className="lg:col-span-8 flex flex-col justify-between p-6">
            <div>
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#172B3A]">
                    {activeThread.sender}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {activeThread.role} · {activeThread.company}
                  </p>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                  Cliente Verificado
                </span>
              </div>

              <div className="py-5 space-y-3 max-h-[340px] overflow-y-auto">
                {activeThread.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      m.fromMe ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        m.fromMe
                          ? 'bg-[#005BB2] text-white rounded-br-xs'
                          : 'bg-[#F3F6FA] text-[#172B3A] rounded-bl-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 tabular-nums">
                      {m.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSend}
              className="pt-3 border-t border-slate-100 flex items-center gap-3"
            >
              <label htmlFor="message-reply-input" className="sr-only">
                Responder al cliente
              </label>
              <input
                id="message-reply-input"
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Responder como Jorge Hernández a ${activeThread.sender}...`}
                className="flex-1 bg-[#F3F6FA] px-4 py-3 rounded-full text-xs text-[#172B3A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005BB2]/30 border border-transparent focus:border-[#005BB2]/20"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-full bg-[#005BB2] hover:bg-[#004a91] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-[#FC6412]" />
                <span>Enviar</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export const StatisticsView: React.FC<{
  applications: ApplicationItem[];
  companies: CompanyItem[];
}> = ({ applications, companies }) => {
  const counts = getApplicationCounts(applications);
  const total = Math.max(counts.All, 1);

  const metrics = [
    {
      label: 'Efectividad en Declaraciones SRI',
      value: `${Math.round((counts.Candidate / total) * 100)}%`,
      detail: `${counts.Candidate} de ${counts.All} trámites validados sin multas ni observaciones`,
    },
    {
      label: 'Trámites en Revisión Técnica',
      value: `${Math.round((counts.Pending / total) * 100)}%`,
      detail: `${counts.Pending} expedientes en conciliación contable y anexos`,
    },
    {
      label: 'Auditorías y Procesos Especiales',
      value: `${Math.round((counts['On-Hold'] / total) * 100)}%`,
      detail: `${counts['On-Hold']} trámites en espera de documentación o firmas`,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      aria-label="Estadísticas y Cumplimiento Tributario"
      className="px-5 sm:px-8 pb-10 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-[24px] p-6 shadow-xs border border-slate-100">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#64748B]">{m.label}</p>
              <TrendingUp className="w-4 h-4 text-[#FC6412]" />
            </div>
            <p className="text-3xl font-black text-[#005BB2] mt-2 tabular-nums">
              {m.value}
            </p>
            <p className="text-xs text-[#172B3A] mt-2 font-medium">{m.detail}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[28px] p-6 shadow-xs border border-slate-100">
        <h2 className="text-base font-bold text-[#172B3A] mb-4">
          Servicios y Soporte Contable por Empresa Cliente
        </h2>
        <div className="space-y-4">
          {companies.map((comp) => {
            const pct = Math.min(100, comp.openPositions * 25);
            return (
              <div key={comp.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#172B3A]">
                    {comp.name}{' '}
                    <span className="font-normal text-[#64748B]">
                      · {comp.category}
                    </span>
                  </span>
                  <span className="font-bold text-[#005BB2] tabular-nums">
                    {comp.openPositions} Módulos Activos ({comp.salaryRange})
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#EBF3FC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#005BB2] to-[#FC6412] rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export const NewsView: React.FC<{ news: NewsItem[] }> = ({ news }) => (
  <motion.section
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.18 }}
    aria-label="Actualidad Tributaria y Resoluciones SRI"
    className="px-5 sm:px-8 pb-10"
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {news.map((item) => (
        <article
          key={item.id}
          className="bg-white rounded-[28px] p-6 shadow-xs flex flex-col justify-between border border-slate-100 hover:shadow-md transition-shadow"
        >
          <div>
            <div className="flex items-center gap-2 text-xs text-[#005BB2] font-bold mb-3">
              <BookOpen className="w-4 h-4 text-[#FC6412]" />
              <span>{item.category}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-[#64748B] font-normal">{item.readTime}</span>
            </div>
            <h2 className="text-base font-bold text-[#172B3A] leading-snug mb-2.5">
              {item.title}
            </h2>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {item.summary}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-semibold text-[#172B3A]">{item.author}</span>
            <span className="tabular-nums">{item.date}</span>
          </div>
        </article>
      ))}
    </div>
  </motion.section>
);
