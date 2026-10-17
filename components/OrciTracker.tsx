'use client';

/**
 * מדידת שימוש אנונימית — נשלחת למערכת הניהול (orciai), לא לצד שלישי.
 *
 * מה נשלח: הנתיב של העמוד (בלי מחרוזת השאילתה), משך הזמן שהעמוד היה גלוי,
 * רוחב המסך, האתר שממנו הגיעו, utm_source, ופעולות בעמוד: לחיצה על וואטסאפ,
 * צפייה בסרטון, והגעה לאזור העבודות או המחיר.
 * מזהים: מספר אקראי לביקור (sessionStorage, נמחק כשהלשונית נסגרת), ומספר אקראי
 * לדפדפן (localStorage) — כדי לספור גולשים ולא לשוניות. אין עוגיות, אין IP,
 * ושום מזהה אינו מקושר לשם או לפרטים של אדם.
 *
 * כדי לא לספור את עצמך: לפתוח פעם אחת את האתר עם ?notrack=1 באותו מכשיר.
 * לביטול: ?notrack=0.
 */

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const ENDPOINT = 'https://orciai.vercel.app/api/site/track';
// נקודות הזמן (בשניות) שבהן מעדכנים את משך השהייה, נוסף על עזיבת העמוד.
// בטלפון העמוד נסגר לפעמים בלי שום אירוע, ואז העדכון האחרון הוא מה שנשאר.
const CHECKPOINTS = [10, 30, 60, 120, 300, 600, 1200, 1800];

function uuid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function send(payload: Record<string, unknown>) {
  try {
    const body = JSON.stringify(payload);
    // מחרוזת נשלחת כ-text/plain — בקשה "פשוטה", בלי preflight
    if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, body)) return;
    fetch(ENDPOINT, { method: 'POST', body, keepalive: true, mode: 'no-cors' }).catch(() => {});
  } catch {
    /* מדידה לעולם לא מפריעה לאתר */
  }
}

function optedOut(): boolean {
  try {
    const q = new URLSearchParams(window.location.search).get('notrack');
    if (q === '1') localStorage.setItem('orci-notrack', '1');
    if (q === '0') localStorage.removeItem('orci-notrack');
    return localStorage.getItem('orci-notrack') === '1';
  } catch {
    return false;
  }
}

/** מספר אקראי לדפדפן — אותו גולש בכמה לשוניות ובביקורים חוזרים */
function visitorId(): string | null {
  try {
    const existing = localStorage.getItem('orci-vid');
    if (existing) return existing;
    const id = uuid();
    localStorage.setItem('orci-vid', id);
    return id;
  } catch {
    return null;
  }
}

/** פעולה בעמוד. שמות מוכרים בלבד — השרת זורק כל שם אחר. */
export function track(name: string, label?: string | null) {
  act(name, label);
}

function act(name: string, label?: string | null) {
  if (optedOut()) return;
  send({
    t: 'act', id: uuid(), sid: sessionId().id, vid: visitorId(),
    path: window.location.pathname, name, label: label ? label.slice(0, 80) : null,
  });
}

/** תווית קצרה לקישור: הטקסט שלו, או האזור בעמוד שבו הוא נמצא */
function labelOf(el: Element): string | null {
  const explicit = (el as HTMLElement).dataset?.trackLabel;
  if (explicit) return explicit;
  const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim();
  const area = el.closest('section[id], section[aria-labelledby], header, footer');
  const where = area?.id || area?.getAttribute('aria-labelledby') || area?.tagName.toLowerCase() || '';
  return [text.slice(0, 50), where].filter(Boolean).join(' · ') || null;
}

function sessionId(): { id: string; fresh: boolean } {
  try {
    const existing = sessionStorage.getItem('orci-sid');
    if (existing) return { id: existing, fresh: false };
    const id = uuid();
    sessionStorage.setItem('orci-sid', id);
    return { id, fresh: true };
  } catch {
    return { id: uuid(), fresh: true };
  }
}

