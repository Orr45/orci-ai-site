import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'המוצרים שלנו — פרסומות ותוכן AI לעסקים | Orci AI',
  description:
    'פרסומות וסרטוני סושיאל מבוססי AI לעסקים — תוכן שעוצר את הגלילה, במחיר של חלק מהפקה רגילה. מבצע השקה: 3 סרטונים + 1 מתנה.',
  alternates: {
    canonical: 'https://orci-ai-site.vercel.app/products',
  },
  openGraph: {
    title: 'פרסומות ותוכן AI לעסקים | Orci AI',
    description:
      'תוכן ויראלי מבוסס AI לעסק שלכם — מהיוצר עם 25 מיליון צפיות. מבצע השקה: 3 סרטונים + 1 מתנה.',
    url: 'https://orci-ai-site.vercel.app/products',
    siteName: 'Orci AI',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
