'use client';

import { FloatingElement } from './FloatingElement';

export function BackgroundGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <FloatingElement delay={0} duration={8} yOffset={20}>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-orci-cyan/10 rounded-full blur-3xl" />
      </FloatingElement>
      <FloatingElement delay={1} duration={10} yOffset={30}>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-orci-blue/10 rounded-full blur-3xl" />
      </FloatingElement>
    </div>
  );
}
