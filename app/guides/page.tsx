'use client';

import { Footer } from '@/components/layout/Footer';
import TutorialGrid from '@/components/ui/tutorial-grid';

export default function GuidesPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* HERO */}
      <section className="cap-section" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="orci-kicker">
            <span className="orci-kicker-label">מרכז הלמידה</span>
          </div>
          <h1 className="cap-hero-title mb-4">
            כאן לומדים ליצור עם AI
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            מדריכים מעשיים בעברית — יצירת תוכן ויראלי, שיווק דיגיטלי ואוטומציות.
            כתוב פשוט, צעד אחר צעד, עם הפרומפטים המלאים.
          </p>
        </div>
      </section>

      {/* WRITTEN GUIDES - with email gate */}
      <section className="cap-section" style={{ background: 'var(--surface-alt)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="orci-kicker">
              <span className="orci-kicker-label">המדריכים</span>
            </div>
            <h2 className="cap-section-title mb-2">מדריכים כתובים</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              2 מדריכים ראשונים חינם — שאר המדריכים נפתחים עם אימייל
            </p>
          </div>
          <TutorialGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
}
