// עיר המצביעים · "איפה הבית שלי?" — the same low-poly Israel map as the reels, with every commenter's house.
// Coordinates: 100 scene units per degree, origin 35.0E / 31.5N (same projection as the videos).
import * as THREE from "three";
import { MapControls } from "/ir/vendor/MapControls.js";
import { track } from "/ir/track.js";

const DM_URL = "https://ig.me/m/orciai45"; // replaced by the ManyChat ref link once the flow is live
const $ = (id) => document.getElementById(id);
const MSGS = ["סופרים קולות", "מודדים מגרשים", "מחלקים מפתחות לתושבים", "שותלים עצים בגליל", "צובעים את הכנסת", "עוד רגע. הפקיד בהפסקה"];
let mi = 0;
const msgTimer = setInterval(() => { $("ldmsg").textContent = MSGS[++mi % MSGS.length]; }, 900);
const setBar = (p) => ($("ldbar").style.width = Math.round(p * 100) + "%");

const res = await fetch("/ir/data.json", { cache: "no-cache" });
setBar(0.4);
const DATA = await res.json();
setBar(0.6);

// ---------- renderer / scene ----------
const canvas = $("gl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x5fb2df);
const camera = new THREE.PerspectiveCamera(45, 1, 0.05, 4000);
scene.add(new THREE.HemisphereLight(0xffffff, 0xb9c49a, 2.4));
const sun = new THREE.DirectionalLight(0xfff4e0, 1.6); sun.position.set(80, 200, 60); scene.add(sun);
const lam = (c) => new THREE.MeshLambertMaterial({ color: c, flatShading: true });

const LAND_H = 1.2;
const shapeOf = (poly) => {
  const ring = (r) => r.map(([x, z]) => new THREE.Vector2(x, -z));
  const s = new THREE.Shape(ring(poly[0]));
  poly.slice(1).forEach((h) => s.holes.push(new THREE.Path(ring(h))));
  return s;
};
const cGreen = new THREE.Color(0x8fd16a), cSand = new THREE.Color(0xe9d49b), cSide = new THREE.Color(0xc4a875);
DATA.land.forEach((poly) => {
  const geo = new THREE.ExtrudeGeometry(shapeOf(poly), { depth: LAND_H, bevelEnabled: false });
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position, col = new Float32Array(pos.count * 3), c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const k = Math.min(1, Math.max(0, (pos.getZ(i) + 12) / 40));
    c.copy(cGreen).lerp(cSand, k);
    if (pos.getY(i) < LAND_H - 0.01) c.copy(cSide);
    col.set([c.r, c.g, c.b], i * 3);
  }
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  scene.add(new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true })));
  const rim = new THREE.Mesh(new THREE.ShapeGeometry(shapeOf(poly)), new THREE.MeshBasicMaterial({ color: 0x9fd6ef }));
  rim.rotation.x = -Math.PI / 2; rim.position.y = -0.05; rim.scale.set(1.03, 1.01, 1); scene.add(rim);
});
DATA.lakes.forEach((poly) => {
  const geo = new THREE.ShapeGeometry(shapeOf(poly)); geo.rotateX(-Math.PI / 2);
  const m = new THREE.Mesh(geo, lam(0x4aa6d8)); m.position.y = LAND_H + 0.02; scene.add(m);
});
setBar(0.75);

// ---------- trees (deterministic) ----------
let seed = 20261014;
const R = () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
function inPoly(x, z, ring) { let ins = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [xi, zi] = ring[i], [xj, zj] = ring[j]; if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) ins = !ins; } return ins; }
const onLand = (x, z) => DATA.land.some((p) => inPoly(x, z, p[0])) && !DATA.lakes.some((p) => inPoly(x, z, p[0]));
// keep trees out of the towns so the houses stay visible
const TOWNS = DATA.localities.filter((l) => l.k >= 2).map((l) => [l.x, l.z, (0.34 * Math.sqrt(l.k) + 0.5) ** 2]);
const inTown = (x, z) => TOWNS.some(([tx, tz, r2]) => (x - tx) ** 2 + (z - tz) ** 2 < r2);
const M4 = new THREE.Matrix4(), Q = new THREE.Quaternion(), V = new THREE.Vector3(), S = new THREE.Vector3(), C = new THREE.Color();
const NT = 2200, leaves = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 0), lam(0xffffff), NT);
const greens = [0x3f8f3a, 0x4ea446, 0x2f7a35, 0x5bb04f, 0x367f3c];
let nt = 0;
while (nt < NT) {
  const x = -80 + R() * 160, z = -200 + R() * 410;
  if (!onLand(x, z) || inTown(x, z)) continue;
  if (z > -8 && R() > 0.05 + Math.max(0, (40 - z) / 48) * 0.35) continue;
  const s = 0.2 + R() * 0.22;
  M4.compose(V.set(x, LAND_H + s, z), Q.identity(), S.set(s, s * 1.1, s)); leaves.setMatrixAt(nt, M4);
  leaves.setColorAt(nt, C.set(greens[(R() * greens.length) | 0])); nt++;
}
scene.add(leaves);

