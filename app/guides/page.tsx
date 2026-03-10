'use client';

import { Footer } from '@/components/layout/Footer';
import { GUIDES } from '@/data/guides';
import { NetflixGuideRow } from '@/components/ui/netflix-guide-row';

export default function GuidesPage() {
  // Organize guides by category
  const viralGuides = GUIDES.filter(g => g.category === 'וידאו ויראלי' && g.videoUrl);
  const contentGuides = GUIDES.filter(g => g.category === 'יצירת תוכן' && g.videoUrl);
  const popularGuides = GUIDES.filter(g => g.popular && g.videoUrl);
  const allGuidesWithVideo = GUIDES.filter(g => g.videoUrl);

  return (
    <div className="min-h-screen" style={{ background: '#050d1a' }}>

      {/* HERO */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="cap-hero-title mb-4" style={{ color: '#e8f4ff' }}>
            מרכז הלמידה שלנו
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#b0d0f0' }}>
            מדריכים ויזואליים שילמדו אתכם ליצור תוכן AI ויראלי בדקות ספורות
          </p>
        </div>
      </section>

      {/* NETFLIX-STYLE ROWS */}
      <section className="py-12">
        {/* Popular Guides First */}
        {popularGuides.length > 0 && (
          <NetflixGuideRow
            title="פופולרי ביותר"
            guides={popularGuides}
            emoji="🔥"
          />
        )}

        {/* Viral Content Guides */}
        {viralGuides.length > 0 && (
          <NetflixGuideRow
            title="וידאו ויראלי"
            guides={viralGuides}
            emoji="🎬"
          />
        )}

        {/* Content Creation Guides */}
        {contentGuides.length > 0 && (
          <NetflixGuideRow
            title="יצירת תוכן AI"
            guides={contentGuides}
            emoji="🎨"
          />
        )}

        {/* All Guides (fallback) */}
        {allGuidesWithVideo.length > 0 && (
          <NetflixGuideRow
            title="כל המדריכים"
            guides={allGuidesWithVideo}
            emoji="📚"
          />
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-center shadow-2xl border border-orci-cyan/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              רוצים לשלב AI בעסק שלכם?
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              בואו נדבר על איך AI יכול לקחת את העסק שלכם קדימה
            </p>
            <a
              href="https://wa.me/972542599107"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orci-cyan text-white font-bold rounded-xl hover:bg-orci-blue transition-colors shadow-lg hover:shadow-orci-cyan/50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              בואו נדבר בוואטסאפ
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
