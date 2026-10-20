// "גונבים לביבי את הרודסטר" — a Subway-Surfers-style runner: 3 lanes on an Israeli road, swipe to dodge.
// One hit and the mayor's security SUVs are right behind you; a second hit within 6 seconds and they catch you.
import * as THREE from "three";
import { makeRoadster } from "/ir/roadster/car.js";

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
const KINDS = {
  grandma: { y0: 0, y1: 0.85, hw: 0.28, hl: 0.25, move: 0.55, build(g) { cyl(0.2, 0.28, 0.55, 0x8e5bb0, 0, 0.28, 0, g); ball(0.13, SKIN, 0, 0.66, 0, g); ball(0.11, 0xe9e9e9, 0, 0.74, 0.02, g); cyl(0.015, 0.015, 0.6, 0x6b4a2b, 0.22, 0.3, -0.05, g, 5); box(0.32, 0.24, 0.28, 0x2f6fe0, -0.36, 0.28, 0, g); } },   // + shopping trolley
  kid: { y0: 0, y1: 0.75, hw: 0.25, hl: 0.3, move: 1.6, build(g) { box(0.1, 0.03, 0.55, 0x2fbf71, 0, 0.06, 0, g); cyl(0.015, 0.015, 0.55, 0x9aa1ab, 0, 0.33, -0.24, g, 5); cyl(0.12, 0.14, 0.32, 0xff8a1f, 0, 0.32, 0.02, g); ball(0.1, SKIN, 0, 0.58, 0.02, g); ball(0.105, 0xe5263b, 0, 0.62, 0.02, g); } },
  police: { y0: 0, y1: 0.55, hw: 0.32, hl: 0.6, build(g) { box(0.62, 0.32, 1.15, 0xf4f6f8, 0, 0.24, 0, g); box(0.64, 0.08, 1.16, 0x1f4bd1, 0, 0.26, 0, g); box(0.54, 0.2, 0.6, 0x2a3442, 0, 0.5, 0.05, g); box(0.4, 0.06, 0.12, 0xe5263b, -0.1, 0.63, 0.05, g); box(0.2, 0.06, 0.12, 0x2f6fe0, 0.15, 0.63, 0.05, g); } },
  parked: { y0: 0, y1: 0.55, hw: 0.32, hl: 0.6, build(g) { box(0.62, 0.3, 1.15, [0x9aa1ab, 0x6b7280, 0xc0392b, 0xffffff][(Math.random() * 4) | 0], 0, 0.23, 0, g); box(0.54, 0.2, 0.6, 0x2a3442, 0, 0.47, 0.05, g); g.userData.blink = [box(0.08, 0.05, 0.03, 0xff9f1a, -0.24, 0.3, 0.58, g), box(0.08, 0.05, 0.03, 0xff9f1a, 0.24, 0.3, 0.58, g)]; } },
  bus: { y0: 0, y1: 1.7, hw: 0.4, hl: 1.7, front: true, build(g) { box(0.8, 1.35, 3.4, 0x1f9d55, 0, 0.8, 0, g); box(0.82, 0.38, 3.0, 0x2a3442, 0, 1.1, -0.1, g); box(0.6, 0.2, 0.04, 0x111111, 0, 1.33, -1.71, g); [[-1, -1.1], [1, -1.1], [-1, 1.1], [1, 1.1]].forEach(([sx, z]) => cyl(0.18, 0.18, 0.12, 0x0b0b0c, sx * 0.4, 0.18, z, g, 10).rotation.z = Math.PI / 2); } },
  cones: { y0: 0, y1: 0.4, hw: 0.45, hl: 0.15, build(g) { [-0.3, 0, 0.3].forEach((x) => { cyl(0.0, 0.11, 0.38, 0xff6a00, x, 0.19, 0, g, 8); box(0.22, 0.03, 0.22, 0xff6a00, x, 0.015, 0, g); }); } },
  barrier: { y0: 0.22, y1: 0.36, hw: 0.6, hl: 0.08, slideOk: true, build(g) { cyl(0.05, 0.05, 0.6, 0x555b66, -0.62, 0.3, 0, g, 6); for (let i = 0; i < 6; i++) box(0.2, 0.09, 0.06, i % 2 ? 0xffffff : 0xe5263b, -0.5 + i * 0.2, 0.29, 0, g); } },
  stall: { y0: 0, y1: 0.62, hw: 0.45, hl: 0.35, build(g) { box(0.9, 0.06, 0.6, 0x8a6a42, 0, 0.42, 0, g); [[-0.4, -0.25], [0.4, -0.25], [-0.4, 0.25], [0.4, 0.25]].forEach(([x, z]) => box(0.05, 0.42, 0.05, 0x6b4a2b, x, 0.21, z, g)); for (let i = 0; i < 6; i++) ball(0.12, 0x2f8f3a, -0.28 + (i % 3) * 0.28, 0.55, (i < 3 ? -0.12 : 0.12), g); box(0.7, 0.18, 0.04, 0xffd23f, 0, 0.75, -0.3, g); } },
  queue: { y0: 0, y1: 0.8, hw: 1.0, hl: 0.25, build(g) { const shirts = [0xe5263b, 0x2f6fe0, 0xffd23f, 0x2fbf71, 0xff8a1f]; for (let i = 0; i < 5; i++) { const x = -0.8 + i * 0.4; cyl(0.12, 0.14, 0.45, shirts[i], x, 0.32, (i % 2) * 0.1, g); ball(0.1, SKIN, x, 0.63, (i % 2) * 0.1, g); } box(0.8, 0.5, 0.05, 0xffffff, 1.35, 0.5, 0, g).material = new THREE.MeshLambertMaterial({ map: textTex("חומוס", { w: 256, h: 160, fs: 70, fg: "#1a1a1a", bg: "#ffd23f", border: "#1a1a1a" }).t }); } },
  bump: { y0: 0, y1: 0.08, hw: 2.2, hl: 0.15, soft: true, build(g) { for (let i = 0; i < 11; i++) box(0.4, 0.08, 0.3, i % 2 ? 0x1a1a1a : 0xffd23f, -2.0 + i * 0.4, 0.04, 0, g); } },
  camera: { y0: -1, y1: -1, hw: 0.6, hl: 0.4, cam: true, build(g) { cyl(0.05, 0.05, 2.4, 0x9aa1ab, 0.75, 1.2, 0, g, 6); box(0.8, 0.06, 0.06, 0x9aa1ab, 0.35, 2.35, 0, g); box(0.22, 0.2, 0.3, 0x2a2f38, 0, 2.2, 0, g); box(0.1, 0.06, 0.04, 0x9ad0ff, 0, 2.2, -0.16, g); } },
};
const obs = [];
function spawn(kind, lane, z) {
  const k = KINDS[kind], g = new THREE.Group(); k.build(g);
  const x = kind === "bump" ? 0 : kind === "queue" ? (lane === 0 ? -0.625 : 0.625) : LANES[lane];
  g.position.set(x, 0, z); if (kind === "grandma" || kind === "kid") g.rotation.y = Math.PI / 2;
  g.userData = { ...g.userData, kind, k, hit: false, dir: Math.random() < 0.5 ? -1 : 1 };
  scene.add(g); obs.push(g); return g;
}
const coins = []; const coinGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.04, 16); coinGeo.rotateX(Math.PI / 2);
const coinMat = new THREE.MeshLambertMaterial({ color: 0xffd23f, emissive: 0x6a5200 });
function coinRow(lane, z, n = 4, arc = false) { for (let i = 0; i < n; i++) { const c = new THREE.Mesh(coinGeo, coinMat); c.position.set(LANES[lane], 0.45 + (arc ? Math.sin((i / (n - 1)) * Math.PI) * 1.1 : 0), z - i * 1.6); scene.add(c); coins.push(c); } }
const pick = (a) => a[(Math.random() * a.length) | 0];
function spawnRow(z, t) {
  const r = Math.random();
  if (r < 0.1 && t > 6) { spawn("bump", 1, z); coinRow((Math.random() * 3) | 0, z + 0.8, 4, true); return; }
  if (r < 0.18 && t > 10) { const l = (Math.random() * 3) | 0; spawn("camera", l, z); coinRow((l + 1) % 3, z + 2, 4); return; }
  if (r < 0.26 && t > 8) { const l = Math.random() < 0.5 ? 0 : 1; spawn("queue", l, z); coinRow(l === 0 ? 2 : 0, z + 2); return; }
  const lanes = [0, 1, 2].sort(() => Math.random() - 0.5), n = t < 12 ? 1 : Math.random() < 0.55 ? 2 : 1;
  const kinds = t < 6 ? ["cones", "parked", "stall"] : ["grandma", "kid", "police", "parked", "bus", "cones", "barrier", "stall", "police", "grandma"];
  for (let i = 0; i < n; i++) spawn(pick(kinds), lanes[i], z - (kinds === "bus" ? 1 : 0));
  if (Math.random() < 0.7) coinRow(lanes[n], z + 3, 4);
}

