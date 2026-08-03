'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Eye,
  Check,
  Clock,
  Video,
  PenTool,
  ImageIcon,
  TrendingUp,
  ChevronDown,
  Send,
  Quote,
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { TESTIMONIALS } from '@/data/testimonials';

const WHATSAPP_URL = `https://wa.me/972542599107?text=${encodeURIComponent(
  'היי אור! ראיתי את דף השיווק לעסקים ואשמח לשמוע עוד על חבילת ההשקה 3+1 לעסק שלי'
)}`;

/* ─── Recent viral results — real reels, real numbers ─── */
const VIRAL_RESULTS = [
  {
    views: '921K',
    title: 'טרנד היציע',
    image: '/products/cover-847k.png',
    link: 'https://www.instagram.com/reel/DYPD4JRx3J2/',
  },
  {
    views: '350K',
    title: 'פרסומת לחנות ממתקים',
    image: '/products/cover-297k.png',
    link: 'https://www.instagram.com/reel/DYIItEFKx8A/',
  },
  {
    views: '140K',
    title: 'סרטון הסברה על ישראל',
    image: '/products/cover-137k.png',
    link: 'https://www.instagram.com/reel/DUS01xYilsL/',
  },
];

const STATS = [
  { value: 'x10', label: 'זול מהפקה מסורתית' },
  { value: '100%', label: 'AI — בלי צלם ואולפן' },
  { value: '921K', label: 'צפיות בסרטון בודד' },
  { value: '72h', label: 'זמן אספקה לסרטון' },
];

const TOOLS = ['VEO 3.1', 'KLING 3.0', 'HIGGSFIELD', 'NANO BANANA PRO', 'GPT IMAGE 2', 'SEEDANCE 2.0', 'ELEVENLABS', 'CLAUDE'];

const SERVICES = [
  {
    icon: Video,
    title: 'פרסומות AI',
    desc: 'פרסומת ברמה קולנועית לעסק שלך — בלי צלם, בלי אולפן, בלי שחקנים. רק תוצאה שנראית כמו מיליון דולר.',
  },
  {
    icon: TrendingUp,
    title: 'תוכן סושיאל שוטף',
    desc: 'רילסים וטיקטוקים שבנויים על הנוסחאות שהביאו לי מאות אלפי צפיות — מותאמים למותג שלך.',
  },
  {
    icon: PenTool,
    title: 'תסריטים ויראליים',
    desc: 'הוק שעוצר את הגלילה בשנייה הראשונה. כל סרטון נבנה סביב תסריט שנכתב להמרה, לא רק לצפיות.',
  },
  {
    icon: ImageIcon,
    title: 'קאברים וויז׳ואלים',
    desc: 'תמונות קאבר, באנרים וויז׳ואלים ממותגים בסגנון אחיד — כדי שהפיד שלך ייראה כמו מותג, לא כמו עסק קטן.',
  },
];

const PACKAGE_INCLUDES = [
  'תסריט ויראלי מותאם לעסק',
  'הפקת AI מלאה ברמה קולנועית',
  'קאבר ממותג לכל סרטון',
  'התאמה מלאה לשפת המותג שלך',
  'עד 2 סבבי תיקונים לכל סרטון',
  'אספקה תוך 72 שעות לסרטון',
];

const CLIENTS = [
  { name: 'Wave-Adv', logo: '/products/logo-wave-adv.png' },
  { name: 'Pinookim Sweet', logo: '/products/logo-pinookim.jpg' },
  { name: 'DeepDataTerminal', logo: null },
  { name: 'מחבר הספר "תה בלי סוכר"', logo: null },
];

