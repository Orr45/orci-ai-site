import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'חבילות שירות AI לעסקים — Starter, Growth, Full Stack | Orci AI',
  description: 'חבילות שירות לעסקים שרוצים נוכחות דיגיטלית, שיווק חכם ואוטומציות — בנייה חד פעמית עם תחזוקה שוטפת.',
  alternates: {
    canonical: 'https://orci-ai-site.vercel.app/products',
  },
  openGraph: {
    title: 'חבילות שירות AI לעסקים | Orci AI',
    description: 'חבילות שירות לעסקים שרוצים נוכחות דיגיטלית, שיווק חכם ואוטומציות.',
    url: 'https://orci-ai-site.vercel.app/products',
    siteName: 'Orci AI',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
