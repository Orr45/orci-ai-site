'use client';

import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import type { NewsItem } from '@/types';

interface NewsCardProps {
  item: NewsItem;
  index: number;
}

export function NewsCard({ item, index }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
        <GlassmorphicCard className="group h-full p-0 overflow-hidden hover:border-orci-cyan/50 transition-all duration-300 cursor-pointer">
          {/* Image */}
          {item.imageUrl && (
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* Time Badge */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-orci-cyan text-xs font-bold px-3 py-1 rounded-full">
                {item.date}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-5">
            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2 leading-snug line-clamp-2 group-hover:text-orci-cyan transition-colors">
              {item.title}
            </h3>

            {/* Bottom Line */}
            {item.bottomLine && (
              <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                {item.bottomLine}
              </p>
            )}

            {/* Bullet Points */}
            {item.bullets && item.bullets.length > 0 && (
              <ul className="text-sm text-gray-400 mb-4 space-y-1">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-orci-cyan mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Orci's Take */}
            {item.orciTake && (
              <div className="bg-orci-cyan/10 border border-orci-cyan/20 rounded-lg p-3 mb-3">
                <p className="text-sm text-orci-cyan font-medium">
                  💡 הזווית של Orci
                </p>
                <p className="text-sm text-gray-200 mt-1">
                  {item.orciTake}
                </p>
              </div>
            )}

            {/* Source */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700/50">
              <span>{item.source}</span>
              <span className="text-orci-cyan group-hover:translate-x-[-4px] transition-transform">
                קרא עוד ←
              </span>
            </div>
          </div>
        </GlassmorphicCard>
      </a>
    </motion.div>
  );
}
