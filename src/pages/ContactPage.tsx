import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import {
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Globe2,
} from 'lucide-react';
import { ContactFormData, ContactFormResult } from '../types';
import { validateEcuadorianDocument, submitContactForm } from '../services/contactService';
import { motion } from 'motion/react';
import consultingTeamImg from '../assets/images/corporate_consulting_team_1792700513952.jpg';

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

    if (!formData.nombreCompleto.trim()) {
      newErrors.nombreCompleto = 'El nombre completo es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono o WhatsApp de contacto es obligatorio';
    }

    if (!formData.identificacion.trim()) {
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
      {/* 1. Encabezado de Contacto sin contenedores: única forma para la imagen derecha */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] items-center relative">
            
            {/* Columna Izquierda: Información de Contacto */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 py-6 sm:py-8 lg:py-10 flex flex-col justify-between space-y-6 z-10 relative"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
                  <span className="w-2.5 h-0.5 bg-[#FC6412]" />
                  <span>Canales de Comunicación</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>MH Contabilidad</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172B3A] tracking-tight leading-[1.15]">
                  Contacto y Atención Directa
                </h1>

                <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl">
                  Comuníquese directamente con Jorge Hernández y el equipo de MH Contabilidad.
                  Atendemos sus requerimientos contables, declaraciones SRI y consultas financieras en todo Ecuador.
                </p>
              </div>

              {/* Badges de Disponibilidad */}
              <div className="pt-6 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs text-[#172B3A]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#EBF3FA] text-[#005BB2] flex items-center justify-center shrink-0 border border-blue-100">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">WhatsApp</strong>
                      <span className="text-slate-500 text-[11px]">{siteConfig.phone.display}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#EBF3FA] text-[#005BB2] flex items-center justify-center shrink-0 border border-blue-100">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">Correo Directo</strong>
                      <span className="text-slate-500 text-[11px]">{siteConfig.email.general}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#FFF0E6] text-[#FC6412] flex items-center justify-center shrink-0 border border-orange-100">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block font-bold text-[#172B3A] text-xs sm:text-[13px]">Horario de Atención</strong>
                      <span className="text-slate-500 text-[11px]">08:30 – 18:00</span>
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
                  src={consultingTeamImg}
                  alt="Reunión y asesoría personalizada de MH Contabilidad en Ecuador"
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

      {/* 2. Cuerpo de Contacto y Formulario */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Columna Izquierda: Canales y Ubicación */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#F3F6FA] rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6">
                <h2 className="text-lg font-bold text-[#172B3A]">
                  Información Institucional de Contacto
                </h2>

                <div className="space-y-4 text-xs text-[#172B3A]">
                  {/* WhatsApp */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3.5 p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs"
                  >
                    <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <strong className="block text-[11px] uppercase tracking-wider text-slate-500">
                        Canal Prioritario WhatsApp
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
                      <p className="text-slate-500 text-[11px]">Atención directa y envío de balances</p>
                    </div>
                  </motion.div>

                  {/* Correo */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3.5 p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs"
                  >
                    <div className="p-2.5 rounded-lg bg-blue-50 text-[#005BB2] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <strong className="block text-[11px] uppercase tracking-wider text-slate-500">
                        Correo Corporativo
                      </strong>
                      <a
                        href={`mailto:${siteConfig.email.general}`}
                        className="text-sm font-bold text-[#172B3A] hover:text-[#005BB2] transition-colors"
                      >
                        {siteConfig.email.general}
                      </a>
                      <p className="text-slate-500 text-[11px]">Recepción de estados y solicitudes</p>
                    </div>
                  </motion.div>

                  {/* Cobertura */}
                  <div className="flex items-start gap-3.5 p-4 bg-white rounded-xl border border-slate-200/80">
                    <div className="p-2.5 rounded-lg bg-orange-50 text-[#FC6412] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <strong className="block text-[11px] uppercase tracking-wider text-slate-500">
                        Sede y Cobertura
                      </strong>
                      <p className="text-xs font-semibold text-[#172B3A]">{siteConfig.location.country}</p>
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        {siteConfig.location.addressNote}
                      </p>
                    </div>
                  </div>

                  {/* Horario */}
                  <div className="flex items-start gap-3.5 p-4 bg-white rounded-xl border border-slate-200/80">
                    <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <strong className="block text-[11px] uppercase tracking-wider text-slate-500">
                        Horario de Atención
                      </strong>
                      <p className="text-xs text-[#172B3A] font-medium">{siteConfig.schedule.weekdays}</p>
                      <p className="text-slate-500 text-[11px]">{siteConfig.schedule.saturdays}</p>
                    </div>
                  </div>
                </div>

                {/* Alcance Territorial */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172B3A]">
                    <Globe2 className="w-4 h-4 text-[#005BB2]" />
                    <span>Alcance Territorial en Ecuador</span>
                  </div>
                  <div className="h-36 rounded-lg bg-slate-100/90 border border-slate-200 flex flex-col items-center justify-center text-center p-3 text-slate-600">
                    <div className="p-2 rounded-full bg-blue-50 text-[#005BB2] mb-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <strong className="text-xs text-[#172B3A]">Quito · Guayaquil · Cobertura Nacional</strong>
                    <span className="text-[11px] text-slate-500 mt-1">
                      Gestión contable remota a través del SRI y software en la nube para las 24 provincias.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-[#005BB2] flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Todos los datos proporcionados están resguardados bajo estricto secreto profesional contable.
                  </span>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Formulario Validado */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-[#172B3A]">
                    Formulario de Solicitud de Asesoría
                  </h2>
                  <p className="text-xs text-[#64748B] mt-1">
                    Complete los datos y seleccione el tipo de servicio requerido para conectar inmediatamente con su asesor contable.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label
                      htmlFor="form-fullname"
                      className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                    >
                      Nombre y Apellido *
                    </label>
                    <input
                      id="form-fullname"
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
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

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="form-email"
                        className="block text-xs font-semibold text-[#172B3A] mb-1.5"
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
                        htmlFor="form-phone"
                        className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                      >
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        required
                        placeholder="099 283 1742"
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

                  <div>
                    <label
                      htmlFor="form-service"
                      className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                    >
                      Tipo de Consulta
                    </label>
                    <select
                      id="form-service"
                      value={formData.tipoConsulta}
                      onChange={(e) => setFormData({ ...formData, tipoConsulta: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-[#172B3A] focus:outline-none focus:border-[#005BB2]"
                    >
                      <option value="Asesoría Contable General">Asesoría Contable General</option>
                      <option value="Declaraciones Tributarias SRI">Declaraciones Tributarias SRI (IVA / Renta)</option>
                      <option value="Elaboración de Estados Financieros">Elaboración de Estados Financieros bajo NIIF</option>
                      <option value="Constitución y Formalización de RUC">Constitución y Formalización de RUC</option>
                      <option value="Integración con Sistema Perseo">Integración y Soporte Sistema Perseo</option>
                      <option value="Otro Requerimiento Personalizado">Otro Requerimiento Personalizado</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="form-details"
                      className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                    >
                      Detalle de su Consulta *
                    </label>
                    <textarea
                      id="form-details"
                      rows={4}
                      required
                      placeholder="Describa el estado de su contabilidad o el trámite que requiere ante el SRI..."
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

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#c94703] transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6412] disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Enviando información...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar mensaje y abrir chat de WhatsApp</span>
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
                    className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1"
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
        </div>
      </section>
    </div>
  );
};
