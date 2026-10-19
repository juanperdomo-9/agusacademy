import { work, site } from "@/lib/content";
import Piece from "@/components/Piece";

export default function Work() {
  return (
    <section id="trabajo" className="work section wrap" aria-labelledby="work-title">
      <div className="work-head">
        <h2 id="work-title" className="t-display">{work.title}</h2>
        <p className="t-lead">{work.lead}</p>
      </div>
      <p className="work-swipe t-note">Deslizá para ver los tres cortes</p>
      <ul className="work-gallery" aria-label="Cortes de Agus">
        {work.cuts.map((c, i) => (
          <li key={c.n} className={`work-item work-item--${c.n}`} data-cursor="Ver">
            <Piece n={c.n} name={c.technique} src={c.src} focus={c.focus} parallax={[0.04, 0.09, 0.06][i]} video={"video" in c ? c.video : undefined} alt={`Corte terminado por Agus: ${c.technique}`} />
          </li>
        ))}
        <li className="work-more">
          <p className="t-body t-soft">Cortes reales de Agus. En el curso los ves de principio a fin, desde la primera pasada.</p>
          <a className="link-quiet t-note" href={site.instagram} target="_blank" rel="noopener noreferrer">
            {work.more} @agusmartiin_
          </a>
        </li>
      </ul>
    </section>
  );
}
