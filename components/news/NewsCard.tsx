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
            </div>
          )}

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-bold text-white mb-2 leading-snug line-clamp-2 group-hover:text-orci-cyan transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-gray-300 mb-3 leading-relaxed line-clamp-3">
              {item.description}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{item.source}</span>
              <span>{item.date}</span>
            </div>
          </div>
        </GlassmorphicCard>
      </a>
    </motion.div>
  );
}
