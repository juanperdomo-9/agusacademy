// Todo el contenido de la landing vive acá.
// Lo que está entre [corchetes] es PROVISORIO: hay que reemplazarlo con datos reales de Agus
// (ver el documento «Pedido para Agus»). No publicar con corchetes.

export const site = {
  brand: "Agus Martín Academy",
  instagram: "https://www.instagram.com/agusmartiin_/",
  checkoutUrl: "#inscripcion", // TODO: link de Mercado Pago
  // Fecha y hora REALES de cierre del precio de lanzamiento (con zona horaria).
  launchEndsAt: "2026-11-15T23:59:00-03:00", // PROVISORIO
};

export const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "trabajo", label: "El trabajo" },
  { id: "curso", label: "El curso" },
  { id: "clase", label: "Clase de muestra" },
  { id: "extras", label: "Extras" },
  { id: "agus", label: "Quién enseña" },
  { id: "alumnos", label: "Alumnos" },
  { id: "inscripcion", label: "Inscripción" },
  { id: "preguntas", label: "Preguntas" },
] as const;

// Seis datos fijos de la oferta: se repiten igual junto a cada botón de compra.
export const offerFacts = [
  "[$XX.XXX] pago único",
  "Acceso [de por vida]",
  "[X] h de video",
  "6 módulos",
  "Certificado",
  "Desde el celular",
];

export const hero = {
  kicker: "Curso online de barbería",
  title: ["Cortá con método,", "no de oído."],
  lead: "El método completo de Agus Martín para dominar el fade, la tijera y la terminación, filmado corte por corte.",
  cta: "Inscribirme",
  secondary: "Ver los 6 módulos",
  countdownLabel: "El precio de lanzamiento termina en",
  // Dato público del afiche de su gira en Instagram (visto el 2026-10-15). Confirmar con Agus.
  proof: "Formador en 13 ciudades",
};

export const work = {
  title: "El trabajo habla.",
  lead: "Cada técnica del curso, filmada en la silla de principio a fin. Esto es lo que vas a aprender a hacer.",
  // Nombres de técnica descriptos a partir de la foto: revisar con Agus.
  // `focus` es el object-position: deja fuera textos quemados del reel.
  cuts: [
    { n: "01", technique: "Mid fade + textura", src: "/provisorio/corte-01.jpg", focus: "50% 45%" },
    { n: "02", technique: "Taper + movimiento", src: "/provisorio/corte-02.jpg", focus: "50% 22%", video: { src: "/provisorio/corte-02.mp4", start: 6, end: 28 } },
    { n: "03", technique: "Burst fade + textura", src: "/provisorio/corte-03.jpg", focus: "50% 40%" },
  ],
  more: "Más cortes en Instagram",
};

// Nombres de módulo ILUSTRATIVOS hasta que Agus confirme el temario.
export const course = {
  title: "El método, paso a paso.",
  lead: "Seis módulos en orden. Cada uno arranca donde termina el anterior, así no hay huecos: cuando completás los seis, sabés hacer un corte completo de punta a punta.",
  forWho: [
    "Arrancás de cero.",
    "Cortás amigos, pero el fade te sale a ojo.",
    "Ya trabajás y querés cobrar más.",
  ],
  modules: [
    // `src` provisorio: fotos del Instagram. Sin `src`, la pieza se arma tipográfica.
    { n: "01", name: "Fundamentos", detail: "Herramientas, peines, lectura del cabello y del cráneo." },
    { n: "02", name: "Low fade", detail: "La transición limpia desde cero, sin escalones.", src: "/provisorio/corte-01.jpg", focus: "50% 45%" },
    { n: "03", name: "Mid y high fade", detail: "Subir la línea sin perder la forma.", src: "/provisorio/corte-03.jpg", focus: "50% 40%" },
    { n: "04", name: "Tijera y textura", detail: "Conectar arriba con los costados.", src: "/provisorio/corte-02.jpg", focus: "50% 22%" },
    { n: "05", name: "Perfilado y barba", detail: "Líneas, contornos y simetría." },
    { n: "06", name: "Terminación", detail: "Detalle final, styling y foto para tus redes." },
  ] as { n: string; name: string; detail: string; src?: string; focus?: string }[],
};

