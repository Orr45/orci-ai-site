import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Orci AI - הופכים בינה מלאכותית לכלי העבודה החזק ביותר",
  description: "המדריכים, הכלים והסודות שיעזרו לכם לשלוט ב-AI - בפשטות ובגובה העיניים",
  keywords: ["AI", "בינה מלאכותית", "מדריכים", "אוטומציה", "שיווק דיגיטלי"],
  authors: [{ name: "Or Shemer (Orci)" }],
  alternates: {
    canonical: "https://orci-ai-site.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://orci-ai-site.vercel.app",
    siteName: "Orci AI",
    title: "Orci AI - הופכים בינה מלאכותית לכלי העבודה החזק ביותר",
    description: "המדריכים, הכלים והסודות שיעזרו לכם לשלוט ב-AI - בפשטות ובגובה העיניים",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orci AI",
    description: "מדריכי AI בעברית — וידאו, שיווק ואוטומציות",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} antialiased`}>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
