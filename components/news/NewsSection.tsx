'use client';

import { useEffect, useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { NewsCard } from './NewsCard';
import type { NewsItem } from '@/types';

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!loading && news.length === 0) return null;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader>חדשות AI</SectionHeader>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <GlassmorphicCard key={i} className="p-0 overflow-hidden animate-pulse">
                <div className="w-full bg-gray-700" style={{ aspectRatio: '16/9' }} />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-700 rounded w-full" />
                  <div className="h-4 bg-gray-700 rounded w-1/2" />
                </div>
              </GlassmorphicCard>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <NewsCard key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
