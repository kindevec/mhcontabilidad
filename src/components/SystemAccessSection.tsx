import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  Receipt,
  Layers,
  Calculator,
  ShieldCheck,
  TrendingUp,
  Zap,
  BarChart3,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const SystemAccessSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-[#005BB2] text-white overflow-hidden relative">
      {/* Luces difusas sutiles de fondo para ambientación */}
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 bg-sky-300/15 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Información directa sobre fondo azul con Botón Naranja */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.14]">
              Tu Contabilidad con nuestro Sistema Contable
            </h2>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-xl">
              En MH Contabilidad unificamos nuestra asesoría experta con la tecnología de nuestro sistema contable. Automatiza tu facturación electrónica con el SRI, sincroniza tus ventas y accede a reportes claros en tiempo real.
            </p>

            {/* 4 Íconos grandes directos sin contenedor con solo su texto */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-5 pt-3">
              <div className="flex items-center gap-3 text-white text-sm sm:text-base font-semibold">
                <Zap className="w-6 h-6 text-[#FC6412] shrink-0" />
                <span>Sincronización SRI</span>
              </div>

              <div className="flex items-center gap-3 text-white text-sm sm:text-base font-semibold">
                <Receipt className="w-6 h-6 text-[#FC6412] shrink-0" />
                <span>Facturación Electrónica</span>
              </div>

              <div className="flex items-center gap-3 text-white text-sm sm:text-base font-semibold">
                <BarChart3 className="w-6 h-6 text-[#FC6412] shrink-0" />
                <span>Reportes y Balances</span>
              </div>

              <div className="flex items-center gap-3 text-white text-sm sm:text-base font-semibold">
                <ShieldCheck className="w-6 h-6 text-[#FC6412] shrink-0" />
                <span>Control de Cartera</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Mockups visuales más grandes de Computadora y Celular (sin marcas de texto de terceros) */}
          <div className="lg:col-span-7 relative flex items-center justify-center pt-6 lg:pt-0">
            
            <div className="relative w-full max-w-[620px] lg:max-w-[680px]">
              
              {/* 1. MONITOR DE ESCRITORIO MÁS GRANDE (iMac / PC Display) */}
              <div className="relative mx-auto w-full max-w-[500px] sm:max-w-[560px] lg:max-w-[610px]">
                {/* Pantalla y marco con mayor amplitud */}
                <div className="relative rounded-2xl bg-slate-900 p-2.5 sm:p-3.5 shadow-2xl border border-white/25">
                  <div className="rounded-xl overflow-hidden bg-white text-slate-800 text-xs">
                    
                    {/* Barra superior de la plataforma */}
                    <div className="min-h-8 py-1 bg-slate-900 text-white px-3 flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        <div className="ml-1.5 flex items-center gap-1.5 font-bold text-white text-[10px] sm:text-[11px] tracking-tight">
                          <Database className="w-3.5 h-3.5 text-[#FC6412] shrink-0" />
                          <span className="truncate">MH Plataforma Contable</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[9px] sm:text-[10px] flex items-center gap-1.5 border border-emerald-500/30 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          SRI En línea
                        </span>
                      </div>
                    </div>

                    {/* Cuerpo del dashboard */}
                    <div className="p-3.5 sm:p-4.5 grid grid-cols-12 gap-3.5 bg-slate-50/70">
                      {/* Sidebar con iconos y módulos contables */}
                      <div className="col-span-3 bg-white p-2.5 rounded-lg border border-slate-200/80 space-y-2.5 hidden sm:block text-left">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#005BB2] pb-1.5 border-b border-slate-100">
                          <Layers className="w-3.5 h-3.5 text-[#005BB2]" />
                          <span>Módulos</span>
                        </div>
                        <div className="space-y-2 text-[9px] text-slate-600 font-medium">
                          <div className="flex items-center gap-1.5 text-[#005BB2] font-bold bg-blue-50/80 px-2 py-1 rounded">
                            <Receipt className="w-3 h-3" />
                            <span>Facturación</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-1">
                            <Calculator className="w-3 h-3 text-slate-400" />
                            <span>Libro Mayor</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-1">
                            <FileSpreadsheet className="w-3 h-3 text-slate-400" />
                            <span>Retenciones</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-1">
                            <TrendingUp className="w-3 h-3 text-slate-400" />
                            <span>Balances</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-1">
                            <ShieldCheck className="w-3 h-3 text-slate-400" />
                            <span>SRI Ecuador</span>
                          </div>
                        </div>
                      </div>

                      {/* Área de métricas */}
                      <div className="col-span-12 sm:col-span-9 space-y-3 text-left">
                        {/* 2 Tarjetas de datos sincronizados */}
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-slate-500 font-semibold">Facturación del Mes</span>
                              <Receipt className="w-3.5 h-3.5 text-[#FC6412]" />
                            </div>
                            <p className="text-base font-extrabold text-[#172B3A]">$18,450.00</p>
                            <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-1 pt-0.5">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" /> SRI Sincronizado
                            </span>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-slate-500 font-semibold">Cartera de Clientes</span>
                              <Database className="w-3.5 h-3.5 text-[#005BB2]" />
                            </div>
                            <p className="text-base font-extrabold text-[#172B3A]">342 Registros</p>
                            <span className="text-[9px] font-bold text-blue-600 flex items-center gap-1 pt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Base al día
                            </span>
                          </div>
                        </div>

                        {/* Listado de comprobantes autorizados en tiempo real */}
                        <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-700 border-b border-slate-100 pb-1.5">
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Comprobantes Emitidos
                            </span>
                            <span className="text-emerald-700 font-extrabold">Autorizado SRI</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-slate-700">
                            <span className="font-medium">Fac. Electrónica #001-020-00492</span>
                            <span className="font-semibold text-emerald-600">Sincronizada</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-slate-700">
                            <span className="font-medium">Retención SRI #001-002-00185</span>
                            <span className="font-semibold text-emerald-600">Sincronizada</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-slate-700 border-t border-slate-50 pt-1.5">
                            <span className="font-medium">Asiento Contable Diario</span>
                            <span className="font-bold text-[#005BB2]">Cuadrado 100%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Base metálica del monitor */}
                <div className="w-20 h-4 bg-slate-300 mx-auto rounded-b-sm shadow-inner" />
                <div className="w-36 h-2.5 bg-slate-400 mx-auto rounded-full shadow-md" />
              </div>

              {/* 2. SMARTPHONE MÁS GRANDE A LA DERECHA (iPhone Mockup) */}
              <div className="absolute right-0 sm:-right-1 lg:right-1 bottom-1 sm:bottom-4 w-32 xs:w-36 sm:w-48 lg:w-52 bg-slate-900 rounded-[28px] sm:rounded-[36px] p-2 sm:p-2.5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)] border-2 sm:border-[3.5px] border-slate-800 z-20">
                <div className="rounded-[22px] sm:rounded-[30px] overflow-hidden bg-white text-[10px] sm:text-[11px] p-2.5 sm:p-3 space-y-2.5">
                  {/* Dynamic Island */}
                  <div className="w-12 h-3 bg-slate-900 rounded-full mx-auto" />
                  
                  {/* Contenido móvil */}
                  <div className="space-y-0.5 text-left">
                    <span className="text-[8px] sm:text-[9px] text-[#FC6412] font-bold uppercase tracking-wider">Web Móvil</span>
                    <p className="font-bold text-[#172B3A] text-xs sm:text-sm leading-none">MH Contabilidad</p>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-left space-y-1">
                    <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-slate-500 font-semibold">
                      <span>Ventas del Día</span>
                      <Receipt className="w-3 h-3 text-[#FC6412]" />
                    </div>
                    <p className="text-xs sm:text-sm font-extrabold text-[#005BB2]">$1,280.50</p>
                    <span className="text-[8px] text-emerald-600 font-bold">● Enlace en vivo</span>
                  </div>

                  <div className="pt-1">
                    <span className="block w-full py-1.5 text-center bg-[#FC6412] text-white rounded-lg text-[9px] sm:text-[10px] font-bold shadow-2xs">
                      Emitir Factura
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón Naranja oficial centrado debajo de la imagen que dice 'Consultar aquí' */}
              <div className="pt-3 sm:pt-4 flex justify-center">
                <a
                  href={siteConfig.systemUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-9 py-3.5 rounded-full text-sm font-bold text-white bg-[#FC6412] hover:bg-[#e05308] active:bg-[#c94703] transition-all shadow-lg hover:shadow-2xl hover:-translate-y-0.5 whitespace-nowrap group cursor-pointer"
                >
                  <span>Consultar aquí</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SystemAccessSection;
