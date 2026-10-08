'use client';

import { useRef, useState } from 'react';
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
import { Check, X, Plus, Play, Send, Eye } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { TESTIMONIALS } from '@/data/testimonials';
import s from './products.module.css';

const WHATSAPP_URL = `https://wa.me/972542599107?text=${encodeURIComponent(
  'היי אור! ראיתי את העבודות באתר ואשמח לשמוע איך זה יכול לעבוד לעסק שלי'
)}`;

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

/* ─── Client work. `views` = views on the client's own account; the sticker appears only when it's set. ─── */
interface Work {
  brand: string;
  industry: string;
  format: string;
  brief: string;
  solution: string;
  video: string;
  poster: string;
  views?: string;
}

const WORKS: Work[] = [
  {
    brand: 'TROYA',
    industry: 'אולם אירועים',
    format: 'סרטון אנימציה בסגנון פיקסאר',
    brief: 'אולמות אחרים הציגו את עצמם כ"אולם שותף של Troya" — וזוגות התבלבלו.',
    solution: 'סיפור פריצה מצויר שנגמר במסר אחד ברור: לטרויה אין אולמות שותפים. יש רק Troya אחת.',
    video: '/products/work/troya.mp4',
    poster: '/products/work/poster-troya.jpg',
  },
  {
    brand: 'LAGO',
    industry: 'אולם אירועים',
    format: 'סרטון השוואה קיץ / חורף',
    brief: 'למלא את תאריכי החורף — העונה שזוגות הכי חוששים ממנה.',
    solution: 'מתג קיץ/חורף שמראה שזו אותה חוויה בדיוק: חימום מובנה, אותה רחבה, אותו עיצוב — ובסוף הצעה לתאריכי חורף.',
    video: '/products/work/lago.mp4',
    poster: '/products/work/poster-lago.jpg',
  },
  {
    brand: 'ELA-YAM',
    industry: 'מועדון כושר',
    format: 'סרטון תדמית',
    brief: 'להציג מועדון כושר יוקרתי מול הים ולגרום לאנשים לרצות להיות שם.',
    solution: 'סיור קולנועי במתחם: משקולות, אגרוף, ספינינג, אזור התאוששות וסאונה — ויציאה אל הים.',
    video: '/products/work/ela-yam.mp4',
    poster: '/products/work/poster-ela-yam.jpg',
  },
  {
    brand: 'BARDA',
    industry: 'מספרה',
    format: 'מיתוג + סרטון קביעת תור',
    brief: 'ספר מצוין עם עמוד אינסטגרם שלא שיקף את זה.',
    solution: 'לוגו חדש, תבנית לפוסטים, וסרטון שמראה כמה קל לקבוע תור אצל בר — ישר מהביו.',
    video: '/products/work/barda.mp4',
    poster: '/products/work/poster-barda.jpg',
  },
  {
    brand: 'Save The Date',
    industry: 'אירוע פרטי',
    format: 'הזמנה לחתונה',
    brief: 'לקוח שביקש סרטון Save The Date שלא נראה כמו עוד הזמנה.',
    solution: 'הזוג עובר דרך תקופות בהיסטוריה — רומא העתיקה, נמל יפו של 1925, דיזנגוף של 1962 — ועד הרחבה.',
    video: '/products/work/save-the-date.mp4',
    poster: '/products/work/poster-save-the-date.jpg',
  },
  {
    brand: 'Vibe or Value',
    industry: 'אפליקציה',
    format: 'סרטון השקה עם פרזנטור',
    brief: 'להסביר מוצר מורכב — ניתוח פונדמנטלי של מניות — בפחות מדקה.',
    solution: 'פרזנטור, הדגמה של הממשק האמיתי ואנימציות שמציגות את הבעיה לפני הפתרון.',
    video: '/products/work/vibe-or-value.mp4',
    poster: '/products/work/poster-vibe-or-value.jpg',
  },
];

const STEPS = [
  { when: 'היום', title: 'שיחת היכרות', desc: '20 דקות בוואטסאפ או בטלפון: מה העסק, למי אתם מוכרים, ומה הסרטון צריך להשיג.' },
  { when: 'לפני תשלום', title: 'תסריט לאישור', desc: 'אני כותב את התסריט ושולח לכם. אתם קוראים, מתקנים, מאשרים — ולא משלמים עד שאישרתם.' },
  { when: 'אחרי האישור', title: 'הפקה', desc: 'ויז׳ואל, תנועה, מוזיקה וכתוביות. בלי יום צילום, בלי לוקיישן ובלי שחקנים.' },
  { when: 'תוך 72 שעות', title: 'סרטון מוכן', desc: 'הסרטון אצלכם תוך 72 שעות מאישור התסריט, כולל קאבר. עד 2 סבבי תיקונים.' },
];

