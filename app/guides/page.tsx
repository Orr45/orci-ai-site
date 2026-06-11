'use client';

import { Footer } from '@/components/layout/Footer';
import TutorialGrid from '@/components/ui/tutorial-grid';

export default function GuidesPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0D0D1A' }}>

      {/* HERO */}
      <section className="cap-section cap-section-teal neon-grid-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="orci-kicker">
            <span className="orci-kicker-num">ORCIAI /</span>
            <span className="orci-kicker-label">מרכז הלמידה</span>
          </div>
          <h1 className="cap-hero-title mb-4" style={{ color: '#ffffff' }}>
            מרכז הלמידה שלנו
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            מדריכים מעשיים ב-AI, אוטומציה ושיווק דיגיטלי
          </p>
        </div>
      </section>

      {/* WRITTEN GUIDES - with email gate */}
      <section className="cap-section cap-section-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="orci-kicker">
              <span className="orci-kicker-num">01 /</span>
              <span className="orci-kicker-label">מדריכים</span>
            </div>
            <h2 className="cap-section-title mb-2" style={{ color: '#ffffff' }}>מדריכים כתובים</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>2 מדריכים ראשונים חינם — שאר המדריכים נפתחים עם אימייל</p>
          </div>
          <TutorialGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
}
