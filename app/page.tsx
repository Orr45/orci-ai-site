'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Eye, Plus, Play, Check, Mail } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import TutorialGrid from '@/components/ui/tutorial-grid';
import { isContentUnlocked, UNLOCK_KEY } from '@/components/ui/email-gate-modal';
import { LearningModeModal } from '@/components/ui/learning-mode-modal';
import { GUIDES } from '@/data/guides';
import s from './home.module.css';

const WHATSAPP_URL = `https://wa.me/972542599107?text=${encodeURIComponent(
  'היי אור! הגעתי מהאתר ואשמח לשמוע איך AI יכול לקדם את העסק שלי'
)}`;

/* Client logos shown on the business door (same files as /products) */
const CLIENT_LOGOS = [
  { name: 'LAGO', logo: '/products/logos/lago.png', bg: '#fefbef' },
  { name: 'TROYA', logo: '/products/logos/troya.png', bg: '#000000' },
  { name: 'ELA-YAM', logo: '/products/logos/ela-yam.png', bg: '#0e1525' },
  { name: 'BARDA', logo: '/products/logos/barda.png', bg: '#ffffff' },
];

/* Recent reels with their real view counts */
const REELS = [
  { views: '921K', title: 'טרנד היציע', image: '/products/cover-847k.png', link: 'https://www.instagram.com/reel/DYPD4JRx3J2/' },
  { views: '350K', title: 'פרסומת לפינוקים', image: '/products/cover-297k.png', link: 'https://www.instagram.com/reel/DYIItEFKx8A/' },
  { views: '140K', title: 'סרטון הסברה על ישראל', image: '/products/cover-137k.png', link: 'https://www.instagram.com/reel/DUS01xYilsL/' },
];

