import { useEffect, useState } from "react";
import { CATEGORIES } from "../data/products";

const DEFAULT_EMAIL = "admin@example.com";
const DEFAULT_PASSWORD = "12345678";
const CREDENTIALS_KEY = "adminCredentials";
const USER_KEY = "authUser";

export default function AdminPanel() {
  const [authUser, setAuthUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY)) || null;
    } catch {
      return null;
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [setupMode, setSetupMode] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [editing, setEditing] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("customProducts");
    setProducts(stored ? JSON.parse(stored) : []);
  }, []);

  useEffect(() => {
    if (selectedId) {
      const p = products.find((x) => x.id === selectedId) || null;
      setEditing(
        p
          ? { ...p }
          : { id: selectedId, name: "", price: "", description: "", category: CATEGORIES[0] || "", images: [] }
      );
    } else {
      setEditing({});
    }
  }, [selectedId, products]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const storedCreds = localStorage.getItem(CREDENTIALS_KEY);

    if (!storedCreds) {
      if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
        setSetupMode(true);
        return;
      }
      setError("Credenciales genéricas incorrectas.");
      return;
    }

    const creds = JSON.parse(storedCreds);
    if (email === creds.email && password === creds.password) {
      const user = { email };
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      setAuthUser(user);
      setEmail("");
      setPassword("");
      return;
    }

    setError("Correo o contraseña incorrectos.");
  };

  const handleSetup = (e) => {
    e.preventDefault();
    setError("");
    if (!newEmail || !newPassword) {
      setError("Ingresa un correo y contraseña nuevos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const creds = { email: newEmail, password: newPassword };
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
    const user = { email: newEmail };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setAuthUser(user);
    setSetupMode(false);
    setNewEmail("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setEditing((prev) => ({ ...prev, images: [...(prev.images || []), reader.result] }));
    };
    reader.readAsDataURL(file);
  };

  const saveEdit = () => {
    if (!editing || !editing.id) return;
    const rest = products.filter((p) => p.id !== editing.id);
    const next = [...rest, editing];
    localStorage.setItem("customProducts", JSON.stringify(next));
    setProducts(next);
    alert("Producto guardado en localStorage (se reflejará en la página).");
  };

  const removeOverride = () => {
    if (!selectedId) return;
    const next = products.filter((p) => p.id !== selectedId);
    localStorage.setItem("customProducts", JSON.stringify(next));
    setProducts(next);
    setSelectedId("");
    alert("Override eliminado.");
  };

  if (!authUser) {
    return (
      <section className="admin-panel">
        <h3>Acceso de administrador</h3>
        {setupMode ? (
          <>
            <p>Configura un correo y contraseña nuevos para administración.</p>
            <form onSubmit={handleSetup} className="login-form admin-login">
              <input
                type="email"
                placeholder="Correo nuevo"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña nueva"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
              <input
                type="password"
                placeholder="Repite la contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
              {error && <div className="form-error">{error}</div>}
              <button className="btn-add" type="submit">Guardar credenciales</button>
            </form>
          </>
        ) : (
          <>
            <p>Inicia sesión para editar productos directamente en la página.</p>
            <form onSubmit={handleLogin} className="login-form admin-login">
              <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {error && <div className="form-error">{error}</div>}
              <button className="btn-add" type="submit">Iniciar sesión</button>
            </form>
          </>
        )}
      </section>
    );
  }

  return (
    <section className="admin-panel">
      <h3>Editor rápido de productos</h3>
      <p>Selecciona un producto para editar sus datos y subir imágenes (se guardan en localStorage).</p>

      <label>
        Producto (id):
        <input value={selectedId} onChange={(e) => setSelectedId(e.target.value)} placeholder="p1, p2, ..." />
      </label>

      {editing && editing.id && (
        <div className="admin-edit">
          <label>
            Nombre
            <input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
          </label>
          <label>
            Categoría
            <select value={editing.category || CATEGORIES[0] || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
              {CATEGORIES.filter((cat) => cat !== "Todos").map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            Precio
            <input type="number" value={editing.price || ""} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
          </label>
          <label>
            Descripción
            <textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          </label>

          <label>
            Añadir imagen
            <input type="file" accept="image/*" onChange={handleFile} />
          </label>

          <div className="admin-images">
            {(editing.images || []).map((src, i) => (
              <div key={i} className="admin-image-item">
                <img src={src} alt={`img-${i}`} />
                <button type="button" onClick={() => setEditing({ ...editing, images: editing.images.filter((_, idx) => idx !== i) })}>Eliminar</button>
              </div>
            ))}
          </div>

          <div className="admin-actions">
            <button className="btn-add" onClick={saveEdit}>Guardar</button>
            <button className="btn-clear" onClick={removeOverride}>Eliminar override</button>
          </div>
        </div>
      )}
    </section>
  );
}
