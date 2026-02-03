import { NextResponse } from 'next/server';
import OpenAI from 'openai';

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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
      next: { revalidate: 86400 } // Cache RSS for 24 hours
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

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `אתה "Orci" - מומחה AI ישראלי צעיר ואנרגטי שמסביר חדשות טכנולוגיה בצורה מגניבה ובגובה העיניים.

כתוב סיכום יומי של חדשות ה-AI בעברית (5-8 שורות).

סגנון:
- טון אנרגטי של יוצר תוכן
- כתוב כאילו אתה מדבר עם חבר
- ציין את הכלים או הפריצות המרכזיות
- השתמש בעברית טבעית ומדוברת
- אל תשתמש באימוג'ים
- תהיה ישיר ורלוונטי

החזר רק את הפסקה עצמה, בלי כותרת או הקדמה.`,
      },
      {
        role: 'user',
        content: `סכם את חדשות ה-AI האחרונות:\n\n${headlineText}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return response.choices[0]?.message?.content?.trim() || '';
}

// Cache the result in memory (works per serverless instance)
let cachedData: {
  summary: string;
  timestamp: string;
  sources: NewsSource[];
  generatedAt: number;
} | null = null;

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function GET() {
  const now = Date.now();

  // Return cached data if fresh
  if (cachedData && (now - cachedData.generatedAt) < CACHE_DURATION) {
    return NextResponse.json({
      summary: cachedData.summary,
      timestamp: cachedData.timestamp,
      sources: cachedData.sources,
      isEmpty: false,
      cached: true,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      },
    });
  }

  try {
    // Fetch headlines from all sources
    const allHeadlines: NewsSource[] = [];

    for (const source of RSS_SOURCES) {
      const headlines = await fetchRssHeadlines(source.url, source.name);
      allHeadlines.push(...headlines);
    }

    if (allHeadlines.length === 0) {
      return NextResponse.json({
        summary: '',
        timestamp: '',
        sources: [],
        isEmpty: true,
        error: 'No headlines available',
      });
    }

    // Generate summary with OpenAI
    const summary = await generateDailySummary(allHeadlines);

    if (!summary) {
      throw new Error('Failed to generate summary');
    }

    // Get Israel time
    const israelTime = new Intl.DateTimeFormat('he-IL', {
      timeZone: 'Asia/Jerusalem',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());

    // Cache the result
    cachedData = {
      summary,
      timestamp: israelTime,
      sources: allHeadlines.slice(0, 6),
      generatedAt: now,
    };

    return NextResponse.json({
      summary: cachedData.summary,
      timestamp: cachedData.timestamp,
      sources: cachedData.sources,
      isEmpty: false,
      cached: false,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      },
    });

  } catch (error) {
    console.error('Daily pulse error:', error);

    // Return cached data if available, even if stale
    if (cachedData) {
      return NextResponse.json({
        summary: cachedData.summary,
        timestamp: cachedData.timestamp,
        sources: cachedData.sources,
        isEmpty: false,
        stale: true,
      });
    }

    return NextResponse.json({
      summary: '',
      timestamp: '',
      sources: [],
      isEmpty: true,
      error: error instanceof Error ? error.message : 'Unknown error',
      hasKey: !!process.env.OPENAI_API_KEY,
    });
  }
}