// ---------- state ----------
const st = { on: false, z: 0, lane: 1, x: 0, t: 0, speed: 9, dist: 0, coins: 0, air: 0, slide: 0, lastHit: -99, slow: 0, guard: 14, nextRow: -30, why: "", city: ROUTE[0], turbo: 0, nextSign: -SIGN_EVERY, signIdx: 1 };
function reset() {
  Object.assign(st, { on: false, z: 0, lane: 1, x: 0, t: 0, speed: 9, dist: 0, coins: 0, air: 0, slide: 0, lastHit: -99, slow: 0, guard: 14, nextRow: -30, why: "", city: ROUTE[0], turbo: CFG.turbo ? 1 : 0, nextSign: -SIGN_EVERY, signIdx: 1 });
  [...obs, ...coins].forEach((o) => scene.remove(o)); obs.length = 0; coins.length = 0;
  chunks.forEach((c, i) => { c.position.z = -i * CH; decorate(c, i); });
  gantry.position.z = st.nextSign; signT.draw(ROUTE[1] + " ←");
}

// ---------- input: swipes + arrows ----------
function act(a) {
  if (!st.on) return;
  if (a === "L" && st.lane > 0) st.lane--;
  if (a === "R" && st.lane < 2) st.lane++;
  if (a === "U" && st.air <= 0) { st.air = 0.75; st.slide = 0; for (let i = 0; i < 6; i++) puff(car.position.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.4, 0, 0.3)), 1); }
  if (a === "D") { if (st.air > 0) st.air = Math.min(st.air, 0.12); st.slide = 0.65; }
}
let sx = 0, sy = 0, swiped = false;
$("gl").addEventListener("pointerdown", (e) => { sx = e.clientX; sy = e.clientY; swiped = false; });
$("gl").addEventListener("pointermove", (e) => {
  if (swiped || !e.buttons) return; const dx = e.clientX - sx, dy = e.clientY - sy;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 28) return;
  swiped = true; act(Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "L" : "R") : dy < 0 ? "U" : "D");
});
addEventListener("keydown", (e) => { const m = { ArrowLeft: "L", ArrowRight: "R", ArrowUp: "U", ArrowDown: "D", " ": "U" }[e.key]; if (m) { e.preventDefault(); act(m); } });

