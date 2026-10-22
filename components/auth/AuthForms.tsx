"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { signIn, signUp, requestReset, setNewPassword, nextPath } from "@/lib/session";

// Mantiene el ?next= en los links entre ingresar y crear cuenta (por ejemplo, para volver a la compra).
function useNextQuery() {
  const [q, setQ] = useState("");
  useEffect(() => { const n = nextPath(); if (n) setQ(`?next=${encodeURIComponent(n)}`); }, []);
  return q;
}

const MIN = 8;

// Base común: maneja el envío, el estado "cargando" y el mensaje de error o éxito.
function Form({ title, lead, submit, onSubmit, children, foot }: {
  title: string; lead?: string; submit: string;
  onSubmit: (data: FormData) => Promise<{ error?: string | null; ok?: string } | void>;
  children: ReactNode; foot?: ReactNode;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const handle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true); setError(null);
    const r = await onSubmit(new FormData(e.currentTarget));
    setBusy(false);
    if (r?.error) setError(r.error);
    if (r?.ok) setOk(r.ok);
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">{title}</h1>
      {lead && <p className="auth-lead">{lead}</p>}
      {ok ? (
        <p className="auth-msg auth-msg--ok" role="status">{ok}</p>
      ) : (
        <form className="auth-form" onSubmit={handle} noValidate={false}>
          {children}
          {error && <p className="auth-msg auth-msg--error" role="alert">{error}</p>}
          <button className="btn" type="submit" disabled={busy}>
            <span className="btn-label">{busy ? "Un momento…" : submit}</span>
          </button>
        </form>
      )}
      {foot && <div className="auth-foot t-note">{foot}</div>}
    </div>
  );
}

function Field({ label, ...input }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="field">
      <span className="t-label">{label}</span>
      <input {...input} />
    </label>
  );
}

const Email = () => <Field label="Mail" name="email" type="email" autoComplete="email" inputMode="email" required />;
const s = (d: FormData, k: string) => String(d.get(k) ?? "");

export function LoginForm() {
  const q = useNextQuery();
  return (
    <Form
      title="Ingresar."
      lead="Entrá con tu mail y contraseña."
      submit="Ingresar"
      onSubmit={async (d) => {
        const error = await signIn(s(d, "email"), s(d, "password"));
        if (!error) location.assign(nextPath() ?? "/mi-curso/");
        return { error };
      }}
      foot={<>
        <a href="/recuperar/">¿Te olvidaste la contraseña?</a>
        <span>¿Primera vez? <a href={`/crear-cuenta/${q}`}>Creá tu cuenta</a></span>
      </>}
    >
      <Email />
      <Field label="Contraseña" name="password" type="password" autoComplete="current-password" required />
    </Form>
  );
}

export function SignupForm() {
  const q = useNextQuery();
  return (
    <Form
      title="Creá tu cuenta."
      lead="Para comprar el curso necesitás una cuenta: ahí queda guardado, con acceso de por vida."
      submit="Crear cuenta"
      onSubmit={async (d) => {
        const pw = s(d, "password");
        if (pw.length < MIN) return { error: `La contraseña tiene que tener al menos ${MIN} caracteres.` };
        if (pw !== s(d, "repeat")) return { error: "Las contraseñas no coinciden." };
        const r = await signUp(s(d, "email"), pw, nextPath());
        if (r.error) return { error: r.error };
        if (r.confirm) return { ok: "Listo. Te mandamos un mail para confirmar la cuenta: tocá el link y después iniciá sesión." };
        location.assign(nextPath() ?? "/mi-curso/");
      }}
      foot={<span>¿Ya tenés cuenta? <a href={`/ingresar/${q}`}>Ingresá</a></span>}
    >
      <Email />
      <Field label="Contraseña" name="password" type="password" autoComplete="new-password" minLength={MIN} required />
      <Field label="Repetí la contraseña" name="repeat" type="password" autoComplete="new-password" minLength={MIN} required />
    </Form>
  );
}

export function ForgotForm() {
  return (
    <Form
      title="Recuperar contraseña."
      lead="Te mandamos un link a tu mail para elegir una nueva."
      submit="Mandar link"
      onSubmit={async (d) => {
        const error = await requestReset(s(d, "email"));
        // Mismo mensaje exista o no la cuenta: no se revela qué mails están registrados.
        return error ? { error } : { ok: "Si hay una cuenta con ese mail, te llegó un link para cambiar la contraseña. Revisá también la carpeta de spam." };
      }}
      foot={<a href="/ingresar/">Volver a ingresar</a>}
    >
      <Email />
    </Form>
  );
}

export function ResetForm() {
  return (
    <Form
      title="Contraseña nueva."
      submit="Guardar y entrar"
      onSubmit={async (d) => {
        const pw = s(d, "password");
        if (pw.length < MIN) return { error: `La contraseña tiene que tener al menos ${MIN} caracteres.` };
        if (pw !== s(d, "repeat")) return { error: "Las contraseñas no coinciden." };
        const error = await setNewPassword(pw);
        if (!error) location.assign("/mi-curso/");
        return { error };
      }}
      foot={<a href="/recuperar/">Pedir un link nuevo</a>}
    >
      <Field label="Contraseña nueva" name="password" type="password" autoComplete="new-password" minLength={MIN} required />
      <Field label="Repetila" name="repeat" type="password" autoComplete="new-password" minLength={MIN} required />
    </Form>
  );
}
