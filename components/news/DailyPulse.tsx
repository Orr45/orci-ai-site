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
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700/50 rounded w-64 mx-auto mb-8"></div>
            <div className="h-64 bg-gray-700/30 rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.isEmpty || !data.summary) {
    return null;
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-l from-orci-cyan to-orci-blue bg-clip-text text-transparent">
              חדשות ה-AI של היום
            </span>
          </h2>
          <p className="text-white bg-orci-blue/30 inline-block px-6 py-3 rounded-xl">
            העדכונים החמים מעולם הבינה המלאכותית
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orci-cyan/30 to-orci-blue/30 rounded-3xl blur-xl opacity-50"></div>

          {/* Card */}
          <div className="relative backdrop-blur-xl bg-gray-900/70 border border-orci-cyan/30 rounded-2xl p-8 md:p-10 shadow-2xl">
            {/* Live Indicator */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-orci-cyan opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orci-cyan"></span>
              </div>
              <span className="text-orci-cyan font-medium text-sm">עדכון יומי</span>
              {data.isStale && (
                <span className="text-yellow-500 text-xs">(ממתין לעדכון)</span>
              )}
            </div>

            {/* Summary Content */}
            <div className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 space-y-6">
              {data.summary.split('•').filter(Boolean).map((bullet, index) => {
                // Split by "הזווית של Orci" to style it differently
                const parts = bullet.split(/הזווית של Orci:?/i);
                const mainContent = parts[0]?.trim();
                const orciTake = parts[1]?.trim();

                return (
                  <div key={index} className="border-r-2 border-orci-cyan/50 pr-4">
                    {/* Main bullet content */}
                    <div className="mb-2">
                      <span className="text-orci-cyan font-bold">•</span>{' '}
                      {mainContent}
                    </div>
                    {/* Orci's take - styled differently */}
                    {orciTake && (
                      <div className="mt-3 p-4 bg-orci-cyan/10 border border-orci-cyan/20 rounded-xl">
                        <span className="text-orci-cyan font-bold text-base">הזווית של Orci: </span>
                        <span className="text-gray-300 text-base">{orciTake}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sources */}
            {data.sources && data.sources.length > 0 && (
              <div className="border-t border-gray-700/50 pt-6">
                <p className="text-gray-400 text-sm mb-3">מקורות:</p>
                <div className="flex flex-wrap gap-2">
                  {data.sources.slice(0, 5).map((source, index) => (
                    <a
                      key={index}
                      href={source.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 bg-gray-800/50 hover:bg-orci-cyan/20 border border-gray-700/50 hover:border-orci-cyan/50 rounded-full text-gray-400 hover:text-orci-cyan transition-all duration-200"
                    >
                      {source.source}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Timestamp */}
            <div className="mt-6 text-gray-500 text-sm text-left">
              עדכון אחרון: {data.timestamp}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
