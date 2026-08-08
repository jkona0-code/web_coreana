// Configuración general de la tienda.
// Cambia estos valores para personalizar tu tienda.

export const STORE_NAME = "BeautyK";
export const STORE_TAGLINE = "Cosmética coreana seleccionada, directo a tu puerta";

// Número de WhatsApp donde llegarán los pedidos.
// Formato: código de país + número, SIN "+", SIN espacios ni guiones.
export const STORE_WHATSAPP = "56954738662";

// Moneda usada para mostrar los precios (CLP por defecto).
export const CURRENCY_FORMATTER = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});
