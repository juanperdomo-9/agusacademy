import type { NextConfig } from "next";

// Sitio estático: `next build` genera la carpeta `out/`, que se publica tal cual
// en Render (Static Site) o Netlify. No hay servidor ni optimizador de imágenes.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
