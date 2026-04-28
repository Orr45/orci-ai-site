import { Metadata } from 'next';
import WeeklyDashboardClient from '@/components/ui/weekly-dashboard';
import dashboardData from '@/data/weekly-dashboard.json';
import { WeeklyDashboardData } from '@/types';

export const metadata: Metadata = {
  title: 'עדכון שבועי AI | Orci AI',
  description: 'כל מה שיצא בעולם הבינה המלאכותית השבוע — כלים חדשים, עדכונים, חדשות וטרנדים בעברית.',
  openGraph: {
    title: 'עדכון שבועי AI | Orci AI',
    description: 'כל מה שיצא בעולם הבינה המלאכותית השבוע — כלים חדשים, עדכונים, חדשות וטרנדים בעברית.',
    url: 'https://orci.ai/weekly',
  },
};

export default function WeeklyPage() {
  return <WeeklyDashboardClient data={dashboardData as WeeklyDashboardData} />;
}
