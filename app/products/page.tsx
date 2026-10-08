'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  ChevronDown,
  Send,
  Play,
  Pause,
  Eye,
  ShieldCheck,
  Clock,
  MessageCircle,
  FileText,
  Clapperboard,
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { TESTIMONIALS } from '@/data/testimonials';

const WHATSAPP_URL = `https://wa.me/972542599107?text=${encodeURIComponent(
  'היי אור! ראיתי את העבודות באתר ואשמח לשמוע איך זה יכול לעבוד לעסק שלי'
)}`;

/* ─── Brands — shown as round logo bubbles. `bg` fills the circle behind the logo. ─── */
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

/* ─── Client work. `views` = views on the client's own account; the badge appears only when it's set. ─── */
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
  {
    icon: MessageCircle,
    when: 'היום',
    title: 'שיחת היכרות',
    desc: '20 דקות בוואטסאפ או בטלפון: מה העסק, למי אתם מוכרים, ומה הסרטון צריך להשיג.',
  },
  {
    icon: FileText,
    when: 'לפני תשלום',
    title: 'תסריט לאישור',
    desc: 'אני כותב את התסריט ושולח לכם. אתם קוראים, מתקנים, מאשרים — ולא משלמים עד שאישרתם.',
  },
  {
    icon: Clapperboard,
    when: 'אחרי האישור',
    title: 'הפקה',
    desc: 'ויז׳ואל, תנועה, מוזיקה וכתוביות. בלי יום צילום, בלי לוקיישן ובלי שחקנים.',
  },
  {
    icon: Clock,
    when: 'תוך 72 שעות',
    title: 'סרטון מוכן לעלות',
    desc: 'הסרטון אצלכם תוך 72 שעות מאישור התסריט, כולל קאבר. עד 2 סבבי תיקונים.',
  },
];

const ALTERNATIVES = [
  {
    title: 'חברת הפקה',
    points: ['10,000 ₪ ומעלה לסרטון בודד', 'שבועות של תיאומים', 'יום צילום, לוקיישן ושחקנים'],
  },
  {
    title: 'עורך / פרילנסר',
    points: ['עורך רק את מה שכבר צילמתם', 'את הצילום עדיין צריך לעשות', 'את התסריט אתם כותבים'],
  },
  {
    title: 'לבד, עם כלי AI',
    points: ['זול — אבל שבועות של למידה', 'קל שזה ייראה מזויף', 'בלי תסריט שנכתב למכירה'],
  },
];

const ORCI_POINTS = ['4 סרטונים ב-2,250 ₪', '72 שעות לסרטון', 'שיחה של 20 דקות — וזהו'];

/* ─── My own reels — proof that I know what stops a scroll ─── */
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
    q: 'פרסומת AI לא תיראה מזויפת או זולה?',
    a: 'זה החשש הכי נפוץ — ובצדק, כי רוב תוכן ה-AI ברשת באמת נראה ככה. ההבדל הוא שאני לא מייצר "סרטון AI", אני מפיק פרסומת: תסריט, סגנון ובקרת איכות. תסתכלו על העבודות למעלה ותחליטו בעצמכם.',
  },
  {
    q: 'מה אם לא אוהב את מה שיצא?',
    a: 'לא משלמים עד שאישרתם את התסריט — כך שאתם יודעים בדיוק מה תקבלו לפני שהוצאתם שקל. אחרי האישור, כל סרטון כולל עד 2 סבבי תיקונים.',
  },
  {
    q: 'כמה זמן לוקח לקבל את הסרטונים?',
    a: 'כל סרטון נמסר תוך 72 שעות מרגע אישור התסריט. חבילה מלאה של 4 סרטונים — בדרך כלל תוך שבועיים.',
  },
  {
    q: 'מה אני צריך להביא מהצד שלי?',
    a: 'כמעט כלום. שיחת היכרות של 20 דקות, לוגו, וכמה תמונות של המוצר או העסק. את כל השאר אני עושה.',
  },
  {
    q: 'עם איזה עסקים עבדת?',
    a: 'אולמות אירועים, מועדון כושר, מספרה, אפליקציה ואירועים פרטיים. זה מתאים לכל עסק שמוכר חוויה או מוצר שאפשר להראות — מסעדות, קליניקות, חנויות, נותני שירות.',
  },
];