const ALTERNATIVES = [
  { title: 'חברת הפקה', points: ['10,000 ₪ ומעלה לסרטון בודד', 'שבועות של תיאומים', 'יום צילום, לוקיישן ושחקנים'] },
  { title: 'עורך / פרילנסר', points: ['עורך רק את מה שכבר צילמתם', 'את הצילום עדיין צריך לעשות', 'את התסריט אתם כותבים'] },
  { title: 'לבד, עם כלי AI', points: ['זול — אבל שבועות של למידה', 'קל שזה ייראה מזויף', 'בלי תסריט שנכתב למכירה'] },
];

const ORCI_POINTS = ['4 סרטונים ב-2,250 ₪', '72 שעות לסרטון', 'שיחה של 20 דקות — וזהו'];

/* ─── My own reels: proof that I know what stops a scroll ─── */
const MY_REELS = [
  { views: '921K', title: 'טרנד היציע', image: '/products/cover-847k.png', link: 'https://www.instagram.com/reel/DYPD4JRx3J2/' },
  { views: '350K', title: 'פרסומת לחנות ממתקים', image: '/products/cover-297k.png', link: 'https://www.instagram.com/reel/DYIItEFKx8A/' },
  { views: '140K', title: 'סרטון הסברה על ישראל', image: '/products/cover-137k.png', link: 'https://www.instagram.com/reel/DUS01xYilsL/' },
];

const PACKAGE_INCLUDES = [
  '3 סרטוני פרסומת + רביעי מתנה',
  'תסריט שנכתב למטרה העסקית שלכם',
  'הפקה מלאה — בלי יום צילום',
  'קאבר ממותג לכל סרטון',
  'עד 2 סבבי תיקונים לכל סרטון',
  'אספקה תוך 72 שעות מאישור התסריט',
];

const FAQ = [
  {
    q: 'פרסומת AI לא תיראה מזויפת?',
    a: 'זה החשש הכי נפוץ — ובצדק, כי רוב תוכן ה-AI ברשת באמת נראה ככה. ההבדל הוא שאני לא מייצר "סרטון AI", אני מפיק פרסומת: תסריט, סגנון ובקרת איכות. תסתכלו על העבודות למעלה ותחליטו בעצמכם.',
  },
  {
    q: 'מה אם לא אוהב את מה שיצא?',
    a: 'לא משלמים עד שאישרתם את התסריט — כך שאתם יודעים בדיוק מה תקבלו לפני שהוצאתם שקל. אחרי האישור, כל סרטון כולל עד 2 סבבי תיקונים.',
  },
  {
    q: 'כמה זמן זה לוקח?',
    a: 'כל סרטון נמסר תוך 72 שעות מרגע אישור התסריט. חבילה מלאה של 4 סרטונים — בדרך כלל תוך שבועיים.',
  },
  {
    q: 'מה אני צריך להביא?',
    a: 'כמעט כלום. שיחת היכרות של 20 דקות, לוגו, וכמה תמונות של המוצר או העסק. את כל השאר אני עושה.',
  },
  {
    q: 'עם איזה עסקים עבדת?',
    a: 'אולמות אירועים, מועדון כושר, מספרה, אפליקציה ואירועים פרטיים. זה מתאים לכל עסק שמוכר חוויה או מוצר שאפשר להראות — מסעדות, קליניקות, חנויות, נותני שירות.',
  },
];

/* ─── Mat Voyce: giant letters stretch with scroll speed and snap back ─── */
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

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function WhatsAppPill({ label, onDark = false }: { label: string; onDark?: boolean }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${s.pill} ${s.pillCyan} ${onDark ? s.pillOnDark : ''}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}

/* ─── Work video: play button over the poster; only one work video plays at a time ─── */
function WorkVideo({ work }: { work: Work }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function start() {
    setStarted(true);
    ref.current?.play();
  }

  function pauseOthers() {
    document.querySelectorAll<HTMLVideoElement>('video[data-work]').forEach((v) => {
      if (v !== ref.current) v.pause();
    });
  }

  return (
    <>
      <video
        ref={ref}
        data-work
        src={work.video}
        poster={work.poster}
        controls={started}
        playsInline
        preload="none"
        onPlay={pauseOthers}
        aria-label={`${work.brand} — ${work.format}`}
      />
      {!started && (
        <button onClick={start} aria-label={`הפעלת הסרטון של ${work.brand}`} className={s.play}>
          <span>
            <Play className="w-8 h-8 ml-1" fill="currentColor" color="#282c20" />
          </span>
        </button>
      )}
    </>
  );
}

