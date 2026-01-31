'use client';

import { motion } from 'framer-motion';
import type { FloatingElementProps } from '@/types';

export function FloatingElement({
  children,
  delay = 0,
  duration = 6,
  yOffset = 10,
  xOffset = 0
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-yOffset, yOffset, -yOffset],
        x: xOffset ? [-xOffset, xOffset, -xOffset] : 0,
        rotate: [-1, 1, -1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
    >
      {children}
    </motion.div>
  );
}