/* ─── Section micro-label ─── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="orci-kicker">
      <span className="orci-kicker-label">{label}</span>
    </div>
  );
}

/* ─── Round logo bubble ─── */
function BrandBubble({ brand, className }: { brand: Brand; className: string }) {
  return (
    <div
      className={`rounded-full overflow-hidden flex-shrink-0 ${className}`}
      style={{ background: brand.bg, boxShadow: '0 0 0 2px var(--bg), 0 0 0 3px var(--border-subtle)' }}
    >
      <Image src={brand.logo} alt={brand.name} width={192} height={192} className="w-full h-full object-contain" />
    </div>
  );
}

/* ─── Hero reel — muted autoplay montage of client work, with a pause control ─── */
function HeroReel() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  // Respect reduced-motion; `playing` follows the video's own play/pause events.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) ref.current?.pause();
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }

  return (
    <div className="relative mx-auto w-[230px] sm:w-[260px] lg:w-[300px]">
      <div className="rounded-[2.4rem] p-2 shadow-2xl" style={{ background: '#0b0f19' }}>
        <div className="overflow-hidden rounded-[2rem] aspect-[9/16] bg-black">
          <video
            ref={ref}
            src="/products/work/hero-reel.mp4"
            poster="/products/work/poster-hero-reel.jpg"
            autoPlay
            muted
            loop
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label="קטעים מעבודות ללקוחות: Troya, LAGO, Ela-Yam, Save The Date, BARDA ו-Vibe or Value"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <button
        onClick={toggle}
        aria-label={playing ? 'עצירת הסרטון' : 'הפעלת הסרטון'}
        className="absolute bottom-5 left-5 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}
      >
        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
    </div>
  );
}

/* ─── Work video — poster with a play button; native controls appear once it starts ─── */
function WorkVideo({ work }: { work: Work }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function start() {
    setStarted(true);
    ref.current?.play();
  }

  // Pause any other work video so two soundtracks never overlap
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
        className="w-full h-full object-cover"
      />
      {!started && (
        <button
          onClick={start}
          aria-label={`הפעלת הסרטון של ${work.brand}`}
          className="group absolute inset-0 flex items-center justify-center"
        >
          <span
            className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }}
          >
            <Play className="w-7 h-7 ml-1" style={{ color: '#0b0f19' }} fill="currentColor" />
          </span>
        </button>
      )}
    </>
  );
}

