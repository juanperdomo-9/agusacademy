"use client";

import { useEffect, useState } from "react";
import { site, offerFacts } from "@/lib/content";

// Barra fija en celular: aparece después del hero y se esconde en la sección de inscripción.
export default function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const enroll = document.getElementById("inscripcion");
    if (!hero || !enroll) return;
    let pastHero = false;
    let inEnroll = false;
    const update = () => setVisible(pastHero && !inEnroll);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (e.target === enroll) inEnroll = e.isIntersecting;
      }
      update();
    });
    io.observe(hero);
    io.observe(enroll);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mobile-cta" data-visible={visible} aria-hidden={!visible}>
      <span className="t-note">{offerFacts[0]}</span>
      <a className="btn" href={site.checkoutUrl} tabIndex={visible ? 0 : -1}>Inscribirme</a>
    </div>
  );
}
