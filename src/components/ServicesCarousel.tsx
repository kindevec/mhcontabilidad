import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { siteConfig } from '../data/siteConfig';
import { ServiceItem } from '../types';
import {
  ChevronLeft,
  ChevronRight,
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
  ArrowRight,
  Pause,
  Play,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ServicesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive items count calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, servicesData.length - itemsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay (respetando si el usuario pausó o si prefiere no movimiento)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

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

  const totalPages = maxIndex + 1;

  return (
    <div
      className="relative w-full focus:outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Carrusel de servicios destacados"
    >
      {/* Controles de Cabecera del Carrusel */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
          <span>Deslice o use las flechas para explorar nuestros servicios</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Botón de Pausa/Play accesible */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-[#005BB2] hover:bg-slate-50 transition-colors"
            aria-label={isPaused ? 'Reanudar rotación automática' : 'Pausar rotación automática'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* Flecha Anterior */}
          <button
            type="button"
            onClick={prevSlide}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:border-[#005BB2]/40 text-[#172B3A] hover:text-[#005BB2] transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005BB2]"
            aria-label="Ver servicios anteriores"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Flecha Siguiente */}
          <button
            type="button"
            onClick={nextSlide}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:border-[#005BB2]/40 text-[#172B3A] hover:text-[#005BB2] transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005BB2]"
            aria-label="Ver siguientes servicios"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Ventana de Desplazamiento del Carrusel */}
      <div
        className="overflow-hidden touch-pan-y rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {servicesData.map((service) => {
            const waUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(
              service.whatsappMessage
            )}`;

            return (
              <div
                key={service.id}
                className="shrink-0 px-3"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div className="h-full flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 hover:border-[#005BB2]/50 hover:shadow-lg transition-all duration-300 text-left group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-blue-50/80 group-hover:bg-[#005BB2] text-[#005BB2] group-hover:text-white transition-colors duration-200">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        {service.categoryLabel}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#172B3A] group-hover:text-[#005BB2] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mt-2 line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    {/* Puntos destacados */}
                    <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-[#172B3A]">
                      {service.highlights.slice(0, 2).map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#FC6412] shrink-0 mt-0.5" />
                          <span className="text-slate-600 line-clamp-1">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Acciones de la Tarjeta */}
                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-[#FC6412] hover:bg-[#e05308] transition-colors shadow-2xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Consultar</span>
                    </a>

                    <Link
                      to="/servicios"
                      className="inline-flex items-center text-xs font-semibold text-[#005BB2] hover:text-[#004a91] hover:underline"
                    >
                      <span>Ver detalles →</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicadores de Paginación / Puntos */}
      <div className="flex items-center justify-center gap-1.5 mt-8">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-200 rounded-full ${
              currentIndex === idx
                ? 'w-7 h-2 bg-[#005BB2]'
                : 'w-2 h-2 bg-slate-200 hover:bg-slate-300'
            }`}
            aria-label={`Ir al grupo de servicios ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
