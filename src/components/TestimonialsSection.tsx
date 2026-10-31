import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatar: string;
  rating: number;
}

const testimonials: TestimonialItem[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    role: 'Gerente General · Inversiones Los Andes',
    comment:
      'Tener a MH Contabilidad y su sistema contable de MH Contabilidad nos devolvió el control absoluto de nuestros números. Declaraciones a tiempo y cero multas con el SRI.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
  },
  {
    id: '2',
    name: 'Elena Santamaría',
    role: 'Fundadora · Distribuidora Santamaría',
    comment:
      'El blindaje tributario y la gestión de facturación electrónica nos permitieron crecer sin temor a contingencias fiscales. Su equipo responde de inmediato.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
  },
  {
    id: '3',
    name: 'Roberto Viteri',
    role: 'Director Financiero · Grupo Logístico Guayas',
    comment:
      'La claridad de los balances y el orden de nómina nos ahorraron cientos de horas al mes. Es un alivio contar con contadores que entienden de negocios.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
  },
  {
    id: '4',
    name: 'Valeria Cárdenas',
    role: 'Propietaria · Boutique & Estilo',
    comment:
      'Desde el primer día me guiaron con paciencia sin tecnicismos enredados. Ahora facturo desde mi celular y mis impuestos están siempre en orden.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
  },
  {
    id: '5',
    name: 'Santiago Morales',
    role: 'CEO · InnovaTech Ecuador',
    comment:
      'La migración contable y la asesoría fiscal de MH fueron clave para levantar financiamiento. Su soporte técnico y humano es inigualable.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
  },
  {
    id: '6',
    name: 'Diana Paredes',
    role: 'Directora Operativa · Servicios Médicos Integrales',
    comment:
      'El manejo riguroso de la nómina y los anexos transaccionales nos da total tranquilidad cada mes. Un equipo verdaderamente comprometido.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cuadruplicamos la lista para garantizar un ciclo infinito continuo y sin vacíos
  const infiniteTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  // Envoltorio cíclico infinito invisible al ojo
  const handleBoundaryWrap = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 4;
    if (singleSetWidth <= 0) return;

    if (el.scrollLeft >= singleSetWidth * 2.5) {
      el.scrollLeft -= singleSetWidth;
    } else if (el.scrollLeft <= singleSetWidth * 0.5) {
      el.scrollLeft += singleSetWidth;
    }
  }, []);

  // Posicionar en el segundo bloque al cargar para permitir deslizamiento previo inmediato
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 4;
    if (singleSetWidth > 0 && el.scrollLeft === 0) {
      el.scrollLeft = singleSetWidth;
    }
  }, []);

  const pauseTemporarily = (duration = 2200) => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, duration);
  };

  // Deslizamiento continuo infinito a 60fps
  useEffect(() => {
    let lastTime = performance.now();
    let animId: number;

    const autoSlide = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isInteracting && scrollRef.current && !isDraggingRef.current) {
        const el = scrollRef.current;
        el.scrollLeft += 32 * delta; // 32 px/segundo de deslizamiento fluido
        handleBoundaryWrap();
      }

      animId = requestAnimationFrame(autoSlide);
    };

    animId = requestAnimationFrame(autoSlide);
    return () => cancelAnimationFrame(animId);
  }, [isInteracting, handleBoundaryWrap]);

  // Arrastre con ratón (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    startScrollLeftRef.current = el.scrollLeft;
    setIsInteracting(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const el = scrollRef.current;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = startScrollLeftRef.current - walk;
    handleBoundaryWrap();
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      pauseTemporarily(1800);
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F8FAFC] border-y border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de la sección centrado con azul corporativo #005BB2 */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 px-4 space-y-3">
          <span className="text-xs sm:text-sm font-extrabold tracking-[0.22em] text-[#005BB2] uppercase">
            TESTIMONIOS REALES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#172B3A] tracking-tight leading-tight">
            ¿Qué opinan nuestros clientes?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Empresarios, pymes y autónomos que confían su tranquilidad financiera y cumplimiento fiscal en MH Contabilidad.
          </p>
        </div>

        {/* Carrusel infinito y deslizante idéntico al carrusel de servicios */}
        <div className="relative w-full group/slider py-2">
          <div
            ref={scrollRef}
            onScroll={handleBoundaryWrap}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={() => {
              handleMouseUpOrLeave();
              setIsInteracting(false);
            }}
            onMouseEnter={() => setIsInteracting(true)}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => pauseTemporarily(2000)}
            className="w-full flex items-stretch gap-4 sm:gap-6 overflow-x-auto select-none cursor-grab active:cursor-grabbing px-2 sm:px-4 py-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {infiniteTestimonials.map((t, idx) => (
              <div
                key={`testimonial-${t.id}-${idx}`}
                className="relative w-[280px] sm:w-[310px] min-h-[300px] bg-white p-6 rounded-3xl rounded-br-[42px] border-b-4 border-b-[#005BB2] border-t border-r border-l border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shrink-0 select-none group"
              >
                {/* Badge de comilla superior derecha en círculo AZUL corporativo #005BB2 */}
                <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#005BB2] text-white flex items-center justify-center shadow-sm group-hover:bg-[#FC6412] transition-colors duration-300">
                  <Quote className="w-3.5 h-3.5 fill-white text-white" />
                </div>

                <div>
                  {/* 5 Estrellas en naranja cálido de acento */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#FC6412] text-[#FC6412]"
                      />
                    ))}
                  </div>

                  {/* Comentario en cursiva con balance tipográfico */}
                  <p className="text-xs sm:text-[13px] text-slate-600 italic leading-relaxed mb-6 font-normal">
                    "{t.comment}"
                  </p>
                </div>

                {/* Autor: Foto circular con borde AZUL #005BB2 + Nombre y Cargo institucional en azul */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="relative shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover p-0.5 border-2 border-[#005BB2]"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#172B3A] group-hover:text-[#005BB2] transition-colors truncate">
                      {t.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#005BB2] truncate">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;