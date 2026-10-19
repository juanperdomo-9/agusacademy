import type { NextConfig } from "next";

// Sitio estático: `next build` genera la carpeta `out/`, que se publica tal cual
// en Render (Static Site) o Netlify. No hay servidor ni optimizador de imágenes.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // /portfolio se genera como portfolio/index.html: abre en cualquier hosting estático.
  trailingSlash: true,
  // CSS dentro del HTML: Render no servía el archivo .css (404) y además evita una petición.
  experimental: { inlineCss: true },
};

export default nextConfig;
