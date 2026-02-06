'use client';

import { motion } from 'framer-motion';
import { FloatingElement } from '@/components/ui/FloatingElement';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTAButton } from '@/components/ui/CTAButton';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
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
              מי אני?
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 bg-orci-blue/30 inline-block px-6 py-3 rounded-xl">
              הסיפור שלי: מיוצר תוכן לקצין, ועכשיו למומחה AI
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <FloatingElement yOffset={8} duration={7}>
            <GlassmorphicCard blur="lg" className="p-8 md:p-12 mb-12">
              <div className="text-lg md:text-xl leading-relaxed space-y-6 text-gray-200">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  נעים מאוד, אני <span className="text-orci-cyan font-bold">אור (Orci)</span>. המסע שלי התחיל בגיל 16, כשבניתי מאפס את <span className="text-orci-cyan font-bold">'oci Gaming'</span> -
                  מותג תוכן שהגיע ל-<span className="text-orci-cyan font-bold">130,000 רשומים</span> ולמעלה מ-<span className="text-orci-cyan font-bold">25 מיליון צפיות</span>. שם למדתי מה זה אומר
                  לייצר ערך, לבנות קהילה ולהפוך תשוקה לעסק.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  אחרי שנים של יצירת תוכן, עברתי לשדה הקרב. שירתי כמפקד וקצין במילואים (<span className="text-orci-cyan font-bold">סגן</span>)
                  בחטיבת החילוץ וההצלה, והובלתי לוחמים במשימות מורכבות במלחמת 'חרבות ברזל'.
                  הפיקוד לימד אותי <span className="text-orci-cyan font-bold">דיוק, אחריות ואיך לקבל החלטות תחת לחץ קיצוני</span>.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  היום, אני משלב את שני העולמות האלו ב-<span className="text-orci-cyan font-bold">Orci AI</span>. המשימה שלי היא להנגיש לכם את
                  מהפכת ה-AI בצורה הכי פרקטית שיש, כדי שגם אתם תוכלו לייעל את העסק, לחסוך זמן
                  וליצור תוכן מטורף בקלות.
                </motion.p>
              </div>
            </GlassmorphicCard>
          </FloatingElement>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <GlassmorphicCard className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-orci-cyan mb-2">130K+</div>
                <div className="text-gray-300">מנויים ביוטיוב</div>
              </GlassmorphicCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlassmorphicCard className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-orci-cyan mb-2">25M+</div>
                <div className="text-gray-300">צפיות סה"כ</div>
              </GlassmorphicCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassmorphicCard className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-orci-cyan mb-2">10+</div>
                <div className="text-gray-300">שנות ניסיון ביצירת תוכן</div>
              </GlassmorphicCard>
            </motion.div>
          </div>

          {/* What I Do Section */}
          <FloatingElement yOffset={8} duration={7}>
            <GlassmorphicCard blur="lg" className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-orci-cyan to-orci-blue">
                  מה אני עושה?
                </span>
              </h2>
              <div className="text-lg md:text-xl leading-relaxed space-y-4 text-gray-200">
                <p>
                  אני עוזר לבעלי עסקים ויזמים לנצל את כוח הבינה המלאכותית כדי:
                </p>
                <ul className="list-none space-y-3">
                  <li className="pr-6 relative">
                    <span className="absolute right-0 text-orci-cyan">•</span>
                    <span className="text-orci-cyan font-bold">לייצר תוכן איכותי</span> שמושך קהל ומגדיל מכירות
                  </li>
                  <li className="pr-6 relative">
                    <span className="absolute right-0 text-orci-cyan">•</span>
                    <span className="text-orci-cyan font-bold">לחסוך שעות עבודה</span> עם אוטומציות חכמות
                  </li>
                  <li className="pr-6 relative">
                    <span className="absolute right-0 text-orci-cyan">•</span>
                    <span className="text-orci-cyan font-bold">לבנות מערכת שיווק</span> שעובדת 24/7
                  </li>
                  <li className="pr-6 relative">
                    <span className="absolute right-0 text-orci-cyan">•</span>
                    <span className="text-orci-cyan font-bold">להישאר מעודכנים</span> בטכנולוגיות החדשות ביותר
                  </li>
                </ul>
              </div>
            </GlassmorphicCard>
          </FloatingElement>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GlassmorphicCard blur="xl" className="p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-orci-cyan to-orci-blue">
                בואו נעבוד ביחד
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              מעוניינים לשמוע איך AI יכול לקחת את העסק שלכם לשלב הבא?
            </p>
            <CTAButton href="https://wa.me/972542599107" variant="primary" size="lg">
              שלחו לי הודעה בוואטסאפ
            </CTAButton>
          </GlassmorphicCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
