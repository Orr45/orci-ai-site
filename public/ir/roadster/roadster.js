// "גונבים לביבי את הרודסטר" — a Subway-Surfers-style runner: 3 lanes on an Israeli road, swipe to dodge.
// One hit and the mayor's security SUVs are right behind you; a second hit within 6 seconds and they catch you.
import * as THREE from "three";
import { makeRoadster } from "/ir/roadster/car.js";
import * as sfx from "/ir/roadster/sfx.js";

const API = "https://orciai.vercel.app/api/site/game";
const TRACK = "https://orciai.vercel.app/api/site/track";
const KM_PER_UNIT = 0.025;                       // keeps a top run around 25–40 km, well under the server's 3.2 km/s
const LANES = [-1.25, 0, 1.25];
const $ = (id) => document.getElementById(id);
let CFG = { turbo: false };
try { CFG = { ...CFG, ...(await (await fetch("/ir/roadster/config.json", { cache: "no-cache" })).json()) }; } catch { /* defaults */ }

// ---------- scene ----------
const renderer = new THREE.WebGLRenderer({ canvas: $("gl"), antialias: true });
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
const scene = new THREE.Scene();
const SKY = 0xbfe3f2; scene.background = new THREE.Color(SKY); scene.fog = new THREE.Fog(SKY, 26, 70);
const camera = new THREE.PerspectiveCamera(62, 1, 0.05, 200);
scene.add(new THREE.HemisphereLight(0xffffff, 0xb9c49a, 2.3));
const sun = new THREE.DirectionalLight(0xfff4e0, 1.4); sun.position.set(-6, 12, 4); scene.add(sun);
const lam = (c, o = {}) => new THREE.MeshLambertMaterial({ color: c, flatShading: true, ...o });
const box = (w, h, d, c, x, y, z, p) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), typeof c === "number" ? lam(c) : c); m.position.set(x, y, z); p.add(m); return m; };
const cyl = (r1, r2, h, c, x, y, z, p, seg = 8) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg), lam(c)); m.position.set(x, y, z); p.add(m); return m; };
const ball = (r, c, x, y, z, p) => { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), lam(c)); m.position.set(x, y, z); p.add(m); return m; };
function textTex(text, { w = 512, h = 160, fs = 72, fg = "#ffffff", bg = "#0d7a3a", border = "#ffffff" } = {}) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const g = c.getContext("2d");
  g.fillStyle = bg; g.fillRect(0, 0, w, h); if (border) { g.lineWidth = 10; g.strokeStyle = border; g.strokeRect(12, 12, w - 24, h - 24); }
  g.fillStyle = fg; g.font = `900 ${fs}px Rubik, sans-serif`; g.textAlign = "center"; g.textBaseline = "middle"; g.direction = "rtl"; g.fillText(text, w / 2, h / 2 + 4);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return { t, draw: (s) => { g.fillStyle = bg; g.fillRect(0, 0, w, h); if (border) { g.lineWidth = 10; g.strokeStyle = border; g.strokeRect(12, 12, w - 24, h - 24); } g.fillStyle = fg; g.fillText(s, w / 2, h / 2 + 4); t.needsUpdate = true; } };
}

// ---------- the road: recycled chunks with Israeli streetscape ----------
const CH = 24, NCH = 6;
const STONE = [0xe8dcc4, 0xf2ead8, 0xdcc9a6, 0xf5f1e8, 0xe6d6b8];
const chunks = [];
function makeChunk() {
  const g = new THREE.Group();
  box(4.4, 0.1, CH, 0x3b3f46, 0, -0.05, 0, g);                                  // asphalt
  for (let z = -CH / 2 + 1; z < CH / 2; z += 3) { box(0.08, 0.02, 1.4, 0xffffff, -0.625, 0.01, z, g); box(0.08, 0.02, 1.4, 0xffffff, 0.625, 0.01, z, g); }
  [-1, 1].forEach((s) => {
    box(1.6, 0.18, CH, 0xcfd3d8, s * 3.0, 0.04, 0, g);                          // sidewalk
    for (let z = -CH / 2; z < CH / 2; z += 1) box(0.12, 0.2, 0.5, z % 2 ? 0xffffff : 0x1d1d1d, s * 2.22, 0.06, z + 0.25, g);   // red-white curb → black-white
    box(30, 0.05, CH, 0x8fd16a, s * 18.8, -0.04, 0, g);                         // grass beyond
  });
  g.userData.deco = new THREE.Group(); g.add(g.userData.deco);
  scene.add(g); return g;
}
function decorate(g, idx) {
  const d = g.userData.deco; d.clear();
  [-1, 1].forEach((s) => {
    for (let z = -CH / 2 + 2; z < CH / 2; z += 4.5 + Math.random() * 2) {
      const h = 2 + Math.random() * 4.5, w = 2.2 + Math.random() * 1.2, x = s * (4.9 + w / 2);
      const b = box(w, h, 3.4, STONE[(Math.random() * STONE.length) | 0], x, h / 2, z, d);
      for (let k = 1; k < h - 0.6; k += 1.2) box(0.04, 0.35, 2.6, 0x55606e, x - s * (w / 2 + 0.01), k, z, d);   // window rows
      if (Math.random() < 0.5) box(0.5, 0.06, 2.0, 0xffffff, x - s * (w / 2 + 0.25), Math.min(h - 0.4, 1.6), z, d); // balcony
      if (Math.random() < 0.35) { cyl(0.04, 0.05, 1.8, 0x8a6a42, s * 3.4, 1.0, z + 1.6, d, 5); for (let k = 0; k < 5; k++) { const l = cyl(0.0, 0.16, 0.9, 0x3f8f3a, s * 3.4, 1.9, z + 1.6, d, 4); l.rotation.set(1.1, (k / 5) * Math.PI * 2, 0); } }   // palm
    }
  });
  if (idx % 4 === 1) {                                                          // flag on a lamppost
    cyl(0.03, 0.03, 2.6, 0x9aa1ab, 2.6, 1.3, 0, d, 5);
    const f = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.6), new THREE.MeshLambertMaterial({ map: FLAG, side: THREE.DoubleSide })); f.position.set(2.15, 2.3, 0); f.rotation.y = Math.PI / 2; d.add(f);
  }
  if (idx % 5 === 3) {                                                          // bus stop
    box(1.0, 0.06, 2.0, 0x2f6fe0, -3.1, 1.25, 0, d); box(0.06, 1.2, 2.0, 0xb9d6f2, -3.55, 0.65, 0, d);
  }
}
const FLAG = (() => { const c = document.createElement("canvas"); c.width = 300; c.height = 200; const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, 300, 200); g.fillStyle = "#0038b8"; g.fillRect(0, 22, 300, 26); g.fillRect(0, 152, 300, 26);
  g.strokeStyle = "#0038b8"; g.lineWidth = 9; const tri = (r) => { g.beginPath(); for (let i = 0; i < 3; i++) { const a = r + (i * 2 * Math.PI) / 3; g.lineTo(150 + 38 * Math.sin(a), 100 - 38 * Math.cos(a)); } g.closePath(); g.stroke(); }; tri(0); tri(Math.PI);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
for (let i = 0; i < NCH; i++) { const c = makeChunk(); c.position.z = -i * CH; decorate(c, i); chunks.push(c); }

// green highway signs with the cities along the escape route
const ROUTE = ["ירושלים", "מבשרת ציון", "שער הגיא", "לטרון", "מודיעין", "בן שמן", "לוד", "תל אביב", "רמת השרון", "הרצליה", "נתניה", "חדרה", "קיסריה", "זכרון יעקב", "חיפה", "עכו", "נהריה", "ראש הנקרה"];
const SIGN_EVERY = 180;                                                          // units between signs (4.5 km)
const gantry = new THREE.Group(); scene.add(gantry);
cyl(0.06, 0.06, 3.0, 0x9aa1ab, -2.3, 1.5, 0, gantry, 6); cyl(0.06, 0.06, 3.0, 0x9aa1ab, 2.3, 1.5, 0, gantry, 6); box(4.7, 0.08, 0.08, 0x9aa1ab, 0, 2.95, 0, gantry);
const signT = textTex("ירושלים", { w: 768, h: 200, fs: 110 });
const signM = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 0.8), new THREE.MeshBasicMaterial({ map: signT.t })); signM.position.set(0, 2.5, 0.05); signM.rotation.y = Math.PI; gantry.add(signM);
const signBack = box(3.05, 0.85, 0.04, 0x0d7a3a, 0, 2.5, 0.02, gantry);

