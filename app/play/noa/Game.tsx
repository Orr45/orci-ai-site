'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { track } from '@vercel/analytics';
import styles from './page.module.css';
import { ENDINGS, LESSON, START, STORY, type Beat, type Choice, type EndingId, type Sfx } from './story';

/* ---------------- endings found (localStorage, shared across plays) ---------------- */
const STORE = 'orci-noa-endings';
const EVT = 'orci-noa-endings';
const IDS = ENDINGS.map((e) => e.id);
function readRaw(): string {
  try {
    return localStorage.getItem(STORE) ?? '[]';
  } catch {
    return '[]';
  }
}
function subscribe(cb: () => void) {
  window.addEventListener('storage', cb);
  window.addEventListener(EVT, cb);
  return () => {
    window.removeEventListener('storage', cb);
    window.removeEventListener(EVT, cb);
  };
}
function parseEndings(raw: string): EndingId[] {
  try {
    const arr = JSON.parse(raw) as string[];
    return IDS.filter((id) => arr.includes(id));
  } catch {
    return [];
  }
}
function saveEndings(found: EndingId[]) {
  try {
    localStorage.setItem(STORE, JSON.stringify(found));
  } catch {}
  window.dispatchEvent(new Event(EVT));
}

/* ---------------- sound engine (Web Audio, so volumes work on iPhone too) ---------------- */
const VOICE_LIST: Sfx[] = ['mom1', 'noa2', 'noa3', 'noa_code', 'noa_dont', 'mom_word', 'mom_phone', 'mom_real', 'mom_code'];
const SOUNDS: (Sfx | 'rain' | 'drone')[] = [
  'rain', 'drone', 'knock_heavy', 'growl', 'heartbeat', 'tick', 'lock', 'glitch', 'phone', 'ping', ...VOICE_LIST,
];
const VOICES = new Set<Sfx>(VOICE_LIST);
// Noa's lines are recorded softer than mom's (whisper), so lift them to sit at the same level.
const GAIN: Partial<Record<Sfx, number>> = {
  tick: 0.5, heartbeat: 0.9, phone: 0.6, ping: 0.5, lock: 0.8, glitch: 0.6,
  noa1: 1.8, noa2: 1.8, noa3: 1.8, noa_code: 1.8, noa_dont: 1.8,
};

// Downloaded as soon as the page opens, before the visitor taps "להיכנס לבית".
// Without this, the first line (mom at the door) was asked to play before its file arrived, and was silently skipped.
const files = new Map<string, Promise<ArrayBuffer | null>>();
function prefetch() {
  SOUNDS.forEach((n) => {
    if (!files.has(n)) {
      files.set(
        n,
        fetch(`/play/noa/a/${n}.mp3`)
          .then((r) => (r.ok ? r.arrayBuffer() : null))
          .catch(() => null),
      );
    }
  });
}

class Engine {
  ctx: AudioContext;
  master: GainNode;
  bed: GainNode; // rain + drone, ducked while someone talks
  rain: GainNode;
  drone: GainNode;
  buf = new Map<string, AudioBuffer>();
  ready = new Map<string, Promise<AudioBuffer | null>>();
  voice: AudioBufferSourceNode | null = null;
  epoch = 0; // bumped on every new beat; a sound that finishes loading after its beat is gone is dropped

