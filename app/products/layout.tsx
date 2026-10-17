import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'פרסומות לעסקים — בלי יום צילום | Orci AI',
  description:
    'פרסומות שנראות כמו הפקה גדולה, בלי יום צילום. עבדנו עם LAGO, TROYA, ELA-YAM ועוד. 4 סרטוני פרסומת ו-8 פוסטים בחודש ב-3,600 ₪ במחיר השקה — בלי התחייבות.',
  alternates: {
    canonical: 'https://orci-ai-site.vercel.app/products',
  },
  openGraph: {
    title: 'פרסומות לעסקים — בלי יום צילום | Orci AI',
    description:
      'עבדנו עם LAGO, TROYA, ELA-YAM ועוד. 4 סרטוני פרסומת ו-8 פוסטים בחודש ב-3,600 ₪ במחיר השקה — בלי התחייבות.',
    url: 'https://orci-ai-site.vercel.app/products',
    siteName: 'Orci AI',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