export const sampleClass = {
  title: "Mirá cómo enseña.",
  lead: "Una clase del curso tal como la vas a ver adentro: cámara a las manos, paso por paso, sin cortes de edición.",
  // ID de un video NO LISTADO de YouTube (lo que va después de watch?v=). null = espacio reservado.
  youtubeId: null as string | null,
  pending: "Video de muestra pendiente",
  // Capítulos ilustrativos: reemplazar con los tiempos reales del video.
  chapters: [
    { t: "00:00", label: "Lectura del cabello" },
    { t: "02:40", label: "Línea de base con la #0" },
    { t: "06:15", label: "Transición sin escalones" },
    { t: "11:30", label: "Conexión con tijera" },
    { t: "15:05", label: "Terminación y foto" },
  ],
};

// Todo lo de esta sección está SIN CONFIRMAR con Agus: por eso los corchetes.
export const extras = {
  title: "Lo que te llevás.",
  lead: "Además de los seis módulos, el curso suma esto. Al completar el método, el certificado lleva tu nombre.",
  items: [
    { name: "[Comunidad privada]", detail: "[Grupo de alumnos con Agus para mostrar avances y sacarte dudas.]" },
    { name: "[Material descargable]", detail: "[Guías para tener a mano en la silla: peines, ángulos y pasos de cada corte.]" },
    { name: "Certificado", detail: "[Cómo se obtiene y qué valida: a confirmar con Agus.]" },
  ],
  certificate: {
    kind: "Certificado de finalización",
    placeholder: "Tu nombre",
    body: "completó los seis módulos del Método Agus Martín: fundamentos, fade, tijera, perfilado y terminación.",
    signer: "Agus Martín",
    signerRole: "Formador",
    seal: "Método completo",
    inputLabel: "Probá con tu nombre",
  },
};

export const agus = {
  title: "Quién te enseña.",
  story: [
    "[Historia de Agus: cómo empezó a cortar y en qué año.]",
    "[Un momento difícil y cómo lo atravesó.]",
    "[Por qué empezó a enseñar y qué quiere para sus alumnos.]",
  ],
  quote: "[Una frase que Agus repite siempre a sus alumnos.]",
  // Datos públicos de su Instagram (vistos el 2026-10-15): confirmar con Agus antes de publicar.
  tour: {
    title: "De gira.",
    lead: "Seminarios en vivo por Argentina. La gira 2026 ya está completa.",
    cities: [
      "Tres Arroyos", "Corrientes", "San Juan", "Córdoba", "Jujuy", "Salta", "Rosario",
      "Saladillo", "Tucumán", "Formosa", "La Pampa", "Neuquén", "Río Negro",
    ],
    facts: [
      { value: "13", label: "ciudades en la gira de seminarios" },
      { value: "15,8 mil", label: "personas siguen su trabajo en Instagram" },
      { value: "[X]", label: "años cortando" },
    ],
  },
};

export const students = {
  title: "Alumnos.",
  note: "Testimonios reales pendientes. Esta sección no se publica hasta tenerlos.",
  items: [1, 2, 3].map((i) => ({ name: `[Alumno ${i}]`, city: "[Ciudad]", text: "[Testimonio real con permiso]" })),
};

export const enrollment = {
  title: "Inscripción.",
  priceNow: "[$XX.XXX]",
  priceBefore: "[$XX.XXX]",
  guarantee: "[Garantía a confirmar: días y condiciones.]",
  cta: "Inscribirme ahora",
};

export const faq = {
  title: "Preguntas.",
  items: [
    { q: "¿Necesito experiencia previa?", a: "[Respuesta a confirmar con Agus.]" },
    { q: "¿Qué herramientas necesito?", a: "[Lista mínima de herramientas.]" },
    { q: "¿Cuánto tiempo tengo acceso?", a: "[De por vida / plazo a confirmar.]" },
    { q: "¿Cómo se paga?", a: "[Mercado Pago, cuotas: a confirmar.]" },
    { q: "¿Lo puedo ver desde el celular?", a: "Sí, las clases se ven desde cualquier dispositivo con internet." },
    { q: "¿Hay garantía?", a: "[A confirmar.]" },
  ],
};
