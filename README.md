# Hallyu Beauty — Tienda de Cosmética Coreana

Tienda web hecha con **React + Vite**. Catálogo de productos K-beauty con carrito de compras que envía el pedido directo a WhatsApp.

- En **escritorio**, el carrito se abre como una **ventana emergente** (panel deslizante) sin salir de la página.
- En **celular**, el carrito se abre como una **página nueva** (`/carrito`), con botón para volver a la tienda.

## Cómo abrir el proyecto en VS Code

1. Descomprime la carpeta `hallyu-beauty` y ábrela en VS Code (`Archivo > Abrir carpeta...`).
2. Abre una terminal integrada (`Terminal > Nueva terminal`) y ejecuta:

   ```bash
   npm install
   npm run dev
   ```

3. Abre en el navegador la URL que aparece en la terminal (normalmente `http://localhost:5173`).
4. Para ver la versión "página nueva" del carrito, reduce el ancho de la ventana del navegador (o usa las herramientas de desarrollador en modo celular) por debajo de 768px, y presiona "Mi carrito".

## Qué archivos editar

| Quiero cambiar...                          | Archivo                              |
| ------------------------------------------- | ------------------------------------- |
| Número de WhatsApp / nombre de la tienda    | `src/config.js`                       |
| Productos, precios, categorías              | `src/data/products.js`                |
| Colores, tipografías, tamaños               | `src/index.css` (arriba) y `src/App.css` |
| Textos del encabezado / hero                | `src/pages/Home.jsx`                  |
| Campos del formulario de pedido             | `src/components/CartPanel.jsx`        |
| Mensaje que se envía por WhatsApp           | `src/utils/buildOrderMessage.js`      |

## Cómo llegan los pedidos

Al presionar **"Enviar Pedido"**, la app arma un mensaje con los datos del cliente y los productos, y abre WhatsApp Web/App con ese mensaje precargado, listo para enviar al número configurado en `STORE_WHATSAPP` (`src/config.js`).

## Publicar la tienda

Cuando quieras subirla a internet:

```bash
npm run build
```

Esto genera la carpeta `dist/` lista para subir a cualquier hosting estático (Vercel, Netlify, GitHub Pages, etc.).
