import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  Receipt,
  HelpCircle,
  Clock,
  Sparkles,
  PhoneCall,
  Laptop,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { siteConfig } from '../data/siteConfig';
import { motion } from 'motion/react';
import { PageHero } from '../components/PageHero';
import { validateEcuadorianDocument } from '../services/contactService';
import digitalPortalImg from '../assets/images/digital_fintech_portal_1792700528199.webp';

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
    ? `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(`Hola Jorge Hernandez / MH Contabilidad, requiero asistencia y reporte de ${searchFeedback.queryLabel} para la identificacion ${searchFeedback.docNumber}.`)}`
    : `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola Jorge Hernandez / MH Contabilidad, quisiera consultar informacion sobre mis reportes contables en linea.')}`;

  return (
    <div className="space-y-0">
      {/* 1. Encabezado de Portal Clientes estilo Inicio */}
      <PageHero
        titleLine1="Portal Clientes"
        titleHighlight="Consultas y Conectividad Digital"
        description="En MH Contabilidad combinamos asesoría personalizada con herramientas tecnológicas modernas. Consulte la información de sus estados de cuenta, comprobantes y reportes contables con agilidad."
        image={digitalPortalImg}
        imageAlt="Plataforma de contabilidad digital y reportes financieros de MH Contabilidad"
      >
        {/* Badges de Conectividad */}
        <div className="pt-4 border-t border-slate-700/60">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 text-[#38BDF8] flex items-center justify-center shrink-0 border border-white/10">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <strong className="block font-bold text-white text-xs leading-tight">Comprobantes</strong>
                <span className="text-slate-400 text-[10px]">Facturas & Retenciones</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 text-[#38BDF8] flex items-center justify-center shrink-0 border border-white/10">
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <strong className="block font-bold text-white text-xs leading-tight">Perseo ERP</strong>
                <span className="text-slate-400 text-[10px]">Integración API</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 text-[#FC6412] flex items-center justify-center shrink-0 border border-white/10">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <strong className="block font-bold text-white text-xs leading-tight">Disponibilidad</strong>
                <span className="text-slate-400 text-[10px]">Gestión Oportuna</span>
              </div>
            </div>
          </div>
        </div>
      </PageHero>

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
                        <WhatsAppIcon className="w-4 h-4" />
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
                        <WhatsAppIcon className="w-4 h-4" />
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
                    href={`https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola Jorge Hernandez / MH Contabilidad, requiero asistencia personalizada con mis comprobantes.')}`}
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