// ---------- the Roadster and the mayor's security ----------
const car = new THREE.Group(); car.rotation.order = "YXZ"; scene.add(car);
const body = makeRoadster(THREE); body.scale.setScalar(0.9); body.position.y = -0.13; car.add(body);
const CAR_H = 0.27;
function makeSUV() { const g = new THREE.Group(); box(0.62, 0.42, 1.1, 0x15181d, 0, 0.33, 0, g); box(0.56, 0.24, 0.6, 0x2a2f38, 0, 0.66, 0.05, g); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => cyl(0.14, 0.14, 0.1, 0x0b0b0c, sx * 0.31, 0.14, sz * 0.36, g, 10).rotation.z = Math.PI / 2); box(0.5, 0.05, 0.05, 0xff2a2a, 0, 0.62, -0.56, g); return g; }
const guards = [makeSUV(), makeSUV()]; guards.forEach((g) => scene.add(g));
const puffs = []; const puffGeo = new THREE.IcosahedronGeometry(0.12, 0);
function puff(p, s = 1) { const m = new THREE.Mesh(puffGeo, new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 })); m.position.copy(p); m.userData = { t: 0, s }; scene.add(m); puffs.push(m); }

// ---------- obstacles (Israeli street life) ----------
// each: build(group) → { y0, y1, hw, hl } collision box; flags: soft (slows, no hit), cam (speed camera), front (bus: head-on = game over)
const SKIN = 0xf1c6a0;
// Difficulty works like Subway Surfers: head-on into anything big ends the run (like a train), a side scrape or a
// small obstacle is a stumble (the guards close in, a second one within 6 s and they catch you), speed climbs in
// stair-steps every 12 s with a short breather, and later stages spawn denser rows, combos and oncoming traffic.
//   fatal: head-on = game over · soft: slows you · cam: speed camera fine · pit: must be airborne · v: moves along z (units/s, + = towards you)
const KINDS = {
  grandma: { y0: 0, y1: 0.85, hw: 0.28, hl: 0.25, move: 0.6, build(g) { cyl(0.2, 0.28, 0.55, 0x8e5bb0, 0, 0.28, 0, g); ball(0.13, SKIN, 0, 0.66, 0, g); ball(0.11, 0xe9e9e9, 0, 0.74, 0.02, g); cyl(0.015, 0.015, 0.6, 0x6b4a2b, 0.22, 0.3, -0.05, g, 5); box(0.32, 0.24, 0.28, 0x2f6fe0, -0.36, 0.28, 0, g); } },   // + shopping trolley
  kid: { y0: 0, y1: 0.75, hw: 0.25, hl: 0.3, move: 1.8, erratic: true, build(g) { box(0.1, 0.03, 0.55, 0x2fbf71, 0, 0.06, 0, g); cyl(0.015, 0.015, 0.55, 0x9aa1ab, 0, 0.33, -0.24, g, 5); cyl(0.12, 0.14, 0.32, 0xff8a1f, 0, 0.32, 0.02, g); ball(0.1, SKIN, 0, 0.58, 0.02, g); ball(0.105, 0xe5263b, 0, 0.62, 0.02, g); } },
  courier: { y0: 0, y1: 0.85, hw: 0.28, hl: 0.35, move: 2.2, erratic: true, build(g) { box(0.08, 0.05, 0.7, 0x2a2f38, 0, 0.1, 0, g); [-0.3, 0.3].forEach((z) => cyl(0.12, 0.12, 0.05, 0x111111, 0, 0.12, z, g, 10).rotation.z = Math.PI / 2); cyl(0.11, 0.13, 0.3, 0x1f9dd9, 0, 0.42, 0.05, g); ball(0.1, 0x1f9dd9, 0, 0.66, 0.05, g); box(0.3, 0.3, 0.3, 0x1f9dd9, 0, 0.55, 0.3, g); } },   // food courier with the cube bag
  cat: { y0: 0, y1: 0.28, hw: 0.2, hl: 0.2, move: 0.9, build(g) { box(0.14, 0.12, 0.32, 0xff9f3a, 0, 0.12, 0, g); box(0.12, 0.12, 0.12, 0xff9f3a, 0, 0.2, -0.18, g); box(0.03, 0.03, 0.2, 0xff9f3a, 0, 0.2, 0.22, g); } },
  police: { y0: 0, y1: 0.55, hw: 0.32, hl: 0.6, fatal: true, build(g) { box(0.62, 0.32, 1.15, 0xf4f6f8, 0, 0.24, 0, g); box(0.64, 0.08, 1.16, 0x1f4bd1, 0, 0.26, 0, g); box(0.54, 0.2, 0.6, 0x2a3442, 0, 0.5, 0.05, g); g.userData.blink = [box(0.2, 0.06, 0.12, 0xe5263b, -0.1, 0.63, 0.05, g), box(0.2, 0.06, 0.12, 0x2f6fe0, 0.12, 0.63, 0.05, g)]; } },
  parked: { y0: 0, y1: 0.55, hw: 0.32, hl: 0.6, fatal: true, build(g) { box(0.62, 0.3, 1.15, [0x9aa1ab, 0x6b7280, 0xc0392b, 0xffffff][(Math.random() * 4) | 0], 0, 0.23, 0, g); box(0.54, 0.2, 0.6, 0x2a3442, 0, 0.47, 0.05, g); g.userData.blink = [box(0.08, 0.05, 0.03, 0xff9f1a, -0.24, 0.3, 0.58, g), box(0.08, 0.05, 0.03, 0xff9f1a, 0.24, 0.3, 0.58, g)]; } },
  taxi: { y0: 0, y1: 1.0, hw: 0.36, hl: 0.9, fatal: true, v: -6, build(g) { box(0.7, 0.75, 1.8, 0xffd23f, 0, 0.5, 0, g); box(0.72, 0.25, 1.4, 0x2a3442, 0, 0.72, -0.1, g); box(0.3, 0.1, 0.2, 0x111111, 0, 0.93, -0.3, g); g.userData.blink = [box(0.1, 0.06, 0.03, 0xff3b3b, -0.28, 0.35, 0.91, g), box(0.1, 0.06, 0.03, 0xff3b3b, 0.28, 0.35, 0.91, g)]; } },   // "מונית שירות" that slams the brakes
  oncoming: { y0: 0, y1: 0.55, hw: 0.32, hl: 0.6, fatal: true, v: 7, build(g) { box(0.62, 0.3, 1.15, 0x9b59b6, 0, 0.23, 0, g); box(0.54, 0.2, 0.6, 0x2a3442, 0, 0.47, -0.05, g); box(0.5, 0.04, 0.03, 0xfff6c0, 0, 0.28, 0.58, g); } },
  bus: { y0: 0, y1: 1.7, hw: 0.4, hl: 1.7, fatal: true, build(g) { box(0.8, 1.35, 3.4, 0x1f9d55, 0, 0.8, 0, g); box(0.82, 0.38, 3.0, 0x2a3442, 0, 1.1, -0.1, g); [[-1, -1.1], [1, -1.1], [-1, 1.1], [1, 1.1]].forEach(([sx, z]) => cyl(0.18, 0.18, 0.12, 0x0b0b0c, sx * 0.4, 0.18, z, g, 10).rotation.z = Math.PI / 2); } },
  garbage: { y0: 0, y1: 1.5, hw: 0.4, hl: 1.2, fatal: true, build(g) { box(0.8, 1.2, 2.4, 0x6ab04c, 0, 0.75, 0, g); box(0.82, 0.5, 0.7, 0xf4f6f8, 0, 0.6, -1.15, g); box(0.6, 0.3, 0.05, 0x2a3442, 0, 0.95, -1.5, g); for (let i = 0; i < 3; i++) box(0.4, 0.06, 0.06, 0xff9f1a, 0, 0.3 + i * 0.35, 1.21, g); } },
  cones: { y0: 0, y1: 0.4, hw: 0.45, hl: 0.15, build(g) { [-0.3, 0, 0.3].forEach((x) => { cyl(0.0, 0.11, 0.38, 0xff6a00, x, 0.19, 0, g, 8); box(0.22, 0.03, 0.22, 0xff6a00, x, 0.015, 0, g); }); } },
  barrier: { y0: 0.2, y1: 0.36, hw: 0.6, hl: 0.08, fatal: true, build(g) { cyl(0.05, 0.05, 0.6, 0x555b66, -0.62, 0.3, 0, g, 6); for (let i = 0; i < 6; i++) box(0.2, 0.09, 0.06, i % 2 ? 0xffffff : 0xe5263b, -0.5 + i * 0.2, 0.29, 0, g); } },
  stall: { y0: 0, y1: 0.62, hw: 0.45, hl: 0.35, build(g) { box(0.9, 0.06, 0.6, 0x8a6a42, 0, 0.42, 0, g); [[-0.4, -0.25], [0.4, -0.25], [-0.4, 0.25], [0.4, 0.25]].forEach(([x, z]) => box(0.05, 0.42, 0.05, 0x6b4a2b, x, 0.21, z, g)); for (let i = 0; i < 6; i++) ball(0.12, 0x2f8f3a, -0.28 + (i % 3) * 0.28, 0.55, (i < 3 ? -0.12 : 0.12), g); box(0.7, 0.18, 0.04, 0xffd23f, 0, 0.75, -0.3, g); } },
  // protesters holding a "בושה" banner across the whole road: duck under it or jump over it
  protest: { y0: 0.2, y1: 0.78, hw: 2.1, hl: 0.12, fatal: true, build(g) {
    const shirts = [0x2f6fe0, 0xffffff, 0x2f6fe0, 0xffffff];
    [-2.25, 2.25].forEach((x, i) => { cyl(0.13, 0.15, 0.5, shirts[i], x, 0.35, 0, g); ball(0.11, SKIN, x, 0.7, 0, g); cyl(0.012, 0.012, 1.0, 0x8a6a42, x + (i ? 0.25 : -0.25), 0.9, 0, g, 4); const f = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.3), new THREE.MeshLambertMaterial({ map: FLAG, side: THREE.DoubleSide })); f.position.set(x + (i ? 0.48 : -0.48), 1.25, 0); g.add(f); });
    const b = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 0.55), new THREE.MeshLambertMaterial({ map: BUSHA, side: THREE.DoubleSide })); b.position.set(0, 0.5, 0); g.add(b);
  } },
  pit: { y0: 0, y1: 0.05, hw: 0.5, hl: 0.45, pit: true, build(g) { box(0.95, 0.02, 0.9, 0x1a1a1a, 0, 0.01, 0, g); [-0.55, 0.55].forEach((z) => { for (let i = 0; i < 5; i++) box(0.2, 0.05, 0.04, i % 2 ? 0xffffff : 0xff6a00, -0.4 + i * 0.2, 0.25, z, g); cyl(0.02, 0.02, 0.28, 0x555b66, -0.5, 0.14, z, g, 4); cyl(0.02, 0.02, 0.28, 0x555b66, 0.5, 0.14, z, g, 4); }); } },
  bump: { y0: 0, y1: 0.08, hw: 2.2, hl: 0.15, soft: true, build(g) { for (let i = 0; i < 11; i++) box(0.4, 0.08, 0.3, i % 2 ? 0x1a1a1a : 0xffd23f, -2.0 + i * 0.4, 0.04, 0, g); } },
  camera: { y0: -1, y1: -1, hw: 0.6, hl: 0.4, cam: true, build(g) { cyl(0.05, 0.05, 2.4, 0x9aa1ab, 0.75, 1.2, 0, g, 6); box(0.8, 0.06, 0.06, 0x9aa1ab, 0.35, 2.35, 0, g); box(0.22, 0.2, 0.3, 0x2a2f38, 0, 2.2, 0, g); box(0.1, 0.06, 0.04, 0x9ad0ff, 0, 2.2, -0.16, g); } },
};
const BUSHA = textTex("בושה!", { w: 1024, h: 128, fs: 96, fg: "#e5263b", bg: "#ffffff", border: "#1a1a1a" }).t;
const FATAL_MSG = { bus: "נכנסת באוטובוס! 🚌", garbage: "נכנסת במשאית הזבל! 🗑️", taxi: "המונית שירות עצרה פתאום! 🚖", oncoming: "נהג נגד התנועה! 😱", police: "נכנסת בניידת! 🚓", parked: "נכנסת בחנייה כפולה! 🚗", barrier: "נתקעת במחסום החניון! 🚧", protest: "נתקעת בהפגנה! 📢" };
const obs = [];
function spawn(kind, lane, z) {
  const k = KINDS[kind], g = new THREE.Group(); k.build(g);
  const x = k.hw > 2 ? 0 : LANES[lane];
  g.position.set(x, 0, z); if (k.move) g.rotation.y = Math.PI / 2;
  g.userData = { ...g.userData, kind, k, hit: false, dir: Math.random() < 0.5 ? -1 : 1, turn: 0.6 + Math.random() * 1.4, drive: 1 + Math.random() * 2 };
  scene.add(g); obs.push(g); return g;
}
const coins = []; const coinGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.04, 16); coinGeo.rotateX(Math.PI / 2);
const coinMat = new THREE.MeshLambertMaterial({ color: 0xffd23f, emissive: 0x6a5200 });
function coinRow(lane, z, n = 4, arc = false) { for (let i = 0; i < n; i++) { const c = new THREE.Mesh(coinGeo, coinMat); c.position.set(LANES[lane], 0.45 + (arc ? Math.sin((i / (n - 1)) * Math.PI) * 1.1 : 0), z - i * 1.6); scene.add(c); coins.push(c); } }
const pick = (a) => a[(Math.random() * a.length) | 0];
const stageAt = (t) => Math.floor(t / 12);
const shuffled = () => [0, 1, 2].sort(() => Math.random() - 0.5);
// one row of the road; harder stages unlock more kinds, two-lane blocks, combos and traffic that moves
function spawnRow(z, t) {
  const s = stageAt(t), r = Math.random();
  if (t % 12 < 1.6 && t > 12) { coinRow((Math.random() * 3) | 0, z, 5, Math.random() < 0.5); return; }   // breather at the start of each stage
  if (s >= 1 && r < 0.09) { spawn("protest", 1, z); coinRow((Math.random() * 3) | 0, z + 2, 3); return; }
  if (r < 0.15) { spawn("bump", 1, z); coinRow((Math.random() * 3) | 0, z + 0.8, 4, true); return; }
  if (s >= 1 && r < 0.21) { const l = (Math.random() * 3) | 0; spawn("camera", l, z); coinRow((l + 1) % 3, z + 2, 4); return; }
  const easy = ["cones", "parked", "stall", "cat", "pit"];
  const mid = ["grandma", "kid", "police", "parked", "bus", "cones", "barrier", "stall", "pit", "courier", "garbage", "cat"];
  const hard = [...mid, "taxi", "oncoming", "oncoming", "bus", "garbage", "courier"];
  const kinds = s === 0 ? easy : s === 1 ? mid : hard;
  const lanes = shuffled(), n = s === 0 ? 1 : s === 1 ? (Math.random() < 0.45 ? 2 : 1) : Math.random() < 0.7 ? 2 : 1;
  for (let i = 0; i < n; i++) spawn(pick(kinds), lanes[i], z);
  // the free lane is not always free: from stage 3 it often holds something you must jump or duck
  if (s >= 3 && n === 2 && Math.random() < 0.5) spawn(pick(["cones", "pit", "barrier", "cat"]), lanes[2], z - 1.2);
  else if (Math.random() < 0.7) coinRow(lanes[n], z + 3, 4);
  // combos: a second row right behind the first
  if (s >= 2 && Math.random() < 0.35) { const l2 = shuffled(); spawn(pick(["barrier", "cones", "pit", "cat"]), l2[0], z - 5); if (s >= 4) spawn(pick(["cones", "pit", "barrier"]), l2[1], z - 5); }   // combos are always jumpable / duckable, so a way through exists
}

