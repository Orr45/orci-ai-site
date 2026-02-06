'use client';

import Link from "next/link";
import Image from "next/image";
import { Footer } from '@/components/layout/Footer';
import DailyPulse from '@/components/news/DailyPulse';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { BackgroundPathsEffect } from '@/components/ui/background-paths';
import InteractiveBentoGallery from '@/components/ui/interactive-bento-gallery';

export default function Home() {
  const guideMediaItems = [
    {
      id: 1,
      type: "image",
      title: "איך ליצור חפצים מדברים עם AI",
      desc: "למדו ליצור חפצים מדברים עם AI - מדריך שלב אחר שלב",
      url: "/guides/ForkImage.png",
      span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
      href: "/guides/ai-beginners",
    },
    {
      id: 2,
      type: "image",
      title: "יצירת משפיענית AI ב-60 שניות",
      desc: "מדריך מקיף ליצירת משפיענית AI שמדברת עברית ונראית אמיתית",
      url: "/guides/SelfiFullBody.png",
      span: "md:col-span-2 md:row-span-3 sm:col-span-1 sm:row-span-2",
      href: "/guides/ai-influencer",
    },
    {
      id: 3,
      type: "image",
      title: "טרנד הפינגווין הוויראלי",
      desc: "מדריך להפיכת טרנד קיים לוויראלי עם טוויסט ישראלי",
      url: "/guides/kLING2.6.png",
      span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
      href: "/guides/penguin-viral",
    },
    {
      id: 4,
      type: "image",
      title: "איך ליצור את טרנד הריחוף",
      desc: "במדריך הזה תלמדו כיצד ליצור את הטרנד הריחוף, שלב אחר שלב",
      url: "/guides/FlotaingMen.png",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
      href: "/guides/new-guide",
    },
    {
      id: 5,
      type: "image",
      title: "טרנד הדמיות הנטושות",
      desc: "צעד אחרי צעד כיצד תוכלו ליצור את טרנד הדמיות הנטושות",
      url: "/guides/FadeFlotaingMen.png",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
      href: "/guides/new-guide-2",
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Animated Background Paths - Full Page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <BackgroundPathsEffect />
      </div>

      {/* All content with relative positioning to sit above background */}
      <div className="relative z-10">
      {/* HERO SECTION - Cap4Learning Exact Match */}
      <section className="cap-section cap-section-teal overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="cap-card">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Title */}
              <div>
                <h1 className="cap-hero-title mb-6">
                  אנחנו מומחים ב-AI
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  עוזרים לכם לפתח את הקריירה והעסק שלכם עם כלי בינה מלאכותית מתקדמים
                </p>
              </div>

              {/* Right: Colorful Images Grid */}
              <div className="relative grid grid-cols-2 gap-4">
                <div className="bg-blue-400 cap-hero-image"></div>
                <div className="bg-pink-400 cap-hero-image"></div>
                <div className="bg-yellow-400 cap-hero-image"></div>
                <div className="bg-purple-500 cap-hero-image"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED GUIDES SECTION - Interactive Bento Gallery */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <InteractiveBentoGallery
            mediaItems={guideMediaItems}
            title="המדריכים המובילים שלנו"
            description="גררו וחקרו את אוסף המדריכים שלנו - לחצו על מדריך כדי לקרוא עוד"
          />
        </div>
      </section>

      {/* AI NEWS SECTION - Daily Pulse */}
      <DailyPulse />

      {/* SCROLL ANIMATION SECTION - Showcasing Results */}
      <section className="cap-section cap-section-white overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                בעל ערוץ יוטיוב שהגיע ל-
              </h2>
              <span className="text-4xl md:text-[5rem] font-bold text-orci-cyan leading-none">
                25 מיליון צפיות
              </span>
              <p className="text-3xl md:text-[4rem] font-bold text-orci-cyan mt-4">
                ו-130,000 רשומים
              </p>
              <p className="text-xl md:text-2xl text-gray-600 mt-6">
                וגם אתם יכולים להגיע להישגים כאלה עם AI
              </p>
            </>
          }
        >
          <Image
            src="/Chanel.png"
            alt="ערוץ היוטיוב של Orci - 25M צפיות ו-130K רשומים"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center"
            draggable={false}
            priority
          />
        </ContainerScroll>
      </section>

      {/* SERVICES SECTION - Scattered Badges (Cap4Learning Style) */}
      <section className="cap-section cap-section-teal relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="cap-section-title text-center mb-16">
            מה אנחנו מציעים + מה אנחנו שולטים בו
          </h2>

          {/* Scattered badges layout */}
          <div className="relative min-h-[400px]">
            <div className="absolute top-0 left-[10%]">
              <div className="cap-badge">אסטרטגיה שיווקית</div>
            </div>
            <div className="absolute top-20 right-[15%]">
              <div className="cap-badge">יצירת תוכן AI</div>
            </div>
            <div className="absolute top-40 left-[20%]">
              <div className="cap-badge">אוטומציות חכמות</div>
            </div>
            <div className="absolute bottom-40 right-[25%]">
              <div className="cap-badge">ניהול רשתות חברתיות</div>
            </div>
            <div className="absolute bottom-20 left-[30%]">
              <div className="cap-badge">ייעוץ AI לעסקים</div>
            </div>
            <div className="absolute bottom-0 right-[10%]">
              <div className="cap-badge">וידאו ויראלי</div>
            </div>

            {/* Center icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                <svg className="w-10 h-10 text-orci-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/products" className="cap-btn cap-btn-primary">
              גלו עוד
            </Link>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION - White Background */}
      <section className="cap-section cap-section-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-8">בכמה מספרים:</h2>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-relaxed">
            <span className="text-orci-cyan">2.4 מיליון צפיות</span> בטרנדים ויראליים,
            <span className="text-orci-cyan"> 130+ אלף מנויים</span> ביוטיוב,
            ו-<span className="text-orci-cyan">10+ שנות ניסיון</span> ביצירת תוכן
          </p>
        </div>
      </section>

      {/* NEWSLETTER/CTA SECTION - Dark Card (Cap4Learning Style) */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center shadow-2xl">
            {/* Left: Small image */}
            <div className="bg-purple-400 w-32 h-32 rounded-2xl mx-auto md:mx-0"></div>

            {/* Right: CTA */}
            <div className="text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                הישארו מעודכנים
              </h3>
              <p className="text-gray-300 mb-6">
                הירשמו לקבלת מדריכים, טיפים וטרנדים חדשים בעולם ה-AI - ישירות למייל
              </p>
              <Link href="/contact" className="cap-btn cap-btn-primary">
                בואו נדבר בוואטסאפ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