/* ─── Lead form ─── */
function LeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
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
        <h3 className="text-2xl font-bold">הפרטים אצלי</h3>
        <p className="text-sm">אחזור אליך תוך 24 שעות.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input id="lead-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="שם מלא *" aria-label="שם מלא" required className={s.field} />
        <input id="lead-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="טלפון *" aria-label="מספר טלפון" required className={s.field} />
      </div>
      <input id="lead-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="אימייל *" aria-label="כתובת אימייל" required className={s.field} />
      <input id="lead-business" type="text" value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="שם העסק ותחום" aria-label="שם העסק ותחום" className={s.field} />
      {errorMsg && <p className={s.formError}>{errorMsg}</p>}
      <button type="submit" disabled={status === 'loading'} className={`${s.pill} ${s.pillCyan} ${s.submit}`} style={{ opacity: status === 'loading' ? 0.6 : 1 }}>
        <Send className="w-5 h-5" />
        {status === 'loading' ? 'שולח...' : 'שלחו לי פרטים'}
      </button>
      <label className={s.consent}>
        <input id="lead-consent" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} aria-label="אישור מדיניות הפרטיות" className="mt-0.5 w-4 h-4 flex-shrink-0" />
        <span>
          על ידי שליחה, אני מאשר/ת את <Link href="/privacy">מדיניות הפרטיות</Link> ומסכים/ה שתחזרו אליי
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

/* Hand-drawn underline under the manifesto (Lando's signature scribble) */
function Scribble() {
  const reduce = useReducedMotion();
  return (
    <svg className={s.scribble} viewBox="0 0 320 40" fill="none" aria-hidden="true">
      <motion.path
        d="M6 26 C 60 8, 110 34, 160 18 S 260 6, 314 22"
        stroke="#00d1ff"
        strokeWidth="5"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      />
    </svg>
  );
}

/* Stickers pop onto the hero; with reduced motion they appear instantly */
function Sticker({ className, delay, children, style }: { className: string; delay: number; children: React.ReactNode; style?: React.CSSProperties }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={className}
      style={style}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 18, delay }}
    >
      {children}
    </motion.span>
  );
}

