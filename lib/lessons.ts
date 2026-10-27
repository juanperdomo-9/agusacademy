import { course } from "@/lib/content";

// Clases del curso. PROVISORIO: títulos y duraciones de muestra hasta que Agus pase el temario real.
// `youtube` es el ID del video oculto (lo que va después de "v=" en el link). Vacío = clase todavía sin video.
export type Lesson = { id: string; title: string; minutes: number; youtube: string };
export type Module = { n: string; name: string; lessons: Lesson[] };

const DEMO: Record<string, string[]> = {
  "01": ["Herramientas y preparación", "Peines, tijeras y máquinas", "Lectura del cabello", "Lectura del cráneo"],
  "02": ["La guía cero", "Primera transición", "Borrar escalones", "Corte completo low fade"],
  "03": ["Subir la línea", "Mid fade paso a paso", "High fade paso a paso", "Errores comunes"],
  "04": ["Tijera sobre peine", "Texturizado", "Conectar arriba con los costados"],
  "05": ["Perfilado de contorno", "Barba: forma y simetría", "Navaja y terminación"],
  "06": ["Detalle final", "Styling con producto", "La foto para tus redes"],
};

export const modules: Module[] = course.modules.map((m) => ({
  n: m.n,
  name: m.name,
  lessons: (DEMO[m.n] ?? []).map((title, i) => ({ id: `${m.n}-${String(i + 1).padStart(2, "0")}`, title, minutes: 8 + ((i * 7 + Number(m.n) * 3) % 14), youtube: "" })),
}));

export const allLessons = modules.flatMap((m) => m.lessons.map((l) => ({ ...l, module: m })));
