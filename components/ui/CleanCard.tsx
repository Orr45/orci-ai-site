import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CleanCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'flat' | 'hover';
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

/**
 * CleanCard - Bootstrap-inspired card component (cap4learning style)
 * Replaces GlassmorphicCard with clean, professional design
 */
export function CleanCard({
  children,
  className,
  variant = 'default',
  padding = 'md',
  onClick
}: CleanCardProps) {
  const baseStyles = 'rounded-lg transition-all duration-300';

  const variantStyles = {
    default: 'clean-card',
    flat: 'clean-card-flat',
    hover: 'clean-card cursor-pointer'
  };

  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
