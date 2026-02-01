'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { VideoGrid } from '@/components/video/VideoGrid';
import { VideoModal } from '@/components/video/VideoModal';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { Footer } from '@/components/layout/Footer';
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
      icon: '📝'
    },
    {
      id: 'new-guide',
      title: 'שם המדריך החדש',
      description: 'תיאור קצר של המדריך החדש',
      url: '/guides/new-guide',
      category: 'קטגוריה',
      icon: '🚀'
    }
    // Add more article guides here as you create them
  ];

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

      {/* Article Guides Section */}
      <section className="py-10 px-4 pb-10">
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-orci-cyan to-orci-blue">
              מדריכים כתובים
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articleGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={guide.url}>
                  <GlassmorphicCard className="group h-full p-6 hover:border-orci-cyan/50 transition-all duration-300 cursor-pointer">
                    <div className="text-5xl mb-4">{guide.icon}</div>
                    <h3 className="text-2xl font-bold mb-3 text-orci-cyan group-hover:text-orci-blue transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{guide.category}</span>
                      <span className="text-orci-cyan group-hover:translate-x-[-4px] transition-transform">
                        ←
                      </span>
                    </div>
                  </GlassmorphicCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="py-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-orci-cyan to-orci-blue">
              מדריכי וידאו
            </span>
          </h2>

          <VideoGrid
            videos={GUIDE_VIDEOS}
            onVideoClick={setSelectedVideo}
          />
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
