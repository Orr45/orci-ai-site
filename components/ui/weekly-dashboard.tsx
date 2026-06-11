'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarDays, Zap, ArrowLeft } from 'lucide-react';
import { WeeklyDashboardData, WeeklyItem } from '@/types';
import WeeklyCard from './weekly-card';
import WeeklyModal from './weekly-modal';

const CATEGORIES = ['הכל', 'כלים חדשים', 'עדכוני גרסה', 'חדשות גדולות', 'טרנדים', 'מחקר'] as const;

const CATEGORY_DOT: Record<string, string> = {
  'כלים חדשים':    '#00FFD1',
  'עדכוני גרסה':   '#c084fc',
  'חדשות גדולות':  '#f87171',
  'טרנדים':        '#fb923c',
  'מחקר':          '#4ade80',
};

interface WeeklyDashboardClientProps {
  data: WeeklyDashboardData;
}

export default function WeeklyDashboardClient({ data }: WeeklyDashboardClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('הכל');
  const [selectedItem, setSelectedItem] = useState<WeeklyItem | null>(null);

  const filtered = activeCategory === 'הכל'
    ? data.items
    : data.items.filter(item => item.category === activeCategory);

  const hotItems = filtered.filter(i => i.isHot);
  const restItems = filtered.filter(i => !i.isHot);

  const formattedDate = new Date(data.updatedAt).toLocaleDateString('he-IL', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(180deg, #0D0D1A 0%, #08142a 100%)' }}
    >
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(0,255,209,0.1)', background: 'rgba(13,13,26,0.9)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm mb-6 transition-colors"
            style={{ color: '#4a6a8a' }}
          >
            <ArrowLeft className="w-4 h-4" />
            חזרה לבית
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-3"
                style={{ background: 'rgba(0,255,209,0.1)', border: '1px solid rgba(0,255,209,0.3)', color: '#00FFD1' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orci-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orci-cyan" />
                </span>
                עדכון שבועי
              </div>

              <h1 className="text-3xl md:text-5xl font-black mb-2" style={{ color: '#ffffff' }}>
                🔥 {data.weekTitle}
              </h1>
              <p className="text-base" style={{ color: '#5a7a9a' }}>
                כל מה שיצא בעולם ה-AI השבוע — {data.items.length} עדכונים
              </p>
            </div>

            <div
              className="flex items-center gap-2 text-sm self-start md:self-end"
              style={{ color: '#4a6a8a' }}
            >
              <CalendarDays className="w-4 h-4" />
              עודכן: {formattedDate}
            </div>
          </div>

          {/* Category filter tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto scrollbar-none pb-1">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              const count = cat === 'הכל'
                ? data.items.length
                : data.items.filter(i => i.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0"
                  style={{
                    background: isActive ? 'rgba(0,255,209,0.15)' : 'rgba(255,255,255,0.04)',
                    border: isActive ? '1px solid rgba(0,255,209,0.4)' : '1px solid rgba(255,255,255,0.06)',
                    color: isActive ? '#00FFD1' : '#5a7a9a',
                  }}
                >
                  {cat !== 'הכל' && (
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: CATEGORY_DOT[cat] }}
                    />
                  )}
                  {cat}
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{ background: isActive ? 'rgba(0,255,209,0.2)' : 'rgba(255,255,255,0.06)', color: isActive ? '#00FFD1' : '#4a6a8a' }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
        {/* Hot items row */}
        {hotItems.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4" style={{ color: '#f87171' }} />
              <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#f87171' }}>
                חם השבוע
              </h2>
            </div>
            <div className={`grid gap-5 ${hotItems.length === 1 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : hotItems.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {hotItems.map((item, i) => (
                <WeeklyCard key={item.id} item={item} onClick={setSelectedItem} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Rest of items */}
        {restItems.length > 0 && (
          <section>
            {hotItems.length > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1" style={{ background: 'rgba(0,255,209,0.1)' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4a6a8a' }}>עוד עדכונים</span>
                <div className="h-px flex-1" style={{ background: 'rgba(0,255,209,0.1)' }} />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {restItems.map((item, i) => (
                <WeeklyCard key={item.id} item={item} onClick={setSelectedItem} index={hotItems.length + i} />
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-5xl mb-4">🤔</p>
            <p className="text-lg" style={{ color: '#4a6a8a' }}>אין פריטים בקטגוריה זו השבוע</p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <WeeklyModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
