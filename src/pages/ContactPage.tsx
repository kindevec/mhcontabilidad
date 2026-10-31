import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import {
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Globe2,
  Phone,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { ContactFormData, ContactFormResult } from '../types';
import { validateEcuadorianDocument, submitContactForm } from '../services/contactService';
import { motion } from 'motion/react';
import { PageHero } from '../components/PageHero';
import consultingTeamImg from '../assets/images/corporate_consulting_team_1792700513952.webp';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    nombreCompleto: '',
    email: '',
    telefono: '',
    identificacion: '',
    tipoConsulta: 'Asesoría Contable General',
    mensaje: '',
  });

  const [documentValidation, setDocumentValidation] = useState<{
    isValid: boolean;
    message: string;
    type: string;
  } | null>(null);

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<ContactFormResult | null>(null);

  const handleDocumentChange = (val: string) => {
    setFormData((prev) => ({ ...prev, identificacion: val }));
    if (val.trim().length >= 10) {
      const res = validateEcuadorianDocument(val);
      setDocumentValidation(res);
    } else {
      setDocumentValidation(null);
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.nombreCompleto?.trim()) {
      newErrors.nombreCompleto = 'El nombre completo es obligatorio';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!formData.telefono?.trim()) {
      newErrors.telefono = 'El teléfono o WhatsApp de contacto es obligatorio';
    }

    if (!formData.identificacion?.trim()) {
      newErrors.identificacion = 'Ingrese su Cédula o RUC';
    } else {
      const docVal = validateEcuadorianDocument(formData.identificacion);
      if (!docVal.isValid) {
        newErrors.identificacion = docVal.message;
      }
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'Por favor detalle brevemente su requerimiento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionResult(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitContactForm(formData);
      setSubmissionResult(res);

      if (res.whatsappUrl) {
        window.open(res.whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. Encabezado de Contacto estilo Inicio */}
      <PageHero
        titleLine1="Contacto y Atención Directa"
        titleHighlight="Asesoría Inmediata con Especialistas"
        description={`Comuníquese directamente con ${siteConfig.representative} y el equipo de MH Contabilidad. Atendemos sus requerimientos contables, declaraciones SRI y consultas financieras en todo Ecuador.`}
        image={consultingTeamImg}
        imageAlt="Atención y asesoría contable profesional MH Contabilidad"
      >
        {/* Accesos Rápidos */}
        <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
          <a
            href={`https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola MH Contabilidad, requiero asesoría contable personalizada.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Consultar Aquí</span>
          </a>
          <a
            href="#formulario-contacto"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('formulario-contacto')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <Send className="w-4 h-4 shrink-0" />
            <span>Enviar Mensaje</span>
          </a>
        </div>
      </PageHero>

      {/* 2. Cuerpo de Contacto y Formulario */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Columna Izquierda: Rejilla 2x2 de Canales + Mapa Inferior */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Rejilla 2x2 de Canales de Contacto con fondo azul corporativo (#005BB2) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                
                {/* 1. Teléfono */}
                <div className="bg-[#005BB2] hover:bg-[#004e9a] text-white rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-6 flex flex-col items-center justify-center text-center space-y-1.5 sm:space-y-2 border border-blue-600/40 shadow-sm transition-all duration-300 group">
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-[#FC6412] group-hover:scale-110 transition-transform duration-300 stroke-[2.2]" />
                  <h4 className="text-xs sm:text-base font-bold text-white">
                    Teléfono
                  </h4>
                  <a
                    href={`tel:${siteConfig.phone.whatsappNumber}`}
                    className="text-[11px] sm:text-[13px] text-blue-100 hover:text-white transition-colors font-medium break-all"
                  >
                    {siteConfig.phone.display}
                  </a>
                </div>

                {/* 2. WhatsApp */}
                <div className="bg-[#005BB2] hover:bg-[#004e9a] text-white rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-6 flex flex-col items-center justify-center text-center space-y-1.5 sm:space-y-2 border border-blue-600/40 shadow-sm transition-all duration-300 group">
                  <WhatsAppIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#FC6412] group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-xs sm:text-base font-bold text-white">
                    WhatsApp
                  </h4>
                  <a
                    href={`https://wa.me/${siteConfig.phone.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] sm:text-[13px] text-blue-100 hover:text-white transition-colors font-medium break-all"
                  >
                    {siteConfig.phone.display}
                  </a>
                </div>

                {/* 3. Email */}
                <div className="bg-[#005BB2] hover:bg-[#004e9a] text-white rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-6 flex flex-col items-center justify-center text-center space-y-1.5 sm:space-y-2 border border-blue-600/40 shadow-sm transition-all duration-300 group">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-[#FC6412] group-hover:scale-110 transition-transform duration-300 stroke-[2.2]" />
                  <h4 className="text-xs sm:text-base font-bold text-white">
                    Email
                  </h4>
                  <a
                    href={`mailto:${siteConfig.email.general}`}
                    className="text-[10px] sm:text-[13px] text-blue-100 hover:text-white transition-colors font-medium break-all"
                  >
                    {siteConfig.email.general}
                  </a>
                </div>

                {/* 4. Sede & Cobertura */}
                <div className="bg-[#005BB2] hover:bg-[#004e9a] text-white rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-6 flex flex-col items-center justify-center text-center space-y-1.5 sm:space-y-2 border border-blue-600/40 shadow-sm transition-all duration-300 group">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#FC6412] group-hover:scale-110 transition-transform duration-300 stroke-[2.2]" />
                  <h4 className="text-xs sm:text-base font-bold text-white">
                    Sede
                  </h4>
                  <p className="text-[10px] sm:text-[13px] text-blue-100 font-medium leading-tight">
                    Quito · Guayaquil · Ecuador
                  </p>
                </div>

              </div>

              {/* Mapa Google Maps Interactivo a ancho completo en móvil y encuadrado en desktop */}
              <div className="-mx-4 sm:mx-0 rounded-none overflow-hidden border-y sm:border border-slate-300 shadow-md h-80 sm:h-96 lg:h-[400px] relative">
                <iframe
                  title="Ubicación y Cobertura MH Contabilidad Ecuador"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255347.3486337226!2d-78.58550186981882!3d-0.1865988878906963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002422c9f%3A0x44b4b6930f5e2e7f!2sQuito%2C%20Ecuador!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

            </div>

            {/* Columna Derecha: Formulario Directo sin contenedor de caja */}
            <div id="formulario-contacto" className="lg:col-span-7 space-y-6 scroll-mt-24">
              <div className="space-y-2 text-left">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[40px] font-black text-[#172B3A] tracking-tight leading-[1.15]">
                  Ponte en Contacto
                </h2>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xl">
                  Comuníquese directamente con nuestro equipo para atender sus requerimientos contables, declaraciones SRI y consultas financieras en todo Ecuador.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-left" noValidate>
                  <div>
                    <label
                      htmlFor="form-fullname"
                      className="block text-xs font-semibold text-[#172B3A] mb-1"
                    >
                      Nombre y Apellido *
                    </label>
                    <input
                      id="form-fullname"
                      type="text"
                      required
                      placeholder="Escribe tu nombre..."
                      value={formData.nombreCompleto}
                      onChange={(e) =>
                        setFormData({ ...formData, nombreCompleto: e.target.value })
                      }
                      className={`w-full px-0 py-2.5 bg-transparent border-0 border-b text-sm text-[#172B3A] placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-0 ${
                        errors.nombreCompleto
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-slate-300 focus:border-[#FC6412]'
                      }`}
                    />
                    {errors.nombreCompleto && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.nombreCompleto}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="form-doc"
                        className="block text-xs font-semibold text-[#172B3A]"
                      >
                        Cédula de Identidad o RUC (Ecuador) *
                      </label>
                      {documentValidation && (
                        <span
                          className={`text-[10px] font-medium ${
                            documentValidation.isValid ? 'text-emerald-700' : 'text-amber-700'
                          }`}
                        >
                          {documentValidation.message}
                        </span>
                      )}
                    </div>
                    <input
                      id="form-doc"
                      type="text"
                      required
                      placeholder="10 dígitos (Cédula) o 13 dígitos (RUC)"
                      value={formData.identificacion}
                      onChange={(e) => handleDocumentChange(e.target.value)}
                      maxLength={13}
                      className={`w-full px-0 py-2.5 bg-transparent border-0 border-b text-sm font-mono text-[#172B3A] placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-0 ${
                        errors.identificacion
                          ? 'border-red-500 focus:border-red-500'
                          : documentValidation?.isValid
                          ? 'border-emerald-500 focus:border-emerald-500'
                          : 'border-slate-300 focus:border-[#FC6412]'
                      }`}
                    />
                    {errors.identificacion && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.identificacion}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="form-email"
                        className="block text-xs font-semibold text-[#172B3A] mb-1"
                      >
                        Correo Electrónico *
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        placeholder="contacto@empresa.ec"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-0 py-2.5 bg-transparent border-0 border-b text-sm text-[#172B3A] placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-0 ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-slate-300 focus:border-[#FC6412]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="form-phone"
                        className="block text-xs font-semibold text-[#172B3A] mb-1"
                      >
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        required
                        placeholder="096 839 2931"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className={`w-full px-0 py-2.5 bg-transparent border-0 border-b text-sm text-[#172B3A] placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-0 ${
                          errors.telefono
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-slate-300 focus:border-[#FC6412]'
                        }`}
                      />
                      {errors.telefono && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.telefono}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="form-service"
                      className="block text-xs font-semibold text-[#172B3A] mb-1"
                    >
                      Tipo de Consulta
                    </label>
                    <select
                      id="form-service"
                      value={formData.tipoConsulta}
                      onChange={(e) => setFormData({ ...formData, tipoConsulta: e.target.value })}
                      className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-slate-300 text-sm font-medium text-[#172B3A] focus:outline-none focus:ring-0 focus:border-[#FC6412] cursor-pointer"
                    >
                      <option value="Contabilidad General y Orden Financiero">Contabilidad General y Orden Financiero</option>
                      <option value="Impuestos y Blindaje Fiscal">Impuestos y Blindaje Fiscal</option>
                      <option value="Consultoría y Estrategia de Crecimiento">Consultoría y Estrategia de Crecimiento</option>
                      <option value="Gestión de Nómina y Soporte Laboral">Gestión de Nómina y Soporte Laboral</option>
                      <option value="Tecnología, Facturación y Firmas Electrónicas">Tecnología, Facturación y Firmas Electrónicas</option>
                      <option value="Otro Requerimiento Personalizado">Otro Requerimiento Personalizado</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="form-details"
                      className="block text-xs font-semibold text-[#172B3A] mb-1"
                    >
                      Detalle de su Consulta *
                    </label>
                    <textarea
                      id="form-details"
                      rows={3}
                      required
                      placeholder="Escribe tu mensaje..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className={`w-full px-0 py-2.5 bg-transparent border-0 border-b text-sm text-[#172B3A] placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-0 resize-y ${
                        errors.mensaje
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-slate-300 focus:border-[#FC6412]'
                      }`}
                    />
                    {errors.mensaje && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.mensaje}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      {isSubmitting ? (
                        <span>Enviando información...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Mensaje</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-500 text-center mt-2.5">
                      Al pulsar el botón se abrirá WhatsApp con el mensaje estructurado para atención inmediata.
                    </p>
                  </div>
                </form>

                {submissionResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1 text-left"
                  >
                    <div className="flex items-center gap-2 font-bold text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Solicitud registrada correctamente</span>
                    </div>
                    <p className="text-emerald-800 leading-relaxed">
                      {submissionResult.message}
                    </p>
                  </motion.div>
                )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};