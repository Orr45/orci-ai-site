// "גונבים לביבי את הרודסטר" — a 30–60 second escape game on the same low-poly Israel map as the city.
// Same projection as /ir: 100 scene units per degree, origin 35.0E / 31.5N, so 1 unit ≈ 1.11 km.
import * as THREE from "three";
import { makeRoadster } from "/ir/roadster/car.js";

const API = "https://orciai.vercel.app/api/site/game";
const TRACK = "https://orciai.vercel.app/api/site/track";
const KM_PER_UNIT = 1.11;
const $ = (id) => document.getElementById(id);

const DATA = await (await fetch("/ir/data.json", { cache: "no-cache" })).json();
let CFG = { turbo: false };
try { CFG = { ...CFG, ...(await (await fetch("/ir/roadster/config.json", { cache: "no-cache" })).json()) }; } catch { /* defaults */ }

// ---------- scene ----------
const renderer = new THREE.WebGLRenderer({ canvas: $("gl"), antialias: true });
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3f2);
scene.fog = new THREE.Fog(0xbfe3f2, 14, 46);
const camera = new THREE.PerspectiveCamera(62, 1, 0.05, 400);
scene.add(new THREE.HemisphereLight(0xffffff, 0xb9c49a, 2.4));
const sun = new THREE.DirectionalLight(0xfff4e0, 1.5); sun.position.set(30, 60, 20); scene.add(sun);
const lam = (c) => new THREE.MeshLambertMaterial({ color: c, flatShading: true });
const LAND_H = 1.2;

const sea = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), lam(0x5fb2df)); sea.rotation.x = -Math.PI / 2; sea.position.y = 0.2; scene.add(sea);
const shapeOf = (poly) => { const ring = (r) => r.map(([x, z]) => new THREE.Vector2(x, -z)); const s = new THREE.Shape(ring(poly[0])); poly.slice(1).forEach((h) => s.holes.push(new THREE.Path(ring(h)))); return s; };
const cGreen = new THREE.Color(0x8fd16a), cSand = new THREE.Color(0xe9d49b), cSide = new THREE.Color(0xc4a875);
DATA.land.forEach((poly) => {
  const geo = new THREE.ExtrudeGeometry(shapeOf(poly), { depth: LAND_H, bevelEnabled: false }); geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position, col = new Float32Array(pos.count * 3), c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) { c.copy(cGreen).lerp(cSand, Math.min(1, Math.max(0, (pos.getZ(i) + 12) / 40))); if (pos.getY(i) < LAND_H - 0.01) c.copy(cSide); col.set([c.r, c.g, c.b], i * 3); }
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  scene.add(new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true })));
});
DATA.lakes.forEach((poly) => { const geo = new THREE.ShapeGeometry(shapeOf(poly)); geo.rotateX(-Math.PI / 2); const m = new THREE.Mesh(geo, lam(0x4aa6d8)); m.position.y = LAND_H + 0.02; scene.add(m); });
function inPoly(x, z, ring) { let ins = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [xi, zi] = ring[i], [xj, zj] = ring[j]; if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) ins = !ins; } return ins; }
const onLand = (x, z) => DATA.land.some((p) => inPoly(x, z, p[0])) && !DATA.lakes.some((p) => inPoly(x, z, p[0]));

// every commenter's house, as in the city
const M4 = new THREE.Matrix4(), Q = new THREE.Quaternion(), V = new THREE.Vector3(), S = new THREE.Vector3(), C = new THREE.Color();
const RES = DATA.residents, HS = 0.17;
const bodies = new THREE.InstancedMesh(new THREE.BoxGeometry(HS, HS * 0.8, HS), lam(0xffffff), RES.length);
const roofGeo = new THREE.ConeGeometry(HS * 0.86, HS * 0.65, 4); roofGeo.rotateY(Math.PI / 4);
const roofs = new THREE.InstancedMesh(roofGeo, lam(0xffffff), RES.length);
let seed = 20261020;
const R = () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
RES.forEach((r, i) => {
  M4.compose(V.set(r.x, LAND_H + HS * 0.4, r.z), Q.setFromAxisAngle(S.set(0, 1, 0), R() * 6.28), S.set(1, 1, 1)); bodies.setMatrixAt(i, M4);
  M4.compose(V.set(r.x, LAND_H + HS * 0.8 + HS * 0.32, r.z), Q, S.set(1, 1, 1)); roofs.setMatrixAt(i, M4);
  bodies.setColorAt(i, C.set([0xefe6d6, 0xf6efe3, 0xe8ddc9][i % 3])); roofs.setColorAt(i, C.set(r.f ? 0xffd23f : 0x4f5d73));
});
scene.add(bodies, roofs);

