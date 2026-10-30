import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { ContactFormData, ContactFormResult } from '../types';
import { validateEcuadorianDocument, submitContactForm } from '../services/contactService';

export const ContactSection: React.FC = () => {
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
      newErrors.mensaje = 'Por favor detalle brevemente su consulta';
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
        // Redirección suave al canal de WhatsApp del representante contable
        window.open(res.whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
            <span className="w-2.5 h-0.5 bg-[#FC6412]" />
            <span>Atención Personalizada</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172B3A] tracking-tight">
            Contáctenos para evaluar su situación contable
          </h2>
          <p className="text-base text-[#64748B] leading-relaxed">
            Solicite una consulta directa con el representante de la firma, {siteConfig.representative}.
            Analizamos su actividad y le brindamos una propuesta a la medida de sus obligaciones fiscales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Columna Izquierda: Información de Contacto Confirmada */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F3F6FA] rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-[#172B3A]">
                Canales de Atención Oficiales
              </h3>

              <div className="space-y-4 text-xs text-[#172B3A]">
                {/* Teléfono y WhatsApp */}
                <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-slate-200/80">
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block text-[11px] uppercase tracking-wider text-slate-500">
                      WhatsApp y Atención Telefónica
                    </strong>
                    <a
                      href={`https://wa.me/${siteConfig.phone.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#005BB2] hover:underline flex items-center gap-1"
                    >
                      <span>{siteConfig.phone.display}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                    <p className="text-slate-500 text-[11px]">Respuesta directa en horario laboral</p>
                  </div>
                </div>

                {/* Correo Corporativo */}
                <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-slate-200/80">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-[#005BB2] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block text-[11px] uppercase tracking-wider text-slate-500">
                      Correo Electrónico
                    </strong>
                    <a
                      href={`mailto:${siteConfig.email.general}`}
                      className="text-sm font-bold text-[#172B3A] hover:text-[#005BB2] transition-colors"
                    >
                      {siteConfig.email.general}
                    </a>
                    <p className="text-slate-500 text-[11px]">Para recepción de requerimientos y balances</p>
                  </div>
                </div>

                {/* Cobertura y Ubicación */}
                <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-slate-200/80">
                  <div className="p-2.5 rounded-lg bg-orange-50 text-[#FC6412] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block text-[11px] uppercase tracking-wider text-slate-500">
                      Área de Cobertura
                    </strong>
                    <p className="text-xs font-semibold text-[#172B3A]">{siteConfig.location.country}</p>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      {siteConfig.location.addressNote}
                    </p>
                  </div>
                </div>

                {/* Horario de Atención */}
                <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-slate-200/80">
                  <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block text-[11px] uppercase tracking-wider text-slate-500">
                      Horario de Gestión
                    </strong>
                    <p className="text-xs text-[#172B3A] font-medium">{siteConfig.schedule.weekdays}</p>
                    <p className="text-slate-500 text-[11px]">{siteConfig.schedule.saturdays}</p>
                  </div>
                </div>
              </div>

              {/* Tarjeta de Confidencialidad y Datos */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-[#005BB2] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Toda la información y documentación proporcionada a MH Contabilidad está protegida bajo
                  estricto acuerdo de confidencialidad y secreto profesional.
                </span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Contacto Funcional */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-[#172B3A]">
                  Formulario de Solicitud de Asesoría
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Complete los campos para generar su solicitud y conectar inmediatamente con el asesor contable.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Nombre y Apellido */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                  >
                    Nombre y Apellido completo *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Ej. María Elena Paredes"
                    value={formData.nombreCompleto}
                    onChange={(e) =>
                      setFormData({ ...formData, nombreCompleto: e.target.value })
                    }
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-[#172B3A] bg-white transition-colors focus:outline-none ${
                      errors.nombreCompleto
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-200 focus:border-[#005BB2]'
                    }`}
                  />
                  {errors.nombreCompleto && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.nombreCompleto}</span>
                    </p>
                  )}
                </div>

                {/* Cédula o RUC con validación ecuatoriana en vivo */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="contact-doc"
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
                    id="contact-doc"
                    type="text"
                    required
                    placeholder="10 dígitos para Cédula o 13 para RUC"
                    value={formData.identificacion}
                    onChange={(e) => handleDocumentChange(e.target.value)}
                    maxLength={13}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs font-mono text-[#172B3A] bg-white transition-colors focus:outline-none ${
                      errors.identificacion
                        ? 'border-red-500 focus:border-red-500'
                        : documentValidation?.isValid
                        ? 'border-emerald-500 focus:border-emerald-500'
                        : 'border-slate-200 focus:border-[#005BB2]'
                    }`}
                  />
                  {errors.identificacion && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.identificacion}</span>
                    </p>
                  )}
                </div>

                {/* Email y Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                    >
                      Correo Electrónico *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="nombre@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-[#172B3A] bg-white transition-colors focus:outline-none ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#005BB2]'
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
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                    >
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="Ej. 096 839 2931"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-[#172B3A] bg-white transition-colors focus:outline-none ${
                        errors.telefono
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#005BB2]'
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

                {/* Tipo de Consulta */}
                <div>
                  <label
                    htmlFor="contact-type"
                    className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                  >
                    Tipo de Consulta
                  </label>
                  <select
                    id="contact-type"
                    value={formData.tipoConsulta}
                    onChange={(e) => setFormData({ ...formData, tipoConsulta: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-[#172B3A] focus:outline-none focus:border-[#005BB2]"
                  >
                    <option value="Asesoría Contable General">Asesoría Contable General</option>
                    <option value="Declaraciones Tributarias SRI">Declaraciones Tributarias SRI</option>
                    <option value="Elaboración de Estados Financieros">Elaboración de Estados Financieros</option>
                    <option value="Constitución y Formalización de RUC">Constitución y Formalización de RUC</option>
                    <option value="Sistema Contable de MH Contabilidad">Sistema Contable de MH Contabilidad</option>
                    <option value="Otro Requerimiento">Otro Requerimiento Personalizado</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                  >
                    Detalle de su Requerimiento *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Describa brevemente la actividad de su negocio y el servicio contable o tributario que requiere..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-[#172B3A] bg-white transition-colors focus:outline-none ${
                      errors.mensaje
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-200 focus:border-[#005BB2]'
                    }`}
                  />
                  {errors.mensaje && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.mensaje}</span>
                    </p>
                  )}
                </div>

                {/* Botón de Envío */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#FC6412] hover:bg-[#e05308] active:bg-[#c94703] transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6412] focus-visible:ring-offset-2 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Procesando consulta...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar consulta y conectar a WhatsApp</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2.5">
                    Al enviar, se abrirá automáticamente el canal de WhatsApp de MH Contabilidad con el mensaje estructurado.
                  </p>
                </div>
              </form>

              {/* Mensaje de confirmación */}
              {submissionResult && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Consulta procesada con éxito (Folio: {submissionResult.folio})</span>
                  </div>
                  <p className="text-emerald-800 leading-relaxed">
                    {submissionResult.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
