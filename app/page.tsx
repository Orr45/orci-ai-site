'use client';

import { useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useAnimate } from 'framer-motion';
import { Sparkles, MessageCircle, Youtube, ExternalLink, Star, Shield, Trophy } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import DailyPulse from '@/components/news/DailyPulse';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { BackgroundPathsEffect } from '@/components/ui/background-paths';
import { HighlighterItem, HighlightGroup, Particles } from '@/components/ui/highlighter';
import OrbitingSkills from '@/components/ui/orbiting-skills';
import Newsletter from '@/components/ui/newsletter';
import TutorialGrid from '@/components/ui/tutorial-grid';

// ─── Hero Section ───────────────────────────────────────────────────────────

function HeroSection() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      [
        ["#pointer", { left: 220, top: 50 }, { duration: 0 }],
        ["#label-content", { opacity: 1 }, { duration: 0.3 }],
        ["#pointer", { left: 40, top: 100 }, { at: "+0.5", duration: 0.5, ease: "easeInOut" }],
        ["#label-content", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#label-automation", { opacity: 1 }, { duration: 0.3 }],
        ["#pointer", { left: 200, top: 170 }, { at: "+0.5", duration: 0.5, ease: "easeInOut" }],
        ["#label-automation", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#label-marketing", { opacity: 1 }, { duration: 0.3 }],
        ["#pointer", { left: 60, top: 200 }, { at: "+0.5", duration: 0.5, ease: "easeInOut" }],
        ["#label-marketing", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#label-video", { opacity: 1 }, { duration: 0.3 }],
        ["#pointer", { left: 220, top: 50 }, { at: "+0.5", duration: 0.5, ease: "easeInOut" }],
        ["#label-video", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
      ],
      { repeat: Number.POSITIVE_INFINITY },
    );
  }, [animate]);

  return (
    <section className="cap-section overflow-hidden" style={{ background: 'transparent' }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Authority Badge */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-bold"
            style={{
              background: 'rgba(0,209,255,0.08)',
              border: '1px solid rgba(0,209,255,0.35)',
              color: '#00d1ff',
              boxShadow: '0 0 20px rgba(0,209,255,0.1)',
            }}
          >
            <Trophy className="w-4 h-4" />
            <span>130K+ מנויים ביוטיוב</span>
            <span style={{ color: 'rgba(0,209,255,0.4)' }}>•</span>
            <span>25M+ צפיות</span>
            <Shield className="w-4 h-4" />
          </div>
        </div>

        <HighlightGroup className="group h-full">
          <div className="group/item h-full">
            <HighlighterItem className="rounded-3xl p-6">
              <div
                className="relative z-20 h-full overflow-hidden rounded-3xl"
                style={{
                  background: 'rgba(10,22,40,0.85)',
                  border: '1px solid rgba(0,209,255,0.2)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Particles
                  className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                  quantity={200}
                  color="#00d1ff"
                  vy={-0.2}
                />
                <div className="flex justify-center">
                  <div className="flex h-full flex-col justify-center gap-10 p-4 md:h-[300px] md:flex-row">
                    {/* Animated Labels */}
                    <div className="relative mx-auto h-[270px] w-[300px] md:h-[270px] md:w-[300px]" ref={scope}>
                      <Sparkles className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-orci-cyan" />

                      <div id="label-video" className="absolute bottom-12 left-14 rounded-3xl px-3 py-1.5 text-xs font-medium opacity-50" style={{ border: '1px solid rgba(0,209,255,0.4)', background: 'rgba(0,209,255,0.1)', color: '#e8f4ff' }}>
                        וידאו ויראלי
                      </div>
                      <div id="label-automation" className="absolute left-2 top-20 rounded-3xl px-3 py-1.5 text-xs font-medium opacity-50" style={{ border: '1px solid rgba(0,209,255,0.4)', background: 'rgba(0,209,255,0.1)', color: '#e8f4ff' }}>
                        אוטומציות חכמות
                      </div>
                      <div id="label-marketing" className="absolute bottom-20 right-1 rounded-3xl px-3 py-1.5 text-xs font-medium opacity-50" style={{ border: '1px solid rgba(0,209,255,0.4)', background: 'rgba(0,209,255,0.1)', color: '#e8f4ff' }}>
                        שיווק דיגיטלי
                      </div>
                      <div id="label-content" className="absolute right-2 top-10 rounded-3xl px-3 py-1.5 text-xs font-medium opacity-50" style={{ border: '1px solid rgba(0,209,255,0.4)', background: 'rgba(0,209,255,0.1)', color: '#e8f4ff' }}>
                        יצירת תוכן AI
                      </div>

                      {/* Animated pointer */}
                      <div id="pointer" className="absolute" style={{ left: 220, top: 50 }}>
                        <svg height="18" width="15" fill="currentColor" className="text-orci-cyan" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z" />
                        </svg>
                        <span className="bg-orci-cyan relative -top-1 left-3 rounded-3xl px-2 py-1 text-xs font-bold" style={{ color: '#050d1a' }}>
                          Orci
                        </span>
                      </div>
                    </div>

                    {/* Text + CTA */}
                    <div className="-mt-20 flex h-full flex-col justify-center p-2 md:-mt-4 md:mr-10 md:w-[400px]">
                      <div className="flex flex-col items-center md:items-start">
                        <h1 className="mt-6 pb-1 font-bold">
                          <span className="text-2xl md:text-4xl" style={{ color: '#e8f4ff' }}>
                            מרכז הפיקוד של ה-AI
                          </span>
                        </h1>
                      </div>
                      <p className="mb-4 text-sm md:text-base text-center md:text-right" style={{ color: '#7a9bc0' }}>
                        מדריכים מעשיים, חדשות AI יומיות, ושירותים מתקדמים
                        <br />
                        כדי שתוכלו להישאר צעד אחד קדימה תמיד
                      </p>

                      {/* Trust indicators */}
                      <div className="flex gap-3 mb-5 justify-center md:justify-start flex-wrap">
                        {['130K מנויים', '25M צפיות', 'מומחה AI'].map((item) => (
                          <span
                            key={item}
                            className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(0,209,255,0.08)', border: '1px solid rgba(0,209,255,0.2)', color: '#7a9bc0' }}
                          >
                            <Star className="w-3 h-3 text-orci-cyan" />
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <a
                          href="https://wa.me/972542599107"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all"
                          style={{
                            background: 'linear-gradient(135deg, #00d1ff, #00bfff)',
                            color: '#050d1a',
                            boxShadow: '0 0 20px rgba(0,209,255,0.3)',
                          }}
                        >
                          <MessageCircle className="w-4 h-4" />
                          בואו נדבר
                        </a>
                        <Link
                          href="/guides"
                          className="inline-flex items-center gap-1 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                          style={{ border: '1.5px solid rgba(0,209,255,0.3)', color: '#00d1ff' }}
                        >
                          כל המדריכים
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </HighlighterItem>
          </div>
        </HighlightGroup>
      </div>
    </section>
  );
}

// ─── YouTube Section ─────────────────────────────────────────────────────────

const YT_VIDEOS = [
  {
    id: 'lxrvd_y8tPI',
    title: 'חפצים מדברים - הטרנד שכולם מחפשים',
    views: '85K צפיות',
    thumbnail: `https://img.youtube.com/vi/lxrvd_y8tPI/hqdefault.jpg`,
    url: 'https://www.youtube.com/shorts/lxrvd_y8tPI',
  },
  {
    id: 'channel-1',
    title: 'איך ליצור משפיענית AI שנראית אמיתית',
    views: '120K צפיות',
    thumbnail: '/guides/guide-ai-influencer.png',
    url: 'https://www.youtube.com/@oci',
  },
  {
    id: 'channel-2',
    title: 'טרנד הפינגווין - גרסה ישראלית ויראלית',
    views: '95K צפיות',
    thumbnail: '/guides/guide-penguin-viral.png',
    url: 'https://www.youtube.com/@oci',
  },
];

function YouTubeSection() {
  return (
    <section className="cap-section cap-section-alt neon-grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', color: '#ff4444' }}>
            <Youtube className="w-4 h-4" />
            הערוץ שלנו ביוטיוב
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#e8f4ff' }}>
            25 מיליון צפיות.<br />
            <span style={{ color: '#00d1ff' }}>הסוד? AI + יצירתיות.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#7a9bc0' }}>
            כל הסרטונים שהפכו ויראלים — עם ההסבר המלא על איך עשינו את זה
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {YT_VIDEOS.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl overflow-hidden block transition-all duration-300 hover:-translate-y-1"
              style={{ border: '1px solid rgba(0,209,255,0.12)' }}
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized={video.thumbnail.startsWith('http')}
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,0,0,0.85)', boxShadow: '0 0 25px rgba(255,0,0,0.4)' }}>
                    <svg className="w-6 h-6 text-white mr-[-2px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* YouTube badge */}
                <div className="absolute top-2 left-2">
                  <Youtube className="w-5 h-5 text-red-500" />
                </div>
              </div>

              {/* Info */}
              <div className="p-4" style={{ background: 'rgba(10,22,40,0.95)' }}>
                <h3 className="font-bold text-sm mb-1 group-hover:text-orci-cyan transition-colors line-clamp-2" style={{ color: '#e8f4ff' }}>
                  {video.title}
                </h3>
                <p className="text-xs" style={{ color: '#4a6a8a' }}>{video.views}</p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://www.youtube.com/@oci"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all"
            style={{
              background: 'rgba(255,0,0,0.12)',
              border: '1.5px solid rgba(255,80,80,0.4)',
              color: '#ff6666',
            }}
          >
            <Youtube className="w-4 h-4" />
            עברו לערוץ ← הירשמו להתראות
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Animated Background Paths - Full Page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <BackgroundPathsEffect />
      </div>

      {/* All content above background */}
      <div className="relative z-10">

        {/* 1. HERO - Authority badge + interactive Highlighter */}
        <HeroSection />

        {/* 2. TUTORIAL ENGINE - High-density grid with filters + email gate + AI summary */}
        <section className="cap-section cap-section-white neon-grid-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
                style={{ background: 'rgba(0,209,255,0.08)', border: '1px solid rgba(0,209,255,0.3)', color: '#00d1ff' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                מנוע המדריכים
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-3" style={{ color: '#e8f4ff' }}>
                כל המדריכים שלנו
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: '#7a9bc0' }}>
                2 מדריכים ראשונים חינם. שאר? פשוט תשאירו אימייל ואנחנו נפתח הכל.
              </p>
            </div>
            <TutorialGrid />
          </div>
        </section>

        {/* 3. AI NEWS - Daily Pulse */}
        <DailyPulse />

        {/* 4. YOUTUBE ECOSYSTEM */}
        <YouTubeSection />

        {/* 5. SCROLL ANIMATION - YouTube achievement showcase */}
        <section className="cap-section cap-section-teal overflow-hidden">
          <ContainerScroll
            titleComponent={
              <>
                <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: '#e8f4ff' }}>
                  בעל ערוץ יוטיוב שהגיע ל-
                </h2>
                <span className="text-4xl md:text-[5rem] font-bold text-orci-cyan leading-none">
                  25 מיליון צפיות
                </span>
                <p className="text-3xl md:text-[4rem] font-bold text-orci-cyan mt-4">
                  ו-130,000 רשומים
                </p>
                <p className="text-xl md:text-2xl mt-6" style={{ color: '#7a9bc0' }}>
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

        {/* 6. SERVICES - Orbiting Skills */}
        <section className="cap-section cap-section-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="cap-section-title text-center mb-4" style={{ color: '#e8f4ff' }}>
              מה אנחנו מציעים
            </h2>
            <p className="text-center mb-8 hidden sm:block" style={{ color: '#7a9bc0' }}>
              העבירו את העכבר כדי לעצור, רחפו על אייקון לפרטים
            </p>
            <OrbitingSkills />
            <div className="text-center mt-8">
              <Link href="/products" className="cap-btn cap-btn-primary">
                גלו עוד
              </Link>
            </div>
          </div>
        </section>

        {/* 7. NEWSLETTER */}
        <section className="cap-section cap-section-teal">
          <div className="max-w-2xl mx-auto px-6">
            <Newsletter />
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
