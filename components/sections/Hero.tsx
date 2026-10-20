"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  // El monograma vive en una capa fija por encima de la cabecera: así vuela hasta el logo
  // en vez de esconderse debajo de la barra (que es opaca y está por encima del hero).
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => setHost(document.body), []);

  useEffect(() => {
    if (!host) return;
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
    const svg = document.querySelector<HTMLElement>(".stage-svg")!;
    const svgPieces = Array.from(svg.querySelectorAll<HTMLElement>(".stage-piece"));
    const sticky = stage.querySelector<HTMLElement>(".stage-sticky")!;
    const svgStart = performance.now();
    const fine = matchMedia("(pointer: fine)").matches;
    // Todo lo que es medida se lee solo al cambiar el tamaño, nunca en cada cuadro.
    // vh sale del escenario fijo (100vh): no cambia cuando la barra del navegador del celular aparece o se esconde.
    let hrCache = headerMono?.getBoundingClientRect();
    let top = 0, len = 1, vw = innerWidth, vh = innerHeight, smax = 1;
    const measure = () => {
      hrCache = headerMono?.getBoundingClientRect();
      vw = innerWidth; vh = sticky.offsetHeight || innerHeight;
      top = stage.getBoundingClientRect().top + scrollY;
      len = Math.max(1, stage.offsetHeight - vh);
      // Las piezas se dibujan una vez al tamaño máximo y después solo se achican: nunca se repintan.
      smax = Math.min(vh * 0.68, (vw * 0.8) / MONOGRAM_ASPECT);
      svgPieces.forEach((el) => { el.style.width = el.style.height = `${smax * 1.1}px`; el.style.margin = `${-smax * 0.55}px 0 0 ${-smax * 0.55}px`; });
    };
    // Pantallas táctiles: todo el hero son animaciones de la placa de video atadas al scroll.
    // Con ViewTimeline el navegador las mueve solo, sincronizadas con el dedo y sin JavaScript por cuadro.
    // Sin ViewTimeline, el scroll las "rebobina" (currentTime). Nada se repinta.
    const touch = !fine;
    root.classList.toggle("hero-touch", touch);
    const VT = (window as unknown as { ViewTimeline?: new (o: { subject: Element; axis: string }) => AnimationTimeline }).ViewTimeline;
    let scrollDriven = false;
    let anims: Animation[] = [];
    let lastCt = -1;
    const build = () => {
      anims.forEach((a) => a.cancel());
      anims = []; lastCt = -1;
      const hr = hrCache;
      if (!touch || !hr) return;
      const N = 60, nw = vw < 768;
      const kPieces: Keyframe[][] = [[], [], []], kPhoto: Keyframe[] = [], kSpot: Keyframe[] = [], kRow: Keyframe[] = [], kHint: Keyframe[] = [];
      const kLines: Keyframe[][] = lines.map(() => []);
      for (let s = 0; s <= N; s++) {
        const p = s / N, offset = p;
        const split = inOut(seg(p, 0.04, 0.4)), merge = inOut(seg(p, 0.48, 1)), open = split * (1 - merge);
        const ph = ease(seg(p, 0.06, 0.4));
        const S = smax * (nw ? 1 - 0.38 * open : 1);
        const size = S + (hr.height - S) * merge;
        const cx = vw / 2 + (hr.left + hr.width / 2 - vw / 2) * merge;
        const cy = vh / 2 - (nw ? vh * 0.24 * open : 0) + (hr.top + hr.height / 2 - vh / 2) * merge;
        const k = size / smax;
        svgPieces.forEach((_, i) => {
          const a = MONOGRAM_AWAY[i], pc = SVG_PIECES[i];
          const sx = nw ? 0.42 : 1, py = nw && i === 2 ? 0.62 : a.p[1];
          const x = (pc.cx + a.p[0] * sx * open) * smax, y = (pc.cy - py * open) * smax;
          const flip = Math.cos(a.r[1] * open * 0.9);
          kPieces[i].push({ offset, transform: `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0) scale(${k.toFixed(4)}) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${(a.r[2] * 57.3 * open).toFixed(3)}deg) scale(${flip.toFixed(4)},1)` });
        });
        kPhoto.push({ offset, opacity: 0.22 + 0.78 * ph, transform: `scale(${(1.25 - 0.25 * ph).toFixed(4)})` });
        kSpot.push({ offset, opacity: 1 - ph * 0.7 });
        lines.forEach((_, i) => {
          const v = ease(seg(p, 0.2 + i * 0.04, 0.34 + i * 0.04));
          kLines[i].push({ offset, opacity: v > 0 ? 1 : 0, transform: `translate3d(0,${(110 * (1 - v)).toFixed(2)}%,0)` });
        });
        const rr = ease(seg(p, 0.32, 0.46));
        kRow.push({ offset, opacity: rr, transform: `translate3d(0,${(20 * (1 - rr)).toFixed(2)}px,0)` });
        kHint.push({ offset, opacity: 1 - seg(p, 0.01, 0.06) });
      }
      // Traspaso al final: se apagan las piezas y aparece el logo de la cabecera en el mismo lugar.
      const kOut: Keyframe[] = [{ offset: 0, opacity: 1 }, { offset: 0.94, opacity: 1 }, { offset: 0.995, opacity: 0 }, { offset: 1, opacity: 0 }];
      const kIn: Keyframe[] = kOut.map((k) => ({ ...k, opacity: 1 - (k.opacity as number) }));
      scrollDriven = !!VT;
      const opts = (VT
        ? { timeline: new VT({ subject: stage, axis: "block" }), rangeStart: "contain 0%", rangeEnd: "contain 100%", fill: "both", easing: "linear" }
        : { duration: 1000, fill: "both", easing: "linear" }) as KeyframeAnimationOptions;
      svgPieces.forEach((el, i) => anims.push(el.animate(kPieces[i], opts)));
      anims.push(photo.animate(kPhoto, opts), spot.animate(kSpot, opts), row.animate(kRow, opts), hint.animate(kHint, opts), svg.animate(kOut, opts));
      if (headerMono) anims.push(headerMono.animate(kIn, opts));
      lines.forEach((el, i) => anims.push(el.animate(kLines[i], opts)));
      if (!scrollDriven) anims.forEach((a) => a.pause());
    };
    const onMeasure = () => { measure(); build(); };
    onMeasure();
    addEventListener("resize", onMeasure);
    // Solo escribe en el DOM si el valor cambió.
    const last = new WeakMap<HTMLElement, Record<string, string>>();
    const put = (el: HTMLElement, k: string, v: string) => {
      let c = last.get(el); if (!c) last.set(el, (c = {}));
      if (c[k] !== v) { c[k] = v; el.style.setProperty(k, v); }
    };
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
      const p = clamp((scrollY - top) / len);
      if (anims.length) {
        const ct = Math.round(p * 10000) / 10;
        if (ct !== lastCt) { lastCt = ct; anims.forEach((a) => { a.currentTime = ct; }); }
        return;
      }
      const t = scene ? (now - t0) / 1000 : (now - svgStart) / 1000;
      const intro = ease(clamp((now - svgStart) / 1000 / 1.4));
      const split = inOut(seg(p, 0.04, 0.4));
      const merge = inOut(seg(p, 0.48, 1));
      const open = split * (1 - merge);
      const ph = ease(seg(p, 0.06, 0.4));
      tilt.x += (tgt.x - tilt.x) * 0.07;
      tilt.y += (tgt.y - tilt.y) * 0.07;

      // La foto ya se ve tenue detrás del monograma y se aclara al separarse las piezas.
      put(photo, "opacity", (0.22 + 0.78 * ph).toFixed(3));
      put(photo, "transform", `scale(${(1.25 - 0.25 * ph).toFixed(4)})`);
      put(spot, "opacity", (1 - ph * 0.7).toFixed(3));
      if (fine) put(spot, "--mx", `${(50 + tilt.y * 22).toFixed(1)}%`);
      lines.forEach((el, i) => {
        const v = ease(seg(p, 0.2 + i * 0.04, 0.34 + i * 0.04));
        put(el, "transform", `translate3d(0,${(110 * (1 - v)).toFixed(2)}%,0)`);
        put(el, "opacity", v > 0 ? "1" : "0");
      });
      const rr = ease(seg(p, 0.32, 0.46));
      put(row, "opacity", rr.toFixed(3));
      put(row, "transform", `translate3d(0,${(20 * (1 - rr)).toFixed(2)}px,0)`);
      put(hint, "opacity", (1 - seg(p, 0.01, 0.06)).toFixed(3));

      // Traspaso: mientras el 3D vive, el logo plano de la cabecera se oculta.
      const done = merge > 0.98;
      const logo = done ? "flat" : "3d";
      if (root.dataset.heroLogo !== logo) root.dataset.heroLogo = logo; // tocar <html> recalcula toda la página
      put(canvas, "opacity", done ? "0" : "1");
      // Monograma SVG (celular, y en escritorio hasta que llega el 3D): mismas piezas y mismo recorrido, en 2D.
      const hr = hrCache;
      if (hr) {
        const nw = narrow();
        const S = smax * (0.82 + 0.18 * intro) * (nw ? 1 - 0.38 * open : 1);
        const size = S + (hr.height - S) * merge;
        const cx = vw / 2 + (hr.left + hr.width / 2 - vw / 2) * merge;
        const cy = vh / 2 - (nw ? vh * 0.24 * open : 0) + (hr.top + hr.height / 2 - vh / 2) * merge
          + Math.sin(t * 1.1) * 6 * (1 - merge);
        const k = size / smax, rot = (tilt.y * 6 + (1 - intro) * -18) * (1 - merge);
        // Cada pieza es su propia capa: solo cambia su transform, que se mueve sin repintar.
        svgPieces.forEach((el, i) => {
          const a = MONOGRAM_AWAY[i], pc = SVG_PIECES[i];
          const sx = nw ? 0.42 : 1, py = nw && i === 2 ? 0.62 : a.p[1];
          const x = (pc.cx + a.p[0] * sx * open) * smax, y = (pc.cy - py * open) * smax;
          const flip = Math.cos(a.r[1] * open * 0.9);
          put(el, "transform", `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0) rotate(${rot.toFixed(3)}deg) scale(${k.toFixed(4)}) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${(a.r[2] * 57.3 * open).toFixed(3)}deg) scale(${flip.toFixed(4)},1)`);
        });
        put(svg, "opacity", done || scene ? "0" : "1");
      }
      if (scene && !done && hr) {
        scene.render({ t, intro, open, merge, fade: 1 - 0.65 * ph, tiltX: tilt.x, tiltY: tilt.y, narrow: narrow(),
          end: { x: hr.left + hr.width / 2, y: hr.top + hr.height / 2, h: hr.height } });
      }
    };
    // Solo anima mientras el escenario está en pantalla.
    const io = new IntersectionObserver(([e]) => {
      if (scrollDriven) return; // el navegador ya mueve todo solo
      if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(frame); }
      else if (!e.isIntersecting && running) {
        running = false; cancelAnimationFrame(raf); root.dataset.heroLogo = "flat";
        if (!anims.length) put(svg, "opacity", "0"); // la capa es fija: fuera del hero no puede quedar a la vista
      }
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
      removeEventListener("resize", onMeasure);
      anims.forEach((a) => a.cancel());
      root.classList.remove("hero-touch");
      scene?.dispose();
      delete root.dataset.heroLogo;
    };
  }, [host]);

  const mono = (
    <div className="stage-svg" aria-hidden="true">
      {SVG_PIECES.map((pc, i) => (
        <svg key={i} className="stage-piece" viewBox="-0.55 -0.55 1.1 1.1">
          <defs>
            <linearGradient id={`am-metal-${i}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f7f5f0" />
              <stop offset=".55" stopColor="#d9d6cf" />
              <stop offset="1" stopColor="#9e9c96" />
            </linearGradient>
          </defs>
          <path d={pc.d} fill={`url(#am-metal-${i})`} />
        </svg>
      ))}
    </div>
  );

  return (
    <section id="inicio" ref={stageRef} className="stage" aria-labelledby="hero-title">
      <div className="stage-sticky">
        <div className="stage-spot" aria-hidden="true" />
        <div className="stage-photo">
          <img src="/portfolio/p01-1200.jpg" srcSet="/portfolio/p01-640.jpg 640w, /portfolio/p01-1200.jpg 1200w" sizes="100vw" alt="Agus Martín con su credencial de educador" fetchPriority="high" />
        </div>
        <canvas ref={canvasRef} className="stage-gl" aria-hidden="true" />
        {host && createPortal(mono, host)}
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
