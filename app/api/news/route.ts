import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { NewsItem } from '@/types';

const RSS_URL = 'https://techcrunch.com/category/artificial-intelligence/feed/';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function extractImageFromContent(content: string): string {
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/);
  if (imgMatch) return imgMatch[1];
  const mediaMatch = content.match(/<media:content[^>]+url=["']([^"']+)["']/);
  if (mediaMatch) return mediaMatch[1];
  return '';
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

function parseRssItems(xml: string): Array<{
  title: string;
  description: string;
  link: string;
  pubDate: string;
  imageUrl: string;
}> {
  const items: Array<{
    title: string;
    description: string;
    link: string;
    pubDate: string;
    imageUrl: string;
  }> = [];

  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null && items.length < 6) {
    const item = match[1];

    const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.[1] ||
      item.match(/<title>(.*?)<\/title>/)?.[1] || '';

    const descRaw = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/)?.[1] ||
      item.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '';

    const link = item.match(/<link>(.*?)<\/link>/)?.[1] ||
      item.match(/<link[^>]*href=["']([^"']+)["']/)?.[1] || '';

    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';

    let imageUrl = '';
    const mediaContent = item.match(/<media:content[^>]+url=["']([^"']+)["']/);
    const mediaThumbnail = item.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/);
    const enclosure = item.match(/<enclosure[^>]+url=["']([^"']+)["']/);

    if (mediaContent) imageUrl = mediaContent[1];
    else if (mediaThumbnail) imageUrl = mediaThumbnail[1];
    else if (enclosure) imageUrl = enclosure[1];
    else imageUrl = extractImageFromContent(descRaw);

    const description = stripHtml(descRaw).slice(0, 500);

    items.push({ title: stripHtml(title), description, link, pubDate, imageUrl });
  }

  return items;
}

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const published = new Date(dateStr);
  const diffMs = now.getTime() - published.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `לפני ${diffMins} דקות`;
  if (diffHours < 24) return `לפני ${diffHours} שעות`;
  if (diffDays === 1) return 'אתמול';
  if (diffDays < 7) return `לפני ${diffDays} ימים`;
  return new Date(dateStr).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function rewriteWithOrci(
  items: Array<{ title: string; description: string }>
): Promise<Array<{ title: string; bottomLine: string; bullets: string[]; orciTake: string }>> {
  const prompt = items
    .map((item, i) => `Article ${i + 1}:\nTitle: ${item.title}\nSummary: ${item.description}`)
    .join('\n\n');

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `אתה "Orci" - מומחה AI ישראלי, בן 24, שמסביר חדשות טכנולוגיה בצורה פשוטה, מגניבה ובגובה העיניים.

לכל כתבה שתקבל, תחזיר JSON array עם:
- title: כותרת קליטה בעברית (קצרה, תופסת)
- bottomLine: שורה תחתונה - משפט אחד שמסכם את הכל
- bullets: מערך של 3 נקודות מפתח בעברית (קצרות וברורות)
- orciTake: התייחסות אישית של Orci - תובנה חכמה או הערה שנונה בעברית (1-2 משפטים)

כללים:
- כתוב כאילו אתה מדבר עם חבר בן 22
- בלי ז'רגון טכני מיותר
- תהיה ישיר, מעניין ורלוונטי
- השתמש בעברית טבעית ומדוברת

החזר ONLY valid JSON array, no markdown, no backticks.`,
        },
        {
          role: 'user',
          content: `תעבד את ${items.length} הכתבות הבאות:\n\n${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content?.trim() || '[]';
    // Clean potential markdown wrapping
    const cleaned = content.replace(/^```json?\n?/, '').replace(/\n?```$/, '');
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('OpenAI error:', error);
    // Fallback: return basic Hebrew translations
    return items.map((item) => ({
      title: item.title,
      bottomLine: item.description.slice(0, 100),
      bullets: [],
      orciTake: '',
    }));
  }
}

export async function GET() {
  try {
    const rssResponse = await fetch(RSS_URL, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!rssResponse.ok) {
      throw new Error(`RSS fetch failed: ${rssResponse.status}`);
    }

    const xml = await rssResponse.text();
    const rawItems = parseRssItems(xml);

    // Send all items to OpenAI in one batch
    const rewritten = await rewriteWithOrci(rawItems);

    const newsItems: NewsItem[] = rawItems.map((item, index) => ({
      id: `news-${index}`,
      title: rewritten[index]?.title || item.title,
      bottomLine: rewritten[index]?.bottomLine || '',
      bullets: rewritten[index]?.bullets || [],
      orciTake: rewritten[index]?.orciTake || '',
      imageUrl: item.imageUrl,
      sourceUrl: item.link,
      date: item.pubDate ? getTimeAgo(item.pubDate) : '',
      publishedAt: item.pubDate || '',
      source: 'TechCrunch',
    }));

    return NextResponse.json(newsItems);
  } catch (error) {
    console.error('News fetch error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