// ---------- loop ----------
function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.fov = camera.aspect < 0.8 ? 68 : 55; camera.updateProjectionMatrix(); }
addEventListener("resize", resize); resize();
let alertT = 0;
function flash(msg) { $("alert").textContent = msg; $("alert").hidden = false; alertT = 1.6; }
function hit(o) {
  o.userData.hit = true;
  if (st.turbo > 1) return;                                                      // ⚡ pickup / global turbo shield
  if (o.userData.k.front && Math.abs(st.z - (o.position.z + o.userData.k.hl)) < 0.6) return end("נכנסת באוטובוס! 🚌");
  if (st.t - st.lastHit < 6) return end("המאבטחים תפסו אותך! 🚙");
  st.lastHit = st.t; st.slow = 1.2; st.guard = 2.2; flash("💥 המאבטחים מאחוריך!");
}
function step(dt) {
  st.t += dt;
  const base = Math.min(20, 9 + st.t * 0.14) * (CFG.turbo ? 1.12 : 1);
  st.speed = base * (st.slow > 0 ? 0.6 : 1); if (st.slow > 0) st.slow -= dt;
  st.z -= st.speed * dt; st.dist += st.speed * dt;
  st.x += (LANES[st.lane] - st.x) * Math.min(1, dt * 14);
  if (st.air > 0) st.air = Math.max(0, st.air - dt); if (st.slide > 0) st.slide = Math.max(0, st.slide - dt);
  const h = st.air > 0 ? Math.sin((1 - st.air / 0.75) * Math.PI) * 1.35 : 0;
  const carTop = h + (st.slide > 0 ? 0.12 : CAR_H);
  car.position.set(st.x, h + 0.13, st.z);
  car.rotation.set(st.air > 0 ? -2 * Math.PI * (1 - st.air / 0.75) : 0, 0, (LANES[st.lane] - st.x) * -0.25);
  body.scale.set(0.9, st.slide > 0 ? 0.55 : 0.9, 0.9);
  if (st.slide > 0 && Math.random() < 0.6) puff(car.position.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.4, -0.1, 0.4)), 0.5);

  // world recycling, signs, spawns
  chunks.forEach((c) => { if (c.position.z > st.z + CH) { c.position.z -= NCH * CH; decorate(c, Math.round(-c.position.z / CH)); } });
  if (st.z < st.nextSign + 2) { st.city = ROUTE[Math.min(st.signIdx, ROUTE.length - 1)]; flash("🏁 " + st.city + "!"); st.signIdx++; st.nextSign -= SIGN_EVERY; gantry.position.z = st.nextSign; signT.draw((ROUTE[Math.min(st.signIdx, ROUTE.length - 1)]) + " ←"); }
  while (st.nextRow > st.z - 60) { spawnRow(st.nextRow, st.t + (st.z - st.nextRow) / st.speed); st.nextRow -= Math.max(9, 17 - st.t * 0.12) + Math.random() * 4; }

  for (let i = obs.length - 1; i >= 0; i--) {
    const o = obs[i], u = o.userData, k = u.k;
    if (k.move) { o.position.x += u.dir * k.move * dt; if (Math.abs(o.position.x) > 1.4) { u.dir *= -1; o.position.x = Math.sign(o.position.x) * 1.4; } o.rotation.y = u.dir > 0 ? -Math.PI / 2 : Math.PI / 2; }
    if (u.blink) u.blink.forEach((b) => (b.visible = Math.floor(st.t * 3) % 2 === 0));
    if (o.position.z > st.z + 6) { scene.remove(o); obs.splice(i, 1); continue; }
    if (u.hit) continue;
    const dz = Math.abs(st.z - o.position.z), dx = Math.abs(st.x - o.position.x);
    if (dz > k.hl + 0.45 || dx > k.hw + 0.22) continue;
    if (k.cam) { u.hit = true; if (st.turbo > 1) continue; st.coins = Math.max(0, st.coins - 10); st.slow = 0.8; st.guard = Math.min(st.guard, 5); flash("📸 דוח מהירות! −10 ₪"); continue; }
    if (k.soft) { if (h < 0.1) { u.hit = true; st.slow = 0.7; st.guard = Math.min(st.guard, 5); flash("⚠️ פס האטה!"); } continue; }
    if (carTop > k.y0 + 0.02 && h < k.y1 - 0.02) hit(o);
  }
  for (let i = coins.length - 1; i >= 0; i--) {
    const c = coins[i]; c.rotation.y += dt * 4;
    if (c.position.z > st.z + 4) { scene.remove(c); coins.splice(i, 1); continue; }
    if (Math.abs(st.z - c.position.z) < 0.5 && Math.abs(st.x - c.position.x) < 0.5 && Math.abs(h + 0.2 - c.position.y) < 0.6) { st.coins++; scene.remove(c); coins.splice(i, 1); }
  }
  // the mayor's security: two black SUVs that close in after a hit
  st.guard += ((st.t - st.lastHit < 6 ? 2.6 : 14) - st.guard) * Math.min(1, dt * (st.t - st.lastHit < 6 ? 3 : 0.5));
  guards.forEach((g, i) => { g.position.set(st.x + (i ? 0.75 : -0.75) * 0.9, 0, st.z + st.guard + i * 0.6); g.visible = st.guard < 12; });
  if (st.t - st.lastHit > 6 && st.lastHit > 0 && st.guard > 12.5) st.lastHit = -99;
}

