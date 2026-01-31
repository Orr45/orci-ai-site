import type { VideoData } from '@/types';

/**
 * Guide Videos for Orci AI Learning Hub
 *
 * To add your videos:
 * 1. Upload video to Google Drive
 * 2. Right-click → Share → Set to "Anyone with the link can view"
 * 3. Copy the share link (format: https://drive.google.com/file/d/FILE_ID/view)
 * 4. Paste it as the 'url' value below
 *
 * IMPORTANT: Make sure videos allow embedding (check Drive settings)
 */
export const GUIDE_VIDEOS: VideoData[] = [
  {
    id: 'guide-1',
    title: 'מדריך AI למתחילים',
    description: 'כל מה שצריך לדעת כדי להתחיל עם בינה מלאכותית',
    url: 'https://drive.google.com/file/d/1t8UxYi84o7mw4pYQPywae6nNr9ESGleU/preview?usp=sharing',
    category: 'יסודות AI'
  },
  {
    id: 'guide-2',
    title: 'אוטומציות עם ChatGPT',
    description: 'איך לחסוך שעות עבודה עם אוטומציות חכמות',
    url: 'https://drive.google.com/file/d/1VKn0udX27xpT3MhJd8EzmjHb-a6dTmq0/preview?usp=sharing',
    category: 'אוטומציה'
  },
  {
    id: 'guide-3',
    title: 'יצירת תוכן ויראלי',
    description: 'הסודות ליצירת תוכן שמקבל מיליוני צפיות',
    url: 'https://drive.google.com/file/d/1V540n8u5zz2zbcVdMLAzHI9-VK3B6lS7/preview?usp=sharing',
    category: 'תוכן'
  },
  {
    id: 'guide-4',
    title: 'שיווק דיגיטלי מתקדם',
    description: 'אסטרטגיות שיווק שעובדות ב-2025',
    url: 'https://drive.google.com/file/d/1t8UxYi84o7mw4pYQPywae6nNr9ESGleU/view?usp=sharing',
    category: 'שיווק'
  },
  {
    id: 'guide-5',
    title: 'בניית מותג אישי',
    description: 'איך להפוך את עצמך למותג מבוקש',
    url: 'https://drive.google.com/file/d/1VKn0udX27xpT3MhJd8EzmjHb-a6dTmq0/view?usp=sharing',
    category: 'מיתוג'
  },
  {
    id: 'guide-6',
    title: 'AI לעסקים',
    description: 'כלי AI שכל עסק חייב להכיר',
    url: 'https://drive.google.com/file/d/1V540n8u5zz2zbcVdMLAzHI9-VK3B6lS7/view?usp=sharing',
    category: 'עסקים'
  }
];

/**
 * QUICK START:
 *
 * 1. Replace the video URLs above with your actual Google Drive links
 * 2. Update titles and descriptions in Hebrew
 * 3. Save this file
 * 4. Run: git add . && git commit -m "Update guide videos" && git push
 * 5. Vercel will auto-deploy in ~30 seconds!
 *
 * TROUBLESHOOTING:
 *
 * If videos don't play:
 * - Check that video is set to "Anyone with the link can view"
 * - Try opening the /preview link directly in browser
 * - Some Google Drive videos can't be embedded (download restriction)
 * - Alternative: Upload to YouTube and use YouTube embed instead
 */