export default function ProductsPage() {
  // Only named testimonials (with a business) are shown here — anonymous quotes read as made up.
  const testimonials = TESTIMONIALS.filter((t) => t.business);

  return (
    <div className={s.page}>
      {/* ═══ HERO — Lando portrait over a topo map, Mat Voyce giant word + stickers ═══ */}
      <section className={s.hero}>
        <div className={s.topo} aria-hidden="true" />
        <h1 className="sr-only">פרסומות שנראות כמו הפקה. בלי יום צילום אחד.</h1>

        <div className={`${s.wrap} ${s.heroMeta}`}>
          <span className={s.label}>אור שמר · Orci AI</span>
          <span className={s.label}>פרסומות לעסקים</span>
        </div>

        <div className={s.stage}>
          <Stretch className={`${s.display} ${s.heroWord}`}>פרסומות</Stretch>
          <Image
            src="/products/or-cutout.webp"
            alt="אור שמר"
            width={1086}
            height={1284}
            priority
            className={s.portrait}
          />
          <Sticker className={`${s.st} ${s.st1} ${s.sticker} ${s.stLime}`} delay={0.35}>
            72 שעות לסרטון
          </Sticker>
          <Sticker className={`${s.st} ${s.st2} ${s.sticker}`} delay={0.5}>
            לא משלמים עד שאישרתם תסריט
          </Sticker>
          <Sticker className={`${s.st} ${s.st3} ${s.sticker} ${s.stSoft}`} delay={0.65}>
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
            <div>
              <p className={`${s.display} ${s.heroTitle}`} aria-hidden="true">
                שנראות כמו <span className={s.serifAccent}>הפקה</span>.
                <br />
                בלי יום צילום אחד.
              </p>
              <p className={s.heroSub}>
                3 סרטוני פרסומת + רביעי מתנה, ב-<b>2,250 ₪</b>. מופקים ב-AI, נכתבים למכירה —{' '}
                <b>ולא משלמים עד שאישרתם את התסריט.</b>
              </p>
            </div>
            <div className={s.heroCtas}>
              <WhatsAppPill label="בואו נדבר על העסק שלכם" />
              <a href="#work" className={`${s.pill} ${s.pillGhost}`}>
                לעבודות
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLIENT TICKER (Lando lime band, client names as type) ═══ */}
      <div className={s.ticker} role="region" aria-label="מותגים שעבדנו איתם">
        <div className={s.tickerTrack}>
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={`${b.name}-${i}`} aria-hidden={i >= BRANDS.length}>
              {b.name}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ MANIFESTO (Lando "Redefining limits…") ═══ */}
      <section className={s.manifesto}>
        <div className={s.wrap}>
          <p className={s.display}>
            פרסומות שנראות כמו <span className={s.serifAccent}>הפקה</span>, בלי{' '}
            <span className={s.serifAccent}>יום צילום</span>, בלי <span className={s.serifAccent}>שחקנים</span> — ובלי
            לשלם לפני שאישרתם את <span className={s.serifAccent}>התסריט</span>.
          </p>
          <Scribble />
        </div>
      </section>

      {/* ═══ WORK (Mat Voyce "Featured work") ═══ */}
      <section id="work" className={`${s.work} scroll-mt-20`}>
        <div className={s.wrap}>
          <div className={s.sectionHead}>
            <h2 className="sr-only">עבודות</h2>
            <Stretch className={`${s.display} ${s.bigWord}`}>עבודות</Stretch>
            <p className={s.sectionIntro}>
              לא עוד &quot;סרטון יפה&quot;. כל פרסומת כאן התחילה משאלה עסקית — והתסריט נכתב כדי לענות עליה.
            </p>
          </div>

          <div className={s.workGrid}>
            {WORKS.map((w) => (
              <div key={w.brand} className={s.workItem}>
                <article className={s.card}>
                  <div className={s.media}>
                    <WorkVideo work={w} />
                    {w.views && (
                      <span className={`${s.sticker} ${s.stLime} ${s.views}`}>
                        <Eye className="w-5 h-5" />
                        {w.views}
                      </span>
                    )}
                  </div>
                  <div className={s.cardBody}>
                    <div className={s.cardTop}>
                      <h3 className={`${s.display} ${s.brand}`}>{w.brand}</h3>
                      <span className={s.chip}>{w.industry}</span>
                    </div>
                    <p className={s.format}>{w.format}</p>
                    <p>
                      <b>הבריף: </b>
                      <span>{w.brief}</span>
                    </p>
                    <p>
                      <b>מה עשינו: </b>
                      <span>{w.solution}</span>
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <p className={s.swipeHint}>החליקו לעבודות נוספות ←</p>
        </div>
      </section>

      {/* ═══ ABOUT (Lando "On track / Off track": for clients ↔ for myself) ═══ */}
      <section className={s.about}>
        <div className={`${s.wrap} ${s.aboutGrid}`}>
          <div>
            <span className={s.label} style={{ color: 'var(--sage)' }}>
              מי מאחורי זה
            </span>
            <h2 className={`${s.display} ${s.aboutTitle}`}>
              אני אור.
              <br />
              <span className={s.serifAccent}>אני יודע מה עוצר גלילה.</span>
            </h2>
            <p className={s.aboutText}>
              לפני ה-AI בניתי ערוץ יוטיוב של <b>130,000 רשומים</b> ו-<b>25 מיליון צפיות</b>. היום אני מייצר תוכן שמגיע
              למאות אלפי צפיות בחשבון שלי — ואת אותו ידע אני מכניס לפרסומות של עסקים.
            </p>
            <p className={s.aboutText}>אתם מדברים איתי ישירות. לא עם מנהל לקוח, לא עם צוות — איתי.</p>
            <div className={s.stats}>
              <div className={s.stat}>
                <div className={`${s.display} ${s.statNum}`}>130K</div>
                <div className={s.statLab}>רשומים ביוטיוב</div>
              </div>
              <div className={s.stat}>
                <div className={`${s.display} ${s.statNum}`}>25M</div>
                <div className={s.statLab}>צפיות בערוץ</div>
              </div>
              <div className={s.stat}>
                <div className={`${s.display} ${s.statNum}`}>921K</div>
                <div className={s.statLab}>צפיות ברילס אחד</div>
              </div>
            </div>
          </div>
          <div>
            <div className={s.reels}>
              {MY_REELS.map((r, i) => (
                <a
                  key={r.title}
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.reel} ${[s.reel1, s.reel2, s.reel3][i]}`}
                  aria-label={`${r.title} — ${r.views} צפיות באינסטגרם`}
                >
                  <Image src={r.image} alt="" fill sizes="260px" style={{ objectFit: 'cover' }} />
                  <span className={`${s.sticker} ${s.stLime} ${s.reelViews}`}>
                    <Eye className="w-4 h-4" />
                    {r.views}
                  </span>
                </a>
              ))}
            </div>
            <p className={s.reelsCaption}>מהחשבון שלי באינסטגרם</p>
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className={s.process}>
        <div className={s.wrap}>
          <div className={s.sectionHead}>
            <h2 className={`${s.display} ${s.bigWord}`} style={{ fontSize: 'clamp(72px, 11vw, 160px)' }}>
              איך זה עובד
            </h2>
            <p className={s.sectionIntro}>מהשיחה ועד הסרטון, בלי הפתעות. התשלום מגיע רק אחרי שאישרתם את התסריט.</p>
          </div>
          <ol className={s.steps}>
            {STEPS.map((st, i) => (
              <li key={st.title} className={s.step}>
                <span className={s.stepNum} aria-hidden="true">
                  {i + 1}
                </span>
                <span className={`${s.sticker} ${s.stLime} ${s.stepWhen}`}>{st.when}</span>
                <h3 className={`${s.display} ${s.stepTitle}`}>{st.title}</h3>
                <p>{st.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ COMPARISON ═══ */}
      <section className={s.compare}>
        <div className={s.wrap}>
          <h2 className={`${s.display} ${s.compareTitle}`}>
            יש לכם עוד שלוש אפשרויות. <span className={s.serifAccent}>הנה ההבדל.</span>
          </h2>
          <div className={s.compareGrid}>
            {ALTERNATIVES.map((alt) => (
              <div key={alt.title} className={s.alt}>
                <h3>{alt.title}</h3>
                <ul>
                  {alt.points.map((p) => (
                    <li key={p}>
                      <X className="w-4 h-4 mt-1 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className={s.orci}>
              <h3>עם אור</h3>
              <ul>
                {ORCI_POINTS.map((p) => (
                  <li key={p}>
                    <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS — appears automatically once named testimonials exist ═══ */}
      {testimonials.length > 0 && (
        <section className={s.quotes}>
          <div className={s.wrap}>
            <h2 className={`${s.display} ${s.bigWord}`} style={{ fontSize: 'clamp(72px, 11vw, 160px)', marginBottom: 48 }}>
              במילים שלהם
            </h2>
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

      {/* ═══ OFFER ═══ */}
      <section className={s.offer}>
        <div className={s.wrap}>
          <div className={s.ticket}>
            <span className={`${s.sticker} ${s.stLime} ${s.guarantee}`}>לא משלמים עד שאישרתם את התסריט</span>
            <div className={s.ticketTop}>
              <h2 className={`${s.display} ${s.ticketName}`}>
                <small>חבילת השקה</small>
                3+1
              </h2>
              <div className={s.price}>
                <s>4,000 ₪</s>
                <div className={`${s.display} ${s.priceNow}`}>2,250 ₪</div>
              </div>
            </div>
            <ul className={s.includes}>
              {PACKAGE_INCLUDES.map((item) => (
                <li key={item}>
                  <Check className="w-5 h-5 flex-shrink-0" color="#00a6cc" />
                  {item}
                </li>
              ))}
            </ul>
            <div className={s.ticketCtas}>
              <WhatsAppPill label="אני רוצה את החבילה" />
              <a href="#contact" className={`${s.pill} ${s.pillGhost}`}>
                השאירו פרטים
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className={`${s.contact} scroll-mt-20`}>
        <div className={`${s.wrap} ${s.contactGrid}`}>
          <div>
            <div className={s.avatar}>
              <Image src="/products/or-cutout.webp" alt="אור שמר" width={176} height={176} />
            </div>
            <h2 className="sr-only">היי, אני אור</h2>
            <Stretch className={`${s.display} ${s.contactTitle}`}>
              היי, אני <span style={{ color: 'var(--cyan)' }}>אור</span>
            </Stretch>
            <p className={s.contactText}>
              שלחו לי הודעה עם שם העסק ומה אתם רוצים שהסרטון ישיג — ואחזור אליכם תוך 24 שעות.
            </p>
            <WhatsAppPill label="שלחו לי הודעה בוואטסאפ" onDark />
          </div>
          <div className={s.formCard}>
            <h3>מעדיפים שאחזור אליכם?</h3>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className={s.faq}>
        <div className={s.wrap}>
          <h2 className={`${s.display} ${s.bigWord}`} style={{ fontSize: 'clamp(72px, 11vw, 160px)', marginBottom: 40 }}>
            שאלות
          </h2>
          <div className={s.faqList}>
            {FAQ.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
