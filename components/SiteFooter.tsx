"use client";

import { useEffect, useRef } from "react";
import { legal, site } from "@/lib/content";
import HeaderCountdown from "@/components/HeaderCountdown";

const WORD = "Agus Martín";

// Pie único para todas las páginas: un último empujón a la inscripción, navegación,
// el nombre a todo el ancho (las letras suben al entrar) y el crédito de diseño web.
export default function SiteFooter() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("is-in"); return; }
    el.classList.add("is-armed");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer ref={ref} className="sf wrap">
      <div className="sf-cta">
        <p className="sf-cta-title">¿Listo para cortar con método?</p>
        <div className="sf-cta-side">
          <HeaderCountdown />
          <a className="btn" href={site.checkoutUrl} data-cursor="Inscribirme"><span className="btn-label">Inscribirme</span></a>
        </div>
      </div>

      <nav className="sf-nav" aria-label="Pie">
        <div>
          <p className="t-label t-soft">Academia</p>
          <a href="/#curso">El curso</a>
          <a href="/#agus">Quién enseña</a>
          <a href="/#inscripcion">Inscripción</a>
          <a href="/#preguntas">Preguntas</a>
          <a href="/mi-curso/">Mi curso</a>
        </div>
        <div>
          <p className="t-label t-soft">Más</p>
          <a href="/tienda/">Tienda</a>
          <a href="/portfolio/">Portfolio</a>
        </div>
        <div>
          <p className="t-label t-soft">Redes</p>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <img className="sf-logo" src="/brand/logo-hueso.png" alt={site.brand} width={935} height={617} loading="lazy" />
      </nav>

      <p className="sf-word" aria-label={WORD}>
        {Array.from(WORD).map((ch, i) => (
          <span key={i} aria-hidden="true" style={{ "--i": i } as React.CSSProperties}>{ch === " " ? " " : ch}</span>
        ))}
      </p>

      <div className="sf-bottom t-note">
        <span>© 2026 {site.brand}</span>
        <span className="t-soft">{legal.owner} · CUIT {legal.cuit}</span>
        <nav className="sf-legal" aria-label="Legales">
          <a href="/arrepentimiento/" className="sf-revoke">Botón de arrepentimiento</a>
          <a href="/terminos/">Términos y condiciones</a>
          <a href="/privacidad/">Privacidad</a>
          <a href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario" target="_blank" rel="noopener noreferrer">Defensa del Consumidor</a>
        </nav>
        <a href="#top" className="sf-top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Volver arriba ↑</a>
        <span>Diseño y desarrollo web: <a href="https://jpweb.com.ar" target="_blank" rel="noopener">JP Web</a></span>
      </div>
    </footer>
  );
}
