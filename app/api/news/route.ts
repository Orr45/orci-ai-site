import { NextResponse } from 'next/server';
import type { NewsItem } from '@/types';

const RSS_URL = 'https://techcrunch.com/category/artificial-intelligence/feed/';

async function translateToHebrew(text: string): Promise<string> {
  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=he&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await res.json();
    return data[0]?.map((s: [string]) => s[0]).join('') || text;
  } catch {
    return text;
  }
}

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

    // Try multiple image sources
    let imageUrl = '';
    const mediaContent = item.match(/<media:content[^>]+url=["']([^"']+)["']/);
    const mediaThumbnail = item.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/);
    const enclosure = item.match(/<enclosure[^>]+url=["']([^"']+)["']/);

    if (mediaContent) imageUrl = mediaContent[1];
    else if (mediaThumbnail) imageUrl = mediaThumbnail[1];
    else if (enclosure) imageUrl = enclosure[1];
    else imageUrl = extractImageFromContent(descRaw);

    const description = stripHtml(descRaw).slice(0, 200);

    items.push({ title: stripHtml(title), description, link, pubDate, imageUrl });
  }

  return items;
}

export async function GET() {
  try {
    const rssResponse = await fetch(RSS_URL, {
      next: { revalidate: 10800 }, // Cache for 3 hours
    });

    if (!rssResponse.ok) {
      throw new Error(`RSS fetch failed: ${rssResponse.status}`);
    }

    const xml = await rssResponse.text();
    const rawItems = parseRssItems(xml);

    // Translate all items in parallel
    const newsItems: NewsItem[] = await Promise.all(
      rawItems.map(async (item, index) => {
        const [translatedTitle, translatedDescription] = await Promise.all([
          translateToHebrew(item.title),
          translateToHebrew(item.description),
        ]);

        return {
          id: `news-${index}`,
          title: translatedTitle,
          description: translatedDescription,
          imageUrl: item.imageUrl,
          sourceUrl: item.link,
          date: item.pubDate
            ? new Date(item.pubDate).toLocaleDateString('he-IL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '',
          source: 'TechCrunch',
        };
      })
    );

    return NextResponse.json(newsItems);
  } catch (error) {
    console.error('News fetch error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
