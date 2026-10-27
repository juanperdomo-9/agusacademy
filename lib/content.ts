// Todo el contenido de la landing vive acá.
// Lo que está entre [corchetes] es PROVISORIO: hay que reemplazarlo con datos reales de Agus
// (ver el documento «Pedido para Agus»). No publicar con corchetes.

export const site = {
  brand: "Agus Martín Academy",
  instagram: "https://www.instagram.com/agusmartiin_/",
  checkoutUrl: "/comprar/", // pide sesión iniciada y ahí se paga con Mercado Pago
  // Minutos de la cuenta regresiva: arranca de nuevo en cada visita (pedido de Agus).
  offerMinutes: 30,
};

export const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "trabajo", label: "El trabajo" },
  { id: "curso", label: "El curso" },
  { id: "productos", label: "Tienda" },
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
  countdownLabel: "Reservá tu lugar en los próximos",
  // Dato público del afiche de su gira en Instagram (visto el 2026-10-15). Confirmar con Agus.
  proof: "Formador en 13 ciudades",
};

export const work = {
  title: "El trabajo habla.",
  lead: "Cada técnica del curso, filmada en la silla de principio a fin. Esto es lo que vas a aprender a hacer.",
  // Nombres de técnica descriptos a partir de la foto: revisar con Agus.
  // `focus` es el object-position: deja fuera textos quemados del reel.
  cuts: [
    { n: "01", technique: "Burst Fade + textura", src: "/provisorio/corte-01.jpg", focus: "50% 45%" },
    { n: "02", technique: "Taper Fade + movimiento", src: "/provisorio/corte-02.jpg", focus: "50% 22%", video: { src: "/provisorio/corte-02.mp4" } },
    { n: "03", technique: "Mullet + textura", src: "/provisorio/corte-03.jpg", focus: "50% 40%" },
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

// Productos Forma Essent (datos tomados de los afiches que pasó el cliente). Precios y link de compra: a confirmar.
export const products = {
  title: "Productos.",
  lead: "Texturizadores, ceras y cremas Forma Essent para terminar cada corte.",
  buyUrl: "#", // TODO: link de compra (tienda o WhatsApp)
  items: [
    {
      id: "polvo-texturizador",
      name: "Polvo texturizador",
      kind: "Volumen · Textura · Control",
      text: "El aliado perfecto para un look con más actitud.",
      specs: ["Volumen natural", "Textura mate", "Fijación fuerte"],
      price: "[$XX.XXX]",
      image: "/productos/polvo-texturizador.jpg",
    },
    {
      id: "agua-marina",
      name: "Agua Marina",
      kind: "Sea salt spray · Texturizador de sal marina",
      text: "Textura, volumen y movimiento natural. Con romero, argán y provitamina B5.",
      specs: ["Efecto playero", "Acabado natural", "Para peinados texturizados"],
      price: "[$XX.XXX]",
      image: "/productos/agua-marina.jpg",
    },
    {
      id: "cera-mate",
      name: "Cera mate",
      kind: "Fijación media · Acabado natural",
      text: "Estilo natural todo el día, sin brillo. 100 g.",
      specs: ["Fijación media", "Sin brillo", "Textura flexible"],
      price: "[$XX.XXX]",
      image: "/productos/cera-mate.jpg",
    },
    {
      id: "crema-rizos",
      name: "Crema de peinar rizos",
      kind: "2 en 1 · Crema de peinar y acondicionador",
      text: "Hidratación, definición y fuerza. Almendra, romero, ricino, ortiga, jojoba y argán.",
      specs: ["Apto vegano", "Libre de parabenos", "Apto cowash"],
      price: "[$XX.XXX]",
      image: "/productos/crema-rizos.jpg",
    },
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
  lead: "Así se aprende con Agus: en la silla, en vivo y en comunidad.",
  // Solo testimonios reales y con permiso. Hasta tenerlos quedan entre corchetes.
  video: { src: "/alumnos/bauti.mp4", poster: "/alumnos/bauti.jpg", name: "Bauti", role: "Alumno de la academia" },
  items: [
    { name: "Bauti", city: "Alumno de la academia", text: "Arranqué hace dos semanas y estoy cortando de lo mejor. La verdad, me está saliendo todo." },
    ...[2, 3].map((i) => ({ name: `[Alumno ${i}]`, city: "[Ciudad]", text: "[Testimonio real, con permiso del alumno.]" })),
  ],
  // Fotos reales de seminarios, del portfolio de Agus.
  photos: [
    { src: "/portfolio/p08.jpeg", w: 1365, h: 2048, n: "S1", name: "Demostración en vivo" },
    { src: "/portfolio/p06.jpeg", w: 1152, h: 1536, n: "S2", name: "Seminario" },
  ],
};

export const enrollment = {
  title: "Inscripción.",
  priceNow: "[$XX.XXX]",
  priceBefore: "[$XX.XXX]",
  includesLabel: "Qué incluye",
  guarantee: "[Garantía a confirmar: días y condiciones.]",
  payment: "[Pago con Mercado Pago: a confirmar.]",
  cta: "Inscribirme ahora",
};

export const faq = {
  title: "Preguntas.",
  more: "¿Otra duda? Escribile a Agus",
  items: [
    { q: "¿Necesito experiencia previa?", a: "[Respuesta a confirmar con Agus.]" },
    { q: "¿Qué herramientas necesito?", a: "[Lista mínima de herramientas.]" },
    { q: "¿Cuánto tiempo tengo acceso?", a: "[De por vida / plazo a confirmar.]" },
    { q: "¿Cómo se paga?", a: "[Mercado Pago, cuotas: a confirmar.]" },
    { q: "¿Lo puedo ver desde el celular?", a: "Sí, las clases se ven desde cualquier dispositivo con internet." },
    { q: "¿Hay garantía?", a: "[A confirmar.]" },
  ],
};
