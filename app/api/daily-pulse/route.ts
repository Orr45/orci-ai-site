import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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
    // Read from data/daily-pulse.json
    const filePath = path.join(process.cwd(), 'data', 'daily-pulse.json');

    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data: DailyPulseData = JSON.parse(fileContent);

    // Check if data is empty or stale (older than 25 hours)
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

    // Return empty data if file doesn't exist or is corrupted
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
