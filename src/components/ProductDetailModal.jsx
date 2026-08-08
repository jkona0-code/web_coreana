import { useMemo, useState } from "react";
import { CURRENCY_FORMATTER } from "../config";
import { useCart } from "../context/CartContext";

export default function ProductDetailModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const images = product.images || [];
  const activeImageUrl = useMemo(() => images[activeImage] || "", [images, activeImage]);

  const handleCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-overlay" onClick={onClose}>
      <div className="product-panel" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose} aria-label="Cerrar vista de producto">
          ×
        </button>
        <div className="detail-grid">
          <div className="detail-gallery">
            <div className="detail-main-image">
              {activeImageUrl ? (
                <img src={activeImageUrl} alt={`${product.name} imagen ${activeImage + 1}`} />
              ) : (
                <div className="detail-icon">{product.icon}</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="detail-thumbs">
                {images.map((src, index) => (
                  <button
                    key={index}
                    type="button"
                    className={index === activeImage ? "detail-thumb detail-thumb-active" : "detail-thumb"}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={src} alt={`${product.name} thumb ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="detail-info">
            <div className="detail-eyebrow">Detalle del producto</div>
            <h2>{product.name}</h2>
            <p className="detail-category">{product.category}</p>
            <div className="detail-price">{CURRENCY_FORMATTER.format(product.price)}</div>
            <p className="detail-stock">En stock · Envío usual en 24 horas</p>
            <p className="detail-description">{product.description}</p>
            <div className="detail-actions">
              <button className="btn-add-cart detail-add" onClick={handleCart}>
                Agregar a la cesta
              </button>
              <button className="btn-secondary" onClick={onClose}>
                Seguir comprando
              </button>
            </div>
            <div className="detail-meta">
              <div>
                <span className="meta-label">Método de entrega</span>
                <p>Envío estándar disponible para todo Chile.</p>
              </div>
              <div>
                <span className="meta-label">Pago</span>
                <p>WhatsApp + transferencia bancaria.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
