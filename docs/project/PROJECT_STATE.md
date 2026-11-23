# Estado del proyecto — MHContabilidad

> Corte: 2026-11-21 · Nivel de confianza: alto (verificado contra endpoints reales de Perseo ERP y compilación TypeScript/Vite).

## Resumen ejecutivo
- Objetivo de la iteración: Implementación del **Portal de Proveedores** con consultas en tiempo real de cuentas por pagar (CxP), historial de pagos y comprobantes de retención con Perseo ERP.
- Estado general: Operativo. El backend Express (`server.ts`) y la interfaz React (`OnlineServicesPage.tsx`) permiten alternar fluidamente entre el Portal de Clientes y el Portal de Proveedores en `/portal-proveedores` o `/portal-clientes`.
- Base URL Perseo: `https://tu-contabilidad.com` (asociado a `STP INDUSTRIAL GROUPJH S.A.S.`, RUC: 1793210890001).

## Estado por área
| Área | Estado comprobado | Evidencia | Bloqueo |
| --- | --- | --- | --- |
| Backend Proxy API | Operativo con Caché | `server.ts` con TTL 10m para clientes, proveedores, cxp y pagos | Ninguno |
| Frontend Portal Proveedores | Operativo | `OnlineServicesPage.tsx` con tabs Clientes/Proveedores y visor interactivo | Ninguno |
| Frontend Portal Clientes | Operativo | 8 tipos de consultas contables directas | Ninguno |
| Enrutamiento y Navegación | Operativo | `/portal-proveedores`, `/proveedores` y navbar en `siteConfig.ts` | Ninguno |
| Tipado TypeScript y Build | Verificado | `npx tsc --noEmit` y `npm run build` sin errores | Ninguno |

## Trabajo realizado recientemente
- Implementado el **Portal de Proveedores** con 4 tipos de consultas contables:
  1. Estado de Cuenta y Cuentas por Pagar (CxP): saldo pendiente, total facturado y pagado.
  2. Historial de Pagos Recibidos: comprobantes de egreso con detalle de facturas pagadas.
  3. Comprobantes de Retención emitidos al proveedor con botón de copia SRI.
  4. Facturas de Compra registradas.
- Caché en memoria en `server.ts` para agilizar respuestas de 340 proveedores y miles de transacciones.
- Pestañas conmutables en la interfaz web de consultas y enlaces en la barra de navegación superior.

## Calidad y validación
- Tests: Verificación en vivo realizada contra endpoints reales mediante Node test script. (Ver `TEST_REPORT.md`).
- Build: Código validado con TypeScript compiler.
- Riesgos: No exponer el API Key al frontend; se maneja vía variables de entorno.

## Próximos pasos priorizados
1. Desplegar backend en entorno de producción o staging para el cliente.
2. Añadir paginación en frontend si los clientes superan más de 50 registros por consulta.
3. Permitir descargar reportes generados en PDF/Excel directamente desde el visor web.
