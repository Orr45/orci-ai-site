'use client';

/*
 * Audience pop-up — one offer per audience, shown once a week at most.
 *
 *   Business owner (came from the Instagram bio, or reading /products) → the monthly package.
 *   Learner (came from a ManyChat guide link, or reading a guide)       → personal 1:1 coaching.
 *
 * When: after 20 seconds of reading, after scrolling past half the page, or (desktop) when the
 * mouse leaves toward the tabs — whichever comes first, never in the first 8 seconds.
 * Never: on the home page (it already has both doors), on legal pages, after the visitor already
 * opened WhatsApp in this visit, or more than once in 7 days.
 * Accessible: role="dialog", focus moves in and returns, Escape and the backdrop close it.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { GUIDES } from '@/data/guides';
import { OFFER_ENDS, OFFER_ENDS_LABEL, OFFER_PRICE } from '@/data/offer';
import { track } from '@/components/OrciTracker';

type Audience = 'business' | 'learner';

const WA = (text: string) => `https://wa.me/972542599107?text=${encodeURIComponent(text)}`;
const SEEN_KEY = 'orci-hook-seen';
const WEEK = 7 * 24 * 60 * 60 * 1000;
const SKIP = /^\/(privacy|terms|accessibility)(\/|$)/;

function audienceFor(path: string): Audience | null {
  let src = '';
  try { src = sessionStorage.getItem('orci-src') ?? ''; } catch { /* storage blocked */ }
  if (src === 'mc' || src.startsWith('mc:')) return 'learner';
  if (src === 'ig' || src === 'bio') return path.startsWith('/guides') ? 'learner' : 'business';
  if (path.startsWith('/guides')) return 'learner';
  if (path.startsWith('/products')) return 'business';
  return null;
}

function recentlySeen(): boolean {
  try { return Date.now() - Number(localStorage.getItem(SEEN_KEY) ?? 0) < WEEK; } catch { return true; }
}

export default function AudienceHook() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState<Audience | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    returnFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (pathname === '/' || SKIP.test(pathname) || recentlySeen()) return;
    const audience = audienceFor(pathname);
    if (!audience) return;

    let done = false;
    const startedAt = Date.now();
    let contacted = false;

    const show = () => {
      if (done || contacted || Date.now() - startedAt < 8000 || recentlySeen()) return;
      // חלון אחר פתוח (שער האימייל של המדריכים, חלון היכרות) — לא נערמים עליו; ננסה שוב בעוד רגע
      if (document.querySelector('.fixed.inset-0')) { window.setTimeout(show, 5000); return; }
      done = true;
      try { localStorage.setItem(SEEN_KEY, String(Date.now())); } catch { /* fine */ }
      returnFocus.current = document.activeElement as HTMLElement | null;
      setOpen(audience);
      track('popup_shown', audience);
    };

    const timer = window.setTimeout(show, 20000);
    const onScroll = () => {
      const h = document.documentElement;
      if ((h.scrollTop + window.innerHeight) / h.scrollHeight > 0.55) show();
    };
    const onLeave = (e: MouseEvent) => { if (e.clientY <= 0 && !e.relatedTarget) show(); };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (a && /wa\.me|whatsapp/i.test(a.getAttribute('href') ?? '')) contacted = true;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseout', onLeave);
    document.addEventListener('click', onClick, true);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseout', onLeave);
      document.removeEventListener('click', onClick, true);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!open) return null;

  const guide = GUIDES.find((g) => g.href === pathname);
  const offerOn = Date.now() < OFFER_ENDS;
  const business = open === 'business';

  return (
    <div className="hook-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div ref={dialogRef} className="hook-card" role="dialog" aria-modal="true" aria-labelledby="hook-title" data-theme="light">
        <button className="hook-close" onClick={close} aria-label="סגירה">×</button>
        {business ? (
          <>
            {offerOn && <span className="lv-sticker lv-sticker-lime">מחיר השקה עד {OFFER_ENDS_LABEL}</span>}
            <h2 id="hook-title" className="hook-title">פרסומות לעסק שלכם — בלי יום צילום</h2>
            <p className="hook-text">
              4 סרטוני פרסומת ו-8 פוסטים בכל חודש, מהעסק האמיתי שלכם.
              {offerOn ? ` ${OFFER_PRICE} לחודש במחיר השקה, ` : ' '}בלי התחייבות.
            </p>
            <a className="cap-btn cap-btn-whatsapp hook-cta" data-track-label="popup-business" target="_blank" rel="noopener noreferrer"
              href={WA('היי אור! ראיתי את העבודות באתר ואשמח לשמוע על החבילה לעסק שלי')} onClick={close}>
              אני רוצה לשמוע — וואטסאפ
            </a>
          </>
        ) : (
          <>
            <span className="lv-sticker lv-sticker-cyan" style={{ direction: 'ltr' }}>1:1</span>
            <h2 id="hook-title" className="hook-title">רוצים ליצור תוכן כזה בעצמכם?</h2>
            <p className="hook-text">ליווי אישי 1:1 — תלמדו ליצור תוכן ברמה הכי גבוהה שיש, צעד אחר צעד איתי.</p>
            <a className="cap-btn cap-btn-whatsapp hook-cta" data-track-label="popup-learner" target="_blank" rel="noopener noreferrer"
              href={WA(guide ? `היי אור! הגעתי מהמדריך "${guide.title}" ואשמח לשמוע על הליווי האישי 1:1` : 'היי אור! אשמח לשמוע על הליווי האישי 1:1')}
              onClick={close}>
              ספרו לי על הליווי — וואטסאפ
            </a>
          </>
        )}
        <button className="hook-later" onClick={close}>אולי אחר כך</button>
      </div>
    </div>
  );
}
