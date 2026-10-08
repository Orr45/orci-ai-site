'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { Check, X, Plus, Play, Send, Eye, ChevronLeft, ChevronRight, CalendarHeart } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { TESTIMONIALS } from '@/data/testimonials';
import s from './products.module.css';

/* Launch offer ends here. A real deadline — when it passes the banner says so; it never resets. */
const OFFER_ENDS = new Date('2026-10-15T23:59:59+03:00').getTime();

const waLink = (text: string) => `https://wa.me/972542599107?text=${encodeURIComponent(text)}`;
const WA_GENERAL = waLink('היי אור! ראיתי את העבודות באתר ואשמח לשמוע איך זה יכול לעבוד לעסק שלי');
const WA_OFFER = waLink('היי אור! אני רוצה את חבילת ההשקה 3+1');

/* ─── Brands. `bg` fills the circle behind the logo. ─── */
interface Brand {
  name: string;
  logo: string;
  bg: string;
}

const BRANDS: Brand[] = [
  { name: 'LAGO', logo: '/products/logos/lago.png', bg: '#fefbef' },
  { name: 'TROYA', logo: '/products/logos/troya.png', bg: '#000000' },
  { name: 'ELA-YAM', logo: '/products/logos/ela-yam.png', bg: '#0e1525' },
  { name: 'BARDA', logo: '/products/logos/barda.png', bg: '#ffffff' },
  { name: 'Vibe or Value', logo: '/products/logos/vibe-or-value.png', bg: '#f4f0e8' },
  { name: 'Wave-Adv', logo: '/products/logos/wave-adv.png', bg: '#ffcd2a' },
  { name: 'פינוקים', logo: '/products/logos/pinookim.png', bg: '#ffffff' },
];
const brand = (name: string) => BRANDS.find((b) => b.name === name);

/* ─── Client work. `views` = views on the client's own account; a sticker appears only when it's set. ─── */
interface Work {
  brand: string;
  industry: string;
  format: string;
  hook: string;
  video: string;
  poster: string;
  views?: string;
}

const WORKS: Work[] = [
  {
    brand: 'TROYA',
    industry: 'אולם אירועים',
    format: 'אנימציה בסגנון פיקסאר',
    hook: 'סיפור פריצה מצויר שמבהיר לזוגות: יש רק Troya אחת.',
    video: '/products/work/troya.mp4',
    poster: '/products/work/poster-troya.jpg',
  },
  {
    brand: 'LAGO',
    industry: 'אולם אירועים',
    format: 'השוואת קיץ / חורף',
    hook: 'קיץ או חורף — אותה חתונה. ככה מוכרים תאריכי חורף.',
    video: '/products/work/lago.mp4',
    poster: '/products/work/poster-lago.jpg',
  },
  {
    brand: 'ELA-YAM',
    industry: 'מועדון כושר',
    format: 'סרטון תדמית',
    hook: 'סיור קולנועי במועדון כושר יוקרתי מול הים.',
    video: '/products/work/ela-yam.mp4',
    poster: '/products/work/poster-ela-yam.jpg',
  },
  {
    brand: 'BARDA',
    industry: 'מספרה',
    format: 'מיתוג + סרטון',
    hook: 'מיתוג חדש וסרטון שמוביל ישר לקביעת תור.',
    video: '/products/work/barda.mp4',
    poster: '/products/work/poster-barda.jpg',
  },
  {
    brand: 'Save The Date',
    industry: 'אירוע פרטי',
    format: 'הזמנה לחתונה',
    hook: 'הזמנה לחתונה שעוברת דרך תקופות בהיסטוריה.',
    video: '/products/work/save-the-date.mp4',
    poster: '/products/work/poster-save-the-date.jpg',
  },
  {
    brand: 'Vibe or Value',
    industry: 'אפליקציה',
    format: 'סרטון השקה',
    hook: 'מוצר מורכב, מוסבר בפחות מדקה.',
    video: '/products/work/vibe-or-value.mp4',
    poster: '/products/work/poster-vibe-or-value.jpg',
  },
];

