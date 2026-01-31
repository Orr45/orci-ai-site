import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert Google Drive share URL to embed URL
 * @param url - Google Drive share URL (https://drive.google.com/file/d/FILE_ID/view)
 * @returns Embed URL (https://drive.google.com/file/d/FILE_ID/preview)
 */
export function getGoogleDriveEmbedUrl(url: string): string {
  const fileIdMatch = url.match(/\/d\/([^\/]+)/);
  if (!fileIdMatch) {
    throw new Error('Invalid Google Drive URL format');
  }
  const fileId = fileIdMatch[1];
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/**
 * Format video duration in seconds to MM:SS format
 * @param seconds - Duration in seconds
 * @returns Formatted duration string (e.g., "3:45")
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Check if the browser supports backdrop-filter
 */
export function supportsBackdropFilter(): boolean {
  if (typeof window === 'undefined') return false;
  return CSS.supports('backdrop-filter', 'blur(1px)') ||
         CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
}
