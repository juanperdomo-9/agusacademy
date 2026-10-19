// Escena 3D del hero: monograma AM metálico en 3 piezas + pelitos cortados y polvo en suspensión.
// Se carga con import() diferido (ver HeroStage), así three.js no pesa en la carga inicial.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { MONOGRAM_POLYS, MONOGRAM_ASPECT, MONOGRAM_AWAY } from "@/lib/monogram";

export type SceneFrame = {
  t: number; intro: number; open: number; merge: number; fade: number;
  tiltX: number; tiltY: number;
  narrow: boolean;
  end: { x: number; y: number; h: number }; // logo de la cabecera, en px de pantalla
};

export function createMonogramScene(canvas: HTMLCanvasElement, narrow: boolean) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !narrow, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, narrow ? 1 : 1.25));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0f0f0e, 4.2, 9); // lo del fondo se apaga: da profundidad
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0, 6);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  const key = new THREE.DirectionalLight(0xffffff, 2);
  key.position.set(2, 3, 4);
  scene.add(key);

  const metal = new THREE.MeshPhysicalMaterial({ color: 0xeceae4, metalness: 1, roughness: 0.28, clearcoat: 0.5, clearcoatRoughness: 0.3, fog: false });
  const group = new THREE.Group();
  scene.add(group);
  const pieces = MONOGRAM_POLYS.map((poly) => {
    const shape = new THREE.Shape(poly.map(([x, y]) => new THREE.Vector2(x, y)));
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.016, bevelSize: 0.01, bevelSegments: 3, curveSegments: 1 });
    geo.computeBoundingBox();
    const c = new THREE.Vector3();
    geo.boundingBox!.getCenter(c);
    geo.translate(-c.x, -c.y, -c.z);
    const mesh = new THREE.Mesh(geo, metal);
    const home = new THREE.Vector3(c.x, c.y, 0);
    mesh.position.copy(home);
    group.add(mesh);
    return { mesh, geo, home };
  });

  // Fondo vivo: pelitos cortados (curvas de 3 tramos) y polvo. Menos cantidad en celular.
  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  const HAIRS = narrow ? 100 : 220, DUST = narrow ? 150 : 360, SEG = 3;
  const hairPos = new Float32Array(HAIRS * SEG * 6);
  const hairBase = Array.from({ length: HAIRS }, () => {
    const len = rand(0.05, 0.16), ang = rand(0, Math.PI * 2), bend = rand(-1.4, 1.4), tilt = rand(-0.6, 0.6);
    const pts: [number, number, number][] = [];
    for (let j = 0; j <= SEG; j++) {
      const u = j / SEG, a = ang + bend * u;
      pts.push([Math.cos(a) * len * u, Math.sin(a) * len * u, tilt * len * u]);
    }
    return { x: rand(-3.4, 3.4), y: rand(-2.3, 2.3), z: rand(-3, 1.6), pts, vy: rand(0.03, 0.1), sway: rand(0.2, 0.8), spin: rand(-0.4, 0.4), ph: rand(0, 6.28) };
  });
  const hairGeo = new THREE.BufferGeometry();
  hairGeo.setAttribute("position", new THREE.BufferAttribute(hairPos, 3));
  const hairMat = new THREE.LineBasicMaterial({ color: 0xe4e1da, transparent: true, opacity: 0.7, depthWrite: false });
  const dustPos = new Float32Array(DUST * 3);
  const dustBase = Array.from({ length: DUST }, () => ({ x: rand(-3.5, 3.5), y: rand(-2.4, 2.4), z: rand(-3, 1.5), vy: rand(0.01, 0.05), ph: rand(0, 6.28) }));
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({ color: 0xeceae4, size: 0.012, sizeAttenuation: true, transparent: true, opacity: 0.5, depthWrite: false });
  const atmosphere = new THREE.Group();
  atmosphere.add(new THREE.LineSegments(hairGeo, hairMat), new THREE.Points(dustGeo, dustMat));
  scene.add(atmosphere);

  let visW = 1, visH = 1, base = 1;
  function resize(w: number, h: number) {
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    visW = visH * camera.aspect;
    base = Math.min(visH * 0.68, (visW * 0.8) / MONOGRAM_ASPECT);
  }

  const wrap = (v: number) => (((v + 2.4) % 4.8) + 4.8) % 4.8 - 2.4;
  function render(f: SceneFrame) {
    const w = window.innerWidth, h = window.innerHeight;
    const endX = (f.end.x / w - 0.5) * visW;
    const endY = -(f.end.y / h - 0.5) * visH;
    const endS = (f.end.h / h) * visH;
    const startS = base * (0.82 + 0.18 * f.intro);
    group.scale.setScalar(startS + (endS - startS) * f.merge);
    group.position.set(endX * f.merge, (0.08 * (1 - f.open) + Math.sin(f.t * 1.1) * 0.03) * (1 - f.merge) + endY * f.merge, 0);
    // En celular el texto ocupa la mitad de abajo: separado, el monograma sube y se achica para no taparlo.
    if (f.narrow) {
      group.scale.multiplyScalar(1 - 0.38 * f.open);
      group.position.y += 0.85 * f.open;
    }
    group.rotation.set(f.tiltX * (1 - f.merge), (f.tiltY + Math.sin(f.t * 0.5) * 0.06) * (1 - f.merge) + (1 - f.intro) * -1.4, 0);

    pieces.forEach((pc, i) => {
      const a = MONOGRAM_AWAY[i];
      // En celular la separación es más corta y el corte del medio sube en vez de bajar al botón.
      const sx = f.narrow ? 0.42 : 1, py = f.narrow && i === 2 ? 0.62 : a.p[1], sz = f.narrow ? 0.5 : 1;
      pc.mesh.position.set(pc.home.x + a.p[0] * sx * f.open, pc.home.y + py * f.open, a.p[2] * sz * f.open);
      pc.mesh.rotation.set(a.r[0] * f.open + Math.sin(f.t * 0.8 + i) * 0.05 * f.open, a.r[1] * f.open, a.r[2] * f.open);
    });

    atmosphere.rotation.set(f.tiltX * 0.25, f.tiltY * 0.35, 0);
    const burst = 1 + f.open * 1.1; // al separarse el monograma, todo se abre hacia afuera
    for (let i = 0; i < HAIRS; i++) {
      const hb = hairBase[i];
      const y = wrap(hb.y - f.t * hb.vy), x = hb.x + Math.sin(f.t * hb.sway + hb.ph) * 0.08;
      const c = Math.cos(f.t * hb.spin), s = Math.sin(f.t * hb.spin);
      for (let j = 0; j < SEG; j++) {
        const p0 = hb.pts[j], p1 = hb.pts[j + 1], k = (i * SEG + j) * 6;
        hairPos[k] = (x + p0[0] * c - p0[1] * s) * burst;
        hairPos[k + 1] = (y + p0[0] * s + p0[1] * c) * burst;
        hairPos[k + 2] = hb.z + p0[2];
        hairPos[k + 3] = (x + p1[0] * c - p1[1] * s) * burst;
        hairPos[k + 4] = (y + p1[0] * s + p1[1] * c) * burst;
        hairPos[k + 5] = hb.z + p1[2];
      }
    }
    hairGeo.attributes.position.needsUpdate = true;
    for (let i = 0; i < DUST; i++) {
      const d = dustBase[i], k = i * 3;
      dustPos[k] = (d.x + Math.sin(f.t * 0.3 + d.ph) * 0.05) * burst;
      dustPos[k + 1] = wrap(d.y + f.t * d.vy) * burst;
      dustPos[k + 2] = d.z;
    }
    dustGeo.attributes.position.needsUpdate = true;
    hairMat.opacity = 0.7 * f.fade;
    dustMat.opacity = 0.5 * f.fade;
    renderer.render(scene, camera);
  }

  function dispose() {
    pieces.forEach((p) => p.geo.dispose());
    hairGeo.dispose(); dustGeo.dispose();
    metal.dispose(); hairMat.dispose(); dustMat.dispose();
    envTex.dispose(); pmrem.dispose();
    renderer.dispose();
  }

  return { resize, render, dispose };
}
