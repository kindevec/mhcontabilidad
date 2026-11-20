# Registro de cambios — MHContabilidad

> Siguiendo la idea de un changelog legible. No inferir cambios sin revisar Git/código. Creado: 2026-11-20.

## [Unreleased] - 2026-11-20

### Añadido
- Integración real con ERP Perseo Web (`https://tu-contabilidad.com`) mediante clave de API en backend Express (`server.ts`).
- Soporte para 8 tipos de consultas contables: Facturas Electrónicas, Comprobantes de Retención, Estado de Cuenta y Cartera, Guías de Remisión, Liquidaciones de Compra, Cobros y Pagos, Proformas y Pedidos.
- Visor web nativo interactivo en [OnlineServicesPage.tsx](file:///d:/Codespace/Kindev/Trabajos/MHContabilidad/src/pages/OnlineServicesPage.tsx) para renderizar tablas completas, desglose de detalles de productos, estados de autorización SRI con copia rápida de Claves de Acceso y métricas de cartera sin redirección a WhatsApp.
- Documento formal de propuesta técnica para el cliente en [Propuesta_Integracion_Perseo_MHContabilidad.docx](file:///d:/Codespace/Kindev/Trabajos/MHContabilidad/docs/Propuesta_Integracion_Perseo_MHContabilidad.docx).

### Cambiado
- [server.ts](file:///d:/Codespace/Kindev/Trabajos/MHContabilidad/server.ts): `/api/perseo/status` y `/api/perseo/query` adaptados para consultar endpoints reales (`/api/facturas_consulta`, `/api/consulta_cliente_estadocuenta`, `/api/clientes_consulta`, `/api/guias_remision_consulta`, `/api/consulta_cobros`, `/api/consulta_compras`) con filtrado por identificación y razón social.
- [perseoService.ts](file:///d:/Codespace/Kindev/Trabajos/MHContabilidad/src/services/perseoService.ts): Llamada directa a `/api/perseo/query` con tipado estricto y timeout de 15 segundos.
- [types/index.ts](file:///d:/Codespace/Kindev/Trabajos/MHContabilidad/src/types/index.ts): Ampliación de interfaces para respuestas estructuradas de Perseo.

### Corregido
- Resuelta ambigüedad de URL base de Perseo (`https://tu-contabilidad.com` en lugar del subpath `/sistema` que arrojaba 400 Bad Request).
- Corregido filtrado para clientes sin número telefónico registrado en el ERP utilizando búsqueda primaria por RUC/cédula.

### Seguridad
- Las credenciales y API Key de Perseo permanecen seguras exclusivamente en variables de entorno / servidor Express, sin exposición al frontend del cliente.
