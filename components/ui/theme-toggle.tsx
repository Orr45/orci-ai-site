'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const THEME_KEY = 'orci-theme';

export default function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'עבור למצב בהיר' : 'עבור למצב כהה'}
      title={isDark ? 'מצב בהיר' : 'מצב כהה'}
      className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 ${className ?? ''}`}
      style={{
        border: '2px solid var(--pill-edge)',
        background: 'var(--surface)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Render a stable icon before mount to avoid hydration mismatch */}
      {mounted && isDark ? <Sun className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} /> : <Moon style={{ width: 18, height: 18 }} />}
    </button>
  );
}
