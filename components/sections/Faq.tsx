import { faq, site } from "@/lib/content";

export default function Faq() {
  return (
    <>
      <section id="preguntas" className="section wrap" aria-labelledby="faq-title">
        <div className="section-head">
          <h2 id="faq-title" className="t-display">{faq.title}</h2>
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
      <footer className="footer wrap">
        <img className="footer-logo" src="/brand/logo-hueso.png" alt={site.brand} width={935} height={617} loading="lazy" />
        <a className="t-label" href={site.instagram}>Instagram</a>
        <span className="t-label t-soft">[Datos legales a confirmar]</span>
      </footer>
    </>
  );
}
