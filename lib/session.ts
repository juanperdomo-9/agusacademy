// Cuentas de alumnos: Supabase Auth (mail + contraseña) más dos reglas propias, que viven en la base
// (supabase/migrations/0001_alumnos_sesiones.sql): máximo 2 dispositivos y una sola sesión abierta.
// La web es estática: todo corre en el navegador con la clave pública (anon); la seguridad la ponen RLS y las funciones.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const DEVICE = "ama-device";
const TOKEN = "ama-session";

export const NOT_CONFIGURED = "El acceso de alumnos todavía no está activado.";

let client: SupabaseClient | null = null;
export function supabase(): SupabaseClient | null {
  if (!URL || !KEY || typeof window === "undefined") return null;
  return (client ??= createClient(URL, KEY));
}

const store = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* modo privado */ } },
  del: (k: string) => { try { localStorage.removeItem(k); } catch { /* modo privado */ } },
};

function deviceId() {
  let id = store.get(DEVICE);
  if (!id) { id = crypto.randomUUID(); store.set(DEVICE, id); }
  return id;
}

function deviceLabel() {
  const ua = navigator.userAgent;
  const os = /iPhone|iPad/.test(ua) ? "iPhone / iPad" : /Android/.test(ua) ? "Android" : /Mac/.test(ua) ? "Mac" : /Windows/.test(ua) ? "Windows" : "Otro";
  const br = /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : "Navegador";
  return `${os} · ${br}`;
}

// Después de que Supabase acepta la contraseña: registra el dispositivo y lo vuelve la única sesión válida.
async function claim(sb: SupabaseClient): Promise<string | null> {
  const { data, error } = await sb.rpc("claim_session", { p_device: deviceId(), p_label: deviceLabel() });
  if (error) {
    await sb.auth.signOut({ scope: "local" });
    return error.message.includes("device_limit")
      ? "Tu cuenta ya está activa en 2 dispositivos. Escribinos por Instagram y te liberamos uno."
      : "No pudimos abrir la sesión. Probá de nuevo.";
  }
  store.set(TOKEN, data as string);
  return null;
}

export async function signIn(email: string, password: string): Promise<string | null> {
  const sb = supabase();
  if (!sb) return NOT_CONFIGURED;
  const { error } = await sb.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
  if (error) {
    return /confirm/i.test(error.message)
      ? "Todavía no confirmaste tu mail. Buscá el link que te mandamos al crear la cuenta."
      : "El mail o la contraseña no coinciden.";
  }
  return claim(sb);
}

export async function signUp(email: string, password: string): Promise<{ error: string | null; confirm: boolean }> {
  const sb = supabase();
  if (!sb) return { error: NOT_CONFIGURED, confirm: false };
  const { data, error } = await sb.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: { emailRedirectTo: `${location.origin}/ingresar/` },
  });
  if (error) {
    return { error: /registered|exists/i.test(error.message) ? "Ya hay una cuenta con ese mail. Iniciá sesión." : /password/i.test(error.message) ? "La contraseña tiene que tener al menos 8 caracteres." : "No pudimos crear la cuenta. Probá de nuevo.", confirm: false };
  }
  // Con confirmación por mail activada, Supabase no abre sesión hasta que el alumno toca el link.
  if (!data.session) return { error: null, confirm: true };
  return { error: await claim(sb), confirm: false };
}

export async function requestReset(email: string): Promise<string | null> {
  const sb = supabase();
  if (!sb) return NOT_CONFIGURED;
  const { error } = await sb.auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo: `${location.origin}/nueva-clave/` });
  return error && /rate|limit/i.test(error.message) ? "Pediste varios links seguidos. Esperá unos minutos y probá de nuevo." : null;
}

// El link del mail abre una sesión de recuperación: con ella se guarda la contraseña nueva y se entra.
export async function setNewPassword(password: string): Promise<string | null> {
  const sb = supabase();
  if (!sb) return NOT_CONFIGURED;
  const { data } = await sb.auth.getSession();
  if (!data.session) return "El link venció o ya se usó. Pedí uno nuevo.";
  const { error } = await sb.auth.updateUser({ password });
  if (error) return /different|same/i.test(error.message) ? "Elegí una contraseña distinta a la anterior." : "La contraseña tiene que tener al menos 8 caracteres.";
  return claim(sb);
}

export type SessionState = "ok" | "out" | "kicked";

// "kicked": alguien entró con la misma cuenta desde otro dispositivo. Se cierra la sesión acá.
export async function checkSession(): Promise<SessionState> {
  const sb = supabase();
  if (!sb) return "out";
  const { data } = await sb.auth.getSession();
  const token = store.get(TOKEN);
  if (!data.session || !token) return "out";
  const { data: ok, error } = await sb.rpc("check_session", { p_token: token });
  if (error) return "ok"; // sin conexión: no se echa a nadie por un corte de red
  if (ok) return "ok";
  store.del(TOKEN);
  await sb.auth.signOut({ scope: "local" });
  return "kicked";
}

export async function signOut() {
  const sb = supabase();
  store.del(TOKEN);
  await sb?.auth.signOut({ scope: "local" });
}
