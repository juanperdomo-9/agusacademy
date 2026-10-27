import { students } from "@/lib/content";
import Piece from "@/components/Piece";
import TestimonialVideo from "@/components/TestimonialVideo";

// Testimonios: solo reales y con permiso (hasta tenerlos van entre corchetes).
// Las fotos son de seminarios reales de Agus, tomadas de su portfolio.
export default function Students() {
  return (
    <section id="alumnos" className="students section wrap" aria-labelledby="students-title">
      <div className="students-copy">
        <h2 id="students-title" className="t-display">{students.title}</h2>
        <p className="t-lead">{students.lead}</p>
        <TestimonialVideo {...students.video} />
        <ul className="students-list">
          {students.items.map((t) => (
            <li key={t.name}>
              <figure className="testimonial">
                <blockquote className="testimonial-quote">{t.text}</blockquote>
                <figcaption className="t-label t-soft">{t.name} · {t.city}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
      <div className="students-photos">
        {students.photos.map((p, i) => (
          <Piece
            key={p.src}
            n={p.n}
            name={p.name}
            src={p.src}
            alt={`Agus Martín: ${p.name.toLowerCase()}`}
            ratio={`${p.w} / ${p.h}`}
            parallax={i === 0 ? 0.05 : 0.09}
            className={`students-photo students-photo--${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
