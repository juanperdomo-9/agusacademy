"use client";

import { useEffect, useRef, useState } from "react";

// «De gira»: al recorrer la lista, las ciudades se encienden una por una y el contador sube de 01 a 13.
// Sin JS o con movimiento reducido, todas aparecen encendidas.
export default function TourCities({ cities }: { cities: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(cities.length);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      // Empieza cuando la lista entra por abajo y termina cuando llega a la mitad de la pantalla.
      const p = Math.min(1, Math.max(0, (innerHeight * 0.92 - r.top) / (innerHeight * 0.92 - innerHeight * 0.35)));
      setLit(Math.round(p * cities.length));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [cities.length]);

  return (
    <div ref={ref} className="tour-board">
      <p className="tour-count" aria-hidden="true">
        <span className="tour-count-n">{String(lit).padStart(2, "0")}</span>
        <span className="tour-count-of">/ {cities.length}</span>
      </p>
      <ol className="tour-cities" aria-label="Ciudades de la gira">
        {cities.map((city, i) => (
          <li key={city} className="tour-city" data-lit={i < lit}>{city}</li>
        ))}
      </ol>
    </div>
  );
}
