import { cn } from '@/lib/utils';
import type { GlassmorphicCardProps } from '@/types';

const blurLevels = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl'
};

export function GlassmorphicCard({
  children,
  blur = 'md',
  border = true,
  gradient = false,
  className,
  onClick
}: GlassmorphicCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl p-6',
        blurLevels[blur],
        gradient
          ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50'
          : 'bg-gray-800/50',
        border && 'border border-orci-cyan/20',
        onClick && 'cursor-pointer transition-all duration-300 hover:bg-gray-800/70 hover:border-orci-cyan/50 hover:shadow-lg hover:shadow-orci-cyan/20',
        className
      )}
    >
      {children}
    </div>
  );
}