// the mayor's house in Jerusalem, where the Roadster landed
const JER = DATA.localities.find((l) => l.n === "ירושלים") || { x: 18.4, z: -26.9 };
const START = new THREE.Vector3(JER.x - 1.6, LAND_H, JER.z + 1.2);
const mansion = new THREE.Group(); mansion.position.copy(START).add(new THREE.Vector3(0.9, 0, -0.9)); scene.add(mansion);
const box = (w, h, d, c, x, y, z, p = mansion) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lam(c)); m.position.set(x, y, z); p.add(m); return m; };
box(1.1, 0.5, 0.8, 0xf2e3d0, 0, 0.25, 0); box(1.2, 0.08, 0.9, 0xc0392b, 0, 0.54, 0);
function textTex(text, fg = "#1a1a1a", bg = "#ffffff") { const c = document.createElement("canvas"); c.width = 512; c.height = 160; const g = c.getContext("2d"); g.fillStyle = bg; g.fillRect(0, 0, 512, 160); g.lineWidth = 12; g.strokeStyle = "#1a1a1a"; g.strokeRect(6, 6, 500, 148); g.fillStyle = fg; g.font = "900 64px Rubik, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.direction = "rtl"; g.fillText(text, 256, 84); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.38), new THREE.MeshBasicMaterial({ map: textTex("בית ראש העיר"), side: THREE.DoubleSide })); sign.position.set(0, 1.0, 0.42); mansion.add(sign);
box(0.04, 0.5, 0.04, 0x5d6470, -0.5, 0.75, 0.42); box(0.04, 0.5, 0.04, 0x5d6470, 0.5, 0.75, 0.42);

// ---------- the Roadster (low-poly parody, red) ----------
function makeCar(bodyColor, suv = false) {
  const g = new THREE.Group();
  const L = suv ? 0.56 : 0.5, Wd = suv ? 0.28 : 0.26, H = suv ? 0.2 : 0.1;
  box(Wd, H, L, bodyColor, 0, 0.07 + H / 2, 0, g);
  box(Wd * 0.86, suv ? 0.12 : 0.08, L * (suv ? 0.7 : 0.42), suv ? 0x222831 : 0x1d2433, 0, 0.07 + H + (suv ? 0.06 : 0.04), suv ? 0.02 : 0.03, g);
  const wg = new THREE.CylinderGeometry(0.06, 0.06, 0.05, 10); wg.rotateZ(Math.PI / 2);
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => { const w = new THREE.Mesh(wg, lam(0x111111)); w.position.set(sx * (Wd / 2 + 0.005), 0.06, sz * L * 0.32); g.add(w); });
  if (!suv) { box(Wd * 0.9, 0.03, 0.05, 0xffd23f, 0, 0.15, -L / 2 - 0.01, g); box(0.07, 0.03, 0.03, 0xfff6c0, -0.08, 0.12, -L / 2 - 0.02, g); box(0.07, 0.03, 0.03, 0xfff6c0, 0.08, 0.12, -L / 2 - 0.02, g); }
  return g;
}
const car = new THREE.Group(); car.rotation.order = "YXZ"; scene.add(car);
const body = makeRoadster(THREE); body.position.y = -0.15; body.scale.setScalar(0.5 / 0.5); car.add(body); car.scale.setScalar(0.5);   // pivot at the middle of the car so the flip spins in place
// cold-gas vapour puffs for the jump
const puffs = []; const puffGeo = new THREE.IcosahedronGeometry(0.09, 0);
function puff(p) { const m = new THREE.Mesh(puffGeo, new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })); m.position.copy(p); m.userData.t = 0; scene.add(m); puffs.push(m); }

