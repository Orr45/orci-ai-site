'use client';

import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Cap4Learning Style */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="cap-card text-center">
            <h1 className="cap-hero-title mb-6 text-orci-cyan">
              צרו קשר
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              מוכנים להתחיל? בואו נדבר על איך AI יכול לעזור לכם
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="cap-section cap-section-white">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {/* Primary Contact - WhatsApp */}
          <div className="cap-card text-center border-2 border-orci-cyan">
            <div className="text-6xl mb-6">💬</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orci-cyan">
              הדרך הכי מהירה ליצור קשר
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              שלחו לי הודעה בוואטסאפ ואענה לכם בהקדם האפשרי.
              <br />
              בדרך כלל תוך כמה שעות!
            </p>
            <a
              href="https://wa.me/972542599107"
              target="_blank"
              rel="noopener noreferrer"
              className="cap-btn cap-btn-primary inline-flex text-lg"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              שלחו הודעה בוואטסאפ
            </a>
          </div>

          {/* What to Expect */}
          <div className="cap-card">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-orci-cyan">
              מה קורה אחרי ההודעה?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">📞</div>
                <h4 className="text-xl font-bold text-orci-cyan mb-2">1. שיחה ראשונית</h4>
                <p className="text-slate-300">נדבר על הצרכים שלכם והמטרות</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="text-xl font-bold text-orci-cyan mb-2">2. תכנית מותאמת</h4>
                <p className="text-slate-300">אבנה תכנית פעולה ספציפית לעסק שלכם</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🚀</div>
                <h4 className="text-xl font-bold text-orci-cyan mb-2">3. מתחילים לעבוד</h4>
                <p className="text-slate-300">יישום, ליווי ותוצאות</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="cap-card">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-orci-cyan">
              שאלות נפוצות
            </h3>
            <div className="space-y-6 text-slate-300">
              <div>
                <h4 className="text-xl font-bold text-orci-cyan mb-2">כמה זמן לוקח לראות תוצאות?</h4>
                <p>תלוי בפרויקט, אבל בדרך כלל תוצאות ראשוניות תוך 2-4 שבועות. אוטומציות פשוטות יכולות להיות מוכנות תוך ימים.</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-orci-cyan mb-2">איך אני עובד?</h4>
                <p>ליווי אישי 1-על-1, שיחות וואטסאפ/זום, הדרכות מעשיות, ותמיכה מלאה עד שתראו תוצאות.</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-orci-cyan mb-2">למי זה מתאים?</h4>
                <p>בעלי עסקים קטנים ובינוניים, יזמים, פרילנסרים ומשווקים דיגיטליים שרוצים להשתמש ב-AI כדי לצמוח.</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-orci-cyan mb-2">צריך ידע טכני מוקדם?</h4>
                <p>בכלל לא! אני מלמד הכל מאפס ובגובה העיניים. אם אתם יודעים לשלוח הודעת וואטסאפ - אתם מוכנים.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Additional Links */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xl text-slate-300 mb-6">
            עדיין לא בטוחים? אפשר גם לבדוק את
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guides" className="cap-btn cap-btn-secondary">
              המדריכים החינמיים
            </Link>
            <Link href="/portfolio" className="cap-btn cap-btn-dark">
              העבודות שלי
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
