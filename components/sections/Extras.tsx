"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { extras } from "@/lib/content";

const MAX = 28;

// Extras: la lista de lo que suma el curso y el certificado como objeto.
// Cosa viva: el visitante escribe su nombre y lo ve en el certificado.
export default function Extras() {
  const c = extras.certificate;
  const [name, setName] = useState("");
  const inputId = useId();
  const shown = name.trim() || c.placeholder;
  const nameRef = useRef<HTMLParagraphElement>(null);

  // El nombre se achica hasta entrar completo en una línea: se mide el ancho real.
  useLayoutEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = "";
      let size = parseFloat(getComputedStyle(el).fontSize);
      while (el.scrollWidth > el.clientWidth && size > 14) {
        size -= 1;
        el.style.fontSize = `${size}px`;
      }
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [shown]);

  return (
    <section id="extras" className="extras section wrap" aria-labelledby="extras-title">
      <div className="extras-copy">
        <h2 id="extras-title" className="t-display">{extras.title}</h2>
        <p className="t-lead">{extras.lead}</p>
        <ul className="extras-list">
          {extras.items.map((x) => (
            <li key={x.name}>
              <h3 className="t-title">{x.name}</h3>
              <p className="t-body">{x.detail}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="extras-cert">
        <figure className="cert" aria-label={`${c.kind} de ejemplo`}>
          <div className="cert-head">
            <img src="/brand/monograma-carbon.png" alt="" width={447} height={427} className="cert-mono" />
            <span className="t-label">Agus Martín Academy</span>
          </div>
          <p className="cert-kind t-label">{c.kind}</p>
          <p ref={nameRef} className="cert-name" data-empty={!name.trim()}>
            {shown}
          </p>
          <p className="cert-body">{c.body}</p>
          <div className="cert-foot">
            <div className="cert-sign">
              <span className="cert-sign-name">{c.signer}</span>
              <span className="t-label">{c.signerRole}</span>
            </div>
            <span className="cert-seal t-label">{c.seal}</span>
          </div>
        </figure>

        <div className="cert-try">
          <label htmlFor={inputId} className="t-note">{c.inputLabel}</label>
          <input
            id={inputId}
            type="text"
            inputMode="text"
            autoComplete="off"
            maxLength={MAX}
            placeholder="Escribí tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