const VALUES = [
  { big: '72 שעות', text: 'מאישור התסריט ועד סרטון מוכן לעלות' },
  { big: '0 ימי צילום', text: 'בלי לוקיישן, בלי שחקנים, בלי ציוד' },
  { big: 'תסריט קודם', text: 'משלמים רק אחרי שאישרתם אותו' },
];

const PACKAGE_INCLUDES = ['3 סרטונים + הרביעי מתנה', 'תסריט וקאבר לכל סרטון', 'מוכן תוך 72 שעות', 'עד 2 סבבי תיקונים'];

const FAQ = [
  {
    q: 'זה לא ייראה מזויף?',
    a: 'תסתכלו על העבודות למעלה ותחליטו בעצמכם. אני לא מייצר "סרטון AI" — אני מפיק פרסומת: תסריט, סגנון ובקרת איכות.',
  },
  {
    q: 'מה אם לא אוהב?',
    a: 'לא משלמים עד שאישרתם את התסריט. אחרי האישור, כל סרטון כולל עד 2 סבבי תיקונים.',
  },
  {
    q: 'מה אני צריך להביא?',
    a: 'שיחה של 20 דקות, לוגו וכמה תמונות של העסק. את כל השאר אני עושה.',
  },
  {
    q: 'כמה זמן זה לוקח?',
    a: '72 שעות לסרטון מרגע אישור התסריט. חבילה מלאה — בדרך כלל תוך שבועיים.',
  },
];

/* ─── Mat Voyce: giant words stretch with scroll speed and snap back ─── */
function Stretch({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 220, damping: 34 });
  const scaleY = useTransform(velocity, [-2600, 0, 2600], [1.32, 1, 1.32], { clamp: true });
  const skewX = useTransform(velocity, [-2600, 0, 2600], [5, 0, -5], { clamp: true });
  return (
    <motion.span
      aria-hidden="true"
      className={className}
      // Same element shape on server and client; reduced motion just pins the values.
      style={{ display: 'block', scaleY: reduce ? 1 : scaleY, skewX: reduce ? 0 : skewX, transformOrigin: '50% 100%' }}
    >
      {children}
    </motion.span>
  );
}

