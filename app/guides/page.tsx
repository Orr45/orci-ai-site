'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { VideoModal } from '@/components/video/VideoModal';
import { GUIDE_VIDEOS } from '@/data/guides';

export default function GuidesPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Article guides (written guides)
  const articleGuides = [
    {
      id: 'ai-beginners',
      title: 'איך ליצור חפצים מדברים עם ה AI',
      description: 'למדו ליצור חפצים מדברים עם AI - מדריך שלב אחר שלב',
      url: '/guides/ai-beginners',
      category: 'יצירת תוכן',
    },
    {
      id: 'ai-influencer',
      title: 'איך ליצור משפיענית AI ב-60 שניות',
      description: 'מדריך מקיף ליצירת משפיענית AI שמדברת עברית ונראית אמיתית',
      url: '/guides/ai-influencer',
      category: 'יצירת תוכן',
    },
    {
      id: 'penguin-viral',
      title: 'איך יצרתי את טרנד הפינגווין הוויראלי',
      description: 'מדריך להפיכת טרנד קיים לוויראלי עם טוויסט ישראלי - 2.4M צפיות',
      url: '/guides/penguin-viral',
      category: 'יצירת תוכן',
    },
    {
      id: 'new-guide',
      title: 'איך ליצור את טרנד הריחוף',
      description: 'במדריך הזה תלמדו כיצד ליצור את הטרנד הריחוף, שלב אחר שלב',
      url: '/guides/new-guide',
      category: 'יצירת תוכן',
    },
    {
      id: 'new-guide-2',
      title: 'איך ליצור את טרנד הדמיות הנטושות',
      description: 'במדריך הזה אלמד אתכם צעד אחרי צעד כיצד תוכלו ליצור את טרנד הדמיות הנטושות',
      url: '/guides/new-guide-2',
      category: 'יצירת תוכן',
    }
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION - Cap4Learning Style */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="cap-card text-center">
            <h1 className="cap-hero-title mb-6">
              מרכז הלמידה שלנו
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              מדריכים מעשיים ב-AI, אוטומציה ושיווק דיגיטלי - כל מה שצריך כדי להצליח בעולם הדיגיטלי
            </p>
          </div>
        </div>
      </section>

      {/* WRITTEN GUIDES SECTION - 6-Card Grid */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="cap-card">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">מדריכים כתובים</h2>

            {/* 6 Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {articleGuides.map((guide) => (
                <Link key={guide.id} href={guide.url}>
                  <div className="cap-card-small min-h-[160px] flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs text-gray-500">{guide.category}</span>
                      <span className="text-orci-cyan text-sm font-medium">
                        קרא עוד ←
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO GUIDES SECTION - Grid Layout */}
      <section className="cap-section cap-section-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">מדריכי וידאו</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUIDE_VIDEOS.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video.url)}
                className="cap-card-small cursor-pointer min-h-[180px] flex flex-col justify-center"
              >
                <div className="mb-3">
                  <div className="w-12 h-12 bg-orci-cyan/20 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-orci-cyan" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-gray-800 leading-tight text-center mb-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {video.description}
                </p>
                <span className="text-orci-cyan text-sm font-medium mt-3 text-center block">
                  צפה בוידאו ←
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo || ''}
        title="מדריך וידאו"
      />

      <Footer />
    </div>
  );
}
