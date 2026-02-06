'use client';

import Link from "next/link";
import { CleanCard } from '@/components/ui/CleanCard';
import { Footer } from '@/components/layout/Footer';
import DailyPulse from '@/components/news/DailyPulse';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">
              הופכים בינה מלאכותית
            </span>
            <br />
            <span className="text-gray-900">
              לכלי העבודה החזק ביותר שלכם
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            המדריכים, הכלים והסודות שיעזרו לכם לשלוט ב-AI - בפשטות ובגובה העיניים
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/guides">
              <button className="btn-primary">
                מדריכי AI חינמיים
              </button>
            </Link>
            <Link href="/products">
              <button className="btn-outline">
                חבילת השיווק החכם
              </button>
            </Link>
            <Link href="/contact">
              <button className="btn-outline">
                בואו נדבר
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CleanCard variant="hover" className="text-center">
              <div className="text-5xl mb-3">🚀</div>
              <div className="text-4xl font-bold text-gradient mb-2">2.4M+</div>
              <div className="text-gray-600">צפיות בטרנדים ויראליים</div>
            </CleanCard>

            <CleanCard variant="hover" className="text-center">
              <div className="text-5xl mb-3">📺</div>
              <div className="text-4xl font-bold text-gradient mb-2">130K+</div>
              <div className="text-gray-600">מנויים ביוטיוב</div>
            </CleanCard>

            <CleanCard variant="hover" className="text-center">
              <div className="text-5xl mb-3">🎯</div>
              <div className="text-4xl font-bold text-gradient mb-2">10+</div>
              <div className="text-gray-600">שנות ניסיון ביצירת תוכן</div>
            </CleanCard>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-gradient">מה אני עושה?</span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            עוזר לעסקים ויזמים לנצל את הפוטנציאל של AI למיקסום הצמיחה והיעילות
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/guides">
              <CleanCard variant="hover" className="h-full">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-gradient mb-3">
                  מדריכי AI בחינם
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  למדו ליצור תוכן ויראלי, משפיענית AI, אוטומציות ועוד - הכל בעברית ובגובה העיניים
                </p>
                <span className="text-orci-cyan font-medium inline-flex items-center gap-2">
                  למדריכים
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
              </CleanCard>
            </Link>

            <Link href="/products">
              <CleanCard variant="hover" className="h-full">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-gradient mb-3">
                  ליווי אישי לעסק
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  אסטרטגיה, אוטומציות, תוכן ויראלי וליווי צמוד - כל מה שצריך כדי לצמוח עם AI
                </p>
                <span className="text-orci-cyan font-medium inline-flex items-center gap-2">
                  לפרטים
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
              </CleanCard>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link href="/about" className="text-orci-cyan hover:text-orci-blue text-lg font-medium transition-colors inline-flex items-center gap-2">
              רוצים לדעת עוד עליי?
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Daily Pulse */}
      <section className="py-16 px-4 bg-white">
        <DailyPulse />
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <CleanCard padding="lg" className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">
                מוכנים להתחיל?
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-8">
              בואו נדבר על איך AI יכול לקחת את העסק שלכם לשלב הבא
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="btn-primary inline-flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  שלחו לי הודעה עכשיו
                </button>
              </Link>
              <Link href="/portfolio">
                <button className="btn-outline">
                  ראו עבודות שלי
                </button>
              </Link>
            </div>
          </CleanCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