// ---------- state ----------
const st = { on: false, z: 0, lane: 1, x: 0, t: 0, speed: 11, dist: 0, coins: 0, air: 0, slide: 0, lastHit: -99, slow: 0, guard: 14, nextRow: -30, why: "", city: ROUTE[0], turbo: 0, nextSign: -SIGN_EVERY, signIdx: 1, stage: 0 };
function reset() {
  Object.assign(st, { on: false, z: 0, lane: 1, x: 0, t: 0, speed: 11, dist: 0, coins: 0, air: 0, slide: 0, lastHit: -99, slow: 0, guard: 14, nextRow: -30, why: "", city: ROUTE[0], turbo: CFG.turbo ? 1 : 0, nextSign: -SIGN_EVERY, signIdx: 1, stage: 0 });
  [...obs, ...coins].forEach((o) => scene.remove(o)); obs.length = 0; coins.length = 0;
  chunks.forEach((c, i) => { c.position.z = -i * CH; decorate(c, i); });
  gantry.position.z = st.nextSign; signT.draw(ROUTE[1] + " ←");
}

// ---------- input: swipes + arrows ----------
function act(a) {
  if (!st.on) return;
  if (a === "L" && st.lane > 0) { st.lane--; sfx.play("lane"); }
  if (a === "R" && st.lane < 2) { st.lane++; sfx.play("lane"); }
  if (a === "U" && st.air <= 0) { sfx.play("jump"); st.air = 0.7; st.slide = 0; for (let i = 0; i < 6; i++) puff(car.position.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.4, 0, 0.3)), 1); }
  if (a === "D") { sfx.play("duck", { gap: 0.3 }); if (st.air > 0) st.air = Math.min(st.air, 0.1); st.slide = 0.6; }
}
let sx = 0, sy = 0, swiped = false;
$("gl").addEventListener("pointerdown", (e) => { sfx.unlock(); sx = e.clientX; sy = e.clientY; swiped = false; });
$("gl").addEventListener("pointermove", (e) => {
  if (swiped || !e.buttons) return; const dx = e.clientX - sx, dy = e.clientY - sy;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
  swiped = true; act(Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "L" : "R") : dy < 0 ? "U" : "D");
});
addEventListener("keydown", (e) => { sfx.unlock(); const m = { ArrowLeft: "L", ArrowRight: "R", ArrowUp: "U", ArrowDown: "D", " ": "U" }[e.key]; if (m) { e.preventDefault(); act(m); } });

