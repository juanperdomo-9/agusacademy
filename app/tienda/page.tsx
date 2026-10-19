import type { Metadata } from "next";
import Products from "@/components/sections/Products";
import Motion from "@/components/Motion";
import Cursor from "@/components/Cursor";
import HeaderCountdown from "@/components/HeaderCountdown";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tienda — Agus Martín Academy",
  description: "Productos Forma Essent: polvo texturizador, Agua Marina, cera mate y crema de peinar rizos.",
};

export default function TiendaPage() {
  return (
    <>
      <header className="header">
        <a href="/" className="header-brand" aria-label={site.brand}>
          <img className="header-mono" src="/brand/monograma-hueso.png" alt="" width={447} height={427} />
          <span className="t-label header-name">{site.brand}</span>
        </a>
        <nav className="header-index" aria-label="Tienda">
          <span className="t-label header-section">Tienda</span>
          <HeaderCountdown />
          <a href="/#inscripcion" className="header-cta t-label"><span className="btn-label">Inscribirme</span></a>
        </nav>
      </header>
      <main className="tienda">
        <Products />
      </main>
      <footer className="footer wrap">
        <img className="footer-logo" src="/brand/logo-hueso.png" alt={site.brand} width={935} height={617} loading="lazy" />
        <a className="t-label" href="/">Volver a la academia</a>
        <span className="t-note t-soft">Diseño y desarrollo web: Juan Perdomo</span>
      </footer>
      <Motion />
      <Cursor />
    </>
  );
}
