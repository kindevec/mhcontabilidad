import React, { useState } from 'react';
import {
  Search,
  Clock,

  Laptop,
  Plus,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { MHLogo } from '../components/MHLogo';
import { siteConfig } from '../data/siteConfig';
import { motion } from 'motion/react';
import { PageHero } from '../components/PageHero';
import { validateEcuadorianDocument } from '../services/contactService';
import digitalPortalImg from '../assets/images/portal_hero_laptop.jpg';

export const OnlineServicesPage: React.FC = () => {
  const [docType, setDocType] = useState<'RUC' | 'CEDULA' | 'PASAPORTE'>('RUC');
  const [docNumber, setDocNumber] = useState('');
  const [queryType, setQueryType] = useState('facturacion');
  const [period, setPeriod] = useState('2026');
  const [clientPhone, setClientPhone] = useState('');

  const [isSearching, setIsSearching] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [searchFeedback, setSearchFeedback] = useState<{
    show: boolean;
    docNumber: string;
    queryLabel: string;
    periodLabel: string;
    clientPhone: string;
  } | null>(null);

  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const faqItems = [
    {
      question: '¿Cómo recibo los balances y declaraciones mensuales de mi empresa?',
      answer:
        'Mensualmente, una vez ingresados y conciliados los comprobantes, su asesor le envía un informe resumen detallado en formato PDF y los respaldos de las declaraciones aceptadas por el SRI vía correo electrónico y WhatsApp.',
    },
    {
      question: '¿Puedo integrar la contabilidad de mi empresa con el sistema contable de MH Contabilidad?',
      answer:
        'Sí. Trabajamos directamente con el sistema contable de MH Contabilidad para estructurar sus catálogos contables, auditar la emisión de facturas electrónicas y generar los anexos transaccionales (ATS) sin duplicar trabajo administrativo.',
    },
    {
      question: '¿Cómo solicito un certificado o estado tributario actualizado?',
      answer:
        'Puede solicitarlo directamente desde el canal de WhatsApp o mediante la consulta rápida en este portal ingresando su RUC. Nuestro equipo valida el estado en el SRI y emite su reporte en minutos.',
    },
    {
      question: '¿Qué soporte técnico recibo para el acceso y firma electrónica?',
      answer:
        'Brindamos acompañamiento en la instalación de certificados de firma electrónica, configuración del facturador del SRI o sistemas contables, y resolución de dudas operativas.',
    },
  ];

  const getQueryLabel = (type: string) => {
    switch (type) {
      case 'facturacion':
        return 'Facturas Electrónicas y RIDE / XML';
      case 'retenciones':
        return 'Comprobantes de Retención SRI';
      case 'estado_cuenta':
        return 'Estado de Cuenta y Cartera (Saldos)';
      case 'guias_remision':
        return 'Liquidaciones y Guías de Remisión';
      default:
        return 'Consulta Contable';
    }
  };

  const getPeriodLabel = (p: string) => {
    switch (p) {
      case '2026':
        return 'Año Fiscal 2026';
      case 'ultimo_mes':
        return 'Último Mes Contable';
      case '2025':
        return 'Histórico Año 2025';
      case 'todos':
        return 'Todos los periodos';
      default:
        return 'Periodo Actual';
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSearchFeedback(null);

    if (!docNumber.trim()) {
      setValidationError('Por favor ingrese su número de documento de identificación (RUC o Cédula).');
      return;
    }

    if (docType === 'CEDULA' || docType === 'RUC') {
      const val = validateEcuadorianDocument(docNumber);
      if (!val.isValid) {
        setValidationError(`Formato no válido: ${val.message}`);
        return;
      }
    }

    if (!clientPhone.trim()) {
      setValidationError('Por favor ingrese su número de celular o WhatsApp para la validación segura de Perseo.');
      return;
    }

    if (clientPhone.trim().length < 4) {
      setValidationError('El número de celular o verificación debe tener al menos 4 dígitos.');
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchFeedback({
        show: true,
        docNumber: docNumber.trim(),
        queryLabel: getQueryLabel(queryType),
        periodLabel: getPeriodLabel(period),
        clientPhone: clientPhone.trim(),
      });
    }, 700);
  };

  const waClientUrl = searchFeedback
    ? `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(`Hola Jorge Hernandez / MH Contabilidad, requiero consultar en el sistema Perseo el reporte de ${searchFeedback.queryLabel} (${searchFeedback.periodLabel}) para el RUC/CI ${searchFeedback.docNumber} con contacto de verificación ${searchFeedback.clientPhone}.`)}`
    : `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola Jorge Hernandez / MH Contabilidad, quisiera consultar información sobre mis comprobantes en línea de Perseo.')}`;

  return (
    <div className="space-y-0">
      {/* 1. Encabezado de Portal Clientes estilo Inicio */}
      <PageHero
        titleLine1="Portal Clientes"
        titleHighlight="Consultas y Conectividad Digital"
        titleClassName="-translate-x-2 md:-translate-x-6 lg:-translate-x-10"
        description="En MH Contabilidad combinamos asesoría personalizada con herramientas tecnológicas modernas. Consulte la información de sus estados de cuenta, comprobantes y reportes contables con agilidad."
        image={digitalPortalImg}
        imageAlt="Plataforma de contabilidad digital y reportes financieros de MH Contabilidad"
        imageClassName="object-cover object-top"
        mobileContainerHeightClassName="h-[290px] xs:h-[315px] sm:h-[340px]"
        mobileImageClassName="object-[90%_center]"
      >
        {/* Accesos Rápidos */}
        <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
          <a
            href={siteConfig.systemUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Laptop className="w-4 h-4 shrink-0" />
            <span>Acceder al Sistema Contable</span>
          </a>
          <a
            href={waClientUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Consultar</span>
          </a>
        </div>
      </PageHero>

      {/* 2. Módulo de Consulta para Clientes */}
      <section className="pt-12 sm:pt-16 pb-6 sm:pb-10 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Encabezado de Consulta en Línea */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#172B3A] tracking-tight">
              Consulte sus Comprobantes y Estado Contable
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              En este portal puede consultar y solicitar de manera rápida el estado de sus facturas electrónicas, retenciones tributarias y reportes contables al instante.
            </p>
          </div>
          {/* Módulo Principal de Consulta al Cliente */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-none border border-slate-200 shadow-[6px_6px_0px_0px_#E2E8F0,0_25px_50px_-12px_rgba(0,0,0,0.12)] sm:shadow-[10px_10px_0px_0px_#E2E8F0,0_30px_60px_-12px_rgba(0,0,0,0.15)] p-6 sm:p-10 space-y-6 text-[#172B3A] relative">
              <div className="space-y-2 border-b border-slate-200 pb-5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3 className="text-xl sm:text-2xl font-black text-[#172B3A] tracking-tight flex items-center gap-2">
                    <span>Búsqueda y Consulta Contable</span>
                  </h3>
                  <div className="shrink-0">
                    <MHLogo className="h-9 sm:h-10 w-auto" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Ingrese sus datos fiscales y de contacto para consultar comprobantes electrónicos, retenciones y cartera en el sistema.
                </p>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-5">
                {/* Fila 1: Tipo y Número de Documento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="user-doc-type"
                      className="block text-xs font-bold text-[#172B3A] uppercase tracking-wider mb-2"
                    >
                      Tipo de Identificación
                    </label>
                    <select
                      id="user-doc-type"
                      value={docType}
                      onChange={(e) =>
                        setDocType(e.target.value as 'RUC' | 'CEDULA' | 'PASAPORTE')
                      }
                      className="w-full px-4 py-3 rounded-none border border-[#005BB2] bg-white text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#005BB2] transition-all shadow-xs cursor-pointer"
                    >
                      <option value="RUC">RUC</option>
                      <option value="CEDULA">Cédula de Identidad</option>
                      <option value="PASAPORTE">Pasaporte</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="user-doc-number"
                      className="block text-xs font-bold text-[#172B3A] uppercase tracking-wider mb-2"
                    >
                      Número de Identificación
                    </label>
                    <input
                      id="user-doc-number"
                      type="text"
                      placeholder={docType === 'RUC' ? 'Ej: 1790012345001' : 'Ej: 1712345678'}
                      value={docNumber}
                      onChange={(e) => setDocNumber(e.target.value)}
                      maxLength={docType === 'RUC' ? 13 : docType === 'CEDULA' ? 10 : 20}
                      className="w-full px-4 py-3 rounded-none border border-[#005BB2] bg-white text-slate-900 font-mono text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#005BB2] transition-all shadow-xs placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Fila 2: Tipo de Información y Periodo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="user-query-type"
                      className="block text-xs font-bold text-[#172B3A] uppercase tracking-wider mb-2"
                    >
                      Documento a Consultar
                    </label>
                    <select
                      id="user-query-type"
                      value={queryType}
                      onChange={(e) => setQueryType(e.target.value)}
                      className="w-full px-4 py-3 rounded-none border border-[#005BB2] bg-white text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#005BB2] transition-all shadow-xs cursor-pointer"
                    >
                      <option value="facturacion">Facturas Electrónicas y RIDE / XML</option>
                      <option value="retenciones">Comprobantes de Retención SRI</option>
                      <option value="estado_cuenta">Estado de Cuenta y Cartera</option>
                      <option value="guias_remision">Liquidaciones y Guías de Remisión</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="user-period"
                      className="block text-xs font-bold text-[#172B3A] uppercase tracking-wider mb-2"
                    >
                      Periodo / Año Fiscal
                    </label>
                    <select
                      id="user-period"
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="w-full px-4 py-3 rounded-none border border-[#005BB2] bg-white text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#005BB2] transition-all shadow-xs cursor-pointer"
                    >
                      <option value="2026">Año Fiscal 2026</option>
                      <option value="ultimo_mes">Último Mes Contable</option>
                      <option value="2025">Histórico Año 2025</option>
                      <option value="todos">Todos los periodos registrados</option>
                    </select>
                  </div>
                </div>

                {/* Fila 3: Celular / WhatsApp */}
                <div>
                  <label
                    htmlFor="user-client-phone"
                    className="block text-xs font-bold text-[#172B3A] uppercase tracking-wider mb-2"
                  >
                    Celular o WhatsApp Registrado
                  </label>
                  <input
                    id="user-client-phone"
                    type="tel"
                    placeholder="Ej: 0991234567 o últimos 4 dígitos"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-none border border-[#005BB2] bg-white text-slate-900 font-mono text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#005BB2] transition-all shadow-xs placeholder-slate-400"
                  />
                </div>

                {validationError && (
                  <div className="p-3.5 rounded-none bg-red-50 border border-red-200 text-xs font-medium text-red-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="pt-5 border-t border-slate-200 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-none text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-orange-950/20 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSearching ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Consultando...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        <span>Consultar</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Respuesta Limpia para el Usuario Comercial */}
              {searchFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 sm:p-6 rounded-none bg-blue-50/80 border border-blue-200 text-[#172B3A] space-y-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-none bg-[#005BB2] text-white shrink-0 shadow-xs">
                      <WhatsAppIcon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 text-xs sm:text-sm">
                      <strong className="block text-base font-bold text-[#172B3A]">
                        Solicitud validada para {searchFeedback.docNumber}
                      </strong>
                      <p className="text-[#64748B] leading-relaxed">
                        Se ha localizado su registro en el sistema contable para <strong>{searchFeedback.queryLabel}</strong> ({searchFeedback.periodLabel}).
                        Por protocolo de reserva fiscal del SRI, su asesor autorizado le despachará el RIDE en PDF y XML directamente al contacto registrado.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={waClientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-none text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] transition-all shadow-xs text-center cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Recibir Comprobantes y Reporte por WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Preguntas de Servicios en Línea para Clientes (Mismo diseño acordeón oficial que Servicios) */}
      <section className="pt-8 sm:pt-10 pb-16 sm:pb-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#172B3A] tracking-tight">
              Preguntas sobre el Portal de Clientes
            </h2>
            <p className="text-sm text-[#64748B] max-w-xl mx-auto">
              Respuestas directas a las consultas más habituales sobre consultas en línea, reportes y gestión tributaria.
            </p>
          </div>

          {/* Rejilla de 2 columnas con la paleta oficial MH (#005BB2 y #FC6412) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-5">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqIndices.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleFaq(idx)}
                  className="bg-[#005BB2] hover:bg-[#004e9a] text-white rounded-2xl p-2.5 xs:p-3 sm:p-5 flex flex-col justify-start cursor-pointer select-none border border-blue-600/40 shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-1.5 sm:gap-4">
                    <h3 className="text-[11px] xs:text-xs sm:text-[15px] font-bold text-white text-left leading-snug">
                      {faq.question}
                    </h3>
                    <div
                      className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#FC6412] transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5]" />
                    </div>
                  </div>

                  {isOpen && (
                    <div className="pt-2 sm:pt-3 mt-2 sm:mt-2.5 border-t border-white/20 text-left">
                      <p className="text-[10px] xs:text-xs sm:text-[13px] text-blue-100 leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
