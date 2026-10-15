import { students } from "@/lib/content";

// Solo testimonios reales y con permiso. Mientras no existan, esta sección no se publica.
export default function Students() {
  return (
    <section id="alumnos" className="section wrap" aria-labelledby="students-title">
      <div className="section-head">
        <h2 id="students-title" className="t-display">{students.title}</h2>
        <p className="t-label t-soft">{students.note}</p>
      </div>
      <div className="students-grid">
        {students.items.map((t) => (
          <figure key={t.name} className="testimonial">
            <blockquote className="quote">{t.text}</blockquote>
            <figcaption className="t-label">{t.name} · {t.city}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
