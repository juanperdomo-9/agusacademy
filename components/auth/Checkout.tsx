"use client";

import { useEffect, useState } from "react";
import { course, enrollment, site } from "@/lib/content";
import { checkSession, supabase, NOT_CONFIGURED } from "@/lib/session";

// Compra: solo con sesión iniciada. Sin sesión, a crear la cuenta (y de vuelta acá);
// si la cuenta ya tiene el curso, directo a «Mi curso».
export default function Checkout() {
  const [view, setView] = useState<"loading" | "off" | "pay">("loading");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const sb = supabase();
    if (!sb) { setView("off"); return; }
    (async () => {
      const state = await checkSession();
      if (state === "out") return location.replace("/crear-cuenta/?next=/comprar/");
      if (state === "kicked") return location.replace("/ingresar/?next=/comprar/");
      const [{ data: user }, { data: owns }] = await Promise.all([sb.auth.getUser(), sb.rpc("has_course")]);
      if (owns) return location.replace("/mi-curso/");
      setEmail(user.user?.email ?? "");
      setView("pay");
    })();
  }, []);

  if (view === "loading") return <p className="auth-lead" aria-live="polite">Preparando tu compra…</p>;

  return (
    <div className="auth-card">
      <p className="t-label t-soft">{view === "pay" ? email : "Compra"}</p>
      <h1 className="auth-title">Tu inscripción.</h1>
      <div className="checkout-line">
        <span>Curso online · {course.modules.length} módulos · acceso de por vida</span>
        <strong>{enrollment.priceNow}</strong>
      </div>
      {view === "off" ? (
        <p className="auth-lead">{NOT_CONFIGURED} Escribinos por <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> para inscribirte.</p>
      ) : (
        <>
          {/* TODO: crear la preferencia de Mercado Pago con external_reference = id del usuario. */}
          <button className="btn" type="button" disabled><span className="btn-label">Pagar con Mercado Pago</span></button>
          <p className="t-note t-soft">El pago online se habilita en los próximos días. El curso queda en esta cuenta apenas se acredita.</p>
        </>
      )}
    </div>
  );
}
