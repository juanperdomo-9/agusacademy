"use client";

import { useEffect, useMemo, useState } from "react";
import { modules, allLessons } from "@/lib/lessons";

const KEY = "ama-progress";
type Progress = { seen: string[]; last?: string };

// El progreso por ahora vive en el navegador. Con Supabase activo pasa a la base (así se ve en celular y compu).
function load(): Progress {
  try { return JSON.parse(localStorage.getItem(KEY) || "") as Progress; } catch { return { seen: [] }; }
}
function save(p: Progress) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* modo privado */ } }

// El curso por dentro: video, datos de la clase, anterior/siguiente y el temario con lo visto.
export default function CoursePlayer() {
  const [progress, setProgress] = useState<Progress>({ seen: [] });
  const [current, setCurrent] = useState(allLessons[0].id);

  // Retoma donde quedó el alumno (o la clase del link #c-02-03).
  useEffect(() => {
    const p = load();
    setProgress(p);
    const fromHash = location.hash.startsWith("#c-") ? location.hash.slice(3) : null;
    const start = [fromHash, p.last].find((id) => id && allLessons.some((l) => l.id === id));
    if (start) setCurrent(start);
  }, []);

  const i = allLessons.findIndex((l) => l.id === current);
  const lesson = allLessons[i];
  const prev = allLessons[i - 1];
  const next = allLessons[i + 1];
  const seen = useMemo(() => new Set(progress.seen), [progress]);
  const pct = Math.round((seen.size / allLessons.length) * 100);

  const update = (p: Progress) => { setProgress(p); save(p); };
  const open = (id: string) => {
    setCurrent(id);
    update({ ...progress, last: id });
    history.replaceState(null, "", `#c-${id}`);
    document.querySelector(".player-video")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const toggleSeen = () => {
    const s = new Set(seen);
    if (s.has(lesson.id)) s.delete(lesson.id); else s.add(lesson.id);
    update({ ...progress, seen: [...s] });
  };
  const goNext = () => {
    if (!next) return;
    const s = new Set(seen); s.add(lesson.id);
    setProgress({ seen: [...s], last: next.id }); save({ seen: [...s], last: next.id });
    setCurrent(next.id);
    history.replaceState(null, "", `#c-${next.id}`);
    document.querySelector(".player-video")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const inModule = lesson.module.lessons.findIndex((l) => l.id === lesson.id) + 1;

  return (
    <div className="player">
      <div className="player-main">
        <div className="player-video">
          {lesson.youtube ? (
            <iframe
              key={lesson.id}
              src={`https://www.youtube-nocookie.com/embed/${lesson.youtube}?rel=0&modestbranding=1&playsinline=1`}
              title={lesson.title}
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <div className="player-empty">
              <img src="/brand/monograma-hueso.png" alt="" width={447} height={427} />
              <p className="t-note t-soft">El video de esta clase se carga cuando esté subido.</p>
            </div>
          )}
        </div>

        <div className="player-info">
          <p className="t-label t-soft">Módulo {lesson.module.n} · Clase {inModule} de {lesson.module.lessons.length} · {lesson.minutes} min</p>
          <h1 className="player-title">{lesson.title}</h1>
          <div className="player-actions">
            <button type="button" className="player-prev t-label" onClick={() => prev && open(prev.id)} disabled={!prev}>← Anterior</button>
            <button type="button" className="player-seen t-label" data-on={seen.has(lesson.id)} onClick={toggleSeen}>
              {seen.has(lesson.id) ? "✓ Vista" : "Marcar vista"}
            </button>
            {next ? (
              <button type="button" className="btn player-next" onClick={goNext}><span className="btn-label">Siguiente clase →</span></button>
            ) : (
              <p className="t-label">Terminaste el curso.</p>
            )}
          </div>
        </div>
      </div>

      <aside className="player-list" aria-label="Temario">
        <div className="player-progress">
          <p className="t-label"><span>Tu avance</span><span>{seen.size}/{allLessons.length} · {pct}%</span></p>
          <div className="player-bar"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
        </div>
        {modules.map((m) => {
          const done = m.lessons.filter((l) => seen.has(l.id)).length;
          return (
            <details key={m.n} className="player-module" open={m.n === lesson.module.n}>
              <summary>
                <span className="t-label t-soft">Módulo {m.n}</span>
                <span className="player-module-name">{m.name}</span>
                <span className="t-label t-soft">{done}/{m.lessons.length}</span>
              </summary>
              <ol>
                {m.lessons.map((l) => (
                  <li key={l.id}>
                    <button type="button" className="player-lesson" aria-current={l.id === current ? "true" : undefined} onClick={() => open(l.id)}>
                      <span className="player-check" data-on={seen.has(l.id)} aria-label={seen.has(l.id) ? "Vista" : "Sin ver"} />
                      <span className="player-lesson-title">{l.title}</span>
                      <span className="t-note t-soft">{l.minutes} min</span>
                    </button>
                  </li>
                ))}
              </ol>
            </details>
          );
        })}
      </aside>
    </div>
  );
}
