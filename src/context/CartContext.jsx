import { createContext, useContext, useMemo, useState, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { id, name, price, qty }
  const [customer, setCustomer] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    observacion: "",
  });

  const addToCart = useCallback((product) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, qty: it.qty + 1 } : it
        );
      }
      const image = (product.images && product.images.length > 0) ? product.images[0] : "";
      return [...prev, { id: product.id, name: product.name, price: product.price, image, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(1, qty) } : it))
        .filter((it) => it.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const updateCustomerField = useCallback((field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  }, []);

  const totalItems = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.qty * it.price, 0), [items]);
  const total = useMemo(() => subtotal, [subtotal]);

  const value = {
    items,
    totalItems,
    subtotal,
    total,
    customer,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    updateCustomerField,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
