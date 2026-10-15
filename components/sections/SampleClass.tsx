"use client";

import { useState } from "react";
import { sampleClass } from "@/lib/content";

function PlayIcon() {
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 16.5v15l12-7.5z" fill="currentColor" />
    </svg>
  );
}

// Reproductor liviano: muestra un póster y recién al tocar play carga el iframe de YouTube.
// Con youtubeId en null queda un espacio reservado diseñado (sin botón activo).
export default function SampleClass() {
  const { youtubeId, chapters } = sampleClass;
  const [playing, setPlaying] = useState(false);
  const [start, setStart] = useState(0);

  const toSeconds = (t: string) => {
    const [m, s] = t.split(":").map(Number);
    return m * 60 + s;
  };
  const play = (at = 0) => {
    if (!youtubeId) return;
    setStart(at);
    setPlaying(true);
  };

  return (
    <section id="clase" className="sample section wrap" aria-labelledby="sample-title">
      <div className="sample-head">
        <h2 id="sample-title" className="t-display">{sampleClass.title}</h2>
        <p className="t-lead">{sampleClass.lead}</p>
      </div>
      <div className="sample-grid">
        <div className="sample-frame">
          {playing && youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&start=${start}`}
              title={sampleClass.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="sample-poster"
              onClick={() => play(0)}
              disabled={!youtubeId}
              aria-label={youtubeId ? "Reproducir la clase de muestra" : sampleClass.pending}
            >
              {youtubeId && <img src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`} alt="" />}
              <span className="sample-play"><PlayIcon /></span>
              <span className="sample-caption t-label">{youtubeId ? "Reproducir · Clase 01" : sampleClass.pending}</span>
            </button>
          )}
        </div>
        <ol className="sample-chapters" aria-label="Capítulos">
          {chapters.map((c) => (
            <li key={c.t}>
              <button type="button" onClick={() => play(toSeconds(c.t))} disabled={!youtubeId}>
                <span className="t-label t-soft">{c.t}</span>
                <span>{c.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
