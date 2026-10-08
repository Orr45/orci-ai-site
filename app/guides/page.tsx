'use client';

import { Footer } from '@/components/layout/Footer';
import TutorialGrid from '@/components/ui/tutorial-grid';
import { GUIDES } from '@/data/guides';
import { CoachingBanner } from '@/components/ui/coaching-cta';
import s from './guides.module.css';

export default function GuidesPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* HERO — Lando dark section, giant cyan word */}
      <section className={s.hero}>
        <div className={`${s.topo} lv-topo`} aria-hidden="true" />
        <div className={`${s.wrap} ${s.inner}`}>
          <div className={s.meta}>
            <span>מרכז הלמידה · Orci AI</span>
            <span>בעברית · בחינם</span>
          </div>
          <h1 className={`${s.word} lv-display`}>מדריכים</h1>
          <div className={s.row}>
            <p className={s.lead}>יצירת תוכן AI — צעד אחר צעד, עם הפרומפטים המלאים.</p>
            <span className="lv-sticker lv-sticker-lime">{GUIDES.length} מדריכים</span>
          </div>
        </div>
      </section>

      {/* ONE-ON-ONE COACHING — details stay in WhatsApp */}
      <CoachingBanner />

      {/* ALL GUIDES — with email gate */}
      <section className={s.grid}>
        <div className={s.wrap}>
          <TutorialGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
}
