# SEO Full Audit Report — Orci AI
**Site:** https://orci-ai-site.vercel.app
**Date:** 2026-03-25
**Pages Crawled:** 7 (/, /guides, /products, /portfolio, /guides/3d-product, /guides/cinematic-lighting, + missing pages)

---

## 🏆 SEO Health Score: 41 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|---------|
| Technical SEO | 22% | 25/100 | 5.5 |
| Content Quality | 23% | 70/100 | 16.1 |
| On-Page SEO | 20% | 45/100 | 9.0 |
| Schema / Structured Data | 10% | 0/100 | 0 |
| Performance (CWV) | 10% | 75/100 | 7.5 |
| AI Search Readiness | 10% | 15/100 | 1.5 |
| Images | 5% | 45/100 | 2.3 |
| **TOTAL** | | | **41.9** |

---

## Executive Summary

### Top 5 Critical Issues
1. **אין robots.txt** — מנועי חיפוש עובדים בחושך, ללא הנחיות סריקה
2. **אין sitemap.xml** — Google לא יודע אילו עמודים קיימים
3. **כותרות ומטא זהות ב-4 דפים** — /guides, /products, /portfolio יורשים את כותרת הבית
4. **אין Open Graph tags** — שיתוף ברשתות חברתיות נראה גרוע (ללא תמונה/כותרת)
5. **אין Structured Data** — מפספסים Rich Results ב-Google (HowTo, Article, LocalBusiness)

### Top 5 Quick Wins (ניתן לתקן תוך שעה)
1. צור `public/robots.txt` — 5 דקות
2. צור `public/sitemap.xml` — 10 דקות
3. הוסף metadata ייחודי לכל דף בודד — 20 דקות
4. הוסף Open Graph tags ב-layout.tsx — 15 דקות
5. תקן alt text לתמונות בדף הבית — 10 דקות

---

## Technical SEO (25/100)

