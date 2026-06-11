'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { WeeklyItem } from '@/types';

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'כלים חדשים':    { bg: 'rgba(0,255,209,0.12)',   text: '#00FFD1',  border: 'rgba(0,255,209,0.35)' },
  'עדכוני גרסה':   { bg: 'rgba(83,74,183,0.12)',  text: '#c084fc',  border: 'rgba(83,74,183,0.35)' },
  'חדשות גדולות':  { bg: 'rgba(239,68,68,0.12)',   text: '#f87171',  border: 'rgba(239,68,68,0.35)' },
  'טרנדים':        { bg: 'rgba(249,115,22,0.12)',  text: '#fb923c',  border: 'rgba(249,115,22,0.35)' },
  'מחקר':          { bg: 'rgba(34,197,94,0.12)',   text: '#4ade80',  border: 'rgba(34,197,94,0.35)' },
};

interface WeeklyCardProps {
  item: WeeklyItem;
  onClick: (item: WeeklyItem) => void;
  index: number;
}

export default function WeeklyCard({ item, onClick, index }: WeeklyCardProps) {
  const colors = CATEGORY_COLORS[item.category] ?? CATEGORY_COLORS['כלים חדשים'];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={() => onClick(item)}
      className="group relative cursor-pointer rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: 'rgba(8,18,32,0.85)',
        border: '1px solid rgba(0,255,209,0.1)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(12px)',
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(0,255,209,0.15), 0 0 0 1px rgba(0,255,209,0.25)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden flex-shrink-0">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-6xl"
            style={{ background: 'linear-gradient(135deg, rgba(0,255,209,0.08), rgba(83,74,183,0.08))' }}
          >
            {item.emoji}
          </div>
        )}

        {/* Hot badge overlay */}
        {item.isHot && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ background: 'rgba(239,68,68,0.9)', color: '#fff', backdropFilter: 'blur(8px)' }}
          >
            🔥 חם
          </div>
        )}

        {/* New badge overlay */}
        {item.isNew && !item.isHot && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ background: 'rgba(0,255,209,0.85)', color: '#0D0D1A', backdropFilter: 'blur(8px)' }}
          >
            ✨ חדש
          </div>
        )}

        {/* Gradient overlay bottom */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[rgba(8,18,32,0.9)] to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Category badge */}
        <span
          className="self-start text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
        >
          {item.category}
        </span>

        {/* Title */}
        <h3
          className="font-bold text-base leading-snug line-clamp-2 group-hover:text-orci-cyan transition-colors"
          style={{ color: '#ffffff' }}
        >
          {item.title}
        </h3>

        {/* Summary */}
        <p className="text-sm leading-relaxed line-clamp-3 flex-1" style={{ color: '#7a9bc0' }}>
          {item.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'rgba(0,255,209,0.08)' }}>
          <span className="text-xs" style={{ color: '#4a6a8a' }}>{item.source}</span>
          <span className="text-xs font-medium" style={{ color: '#00FFD1' }}>קרא עוד ›</span>
        </div>
      </div>
    </motion.article>
  );
}
