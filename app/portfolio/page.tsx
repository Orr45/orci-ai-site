'use client';

import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTAButton } from '@/components/ui/CTAButton';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-orci-cyan">
              עבודות שלי
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 bg-orci-blue/30 inline-block px-6 py-3 rounded-xl">
              דברים שיצרתי עם AI - מטרנדים ויראליים ועד כלים מתקדמים
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader>סרטונים ויראליים</SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <GlassmorphicCard className="p-4 overflow-hidden group">
                <div className="relative w-full rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '9/16' }}>
                  <iframe
                    src="https://www.youtube.com/embed/lxrvd_y8tPI?rel=0"
                    title="חפצים מדברים עם AI"
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-bold text-orci-cyan mb-2">חפצים מדברים עם AI</h3>
                <p className="text-gray-300 mb-3">טרנד ויראלי שיצרתי עם כלי AI מתקדמים</p>
                <Link href="/guides/ai-beginners">
                  <span className="text-orci-cyan hover:text-orci-blue text-sm font-medium cursor-pointer">
                    ← קרא את המדריך המלא
                  </span>
                </Link>
              </GlassmorphicCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlassmorphicCard className="p-4 overflow-hidden group">
                <div className="relative w-full rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '9/16' }}>
                  <iframe
                    src="https://www.youtube.com/embed/edKRPVP1sWs?rel=0"
                    title="AI Video 2"
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-bold text-orci-cyan mb-2">תוכן AI מתקדם</h3>
                <p className="text-gray-300">עוד דוגמה ליכולות של AI ביצירת תוכן</p>
              </GlassmorphicCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassmorphicCard className="p-4 overflow-hidden border-2 border-orci-cyan/50">
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🎬</div>
                    <h3 className="text-xl font-bold text-orci-cyan mb-3">פרויקט הבא בקרוב</h3>
                    <p className="text-gray-300">עוד תוכן מטורף בדרך...</p>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          </div>

          {/* Achievements Section */}
          <div className="mb-16">
            <SectionHeader>הישגים</SectionHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <GlassmorphicCard className="p-6 text-center">
                  <div className="text-4xl mb-3">🚀</div>
                  <div className="text-3xl font-bold text-orci-cyan mb-2">2.4M+</div>
                  <div className="text-gray-300">צפיות בטרנד הפינגווין</div>
                </GlassmorphicCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <GlassmorphicCard className="p-6 text-center">
                  <div className="text-4xl mb-3">📺</div>
                  <div className="text-3xl font-bold text-orci-cyan mb-2">25M+</div>
                  <div className="text-gray-300">צפיות סה"כ בערוץ</div>
                </GlassmorphicCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <GlassmorphicCard className="p-6 text-center">
                  <div className="text-4xl mb-3">👥</div>
                  <div className="text-3xl font-bold text-orci-cyan mb-2">130K+</div>
                  <div className="text-gray-300">מנויים ביוטיוב</div>
                </GlassmorphicCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <GlassmorphicCard className="p-6 text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <div className="text-3xl font-bold text-orci-cyan mb-2">10+</div>
                  <div className="text-gray-300">מדריכי AI מתקדמים</div>
                </GlassmorphicCard>
              </motion.div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <SectionHeader>התמחות</SectionHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <GlassmorphicCard className="p-8">
                  <h3 className="text-2xl font-bold text-orci-cyan mb-4">כלי AI שאני משתמש בהם</h3>
                  <div className="space-y-2 text-gray-300">
                    <p>• ChatGPT & GPT-4 - יצירת תוכן ואוטומציות</p>
                    <p>• Midjourney & DALL-E - יצירת תמונות</p>
                    <p>• Kling 2.6 - הנפשת וידאו</p>
                    <p>• Nano Banana Pro - יצירת דמויות</p>
                    <p>• ElevenLabs - יצירת קול</p>
                    <p>• Gemini - ניתוח וכתיבת פרומפטים</p>
                  </div>
                </GlassmorphicCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <GlassmorphicCard className="p-8">
                  <h3 className="text-2xl font-bold text-orci-cyan mb-4">שירותים שאני מציע</h3>
                  <div className="space-y-2 text-gray-300">
                    <p>• ייעוץ אסטרטגי בשימוש ב-AI</p>
                    <p>• הקמת אוטומציות שיווקיות</p>
                    <p>• יצירת תוכן ויראלי</p>
                    <p>• הדרכות אישיות ל-AI</p>
                    <p>• בניית מערכות תוכן אוטומטיות</p>
                    <p>• ליווי צמוד ותמיכה מלאה</p>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GlassmorphicCard blur="xl" className="p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-orci-cyan to-orci-blue">
                רוצים פרויקט דומה?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              בואו נדבר על איך אני יכול לעזור לכם ליצור תוכן מטורף עם AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="https://wa.me/972542599107" variant="primary" size="lg">
                שלחו לי הודעה
              </CTAButton>
              <Link href="/guides">
                <CTAButton variant="secondary" size="lg">
                  לכל המדריכים
                </CTAButton>
              </Link>
            </div>
          </GlassmorphicCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
