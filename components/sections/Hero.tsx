"use client";

import { useEffect, useRef } from "react";
import { hero, site } from "@/lib/content";
import Countdown from "@/components/Countdown";
import OfferFacts from "@/components/OfferFacts";
import type { SceneFrame } from "@/components/hero/monogramScene";
import { MONOGRAM_POLYS, MONOGRAM_AWAY, MONOGRAM_ASPECT } from "@/lib/monogram";

// Paths SVG de las 3 piezas (Y invertida para SVG), centradas en su propio centro.
const SVG_PIECES = MONOGRAM_POLYS.map((poly) => {
  const xs = poly.map((p) => p[0]), ys = poly.map((p) => -p[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const d = "M" + poly.map(([x, y]) => `${(x - cx).toFixed(4)} ${(-y - cy).toFixed(4)}`).join(" L") + " Z";
  return { d, cx, cy };
});

// Hero «El monograma se arma»: el AM gigante en 3D se separa al scrollear, revela la foto
// y el titular, y al final vuelve a juntarse como logo de la cabecera.
// Sin JS, sin WebGL o con movimiento reducido: hero estático (foto + titular), sin escena.
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function Hero() {
  const stageRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasGL = (() => { try { return !!document.createElement("canvas").getContext("webgl2"); } catch { return false; } })();
    if (reduced || !hasGL) {
      root.classList.remove("hero-live");
      return;
    }
    root.classList.add("hero-live");

    const photo = stage.querySelector<HTMLElement>(".stage-photo")!;
    const spot = stage.querySelector<HTMLElement>(".stage-spot")!;
    const lines = Array.from(stage.querySelectorAll<HTMLElement>(".stage-line > span"));
    const row = stage.querySelector<HTMLElement>(".stage-row")!;
    const hint = stage.querySelector<HTMLElement>(".stage-hint")!;
    const headerMono = document.querySelector<HTMLElement>(".header-mono");
    const svg = stage.querySelector<SVGSVGElement>(".stage-svg")!;
    const svgPieces = Array.from(svg.querySelectorAll<SVGGElement>("g[data-i]"));
    const svgGroup = svg.querySelector<SVGGElement>("g.stage-svg-group")!;
    const svgStart = performance.now();
    const fine = matchMedia("(pointer: fine)").matches;
    const narrow = () => window.innerWidth < 768;

    let scene: { resize: (w: number, h: number) => void; render: (f: SceneFrame) => void; dispose: () => void } | null = null;
    let t0 = 0, raf = 0, running = false, alive = true;
    const tgt = { x: 0, y: 0 }, tilt = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      tgt.x = (e.clientY / innerHeight - 0.5) * 0.5;
      tgt.y = (e.clientX / innerWidth - 0.5) * 0.8;
    };
    if (fine) addEventListener("pointermove", onMove);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const r = stage.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - innerHeight));
      const t = scene ? (now - t0) / 1000 : (now - svgStart) / 1000;
      const intro = ease(clamp((now - svgStart) / 1000 / 1.4));
      const split = inOut(seg(p, 0.12, 0.62));
      const merge = inOut(seg(p, 0.86, 1));
      const open = split * (1 - merge);
      const ph = ease(seg(p, 0.18, 0.6));
      tilt.x += (tgt.x - tilt.x) * 0.07;
      tilt.y += (tgt.y - tilt.y) * 0.07;

      // La foto ya se ve tenue detrás del monograma y se aclara al separarse las piezas.
      photo.style.opacity = String(0.22 + 0.78 * ph);
      photo.style.transform = `scale(${1.25 - 0.25 * ph})`;
      spot.style.opacity = String(1 - ph * 0.7);
      spot.style.setProperty("--mx", `${50 + tilt.y * 22}%`);
      lines.forEach((el, i) => {
        const v = ease(seg(p, 0.5 + i * 0.06, 0.66 + i * 0.06));
        el.style.transform = `translateY(${110 * (1 - v)}%)`;
        el.style.opacity = v > 0 ? "1" : "0";
      });
      const rr = ease(seg(p, 0.7, 0.82));
      row.style.opacity = String(rr);
      row.style.transform = `translateY(${20 * (1 - rr)}px)`;
      hint.style.opacity = String(1 - seg(p, 0.02, 0.1));

      // Traspaso: mientras el 3D vive, el logo plano de la cabecera se oculta.
      const done = merge > 0.98;
      root.dataset.heroLogo = done ? "flat" : "3d";
      canvas.style.opacity = done ? "0" : "1";
      // Monograma SVG (celular, y en escritorio hasta que llega el 3D): mismas piezas y mismo recorrido, en 2D.
      const hr = headerMono?.getBoundingClientRect();
      if (hr) {
        const nw = narrow();
        const S = Math.min(innerHeight * 0.68, (innerWidth * 0.8) / MONOGRAM_ASPECT) * (0.82 + 0.18 * intro) * (nw ? 1 - 0.38 * open : 1);
        const size = S + (hr.height - S) * merge;
        const cx = innerWidth / 2 + (hr.left + hr.width / 2 - innerWidth / 2) * merge;
        const cy = innerHeight / 2 - (nw ? innerHeight * 0.24 * open : 0) + (hr.top + hr.height / 2 - innerHeight / 2) * merge
          + Math.sin(t * 1.1) * 6 * (1 - merge);
        svgGroup.setAttribute("transform", `translate(${cx} ${cy}) scale(${size}) rotate(${(tilt.y * 6 + (1 - intro) * -18) * (1 - merge)})`);
        svgPieces.forEach((g, i) => {
          const a = MONOGRAM_AWAY[i], pc = SVG_PIECES[i];
          const sx = nw ? 0.42 : 1, py = nw && i === 2 ? 0.62 : a.p[1];
          const x = pc.cx + a.p[0] * sx * open, y = pc.cy - py * open;
          const flip = Math.cos(a.r[1] * open * 0.9);
          g.setAttribute("transform", `translate(${x} ${y}) rotate(${(a.r[2] * 57.3) * open}) scale(${flip} 1)`);
        });
        svg.style.opacity = done || scene ? "0" : "1";
      }
      if (scene && !done && hr) {
        scene.render({ t, intro, open, merge, fade: 1 - 0.65 * ph, tiltX: tilt.x, tiltY: tilt.y, narrow: narrow(),
          end: { x: hr.left + hr.width / 2, y: hr.top + hr.height / 2, h: hr.height } });
      }
    };
    // Solo anima mientras el escenario está en pantalla.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(frame); }
      else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); root.dataset.heroLogo = "flat"; }
    });
    io.observe(stage);

    const onResize = () => scene?.resize(innerWidth, innerHeight);
    addEventListener("resize", onResize);

    // three.js solo en escritorio con mouse, y recién con la primera interacción (o a los 3 s):
    // en celular queda el monograma SVG, que no carga nada extra.
    let loaded = false;
    const load = () => {
      if (loaded || !fine || narrow()) return;
      loaded = true;
      triggers.forEach((ev) => removeEventListener(ev, load));
      return
      import("@/components/hero/monogramScene").then(({ createMonogramScene }) => {
        if (!alive) return;
        scene = createMonogramScene(canvas, narrow());
        scene.resize(innerWidth, innerHeight);
        t0 = performance.now();
      }).catch(() => { /* sin 3D: queda el SVG */ });
    };
    const triggers = ["pointermove", "wheel", "keydown", "scroll"] as const;
    triggers.forEach((ev) => addEventListener(ev, load, { passive: true, once: true }));
    const timer = setTimeout(load, 3000);

    return () => {
      alive = false;
      clearTimeout(timer);
      triggers.forEach((ev) => removeEventListener(ev, load));
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener("pointermove", onMove);
      removeEventListener("resize", onResize);
      scene?.dispose();
      delete root.dataset.heroLogo;
    };
  }, []);

  return (
    <section id="inicio" ref={stageRef} className="stage" aria-labelledby="hero-title">
      <div className="stage-sticky">
        <div className="stage-spot" aria-hidden="true" />
        <div className="stage-photo">
          <img src="/portfolio/p01-1200.jpg" srcSet="/portfolio/p01-640.jpg 640w, /portfolio/p01-1200.jpg 1200w" sizes="100vw" alt="Agus Martín con su credencial de educador" fetchPriority="high" />
        </div>
        <canvas ref={canvasRef} className="stage-gl" aria-hidden="true" />
        <svg className="stage-svg" aria-hidden="true" width="100%" height="100%">
          <defs>
            <linearGradient id="am-metal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f7f5f0" />
              <stop offset=".55" stopColor="#d9d6cf" />
              <stop offset="1" stopColor="#9e9c96" />
            </linearGradient>
          </defs>
          <g className="stage-svg-group">
            {SVG_PIECES.map((pc, i) => (
              <g key={i} data-i={i} transform={`translate(${pc.cx} ${pc.cy})`}>
                <path d={pc.d} fill="url(#am-metal)" />
              </g>
            ))}
          </g>
        </svg>
        <div className="stage-grain" aria-hidden="true" />
        <div className="stage-copy wrap">
          <h1 id="hero-title" className="stage-title">
            {hero.title.map((line) => (
              <span key={line} className="stage-line"><span>{line}</span></span>
            ))}
          </h1>
          <div className="stage-row">
            <p className="t-lead">{hero.lead}</p>
            <Countdown label={hero.countdownLabel} />
            <div className="hero-actions">
              <a className="btn" href={site.checkoutUrl}><span className="btn-label">{hero.cta}</span></a>
              <a className="link-quiet t-note" href="#curso">{hero.secondary}</a>
            </div>
            <OfferFacts />
          </div>
        </div>
        <p className="stage-hint t-label" aria-hidden="true">Scrolleá</p>
      </div>
    </section>
  );
}
