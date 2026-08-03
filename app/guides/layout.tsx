import type { Metadata } from 'next';
import GuideGuard from '@/components/ui/guide-guard';

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
  /* The guides reading area is a permanent dark zone ("learning theater"):
     design tokens flip to dark inside this subtree regardless of site theme,
     so all existing MDX articles (built on light-text-over-dark) stay readable. */
  return (
    <div data-theme="dark" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      <GuideGuard>{children}</GuideGuard>
    </div>
  );
}
