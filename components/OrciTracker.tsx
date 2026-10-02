'use client';

/**
 * מדידת שימוש אנונימית — נשלחת למערכת הניהול (orciai), לא לצד שלישי.
 *
 * מה נשלח: הנתיב של העמוד (בלי מחרוזת השאילתה), משך הזמן שהעמוד היה גלוי,
 * רוחב המסך, האתר שממנו הגיעו, ו-utm_source.
 * מה לא: עוגיות, כתובת IP, או מזהה שנשמר בין ביקורים. מזהה הביקור הוא מספר
 * אקראי ב-sessionStorage, שנמחק כשהלשונית נסגרת.
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
    send({
      t: 'view',
      id: view.current.id,
      sid: session.id,
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

    return () => {
      // מעבר לעמוד אחר בתוך האתר: סוגרים את הצפייה הנוכחית
      flush();
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', flush);
      view.current = null;
    };
  }, [pathname]);

  return null;
}