/* ─── Work card ─── */
function WorkCard({ work }: { work: Work }) {
  return (
    <article
      className="flex flex-col h-full rounded-3xl overflow-hidden"
      style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' }}
    >
      <div className="relative aspect-[9/16] bg-black">
        <WorkVideo work={work} />
        {work.views && (
          <span
            className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: 'rgba(0,0,0,0.7)', color: '#fff' }}
          >
            <Eye className="w-3.5 h-3.5" />
            {work.views} צפיות
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold">{work.brand}</h3>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
          >
            {work.industry}
          </span>
        </div>
        <p className="text-xs -mt-1" style={{ color: 'var(--text-muted)' }}>{work.format}</p>
        <p className="text-sm leading-relaxed">
          <span className="font-bold">הבריף: </span>
          <span style={{ color: 'var(--text-secondary)' }}>{work.brief}</span>
        </p>
        <p className="text-sm leading-relaxed">
          <span className="font-bold">מה עשינו: </span>
          <span style={{ color: 'var(--text-secondary)' }}>{work.solution}</span>
        </p>
      </div>
    </article>
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div
          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background: 'var(--accent-soft)', border: '2px solid var(--accent)' }}
        >
          <Check className="w-8 h-8" style={{ color: 'var(--accent)' }} />
        </div>
        <h3 className="text-2xl font-bold mb-2">הפרטים נשלחו!</h3>
        <p style={{ color: 'var(--text-secondary)' }}>אחזור אליך תוך 24 שעות</p>
      </motion.div>
    );
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-strong)',
    color: 'var(--text-primary)',
  };
  const inputClass =
    'w-full px-5 py-3.5 rounded-full text-sm outline-none transition-colors placeholder:opacity-50';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="שם מלא *"
          aria-label="שם מלא"
          required
          className={inputClass}
          style={inputStyle}
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="טלפון *"
          aria-label="מספר טלפון"
          required
          className={inputClass}
          style={inputStyle}
        />
      </div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="אימייל *"
        aria-label="כתובת אימייל"
        required
        className={inputClass}
        style={inputStyle}
      />
      <input
        type="text"
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
        placeholder="שם העסק ותחום (אולם אירועים, מסעדה, קליניקה...)"
        aria-label="שם העסק ותחום"
        className={inputClass}
        style={inputStyle}
      />

      {errorMsg && <p className="text-red-500 text-xs text-center">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="cap-btn cap-btn-primary w-full text-base"
        style={{ padding: '1rem', opacity: status === 'loading' ? 0.6 : 1 }}
      >
        <Send className="w-5 h-5" />
        {status === 'loading' ? 'שולח...' : 'שלחו לי פרטים'}
      </button>

      <label className="flex items-start gap-2 cursor-pointer text-right">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          aria-label="אישור מדיניות הפרטיות"
          className="mt-0.5 w-4 h-4 rounded cursor-pointer flex-shrink-0"
          style={{ accentColor: 'var(--accent)' }}
        />
        <span className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          על ידי שליחה, אני מאשר/ת את{' '}
          <Link href="/privacy" className="underline hover:opacity-80" style={{ color: 'var(--accent)' }}>
            מדיניות הפרטיות
          </Link>{' '}
          ומסכים/ה שתחזרו אליי
        </span>
      </label>
    </form>
  );
}

/* ─── FAQ accordion ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-6 text-right"
      >
        <span className="font-bold text-base md:text-lg" style={{ color: 'var(--text-primary)' }}>{q}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--accent)' }}
        />
      </button>
      {open && (
        <p className="pb-6 leading-relaxed text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
          {a}
        </p>
      )}
    </div>
  );
}

/* ─── Shared WhatsApp button ─── */
function WhatsAppButton({ label, outline = false }: { label: string; outline?: boolean }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`cap-btn text-base ${outline ? 'cap-btn-outline' : 'cap-btn-whatsapp'}`}
      style={{ padding: '1rem 2.2rem' }}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {label}
    </a>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