// ---------- loop ----------
function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.fov = camera.aspect < 0.8 ? 68 : 55; camera.updateProjectionMatrix(); }
addEventListener("resize", resize); resize();
let alertT = 0;
function flash(msg) { $("alert").textContent = msg; $("alert").hidden = false; alertT = 1.6; }
function hit(o, side) {
  o.userData.hit = true;
  if (st.turbo > 1) return;
  const k = o.userData.k;
  if (k.fatal && !side) return end(FATAL_MSG[o.userData.kind] || "בום! 💥");                  // head-on into something big
  if (st.t - st.lastHit < 6) return end("המאבטחים תפסו אותך! 🚙");
  sfx.play("scrape"); st.lastHit = st.t; st.slow = 1.0; st.guard = 2.2; flash(side ? "💥 נשפשפת! המאבטחים מאחוריך!" : "💥 המאבטחים מאחוריך!");
}
function step(dt) {
  st.t += dt;
  const s = stageAt(st.t);
  if (s !== st.stage) { st.stage = s; sfx.play("stage"); flash(`🔥 שלב ${s + 1}! יותר מהר`); }
  // stair-steps: each stage jumps the speed, then it creeps up until the next one
  const base = Math.min(30, 11 + Math.min(s, 4) * 2.2 + Math.max(0, s - 4) * 0.9 + (st.t % 12) * 0.08) * (CFG.turbo ? 1.12 : 1);   // steep to stage 5, then a slower climb so skill keeps paying off
  st.speed = base * (st.slow > 0 ? 0.65 : 1); if (st.slow > 0) st.slow -= dt;
  st.z -= st.speed * dt; st.dist += st.speed * dt;
  const changing = Math.abs(LANES[st.lane] - st.x) > 0.3;
  st.x += (LANES[st.lane] - st.x) * Math.min(1, dt * 16);
  if (st.air > 0) { st.air = Math.max(0, st.air - dt); if (st.air === 0) sfx.play("land"); } if (st.slide > 0) st.slide = Math.max(0, st.slide - dt);
  const h = st.air > 0 ? Math.sin((1 - st.air / 0.7) * Math.PI) * 1.3 : 0;
  const carTop = h + (st.slide > 0 ? 0.12 : CAR_H);
  car.position.set(st.x, h + 0.13, st.z);
  car.rotation.set(st.air > 0 ? -2 * Math.PI * (1 - st.air / 0.7) : 0, 0, (LANES[st.lane] - st.x) * -0.25);
  body.scale.set(0.9, st.slide > 0 ? 0.55 : 0.9, 0.9);
  if (st.slide > 0 && Math.random() < 0.6) puff(car.position.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.4, -0.1, 0.4)), 0.5);

  // world recycling, signs, spawns (rows get closer every stage)
  chunks.forEach((c) => { if (c.position.z > st.z + CH) { c.position.z -= NCH * CH; decorate(c, Math.round(-c.position.z / CH)); } });
  if (st.z < st.nextSign + 2) { st.city = ROUTE[Math.min(st.signIdx, ROUTE.length - 1)]; flash("🏁 " + st.city + "!"); st.signIdx++; st.nextSign -= SIGN_EVERY; gantry.position.z = st.nextSign; signT.draw((ROUTE[Math.min(st.signIdx, ROUTE.length - 1)]) + " ←"); }
  while (st.nextRow > st.z - 70) { const ta = st.t + (st.z - st.nextRow) / st.speed; spawnRow(st.nextRow, ta); st.nextRow -= Math.max(7, 15 - stageAt(ta) * 1.3) + Math.random() * 3; }

  for (let i = obs.length - 1; i >= 0; i--) {
    const o = obs[i], u = o.userData, k = u.k;
    if (k.move) {
      if (k.erratic && (u.turn -= dt) < 0) { u.dir *= -1; u.turn = 0.4 + Math.random() * 1.2; }    // kids and couriers change direction without warning
      o.position.x += u.dir * k.move * (1 + st.stage * 0.08) * dt; if (Math.abs(o.position.x) > 1.4) { u.dir *= -1; o.position.x = Math.sign(o.position.x) * 1.4; }
      o.rotation.y = u.dir > 0 ? -Math.PI / 2 : Math.PI / 2;
    }
    if (k.v > 0) o.position.z += k.v * dt;                                                   // oncoming traffic
    if (k.v < 0 && (u.drive -= dt) > 0) o.position.z += k.v * dt;                             // the sherut drives ahead… then stops dead
    if (u.blink) u.blink.forEach((b) => (b.visible = Math.floor(st.t * 3) % 2 === 0));
    if (o.position.z > st.z + 6) { scene.remove(o); obs.splice(i, 1); continue; }
    if (!u.heard && st.z - o.position.z < 24) {                                         // a heads-up sound as it comes into view
      u.heard = true; const kd = u.kind;
      if (kd === "police") sfx.play("siren", { gap: 3 });
      else if (kd === "protest") sfx.play("protest", { gap: 3 });
      else if ((kd === "bus" || kd === "taxi" || kd === "garbage") && Math.random() < 0.5) sfx.play("horn", { gap: 2.5 });
    }
    if (u.hit) continue;
    const dz = Math.abs(st.z - o.position.z), dx = Math.abs(st.x - o.position.x);
    if (dz > k.hl + 0.45 || dx > k.hw + 0.22) continue;
    if (k.cam) { u.hit = true; if (st.turbo > 1) continue; sfx.play("camera"); st.coins = Math.max(0, st.coins - 10); st.slow = 0.8; st.guard = Math.min(st.guard, 5); flash("📸 דוח מהירות! −10 ₪"); continue; }
    if (k.soft) { if (h < 0.1) { u.hit = true; sfx.play("bump"); st.slow = 0.8; st.guard = Math.min(st.guard, 5); flash("⚠️ פס האטה!"); } continue; }
    if (k.pit) { if (h < 0.05 && dz < k.hl) { u.hit = true; return end("נפלת לבור של עבודות הכביש! 🕳️"); } continue; }
    if (carTop > k.y0 + 0.02 && h < k.y1 - 0.02) hit(o, changing && dz < k.hl);
  }
  for (let i = coins.length - 1; i >= 0; i--) {
    const c = coins[i]; c.rotation.y += dt * 4;
    if (c.position.z > st.z + 4) { scene.remove(c); coins.splice(i, 1); continue; }
    if (Math.abs(st.z - c.position.z) < 0.5 && Math.abs(st.x - c.position.x) < 0.5 && Math.abs(h + 0.2 - c.position.y) < 0.6) { st.coins++; sfx.play("coin", { rate: 0.95 + Math.random() * 0.15, gap: 0.03 }); scene.remove(c); coins.splice(i, 1); }
  }
  // the mayor's security: two black SUVs that close in after a hit
  st.guard += ((st.t - st.lastHit < 6 ? 2.6 : 14) - st.guard) * Math.min(1, dt * (st.t - st.lastHit < 6 ? 3 : 0.5));
  guards.forEach((g, i) => { g.position.set(st.x + (i ? 0.75 : -0.75) * 0.9, 0, st.z + st.guard + i * 0.6); g.visible = st.guard < 12; });
  if (st.t - st.lastHit > 6 && st.lastHit > 0 && st.guard > 12.5) st.lastHit = -99;
}


