"use client";

import { useState, type FormEvent } from "react";
import { legal, site } from "@/lib/content";

// Botón de arrepentimiento (Resolución 424/2020): sin cuenta ni explicaciones, y con un código de trámite.
// Por ahora el pedido sale por mail al vendedor; con Supabase activo se guarda además en la base.
export default function RevocationForm() {
  const [code, setCode] = useState<string | null>(null);

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const c = `AR-${Date.now().toString(36).toUpperCase()}`;
    const body = [
      `Código de trámite: ${c}`,
      `Nombre: ${d.get("name")}`,
      `Mail de la compra: ${d.get("email")}`,
      `DNI: ${d.get("dni")}`,
      `Qué compró: ${d.get("item")}`,
      `Fecha de compra: ${d.get("date")}`,
      `Comentario: ${d.get("note") || "-"}`,
    ].join("\n");
    if (legal.email.includes("@")) {
      location.href = `mailto:${legal.email}?subject=${encodeURIComponent(`Arrepentimiento de compra ${c}`)}&body=${encodeURIComponent(body)}`;
    }
    setCode(c);
  };

  if (code) {
    return (
      <div className="auth-msg auth-msg--ok" role="status">
        <p>Recibimos tu pedido. Tu código de trámite es <strong>{code}</strong>: guardalo.</p>
        <p>Si no se abrió tu programa de mail, mandá este código y tus datos a {legal.email} o por <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>. Te respondemos dentro de las 24 horas y el reembolso sale por el mismo medio de pago.</p>
      </div>
    );
  }

  return (
    <form className="auth-form legal-form" onSubmit={send}>
      <label className="field"><span className="t-label">Nombre y apellido</span><input name="name" autoComplete="name" required /></label>
      <label className="field"><span className="t-label">Mail con el que compraste</span><input name="email" type="email" autoComplete="email" required /></label>
      <label className="field"><span className="t-label">DNI</span><input name="dni" inputMode="numeric" required /></label>
      <label className="field">
        <span className="t-label">Qué compraste</span>
        <select name="item" required defaultValue="">
          <option value="" disabled>Elegí una opción</option>
          <option>Curso online</option>
          <option>Productos de la tienda</option>
        </select>
      </label>
      <label className="field"><span className="t-label">Fecha de compra</span><input name="date" type="date" required /></label>
      <label className="field"><span className="t-label">Comentario (opcional)</span><textarea name="note" rows={3} /></label>
      <button className="btn" type="submit"><span className="btn-label">Pedir la cancelación</span></button>
    </form>
  );
}
