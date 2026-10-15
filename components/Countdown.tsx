"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

type Left = { d: number; h: number; m: number; s: number } | null;

function compute(end: number): Left {
  const ms = end - Date.now();
  if (ms <= 0) return null;
  const t = Math.floor(ms / 1000);
  return { d: Math.floor(t / 86400), h: Math.floor((t % 86400) / 3600), m: Math.floor((t % 3600) / 60), s: t % 60 };
}

// Cuenta hacia una fecha real y fija (site.launchEndsAt). Nunca se reinicia por visita.
export default function Countdown({ label }: { label: string }) {
  const end = new Date(site.launchEndsAt).getTime();
  const [left, setLeft] = useState<Left | undefined>(undefined);

  useEffect(() => {
    setLeft(compute(end));
    const id = setInterval(() => setLeft(compute(end)), 1000);
    return () => clearInterval(id);
  }, [end]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const units: [string, number | undefined][] = [
    ["Días", left?.d], ["Hrs", left?.h], ["Min", left?.m], ["Seg", left?.s],
  ];

  return (
    <div className="countdown">
      <p className="t-note">{label}</p>
      {left === null ? (
        <p className="t-number">Cerrado</p>
      ) : (
        <div className="countdown-digits" role="timer" aria-label={label}>
          {units.map(([u, v]) => (
            <div className="countdown-unit" key={u}>
              {/* key cambia con el valor: el dígito nuevo entra con un paso. */}
              <span className="t-number countdown-value">
                <span key={v ?? "x"}>{v === undefined ? "--" : pad(v)}</span>
              </span>
              <span className="t-label">{u}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
