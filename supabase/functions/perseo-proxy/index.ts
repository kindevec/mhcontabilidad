// Supabase Edge Function: perseo-proxy
// Proxy seguro para Portal de Clientes y Portal de Proveedores (MH Contabilidad)
// Protege PERSEO_API_KEY en Deno Secrets y exige Validación de Dato Cruzado (LOPDP)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function matchesReferenceDocument(
  input: string,
  candidates: Array<string | number | undefined | null>
): boolean {
  const cleanInput = input.trim().toUpperCase();
  if (!cleanInput || cleanInput.length < 3) return false;
  const inputNoZeros = cleanInput.replace(/^0+/, '');

  for (const rawCand of candidates) {
    if (rawCand === undefined || rawCand === null) continue;
    const cand = String(rawCand).trim().toUpperCase();
    if (!cand) continue;

    if (cand === cleanInput) return true;

    const lastPart = cand.includes('-') ? cand.split('-').pop() || cand : cand;
    if (lastPart === cleanInput) return true;

    const candNoZeros = lastPart.replace(/^0+/, '');
    if (inputNoZeros.length >= 1 && candNoZeros === inputNoZeros) return true;
  }
  return false;
}

async function postPerseo(baseUrl: string, endpoint: string, body: Record<string, unknown>) {
  const resp = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return resp.json();
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const baseUrl = (Deno.env.get('PERSEO_API_BASE_URL') || 'https://tu-contabilidad.com').replace(/\/+$/, '');
  const apiKey = Deno.env.get('PERSEO_API_KEY') || '';
  const url = new URL(req.url);

  // 1. Endpoint de estado (GET ?action=status)
  if (req.method === 'GET' || url.searchParams.get('action') === 'status') {
    const isConfigured = Boolean(baseUrl && apiKey);
    return jsonResponse({
      isConfigured,
      endpointUrl: isConfigured ? baseUrl : undefined,
      statusMessage: isConfigured
        ? 'Conexión activa y autenticada vía Supabase Edge Function con Perseo Cloud.'
        : 'Credenciales API pendientes en Supabase Secrets (PERSEO_API_KEY).',
      supportedOperations: [
        'Portal de Clientes: Facturas, Retenciones, Cartera CxC, Guías, Cobros',
        'Portal de Proveedores: Cuentas por Pagar CxP, Pagos, Retenciones, Facturas',
      ],
      versionRequirement: 'Perseo Web v3 / Supabase Edge Runtime',
    });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ success: false, message: 'Método no permitido' }, 405);
  }

  if (!baseUrl || !apiKey) {
    return jsonResponse(
      {
        success: false,
        errorCode: 'PERSEO_CREDENTIALS_PENDING',
        message: 'El servidor aún no cuenta con las credenciales de la API de Perseo configuradas.',
      },
      412
    );
  }

  try {
    const { identificacion, tipoConsulta, portalTipo, periodo, fechaDesde, fechaHasta, numeroDocumento } =
      await req.json();

    const cleanId = (identificacion || '').trim().replace(/[-\s]/g, '');
    const cleanRefDoc = (numeroDocumento || '').trim();

    if (!cleanId) {
      return jsonResponse(
        {
          success: false,
          errorCode: 'IDENTIFICACION_REQUIRED',
          message: 'Por favor ingrese su número de identificación (RUC o Cédula).',
        },
        400
      );
    }

    if (!cleanRefDoc || cleanRefDoc.length < 3) {
      return jsonResponse(
        {
          success: false,
          errorCode: 'CROSS_VALIDATION_REQUIRED',
          message:
            'Por seguridad y protección de datos (LOPDP), ingrese también el número de una factura o comprobante de referencia (mínimo 3 dígitos).',
        },
        403
      );
    }

    let fDesde = fechaDesde || '20200101';
    let fHasta = fechaHasta || '20291231';
    const currentYear = new Date().getFullYear().toString();

    if (periodo === '2026') {
      fDesde = '20260101';
      fHasta = '20261231';
    } else if (periodo === '2025') {
      fDesde = '20250101';
      fHasta = '20251231';
    } else if (periodo === 'ultimo_mes') {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      fDesde = `${d.getFullYear()}${m}${day}`;
      fHasta = '20291231';
    } else if (!fechaDesde && !periodo) {
      fDesde = `${currentYear}0101`;
      fHasta = `${currentYear}1231`;
    }

    const isProveedor = portalTipo === 'proveedor' || (tipoConsulta && tipoConsulta.startsWith('proveedor_'));
    let matchedCliente: Record<string, any> | null = null;
    let matchedProveedor: Record<string, any> | null = null;

    if (isProveedor) {
      const pj = await postPerseo(baseUrl, '/api/proveedores_obtener', { api_key: apiKey });
      const allProveedores = pj.proveedores || [];
      matchedProveedor =
        allProveedores.find(
          (p: any) =>
            p.identificacion === cleanId ||
            p.identificacion?.includes(cleanId) ||
            p.razonsocial?.toLowerCase().includes(cleanId.toLowerCase())
        ) || null;
    } else {
      const cj = await postPerseo(baseUrl, '/api/clientes_consulta', {
        api_key: apiKey,
        clienteid: '',
        clientescodigo: '',
        identificacion: '',
        contenido: '',
      });
      const allClientes = cj.clientes || [];
      matchedCliente =
        allClientes.find((c: any) => c.identificacion === cleanId || c.identificacion?.includes(cleanId)) || null;
    }

    let resultData: any = null;
    let totalItems = 0;
    let isVerified = false;

    switch (tipoConsulta) {
      case 'facturacion': {
        const json = await postPerseo(baseUrl, '/api/facturas_consulta', {
          api_key: apiKey,
          fechadesde: fDesde,
          fechahasta: fHasta,
        });
        const facturas = (json.facturas || []).filter(
          (f: any) =>
            f.identificacion === cleanId ||
            f.identificacion?.includes(cleanId) ||
            (matchedCliente && f.clientesid === matchedCliente.clientesid) ||
            f.razonsocial?.toLowerCase().includes(cleanId.toLowerCase())
        );
        isVerified = facturas.some((f: any) =>
          matchesReferenceDocument(cleanRefDoc, [
            f.secuencial,
            `${f.establecimiento}-${f.puntoemision}-${f.secuencial}`,
            f.claveacceso,
            f.numeroautorizacion,
          ])
        );
        totalItems = facturas.length;
        resultData = { facturas, total: totalItems };
        break;
      }

      case 'estado_cuenta': {
        const json = await postPerseo(baseUrl, '/api/consulta_cliente_estadocuenta', {
          api_key: apiKey,
          detallado: 1,
        });
        const cxc = (json.cxc || []).filter(
          (c: any) =>
            (matchedCliente && c.clientesid === matchedCliente.clientesid) ||
            (matchedCliente && c.razonsocial?.toLowerCase() === matchedCliente.razonsocial?.toLowerCase()) ||
            c.razonsocial?.toLowerCase().includes(cleanId.toLowerCase())
        );
        const totalFacturado = cxc.reduce((acc: number, curr: any) => acc + Number(curr.valor || 0), 0);
        const totalSaldoPendiente = cxc.reduce((acc: number, curr: any) => acc + Number(curr.saldo || 0), 0);
        isVerified = cxc.some((c: any) => matchesReferenceDocument(cleanRefDoc, [c.secuencia]));
        totalItems = cxc.length;
        resultData = {
          cxc,
          total: totalItems,
          resumen: {
            totalFacturado: Number(totalFacturado.toFixed(2)),
            totalSaldoPendiente: Number(totalSaldoPendiente.toFixed(2)),
            totalAbonado: Number(Math.max(0, totalFacturado - totalSaldoPendiente).toFixed(2)),
          },
        };
        break;
      }

      case 'retenciones': {
        const jsonFac = await postPerseo(baseUrl, '/api/facturas_consulta', {
          api_key: apiKey,
          fechadesde: fDesde,
          fechahasta: fHasta,
        });
        const facList = (jsonFac.facturas || []).filter(
          (f: any) =>
            f.identificacion === cleanId ||
            (matchedCliente && f.clientesid === matchedCliente.clientesid) ||
            f.razonsocial?.toLowerCase().includes(cleanId.toLowerCase())
        );
        const retenciones = facList
          .filter((f: any) => f.totalretenidoiva > 0 || f.totalretenidorenta > 0 || f.secuenciaretencion)
          .map((f: any) => ({
            tipo: 'VENTA',
            secuencia: f.secuenciaretencion
              ? `${f.establecimientoretencion || '001'}-${f.puntoemisionretencion || '001'}-${f.secuenciaretencion}`
              : 'S/N',
            fechaEmision: f.emisionretencion || f.emision,
            autorizacion: f.autorizacionretencion || '',
            totalRenta: Number(f.totalretenidorenta || 0),
            totalIva: Number(f.totalretenidoiva || 0),
            total: Number(f.totalretenidorenta || 0) + Number(f.totalretenidoiva || 0),
            facturaAfectada: `${f.establecimiento}-${f.puntoemision}-${f.secuencial}`,
            clienteOProveedor: f.razonsocial,
            identificacion: f.identificacion,
          }));
        isVerified = retenciones.some((r: any) =>
          matchesReferenceDocument(cleanRefDoc, [r.secuencia, r.facturaAfectada, r.autorizacion])
        );
        totalItems = retenciones.length;
        resultData = { retenciones, total: totalItems };
        break;
      }

      case 'guias_remision': {
        const json = await postPerseo(baseUrl, '/api/guias_remision_consulta', { api_key: apiKey });
        const guias = (json.guias || []).filter(
          (g: any) =>
            g.identificacioncliente === cleanId ||
            g.identificacioncliente?.includes(cleanId) ||
            g.identificaciontransportista === cleanId ||
            (matchedCliente && g.nombrecliente?.toLowerCase().includes(matchedCliente.razonsocial.toLowerCase()))
        );
        isVerified = guias.some((g: any) =>
          matchesReferenceDocument(cleanRefDoc, [
            g.secuencialguia,
            `${g.establecimientoguia}-${g.puntoemisionguia}-${g.secuencialguia}`,
            g.secuencialfactura,
            `${g.establecimientofactura}-${g.puntoemisionfactura}-${g.secuencialfactura}`,
            g.autorizacion,
          ])
        );
        totalItems = guias.length;
        resultData = { guias, total: totalItems };
        break;
      }

      case 'cobros': {
        const json = await postPerseo(baseUrl, '/api/consulta_cobros', {
          api_key: apiKey,
          fechadesde: fDesde,
          fechahasta: fHasta,
        });
        const cobros = (json.cobros || []).filter((cb: any) =>
          matchedCliente
            ? cb.clientesid === matchedCliente.clientesid ||
              cb.concepto?.toLowerCase().includes(matchedCliente.razonsocial.toLowerCase())
            : cb.concepto?.toLowerCase().includes(cleanId.toLowerCase())
        );
        isVerified = cobros.some((cb: any) =>
          matchesReferenceDocument(cleanRefDoc, [
            cb.cobroscodigo,
            ...(cb.documentos || []).map((d: any) => d.secuencia),
          ])
        );
        totalItems = cobros.length;
        resultData = { cobros, total: totalItems };
        break;
      }

      case 'proveedor_cxp': {
        const payload: Record<string, unknown> = { api_key: apiKey };
        if (matchedProveedor?.proveedoresid) payload.proveedoresid = matchedProveedor.proveedoresid;
        const json = await postPerseo(baseUrl, '/api/consulta_estadocuenta_proveedor', payload);
        const cxp = (json.cxp || []).filter(
          (c: any) =>
            (matchedProveedor && c.proveedoresid === matchedProveedor.proveedoresid) ||
            (matchedProveedor && c.razonsocial?.toLowerCase() === matchedProveedor.razonsocial?.toLowerCase()) ||
            c.razonsocial?.toLowerCase().includes(cleanId.toLowerCase())
        );
        const totalFacturado = cxp.reduce((acc: number, curr: any) => acc + Math.abs(Number(curr.valor || 0)), 0);
        const totalSaldoPendiente = cxp.reduce((acc: number, curr: any) => acc + Math.abs(Number(curr.saldo || 0)), 0);
        isVerified = cxp.some((c: any) => matchesReferenceDocument(cleanRefDoc, [c.secuencia]));
        totalItems = cxp.length;
        resultData = {
          cxp,
          total: totalItems,
          resumen: {
            totalFacturado: Number(totalFacturado.toFixed(2)),
            totalSaldoPendiente: Number(totalSaldoPendiente.toFixed(2)),
            totalPagado: Number(Math.max(0, totalFacturado - totalSaldoPendiente).toFixed(2)),
          },
        };
        break;
      }

      case 'proveedor_pagos': {
        const json = await postPerseo(baseUrl, '/api/consulta_pagos', { api_key: apiKey });
        const pagos = (json.pagos || []).filter(
          (p: any) =>
            (matchedProveedor && p.clientesid === matchedProveedor.proveedoresid) ||
            p.concepto?.toLowerCase().includes(cleanId.toLowerCase()) ||
            (matchedProveedor && p.concepto?.toLowerCase().includes(matchedProveedor.razonsocial?.toLowerCase()))
        );
        const totalPagado = pagos.reduce((acc: number, curr: any) => acc + Number(curr.importeTotal || 0), 0);
        isVerified = pagos.some((p: any) =>
          matchesReferenceDocument(cleanRefDoc, [
            p.cobroscodigo,
            ...(p.documentos || []).map((d: any) => d.secuencia),
          ])
        );
        totalItems = pagos.length;
        resultData = {
          pagos,
          total: totalItems,
          resumen: {
            totalFacturado: Number(totalPagado.toFixed(2)),
            totalSaldoPendiente: 0,
            totalPagado: Number(totalPagado.toFixed(2)),
          },
        };
        break;
      }

      case 'proveedor_retenciones':
      case 'proveedor_facturas': {
        const json = await postPerseo(baseUrl, '/api/consulta_compras', { api_key: apiKey });
        const compras = (json.compras || []).filter(
          (c: any) =>
            (matchedProveedor && c.proveedoresid === matchedProveedor.proveedoresid) ||
            c.identificacion === cleanId ||
            c.identificacion?.includes(cleanId) ||
            c.razonsocial?.toLowerCase().includes(cleanId.toLowerCase())
        );

        if (tipoConsulta === 'proveedor_retenciones') {
          const retenciones = compras
            .filter((comp: any) => comp.retenciontotal > 0 || comp.retencionsecuencia)
            .map((comp: any) => ({
              tipo: 'COMPRA',
              secuencia: `${comp.retencionestablecimiento || '001'}-${comp.retencionpuntoemision || '001'}-${comp.retencionsecuencia || ''}`,
              fechaEmision: comp.retencionemision || comp.emision,
              autorizacion: comp.retencionautorizacion || comp.autorizacion,
              totalRenta: Number(comp.retenciontotalrenta || 0),
              totalIva: Number(comp.retenciontotaliva || 0),
              total: Number(comp.retenciontotal || 0),
              facturaAfectada: `${comp.establecimiento || ''}-${comp.puntoemision || ''}-${comp.secuencia || ''}`,
              clienteOProveedor: comp.razonsocial || matchedProveedor?.razonsocial || '',
              identificacion: comp.identificacion || matchedProveedor?.identificacion || cleanId,
            }));
          isVerified = retenciones.some((r: any) =>
            matchesReferenceDocument(cleanRefDoc, [r.secuencia, r.facturaAfectada, r.autorizacion])
          );
          totalItems = retenciones.length;
          resultData = { retenciones, total: totalItems };
        } else {
          const facturas = compras.map((c: any) => ({
            facturasid: c.comprasid,
            establecimiento: c.establecimiento,
            puntoemision: c.puntoemision,
            secuencial: c.secuencia,
            emision: c.emision,
            vence: c.vence,
            razonsocial: c.razonsocial || matchedProveedor?.razonsocial || '',
            identificacion: c.identificacion || matchedProveedor?.identificacion || '',
            subtotal: Number(c.subtotal || 0),
            subtotalconiva: Number(c.subtotalconiva || 0),
            subtotalsiniva: Number(c.subtotalsiniva || 0),
            total_iva: Number(c.total_iva || 0),
            total: Number(c.total || 0),
            claveacceso: c.autorizacion || '',
            numeroautorizacion: c.autorizacion || '',
            concepto: c.concepto || '',
            facturasd: { detalles: c.comprasd || [] },
          }));
          isVerified = facturas.some((f: any) =>
            matchesReferenceDocument(cleanRefDoc, [
              f.secuencial,
              `${f.establecimiento}-${f.puntoemision}-${f.secuencial}`,
              f.claveacceso,
              f.numeroautorizacion,
            ])
          );
          totalItems = facturas.length;
          resultData = { facturas, total: totalItems };
        }
        break;
      }

      default:
        return jsonResponse(
          {
            success: false,
            errorCode: 'INVALID_QUERY_TYPE',
            message: `El tipo de consulta "${tipoConsulta}" no es válido.`,
          },
          400
        );
    }

    if (!isVerified) {
      return jsonResponse(
        {
          success: false,
          errorCode: 'VERIFICATION_FAILED',
          message:
            'Validación de seguridad fallida: el número de factura o comprobante de referencia no coincide con los registros asociados a esta identificación en el periodo seleccionado.',
          timestamp: new Date().toISOString(),
        },
        403
      );
    }

    return jsonResponse({
      success: true,
      tipoConsulta,
      portalTipo: isProveedor ? 'proveedor' : 'cliente',
      periodo: periodo || 'historico',
      matchedCliente: matchedCliente
        ? {
            id: matchedCliente.clientesid,
            razonSocial: matchedCliente.razonsocial,
            identificacion: matchedCliente.identificacion,
            email: matchedCliente.email,
            telefono: matchedCliente.telefono1,
            direccion: matchedCliente.direccion,
          }
        : null,
      matchedProveedor: matchedProveedor
        ? {
            id: matchedProveedor.proveedoresid,
            razonSocial: matchedProveedor.razonsocial,
            nombreComercial: matchedProveedor.nombrescomercial,
            identificacion: matchedProveedor.identificacion,
            direccion: matchedProveedor.direccion,
            telefono: matchedProveedor.telefono1,
          }
        : null,
      total: totalItems,
      result: resultData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return jsonResponse(
      {
        success: false,
        errorCode: 'PERSEO_COMMUNICATION_ERROR',
        message: error instanceof Error ? error.message : 'Fallo en la comunicación con la API de Perseo',
      },
      502
    );
  }
});
