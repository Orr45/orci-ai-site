import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
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
  authors: [{ name: "Or Shmer (Orci)" }],
  viewport: "width=device-width, initial-scale=1",
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
      </body>
    </html>
  );
}