// pools: chasing SUVs, roadblocks, collectible houses
const suvs = [], blocks = [], coins = [];
const coinGeo = new THREE.ConeGeometry(0.12, 0.12, 4); coinGeo.rotateY(Math.PI / 4);
function makeCoin() { const g = new THREE.Group(); box(0.14, 0.11, 0.14, 0xfff3c4, 0, 0.06, 0, g); const r = new THREE.Mesh(coinGeo, lam(0xffd23f)); r.position.y = 0.17; g.add(r); return g; }
function makeBlock() { const g = new THREE.Group(); for (let i = 0; i < 7; i++) box(0.2, 0.08, 0.06, i % 2 ? 0xffffff : 0xe5263b, -0.6 + i * 0.2, 0.2, 0, g); box(0.04, 0.2, 0.04, 0x5d6470, -0.62, 0.1, 0, g); box(0.04, 0.2, 0.04, 0x5d6470, 0.62, 0.1, 0, g); return g; }

// ---------- game state ----------
const st = { on: false, pos: START.clone(), yaw: Math.PI / 2, speed: 0, dist: 0, t: 0, coins: 0, air: 0, cool: 0, turbo: 0, steer: 0, spawnSuv: 3, spawnBlock: 4, spawnCoin: 0.6, why: "", city: "" };
const dir = new THREE.Vector3();
function reset() {
  st.pos.copy(START); st.yaw = Math.PI / 2; st.speed = 1.5; st.dist = 0; st.t = 0; st.coins = 0; st.air = 0; st.cool = 0; st.turbo = 0; st.steer = 0;
  st.spawnSuv = 2.5; st.spawnBlock = 4; st.spawnCoin = 0.5; st.turbo = CFG.turbo ? 1 : 0; // unlocked for everyone at 1,000 likes (config.json)
  [suvs, blocks, coins].forEach((arr) => { arr.forEach((o) => scene.remove(o)); arr.length = 0; });
}
const nearestCity = (x, z) => { let best = null, bd = Infinity; for (const l of DATA.localities) { const d = (l.x - x) ** 2 + (l.z - z) ** 2; if (d < bd) { bd = d; best = l; } } return best ? best.n : ""; };

// ---------- input ----------
const keys = { l: false, r: false };
let touchSteer = 0;
const steerFrom = (x) => (x < innerWidth * 0.5 ? 1 : -1); // RTL world: left side of the screen turns left
$("gl").addEventListener("pointerdown", (e) => { touchSteer = steerFrom(e.clientX); $("gl").setPointerCapture(e.pointerId); });
$("gl").addEventListener("pointermove", (e) => { if (e.buttons) touchSteer = steerFrom(e.clientX); });
["pointerup", "pointercancel"].forEach((n) => $("gl").addEventListener(n, () => (touchSteer = 0)));
addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") keys.l = true; if (e.key === "ArrowRight") keys.r = true; if (e.key === " " || e.key === "ArrowUp") { e.preventDefault(); jump(); } });
addEventListener("keyup", (e) => { if (e.key === "ArrowLeft") keys.l = false; if (e.key === "ArrowRight") keys.r = false; });
$("jump").addEventListener("pointerdown", (e) => { e.stopPropagation(); jump(); });
function jump() { if (!st.on || st.air > 0 || st.cool > 0) return; st.air = 1.1; st.cool = 2.6; for (let i = 0; i < 8; i++) puff(car.position.clone().add(new THREE.Vector3((R() - 0.5) * 0.3, 0.05, (R() - 0.5) * 0.3))); }

// ---------- loop ----------
function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.fov = camera.aspect < 0.8 ? 66 : 52; camera.updateProjectionMatrix(); }
addEventListener("resize", resize); resize();
const camPos = new THREE.Vector3(), look = new THREE.Vector3();
let last = performance.now(), alertT = 0;
function flash(msg) { $("alert").textContent = msg; $("alert").hidden = false; alertT = 1.4; }
function spawnAhead(dist, lateral) { const right = new THREE.Vector3(Math.cos(st.yaw), 0, -Math.sin(st.yaw)); return st.pos.clone().addScaledVector(dir, dist).addScaledVector(right, lateral); }

