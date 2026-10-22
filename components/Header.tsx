import { site } from "@/lib/content";
import HeaderCountdown from "@/components/HeaderCountdown";

// Barra mínima: el logo (donde aterriza el monograma del hero), la cuenta regresiva y la compra.
// «Inscribirme» va directo a /comprar/, que pide iniciar sesión.
export default function Header() {
  return (
    <header className="header">
      <a href="#inicio" className="header-brand" aria-label={site.brand}>
        <img className="header-mono" src="/brand/monograma-hueso.png" alt="" width={447} height={427} />
        <span className="t-label header-name">{site.brand}</span>
      </a>
      <nav className="header-index" aria-label="Inscripción">
        <HeaderCountdown />
        <a href={site.checkoutUrl} className="header-cta t-label"><span className="btn-label">Inscribirme</span></a>
      </nav>
    </header>
  );
}
