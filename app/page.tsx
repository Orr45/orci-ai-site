'use client';

import { useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useAnimate } from 'framer-motion';
import { Sparkles, MessageCircle } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import DailyPulse from '@/components/news/DailyPulse';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { BackgroundPathsEffect } from '@/components/ui/background-paths';
import InteractiveBentoGallery from '@/components/ui/interactive-bento-gallery';
import { HighlighterItem, HighlightGroup, Particles } from '@/components/ui/highlighter';
import OrbitingSkills from '@/components/ui/orbiting-skills';
import Newsletter from '@/components/ui/newsletter';


function HeroSection() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      [
        ["#pointer", { left: 220, top: 50 }, { duration: 0 }],
        ["#label-content", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 40, top: 100 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#label-content", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#label-automation", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 200, top: 170 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#label-automation", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#label-marketing", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 60, top: 200 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#label-marketing", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#label-video", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 220, top: 50 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#label-video", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
      ],
      {
        repeat: Number.POSITIVE_INFINITY,
      },
    );
  }, [animate]);

  return (
    <section className="cap-section cap-section-teal overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <HighlightGroup className="group h-full">
          <div className="group/item h-full">
            <HighlighterItem className="rounded-3xl p-6">
              <div className="relative z-20 h-full overflow-hidden rounded-3xl border border-gray-200 bg-white">
                <Particles
                  className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                  quantity={200}
                  color="#00d1ff"
                  vy={-0.2}
                />
                <div className="flex justify-center">
                  <div className="flex h-full flex-col justify-center gap-10 p-4 md:h-[300px] md:flex-row">
                    {/* Animated Labels */}
                    <div
                      className="relative mx-auto h-[270px] w-[300px] md:h-[270px] md:w-[300px]"
                      ref={scope}
                    >
                      <Sparkles className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-orci-cyan" />
                      <div
                        id="label-video"
                        className="absolute bottom-12 left-14 rounded-3xl border border-orci-cyan/40 bg-orci-cyan/10 px-3 py-1.5 text-xs font-medium text-gray-700 opacity-50"
                      >
                        וידאו ויראלי
                      </div>
                      <div
                        id="label-automation"
                        className="absolute left-2 top-20 rounded-3xl border border-orci-cyan/40 bg-orci-cyan/10 px-3 py-1.5 text-xs font-medium text-gray-700 opacity-50"
                      >
                        אוטומציות חכמות
                      </div>
                      <div
                        id="label-marketing"
                        className="absolute bottom-20 right-1 rounded-3xl border border-orci-cyan/40 bg-orci-cyan/10 px-3 py-1.5 text-xs font-medium text-gray-700 opacity-50"
                      >
                        שיווק דיגיטלי
                      </div>
                      <div
                        id="label-content"
                        className="absolute right-12 top-10 rounded-3xl border border-orci-cyan/40 bg-orci-cyan/10 px-3 py-1.5 text-xs font-medium text-gray-700 opacity-50"
                      >
                        יצירת תוכן AI
                      </div>

                      {/* Animated Pointer */}
                      <div id="pointer" className="absolute">
                        <svg
                          width="16.8"
                          height="18.2"
                          viewBox="0 0 12 13"
                          className="fill-orci-cyan"
                          stroke="white"
                          strokeWidth="1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z"
                          />
                        </svg>
                        <span className="bg-orci-cyan relative -top-1 left-3 rounded-3xl px-2 py-1 text-xs text-white">
                          Orci
                        </span>
                      </div>
                    </div>

                    {/* Text + CTA */}
                    <div className="-mt-20 flex h-full flex-col justify-center p-2 md:-mt-4 md:mr-10 md:w-[400px]">
                      <div className="flex flex-col items-center md:items-start">
                        <h1 className="mt-6 pb-1 font-bold">
                          <span className="text-2xl md:text-4xl text-gray-800">
                            אנחנו מומחים ב-AI
                          </span>
                        </h1>
                      </div>
                      <p className="mb-4 text-gray-500 text-center md:text-right">
                        עוזרים לכם לפתח את הקריירה והעסק שלכם עם כלי בינה מלאכותית מתקדמים
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <a
                          href="https://wa.me/972542599107"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orci-cyan text-white rounded-full font-medium hover:bg-orci-blue transition-colors text-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          בואו נדבר
                        </a>
                        <Link
                          href="/guides"
                          className="inline-flex items-center gap-1 px-5 py-2.5 border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          למדריכים
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

export default function Home() {
  const guideMediaItems = [
    {
      id: 1,
      type: "image",
      title: "איך ליצור חפצים מדברים עם AI",
      desc: "למדו ליצור חפצים מדברים עם AI - מדריך שלב אחר שלב",
      url: "/guides/guide-talking-objects.png",
      span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
      href: "/guides/ai-beginners",
    },
    {
      id: 2,
      type: "image",
      title: "יצירת משפיענית AI ב-60 שניות",
      desc: "מדריך מקיף ליצירת משפיענית AI שמדברת עברית ונראית אמיתית",
      url: "/guides/guide-ai-influencer.png",
      span: "md:col-span-2 md:row-span-3 sm:col-span-1 sm:row-span-2",
      href: "/guides/ai-influencer",
    },
    {
      id: 3,
      type: "image",
      title: "טרנד הפינגווין הוויראלי",
      desc: "מדריך להפיכת טרנד קיים לוויראלי עם טוויסט ישראלי",
      url: "/guides/guide-penguin-viral.png",
      span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
      href: "/guides/penguin-viral",
    },
    {
      id: 4,
      type: "image",
      title: "איך ליצור את טרנד הריחוף",
      desc: "במדריך הזה תלמדו כיצד ליצור את הטרנד הריחוף, שלב אחר שלב",
      url: "/guides/guide-floating-trend.png",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
      href: "/guides/new-guide",
    },
    {
      id: 5,
      type: "image",
      title: "טרנד הדמיות הנטושות",
      desc: "צעד אחרי צעד כיצד תוכלו ליצור את טרנד הדמיות הנטושות",
      url: "/guides/guide-abandoned-figures.png",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
      href: "/guides/new-guide-2",
    },
    {
      id: 6,
      type: "image",
      title: "טריק הרכב המיניאטורי",
      desc: "הטריק שמשגע את הרשת - בלי אפקטים מיוחדים, רק 2 סרטונים פשוטים",
      url: "/guides/guide-car-miniature.png",
      span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
      href: "/guides/car-miniature",
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
      {/* HERO SECTION - Interactive Highlighter */}
      <HeroSection />

      {/* FEATURED GUIDES SECTION - Interactive Bento Gallery */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <InteractiveBentoGallery
            mediaItems={guideMediaItems}
            title="המדריכים המובילים שלנו"
            description="לחצו על מדריך כדי לקרוא עוד"
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

      {/* SERVICES SECTION - Orbiting Skills */}
      <section className="cap-section cap-section-teal relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="cap-section-title text-center mb-4">
            מה אנחנו מציעים
          </h2>
          <p className="text-gray-600 text-center mb-8 hidden sm:block">העבירו את העכבר כדי לעצור, רחפו על אייקון לפרטים</p>
          <OrbitingSkills />
          <div className="text-center mt-8">
            <Link href="/products" className="cap-btn cap-btn-primary">
              גלו עוד
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION - Mailchimp Email Signup */}
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