// ---------- intro (7 s, first run only): a hooded thief steals the mayor's Roadster, the mayor runs out, the chase begins ----------
const intro = new THREE.Group(); scene.add(intro); intro.visible = false;
const MZ = new THREE.Vector3(4.7, 0, 8.6);                                    // the mayor's house, right of the road, behind the start line
box(2.6, 1.6, 2.2, 0xf2e3d0, MZ.x, 0.8, MZ.z, intro); box(2.8, 0.18, 2.4, 0xc0392b, MZ.x, 1.69, MZ.z, intro);
[-0.8, -0.27, 0.27, 0.8].forEach((dz) => cyl(0.06, 0.06, 1.5, 0xffffff, MZ.x - 1.35, 0.75, MZ.z + dz, intro, 8));
box(0.05, 0.9, 0.55, 0x5a3a22, MZ.x - 1.31, 0.45, MZ.z, intro);
box(1.7, 0.03, 1.6, 0x5d6470, 2.95, 0.06, 7.25, intro);                        // driveway
const mSign = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.5), new THREE.MeshBasicMaterial({ map: textTex("בית ראש העיר", { w: 768, h: 176, fs: 100, fg: "#1a1a1a", bg: "#ffffff", border: "#1a1a1a" }).t, side: THREE.DoubleSide }));
mSign.position.set(MZ.x - 1.45, 2.3, MZ.z); mSign.rotation.y = -Math.PI / 2; intro.add(mSign);
[-0.95, 0.95].forEach((dz) => cyl(0.03, 0.03, 0.7, 0x555b66, MZ.x - 1.45, 1.95, MZ.z + dz, intro, 5));
const PS = 0.42;                                                              // people at the car's scale
function person(suit, head, extra) {
  const g = new THREE.Group(), legs = [], arms = [];
  [-0.07, 0.07].forEach((x) => { const l = new THREE.Group(); l.position.set(x, 0.32, 0); box(0.09, 0.32, 0.1, 0x1d1f24, 0, -0.16, 0, l); g.add(l); legs.push(l); });
  box(0.3, 0.36, 0.18, suit, 0, 0.5, 0, g);
  [-0.19, 0.19].forEach((x) => { const a = new THREE.Group(); a.position.set(x, 0.66, 0); box(0.08, 0.3, 0.08, suit, 0, -0.15, 0, a); g.add(a); arms.push(a); });
  ball(0.12, head, 0, 0.82, 0, g); extra?.(g);
  g.userData = { legs, arms }; g.scale.setScalar(PS); intro.add(g); return g;
}
const thief = person(0x1b1f27, 0x1b1f27, (g) => { box(0.16, 0.1, 0.02, SKIN, 0, 0.8, -0.115, g); });   // hood with just the eyes showing
const mayor = person(0x1d2b4a, SKIN, (g) => { box(0.12, 0.3, 0.02, 0xffffff, 0, 0.53, -0.095, g); box(0.04, 0.26, 0.025, 0x2f6fe0, 0, 0.53, -0.1, g); ball(0.115, 0xd9d9d9, 0, 0.88, 0.02, g); });
function walk(p, t, speed) { const a = Math.sin(t * speed) * 0.7; p.userData.legs[0].rotation.x = a; p.userData.legs[1].rotation.x = -a; p.userData.arms[0].rotation.x = -a; p.userData.arms[1].rotation.x = a; }
const cs = { on: false, t: 0, seen: false, fx: {} };
const CAR0 = new THREE.Vector3(1.25, 0.13, 7.2);
const lerp = (a, b, k) => a + (b - a) * k, cl = (k) => Math.min(1, Math.max(0, k)), eio = (k) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
const camA = new THREE.Vector3(), lookA = new THREE.Vector3(), pvI = new THREE.Vector3();
function cutscene(dt) {
  cs.t += dt; const t = cs.t;
  [[2.3, "door"], [2.6, "start"], [3.4, "hey"], [3.6, "screech"]].forEach(([at, n]) => { if (t >= at && !cs.fx[at]) { cs.fx[at] = 1; sfx.play(n); } });
  sfx.engineHum(t > 2.8, 11 * Math.min(1, Math.max(0, (t - 3.6) / 3.4)));
  // the thief sneaks to the car, hops in
  if (t < 2.0) { const k = t / 2.0; thief.position.set(lerp(-2.6, 0.85, k), 0, lerp(9.8, 7.4, k)); thief.rotation.y = Math.atan2(-(0.85 + 2.6), -(7.4 - 9.8)); walk(thief, t, 9); }
  thief.visible = t < 2.4; if (t >= 2.0 && t < 2.4) { const k = (t - 2.0) / 0.4; thief.position.set(lerp(0.85, 1.25, k), 0.3 * Math.sin(k * Math.PI), 7.3); thief.scale.setScalar(PS * (1 - k * 0.8)); }
  // engine on: lights + cold-gas puffs, then it launches and merges into the middle lane
  const go = cl((t - 3.6) / 3.4), e = go * go;
  car.position.set(lerp(CAR0.x, 0, eio(cl((t - 4.6) / 2.2))), 0.13, lerp(CAR0.z, 0, e));
  car.rotation.set(0, 0, 0);
  if (t > 2.6 && t < 3.6 && Math.random() < 0.5) puff(car.position.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.4, 0, 0.45)), 0.8);
  if (go > 0 && Math.random() < 0.4) puff(car.position.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.3, 0, 0.5)), 0.6);
  // the mayor bursts out of the door and runs after it, losing ground
  mayor.visible = t > 3.1;
  if (t <= 4.6) { const k = cl((t - 3.1) / 1.5); mayor.position.set(lerp(MZ.x - 1.5, 2.1, k), 0, lerp(MZ.z, 7.8, k)); mayor.rotation.y = Math.PI / 2; }
  else { mayor.position.set(2.1 - (t - 4.6) * 0.4, 0, 7.8 - (t - 4.6) * 2.6); mayor.rotation.y = 0; }
  walk(mayor, t, 14); mayor.userData.arms[0].rotation.x = -2.6 + Math.sin(t * 18) * 0.4;   // shaking a fist
  // the security SUVs pull out behind
  guards.forEach((g, i) => { g.visible = t > 4.4; g.position.set(lerp(2.6 + i * 0.9, (i ? 0.7 : -0.7), cl((t - 4.4) / 2.6)), 0, lerp(11 + i, car.position.z + 4.8 + i * 0.6, eio(cl((t - 4.4) / 2.6)))); });
  // camera: wide on the house → on the car → on the mayor → swings into the chase view
  if (t < 2.2) { const k = t / 2.2; camA.set(lerp(-1.7, -1.2, k), lerp(1.15, 0.95, k), lerp(4.3, 5.0, k)); lookA.set(lerp(-0.4, 0.8, k), 0.25, 8.0); }
  else if (t < 3.3) { camA.set(-0.8, 0.7, 5.7); lookA.set(CAR0.x, 0.25, CAR0.z); }
  else if (t < 4.6) { camA.set(0.9, 0.75, 5.6); lookA.set(2.6, 0.35, 8.0); }
  else { const k = eio(cl((t - 4.6) / 2.4)); camA.set(lerp(car.position.x + 1.6, car.position.x * 0.7, k), lerp(0.9, 2.25, k), lerp(car.position.z + 1.8, car.position.z + 4.3, k)); lookA.set(lerp(car.position.x, car.position.x * 0.7, k), lerp(0.25, 0.7, k), lerp(car.position.z, car.position.z - 5, k)); }
  camera.position.copy(camA); camera.lookAt(lookA);
  // speech bubble over the mayor
  pvI.set(mayor.position.x, 0.55, mayor.position.z).project(camera);
  const b = $("bubble"); b.hidden = !(t > 3.3 && t < 6.6) || pvI.z > 1;
  b.style.left = ((pvI.x * 0.5 + 0.5) * innerWidth) + "px"; b.style.top = ((-pvI.y * 0.5 + 0.5) * innerHeight) + "px";
  if (t >= 7.0) finishIntro();
}
function playIntro() {
  cs.on = true; cs.t = 0; cs.fx = {}; intro.visible = true; thief.visible = true; thief.scale.setScalar(PS); mayor.visible = false; chunks[0].userData.deco.visible = false;
  $("hud").hidden = true; $("skip").hidden = false;
  flash("🤫 שקט... הרודסטר של ראש העיר");
  setTimeout(() => { if (cs.on) flash("🔑 נכנסת! עכשיו סע!"); }, 2400);
}
function finishIntro() {
  if (!cs.on) return;
  cs.on = false; $("skip").hidden = true; $("bubble").hidden = true; thief.visible = false;
  begin(); st.guard = 4.8;                                                       // the guards start right behind you and fall back if you drive clean
}
$("skip").addEventListener("click", (e) => { e.stopPropagation(); finishIntro(); });