export default function OrciTracker() {
  const pathname = usePathname();
  const view = useRef<{ id: string; visibleMs: number; since: number | null; sent: number } | null>(null);

  useEffect(() => {
    if (!pathname || optedOut()) return;

    const elapsed = () => {
      const v = view.current;
      if (!v) return 0;
      const ms = v.visibleMs + (v.since !== null ? Date.now() - v.since : 0);
      return Math.round(ms / 1000);
    };
    const flush = () => {
      const v = view.current;
      if (!v) return;
      const s = elapsed();
      if (s > v.sent) {
        v.sent = s;
        send({ t: 'time', id: v.id, s });
      }
    };

    const session = sessionId();
    const visible = document.visibilityState === 'visible';
    view.current = { id: uuid(), visibleMs: 0, since: visible ? Date.now() : null, sent: 0 };

    const params = new URLSearchParams(window.location.search);
    if (session.fresh) {
      try { sessionStorage.setItem('orci-src', (params.get('utm_source') ?? '').toLowerCase()); } catch { /* fine */ }
    }
    send({
      t: 'view',
      id: view.current.id,
      sid: session.id,
      vid: visitorId(),
      path: pathname,
      // המפנה וה-utm רלוונטיים רק לעמוד הראשון של הביקור
      ref: session.fresh ? document.referrer || null : null,
      utm: session.fresh ? params.get('utm_source') : null,
      w: window.innerWidth,
    });

    const onVisibility = () => {
      const v = view.current;
      if (!v) return;
      if (document.visibilityState === 'hidden') {
        if (v.since !== null) {
          v.visibleMs += Date.now() - v.since;
          v.since = null;
        }
        flush();
      } else if (v.since === null) {
        v.since = Date.now();
      }
    };

    const timer = window.setInterval(() => {
      const v = view.current;
      if (!v || v.since === null) return;
      const s = elapsed();
      if (CHECKPOINTS.some((c) => s >= c && v.sent < c)) flush();
    }, 5000);

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', flush);

    // לחיצה על וואטסאפ — בכל מקום באתר, בלי לגעת בכל כפתור
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]');
      const href = a?.getAttribute('href') ?? '';
      if (a && /wa\.me|api\.whatsapp\.com|whatsapp:/i.test(href)) act('wa_click', labelOf(a));
    };
    // צפייה בסרטון — אירוע play לא מבעבע, ולכן נתפס בשלב ה-capture
    const played = new Set<string>();
    const onPlay = (e: Event) => {
      const v = e.target as HTMLVideoElement | null;
      if (!(v instanceof HTMLVideoElement) || v.muted && v.autoplay) return; // הפעלה אוטומטית אינה צפייה
      const src = (v.currentSrc || v.src || '').split('/').pop()?.split('?')[0] ?? 'video';
      if (played.has(src)) return;
      played.add(src);
      act('video_play', src);
    };
    // הגעה לאזור מסומן (data-track-seen="works" / "price") — פעם אחת לכל עמוד
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
          for (const en of entries) {
            if (!en.isIntersecting) continue;
            const what = (en.target as HTMLElement).dataset.trackSeen;
            if (what === 'works' || what === 'price') act(`${what}_seen`);
            io?.unobserve(en.target);
          }
        }, { threshold: 0.35 })
      : null;
    const observeTimer = window.setTimeout(() => {
      document.querySelectorAll('[data-track-seen]').forEach((el) => io?.observe(el));
    }, 300);
    document.addEventListener('click', onClick, true);
    document.addEventListener('play', onPlay, true);

    return () => {
      // מעבר לעמוד אחר בתוך האתר: סוגרים את הצפייה הנוכחית
      flush();
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('play', onPlay, true);
      window.clearTimeout(observeTimer);
      io?.disconnect();
      view.current = null;
    };
  }, [pathname]);

  return null;
}
