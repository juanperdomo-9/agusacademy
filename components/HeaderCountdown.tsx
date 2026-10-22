"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { secondsLeft } from "@/lib/offerTimer";

// Contador compacto para la barra: el mismo final que el del hero (30 minutos por visita).
export default function HeaderCountdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(secondsLeft());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const value = left === null ? "--:--" : `${pad(Math.floor(left / 60))}:${pad(left % 60)}`;

  return (
    <a href={site.checkoutUrl} className="header-count" aria-label={`Reservá tu lugar en los próximos ${value} minutos`}>
      <span className="header-count-label t-note">Reservá tu lugar</span>
      <span className="header-count-value">{value}</span>
    </a>
  );
}
