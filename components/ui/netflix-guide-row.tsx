"use client"
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GuideData } from '@/data/guides'
import { NetflixGuideCard } from './netflix-guide-card'

interface NetflixGuideRowProps {
  title: string
  guides: GuideData[]
  emoji?: string
  onCardClick?: (guide: GuideData) => void
}

export function NetflixGuideRow({ title, guides, emoji, onCardClick }: NetflixGuideRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 600
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  if (guides.length === 0) return null

  return (
    <div className="mb-12 relative group">
      {/* Category Title */}
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-white mb-4 px-4 md:px-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {emoji && <span className="ml-2">{emoji}</span>}
        {title}
      </motion.h2>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Scroll Button - Hidden on mobile */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute right-full top-1/2 -translate-y-1/2 z-20 w-12 h-32 items-center justify-center bg-black/80 hover:bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2"
          aria-label="גלול ימינה"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        {/* Right Scroll Button - Hidden on mobile */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute left-full top-1/2 -translate-y-1/2 z-20 w-12 h-32 items-center justify-center bg-black/80 hover:bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2"
          aria-label="גלול שמאלה"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        {/* Cards Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {guides.map((guide, index) => (
            <NetflixGuideCard
              key={guide.id}
              guide={guide}
              index={index}
              onClick={onCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
