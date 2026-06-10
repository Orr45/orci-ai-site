'use client';

import { Footer } from '@/components/layout/Footer';
import TutorialGrid from '@/components/ui/tutorial-grid';

export default function GuidesPage() {
  return (
    <div className="min-h-screen" style={{ background: '#050d1a' }}>

      {/* HERO */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="cap-hero-title mb-4" style={{ color: '#e8f4ff' }}>
            מרכז הלמידה שלנו
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#b0d0f0' }}>
            מדריכים מעשיים ב-AI, אוטומציה ושיווק דיגיטלי
          </p>
        </div>
      </section>

      {/* WRITTEN GUIDES - with email gate */}
      <section className="cap-section cap-section-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#e8f4ff' }}>מדריכים כתובים</h2>
            <p className="text-sm" style={{ color: '#b0d0f0' }}>2 מדריכים ראשונים חינם — שאר המדריכים נפתחים עם אימייל</p>
          </div>
          <TutorialGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
}
