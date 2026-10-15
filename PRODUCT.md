# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), deploy en Netlify (plan gratuito permite uso comercial; el Hobby de Vercel no).
Fase actual: solo la landing de venta. Fase posterior: área de alumnos en la misma web (login, pago, acceso a clases).
- Pagos: Mercado Pago (a confirmar; el usuario dijo "o después lo decidimos").
- Clases: videos subidos a YouTube y embebidos en el área de alumnos. Ojo: un video "Privado" de YouTube no se puede embeber para terceros; tiene que ser "No listado", y un link no listado se puede compartir fuera de la web. Decisión aceptada por el cliente; revisar si la piratería se vuelve un problema.
- Login/base de datos: Supabase propuesto para la fase del área de alumnos, no confirmado.

## Users

Aspirantes a barberos hispanohablantes: personas que están empezando o que cortan de forma amateur y quieren aprender técnica en serio para vivir del oficio. Llegan casi siempre desde Instagram (link en bio, reels, anuncios), mayormente en el celular, y deciden la compra en una sola visita.

## Product Purpose

Agus Martin Academy vende un curso online de barbería de Agus Martin. La web existe para convertir a la persona que llega desde redes en alumna: entender qué va a aprender, confiar en quien enseña y comprar. Éxito = ventas del curso.

## Positioning

La enseñanza la da Agus Martin, barbero en actividad, con su propio trabajo como prueba. (El diferencial concreto frente a otras academias está por confirmar con Agus; ver el documento «Pedido para Agus» (https://claude.ai/artifact/XpT7TNBbALuWApiGaPz6jL).)

## Operating Context

- Tráfico desde Instagram, alta proporción mobile.
- Venta de un único curso online grabado, con precio único (placeholder hasta confirmar).
- Mecánica de urgencia confirmada como deseada: contador regresivo de oferta (tomado de la referencia erickgomezacademy.com/eliteacademyclub).
- Estructura de venta de referencia que el cliente valoró: urgencia + contador → promesa → prueba social → módulos → bonus → resumen de valor + precio → garantía → historia del fundador → CTA repetido.

## Capabilities and Constraints

- Un curso principal. Nombre, precio, moneda, módulos y bonus: **sin definir — usar placeholders claramente marcados**.
- Checkout: Mercado Pago tentativo; los botones de compra pueden apuntar a un link placeholder.
- El contador debe ser honesto o configurable (fecha de fin real), no un reloj que se reinicia en cada visita.
- La garantía (días de devolución) está sin definir: no afirmar una hasta confirmar.

## Brand Commitments

- Nombre: **Agus Martin Academy**.
- Rubro: barbería / cursos.
- Idioma: español. Voseo rioplatense inferido del cliente; confirmar con Agus.
- Personalidad pedida por el cliente: minimalista, blanco y negro, muy diseñada, con video, moderna, nivel Awwwards, que no parezca hecha con IA.
- Referencia explícita de lo que NO se quiere: el diseño de erickgomezacademy.com ("horrible"). Se toma solo la estrategia de venta y el contador.
- Existe logo/identidad (pendiente de recibir).

## Evidence on Hand

Público y verificable en https://www.instagram.com/agusmartiin_/ (visto el 2026-10-15), a confirmar con Agus antes de usarlo como claim:
- Cuenta verificada, 15,8 mil seguidores. Bio: «Cortador de cabello · Formador - Seminarista», Argentina, CEO de @inspirationmen_ (Academia Inspiration Men).
- Gira de seminarios «Agus Martin Events 2025/2026» por 13 ciudades/provincias (Tres Arroyos, Corrientes, San Juan, Córdoba, Jujuy, Salta, Rosario, Saladillo, Tucumán, Formosa, La Pampa, Neuquén, Río Negro); el afiche marca 2026 como «sold out».
- Contenido sobre X-Tech (máquinas): posible sponsor, sin confirmar.
- El link de la bio apunta a agus-martin-academy.myshopify.com: **ya existe una tienda Shopify**, que el 2026-10-15 responde «Tienda no disponible» (HTTP 402, posiblemente dada de baja). Pendiente: confirmar si la nueva web la reemplaza.
- Logo recibido en el chat: monograma «AM» plateado sobre negro con «AGUS MARTÍN / ACADEMY» en mayúsculas anchas (falta el archivo original).
- Fotos provisorias en `public/provisorio/` (origen en `ORIGEN.md`).

- Existen videos de cortes/clases, fotos profesionales y logo; todavía no están en el proyecto. Fuente provisoria: el Instagram de Agus (handle pendiente). Material definitivo se pide con el documento «Pedido para Agus» (https://claude.ai/artifact/XpT7TNBbALuWApiGaPz6jL).
- **No hay** testimonios reales, cantidad de alumnos, seguidores, años de experiencia ni historia de Agus confirmados. No inventar cifras, reseñas, calificaciones ni alumnos: usar placeholders visibles hasta tenerlos.

## Product Principles

1. Vender un solo curso con claridad: todo en la página empuja a una decisión.
2. El trabajo de Agus es la prueba: el video de cortes reales vale más que cualquier adjetivo.
3. Urgencia honesta: el contador y las ofertas tienen que ser reales.
4. Mobile primero: la mayoría llega desde Instagram en el celular.
5. Nada inventado: cada número, testimonio y promesa debe poder respaldarse.

## Accessibility & Inclusion

Sin requisito específico confirmado. Base: WCAG 2.2 AA, subtítulos o texto alternativo en los videos con voz, y respetar `prefers-reduced-motion` en las animaciones.
