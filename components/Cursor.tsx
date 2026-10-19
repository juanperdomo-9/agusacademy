"use client";

import { useEffect, useRef } from "react";

// Cursor propio (solo con mouse y sin movimiento reducido): un anillo hueso que sigue al puntero,
// se agranda sobre links y muestra una palabra sobre los elementos con data-cursor ("Ver", "Comprar").
// Los botones principales son magnéticos: se acercan un poco al puntero.
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const el = ring.current!, txt = label.current!;
    document.documentElement.classList.add("has-cursor");
    const pos = { x: -100, y: -100 }, cur = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX; pos.y = e.clientY;
      const t = e.target as HTMLElement;
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      const link = t.closest("a, button, summary, input, label");
      el.dataset.state = tagged ? "label" : link ? "link" : "idle";
      txt.textContent = tagged?.dataset.cursor ?? "";
    };
    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.22;
      cur.y += (pos.y - cur.y) * 0.22;
      el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    addEventListener("pointermove", onMove, { passive: true });
    // Al scrollear el contenido se mueve bajo el puntero: se recalcula sobre qué está.
    const onScroll = () => {
      const t = document.elementFromPoint(pos.x, pos.y) as HTMLElement | null;
      if (t) onMove({ clientX: pos.x, clientY: pos.y, target: t } as unknown as PointerEvent);
    };
    addEventListener("scroll", onScroll, { passive: true });

    // Botones magnéticos: solo los CTA principales.
    const buttons = Array.from(document.querySelectorAll<HTMLElement>(".btn, .header-cta"));
    const onBtnMove = (e: PointerEvent) => {
      const b = e.currentTarget as HTMLElement, r = b.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      b.style.translate = `${dx * 0.18}px ${dy * 0.28}px`;
    };
    const onBtnLeave = (e: PointerEvent) => { (e.currentTarget as HTMLElement).style.translate = ""; };
    buttons.forEach((b) => { b.addEventListener("pointermove", onBtnMove); b.addEventListener("pointerleave", onBtnLeave); });

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", onScroll);
      buttons.forEach((b) => { b.removeEventListener("pointermove", onBtnMove); b.removeEventListener("pointerleave", onBtnLeave); });
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={ring} className="cursor" data-state="idle" aria-hidden="true">
      <span ref={label} className="cursor-label" />
    </div>
  );
}
