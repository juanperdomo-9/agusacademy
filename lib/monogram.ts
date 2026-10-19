// Las 3 piezas del monograma AM, vectorizadas del logo original (public/brand/logo-original.png).
// Coordenadas normalizadas: alto total = 1, centradas en 0, eje Y hacia arriba.
// Orden: 0 = la A, 1 = la M, 2 = el corte del medio.
export const MONOGRAM_POLYS: [number, number][][] = [
  [[0.0086, 0.5], [0.0086, -0.4214], [-0.0897, -0.3329], [-0.0921, -0.0799], [-0.355, -0.0799], [-0.2887, -0.0086], [-0.0897, -0.0061], [-0.0921, 0.2568], [-0.4066, -0.0799], [-0.527, -0.0799]],
  [[0.527, 0.4337], [0.527, -0.3673], [0.4263, -0.2568], [0.4263, 0.1486], [0.414, 0.1413], [0.2248, -0.0676], [0.0528, 0.129], [0.0528, 0.2715], [0.2174, 0.0872]],
  [[0.0528, -0.0479], [0.1855, -0.5], [0.0528, -0.4165]],
];

export const MONOGRAM_ASPECT = 1.054;

// Hacia dónde viaja cada pieza al separarse (unidades de escena, rotación en radianes).
export const MONOGRAM_AWAY = [
  { p: [-1.05, 0.12, -0.6], r: [0.25, 0.9, 0.18] },
  { p: [1.0, -0.08, -0.4], r: [-0.2, -1.0, -0.12] },
  { p: [0.28, -0.55, 1.2], r: [1.2, 0.5, 0.8] },
] as const;
