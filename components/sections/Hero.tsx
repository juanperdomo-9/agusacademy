import { hero, site } from "@/lib/content";
import Piece from "@/components/Piece";
import Countdown from "@/components/Countdown";
import OfferFacts from "@/components/OfferFacts";

export default function Hero() {
  return (
    <section id="inicio" className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-grid">
        <Piece
          n="00"
          name="Agus Martín"
          note={hero.proof}
          src="/provisorio/agus-cortando.jpg"
          alt="Agus Martín trabajando con un cliente"
          tall
          priority
          parallax={0.06}
          className="hero-plate"
        />
        {/* Titular cortado: cada línea se revela con una pasada horizontal. */}
        <h1 id="hero-title" className="hero-title t-display">
          {hero.title.map((line, i) => (
            <span key={line} className="hero-line" style={{ "--i": i } as React.CSSProperties}>
              <span className="hero-line-text">{line}</span>
            </span>
          ))}
        </h1>
        <div className="hero-side">
          <p className="t-lead">{hero.lead}</p>
          <Countdown label={hero.countdownLabel} />
          <div className="hero-actions">
            <a className="btn" href={site.checkoutUrl}>{hero.cta}</a>
            <a className="link-quiet t-note" href="#curso">{hero.secondary}</a>
          </div>
          <OfferFacts />
        </div>
      </div>
    </section>
  );
}
