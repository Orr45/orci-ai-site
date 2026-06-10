import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'תנאי שימוש | Orci AI',
  description: 'תנאי השימוש של Orci AI — קראו לפני השימוש בשירותים ובמדריכים',
};

const TERMS = [
  {
    num: '01',
    title: 'כללי',
    body: 'Orci AI הוא אתר תוכן ולימוד בתחום הבינה המלאכותית, המופעל על ידי Or Shemer (Orci). השימוש באתר מהווה הסכמה לתנאים המפורטים להלן. אם אינכם מסכימים לתנאים, נבקשכם להימנע משימוש באתר.',
  },
  {
    num: '02',
    title: 'מטרת השירות',
    body: 'האתר מספק מדריכים חינוכיים, טיפים ותכנים בנושא כלי AI ושיווק דיגיטלי. התכנים הינם למטרות חינוכיות בלבד ואינם מהווים ייעוץ מקצועי, משפטי, כלכלי, או אחר.',
  },
  {
    num: '03',
    title: 'דיוק המידע',
    body: 'התכנים באתר נכתבים בהתבסס על ידע ועל ניסיון אישי. עם זאת, תחום ה-AI משתנה במהירות. Orci AI אינו מתחייב לדיוק מלא של המידע ומומלץ לוודא נתונים חשובים מול מקורות רשמיים לפני פעולה.',
  },
  {
    num: '04',
    title: 'שימוש מותר',
    body: 'השימוש בתכנים הינו לצרכים אישיים בלבד. חל איסור מוחלט להעתיק, לשכפל, למכור או להפיץ תכנים מהאתר ללא אישור כתוב מראש. ציטוט חלקי מותר עם קרדיט ברור לאתר.',
  },
  {
    num: '05',
    title: 'קנין רוחני',
    body: 'כל התכנים, התמונות, הפרומפטים, הלוגו וסרטוני הוידאו המופיעים באתר הינם קניינו הבלעדי של Orci AI. אין לעשות בהם שימוש מסחרי ללא רשות בכתב.',
  },
  {
    num: '06',
    title: 'מגבלת אחריות',
    body: 'Orci AI לא יישא באחריות לנזקים ישירים, עקיפים, מקריים או תוצאתיים הנובעים משימוש בתכנים האתר, לרבות נזקים עסקיים, אובדן הכנסות, או תוצאות של שימוש בכלי AI המתוארים במדריכים.',
  },
  {
    num: '07',
    title: 'שינויים בתנאים',
    body: 'Orci AI שומר לעצמו את הזכות לעדכן תנאים אלו בכל עת. שינויים מהותיים יפורסמו בעמוד זה. המשך השימוש באתר לאחר פרסום השינויים מהווה הסכמה להם.',
  },
  {
    num: '08',
    title: 'יצירת קשר',
    body: 'לכל שאלה בנושא תנאי השימוש: WhatsApp 054-259-9107 | מייל: orciai45@gmail.com',
  },
];

export default function TermsPage() {
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
          <h1 className="text-4xl font-black text-white mb-2">תנאי שימוש</h1>
          <p className="text-sm text-slate-400">עדכון אחרון: יוני 2026</p>
        </div>

        {/* Items */}
        <div className="space-y-4">
          {TERMS.map((item) => (
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
