'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { track } from '@vercel/analytics';
import styles from './page.module.css';
import { RULES, START, STORY, type Beat, type Choice, type RuleId, type Sfx } from './story';

/* ---------------- rules progress (localStorage, shared across plays) ---------------- */
const STORE = 'orci-noa-rules';
const EVT = 'orci-noa-rules';
function readRaw(): string {
  try {
    return localStorage.getItem(STORE) ?? '[1]';
  } catch {
    return '[1]';
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
function parseRules(raw: string): RuleId[] {
  try {
    const arr = JSON.parse(raw) as number[];
    return Array.from(new Set([1, ...arr]))
      .filter((n): n is RuleId => n >= 1 && n <= 5)
      .sort();
  } catch {
    return [1];
  }
}
function saveRules(rules: RuleId[]) {
  try {
    localStorage.setItem(STORE, JSON.stringify(rules));
  } catch {}
  window.dispatchEvent(new Event(EVT));
}

/* ---------------- sound engine (Web Audio, so volumes work on iPhone too) ---------------- */
const SOUNDS: (Sfx | 'rain' | 'drone')[] = [
  'rain', 'drone', 'knock_heavy', 'growl', 'heartbeat', 'tick', 'lock', 'glitch', 'phone', 'ping',
  'mom1', 'mom2', 'noa1', 'noa2', 'noa3',
];
const VOICES = new Set<Sfx>(['mom1', 'mom2', 'noa1', 'noa2', 'noa3']);
const GAIN: Partial<Record<Sfx, number>> = { tick: 0.5, heartbeat: 0.9, phone: 0.6, ping: 0.5, lock: 0.8, glitch: 0.6 };

class Engine {
  ctx: AudioContext;
  master: GainNode;
  rain: GainNode;
  drone: GainNode;
  buf = new Map<string, AudioBuffer>();
  voice: AudioBufferSourceNode | null = null;

  constructor() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.connect(this.ctx.destination);
    this.rain = this.ctx.createGain();
    this.rain.gain.value = 0;
    this.rain.connect(this.master);
    this.drone = this.ctx.createGain();
    this.drone.gain.value = 0.32;
    this.drone.connect(this.master);
    SOUNDS.forEach((n) => this.load(n));
  }
  async load(name: string) {
    try {
      const res = await fetch(`/play/noa/a/${name}.mp3`);
      const data = await this.ctx.decodeAudioData(await res.arrayBuffer());
      this.buf.set(name, data);
      if (name === 'rain' || name === 'drone') {
        const s = this.ctx.createBufferSource();
        s.buffer = data;
        s.loop = true;
        s.connect(name === 'rain' ? this.rain : this.drone);
        s.start();
      }
    } catch {}
  }
  play(name: Sfx) {
    const b = this.buf.get(name);
    if (!b) return;
    if (VOICES.has(name) && this.voice) {
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
    if (VOICES.has(name)) this.voice = s;
  }
  setRain(v: number) {
    this.rain.gain.setTargetAtTime(v * 0.55, this.ctx.currentTime, 0.5);
  }
  mute(m: boolean) {
    this.master.gain.setTargetAtTime(m ? 0 : 1, this.ctx.currentTime, 0.05);
  }
}

const noop = () => () => {};

type Phase = 'intro' | 'beats' | 'rule' | 'choices' | 'ending';
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

function Board({ found, highlight }: { found: RuleId[]; highlight?: RuleId | null }) {
  return (
    <div className={styles.fridge}>
      <div className={styles.screen}>
        <div className={styles.boardHead}>
          <span className={styles.moon} aria-hidden />
          חוקי הבית
        </div>
        <ol className={styles.board}>
          {([1, 2, 3, 4, 5] as RuleId[]).map((n) => {
            const known = found.includes(n);
            return (
              <li key={n} className={`${n === highlight ? styles.hl : ''} ${known ? '' : styles.lockedRow}`}>
                <span className={styles.n}>{n}</span>
                <span className={styles.rt}>{known ? RULES[n] : 'נעול. שחקו שוב כדי לגלות.'}</span>
                {!known && <span className={styles.lk} aria-hidden>🔒</span>}
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
  const [fresh, setFresh] = useState<RuleId | null>(null);
  const [left, setLeft] = useState(0);
  const [holding, setHolding] = useState<string | null>(null);
  const [fx, setFx] = useState({ shake: 0, red: 0 });
  const [muted, setMuted] = useState(false);
  const [path, setPath] = useState<string[]>([START]);
  const raw = useSyncExternalStore(subscribe, readRaw, () => '[1]');
  const isClient = useSyncExternalStore(noop, () => true, () => false);
  const found = useMemo(() => parseRules(raw), [raw]);

  const eng = useRef<Engine | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gate = useRef(false);

  const node = STORY[nodeId];
  const cur: Beat | undefined = phase === 'beats' ? node.beats[beat] : undefined;
  const bg = (phase === 'beats' && cur?.bg) || node.bg;
  const noaTalking = cur?.who === 'noa';
  const red = node.noaRed || cur?.red || false;

  const fire = (b: Beat) => {
    gate.current = true;
    setTimeout(() => {
      gate.current = false;
    }, 350);
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

  function start() {
    if (!eng.current) eng.current = new Engine();
    void eng.current.ctx.resume();
    track('noa_start', { named: name.trim() ? 'yes' : 'no' });
    setPath([START]);
    enterNode(START);
  }

  function openChoices() {
    const n = STORY[nodeId];
    if (!n.choices) {
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
    if (n.rule) {
      if (!found.includes(n.rule)) {
        saveRules([...found, n.rule]);
        setFresh(n.rule);
      } else setFresh(null);
      eng.current?.play('glitch');
      setPhase('rule');
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

  function holdStart(c: Choice) {
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

  // full-screen game: lock the page behind it
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  const text = cur ? cur.text.replace('{NAME}', name.trim() || 'השם המלא שלך') : '';
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
          <span className={styles.clock}>{node.clock}</span>
          <span className={styles.dots} aria-label={`גילית ${found.length} מתוך 5 חוקים`}>
            {([1, 2, 3, 4, 5] as RuleId[]).map((n) => (
              <i key={n} className={found.includes(n) ? styles.dotOn : ''} />
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
          <button type="button" className={styles.enter} onClick={start}>
            להיכנס לבית
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
                  <i className={styles.rec} /> אמא · מצלמת הדלת
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

      {phase === 'rule' && node.rule && (
        <section className={styles.overlay}>
          <p className={styles.ruleKicker}>{fresh ? 'חוק חדש נפתח!' : `חוק מספר ${node.rule}`}</p>
          <Board found={found} highlight={node.rule} />
          <button type="button" className={styles.enter} onClick={openChoices}>
            המשך
          </button>
        </section>
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
              onPointerDown={c.hold ? () => holdStart(c) : undefined}
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
          <span className={`${styles.endTag} ${styles['end_' + node.ending.kind]}`}>סוף: {node.ending.name}</span>
          <Board found={found} highlight={node.rule} />
          <p className={styles.count}>
            {found.length === 5 ? 'גילית את כל 5 החוקים. נתראה בפרק 2.' : `גילית ${found.length} מתוך 5 חוקים. יש עוד סופים.`}
          </p>
          <div className={styles.actions}>
            <button type="button" className={styles.enter} onClick={restart}>
              לשחק שוב
            </button>
            <button type="button" className={styles.ghost} onClick={share}>
              לשלוח לחבר שהיה פותח
            </button>
          </div>
          <div className={styles.lesson}>
            <b>בחיים האמיתיים:</b> AI יכול לשבט קול מכמה שניות של הקלטה. קבעו עם המשפחה מילת קוד, ואם מישהו
            &quot;מהמשפחה&quot; מבקש משהו דחוף בטלפון, בקשו ממנו את המילה.
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