  constructor() {
    // iPhone: play through the silent switch, like a video would (Safari 16.4+)
    const session = (navigator as Navigator & { audioSession?: { type: string } }).audioSession;
    if (session) session.type = 'playback';
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.connect(this.ctx.destination);
    this.bed = this.ctx.createGain();
    this.bed.connect(this.master);
    this.rain = this.ctx.createGain();
    this.rain.gain.value = 0;
    this.rain.connect(this.bed);
    this.drone = this.ctx.createGain();
    this.drone.gain.value = 0.32;
    this.drone.connect(this.bed);
    prefetch();
    SOUNDS.forEach((n) => this.ready.set(n, this.decode(n)));
    this.loop('rain', this.rain);
    this.loop('drone', this.drone);
  }
  async decode(name: string) {
    const data = await files.get(name);
    if (!data) return null;
    try {
      const b = await this.ctx.decodeAudioData(data.slice(0));
      this.buf.set(name, b);
      return b;
    } catch {
      return null;
    }
  }
  async loop(name: string, out: GainNode) {
    const b = await this.ready.get(name);
    if (!b) return;
    const s = this.ctx.createBufferSource();
    s.buffer = b;
    s.loop = true;
    s.connect(out);
    s.start();
  }
  /** Resolves when these sounds are decoded, or after `ms`, whichever comes first. */
  whenReady(names: string[], ms: number) {
    return Promise.race([
      Promise.all(names.map((n) => this.ready.get(n))),
      new Promise((r) => setTimeout(r, ms)),
    ]);
  }
  newBeat() {
    this.epoch += 1;
  }
  play(name: Sfx) {
    const b = this.buf.get(name);
    if (b) return this.start(name, b);
    const e = this.epoch;
    void this.ready.get(name)?.then((late) => {
      if (late && e === this.epoch) this.start(name, late);
    });
  }
  private start(name: Sfx, b: AudioBuffer) {
    const isVoice = VOICES.has(name);
    if (isVoice && this.voice) {
      try {
        this.voice.stop();
      } catch {}
    }
    const s = this.ctx.createBufferSource();
    const g = this.ctx.createGain();
    g.gain.value = GAIN[name] ?? 1;
    s.buffer = b;
    s.connect(g).connect(this.master);
    s.start();
    if (isVoice) {
      this.voice = s;
      this.bed.gain.setTargetAtTime(0.45, this.ctx.currentTime, 0.08);
      s.onended = () => {
        if (this.voice === s) this.bed.gain.setTargetAtTime(1, this.ctx.currentTime, 0.4);
      };
    }
  }
  setRain(v: number) {
    this.rain.gain.setTargetAtTime(v * 0.55, this.ctx.currentTime, 0.5);
  }
  mute(m: boolean) {
    this.master.gain.setTargetAtTime(m ? 0 : 1, this.ctx.currentTime, 0.05);
  }
}

const noop = () => () => {};

type Phase = 'intro' | 'beats' | 'choices' | 'ending';
const SHARE_TEXT = 'ב-3 בלילה אמא דופקת בדלת, וה-AI של הבית אומר לא לפתוח. מה היית עושה? 🚪';
const isMedia = (bg: string) => !bg.startsWith('/');

function Scene({ bg }: { bg: string }) {
  return isMedia(bg) ? (
    <video key={bg} className={styles.bg} src={`/play/noa/v/${bg}.mp4`} autoPlay muted loop playsInline preload="auto" />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img key={bg} className={`${styles.bg} ${styles.still}`} src={bg} alt="" />
  );
}

