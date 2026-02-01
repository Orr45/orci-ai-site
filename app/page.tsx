'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import { FloatingElement } from '@/components/ui/FloatingElement';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { CTAButton } from '@/components/ui/CTAButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { VideoModal } from '@/components/video/VideoModal';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const portfolioVideos = [
    {
      id: '1',
      title: 'חפצים מדברים עם AI',
      url: 'https://www.youtube.com/shorts/lxrvd_y8tPI'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-900">
      {/* TODO: Header Image Section - User will provide the image URL */}
      {/* Uncomment and add image URL when ready:
      <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <Image
          src="USER_PROVIDED_IMAGE_URL"
          alt="Orci AI Header"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </section>
      */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <FloatingElement delay={0} duration={8} yOffset={20}>
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-orci-cyan/10 rounded-full blur-3xl"></div>
          </FloatingElement>
          <FloatingElement delay={1} duration={10} yOffset={30}>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-orci-blue/10 rounded-full blur-3xl"></div>
          </FloatingElement>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FloatingElement yOffset={10} duration={6}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-orci-cyan to-orci-blue">
                  הופכים בינה מלאכותית
                </span>
                <br />
                <span className="text-foreground">
                  לכלי העבודה החזק ביותר שלכם
                </span>
              </h1>
            </FloatingElement>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              המדריכים, הכלים והסודות שיעזרו לכם לשלוט ב-AI - בפשטות ובגובה העיניים
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/guides">
                <CTAButton variant="primary" size="lg">
                  המדריכים שלי
                </CTAButton>
              </Link>
              <Link href="/products">
                <CTAButton variant="secondary" size="lg">
                  המוצרים שלי
                </CTAButton>
              </Link>
              <CTAButton href="https://wa.me/972542599107" variant="primary" size="lg">
                דברו איתי בוואטסאפ
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeader>מי אני?</SectionHeader>

          <FloatingElement yOffset={8} duration={7}>
            <GlassmorphicCard blur="lg" className="p-8 md:p-12">
              <div className="text-lg md:text-xl leading-relaxed space-y-6 text-gray-200">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  נעים מאוד, אני אור (Orci). המסע שלי התחיל בגיל 16, כשבניתי מאפס את 'oci Gaming' -
                  מותג תוכן שהגיע ל-130,000 רשומים ולמעלה מ-25 מיליון צפיות. שם למדתי מה זה אומר
                  לייצר ערך, לבנות קהילה ולהפוך תשוקה לעסק.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  אחרי שנים של יצירת תוכן, עברתי לשדה הקרב. שירתי כמפקד וקצין במילואים (סגן)
                  בחטיבת החילוץ וההצלה, והובלתי לוחמים במשימות מורכבות במלחמת 'חרבות ברזל'.
                  הפיקוד לימד אותי דיוק, אחריות ואיך לקבל החלטות תחת לחץ קיצוני.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  היום, אני משלב את שני העולמות האלו ב-Orci AI. המשימה שלי היא להנגיש לכם את
                  מהפכת ה-AI בצורה הכי פרקטית שיש, כדי שגם אתם תוכלו לייעל את העסק, לחסוך זמן
                  וליצור תוכן מטורף בקלות.
                </motion.p>
              </div>
            </GlassmorphicCard>
          </FloatingElement>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader>דברים שעשיתי עם AI</SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <GlassmorphicCard
                  onClick={() => setSelectedVideo(video.url)}
                  className="group aspect-[9/16] relative overflow-hidden p-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <div className="absolute bottom-0 right-0 left-0 p-6 z-20">
                    <p className="text-orci-cyan font-bold text-lg">{video.title}</p>
                    <p className="text-gray-300 text-sm">לחצו לצפייה</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center z-15">
                    <div className="w-20 h-20 border-4 border-orci-cyan rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-orci-cyan" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader>מוכנים להתחיל?</SectionHeader>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-8"
          >
            בואו נדבר על איך AI יכול לקחת את העסק שלכם לשלב הבא
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <CTAButton href="https://wa.me/972542599107" variant="primary" size="lg">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              שלחו לי הודעה עכשיו
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo || ''}
      />

      <Footer />
    </div>
  );
}
