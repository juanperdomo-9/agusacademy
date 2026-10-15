---
name: Agus Martín Academy
description: Escuela de barbería de Agus Martín. Editorial oscura en carbón, hueso y plata, con el método presentado como colección numerada.
colors:
  coal: "#0F0F0E"
  coal-raised: "#1C1C1A"
  bone: "#ECEAE4"
  silver: "#A7A6A1"
  ash: "#5E5E5B"
  rule-dark: "#2E2E2B"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 5.2vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 125"
  number:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 4rem)"
    fontWeight: 500
    lineHeight: 0.9
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.04em"
    fontVariation: "'wdth' 115"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.24em"
    fontVariation: "'wdth' 125"
rounded:
  none: "0px"
  piece: "4px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "24": "96px"
  "32": "128px"
  "40": "160px"
components:
  button-primary:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.coal}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "22px 36px"
  button-primary-hover:
    backgroundColor: "{colors.coal}"
    textColor: "{colors.bone}"
  button-on-bone:
    backgroundColor: "{colors.coal}"
    textColor: "{colors.bone}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "22px 36px"
  piece:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.coal}"
    rounded: "{rounded.piece}"
    padding: "10px"
  slot:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.coal}"
    typography: "{typography.number}"
    rounded: "{rounded.none}"
  method-spread:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.coal}"
    padding: "48px"
  enrollment-block:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.coal}"
    padding: "64px"
---

# Design System: Agus Martín Academy

> Estado: **semilla** (pre-implementación). Revisado el 2026-10-15 tras ver el logo y el Instagram de Agus: base oscura y tipografía ancha. Al terminar la landing se re-documenta desde lo construido.

## Overview

**Creative North Star: "El Método Numerado"**

Una web editorial oscura, como el logo: fondo carbón, letras hueso y detalles plateados. Tiene la sobriedad de una marca de moda, el ritmo de una plataforma de cursos (MasterClass como referencia de venta) y la precisión de un manual técnico. Todo está numerado: Agus es la pieza 00 y los módulos van del 01 al 06. Esa numeración es el índice del sitio.

La tipografía conversa con el logo: mayúsculas anchas y espaciadas para titulares, rótulos con mucho tracking como el «ACADEMY» del logo, y una lectura tranquila en ancho normal.

El único momento lúdico es la **sección del curso**: una doble página de papel hueso apoyada sobre la mesa carbón, con seis casilleros donde cada módulo cae y se pega al scrollear. Es un guiño al álbum de figuritas, pero el texto nunca lo nombra.

La prueba es el trabajo: fotos y video en blanco y negro con contraste suave (nunca negro puro aplastado) de Agus cortando y de sus cortes.

Se rechaza explícitamente: el diseño de la referencia (erickgomezacademy.com), el hero de barbería con dorado, poste o neón, las tarjetas genéricas con íconos, el negro puro con blanco puro (demasiado duro) y cualquier palabra de juego en el copy («figuritas», «sobre», «álbum»).

