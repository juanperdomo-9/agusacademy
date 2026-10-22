"use client";

import { useEffect, useState } from "react";
import { course, site } from "@/lib/content";
import { checkSession, signOut, supabase, NOT_CONFIGURED } from "@/lib/session";

type Device = { device_id: string; label: string | null; last_seen: string };
type View = "loading" | "off" | "kicked" | "buy" | "course";

// Área del alumno. Cada minuto (y al volver a la pestaña) confirma que esta sigue siendo la única sesión
// abierta: si la cuenta entró desde otro dispositivo, acá se cierra.
export default function StudentArea() {
  const [view, setView] = useState<View>("loading");
  const [email, setEmail] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const sb = supabase();
    if (!sb) { setView("off"); return; }
    let alive = true;

    const verify = async () => {
      const state = await checkSession();
      if (!alive) return false;
      if (state === "out") { location.replace("/ingresar/"); return false; }
      if (state === "kicked") { setView("kicked"); return false; }
      return true;
    };

    (async () => {
      if (!(await verify())) return;
      const [{ data: user }, { data: owns }, { data: devs }] = await Promise.all([
        sb.auth.getUser(),
        sb.rpc("has_course"),
        sb.from("devices").select("device_id,label,last_seen").order("created_at"),
      ]);
      if (!alive) return;
      setEmail(user.user?.email ?? "");
      setDevices((devs as Device[]) ?? []);
      setView(owns ? "course" : "buy");
    })();

    const timer = setInterval(verify, 60_000);
    const onVisible = () => { if (document.visibilityState === "visible") verify(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { alive = false; clearInterval(timer); document.removeEventListener("visibilitychange", onVisible); };
  }, []);

  const logout = async () => { await signOut(); location.assign("/"); };

  if (view === "loading") return <p className="auth-lead" aria-live="polite">Cargando tu curso…</p>;

  if (view === "off") return <div className="auth-card"><h1 className="auth-title">Mi curso.</h1><p className="auth-lead">{NOT_CONFIGURED}</p></div>;

  if (view === "kicked") {
    return (
      <div className="auth-card">
        <h1 className="auth-title">Sesión cerrada.</h1>
        <p className="auth-lead">Tu cuenta se abrió en otro dispositivo, así que cerramos esta sesión. La cuenta es personal: solo puede estar abierta en un lugar a la vez.</p>
        <a className="btn" href="/ingresar/"><span className="btn-label">Volver a ingresar</span></a>
      </div>
    );
  }

  return (
    <div className="student">
      <div className="student-head">
        <p className="t-label t-soft">{email}</p>
        <h1 className="auth-title">{view === "course" ? "Tu curso." : "Todavía no tenés el curso."}</h1>
        {view === "buy" && (
          <>
            <p className="auth-lead">Si ya pagaste, puede tardar unos minutos en aparecer. Si pagaste con otro mail, escribinos por Instagram.</p>
            <a className="btn" href={site.checkoutUrl.startsWith("#") ? `/${site.checkoutUrl}` : site.checkoutUrl}><span className="btn-label">Inscribirme</span></a>
          </>
        )}
      </div>

      {view === "course" && (
        <ol className="student-modules">
          {course.modules.map((m) => (
            <li key={m.n} className="student-module">
              <span className="t-label t-soft">Módulo {m.n}</span>
              <h2 className="student-module-name">{m.name}</h2>
              <p className="t-note t-soft">{m.detail}</p>
              <span className="t-label student-soon">Clases disponibles pronto</span>
            </li>
          ))}
        </ol>
      )}

      <section className="student-devices" aria-labelledby="devs">
        <h2 id="devs" className="t-label">Tus dispositivos ({devices.length} de 2)</h2>
        <ul>
          {devices.map((d) => (
            <li key={d.device_id} className="t-note">
              {d.label ?? "Dispositivo"} <span className="t-soft">· último uso {new Date(d.last_seen).toLocaleDateString("es-AR")}</span>
            </li>
          ))}
        </ul>
        <p className="t-note t-soft">La cuenta puede usarse en 2 dispositivos y abierta en uno a la vez. Si cambiaste de celular, escribinos y te liberamos el viejo.</p>
        <button type="button" className="link-quiet t-note" onClick={logout}>Cerrar sesión</button>
      </section>
    </div>
  );
}
