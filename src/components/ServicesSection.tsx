import React, { useState } from 'react';
import { serviceCategories, servicesData } from '../data/services';
import { siteConfig } from '../data/siteConfig';
import {
  Calculator,
  FileText,
  TrendingUp,
  Building2,
  ShieldCheck,
  Receipt,
  PieChart,
  Briefcase,
  MessageSquare,
  Check,
} from 'lucide-react';
import { ServiceItem } from '../types';

export const ServicesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredServices =
    selectedCategory === 'all'
      ? servicesData
      : servicesData.filter((s) => s.category === selectedCategory);

  const getServiceIcon = (iconName: ServiceItem['iconName']) => {
    const props = { className: 'w-6 h-6 text-[#005BB2]' };
    switch (iconName) {
      case 'Calculator':
        return <Calculator {...props} />;
      case 'FileText':
        return <FileText {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'Building2':
        return <Building2 {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Receipt':
        return <Receipt {...props} />;
      case 'PieChart':
        return <PieChart {...props} />;
      case 'Briefcase':
        return <Briefcase {...props} />;
      default:
        return <Calculator {...props} />;
    }
  };

  const createWhatsAppUrl = (message: string) => {
    return `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="servicios" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
            <span className="w-2.5 h-0.5 bg-[#FC6412]" />
            <span>Portafolio Profesional</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172B3A] tracking-tight">
            Servicios contables, tributarios y financieros
          </h2>
          <p className="text-base text-[#64748B] leading-relaxed">
            Estructuras modulares diseñadas para atender de forma precisa las necesidades de personas naturales,
            emprendedores y sociedades comerciales en Ecuador.
          </p>
        </div>

        {/* Controles de Filtrado por Categoría (Functional segmented buttons per frontend-design) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" role="tablist">
          {serviceCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005BB2] ${
                  isActive
                    ? 'bg-[#005BB2] text-white shadow-xs'
                    : 'bg-slate-100 text-[#172B3A] hover:bg-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grilla de Tarjetas de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredServices.map((service) => {
            const waUrl = createWhatsAppUrl(service.whatsappMessage);
            return (
              <div
                key={service.id}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 hover:border-[#005BB2]/40 hover:shadow-md transition-all duration-200 text-left"
              >
                <div className="space-y-4">
                  {/* Fila superior: Icono y Categoría sin cápsula */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-blue-50/80 group-hover:bg-blue-100/80 transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                      {service.categoryLabel}
                    </span>
                  </div>

                  {/* Título y Descripción */}
                  <div>
                    <h3 className="text-lg font-bold text-[#172B3A] group-hover:text-[#005BB2] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed mt-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Puntos destacados del servicio */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-[#172B3A]">
                    {service.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FC6412] shrink-0 mt-0.5" />
                        <span className="text-slate-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón CTA: Abre WhatsApp con mensaje predefinido del servicio */}
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-xs font-semibold text-[#005BB2] bg-blue-50/70 hover:bg-[#005BB2] hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005BB2]"
                  >
                    <span>Consultar servicio</span>
                    <MessageSquare className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota informativa al pie del catálogo */}
        <div className="mt-12 p-4 rounded-xl bg-[#F3F6FA] border border-slate-200/80 text-center max-w-2xl mx-auto">
          <p className="text-xs text-[#64748B]">
            ¿Tienes un requerimiento contable específico para tu actividad o empresa?{' '}
            <a
              href={`https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
                'Hola Jorge Hernández / MH Contabilidad, quisiera consultar por una propuesta personalizada de servicios.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#005BB2] font-semibold hover:underline"
            >
              Escríbenos directamente a WhatsApp
            </a>{' '}
            para evaluar tu caso particular sin compromiso.
          </p>
        </div>
      </div>
    </section>
  );
};
