export interface GuideData {
  id: string;
  title: string;
  description: string;
  summary: string; // AI Synthesis pre-written summary shown on card
  image: string;
  href: string;
  category: string;
  popular: boolean;
  isNew: boolean;
  date: string; // ISO date for sorting
  free: boolean; // first 2 are free, rest need email gate
}

export const GUIDES: GuideData[] = [
  {
    id: 'ai-beginners',
    title: 'חפצים מדברים עם AI',
    description: 'איך ליצור את הטרנד הוויראלי של החפצים המדברים - מדריך שלב אחר שלב',
    summary: 'המדריך הזה מלמד אתכם ליצור סרטוני "חפצים מדברים" תוך 15 דקות. תלמדו לבחור אובייקט, לכתוב סקריפט קצר ומושך, ולהשתמש ב-AI לסינכרון שפתיים ואנימציה. הפורמט הזה מייצר עשרות אלפי צפיות כי הוא מפתיע ומשעשע.',
    image: '/guides/guide-talking-objects.png',
    href: '/guides/ai-beginners',
    category: 'יצירת תוכן',
    popular: true,
    isNew: false,
    date: '2026-01-10',
    free: true,
  },
  {
    id: 'ai-influencer',
    title: 'יצירת משפיענית AI ב-60 שניות',
    description: 'מדריך מקיף ליצירת משפיענית AI שמדברת עברית ונראית אמיתית לחלוטין',
    summary: 'בפחות מדקה תוכלו ליצור דמות AI שמדברת עברית, נראית אנושית לגמרי, ויכולה לשמש ככוכב הסרטונים שלכם. המדריך מכסה בחירת מודל, עריכת הקול, סנכרון שפתיים, ואפקטים שגורמים לה לנראות ממש אמיתית.',
    image: '/guides/guide-ai-influencer.png',
    href: '/guides/ai-influencer',
    category: 'יצירת תוכן',
    popular: true,
    isNew: false,
    date: '2026-01-18',
    free: true,
  },
  {
    id: 'penguin-viral',
    title: 'טרנד הפינגווין הוויראלי',
    description: 'איך לקחת טרנד קיים ולתת לו טוויסט ישראלי שמכפיל את הצפיות',
    summary: 'טרנד הפינגווין הפך ויראלי ברחבי העולם - אבל הגרסאות הישראליות קיבלו פי 3 צפיות. המדריך מסביר את הפסיכולוגיה מאחורי ה"טוויסט המקומי", ואיך ליצור גרסה עם AI שמרגישה אותנטית ומקומית.',
    image: '/guides/guide-penguin-viral.png',
    href: '/guides/penguin-viral',
    category: 'וידאו ויראלי',
    popular: true,
    isNew: false,
    date: '2026-01-25',
    free: false,
  },
  {
    id: 'new-guide',
    title: 'טרנד הריחוף',
    description: 'כיצד ליצור סרטוני ריחוף ריאליסטיים עם AI ללא ציוד מיוחד',
    summary: 'ריחוף בלי חוטים, בלי כרומה-קי, ובלי תקציב. המדריך חושף את הטריק שאיתו אלפי יוצרים מסתננים לאלגוריתם - שימוש ב-AI ליצירת אשלייה אופטית מושלמת של ריחוף, ואיך לתזמן את הסרטון לשיא ההגעה.',
    image: '/guides/guide-floating-trend.png',
    href: '/guides/new-guide',
    category: 'וידאו ויראלי',
    popular: false,
    isNew: true,
    date: '2026-02-01',
    free: false,
  },
  {
    id: 'new-guide-2',
    title: 'טרנד הדמיות הנטושות',
    description: 'צעד אחרי צעד כיצד תוכלו ליצור את טרנד הדמיות הנטושות',
    summary: 'הטרנד הכי מצמרר ברשת - ודווקא בגלל זה הכי ויראלי. המדריך מסביר איך ליצור דמות נטושה שנראית מפחידה ואמיתית עם AI, ואיך לבנות סצנות שגורמות לצפיות להמשיך לצפות עד הסוף ולשתף.',
    image: '/guides/guide-abandoned-figures.png',
    href: '/guides/new-guide-2',
    category: 'וידאו ויראלי',
    popular: false,
    isNew: true,
    date: '2026-02-08',
    free: false,
  },
  {
    id: 'car-miniature',
    title: 'טריק הרכב המיניאטורי',
    description: 'הטריק שמשגע את הרשת - בלי אפקטים מיוחדים, רק 2 סרטונים פשוטים',
    summary: 'הפשוט הוא הוויראלי. שני סרטונים פשוטים + AI = אפקט מיניאטורה שגורם לאנשים לצפות שוב ושוב. המדריך מסביר בדיוק את הזוויות, התאורה, ואיזה כלי AI לשלב כדי לקבל תוצאה שנראית מקצועית.',
    image: '/guides/guide-car-miniature.png',
    href: '/guides/car-miniature',
    category: 'יצירת תוכן',
    popular: true,
    isNew: true,
    date: '2026-02-15',
    free: false,
  },
];

// Legacy export for guides page video section
export const GUIDE_VIDEOS = [
  {
    id: 'guide-1',
    title: 'חפצים מדברים עם AI',
    description: 'איך ליצור את הטרנד של החפצים המדברים',
    url: 'https://www.youtube.com/shorts/lxrvd_y8tPI',
    category: 'יצירת תוכן',
  },
];
