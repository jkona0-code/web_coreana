import { Link } from "react-router-dom";
import { STORE_NAME } from "../config";
import { useCart } from "../context/CartContext";

const FILTER_CATEGORIES = [
  { label: "Belleza", value: "Belleza", interactive: false },
  { label: "Skincare", value: "Skincare", interactive: false },
  { label: "Maquillaje", value: "Maquillaje", interactive: false },
];

export default function Header({ onOpenCart, activeCategory, onCategorySelect, searchQuery, onSearchChange }) {
  const { totalItems } = useCart();

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="brand" aria-label="Ir al inicio">
          <img src={`${import.meta.env.BASE_URL}img/Beautyk%20logo.jpg`} alt="BeautyK" className="brand-logo" />
          <span className="brand-name">{STORE_NAME}</span>
        </Link>

        {/* Nav Links */}
        <nav className="header-nav" aria-label="Categorías principales">
          {FILTER_CATEGORIES.map(({ label, value, interactive }) => (
            interactive ? (
              <button
                key={value}
                type="button"
                className={`nav-link ${activeCategory === value ? "active" : ""}`}
                onClick={() => onCategorySelect?.(value)}
                aria-pressed={activeCategory === value}
              >
                {label}
              </button>
            ) : (
              <span key={value} className="nav-label">{label}</span>
            )
          ))}
        </nav>

        <div className="header-search">
          <span className="search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="search"
            placeholder="Buscar productos, mascarillas, rutinas..."
            aria-label="Buscar productos"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="header-actions">
          <button type="button" className="header-icon-btn" aria-label="Favoritos">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 21s-7-4.35-10-8.35C-1 8.2 2.4 4 6.5 4 9.1 4 12 6 12 6s2.9-2 5.5-2C21.6 4 25 8.2 22 12.65 19 16.65 12 21 12 21z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <Link to="/login" className="header-icon-btn" aria-label="Mi cuenta">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <button className="header-icon-btn cart-trigger" onClick={onOpenCart} aria-label="Abrir carrito de compras">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {totalItems > 0 && (
              <span className="cart-badge" key={totalItems}>{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
