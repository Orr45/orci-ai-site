import type { Metadata } from 'next';
import { Karantina } from 'next/font/google';

// Condensed display face for this page only (the Lando × Mat Voyce concept). Frank Ruhl comes from the root layout.
const karantina = Karantina({
  variable: '--font-karantina',
  subsets: ['hebrew', 'latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'פרסומות לעסקים — בלי יום צילום | Orci AI',
  description:
    'פרסומות שנראות כמו הפקה גדולה, בלי יום צילום. עבדנו עם LAGO, TROYA, ELA-YAM ועוד. 3 סרטונים + רביעי מתנה ב-2,250 ₪ — ולא משלמים עד שאישרתם את התסריט.',
  alternates: {
    canonical: 'https://orci-ai-site.vercel.app/products',
  },
  openGraph: {
    title: 'פרסומות לעסקים — בלי יום צילום | Orci AI',
    description:
      'עבדנו עם LAGO, TROYA, ELA-YAM ועוד. 3 סרטונים + רביעי מתנה ב-2,250 ₪ — ולא משלמים עד שאישרתם את התסריט.',
    url: 'https://orci-ai-site.vercel.app/products',
    siteName: 'Orci AI',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <div className={karantina.variable}>{children}</div>;
}