// ---------- houses ----------
const RES = DATA.residents, N = RES.length;
const HS = 0.17; // house size (one scene unit ≈ 1.1 km, so houses are symbols, not to scale)
const bodies = new THREE.InstancedMesh(new THREE.BoxGeometry(HS, HS * 0.8, HS), lam(0xffffff), N);
const roofGeo = new THREE.ConeGeometry(HS * 0.86, HS * 0.65, 4); roofGeo.rotateY(Math.PI / 4);
const roofs = new THREE.InstancedMesh(roofGeo, lam(0xffffff), N);
const walls = [0xefe6d6, 0xf6efe3, 0xe8ddc9, 0xf2e3d0];
RES.forEach((r, i) => {
  const ry = R() * 6.28;
  M4.compose(V.set(r.x, LAND_H + HS * 0.4, r.z), Q.setFromAxisAngle(S.set(0, 1, 0), ry), S.set(1, 1, 1)); bodies.setMatrixAt(i, M4);
  M4.compose(V.set(r.x, LAND_H + HS * 0.8 + HS * 0.32, r.z), Q, S.set(1, 1, 1)); roofs.setMatrixAt(i, M4);
  bodies.setColorAt(i, C.set(walls[i % walls.length]));
  roofs.setColorAt(i, C.set(r.f ? 0xffd23f : r.p === "t" ? 0x3a3f4a : 0x4f5d73));
});
scene.add(bodies, roofs);
// founders get a little yellow flag
const founders = RES.filter((r) => r.f);
const poles = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.008, 0.008, 0.36, 4), lam(0x5d6470), founders.length);
const flags = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.16, 0.09), new THREE.MeshLambertMaterial({ color: 0xffd23f, side: THREE.DoubleSide }), founders.length);
founders.forEach((r, i) => {
  M4.compose(V.set(r.x + HS * 0.6, LAND_H + 0.18, r.z), Q.identity(), S.set(1, 1, 1)); poles.setMatrixAt(i, M4);
  M4.compose(V.set(r.x + HS * 0.6 + 0.08, LAND_H + 0.31, r.z), Q.identity(), S.set(1, 1, 1)); flags.setMatrixAt(i, M4);
});
scene.add(poles, flags);
setBar(0.9);

// selected-house marker
const marker = new THREE.Group(); marker.visible = false; scene.add(marker);
const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.22, 4), lam(0xffd23f)); arrow.rotation.x = Math.PI; marker.add(arrow);
const ring = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.22, 24), new THREE.MeshBasicMaterial({ color: 0xffd23f, side: THREE.DoubleSide }));
ring.rotation.x = -Math.PI / 2; marker.add(ring);

// ---------- camera + controls ----------
const controls = new MapControls(camera, canvas);
controls.enableDamping = true; controls.dampingFactor = 0.08; controls.screenSpacePanning = false;
controls.minDistance = 0.8; controls.maxDistance = 900; controls.maxPolarAngle = Math.PI * 0.44;
const HOME = { pos: new THREE.Vector3(0, 520, 180), target: new THREE.Vector3(0, 0, 0) };
camera.position.copy(HOME.pos); controls.target.copy(HOME.target);

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h;
  const narrow = w / h < 0.75; // phones: pull back so the whole country fits
  HOME.target.set(0, 0, narrow ? 95 : 35); // the bottom panel covers the south, so centre the country higher
  HOME.pos.set(0, narrow ? 640 : 470, (narrow ? 95 : 35) + (narrow ? 210 : 150));
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize); resize();
camera.position.copy(HOME.pos); controls.target.copy(HOME.target);

let fly = null; // {from, to, tFrom, tTo, t0, d}
function flyTo(target, dist = 6, d = 1600) {
  const dir = new THREE.Vector3(0, 0.82, 0.57).normalize();
  fly = { from: camera.position.clone(), to: target.clone().addScaledVector(dir, dist), tFrom: controls.target.clone(), tTo: target.clone(), t0: performance.now(), d };
}
const easeIO = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

