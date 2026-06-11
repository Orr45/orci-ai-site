'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Mail, Play } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { BackgroundPathsEffect } from '@/components/ui/background-paths';
import OrbitingSkills from '@/components/ui/orbiting-skills';
import Newsletter from '@/components/ui/newsletter';
import TutorialGrid from '@/components/ui/tutorial-grid';
import { isContentUnlocked, UNLOCK_KEY } from '@/components/ui/email-gate-modal';
import { LearningModeModal } from '@/components/ui/learning-mode-modal';
import OnboardingModal from '@/components/ui/onboarding-modal';

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
        border: '1px solid rgba(0,255,209,0.25)',
        boxShadow: '0 0 24px rgba(0,255,209,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
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
  return (
    <section
      className="relative flex items-start overflow-hidden neon-grid-hero pt-6 pb-14 md:pt-10 md:pb-20"
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
            'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(83,74,183,0.09) 0%, rgba(0,255,209,0.07) 45%, transparent 70%)',
        }}
      />

      {/* ── Floating Badges ── */}
      <FloatingBadge delay={0} className="top-[22%] right-[7%]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(255,0,0,0.15)', border: '1px solid rgba(255,80,80,0.3)' }}
        >
          <span className="text-red-400 text-base font-bold">▶</span>
        </div>
        <div>
          <div className="text-sm font-bold text-white leading-none mb-0.5">130,000+</div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>מנויים ביוטיוב</div>
        </div>
      </FloatingBadge>

      <FloatingBadge delay={0.5} className="top-[22%] left-[7%]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
          style={{ background: 'rgba(0,255,209,0.1)', border: '1px solid rgba(0,255,209,0.25)' }}
        >
          👁️
        </div>
        <div>
          <div className="text-sm font-bold text-white leading-none mb-0.5">25,000,000</div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>צפיות סה&quot;כ</div>
        </div>
      </FloatingBadge>

      <FloatingBadge delay={1} className="bottom-[28%] right-[5%]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
          style={{ background: 'rgba(83,74,183,0.12)', border: '1px solid rgba(83,74,183,0.3)' }}
        >
          🎯
        </div>
        <div>
          <div className="text-sm font-bold text-white leading-none mb-0.5">מומחה AI</div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>שיווק דיגיטלי</div>
        </div>
      </FloatingBadge>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 pt-4 pb-0 w-full">

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-black mb-12 mt-8"
          style={{ fontSize: 'clamp(3rem, 8.5vw, 7rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#ffffff' }}
        >
          שלטו ב-AI
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #00FFD1 0%, #534AB7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            תוך דקות
          </span>
        </motion.h1>

        {/* ── Big CTA button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="mb-8"
        >
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-learning-mode'));
            }}
            className="inline-flex items-center gap-3 px-9 py-5 rounded-full font-black text-xl transition-all hover:scale-105 active:scale-100"
            style={{
              background: 'linear-gradient(135deg, #00FFD1, #534AB7)',
              color: '#0D0D1A',
              boxShadow: '0 0 50px rgba(0,255,209,0.45), 0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            <Play className="w-6 h-6 flex-shrink-0" />
            בואו נתחיל ללמוד
            <ArrowLeft className="w-5 h-5 flex-shrink-0" />
          </button>
        </motion.div>

        {/* High-tech stat badges row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="grid grid-cols-3 gap-3 mt-6 max-w-lg mx-auto"
        >
          {[
            { value: '25M+', label: 'צפיות יוטיוב', icon: <span className="text-xl">👁️</span>, glow: 'rgba(0,255,209,0.12)', border: 'rgba(0,255,209,0.25)' },
            { value: '130K+', label: 'מנויים', icon: <span className="text-xl">▶</span>, glow: 'rgba(255,60,60,0.08)', border: 'rgba(255,80,80,0.25)' },
            { value: '9+', label: 'מדריכי AI', icon: <span className="text-xl">🎯</span>, glow: 'rgba(83,74,183,0.12)', border: 'rgba(83,74,183,0.3)' },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 rounded-xl py-3 px-2"
              style={{
                background: s.glow,
                border: `1px solid ${s.border}`,
              }}
            >
              {s.icon}
              <div className="text-lg font-black leading-none" style={{ color: '#ffffff' }}>{s.value}</div>
              <div className="text-[10px] font-medium leading-tight" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Email Section (below tabs) ───────────────────────────────────────────────

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
      className="py-14 px-6"
      style={{ background: 'rgba(3,3,12,0.99)', borderTop: '1px solid rgba(0,255,209,0.08)' }}
    >
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5"
            style={{ background: 'rgba(0,255,209,0.08)', border: '1px solid rgba(0,255,209,0.25)', color: '#00FFD1' }}
          >
            <Mail className="w-3.5 h-3.5" />
            גישה חינמית לכל התוכן
          </div>
          <h3 className="text-2xl md:text-3xl font-black mb-2" style={{ color: '#ffffff' }}>
            רוצים לפתוח את כל המדריכים?
          </h3>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
            השאירו אימייל — וכל המדריכים נפתחים מיד. ללא ספאם, בחינם לגמרי.
          </p>

          {unlocked || status === 'success' ? (
            <div
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
              style={{ background: 'rgba(0,255,209,0.07)', border: '1px solid rgba(0,255,209,0.3)' }}
            >
              <CheckCircle className="w-5 h-5 text-orci-cyan flex-shrink-0" />
              <span className="font-semibold" style={{ color: '#ffffff' }}>
                גישה מלאה לכל המדריכים נפתחה!
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2.5"
            >
              <div className="relative flex-1">
                <Mail
                  className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 pointer-events-none"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
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
                    color: '#ffffff',
                    direction: 'rtl',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(83,74,183,0.55)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(83,74,183,0.1)';
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
                  background: status === 'loading' ? 'rgba(0,255,209,0.3)' : 'linear-gradient(135deg, #00FFD1, #534AB7)',
                  color: '#0D0D1A',
                  boxShadow: status === 'loading' ? 'none' : '0 0 28px rgba(0,255,209,0.4)',
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

          <label className="mt-3 flex items-start gap-2 cursor-pointer justify-center text-right">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-orci-cyan cursor-pointer flex-shrink-0"
              />
              <span className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                על ידי הרשמה, אני מאשר/ת את{' '}
                <Link href="/privacy" className="text-orci-cyan underline hover:opacity-80">מדיניות הפרטיות</Link>
                {' '}ומסכים/ה לקבל עדכונים
              </span>
            </label>

          {status === 'error' && (
            <p className="mt-2 text-red-400 text-xs text-center">משהו השתבש. נסו שוב.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Guides Section ───────────────────────────────────────────────────────────

function GuidesSection() {
  return (
    <section id="content-tabs" className="cap-section cap-section-white neon-grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="orci-kicker">
            <span className="orci-kicker-num">01 /</span>
            <span className="orci-kicker-label">מנוע המדריכים</span>
          </div>
          <h2 className="cap-section-title mb-3" style={{ color: '#ffffff' }}>
            כל המדריכים שלנו
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            2 מדריכים ראשונים חינם. שאר? פשוט תשאירו אימייל ואנחנו נפתח הכל.
          </p>
          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent('open-learning-mode'))}
            className="mt-6 mx-auto flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orci-cyan to-orci-blue hover:from-orci-blue hover:to-orci-cyan text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-orci-cyan/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5" />
            <span>מצב למידה - צפו במדריכים בסגנון נטפליקס</span>
          </motion.button>
        </div>
        <TutorialGrid />
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [isLearningModeOpen, setIsLearningModeOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsLearningModeOpen(true);
    window.addEventListener('open-learning-mode', handler);
    return () => window.removeEventListener('open-learning-mode', handler);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#0D0D1A' }}>

      {/* Onboarding — first-time visitors only */}
      <OnboardingModal />

      {/* 1. HERO */}
      <HeroSection />

      {/* 2. GUIDES */}
      <GuidesSection />

      {/* 4. EMAIL GATE (below tabs) */}
      <EmailSection />

      {/* 5. SCROLL SHOWCASE */}
      <section className="cap-section cap-section-teal overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <div className="orci-kicker">
                <span className="orci-kicker-num">02 /</span>
                <span className="orci-kicker-label">ההוכחה</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ color: '#ffffff' }}>
                בעל ערוץ יוטיוב שהגיע ל-
              </h2>
              <span className="text-4xl md:text-[5rem] font-bold text-orci-cyan leading-none">
                25 מיליון צפיות
              </span>
              <p className="text-3xl md:text-[4rem] font-bold text-orci-cyan mt-4">
                ו-130,000 רשומים
              </p>
              <p className="text-xl md:text-2xl mt-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
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
          <div className="orci-kicker w-full">
            <span className="orci-kicker-num">03 /</span>
            <span className="orci-kicker-label">השירותים</span>
          </div>
          <h2 className="cap-section-title text-center mb-4" style={{ color: '#ffffff' }}>
            מה אנחנו מציעים
          </h2>
          <p className="text-center mb-8 hidden sm:block" style={{ color: 'rgba(255,255,255,0.65)' }}>
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

      {/* Learning Mode Modal */}
      <LearningModeModal
        isOpen={isLearningModeOpen}
        onClose={() => setIsLearningModeOpen(false)}
      />
    </div>
  );
}
