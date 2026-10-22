"use client";

import { useEffect, useState } from "react";
import { secondsLeft } from "@/lib/offerTimer";

// Cuenta regresiva de la oferta (30 minutos por visita, ver lib/offerTimer.ts).
export default function Countdown({ label }: { label: string }) {
  const [left, setLeft] = useState<number | undefined>(undefined);

  useEffect(() => {
    const tick = () => setLeft(secondsLeft());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const units: [string, number | undefined][] = [
    ["Min", left === undefined ? undefined : Math.floor(left / 60)],
    ["Seg", left === undefined ? undefined : left % 60],
  ];

  return (
    <div className="countdown">
      <p className="t-note">{label}</p>
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
    </div>
  );
}
