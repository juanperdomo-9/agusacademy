import { agus } from "@/lib/content";
import Piece from "@/components/Piece";

export default function Agus() {
  const { tour } = agus;
  return (
    <section id="agus" className="agus section wrap" aria-labelledby="agus-title">
      <div className="agus-grid">
        <div className="agus-photo">
          <Piece
            n="00"
            name="Agus Martín"
            note="Seminario en vivo"
            src="/provisorio/agus-escenario.jpg"
            alt="Agus Martín en el escenario de un seminario"
            parallax={0.07}
          />
        </div>
        <div className="agus-story">
          <h2 id="agus-title" className="t-display">{agus.title}</h2>
          {agus.story.map((p) => <p key={p} className="t-body">{p}</p>)}
          <blockquote className="agus-quote">{agus.quote}</blockquote>
          <a className="btn btn--ghost agus-portfolio" href="/portfolio">
            <span className="btn-label">Ver portfolio</span>
          </a>
        </div>
      </div>

      {/* El afiche de su gira, convertido en página: las ciudades entran una por una. */}
      <div className="tour" aria-labelledby="tour-title">
        <div className="tour-head">
          <h3 id="tour-title" className="t-display">{tour.title}</h3>
          <p className="t-lead">{tour.lead}</p>
        </div>
        <ol className="tour-cities" aria-label="Ciudades de la gira">
          {tour.cities.map((city) => (
            <li key={city} className="tour-city">{city}</li>
          ))}
        </ol>
        <dl className="tour-facts">
          {tour.facts.map((f) => (
            <div key={f.label}>
              <dt className="t-headline">{f.value}</dt>
              <dd className="t-note t-soft">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
