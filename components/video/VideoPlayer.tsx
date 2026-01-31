import { getGoogleDriveEmbedUrl } from '@/lib/utils';
import type { VideoPlayerProps } from '@/types';

export function VideoPlayer({
  googleDriveUrl,
  title = 'Video',
  aspectRatio = '16/9',
  autoplay = false,
  className = ''
}: VideoPlayerProps) {
  const embedUrl = getGoogleDriveEmbedUrl(googleDriveUrl);
  const autoplayParam = autoplay ? '&autoplay=1' : '';

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio }}
    >
      <iframe
        src={`${embedUrl}${autoplayParam}`}
        title={title}
        className="absolute inset-0 w-full h-full rounded-2xl"
        allow="autoplay; fullscreen"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
