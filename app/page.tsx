'use client';

import Link from "next/link";
import Image from "next/image";
import { Footer } from '@/components/layout/Footer';
import DailyPulse from '@/components/news/DailyPulse';

export default function Home() {
  const featuredGuides = [
    { title: 'איך ליצור חפצים מדברים עם AI', link: '/guides/ai-beginners' },
    { title: 'יצירת משפיענית AI ב-60 שניות', link: '/guides/ai-influencer' },
    { title: 'טרנד הפינגווין הוויראלי - 2.4M צפיות', link: '/guides/penguin-viral' },
    { title: 'אוטומציות AI לעסקים', link: '/products' },
    { title: 'שיווק חכם עם בינה מלאכותית', link: '/products' },
    { title: 'יצירת תוכן ויראלי עם AI', link: '/guides' },
  ];

  const services = [
    'אסטרטגיה שיווקית',
    'יצירת תוכן AI',
    'אוטומציות חכמות',
    'ניהול רשתות חברתיות',
    'ייעוץ AI לעסקים',
    'וידאו ויראלי',
  ];

  return (
    <div className="min-h-screen">
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

      {/* FEATURED GUIDES SECTION - Cap4Learning 6-Card Grid */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="cap-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold">המדריכים המובילים שלנו:</h2>
              <Link href="/guides" className="cap-btn cap-btn-dark text-sm">
                כל המדריכים
              </Link>
            </div>

            {/* 6 Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {featuredGuides.map((guide, index) => (
                <Link key={index} href={guide.link}>
                  <div className="cap-card-small min-h-[140px] flex flex-col justify-center">
                    <h3 className="text-base font-semibold text-gray-800 leading-tight">
                      {guide.title}
                    </h3>
                    <span className="text-orci-cyan text-sm font-medium mt-3 inline-block">
                      קרא עוד ←
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/guides" className="text-orci-cyan font-medium hover:underline">
                כל המדריכים שלנו לפי קטגוריה ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI NEWS SECTION - Daily Pulse */}
      <DailyPulse />

      {/* LARGE IMAGE + TEXT SECTION */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Large colorful image */}
            <div className="bg-gradient-to-br from-yellow-400 to-teal-400 rounded-2xl h-[400px] flex items-center justify-center">
              <div className="bg-pink-400 w-64 h-64 rounded-2xl"></div>
            </div>

            {/* Text */}
            <div>
              <h2 className="cap-section-title mb-6">
                השיגו את המטרות המקצועיות שלכם
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                אנחנו מלווים אותכם בכל שלב - מהכשרה טכנולוגית ועד הצלחה עסקית עם AI
              </p>
              <Link href="/products" className="cap-btn cap-btn-primary mt-6">
                למידע נוסף
              </Link>
            </div>
          </div>
        </div>
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
  );
}
