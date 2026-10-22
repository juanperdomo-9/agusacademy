import { site } from "@/lib/content";

// Cuenta regresiva por visita: arranca en site.offerMinutes cuando alguien entra a la web.
// Se guarda en la pestaña (sessionStorage): recargar o pasar a la tienda no la reinicia; una visita nueva, sí.
// Todos los contadores (barra, hero, inscripción) leen el mismo final, así marcan lo mismo.
const KEY = "ama-offer-end";
let cached: number | null = null;

export function offerEnd(): number {
  if (cached) return cached;
  let end = 0;
  try { end = Number(sessionStorage.getItem(KEY)) || 0; } catch { /* modo privado */ }
  if (!end) {
    end = Date.now() + site.offerMinutes * 60_000;
    try { sessionStorage.setItem(KEY, String(end)); } catch { /* modo privado */ }
  }
  return (cached = end);
}

// Segundos que faltan; en 0 se queda en 0.
export const secondsLeft = () => Math.max(0, Math.ceil((offerEnd() - Date.now()) / 1000));
