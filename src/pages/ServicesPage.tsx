import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { siteConfig } from '../data/siteConfig';
import {
  Calculator,
  Receipt,
  TrendingUp,
  Plus,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ServiceCard } from '../components/ui/card-7';
import heroImg from '../assets/images/hero_contabilidad_asesoria_1792699795005.webp';
import contabilidadImg from '../assets/images/hero_contabilidad_asesoria_1792699795005.webp';
import fiscalImg from '../assets/images/corporate_consulting_team_1792700513952.webp';
import consultoriaImg from '../assets/images/hero_financial_advisor_skyline.webp';
import nominaImg from '../assets/images/equipo_mh_contabilidad.webp';
import tecnologiaImg from '../assets/images/digital_fintech_portal_1792700528199.webp';

export const ServicesPage: React.FC = () => {
  const getServiceImage = (serviceId: string) => {
    switch (serviceId) {
      case 'contabilidad-general':
        return contabilidadImg;
      case 'impuestos-blindaje-fiscal':
        return fiscalImg;
      case 'consultoria-estrategia':
        return consultoriaImg;
      case 'gestion-nomina-laboral':
        return nominaImg;
      case 'tecnologia-facturacion-firmas':
        return tecnologiaImg;
      default:
        return contabilidadImg;
    }
  };

  const createWhatsAppUrl = (message: string) => {
    return `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleFaq = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const faqItems = [
    {
      question: '¿Quiénes están obligados a llevar contabilidad en Ecuador?',
      answer:
        'De acuerdo a la Ley de Régimen Tributario Interno, están obligadas a llevar contabilidad todas las sociedades y las personas naturales que operen con un capital propio superior a $180,000, tengan ingresos brutos anuales superiores a $300,000 o costos y gastos anuales superiores a $240,000.',
    },
    {
      question: '¿Cómo funciona el régimen RIMPE (Negocio Popular vs. Emprendedor)?',
      answer:
        'El RIMPE Negocio Popular aplica a personas naturales con ingresos anuales de hasta $20,000. El RIMPE Emprendedor aplica a personas y sociedades con ingresos entre $20,001 y $300,000. En MH Contabilidad le ayudamos a clasificar correctamente sus actividades para aplicar las tarifas y retenciones correctas.',
    },
    {
      question: '¿Qué necesito para migrar mi contabilidad a MH Contabilidad?',
      answer:
        'Únicamente necesitamos su clave del SRI en Línea, los últimos estados financieros o declaraciones presentadas y sus comprobantes electrónicos. Nosotros nos encargamos de la revisión, conciliación de saldos y continuidad ordenada sin fricciones.',
    },
    {
      question: '¿Cómo emito y gestiono mis facturas electrónicas con su servicio?',
      answer:
        'Le asesoramos en la obtención de su Firma Electrónica con validez legal y dejamos configurado el software contable en la nube (incluyendo sincronización con Perseo) para que emita comprobantes en segundos desde su computadora o celular.',
    },
    {
      question: '¿Cómo evitan multas o sanciones con el SRI?',
      answer:
        'Monitoreamos permanentemente su calendario fiscal según su noveno dígito de RUC, realizamos revisiones previas a cada declaración mensual/semestral y aplicamos un blindaje preventivo para evitar omisiones o inconsistencias formales.',
    },
    {
      question: '¿Ofrecen atención presencial o asesoría remota en todo Ecuador?',
      answer:
        'Brindamos ambas modalidades: atención presencial y reuniones ejecutivas en nuestras sedes de Quito y Guayaquil, además de cobertura contable 100% digital y en tiempo real para clientes en todas las provincias del país.',
    },
  ];

  return (
    <div className="space-y-0">
      {/* 1. Encabezado de Servicios estilo Inicio */}
      <PageHero
        titleLine1="Servicios Contables y Tributarios"
        titleHighlight="Soluciones Integrales para tu Negocio"
        description="Garantizamos el estricto cumplimiento tributario ante el SRI y proporcionamos orden contable y financiero a empresas y autónomos en Ecuador."
        image={heroImg}
        imageAlt="Servicios contables y tributarios profesionales en Ecuador"
      >
        {/* Badges de Especialidades */}
        <div className="pt-4 border-t border-slate-700/60">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 text-[#38BDF8] flex items-center justify-center shrink-0 border border-white/10">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <strong className="block font-bold text-white text-xs leading-tight">Contabilidad</strong>
                <span className="text-slate-400 text-[10px]">NIIF & Balances</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 text-[#38BDF8] flex items-center justify-center shrink-0 border border-white/10">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <strong className="block font-bold text-white text-xs leading-tight">Tributación SRI</strong>
                <span className="text-slate-400 text-[10px]">Declaraciones & Anexos</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FC6412]/20 text-[#FC6412] flex items-center justify-center shrink-0 border border-[#FC6412]/30">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <strong className="block font-bold text-white text-xs leading-tight">Finanzas</strong>
                <span className="text-slate-400 text-[10px]">Control Estratégico</span>
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* 2. Catálogo Oficial de Servicios (Tarjetas con Hover Deslizante estilo Card-7) */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B3A] tracking-tight">
              Nuestros Servicios
            </h2>
          </div>

          {/* Tarjetas Centradas (3 en primera fila, 2 en segunda fila centradas) */}
          <div className="flex flex-wrap justify-center gap-7">
            {servicesData.map((service) => {
              const waUrl = createWhatsAppUrl(service.whatsappMessage);
              const serviceImg = getServiceImage(service.id);
              return (
                <div key={service.id} className="w-full sm:w-[350px] lg:w-[370px] flex justify-center">
                  <ServiceCard
                    imageUrl={serviceImg}
                    imageAlt={service.title}
                    title={service.title}
                    tagline={service.tagline}
                    highlights={service.highlights}
                    whatsappUrl={waUrl}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Preguntas Frecuentes Contables y Tributarias de Ecuador */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#172B3A] tracking-tight">
              Preguntas Frecuentes sobre la Gestión Contable
            </h2>
            <p className="text-sm text-[#64748B] max-w-xl mx-auto">
              Respuestas directas a las consultas más habituales de autónomos, pymes y empresas en Ecuador.
            </p>
          </div>

          {/* Rejilla de 2 columnas con la paleta oficial MH (#005BB2 y #FC6412) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {faqItems.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);
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
