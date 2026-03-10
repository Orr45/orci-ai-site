"use client"
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { GuideData } from '@/data/guides'

interface VideoPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  guide: GuideData | null
}

export function VideoPreviewModal({ isOpen, onClose, guide }: VideoPreviewModalProps) {
  const router = useRouter()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Extract YouTube video ID from Shorts URL
  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/shorts\/([a-zA-Z0-9_-]+)/)
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&controls=1&modestbranding=1&rel=0`
    }
    return null
  }

  const embedUrl = guide?.videoUrl ? getYouTubeEmbedUrl(guide.videoUrl) : null

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  // Handle navigation to full guide
  const handleNavigateToGuide = () => {
    if (guide?.href) {
      onClose()
      router.push(guide.href)
    }
  }

  if (!guide || !embedUrl) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              aria-label="סגור"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Video Container */}
            <div
              className="relative rounded-xl overflow-hidden bg-black border-2 border-orci-cyan shadow-2xl shadow-orci-cyan/50"
              style={{ aspectRatio: '9/16' }}
            >
              <iframe
                ref={iframeRef}
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Guide Info Card */}
            <motion.div
              className="mt-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-orci-cyan/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                {guide.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 text-center leading-relaxed">
                {guide.summary}
              </p>

              {/* CTA Button */}
              <button
                onClick={handleNavigateToGuide}
                className="w-full px-6 py-4 bg-orci-cyan hover:bg-orci-blue text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-orci-cyan/50 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                למדריך המפורט
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