export default function ProductsPage() {
  // Only named testimonials (with a business) are shown here — anonymous quotes read as made up.
  const testimonials = TESTIMONIALS.filter((t) => t.business);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden px-6 pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm font-semibold mb-7"
              style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent-line)' }}
            >
              פרסומות לעסקים · אור שמר
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="cap-hero-title mb-6"
            >
              פרסומות שנראות כמו הפקה גדולה.
              <br />
              <span style={{ color: 'var(--accent)' }}>בלי יום צילום אחד.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              3 סרטוני פרסומת לעסק שלכם + רביעי מתנה, ב-
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>2,250 ₪</span>.
              {' '}מופקים ב-AI, נכתבים למכירה —{' '}
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>ולא משלמים עד שאישרתם את התסריט.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
            >
              <WhatsAppButton label="בואו נדבר על העסק שלכם" />
              <a href="#work" className="cap-btn cap-btn-outline text-base" style={{ padding: '1rem 2.2rem' }}>
                לעבודות
              </a>
            </motion.div>

            {/* Avatar-stack social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <div className="flex">
                {BRANDS.slice(0, 5).map((b, i) => (
                  <BrandBubble key={b.name} brand={b} className={`w-10 h-10 ${i > 0 ? '-ms-3' : ''}`} />
                ))}
              </div>
              <p className="text-sm text-right" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>LAGO, TROYA, ELA-YAM</span>
                <br />
                ועוד עסקים שכבר עובדים איתי
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <HeroReel />
          </motion.div>
        </div>
      </section>

      {/* ─── Brands ─── */}
      <section
        className="px-6 py-12 md:py-14"
        style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-alt)' }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm font-semibold mb-8" style={{ color: 'var(--text-muted)' }}>
            מותגים שעבדנו איתם
          </p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-6 sm:gap-x-6 md:gap-x-10">
            {BRANDS.map((b) => (
              <div key={b.name} className="flex flex-col items-center gap-2 w-[72px] md:w-24">
                <BrandBubble brand={b} className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                <span className="text-xs font-semibold text-center" style={{ color: 'var(--text-secondary)' }}>
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Work ─── */}
      <section id="work" className="px-6 py-20 md:py-28 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12 md:mb-14">
            <SectionLabel label="עבודות" />
            <h2 className="cap-section-title mb-4">
              לכל עסק הייתה <span style={{ color: 'var(--accent)' }}>בעיה אחרת</span>
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              לא עוד &quot;סרטון יפה&quot;. כל פרסומת כאן התחילה משאלה עסקית — והתסריט נכתב כדי לענות עליה.
            </p>
          </motion.div>

          {/* Mobile: swipeable row. Desktop: 3-column grid. */}
          <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pb-4">
            {WORKS.map((w) => (
              <div key={w.brand} className="snap-center shrink-0 w-[78vw] max-w-[320px] md:w-auto md:max-w-none">
                <WorkCard work={w} />
              </div>
            ))}
          </div>
          <p className="md:hidden text-center text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
            החליקו לעבודות נוספות ←
          </p>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-alt)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <SectionLabel label="התהליך" />
            <h2 className="cap-section-title">
              מהשיחה ועד הסרטון — <span style={{ color: 'var(--accent)' }}>בלי הפתעות</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-3xl p-6 md:p-7"
                style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--accent-soft)' }}
                  >
                    <s.icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <span className="font-display text-3xl font-black" style={{ color: 'var(--border-strong)' }}>
                    0{i + 1}
                  </span>
                </div>
                <p className="text-xs font-bold mb-2" style={{ color: 'var(--accent)' }}>{s.when}</p>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Comparison ─── */}
      <section className="px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <SectionLabel label="ההשוואה" />
            <h2 className="cap-section-title">
              יש לכם עוד שלוש אפשרויות. <span style={{ color: 'var(--accent)' }}>הנה ההבדל.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ALTERNATIVES.map((alt) => (
              <motion.div
                key={alt.title}
                {...fadeUp}
                className="rounded-3xl p-7"
                style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' }}
              >
                <h3 className="text-lg font-bold mb-5" style={{ color: 'var(--text-secondary)' }}>{alt.title}</h3>
                <ul className="space-y-3">
                  {alt.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            <motion.div
              {...fadeUp}
              className="rounded-3xl p-7"
              style={{ background: 'var(--accent-soft)', border: '2px solid var(--accent)' }}
            >
              <h3 className="text-lg font-bold mb-5" style={{ color: 'var(--accent)' }}>עם אור</h3>
              <ul className="space-y-3">
                {ORCI_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm font-semibold">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section className="px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-alt)' }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-14 items-center">
          <motion.div {...fadeUp} className="relative max-w-[320px] mx-auto w-full">
            <div className="rounded-3xl overflow-hidden aspect-[3/4]" style={{ border: '1px solid var(--border-subtle)' }}>
              <Image src="/or-casual.jpg" alt="אור שמר" width={1086} height={1448} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="text-center md:text-right">
            <SectionLabel label="מי מאחורי זה" />
            <h2 className="cap-section-title mb-5">
              אני אור. <span style={{ color: 'var(--accent)' }}>אני יודע מה עוצר גלילה.</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              לפני ה-AI בניתי ערוץ יוטיוב של{' '}
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>130,000 רשומים</span> ו-
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>25 מיליון צפיות</span>.
              היום אני מייצר תוכן שמגיע למאות אלפי צפיות בחשבון שלי — ואת אותו ידע אני מכניס לפרסומות של עסקים.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              אתם מדברים איתי ישירות. לא עם מנהל לקוח, לא עם צוות — איתי.
            </p>

            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>מהחשבון שלי</p>
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto md:mx-0">
              {MY_REELS.map((r) => (
                <a
                  key={r.title}
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl overflow-hidden aspect-[3/4] block"
                  aria-label={`${r.title} — ${r.views} צפיות באינסטגרם`}
                >
                  <Image
                    src={r.image}
                    alt=""
                    fill
                    sizes="140px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 text-xs font-bold text-white">
                    <Eye className="w-3.5 h-3.5" />
                    {r.views}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Testimonials — appears automatically once named testimonials exist ─── */}
      {testimonials.length > 0 && (
        <section className="px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="text-center mb-14">
              <SectionLabel label="לקוחות מספרים" />
              <h2 className="cap-section-title">במילים שלהם</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t) => (
                <motion.figure
                  key={t.name}
                  {...fadeUp}
                  className="rounded-3xl p-7 flex flex-col gap-5"
                  style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' }}
                >
                  <blockquote className="text-base leading-relaxed flex-1">&quot;{t.quote}&quot;</blockquote>
                  <figcaption>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.business}</p>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Offer ─── */}
      <section className="px-6 py-20 md:py-28 relative overflow-hidden" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <SectionLabel label="החבילה" />
          </motion.div>

          <motion.div
            {...fadeUp}
            className="rounded-[2rem] p-8 md:p-12 text-center"
            style={{ background: 'var(--surface-card)', border: '2px solid var(--accent)', boxShadow: '0 30px 80px -40px var(--accent)' }}
          >
            <div
              className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold mb-6"
              style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
            >
              מבצע השקה — מקומות מוגבלים
            </div>
            <h2 className="cap-section-title mb-3">חבילת השקה 3+1</h2>
            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>3 סרטונים מותאמים לעסק שלכם + סרטון רביעי מתנה</p>

            <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 mb-10">
              <span className="font-display text-2xl md:text-3xl line-through whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>4,000 ₪</span>
              <span className="font-display text-5xl md:text-7xl font-black whitespace-nowrap" style={{ color: 'var(--accent)' }}>2,250 ₪</span>
            </div>

            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-right max-w-xl mx-auto mb-10">
              {PACKAGE_INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm md:text-base">
                  <Check className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                  {item}
                </li>
              ))}
            </ul>

            {/* Risk reversal */}
            <div
              className="flex items-start gap-4 text-right rounded-2xl p-5 md:p-6 mb-10 max-w-xl mx-auto"
              style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}
            >
              <ShieldCheck className="w-8 h-8 flex-shrink-0" style={{ color: 'var(--accent)' }} />
              <div>
                <p className="font-bold mb-1">לא משלמים עד שאישרתם את התסריט</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  קודם תסריט. אתם קוראים, מתקנים ומאשרים — ורק אז משלמים. לא אהבתם? לא שילמתם.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <WhatsAppButton label="אני רוצה את החבילה" />
              <a href="#contact" className="cap-btn cap-btn-outline text-base" style={{ padding: '1rem 2.2rem' }}>
                השאירו פרטים
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="px-6 py-20 md:py-28 scroll-mt-20" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-alt)' }}>
        <div className="max-w-xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-5" style={{ border: '3px solid var(--accent)' }}>
              <Image src="/or-casual.jpg" alt="אור שמר" width={160} height={160} className="w-full h-full object-cover object-top" />
            </div>
            <h2 className="cap-section-title mb-4">היי, אני אור 👋</h2>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              שלחו לי הודעה עם שם העסק ומה אתם רוצים שהסרטון ישיג — ואחזור אליכם תוך 24 שעות.
            </p>
            <WhatsAppButton label="שלחו לי הודעה בוואטסאפ" />
          </motion.div>

          <motion.div
            {...fadeUp}
            className="rounded-3xl p-7 md:p-9"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' }}
          >
            <p className="text-center text-sm font-semibold mb-6" style={{ color: 'var(--text-muted)' }}>
              מעדיפים שאחזור אליכם? השאירו פרטים
            </p>
            <LeadForm />
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <SectionLabel label="שאלות" />
            <h2 className="cap-section-title">שאלות נפוצות</h2>
          </motion.div>
          <div>
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
