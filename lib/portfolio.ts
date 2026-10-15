// Contenido del portfolio de Agus Martín, tomado de «Portafolio_Agus_Martin_Barber_Artist_v2.pdf».
// Los títulos se muestran en mayúsculas por CSS; acá van en caja normal.
// Fotos extraídas del PDF en /public/portfolio (p01–p11).

export type Chapter = {
  n: string;
  label: string;
  title: string;
  body: string[];
  tags?: string[];
  quote?: string;
  image: { src: string; w: number; h: number; alt: string };
  // Composición: foto a la derecha, a la izquierda, o ancha debajo del texto.
  layout: "right" | "left" | "wide";
};

export const portfolioHero = {
  label: "Portafolio personal / 2026",
  name: "Agus Martín",
  roles: ["Barber artist", "Educator", "Brand builder"],
  place: "La Plata, Argentina — Visión internacional",
  image: { src: "/portfolio/p01.jpeg", w: 1364, h: 2049, alt: "Agus Martín con credencial de educador" },
};

export const chapters: Chapter[] = [
  {
    n: "02", label: "Mi arte", title: "Precisión. Estilo. Identidad.",
    body: [
      "Un corte también comunica. En cada trabajo busco combinar técnica, atención al detalle y una mirada propia, respetando la identidad de cada persona.",
      "La técnica se construye con práctica, observación y evolución constante.",
    ],
    tags: ["Taper fade", "Máquina y tijera", "Asesoría de imagen"],
    image: { src: "/portfolio/p02.jpeg", w: 941, h: 1672, alt: "Corte texturizado con detalle de color" },
    layout: "right",
  },
  {
    n: "03", label: "Identidad y oficio", title: "Más que un corte.",
    body: [
      "Me interesa el corte como una forma de expresión: técnica, personalidad y atención al detalle. Busco que cada trabajo acompañe la identidad de la persona.",
      "Más de diez años de recorrido me enseñaron que evolucionar también significa seguir aprendiendo.",
    ],
    tags: ["Taper fade", "Máquina y tijera", "Asesoría de imagen"],
    image: { src: "/portfolio/p03.jpeg", w: 1364, h: 2049, alt: "Agus Martín en un evento del sector" },
    layout: "left",
  },
  {
    n: "04", label: "Eventos y comunidad", title: "La barbería también une.",
    body: [
      "Los encuentros del sector son espacios para compartir conocimientos, conocer colegas y hacer crecer una comunidad que vive la barbería con pasión.",
    ],
    quote: "Cada evento representa una oportunidad para aprender, aportar y conectar con nuevas ideas.",
    image: { src: "/portfolio/p04.jpeg", w: 1536, h: 1024, alt: "Encuentro de barberos visto desde arriba" },
    layout: "wide",
  },
  {
    n: "05", label: "Conexiones", title: "Crecer con otros.",
    body: [
      "Creo en el valor de las relaciones genuinas: colegas, marcas, educadores y proyectos que comparten una mirada de evolución, creatividad y cultura.",
    ],
    tags: ["Colaboraciones", "Campañas", "Eventos", "Proyectos creativos"],
    image: { src: "/portfolio/p05.jpeg", w: 1178, h: 1178, alt: "Agus Martín con colegas en un evento" },
    layout: "right",
  },
  {
    n: "06", label: "Educación", title: "Compartir para crecer.",
    body: [
      "La formación es una parte importante de mi recorrido. Compartir técnica y experiencia permite que otros barberos desarrollen sus herramientas, su criterio y su propia identidad profesional.",
    ],
    tags: ["Formación", "Seminarios", "Desarrollo profesional"],
    image: { src: "/portfolio/p06.jpeg", w: 1152, h: 1536, alt: "Seminario nocturno con barberos alrededor" },
    layout: "left",
  },
  {
    n: "07", label: "Experiencia en la industria", title: "Un oficio que se comparte.",
    body: [
      "Participar de espacios colectivos me recuerda que la industria crece cuando hay intercambio, compromiso y ganas de elevar el nivel entre todos.",
    ],
    tags: ["Argentina", "Comunidad barbera"],
    image: { src: "/portfolio/p07.jpeg", w: 1536, h: 864, alt: "Estadio con cientos de barberos trabajando" },
    layout: "wide",
  },
  {
    n: "08", label: "Demostración y práctica", title: "La técnica en acción.",
    body: [
      "La práctica, la observación y el intercambio son parte del proceso. Cada instancia de trabajo deja aprendizajes que después se transforman en experiencia.",
    ],
    image: { src: "/portfolio/p08.jpeg", w: 1365, h: 2048, alt: "Agus Martín cortando durante una demostración" },
    layout: "right",
  },
  {
    n: "09", label: "Comunidad", title: "Personas, historias, oportunidades.",
    body: [
      "La barbería me permitió conocer personas, aprender de otros y construir vínculos que van más allá de un corte. Esa comunidad es parte esencial del camino.",
    ],
    image: { src: "/portfolio/p09.jpeg", w: 1536, h: 1536, alt: "Agus Martín con colegas en un encuentro" },
    layout: "left",
  },
  {
    n: "10", label: "Visión", title: "La próxima parada.",
    body: [
      "Quiero seguir creciendo, viajar, conectar con colegas de otros países y llevar mi trabajo a nuevos espacios. La visión es internacional, pero las raíces siguen estando en La Plata, Argentina.",
    ],
    quote: "Venimos al mundo para ser alguien, no para estar de paso.",
    image: { src: "/portfolio/p10.jpeg", w: 1152, h: 1536, alt: "Ciudad de noche desde la ventanilla de un avión" },
    layout: "right",
  },
  {
    n: "11", label: "Proyectos", title: "Inspiration Men.",
    body: [
      "Un proyecto que nace de una idea: la barbería puede ser mucho más que un servicio. Puede ser experiencia, identidad, comunidad y una plataforma para seguir creciendo.",
    ],
    tags: ["Salón", "Formación", "Creatividad", "Comunidad"],
    image: { src: "/portfolio/p11.png", w: 1254, h: 1254, alt: "Logo de Inspiration Men" },
    layout: "left",
  },
];

export const values = {
  n: "12",
  label: "Lo que me mueve",
  title: "Disciplina. Visión. Evolución.",
  items: [
    { name: "Disciplina", text: "La constancia sostiene el proceso." },
    { name: "Trabajo", text: "Cada etapa se construye con dedicación." },
    { name: "Creatividad", text: "Encontrar una identidad propia." },
    { name: "Comunidad", text: "Crecer compartiendo con otros." },
    { name: "Familia", text: "Las raíces que dan sentido al camino." },
  ],
  quote: "Ayer lo soñé. Hoy lo vivo. Y todavía queda mucho por construir.",
};

export const collab = {
  n: "13",
  label: "Colaboraciones",
  title: "Trabajemos juntos.",
  body: "Estoy abierto a conectar con marcas, organizadores, educadores y proyectos que compartan una visión de evolución, estilo y propósito.",
  buildLabel: "Qué podemos construir",
  build: ["Campañas y contenido", "Embajadorías", "Seminarios y eventos", "Formación", "Proyectos creativos"],
  name: "Agus Martín",
  role: "Barber artist",
  place: "La Plata, Argentina",
  // El PDF dice «@agusmartinn»; la cuenta real es @agusmartiin_ (confirmar con Agus).
  instagram: { handle: "@agusmartiin_", url: "https://www.instagram.com/agusmartiin_/" },
  // En el PDF figura como texto de plantilla: falta el dato real.
  contact: "[Contacto profesional: email o WhatsApp a confirmar]",
  closing: "La historia sigue.",
};