const camPos = new THREE.Vector3(), look = new THREE.Vector3();
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  if (st.on) step(dt); else if (cs.on) cutscene(dt);
  if (!cs.on) sfx.engineHum(st.on, st.speed);
  for (let i = puffs.length - 1; i >= 0; i--) { const p = puffs[i]; p.userData.t += dt; p.scale.setScalar(p.userData.s * (1 + p.userData.t * 3)); p.material.opacity = Math.max(0, 0.85 - p.userData.t * 1.4); if (p.userData.t > 0.6) { scene.remove(p); puffs.splice(i, 1); } }
  if (alertT > 0 && (alertT -= dt) <= 0) $("alert").hidden = true;
  if (!cs.on) {
    camPos.set(st.x * 0.7, 2.25, st.z + 4.3); camera.position.lerp(camPos, st.on ? 0.2 : 0.06);
    look.set(st.x * 0.7, 0.7, st.z - 5); camera.lookAt(look);
  }
  if (st.on) { $("km").textContent = (st.dist * KM_PER_UNIT).toFixed(1) + " ק״מ"; $("coins").textContent = "₪ " + st.coins; }
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

// ---------- start / end ----------
const score = () => Math.round(st.dist * KM_PER_UNIT * 10) + st.coins * 50;   // same formula the server uses
function start() {
  reset(); $("start").hidden = true; $("over").hidden = true; $("rank").hidden = true; $("send").disabled = false;
  if (!cs.seen && !new URLSearchParams(location.search).has("autostart")) { cs.seen = true; playIntro(); return; }
  begin();
}
function begin() {
  intro.visible = false; chunks[0].userData.deco.visible = true; car.position.set(0, 0.13, 0);
  st.on = true; $("hud").hidden = false;
  $("swipehint").hidden = false; setTimeout(() => ($("swipehint").hidden = true), 3200);
  $("rank").hidden = true; $("send").disabled = false;
  flash(CFG.turbo ? "⚡ טורבו פעיל! סע!" : "🏎️ גנבת את הרודסטר! סע!");
}
function end(why) {
  st.on = false; st.why = why;
  sfx.engineHum(false); sfx.play(why.includes("לבור") ? "pit" : why.includes("המאבטחים") ? "caught" : "crash");
  $("hud").hidden = true; $("swipehint").hidden = true;
  $("why").textContent = why; $("okm").textContent = (st.dist * KM_PER_UNIT).toFixed(1);
  $("ocity").textContent = `ברחת עד ${st.city} 🏁`; $("oscore").textContent = score().toLocaleString("he-IL"); $("ocoins").textContent = st.coins;
  try { $("handle").value = localStorage.getItem("roadster-handle") || ""; } catch {}
  $("over").hidden = false; loadTop("top2");
}
$("go").addEventListener("click", () => { sfx.unlock(); if (!LOCKED) start(); });
$("again").addEventListener("click", () => { sfx.unlock(); start(); });
const muteBtn = $("mute");
const showMute = () => { muteBtn.textContent = sfx.isMuted() ? "🔇" : "🔊"; muteBtn.setAttribute("aria-label", sfx.isMuted() ? "הפעלת סאונד" : "השתקת סאונד"); };
muteBtn.addEventListener("click", (e) => { e.stopPropagation(); sfx.unlock(); sfx.setMuted(!sfx.isMuted()); showMute(); muteBtn.blur(); }); showMute();
$("share").addEventListener("click", () => {
  const text = `גנבתי לביבי את הרודסטר וברחתי ${(st.dist * KM_PER_UNIT).toFixed(1)} ק״מ עד ${st.city} 🏎️ נסו לעקוף אותי:`;
  const url = location.origin + "/roadster?src=share";
  if (navigator.share) navigator.share({ title: "גונבים לביבי את הרודסטר", text, url }).catch(() => {});
  else navigator.clipboard?.writeText(text + " " + url).then(() => ($("share").textContent = "הקישור הועתק ✓"));
});

