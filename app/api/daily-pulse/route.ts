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
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'daily-pulse.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data: DailyPulseData = JSON.parse(fileContent);

    // Check if data is stale (more than 25 hours old) or empty
    if (!data.summary || !data.lastUpdated) {
      return NextResponse.json({
        ...data,
        isEmpty: true,
      });
    }

    const lastUpdate = new Date(data.lastUpdated);
    const now = new Date();
    const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);

    return NextResponse.json({
      ...data,
      isEmpty: false,
      isStale: hoursSinceUpdate > 25,
    });

  } catch (error) {
    console.error('Error reading daily pulse:', error);
    return NextResponse.json({
      summary: '',
      timestamp: '',
      sources: [],
      lastUpdated: '',
      isEmpty: true,
      error: 'Failed to load news',
    });
  }
}
