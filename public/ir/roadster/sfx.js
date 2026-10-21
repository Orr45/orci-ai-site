// Game sound effects (ElevenLabs SFX samples in ./sfx). Web Audio, unlocked on the first tap — iOS keeps it silent until then.
// Every call is a no-op until the buffers are decoded, so the game runs the same if audio is blocked or fails to load.
const NAMES = ["coin", "lane", "jump", "land", "duck", "scrape", "crash", "pit", "camera", "bump", "siren", "horn", "protest", "stage", "caught", "engine", "door", "start", "screech", "hey"];
const VOL = { coin: 0.45, lane: 0.3, jump: 0.45, land: 0.4, duck: 0.4, scrape: 0.6, crash: 0.85, pit: 0.85, camera: 0.7, bump: 0.55, siren: 0.35, horn: 0.4, protest: 0.45, stage: 0.55, caught: 0.75, door: 0.7, start: 0.6, screech: 0.6, hey: 0.75 };
const ENGINE_VOL = 0.15;
let ctx = null, master = null, engine = null, engineGain = null, muted = false;
const buf = {}, last = {};
export const counts = {};
try { muted = localStorage.getItem("roadster-mute") === "1"; } catch {}

export function unlock() {
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value = muted ? 0 : 0.8; master.connect(ctx.destination);
      NAMES.forEach(async (n) => { try { const r = await fetch(`/ir/roadster/sfx/${n}.mp3`); buf[n] = await ctx.decodeAudioData(await r.arrayBuffer()); } catch {} });
    } catch { ctx = null; return; }
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
}

// gap: minimum seconds between two plays of the same sound, so a busy row doesn't stack ten sirens
export function play(n, { vol = 1, rate = 1, gap = 0.08 } = {}) {
  if (!ctx || !buf[n]) return;
  const now = ctx.currentTime; if (now - (last[n] ?? -99) < gap) return; last[n] = now;
  const s = ctx.createBufferSource(), g = ctx.createGain();
  s.buffer = buf[n]; s.playbackRate.value = rate; g.gain.value = (VOL[n] ?? 0.6) * vol;
  s.connect(g).connect(master); s.start();
  counts[n] = (counts[n] || 0) + 1;
}

// low road hum under the chase; a little faster as the car speeds up
export function engineHum(on, speed = 11) {
  if (!ctx || !buf.engine) return;
  if (on && !engine) {
    engine = ctx.createBufferSource(); engine.buffer = buf.engine; engine.loop = true;
    engineGain = ctx.createGain(); engineGain.gain.value = 0; engine.connect(engineGain).connect(master); engine.start();
    engineGain.gain.setTargetAtTime(ENGINE_VOL, ctx.currentTime, 0.15);
  }
  if (!engine) return;
  if (on) engine.playbackRate.setTargetAtTime(0.85 + Math.min(1, speed / 30) * 0.4, ctx.currentTime, 0.3);
  else { const e = engine; engineGain.gain.setTargetAtTime(0, ctx.currentTime, 0.08); setTimeout(() => { try { e.stop(); } catch {} }, 400); engine = null; }
}

export const isMuted = () => muted;
export function setMuted(m) {
  muted = m;
  try { localStorage.setItem("roadster-mute", m ? "1" : "0"); } catch {}
  if (master) master.gain.setTargetAtTime(m ? 0 : 0.8, ctx.currentTime, 0.03);
}
