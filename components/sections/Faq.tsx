import { faq, site } from "@/lib/content";

export default function Faq() {
  return (
    <>
      <section id="preguntas" className="faq section wrap" aria-labelledby="faq-title">
        <div className="faq-head">
          <h2 id="faq-title" className="t-display">{faq.title}</h2>
          <a className="link-quiet t-note" href={site.instagram} target="_blank" rel="noopener noreferrer">{faq.more}</a>
        </div>
        <div className="faq-list">
          {faq.items.map((f) => (
            <details key={f.q}>
              <summary className="t-title">{f.q}</summary>
              <p className="t-body">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Cierre: el nombre vuelve a todo el ancho. */}
      <footer className="site-footer wrap">
        <img className="site-footer-logo" src="/brand/logo-hueso.png" alt={site.brand} width={935} height={617} loading="lazy" />
        <nav className="site-footer-nav" aria-label="Pie">
          <a className="t-label" href="#curso">El curso</a>
          <a className="t-label" href="/tienda/">Tienda</a>
          <a className="t-label" href="/portfolio/">Portfolio</a>
          <a className="t-label" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        </nav>
        <p className="site-footer-word" aria-hidden="true">Agus Martín</p>
        <div className="site-footer-legal t-note t-soft">
          <span>© 2026 {site.brand}</span>
          <span>[Datos legales a confirmar]</span>
          <span>Diseño y desarrollo web: Juan Perdomo</span>
        </div>
      </footer>
    </>
  );
}
