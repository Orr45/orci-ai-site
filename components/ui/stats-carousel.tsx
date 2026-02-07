"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  Eye,
  Users,
  Clock,
  TrendingUp,
  BookOpen,
  Youtube,
  Zap,
  Award,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface StatItem {
  id: string;
  icon: React.ElementType;
  value: string;
  label: string;
}

const stats: StatItem[] = [
  {
    id: "views",
    icon: Eye,
    value: "25M+",
    label: "צפיות ביוטיוב",
  },
  {
    id: "subscribers",
    icon: Youtube,
    value: "130K+",
    label: "מנויים ביוטיוב",
  },
  {
    id: "experience",
    icon: Clock,
    value: "10+",
    label: "שנות ניסיון",
  },
  {
    id: "viral",
    icon: TrendingUp,
    value: "2.4M+",
    label: "צפיות ויראליות",
  },
  {
    id: "guides",
    icon: BookOpen,
    value: "50+",
    label: "מדריכי AI",
  },
  {
    id: "automation",
    icon: Zap,
    value: "100+",
    label: "אוטומציות שנבנו",
  },
  {
    id: "clients",
    icon: Users,
    value: "200+",
    label: "לקוחות מרוצים",
  },
  {
    id: "projects",
    icon: Award,
    value: "500+",
    label: "פרויקטים שהושלמו",
  },
];

const StatsCarousel = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="flex flex-col items-center text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
          ההוכחות הקיימות
        </h2>
      </div>
      <div>
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true, direction: "rtl" }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
          >
            <CarouselContent className="ml-0">
              {stats.map((stat) => (
                <CarouselItem
                  key={stat.id}
                  className="flex basis-1/2 justify-center pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="mx-4 flex shrink-0 items-center justify-center">
                    <div className="flex flex-col items-center gap-2 px-4 py-3">
                      <div className="w-12 h-12 rounded-full bg-orci-cyan/10 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-orci-cyan" />
                      </div>
                      <span className="text-2xl md:text-3xl font-bold text-orci-cyan">
                        {stat.value}
                      </span>
                      <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white/90 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white/90 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export { StatsCarousel };
