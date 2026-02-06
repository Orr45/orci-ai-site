'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface NewsSource {
  title: string;
  link: string;
  source: string;
}

interface DailyPulseData {
  summary: string;
  timestamp: string;
  sources: NewsSource[];
  lastUpdated: string;
  isEmpty?: boolean;
  isStale?: boolean;
}

interface ParsedNewsItem {
  title: string;
  content: string;
  orciTake: string;
}

function parseNewsItems(summary: string): ParsedNewsItem[] {
  return summary.split('•').filter(Boolean).map((bullet) => {
    const parts = bullet.split(/הזווית של Orci:?/i);
    const mainText = parts[0]?.trim() || '';
    const orciTake = parts[1]?.trim() || '';

    // Extract title (text before the first colon or period)
    const titleMatch = mainText.match(/^([^:.]+)[:.]/);
    const title = titleMatch ? titleMatch[1].trim() : '';
    const content = titleMatch ? mainText.slice(titleMatch[0].length).trim() : mainText;

    return { title, content, orciTake };
  });
}

export default function DailyPulse() {
  const [data, setData] = useState<DailyPulseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPulse() {
      try {
        const response = await fetch('/api/daily-pulse');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch daily pulse:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPulse();
  }, []);

  if (loading) {
    return (
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-100 rounded w-48 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse cap-card-small">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6 mb-6"></div>
                <div className="h-16 bg-gray-50 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.isEmpty || !data.summary) {
    return null;
  }

  const newsItems = parseNewsItems(data.summary);

  // Distribute sources across cards
  const getSourcesForCard = (index: number) => {
    if (!data.sources || data.sources.length === 0) return [];
    const perCard = Math.ceil(data.sources.length / newsItems.length);
    return data.sources.slice(index * perCard, (index + 1) * perCard);
  };

  return (
    <section className="cap-section cap-section-teal">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="relative">
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-orci-cyan opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orci-cyan"></span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              חדשות ה-AI של היום
            </h2>
          </div>
          <p className="text-gray-600 text-base">
            העדכונים החמים מעולם הבינה המלאכותית
          </p>
          {data.isStale && (
            <span className="text-yellow-600 text-xs mt-1 inline-block">(ממתין לעדכון)</span>
          )}
        </div>

        {/* News Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => {
            const cardSources = getSourcesForCard(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="cap-card-small flex flex-col border-t-4 border-orci-cyan/40"
              >
                {/* Card Header */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-orci-cyan/10 text-orci-cyan text-xs font-bold rounded-full mb-3">
                    עדכון {index + 1}
                  </span>
                  {item.title && (
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">
                      {item.title}
                    </h3>
                  )}
                </div>

                {/* Card Content */}
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {item.content}
                </p>

                {/* Orci's Take */}
                {item.orciTake && (
                  <div className="mt-4 p-3 bg-orci-cyan/5 border-r-4 border-orci-cyan rounded-lg">
                    <p className="text-xs font-bold text-orci-cyan mb-1">💡 הזווית של Orci</p>
                    <p className="text-gray-600 text-xs leading-relaxed">{item.orciTake}</p>
                  </div>
                )}

                {/* Source Links */}
                {cardSources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
                    {cardSources.map((source, sIdx) => (
                      <a
                        key={sIdx}
                        href={source.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 hover:bg-orci-cyan/10 hover:text-orci-cyan transition-colors"
                      >
                        {source.source}
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Timestamp */}
        <div className="mt-6 text-gray-400 text-xs text-center">
          עדכון אחרון: {data.timestamp}
        </div>
      </div>
    </section>
  );
}
