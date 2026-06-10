import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'מדיניות פרטיות | Orci AI',
  description: 'מדיניות הפרטיות של Orci AI — כיצד אנו מטפלים במידע שלכם',
};

const PRIVACY = [
  {
    num: '01',
    title: 'מה אנו אוספים',
    body: 'השירות אוסף מינימום: כתובת אימייל (אם בחרת לקבל את התכנים), שם טיקר למטרות ניתוח, וכתובת IP לאבטחה בלבד. אין איסוף פרטים מזהים נוספים, ואין פרופיילינג.',
  },
  {
    num: '02',
    title: 'שימוש במידע',
    body: 'כתובת האימייל משמשת אך ורק לשליחת עדכונים ומדריכים שביקשת. לא נמכור ולא נעביר את כתובת האימייל שלך לצד שלישי כלשהו. לא נשלח תכנים שיווקיים שלא ביקשת.',
  },
  {
    num: '03',
    title: 'שמירת נתונים',
    body: 'ניתן לבקש מחיקת המידע בכל עת באמצעות פנייה אלינו. נמחק את הנתונים שלך תוך 14 ימי עסקים מקבלת הבקשה.',
  },
  {
    num: '04',
    title: 'Local Storage',
    body: 'האתר משתמש ב-localStorage של הדפדפן (לא cookies) לשמירת מצב הגישה לתכנים, העדפות נגישות, ופרטי הרשמה מקומיים. מידע זה נשמר במכשיר שלך בלבד ואינו נשלח לשרתים.',
  },
  {
    num: '05',
    title: 'שירותים חיצוניים',
    body: 'האתר עושה שימוש בשירותים חיצוניים: Mailchimp לשליחת ניוזלטרים, Vercel לאחסון ותשתית, ו-Anthropic Claude API לפיצ׳רים מסוימים. כל ספק כפוף למדיניות הפרטיות שלו.',
  },
  {
    num: '06',
    title: 'זכויות המשתמש',
    body: 'ניתן לבקש מחיקה, תיקון, או העברה של הנתונים האישיים שלכם בכל עת. פנה אל: support@orciai.com — נענה תוך 14 ימי עסקים.',
  },
  {
    num: '07',
    title: 'אבטחה',
    body: 'כל העברות הנתונים מוצפנות באמצעות HTTPS. השרתים פועלים בסביבה מאובטחת (Vercel Cloud). עם זאת, אין באפשרותנו להבטיח אבטחה מוחלטת של מידע המועבר דרך האינטרנט.',
  },
  {
    num: '08',
    title: 'יצירת קשר',
    body: 'לשאלות בנושא פרטיות ניתן לפנות: WhatsApp 054-259-9107 או דרך עמוד הקשר באתר.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-orci-cyan transition-colors mb-10"
        >
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          חזרה לדף הבית
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest text-orci-cyan uppercase mb-2">ORCI AI</p>
          <h1 className="text-4xl font-black text-white mb-2">מדיניות פרטיות</h1>
          <p className="text-sm text-slate-400">עדכון אחרון: יוני 2026</p>
        </div>

        {/* Items */}
        <div className="space-y-4">
          {PRIVACY.map((item) => (
            <div
              key={item.num}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-black text-orci-cyan opacity-60 mt-0.5 flex-shrink-0 w-6">
                  {item.num}
                </span>
                <div>
                  <h2 className="font-bold text-white mb-2">{item.title}</h2>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