// ---------- labels (top cities + the selected house) ----------
const labelsEl = $("labels");
const TOP = DATA.localities.slice(0, 40).map((l) => { const e = document.createElement("div"); e.className = "lb"; e.innerHTML = `${l.n} <b>${l.k.toLocaleString("he-IL")}</b>`; labelsEl.appendChild(e); return { l, e, v: new THREE.Vector3(l.x, LAND_H + 0.6, l.z) }; });
const meLabel = document.createElement("div"); meLabel.className = "lb me"; meLabel.style.display = "none"; labelsEl.appendChild(meLabel);
let selected = null;
const pv = new THREE.Vector3();
function placeLabels() {
  const dist = camera.position.distanceTo(controls.target);
  const show = dist > 250 ? 8 : dist > 120 ? 16 : dist > 40 ? 40 : 40;
  const rect = [];
  TOP.forEach(({ e, v }, i) => {
    pv.copy(v).project(camera);
    const x = (pv.x * 0.5 + 0.5) * innerWidth, y = (-pv.y * 0.5 + 0.5) * innerHeight;
    let ok = i < show && pv.z < 1 && x > 0 && x < innerWidth && y > 60 && y < innerHeight;
    if (ok && rect.some(([a, b]) => Math.abs(a - x) < 80 && Math.abs(b - y) < 24)) ok = false; // no overlapping labels
    e.style.display = ok ? "block" : "none";
    if (ok) { e.style.left = x + "px"; e.style.top = y + "px"; rect.push([x, y]); }
  });
  if (selected) {
    pv.set(selected.x, LAND_H + 0.5, selected.z).project(camera);
    meLabel.style.left = (pv.x * 0.5 + 0.5) * innerWidth + "px"; meLabel.style.top = (-pv.y * 0.5 + 0.5) * innerHeight + "px";
  }
}

// ---------- loop ----------
renderer.setAnimationLoop((now) => {
  if (fly) {
    const k = Math.min(1, (now - fly.t0) / fly.d), e = easeIO(k);
    camera.position.lerpVectors(fly.from, fly.to, e); controls.target.lerpVectors(fly.tFrom, fly.tTo, e);
    if (k >= 1) fly = null;
  }
  if (marker.visible) { arrow.position.y = 0.42 + Math.sin(now / 220) * 0.06; ring.scale.setScalar(1 + 0.15 * Math.sin(now / 300)); }
  controls.update();
  renderer.render(scene, camera);
  placeLabels();
});

// ---------- UI ----------
$("sday").textContent = DATA.day;
$("stotal").textContent = DATA.total.toLocaleString("he-IL");
$("slocs").textContent = DATA.localities.length.toLocaleString("he-IL");
const LOC = Object.fromEntries(DATA.localities.map((l) => [l.c, l]));
const PL = { i: "אינסטגרם", t: "טיקטוק" };
const norm = (s) => (s || "").toLowerCase().replace(/^@/, "").trim();
const byUser = new Map();
RES.forEach((r) => { const k = norm(r.u); if (!byUser.has(k)) byUser.set(k, []); byUser.get(k).push(r); });
const userKeys = [...byUser.keys()];

