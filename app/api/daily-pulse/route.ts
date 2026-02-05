import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

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
  isEmpty?: boolean;
}

export async function GET() {
  try {
    // Read from Vercel KV (Redis)
    const data = await kv.get<DailyPulseData>('daily-pulse');

    if (!data || !data.summary) {
      return NextResponse.json({
        summary: '',
        timestamp: '',
        sources: [],
        lastUpdated: '',
        isEmpty: true,
        error: 'No data available yet. Cron job needs to run first.',
      });
    }

    // Check if data is stale (older than 25 hours)
    const isStale = data.lastUpdated
      ? (Date.now() - new Date(data.lastUpdated).getTime()) > (25 * 60 * 60 * 1000)
      : false;

    return NextResponse.json({
      ...data,
      isStale,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (error) {
    console.error('Failed to read daily pulse data:', error);

    // Return empty data if KV read fails
    return NextResponse.json({
      summary: '',
      timestamp: '',
      sources: [],
      lastUpdated: '',
      isEmpty: true,
      error: 'Failed to load daily pulse data',
    });
  }
}
