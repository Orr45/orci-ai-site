// מדידת כניסות לעיר המצביעים — נשלחת למערכת הניהול (orciai), כמו OrciTracker של שאר האתר.
// אותו פורמט ואותם מזהים אקראיים (orci-sid / orci-vid), בלי עוגיות ובלי IP.
// מעבר לאתר: שם המשתמש שחיפשו ונמצא במפה (שם ציבורי של מי שהגיב) נשמר כתווית של האירוע.
// מקור הכניסה: ?src=bio (קישור בביו) / site (מהאתר) / dm (מהבוט) / share (שיתוף), או ?u= בלבד = link.
const ENDPOINT = "https://orciai.vercel.app/api/site/track";
const CHECKPOINTS = [10, 30, 60, 120, 300, 600, 1200, 1800];
const SOURCES = ["bio", "site", "dm", "share"];

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}
function send(payload) {
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, body)) return;
    fetch(ENDPOINT, { method: "POST", body, keepalive: true, mode: "no-cors" }).catch(() => {});
  } catch { /* מדידה לעולם לא מפריעה לעמוד */ }
}
function optedOut() {
  try {
    const q = new URLSearchParams(location.search).get("notrack");
    if (q === "1") localStorage.setItem("orci-notrack", "1");
    if (q === "0") localStorage.removeItem("orci-notrack");
    return localStorage.getItem("orci-notrack") === "1";
  } catch { return false; }
}
function stored(store, key) {
  try { let v = store.getItem(key); if (!v) { v = uuid(); store.setItem(key, v); } return v; } catch { return null; }
}

const OFF = optedOut();
const sid = stored(sessionStorage, "orci-sid") || uuid();
const vid = stored(localStorage, "orci-vid");
const params = new URLSearchParams(location.search);
const src = (params.get("src") || "").toLowerCase();
const source = SOURCES.includes(src) ? src : params.get("u") ? "link" : null;

const view = { id: uuid(), visibleMs: 0, since: document.visibilityState === "visible" ? Date.now() : null, sent: 0 };
const elapsed = () => Math.round((view.visibleMs + (view.since !== null ? Date.now() - view.since : 0)) / 1000);
function flush() { const s = elapsed(); if (s > view.sent) { view.sent = s; send({ t: "time", id: view.id, s }); } }

if (!OFF) {
  send({ t: "view", id: view.id, sid, vid, path: "/ir", ref: document.referrer || null, utm: source, w: window.innerWidth });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") { if (view.since !== null) { view.visibleMs += Date.now() - view.since; view.since = null; } flush(); }
    else view.since = Date.now();
  });
  window.addEventListener("pagehide", flush);
  CHECKPOINTS.forEach((s) => setTimeout(flush, s * 1000));
}

const seen = new Set();
/** אירוע בעמוד; אותו אירוע עם אותה תווית נשלח פעם אחת בביקור */
export function track(name, label) {
  if (OFF) return;
  const key = name + "|" + (label || "");
  if (seen.has(key)) return;
  seen.add(key);
  send({ t: "act", id: uuid(), sid, vid, path: "/ir", name, label: label ? String(label).slice(0, 80) : null });
}
