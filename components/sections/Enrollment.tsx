import { enrollment, offerFacts, hero, site } from "@/lib/content";
import Countdown from "@/components/Countdown";

export default function Enrollment() {
  return (
    <section id="inscripcion" className="enroll on-bone section wrap" aria-labelledby="enroll-title">
      <img className="enroll-mark" src="/brand/monograma-carbon.png" alt="" width={447} height={427} loading="lazy" />
      <div className="enroll-grid">
        <div className="enroll-price">
          <h2 id="enroll-title" className="t-display">{enrollment.title}</h2>
          <p className="t-label t-soft">Precio normal <span className="price-before">{enrollment.priceBefore}</span></p>
          <p className="t-display">{enrollment.priceNow}</p>
          <Countdown label={hero.countdownLabel} />
        </div>
        <div className="enroll-detail">
          <ol className="enroll-list t-label" aria-label="Qué incluye">
            {offerFacts.map((f) => <li key={f}>{f}</li>)}
          </ol>
          <p className="t-body">{enrollment.guarantee}</p>
          <a className="btn btn--dark" href={site.checkoutUrl}><span className="btn-label">{enrollment.cta}</span></a>
        </div>
      </div>
    </section>
  );
}
