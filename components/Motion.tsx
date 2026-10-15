"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Qué entra con cascada en cada sección (el hero y la doble página del curso tienen su propio movimiento).
const REVEAL = [
  ".t-lead", ".work-item", ".work-more", ".sample-frame", ".sample-chapters li",
  ".extras-list li", ".cert", ".cert-try", ".for-who-list li", ".agus-photo",
  ".agus-story > *", ".tour-city", ".tour-facts > *", ".testimonial",
  ".enroll-price > *", ".enroll-detail > *", ".faq-list details",
].join(",");

// Capa de movimiento de todo el sitio. Sin JS o con movimiento reducido, nada se oculta ni se mueve.
export default function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("motion");

    // 1. Scroll suave.
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -64 } });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });

    // 2. Entradas: titulares con la pasada de máquina, el resto sube en cascada.
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

    // 3. Parallax: cada foto se desplaza a su propia velocidad.
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const parallax = () => {
      const vh = window.innerHeight;
      for (const el of layers) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax || "0");
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      }
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
