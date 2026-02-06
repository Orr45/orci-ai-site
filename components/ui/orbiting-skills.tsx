"use client"
import React, { useEffect, useState, memo } from 'react';
import { Sparkles, PenTool, Zap, TrendingUp, Users, Brain, Video } from 'lucide-react';

// --- Type Definitions ---
type ServiceType = 'content' | 'automation' | 'marketing' | 'social' | 'consulting' | 'video';

type GlowColor = 'cyan' | 'deepCyan';

interface ServiceIconProps {
  type: ServiceType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: ServiceType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Service Icon Components ---
const serviceIcons: Record<ServiceType, { icon: React.ElementType; color: string }> = {
  content: { icon: PenTool, color: '#00d1ff' },
  automation: { icon: Zap, color: '#00bfff' },
  marketing: { icon: TrendingUp, color: '#00d1ff' },
  social: { icon: Users, color: '#00bfff' },
  consulting: { icon: Brain, color: '#00d1ff' },
  video: { icon: Video, color: '#00bfff' },
};

const ServiceIcon = memo(({ type }: ServiceIconProps) => {
  const config = serviceIcons[type];
  if (!config) return null;
  const Icon = config.icon;
  return <Icon className="w-5 h-5" style={{ color: config.color }} />;
});
ServiceIcon.displayName = 'ServiceIcon';

// --- Configuration ---
const skillsConfig: SkillConfig[] = [
  // Inner Orbit
  {
    id: 'content',
    orbitRadius: 100,
    size: 44,
    speed: 0.8,
    iconType: 'content',
    phaseShift: 0,
    glowColor: 'cyan',
    label: 'יצירת תוכן AI',
  },
  {
    id: 'automation',
    orbitRadius: 100,
    size: 44,
    speed: 0.8,
    iconType: 'automation',
    phaseShift: (2 * Math.PI) / 3,
    glowColor: 'cyan',
    label: 'אוטומציות חכמות',
  },
  {
    id: 'marketing',
    orbitRadius: 100,
    size: 44,
    speed: 0.8,
    iconType: 'marketing',
    phaseShift: (4 * Math.PI) / 3,
    glowColor: 'cyan',
    label: 'שיווק דיגיטלי',
  },
  // Outer Orbit
  {
    id: 'social',
    orbitRadius: 175,
    size: 48,
    speed: -0.5,
    iconType: 'social',
    phaseShift: 0,
    glowColor: 'deepCyan',
    label: 'ניהול רשתות חברתיות',
  },
  {
    id: 'consulting',
    orbitRadius: 175,
    size: 48,
    speed: -0.5,
    iconType: 'consulting',
    phaseShift: (2 * Math.PI) / 3,
    glowColor: 'deepCyan',
    label: 'ייעוץ AI לעסקים',
  },
  {
    id: 'video',
    orbitRadius: 175,
    size: 48,
    speed: -0.5,
    iconType: 'video',
    phaseShift: (4 * Math.PI) / 3,
    glowColor: 'deepCyan',
    label: 'וידאו ויראלי',
  },
];

// --- Orbiting Skill ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-white/90 backdrop-blur-sm
          rounded-full flex items-center justify-center
          border border-orci-cyan/30 transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 25px rgba(0, 209, 255, 0.3), 0 0 50px rgba(0, 209, 255, 0.15)`
            : undefined,
        }}
      >
        <ServiceIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-800/95 backdrop-blur-sm rounded-lg text-xs text-white whitespace-nowrap pointer-events-none font-medium">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Orbit Path ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(0, 209, 255, 0.25)',
      secondary: 'rgba(0, 209, 255, 0.1)',
      border: 'rgba(0, 209, 255, 0.2)',
    },
    deepCyan: {
      primary: 'rgba(0, 191, 255, 0.25)',
      secondary: 'rgba(0, 191, 255, 0.1)',
      border: 'rgba(0, 191, 255, 0.2)',
    },
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 40px ${colors.primary}, inset 0 0 40px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 15px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main Component ---
export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setTime((prevTime) => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'cyan', delay: 0 },
    { radius: 175, glowColor: 'deepCyan', delay: 1.5 },
  ];

  return (
    <div className="w-full flex items-center justify-center overflow-hidden">
      <div
        className="relative w-[calc(100vw-40px)] h-[calc(100vw-40px)] max-w-[420px] max-h-[420px] md:w-[420px] md:h-[420px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Central Icon */}
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center z-10 relative shadow-xl border border-orci-cyan/20">
          <div className="absolute inset-0 rounded-full bg-orci-cyan/15 blur-xl animate-pulse"></div>
          <Sparkles className="relative z-10 w-8 h-8 text-orci-cyan" />
        </div>

        {/* Orbit Paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Orbiting Skills */}
        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill key={config.id} config={config} angle={angle} />
          );
        })}
      </div>
    </div>
  );
}