**Key Characteristics:**
- Base carbón (#0F0F0E), texto hueso (#ECEAE4) y plata (#A7A6A1) para lo secundario. Nunca #000 ni #FFF.
- Una sola familia (Archivo), ancha para mostrar y normal para leer, en diálogo con el logo.
- La pieza numerada con borde hueso, como una copia fotográfica, es la unidad visual.
- Inversión como jerarquía: lo más importante (el curso y la inscripción) aparece sobre papel hueso.
- Movimiento por pasos: las cosas caen y se asientan una vez; nunca flotan.

## Colors

Monocromo suave: carbón, hueso y plata, tomados del logo plateado sobre negro.

### Primary
- **Hueso** (#ECEAE4): texto principal sobre carbón, borde de las piezas, botón principal, y papel de la sección del curso y del bloque de inscripción.

### Neutral
- **Carbón** (#0F0F0E): fondo general del sitio y texto sobre hueso.
- **Carbón Alto** (#1C1C1A): bloques elevados sobre el fondo (barra móvil, preguntas abiertas, cabecera al scrollear).
- **Plata** (#A7A6A1): texto secundario, rótulos y líneas sobre carbón. Contraste 7.9:1 sobre carbón.
- **Ceniza** (#5E5E5B): texto secundario sobre hueso (5.1:1).
- **Línea Oscura** (#2E2E2B): separadores finos sobre carbón.

### Named Rules
**La Regla del Monocromo Suave.** No hay negro ni blanco puros, y tampoco color. Si algo necesita destacar, se invierte a papel hueso; no se tiñe.

**La Regla del Revelado Único.** Toda foto y todo video pasan por el mismo revelado: escala de grises, contraste suave, negros levantados al carbón y un grano fino. Nada a color, ni en hover.

## Typography

**Display Font:** Archivo variable en ancho expandido (wdth 125), con Arial de respaldo
**Body Font:** Archivo en ancho normal
**Label Font:** Archivo expandido con tracking amplio, en mayúsculas

**Character:** Mayúsculas anchas, firmes y espaciadas, de la misma familia visual que el logo «AGUS MARTÍN / ACADEMY». Premium antes que gritón.

### Hierarchy
- **Display** (600, ancho 125, clamp(2.25rem, 5.2vw, 5.5rem), interlineado 1, tracking 0.01em): titular de cada sección, en mayúsculas y con 6 palabras como máximo.
- **Headline** (600, ancho 125, clamp(1.75rem, 3vw, 2.75rem), 1.05): subtítulos.
- **Number** (500, ancho 125, tabular, clamp(2.25rem, 4vw, 4rem), 0.9): números de pieza y casillero, y dígitos del contador.
- **Title** (600, ancho 115, 1.125rem, tracking 0.04em, MAYÚSCULAS): nombres de módulo y botones.
- **Body** (400, ancho 100, 1.0625rem, 1.6): lectura, con 62ch como máximo.
- **Label** (500, ancho 125, 0.8125rem, tracking 0.24em, MAYÚSCULAS): solo rótulos de **hasta 3 palabras** (marca, índice, nombre de módulo o técnica, unidades del contador), como el «ACADEMY» del logo.
- **Note** (400, ancho 100, 0.9375rem, 1.45): toda frase corta de más de 3 palabras (rótulo del contador, datos de la oferta, pies descriptivos, links secundarios, sello del curso). En caja normal, nunca en mayúsculas espaciadas.

### Named Rules
**La Regla de las Tres Palabras.** Las mayúsculas anchas y espaciadas son la voz del logo y se gastan rápido: si un rótulo tiene más de tres palabras, va como Note. Ningún texto que se lee baja de 13px.

**La Regla de la Voz Única.** Archivo es la única familia del sitio. La jerarquía se arma con ancho, peso, tamaño y tracking.

**La Regla del Titular Cortado.** El titular del hero entra una sola vez, revelado de abajo hacia arriba por una pasada horizontal, como la de una máquina.

## Layout

- **Modelo general: editorial oscuro.** Secciones a todo el ancho sobre carbón, con margen lateral de clamp(16px, 4vw, 56px) y una grilla de 12 columnas en desktop. La cabecera fija lleva el monograma y la marca a la izquierda, y el índice «02 / 08» con el botón a la derecha.
- **Sección del curso: el álbum.** Doble página de papel hueso con pliegue central sobre la mesa carbón en desktop (≥1024px). La página izquierda lleva el método y la derecha los seis casilleros (3×2). En tablet y mobile se ve una página por vez, con los casilleros en 2 columnas.
- **Inscripción:** un bloque de papel hueso a todo el ancho, como una ficha.
- **Mobile (<768px):** una columna, 16px de margen, botón visible sin scroll en la primera pantalla y repetido como barra inferior fija después del hero.
- **Ritmo:** base de 4px. Dentro de una sección se usa 24/32/48; entre secciones 96–160. Siempre hay más aire arriba de un titular que abajo.
- **Sin superposiciones en desktop y tablet:** el titular nunca cruza la foto, porque sobre una foto gris queda ilegible. Solo en el celular el titular se apoya sobre el borde inferior de la foto, con un velo carbón detrás para que se lea.

## Elevation & Depth

Plano por defecto. La profundidad es exclusiva de los objetos físicos: las piezas (copias fotográficas con borde hueso) y la doble página del curso. Sobre carbón, las sombras son profundas y suaves.

### Shadow Vocabulary
- **Pieza** (`box-shadow: 0 2px 0 rgba(0,0,0,.6), 0 24px 48px -20px rgba(0,0,0,.8)`): toda pieza en reposo.
- **Pieza en el aire** (`box-shadow: 0 40px 70px -24px rgba(0,0,0,.85)`): solo mientras cae al casillero.
- **Papel sobre mesa** (`box-shadow: 0 2px 0 rgba(0,0,0,.5), 0 50px 90px -40px rgba(0,0,0,.9)`): la doble página del curso.
- **Pliegue** (`linear-gradient(90deg, transparent, rgba(15,15,14,.10) 48%, rgba(15,15,14,.22) 50%, rgba(15,15,14,.10) 52%, transparent)`, 28px): la costura de la doble página.

### Named Rules
**La Regla del Papel Plano.** Ningún botón, texto, caja ni sección lleva sombra. Solo los objetos físicos la tienen.

## Shapes

- **Ángulos rectos** en todo: secciones, casilleros, botones y el bloque de inscripción.
- **Piezas:** esquinas de 4px, borde hueso de 10px (6px en mobile) y el número en el pie.
- **Casilleros (solo en el curso):** borde punteado de 1.5px en carbón sobre papel hueso, con el número centrado.
- **Rotación:** solo las piezas pegadas en el curso se inclinan, entre −2° y 2°.
- **Logo:** se usa el archivo real, nunca redibujado (`public/brand/`). Hay versiones con fondo transparente derivadas del original: `monograma-hueso.png` en la cabecera (28px de alto), `logo-hueso.png` en el pie, y `monograma-carbon.png` como marca de agua al 6% de opacidad, grande y recortada, en el bloque de inscripción.

## Components

### Pieza
Copia fotográfica: borde hueso, imagen en blanco y negro, número abajo a la derecha en Number y nombre en Label. Tiene **dos vistas registradas del mismo corte**: el proceso en reposo y el terminado al pasar el cursor o tocarla. La pieza 00 es Agus.

### Casillero (sección del curso)
Borde punteado, número grande y nombre del módulo en Label. Vacío hasta que llega su pieza. La pieza que se pega es una copia **carbón sobre el papel hueso** (marco Carbón Alto, foto B&N con grano y pie en Label hueso), inclinada entre −2° y 2°. Sin foto, la pieza muestra su número grande en Ceniza: tipográfica, nunca un texto de «pendiente».

### Índice y sello del curso
La página izquierda lista los seis módulos (número, nombre y detalle). Cada fila pasa de Ceniza a Carbón cuando su pieza llega. Al pie de la página derecha, un sello punteado dice «Faltan N módulos para el certificado» y, al completar los seis, se rellena en carbón: «Método completo · Certificado».

### Quién te enseña y «De gira»
Foto de Agus en escenario como pieza grande (6 columnas) junto a su historia y su frase. La frase va a 22–32px en mayúsculas anchas, máximo 24 caracteres por línea. Debajo, «De gira» convierte el afiche real de su gira en página: las 13 ciudades corren como un bloque de Display ancho, separadas por puntos en Ceniza y entrando una por una. Los datos acompañan como número en Headline más una Note, nunca como tarjetas de métricas.

### Certificado (Extras)
Objeto central de «Lo que te llevás»: una hoja de papel hueso apaisada (1.414:1), inclinada −1.2°, con sombra de papel sobre la mesa y un marco interior de 1.5px en carbón. Lleva el monograma con «Agus Martín Academy», el rótulo «Certificado de finalización», el nombre en Display ancho sobre una línea de firma, una frase del método, la firma de Agus y un sello circular carbón «Método completo», girado −8°. **Cosa viva:** debajo, el campo «Probá con tu nombre» escribe en el certificado mientras tipeás. El nombre se achica midiendo su ancho real hasta entrar en una línea; en celular puede ocupar dos. Los extras van a la izquierda como filas de texto (Title + Body en Plata), nunca como tarjetas con imagen.

### Productos (Forma Essent)
Reemplaza a la clase de muestra. Cuatro fichas en una fila con escalón (las pares bajan 48px): pieza 4:5 con la foto del envase en blanco y negro sobre carbón (generada desde los afiches, ver `public/productos/ORIGEN.md`), nombre en Title, tipo y atributos en Note Plata, frase en Body, y al pie el precio en Headline con un botón fantasma pequeño «Comprar». Hover con mouse: la pieza sube 6px y la foto se acerca 4%.

### Alumnos, Inscripción, Preguntas y pie
- **Alumnos:** testimonios (solo reales, en mayúsculas anchas a tamaño de lectura) junto a dos fotos reales de seminarios superpuestas como copias apoyadas.
- **Inscripción:** ficha en papel hueso; precio en display ancho (hasta 7.5rem), lista numerada de lo que incluye, botón carbón a todo el ancho, garantía y forma de pago en Note.
- **Preguntas:** título fijo a la izquierda con link a Instagram; acordeón a la derecha.
- **Pie:** logo, navegación (curso, productos, portfolio, Instagram), «Agus Martín» a todo el ancho (10vw) y línea legal.

### Botón principal
Rectángulo hueso con texto carbón en Title («Inscribirme») y borde real de 1px del mismo color (nunca una sombra interna). Hover: se invierte a carbón y el borde hueso queda como contorno, en 180ms. Focus: contorno hueso de 2px separado 3px. Sobre papel hueso se usa la variante carbón. Siempre va acompañado de la línea de datos fijos de la oferta.

### Contador («El precio de lanzamiento termina en»)
Cuatro grupos en Number tabular, con rótulos en Label plata. Cada dígito cambia con un paso vertical entero y un asentamiento corto. Lee una fecha de cierre real y configurable, y al vencer muestra «Cerrado».

### Bloque de inscripción
Papel hueso a todo el ancho con texto carbón: precio en Display, los datos fijos en lista numerada, garantía (cuando esté confirmada), contador y botón carbón.

### Cabecera e índice
Fondo carbón transparente arriba, que pasa a Carbón Alto al scrollear. Monograma y marca a la izquierda, e índice «0X / 08» con el botón a la derecha.

### Motion
- **Curvas (tokens en `:root`):** `--ease-out` cubic-bezier(0.23, 1, 0.32, 1) para todo lo de interfaz; `--ease-in-out` cubic-bezier(0.77, 0, 0.175, 1) para movimiento en pantalla; `--ease-settle` cubic-bezier(0.3, 1.3, 0.5, 1) para el paso con asentamiento (dígitos, piezas que caen, sello). Duraciones: `--t-press` 120ms (presionar), `--t-hover` 280ms (relleno de botones), 200ms (dígito del contador), 200/260ms (cabecera que aparece/se esconde), 600ms (pieza que cae).
- **Botones:** el texto usa `mix-blend-mode: difference` con color #FBF9F2 (hueso + carbón), así se invierte exactamente en el borde del relleno. El relleno solo se activa con mouse (`hover: hover` y `pointer: fine`).
- **Firma: «Completar el método».** En desktop, la sección del curso mide 100vh + 6×38vh y la doble página queda fija: el scroll reparte los seis módulos, que caen desde arriba girando, pasan apenas y se asientan (600ms). Si se vuelve hacia arriba, se despegan. En tablet y celular, cada pieza cae cuando su casillero entra al 80% de la pantalla. El indicador «Módulos N/6» y el índice acompañan. Sin JS o con movimiento reducido, todas las piezas aparecen pegadas.
- **Scroll suave:** Lenis (lerp 0.1). Los anclajes compensan la cabecera.
- **Pasada en titulares:** todo titular Display fuera del hero entra una sola vez con la pasada de máquina (se revela de abajo hacia arriba con una línea fina) cuando su contenedor asoma.
- **Entradas en cascada:** textos, piezas, filas y ciudades suben 28px y aparecen, con 70ms entre elementos de una misma sección (máximo 8 escalones). Se usa la propiedad `translate`, para no pisar las rotaciones de las piezas. Se dispara al comprobar la posición en cada movimiento de scroll, no con IntersectionObserver, que falla con elementos recortados y en scrolls rápidos.
- **Parallax:** las fotos de las piezas (hero, galería, Agus) se desplazan a velocidades distintas (0.04–0.09) dentro de su marco, con escala 1.12 para que nunca se vea el borde. El hero entra con un zoom suave de 1.8s.
- **Botones:** el relleno se desliza de izquierda a derecha al pasar el mouse (460ms) y el botón se achica apenas al presionarlo.
- **Cabecera:** se esconde al bajar (después de 240px) y vuelve al subir.
- `prefers-reduced-motion`: sin Lenis, sin entradas, sin parallax ni zoom; piezas ya colocadas, titular sin pasada, dígitos sin animación y videos en pausa. Sin JS, todo se ve.

## Do's and Don'ts

**Do**
- Escribir «Agus Martín» con tilde, como en el logo.
- Numerar todo en secuencia (pieza 00, módulos 01–06, índice).
- Mostrar a Agus cortando: la foto y el video son la prueba.
- Usar datos públicos verificables (seminarios por provincias, seguidores) solo con su fuente y confirmados por Agus.
- Dejar visibles los placeholders mientras falten datos reales.

**Don't**
- No usar #000 ni #FFF puros, ni ningún color.
- No usar palabras de juego en el copy.
- No llevar el papel hueso fuera del curso y de la inscripción.
- No hacer tarjetas genéricas con íconos.
- No inventar alumnos, reseñas, estrellas, cifras ni garantías.
- No redibujar el logo: se usa el archivo original.
