import React, { useState } from 'react';
import {
  Search,
  Clock,
  Laptop,
  Plus,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  Receipt,
  Truck,
  DollarSign,
  Calendar,
  Building,
  RotateCcw,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { MHLogo } from '../components/MHLogo';
import { siteConfig } from '../data/siteConfig';
import { motion, AnimatePresence } from 'motion/react';
import { PageHero } from '../components/PageHero';
import { validateEcuadorianDocument } from '../services/contactService';
import { queryPerseo } from '../services/perseoService';
import {
  PerseoQueryType,
  PerseoQueryResponse,
  PerseoFactura,
  PerseoRetencion,
  PerseoEstadoCuentaItem,
  PerseoGuiaRemision,
  PerseoCobro,
} from '../types';
import digitalPortalImg from '../assets/images/portal_hero_laptop.jpg';

export interface OnlineServicesPageProps {
  initialTab?: 'cliente' | 'proveedor';
}

export const OnlineServicesPage: React.FC<OnlineServicesPageProps> = ({ initialTab = 'cliente' }) => {
  const [portalTab, setPortalTab] = useState<'cliente' | 'proveedor'>(initialTab);
  const [docType, setDocType] = useState<'RUC' | 'CEDULA' | 'PASAPORTE'>('RUC');
  const [docNumber, setDocNumber] = useState('');
  const [queryType, setQueryType] = useState<PerseoQueryType>(
    initialTab === 'proveedor' ? 'proveedor_cxp' : 'facturacion'
  );
  const [period, setPeriod] = useState('2026');
  const [referenceDocNumber, setReferenceDocNumber] = useState('');

  const [isSearching, setIsSearching] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [queryResponse, setQueryResponse] = useState<PerseoQueryResponse | null>(null);
  const [expandedFacturaId, setExpandedFacturaId] = useState<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleSwitchTab = (tab: 'cliente' | 'proveedor') => {
    setPortalTab(tab);
    setQueryType(tab === 'proveedor' ? 'proveedor_cxp' : 'facturacion');
    setQueryResponse(null);
    setValidationError(null);
    setDocNumber('');
    setReferenceDocNumber('');
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

  const getQueryLabel = (type: PerseoQueryType) => {
    switch (type) {
      case 'facturacion':
        return 'Facturas Electrónicas de Venta';
      case 'retenciones':
        return 'Comprobantes de Retención SRI (Ventas y Compras)';
      case 'estado_cuenta':
        return 'Estado de Cuenta y Cartera (Saldos Pendientes)';
      case 'guias_remision':
        return 'Guías de Remisión de Transporte';
      case 'liquidaciones':
        return 'Liquidaciones de Compra Electrónicas';
      case 'cobros':
        return 'Historial de Cobros y Abonos Realizados';
      case 'proformas':
        return 'Proformas y Cotizaciones Comerciales';
      case 'pedidos':
        return 'Pedidos Registrados en el Sistema';
      case 'proveedor_cxp':
        return 'Cuentas por Pagar (CxP) y Estado de Cuenta';
      case 'proveedor_pagos':
        return 'Historial de Pagos y Transferencias Recibidas';
      case 'proveedor_retenciones':
        return 'Comprobantes de Retención Emitidos al Proveedor';
      case 'proveedor_facturas':
        return 'Facturas de Compra Registradas y Aprobadas';
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

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/D';
    const clean = dateStr.replace(/[^0-9]/g, '');
    if (clean.length >= 8) {
      const year = clean.substring(0, 4);
      const month = clean.substring(4, 6);
      const day = clean.substring(6, 8);
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  const formatCurrency = (val?: number | string) => {
    const num = Number(val || 0);
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(num);
  };

  const handleCopyClave = (clave: string) => {
    navigator.clipboard.writeText(clave);
    setCopiedKey(clave);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const cleanDoc = docNumber.trim();
    if (!cleanDoc) {
      setValidationError('Por favor ingrese su número de documento de identificación (RUC o Cédula).');
      return;
    }

    if (docType === 'CEDULA' || docType === 'RUC') {
      const val = validateEcuadorianDocument(cleanDoc);
      if (!val.isValid) {
        setValidationError(`Formato no válido: ${val.message}`);
        return;
      }
    }

    const cleanRefDoc = referenceDocNumber.trim();
    if (!cleanRefDoc || cleanRefDoc.length < 3) {
      setValidationError(
        'Por seguridad y protección de datos (LOPDP), ingrese el número de una factura o comprobante de referencia (mínimo 3 dígitos).'
      );
      return;
    }

    setIsSearching(true);
    setQueryResponse(null);
    setExpandedFacturaId(null);

    try {
      const res = await queryPerseo({
        identificacion: cleanDoc,
        tipoDocumento: docType,
        tipoConsulta: queryType,
        portalTipo: portalTab,
        periodo: period,
        numeroDocumento: cleanRefDoc,
      });

      if (!res.success) {
        setValidationError(res.message || 'No se pudo verificar la consulta.');
        setQueryResponse(null);
      } else {
        setQueryResponse(res);
      }
    } catch (err) {
      setValidationError(err instanceof Error ? err.message : 'Error inesperado al consultar Perseo.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. Encabezado de Portal Clientes estilo Inicio */}
      <PageHero
        titleLine1="Portal Clientes"
        titleHighlight="Consultas y Conectividad Digital"
        titleClassName="md:text-[clamp(1.45rem,1.9vw,2.25rem)]"
        description="En MH Contabilidad combinamos asesoría personalizada con herramientas tecnológicas modernas. Consulte la información de sus estados de cuenta, comprobantes y reportes contables con agilidad."
        image={digitalPortalImg}
        imageAlt="Plataforma de contabilidad digital y reportes financieros de MH Contabilidad"
        imageClassName="object-cover object-center md:object-[center_60%]"
        mobileContainerHeightClassName="h-[290px] xs:h-[315px] sm:h-[340px]"
        mobileImageClassName="object-[90%_center]"
      >
        {/* Accesos Rápidos */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 w-full">
          <a
            href={siteConfig.systemUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200 shrink-0"
          >
            <Laptop className="w-4 h-4 shrink-0" />
            <span>Acceder al Sistema Contable</span>
          </a>
          <a
            href={`https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola Jorge Hernandez / MH Contabilidad, requiero asesoría con mis comprobantes en línea.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200 shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Contactar Asesor</span>
          </a>
        </div>
      </PageHero>

      {/* 2. Módulo de Consulta para Clientes */}
      <section className="pt-12 sm:pt-16 pb-6 sm:pb-10 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Encabezado de Consulta en Línea */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#172B3A] tracking-tight">
              {portalTab === 'proveedor'
                ? 'Portal de Proveedores: Cuentas por Pagar y Pagos'
                : 'Consulte sus Comprobantes y Estado Contable'}
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              {portalTab === 'proveedor'
                ? 'Consulte en tiempo real el saldo de sus facturas registradas, retenciones emitidas, abonos y transferencias de pago en el sistema contable Perseo.'
                : 'Consulte en tiempo real el estado de sus facturas electrónicas, retenciones tributarias, cartera y comprobantes registrados en el sistema contable Perseo.'}
            </p>
          </div>

          {/* Módulo Principal de Consulta al Cliente / Proveedor */}
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-none border border-slate-200 shadow-[6px_6px_0px_0px_#E2E8F0,0_25px_50px_-12px_rgba(0,0,0,0.12)] sm:shadow-[10px_10px_0px_0px_#E2E8F0,0_30px_60px_-12px_rgba(0,0,0,0.15)] p-6 sm:p-10 space-y-6 text-[#172B3A] relative">
              
              {/* Selector de Pestaña: Clientes vs Proveedores */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
                <button
                  type="button"
                  onClick={() => handleSwitchTab('cliente')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    portalTab === 'cliente'
                      ? 'bg-[#005BB2] text-white shadow-sm ring-2 ring-[#005BB2]/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Portal Clientes</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchTab('proveedor')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    portalTab === 'proveedor'
                      ? 'bg-[#005BB2] text-white shadow-sm ring-2 ring-[#005BB2]/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Portal Proveedores</span>
                </button>
              </div>

              <div className="space-y-2 border-b border-slate-200 pb-5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3 className="text-xl sm:text-2xl font-black text-[#172B3A] tracking-tight flex items-center gap-2">
                    <span>
                      {portalTab === 'proveedor'
                        ? 'Consultas para Proveedores Registrados'
                        : 'Búsqueda y Consulta Contable para Clientes'}
                    </span>
                  </h3>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Conectado a Perseo Cloud
                    </span>
                    <MHLogo className="h-9 sm:h-10 w-auto" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {portalTab === 'proveedor'
                    ? 'Ingrese el RUC o Cédula de su empresa proveedora para consultar sus cuentas por pagar, retenciones aplicadas o historial de transferencias recibidas.'
                    : 'Seleccione el documento a consultar e ingrese su número de identificación fiscal para visualizar sus registros en línea.'}
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
                      {portalTab === 'proveedor' ? 'RUC / Identificación del Proveedor' : 'Número de Identificación'}
                    </label>
                    <input
                      id="user-doc-number"
                      type="text"
                      placeholder={
                        portalTab === 'proveedor'
                          ? 'Ej: 1790554295001 (RUC Proveedor)'
                          : docType === 'RUC'
                          ? 'Ej: 1790012345001'
                          : 'Ej: 1712345678'
                      }
                      value={docNumber}
                      onChange={(e) => setDocNumber(e.target.value)}
                      maxLength={docType === 'RUC' ? 13 : docType === 'CEDULA' ? 10 : 20}
                      className="w-full px-4 py-3 rounded-none border border-[#005BB2] bg-white text-slate-900 font-mono text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#005BB2] transition-all shadow-xs placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Fila 2: Documento a Consultar y Periodo */}
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
                      onChange={(e) => setQueryType(e.target.value as PerseoQueryType)}
                      className="w-full px-4 py-3 rounded-none border border-[#005BB2] bg-white text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#005BB2] transition-all shadow-xs cursor-pointer"
                    >
                      {portalTab === 'proveedor' ? (
                        <>
                          <option value="proveedor_cxp">Estado de Cuenta y Cuentas por Pagar (CxP)</option>
                          <option value="proveedor_pagos">Historial de Pagos y Transferencias Recibidas</option>
                          <option value="proveedor_retenciones">Comprobantes de Retención SRI Emitidos</option>
                          <option value="proveedor_facturas">Facturas de Compra Registradas</option>
                        </>
                      ) : (
                        <>
                          <option value="facturacion">Facturas Electrónicas de Venta</option>
                          <option value="retenciones">Comprobantes de Retención SRI</option>
                          <option value="estado_cuenta">Estado de Cuenta y Cartera (Saldos)</option>
                          <option value="guias_remision">Guías de Remisión de Transporte</option>
                          <option value="liquidaciones">Liquidaciones de Compra</option>
                          <option value="cobros">Historial de Cobros y Abonos</option>
                          <option value="proformas">Proformas y Cotizaciones</option>
                          <option value="pedidos">Pedidos Registrados</option>
                        </>
                      )}
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
                      <option value="ultimo_mes">Último Mes Contable (30 días)</option>
                      <option value="2025">Histórico Año 2025</option>
                      <option value="todos">Todos los periodos registrados</option>
                    </select>
                  </div>
                </div>

                {/* Fila 3: Validación de Dato Cruzado (Obligatorio - LOPDP) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="user-ref-doc"
                      className="block text-xs font-bold text-[#172B3A] uppercase tracking-wider"
                    >
                      Nº de Factura o Comprobante de Verificación
                    </label>
                    <span className="text-[11px] text-[#FC6412] font-bold uppercase tracking-wide">
                      Obligatorio · Seguridad LOPDP
                    </span>
                  </div>
                  <input
                    id="user-ref-doc"
                    type="text"
                    placeholder={
                      portalTab === 'proveedor'
                        ? 'Ej: 000001209, CE00000025 o últimos dígitos de su factura'
                        : 'Ej: 001-901-000000259, 000000259 o 259'
                    }
                    value={referenceDocNumber}
                    onChange={(e) => setReferenceDocNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-none border border-[#005BB2] bg-white text-slate-900 font-mono text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#005BB2] transition-all shadow-xs placeholder-slate-400"
                  />
                  <p className="mt-1.5 text-[11px] text-slate-500">
                    Para proteger su información financiera, ingrese el número de una factura, retención o comprobante emitido a su nombre.
                  </p>
                </div>

                {validationError && (
                  <div className="p-3.5 rounded-none bg-red-50 border border-red-200 text-xs font-medium text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-none text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-orange-950/20 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSearching ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Consultando en Perseo...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        <span>Consultar Documentos</span>
                      </>
                    )}
                  </button>

                  {queryResponse && (
                    <button
                      type="button"
                      onClick={() => {
                        setQueryResponse(null);
                        setDocNumber('');
                        setReferenceDocNumber('');
                        setValidationError(null);
                      }}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 py-2 px-3 border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Limpiar Consulta</span>
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* 3. VISUALIZADOR DE RESULTADOS EN VIVO DIRECTO EN LA WEB (SIN WHATSAPP) */}
            <AnimatePresence>
              {queryResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-white rounded-none border border-slate-200 shadow-[6px_6px_0px_0px_#E2E8F0] p-6 sm:p-8 space-y-6 text-[#172B3A]"
                >
                  {/* Encabezado del Resultado */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-[#005BB2] text-white">
                          {getQueryLabel(queryType)}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-700">
                          {getPeriodLabel(period)}
                        </span>
                      </div>
                      {queryResponse.matchedCliente && (
                        <p className="text-sm font-bold text-[#172B3A] flex items-center gap-1.5 pt-1">
                          <Building className="w-4 h-4 text-[#005BB2] shrink-0" />
                          <span>{queryResponse.matchedCliente.razonSocial}</span>
                          <span className="font-mono text-xs text-slate-500 font-normal">
                            ({queryResponse.matchedCliente.identificacion})
                          </span>
                        </p>
                      )}
                      {queryResponse.matchedProveedor && (
                        <div className="pt-1 space-y-0.5">
                          <p className="text-sm font-bold text-[#172B3A] flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-[#FC6412] shrink-0" />
                            <span>{queryResponse.matchedProveedor.razonSocial}</span>
                            <span className="font-mono text-xs text-slate-500 font-normal">
                              ({queryResponse.matchedProveedor.identificacion})
                            </span>
                          </p>
                          {queryResponse.matchedProveedor.direccion && (
                            <p className="text-[11px] text-slate-500 pl-5">
                              {queryResponse.matchedProveedor.direccion}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-right sm:text-right text-xs text-slate-500">
                      <span className="font-bold text-[#172B3A] text-sm block">
                        {queryResponse.total || 0} {queryResponse.total === 1 ? 'registro encontrado' : 'registros encontrados'}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Actualizado: {new Date(queryResponse.timestamp).toLocaleTimeString('es-EC')}
                      </span>
                    </div>
                  </div>

                  {/* CASO A: FACTURAS ELECTRÓNICAS */}
                  {queryType === 'facturacion' && (
                    <div className="space-y-4">
                      {(!queryResponse.result?.facturas || queryResponse.result.facturas.length === 0) ? (
                        <div className="p-8 text-center bg-slate-50 border border-slate-200 space-y-2">
                          <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                          <h4 className="font-bold text-sm text-[#172B3A]">No se encontraron facturas</h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto">
                            No existen facturas de venta asociadas a la identificación <span className="font-mono font-bold">{docNumber}</span> en el periodo <span className="font-semibold">{getPeriodLabel(period)}</span>.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {queryResponse.result.facturas.map((fac: PerseoFactura) => {
                            const isExpanded = expandedFacturaId === fac.facturasid;
                            const hasDetails = fac.facturasd?.detalles && fac.facturasd.detalles.length > 0;
                            return (
                              <div
                                key={fac.facturasid}
                                className="border border-slate-200 hover:border-[#005BB2]/60 transition-all bg-white"
                              >
                                <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                  {/* Columna Izquierda: Datos del Comprobante */}
                                  <div className="space-y-1.5 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-mono text-sm sm:text-base font-black text-[#172B3A] tracking-tight">
                                        Nº {fac.establecimiento}-{fac.puntoemision}-{fac.secuencial}
                                      </span>
                                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#005BB2] border border-blue-200">
                                        Factura Electrónica
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-600 font-medium">
                                      Cliente: <span className="font-bold text-[#172B3A]">{fac.razonsocial}</span>
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                                      <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                        Emisión: {formatDate(fac.emision)}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                        Vence: {formatDate(fac.vence)}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Columna Derecha: Montos y Acciones */}
                                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-end justify-between lg:justify-center gap-2 shrink-0 border-t sm:border-t-0 lg:border-t-0 pt-3 sm:pt-0">
                                    <div className="text-left sm:text-right">
                                      <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
                                        Importe Total
                                      </span>
                                      <span className="text-lg sm:text-xl font-black text-[#FC6412]">
                                        {formatCurrency(fac.total)}
                                      </span>
                                      <span className="text-[11px] text-slate-500 block">
                                        Subtotal: {formatCurrency(fac.subtotal)} | IVA: {formatCurrency(fac.total_iva)}
                                      </span>
                                    </div>

                                    {hasDetails && (
                                      <button
                                        type="button"
                                        onClick={() => setExpandedFacturaId(isExpanded ? null : fac.facturasid)}
                                        className="text-xs font-bold text-[#005BB2] hover:text-[#004e9a] inline-flex items-center gap-1 cursor-pointer pt-1"
                                      >
                                        <span>{isExpanded ? 'Ocultar Detalle' : 'Ver Detalle de Productos'}</span>
                                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                      </button>
                                    )}
                                  </div>
                                </div>

                                {/* Clave de Acceso SRI */}
                                {fac.claveacceso && (
                                  <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
                                        Clave SRI:
                                      </span>
                                      <span className="font-mono text-[11px] text-slate-700 truncate select-all">
                                        {fac.claveacceso}
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyClave(fac.claveacceso)}
                                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#005BB2] hover:text-[#004e9a] shrink-0 cursor-pointer"
                                    >
                                      {copiedKey === fac.claveacceso ? (
                                        <>
                                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                                          <span className="text-emerald-600">¡Copiado!</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3.5 h-3.5" />
                                          <span>Copiar Clave</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                )}

                                {/* Detalle desplegable de productos */}
                                {isExpanded && hasDetails && (
                                  <div className="p-4 bg-blue-50/40 border-t border-blue-100 space-y-3">
                                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#005BB2]">
                                      Ítems Facturados
                                    </h5>
                                    <div className="overflow-x-auto">
                                      <table className="w-full text-left text-xs">
                                        <thead>
                                          <tr className="border-b border-blue-200 text-slate-500 text-[11px]">
                                            <th className="pb-1.5 font-bold">Código</th>
                                            <th className="pb-1.5 font-bold">Descripción</th>
                                            <th className="pb-1.5 font-bold text-center">Cant.</th>
                                            <th className="pb-1.5 font-bold text-right">P. Unitario</th>
                                            <th className="pb-1.5 font-bold text-right">IVA</th>
                                            <th className="pb-1.5 font-bold text-right">Total</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-blue-100">
                                          {fac.facturasd?.detalles?.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-blue-100/30">
                                              <td className="py-2 font-mono text-slate-600">{item.productocodigo}</td>
                                              <td className="py-2 font-semibold text-[#172B3A]">{item.nombreproducto}</td>
                                              <td className="py-2 text-center">{item.cantidad}</td>
                                              <td className="py-2 text-right">{formatCurrency(item.precio)}</td>
                                              <td className="py-2 text-right">{item.iva}%</td>
                                              <td className="py-2 text-right font-bold text-[#172B3A]">
                                                {formatCurrency(item.precioiva * item.cantidad)}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* CASO B: RETENCIONES SRI */}
                  {queryType === 'retenciones' && (
                    <div className="space-y-4">
                      {(!queryResponse.result?.retenciones || queryResponse.result.retenciones.length === 0) ? (
                        <div className="p-8 text-center bg-slate-50 border border-slate-200 space-y-2">
                          <Receipt className="w-8 h-8 text-slate-400 mx-auto" />
                          <h4 className="font-bold text-sm text-[#172B3A]">No se encontraron retenciones</h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto">
                            No existen comprobantes de retención asociados a <span className="font-mono font-bold">{docNumber}</span> en este periodo.
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border border-slate-200">
                            <thead className="bg-[#172B3A] text-white">
                              <tr>
                                <th className="p-3 font-bold">Secuencia Retención</th>
                                <th className="p-3 font-bold">Fecha</th>
                                <th className="p-3 font-bold">Tipo</th>
                                <th className="p-3 font-bold">Factura Afectada</th>
                                <th className="p-3 font-bold text-right">Ret. Renta</th>
                                <th className="p-3 font-bold text-right">Ret. IVA</th>
                                <th className="p-3 font-bold text-right">Total Retenido</th>
                                <th className="p-3 font-bold">Autorización SRI</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {queryResponse.result.retenciones.map((ret: PerseoRetencion, idx: number) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                  <td className="p-3 font-mono font-bold text-[#005BB2]">{ret.secuencia}</td>
                                  <td className="p-3">{formatDate(ret.fechaEmision)}</td>
                                  <td className="p-3">
                                    <span className={`px-2 py-0.5 text-[10px] font-bold ${ret.tipo === 'VENTA' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-[#005BB2] border border-blue-200'}`}>
                                      {ret.tipo === 'VENTA' ? 'Retención Recibida' : 'Retención Emitida'}
                                    </span>
                                  </td>
                                  <td className="p-3 font-mono text-slate-600">{ret.facturaAfectada}</td>
                                  <td className="p-3 text-right">{formatCurrency(ret.totalRenta)}</td>
                                  <td className="p-3 text-right">{formatCurrency(ret.totalIva)}</td>
                                  <td className="p-3 text-right font-bold text-[#FC6412]">{formatCurrency(ret.total)}</td>
                                  <td className="p-3 font-mono text-[11px] text-slate-500">{ret.autorizacion || 'En proceso'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CASO C: ESTADO DE CUENTA Y CARTERA */}
                  {queryType === 'estado_cuenta' && (
                    <div className="space-y-5">
                      {/* Tarjetas de Resumen Financiero */}
                      {queryResponse.result?.resumen && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="p-4 bg-slate-50 border border-slate-200">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                              Total Facturado
                            </span>
                            <span className="text-xl font-black text-[#172B3A]">
                              {formatCurrency(queryResponse.result.resumen.totalFacturado)}
                            </span>
                          </div>
                          <div className="p-4 bg-emerald-50/70 border border-emerald-200">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                              Total Abonado
                            </span>
                            <span className="text-xl font-black text-emerald-700">
                              {formatCurrency(queryResponse.result.resumen.totalAbonado)}
                            </span>
                          </div>
                          <div className="p-4 bg-orange-50/80 border border-orange-200">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FC6412] block">
                              Saldo Pendiente
                            </span>
                            <span className="text-xl font-black text-[#FC6412]">
                              {formatCurrency(queryResponse.result.resumen.totalSaldoPendiente)}
                            </span>
                          </div>
                        </div>
                      )}

                      {(!queryResponse.result?.cxc || queryResponse.result.cxc.length === 0) ? (
                        <div className="p-8 text-center bg-slate-50 border border-slate-200 space-y-2">
                          <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                          <h4 className="font-bold text-sm text-[#172B3A]">Sin cartera pendiente</h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto">
                            El cliente se encuentra al día con sus obligaciones o no registra saldos pendientes en el sistema.
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border border-slate-200">
                            <thead className="bg-[#172B3A] text-white">
                              <tr>
                                <th className="p-3 font-bold">Tipo</th>
                                <th className="p-3 font-bold">Secuencia</th>
                                <th className="p-3 font-bold">Emisión</th>
                                <th className="p-3 font-bold">Vencimiento</th>
                                <th className="p-3 font-bold text-right">Valor Total</th>
                                <th className="p-3 font-bold text-right">Saldo Pendiente</th>
                                <th className="p-3 font-bold text-center">Estado</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {queryResponse.result.cxc.map((item: PerseoEstadoCuentaItem, idx: number) => {
                                const isPending = Number(item.saldo) > 0;
                                return (
                                  <tr key={idx} className="hover:bg-slate-50">
                                    <td className="p-3 font-bold text-slate-700">{item.tipo}</td>
                                    <td className="p-3 font-mono font-bold text-[#005BB2]">{item.secuencia}</td>
                                    <td className="p-3">{formatDate(item.emision)}</td>
                                    <td className="p-3">{formatDate(item.vence)}</td>
                                    <td className="p-3 text-right">{formatCurrency(item.valor)}</td>
                                    <td className="p-3 text-right font-bold text-[#FC6412]">{formatCurrency(item.saldo)}</td>
                                    <td className="p-3 text-center">
                                      <span className={`px-2 py-0.5 text-[10px] font-bold ${isPending ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                                        {isPending ? 'Pendiente' : 'Pagado'}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CASO D: GUÍAS DE REMISIÓN */}
                  {queryType === 'guias_remision' && (
                    <div className="space-y-4">
                      {(!queryResponse.result?.guias || queryResponse.result.guias.length === 0) ? (
                        <div className="p-8 text-center bg-slate-50 border border-slate-200 space-y-2">
                          <Truck className="w-8 h-8 text-slate-400 mx-auto" />
                          <h4 className="font-bold text-sm text-[#172B3A]">No se encontraron guías de remisión</h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto">
                            No se registran despachos o traslados asociados a <span className="font-mono font-bold">{docNumber}</span>.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {queryResponse.result.guias.map((g: PerseoGuiaRemision, idx: number) => (
                            <div key={idx} className="p-4 sm:p-5 border border-slate-200 bg-white space-y-3">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                <div>
                                  <span className="font-mono font-bold text-sm text-[#005BB2]">
                                    Guía Nº {g.establecimientoguia}-{g.puntoemisionguia}-{g.secuencialguia}
                                  </span>
                                  <p className="text-xs text-slate-600 font-medium">
                                    Destinatario: <span className="font-bold text-[#172B3A]">{g.nombrecliente}</span>
                                  </p>
                                </div>
                                <div className="text-left sm:text-right text-xs">
                                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px] uppercase">
                                    Transporte Autorizado
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                                <div>
                                  <span className="text-[11px] font-bold uppercase text-slate-400 block">Transportista:</span>
                                  <span className="font-medium text-[#172B3A]">{g.nombretransportista || 'N/D'}</span>
                                  <span className="font-mono text-slate-500 block text-[11px]">Placa: {g.placa || 'N/D'}</span>
                                </div>
                                <div>
                                  <span className="text-[11px] font-bold uppercase text-slate-400 block">Motivo de Traslado:</span>
                                  <span className="font-medium text-[#172B3A]">{g.motivo || 'Venta de mercadería'}</span>
                                </div>
                                <div className="sm:col-span-2">
                                  <span className="text-[11px] font-bold uppercase text-slate-400 block">Ruta:</span>
                                  <span className="text-slate-700">
                                    <strong className="text-[#172B3A]">Origen:</strong> {g.direccionpartida} <br />
                                    <strong className="text-[#172B3A]">Destino:</strong> {g.direccionllegada}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* CASO E: LIQUIDACIONES DE COMPRA */}
                  {queryType === 'liquidaciones' && (
                    <div className="space-y-4">
                      {(!queryResponse.result?.liquidaciones || queryResponse.result.liquidaciones.length === 0) ? (
                        <div className="p-8 text-center bg-slate-50 border border-slate-200 space-y-2">
                          <Receipt className="w-8 h-8 text-slate-400 mx-auto" />
                          <h4 className="font-bold text-sm text-[#172B3A]">No se encontraron liquidaciones de compra</h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto">
                            No existen liquidaciones de compra registradas para este periodo.
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border border-slate-200">
                            <thead className="bg-[#172B3A] text-white">
                              <tr>
                                <th className="p-3 font-bold">Secuencia</th>
                                <th className="p-3 font-bold">Proveedor</th>
                                <th className="p-3 font-bold">Emisión</th>
                                <th className="p-3 font-bold text-right">Total</th>
                                <th className="p-3 font-bold">Clave SRI</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {queryResponse.result.liquidaciones.map((liq: any, idx: number) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                  <td className="p-3 font-mono font-bold text-[#005BB2]">
                                    {liq.establecimiento}-{liq.puntoemision}-{liq.secuencia}
                                  </td>
                                  <td className="p-3 font-semibold text-[#172B3A]">{liq.razonsocial}</td>
                                  <td className="p-3">{formatDate(liq.emision)}</td>
                                  <td className="p-3 text-right font-bold text-[#FC6412]">{formatCurrency(liq.total)}</td>
                                  <td className="p-3 font-mono text-[11px] text-slate-500">{liq.liq_claveacceso || liq.autorizacion || 'S/N'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CASO F: HISTORIAL DE COBROS */}
                  {queryType === 'cobros' && (
                    <div className="space-y-4">
                      {(!queryResponse.result?.cobros || queryResponse.result.cobros.length === 0) ? (
                        <div className="p-8 text-center bg-slate-50 border border-slate-200 space-y-2">
                          <DollarSign className="w-8 h-8 text-slate-400 mx-auto" />
                          <h4 className="font-bold text-sm text-[#172B3A]">No se encontraron cobros registrados</h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto">
                            No existen registros de cobros o abonos en el periodo seleccionado.
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border border-slate-200">
                            <thead className="bg-[#172B3A] text-white">
                              <tr>
                                <th className="p-3 font-bold">Código de Cobro</th>
                                <th className="p-3 font-bold">Fecha</th>
                                <th className="p-3 font-bold">Concepto</th>
                                <th className="p-3 font-bold text-right">Importe Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {queryResponse.result.cobros.map((cb: PerseoCobro, idx: number) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                  <td className="p-3 font-mono font-bold text-[#005BB2]">{cb.cobroscodigo}</td>
                                  <td className="p-3">{formatDate(cb.fechaemision)}</td>
                                  <td className="p-3 text-slate-700">{cb.concepto}</td>
                                  <td className="p-3 text-right font-black text-emerald-700">{formatCurrency(cb.importeTotal)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CASO G: PROFORMAS O PEDIDOS */}
                  {(queryType === 'proformas' || queryType === 'pedidos') && (
                    <div className="p-8 text-center bg-slate-50 border border-slate-200 space-y-2">
                      <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                      <h4 className="font-bold text-sm text-[#172B3A]">
                        {queryType === 'proformas' ? 'Sin proformas en el periodo' : 'Sin pedidos en el periodo'}
                      </h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        No se encontraron registros de {queryType} activos en el rango de fechas seleccionado.
                      </p>
                    </div>
                  )}

                  {/* CASO H: ESTADO DE CUENTA Y CUENTAS POR PAGAR (PROVEEDORES) */}
                  {queryType === 'proveedor_cxp' && (
                    <div className="space-y-6">
                      {/* Tarjetas Resumen */}
                      {queryResponse.result?.resumen && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="p-4 bg-slate-50 border border-slate-200">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                              Total Facturado
                            </span>
                            <span className="text-lg sm:text-xl font-black text-[#172B3A]">
                              {formatCurrency(queryResponse.result.resumen.totalFacturado)}
                            </span>
                          </div>
                          <div className="p-4 bg-emerald-50 border border-emerald-200">
                            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                              Total Pagado / Abonado
                            </span>
                            <span className="text-lg sm:text-xl font-black text-emerald-800">
                              {formatCurrency(queryResponse.result.resumen.totalPagado)}
                            </span>
                          </div>
                          <div className="p-4 bg-orange-50 border border-orange-200">
                            <span className="text-[11px] font-bold text-[#FC6412] uppercase tracking-wider block">
                              Saldo Pendiente por Pagar
                            </span>
                            <span className="text-lg sm:text-xl font-black text-[#FC6412]">
                              {formatCurrency(queryResponse.result.resumen.totalSaldoPendiente)}
                            </span>
                          </div>
                        </div>
                      )}

                      {(!queryResponse.result?.cxp || queryResponse.result.cxp.length === 0) ? (
                        <div className="p-8 text-center bg-slate-50 border border-slate-200 space-y-2">
                          <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                          <h4 className="font-bold text-sm text-[#172B3A]">Sin cuentas por pagar pendientes</h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto">
                            No existen saldos pendientes ni comprobantes por pagar asociados a su RUC de proveedor.
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border border-slate-200">
                            <thead className="bg-[#172B3A] text-white">
                              <tr>
                                <th className="p-3 font-bold">Tipo</th>
                                <th className="p-3 font-bold">Secuencia / Factura</th>
                                <th className="p-3 font-bold">Emisión</th>
                                <th className="p-3 font-bold">Vence</th>
                                <th className="p-3 font-bold text-right">Valor Total</th>
                                <th className="p-3 font-bold text-right">Saldo Pendiente</th>
                                <th className="p-3 font-bold text-center">Estado</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {queryResponse.result.cxp.map((it: any, idx: number) => {
                                const isPaid = Math.abs(Number(it.saldo || 0)) === 0;
                                return (
                                  <tr key={idx} className="hover:bg-slate-50">
                                    <td className="p-3 font-mono font-bold text-slate-600">{it.tipo}</td>
                                    <td className="p-3 font-mono font-bold text-[#005BB2]">{it.secuencia}</td>
                                    <td className="p-3">{formatDate(it.emision)}</td>
                                    <td className="p-3">{formatDate(it.vence)}</td>
                                    <td className="p-3 text-right font-medium text-slate-700">
                                      {formatCurrency(Math.abs(Number(it.valor || 0)))}
                                    </td>
                                    <td className="p-3 text-right font-black text-[#172B3A]">
                                      {formatCurrency(Math.abs(Number(it.saldo || 0)))}
                                    </td>
                                    <td className="p-3 text-center">
                                      {isPaid ? (
                                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                                          CANCELADO
                                        </span>
                                      ) : (
                                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300">
                                          PENDIENTE
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CASO I: HISTORIAL DE PAGOS A PROVEEDORES */}
                  {queryType === 'proveedor_pagos' && (
                    <div className="space-y-6">
                      {queryResponse.result?.resumen && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-4 bg-emerald-50 border border-emerald-200">
                            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                              Total Pagos y Transferencias Realizadas
                            </span>
                            <span className="text-lg sm:text-xl font-black text-emerald-800">
                              {formatCurrency(queryResponse.result.resumen.totalPagado)}
                            </span>
                          </div>
                          <div className="p-4 bg-slate-50 border border-slate-200">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                              Comprobantes de Egreso Registrados
                            </span>
                            <span className="text-lg sm:text-xl font-black text-[#172B3A]">
                              {queryResponse.total || 0} comprobantes
                            </span>
                          </div>
                        </div>
                      )}

                      {(!queryResponse.result?.pagos || queryResponse.result.pagos.length === 0) ? (
                        <div className="p-8 text-center bg-slate-50 border border-slate-200 space-y-2">
                          <DollarSign className="w-8 h-8 text-slate-400 mx-auto" />
                          <h4 className="font-bold text-sm text-[#172B3A]">Sin comprobantes de pago registrados</h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto">
                            No se registran pagos ni transferencias emitidas a este proveedor en el periodo consultado.
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border border-slate-200">
                            <thead className="bg-[#172B3A] text-white">
                              <tr>
                                <th className="p-3 font-bold">Comprobante de Egreso</th>
                                <th className="p-3 font-bold">Fecha de Pago</th>
                                <th className="p-3 font-bold">Concepto / Detalle</th>
                                <th className="p-3 font-bold">Facturas Canceladas</th>
                                <th className="p-3 font-bold text-right">Importe Pagado</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {queryResponse.result.pagos.map((p: any, idx: number) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                  <td className="p-3 font-mono font-bold text-[#005BB2]">{p.cobroscodigo}</td>
                                  <td className="p-3">{formatDate(p.fechaemision)}</td>
                                  <td className="p-3 text-slate-700">{p.concepto}</td>
                                  <td className="p-3">
                                    {p.documentos && p.documentos.length > 0 ? (
                                      <div className="flex flex-wrap gap-1">
                                        {p.documentos.map((d: any, dIdx: number) => (
                                          <span
                                            key={dIdx}
                                            className="px-1.5 py-0.5 text-[10px] font-mono bg-blue-50 text-[#005BB2] border border-blue-200"
                                          >
                                            F-{d.secuencia} ({formatCurrency(d.importe)})
                                          </span>
                                        ))}
                                      </div>
                                    ) : (
                                      <span className="text-slate-400 text-[11px]">—</span>
                                    )}
                                  </td>
                                  <td className="p-3 text-right font-black text-emerald-700">
                                    {formatCurrency(p.importeTotal)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CASO J: RETENCIONES DE COMPRA EMITIDAS AL PROVEEDOR */}
                  {queryType === 'proveedor_retenciones' && (
                    <div className="space-y-4">
                      {(!queryResponse.result?.retenciones || queryResponse.result.retenciones.length === 0) ? (
                        <div className="p-8 text-center bg-slate-50 border border-slate-200 space-y-2">
                          <Receipt className="w-8 h-8 text-slate-400 mx-auto" />
                          <h4 className="font-bold text-sm text-[#172B3A]">Sin comprobantes de retención</h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto">
                            No se encontraron comprobantes de retención emitidos hacia su empresa en el periodo seleccionado.
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border border-slate-200">
                            <thead className="bg-[#172B3A] text-white">
                              <tr>
                                <th className="p-3 font-bold">Nº Retención</th>
                                <th className="p-3 font-bold">Factura Afectada</th>
                                <th className="p-3 font-bold">Fecha Emisión</th>
                                <th className="p-3 font-bold text-right">Ret. Renta</th>
                                <th className="p-3 font-bold text-right">Ret. IVA</th>
                                <th className="p-3 font-bold text-right">Total Retenido</th>
                                <th className="p-3 font-bold text-center">Autorización SRI</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {queryResponse.result.retenciones.map((ret: any, idx: number) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                  <td className="p-3 font-mono font-bold text-[#005BB2]">{ret.secuencia}</td>
                                  <td className="p-3 font-mono text-slate-700">{ret.facturaAfectada}</td>
                                  <td className="p-3">{formatDate(ret.fechaEmision)}</td>
                                  <td className="p-3 text-right font-medium text-slate-600">
                                    {formatCurrency(ret.totalRenta)}
                                  </td>
                                  <td className="p-3 text-right font-medium text-slate-600">
                                    {formatCurrency(ret.totalIva)}
                                  </td>
                                  <td className="p-3 text-right font-black text-[#172B3A]">
                                    {formatCurrency(ret.total)}
                                  </td>
                                  <td className="p-3 text-center">
                                    {ret.autorizacion ? (
                                      <button
                                        type="button"
                                        onClick={() => handleCopyClave(ret.autorizacion)}
                                        className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold bg-slate-100 hover:bg-[#005BB2] hover:text-white border border-slate-200 transition-colors cursor-pointer"
                                        title="Copiar Clave de Acceso SRI"
                                      >
                                        {copiedKey === ret.autorizacion ? (
                                          <Check className="w-3 h-3 text-emerald-600" />
                                        ) : (
                                          <Copy className="w-3 h-3" />
                                        )}
                                        <span>Copiar SRI</span>
                                      </button>
                                    ) : (
                                      <span className="text-slate-400 text-[11px]">En proceso</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CASO K: FACTURAS DE COMPRA REGISTRADAS */}
                  {queryType === 'proveedor_facturas' && (
                    <div className="space-y-4">
                      {(!queryResponse.result?.facturas || queryResponse.result.facturas.length === 0) ? (
                        <div className="p-8 text-center bg-slate-50 border border-slate-200 space-y-2">
                          <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                          <h4 className="font-bold text-sm text-[#172B3A]">Sin facturas de compra registradas</h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto">
                            No se encontraron comprobantes de compra ingresados en la contabilidad en el periodo consultado.
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border border-slate-200">
                            <thead className="bg-[#172B3A] text-white">
                              <tr>
                                <th className="p-3 font-bold">Nº Factura Proveedor</th>
                                <th className="p-3 font-bold">Emisión</th>
                                <th className="p-3 font-bold">Vence</th>
                                <th className="p-3 font-bold text-right">Subtotal</th>
                                <th className="p-3 font-bold text-right">IVA</th>
                                <th className="p-3 font-bold text-right">Total Factura</th>
                                <th className="p-3 font-bold text-center">Autorización SRI</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {queryResponse.result.facturas.map((fac: any, idx: number) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                  <td className="p-3 font-mono font-bold text-[#005BB2]">
                                    {fac.establecimiento}-{fac.puntoemision}-{fac.secuencial}
                                  </td>
                                  <td className="p-3">{formatDate(fac.emision)}</td>
                                  <td className="p-3">{formatDate(fac.vence)}</td>
                                  <td className="p-3 text-right font-medium text-slate-600">
                                    {formatCurrency(fac.subtotal)}
                                  </td>
                                  <td className="p-3 text-right font-medium text-slate-600">
                                    {formatCurrency(fac.total_iva)}
                                  </td>
                                  <td className="p-3 text-right font-black text-[#172B3A]">
                                    {formatCurrency(fac.total)}
                                  </td>
                                  <td className="p-3 text-center">
                                    {fac.claveacceso ? (
                                      <button
                                        type="button"
                                        onClick={() => handleCopyClave(fac.claveacceso)}
                                        className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold bg-slate-100 hover:bg-[#005BB2] hover:text-white border border-slate-200 transition-colors cursor-pointer"
                                        title="Copiar Clave de Acceso SRI"
                                      >
                                        {copiedKey === fac.claveacceso ? (
                                          <Check className="w-3 h-3 text-emerald-600" />
                                        ) : (
                                          <Copy className="w-3 h-3" />
                                        )}
                                        <span>Copiar SRI</span>
                                      </button>
                                    ) : (
                                      <span className="text-slate-400 text-[11px]">—</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. Preguntas de Servicios en Línea para Clientes */}
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
