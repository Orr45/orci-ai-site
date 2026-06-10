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
} from 'lucide-react';
import { Particles } from '@/components/ui/highlighter';
import { Footer } from '@/components/layout/Footer';

/* ─── Brand constants (ORCIAI Instagram brand — intentionally distinct from site cyan) ─── */
const BG = '#0D0D1A';
const PURPLE = '#534AB7';
const MINT = '#00FFD1';

/* Text hierarchy — opacity ladder instead of multiple colors (hd-media pattern) */
const INK_DIM = 'rgba(255,255,255,0.65)';
const INK_MUTE = 'rgba(255,255,255,0.4)';
/* Hairline borders */
const LINE = 'rgba(255,255,255,0.08)';
const LINE_STRONG = 'rgba(255,255,255,0.16)';

const WHATSAPP_URL = `https://wa.me/972542599107?text=${encodeURIComponent(
  'היי אורצי! ראיתי את דף המוצרים ואני רוצה לשמוע עוד על חבילת ההשקה 3+1 לעסק שלי'
)}`;

/* ─── Viral results — covers generated in ORCIAI style, view badge rendered in CSS ─── */
const VIRAL_RESULTS = [
  {
    views: '847K',
    title: 'טרנד היציע',
    image: '/products/cover-847k.png',
    link: 'https://www.instagram.com/p/DYPD4JRx3J2/',
  },
  {
    views: '297K',
    title: 'טרנד הפירות',
    image: '/products/cover-297k.png',
    link: 'https://www.instagram.com/p/DYIItEFKx8A/',
  },
  {
    views: '137K',
    title: 'הפינגווין הישראלי',
    image: '/products/cover-137k.png',
    link: 'https://www.instagram.com/p/DUS01xYilsL/',
  },
];

const STATS = [
  { value: 'x10', label: 'זול מהפקה רגילה' },
  { value: '100%', label: 'AI — בלי צלם ואולפן' },
  { value: '847K', label: 'צפיות בריל בודד' },
  { value: '72h', label: 'זמן אספקה' },
];

const TOOLS = ['VEO 3.1', 'KLING 3.0', 'HIGGSFIELD', 'NANO BANANA PRO', 'GPT IMAGE 2', 'SEEDANCE 2.0', 'ELEVENLABS', 'CLAUDE'];

const SERVICES = [
  {
    icon: Video,
    title: 'פרסומות AI',
    desc: 'פרסומת ברמה קולנועית לעסק שלכם — בלי צלם, בלי אולפן, בלי שחקנים. רק תוצאה שנראית כמו מיליון דולר.',
  },
  {
    icon: TrendingUp,
    title: 'תוכן סושיאל שוטף',
    desc: 'רילסים וטיקטוקים שבנויים על הנוסחאות שהביאו לי מאות אלפי צפיות — מותאמים למותג שלכם.',
  },
  {
    icon: PenTool,
    title: 'תסריטים ויראליים',
    desc: 'הוק שעוצר את הגלילה בשנייה הראשונה. כל סרטון נבנה סביב תסריט שנכתב להמרה, לא רק לצפיות.',
  },
  {
    icon: ImageIcon,
    title: 'קאברים וויז׳ואלים',
    desc: 'תמונות קאבר, באנרים וויז׳ואלים ממותגים בסגנון אחיד — כדי שהפיד שלכם ייראה כמו מותג, לא כמו עסק קטן.',
  },
];

const PACKAGE_INCLUDES = [
  'תסריט ויראלי מותאם לעסק',
  'הפקת AI מלאה ברמה קולנועית',
  'קאבר ממותג לכל סרטון',
  'התאמה מלאה לשפת המותג שלכם',
  'עד 2 סבבי תיקונים לכל סרטון',
  'אספקה תוך 72 שעות לסרטון',
];

const CLIENTS = [
  { name: 'Wave-Adv', logo: '/products/logo-wave-adv.png' },
  { name: 'Pinookim Sweet', logo: '/products/logo-pinookim.jpg' },
];

