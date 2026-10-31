import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { siteConfig } from '../data/siteConfig';
import {
  Plus,
  ArrowDown,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
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
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleToggleService = (id: string) => {
    setActiveServiceId((prev) => (prev === id ? null : id));
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
        'Le asesoramos en la obtención de su Firma Electrónica con validez legal y dejamos configurado el sistema contable de MH Contabilidad en la nube para que emita comprobantes en segundos desde su computadora o celular.',
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
        {/* Accesos Rápidos */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
          <a
            href={createWhatsAppUrl('Hola MH Contabilidad, deseo cotizar un servicio contable y tributario para mi empresa.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Cotizar Asesoría</span>
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span>Ver Servicios</span>
            <ArrowDown className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </PageHero>

      {/* 2. Catálogo Oficial de Servicios (Tarjetas con Hover Deslizante estilo Card-7) */}
      <section id="servicios" className="pt-10 pb-6 sm:py-20 bg-[#F8FAFC] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B3A] tracking-tight">
              Nuestros Servicios
            </h2>
          </div>

          {/* Tarjetas: 2 por fila en móvil (< sm), 3 y 2 centradas en PC (sm+) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2.5 sm:gap-7">
            {servicesData.map((service, idx) => {
              const waUrl = createWhatsAppUrl(service.whatsappMessage);
              const serviceImg = getServiceImage(service.id);
              const isLast = idx === servicesData.length - 1 && servicesData.length % 2 !== 0;

              return (
                <div
                  key={service.id}
                  className={`w-full sm:w-[350px] lg:w-[370px] flex justify-center ${
                    isLast
                      ? 'col-span-2 flex justify-center [&>div]:w-[calc(50%-5px)] sm:[&>div]:w-full'
                      : ''
                  }`}
                >
                  <ServiceCard
                    imageUrl={serviceImg}
                    imageAlt={service.title}
                    title={service.title}
                    tagline={service.tagline}
                    highlights={service.highlights}
                    whatsappUrl={waUrl}
                    isActive={activeServiceId === service.id}
                    onToggle={() => handleToggleService(service.id)}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Preguntas Frecuentes Contables y Tributarias de Ecuador */}
      <section className="pt-6 pb-14 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#172B3A] tracking-tight">
              Preguntas Frecuentes sobre la Gestión Contable
            </h2>
            <p className="text-sm text-[#64748B] max-w-xl mx-auto">
              Respuestas directas a las consultas más habituales de autónomos, pymes y empresas en Ecuador.
            </p>
          </div>

          {/* Rejilla: 2 preguntas por fila en móvil (< md) y en desktop (md+) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-5">
            {faqItems.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);
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