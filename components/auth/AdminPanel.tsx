"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { checkSession, supabase } from "@/lib/session";

type Row = { email: string; has_account: boolean; created_at: string | null; enrolled_at: string | null; source: string | null; payment_id: string | null; devices: number; last_seen: string | null };

// Sin Supabase conectado, el panel se ve con datos de ejemplo para revisar el diseño.
const d = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString();
const DEMO: Row[] = [
  { email: "bauti.alumno@mail.com", has_account: true, created_at: d(14), enrolled_at: d(14), source: "mercadopago", payment_id: "123456789", devices: 2, last_seen: d(0) },
  { email: "lucas.fade@mail.com", has_account: true, created_at: d(6), enrolled_at: d(6), source: "mercadopago", payment_id: "123456790", devices: 1, last_seen: d(1) },
  { email: "maxi.cortes@mail.com", has_account: true, created_at: d(3), enrolled_at: d(3), source: "manual", payment_id: null, devices: 1, last_seen: d(2) },
  { email: "santi.barber@mail.com", has_account: true, created_at: d(2), enrolled_at: null, source: null, payment_id: null, devices: 1, last_seen: d(2) },
  { email: "nico.compro@mail.com", has_account: false, created_at: null, enrolled_at: d(1), source: "mercadopago", payment_id: "123456791", devices: 0, last_seen: null },
];

const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "2-digit" }) : "—");

export default function AdminPanel() {
  const [view, setView] = useState<"loading" | "forbidden" | "ready">("loading");
  const [demo, setDemo] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const sb = supabase();
    if (!sb) return;
    const { data, error } = await sb.rpc("admin_students");
    if (error) { setView("forbidden"); return; }
    setRows(data as Row[]); setView("ready");
  }, []);

  useEffect(() => {
    const sb = supabase();
    if (!sb) { setDemo(true); setRows(DEMO); setView("ready"); return; }
    (async () => {
      const state = await checkSession();
      if (state !== "ok") return location.replace("/ingresar/?next=/admin/");
      const { data: ok } = await sb.rpc("is_admin");
      if (!ok) { setView("forbidden"); return; }
      refresh();
    })();
  }, [refresh]);

  // Acciones: en la muestra cambian la tabla en pantalla; con Supabase, la base.
  const act = async (fn: "admin_grant" | "admin_revoke" | "admin_release_devices", email: string, done: string) => {
    const ask = fn === "admin_revoke" ? "¿Quitarle el acceso al curso a" : "¿Liberar los dispositivos de";
    if (fn !== "admin_grant" && !confirm(`${ask} ${email}?`)) return;
    const sb = supabase();
    if (sb) {
      const { error } = await sb.rpc(fn, { p_email: email });
      if (error) { setMsg("No se pudo hacer el cambio. Probá de nuevo."); return; }
      await refresh();
    } else {
      setRows((rs) => {
        if (fn === "admin_grant") return rs.some((r) => r.email === email) ? rs.map((r) => (r.email === email ? { ...r, enrolled_at: new Date().toISOString(), source: "manual" } : r)) : [{ email, has_account: false, created_at: null, enrolled_at: new Date().toISOString(), source: "manual", payment_id: null, devices: 0, last_seen: null }, ...rs];
        if (fn === "admin_revoke") return rs.map((r) => (r.email === email ? { ...r, enrolled_at: null, source: null, payment_id: null } : r));
        return rs.map((r) => (r.email === email ? { ...r, devices: 0 } : r));
      });
    }
    setMsg(`${done}: ${email}`);
  };

  const grant = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const email = input.value.trim().toLowerCase();
    if (!email.includes("@")) return;
    act("admin_grant", email, "Acceso dado");
    input.value = "";
  };

  const list = useMemo(() => rows.filter((r) => r.email.includes(q.trim().toLowerCase())), [rows, q]);
  const students = rows.filter((r) => r.enrolled_at);
  const month = new Date(); month.setDate(1); month.setHours(0, 0, 0, 0);
  const thisMonth = students.filter((r) => new Date(r.enrolled_at!) >= month).length;
  const noBuy = rows.filter((r) => r.has_account && !r.enrolled_at).length;

  if (view === "loading") return <p className="auth-lead">Cargando el panel…</p>;
  if (view === "forbidden") return <div className="auth-card"><h1 className="auth-title">Sin acceso.</h1><p className="auth-lead">Esta cuenta no tiene permiso de administración.</p></div>;

  return (
    <div className="admin">
      <div className="admin-head">
        <h1 className="auth-title">Panel.</h1>
        {demo && <p className="t-note t-soft">Muestra con datos de ejemplo: los datos reales aparecen cuando se conecte Supabase.</p>}
      </div>

      <dl className="admin-stats">
        <div><dt className="t-label t-soft">Alumnos con el curso</dt><dd>{students.length}</dd></div>
        <div><dt className="t-label t-soft">Ventas este mes</dt><dd>{thisMonth}</dd></div>
        <div><dt className="t-label t-soft">Cuentas sin comprar</dt><dd>{noBuy}</dd></div>
      </dl>

      <div className="admin-tools">
        <input className="admin-search" type="search" placeholder="Buscar por mail" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar alumno por mail" />
        <form className="admin-grant" onSubmit={grant}>
          <input name="email" type="email" placeholder="mail@alumno.com" aria-label="Mail para dar acceso" required />
          <button className="btn" type="submit"><span className="btn-label">Dar acceso</span></button>
        </form>
      </div>
      {msg && <p className="auth-msg auth-msg--ok" role="status">{msg}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Mail</th><th>Curso</th><th>Origen</th><th>Dispositivos</th><th>Último uso</th><th><span className="sr-only">Acciones</span></th></tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.email}>
                <td data-label="Mail">{r.email}{!r.has_account && <span className="admin-tag">sin cuenta</span>}</td>
                <td data-label="Curso">{r.enrolled_at ? fmt(r.enrolled_at) : <span className="t-soft">No compró</span>}</td>
                <td data-label="Origen">{r.source === "mercadopago" ? `MP ${r.payment_id ?? ""}` : r.source === "manual" ? "Manual" : "—"}</td>
                <td data-label="Dispositivos">{r.devices} de 2</td>
                <td data-label="Último uso">{fmt(r.last_seen)}</td>
                <td className="admin-actions">
                  {r.devices > 0 && <button type="button" onClick={() => act("admin_release_devices", r.email, "Dispositivos liberados")}>Liberar dispositivos</button>}
                  {r.enrolled_at
                    ? <button type="button" onClick={() => act("admin_revoke", r.email, "Acceso quitado")}>Quitar acceso</button>
                    : <button type="button" onClick={() => act("admin_grant", r.email, "Acceso dado")}>Dar acceso</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p className="t-note t-soft admin-empty">No hay alumnos con ese mail.</p>}
      </div>
    </div>
  );
}