/* Stickers pop onto the hero; with reduced motion they appear instantly */
function Sticker({ className, delay, children }: { className: string; delay: number; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={className}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 18, delay }}
    >
      {children}
    </motion.span>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function WhatsAppPill({ label, href = WA_GENERAL, variant = 'cyan', onDark = false }: { label: string; href?: string; variant?: 'cyan' | 'ink'; onDark?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${s.pill} ${variant === 'ink' ? s.pillInk : s.pillCyan} ${onDark ? s.pillOnDark : ''}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}

/* Round logo for a work tile / lightbox (Save The Date has no brand logo) */
function WorkLogo({ work, className }: { work: Work; className: string }) {
  const b = brand(work.brand);
  return (
    <span className={className} style={{ background: b?.bg ?? 'var(--cyan)' }}>
      {b ? <Image src={b.logo} alt="" width={96} height={96} /> : <CalendarHeart className="w-1/2 h-1/2" />}
    </span>
  );
}

/* ─── Full-screen player: tap a tile, watch with sound, swipe through with the arrows ─── */
function Lightbox({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (dir: 1 | -1) => void }) {
  const work = WORKS[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onStep(1); // RTL: left is "next"
      if (e.key === 'ArrowRight') onStep(-1);
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onStep]);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [index]);

  return (
    <div role="dialog" aria-modal="true" aria-label={`${work.brand} — ${work.format}`} className={s.lightbox} onClick={onClose}>
      <div className={s.lbInner} onClick={(e) => e.stopPropagation()}>
        <div className={s.lbTop}>
          <WorkLogo work={work} className={s.tileLogo} />
          <div className={s.lbTitle}>
            <b>{work.brand}</b>
            <span>
              {work.industry} · {work.format}
            </span>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="סגירה" className={s.lbClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <video key={work.video} ref={videoRef} src={work.video} poster={work.poster} controls playsInline className={s.lbVideo} />
        <p className={s.lbHook}>{work.hook}</p>
        <div className={s.lbBar}>
          <button onClick={() => onStep(-1)} aria-label="העבודה הקודמת" className={s.lbNavBtn}>
            <ChevronRight className="w-5 h-5" />
          </button>
          <WhatsAppPill label="רוצה כזה לעסק שלי" onDark />
          <button onClick={() => onStep(1)} aria-label="העבודה הבאה" className={s.lbNavBtn}>
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Countdown to the real offer deadline. Renders "--" until mounted so server and client agree. ─── */
function useCountdown(target: number) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  if (now === null) return null;
  const left = Math.max(0, target - now);
  return {
    ended: left === 0,
    parts: [
      { n: Math.floor(left / 86_400_000), unit: 'ימים' },
      { n: Math.floor(left / 3_600_000) % 24, unit: 'שעות' },
      { n: Math.floor(left / 60_000) % 60, unit: 'דקות' },
      { n: Math.floor(left / 1000) % 60, unit: 'שניות' },
    ],
  };
}

/* ─── Lead form ─── */
function LeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [business, setBusiness] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, business }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMsg(data?.error || 'משהו השתבש, נסה שוב');
      }
    } catch {
      setStatus('error');
      setErrorMsg('שגיאת רשת, נסה שוב');
    }
  }

  if (status === 'success') {
    return (
      <div className={s.formDone}>
        <span className={`${s.sticker} ${s.stLime}`}>
          <Check className="w-5 h-5" /> נשלח
        </span>
        <p className="font-bold">הפרטים אצלי — אחזור אליך תוך 24 שעות.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <input id="lead-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="שם מלא *" aria-label="שם מלא" required className={s.field} />
      <input id="lead-phone" type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="טלפון *" aria-label="מספר טלפון" required className={s.field} />
      <input id="lead-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="אימייל *" aria-label="כתובת אימייל" required className={s.field} />
      <input id="lead-business" type="text" value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="שם העסק" aria-label="שם העסק" className={s.field} />
      {errorMsg && <p className={s.formError}>{errorMsg}</p>}
      <button type="submit" disabled={status === 'loading'} className={`${s.pill} ${s.pillInk}`} style={{ opacity: status === 'loading' ? 0.6 : 1 }}>
        <Send className="w-5 h-5" />
        {status === 'loading' ? 'שולח...' : 'שלחו'}
      </button>
      <label className={s.consent}>
        <input id="lead-consent" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} aria-label="אישור מדיניות הפרטיות" className="mt-0.5 w-4 h-4 flex-shrink-0" />
        <span>
          מאשר/ת את <Link href="/privacy">מדיניות הפרטיות</Link> ושתחזרו אליי
        </span>
      </label>
    </form>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${s.faqItem} ${open ? s.faqOpen : ''}`}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} className={s.faqQ}>
        <span>{q}</span>
        <span className={s.faqIcon}>
          <Plus className="w-5 h-5" />
        </span>
      </button>
      {open && <p className={s.faqA}>{a}</p>}
    </div>
  );
}

export default function ProductsPage() {
  // Only named testimonials (with a business) are shown here — anonymous quotes read as made up.
  const testimonials = TESTIMONIALS.filter((t) => t.business);
  const countdown = useCountdown(OFFER_ENDS);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + WORKS.length) % WORKS.length)),
    []
  );

  return (
    <div className={s.page}>
      {/* ═══ HERO ═══ */}
      <section className={s.hero}>
        <div className={s.topo} aria-hidden="true" />
        <h1 className="sr-only">פרסומות שנראות כמו הפקה. בלי יום צילום.</h1>

        <div className={`${s.wrap} ${s.heroMeta}`}>
          <span className={s.label}>אור שמר · Orci AI</span>
          <span className={s.label}>פרסומות לעסקים</span>
        </div>

        <div className={s.stage}>
          <Stretch className={`${s.display} ${s.heroWord}`}>פרסומות</Stretch>
          <Image src="/products/or-cutout.webp" alt="אור שמר" width={1086} height={1284} priority className={s.portrait} />
          <Sticker className={`${s.st} ${s.st1} ${s.sticker} ${s.stLime}`} delay={0.35}>
            72 שעות לסרטון
          </Sticker>
          <Sticker className={`${s.st} ${s.st2} ${s.sticker}`} delay={0.5}>
            לא משלמים עד שאישרתם תסריט
          </Sticker>
          <Sticker className={`${s.st} ${s.st3} ${s.sticker}`} delay={0.65}>
            130K רשומים · 25M צפיות
          </Sticker>
          <Sticker className={`${s.st} ${s.st4}`} delay={0.8}>
            {BRANDS.slice(0, 2).map((b) => (
              <span key={b.name} className={s.logoSticker} style={{ background: b.bg }}>
                <Image src={b.logo} alt={b.name} width={152} height={152} />
              </span>
            ))}
          </Sticker>
        </div>

        <div className={s.heroBottom}>
          <div className={`${s.wrap} ${s.heroBottomInner}`}>
            <p className={`${s.display} ${s.heroTitle}`} aria-hidden="true">
              שנראות כמו <span className={s.serifAccent}>הפקה</span>.
              <br />
              בלי יום צילום.
            </p>
            <div className={s.heroCtas}>
              <WhatsAppPill label="בואו נדבר על העסק שלכם" />
              <a href="#work" className={`${s.pill} ${s.pillGhost}`}>
                לעבודות
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLIENTS ═══ */}
      <section className={s.clients}>
        <div className={s.wrap}>
          <div className={s.clientsHead}>
            <h2 className={`${s.display} ${s.sectionTitle}`}>הלקוחות</h2>
            <span className={`${s.sticker} ${s.stLime}`}>{BRANDS.length} מותגים</span>
          </div>
          <ul className={s.logoGrid}>
            {BRANDS.map((b) => (
              <li key={b.name} className={s.logoItem}>
                <span className={s.logoBubble} style={{ background: b.bg }}>
                  <Image src={b.logo} alt="" width={216} height={216} />
                </span>
                <span className={s.logoName}>{b.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ WORK ═══ */}
      <section id="work" className={`${s.work} scroll-mt-20`}>
        <div className={s.wrap}>
          <div className={s.workHead}>
            <h2 className="sr-only">עבודות</h2>
            <Stretch className={`${s.display} ${s.sectionTitle}`}>עבודות</Stretch>
            <p className={s.workLead}>לחצו על עבודה כדי לצפות.</p>
          </div>
          <ul className={s.workGrid}>
            {WORKS.map((w, i) => (
              <li key={w.brand}>
                <button className={s.tile} onClick={() => setOpen(i)} aria-label={`צפייה: ${w.brand} — ${w.format}`}>
                  <Image src={w.poster} alt="" fill sizes="(min-width: 768px) 33vw, 50vw" />
                  <span className={s.tileShade} />
                  <span className={s.tilePlay}>
                    <Play className="w-1/2 h-1/2 ml-0.5" fill="currentColor" />
                  </span>
                  {w.views && (
                    <span className={`${s.sticker} ${s.stLime} ${s.views}`}>
                      <Eye className="w-4 h-4" />
                      {w.views}
                    </span>
                  )}
                  <span className={s.tileInfo}>
                    <WorkLogo work={w} className={s.tileLogo} />
                    <span className={s.tileText}>
                      <span className={s.tileName}>{w.brand}</span>
                      <span className={s.tileInd}>{w.industry}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ VALUE ═══ */}
      <section className={s.values} aria-label="מה מקבלים">
        <div className={s.wrap}>
          <ul className={s.valueGrid}>
            {VALUES.map((v) => (
              <li key={v.big} className={s.value}>
                <span className={s.valueBig}>{v.big}</span>
                <span className={s.valueText}>{v.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ TESTIMONIALS — appears automatically once named testimonials exist ═══ */}
      {testimonials.length > 0 && (
        <section className={s.quotes}>
          <div className={s.wrap}>
            <h2 className={`${s.display} ${s.sectionTitle}`}>במילים שלהם</h2>
            <div className={s.quoteGrid}>
              {testimonials.map((t) => (
                <figure key={t.name} className={s.quote}>
                  <blockquote>&quot;{t.quote}&quot;</blockquote>
                  <figcaption>
                    <b>{t.name}</b>
                    <span>{t.business}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FLAGSHIP OFFER — the only place the price appears ═══ */}
      <section className={s.offer} aria-labelledby="offer-title">
        <span className={s.offerGhost} aria-hidden="true">
          3+1
        </span>
        <div className={`${s.wrap} ${s.offerInner}`}>
          <div className={s.offerMain}>
            <span className={`${s.sticker} ${s.stLime}`}>מבצע השקה</span>
            <h2 id="offer-title" className={`${s.display} ${s.offerTitle}`}>
              חבילת 3+1
            </h2>
            <p className={s.offerSub}>3 סרטוני פרסומת לעסק שלכם — והרביעי מתנה.</p>

            {countdown?.ended ? (
              <p className={s.offerEnded}>מבצע ההשקה הסתיים.</p>
            ) : (
              <div className={s.countdown}>
                <span className={s.countLabel}>המבצע נגמר בעוד</span>
                <div className={s.countBoxes} role="timer" aria-label="זמן שנותר עד סוף המבצע">
                  {(countdown?.parts ?? [{ unit: 'ימים' }, { unit: 'שעות' }, { unit: 'דקות' }, { unit: 'שניות' }]).map((p) => (
                    <span key={p.unit} className={s.countBox}>
                      <span className={s.countNum}>{'n' in p ? String(p.n).padStart(2, '0') : '--'}</span>
                      <span className={s.countUnit}>{p.unit}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={s.priceCard}>
            {countdown?.ended ? (
              <div className={s.priceRow}>
                <span className={`${s.priceNow}`}>4,000 ₪</span>
              </div>
            ) : (
              <div className={s.priceRow}>
                <span className={s.priceWas}>
                  במקום <s>4,000 ₪</s>
                </span>
                <span className={s.priceNow}>2,250 ₪</span>
                <span className={`${s.sticker} ${s.stLime} ${s.saveChip}`}>חוסכים 1,750 ₪</span>
              </div>
            )}
            <ul className={s.includes}>
              {PACKAGE_INCLUDES.map((item) => (
                <li key={item}>
                  <Check className="w-5 h-5 flex-shrink-0" color="#00a6cc" />
                  {item}
                </li>
              ))}
            </ul>
            <WhatsAppPill label="אני רוצה את החבילה" href={WA_OFFER} variant="ink" />
            <p className={s.guaranteeNote}>לא משלמים עד שאישרתם את התסריט</p>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className={`${s.contact} scroll-mt-20`}>
        <div className={`${s.wrap} ${s.contactGrid}`}>
          <div className={s.contactIntro}>
            <span className={s.avatar}>
              <Image src="/products/or-cutout.webp" alt="אור שמר" width={144} height={144} />
            </span>
            <h2 className="sr-only">היי, אני אור</h2>
            <Stretch className={`${s.display} ${s.contactTitle}`}>
              היי, אני <span style={{ color: 'var(--cyan)' }}>אור</span>
            </Stretch>
            <p className={s.contactText}>ספרו לי על העסק — אחזור אליכם תוך 24 שעות.</p>
            <WhatsAppPill label="שלחו הודעה בוואטסאפ" onDark />
          </div>
          <div className={s.formCard}>
            <span className={s.formTitle}>או השאירו פרטים</span>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className={s.faq}>
        <div className={s.wrap}>
          <h2 className={`${s.display} ${s.sectionTitle}`}>שאלות</h2>
          <div className={s.faqList}>
            {FAQ.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {open !== null && <Lightbox index={open} onClose={close} onStep={step} />}
    </div>
  );
}
