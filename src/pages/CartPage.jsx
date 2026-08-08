import { useNavigate, Link } from "react-router-dom";
import CartPanel from "../components/CartPanel";
import Header from "../components/Header";
import { STORE_NAME } from "../config";

export default function CartPage() {
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <Header onOpenCart={() => {}} />
      <div className="cart-page-breadcrumb">
        <Link to="/">Inicio</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Cesta de la compra</span>
      </div>
      <div className="cart-page-header">
        <div>
          <p className="cart-page-eyebrow">Cesta de la compra</p>
          <h1>Revisa tu pedido</h1>
          <p className="cart-page-description">
            Confirma tus productos y completa tus datos para enviar tu pedido por WhatsApp.
          </p>
        </div>
      </div>
      <div className="cart-page-content">
        <CartPanel />
      </div>
    </div>
  );
}