function showHouse(r, via = "found") {
  selected = r;
  if (via === "found") track("city_found", r.u);
  const L = LOC[r.c];
  marker.position.set(r.x, LAND_H + 0.05, r.z); marker.visible = true;
  meLabel.textContent = "@" + r.u; meLabel.style.display = "block";
  flyTo(new THREE.Vector3(r.x, LAND_H, r.z + 0.55), 3.4); // look a bit south of the house so it sits above the panel
  const card = $("card");
  card.hidden = false;
  card.innerHTML = `
    <div class="who">@${esc(r.u)}</div>
    <div class="addr">רחוב ${esc(r.s)} ${r.h}, ${esc(L.n)}</div>
    <div class="meta">בית מספר ${r.h.toLocaleString("he-IL")} מתוך ${L.k.toLocaleString("he-IL")} ב${esc(L.n)} · ${PL[r.p]}</div>
    <div class="badges">
      ${r.f ? '<span class="badge founder">⭐ מייסד/ת ' + esc(L.n) + "</span>" : '<span class="badge">מייסד/ת ' + esc(L.n) + ": @" + esc(L.f) + "</span>"}
      ${r.g ? '<span class="badge garden">🌳 יש לך גינה</span>' : '<span class="badge nogarden">🌳 גינה לעוקבים</span>'}
    </div>
    <div class="actions">
      <a class="dm" id="dmlink" href="${DM_URL}" target="_blank" rel="noopener">📩 שלחו לי את הכתובת</a>
      <button type="button" id="share">שיתוף</button>
    </div>`;
  $("dmlink").onclick = () => track("city_dm", r.u);
  $("share").onclick = () => {
    track("city_share", r.u);
    const url = location.origin + "/ir?u=" + encodeURIComponent(r.u) + "&src=share";
    const text = `יש לי בית בעיר המצביעים! רחוב ${r.s} ${r.h}, ${L.n} 🏠`;
    if (navigator.share) navigator.share({ title: "עיר המצביעים", text, url }).catch(() => {});
    else navigator.clipboard?.writeText(text + " " + url).then(() => ($("share").textContent = "הקישור הועתק ✓"));
  };
  history.replaceState(null, "", "/ir?u=" + encodeURIComponent(r.u));
}
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const resultsEl = $("results");
let missTimer = 0;
$("q").addEventListener("input", () => {
  const q = norm($("q").value);
  resultsEl.innerHTML = "";
  clearTimeout(missTimer);
  if (q.length < 2) return;
  const hits = userKeys.filter((k) => k.startsWith(q)).slice(0, 8);
  if (!hits.length) {
    missTimer = setTimeout(() => track("city_notfound", q), 1500); // only the final text, not every keystroke
    resultsEl.innerHTML = `<li class="empty" role="option">עוד לא מצאנו בית בשם הזה. תגיבו בסרטון האחרון עם העיר שלכם, והבית יופיע בעדכון הבא 🏗️</li>`; return; }
  hits.forEach((k) => byUser.get(k).forEach((r) => {
    const li = document.createElement("li"); li.setAttribute("role", "option"); li.tabIndex = 0;
    li.innerHTML = `<span class="h">@${esc(r.u)}</span><span class="c">${esc(LOC[r.c].n)} · ${PL[r.p]}</span>`;
    li.onclick = li.onkeydown = (ev) => { if (ev.type === "keydown" && ev.key !== "Enter") return; resultsEl.innerHTML = ""; showHouse(r); };
    resultsEl.appendChild(li);
  }));
});

// tabs
document.querySelectorAll(".tabs button").forEach((b) => b.addEventListener("click", () => {
  document.querySelectorAll(".tabs button").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", x === b); });
  ["home", "cities", "founders"].forEach((t) => ($("tab-" + t).hidden = t !== b.dataset.tab));
  track("city_tab", b.dataset.tab);
}));
const goCity = (l) => { selected = null; meLabel.style.display = "none"; marker.visible = false; const d = 8 + Math.sqrt(l.k) * 1.1; flyTo(new THREE.Vector3(l.x, LAND_H, l.z + d * 0.35), d); };
const citiesEl = $("cities");
DATA.localities.slice(0, 50).forEach((l, i) => {
  const li = document.createElement("li"); li.tabIndex = 0;
  li.innerHTML = `<span class="rk">${i + 1}</span><span>${esc(l.n)}</span><span class="cnt">${l.k.toLocaleString("he-IL")}</span>`;
  li.onclick = () => { track("city_place", l.n); goCity(l); }; citiesEl.appendChild(li);
});
const foundersEl = $("founders");
function drawFounders(q = "") {
  foundersEl.innerHTML = "";
  DATA.localities.filter((l) => !q || l.n.includes(q)).slice(0, 60).forEach((l) => {
    const li = document.createElement("li"); li.tabIndex = 0;
    li.innerHTML = `<span class="rk">⭐</span><span>${esc(l.n)}</span><span class="fu">@${esc(l.f)}</span>`;
    li.onclick = () => { track("city_place", l.n); const r = RES.find((x) => x.c === l.c && x.f); if (r) showHouse(r, "founder"); };
    foundersEl.appendChild(li);
  });
}
drawFounders(); $("fq").addEventListener("input", (e) => drawFounders(e.target.value.trim()));

// deep link ?u=handle (from the DM)
const qU = new URLSearchParams(location.search).get("u");
setBar(1);
clearInterval(msgTimer);
setTimeout(() => { $("loading").classList.add("done"); setTimeout(() => ($("loading").style.display = "none"), 600); }, 250);
if (qU && byUser.has(norm(qU))) setTimeout(() => showHouse(byUser.get(norm(qU))[0]), 700);
else if (qU) track("city_notfound", norm(qU));
