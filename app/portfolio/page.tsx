'use client';

import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Cap4Learning Style */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="cap-card text-center">
            <h1 className="cap-hero-title mb-6 text-orci-cyan">
              עבודות שלי
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              דברים שיצרתי עם AI - מטרנדים ויראליים ועד כלים מתקדמים
            </p>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="cap-section cap-section-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">סרטונים ויראליים</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Video 1 */}
            <div className="cap-card p-4">
              <div className="relative w-full rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '9/16' }}>
                <iframe
                  src="https://www.youtube.com/embed/lxrvd_y8tPI?rel=0"
                  title="חפצים מדברים עם AI"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-orci-cyan mb-2">חפצים מדברים עם AI</h3>
              <p className="text-gray-600 mb-3">טרנד ויראלי שיצרתי עם כלי AI מתקדמים</p>
              <Link href="/guides/ai-beginners">
                <span className="text-orci-cyan hover:text-orci-blue text-sm font-medium cursor-pointer">
                  קרא את המדריך המלא ←
                </span>
              </Link>
            </div>

            {/* Video 2 */}
            <div className="cap-card p-4">
              <div className="relative w-full rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '9/16' }}>
                <iframe
                  src="https://www.youtube.com/embed/edKRPVP1sWs?rel=0"
                  title="AI Video 2"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-orci-cyan mb-2">תוכן AI מתקדם</h3>
              <p className="text-gray-600">עוד דוגמה ליכולות של AI ביצירת תוכן</p>
            </div>

            {/* Placeholder */}
            <div className="cap-card p-4 border-2 border-orci-cyan">
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🎬</div>
                  <h3 className="text-xl font-bold text-orci-cyan mb-3">פרויקט הבא בקרוב</h3>
                  <p className="text-gray-600">עוד תוכן מטורף בדרך...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">הישגים</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="cap-card text-center">
                <div className="text-4xl mb-3">🚀</div>
                <div className="text-3xl font-bold text-orci-cyan mb-2">2.4M+</div>
                <div className="text-gray-600">צפיות בטרנד הפינגווין</div>
              </div>

              <div className="cap-card text-center">
                <div className="text-4xl mb-3">📺</div>
                <div className="text-3xl font-bold text-orci-cyan mb-2">25M+</div>
                <div className="text-gray-600">צפיות סה"כ בערוץ</div>
              </div>

              <div className="cap-card text-center">
                <div className="text-4xl mb-3">👥</div>
                <div className="text-3xl font-bold text-orci-cyan mb-2">130K+</div>
                <div className="text-gray-600">מנויים ביוטיוב</div>
              </div>

              <div className="cap-card text-center">
                <div className="text-4xl mb-3">🎯</div>
                <div className="text-3xl font-bold text-orci-cyan mb-2">10+</div>
                <div className="text-gray-600">מדריכי AI מתקדמים</div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">התמחות</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="cap-card">
                <h3 className="text-2xl font-bold text-orci-cyan mb-4">כלי AI שאני משתמש בהם</h3>
                <div className="space-y-2 text-gray-700">
                  <p>• ChatGPT & GPT-4 - יצירת תוכן ואוטומציות</p>
                  <p>• Midjourney & DALL-E - יצירת תמונות</p>
                  <p>• Kling 2.6 - הנפשת וידאו</p>
                  <p>• Nano Banana Pro - יצירת דמויות</p>
                  <p>• ElevenLabs - יצירת קול</p>
                  <p>• Gemini - ניתוח וכתיבת פרומפטים</p>
                </div>
              </div>

              <div className="cap-card">
                <h3 className="text-2xl font-bold text-orci-cyan mb-4">שירותים שאני מציע</h3>
                <div className="space-y-2 text-gray-700">
                  <p>• ייעוץ אסטרטגי בשימוש ב-AI</p>
                  <p>• הקמת אוטומציות שיווקיות</p>
                  <p>• יצירת תוכן ויראלי</p>
                  <p>• הדרכות אישיות ל-AI</p>
                  <p>• בניית מערכות תוכן אוטומטיות</p>
                  <p>• ליווי צמוד ותמיכה מלאה</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Dark Card */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              רוצים פרויקט דומה?
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              בואו נדבר על איך אני יכול לעזור לכם ליצור תוכן מטורף עם AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/972542599107"
                target="_blank"
                rel="noopener noreferrer"
                className="cap-btn cap-btn-primary inline-flex"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                שלחו לי הודעה
              </a>
              <Link href="/guides" className="cap-btn cap-btn-secondary">
                לכל המדריכים
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
