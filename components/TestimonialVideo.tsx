"use client";

import { useEffect, useRef, useState } from "react";

// Testimonio en video: corre mudo en loop mientras está en pantalla (los subtítulos vienen en el video)
// y «Escuchar» lo reproduce con sonido desde el principio. Con movimiento reducido no arranca solo.
export default function TestimonialVideo({ src, poster, name, role }: { src: string; poster: string; name: string; role: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const v = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
    }, { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current!;
    if (sound) { v.muted = true; setSound(false); return; }
    v.muted = false; v.currentTime = 0; v.loop = false;
    v.play().catch(() => {});
    setSound(true);
  };

  return (
    <figure className="tvideo">
      <div className="tvideo-frame">
        <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" onEnded={() => { const v = ref.current!; v.muted = true; v.loop = true; setSound(false); v.play().catch(() => {}); }} />
        <button type="button" className="tvideo-sound t-label" onClick={toggle} aria-pressed={sound}>
          {sound ? "Silenciar" : "▶ Escuchar"}
        </button>
      </div>
      <figcaption className="t-label t-soft">{name} · {role}</figcaption>
    </figure>
  );
}
