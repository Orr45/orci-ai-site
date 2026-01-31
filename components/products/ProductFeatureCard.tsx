'use client';

import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import type { ProductFeature } from '@/types';

interface ProductFeatureCardProps {
  feature: ProductFeature;
  index: number;
}

export function ProductFeatureCard({ feature, index }: ProductFeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <GlassmorphicCard
        blur="lg"
        className={`h-full ${
          feature.highlighted
            ? 'border-2 border-orci-cyan shadow-lg shadow-orci-cyan/30'
            : ''
        }`}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orci-cyan to-orci-blue rounded-full flex items-center justify-center text-3xl">
            {feature.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 text-center">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-center leading-relaxed">
          {feature.description}
        </p>

        {/* Highlighted Badge */}
        {feature.highlighted && (
          <div className="mt-4 text-center">
            <span className="inline-block px-3 py-1 bg-orci-cyan/20 text-orci-cyan text-sm font-bold rounded-full">
              פיצ'ר מומלץ
            </span>
          </div>
        )}
      </GlassmorphicCard>
    </motion.div>
  );
}
