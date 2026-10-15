"use client";

import { useEffect, useRef, useState } from "react";
import { course } from "@/lib/content";

// Inclinación fija por casillero: cada pieza queda pegada un poco torcida, distinta.
const TILTS = ["-1.6deg", "1.1deg", "-0.6deg", "1.8deg", "-1.2deg", "0.7deg"];
const TOTAL = course.modules.length;

// La única sección "álbum": doble página sobre la mesa y seis casilleros.
// Firma «Completar el método»: cada módulo cae a su casillero al scrollear.
// Sin JS o con movimiento reducido, todas las piezas aparecen ya pegadas.
export default function Course() {
  const ref = useRef<HTMLElement>(null);
  const [placed, setPlaced] = useState(TOTAL);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    let raf = 0;

    const update = () => {
      raf = 0;
      if (desktop.matches) {
        // La doble página queda fija; el recorrido extra de la sección reparte los 6 módulos.
        const r = el.getBoundingClientRect();
        const run = r.height - window.innerHeight;
        const p = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 1;
        setPlaced(Math.min(TOTAL, Math.floor(p * (TOTAL + 1))));
      } else {
        // En pantallas chicas cada pieza cae cuando su casillero entra en pantalla.
        let n = 0;
        el.querySelectorAll(".slot").forEach((s) => {
          if (s.getBoundingClientRect().top < window.innerHeight * 0.8) n++;
        });
        setPlaced(n);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    setArmed(true);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <section id="curso" ref={ref} className={`course wrap ${armed ? "is-armed" : ""}`} aria-labelledby="course-title">
        <div className="course-sticky">
          <div className="spread">
            <div className="spread-page">
              <div className="spread-head t-label">
                <span>El curso</span>
                <output aria-live="polite">Módulos {placed} / {TOTAL}</output>
              </div>
              <h2 id="course-title" className="t-headline">{course.title}</h2>
              <p className="t-body">{course.lead}</p>
              <ol className="course-index">
                {course.modules.map((m, i) => (
                  <li key={m.n} data-active={i < placed}>
                    <span className="t-label">{m.n}</span>
                    <span>
                      <span className="t-title">{m.name}</span>
                      <span className="course-index-detail">{m.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="spread-page">
              <div className="spread-head t-label"><span>Agus Martín Academy</span><span>Método</span></div>
              <ol className="slots" aria-label="Módulos del curso">
                {course.modules.map((m, i) => (
                  <li key={m.n} className="slot" data-placed={i < placed}>
                    <span className="slot-empty" aria-hidden="true">
                      <span className="t-number">{m.n}</span>
                    </span>
                    <figure className="slot-piece" style={{ "--tilt": TILTS[i] } as React.CSSProperties}>
                      <div className="slot-media">
                        {m.src ? (
                          <img src={m.src} alt="" loading="lazy" style={m.focus ? { objectPosition: m.focus } : undefined} />
                        ) : (
                          <span className="slot-type t-number" aria-hidden="true">{m.n}</span>
                        )}
                      </div>
                      <figcaption className="slot-foot">
                        <span className="t-label">{m.name}</span>
                        <span className="t-label">{m.n}</span>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ol>
              <p className="spread-seal" data-complete={placed === TOTAL}>
                {placed === TOTAL ? "Método completo · Certificado" : `Faltan ${TOTAL - placed} módulos para el certificado`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="for-who section wrap" aria-labelledby="forwho-title">
        <h2 id="forwho-title" className="t-headline">Para quién es</h2>
        <ul className="for-who-list">
          {course.forWho.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
