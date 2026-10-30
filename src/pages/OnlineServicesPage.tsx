import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  Receipt,
  Clock,
  Sparkles,
  PhoneCall,
  Laptop,
  Plus,
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
        {/* Accesos Rápidos */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
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
                Conexión con Sistema Contable
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Compatibilidad y asesoría para clientes que emplean el sistema contable de MH Contabilidad y plataformas electrónicas.
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
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#FC6412] hover:bg-[#e05308] transition-colors shadow-2xs text-center"
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
                    Si su negocio utiliza el <strong>sistema contable de MH Contabilidad</strong> u otro software contable, en MH Contabilidad
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

      {/* 3. Preguntas de Servicios en Línea para Clientes (Mismo diseño acordeón oficial que Servicios) */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqIndices.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleFaq(idx)}
                  className="bg-[#005BB2] hover:bg-[#004e9a] text-white rounded-2xl p-4 sm:p-5 flex flex-col justify-center cursor-pointer select-none border border-blue-600/40 shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm sm:text-[15px] font-bold text-white text-left leading-snug">
                      {faq.question}
                    </h3>
                    <div
                      className={`w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#FC6412] transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>

                  {isOpen && (
                    <div className="pt-3 mt-2.5 border-t border-white/20 text-left">
                      <p className="text-xs sm:text-[13px] text-blue-100 leading-relaxed font-normal">
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