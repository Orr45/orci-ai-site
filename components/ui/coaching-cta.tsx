'use client';

import { usePathname } from 'next/navigation';
import { GUIDES } from '@/data/guides';

/*
 * "ליווי אישי 1:1" — one-on-one content coaching, deliberately light on details: every entry point
 * sends to WhatsApp with a prefilled message. Shown as a slim strip at the top and
 * bottom of every guide (added automatically by the guides layout and the Footer),
 * and as a banner at the top of /guides.
 */

const WA_NUMBER = '972542599107';

function waLink(from?: string) {
  const text = from
    ? `היי אור! הגעתי מהמדריך "${from}" ואשמח לשמוע על הליווי האישי 1:1`
    : 'היי אור! אשמח לשמוע על הליווי האישי 1:1';
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* Slim strip — one line of text and a cyan pill */
export function CoachingStrip({ from }: { from?: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6">
      <a
        href={waLink(from)}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-3 rounded-[22px] py-2 ps-5 pe-2 transition-transform hover:-translate-y-0.5"
        style={{ background: 'var(--surface-card)', border: '1px solid var(--accent-line)', color: 'var(--text-primary)' }}
      >
        <span className="grid leading-tight min-w-0">
          <span className="text-[15px] md:text-base font-extrabold">ליווי אישי 1:1</span>
          <span className="text-[13px] md:text-sm" style={{ color: 'var(--text-secondary)', textWrap: 'balance' }}>
            תלמדו ליצור תוכן ברמה הכי גבוהה שיש
          </span>
        </span>
        <span
          className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 md:px-4 py-2 text-sm font-extrabold"
          style={{ background: 'var(--cyan)', color: 'var(--olive)' }}
        >
          <WhatsAppIcon size={16} />
          דברו איתי
        </span>
      </a>
    </div>
  );
}

/* Banner for the top of /guides */
export function CoachingBanner() {
  return (
    <section
      aria-labelledby="coaching-title"
      style={{ background: 'var(--cyan)', color: 'var(--olive)', borderBlock: '2px solid var(--olive)' }}
    >
      <div className="max-w-7xl mx-auto px-[18px] md:px-7 py-8 md:py-12 grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10">
        <div className="grid gap-2">
          <span
            className="lv-sticker lv-sticker-lime justify-self-start"
            style={{ direction: 'ltr', fontFamily: 'var(--font-heebo), sans-serif', fontWeight: 900, fontSize: 20, padding: '6px 14px' }}
          >
            1:1
          </span>
          <h2 id="coaching-title" className="lv-display m-0" style={{ color: 'var(--olive)', fontSize: 'clamp(56px, 9vw, 120px)' }}>
            ליווי אישי
          </h2>
          <p className="m-0 text-lg md:text-2xl font-bold">תלמדו ליצור תוכן ברמה הכי גבוהה שיש.</p>
        </div>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="cap-btn cap-btn-dark w-full md:w-auto">
          <WhatsAppIcon />
          דברו איתי בוואטסאפ
        </a>
      </div>
    </section>
  );
}

/* Placed once in the guides layout (top) and once in the Footer (end). Renders only on guide articles. */
export function GuideCoachingSlot({ position }: { position: 'top' | 'end' }) {
  const pathname = usePathname();
  if (!pathname?.startsWith('/guides/')) return null;
  const guide = GUIDES.find((g) => g.href === pathname);
  return (
    <div
      data-theme="dark"
      style={{ background: 'var(--bg)', paddingBlock: position === 'top' ? '14px 2px' : '28px 36px' }}
    >
      <CoachingStrip from={guide?.title} />
    </div>
  );
}
