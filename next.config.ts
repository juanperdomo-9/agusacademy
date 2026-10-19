import type { NextConfig } from "next";

// Sitio estático: `next build` genera la carpeta `out/`, que se publica tal cual
// en Render (Static Site) o Netlify. No hay servidor ni optimizador de imágenes.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // /portfolio se genera como portfolio/index.html: abre en cualquier hosting estático.
  trailingSlash: true,
};

export default nextConfig;
