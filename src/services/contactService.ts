import { ContactFormData, ContactFormResult } from '../types';
import { siteConfig } from '../data/siteConfig';

/**
 * Validador para documentos de identificación ecuatorianos (Cédula y RUC)
 * Basado en las especificaciones del SRI y Registro Civil de Ecuador
 */
export function validateEcuadorianDocument(doc: string): {
  isValid: boolean;
  message: string;
  type: 'CEDULA' | 'RUC_NATURAL' | 'RUC_JURIDICO' | 'RUC_PUBLICO' | 'INVALID';
} {
  const clean = doc.replace(/\D/g, '');

  if (clean.length === 0) {
    return { isValid: false, message: 'Ingrese una cédula o RUC', type: 'INVALID' };
  }

  // Validación básica de provincia (dos primeros dígitos 01 al 24 o 30 para personas no residentes)
  const provincia = parseInt(clean.substring(0, 2), 10);
  if ((provincia < 1 || provincia > 24) && provincia !== 30) {
    return { isValid: false, message: 'Código de provincia no válido (primeros 2 dígitos)', type: 'INVALID' };
  }

  // 1. CÉDULA (10 dígitos)
  if (clean.length === 10) {
    const tercerDigito = parseInt(clean.charAt(2), 10);
    if (tercerDigito >= 6) {
      return { isValid: false, message: 'El tercer dígito de la cédula debe ser menor a 6', type: 'INVALID' };
    }

    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    for (let i = 0; i < 9; i++) {
      let valor = parseInt(clean.charAt(i), 10) * coeficientes[i];
      if (valor >= 10) valor -= 9;
      suma += valor;
    }

    const digitoVerificador = parseInt(clean.charAt(9), 10);
    const digitoCalculado = (10 - (suma % 10)) % 10;

    if (digitoVerificador === digitoCalculado) {
      return { isValid: true, message: 'Cédula de identidad ecuatoriana válida', type: 'CEDULA' };
    } else {
      return { isValid: false, message: 'Dígito verificador de cédula incorrecto', type: 'INVALID' };
    }
  }

  // 2. RUC (13 dígitos)
  if (clean.length === 13) {
    const tercerDigito = parseInt(clean.charAt(2), 10);
    const establecimiento = clean.substring(10, 13);

    if (establecimiento === '000') {
      return { isValid: false, message: 'El establecimiento del RUC no puede ser 000', type: 'INVALID' };
    }

    // Caso A: RUC de Persona Natural (basado en cédula + 001)
    if (tercerDigito < 6) {
      const subCedula = clean.substring(0, 10);
      const valCedula = validateEcuadorianDocument(subCedula);
      if (valCedula.isValid) {
        return { isValid: true, message: 'RUC de Persona Natural válido', type: 'RUC_NATURAL' };
      }
      return { isValid: false, message: 'Los 10 primeros dígitos no corresponden a una cédula válida', type: 'INVALID' };
    }

    // Caso B: RUC de Sociedad Privada (tercer dígito = 9, módulo 11)
    if (tercerDigito === 9) {
      const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
      let suma = 0;
      for (let i = 0; i < 9; i++) {
        suma += parseInt(clean.charAt(i), 10) * coeficientes[i];
      }
      const digitoVerificador = parseInt(clean.charAt(9), 10);
      const residuo = suma % 11;
      const digitoCalculado = residuo === 0 ? 0 : 11 - residuo;

      if (digitoVerificador === digitoCalculado) {
        return { isValid: true, message: 'RUC de Sociedad Privada válido', type: 'RUC_JURIDICO' };
      }
      return { isValid: false, message: 'Dígito verificador de RUC jurídico incorrecto', type: 'INVALID' };
    }

    // Caso C: RUC Público (tercer dígito = 6, módulo 11)
    if (tercerDigito === 6) {
      const coeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
      let suma = 0;
      for (let i = 0; i < 8; i++) {
        suma += parseInt(clean.charAt(i), 10) * coeficientes[i];
      }
      const digitoVerificador = parseInt(clean.charAt(8), 10);
      const residuo = suma % 11;
      const digitoCalculado = residuo === 0 ? 0 : 11 - residuo;

      if (digitoVerificador === digitoCalculado) {
        return { isValid: true, message: 'RUC de Institución Pública válido', type: 'RUC_PUBLICO' };
      }
      return { isValid: false, message: 'Dígito verificador de RUC público incorrecto', type: 'INVALID' };
    }
  }

  return {
    isValid: false,
    message: 'El documento debe tener 10 dígitos (Cédula) o 13 dígitos (RUC)',
    type: 'INVALID',
  };
}

/**
 * Genera el enlace seguro de WhatsApp con el mensaje estructurado de la consulta
 */
export function buildWhatsAppUrl(data: ContactFormData): string {
  const lineBreak = '\n';
  const text = [
    `*NUEVA CONSULTA - MH CONTABILIDAD*`,
    `--------------------------------`,
    `*Cliente:* ${data.nombreCompleto}`,
    `*Identificación / RUC:* ${data.identificacion}`,
    `*Email:* ${data.email}`,
    `*Teléfono:* ${data.telefono}`,
    `*Tipo de consulta:* ${data.tipoConsulta}`,
    `--------------------------------`,
    `*Mensaje:*`,
    `${data.mensaje}`,
    `--------------------------------`,
    `_Enviado desde el portal web oficial de MH Contabilidad_`,
  ].join(lineBreak);

  const encoded = encodeURIComponent(text);
  return `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encoded}`;
}

/**
 * Procesa el envío del formulario registrando localmente y devolviendo la URL de WhatsApp
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactFormResult> {
  const whatsappUrl = buildWhatsAppUrl(data);
  const folio = `MH-${Date.now().toString().slice(-6)}`;

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, folio, timestamp: new Date().toISOString() }),
    });

    if (res.ok) {
      return {
        success: true,
        message: 'Solicitud registrada correctamente. Se abrirá la conversación de WhatsApp con el asesor contable.',
        whatsappUrl,
        folio,
      };
    }
  } catch {
    // Si la API no está en línea o se accede estáticamente, el enlace de WhatsApp se mantiene 100% operativo
  }

  return {
    success: true,
    message: 'Consulta generada. Procediendo al canal directo de WhatsApp de MH Contabilidad.',
    whatsappUrl,
    folio,
  };
}
