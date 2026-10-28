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
import consultingTeamImg from '../assets/images/corporate_consulting_team_1792700513952.webp';
import teamGroupImg from '../assets/images/equipo_mh_completo_panoramico.webp';
import contabilidadImg from '../assets/images/hero_contabilidad_asesoria_1792699795005.webp';
import equipoReunionImg from '../assets/images/equipo_mh_contabilidad.webp';
import skylineCityImg from '../assets/images/hero_financial_advisor_skyline.webp';

export const AboutPage: React.FC = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent('Hola Jorge Hernandez / MH Contabilidad, me gustaria conversar sobre sus servicios contables y tributarios.')}`;

  return (
    <div className="space-y-0">
      {/* 1. Encabezado Institucional estilo Inicio */}
      <PageHero
        titleLine1="Tu Respaldo Contable"
        titleHighlight="Tu Impulso Estratégico"
        description={`Firma de servicios contables y fiscales diseñada para ser el respaldo estratégico de autónomos, pymes y medianas empresas en Ecuador, bajo el liderazgo de ${siteConfig.representative}.`}
        image={consultingTeamImg}
        imageAlt="Equipo de consultoría contable MH Contabilidad"
      >
        {/* Badges de Respaldo */}
        <div className="pt-4 border-t border-slate-700/60">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 text-[#38BDF8] flex items-center justify-center shrink-0 border border-white/10">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <strong className="block font-bold text-white text-xs leading-tight">{siteConfig.representative}</strong>
                <span className="text-slate-400 text-[10px]">{siteConfig.businessEntity}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 text-[#38BDF8] flex items-center justify-center shrink-0 border border-white/10">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <strong className="block font-bold text-white text-xs leading-tight">Precisión Segura</strong>
                <span className="text-slate-400 text-[10px]">Rigor y cumplimiento</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FC6412]/20 text-[#FC6412] flex items-center justify-center shrink-0 border border-[#FC6412]/30">
                <WhatsAppIcon className="w-4 h-4" />
              </div>
              <div>
                <strong className="block font-bold text-white text-xs leading-tight">Cercanía Proactiva</strong>
                <span className="text-slate-400 text-[10px]">Trato humano directo</span>
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* 2. Quiénes Somos (Composición Asimétrica con Collage Orgánico y Elementos Destacados) */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Columna Izquierda: Collage de Fotografías Reales con Curvas Orgánicas y Badge Flotante Naranja */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4 sm:gap-5 items-center">
                
                {/* Columna 1 del Collage: Foto vertical alta con esquinas curvas + Badge flotante de Años de experiencia */}
                <div className="space-y-4">
                  <div className="relative h-64 sm:h-76 rounded-[36px] rounded-tl-[60px] overflow-hidden shadow-lg border border-slate-100 group">
                    <img
                      src={contabilidadImg}
                      alt="Asesoría Contable Personalizada en MH Contabilidad"
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
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white ring-4 ring-[#FC6412]/30 group">
                    <img
                      src={equipoReunionImg}
                      alt="Reunión del equipo de consultoría contable MH"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Foto con curvas suaves complementaria */}
                  <div className="relative h-48 sm:h-56 rounded-[36px] rounded-br-[60px] overflow-hidden shadow-lg border border-slate-100 group">
                    <img
                      src={teamGroupImg}
                      alt="Equipo de trabajo MH Contabilidad Ecuador"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
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
              {/* Título Principal con resalte bimetálico */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#172B3A] tracking-tight leading-[1.15]">
                Nuestro Orden Contable <span className="text-[#FC6412]">Impulsa</span> Tu Crecimiento.
              </h2>

              {/* Textos Oficiales Solicitados */}
              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
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
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white drop-shadow-sm">
              Nuestros Valores Comerciales
            </h2>
          </div>

          {/* Cuadrícula de 6 bloques compactos idéntica al diseño de referencia (2 filas x 3 columnas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10 shadow-2xl overflow-hidden rounded-none">
            
            {/* Bloque 1: DESTACADO AMARILLO/NARANJA KINDEV (#F5A623 / #FC6412) */}
            <div className="bg-[#E58A1F] text-slate-950 p-8 sm:p-9 flex flex-col items-center text-center justify-center space-y-3 border border-black/10 select-none group transition-all duration-300 hover:brightness-105">
              <div className="w-16 h-16 rounded-none flex items-center justify-center text-slate-950">
                <Laptop className="w-12 h-12 stroke-[1.8]" />
              </div>
              <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-slate-950">
                CLARIDAD ABSOLUTA
              </h3>
              <p className="text-xs text-slate-900/90 leading-relaxed font-medium max-w-xs">
                Explicamos las finanzas y los impuestos en un idioma simple, directo y sin tecnicismos complejos.
              </p>
            </div>

            {/* Bloque 2: Fondo Oscuro Transparente */}
            <div className="bg-[#1C1815]/90 hover:bg-[#1C1815] backdrop-blur-md text-white p-8 sm:p-9 flex flex-col items-center text-center justify-center space-y-3 border border-white/10 select-none group transition-all duration-300">
              <div className="w-16 h-16 rounded-none flex items-center justify-center text-white">
                <PhoneCall className="w-12 h-12 stroke-[1.8]" />
              </div>
              <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white">
                CERCANÍA PROACTIVA
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-xs">
                Monitoreamos activamente el negocio y nos anticipamos a contingencias o ahorros fiscales.
              </p>
            </div>

            {/* Bloque 3: Fondo Oscuro Transparente */}
            <div className="bg-[#1C1815]/90 hover:bg-[#1C1815] backdrop-blur-md text-white p-8 sm:p-9 flex flex-col items-center text-center justify-center space-y-3 border border-white/10 select-none group transition-all duration-300">
              <div className="w-16 h-16 rounded-none flex items-center justify-center text-white">
                <Shield className="w-12 h-12 stroke-[1.8]" />
              </div>
              <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white">
                PRECISIÓN SEGURA
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-xs">
                Máximo rigor técnico y actualización normativa para un cumplimiento fiscal impecable ante el SRI.
              </p>
            </div>

            {/* Bloque 4: Fondo Oscuro Transparente */}
            <div className="bg-[#1C1815]/90 hover:bg-[#1C1815] backdrop-blur-md text-white p-8 sm:p-9 flex flex-col items-center text-center justify-center space-y-3 border border-white/10 select-none group transition-all duration-300">
              <div className="w-16 h-16 rounded-none flex items-center justify-center text-white">
                <TrendingUp className="w-12 h-12 stroke-[1.8]" />
              </div>
              <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white">
                VISIÓN DE CRECIMIENTO
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-xs">
                Soluciones contables escalables que se adaptan al tamaño actual y proyectan el crecimiento futuro.
              </p>
            </div>

            {/* Bloque 5: Fondo Oscuro Transparente */}
            <div className="bg-[#1C1815]/90 hover:bg-[#1C1815] backdrop-blur-md text-white p-8 sm:p-9 flex flex-col items-center text-center justify-center space-y-3 border border-white/10 select-none group transition-all duration-300">
              <div className="w-16 h-16 rounded-none flex items-center justify-center text-white">
                <Users2 className="w-12 h-12 stroke-[1.8]" />
              </div>
              <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white">
                ALIADOS COTIDIANOS
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-xs">
                Trato humano y personalizado; estamos a un mensaje de distancia para resolver dudas en el momento.
              </p>
            </div>

            {/* Bloque 6: Fondo Oscuro Transparente */}
            <div className="bg-[#1C1815]/90 hover:bg-[#1C1815] backdrop-blur-md text-white p-8 sm:p-9 flex flex-col items-center text-center justify-center space-y-3 border border-white/10 select-none group transition-all duration-300">
              <div className="w-16 h-16 rounded-none flex items-center justify-center text-white">
                <FileCheck2 className="w-12 h-12 stroke-[1.8]" />
              </div>
              <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white">
                BLINDAJE TRIBUTARIO
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-xs">
                Control contable que protege tu patrimonio, evita multas y brinda absoluta paz mental.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Sección ¿Por qué contratarnos? Estilo Geométrico Active Business Growth */}
      <WhyChooseUsSection />
    </div>
  );
};
