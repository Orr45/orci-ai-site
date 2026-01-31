export interface VideoData {
  id: string;
  title: string;
  description: string;
  url: string;
  category?: string;
  duration?: string;
}

export interface ProductFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  highlighted?: boolean;
}

export interface CTAButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export interface GlassmorphicCardProps {
  children: React.ReactNode;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  gradient?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
}

export interface VideoPlayerProps {
  googleDriveUrl: string;
  title?: string;
  aspectRatio?: '16/9' | '9/16';
  autoplay?: boolean;
  className?: string;
}

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

export interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavigationProps {
  className?: string;
}
