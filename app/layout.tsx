import type { Metadata } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { Analytics } from "@vercel/analytics/next";
import AccessibilityWidget from "@/components/ui/accessibility-widget";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "אור שמר | Orci AI — שיווק ופרסומות AI לעסקים",
  description: "פרסומות וסרטוני סושיאל ברמה קולנועית לעסק שלך — עם AI, כמעט ללא תקציב הפקה. מהיוצר שמאחורי מיליוני צפיות. וגם: מדריכי AI חינמיים בעברית.",
  keywords: ["AI", "בינה מלאכותית", "שיווק לעסקים", "פרסומות AI", "סרטוני AI", "מדריכים"],
  authors: [{ name: "Or Shemer (Orci)" }],
  alternates: {
    canonical: "https://orci-ai-site.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://orci-ai-site.vercel.app",
    siteName: "Orci AI",
    title: "אור שמר | Orci AI — שיווק ופרסומות AI לעסקים",
    description: "פרסומות וסרטוני סושיאל ברמה קולנועית לעסק שלך — עם AI, כמעט ללא תקציב הפקה.",
    images: [{ url: "https://orci-ai-site.vercel.app/og-image.png", width: 1200, height: 630, alt: "Orci AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orci AI — שיווק ופרסומות AI לעסקים",
    description: "פרסומות AI ברמה קולנועית לעסקים + מדריכי AI בעברית",
    images: ["https://orci-ai-site.vercel.app/og-image.png"],
  },
};

/* Applies saved theme before first paint (no flash). Default: light. */
const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('orci-theme');
    if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${heebo.variable} ${frankRuhl.variable} antialiased`}>
        <a href="#main-content" className="skip-link">דלג לתוכן הראשי</a>
        <Navigation />
        <main id="main-content">
          {children}
        </main>
        <AccessibilityWidget />
        <Analytics />
      </body>
    </html>
  );
}
