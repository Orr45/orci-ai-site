'use client';

import Image from 'next/image';
import { Footer } from '@/components/layout/Footer';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Cap4Learning Style */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="cap-card text-center">
            <h1 className="cap-hero-title mb-6 text-orci-cyan">
              מי אני?
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              הסיפור שלי: מיוצר תוכן לקצין, ועכשיו למומחה AI
            </p>
          </div>
        </div>
      </section>

      {/* Scroll Animation Section - Showcasing Viral Success */}
      <section className="cap-section cap-section-white overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                יצרתי תוכן שהגיע ל-
              </h2>
              <span className="text-5xl md:text-[7rem] font-bold text-orci-cyan leading-none">
                2.4 מיליון צפיות
              </span>
              <p className="text-xl md:text-2xl text-gray-600 mt-6">
                וגם אתם יכולים ליצור תוכן ויראלי עם AI
              </p>
            </>
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&h=900&fit=crop"
            alt="Viral Content Success - Social Media Dashboard"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center"
            draggable={false}
            priority
          />
        </ContainerScroll>
      </section>

      {/* Story Section - Cap4Learning Style */}
      <article className="cap-section cap-section-teal">
        <div className="max-w-4xl mx-auto px-6 space-y-8">

          <div className="cap-card">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orci-cyan text-center">
              המסע שלי
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                נעים מאוד, אני <span className="text-orci-cyan font-bold">אור (Orci)</span>. המסע שלי התחיל בגיל 16, כשבניתי מאפס את <span className="text-orci-cyan font-bold">'oci Gaming'</span> -
                מותג תוכן שהגיע ל-<span className="text-orci-cyan font-bold">130,000 רשומים</span> ולמעלה מ-<span className="text-orci-cyan font-bold">25 מיליון צפיות</span>. שם למדתי מה זה אומר
                לייצר ערך, לבנות קהילה ולהפוך תשוקה לעסק.
              </p>

              <p>
                אחרי שנים של יצירת תוכן, עברתי לשדה הקרב. שירתי כמפקד וקצין במילואים (<span className="text-orci-cyan font-bold">סגן</span>)
                בחטיבת החילוץ וההצלה, והובלתי לוחמים במשימות מורכבות במלחמת 'חרבות ברזל'.
                הפיקוד לימד אותי <span className="text-orci-cyan font-bold">דיוק, אחריות ואיך לקבל החלטות תחת לחץ קיצוני</span>.
              </p>

              <p>
                היום, אני משלב את שני העולמות האלו ב-<span className="text-orci-cyan font-bold">Orci AI</span>. המשימה שלי היא להנגיש לכם את
                מהפכת ה-AI בצורה הכי פרקטית שיש, כדי שגם אתם תוכלו לייעל את העסק, לחסוך זמן
                וליצור תוכן מטורף בקלות.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="cap-card text-center">
              <div className="text-4xl md:text-5xl font-bold text-orci-cyan mb-2">130K+</div>
              <div className="text-gray-600">מנויים ביוטיוב</div>
            </div>

            <div className="cap-card text-center">
              <div className="text-4xl md:text-5xl font-bold text-orci-cyan mb-2">25M+</div>
              <div className="text-gray-600">צפיות סה"כ</div>
            </div>

            <div className="cap-card text-center">
              <div className="text-4xl md:text-5xl font-bold text-orci-cyan mb-2">10+</div>
              <div className="text-gray-600">שנות ניסיון ביצירת תוכן</div>
            </div>
          </div>

          {/* What I Do Section */}
          <div className="cap-card">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orci-cyan text-center">
              מה אני עושה?
            </h2>

            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                אני עוזר לבעלי עסקים ויזמים לנצל את כוח הבינה המלאכותית כדי:
              </p>
              <ul className="list-none space-y-3">
                <li className="pr-6 relative">
                  <span className="absolute right-0 text-orci-cyan">•</span>
                  <span className="text-orci-cyan font-bold">לייצר תוכן איכותי</span> שמושך קהל ומגדיל מכירות
                </li>
                <li className="pr-6 relative">
                  <span className="absolute right-0 text-orci-cyan">•</span>
                  <span className="text-orci-cyan font-bold">לחסוך שעות עבודה</span> עם אוטומציות חכמות
                </li>
                <li className="pr-6 relative">
                  <span className="absolute right-0 text-orci-cyan">•</span>
                  <span className="text-orci-cyan font-bold">לבנות מערכת שיווק</span> שעובדת 24/7
                </li>
                <li className="pr-6 relative">
                  <span className="absolute right-0 text-orci-cyan">•</span>
                  <span className="text-orci-cyan font-bold">להישאר מעודכנים</span> בטכנולוגיות החדשות ביותר
                </li>
              </ul>
            </div>
          </div>

        </div>
      </article>

      {/* CTA Section - Dark Card */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              בואו נעבוד ביחד
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              מעוניינים לשמוע איך AI יכול לקחת את העסק שלכם לשלב הבא?
            </p>
            <a
              href="https://wa.me/972542599107"
              target="_blank"
              rel="noopener noreferrer"
              className="cap-btn cap-btn-primary inline-flex"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              שלחו לי הודעה בוואטסאפ
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
