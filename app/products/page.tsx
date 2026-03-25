'use client';

import { useState } from 'react';
import { Footer } from '@/components/layout/Footer';

const INSTAGRAM_URL = 'https://www.instagram.com/orciai45/';

const INSTAGRAM_SVG = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const packages = [
  {
    id: 'starter',
    icon: '🥉',
    name: 'Starter',
    tagline: 'תן לי להיות על המפה',
    audience: 'לעסק חדש שאין לו נוכחות דיגיטלית',
    highlighted: false,
    setupFeatures: [
      'אתר תדמית מקצועי עד 5 עמודים',
      'פרופיל אינסטגרם מאופיין ברמה גבוהה (bio, highlights, 9 פוסטים ראשונים)',
      'בוט ManyChat בסיסי — מענה אוטומטי ל-DM באינסטגרם + WhatsApp',
    ],
    monthlyFeatures: [
      'תפעול שוטף ועדכונים באתר',
      '4 Reels שיווקיים מותאמים למותג',
      'תפעול הבוטים הקיימים',
      'דוח חודשי מסכם',
    ],
  },
  {
    id: 'growth',
    icon: '🥈',
    name: 'Growth',
    tagline: 'אני רוצה לקוחות עכשיו',
    audience: 'לעסק קיים שרוצה לשדרג ולצמוח',
    highlighted: true,
    setupFeatures: [
      'אבחון ושדרוג האתר הקיים',
      'שיפור פרופיל האינסטגרם — bio, highlights, מיתוג',
      'שדרוג או בניית בוט ManyChat מתקדם — סינון לידים, follow up אוטומטי, תיאום פגישות',
    ],
    monthlyFeatures: [
      'תפעול שוטף ועדכונים באתר',
      '4 Reels שיווקיים מותאמים למותג',
      'תפעול הבוטים הקיימים',
      'דוח חודשי מסכם',
    ],
  },
  {
    id: 'fullstack',
    icon: '🥇',
    name: 'Full Stack',
    tagline: 'מערכת שעובדת לבד',
    audience: 'לעסק מבוסס שרוצה מערכת מלאה',
    highlighted: false,
    comingSoon: true,
    setupFeatures: [],
    monthlyFeatures: [],
  },
];

const faqs = [
  {
    q: 'מה ההבדל בין Starter ל-Growth?',
    a: 'Starter מיועד לעסקים שמתחילים מאפס — אנחנו בונים את כל הנוכחות הדיגיטלית מהיסוד. Growth מיועד לעסקים שכבר קיימים אבל רוצים לשדרג ולגדול — אנחנו מאבחנים מה קיים, משפרים, ומוסיפים אוטומציות מתקדמות.',
  },
  {
    q: 'כמה זמן לוקח להקים?',
    a: 'שלב ההקמה לוקח בדרך כלל 2–3 שבועות, תלוי בהיקף הפרויקט ובמהירות שהלקוח מספק חומרים. אחרי ההקמה עוברים לתחזוקה חודשית.',
  },
  {
    q: 'מה קורה אחרי החודש הראשון?',
    a: 'ממשיכים בתחזוקה חודשית — 4 Reels, עדכוני אתר, תפעול בוטים ודוח חודשי. אפשר לעצור בכל עת. אין התחייבות ארוכת טווח.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cap-card-small cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between gap-4">
        <span className="text-lg font-semibold text-white">{q}</span>
        <svg
          className={`w-5 h-5 text-orci-cyan flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 mt-4' : 'max-h-0'}`}
      >
        <p className="text-slate-300 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-orci-cyan flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="cap-hero-title mb-6 text-orci-cyan">
            בחר את החבילה שמתאימה לך
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            3 חבילות שירות שמחברות עסקים לעולם הדיגיטלי —
            <span className="text-orci-cyan font-bold"> נוכחות, שיווק ואוטומציות</span>
          </p>
        </div>
      </section>

      {/* PACKAGES GRID */}
      <section className="cap-section cap-section-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl overflow-hidden transition-transform duration-300
                  ${pkg.highlighted ? 'scale-[1.03] border-2 border-orci-cyan shadow-[0_0_32px_rgba(0,209,255,0.25)]' : 'border border-white/10'}
                  ${pkg.comingSoon ? 'opacity-50 grayscale pointer-events-none' : ''}
                  bg-white/5 backdrop-blur-sm`}
              >
                {/* Badge */}
                {pkg.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <span className="bg-orci-cyan text-black text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      הכי פופולרי
                    </span>
                  </div>
                )}
                {pkg.comingSoon && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                      בקרוב
                    </span>
                  </div>
                )}

                {/* TOP HALF — Setup */}
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{pkg.icon}</div>
                    <h2 className="text-2xl font-bold text-white">{pkg.name}</h2>
                    <p className="text-orci-cyan font-semibold text-sm mt-1">{pkg.tagline}</p>
                    <p className="text-slate-400 text-sm mt-1">{pkg.audience}</p>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-2">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs font-bold text-orci-cyan uppercase tracking-widest whitespace-nowrap">
                      הקמה חד פעמית
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {pkg.comingSoon ? (
                    <p className="text-slate-400 text-center text-sm">פרטים בקרוב</p>
                  ) : (
                    <ul className="space-y-3">
                      {pkg.setupFeatures.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300 text-sm leading-relaxed">
                          <CheckIcon />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* BOTTOM HALF — Monthly */}
                <div className="p-6 pt-0 flex flex-col gap-4 border-t border-white/10 mt-2">
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                      תחזוקה חודשית
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {pkg.comingSoon ? (
                    <p className="text-slate-400 text-center text-sm">פרטים בקרוב</p>
                  ) : (
                    <ul className="space-y-3">
                      {pkg.monthlyFeatures.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300 text-sm leading-relaxed">
                          <CheckIcon />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`cap-btn mt-2 inline-flex justify-center ${pkg.highlighted ? 'cap-btn-primary' : 'cap-btn-outline'}`}
                  >
                    {INSTAGRAM_SVG}
                    {pkg.comingSoon ? 'רשימת המתנה' : 'צרו קשר'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="cap-section cap-section-teal py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xl text-slate-300 leading-relaxed">
            ✅ כל החבילות כוללות{' '}
            <span className="text-orci-cyan font-bold">ליווי אישי</span>,{' '}
            <span className="text-orci-cyan font-bold">תמיכה שוטפת</span>, ו
            <span className="text-orci-cyan font-bold">תוצאות מדידות</span>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="cap-section cap-section-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
            שאלות נפוצות
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              לא בטוחים איזו חבילה מתאימה?
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              שלחו הודעה ואני אעזור לכם לבחור את המסלול הנכון עבורכם
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cap-btn cap-btn-primary inline-flex"
            >
              {INSTAGRAM_SVG}
              דברו איתי באינסטגרם
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
