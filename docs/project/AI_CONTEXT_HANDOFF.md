# AI Context Handoff — MHContabilidad

> Corte de contexto: 2026-11-20. Estado: **Verificado y operativo**.

## Qué es este proyecto
- Plataforma web y portal de clientes para el estudio contable MH Contabilidad.
- Permite a los clientes de la firma consultar en tiempo real sus documentos tributarios, facturas, retenciones y estado de cartera sincronizado directamente con el ERP Perseo Web.

## Cómo orientarse en el repositorio
- `server.ts`: Servidor backend Node/Express con proxy seguro a Perseo ERP (`/api/perseo/status`, `/api/perseo/query`).
- `src/pages/OnlineServicesPage.tsx`: Vista del Portal de Clientes con formulario de consulta contable y visor reactivo de documentos.
- `src/services/perseoService.ts`: Cliente frontend que interactúa con el proxy de `server.ts`.
- `src/types/index.ts`: Definición de interfaces para documentos de Perseo.
- `.env`: Contiene `PERSEO_API_BASE_URL="https://tu-contabilidad.com"` y `PERSEO_API_KEY`.

## Puesta en marcha (comandos comprobados)
- Instalación: `npm install`
- Inicio del servidor backend: `npx tsx server.ts` (por defecto en puerto 3000 o 3005 si 3000 está ocupado).
- Inicio frontend Vite: `npm run dev`
- Verificación TypeScript: `npx tsc --noEmit`

## Trabajo más reciente
- Integración completada de los 8 tipos de consultas contables hacia Perseo ERP.
- Reemplazo total de la redirección a WhatsApp por un visor interactivo integrado en la misma página web.
- Soporte para desglosar productos de facturas, ver retenciones de IVA/Fuente y resumir estado de cartera.

## Riesgos y precauciones
- Mantener siempre `PERSEO_API_KEY` en el servidor (`.env`), nunca exponerlo en bundles frontend.
- Los RUCs deben validarse sin espacios para búsquedas precisas en Perseo.

## Próxima acción recomendada
- Probar consultas con los RUCs de prueba:
  - `1400592307001` (Factura autorizada por $195.50)
  - `1790721000001` (Cartera y CxC con 68 documentos)
  - `1791233417001` (Guías de Remisión)

## Mapa de documentación
`ARCHITECTURE.md` · `CHANGELOG.md` · `DECISIONS.md` · `DOMAIN_MODEL.md` · `PROJECT_STATE.md` · `ROADMAP.md` · `SECURITY.md` · `TECHNOLOGY_CHOICE.md` · `TEST_PLAN.md` · `TEST_REPORT.md` · `THREAT_MODEL.md`.
