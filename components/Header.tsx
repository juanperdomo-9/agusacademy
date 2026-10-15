"use client";

import { useEffect, useState } from "react";
import { sections, site } from "@/lib/content";

export default function Header() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = sections.findIndex((s) => s.id === e.target.id);
            if (i >= 0) setCurrent(i);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <header className="header">
      <a href="#inicio" className="header-brand" aria-label={site.brand}>
        <img className="header-mono" src="/brand/monograma-hueso.png" alt="" width={447} height={427} />
        <span className="t-label header-name">{site.brand}</span>
      </a>
      <nav className="header-index" aria-label="Secciones">
        <span className="t-label">{sections[current].label}</span>
        <output className="t-label" aria-live="off">
          {pad(current + 1)} / {pad(sections.length)}
        </output>
        <a href="#inscripcion" className="header-cta t-label">Inscribirme</a>
      </nav>
    </header>
  );
}
