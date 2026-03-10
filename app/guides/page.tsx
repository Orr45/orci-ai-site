'use client';

import { useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { VideoModal } from '@/components/video/VideoModal';
import { GUIDE_VIDEOS } from '@/data/guides';
import TutorialGrid from '@/components/ui/tutorial-grid';

export default function GuidesPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: '#050d1a' }}>

      {/* HERO */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="cap-hero-title mb-4" style={{ color: '#e8f4ff' }}>
            מרכז הלמידה שלנו
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#b0d0f0' }}>
            מדריכים מעשיים ב-AI, אוטומציה ושיווק דיגיטלי
          </p>
        </div>
      </section>

      {/* WRITTEN GUIDES - with email gate */}
      <section className="cap-section cap-section-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#e8f4ff' }}>מדריכים כתובים</h2>
            <p className="text-sm" style={{ color: '#b0d0f0' }}>2 מדריכים ראשונים חינם — שאר המדריכים נפתחים עם אימייל</p>
          </div>
          <TutorialGrid />
        </div>
      </section>

      {/* VIDEO GUIDES */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: '#e8f4ff' }}>
            מדריכי וידאו
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUIDE_VIDEOS.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video.url)}
                className="cap-card-small cursor-pointer min-h-[180px] flex flex-col justify-center"
              >
                <div className="mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ background: 'rgba(0,209,255,0.15)' }}>
                    <svg className="w-6 h-6 text-orci-cyan" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-base font-semibold leading-tight text-center mb-2" style={{ color: '#e8f4ff' }}>
                  {video.title}
                </h3>
                <p className="text-sm text-center leading-relaxed" style={{ color: '#b0d0f0' }}>
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
