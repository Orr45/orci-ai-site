'use client';

import { motion } from 'framer-motion';
import { FloatingElement } from '@/components/ui/FloatingElement';
import { BackgroundGradient } from '@/components/ui/BackgroundGradient';
import { CTAButton } from '@/components/ui/CTAButton';

interface ProductHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export function ProductHero({ title, subtitle, ctaText, ctaLink }: ProductHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center px-4 py-20">
      <BackgroundGradient />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <FloatingElement yOffset={15} duration={5}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-orci-cyan to-orci-blue">
              {title}
            </span>
          </h1>
        </FloatingElement>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <CTAButton href={ctaLink} variant="primary" size="lg">
            {ctaText}
          </CTAButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
