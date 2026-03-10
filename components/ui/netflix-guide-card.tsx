"use client"
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { GuideData } from '@/data/guides'

interface NetflixGuideCardProps {
  guide: GuideData
  index: number
  onClick?: (guide: GuideData) => void
}

export function NetflixGuideCard({ guide, index, onClick }: NetflixGuideCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Extract YouTube video ID from Shorts URL
  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/shorts\/([a-zA-Z0-9_-]+)/)
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${match[1]}`
    }
    return null
  }

  const embedUrl = guide.videoUrl ? getYouTubeEmbedUrl(guide.videoUrl) : null

  const handleMouseEnter = () => {
    if (embedUrl && window.innerWidth >= 768) { // Only auto-play on desktop
      setIsHovered(true)
      setTimeout(() => setIsPlaying(true), 200) // Small delay before loading iframe
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPlaying(false)
  }

  const handleClick = () => {
    if (onClick) {
      onClick(guide)
    }
  }

  return (
    <motion.div
      className="group relative flex-shrink-0 cursor-pointer"
      style={{ width: '200px', aspectRatio: '9/16' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 30 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      onClick={handleClick}
    >
        {/* Thumbnail Image */}
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-900 border-2 border-transparent group-hover:border-orci-cyan transition-all duration-300">
          {!isPlaying ? (
            <>
              <Image
                src={guide.image}
                alt={guide.title}
                fill
                className="object-cover"
                sizes="200px"
                priority={index < 4}
              />
              {/* Play Icon Overlay */}
              {embedUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
                  <div className="w-16 h-16 rounded-full bg-orci-cyan/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* YouTube Video Player */
            <iframe
              ref={iframeRef}
              src={embedUrl!}
              className="absolute inset-0 w-full h-full"
              allow="autoplay"
              loading="lazy"
            />
          )}

          {/* Text Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <h3 className="text-white text-sm font-bold line-clamp-2 leading-tight">
              {guide.title}
            </h3>
            {guide.popular && (
              <span className="inline-block mt-1 px-2 py-0.5 bg-orci-cyan text-white text-xs font-bold rounded">
                🔥 פופולרי
              </span>
            )}
            {guide.isNew && !guide.popular && (
              <span className="inline-block mt-1 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded">
                ✨ חדש
              </span>
            )}
          </div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 -z-10 blur-xl bg-orci-cyan/50 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />
    </motion.div>
  )
}
