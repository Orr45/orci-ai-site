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

  // Don't render if no data or empty
  if (loading) {
    return (
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="cap-card">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
              <div className="h-64 bg-gray-100 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.isEmpty || !data.summary) {
    return null;
  }

  return (
    <section className="cap-section cap-section-teal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="cap-card">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orci-cyan">
              חדשות ה-AI של היום
            </h2>
            <p className="text-gray-600 text-lg">
              העדכונים החמים מעולם הבינה המלאכותית
            </p>
          </div>

          {/* Main Content */}
          <div className="border-2 border-orci-cyan/30 rounded-2xl p-6 md:p-8 bg-white">
            {/* Live Indicator */}
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="relative">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-orci-cyan opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orci-cyan"></span>
              </div>
              <span className="text-orci-cyan font-medium text-sm">עדכון יומי - 07:00 בבוקר</span>
              {data.isStale && (
                <span className="text-yellow-600 text-xs">(ממתין לעדכון)</span>
              )}
            </div>

            {/* Summary Content */}
            <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4">
              {data.summary.split('•').filter(Boolean).map((bullet, index) => {
                // Split by "הזווית של Orci" to style it differently
                const parts = bullet.split(/הזווית של Orci:?/i);
                const mainContent = parts[0]?.trim();
                const orciTake = parts[1]?.trim();

                return (
                  <div key={index} className="border-r-4 border-orci-cyan/30 pr-4">
                    {/* Main bullet content */}
                    <div className="mb-2">
                      <span className="text-orci-cyan font-bold">•</span>{' '}
                      {mainContent}
                    </div>
                    {/* Orci's take - styled differently */}
                    {orciTake && (
                      <div className="mt-3 p-4 bg-orci-cyan/5 border-l-4 border-orci-cyan rounded-lg">
                        <span className="text-orci-cyan font-bold text-sm">💡 הזווית של Orci: </span>
                        <span className="text-gray-600 text-sm">{orciTake}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sources */}
            {data.sources && data.sources.length > 0 && (
              <div className="border-t border-gray-200 pt-6 mt-6">
                <p className="text-gray-500 text-sm mb-3 font-medium">מקורות:</p>
                <div className="flex flex-wrap gap-2">
                  {data.sources.slice(0, 5).map((source, index) => (
                    <a
                      key={index}
                      href={source.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cap-badge text-xs hover:bg-orci-cyan/10 hover:text-orci-cyan transition-colors"
                    >
                      {source.source}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Timestamp */}
            <div className="mt-6 text-gray-400 text-xs text-center">
              עדכון אחרון: {data.timestamp}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
