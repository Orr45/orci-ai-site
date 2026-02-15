'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { VideoModal } from '@/components/video/VideoModal';
import { GUIDE_VIDEOS } from '@/data/guides';
import InteractiveBentoGallery from '@/components/ui/interactive-bento-gallery';

export default function GuidesPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const guideMediaItems = [
    {
      id: 1,
      type: "image",
      title: "איך ליצור חפצים מדברים עם AI",
      desc: "למדו ליצור חפצים מדברים עם AI - מדריך שלב אחר שלב",
      url: "/guides/guide-talking-objects.png",
      span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
      href: "/guides/ai-beginners",
    },
    {
      id: 2,
      type: "image",
      title: "יצירת משפיענית AI ב-60 שניות",
      desc: "מדריך מקיף ליצירת משפיענית AI שמדברת עברית ונראית אמיתית",
      url: "/guides/guide-ai-influencer.png",
      span: "md:col-span-2 md:row-span-3 sm:col-span-1 sm:row-span-2",
      href: "/guides/ai-influencer",
    },
    {
      id: 3,
      type: "image",
      title: "טרנד הפינגווין הוויראלי",
      desc: "מדריך להפיכת טרנד קיים לוויראלי עם טוויסט ישראלי",
      url: "/guides/guide-penguin-viral.png",
      span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
      href: "/guides/penguin-viral",
    },
    {
      id: 4,
      type: "image",
      title: "איך ליצור את טרנד הריחוף",
      desc: "במדריך הזה תלמדו כיצד ליצור את הטרנד הריחוף, שלב אחר שלב",
      url: "/guides/guide-floating-trend.png",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
      href: "/guides/new-guide",
    },
    {
      id: 5,
      type: "image",
      title: "טרנד הדמיות הנטושות",
      desc: "צעד אחרי צעד כיצד תוכלו ליצור את טרנד הדמיות הנטושות",
      url: "/guides/guide-abandoned-figures.png",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
      href: "/guides/new-guide-2",
    },
    {
      id: 6,
      type: "image",
      title: "טריק הרכב המיניאטורי",
      desc: "הטריק שמשגע את הרשת - בלי אפקטים מיוחדים, רק 2 סרטונים פשוטים",
      url: "/guides/guide-abandoned-figures.png",
      span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
      href: "/guides/car-miniature",
    },
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

      {/* WRITTEN GUIDES SECTION - Interactive Bento Gallery */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <InteractiveBentoGallery
            mediaItems={guideMediaItems}
            title="מדריכים כתובים"
            description="גררו וחקרו את אוסף המדריכים שלנו - לחצו על מדריך כדי לקרוא עוד"
          />
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
