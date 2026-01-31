import { cn } from '@/lib/utils';
import type { CTAButtonProps } from '@/types';

const variants = {
  primary: 'bg-gradient-to-l from-orci-cyan to-orci-blue text-black hover:shadow-lg hover:shadow-orci-cyan/50',
  secondary: 'border-2 border-orci-cyan text-orci-cyan hover:bg-orci-cyan hover:text-black',
  outline: 'border border-gray-600 text-gray-300 hover:border-orci-cyan hover:text-orci-cyan'
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-10 py-5 text-xl'
};

export function CTAButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className
}: CTAButtonProps) {
  const baseStyles = 'font-bold rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2';
  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={combinedClassName}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
