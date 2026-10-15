import type { Metadata } from "next";
import Piece from "@/components/Piece";
import Motion from "@/components/Motion";
import { portfolioHero, chapters, values, collab } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Agus Martín — Portafolio 2026",
  description: "Barber artist, educator, brand builder. La Plata, Argentina — visión internacional.",
};

export default function PortfolioPage() {
  const h = portfolioHero;
  return (
    <>
      <header className="header">
        <a href="/" className="header-brand" aria-label="Agus Martín Academy">
          <img className="header-mono" src="/brand/monograma-hueso.png" alt="" width={447} height={427} />
          <span className="t-label header-name">Agus Martín Academy</span>
        </a>
        <nav className="header-index" aria-label="Portafolio">
          <span className="t-label">Portafolio 2026</span>
          <a href="/#curso" className="header-cta t-label"><span className="btn-label">Ver el curso</span></a>
        </nav>
      </header>

      <main className="pf">
        <section id="inicio" className="hero wrap pf-hero" aria-labelledby="pf-title">
          <div className="hero-grid">
            <Piece
              n="01"
              name={h.name}
              note={h.place}
              src={h.image.src}
              alt={h.image.alt}
              tall
              priority
              parallax={0.06}
              className="hero-plate"
            />
            <h1 id="pf-title" className="hero-title t-display pf-hero-title">
              {h.name.split(" ").map((w, i) => (
                <span key={w} className="hero-line" style={{ "--i": i } as React.CSSProperties}>
                  <span className="hero-line-text">{w}</span>
                </span>
              ))}
            </h1>
            <div className="hero-side">
              <p className="t-label t-soft">{h.label}</p>
              <p className="t-lead">{h.roles.join(" · ")}</p>
              <p className="t-note t-soft">{h.place}</p>
            </div>
          </div>
        </section>

        {chapters.map((c) => (
          <section key={c.n} className={`pf-chapter pf-chapter--${c.layout} section wrap`} aria-labelledby={`pf-${c.n}`}>
            <div className="pf-text">
              <p className="t-label t-soft">{c.n} · {c.label}</p>
              <h2 id={`pf-${c.n}`} className="t-display">{c.title}</h2>
              {c.body.map((p) => <p key={p} className="t-body">{p}</p>)}
              {c.tags && <p className="t-note t-soft">{c.tags.join(" · ")}</p>}
              {c.quote && <blockquote className="agus-quote">{c.quote}</blockquote>}
            </div>
            <div className="pf-media">
              <Piece
                n={c.n}
                name={c.label}
                src={c.image.src}
                alt={c.image.alt}
                ratio={`${c.image.w} / ${c.image.h}`}
                parallax={c.layout === "wide" ? 0.04 : 0.06}
              />
            </div>
          </section>
        ))}

        <section className="pf-values-section section wrap" aria-labelledby="pf-values">
          <div className="pf-values-head">
            <p className="t-label t-soft">{values.n} · {values.label}</p>
            <h2 id="pf-values" className="t-display">{values.title}</h2>
          </div>
          <ol className="pf-values">
            {values.items.map((v, i) => (
              <li key={v.name}>
                <span className="t-label t-soft">{String(i + 1).padStart(2, "0")}</span>
                <span className="t-headline">{v.name}</span>
                <span className="t-body t-soft">{v.text}</span>
              </li>
            ))}
          </ol>
          <blockquote className="agus-quote pf-values-quote">{values.quote}</blockquote>
        </section>

        <section className="pf-collab on-bone section wrap" aria-labelledby="pf-collab">
          <img className="enroll-mark" src="/brand/monograma-carbon.png" alt="" width={447} height={427} loading="lazy" />
          <div className="pf-collab-copy">
            <p className="t-label t-soft">{collab.n} · {collab.label}</p>
            <h2 id="pf-collab" className="t-display">{collab.title}</h2>
            <p className="t-lead">{collab.body}</p>
            <p className="t-label">{collab.buildLabel}</p>
            <ul className="pf-build">
              {collab.build.map((b) => <li key={b} className="t-title">{b}</li>)}
            </ul>
          </div>
          <div className="pf-sign">
            <p className="t-headline">{collab.name}</p>
            <p className="t-label t-soft">{collab.role} · {collab.place}</p>
            <a className="btn btn--dark" href={collab.instagram.url} target="_blank" rel="noopener noreferrer">
              <span className="btn-label">Instagram {collab.instagram.handle}</span>
            </a>
            <p className="t-note t-soft">{collab.contact}</p>
          </div>
          <p className="pf-closing t-display">{collab.closing}</p>
        </section>
      </main>

      <footer className="footer wrap">
        <img className="footer-logo" src="/brand/logo-hueso.png" alt="Agus Martín Academy" width={935} height={617} loading="lazy" />
        <a className="t-label" href="/">Volver a la academia</a>
      </footer>
      <Motion />
    </>
  );
}