function step(dt) {
  st.t += dt;
  const steer = (keys.l ? 1 : 0) - (keys.r ? 1 : 0) || touchSteer;
  st.yaw += steer * 1.7 * dt;
  const base = Math.min(2.0, 1.5 + st.t * 0.015);
  st.speed = base * (st.air > 0 ? 1.35 : 1) * (st.turbo > 0 ? 1.25 : 1);
  dir.set(-Math.sin(st.yaw), 0, -Math.cos(st.yaw));
  st.pos.addScaledVector(dir, st.speed * dt); st.dist += st.speed * dt;
  if (st.air > 0) st.air = Math.max(0, st.air - dt); if (st.cool > 0) st.cool = Math.max(0, st.cool - dt);
  const h = st.air > 0 ? Math.sin((1 - st.air / 1.1) * Math.PI) * 0.9 : 0;
  car.position.set(st.pos.x, LAND_H + h + 0.075, st.pos.z);
  car.rotation.set(st.air > 0 ? -2 * Math.PI * (1 - st.air / 1.1) : 0, st.yaw, 0);   // every jump is a front flip
  if (st.air > 0 && R() < 0.5) puff(car.position.clone().add(new THREE.Vector3(0, -0.02, 0)));
  if (st.air === 0 && !onLand(st.pos.x, st.pos.z)) return end("נפלת לים! 🌊");

  // spawn: SUVs from behind, roadblocks and houses ahead (more as time goes on)
  if ((st.spawnSuv -= dt) <= 0) { const s = makeCar(0x1b1f27, true); s.position.copy(spawnAhead(-7, (R() - 0.5) * 3)); s.position.y = LAND_H; s.userData.life = 10; scene.add(s); suvs.push(s); st.spawnSuv = Math.max(1.6, 4.2 - st.t * 0.05); flash("🚙 מאבטחים מאחוריך!"); }
  if ((st.spawnBlock -= dt) <= 0) { const p = spawnAhead(13, (R() - 0.5) * 1.6); if (onLand(p.x, p.z)) { const b = makeBlock(); b.position.set(p.x, LAND_H, p.z); b.rotation.y = st.yaw; scene.add(b); blocks.push(b); } st.spawnBlock = Math.max(2.4, 5.5 - st.t * 0.05); }
  if ((st.spawnCoin -= dt) <= 0) { const p = spawnAhead(10 + R() * 4, (R() - 0.5) * 2.6); if (onLand(p.x, p.z)) { const c = makeCoin(); c.position.set(p.x, LAND_H, p.z); scene.add(c); coins.push(c); } st.spawnCoin = 0.9; }

  for (let i = suvs.length - 1; i >= 0; i--) {
    const s = suvs[i]; s.userData.life -= dt;
    const to = V.set(st.pos.x - s.position.x, 0, st.pos.z - s.position.z); const d = to.length();
    const sp = (s.userData.life > 0 ? base * 1.18 : base * 0.5); to.normalize();
    s.position.addScaledVector(to, Math.min(d, sp * dt)); s.rotation.y = Math.atan2(-to.x, -to.z);
    if (d < 0.32 && st.air === 0) return end("תפסו אותך! 🚙");
    if (d > 30 || (s.userData.life < -4)) { scene.remove(s); suvs.splice(i, 1); }
  }
  for (let i = blocks.length - 1; i >= 0; i--) {
    const b = blocks[i]; const dx = st.pos.x - b.position.x, dz = st.pos.z - b.position.z;
    const along = -Math.sin(b.rotation.y) * dx - Math.cos(b.rotation.y) * dz, across = Math.cos(b.rotation.y) * dx - Math.sin(b.rotation.y) * dz;
    if (Math.abs(along) < 0.12 && Math.abs(across) < 0.66 && h < 0.18) return end("נתקעת במחסום! 🚧");
    if (dx * dx + dz * dz > 400) { scene.remove(b); blocks.splice(i, 1); }
  }
  for (let i = coins.length - 1; i >= 0; i--) {
    const c = coins[i]; c.rotation.y += dt * 2; const d2 = (st.pos.x - c.position.x) ** 2 + (st.pos.z - c.position.z) ** 2;
    if (d2 < 0.11) { st.coins++; scene.remove(c); coins.splice(i, 1); continue; }
    if (d2 > 400) { scene.remove(c); coins.splice(i, 1); }
  }
}

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  if (st.on) step(dt);
  for (let i = puffs.length - 1; i >= 0; i--) { const p = puffs[i]; p.userData.t += dt; p.scale.setScalar(1 + p.userData.t * 3); p.material.opacity = Math.max(0, 0.9 - p.userData.t * 1.2); p.position.y += dt * 0.3; if (p.userData.t > 0.8) { scene.remove(p); puffs.splice(i, 1); } }
  if (alertT > 0 && (alertT -= dt) <= 0) $("alert").hidden = true;
  // chase camera
  dir.set(-Math.sin(st.yaw), 0, -Math.cos(st.yaw));
  camPos.copy(car.position).addScaledVector(dir, -3.0); camPos.y = LAND_H + 1.9;
  camera.position.lerp(camPos, st.on ? 0.12 : 0.05); look.copy(car.position).addScaledVector(dir, 2.2); camera.lookAt(look);
  if (st.on) {
    $("km").textContent = (st.dist * KM_PER_UNIT).toFixed(1) + " ק״מ"; $("coins").textContent = "🏠 " + st.coins;
    $("jump").classList.toggle("cool", st.cool > 0);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

// ---------- start / end ----------
const score = () => Math.round(st.dist * KM_PER_UNIT * 10) + st.coins * 50; // same formula the server uses
function start() {
  reset(); st.on = true; car.position.copy(START);
  $("start").hidden = true; $("over").hidden = true; $("hud").hidden = false; $("jump").hidden = false;
  $("steerhint").hidden = false; setTimeout(() => ($("steerhint").hidden = true), 3500);
  $("rank").hidden = true; $("send").disabled = false;
  flash(CFG.turbo ? "⚡ טורבו פעיל! סע!" : "🏎️ גנבת את הרודסטר! סע!");
  ping("start");
}
function end(why) {
  st.on = false; st.why = why; st.city = nearestCity(st.pos.x, st.pos.z);
  $("hud").hidden = true; $("jump").hidden = true; $("steerhint").hidden = true;
  $("why").textContent = why; $("okm").textContent = (st.dist * KM_PER_UNIT).toFixed(1);
  $("ocity").textContent = st.city ? `ברחת עד ${st.city} 🏁` : ""; $("oscore").textContent = score().toLocaleString("he-IL"); $("ocoins").textContent = st.coins;
  try { $("handle").value = localStorage.getItem("roadster-handle") || ""; } catch {}
  $("over").hidden = false; loadTop("top2");
}
$("go").addEventListener("click", start);
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
  const body = { id: uuid(), vid: visitor(), handle, km: Math.round(st.dist * KM_PER_UNIT * 10) / 10, seconds: Math.max(1, Math.round(st.t)), coins: st.coins, city: st.city };
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
function ping() { /* game starts are counted by the leaderboard rows; the visit itself is the page view below */ }
if (!optedOut()) { try { const b = JSON.stringify({ t: "view", id: uuid(), sid, vid: visitor(), path: "/ir/roadster", ref: document.referrer || null, utm: ["bio", "dm", "site", "share", "game"].includes(src) ? src : null, w: innerWidth }); if (!navigator.sendBeacon?.(TRACK, b)) fetch(TRACK, { method: "POST", body: b, keepalive: true, mode: "no-cors" }).catch(() => {}); } catch {} }

// start screen: the stolen car idling in the mayor's driveway
car.position.copy(START); car.rotation.y = st.yaw;
camera.position.set(START.x + 2.5, LAND_H + 2.4, START.z + 2.2);
loadTop("top");
$("loading").classList.add("done");
requestAnimationFrame(frame);
if (new URLSearchParams(location.search).has("debug")) window.__game = { st, step, start, end, suvs, blocks, coins };
if (new URLSearchParams(location.search).has("autostart")) start();
