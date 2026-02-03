import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { promises as fs } from 'fs';
import path from 'path';

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

interface DailyPulseData {
  summary: string;
  timestamp: string;
  sources: NewsSource[];
  lastUpdated: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

async function fetchRssHeadlines(rssUrl: string, sourceName: string): Promise<NewsSource[]> {
  try {
    const response = await fetch(rssUrl, { cache: 'no-store' });
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

export async function GET(request: NextRequest) {
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // Allow access if: no secret configured (dev), or secret matches, or it's from Vercel Cron
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  const isAuthorized = !cronSecret || authHeader === `Bearer ${cronSecret}` || isVercelCron;

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('Starting daily pulse update...');

    // Fetch headlines from all sources
    const allHeadlines: NewsSource[] = [];

    for (const source of RSS_SOURCES) {
      const headlines = await fetchRssHeadlines(source.url, source.name);
      allHeadlines.push(...headlines);
    }

    if (allHeadlines.length === 0) {
      throw new Error('No headlines fetched from any source');
    }

    console.log(`Fetched ${allHeadlines.length} headlines`);

    // Generate summary with OpenAI
    const summary = await generateDailySummary(allHeadlines);

    if (!summary) {
      throw new Error('Failed to generate summary');
    }

    // Prepare data
    const now = new Date();
    const israelTime = new Intl.DateTimeFormat('he-IL', {
      timeZone: 'Asia/Jerusalem',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(now);

    const data: DailyPulseData = {
      summary,
      timestamp: israelTime,
      sources: allHeadlines.slice(0, 6), // Keep top 6 sources for display
      lastUpdated: now.toISOString(),
    };

    // Save to JSON file
    const filePath = path.join(process.cwd(), 'data', 'daily-pulse.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    console.log('Daily pulse updated successfully');

    return NextResponse.json({
      success: true,
      message: 'Daily pulse updated',
      timestamp: israelTime,
      headlinesCount: allHeadlines.length,
    });

  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({
      error: 'Update failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      hasKey: !!process.env.OPENAI_API_KEY,
    }, { status: 500 });
  }
}
