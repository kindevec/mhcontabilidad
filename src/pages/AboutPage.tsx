import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import {
  Shield,
  Eye,
  TrendingUp,
  Target,
  Compass,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Calculator,
  Globe2,
  Award,
  Quote,
  Laptop,
  Users2,
  FileCheck2,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { motion } from 'motion/react';
import { PageHero } from '../components/PageHero';
import { MissionVisionSection } from '../components/MissionVisionSection';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import consultingTeamImg from '../assets/images/nosotros_equipo_institucional_hero.webp?v=21';
import ordenPlanificacionImg from '../assets/images/nuestro_orden_planificacion.jpg';
import ordenPuzzleImg from '../assets/images/nuestro_orden_puzzle.jpg';
import ordenManosImg from '../assets/images/nuestro_orden_equipo_manos.jpg';
import skylineCityImg from '../assets/images/hero_financial_advisor_skyline.webp';

const commercialValues = [
  {
    icon: Laptop,
    title: 'CLARIDAD ABSOLUTA',
    description: 'Explicamos las finanzas y los impuestos en un idioma simple, directo y sin tecnicismos complejos.',
  },
  {
    icon: PhoneCall,
    title: 'CERCANÍA PROACTIVA',
    description: 'Monitoreamos activamente el negocio y nos anticipamos a contingencias o ahorros fiscales.',
  },
  {
    icon: Shield,
    title: 'PRECISIÓN SEGURA',
    description: 'Máximo rigor técnico y actualización normativa para un cumplimiento fiscal impecable ante el SRI.',
  },
  {
    icon: TrendingUp,
    title: 'VISIÓN DE CRECIMIENTO',
    description: 'Soluciones contables escalables que se adaptan al tamaño actual y proyectan el crecimiento futuro.',
  },
  {
    icon: Users2,
    title: 'ALIADOS COTIDIANOS',
    description: 'Trato humano y personalizado; estamos a un mensaje de distancia para resolver dudas en el momento.',
  },
  {
    icon: FileCheck2,
    title: 'BLINDAJE TRIBUTARIO',
    description: 'Control contable que protege tu patrimonio, evita multas y brinda absoluta paz mental.',
  },
];

export const AboutPage: React.FC = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola Ing. Mónica Herrera / MH Contabilidad, me gustaría conversar sobre sus servicios contables y tributarios.')}`;

  return (
    <div className="space-y-0">
      {/* 1. Encabezado Institucional estilo Inicio */}
      <PageHero
        titleLine1="Más que Asesores"
        titleHighlight="Tus Aliados Estratégicos"
        description={`Firma de servicios contables y fiscales diseñada para ser el respaldo estratégico de autónomos, pymes y medianas empresas en Ecuador, bajo el liderazgo de la ${siteConfig.representative}.`}
        image={consultingTeamImg}
        imageAlt="Equipo de consultoría contable MH Contabilidad"
        imageClassName="object-cover object-[center_35%]"
        diagonalOffset={20}
      >
        {/* Accesos Rápidos */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/servicios"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span>Conocer Servicios</span>
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Consultar</span>
          </a>
        </div>
      </PageHero>

      {/* 2. Quiénes Somos (Composición Asimétrica con Collage Orgánico y Elementos Destacados) */}
      <section className="pt-10 sm:pt-16 pb-6 sm:pb-10 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Columna Izquierda: Collage de Fotografías Reales con Curvas Orgánicas y Badge Flotante Naranja */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4 sm:gap-5 items-center">
                
                {/* Columna 1 del Collage: Foto vertical alta con esquinas curvas + Badge flotante de Años de experiencia */}
                <div className="space-y-4">
                  <div className="relative h-64 sm:h-76 rounded-[36px] rounded-tl-[60px] overflow-hidden shadow-lg border border-slate-100 group">
                    <img
                      src={ordenPlanificacionImg}
                      alt="Planificación y asesoría contable en MH Contabilidad"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
                  </div>

                  {/* Contenedor Azul Institucional Asimétrico con la Convicción Oficial */}
                  <div className="bg-[#005BB2] text-white p-4 sm:p-5 rounded-2xl rounded-tr-[36px] rounded-bl-[36px] shadow-lg flex items-start gap-3 sm:gap-3.5 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0 border border-white/20 mt-0.5">
                      <Quote className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold text-white leading-relaxed italic">
                        “Nacimos con una convicción clara: la contabilidad no debería ser un dolor de cabeza, sino la herramienta más poderosa para tu crecimiento.”
                      </p>
                    </div>
                  </div>
                </div>

                {/* Columna 2 del Collage: Foto circular superior + Foto rectangular curva inferior */}
                <div className="space-y-4">
                  {/* Foto Circular con borde decorativo punteado / continuo */}
                  <div className="relative w-32 h-32 xs:w-36 xs:h-36 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white ring-4 ring-[#FC6412]/30 group">
                    <img
                      src={ordenPuzzleImg}
                      alt="Integración y soluciones contables MH"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Foto panorámica: encuadre nativo 25/14 sin espacios vacíos ni recortes de cabezas */}
                  <div className="relative w-full aspect-[25/14] rounded-xl sm:rounded-2xl rounded-br-[36px] sm:rounded-br-[44px] overflow-hidden shadow-lg border border-slate-100 group">
                    <img
                      src={ordenManosImg}
                      alt="Compromiso y trabajo en equipo MH Contabilidad"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 to-transparent pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Botón DESCUBRIR MÁS centrado exactamente debajo de las imágenes */}
              <div className="pt-6 flex justify-center">
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] active:bg-[#c94703] transition-all shadow-md hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <span>DESCUBRIR MÁS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Contenido Institucional con Estilo "Our System Inspires You More" */}
            <div className="lg:col-span-6 space-y-6">
              {/* Título Principal con resalte bimetálico centrado en móvil y PC */}
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#172B3A] tracking-tight leading-[1.15] text-center">
                Nuestro Orden Contable <span className="text-[#FC6412]">Impulsa</span> Tu Crecimiento.
              </h2>

              {/* Textos Oficiales Solicitados */}
              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-justify lg:text-left">
                <p>
                  En el mundo de los negocios, detrás de cada gran idea, de cada pyme que se consolida y de cada mediana empresa que se expande, hay una realidad inevitable: <strong>los números</strong>. Sin embargo, sabemos que tú no fundaste tu negocio para pasar horas ordenando facturas, descifrando leyes fiscales complejas o preocupándote por sorpresas de última hora con los impuestos.
                </p>

                <p>
                  Somos una firma de servicios contables y fiscales diseñada específicamente para ser el respaldo de autónomos, pymes y medianas empresas. Nos alejamos del modelo del contador tradicional y distante que solo aparece a final de mes. Nos convertimos en tus aliados estratégicos cotidianos, combinando el máximo rigor técnico con un trato cercano, humano y sin tecnicismos difíciles de entender.
                </p>
              </div>

              {/* 4 Iconos limpios directos sin contenedores de caja ni fondo, con el título DEBAJO */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-3">
                <div className="flex flex-col items-center text-center gap-2 group">
                  <Calculator className="w-8 h-8 text-[#FC6412] group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-xs sm:text-sm font-bold text-[#172B3A] leading-snug">
                    Servicios de Precisión
                  </h4>
                </div>

                <div className="flex flex-col items-center text-center gap-2 group">
                  <Globe2 className="w-8 h-8 text-[#FC6412] group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-xs sm:text-sm font-bold text-[#172B3A] leading-snug">
                    Soporte y Respaldo Continuo
                  </h4>
                </div>

                <div className="flex flex-col items-center text-center gap-2 group">
                  <Shield className="w-8 h-8 text-[#FC6412] group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-xs sm:text-sm font-bold text-[#172B3A] leading-snug">
                    Blindaje Tributario SRI
                  </h4>
                </div>

                <div className="flex flex-col items-center text-center gap-2 group">
                  <TrendingUp className="w-8 h-8 text-[#FC6412] group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-xs sm:text-sm font-bold text-[#172B3A] leading-snug">
                    Estrategia de Crecimiento
                  </h4>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Misión y Visión con dos contadores centrales estilo referencia */}
      <MissionVisionSection />

      {/* 3. Valores Comerciales (Estilo Cuadrícula Corporativa Oscura / Skyline de Referencia) */}
      <section className="relative py-20 sm:py-24 overflow-hidden bg-slate-950 text-white">
        {/* Imagen panorámica de fondo con filtro de atardecer / skyline corporativo */}
        <div className="absolute inset-0 z-0">
          <img
            src={skylineCityImg}
            alt="Skyline corporativo - Valores Comerciales MH Contabilidad"
            className="w-full h-full object-cover object-center filter brightness-[0.45] saturate-[1.2]"
            loading="lazy"
          />
          {/* Overlay con degradado suave cálido idéntico al estilo de referencia */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Encabezado: Título limpio centrado sin texto secundario */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white drop-shadow-sm">
              Nuestros Valores Comerciales
            </h2>
          </div>

          {/* Cuadrícula de 6 bloques: Base oscura (#1C1815) e iluminación naranja (#E58A1F) en hover */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10 shadow-2xl overflow-hidden rounded-none">
            {commercialValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="valor-comercial-item bg-[#1C1815]/90 hover:!bg-[#E58A1F] backdrop-blur-md p-4 sm:p-9 flex flex-col items-center text-center justify-center space-y-2 sm:space-y-3 border border-white/10 select-none group transition-all duration-300 cursor-pointer"
                >
                  <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-none flex items-center justify-center text-white group-hover:text-slate-950 transition-colors duration-300">
                    <IconComp className="w-7 h-7 sm:w-12 sm:h-12 stroke-[1.8]" />
                  </div>
                  <h3 className="text-xs sm:text-base font-extrabold uppercase tracking-wider text-white group-hover:text-slate-950 transition-colors duration-300">
                    {val.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-300 group-hover:text-slate-900/90 leading-relaxed font-normal group-hover:font-medium transition-colors duration-300 max-w-xs">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Sección ¿Por qué contratarnos? Estilo Geométrico Active Business Growth */}
      <WhyChooseUsSection />
    </div>
  );
};