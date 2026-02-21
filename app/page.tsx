'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Youtube, ExternalLink, Mail } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import DailyPulse from '@/components/news/DailyPulse';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { BackgroundPathsEffect } from '@/components/ui/background-paths';
import OrbitingSkills from '@/components/ui/orbiting-skills';
import Newsletter from '@/components/ui/newsletter';
import TutorialGrid from '@/components/ui/tutorial-grid';
import { isContentUnlocked, UNLOCK_KEY } from '@/components/ui/email-gate-modal';

// ─── Floating Authority Badge ─────────────────────────────────────────────────

function FloatingBadge({
  children,
  delay,
  className,
  style,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`absolute hidden lg:flex items-center gap-3 px-4 py-3 rounded-2xl ${className ?? ''}`}
      style={{
        background: 'rgba(8,8,18,0.9)',
        border: '1px solid rgba(0,209,255,0.25)',
        boxShadow: '0 0 24px rgba(0,209,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const [email, setEmail] = useState('');
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
    if (!email.trim()) return;
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden neon-grid-hero"
      style={{ background: '#000000' }}
    >
      {/* Animated SVG paths layer */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <BackgroundPathsEffect />
      </div>

      {/* Radial purple+cyan glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(168,85,247,0.09) 0%, rgba(0,209,255,0.07) 45%, transparent 70%)',
        }}
      />

      {/* ── Floating Badges ── */}
      <FloatingBadge delay={0} className="top-[22%] right-[7%]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(255,0,0,0.15)', border: '1px solid rgba(255,80,80,0.3)' }}
        >
          <Youtube className="w-4 h-4 text-red-400" />
        </div>
        <div>
          <div className="text-sm font-bold text-white leading-none mb-0.5">130,000+</div>
          <div className="text-xs" style={{ color: '#7a9bc0' }}>מנויים ביוטיוב</div>
        </div>
      </FloatingBadge>

      <FloatingBadge delay={0.5} className="top-[22%] left-[7%]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
          style={{ background: 'rgba(0,209,255,0.1)', border: '1px solid rgba(0,209,255,0.25)' }}
        >
          👁️
        </div>
        <div>
          <div className="text-sm font-bold text-white leading-none mb-0.5">25,000,000</div>
          <div className="text-xs" style={{ color: '#7a9bc0' }}>צפיות סה&quot;כ</div>
        </div>
      </FloatingBadge>

      <FloatingBadge delay={1} className="bottom-[28%] right-[5%]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
          style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)' }}
        >
          🎯
        </div>
        <div>
          <div className="text-sm font-bold text-white leading-none mb-0.5">מומחה AI</div>
          <div className="text-xs" style={{ color: '#7a9bc0' }}>שיווק דיגיטלי</div>
        </div>
      </FloatingBadge>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-24">

        {/* Pre-headline chip */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7"
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full"
            style={{
              background: 'rgba(168,85,247,0.1)',
              border: '1px solid rgba(168,85,247,0.35)',
              color: '#c084fc',
            }}
          >
            ✦ מנוע ה-AI המוביל בישראל ✦
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-black leading-tight mb-5"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', color: '#ffffff' }}
        >
          שלטו ב-AI
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #00d1ff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            תוך דקות
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ color: '#7a9bc0' }}
        >
          מדריכים מעשיים, חדשות AI יומיות ושירותים מתקדמים —
          הכל במקום אחד. מבוסס על ניסיון אמיתי של 25 מיליון צפיות.
        </motion.p>

        {/* ── Rundown-style email CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="mb-8"
        >
          {unlocked || status === 'success' ? (
            <div
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
              style={{
                background: 'rgba(0,209,255,0.07)',
                border: '1px solid rgba(0,209,255,0.3)',
              }}
            >
              <CheckCircle className="w-5 h-5 text-orci-cyan flex-shrink-0" />
              <span className="font-semibold" style={{ color: '#e8f4ff' }}>
                גישה מלאה לכל המדריכים נפתחה!
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Mail
                  className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 pointer-events-none"
                  style={{ color: '#4a6a8a' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="האימייל שלכם..."
                  required
                  className="w-full pr-11 pl-4 py-4 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#e8f4ff',
                    direction: 'rtl',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(168,85,247,0.55)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm whitespace-nowrap transition-all"
                style={{
                  background:
                    status === 'loading'
                      ? 'rgba(168,85,247,0.35)'
                      : 'linear-gradient(135deg, #a855f7, #7c3aed)',
                  color: '#ffffff',
                  boxShadow:
                    status === 'loading' ? 'none' : '0 0 28px rgba(168,85,247,0.4)',
                }}
              >
                {status === 'loading' ? (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <ArrowLeft className="w-4 h-4" />
                    פתחו גישה חינם
                  </>
                )}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-2 text-red-400 text-xs text-center">משהו השתבש. נסו שוב.</p>
          )}

          <p className="mt-3 text-xs text-center" style={{ color: '#3a5a7a' }}>
            ללא ספאם · גישה מיידית לכל המדריכים · בחינם לגמרי
          </p>
        </motion.div>

        {/* Mobile badges row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex justify-center gap-2.5 flex-wrap lg:hidden"
        >
          {[
            { icon: <Youtube className="w-3.5 h-3.5 text-red-400" />, text: '130K+ מנויים' },
            { icon: <span className="text-sm">👁️</span>, text: '25M+ צפיות' },
            { icon: <span className="text-sm">🎯</span>, text: 'מומחה שיווק AI' },
          ].map((b, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(8,8,18,0.8)',
                border: '1px solid rgba(0,209,255,0.2)',
                color: '#7a9bc0',
              }}
            >
              {b.icon} {b.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── YouTube Section ──────────────────────────────────────────────────────────

const YT_VIDEOS = [
  {
    id: 'lxrvd_y8tPI',
    title: 'חפצים מדברים - הטרנד שכולם מחפשים',
    views: '85K צפיות',
    thumbnail: `https://img.youtube.com/vi/lxrvd_y8tPI/hqdefault.jpg`,
    url: 'https://www.youtube.com/shorts/lxrvd_y8tPI',
  },
  {
    id: 'channel-1',
    title: 'איך ליצור משפיענית AI שנראית אמיתית',
    views: '120K צפיות',
    thumbnail: '/guides/guide-ai-influencer.png',
    url: 'https://www.youtube.com/@oci',
  },
  {
    id: 'channel-2',
    title: 'טרנד הפינגווין - גרסה ישראלית ויראלית',
    views: '95K צפיות',
    thumbnail: '/guides/guide-penguin-viral.png',
    url: 'https://www.youtube.com/@oci',
  },
];

function YouTubeSection() {
  return (
    <section className="cap-section cap-section-alt neon-grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', color: '#ff4444' }}
          >
            <Youtube className="w-4 h-4" />
            הערוץ שלנו ביוטיוב
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#e8f4ff' }}>
            25 מיליון צפיות.
            <br />
            <span style={{ color: '#00d1ff' }}>הסוד? AI + יצירתיות.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#7a9bc0' }}>
            כל הסרטונים שהפכו ויראלים — עם ההסבר המלא על איך עשינו את זה
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {YT_VIDEOS.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl overflow-hidden block transition-all duration-300 hover:-translate-y-1"
              style={{ border: '1px solid rgba(0,209,255,0.12)' }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized={video.thumbnail.startsWith('http')}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(0,0,0,0.5)' }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,0,0,0.85)', boxShadow: '0 0 25px rgba(255,0,0,0.4)' }}
                  >
                    <svg className="w-6 h-6 text-white mr-[-2px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <Youtube className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <div className="p-4" style={{ background: 'rgba(10,10,26,0.97)' }}>
                <h3
                  className="font-bold text-sm mb-1 group-hover:text-orci-cyan transition-colors line-clamp-2"
                  style={{ color: '#e8f4ff' }}
                >
                  {video.title}
                </h3>
                <p className="text-xs" style={{ color: '#4a6a8a' }}>{video.views}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.youtube.com/@oci"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all"
            style={{
              background: 'rgba(255,0,0,0.1)',
              border: '1.5px solid rgba(255,80,80,0.35)',
              color: '#ff6666',
            }}
          >
            <Youtube className="w-4 h-4" />
            עברו לערוץ ← הירשמו להתראות
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>

      {/* 1. HERO — black + grid + animated paths + floating badges + email CTA */}
      <HeroSection />

      {/* 2. TUTORIAL ENGINE */}
      <section className="cap-section cap-section-white neon-grid-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
              style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.35)', color: '#c084fc' }}
            >
              ✦ מנוע המדריכים
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3" style={{ color: '#e8f4ff' }}>
              כל המדריכים שלנו
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#7a9bc0' }}>
              2 מדריכים ראשונים חינם. שאר? פשוט תשאירו אימייל ואנחנו נפתח הכל.
            </p>
          </div>
          <TutorialGrid />
        </div>
      </section>

      {/* 3. AI NEWS */}
      <DailyPulse />

      {/* 4. YOUTUBE */}
      <YouTubeSection />

      {/* 5. SCROLL SHOWCASE */}
      <section className="cap-section cap-section-teal overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: '#e8f4ff' }}>
                בעל ערוץ יוטיוב שהגיע ל-
              </h2>
              <span className="text-4xl md:text-[5rem] font-bold text-orci-cyan leading-none">
                25 מיליון צפיות
              </span>
              <p className="text-3xl md:text-[4rem] font-bold text-orci-cyan mt-4">
                ו-130,000 רשומים
              </p>
              <p className="text-xl md:text-2xl mt-6" style={{ color: '#7a9bc0' }}>
                וגם אתם יכולים להגיע להישגים כאלה עם AI
              </p>
            </>
          }
        >
          <Image
            src="/Chanel.png"
            alt="ערוץ היוטיוב של Orci - 25M צפיות ו-130K רשומים"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center"
            draggable={false}
            priority
          />
        </ContainerScroll>
      </section>

      {/* 6. SERVICES */}
      <section className="cap-section cap-section-white relative neon-grid-bg">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="cap-section-title text-center mb-4" style={{ color: '#e8f4ff' }}>
            מה אנחנו מציעים
          </h2>
          <p className="text-center mb-8 hidden sm:block" style={{ color: '#7a9bc0' }}>
            העבירו את העכבר כדי לעצור, רחפו על אייקון לפרטים
          </p>
          <OrbitingSkills />
          <div className="text-center mt-8">
            <Link href="/products" className="cap-btn cap-btn-primary">
              גלו עוד
            </Link>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-2xl mx-auto px-6">
          <Newsletter />
        </div>
      </section>

      <Footer />
    </div>
  );
}
