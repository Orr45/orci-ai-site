import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { kv } from '@vercel/kv';

const RSS_SOURCES = [
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
  },
  {
    name: 'The Verge AI',
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  },
  {
    name: 'VentureBeat AI',
    url: 'https://venturebeat.com/category/ai/feed/',
  },
];

// Created on first use, so a build without OPENAI_API_KEY (e.g. a preview deploy) doesn't fail.
let client: OpenAI | null = null;
const getOpenAI = () => (client ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));

interface NewsSource {
  title: string;
  link: string;
  source: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

async function fetchRssHeadlines(rssUrl: string, sourceName: string): Promise<NewsSource[]> {
  try {
    const response = await fetch(rssUrl, {
      cache: 'no-store' // Don't cache for cron job
    });
    if (!response.ok) return [];

    const xml = await response.text();
    const items: NewsSource[] = [];

    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
      const item = match[1];

      const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
        item.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? stripHtml(titleMatch[1]) : '';

      const linkMatch = item.match(/<link>(.*?)<\/link>/) ||
        item.match(/<link[^>]*href=["']([^"']+)["']/);
      const link = linkMatch ? linkMatch[1] : '';

      if (title && link) {
        items.push({ title, link, source: sourceName });
      }
    }

    return items;
  } catch (error) {
    console.error(`Error fetching ${sourceName}:`, error);
    return [];
  }
}

async function generateDailySummary(headlines: NewsSource[]): Promise<string> {
  const headlineText = headlines
    .map((h, i) => `${i + 1}. [${h.source}] ${h.title}`)
    .join('\n');

  const response = await getOpenAI().chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `אתה "Orci" - מומחה AI, יזם וקצין במילואים. הטון שלך הוא שילוב של אנרגיה של יוצר תוכן עם חדות של מפקד שמנתח את שדה הקרב הטכנולוגי.

סכם את חדשות ה-AI לפורמט של נקודות (Bullet Points). לכל נושא, ספק:
1. השורה התחתונה: מה קרה (במשפט אחד).
2. ההרחבה: פרטים טכניים או פונקציונליים רלוונטיים (2-3 שורות).
3. הזווית של Orci (האימפקט): ניתוח אישי - איך זה משנה את חוקי המשחק, למי זה עוזר, ואיך זה ישפיע על עולם ה-AI.

כללים:
- פורמט: נקודות ברורות
- שפה: עברית מדוברת, "בגובה העיניים", מקצועית אך לא מעונבת
- איסורים: אל תשתמש באימוג'ים. אל תוסיף הקדמות כמו "הנה הסיכום"
- אורך: עד 3 נקודות מרכזיות (החשובות ביותר)

פורמט הפלט:
• [שם הכלי/החברה]: [תיאור קצר]. [הרחבה].
הזווית של Orci: [ניתוח האימפקט].`,
      },
      {
        role: 'user',
        content: `סכם את חדשות ה-AI האחרונות:\n\n${headlineText}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });

  return response.choices[0]?.message?.content?.trim() || '';
}

export async function GET(request: Request) {
  try {
    // Optional security: Check for CRON_SECRET
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🔄 Starting daily news update...');

    // Fetch headlines from all sources
    const allHeadlines: NewsSource[] = [];

    for (const source of RSS_SOURCES) {
      const headlines = await fetchRssHeadlines(source.url, source.name);
      allHeadlines.push(...headlines);
    }

    if (allHeadlines.length === 0) {
      throw new Error('No headlines fetched from any source');
    }

    console.log(`✅ Fetched ${allHeadlines.length} headlines`);

    // Generate summary with OpenAI
    const summary = await generateDailySummary(allHeadlines);

    if (!summary) {
      throw new Error('Failed to generate summary');
    }

    console.log('✅ Generated AI summary');

    // Get Israel time
    const israelTime = new Intl.DateTimeFormat('he-IL', {
      timeZone: 'Asia/Jerusalem',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());

    // Prepare data to save
    const data = {
      summary,
      timestamp: israelTime,
      sources: allHeadlines.slice(0, 6),
      lastUpdated: new Date().toISOString(),
    };

    // Save to Vercel KV (Redis)
    await kv.set('daily-pulse', data);

    console.log('✅ Saved to Vercel KV');

    return NextResponse.json({
      success: true,
      message: 'Daily pulse updated successfully',
      timestamp: israelTime,
      headlinesCount: allHeadlines.length,
    });

  } catch (error) {
    console.error('❌ Cron job error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        hasApiKey: !!process.env.OPENAI_API_KEY,
      },
      { status: 500 }
    );
  }
}
