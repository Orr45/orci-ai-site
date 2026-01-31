import { cn } from '@/lib/utils';
import type { SectionHeaderProps } from '@/types';

export function SectionHeader({ children, className }: SectionHeaderProps) {
  return (
    <h2
      className={cn(
        'text-3xl md:text-5xl font-bold mb-12 text-center',
        className
      )}
    >
      <span className="text-transparent bg-clip-text bg-gradient-to-l from-orci-cyan to-orci-blue">
        {children}
      </span>
    </h2>
  );
}
