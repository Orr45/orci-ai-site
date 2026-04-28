'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ExternalLink, Share2 } from 'lucide-react';
import { WeeklyItem } from '@/types';

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'כלים חדשים':    { bg: 'rgba(0,209,255,0.12)',   text: '#00d1ff',  border: 'rgba(0,209,255,0.35)' },
  'עדכוני גרסה':   { bg: 'rgba(168,85,247,0.12)',  text: '#c084fc',  border: 'rgba(168,85,247,0.35)' },
  'חדשות גדולות':  { bg: 'rgba(239,68,68,0.12)',   text: '#f87171',  border: 'rgba(239,68,68,0.35)' },
  'טרנדים':        { bg: 'rgba(249,115,22,0.12)',  text: '#fb923c',  border: 'rgba(249,115,22,0.35)' },
  'מחקר':          { bg: 'rgba(34,197,94,0.12)',   text: '#4ade80',  border: 'rgba(34,197,94,0.35)' },
};

interface WeeklyModalProps {
  item: WeeklyItem | null;
  onClose: () => void;
}

export default function WeeklyModal({ item, onClose }: WeeklyModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    if (item) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [item]);

  const shareOnWhatsApp = (item: WeeklyItem) => {
    const text = `${item.title}\n\n${item.summary}\n\nקרא עוד: ${item.link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const colors = item ? (CATEGORY_COLORS[item.category] ?? CATEGORY_COLORS['כלים חדשים']) : null;

  return (
    <AnimatePresence>
      {item && colors && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[9000]"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="fixed inset-x-4 bottom-4 top-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[680px] md:top-[5%] md:bottom-[5%] z-[9001] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(6,14,28,0.98)',
              border: '1px solid rgba(0,209,255,0.18)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,209,255,0.08)',
            }}
          >
            {/* Image */}
            <div className="relative w-full aspect-video flex-shrink-0">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="680px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-8xl"
                  style={{ background: 'linear-gradient(135deg, rgba(0,209,255,0.06), rgba(168,85,247,0.06))' }}
                >
                  {item.emoji}
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(6,14,28,0.98)] to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex flex-col gap-5 p-5 overflow-y-auto flex-1">
              {/* Category + badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                >
                  {item.category}
                </span>
                {item.isHot && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.4)' }}>
                    🔥 חם השבוע
                  </span>
                )}
                {item.isNew && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,209,255,0.12)', color: '#00d1ff', border: '1px solid rgba(0,209,255,0.3)' }}>
                    ✨ חדש
                  </span>
                )}
                <span className="text-xs mr-auto" style={{ color: '#4a6a8a' }}>{item.source}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold leading-snug" style={{ color: '#e8f4ff' }}>
                {item.title}
              </h2>

              {/* Details */}
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#9ab8d8' }}>
                {item.details}
              </p>

              {/* Orci Take */}
              <div
                className="rounded-xl p-4"
                style={{ background: 'rgba(0,209,255,0.06)', border: '1px solid rgba(0,209,255,0.2)' }}
              >
                <p className="text-xs font-bold mb-2" style={{ color: '#00d1ff' }}>💡 הזווית של Orci</p>
                <p className="text-sm leading-relaxed" style={{ color: '#b8d8f0' }}>
                  {item.orciTake}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-1">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
                  style={{ background: 'rgba(0,209,255,0.15)', color: '#00d1ff', border: '1px solid rgba(0,209,255,0.35)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,209,255,0.25)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,209,255,0.15)'; }}
                >
                  <ExternalLink className="w-4 h-4" />
                  קרא באתר המקור
                </a>
                <button
                  onClick={() => shareOnWhatsApp(item)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all"
                  style={{ background: 'rgba(37,211,102,0.12)', color: '#25d366', border: '1px solid rgba(37,211,102,0.3)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.22)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.12)'; }}
                >
                  <Share2 className="w-4 h-4" />
                  שתף
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
