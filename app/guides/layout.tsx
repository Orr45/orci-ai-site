import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדריכי AI בעברית — וידאו, שיווק ואוטומציות | Orci AI',
  description: 'מדריכים מעשיים ליצירת תוכן AI ויראלי, שיווק דיגיטלי ואוטומציות — בחינם, בעברית, עם תוצאות אמיתיות.',
  alternates: {
    canonical: 'https://orci-ai-site.vercel.app/guides',
  },
  openGraph: {
    title: 'מדריכי AI בעברית | Orci AI',
    description: 'מדריכים מעשיים ליצירת תוכן AI ויראלי, שיווק דיגיטלי ואוטומציות.',
    url: 'https://orci-ai-site.vercel.app/guides',
    siteName: 'Orci AI',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
