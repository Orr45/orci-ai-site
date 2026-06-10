'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'orci-a11y';

type A11yState = {
  fontSize: number;
  highContrast: boolean;
  invert: boolean;
  grayscale: boolean;
  readableFont: boolean;
  lineSpacing: boolean;
  letterSpacing: boolean;
  highlightLinks: boolean;
  noAnimations: boolean;
};

const DEFAULT_STATE: A11yState = {
  fontSize: 100,
  highContrast: false,
  invert: false,
  grayscale: false,
  readableFont: false,
  lineSpacing: false,
  letterSpacing: false,
  highlightLinks: false,
  noAnimations: false,
};

function applyA11y(state: A11yState) {
  const html = document.documentElement;
  html.style.fontSize = state.fontSize === 100 ? '' : `${state.fontSize}%`;
  html.classList.toggle('a11y-high-contrast', state.highContrast);
  html.classList.toggle('a11y-invert', state.invert);
  html.classList.toggle('a11y-grayscale', state.grayscale);
  html.classList.toggle('a11y-readable-font', state.readableFont);
  html.classList.toggle('a11y-line-spacing', state.lineSpacing);
  html.classList.toggle('a11y-letter-spacing', state.letterSpacing);
  html.classList.toggle('a11y-highlight-links', state.highlightLinks);
  html.classList.toggle('a11y-no-animations', state.noAnimations);
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = { ...DEFAULT_STATE, ...JSON.parse(saved) };
        setState(parsed);
        applyA11y(parsed);
      }
    } catch {}
  }, []);

  const update = useCallback((patch: Partial<A11yState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      applyA11y(next);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
    applyA11y(DEFAULT_STATE);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  const toggle = (key: keyof Omit<A11yState, 'fontSize'>) =>
    update({ [key]: !state[key] });

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="פתח תפריט נגישות"
        className="fixed bottom-20 left-4 z-[9998] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #00d1ff, #0099cc)',
          boxShadow: '0 0 18px rgba(0,209,255,0.45)',
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-900">
          <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm8 7h-5v13h-2v-6h-2v6H9V9H4V7h16v2z" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-20 left-4 z-[9999] w-72 rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: 'rgba(10,18,35,0.98)',
            border: '1px solid rgba(0,209,255,0.25)',
            backdropFilter: 'blur(16px)',
          }}
          dir="rtl"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: 'rgba(0,209,255,0.15)', background: 'rgba(0,209,255,0.08)' }}
          >
            <span className="font-bold text-white text-sm">נגישות</span>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white transition-colors text-lg leading-none"
              aria-label="סגור"
            >
              ✕
            </button>
          </div>

          <div className="p-4 space-y-3">
            {/* Font size */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">גודל טקסט</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => update({ fontSize: Math.max(80, state.fontSize - 10) })}
                  className="w-8 h-8 rounded-lg font-bold text-sm transition-colors hover:bg-white/10 text-slate-300"
                >
                  −A
                </button>
                <span className="text-xs text-orci-cyan w-10 text-center font-bold">
                  {state.fontSize}%
                </span>
                <button
                  onClick={() => update({ fontSize: Math.min(150, state.fontSize + 10) })}
                  className="w-8 h-8 rounded-lg font-bold text-sm transition-colors hover:bg-white/10 text-orci-cyan"
                >
                  +A
                </button>
              </div>
            </div>

            <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

            {/* Toggles */}
            {([
              { key: 'highContrast', label: 'ניגודיות גבוהה' },
              { key: 'invert', label: 'היפוך צבעים' },
              { key: 'grayscale', label: 'גווני אפור' },
              { key: 'readableFont', label: 'גופן קריא' },
              { key: 'lineSpacing', label: 'ריווח שורות' },
              { key: 'letterSpacing', label: 'ריווח אותיות' },
              { key: 'highlightLinks', label: 'הדגשת קישורים' },
              { key: 'noAnimations', label: 'הפחת אנימציות' },
            ] as { key: keyof Omit<A11yState, 'fontSize'>; label: string }[]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggle(key)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all text-sm"
                style={{
                  background: state[key] ? 'rgba(0,209,255,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${state[key] ? 'rgba(0,209,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  color: state[key] ? '#00d1ff' : '#94a3b8',
                }}
              >
                <span className="font-medium">{label}</span>
                <span
                  className="w-8 h-4 rounded-full relative transition-colors"
                  style={{ background: state[key] ? '#00d1ff' : 'rgba(255,255,255,0.15)' }}
                >
                  <span
                    className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all"
                    style={{ right: state[key] ? '2px' : 'auto', left: state[key] ? 'auto' : '2px' }}
                  />
                </span>
              </button>
            ))}

            {/* Reset */}
            <button
              onClick={reset}
              className="w-full py-2 rounded-xl text-sm font-bold transition-colors text-slate-400 hover:text-white hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              איפוס הכל
            </button>
          </div>
        </div>
      )}
    </>
  );
}