const FAQ = [
  {
    q: 'פרסומת AI לא תיראה מזויפת או זולה לעסק שלי?',
    a: 'זה החשש הכי נפוץ — ובצדק, כי רוב תוכן ה-AI ברשת באמת נראה ככה. ההבדל הוא שאני לא מייצר "סרטון AI" — אני מפיק פרסומת, עם תסריט, סגנון ובקרת איכות של יוצר תוכן. תסתכל על הדוגמאות למעלה: הן הגיעו למאות אלפי צפיות בדיוק כי הן לא נראות מזויפות.',
  },
  {
    q: 'כמה זמן לוקח לקבל את הסרטונים?',
    a: 'כל סרטון נמסר תוך 72 שעות מרגע אישור התסריט. חבילה מלאה של 4 סרטונים — בדרך כלל תוך שבועיים.',
  },
  {
    q: 'מה אני צריך להביא מהצד שלי?',
    a: 'כמעט כלום. שיחת אפיון קצרה של 20 דקות, לוגו, וכמה תמונות של המוצר או העסק. את כל השאר אני עושה.',
  },
  {
    q: 'למי זה מתאים?',
    a: 'לכל עסק שרוצה נוכחות דיגיטלית ברמה של מותגים גדולים — בלי תקציב של מותגים גדולים. מסעדות, קליניקות, איקומרס, נותני שירות, חנויות ועוד.',
  },
  {
    q: 'מה אם הסרטון לא ימצא חן בעיניי?',
    a: 'כל סרטון כולל עד 2 סבבי תיקונים. התסריט מאושר על ידך לפני ההפקה, כך שאין הפתעות בדרך.',
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
        <p style={{ color: 'var(--text-secondary)' }}>אחזור אליך תוך 24 שעות עם הצעה מותאמת</p>
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
          required
          className={inputClass}
          style={inputStyle}
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="טלפון *"
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
        required
        className={inputClass}
        style={inputStyle}
      />
      <input
        type="text"
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
        placeholder="תחום העסק (מסעדה, קליניקה, חנות אונליין...)"
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
        {status === 'loading' ? 'שולח...' : 'שלח לי הצעה מותאמת'}
      </button>

      <label className="flex items-start gap-2 cursor-pointer text-right">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
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
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      {/* Marquee keyframes */}
      <style>{`
        @keyframes orci-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm font-semibold mb-8"
            style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent-line)' }}
          >
            שיווק AI לעסקים · אור שמר
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="cap-hero-title mb-8"
          >
            תוכן שעוצר את הגלילה.
            <br />
            <span style={{ color: 'var(--accent)' }}>במחיר שלא עוצר אותך.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ color: 'var(--text-secondary)' }}
          >
            פרסומות וסרטוני סושיאל מבוססי AI לעסק שלך — מהיוצר שמאחורי{' '}
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>מיליוני צפיות</span>.
            בלי צלם, בלי אולפן, בלי תקציבי ענק — ובלי שזה ייראה מזויף.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#lead-form"
              className="cap-btn cap-btn-primary text-base"
              style={{ padding: '1rem 2.4rem' }}
            >
              אני רוצה תוכן כזה לעסק שלי
            </a>
            <WhatsAppButton label="דבר איתי בוואטסאפ" outline />
          </motion.div>
        </div>
      </section>

      {/* ─── Tools marquee ─── */}
      <div
        className="overflow-hidden py-5"
        style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', direction: 'ltr', background: 'var(--surface-alt)' }}
      >
        <div
          className="flex w-max items-center gap-10"
          style={{ animation: 'orci-marquee 30s linear infinite' }}
        >
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-xs tracking-[0.25em] whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
              {tool}
              <span className="w-1 h-1 rounded-full inline-block" style={{ background: 'var(--accent)' }} />
            </span>
          ))}
        </div>
      </div>

      {/* ─── Stats strip ─── */}
      <section className="px-6 py-14 md:py-20">
        <motion.div
          {...fadeUp}
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center px-4 py-6">
              <div className="font-display text-4xl md:text-5xl font-black mb-2" style={{ color: 'var(--accent)' }}>
                {s.value}
              </div>
              <div className="text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── Viral results ─── */}
      <section className="px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-alt)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <SectionLabel label="תוצאות" />
            <h2 className="cap-section-title mb-5">
              התוצאות <span style={{ color: 'var(--accent)' }}>מדברות בעצמן</span>
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              אלה לא הבטחות — אלה סרטונים אמיתיים שיצרתי עם AI. לחץ וראה בעצמך.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {VIRAL_RESULTS.map((item, i) => (
              <motion.a
                key={item.views}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative block rounded-2xl overflow-hidden transition-transform hover:-translate-y-2"
                style={{ border: '1px solid var(--border-subtle)', aspectRatio: '9/16', boxShadow: 'var(--shadow-card)' }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Bottom gradient */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(10,16,28,0.95), transparent)' }}
                />
                {/* Views badge */}
                <div className="absolute bottom-4 inset-x-0 flex flex-col items-center gap-1.5">
                  <div
                    className="flex items-center gap-2 px-5 py-1.5 rounded-full font-bold text-xl text-white"
                    style={{ background: 'rgba(10,16,28,0.7)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}
                  >
                    <Eye className="w-5 h-5" />
                    {item.views}
                  </div>
                  <span className="text-xs text-white/85">{item.title}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials — real client quotes, anonymous by request ─── */}
      {TESTIMONIALS.length > 0 && (
        <section className="px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="text-center mb-14">
              <SectionLabel label="לקוחות מספרים" />
              <h2 className="cap-section-title">
                במילים <span style={{ color: 'var(--accent)' }}>שלהם</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t, i) => (
                <motion.figure
                  key={t.quote}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="cap-card flex flex-col"
                  style={{ padding: '1.75rem' }}
                >
                  <Quote className="w-6 h-6 mb-4" style={{ color: 'var(--accent)' }} />
                  <blockquote className="text-lg font-medium leading-relaxed flex-1 mb-4" style={{ color: 'var(--text-primary)' }}>
                    &quot;{t.quote}&quot;
                  </blockquote>
                  <figcaption>
                    <div className="font-bold text-sm">{t.name}</div>
                    {t.role && <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.role}</div>}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Services ─── */}
      <section className="px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-alt)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <SectionLabel label="השירותים" />
            <h2 className="cap-section-title">
              מה <span style={{ color: 'var(--accent)' }}>תקבל</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="cap-card"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                  style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}
                >
                  <s.icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="leading-relaxed text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI vs traditional ─── */}
      <section className="px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <SectionLabel label="ההשוואה" />
            <h2 className="cap-section-title">
              למה AI ולא <span style={{ color: 'var(--accent)' }}>הפקה רגילה?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div
              {...fadeUp}
              className="rounded-2xl p-8 md:p-10"
              style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' }}
            >
              <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--text-muted)' }}>הפקה מסורתית</h3>
              <ul className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
                <li className="flex gap-3"><span className="text-red-500/80">✗</span> 10,000 ש&quot;ח ומעלה לסרטון בודד</li>
                <li className="flex gap-3"><span className="text-red-500/80">✗</span> שבועות של תיאומים, צלמים ולוקיישנים</li>
                <li className="flex gap-3"><span className="text-red-500/80">✗</span> כל שינוי = יום צילום נוסף</li>
                <li className="flex gap-3"><span className="text-red-500/80">✗</span> מוגבל למה שאפשר לצלם במציאות</li>
              </ul>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
              style={{ background: 'var(--accent-soft)', border: '1.5px solid var(--accent)', boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--accent)' }}>הפקת AI עם אור שמר</h3>
              <ul className="space-y-4" style={{ color: 'var(--text-primary)' }}>
                <li className="flex gap-3"><Check className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent)' }} /> חלק קטן מהמחיר</li>
                <li className="flex gap-3"><Check className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent)' }} /> סרטון מוכן תוך 72 שעות</li>
                <li className="flex gap-3"><Check className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent)' }} /> תיקונים בקליק, בלי ימי צילום</li>
                <li className="flex gap-3"><Check className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent)' }} /> כל רעיון אפשרי — גם מה שאי אפשר לצלם</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Clients ─── */}
      <section className="px-6 py-16 md:py-20" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-alt)' }}>
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <SectionLabel label="לקוחות" />
          <div className="flex flex-wrap justify-center items-stretch gap-5 mt-2">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="rounded-2xl p-3 transition-transform hover:-translate-y-1 flex flex-col items-center justify-center"
                style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', minWidth: '8.5rem', boxShadow: 'var(--shadow-card)' }}
              >
                {client.logo ? (
                  <>
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-white">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        sizes="112px"
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-2 text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{client.name}</p>
                  </>
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center text-center px-2">
                    <p className="text-sm font-bold leading-snug" style={{ color: 'var(--text-secondary)' }}>{client.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Launch package ─── */}
      <section className="px-6 py-20 md:py-28 relative overflow-hidden" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <motion.div {...fadeUp} className="relative max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <SectionLabel label="המבצע" />
          </div>
          <div
            className="rounded-3xl p-8 md:p-14 text-center"
            style={{
              background: 'var(--surface-card)',
              border: '1.5px solid var(--accent)',
              boxShadow: 'var(--shadow-card-hover)',
            }}
          >
            <span
              className="inline-block px-5 py-1.5 rounded-full text-xs font-bold tracking-wider mb-8"
              style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)', color: 'var(--accent)' }}
            >
              מבצע השקה — מקומות מוגבלים
            </span>

            <h2 className="cap-section-title mb-3">
              חבילת ההשקה <span style={{ color: 'var(--accent)' }}>3+1</span>
            </h2>
            <p className="text-base md:text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
              3 סרטונים מותאמים לעסק שלך + <span className="font-bold" style={{ color: 'var(--accent)' }}>סרטון רביעי מתנה</span>
            </p>

            <div className="flex items-baseline justify-center gap-4 mb-10" style={{ direction: 'ltr' }}>
              <span className="font-display text-2xl md:text-3xl line-through" style={{ color: 'var(--text-muted)' }}>₪4,000</span>
              <span className="font-display text-6xl md:text-7xl font-black" style={{ color: 'var(--accent)' }}>₪2,250</span>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-right mb-12 max-w-lg mx-auto">
              {PACKAGE_INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#lead-form"
                className="cap-btn cap-btn-primary text-base"
                style={{ padding: '1rem 2.4rem' }}
              >
                שריין מקום במבצע
              </a>
              <WhatsAppButton label="שאלה? וואטסאפ" outline />
            </div>

            <p className="mt-8 text-xs flex items-center justify-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <Clock className="w-3.5 h-3.5" />
              המחיר תקף לחבילות ההשקה הראשונות בלבד
            </p>
          </div>
        </motion.div>
      </section>

      {/* ─── Lead form + WhatsApp ─── */}
      <section id="lead-form" className="px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-alt)' }}>
        <div className="max-w-xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <SectionLabel label="יצירת קשר" />
            <h2 className="cap-section-title mb-4">
              בוא <span style={{ color: 'var(--accent)' }}>נתחיל</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              השאר פרטים ואחזור אליך תוך 24 שעות עם הצעה מותאמת לעסק שלך
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="rounded-3xl p-7 md:p-10"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}
          >
            <LeadForm />

            <div className="flex items-center gap-4 my-7">
              <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>או</span>
              <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
            </div>

            <div className="text-center">
              <WhatsAppButton label="דבר איתי ישר בוואטסאפ" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="px-6 py-20 md:py-28" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <SectionLabel label="שאלות" />
            <h2 className="cap-section-title">
              שאלות <span style={{ color: 'var(--accent)' }}>נפוצות</span>
            </h2>
          </motion.div>
          <motion.div {...fadeUp} style={{ borderTop: '1px solid var(--border-subtle)' }}>
            {FAQ.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
