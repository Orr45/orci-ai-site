'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, ChevronDown, ChevronUp, TrendingUp, Clock, Grid } from 'lucide-react';
import { GUIDES, type GuideData } from '@/data/guides';
import EmailGateModal, { isContentUnlocked, UNLOCK_KEY } from '@/components/ui/email-gate-modal';

type FilterType = 'all' | 'popular' | 'new';

export default function TutorialGrid() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>('all');
  const [unlocked, setUnlocked] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [pendingGuide, setPendingGuide] = useState<GuideData | null>(null);
  const [expandedSummary, setExpandedSummary] = useState<string | null>(null);

  useEffect(() => {
    setUnlocked(isContentUnlocked());

    // Cross-tab: storage event
    const onStorage = () => setUnlocked(isContentUnlocked());
    // Same-page: fired by hero email field or modal after unlock
    const onCustomUnlock = () => setUnlocked(true);

    window.addEventListener('storage', onStorage);
    window.addEventListener('orci-unlocked', onCustomUnlock);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('orci-unlocked', onCustomUnlock);
    };
  }, []);

  const filteredGuides = GUIDES.filter((g) => {
    if (filter === 'popular') return g.popular;
    if (filter === 'new') return g.isNew;
    return true;
  });

  const handleCardClick = useCallback((guide: GuideData) => {
    if (guide.free || unlocked) {
      router.push(guide.href);
    } else {
      setPendingGuide(guide);
      setGateOpen(true);
    }
  }, [unlocked, router]);

  const handleUnlock = useCallback(() => {
    setUnlocked(true);
    if (pendingGuide) {
      router.push(pendingGuide.href);
      setPendingGuide(null);
    }
  }, [pendingGuide, router]);

  const toggleSummary = (e: React.MouseEvent, guideId: string) => {
    e.stopPropagation();
    setExpandedSummary((prev) => (prev === guideId ? null : guideId));
  };

  const filters: { key: FilterType; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'כל המדריכים', icon: <Grid className="w-3.5 h-3.5" /> },
    { key: 'popular', label: 'תוכן פופולרי', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { key: 'new', label: 'נוספו לאחרונה', icon: <Clock className="w-3.5 h-3.5" /> },
  ];

  return (
    <>
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {filters.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`filter-btn flex items-center gap-1.5 ${filter === key ? 'filter-btn-active' : ''}`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredGuides.map((guide, i) => {
            const isLocked = !guide.free && !unlocked;
            const summaryOpen = expandedSummary === guide.id;

            return (
              <motion.div
                key={guide.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06 }}
                className="tutorial-card group relative flex flex-col"
                style={{ cursor: 'pointer' }}
              >
                {/* Badges */}
                <div className="absolute top-3 right-3 z-10 flex gap-1.5">
                  {guide.popular && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                      style={{ background: 'rgba(0,209,255,0.15)', border: '1px solid rgba(0,209,255,0.4)', color: '#00d1ff' }}
                    >
                      <TrendingUp className="w-3 h-3" /> פופולרי
                    </span>
                  )}
                  {guide.isNew && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', color: '#a78bfa' }}
                    >
                      חדש
                    </span>
                  )}
                </div>

                {/* Lock badge */}
                {isLocked && (
                  <div className="absolute top-3 left-3 z-10">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(5,13,26,0.8)', border: '1px solid rgba(0,209,255,0.25)' }}
                    >
                      <Lock className="w-3.5 h-3.5 text-orci-cyan" />
                    </div>
                  </div>
                )}
                {!isLocked && (
                  <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(0,209,255,0.15)', border: '1px solid rgba(0,209,255,0.4)' }}
                    >
                      <Unlock className="w-3.5 h-3.5 text-orci-cyan" />
                    </div>
                  </div>
                )}

                {/* Thumbnail */}
                <div
                  className="relative h-44 overflow-hidden"
                  onClick={() => handleCardClick(guide)}
                >
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isLocked ? 'brightness-50' : ''}`}
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(0,209,255,0.08)' }}
                  >
                    {isLocked ? (
                      <span className="text-white font-bold text-sm px-4 py-2 rounded-full" style={{ background: 'rgba(0,209,255,0.2)', border: '1px solid rgba(0,209,255,0.5)' }}>
                        לחצו לפתיחת גישה
                      </span>
                    ) : (
                      <span className="text-white font-bold text-sm px-4 py-2 rounded-full" style={{ background: 'rgba(0,209,255,0.2)', border: '1px solid rgba(0,209,255,0.5)' }}>
                        קרא את המדריך
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4">
                  {/* Category */}
                  <span className="text-xs font-medium mb-2" style={{ color: '#00d1ff' }}>
                    {guide.category}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-bold text-base text-white mb-1.5 leading-snug cursor-pointer hover:text-orci-cyan transition-colors"
                    onClick={() => handleCardClick(guide)}
                  >
                    {guide.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-3 flex-1" style={{ color: '#b0d0f0' }}>
                    {guide.description}
                  </p>

                  {/* AI Summary toggle */}
                  <div>
                    <button
                      onClick={(e) => toggleSummary(e, guide.id)}
                      className="w-full flex items-center justify-between gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        background: summaryOpen ? 'rgba(0,209,255,0.1)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${summaryOpen ? 'rgba(0,209,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        color: summaryOpen ? '#00d1ff' : '#b0d0f0',
                      }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        AI Synthesis
                      </span>
                      {summaryOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    <AnimatePresence>
                      {summaryOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div
                            className="mt-2 p-3 rounded-lg text-xs leading-relaxed"
                            style={{
                              background: 'rgba(0,209,255,0.05)',
                              border: '1px solid rgba(0,209,255,0.15)',
                              color: '#a0c0e0',
                              direction: 'rtl',
                            }}
                          >
                            <div className="flex items-center gap-1 mb-1.5 font-semibold" style={{ color: '#00d1ff' }}>
                              <Sparkles className="w-3 h-3" /> סיכום AI
                            </div>
                            {guide.summary}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-16 text-slate-300">
          <Grid className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>לא נמצאו מדריכים בקטגוריה זו</p>
        </div>
      )}

      {/* Email Gate Modal */}
      <EmailGateModal
        isOpen={gateOpen}
        onClose={() => setGateOpen(false)}
        onUnlock={handleUnlock}
        guideName={pendingGuide?.title}
      />
    </>
  );
}
