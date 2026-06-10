'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { GUIDES } from '@/data/guides';
import { isContentUnlocked, UNLOCK_KEY } from '@/components/ui/email-gate-modal';

export default function GuideGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [unlocked, setUnlocked] = useState(true); // optimistic — avoids flash
  const [mounted, setMounted] = useState(false);

  // Find current guide by pathname
  const guide = GUIDES.find((g) => g.href === pathname);
  const isLocked = guide ? !guide.free : false;

  useEffect(() => {
    setMounted(true);
    setUnlocked(isContentUnlocked());

    // Listen for unlock events from other components
    const onUnlock = () => setUnlocked(true);
    window.addEventListener('orci-unlocked', onUnlock);
    window.addEventListener('storage', () => setUnlocked(isContentUnlocked()));
    return () => {
      window.removeEventListener('orci-unlocked', onUnlock);
      window.removeEventListener('storage', () => setUnlocked(isContentUnlocked()));
    };
  }, []);

  const showGate = mounted && isLocked && !unlocked;

  return (
    <div className="relative">
      {/* Blur content when locked */}
      <div style={{ filter: showGate ? 'blur(6px)' : 'none', pointerEvents: showGate ? 'none' : 'auto', userSelect: showGate ? 'none' : 'auto' }}>
        {children}
      </div>

      {/* Gate overlay */}
      <AnimatePresence>
        {showGate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 9000, background: 'rgba(5,13,26,0.7)', backdropFilter: 'blur(4px)' }}
          >
            <EmailGateInline
              guideName={guide?.title}
              onUnlock={() => setUnlocked(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Inline Email Gate ────────────────────────────────────────────────────────

function EmailGateInline({ guideName, onUnlock }: { guideName?: string; onUnlock: () => void }) {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

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

      const data = await res.json().catch(() => ({}));
      const alreadySubscribed = data?.error?.includes('already') || res.status === 400;

      if (res.ok || alreadySubscribed) {
        setStatus('success');
        localStorage.setItem(UNLOCK_KEY, 'true');
        window.dispatchEvent(new Event('orci-unlocked'));
        setTimeout(() => onUnlock(), 1500);
      } else {
        setStatus('error');
        setErrorMsg('משהו השתבש. נסו שוב.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('שגיאת רשת. נסו שוב.');
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="w-full max-w-md rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3a 100%)',
        border: '1px solid rgba(0,209,255,0.3)',
        boxShadow: '0 0 60px rgba(0,209,255,0.15), 0 25px 50px rgba(0,0,0,0.5)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-8 text-center">
        {status === 'success' ? (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="py-4">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'rgba(0,209,255,0.15)', border: '2px solid rgba(0,209,255,0.5)' }}
            >
              <Sparkles className="w-8 h-8 text-orci-cyan" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">הגישה נפתחה!</h3>
            <p className="text-slate-400">טוען את המדריך...</p>
          </motion.div>
        ) : (
          <>
            <div
              className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{ background: 'rgba(0,209,255,0.1)', border: '1px solid rgba(0,209,255,0.3)' }}
            >
              <Lock className="w-7 h-7 text-orci-cyan" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              המדריך הזה נעול
            </h3>
            {guideName && (
              <p className="text-orci-cyan text-sm font-medium mb-3">"{guideName}"</p>
            )}
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              השאירו אימייל וקבלו גישה מיידית לכל המדריכים —<br />
              בחינם לגמרי, ללא ספאם
            </p>

            <div className="flex justify-center gap-4 mb-6 text-xs text-slate-400">
              <span className="flex items-center gap-1"><span className="text-orci-cyan">✓</span> גישה לכל המדריכים</span>
              <span className="flex items-center gap-1"><span className="text-orci-cyan">✓</span> עדכונים שבועיים</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3" dir="rtl">
              <div className="relative">
                <Mail className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="האימייל שלכם"
                  required
                  className="w-full pr-10 pl-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(0,209,255,0.2)',
                    direction: 'rtl',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(0,209,255,0.6)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0,209,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0,209,255,0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {errorMsg && <p className="text-red-400 text-xs text-center">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                style={{
                  background: status === 'loading' ? 'rgba(0,209,255,0.4)' : 'linear-gradient(135deg, #00d1ff, #00bfff)',
                  color: '#050d1a',
                  boxShadow: status === 'loading' ? 'none' : '0 0 20px rgba(0,209,255,0.3)',
                }}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    מעבד...
                  </span>
                ) : (
                  <>
                    <ArrowLeft className="w-4 h-4" />
                    פתחו גישה עכשיו
                  </>
                )}
              </button>
            </form>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-orci-cyan cursor-pointer flex-shrink-0"
              />
              <span className="text-xs text-slate-400 leading-relaxed">
                על ידי הרשמה, אני מאשר/ת את{' '}
                <Link href="/privacy" className="text-orci-cyan underline hover:opacity-80">מדיניות הפרטיות</Link>
                {' '}ומסכים/ה לקבל עדכונים
              </span>
            </label>
            <p className="text-xs text-slate-600">ללא ספאם. בכל עת ניתן להסיר.</p>
          </>
        )}
      </div>
    </motion.div>
  );
}