### ❌ robots.txt — חסר לחלוטין
```
GET https://orci-ai-site.vercel.app/robots.txt → 404
```
**השפעה:** מנועי חיפוש אינם יודעים אם להסרוק את האתר. ברירת המחדל היא לסרוק הכל, אך ללא הנחיות לא ניתן לחסום עמודים פנימיים (API routes, /api/*)

**תיקון:**
```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://orci-ai-site.vercel.app/sitemap.xml
```

### ❌ sitemap.xml — חסר לחלוטין
```
GET https://orci-ai-site.vercel.app/sitemap.xml → 404
```
**השפעה:** Google מגלה עמודים רק דרך קישורים פנימיים. מדריכים חדשים עלולים לא להיסרק שבועות.

**עמודים שצריכים להיות ב-sitemap:**
- / (home)
- /guides
- /products
- /portfolio
- /guides/ai-beginners
- /guides/ai-influencer
- /guides/penguin-viral
- /guides/new-guide
- /guides/new-guide-2
- /guides/3d-product
- /guides/cinematic-lighting
- /guides/car-miniature
- /guides/game-world

### ❌ Canonical Tags — חסרים בכל הדפים
אין `<link rel="canonical">` בשום עמוד. Next.js לא מוסיף אוטומטית.
**סיכון:** תוכן כפול (www vs non-www, trailing slash).

### ✅ HTTPS — תקין
האתר פועל על HTTPS דרך Vercel. אין בעיות אבטחה.

### ✅ Mobile — תקין
האתר רספונסיבי, RTL מלא.

### ⚠️ Internal Links to Dead Pages
- `/contact` עדיין מופיע בקישורים פנימיים בבלוק הניווט של גרסאות ישנות
- `/guides/new-guide` ו-`/guides/new-guide-2` — שמות לא תיאוריים לעמודים

---

## Content Quality (70/100)

### ✅ תוכן ייחודי במדריכים
כל מדריך כולל תוכן ייחודי ומפורט בעברית. המדריכים בפורמט HowTo מה שמצוין לסכמה.

### ✅ כותרות H1 ייחודיות בדפים הפנימיים
- `/guides/3d-product` H1: "אפקט AR תלת מימד על המוצר שלך" ✅
- `/guides/cinematic-lighting` H1: "הטריק שהופך כל סרטון לרגע קולנועי" ✅

### ❌ E-E-A-T — חסר ביסוס מקצועי
האתר לא כולל:
- דף "אודות" עם פרטי ביוגרפיה מלאים
- הוכחות סמכות (תעודות, פרסומים, ציטוטים)
- סקירות וחוות דעת של לקוחות (testimonials)
- תאריכי עדכון אחרון על מדריכים

### ⚠️ אורך תוכן
מדריכים הם בינוניים באורך. Google מעדיף מדריכים מקיפים (1500+ מילים) לביטויים תחרותיים.

---

## On-Page SEO (45/100)

### ❌ כותרות דפים — 4 דפים עם כותרת זהה

| דף | כותרת נוכחית | מצב |
|----|-------------|------|
| / | "Orci AI - הופכים בינה מלאכותית לכלי העבודה החזק ביותר" | ✅ |
| /guides | **זהה לבית** | ❌ |
| /products | **זהה לבית** | ❌ |
| /portfolio | **זהה לבית** | ❌ |
| /guides/3d-product | "אפקט AR תלת מימד על המוצר שלך | Orci AI" | ✅ |
| /guides/cinematic-lighting | "תאורה קולנועית עם AI | Orci AI" | ✅ |

**סיבה:** הדפים הראשיים (guides, products, portfolio) לא מגדירים `export const metadata` משלהם, ולכן יורשים מ-layout.tsx.

### ❌ Meta Descriptions — 4 דפים עם תיאור זהה
אותה בעיה — /guides, /products, /portfolio חסרים metadata ייחודי.

### ✅ מבנה כותרות (H1-H6)
כל דף כולל H1 יחיד ומתאים. מבנה הירארכי תקין.

### ⚠️ Slug names לא אופטימליים
- `/guides/new-guide` — לא תיאורי, לא ידידותי ל-SEO
- `/guides/new-guide-2` — אותה בעיה

---

## Schema / Structured Data (0/100)

### ❌ אין JSON-LD בשום עמוד

**הזדמנויות שמפוספסות:**

**1. HowTo Schema** — בדיוק מתאים למדריכי ה-AI:
```json
{
  "@type": "HowTo",
  "name": "אפקט AR תלת מימד על המוצר שלך",
  "step": [
    { "@type": "HowToStep", "name": "שלב 1: צילום המוצר", "text": "..." },
    { "@type": "HowToStep", "name": "שלב 2: Higgsfield", "text": "..." }
  ]
}
```

**2. LocalBusiness / Person Schema** — לדף הבית:
```json
{
  "@type": "Person",
  "name": "Or Shemer",
  "alternateName": "Orci",
  "knowsAbout": ["Artificial Intelligence", "Content Creation", "Digital Marketing"]
}
```

**3. Article Schema** — לכל מדריך.

---

## Images (45/100)

### ❌ תמונות דף הבית — חסר alt text
Next.js Image component מוגדר ללא `alt` תיאורי על תמונות הבנטו.

### ✅ מדריכים פנימיים — alt text תקין
- `/guides/3d-product`: "הצילום המקורי של הנעל", "אייר גורדן עם AR overlay" ✅

### ⚠️ פורמט תמונות
Next.js ממיר אוטומטית ל-WebP/AVIF — תקין.

---

## AI Search Readiness (15/100)

### ❌ אין llms.txt
קובץ `llms.txt` מסמן לבוטים של AI (Perplexity, ChatGPT) מה תוכן האתר ואיך לצטט אותו.

### ❌ אין ביסוס ציטוט
Perplexity ו-ChatGPT Search מחפשים:
- תוכן עם "מי כתב זאת" ברור
- תאריכי פרסום
- קישורים חיצוניים אמינים

### ⚠️ AI Crawlers
`robots.txt` חסר — אין הנחיות ל-GPTBot, ClaudeBot, PerplexityBot.

---

## סיכום ממצאים לפי עדיפות

### 🔴 Critical (תקן מיד)
1. robots.txt חסר
2. sitemap.xml חסר
3. כותרות ומטא זהות על 4 דפים

### 🟠 High (תוך שבוע)
4. Open Graph tags חסרים בכל הדפים
5. Canonical tags חסרים
6. Alt text חסר בתמונות דף הבית
7. Structured Data (HowTo) על מדריכים

### 🟡 Medium (תוך חודש)
8. llms.txt לנגישות AI
9. Renaming slugs (/new-guide → /floating-trend)
10. E-E-A-T — הוספת testimonials ותאריכי עדכון

### 🟢 Low (backlog)
11. FAQ schema על /products
12. Person schema על דף הבית
13. Article schema על מדריכים
