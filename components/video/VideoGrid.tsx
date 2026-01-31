'use client';

import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import type { VideoData } from '@/types';

interface VideoGridProps {
  videos: VideoData[];
  onVideoClick: (url: string) => void;
}

export function VideoGrid({ videos, onVideoClick }: VideoGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {videos.map((video) => (
        <motion.div key={video.id} variants={itemVariants}>
          <GlassmorphicCard
            className="group relative aspect-[9/16] overflow-hidden p-0"
            onClick={() => onVideoClick(video.url)}
          >
            {/* Thumbnail Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/50 to-gray-800" />

            {/* Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-16 h-16 bg-orci-cyan/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-orci-cyan"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>

            {/* Video Info */}
            <div className="absolute bottom-0 right-0 left-0 p-4 z-20 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-orci-cyan font-bold text-lg mb-1">
                {video.title}
              </h3>
              <p className="text-gray-300 text-sm line-clamp-2">
                {video.description}
              </p>
              {video.category && (
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-orci-cyan/20 text-orci-cyan rounded-full">
                  {video.category}
                </span>
              )}
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-orci-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </GlassmorphicCard>
        </motion.div>
      ))}
    </motion.div>
  );
}
