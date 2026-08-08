import { CURRENCY_FORMATTER } from "../config";

export function buildOrderMessage({ customer, items, subtotal, total }) {
  const lines = [];
  lines.push("Hola, quiero realizar el siguiente pedido:");
  lines.push("");
  lines.push(`Cliente: ${customer.nombre}`);
  lines.push(`Dirección/Comuna: ${customer.direccion}`);
  if (customer.telefono?.trim()) lines.push(`Teléfono: ${customer.telefono}`);
  if (customer.observacion?.trim()) lines.push(`Observación: ${customer.observacion}`);
  lines.push("");
  lines.push("Productos:");
  items.forEach((it) => {
    lines.push(`• ${it.name}: ${it.qty} x ${CURRENCY_FORMATTER.format(it.price)}`);
  });
  lines.push("");
  lines.push(`Subtotal: ${CURRENCY_FORMATTER.format(subtotal)}`);
  lines.push(`Total final: ${CURRENCY_FORMATTER.format(total)}`);
  lines.push("");
  lines.push("Gracias.");

  return lines.join("\n");
}
