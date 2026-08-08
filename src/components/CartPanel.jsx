import { CURRENCY_FORMATTER, STORE_WHATSAPP } from "../config";
import { useCart } from "../context/CartContext";
import { buildOrderMessage } from "../utils/buildOrderMessage";

export default function CartPanel({ onClose }) {
  const {
    items,
    subtotal,
    total,
    totalItems,
    customer,
    removeFromCart,
    updateQty,
    clearCart,
    updateCustomerField,
  } = useCart();

  const isEmpty = items.length === 0;
  const canSubmit = !isEmpty && customer.nombre.trim() && customer.direccion.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;
    const text = buildOrderMessage({ customer, items, subtotal, total });
    const url = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="cart-layout">
      {/* Left: items list */}
      <div className="cart-items-section">
        <div className="cart-section-header">
          <h2>Cesta de la compra</h2>
          {onClose && (
            <button className="close-btn" onClick={onClose} aria-label="Cerrar carrito">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {isEmpty ? (
          <div className="cart-empty">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--ink-muted)" strokeWidth="1.2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>Tu cesta está vacía</p>
            <span>Agrega productos desde el catálogo para comenzar ✨</span>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((it) => (
                <li key={it.id} className="cart-item">
                  {it.image && (
                    <div className="cart-item-img">
                      <img src={it.image} alt={it.name} />
                    </div>
                  )}
                  <div className="cart-item-details">
                    <p className="cart-item-name">{it.name}</p>
                    <p className="cart-item-price">{CURRENCY_FORMATTER.format(it.price)}</p>
                    <p className="cart-item-stock">En stock · Envío habitual en 24 horas</p>
                    <div className="cart-item-actions">
                      <label className="qty-field">
                        Cantidad
                        <input
                          type="number"
                          min="1"
                          value={it.qty}
                          onChange={(e) => {
                            const nextQty = parseInt(e.target.value, 10);
                            updateQty(it.id, Number.isNaN(nextQty) ? it.qty : Math.max(1, nextQty));
                          }}
                        />
                      </label>
                      <div className="cart-item-action-group">
                        <span className="cart-item-total">{CURRENCY_FORMATTER.format(it.price * it.qty)}</span>
                        <button className="btn-remove" onClick={() => removeFromCart(it.id)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="btn-clear-cart" onClick={clearCart} disabled={isEmpty}>
              Vaciar Cesta
            </button>
          </>
        )}
      </div>

      {/* Right: checkout summary */}
      <div className="cart-checkout-section">
        <div className="checkout-card">
          <h3 className="checkout-title">Checkout</h3>

          {/* Customer form */}
          <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="cart-nombre">
                Nombre <span className="req">*</span>
              </label>
              <input
                id="cart-nombre"
                type="text"
                value={customer.nombre}
                onChange={(e) => updateCustomerField("nombre", e.target.value)}
                placeholder="Tu nombre"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cart-direccion">
                Dirección / Comuna <span className="req">*</span>
              </label>
              <input
                id="cart-direccion"
                type="text"
                value={customer.direccion}
                onChange={(e) => updateCustomerField("direccion", e.target.value)}
                placeholder="Ej: Curicó"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cart-telefono">Teléfono (opcional)</label>
              <input
                id="cart-telefono"
                type="tel"
                value={customer.telefono}
                onChange={(e) => updateCustomerField("telefono", e.target.value)}
                placeholder="Ej: +56991234567"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cart-obs">Observación (opcional)</label>
              <textarea
                id="cart-obs"
                value={customer.observacion}
                onChange={(e) => updateCustomerField("observacion", e.target.value)}
                placeholder="Ej: dejar en conserjería"
                rows={2}
              />
            </div>
          </form>

          {/* Summary */}
          <div className="checkout-shipping">
            <span className="shipping-label">Envío a Chile</span>
            <p>Envío estándar disponible. Pedido confirmado por WhatsApp en minutos.</p>
          </div>

          <div className="checkout-summary">
            <h4>Resumen</h4>
            <div className="summary-row">
              <span>Total de artículos</span>
              <strong>{totalItems} uds.</strong>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{CURRENCY_FORMATTER.format(subtotal)}</strong>
            </div>
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>Total general</span>
              <strong>{CURRENCY_FORMATTER.format(total)}</strong>
            </div>
          </div>

          <button className="btn-checkout" onClick={handleSubmit} disabled={!canSubmit}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Enviar Pedido por WhatsApp
          </button>

          <div className="payment-info">
            <p>Métodos aceptados</p>
            <div className="payment-badges">
              <span>WhatsApp</span>
              <span>Transferencia</span>
              <span>Tarjetas</span>
            </div>
          </div>

          {!canSubmit && !isEmpty && (
            <p className="checkout-hint">Completa nombre y dirección para enviar tu pedido.</p>
          )}
        </div>
      </div>
    </div>
  );
}
