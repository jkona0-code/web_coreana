import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import { CartProvider } from "./context/CartContext";
import "./App.css";

export default function App() {
  return (
    <CartProvider>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-col">
              <h4>BeautyK</h4>
              <p>Cosmética coreana seleccionada, directo a tu puerta. Pedidos por WhatsApp.</p>
            </div>
            <div className="footer-col">
              <h4>Navegación</h4>
              <ul>
                <li><a href="#catalogo">Productos</a></li>
                <li><a href="#catalogo">Skincare</a></li>
                <li><a href="#catalogo">Maquillaje</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Atención</h4>
              <ul>
                <li>Pedidos por WhatsApp</li>
                <li>Envíos a todo Chile</li>
                <li>Productos originales</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 BeautyK · Hecho con ♡ para amantes del K-Beauty</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