const FAQ = [
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
    a: 'עסקים קטנים-בינוניים שרוצים תוכן ברמה של מותגים גדולים בלי תקציב של מותגים גדולים — מסעדות, קליניקות, איקומרס, נותני שירות ועוד.',
  },
  {
    q: 'מה אם הסרטון לא מוצא חן בעיניי?',
    a: 'כל סרטון כולל עד 2 סבבי תיקונים. התסריט מאושר על ידכם לפני ההפקה, כך שאין הפתעות בדרך.',
  },
];

/* ─── Section micro-label — mono number + tracked Hebrew label (hd-media editorial pattern) ─── */
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: MINT }}>
        {num} /
      </span>
      <span className="text-[11px] font-bold tracking-[0.35em]" style={{ color: INK_MUTE }}>
        {label}
      </span>
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
        setErrorMsg(data?.error || 'משהו השתבש, נסו שוב');
      }
    } catch {
      setStatus('error');
      setErrorMsg('שגיאת רשת, נסו שוב');
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
          style={{ background: 'rgba(0,255,209,0.12)', border: `2px solid ${MINT}` }}
        >
          <Check className="w-8 h-8" style={{ color: MINT }} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">הפרטים נשלחו!</h3>
        <p style={{ color: INK_DIM }}>אחזור אליכם תוך 24 שעות עם הצעה מותאמת</p>
      </motion.div>
    );
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${LINE_STRONG}`,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="שם מלא *"
          required
          className="w-full px-5 py-3.5 rounded-full text-sm text-white placeholder:text-white/35 outline-none focus:border-[#00FFD1] transition-colors"
          style={inputStyle}
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="טלפון *"
          required
          className="w-full px-5 py-3.5 rounded-full text-sm text-white placeholder:text-white/35 outline-none focus:border-[#00FFD1] transition-colors"
          style={inputStyle}
        />
      </div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="אימייל *"
        required
        className="w-full px-5 py-3.5 rounded-full text-sm text-white placeholder:text-white/35 outline-none focus:border-[#00FFD1] transition-colors"
        style={inputStyle}
      />
      <input
        type="text"
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
        placeholder="תחום העסק (מסעדה, קליניקה, חנות אונליין...)"
        className="w-full px-5 py-3.5 rounded-full text-sm text-white placeholder:text-white/35 outline-none focus:border-[#00FFD1] transition-colors"
        style={inputStyle}
      />

      {errorMsg && <p className="text-red-400 text-xs text-center">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 rounded-full font-black text-base transition-all flex items-center justify-center gap-2 hover:opacity-90"
        style={{
          background: status === 'loading' ? 'rgba(0,255,209,0.4)' : MINT,
          color: BG,
          boxShadow: status === 'loading' ? 'none' : '0 0 30px rgba(0,255,209,0.3)',
        }}
      >
        <Send className="w-5 h-5" />
        {status === 'loading' ? 'שולח...' : 'שלחו לי הצעה מותאמת'}
      </button>

      <label className="flex items-start gap-2 cursor-pointer text-right">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded cursor-pointer flex-shrink-0"
          style={{ accentColor: MINT }}
        />
        <span className="text-xs leading-relaxed" style={{ color: INK_MUTE }}>
          על ידי שליחה, אני מאשר/ת את{' '}
          <Link href="/privacy" className="underline hover:opacity-80" style={{ color: MINT }}>
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
    <div style={{ borderBottom: `1px solid ${LINE}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-6 text-right"
      >
        <span className="font-bold text-white text-base md:text-lg">{q}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          style={{ color: MINT }}
        />
      </button>
      {open && (
        <p className="pb-6 leading-relaxed text-sm md:text-base" style={{ color: INK_DIM }}>
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
      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:opacity-90"
      style={
        outline
          ? { border: `1px solid ${LINE_STRONG}`, color: '#ffffff', background: 'rgba(255,255,255,0.03)' }
          : { background: MINT, color: BG, boxShadow: '0 0 30px rgba(0,255,209,0.3)' }
      }
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
    <div className="min-h-screen text-white" style={{ background: BG }}>
      {/* Marquee keyframes */}
      <style>{`
        @keyframes orci-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 md:pt-36 md:pb-28">
        <Particles className="absolute inset-0" quantity={120} color={MINT} ease={80} />
        {/* Purple glow orbs */}
        <div
          className="pointer-events-none absolute -top-32 right-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(83,74,183,0.35) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute top-40 left-1/4 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,255,209,0.1) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: MINT }}>
              ORCIAI
            </span>
            <span className="w-1 h-1 rounded-full" style={{ background: MINT }} />
            <span className="text-[11px] font-bold tracking-[0.35em]" style={{ color: INK_MUTE }}>
              תוכן AI לעסקים
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black mb-8"
            style={{ fontSize: 'clamp(42px, 8.5vw, 116px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            תוכן שעוצר
            <br />
            את הגלילה.
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${MINT} 30%, ${PURPLE})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              במחיר שלא עוצר אתכם.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ color: INK_DIM }}
          >
            פרסומות וסרטוני סושיאל מבוססי <span className="font-bold" style={{ color: MINT }}>AI</span> לעסק
            שלכם — מהיוצר שמאחורי <span className="font-bold" style={{ color: MINT }}>25 מיליון צפיות</span>.
            בלי צלם, בלי אולפן, בלי תקציבי ענק.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center px-9 py-4 rounded-full font-black text-base transition-all hover:opacity-90"
              style={{ background: MINT, color: BG, boxShadow: '0 0 30px rgba(0,255,209,0.3)' }}
            >
              אני רוצה תוכן כזה ←
            </a>
            <WhatsAppButton label="דברו איתי בוואטסאפ" outline />
          </motion.div>
        </div>
      </section>

      {/* ─── Tools marquee ─── */}
      <div
        className="overflow-hidden py-5"
        style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, direction: 'ltr' }}
      >
        <div
          className="flex w-max items-center gap-10"
          style={{ animation: 'orci-marquee 30s linear infinite' }}
        >
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-xs tracking-[0.25em] whitespace-nowrap" style={{ color: INK_MUTE }}>
              {tool}
              <span className="w-1 h-1 rounded-full inline-block" style={{ background: MINT }} />
            </span>
          ))}
        </div>
      </div>

      {/* ─── Stats strip — hairline grid, mono numbers ─── */}
      <section className="px-6 py-14 md:py-20">
        <motion.div
          {...fadeUp}
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center px-4 py-6">
              <div className="font-mono text-4xl md:text-5xl font-bold mb-2" style={{ color: MINT }}>
                {s.value}
              </div>
              <div className="text-xs md:text-sm" style={{ color: INK_MUTE }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── Viral results ─── */}
      <section className="px-6 py-20 md:py-28" style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <SectionLabel num="01" label="תוצאות" />
            <h2 className="font-black mb-5" style={{ fontSize: 'clamp(34px, 5vw, 64px)', lineHeight: 1.1 }}>
              התוצאות <span style={{ color: MINT }}>מדברות בעצמן</span>
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: INK_DIM }}>
              אלה לא הבטחות — אלה סרטונים אמיתיים שיצרתי עם AI. לחצו וראו בעצמכם.
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
                style={{ border: `1px solid ${LINE_STRONG}`, aspectRatio: '9/16' }}
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
                  style={{ background: 'linear-gradient(to top, rgba(13,13,26,0.95), transparent)' }}
                />
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                  style={{ boxShadow: `inset 0 0 60px rgba(0,255,209,0.15)`, border: `1px solid ${MINT}` }}
                />
                {/* Views badge */}
                <div className="absolute bottom-4 inset-x-0 flex flex-col items-center gap-1.5">
                  <div
                    className="flex items-center gap-2 px-5 py-1.5 rounded-full font-mono font-bold text-xl"
                    style={{ background: 'rgba(13,13,26,0.75)', border: `1px solid ${MINT}`, color: '#fff', backdropFilter: 'blur(8px)' }}
                  >
                    <Eye className="w-5 h-5" style={{ color: MINT }} />
                    {item.views}
                  </div>
                  <span className="text-xs" style={{ color: INK_DIM }}>{item.title}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Manifesto statement ─── */}
      <section className="px-6 py-20 md:py-28" style={{ borderTop: `1px solid ${LINE}` }}>
        <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
          <p
            className="font-black"
            style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', lineHeight: 1.25 }}
          >
            אני לא מפיק עוד תוכן.
            <br />
            <span style={{ color: MINT }}>אני מפיק תוכן שאנשים עוצרים בשבילו.</span>
          </p>
        </motion.div>
      </section>

      {/* ─── Services ─── */}
      <section className="px-6 py-20 md:py-28" style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <SectionLabel num="02" label="השירותים" />
            <h2 className="font-black" style={{ fontSize: 'clamp(34px, 5vw, 64px)', lineHeight: 1.1 }}>
              מה <span style={{ color: MINT }}>תקבלו</span>
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
                className="rounded-2xl p-8 transition-colors hover:border-[#00FFD1]/40"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${LINE}` }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,255,209,0.08)', border: '1px solid rgba(0,255,209,0.25)' }}
                  >
                    <s.icon className="w-5 h-5" style={{ color: MINT }} />
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.25em]" style={{ color: INK_MUTE }}>
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="leading-relaxed text-sm md:text-base" style={{ color: INK_DIM }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI vs traditional ─── */}
      <section className="px-6 py-20 md:py-28" style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <SectionLabel num="03" label="ההשוואה" />
            <h2 className="font-black" style={{ fontSize: 'clamp(34px, 5vw, 64px)', lineHeight: 1.1 }}>
              למה AI ולא <span style={{ color: '#8b80f0' }}>הפקה רגילה?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div
              {...fadeUp}
              className="rounded-2xl p-8 md:p-10"
              style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${LINE}` }}
            >
              <h3 className="text-lg font-bold mb-6" style={{ color: INK_MUTE }}>הפקה מסורתית</h3>
              <ul className="space-y-4" style={{ color: INK_DIM }}>
                <li className="flex gap-3"><span className="text-red-400/70">✗</span> ₪10,000+ לסרטון בודד</li>
                <li className="flex gap-3"><span className="text-red-400/70">✗</span> שבועות של תיאומים, צלמים ולוקיישנים</li>
                <li className="flex gap-3"><span className="text-red-400/70">✗</span> כל שינוי = יום צילום נוסף</li>
                <li className="flex gap-3"><span className="text-red-400/70">✗</span> מוגבל למה שאפשר לצלם במציאות</li>
              </ul>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
              style={{ background: 'rgba(0,255,209,0.04)', border: `1px solid rgba(0,255,209,0.45)`, boxShadow: '0 0 50px rgba(0,255,209,0.08)' }}
            >
              <h3 className="text-lg font-bold mb-6" style={{ color: MINT }}>הפקת AI עם ORCIAI</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex gap-3"><Check className="w-5 h-5 flex-shrink-0" style={{ color: MINT }} /> חלק קטן מהמחיר</li>
                <li className="flex gap-3"><Check className="w-5 h-5 flex-shrink-0" style={{ color: MINT }} /> סרטון מוכן תוך 72 שעות</li>
                <li className="flex gap-3"><Check className="w-5 h-5 flex-shrink-0" style={{ color: MINT }} /> תיקונים בקליק, בלי ימי צילום</li>
                <li className="flex gap-3"><Check className="w-5 h-5 flex-shrink-0" style={{ color: MINT }} /> כל רעיון אפשרי — גם מה שאי אפשר לצלם</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Clients ─── */}
      <section className="px-6 py-16 md:py-20" style={{ borderTop: `1px solid ${LINE}` }}>
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <SectionLabel num="04" label="לקוחות" />
          <div className="flex flex-wrap justify-center items-center gap-5 mt-2">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="rounded-2xl p-3 transition-transform hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${LINE}` }}
              >
                <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-white">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>
                <p className="mt-2 text-xs font-bold" style={{ color: INK_MUTE }}>{client.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Launch package ─── */}
      <section className="px-6 py-20 md:py-28 relative overflow-hidden" style={{ borderTop: `1px solid ${LINE}` }}>
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(83,74,183,0.22) 0%, transparent 70%)' }}
        />
        <motion.div {...fadeUp} className="relative max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <SectionLabel num="05" label="המבצע" />
          </div>
          <div
            className="rounded-3xl p-8 md:p-14 text-center"
            style={{
              background: 'linear-gradient(160deg, rgba(83,74,183,0.18) 0%, rgba(13,13,26,0.9) 60%)',
              border: `1px solid ${PURPLE}`,
              boxShadow: '0 0 80px rgba(83,74,183,0.25)',
            }}
          >
            <span
              className="inline-block px-5 py-1.5 rounded-full text-xs font-bold tracking-wider mb-8"
              style={{ background: 'rgba(0,255,209,0.1)', border: `1px solid ${MINT}`, color: MINT }}
            >
              🔥 מבצע השקה — מקומות מוגבלים
            </span>

            <h2 className="font-black mb-3" style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1 }}>
              חבילת ההשקה <span style={{ color: MINT }}>3+1</span>
            </h2>
            <p className="text-base md:text-lg mb-10" style={{ color: INK_DIM }}>
              3 סרטונים מותאמים לעסק שלכם + <span className="font-bold" style={{ color: MINT }}>סרטון רביעי מתנה</span>
            </p>

            <div className="flex items-baseline justify-center gap-4 mb-10" style={{ direction: 'ltr' }}>
              <span className="font-mono text-2xl md:text-3xl line-through" style={{ color: INK_MUTE }}>₪4,000</span>
              <span className="font-mono text-6xl md:text-7xl font-bold" style={{ color: MINT }}>₪2,250</span>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-right mb-12 max-w-lg mx-auto">
              {PACKAGE_INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm md:text-base text-white/85">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: MINT }} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-9 py-4 rounded-full font-black text-base transition-all hover:opacity-90"
                style={{ background: MINT, color: BG, boxShadow: '0 0 30px rgba(0,255,209,0.3)' }}
              >
                שריינו מקום במבצע ←
              </a>
              <WhatsAppButton label="שאלה? וואטסאפ" outline />
            </div>

            <p className="mt-8 text-xs flex items-center justify-center gap-1.5" style={{ color: INK_MUTE }}>
              <Clock className="w-3.5 h-3.5" />
              המחיר תקף לחבילות ההשקה הראשונות בלבד
            </p>
          </div>
        </motion.div>
      </section>

      {/* ─── Lead form + WhatsApp ─── */}
      <section id="lead-form" className="px-6 py-20 md:py-28" style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <SectionLabel num="06" label="יצירת קשר" />
            <h2 className="font-black mb-4" style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.1 }}>
              בואו <span style={{ color: MINT }}>נתחיל</span>
            </h2>
            <p style={{ color: INK_DIM }}>
              השאירו פרטים ואחזור אליכם תוך 24 שעות עם הצעה מותאמת לעסק שלכם
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="rounded-3xl p-7 md:p-10"
            style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${LINE_STRONG}` }}
          >
            <LeadForm />

            <div className="flex items-center gap-4 my-7">
              <div className="flex-1 h-px" style={{ background: LINE }} />
              <span className="text-xs" style={{ color: INK_MUTE }}>או</span>
              <div className="flex-1 h-px" style={{ background: LINE }} />
            </div>

            <div className="text-center">
              <WhatsAppButton label="דברו איתי ישר בוואטסאפ" outline />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="px-6 py-20 md:py-28" style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <SectionLabel num="07" label="שאלות" />
            <h2 className="font-black" style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.1 }}>
              שאלות <span style={{ color: MINT }}>נפוצות</span>
            </h2>
          </motion.div>
          <motion.div {...fadeUp} style={{ borderTop: `1px solid ${LINE}` }}>
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