const camPos = new THREE.Vector3(), look = new THREE.Vector3();
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  if (st.on) step(dt);
  for (let i = puffs.length - 1; i >= 0; i--) { const p = puffs[i]; p.userData.t += dt; p.scale.setScalar(p.userData.s * (1 + p.userData.t * 3)); p.material.opacity = Math.max(0, 0.85 - p.userData.t * 1.4); if (p.userData.t > 0.6) { scene.remove(p); puffs.splice(i, 1); } }
  if (alertT > 0 && (alertT -= dt) <= 0) $("alert").hidden = true;
  camPos.set(st.x * 0.7, 2.25, st.z + 4.3); camera.position.lerp(camPos, st.on ? 0.2 : 0.06);
  look.set(st.x * 0.7, 0.7, st.z - 5); camera.lookAt(look);
  if (st.on) { $("km").textContent = (st.dist * KM_PER_UNIT).toFixed(1) + " ק״מ"; $("coins").textContent = "₪ " + st.coins; }
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

// ---------- start / end ----------
const score = () => Math.round(st.dist * KM_PER_UNIT * 10) + st.coins * 50;   // same formula the server uses
function start() {
  reset(); st.on = true;
  $("start").hidden = true; $("over").hidden = true; $("hud").hidden = false;
  $("swipehint").hidden = false; setTimeout(() => ($("swipehint").hidden = true), 3200);
  $("rank").hidden = true; $("send").disabled = false;
  flash(CFG.turbo ? "⚡ טורבו פעיל! סע!" : "🏎️ גנבת את הרודסטר! סע!");
}
function end(why) {
  st.on = false; st.why = why;
  $("hud").hidden = true; $("swipehint").hidden = true;
  $("why").textContent = why; $("okm").textContent = (st.dist * KM_PER_UNIT).toFixed(1);
  $("ocity").textContent = `ברחת עד ${st.city} 🏁`; $("oscore").textContent = score().toLocaleString("he-IL"); $("ocoins").textContent = st.coins;
  try { $("handle").value = localStorage.getItem("roadster-handle") || ""; } catch {}
  $("over").hidden = false; loadTop("top2");
}
$("go").addEventListener("click", () => { if (!LOCKED) start(); });
$("again").addEventListener("click", start);
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
if (new URLSearchParams(location.search).has("debug")) window.__game = { st, step, start, end, act, obs };
if (!LOCKED && new URLSearchParams(location.search).has("autostart")) start();