const HOME_FAQ = [
  {
    q: 'זה לא ייראה כמו עוד סרטון AI?',
    a: 'אני לא לוחץ על כפתור ומקבל סרטון. אני כותב תסריט, בוחר סגנון ומלטש כל פריים — הסרטונים בעמוד הזה הגיעו ליותר מ-1.4 מיליון צפיות.',
  },
  {
    q: 'כמה עולה פרסומת לעסק?',
    a: 'חבילת ההשקה: 3 סרטונים + רביעי מתנה ב-2,250 ₪. כל הפרטים בעמוד העסקים.',
  },
  {
    q: 'אפשר ללמוד לעשות את זה לבד?',
    a: 'בשביל זה יש כאן מדריכים בעברית — צעד אחר צעד, עם הפרומפטים המלאים.',
  },
  {
    q: 'המדריכים באמת בחינם?',
    a: 'כן. חלק פתוחים לגמרי, ואת השאר פותחים עם השארת אימייל.',
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
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

// ─── Hero: Lando portrait over a topo map, Mat Voyce name across the chest ───

function HeroSection() {
  return (
    <section className={s.hero}>
      <div className={`${s.topo} lv-topo`} aria-hidden="true" />
      <h1 className="sr-only">אור שמר — Orci AI. הפרסומת שאתם חולמים עליה, עם AI.</h1>

      <div className={`${s.wrap} ${s.meta}`}>
        <span>אור שמר · Orci AI</span>
        <span>פרסומות לעסקים · מדריכי AI</span>
      </div>

      <div className={s.stage}>
        <span className={`${s.name} lv-display`} aria-hidden="true">
          ORCI
        </span>
        <Image src="/products/or-cutout.webp" alt="אור שמר" width={1086} height={1284} priority className={s.portrait} />
        <Sticker className={`${s.st} ${s.st1} lv-sticker lv-sticker-lime`} delay={0.35}>
          130K רשומים · 25M צפיות
        </Sticker>
        <Sticker className={`${s.st} ${s.st2} lv-sticker`} delay={0.5}>
          1.4M+ צפיות בסרטוני AI
        </Sticker>
        <Sticker className={`${s.st} ${s.st3}`} delay={0.65}>
          {CLIENT_LOGOS.slice(0, 2).map((c) => (
            <span
              key={c.name}
              className="block w-[76px] h-[76px] rounded-full overflow-hidden"
              style={{ background: c.bg, border: '2px solid var(--olive)', boxShadow: '4px 4px 0 var(--olive)' }}
            >
              <Image src={c.logo} alt={c.name} width={152} height={152} className="w-full h-full object-contain" />
            </span>
          ))}
        </Sticker>
      </div>

      <div className={s.heroBar}>
        <div className={`${s.wrap} ${s.heroBarInner}`}>
          <p className={`${s.heroTitle} lv-display`} aria-hidden="true">
            הפרסומת שאתם חולמים עליה.
            <br />
            עם <span className="lv-accent">AI</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Two doors (Lando "on track / off track"): business ↔ learning ───

function DoorsSection() {
  return (
    <section aria-label="מה יש כאן" style={{ background: 'var(--bg)' }}>
      <div className={`${s.wrap} ${s.doors}`}>
        <Link href="/products" className={`${s.door} ${s.doorBiz}`}>
          <span className={s.doorLabel}>לעסקים</span>
          <h2 className={`${s.doorTitle} lv-display`}>פרסומות</h2>
          <p className={s.doorText}>פרסומות ותוכן שנראים כמו הפקה גדולה — בלי יום צילום.</p>
          <div className={s.doorFoot}>
            <span className={s.logos} aria-label="LAGO, TROYA, ELA-YAM, BARDA">
              {CLIENT_LOGOS.map((c) => (
                <span key={c.name} style={{ background: c.bg }}>
                  <Image src={c.logo} alt="" width={80} height={80} />
                </span>
              ))}
            </span>
            <span className={s.doorGo}>
              לעבודות ולמחיר <ArrowLeft className="w-5 h-5" />
            </span>
          </div>
        </Link>

        <Link href="/guides" className={`${s.door} ${s.doorLearn}`}>
          <span className={s.doorLabel}>ללומדים</span>
          <h2 className={`${s.doorTitle} lv-display`}>מדריכים</h2>
          <p className={s.doorText}>יצירת תוכן AI בעברית — צעד אחר צעד, עם הפרומפטים המלאים.</p>
          <div className={s.doorFoot}>
            <span className={s.count}>{GUIDES.length} מדריכים</span>
            <span className={s.doorGo}>
              להתחיל ללמוד <ArrowLeft className="w-5 h-5" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

// ─── Results: reels with their real view counts (dark zone) ───

function ResultsSection() {
  return (
    <section data-theme="dark" className={s.results}>
      <div className={s.wrap}>
        <div className={s.resultsHead}>
          <h2 className={`${s.sectionWord} lv-display`}>תוצאות</h2>
          <p className={s.lead}>סרטונים שיצרתי עם AI — עם הצפיות האמיתיות שלהם.</p>
        </div>
        <ul className={s.reelGrid}>
          {REELS.map((r) => (
            <li key={r.views}>
              <a href={r.link} target="_blank" rel="noopener noreferrer" className={s.reel} aria-label={`${r.title} — ${r.views} צפיות באינסטגרם`}>
                <Image src={r.image} alt="" fill sizes="(min-width: 768px) 320px, 33vw" />
                <span className={s.reelShade} />
                <span className={`${s.reelViews} lv-sticker lv-sticker-lime`}>
                  <Eye className="w-4 h-4" />
                  {r.views}
                </span>
                <span className={s.reelTitle}>{r.title}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className={s.resultsCta}>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cap-btn cap-btn-whatsapp">
            <WhatsAppIcon className="w-5 h-5" />
            אני רוצה כזה לעסק שלי
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Guides ───

function GuidesSection() {
  return (
    <section id="content-tabs" className={s.guides}>
      <div className={s.wrap}>
        <div className={s.guidesHead}>
          <h2 className={`${s.sectionWord} lv-display`}>מדריכים</h2>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-learning-mode'))}
            className="cap-btn cap-btn-primary"
          >
            <Play className="w-4 h-4" fill="currentColor" />
            מצב למידה
          </button>
        </div>
        <TutorialGrid />
      </div>
    </section>
  );
}

// ─── Unlock all guides (lime band) ───

function UnlockSection() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    // localStorage is client-only: read it after mount so server and client render the same first frame
    const first = setTimeout(() => setUnlocked(isContentUnlocked()), 0);
    const handler = () => setUnlocked(true);
    window.addEventListener('orci-unlocked', handler);
    return () => {
      clearTimeout(first);
      window.removeEventListener('orci-unlocked', handler);
    };
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
    <section className={s.unlock} aria-labelledby="unlock-title">
      <div className={`${s.wrap} ${s.unlockInner}`}>
        <div className="grid gap-3">
          <h2 id="unlock-title" className={`${s.unlockTitle} lv-display`}>
            כל המדריכים. בחינם.
          </h2>
          <p className={s.unlockText}>השאירו אימייל — וכל המדריכים נפתחים מיד.</p>
        </div>

        {unlocked || status === 'success' ? (
          <p className={s.done}>
            <Check className="w-6 h-6" /> כל המדריכים פתוחים בשבילך
          </p>
        ) : (
          <form onSubmit={handleSubmit} className={s.unlockForm}>
            <input
              id="unlock-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="האימייל שלך"
              aria-label="כתובת אימייל"
              required
              className={s.field}
            />
            <button type="submit" disabled={status === 'loading'} className="cap-btn cap-btn-dark" style={{ opacity: status === 'loading' ? 0.6 : 1 }}>
              <Mail className="w-4 h-4" />
              {status === 'loading' ? 'פותח...' : 'פתחו לי גישה'}
            </button>
            <label className={s.consent}>
              <input
                id="unlock-consent"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                aria-label="אישור מדיניות הפרטיות"
                className="mt-0.5 w-4 h-4 flex-shrink-0"
              />
              <span>
                מאשר/ת את <Link href="/privacy">מדיניות הפרטיות</Link> ומסכים/ה לקבל עדכונים
              </span>
            </label>
            {status === 'error' && <p className="text-sm font-bold">משהו השתבש. נסו שוב.</p>}
          </form>
        )}
      </div>
    </section>
  );
}

// ─── FAQ ───

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

function FaqSection() {
  return (
    <section className={s.faq}>
      <div className={s.wrap}>
        <h2 className={`${s.sectionWord} lv-display`}>שאלות</h2>
        <div className={s.faqList}>
          {HOME_FAQ.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ───

export default function Home() {
  const [isLearningModeOpen, setIsLearningModeOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsLearningModeOpen(true);
    window.addEventListener('open-learning-mode', handler);
    return () => window.removeEventListener('open-learning-mode', handler);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <HeroSection />
      <DoorsSection />
      <ResultsSection />
      <GuidesSection />
      <UnlockSection />
      <FaqSection />
      <Footer />

      <LearningModeModal isOpen={isLearningModeOpen} onClose={() => setIsLearningModeOpen(false)} />
    </div>
  );
}
