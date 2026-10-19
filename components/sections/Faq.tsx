import { faq, site } from "@/lib/content";
import SiteFooter from "@/components/SiteFooter";

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

      <SiteFooter />
    </>
  );
}