// ---------- leaderboard ----------
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
let myHandle = ""; try { myHandle = localStorage.getItem("roadster-handle") || ""; } catch {}
async function loadTop(id) {
  const el = $(id);
  try {
    const j = await (await fetch(API + "?day=today", { cache: "no-store" })).json();
    el.innerHTML = (j.top || []).length ? j.top.map((r, i) => `<li class="${r.handle === myHandle ? "me" : ""}"><span>${i + 1}. <span class="h">@${esc(r.handle)}</span></span><span class="s">${Number(r.km).toFixed(1)} ק״מ${r.city ? " · " + esc(r.city) : ""}</span></li>`).join("") : '<li class="muted">עוד אין שיאים היום. תהיו הראשונים!</li>';
  } catch { el.innerHTML = '<li class="muted">הטבלה תעלה עוד רגע</li>'; }
}
$("sub").addEventListener("submit", async (e) => {
  e.preventDefault();
  const handle = $("handle").value.trim().replace(/^@/, "").toLowerCase();
  if (!/^[a-z0-9._]{1,30}$/.test(handle)) { $("rank").hidden = false; $("rank").textContent = "שם משתמש באנגלית, מספרים, נקודה או קו תחתון"; return; }
  myHandle = handle; try { localStorage.setItem("roadster-handle", handle); } catch {}
  $("send").disabled = true;
  const seconds = Math.max(1, Math.round(st.t));
  const body = { id: uuid(), vid: visitor(), handle, km: Math.round(st.dist * KM_PER_UNIT * 10) / 10, seconds, coins: Math.min(st.coins, seconds * 3), city: st.city };
  try {
    const r = await fetch(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    $("rank").hidden = false;
    if (r.status === 200) { const j = await r.json(); $("rank").textContent = `🏆 מקום ${j.rank} היום! (השיא שלך: ${j.best.toLocaleString("he-IL")})`; }
    else if (r.status === 204) $("rank").textContent = "התוצאה לא נשמרה. נסו משחק נוסף 🙏";
    else { $("rank").textContent = "לא הצלחנו לשמור. נסו שוב בעוד רגע"; $("send").disabled = false; }
  } catch { $("rank").hidden = false; $("rank").textContent = "לא הצלחנו לשמור. נסו שוב בעוד רגע"; $("send").disabled = false; }
  loadTop("top2");
});

// ---------- measurement (same anonymous ids as the rest of the site) ----------
function visitor() { try { let v = localStorage.getItem("orci-vid"); if (!v) { v = uuid(); localStorage.setItem("orci-vid", v); } return v; } catch { return null; } }
const optedOut = () => { try { return localStorage.getItem("orci-notrack") === "1"; } catch { return false; } };
const sid = (() => { try { let s = sessionStorage.getItem("orci-sid"); if (!s) { s = uuid(); sessionStorage.setItem("orci-sid", s); } return s; } catch { return uuid(); } })();
const src = (new URLSearchParams(location.search).get("src") || "").toLowerCase();
if (!optedOut()) { try { const b = JSON.stringify({ t: "view", id: uuid(), sid, vid: visitor(), path: "/ir/roadster", ref: document.referrer || null, utm: ["bio", "dm", "site", "share", "game", "city"].includes(src) ? src : null, w: innerWidth }); if (!navigator.sendBeacon?.(TRACK, b)) fetch(TRACK, { method: "POST", body: b, keepalive: true, mode: "no-cors" }).catch(() => {}); } catch {} }

// start screen: the stolen car on the road out of Jerusalem
reset(); car.position.set(0, 0.13, 0);
camera.position.set(1.6, 1.4, 3.2);
// locked until the reel hits its goals (config.json); ?preview=orci lets Or test it on his phone meanwhile
const LOCKED = CFG.locked && new URLSearchParams(location.search).get("preview") !== "orci";
if (LOCKED) { $("start").hidden = true; $("locked").hidden = false; } else loadTop("top");
$("loading").classList.add("done");
requestAnimationFrame(frame);
if (new URLSearchParams(location.search).has("debug")) window.__game = { st, step, start, end, act, obs, spawn, scene, camera, renderer, car, cs, cutscene, playIntro, sfx };
if (!LOCKED && new URLSearchParams(location.search).has("autostart")) start();
if (!LOCKED && new URLSearchParams(location.search).has("autointro")) start();
