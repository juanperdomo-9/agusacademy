"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  focus?: string;
  /** Tramo del clip que se repite, en segundos. */
  start?: number;
  end?: number;
};

// Clip mudo en loop: arranca solo cuando está en pantalla y se pausa al salir.
// Con movimiento reducido o si el navegador no puede reproducirlo, queda el póster.
export default function AutoVideo({ src, poster, focus, start = 0, end }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const loop = () => {
      if (end !== undefined && v.currentTime >= end) v.currentTime = start;
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload !== "auto") {
            v.preload = "auto";
            v.currentTime = start;
          }
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 },
    );
    v.addEventListener("timeupdate", loop);
    io.observe(v);
    return () => {
      io.disconnect();
      v.removeEventListener("timeupdate", loop);
    };
  }, [start, end]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      style={focus ? { objectPosition: focus } : undefined}
    />
  );
}
