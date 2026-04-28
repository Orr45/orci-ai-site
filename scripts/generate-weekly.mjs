/**
 * Weekly AI Dashboard Generator
 *
 * Usage: node scripts/generate-weekly.mjs
 * Requires: OPENAI_API_KEY env var
 *
 * Fetches AI news from RSS feeds, summarizes in Hebrew with Orci's voice,
 * and writes a draft to data/weekly-dashboard.json for review.
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error('❌ חסר OPENAI_API_KEY. הפעל: OPENAI_API_KEY=sk-... node scripts/generate-weekly.mjs');
  process.exit(1);
}

const RSS_SOURCES = [
  { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', name: 'TechCrunch AI' },
  { url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml', name: 'The Verge AI' },
  { url: 'https://venturebeat.com/category/ai/feed/', name: 'VentureBeat AI' },
  { url: 'https://feeds.arstechnica.com/arstechnica/technology-lab', name: 'Ars Technica' },
  { url: 'https://www.artificialintelligence-news.com/feed/', name: 'AI News' },
];

const CATEGORIES = ['כלים חדשים', 'עדכוני גרסה', 'חדשות גדולות', 'טרנדים', 'מחקר'];

function getWeekTitle() {
  const now = new Date();
  const weekNum = getISOWeek(now);
  const month = now.toLocaleDateString('he-IL', { month: 'long' });
  const year = now.getFullYear();
  return `שבוע ${weekNum} — ${month} ${year}`;
}

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getWeekBounds() {
  const now = new Date();
  const day = now.getDay();
  const start = new Date(now);
  start.setDate(now.getDate() - ((day + 1) % 7));
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return {
    weekStart: start.toISOString().split('T')[0],
    weekEnd: end.toISOString().split('T')[0],
  };
}

async function fetchRSS(source) {
  try {
    const res = await fetch(source.url, {
      signal: AbortSignal.timeout(8000),
      headers: { 'User-Agent': 'OrciAI-WeeklyBot/1.0' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();

    const items = [];
    const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);
    for (const match of itemMatches) {
      const block = match[1];
      const title = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || block.match(/<title>(.*?)<\/title>/))?.[1]?.trim();
      const link  = (block.match(/<link>(.*?)<\/link>/))?.[1]?.trim()
                 || (block.match(/<link\s[^>]*href="([^"]+)"/))?.[1]?.trim();
      const desc  = (block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || block.match(/<description>(.*?)<\/description>/))?.[1]
                    ?.replace(/<[^>]+>/g, '').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').trim();

      if (title && link) {
        items.push({ title, link, description: desc ?? '', source: source.name });
      }
      if (items.length >= 5) break;
    }
    return items;
  } catch (err) {
    console.warn(`⚠️ RSS ${source.name}: ${err.message}`);
    return [];
  }
}

async function fetchOGImage(url) {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(5000),
      headers: { 'User-Agent': 'OrciAI-WeeklyBot/1.0' },
    });
    if (!res.ok) return '';
    const html = await res.text();
    const match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
                || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    return match?.[1] ?? '';
  } catch {
    return '';
  }
}

async function summariseItem(item) {
  const prompt = `אתה Orci — מומחה AI, יזם ישראלי, קצין מילואים לשעבר עם יותר מ-130,000 עוקבים.

משימה: תמצת את הכתבה הבאה לכרטיס בדשבורד שבועי עברי.

כותרת מקורית: ${item.title}
תיאור: ${item.description.slice(0, 800)}
מקור: ${item.source}

ענה ב-JSON בלבד (ללא markdown), עם השדות האלה:
{
  "title": "כותרת עברית תמציתית וסקסית (עד 70 תווים)",
  "category": "אחד מ: כלים חדשים | עדכוני גרסה | חדשות גדולות | טרנדים | מחקר",
  "emoji": "אמוג'י רלוונטי אחד",
  "summary": "2 משפטות עבריות המסבירות מה קרה (עד 200 תווים)",
  "details": "פסקה עברית של 3-4 משפטות עם פרטים ומספרים (עד 400 תווים)",
  "orciTake": "הזווית האישית של Orci — מה זה אומר לעסקים ולאנשים שרוצים להתקדם (2-3 משפטות, אנרגטי)",
  "isHot": true/false
}`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 600,
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!res.ok) throw new Error(`OpenAI ${res.status}`);
  const data = await res.json();
  const raw = data.choices[0].message.content.trim();

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in response');
  return JSON.parse(jsonMatch[0]);
}

async function main() {
  console.log('🚀 מתחיל יצירת דשבורד שבועי...\n');

  console.log('📡 שולף RSS מ-5 מקורות...');
  const allItems = (await Promise.all(RSS_SOURCES.map(fetchRSS))).flat();
  console.log(`   נמצאו ${allItems.length} כתבות\n`);

  const deduped = allItems.filter((item, i, arr) =>
    arr.findIndex(x => x.link === item.link) === i
  ).slice(0, 15);

  console.log(`🤖 מסכם ${deduped.length} כתבות בעברית עם GPT-4o-mini...`);

  const results = [];
  for (let i = 0; i < deduped.length; i++) {
    const item = deduped[i];
    process.stdout.write(`   [${i + 1}/${deduped.length}] ${item.title.slice(0, 50)}...`);
    try {
      const summary = await summariseItem(item);
      const image = await fetchOGImage(item.link);
      results.push({
        id: `item-${Date.now()}-${i}`,
        ...summary,
        image,
        link: item.link,
        source: item.source,
        isNew: true,
      });
      console.log(' ✅');
    } catch (err) {
      console.log(` ❌ (${err.message})`);
    }
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300));
  }

  const { weekStart, weekEnd } = getWeekBounds();
  const output = {
    weekTitle: getWeekTitle(),
    weekStart,
    weekEnd,
    updatedAt: new Date().toISOString(),
    items: results,
  };

  const outPath = join(__dirname, '..', 'data', 'weekly-dashboard.json');
  writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`\n✅ נוצרו ${results.length} פריטים ונשמרו ב-data/weekly-dashboard.json`);
  console.log('📝 עכשיו ערוך את הקובץ ב-VS Code, הוסף/תקן תמונות ואז git push');
}

main().catch(err => {
  console.error('\n❌ שגיאה:', err.message);
  process.exit(1);
});
