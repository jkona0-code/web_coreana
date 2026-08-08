import { useMemo, useState } from "react";
import { CURRENCY_FORMATTER } from "../config";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onSelect }) {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = product.images || [];
  const imageCount = images.length;
  const activeImageUrl = useMemo(() => images[activeImage] || "", [images, activeImage]);

  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <article
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-media">
        <div className={`product-art cat-${product.category}`}>
          {product.badge && (
            <span className="product-badge" aria-label={`Producto destacado: ${product.badge}`}>
              {product.badge}
            </span>
          )}

          {imageCount > 0 ? (
            <div className="product-carousel">
              <img
                src={activeImageUrl}
                alt={`${product.name} imagen ${activeImage + 1}`}
                className={isHovered ? "img-zoomed" : ""}
              />
              {imageCount > 1 && (
                <div className="carousel-controls" aria-label={`Imágenes de ${product.name}`}>
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={index === activeImage ? "carousel-dot active" : "carousel-dot"}
                      onClick={() => setActiveImage(index)}
                      aria-label={`Ver imagen ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <span className="product-icon" aria-hidden="true">{product.icon}</span>
          )}
        </div>

        {imageCount > 1 && (
          <div className="product-thumbs" aria-label={`Galería de ${product.name}`}>
            {images.map((src, index) => (
              <button
                key={index}
                className={`thumb ${index === activeImage ? "thumb-active" : ""}`}
                onClick={() => setActiveImage(index)}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-meta">
          <span className="product-stock">En stock</span>
        </div>

        <div className="product-footer">
          <span className="product-price">{CURRENCY_FORMATTER.format(product.price)}</span>
          <button className="btn-add-cart" onClick={handleAdd}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Agregar a la cesta
          </button>
        </div>

        <div className="product-actions-group">
          {product.demoUrl && (
            <a
              href={product.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="product-demo-link"
            >
              Ver demostración →
            </a>
          )}
          {onSelect && (
            <button
              type="button"
              className="btn-view-detail"
              onClick={() => onSelect(product)}
            >
              Ver producto
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