function Board({ found, highlight }: { found: EndingId[]; highlight?: EndingId | null }) {
  return (
    <div className={styles.fridge}>
      <div className={styles.screen}>
        <div className={styles.boardHead}>
          <span className={styles.moon} aria-hidden />
          הסופים שגילית
        </div>
        <ol className={styles.board}>
          {ENDINGS.map((e, i) => {
            const known = found.includes(e.id);
            return (
              <li key={e.id} className={`${e.id === highlight ? styles.hl : ''} ${known ? '' : styles.lockedRow}`}>
                <span className={styles.n}>{i + 1}</span>
                <span className={styles.rt}>{known ? e.name : 'נעול. שחקו שוב כדי לגלות.'}</span>
                {known ? (
                  <span className={`${styles.kind} ${styles['kind_' + e.kind]}`}>
                    {e.kind === 'best' ? 'הכי טוב' : e.kind === 'good' ? 'טוב' : 'רע'}
                  </span>
                ) : (
                  <span className={styles.lk} aria-hidden>🔒</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default function Game() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [nodeId, setNodeId] = useState(START);
  const [beat, setBeat] = useState(0);
  const [name, setName] = useState('');
  const [fresh, setFresh] = useState(false);
  const [left, setLeft] = useState(0);
  const [holding, setHolding] = useState<string | null>(null);
  const [fx, setFx] = useState({ shake: 0, red: 0 });
  const [muted, setMuted] = useState(false);
  const [path, setPath] = useState<string[]>([START]);
  const [loading, setLoading] = useState(false);
  const raw = useSyncExternalStore(subscribe, readRaw, () => '[]');
  const isClient = useSyncExternalStore(noop, () => true, () => false);
  const found = useMemo(() => parseEndings(raw), [raw]);

  const eng = useRef<Engine | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gate = useRef(false);

  const node = STORY[nodeId];
  const cur: Beat | undefined = phase === 'beats' ? node.beats[beat] : undefined;
  const bg = (phase === 'beats' && cur?.bg) || node.bg;
  const clock = cur?.clock ?? node.clock;
  const noaTalking = cur?.who === 'noa';
  const endInfo = node.ending ? ENDINGS.find((e) => e.id === node.ending?.id) : undefined;
  const red = node.noaRed || cur?.red || false;

  const fire = (b: Beat) => {
    gate.current = true;
    setTimeout(() => {
      gate.current = false;
    }, 350);
    eng.current?.newBeat();
    b.sfx?.forEach((s) => eng.current?.play(s));
    if (b.buzz) navigator.vibrate?.(b.buzz);
    if (b.shake || b.red) setFx((f) => ({ shake: b.shake ? f.shake + 1 : f.shake, red: b.red ? f.red + 1 : f.red }));
  };

  const stopTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  function enterNode(id: string) {
    const n = STORY[id];
    stopTimer();
    setNodeId(id);
    setBeat(0);
    setPhase('beats');
    eng.current?.setRain(n.rain);
    fire(n.beats[0]);
  }

  async function start() {
    if (loading) return;
    if (!eng.current) eng.current = new Engine();
    void eng.current.ctx.resume(); // must run inside the tap, before any await
    track('noa_start', { named: name.trim() ? 'yes' : 'no' });
    setLoading(true);
    await eng.current.whenReady(['mom1', 'rain', 'drone'], 4000);
    setLoading(false);
    setPath([START]);
    enterNode(START);
  }

  function openChoices() {
    const n = STORY[nodeId];
    if (!n.choices) {
      const id = n.ending?.id;
      if (id && !found.includes(id)) {
        saveEndings([...found, id]);
        setFresh(true);
      } else setFresh(false);
      eng.current?.play('glitch');
      setPhase('ending');
      track('noa_ending', { ending: nodeId, path: path.join('>') });
      return;
    }
    setPhase('choices');
    if (n.timer) {
      let r = n.timer.sec;
      setLeft(r);
      const to = n.timer.to;
      timer.current = setInterval(() => {
        r -= 1;
        setLeft(r);
        eng.current?.play(r <= 3 ? 'heartbeat' : 'tick');
        if (r <= 0) {
          stopTimer();
          track('noa_timeout', { from: nodeId, to });
          go(to);
        }
      }, 1000);
    }
  }

  function next() {
    if (phase !== 'beats') return;
    if (gate.current) return; // let the line land
    const n = STORY[nodeId];
    if (beat + 1 < n.beats.length) {
      setBeat(beat + 1);
      fire(n.beats[beat + 1]);
      return;
    }
    openChoices();
  }

  function go(to: string) {
    stopTimer();
    setHolding(null);
    setPath((p) => [...p, to]);
    enterNode(to);
  }

  function choose(c: Choice) {
    track('noa_choice', { from: nodeId, to: c.to, label: c.label });
    go(c.to);
  }

  function holdStart(c: Choice, e: React.PointerEvent<HTMLButtonElement>) {
    // keep the press on this button even if the finger drifts, so the hold isn't cancelled halfway
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setHolding(c.to);
    eng.current?.play('heartbeat');
    holdT.current = setTimeout(() => choose(c), 1100);
  }
  function holdEnd() {
    if (holdT.current) clearTimeout(holdT.current);
    setHolding(null);
  }

  function restart() {
    track('noa_restart', { found: found.length });
    setPath([START]);
    enterNode(START);
  }

  async function share() {
    const url = 'https://www.orciai.app/play/noa?src=share';
    track('noa_share', { ending: nodeId });
    try {
      if (navigator.share) {
        await navigator.share({ title: 'הבית של נועה', text: SHARE_TEXT, url });
        return;
      }
    } catch {
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT}\n${url}`)}`, '_blank', 'noopener');
  }

  // start downloading the sounds while the visitor is still on the intro screen
  useEffect(() => {
    prefetch();
  }, []);

  // silence the house when the visitor switches tab/app, and shut the sound down when they leave the page
  useEffect(() => {
    const onVis = () => {
      const ctx = eng.current?.ctx;
      if (!ctx || ctx.state === 'closed') return;
      if (document.hidden) void ctx.suspend();
      else void ctx.resume();
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pagehide', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pagehide', onVis);
      const ctx = eng.current?.ctx;
      if (ctx && ctx.state !== 'closed') void ctx.close();
      eng.current = null;
    };
  }, []);

  // full-screen game: lock the page behind it
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  const text = cur ? cur.text.replace(/\{NAME\}[,.]?\s*/, name.trim() ? `${name.trim()}, ` : '') : '';
  const words = text.split(/(\s+)/);

  const ui = (
    <div className={`${styles.game} ${red ? styles.isRed : ''}`} style={{ '--rain': node.rain } as CSSProperties}>
      <div key={`s${fx.shake}`} className={`${styles.stage} ${fx.shake ? styles.shake : ''}`} onClick={next}>
        <Scene bg={phase === 'intro' ? 'lights_off' : bg} />
        <div className={styles.rain} aria-hidden />
        <div className={styles.vignette} aria-hidden />
      </div>
      {fx.red > 0 && <div key={`r${fx.red}`} className={styles.redFlash} aria-hidden />}

      {phase !== 'intro' && (
        <div className={styles.hud}>
          <span className={styles.clock}>{clock}</span>
          <span className={styles.dots} aria-label={`גילית ${found.length} מתוך ${ENDINGS.length} סופים`}>
            {ENDINGS.map((e) => (
              <i key={e.id} className={found.includes(e.id) ? styles.dotOn : ''} />
            ))}
          </span>
          <span className={`${styles.noaRing} ${noaTalking ? styles.talking : ''}`} title="נועה" aria-hidden />
          <button
            type="button"
            className={styles.mute}
            aria-label={muted ? 'להפעיל סאונד' : 'להשתיק'}
            onClick={() => {
              const m = !muted;
              setMuted(m);
              eng.current?.mute(m);
            }}
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>
      )}

      {phase === 'intro' && (
        <section className={styles.intro}>
          <span className={styles.series}>
            <b>הבית של נועה</b>
            <i>פרק 1</i>
          </span>
          <h1 className={styles.introTitle}>אמא בדלת. ה-AI אומר לא לפתוח.</h1>
          <p className={styles.introText}>השעה 03:12. הסרטון נגמר בדיוק כאן. מעכשיו אתה מחליט.</p>
          <label className={styles.nameBox}>
            <span>איך קוראים לך? (לא חובה)</span>
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={20} placeholder="השם שלך" autoComplete="given-name" />
          </label>
          <button type="button" className={styles.enter} onClick={start} disabled={loading} aria-busy={loading}>
            {loading ? 'נכנסים…' : 'להיכנס לבית'}
          </button>
          <p className={styles.tip}>🎧 עם אוזניות, בחושך. עדיף.</p>
        </section>
      )}

      {phase === 'beats' && cur && (
        <>
          {cur.who === 'phone' ? (
            <div key={`p${nodeId}${beat}`} className={styles.notif} onClick={next}>
              <span className={styles.notifApp}>הודעות</span>
              {text.split('\n').map((l, i) => (
                <span key={i} className={i === 0 ? styles.notifFrom : styles.notifBody}>
                  {l}
                </span>
              ))}
            </div>
          ) : cur.who === 'sys' ? (
            <div key={`y${nodeId}${beat}`} className={styles.sys} onClick={next}>
              {text}
            </div>
          ) : (
            <div key={`b${nodeId}${beat}`} className={`${styles.sub} ${styles['who_' + cur.who]}`} onClick={next} aria-live="polite">
              {cur.who === 'noa' && <span className={styles.who}>נועה</span>}
              {cur.who === 'mom' && (
                <span className={styles.who}>
                  <i className={styles.rec} /> {cur.tag ?? 'אמא · מצלמת הדלת'}
                </span>
              )}
              <p className={styles.line}>
                {words.map((w, i) => (
                  <span key={i} style={{ animationDelay: `${i * 35}ms` }}>
                    {w}
                  </span>
                ))}
              </p>
            </div>
          )}
          <button type="button" className={styles.tap} onClick={next}>
            הקישו להמשך
          </button>
        </>
      )}

      {phase === 'choices' && node.choices && (
        <section className={styles.choices}>
          {node.timer && (
            <div className={styles.timer}>
              <span>
                {node.timer.label} <b>{left}</b>
              </span>
              <i key={nodeId} style={{ animationDuration: `${node.timer.sec}s` }} />
            </div>
          )}
          {node.choices.map((c, i) => (
            <button
              key={c.to + i}
              type="button"
              className={`${styles.choice} ${c.tone === 'red' ? styles.red : styles.blue} ${holding === c.to ? styles.holding : ''}`}
              onClick={c.hold ? undefined : () => choose(c)}
              onPointerDown={c.hold ? (e) => holdStart(c, e) : undefined}
              onPointerUp={c.hold ? holdEnd : undefined}
              onPointerLeave={c.hold ? holdEnd : undefined}
              onPointerCancel={c.hold ? holdEnd : undefined}
              onKeyDown={c.hold ? (e) => e.key === 'Enter' && choose(c) : undefined}
              onContextMenu={(e) => e.preventDefault()}
            >
              <span className={styles.icon} aria-hidden>
                {c.icon}
              </span>
              <span className={styles.cTxt}>
                <span className={styles.cLabel}>{c.label}</span>
                {c.sub && <span className={styles.cSub}>{c.sub}</span>}
              </span>
              {c.hold && <span className={styles.fill} aria-hidden />}
            </button>
          ))}
        </section>
      )}

      {phase === 'ending' && node.ending && (
        <section className={`${styles.overlay} ${styles.endPanel}`}>
          {fresh && <p className={styles.ruleKicker}>סוף חדש נפתח!</p>}
          <span className={`${styles.endTag} ${styles['end_' + endInfo?.kind]}`}>סוף: {endInfo?.name}</span>
          <article className={styles.lessonCard}>
            <span className={styles.lessonKicker}>מוסר ההשכל</span>
            <h2 className={styles.lessonTitle}>{node.ending.title}</h2>
            <p className={styles.lessonText}>{node.ending.what}</p>
            <p className={styles.moral}>
              {LESSON.moral.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
            <h3 className={styles.lessonHead}>איך זה עובד במציאות?</h3>
            <p className={styles.lessonText}>{LESSON.how}</p>
            <h3 className={styles.lessonHead}>סימנים שזאת שיחה מזויפת</h3>
            <ul className={styles.flags}>
              {LESSON.flags.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <h3 className={styles.lessonHead}>מה עושים? 3 צעדים</h3>
            <ol className={styles.steps}>
              {LESSON.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className={styles.lessonSrc}>{LESSON.source}</p>
          </article>
          <Board found={found} highlight={node.ending.id} />
          <p className={styles.count}>
            {found.length === ENDINGS.length
              ? 'גילית את כל 3 הסופים. נתראה בפרק 2.'
              : found.includes('endCode')
                ? `גילית ${found.length} מתוך ${ENDINGS.length} סופים.`
                : `גילית ${found.length} מתוך ${ENDINGS.length} סופים. יש סוף טוב יותר.`}
          </p>
          <div className={styles.actions}>
            <button type="button" className={styles.enter} onClick={restart}>
              לשחק שוב
            </button>
            <button type="button" className={styles.ghost} onClick={share}>
              לשלוח לחבר שהיה פותח
            </button>
          </div>
          <div className={styles.outro}>
            <a href="https://www.instagram.com/orciai45/" target="_blank" rel="noopener noreferrer">
              עקבו כדי לא לפספס את פרק 2
            </a>
            <a href="https://ig.me/m/orciai45" target="_blank" rel="noopener noreferrer" className={styles.biz}>
              רוצים חידה כזאת לעסק שלכם? דברו איתנו
            </a>
          </div>
        </section>
      )}
    </div>
  );

  // portal to <body>: the site layout has transformed ancestors that would trap position: fixed
  return isClient ? createPortal(ui, document.body) : <div className={styles.placeholder} />;
}
