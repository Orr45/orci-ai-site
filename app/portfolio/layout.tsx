import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'תיק עבודות — פרויקטי AI ושיווק דיגיטלי | Orci AI',
  description: 'דוגמאות לעבודות בתחום בינה מלאכותית, יצירת תוכן ויראלי ושיווק דיגיטלי.',
  alternates: {
    canonical: 'https://orci-ai-site.vercel.app/portfolio',
  },
  openGraph: {
    title: 'תיק עבודות | Orci AI',
    description: 'דוגמאות לעבודות בתחום בינה מלאכותית, יצירת תוכן ויראלי ושיווק דיגיטלי.',
    url: 'https://orci-ai-site.vercel.app/portfolio',
    siteName: 'Orci AI',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
