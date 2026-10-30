import React, { useState, useEffect } from 'react';
import {
  Server,
  KeyRound,
  ShieldAlert,
  Search,
  CheckCircle2,
  FileCheck2,
  Lock,
  RefreshCw,
  Info,
} from 'lucide-react';
import { PerseoConfigStatus, PerseoQueryRequest, PerseoQueryResponse } from '../types';
import { getPerseoStatus, queryPerseo, PERSEO_PLANNED_ENDPOINTS } from '../services/perseoService';
import { validateEcuadorianDocument } from '../services/contactService';

export const PerseoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'consulta' | 'diagnostico'>('consulta');
  const [configStatus, setConfigStatus] = useState<PerseoConfigStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Formulario de consulta
  const [docType, setDocType] = useState<PerseoQueryRequest['tipoDocumento']>('RUC');
  const [docNumber, setDocNumber] = useState('');
  const [queryType, setQueryType] = useState<PerseoQueryRequest['tipoConsulta']>('estado_cuenta');

  // Estados de ejecución
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [queryResult, setQueryResult] = useState<PerseoQueryResponse | null>(null);

  const fetchStatus = async () => {
    setLoadingStatus(true);
    try {
      const status = await getPerseoStatus();
      setConfigStatus(status);
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setQueryResult(null);

    // Validación básica sintáctica
    if (!docNumber.trim()) {
      setValidationError('Por favor ingrese el número de documento a consultar.');
      return;
    }

    if (docType === 'CEDULA' || docType === 'RUC') {
      const val = validateEcuadorianDocument(docNumber);
      if (!val.isValid) {
        setValidationError(`Formato de ${docType} no válido: ${val.message}`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const res = await queryPerseo({
        identificacion: docNumber.trim(),
        tipoDocumento: docType,
        tipoConsulta: queryType,
      });
      setQueryResult(res);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="perseo" className="py-20 lg:py-28 bg-[#F3F6FA] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de la Sección */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#005BB2] uppercase tracking-wider">
            <span className="w-2.5 h-0.5 bg-[#FC6412]" />
            <span>Módulo Tecnológico</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172B3A] tracking-tight">
            Consultas e Integración con Sistema Contable de MH Contabilidad
          </h2>
          <p className="text-base text-[#64748B] leading-relaxed">
            Plataforma preparada contractualmente para la interoperabilidad con el sistema
            contable de MH Contabilidad, permitiendo vincular servicios y automatizar consultas de clientes y estados de cuenta.
          </p>
        </div>

        {/* Barra de pestañas operativas (Clean Segmented Buttons) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('consulta')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'consulta'
                  ? 'bg-[#005BB2] text-white shadow-xs'
                  : 'text-[#172B3A] hover:text-[#005BB2]'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Formulario de Consulta</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('diagnostico')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'diagnostico'
                  ? 'bg-[#005BB2] text-white shadow-xs'
                  : 'text-[#172B3A] hover:text-[#005BB2]'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Diagnóstico de Conexión API</span>
            </button>
          </div>
        </div>

        {/* PESTAÑA 1: FORMULARIO DE CONSULTA AL SISTEMA PERSEO */}
        {activeTab === 'consulta' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
              <div className="flex items-start justify-between border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-lg font-bold text-[#172B3A]">
                    Consulta automatizada en el sistema contable de MH Contabilidad
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Ingrese los datos de su empresa o identificación fiscal para localizar sus registros en el sistema.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 text-[#005BB2] shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
              </div>

              {/* Formulario */}
              <form onSubmit={handleQuerySubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Tipo de Documento */}
                  <div>
                    <label
                      htmlFor="perseo-doc-type"
                      className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                    >
                      Tipo de Identificación
                    </label>
                    <select
                      id="perseo-doc-type"
                      value={docType}
                      onChange={(e) =>
                        setDocType(e.target.value as PerseoQueryRequest['tipoDocumento'])
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-[#172B3A] focus:outline-none focus:border-[#005BB2]"
                    >
                      <option value="RUC">RUC (13 dígitos - Personas y Sociedades)</option>
                      <option value="CEDULA">Cédula de Identidad (10 dígitos)</option>
                      <option value="PASAPORTE">Pasaporte / Extranjero</option>
                    </select>
                  </div>

                  {/* Número de Documento */}
                  <div>
                    <label
                      htmlFor="perseo-doc-number"
                      className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                    >
                      Número de Documento
                    </label>
                    <input
                      id="perseo-doc-number"
                      type="text"
                      placeholder={docType === 'RUC' ? '1790012345001' : '1712345678'}
                      value={docNumber}
                      onChange={(e) => setDocNumber(e.target.value)}
                      maxLength={docType === 'RUC' ? 13 : docType === 'CEDULA' ? 10 : 20}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-[#172B3A] font-mono placeholder:text-slate-400 focus:outline-none focus:border-[#005BB2]"
                    />
                  </div>
                </div>

                {/* Tipo de Consulta */}
                <div>
                  <label
                    htmlFor="perseo-query-type"
                    className="block text-xs font-semibold text-[#172B3A] mb-1.5"
                  >
                    Operación de Consulta Requerida
                  </label>
                  <select
                    id="perseo-query-type"
                    value={queryType}
                    onChange={(e) =>
                      setQueryType(e.target.value as PerseoQueryRequest['tipoConsulta'])
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-[#172B3A] focus:outline-none focus:border-[#005BB2]"
                  >
                    <option value="estado_cuenta">Estado de Cuenta Comercial y Cartera</option>
                    <option value="retenciones">Verificación de Comprobantes de Retención SRI</option>
                    <option value="comprobante_electronico">Localización de Facturas Electrónicas Autorizadas</option>
                  </select>
                </div>

                {/* Alerta de validación sintáctica */}
                {validationError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Botón de Enviar Consulta */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-white bg-[#005BB2] hover:bg-[#004a91] active:bg-[#003d78] disabled:opacity-60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005BB2]"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verificando conexión en el sistema contable...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        <span>Consultar en Sistema Contable de MH Contabilidad</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Resultado / Respuesta Clara y Transparente (Sin datos falsos simulados) */}
              {queryResult && (
                <div
                  className={`mt-6 p-4 rounded-xl border text-xs space-y-2 ${
                    queryResult.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-amber-50/90 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                    <div className="space-y-1">
                      <p className="font-bold text-amber-950">
                        Estado del Sistema Contable de MH Contabilidad
                      </p>
                      <p className="leading-relaxed text-amber-900">
                        {queryResult.message}
                      </p>
                      <div className="pt-2 text-[11px] text-amber-800 flex items-center gap-3">
                        <span>Código: <code>{queryResult.errorCode || 'STATUS_OK'}</code></span>
                        <span>·</span>
                        <span>Fecha: {new Date(queryResult.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PESTAÑA 2: DIAGNÓSTICO DE CONEXIÓN Y CHECKLIST TÉCNICO */}
        {activeTab === 'diagnostico' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-lg font-bold text-[#172B3A]">
                    Estado de Conexión del Sistema Contable de MH Contabilidad
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Inspección técnica de la capa de integración backend para el sistema contable de MH Contabilidad.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchStatus}
                  disabled={loadingStatus}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-[#172B3A] hover:bg-slate-50 transition-colors shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingStatus ? 'animate-spin' : ''}`} />
                  <span>Actualizar estado</span>
                </button>
              </div>

              {/* Tarjeta de Estado Actual */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-xs font-bold text-[#172B3A]">
                    Estado: {configStatus?.isConfigured ? 'Conectado a Sistema MH Cloud' : 'En espera de credenciales API oficiales'}
                  </span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {configStatus?.statusMessage}
                </p>
              </div>

              {/* Endpoints Previstos (Estructura Modular Contractual) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#172B3A] uppercase tracking-wider">
                  Endpoints en Arquitectura Modular (Contrato Perseo)
                </h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                  {PERSEO_PLANNED_ENDPOINTS.map((endpoint, i) => (
                    <div key={i} className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 font-mono font-semibold text-[#005BB2]">
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700">
                            {endpoint.method}
                          </span>
                          <span>{endpoint.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {endpoint.purpose}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                          {endpoint.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requisitos Pendientes y Seguridad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172B3A]">
                    <KeyRound className="w-4 h-4 text-[#005BB2]" />
                    <span>Variables de Entorno Requeridas</span>
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1 font-mono">
                    <li>• <code>PERSEO_API_BASE_URL</code></li>
                    <li>• <code>PERSEO_API_KEY</code></li>
                    <li>• <code>PERSEO_EMPRESA_ID</code></li>
                    <li>• <code>PERSEO_API_USER</code></li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172B3A]">
                    <Lock className="w-4 h-4 text-[#FC6412]" />
                    <span>Política de Seguridad Aislada</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Las claves privadas y credenciales residen exclusivamente en la capa de servidor backend.
                    Nunca son expuestas en el código cliente frontend ni en variables <code>VITE_*</code> públicas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
