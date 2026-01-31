'use client';

import { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { VideoGrid } from '@/components/video/VideoGrid';
import { VideoModal } from '@/components/video/VideoModal';
import { Footer } from '@/components/layout/Footer';
import { GUIDE_VIDEOS } from '@/data/guides';

export default function GuidesPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <SectionHeader>מרכז הלמידה שלי</SectionHeader>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          מדריכים מעשיים ב-AI, אוטומציה ושיווק דיגיטלי.
          <br />
          כל מה שצריך כדי להצליח בעולם הדיגיטלי.
        </p>
      </section>

      {/* Video Grid Section */}
      <section className="py-10 px-4 pb-20">
        <VideoGrid
          videos={GUIDE_VIDEOS}
          onVideoClick={setSelectedVideo}
        />
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
