"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

// Contador compacto para la barra: recuerda en todo momento que el precio de lanzamiento vence.
// Usa la misma fecha real que el contador del hero (site.launchEndsAt); nunca se reinicia.
export default function HeaderCountdown() {
  const end = new Date(site.launchEndsAt).getTime();
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);

  if (left === 0) return <a href="/#inscripcion" className="header-count t-note">Lanzamiento cerrado</a>;
  const t = Math.floor((left ?? 0) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  const value = left === null ? "--d --:--:--" : `${Math.floor(t / 86400)}d ${pad(Math.floor((t % 86400) / 3600))}:${pad(Math.floor((t % 3600) / 60))}:${pad(t % 60)}`;

  return (
    <a href="/#inscripcion" className="header-count" aria-label={`El precio de lanzamiento termina en ${value}`}>
      <span className="header-count-label t-note">El lanzamiento termina en</span>
      <span className="header-count-value">{value}</span>
    </a>
  );
}
