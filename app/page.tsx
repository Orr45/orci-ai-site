'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle,
  Mail,
  Play,
  Eye,
  MessageSquareText,
  FileText,
  Clapperboard,
  Send,
  ChevronDown,
  Quote,
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import Newsletter from '@/components/ui/newsletter';
import TutorialGrid from '@/components/ui/tutorial-grid';
import { isContentUnlocked, UNLOCK_KEY } from '@/components/ui/email-gate-modal';
import { LearningModeModal } from '@/components/ui/learning-mode-modal';
import { TESTIMONIALS } from '@/data/testimonials';

const WHATSAPP_URL = `https://wa.me/972542599107?text=${encodeURIComponent(
  'היי אור! הגעתי מהאתר ואשמח לשמוע איך AI יכול לקדם את העסק שלי'
)}`;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55 },
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// ─── Hero — personal, business-first ─────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-14 pb-14 md:pt-20 md:pb-20" style={{ background: 'var(--bg)' }}>
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] items-center gap-10 lg:gap-16">

          {/* Text column */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm font-semibold mb-8"
              style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent-line)' }}
            >
              אור שמר · שיווק ויצירת תוכן עם AI
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="cap-hero-title mb-7"
            >
              הפרסומת שאתה חולם עליה
              <br />
              <span style={{ color: 'var(--accent)' }}>אני הופך אותה למציאות. עם AI.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10"
              style={{ color: 'var(--text-secondary)' }}
            >
              אני יוצר לעסקים פרסומות וסרטוני סושיאל ברמה קולנועית — כמעט ללא תקציב הפקה.
              בלי צלם, בלי אולפן, ובלי שזה ייראה &quot;עוד סרטון AI&quot;.
              ואם אתה רוצה ללמוד לעשות את זה בעצמך — המדריכים שלי פתוחים בחינם.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cap-btn cap-btn-whatsapp text-base"
                style={{ padding: '1rem 2.4rem' }}
              >
                <WhatsAppIcon className="w-5 h-5" />
                דבר איתי על העסק שלך
              </a>
              <Link
                href="/guides"
                className="cap-btn cap-btn-outline text-base"
                style={{ padding: '1rem 2.4rem' }}
              >
                למדריכים החינמיים
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              <span><b style={{ color: 'var(--text-primary)' }}>1.4M+</b> צפיות בסרטוני AI שיצרתי</span>
              <span className="hidden sm:inline" style={{ color: 'var(--border-strong)' }}>|</span>
              <span><b style={{ color: 'var(--text-primary)' }}>72 שעות</b> מאישור תסריט לסרטון מוכן</span>
              <span className="hidden sm:inline" style={{ color: 'var(--border-strong)' }}>|</span>
              <span><b style={{ color: 'var(--text-primary)' }}>130K</b> מנויים בערוץ היוטיוב שבניתי</span>
            </motion.div>
          </div>

          {/* Portrait column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-56 sm:w-64 lg:w-full max-w-sm">
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{ border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card-hover)', aspectRatio: '3/4' }}
              >
                <Image
                  src="/or-casual.jpg"
                  alt="אור שמר"
                  fill
                  sizes="(max-width: 1024px) 256px, 384px"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating fact chip */}
              <div
                className="absolute -bottom-4 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-auto lg:-left-6 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap"
                style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card-hover)', color: 'var(--text-primary)' }}
              >
                <Eye className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                1.4M+ צפיות בסרטוני AI
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Results — recent viral AI work ──────────────────────────────────────────

const VIRAL_RESULTS = [
  {
    views: '921K',
    title: 'טרנד היציע',
    desc: 'סרטון AI ויראלי שהגיע לכמעט מיליון צפיות',
    image: '/products/cover-847k.png',
    link: 'https://www.instagram.com/reel/DYPD4JRx3J2/',
  },
  {
    views: '350K',
    title: 'פרסומת לחנות ממתקים',
    desc: 'פרסומת AI לעסק אמיתי — Pinookim Sweet',
    image: '/products/cover-297k.png',
    link: 'https://www.instagram.com/reel/DYIItEFKx8A/',
  },
  {
    views: '140K',
    title: 'סרטון הסברה על ישראל',
    desc: 'תוכן AI עם מסר — שעבד',
    image: '/products/cover-137k.png',
    link: 'https://www.instagram.com/reel/DUS01xYilsL/',
  },
];

