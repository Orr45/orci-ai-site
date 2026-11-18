import type { Metadata } from 'next';
import Game from './Game';

export const metadata: Metadata = {
  title: 'הבית של נועה · פרק 1 | משחק | Orci AI',
  description: 'ב-3 בלילה אמא דופקת בדלת, וה-AI של הבית אומר לא לפתוח. בחרו מה לעשות, גלו 3 סופים, ולמדו איך מגינים על המשפחה משיבוט קול.',
  alternates: { canonical: 'https://www.orciai.app/play/noa' },
  openGraph: {
    title: 'הבית של נועה · פרק 1',
    description: 'אמא בדלת. ה-AI אומר לא לפתוח. מה אתם עושים?',
    url: 'https://www.orciai.app/play/noa',
    siteName: 'Orci AI',
    locale: 'he_IL',
    type: 'website',
    images: [{ url: 'https://www.orciai.app/play/noa/og.jpg', width: 1200, height: 630, alt: 'הבית של נועה' }],
  },
  twitter: { card: 'summary_large_image', images: ['https://www.orciai.app/play/noa/og.jpg'] },
};

export default function Page() {
  return <Game />;
}
