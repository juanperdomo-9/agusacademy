import { enrollment, offerFacts, hero, site } from "@/lib/content";
import Countdown from "@/components/Countdown";

// La ficha de inscripción: papel hueso, precio grande, lo que incluye y la compra.
export default function Enrollment() {
  return (
    <section id="inscripcion" className="enroll on-bone section wrap" aria-labelledby="enroll-title">
      <img className="enroll-mark" src="/brand/monograma-carbon.png" alt="" width={447} height={427} loading="lazy" />
      <div className="enroll-grid">
        <div className="enroll-price">
          <h2 id="enroll-title" className="t-display">{enrollment.title}</h2>
          <p className="t-note t-soft">Precio normal <span className="price-before">{enrollment.priceBefore}</span></p>
          <p className="enroll-amount">{enrollment.priceNow}</p>
          <Countdown label={hero.countdownLabel} />
        </div>
        <div className="enroll-detail">
          <p className="t-label">{enrollment.includesLabel}</p>
          <ol className="enroll-list" aria-label={enrollment.includesLabel}>
            {offerFacts.map((f) => <li key={f} className="t-title">{f}</li>)}
          </ol>
          <a className="btn btn--dark enroll-cta" href={site.checkoutUrl}><span className="btn-label">{enrollment.cta}</span></a>
          <div className="enroll-notes">
            <p className="t-note t-soft">{enrollment.guarantee}</p>
            <p className="t-note t-soft">{enrollment.payment}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
