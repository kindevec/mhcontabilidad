import React from 'react';
import { siteConfig } from '../data/siteConfig';
import { Shield, Target, Compass, Lock, CheckCircle, Clock } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="py-20 lg:py-28 bg-[#F3F6FA] border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de Sección */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
            <span className="w-2.5 h-0.5 bg-[#FC6412]" />
            <span>Nuestra Firma</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172B3A] tracking-tight">
            Compromiso ético, precisión técnica y cercanía profesional
          </h2>
          <p className="text-base text-[#64748B] leading-relaxed">
            En MH Contabilidad entendemos que la tranquilidad tributaria y el orden financiero son la base
            del crecimiento sostenible de cualquier negocio o actividad económica.
          </p>
        </div>

        {/* Composición en 2 Columnas (Desktop) / 1 Columna (Móvil) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Columna 1: Presentación y Enfoque de Trabajo */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <h3 className="text-xl font-bold text-[#172B3A]">
                ¿Quiénes somos y cómo trabajamos?
              </h3>

              <p className="text-sm text-[#64748B] leading-relaxed">
                <strong className="text-[#172B3A] font-semibold">MH Contabilidad</strong> es una firma de
                servicios contables y tributarios representada por <strong className="text-[#172B3A] font-semibold">{siteConfig.representative}</strong>.
                Nos caracterizamos por un modelo de atención directa, donde cada cliente recibe un trato
                individualizado y soluciones adaptadas a la naturaleza específica de su operación.
              </p>

              <p className="text-sm text-[#64748B] leading-relaxed">
                Nuestro enfoque prioriza la <strong className="text-[#005BB2]">prevención fiscal</strong> y la
                organización contable oportuna. No esperamos al cierre del ejercicio para revisar los números;
                establecemos rutinas mensuales de revisión, conciliación y comunicación constante para evitar
                sorpresas o sanciones tributarias.
              </p>

              {/* Valores Profesionales */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-[#005BB2] shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#172B3A]">Integridad y Ética</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Transparencia absoluta en la aplicación estricta de la ley tributaria.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-orange-50 text-[#FC6412] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#172B3A]">Puntualidad Rigurosa</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Declaraciones y reportes presentados siempre dentro de los plazos legales.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-[#005BB2] shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#172B3A]">Confidencialidad</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Custodia segura y estricta reserva de su información financiera.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-orange-50 text-[#FC6412] shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#172B3A]">Atención Directa</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Canal de consulta continuo sin intermediarios burocráticos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 2: Misión, Visión y Compromiso de Servicio */}
          <div className="lg:col-span-6 space-y-6">
            {/* Bloque Misión y Visión (Estructurado para validación/edición del cliente) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-[#005BB2]" />
                  <h3 className="text-base font-bold text-[#172B3A]">Nuestra Misión</h3>
                </div>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Proporcionar servicios contables, tributarios y de asesoría financiera con los más altos
                  estándares de calidad y responsabilidad profesional, facilitando a nuestros clientes el
                  cumplimiento de sus deberes formales y el control eficiente de sus recursos.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <Compass className="w-5 h-5 text-[#FC6412]" />
                  <h3 className="text-base font-bold text-[#172B3A]">Nuestra Visión</h3>
                </div>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Consolidarnos como un aliado estratégico confiable para el sector empresarial y profesional en
                  Ecuador, combinando solvencia técnica con la incorporación progresiva de herramientas tecnológicas
                  e integraciones contables modernas.
                </p>
              </div>
            </div>

            {/* Tarjeta de Compromiso Institucional */}
            <div className="bg-[#005BB2] text-white p-6 sm:p-8 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-4 translate-y-4">
                <div className="w-40 h-40 border-8 border-white rounded-full" />
              </div>
              <div className="relative z-10 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-orange-300">
                  Compromiso de Gestión
                </div>
                <h4 className="text-lg font-bold text-white">
                  Respaldamos su tranquilidad fiscal
                </h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Tratamos la contabilidad de su negocio como si fuera propia. Nos aseguramos de que cada
                  factura, retención y reporte cumpla estrictamente con la normativa vigente del Servicio de
                  Rentas Internas (SRI).
                </p>
                <div className="pt-2">
                  <a
                    href="#contacto"
                    className="inline-flex items-center text-xs font-semibold text-white hover:text-orange-200 transition-colors underline underline-offset-4"
                  >
                    Conversar directamente con Jorge Hernández →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
