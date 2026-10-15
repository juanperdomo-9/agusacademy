"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Qué entra con cascada en cada sección (el hero y la doble página del curso tienen su propio movimiento).
const REVEAL = [
  ".t-lead", ".work-item", ".work-more",
  ".extras-list li", ".cert", ".cert-try", ".for-who-list li", ".agus-photo",
  ".agus-story > *", ".tour-city", ".tour-facts > *", ".testimonial",
  ".enroll-price > *", ".enroll-detail > *", ".faq-list details",
  ".product", ".students-photo", ".site-footer-word",
  ".pf-media", ".pf-text > *", ".pf-values li", ".pf-collab-copy > *", ".pf-sign > *",
].join(",");

// Capa de movimiento de todo el sitio. Sin JS, nada se oculta.
// Con movimiento reducido: sin scroll suave, parallax ni desplazamientos; las entradas son solo un fundido.
export default function Motion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("motion");
    if (reduced) root.classList.add("reduce-motion");

    // 1. Entradas: titulares con la pasada de máquina, el resto sube en cascada.
    // Se comprueba en cada movimiento de scroll (no con IntersectionObserver): un titular
    // recortado no tiene área visible, y el observador además se pierde entradas en scrolls rápidos.
    type Pending = { probe: Element; targets: HTMLElement[] };
    const pending: Pending[] = [];
    const boxes = new Map<Element, Pending>();
    document.querySelectorAll<HTMLElement>("main section:not(#inicio)").forEach((section) => {
      section.querySelectorAll<HTMLElement>(".t-display, .for-who > h2").forEach((h) => {
        if (h.closest(".spread")) return;
        h.dataset.reveal = "cut";
        // Se mide el contenedor del titular, que siempre tiene área.
        const box = h.parentElement!;
        let p = boxes.get(box);
        if (!p) {
          p = { probe: box, targets: [] };
          boxes.set(box, p);
          pending.push(p);
        }
        p.targets.push(h);
      });
      let i = 0;
      section.querySelectorAll<HTMLElement>(REVEAL).forEach((el) => {
        if (el.closest(".spread") || el.dataset.reveal === "cut") return;
        el.dataset.reveal = "rise";
        el.style.setProperty("--d", `${Math.min(i++, 8) * 70}ms`);
        pending.push({ probe: el, targets: [el] });
      });
    });
    const checkReveals = () => {
      const limit = window.innerHeight * 0.92;
      for (let k = pending.length - 1; k >= 0; k--) {
        const r = pending[k].probe.getBoundingClientRect();
        // Entra al asomar por abajo; lo que ya quedó arriba también se marca, para no dejar nada oculto.
        if (r.top < limit) {
          pending[k].targets.forEach((t) => t.classList.add("is-in"));
          pending.splice(k, 1);
        }
      }
    };

    if (reduced) {
      const onNativeScroll = () => {
        if (pending.length) checkReveals();
      };
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      checkReveals();
      return () => {
        window.removeEventListener("scroll", onNativeScroll);
        root.classList.remove("motion", "reduce-motion");
      };
    }

    // 2. Scroll suave.
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -64 } });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });

    // 3. Parallax: cada foto se desplaza a su propia velocidad.
    // Primero se miden todas y después se escriben, para no forzar un recálculo por cada foto.
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const parallax = () => {
      const vh = window.innerHeight;
      const rects = layers.map((el) => el.parentElement!.getBoundingClientRect());
      layers.forEach((el, i) => {
        const r = rects[i];
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = parseFloat(el.dataset.parallax || "0");
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      });
    };

    // 4. Cabecera: se esconde al bajar y vuelve al subir.
    const header = document.querySelector<HTMLElement>(".header");
    let last = 0;
    const onScroll = ({ scroll }: { scroll: number }) => {
      parallax();
      if (pending.length) checkReveals();
      // Solo cambia con movimiento real; al frenar, la cabecera mantiene su estado.
      if (header && Math.abs(scroll - last) > 4) {
        header.classList.toggle("is-hidden", scroll > last && scroll > 240);
        last = scroll;
      }
    };
    lenis.on("scroll", onScroll);
    parallax();
    checkReveals();

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      root.classList.remove("motion");
    };
  }, []);

  return null;
}
