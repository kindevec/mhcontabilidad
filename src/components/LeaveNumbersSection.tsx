import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Send } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { MHLogo } from './MHLogo';
import contabilidadImg from '../assets/images/hero_contabilidad_asesoria_1792699795005.webp';

export const LeaveNumbersSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: 'Contabilidad General y Orden Financiero',
    message: '',
    hpField: '',
  });

  const sanitize = (val: string) => val.replace(/[<>]/g, '').trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.hpField) return;

    const fullName = `${sanitize(formData.firstName)} ${sanitize(formData.lastName)}`.trim();
    const text = `Hola Jorge Hernandez / MH Contabilidad, mi nombre es ${fullName}. Mi telefono es ${formData.phone}, correo: ${formData.email}. Servicio de interes: ${formData.service}. Mensaje: ${formData.message}`;
    const waUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="bg-slate-50 overflow-hidden relative border-t border-slate-100">
      
      {/* 1. Encabezado Superior con Imagen de Contabilidad de Fondo y Overlay Naranja por encima */}
      <div className="relative pt-14 pb-28 sm:pb-36 px-4 text-center overflow-hidden">
        {/* Imagen de fondo contable */}
        <img
          src={contabilidadImg}
          alt="Asesoría Contable MH"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.9]"
        />
        {/* Fondo naranja superpuesto con degradado oficial de MH */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FC6412]/92 via-[#FC6412]/85 to-[#e05308]/92 backdrop-blur-[1px]" />

        {/* Textos del separador */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-2 text-white">
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-orange-100">
            ¿Tienes dudas con tus impuestos o contabilidad?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight">
            Déjanos los números a nosotros
          </h2>
          <p className="text-xs sm:text-sm text-orange-100/90 max-w-xl mx-auto pt-1 font-medium">
            Concéntrate en crecer. Nosotros nos encargamos de tus balances, declaraciones ante el SRI y nóminas con total rigor técnico.
          </p>
        </div>
      </div>

      {/* 2. Tarjeta Split Central (Formulario Blanco sin contenedores solo con líneas + Bloque Azul Marino con Logo oficial) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 pb-16 sm:pb-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-100">
          
          {/* Lado Izquierdo (Fondo Blanco): Formulario limpio solo con líneas inferiores (sin cajas contenedoras) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 text-left bg-white">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Fila 1: Primer Nombre y Apellido */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 tracking-wide">
                    Primer Nombre
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full py-2.5 px-0 bg-transparent border-b-2 border-slate-200 focus:border-[#005BB2] text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors rounded-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 tracking-wide">
                    Apellido
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Pérez"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full py-2.5 px-0 bg-transparent border-b-2 border-slate-200 focus:border-[#005BB2] text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors rounded-none"
                  />
                </div>
              </div>

              {/* Fila 2: Correo Electrónico y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 tracking-wide">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tuempresa@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full py-2.5 px-0 bg-transparent border-b-2 border-slate-200 focus:border-[#005BB2] text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors rounded-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 tracking-wide">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+593 96 839 2931"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full py-2.5 px-0 bg-transparent border-b-2 border-slate-200 focus:border-[#005BB2] text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors rounded-none"
                  />
                </div>
              </div>

              {/* Fila 3: Servicio de Interés */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 tracking-wide">
                  Servicio que requieres
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full py-2.5 px-0 bg-transparent border-b-2 border-slate-200 focus:border-[#005BB2] text-xs sm:text-sm text-slate-900 outline-none transition-colors rounded-none cursor-pointer"
                >
                  <option value="Contabilidad General y Orden Financiero">Contabilidad General y Orden Financiero</option>
                  <option value="Impuestos y Blindaje Fiscal">Impuestos y Blindaje Fiscal</option>
                  <option value="Consultoría y Estrategia de Crecimiento">Consultoría y Estrategia de Crecimiento</option>
                  <option value="Gestión de Nómina y Soporte Laboral">Gestión de Nómina y Soporte Laboral</option>
                  <option value="Tecnología, Facturación y Firmas Electrónicas">Tecnología, Facturación y Firmas Electrónicas</option>
                  <option value="Asesoría Contable Personalizada">Asesoría Contable Personalizada</option>
                </select>
              </div>

              {/* Fila 4: Mensaje */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 tracking-wide">
                  Mensaje o Consulta
                </label>
                <textarea
                  rows={3}
                  placeholder="Cuéntanos brevemente sobre tu negocio o consulta..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full py-2.5 px-0 bg-transparent border-b-2 border-slate-200 focus:border-[#005BB2] text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors rounded-none resize-none"
                />
              </div>

              {/* Botón de Envío Naranja Oficial CENTRADO */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  className="px-10 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#FC6412] hover:bg-[#e05308] active:bg-[#c94703] transition-all shadow-md hover:shadow-xl active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Mensaje</span>
                </button>
              </div>

            </form>
          </div>

          {/* Lado Derecho (Fondo Azul Marino Oscuro #002D5A): Logo oficial de MH del header y datos de contacto */}
          <div className="lg:col-span-5 bg-[#002D5A] p-6 sm:p-10 lg:p-12 text-white flex flex-col justify-between text-left space-y-8">
            
            <div className="space-y-4">
              {/* Logo Oficial de MH Contabilidad (el mismo del Header) */}
              <div className="pb-1">
                <MHLogo variant="light" className="justify-start" />
              </div>

              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
                No solo gestionamos tu contabilidad; te brindamos orden, asesoría oportuna y tranquilidad fiscal para que te enfoques en hacer crecer tu negocio.
              </p>
            </div>

            {/* Lista de Contacto con íconos circulares naranjas/dorados */}
            <div className="space-y-4 pt-2">
              
              {/* 1. Ubicación */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#FC6412] flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-white block">Ecuador — Cobertura Nacional</span>
                  <span className="text-slate-300 text-[11px] block">Atención presencial y telemática para empresas</span>
                </div>
              </div>

              {/* 2. Horario */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#FC6412] flex items-center justify-center shrink-0 shadow-md">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-white block">Lun - Vie: 08:30 AM – 06:00 PM</span>
                  <span className="text-slate-300 text-[11px] block">Sáb: 09:00 AM – 01:00 PM (Citas programadas)</span>
                </div>
              </div>

              {/* 3. Teléfono / WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#FC6412] flex items-center justify-center shrink-0 shadow-md">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-white block">{siteConfig.phone.display}</span>
                  <span className="text-slate-300 text-[11px] block">Línea directa y atención por WhatsApp</span>
                </div>
              </div>

              {/* 4. Correo Electrónico */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#FC6412] flex items-center justify-center shrink-0 shadow-md">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-white block">{siteConfig.email.general}</span>
                  <span className="text-slate-300 text-[11px] block">Consultas generales y propuestas formales</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default LeaveNumbersSection;
