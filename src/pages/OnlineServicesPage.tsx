import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  Receipt,
  MessageSquare,
  HelpCircle,
  Clock,
  Sparkles,
  PhoneCall,
  Laptop,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { motion } from 'motion/react';
import { validateEcuadorianDocument } from '../services/contactService';
import digitalPortalImg from '../assets/images/digital_fintech_portal_1792700528199.jpg';

export const OnlineServicesPage: React.FC = () => {
  const [docType, setDocType] = useState<'RUC' | 'CEDULA' | 'PASAPORTE'>('RUC');
  const [docNumber, setDocNumber] = useState('');
  const [queryType, setQueryType] = useState('estado_cuenta');

  const [isSearching, setIsSearching] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [searchFeedback, setSearchFeedback] = useState<{
    show: boolean;
    docNumber: string;
    queryLabel: string;
  } | null>(null);

  const getQueryLabel = (type: string) => {
    switch (type) {
      case 'estado_cuenta':
        return 'Estado de Cuenta y Cartera Comercial';
      case 'retenciones':
        return 'Comprobantes de Retención Tributaria';
      case 'facturacion':
        return 'Facturas Electrónicas y Reportes';
      default:
        return 'Consulta Contable';
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSearchFeedback(null);

    if (!docNumber.trim()) {
      setValidationError('Por favor ingrese su número de documento de identificación.');
      return;
    }

    if (docType === 'CEDULA' || docType === 'RUC') {
      const val = validateEcuadorianDocument(docNumber);
      if (!val.isValid) {
        setValidationError(`Formato no válido: ${val.message}`);
        return;
      }
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchFeedback({
        show: true,
        docNumber: docNumber.trim(),
        queryLabel: getQueryLabel(queryType),
      });
    }, 700);
  };

  const waClientUrl = searchFeedback
    ? `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
        `Hola Jorge Hernández / MH Contabilidad, requiero asistencia y reporte de ${searchFeedback.queryLabel} para la identificación ${searchFeedback.docNumber}.`
      )}`
    : `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
        'Hola Jorge Hernández / MH Contabilidad, quisiera consultar información sobre mis reportes contables en línea.'
      )}`;

  return (
    <div className="space-y-0">
      {/* 1. Encabezado de Portal Clientes sin contenedores: única forma para la imagen derecha */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] items-center relative">
            
            {/* Columna Izquierda: Información Portal Clientes */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 py-6 sm:py-8 lg:py-10 flex flex-col justify-between space-y-6 z-10 relative"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
                  <span className="w-2.5 h-0.5 bg-[#FC6412]" />
                  <span>Portal de Clientes</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>MH Contabilidad</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172B3A] tracking-tight leading-[1.15]">
                  Portal Clientes: Consultas y Conectividad Digital
                </h1>

                <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl">
                  En MH Contabilidad combinamos asesoría personalizada con herramientas tecnológicas modernas.
                  Consulte la información de sus estados de cuenta, comprobantes y reportes contables con agilidad.
                </p>
              </div>

              {/* Badges de Conectividad */}
              <div className="pt-6 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs text-[#172B3A]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#EBF3FA] text-[#005BB2] flex items-center justify-center shrink-0 border border-blue-100">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">Comprobantes</strong>
                      <span className="text-slate-500 text-[11px]">Facturas & Retenciones</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#EBF3FA] text-[#005BB2] flex items-center justify-center shrink-0 border border-blue-100">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">Perseo ERP</strong>
                      <span className="text-slate-500 text-[11px]">Integración API</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#FFF0E6] text-[#FC6412] flex items-center justify-center shrink-0 border border-orange-100">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">Disponibilidad</strong>
                      <span className="text-slate-500 text-[11px]">Gestión Oportuna</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Columna Derecha: ÚNICA FORMA azul para la imagen con corte diagonal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:col-span-5 relative flex items-end justify-center min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#005BB2] lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0%_100%)] z-0 rounded-2xl lg:rounded-none">
                <div className="absolute top-8 right-8 w-60 h-60 rounded-full border-2 border-white/20 pointer-events-none" />
                <div className="absolute top-16 right-16 w-40 h-40 rounded-full border border-white/25 pointer-events-none" />
              </div>

              <div className="relative z-10 w-full h-full flex items-end justify-center lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0%_100%)]">
                <img
                  src={digitalPortalImg}
                  alt="Plataforma de contabilidad digital y reportes financieros de MH Contabilidad"
                  className="w-full h-72 sm:h-80 lg:h-[420px] object-cover object-top drop-shadow-xl"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Curva / Onda Blanca Inferior */}
              <div className="absolute -bottom-0.5 left-0 right-0 w-full z-20 pointer-events-none">
                <svg
                  viewBox="0 0 1440 180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-14 sm:h-20 text-white"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,180 L0,80 Q720,160 1440,30 L1440,180 Z"
                    fill="#FFFFFF"
                  />
                </svg>
                <div className="absolute bottom-2 right-8 w-7 h-7 rounded-full border-2 border-[#005BB2]/30 pointer-events-none hidden sm:block" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. Beneficios Digitales para Clientes */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-[#F3F6FA] border border-slate-200/80 space-y-3"
            >
              <div className="p-3 w-fit rounded-xl bg-blue-100/70 text-[#005BB2]">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172B3A]">
                Gestión Centralizada
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Toda la documentación contable y comprobantes de compras y ventas organizados para una rápida revisión.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-[#F3F6FA] border border-slate-200/80 space-y-3"
            >
              <div className="p-3 w-fit rounded-xl bg-orange-100/70 text-[#FC6412]">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172B3A]">
                Trazabilidad Tributaria
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Seguimiento puntual a retenciones en la fuente y declaraciones periódicas ante el SRI sin desfases.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-[#F3F6FA] border border-slate-200/80 space-y-3"
            >
              <div className="p-3 w-fit rounded-xl bg-blue-100/70 text-[#005BB2]">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172B3A]">
                Conexión con Software ERP
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Compatibilidad y asesoría para clientes que emplean el sistema contable Perseo y plataformas electrónicas.
              </p>
            </motion.div>
          </div>

          {/* Módulo Principal de Consulta al Cliente */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Columna Izquierda: Formulario de Autoservicio */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#172B3A]">
                    Consulta de Comprobantes y Cartera
                  </h2>
                  <p className="text-xs text-[#64748B] mt-1">
                    Ingrese su RUC o Cédula para solicitar la localización de sus reportes contables.
                  </p>
                </div>

                <form onSubmit={handleSearchSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="user-doc-type"
                        className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                      >
                        Tipo de Identificación
                      </label>
                      <select
                        id="user-doc-type"
                        value={docType}
                        onChange={(e) =>
                          setDocType(e.target.value as 'RUC' | 'CEDULA' | 'PASAPORTE')
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-[#172B3A] focus:outline-none focus:border-[#005BB2]"
                      >
                        <option value="RUC">RUC (13 dígitos - Ecuador)</option>
                        <option value="CEDULA">Cédula de Identidad (10 dígitos)</option>
                        <option value="PASAPORTE">Pasaporte</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="user-doc-number"
                        className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                      >
                        Número de Documento
                      </label>
                      <input
                        id="user-doc-number"
                        type="text"
                        placeholder={docType === 'RUC' ? '1790012345001' : '1712345678'}
                        value={docNumber}
                        onChange={(e) => setDocNumber(e.target.value)}
                        maxLength={docType === 'RUC' ? 13 : docType === 'CEDULA' ? 10 : 20}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-[#172B3A] font-mono focus:outline-none focus:border-[#005BB2]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="user-query-type"
                      className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                    >
                      Información Solicitada
                    </label>
                    <select
                      id="user-query-type"
                      value={queryType}
                      onChange={(e) => setQueryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-[#172B3A] focus:outline-none focus:border-[#005BB2]"
                    >
                      <option value="estado_cuenta">Estado de Cuenta Comercial y Cartera</option>
                      <option value="retenciones">Comprobantes de Retención Emitidas SRI</option>
                      <option value="facturacion">Facturas Electrónicas y Reportes Periódicos</option>
                    </select>
                  </div>

                  {validationError && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                      {validationError}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-white bg-[#005BB2] hover:bg-[#004a91] transition-all shadow-xs"
                    >
                      {isSearching ? (
                        <span>Consultando información...</span>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          <span>Consultar información</span>
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
                    className="p-5 rounded-xl border border-blue-200 bg-blue-50/80 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#005BB2] text-white shrink-0 mt-0.5">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="space-y-1 text-xs">
                        <strong className="block text-sm text-[#005BB2]">
                          Solicitud registrada para {searchFeedback.docNumber}
                        </strong>
                        <p className="text-slate-700 leading-relaxed">
                          Hemos procesado su requerimiento de <strong>{searchFeedback.queryLabel}</strong>.
                          Para entregarle su reporte oficial con estricta reserva, su asesor le atenderá
                          directamente a través de WhatsApp.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href={waClientUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#FC6412] hover:bg-[#e05308] transition-colors shadow-2xs"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Recibir reporte por WhatsApp con su asesor</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Columna Derecha: Imagen Visual y Asistencia */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                <div className="aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={digitalPortalImg}
                    alt="Plataforma de contabilidad digital y reportes financieros de MH Contabilidad"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-bold text-[#172B3A]">
                    Acompañamiento en Sistemas Contables
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Si su negocio utiliza <strong>Perseo ERP</strong> u otro software contable, en MH Contabilidad
                    le asesoramos en la conciliación de módulos de facturación, retenciones y cierres contables.
                  </p>
                </div>
              </div>

              {/* Tarjeta de Acceso a Sistema */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#005BB2] to-[#003d75] text-white space-y-4 shadow-md">
                <div className="flex items-center gap-2 text-xs font-semibold text-orange-300">
                  <Laptop className="w-4 h-4" />
                  <span>Web de Sistema Oficial</span>
                </div>
                <h4 className="text-base font-bold">
                  Acceso a tu Plataforma Contable en Línea
                </h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Ingresa directamente a la plataforma para gestionar comprobantes, revisar ventas y sincronizar con tu programa contable integrado.
                </p>
                <div className="pt-2">
                  <a
                    href={siteConfig.systemUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#FC6412] hover:bg-[#e05308] text-white transition-all shadow-xs"
                  >
                    <span>Ingresar a Web de Sistema →</span>
                  </a>
                </div>
              </div>

              {/* Tarjeta de Asistencia */}
              <div className="p-5 rounded-2xl bg-[#F3F6FA] border border-slate-200 text-[#172B3A] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#005BB2]">
                  <PhoneCall className="w-4 h-4" />
                  <span>Soporte Directo</span>
                </div>
                <h4 className="text-sm font-bold">
                  ¿Necesitas asistencia inmediata con tus comprobantes?
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Contáctate con Jorge Hernández por WhatsApp para resolver dudas sobre tus obligaciones ante el SRI o el manejo de tu sistema.
                </p>
                <div className="pt-1">
                  <a
                    href={`https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
                      'Hola Jorge Hernández / MH Contabilidad, requiero asistencia personalizada con mis comprobantes.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#005BB2] hover:text-[#004a91] transition-colors underline underline-offset-4"
                  >
                    <span>Conversar por WhatsApp ({siteConfig.phone.display}) →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Preguntas de Servicios en Línea para Clientes */}
      <section className="py-16 bg-[#F3F6FA] border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Preguntas Frecuentes</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#172B3A]">
              Preguntas sobre el Portal de Clientes
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-1.5">
              <h3 className="text-sm font-bold text-[#172B3A]">
                ¿Cómo recibo los balances y declaraciones mensuales de mi empresa?
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Mensualmente, una vez ingresados y conciliados los comprobantes, su asesor le envía un informe
                resumen detallado en formato PDF y los respaldos de las declaraciones aceptadas por el SRI vía
                correo electrónico y WhatsApp.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-1.5">
              <h3 className="text-sm font-bold text-[#172B3A]">
                ¿Puedo integrar la contabilidad de mi empresa si ya uso Perseo Software?
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Sí. Trabajamos directamente con la plataforma Perseo para revisar sus catálogos contables,
                auditar la emisión de facturas electrónicas y generar los anexos transaccionales (ATS) sin
                duplicar trabajo administrativo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
