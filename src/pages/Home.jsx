import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import ProductDetailModal from "../components/ProductDetailModal";
import CartModal from "../components/CartModal";
import { useIsMobile } from "../hooks/useIsMobile";
import { useState } from "react";
import AdminPanel from "../components/AdminPanel";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleOpenCart = () => {
    if (isMobile) {
      navigate("/carrito");
    } else {
      setCartOpen(true);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <Header
        onOpenCart={handleOpenCart}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <section className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">케이 뷰티 · K-Beauty Seleccionada</p>
          <h2 className="hero-title">
            Cuida tu piel,<br />
            <span className="hero-accent">sin salir de casa</span>
          </h2>
          <p className="hero-copy">
            Productos coreanos de tendencia elegidos por su textura, resultado y buen precio.
            Arma tu pedido y lo confirmamos por WhatsApp en minutos.
          </p>
        </div>
      </section>

      <section className="catalog" id="catalogo">
        <div className="catalog-heading">
          <h2>Productos</h2>
          <p className="catalog-subtitle">Descubre nuestra selección de belleza coreana premium.</p>
        </div>
        <ProductGrid
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onProductSelect={handleSelectProduct}
        />
      </section>

      <AdminPanel />

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
