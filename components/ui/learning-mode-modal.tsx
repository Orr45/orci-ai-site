"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { GUIDES, GuideData } from '@/data/guides'
import { NetflixGuideRow } from './netflix-guide-row'
import { VideoPreviewModal } from './video-preview-modal'

interface LearningModeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LearningModeModal({ isOpen, onClose }: LearningModeModalProps) {
  const [selectedGuide, setSelectedGuide] = useState<GuideData | null>(null)

  // Organize guides by category
  const viralGuides = GUIDES.filter(g => g.category === 'וידאו ויראלי' && g.videoUrl)
  const contentGuides = GUIDES.filter(g => g.category === 'יצירת תוכן' && g.videoUrl)
  const popularGuides = GUIDES.filter(g => g.popular && g.videoUrl)
  const allGuidesWithVideo = GUIDES.filter(g => g.videoUrl)

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !selectedGuide) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose, selectedGuide])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleCardClick = (guide: GuideData) => {
    if (guide.videoUrl) {
      setSelectedGuide(guide)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto"
            style={{ background: '#050d1a' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header with Close Button */}
            <div className="sticky top-0 z-50 bg-gradient-to-b from-[#050d1a] via-[#050d1a]/90 to-transparent pt-6 pb-8">
              <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    מצב למידה
                  </h1>
                  <p className="text-orci-cyan text-sm">
                    לחצו על מדריך לצפייה במקדימון ומשם למעבר למדריך המלא
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="סגור מצב למידה"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Netflix-Style Rows */}
            <div className="pb-12">
              {/* Popular Guides First */}
              {popularGuides.length > 0 && (
                <NetflixGuideRow
                  title="פופולרי ביותר"
                  guides={popularGuides}
                  emoji="🔥"
                  onCardClick={handleCardClick}
                />
              )}

              {/* Viral Content Guides */}
              {viralGuides.length > 0 && (
                <NetflixGuideRow
                  title="וידאו ויראלי"
                  guides={viralGuides}
                  emoji="🎬"
                  onCardClick={handleCardClick}
                />
              )}

              {/* Content Creation Guides */}
              {contentGuides.length > 0 && (
                <NetflixGuideRow
                  title="יצירת תוכן AI"
                  guides={contentGuides}
                  emoji="🎨"
                  onCardClick={handleCardClick}
                />
              )}

              {/* All Guides (fallback) */}
              {allGuidesWithVideo.length > 0 && (
                <NetflixGuideRow
                  title="כל המדריכים"
                  guides={allGuidesWithVideo}
                  emoji="📚"
                  onCardClick={handleCardClick}
                />
              )}
            </div>

            {/* Guides Without Video Notice */}
            <div className="max-w-7xl mx-auto px-6 pb-16">
              <div className="bg-white/5 border border-orci-cyan/20 rounded-xl p-6 text-center">
                <p className="text-gray-300 text-sm">
                  <span className="text-orci-cyan font-bold">💡 טיפ:</span> מדריכים נוספים ללא וידאו זמינים{' '}
                  <button
                    onClick={onClose}
                    className="text-orci-cyan hover:underline font-medium"
                  >
                    בדף המדריכים הרגיל
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Preview Modal */}
      <VideoPreviewModal
        isOpen={!!selectedGuide}
        onClose={() => setSelectedGuide(null)}
        guide={selectedGuide}
      />
    </>
  )
}
