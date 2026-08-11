import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'הצהרת נגישות | Orci AI',
  description: 'הצהרת הנגישות של אתר Orci AI בהתאם לתקן הישראלי IS 5568.',
};

const FEATURES = [
  'ניווט מלא באמצעות מקלדת בכל עמודי האתר',
  'תמיכה בקוראי מסך (NVDA, JAWS, VoiceOver)',
  'קישור "דלג לתוכן הראשי" בראש כל עמוד',
  'תמונות מלוות בטקסט חלופי (alt)',
  'ניגודיות צבעים העומדת ביחס של 4.5:1 לפחות',
  'תפריט העדפות נגישות צף (הגדלת טקסט, ניגודיות גבוהה, היפוך צבעים, גווני אפור, גופן קריא, ריווח שורות ואותיות, הדגשת קישורים, הפחתת אנימציות)',
  'מבנה HTML סמנטי עם כותרות היררכיות ותוויות ARIA בעברית',
  'תמיכה מלאה בכיווניות RTL בכל האתר',
];

const LIMITATIONS = [
  'חלק מהמדריכים כוללים תמונות תוכן (screenshots) שטרם עברו הנגשה מלאה של טקסט חלופי מפורט',
  'סרטונים מוטמעים מיוטיוב ואינסטגרם כפופים לרמת הנגישות שמספקות הפלטפורמות עצמן',
];

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors hover:opacity-70"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowLeft className="w-4 h-4 rotate-180" />
          חזרה לדף הבית
        </Link>

        <h1 className="cap-hero-title mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          הצהרת נגישות
        </h1>
        <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
          עודכן לאחרונה: אוגוסט 2026
        </p>

        <div className="space-y-10">
          <section>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              אנו ב-Orci AI (אור שמר) מחויבים להנגיש את האתר לאנשים עם מוגבלויות, בהתאם
              לתקן הישראלי <b style={{ color: 'var(--text-primary)' }}>IS 5568</b>, המעוגן
              בהנחיות הנגישות הבינלאומיות WCAG 2.0 ברמה AA, ובהתאם לחוק שוויון זכויות
              לאנשים עם מוגבלות, התשנ&quot;ח-1998 ותקנות הנגישות לשירות, התשע&quot;ג-2013.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              אמצעי נגישות באתר
            </h2>
            <ul className="space-y-2.5">
              {FEATURES.map((f) => (
                <li key={f} className="flex gap-2.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)' }}>—</span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              מגבלות נגישות ידועות
            </h2>
            <ul className="space-y-2.5">
              {LIMITATIONS.map((l) => (
                <li key={l} className="flex gap-2.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)' }}>—</span>
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              אנו פועלים לתקן מגבלות אלה בהדרגה. אם נתקלת ברכיב שאינו נגיש — נשמח שתדווח לנו (פרטים למטה).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              פנייה בנושא נגישות
            </h2>
            <div
              className="rounded-2xl p-6 space-y-2 text-sm leading-relaxed"
              style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' }}
            >
              <p style={{ color: 'var(--text-secondary)' }}>
                <b style={{ color: 'var(--text-primary)' }}>רכז נגישות:</b> אור שמר
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                <b style={{ color: 'var(--text-primary)' }}>טלפון: </b>
                <a href="tel:+972542599107" dir="ltr" className="underline hover:opacity-80" style={{ color: 'var(--accent)' }}>
                  054-259-9107
                </a>
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                <b style={{ color: 'var(--text-primary)' }}>דוא&quot;ל: </b>
                <a href="mailto:orciai45@gmail.com" className="underline hover:opacity-80" style={{ color: 'var(--accent)' }}>
                  orciai45@gmail.com
                </a>
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              נשתדל להשיב לכל פנייה בנושא נגישות בהקדם האפשרי, ולא יאוחר מ-60 יום ממועד קבלת הפנייה.
            </p>
          </section>

          <section className="text-sm" style={{ color: 'var(--text-muted)' }}>
            <p>תאריך ביקורת הנגישות האחרונה: אוגוסט 2026</p>
            <p>תאריך עדכון הצהרה זו: אוגוסט 2026</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