function ResultsSection() {
  return (
    <section id="results" className="cap-section" style={{ background: 'var(--surface-alt)' }}>
      <div className="max-w-6xl mx-auto px-2 md:px-6">
        <motion.div {...fadeUp} className="text-center mb-12">
          <div className="orci-kicker">
            <span className="orci-kicker-label">תוצאות אמיתיות</span>
          </div>
          <h2 className="cap-section-title mb-4">
            לא הבטחות. סרטונים שרצים עכשיו ברשת.
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            כל סרטון כאן נוצר על ידי עם AI מהתקופה האחרונה — לחץ וצפה בעצמך באינסטגרם.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {VIRAL_RESULTS.map((item, i) => (
            <motion.a
              key={item.views}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
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
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(10,16,28,0.92), transparent)' }}
              />
              <div className="absolute bottom-4 inset-x-3 flex flex-col items-center gap-1.5 text-center">
                <div
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-lg text-white"
                  style={{ background: 'rgba(10,16,28,0.65)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}
                >
                  <Eye className="w-4 h-4" />
                  {item.views} צפיות
                </div>
                <span className="text-sm font-semibold text-white">{item.title}</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>{item.desc}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div {...fadeUp} className="text-center mt-10">
          <Link href="/products" className="cap-btn cap-btn-primary">
            אני רוצה סרטונים כאלה לעסק שלי
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── How it works ────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    icon: MessageSquareText,
    title: 'שיחת אפיון קצרה',
    desc: '20 דקות בוואטסאפ או בטלפון. אתה מספר על העסק, אני מבין מה יעבוד לקהל שלך.',
  },
  {
    icon: FileText,
    title: 'תסריט לאישור שלך',
    desc: 'אני כותב תסריט שבנוי להמרה — ואתה מאשר אותו לפני שמתחילים. בלי הפתעות.',
  },
  {
    icon: Clapperboard,
    title: 'הפקת AI מלאה',
    desc: 'מהתסריט לסרטון ברמה קולנועית — עם הכלים המתקדמים בעולם, ועין של יוצר תוכן.',
  },
  {
    icon: Send,
    title: 'אספקה תוך 72 שעות',
    desc: 'סרטון מוכן לפרסום, כולל עד 2 סבבי תיקונים — עד שאתה מרוצה.',
  },
];

function ProcessSection() {
  return (
    <section className="cap-section" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-2 md:px-6">
        <motion.div {...fadeUp} className="text-center mb-12">
          <div className="orci-kicker">
            <span className="orci-kicker-label">איך זה עובד</span>
          </div>
          <h2 className="cap-section-title mb-4">
            מרעיון לפרסומת — בארבעה שלבים
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            אתה כמעט לא צריך להביא כלום. שיחה קצרה, לוגו, וכמה תמונות של העסק — את כל השאר אני עושה.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="cap-card relative"
              style={{ padding: '1.75rem' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}
                >
                  <step.icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                </div>
                <span
                  className="text-2xl font-black font-display"
                  style={{ color: 'var(--border-strong)' }}
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="text-center mt-10">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cap-btn cap-btn-whatsapp">
            <WhatsAppIcon className="w-4 h-4" />
            בוא נתחיל בשיחת אפיון
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials — hidden until real quotes exist ───────────────────────────

function TestimonialsSection() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <section className="cap-section" style={{ background: 'var(--surface-alt)' }}>
      <div className="max-w-5xl mx-auto px-2 md:px-6">
        <motion.div {...fadeUp} className="text-center mb-12">
          <div className="orci-kicker">
            <span className="orci-kicker-label">לקוחות מספרים</span>
          </div>
          <h2 className="cap-section-title mb-4">מה אומרים אלה שכבר עבדו איתי</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="cap-card flex flex-col"
              style={{ padding: '1.75rem' }}
            >
              <Quote className="w-6 h-6 mb-4" style={{ color: 'var(--accent)' }} />
              <blockquote className="text-base leading-relaxed flex-1 mb-4" style={{ color: 'var(--text-secondary)' }}>
                {t.quote}
              </blockquote>
              <figcaption>
                <div className="font-bold text-sm">{t.name}</div>
                {t.role && <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.role}</div>}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Guides ──────────────────────────────────────────────────────────────────

function GuidesSection() {
  return (
    <section id="content-tabs" className="cap-section" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-2 md:px-6">
        <div className="text-center mb-10">
          <div className="orci-kicker">
            <span className="orci-kicker-label">ללמוד בעצמך — בחינם</span>
          </div>
          <h2 className="cap-section-title mb-3">
            המדריכים שלי
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            כל מה שאני יודע על יצירת תוכן ויראלי עם AI — כתוב פשוט, צעד אחר צעד.
            שני מדריכים פתוחים לגמרי; את השאר תפתח עם השארת אימייל.
          </p>
          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent('open-learning-mode'))}
            className="cap-btn cap-btn-primary mt-6 mx-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Play className="w-4 h-4" />
            מצב למידה — צפייה בסגנון נטפליקס
          </motion.button>
        </div>
        <TutorialGrid />
      </div>
    </section>
  );
}

// ─── Email Section ───────────────────────────────────────────────────────────

function EmailSection() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(isContentUnlocked());
    const handler = () => setUnlocked(true);
    window.addEventListener('orci-unlocked', handler);
    return () => window.removeEventListener('orci-unlocked', handler);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !agreed) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok || res.status === 400) {
        localStorage.setItem(UNLOCK_KEY, 'true');
        window.dispatchEvent(new Event('orci-unlocked'));
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      className="py-16 px-6"
      style={{ background: 'var(--surface-alt)', borderTop: '1px solid var(--border-subtle)' }}
    >
      <div className="max-w-lg mx-auto text-center">
        <motion.div {...fadeUp}>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5"
            style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)', color: 'var(--accent)' }}
          >
            <Mail className="w-3.5 h-3.5" />
            גישה חינמית לכל התוכן
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            רוצה לפתוח את כל המדריכים?
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            השאר אימייל — וכל המדריכים נפתחים מיד. בלי ספאם, בחינם.
          </p>

          {unlocked || status === 'success' ? (
            <div
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
              style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
              <span className="font-semibold">גישה מלאה לכל המדריכים נפתחה!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail
                  className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 pointer-events-none"
                  style={{ color: 'var(--text-muted)' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="האימייל שלך..."
                  required
                  className="w-full pr-11 pl-4 py-4 rounded-full text-sm outline-none transition-all"
                  style={{
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border-strong)',
                    color: 'var(--text-primary)',
                    direction: 'rtl',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="cap-btn cap-btn-primary text-sm"
                style={{ padding: '1rem 1.8rem', opacity: status === 'loading' ? 0.6 : 1 }}
              >
                {status === 'loading' ? (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <ArrowLeft className="w-4 h-4" />
                    פתח גישה חינם
                  </>
                )}
              </button>
            </form>
          )}

          <label className="mt-4 flex items-start gap-2 cursor-pointer justify-center text-right">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded cursor-pointer flex-shrink-0"
              style={{ accentColor: 'var(--accent)' }}
            />
            <span className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              על ידי הרשמה, אני מאשר/ת את{' '}
              <Link href="/privacy" className="underline hover:opacity-80" style={{ color: 'var(--accent)' }}>מדיניות הפרטיות</Link>
              {' '}ומסכים/ה לקבל עדכונים
            </span>
          </label>

          {status === 'error' && (
            <p className="mt-2 text-red-500 text-xs text-center">משהו השתבש. נסה שוב.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const HOME_FAQ = [
  {
    q: 'פרסומות AI לא נראות מזויפות או זולות?',
    a: 'זה בדיוק ההבדל בין "עוד סרטון AI" לבין עבודה של יוצר תוכן. אני לא לוחץ על כפתור ומקבל סרטון — אני כותב תסריט, בוחר סגנון, ומלטש כל פריים עד שהתוצאה נראית כמו הפקה אמיתית. הסרטונים בעמוד הזה הגיעו יחד ליותר מ-1.4 מיליון צפיות — הקהל לא עוצר על תוכן שנראה זול.',
  },
  {
    q: 'כמה זה עולה?',
    a: 'חבילת ההשקה: 3 סרטונים מותאמים לעסק שלך + סרטון רביעי מתנה — ב-2,250 ש"ח. לשם השוואה, הפקה מסורתית של סרטון בודד מתחילה בדרך כלל ב-10,000 ש"ח ומעלה.',
  },
  {
    q: 'מה אני צריך להביא מהצד שלי?',
    a: 'כמעט כלום: שיחת אפיון של 20 דקות, לוגו, וכמה תמונות של המוצר או העסק. את כל השאר אני עושה.',
  },
  {
    q: 'תוך כמה זמן אני מקבל את הסרטון?',
    a: 'כל סרטון נמסר תוך 72 שעות מרגע אישור התסריט, כולל עד 2 סבבי תיקונים.',
  },
  {
    q: 'אני מעדיף ללמוד לעשות את זה בעצמי — אפשר?',
    a: 'בשמחה. בדיוק בשביל זה יש כאן מדריכים חינמיים בעברית שמסבירים צעד אחר צעד איך אני יוצר את הסרטונים — כולל הפרומפטים המלאים.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-right"
      >
        <span className="font-bold text-base md:text-lg" style={{ color: 'var(--text-primary)' }}>{q}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--accent)' }}
        />
      </button>
      {open && (
        <p className="pb-5 leading-relaxed text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
          {a}
        </p>
      )}
    </div>
  );
}

function FaqSection() {
  return (
    <section className="cap-section" style={{ background: 'var(--bg)' }}>
      <div className="max-w-2xl mx-auto px-2 md:px-6">
        <motion.div {...fadeUp} className="text-center mb-10">
          <div className="orci-kicker">
            <span className="orci-kicker-label">שאלות נפוצות</span>
          </div>
          <h2 className="cap-section-title mb-3">מה שכולם שואלים אותי</h2>
        </motion.div>
        <motion.div {...fadeUp} style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {HOME_FAQ.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────

export default function Home() {
  const [isLearningModeOpen, setIsLearningModeOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsLearningModeOpen(true);
    window.addEventListener('open-learning-mode', handler);
    return () => window.removeEventListener('open-learning-mode', handler);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* 1. HERO — business-first, personal */}
      <HeroSection />

      {/* 2. RECENT VIRAL RESULTS */}
      <ResultsSection />

      {/* 3. HOW IT WORKS */}
      <ProcessSection />

      {/* 4. TESTIMONIALS (auto-hidden until real quotes are added) */}
      <TestimonialsSection />

      {/* 5. GUIDES */}
      <GuidesSection />

      {/* 6. EMAIL GATE */}
      <EmailSection />

      {/* 7. FAQ */}
      <FaqSection />

      {/* 8. NEWSLETTER */}
      <section className="cap-section" style={{ background: 'var(--surface-alt)' }}>
        <div className="max-w-2xl mx-auto px-6">
          <Newsletter />
        </div>
      </section>

      <Footer />

      {/* Learning Mode Modal */}
      <LearningModeModal
        isOpen={isLearningModeOpen}
        onClose={() => setIsLearningModeOpen(false)}
      />
    </div>
  );
}
