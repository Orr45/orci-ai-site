# SEO Action Plan — Orci AI
**Generated:** 2026-03-25 | **Target Score:** 75+/100

---

## 🔴 Critical — תקן מיד (שעה אחת)

### 1. צור robots.txt
**קובץ:** `public/robots.txt`
```
User-agent: *
Allow: /
Disallow: /api/

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://orci-ai-site.vercel.app/sitemap.xml
```

---

### 2. צור sitemap.xml
**קובץ:** `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://orci-ai-site.vercel.app/</loc><priority>1.0</priority></url>
  <url><loc>https://orci-ai-site.vercel.app/guides</loc><priority>0.9</priority></url>
  <url><loc>https://orci-ai-site.vercel.app/products</loc><priority>0.8</priority></url>
  <url><loc>https://orci-ai-site.vercel.app/portfolio</loc><priority>0.7</priority></url>
  <url><loc>https://orci-ai-site.vercel.app/guides/3d-product</loc><priority>0.8</priority></url>
  <url><loc>https://orci-ai-site.vercel.app/guides/cinematic-lighting</loc><priority>0.8</priority></url>
  <url><loc>https://orci-ai-site.vercel.app/guides/car-miniature</loc><priority>0.8</priority></url>
  <url><loc>https://orci-ai-site.vercel.app/guides/game-world</loc><priority>0.8</priority></url>
  <url><loc>https://orci-ai-site.vercel.app/guides/ai-beginners</loc><priority>0.8</priority></url>
  <url><loc>https://orci-ai-site.vercel.app/guides/ai-influencer</loc><priority>0.8</priority></url>
  <url><loc>https://orci-ai-site.vercel.app/guides/penguin-viral</loc><priority>0.7</priority></url>
</urlset>
```

---

### 3. הוסף metadata ייחודי לדפים ראשיים
**קובץ:** `app/guides/page.tsx` — הוסף בראש הקובץ:
```typescript
export const metadata = {
  title: 'מדריכי AI בעברית — וידאו, שיווק ואוטומציות | Orci AI',
  description: 'מדריכים מעשיים ליצירת תוכן AI ויראלי, שיווק דיגיטלי ואוטומציות — בחינם, בעברית, עם תוצאות אמיתיות.',
}
```

**קובץ:** `app/products/page.tsx` — הוסף:
```typescript
export const metadata = {
  title: 'חבילות שירות AI לעסקים — Starter, Growth, Full Stack | Orci AI',
  description: 'חבילות שירות לעסקים שרוצים נוכחות דיגיטלית, שיווק חכם ואוטומציות — בנייה חד פעמית + תחזוקה שוטפת.',
}
```

**קובץ:** `app/portfolio/page.tsx` — הוסף:
```typescript
export const metadata = {
  title: 'תיק עבודות — פרויקטי AI ושיווק דיגיטלי | Orci AI',
  description: 'דוגמאות לעבודות בתחום בינה מלאכותית, יצירת תוכן ויראלי ושיווק דיגיטלי.',
}
```

---

## 🟠 High — תוך שבוע

### 4. Open Graph + Twitter Cards ב-layout.tsx
הוסף ל-`app/layout.tsx` בתוך `export const metadata`:
```typescript
openGraph: {
  type: 'website',
  locale: 'he_IL',
  url: 'https://orci-ai-site.vercel.app',
  siteName: 'Orci AI',
  title: 'Orci AI - הופכים בינה מלאכותית לכלי העבודה החזק ביותר',
  description: 'המדריכים, הכלים והסודות שיעזרו לכם לשלוט ב-AI',
  images: [{ url: '/og-image.png', width: 1200, height: 630 }],
},
twitter: {
  card: 'summary_large_image',
  title: 'Orci AI',
  description: 'מדריכי AI בעברית',
  images: ['/og-image.png'],
},
```
> גם צריך ליצור תמונת OG — `public/og-image.png` בגודל 1200×630px

---

### 5. Canonical Tags
הוסף ב-`app/layout.tsx`:
```typescript
alternates: {
  canonical: 'https://orci-ai-site.vercel.app',
}
```
ולכל דף ספציפי — canonical עם ה-URL המלא שלו.

---

### 6. HowTo Schema על מדריכים
דוגמה עבור `/guides/3d-product/page.mdx` — הוסף בתחילת הדף:
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "אפקט AR תלת מימד על המוצר שלך",
  "description": "איך ליצור אנימציית AR הולוגרפית שנצמדת למוצר שלך ב-60 שניות",
  "tool": ["Higgsfield NanoBananaPro", "Kling 3.0 Omni", "Kling Edit"],
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "צלמו את המוצר", "text": "תצלמו סרטון שאתם מחזיקים את המוצר ועשו צילום מסך לפריים הראשון" },
    { "@type": "HowToStep", "position": 2, "name": "Higgsfield NanoBananaPro", "text": "מעלים את הצילום מסך ותמונת רפרנס ויוצרים AR overlay" },
    { "@type": "HowToStep", "position": 3, "name": "Kling 3.0 Omni", "text": "Start Frame + End Frame ליצירת אנימציה" },
    { "@type": "HowToStep", "position": 4, "name": "Kling Edit", "text": "מעלים סרטון מקורי + תמונות לקבלת Tracking מושלם" }
  ]
}) }} />
```

---

## 🟡 Medium — תוך חודש

### 7. צור llms.txt
**קובץ:** `public/llms.txt`
```
# Orci AI — AI Guides & Digital Marketing Services (Hebrew)

## About
Orci AI is an AI education and digital marketing service platform in Hebrew.
Owner: Or Shemer (Orci) — content creator, IDF officer, AI specialist.

## Content
- Free AI guides (video + written) in Hebrew
- Topics: viral video creation, AR effects, AI influencers, cinematic lighting
- Tools covered: Higgsfield, Kling, Gemini, ElevenLabs, ChatGPT, ManyChat

## Services
- Starter Package: digital presence setup (website + Instagram + chatbot)
- Growth Package: digital upgrade for existing businesses
- Full Stack: coming soon

## Contact
WhatsApp: https://wa.me/972542599107
```

---

### 8. תיקון slug names
| נוכחי | מומלץ |
|-------|--------|
| /guides/new-guide | /guides/floating-trend |
| /guides/new-guide-2 | /guides/abandoned-figures |

> **חשוב:** הוסף redirects ב-`next.config.ts` לפני שינוי ה-slugs כדי לשמור קישורים קיימים.

---

### 9. הוסף Person Schema לדף הבית
```json
{
  "@type": "Person",
  "@context": "https://schema.org",
  "name": "Or Shemer",
  "alternateName": "Orci",
  "description": "יוצר תוכן AI, קצין מילואים, מומחה שיווק דיגיטלי",
  "sameAs": ["https://www.instagram.com/orciai"],
  "knowsAbout": ["Artificial Intelligence", "Content Creation", "Digital Marketing", "Video Production"]
}
```

---

## 📊 צפי לשיפור לאחר יישום

| שלב | פעולות | צפי Score |
|-----|---------|-----------|
| נקודת פתיחה | — | 41/100 |
| Critical fixes | robots, sitemap, metadata | 58/100 |
| High fixes | OG, canonical, HowTo schema | 70/100 |
| Medium fixes | llms.txt, slugs, Person schema | 78/100 |
