'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Lock, ChevronLeft } from 'lucide-react';
import { GUIDES } from '@/data/guides';

const ONBOARDED_KEY = 'orci-onboarded';

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const alreadySeen = localStorage.getItem(ONBOARDED_KEY);
    if (!alreadySeen) {
      // Small delay so the page loads first
      const t = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  function dismiss() {
    localStorage.setItem(ONBOARDED_KEY, 'true');
    setIsOpen(false);
  }

  function goToGuide(href: string) {
    dismiss();
    router.push(href);
  }

  const CATEGORY_COLORS: Record<string, string> = {
    'יצירת תוכן': 'rgba(83,74,183,0.25)',
    'וידאו ויראלי': 'rgba(239,68,68,0.2)',
    'שיווק דיגיטלי': 'rgba(0,255,209,0.15)',
  };

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 9999, background: 'rgba(13,13,26,0.92)', backdropFilter: 'blur(8px)' }}
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full relative overflow-hidden rounded-2xl flex flex-col"
            style={{
              maxWidth: step === 1 ? 720 : 480,
              maxHeight: '90vh',
              background: 'linear-gradient(135deg, #12121f 0%, #1a1a35 100%)',
              border: '1px solid rgba(0,255,209,0.25)',
              boxShadow: '0 0 60px rgba(0,255,209,0.12), 0 25px 50px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow orb */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,255,209,0.1) 0%, transparent 70%)' }}
            />

            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-4 left-4 text-slate-500 hover:text-slate-200 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Progress dots */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: step === i ? 20 : 7,
                    height: 7,
                    background: step === i ? '#00FFD1' : 'rgba(0,255,209,0.25)',
                  }}
                />
              ))}
            </div>

            {/* ── STEP 0: Welcome ── */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="p-8 pt-14 text-center flex flex-col items-center gap-5"
              >
                {/* Avatar / logo */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #00FFD122, #534AB722)',
                    border: '2px solid rgba(0,255,209,0.4)',
                    boxShadow: '0 0 30px rgba(0,255,209,0.2)',
                  }}
                >
                  <span style={{ background: 'linear-gradient(135deg,#00FFD1,#534AB7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    AI
                  </span>
                </div>

                <div>
                  <h2 className="text-3xl font-black mb-2" style={{ color: '#ffffff' }}>
                    ברוך הבא ל-Orci AI
                  </h2>
                  <p className="text-slate-400 text-base leading-relaxed max-w-sm mx-auto">
                    פה תלמד ליצור תוכן AI ויראלי שמגיע למיליוני צפיות —<br />
                    בדיוק כמו שעשיתי ערוץ יוטיוב של
                    <span style={{ color: '#00FFD1' }}> 130K רשומים ו-25M צפיות</span>
                  </p>
                </div>

                {/* Stats */}
                <div className="flex gap-4 justify-center flex-wrap">
                  {[
                    { val: '25M', label: 'צפיות' },
                    { val: '130K', label: 'רשומים' },
                    { val: '10+', label: 'מדריכים' },
                  ].map(({ val, label }) => (
                    <div
                      key={label}
                      className="px-4 py-2 rounded-xl text-center"
                      style={{ background: 'rgba(0,255,209,0.08)', border: '1px solid rgba(0,255,209,0.2)' }}
                    >
                      <div className="text-xl font-black" style={{ color: '#00FFD1' }}>{val}</div>
                      <div className="text-xs text-slate-500">{label}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="mt-2 px-8 py-3 rounded-xl font-bold text-base flex items-center gap-2 transition-all hover:opacity-90 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #00FFD1, #534AB7)',
                    color: '#0D0D1A',
                    boxShadow: '0 0 25px rgba(0,255,209,0.35)',
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                  בואו נראה מה יש כאן
                </button>

                <button onClick={dismiss} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                  דלג
                </button>
              </motion.div>
            )}

            {/* ── STEP 1: Guide Showcase ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="flex flex-col"
                style={{ maxHeight: '90vh' }}
              >
                <div className="p-6 pt-14 pb-3 text-center flex-shrink-0">
                  <h2 className="text-2xl font-black mb-2" style={{ color: '#ffffff' }}>
                    הנה מה שתלמד כאן
                  </h2>
                  <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>לחץ על מדריך כדי להתחיל</p>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(0,255,209,0.08)', border: '1px solid rgba(0,255,209,0.2)', color: '#00FFD1' }}
                  >
                    🔓 כל המדריכים חינמיים — המנועלים נפתחים עם מייל בלבד
                  </div>
                </div>

                {/* Scrollable guide grid */}
                <div
                  className="overflow-y-auto px-5 pb-4 flex-1"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,255,209,0.2) transparent' }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {GUIDES.map((guide) => (
                      <button
                        key={guide.id}
                        onClick={() => goToGuide(guide.href)}
                        className="rounded-xl overflow-hidden text-right group transition-all hover:scale-[1.03] active:scale-95"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {/* Cover image */}
                        <div className="relative h-28 overflow-hidden">
                          <Image
                            src={guide.image}
                            alt={guide.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Lock overlay */}
                          {!guide.free && (
                            <div
                              className="absolute inset-0 flex items-center justify-center"
                              style={{ background: 'rgba(13,13,26,0.55)' }}
                            >
                              <Lock className="w-5 h-5 text-slate-300" />
                            </div>
                          )}
                          {/* Category badge */}
                          <div
                            className="absolute bottom-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{
                              background: CATEGORY_COLORS[guide.category] ?? 'rgba(0,255,209,0.15)',
                              color: '#ffffff',
                              border: '1px solid rgba(255,255,255,0.1)',
                            }}
                          >
                            {guide.category}
                          </div>
                        </div>

                        {/* Title */}
                        <div className="p-2.5">
                          <p className="text-xs font-bold leading-snug" style={{ color: '#ffffff' }}>
                            {guide.title}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer buttons */}
                <div
                  className="px-5 py-4 flex gap-3 flex-shrink-0"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, #00FFD1, #534AB7)',
                      color: '#0D0D1A',
                      boxShadow: '0 0 20px rgba(0,255,209,0.3)',
                    }}
                  >
                    בואו נתחיל
                  </button>
                  <button
                    onClick={dismiss}
                    className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-400 hover:text-white transition-colors"
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    דלג
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: CTA ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="p-8 pt-14 text-center flex flex-col items-center gap-5"
              >
                <div
                  className="text-5xl w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'rgba(0,255,209,0.1)',
                    border: '2px solid rgba(0,255,209,0.3)',
                    boxShadow: '0 0 30px rgba(0,255,209,0.2)',
                  }}
                >
                  🚀
                </div>

                <div>
                  <h2 className="text-3xl font-black mb-2" style={{ color: '#ffffff' }}>
                    מוכן להתחיל?
                  </h2>
                  <p className="text-slate-400 text-base leading-relaxed max-w-xs mx-auto">
                    תוך 60 שניות תוכל ליצור תוכן AI ויראלי שמעצור אנשים ב-פיד
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <Link
                    href="/guides"
                    onClick={dismiss}
                    className="w-full py-3 rounded-xl font-bold text-base text-center transition-all hover:opacity-90 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #00FFD1, #534AB7)',
                      color: '#0D0D1A',
                      boxShadow: '0 0 25px rgba(0,255,209,0.35)',
                    }}
                  >
                    קח אותי למדריכים
                  </Link>

                  <a
                    href="https://wa.me/972542599107"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={dismiss}
                    className="w-full py-3 rounded-xl font-bold text-base text-center transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
                    style={{
                      background: 'rgba(37,211,102,0.15)',
                      border: '1px solid rgba(37,211,102,0.4)',
                      color: '#25d366',
                    }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    בואו נדבר בוואטסאפ
                  </a>
                </div>

                {/* Packages teaser */}
                <div
                  className="w-full max-w-xs rounded-xl p-4 text-right"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <p className="text-xs font-bold mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    🏆 רוצה שנבנה לך את הנוכחות הדיגיטלית?
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { name: 'Starter', desc: 'אתר + אינסטגרם + בוט' },
                      { name: 'Growth', desc: 'שדרוג + אוטומציות + Reels' },
                    ].map(({ name, desc }) => (
                      <div key={name} className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{desc}</span>
                        <span className="text-xs font-bold" style={{ color: '#00FFD1' }}>{name}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/products"
                    onClick={dismiss}
                    className="mt-3 block w-full py-2 rounded-lg text-xs font-bold text-center transition-all hover:opacity-80"
                    style={{ background: 'rgba(0,255,209,0.1)', border: '1px solid rgba(0,255,209,0.25)', color: '#00FFD1' }}
                  >
                    לכל החבילות ←
                  </Link>
                </div>

                <button onClick={dismiss} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                  אולי בפעם אחרת
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
