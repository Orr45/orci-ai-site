'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const WHATSAPP_URL = `https://wa.me/972542599107?text=${encodeURIComponent(
  'היי אור! קראתי עליך באתר ואשמח לדבר'
)}`;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55 },
};

const MILESTONES = [
  {
    period: 'ההתחלה — גיל 16',
    title: 'oci Gaming',
    text: 'בניתי מאפס מותג תוכן ביוטיוב שהגיע ל-130,000 מנויים ולמעלה מ-25 מיליון צפיות. שם למדתי את הדבר הכי חשוב שיש: מה גורם לאנשים לעצור, לצפות ולחזור.',
  },
  {
    period: 'השירות',
    title: 'קצין בחטיבת החילוץ וההצלה',
    text: 'שירתי כמפקד וקצין (סגן) והובלתי לוחמים במשימות מורכבות במלחמת חרבות ברזל. הפיקוד לימד אותי דיוק, אחריות, וקבלת החלטות תחת לחץ.',
  },
  {
    period: 'היום',
    title: 'Orci AI — שיווק ויצירה עם AI',
    text: 'אני מחבר את שני העולמות: הבנה עמוקה של תוכן ויראלי + הכלים המתקדמים בעולם ה-AI. התוצאה — סרטונים שהגיעו יחד ליותר מ-1.4 מיליון צפיות בתקופה האחרונה, ופרסומות לעסקים אמיתיים.',
  },
];

const STATS = [
  { value: '1.4M+', label: 'צפיות בסרטוני AI מהתקופה האחרונה' },
  { value: '25M+', label: 'צפיות בערוץ היוטיוב שבניתי' },
  { value: '130K', label: 'מנויים ביוטיוב' },
  { value: '10+', label: 'שנות ניסיון ביצירת תוכן' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <section className="cap-section" style={{ background: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] items-center gap-10 lg:gap-16">
            <div className="text-center lg:text-right order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm font-semibold mb-8"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent-line)' }}
              >
                נעים להכיר
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="cap-hero-title mb-6"
              >
                אני אור שמר.
                <br />
                <span style={{ color: 'var(--accent)' }}>יוצר תוכן שהפך את ה-AI למקצוע.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0"
                style={{ color: 'var(--text-secondary)' }}
              >
                מיוצר תוכן עם מיליוני צפיות, דרך פיקוד בחטיבת החילוץ — ועד שיווק AI לעסקים.
                זה הסיפור שלי, בקצרה.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div
                className="relative w-56 sm:w-64 lg:w-full max-w-sm rounded-3xl overflow-hidden"
                style={{ border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card-hover)', aspectRatio: '4/5' }}
              >
                <Image
                  src="/or-suit.jpg"
                  alt="אור שמר"
                  fill
                  sizes="(max-width: 1024px) 256px, 384px"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-12" style={{ background: 'var(--surface-alt)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <motion.div {...fadeUp} className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center px-4 py-5">
              <div className="font-display text-3xl md:text-4xl font-black mb-1.5" style={{ color: 'var(--accent)' }}>
                {s.value}
              </div>
              <div className="text-xs md:text-sm leading-snug" style={{ color: 'var(--text-muted)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Journey */}
      <section className="cap-section" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <div className="orci-kicker">
              <span className="orci-kicker-label">המסע</span>
            </div>
            <h2 className="cap-section-title">שלוש תחנות שעשו אותי מי שאני</h2>
          </motion.div>

          <div className="space-y-5">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="cap-card"
              >
                <div className="text-xs font-bold tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                  {m.period}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">{m.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {m.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What I do */}
      <section className="cap-section" style={{ background: 'var(--surface-alt)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp} className="cap-card">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              מה אני עושה היום
            </h2>
            <div className="text-lg leading-relaxed space-y-4" style={{ color: 'var(--text-secondary)' }}>
              <p>אני עוזר לבעלי עסקים ויזמים לנצל את כוח הבינה המלאכותית כדי:</p>
              <ul className="list-none space-y-3">
                {[
                  ['ליצור פרסומות ברמה קולנועית', 'כמעט ללא תקציב הפקה'],
                  ['להגביר נוכחות ברשתות החברתיות', 'עם תוכן שאנשים באמת עוצרים בשבילו'],
                  ['לחסוך עשרות אלפי שקלים', 'לעומת הפקה מסורתית'],
                  ['ללמוד את הכלים בעצמם', 'דרך מדריכים חינמיים בעברית'],
                ].map(([bold, rest]) => (
                  <li key={bold} className="pr-6 relative">
                    <span className="absolute right-0" style={{ color: 'var(--accent)' }}>—</span>
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{bold}</span>{' '}
                    {rest}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cap-section" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            {...fadeUp}
            className="rounded-3xl p-10 md:p-14 text-center"
            style={{ background: 'var(--surface-card)', border: '1.5px solid var(--accent)', boxShadow: 'var(--shadow-card-hover)' }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">בוא נעבוד ביחד</h2>
            <p className="mb-8 text-lg" style={{ color: 'var(--text-secondary)' }}>
              רוצה לשמוע איך AI יכול לקחת את העסק שלך לשלב הבא?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cap-btn cap-btn-whatsapp text-base"
                style={{ padding: '1rem 2.2rem' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                שלח לי הודעה בוואטסאפ
              </a>
              <Link href="/products" className="cap-btn cap-btn-outline text-base" style={{ padding: '1rem 2.2rem' }}>
                לשירותים לעסקים
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
