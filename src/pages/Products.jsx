import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";

export default function Products() {
  const navigate = useNavigate();

  return (
    <>
      <Header onOpenCart={() => navigate("/carrito")} />
      <main className="products-page">
        <section className="products-hero">
          <div className="products-hero-copy">
            <p className="hero-eyebrow">Selección K-Beauty</p>
            <h1>Todo lo que necesitas para tu rutina</h1>
            <p className="hero-copy">
              Navega por nuestra colección de skincare, maquillaje y mascarillas premium.
            </p>
          </div>
        </section>
        <ProductGrid />
      </main>
    </>
  );
}
