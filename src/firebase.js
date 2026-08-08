import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Usa variables de entorno en Vite para mantener las credenciales fuera del repositorio.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Inicializar Auth sólo si la configuración mínima está presente.
let auth;
try {
  if (!firebaseConfig.apiKey) {
    console.warn("Firebase no configurado: falta VITE_FIREBASE_API_KEY");
  } else {
    auth = getAuth(app);
  }
} catch (err) {
  // Evita que un error de inicialización rompa la app (pantalla blanca).
  // Mostramos un warning y exportamos `auth` como undefined.
  // El componente de login debe comprobar esto antes de usarlo.
  // eslint-disable-next-line no-console
  console.warn("Inicialización de Firebase Auth omitida:", err && err.message ? err.message : err);
}

export { auth };
