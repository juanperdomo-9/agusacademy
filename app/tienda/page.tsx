import type { Metadata } from "next";
import Products from "@/components/sections/Products";
import Motion from "@/components/Motion";
import Cursor from "@/components/Cursor";
import HeaderCountdown from "@/components/HeaderCountdown";
import SiteFooter from "@/components/SiteFooter";
import Cart from "@/components/Cart";
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
          <HeaderCountdown />
          <a href={site.checkoutUrl} className="header-cta t-label"><span className="btn-label">Inscribirme</span></a>
        </nav>
      </header>
      <main className="tienda">
        <Products />
      </main>
      <SiteFooter />
      <Cart />
      <Motion />
      <Cursor />
    </>
  );
}
