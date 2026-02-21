'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, Sparkles, ArrowLeft } from 'lucide-react';

interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
  guideName?: string;
}

export const UNLOCK_KEY = 'orci-content-unlocked';

export function isContentUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(UNLOCK_KEY) === 'true';
}

export default function EmailGateModal({ isOpen, onClose, onUnlock, guideName }: EmailGateModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        localStorage.setItem(UNLOCK_KEY, 'true');
        setTimeout(() => { onUnlock(); onClose(); }, 1800);
      } else {
        const data = await res.json().catch(() => ({}));
        // Already subscribed → still unlock
        if (data?.error?.includes('already') || res.status === 400) {
          setStatus('success');
          localStorage.setItem(UNLOCK_KEY, 'true');
          setTimeout(() => { onUnlock(); onClose(); }, 1800);
        } else {
          setStatus('error');
          setErrorMsg('משהו השתבש. נסו שוב.');
        }
      }
    } catch {
      setStatus('error');
      setErrorMsg('שגיאת רשת. נסו שוב.');
    }
  }

  const modal = (
    <AnimatePresence>
      {isOpen && (
        // Single overlay: clicking the backdrop (outside the card) closes.
        // stopPropagation is on the inner card so inner clicks don't bubble to this handler.
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{
            zIndex: 9999,
            background: 'rgba(5,13,26,0.88)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={onClose}
        >
          {/* Modal card — stops click from reaching the backdrop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md overflow-hidden rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3a 100%)',
              border: '1px solid rgba(0,209,255,0.3)',
              boxShadow: '0 0 60px rgba(0,209,255,0.15), 0 25px 50px rgba(0,0,0,0.5)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow orb — pointer-events-none so it never blocks clicks */}
            <div
              className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,209,255,0.12) 0%, transparent 70%)' }}
            />

            {/* X close button — z-index above everything in the card */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 text-slate-500 hover:text-slate-200 transition-colors"
              style={{ zIndex: 10 }}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative p-8 text-center" style={{ zIndex: 1 }}>
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-4"
                >
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: 'rgba(0,209,255,0.15)', border: '2px solid rgba(0,209,255,0.5)' }}
                  >
                    <Sparkles className="w-8 h-8 text-orci-cyan" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">הגישה נפתחה!</h3>
                  <p className="text-slate-400">מעביר אתכם למדריך...</p>
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
                    פתחו גישה לכל המדריכים
                  </h3>
                  {guideName && (
                    <p className="text-orci-cyan text-sm font-medium mb-3">
                      &quot;{guideName}&quot; + כל שאר המדריכים
                    </p>
                  )}
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    הכניסו אימייל וקבלו גישה מיידית לכל המדריכים,
                    פלוס עדכונים שבועיים על טרנדים חדשים ב-AI
                  </p>

                  <div className="flex justify-center gap-4 mb-6 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><span className="text-orci-cyan">✓</span> גישה לכל המדריכים</span>
                    <span className="flex items-center gap-1"><span className="text-orci-cyan">✓</span> עדכונים שבועיים</span>
                    <span className="flex items-center gap-1"><span className="text-orci-cyan">✓</span> בחינם לגמרי</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
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
                        background: status === 'loading'
                          ? 'rgba(0,209,255,0.4)'
                          : 'linear-gradient(135deg, #00d1ff, #00bfff)',
                        color: '#050d1a',
                        boxShadow: status === 'loading' ? 'none' : '0 0 20px rgba(0,209,255,0.3)',
                      }}
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
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

                  <p className="mt-4 text-xs text-slate-600">ללא ספאם. בכל עת ניתן להסיר.</p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render via portal directly into document.body — bypasses any parent z-index stacking context
  if (!mounted) return null;
  return createPortal(modal, document.body);
}
