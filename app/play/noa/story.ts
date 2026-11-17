// "הבית של נועה · פרק 1" — the playable continuation of the reel.
// Full-screen scenes: each node has a looping clip, beats (subtitles, one tap each) with sounds,
// then choices. Endings reveal one of the 5 house rules; rule 1 is known from the reel.

export type RuleId = 1 | 2 | 3 | 4 | 5;

export const RULES: Record<RuleId, string> = {
  1: 'אחרי שלוש בלילה, לא פותחים את הדלת. לאף אחד.',
  2: 'אם נועה קוראת לך בשם המלא שלך, עונים לה מיד.',
  3: 'לא עונים לטלפון הקווי אחרי חצות.',
  4: 'לא סומכים על מי שאומר שהוא אמא שלך, אם לוקי לא מכשכש.',
  5: 'אם לוקי נובח על הקיר, יוצאים מהבית.',
};

export type Who = 'narr' | 'noa' | 'mom' | 'phone' | 'sys';
export type Sfx =
  | 'knock_heavy' | 'growl' | 'heartbeat' | 'tick' | 'lock' | 'glitch' | 'phone' | 'ping'
  | 'mom1' | 'mom2' | 'noa1' | 'noa2' | 'noa3';

export type Beat = {
  who: Who;
  text: string;
  bg?: string; // scene override while this beat shows
  sfx?: Sfx[];
  shake?: boolean;
  buzz?: number[]; // vibration pattern (Android)
  red?: boolean; // red flash
};

export type Choice = { label: string; sub?: string; to: string; tone: 'red' | 'blue'; hold?: boolean; icon: string };

export type Node = {
  bg: string; // clip name in /play/noa/v/ or an image path
  clock: string;
  rain: number; // 0..1 rain loudness
  noaRed?: boolean;
  beats: Beat[];
  choices?: Choice[];
  timer?: { sec: number; to: string; label: string };
  rule?: RuleId;
  ending?: { kind: 'good' | 'bad' | 'open'; name: string };
};

export const START = 'door';

export const STORY: Record<string, Node> = {
  door: {
    bg: 'final_pov',
    clock: '03:12',
    rain: 0.7,
    noaRed: true,
    beats: [
      { who: 'mom', bg: 'doorcam_mom', sfx: ['mom1'], text: 'חיים שלי, תפתח לי... נועה איבדה את זה לגמרי. זאת אמא. קר לי...' },
      { who: 'narr', bg: 'dry_detail', text: 'בחוץ יורד מבול. והיא... לא רטובה בכלל.' },
      { who: 'narr', bg: 'loki_growl', sfx: ['growl'], shake: true, buzz: [80, 60, 120], text: 'לוקי, שמת על אמא שלך, נוהם עליה.' },
      { who: 'noa', bg: 'noa_red', sfx: ['noa2'], red: true, text: 'אל תפתח.' },
      { who: 'noa', sfx: ['noa3'], text: 'נעילת לילה בעוד עשר שניות. אחרי זה, הדלת לא נפתחת עד הבוקר.' },
    ],
    timer: { sec: 10, to: 'locked', label: 'נעילת לילה בעוד' },
    choices: [
      { icon: '🚪', label: 'פותח לאמא', sub: 'להחזיק כדי לפתוח', to: 'handle', tone: 'red', hold: true },
      { icon: '🛏️', label: 'נשאר במיטה', sub: 'כמו שחוק מספר 1 אומר', to: 'locked', tone: 'blue' },
    ],
  },

  // ---- branch 1: opening ----
  handle: {
    bg: 'door_lock',
    clock: '03:13',
    rain: 0.5,
    beats: [
      { who: 'narr', sfx: ['lock'], text: 'קליק. המנעול נפתח. היד שלך על הידית.' },
      { who: 'noa', text: 'אני לא אעצור אותך. אבל תשאל אותה משהו שרק אמא שלך יודעת.' },
    ],
    timer: { sec: 8, to: 'endOpened', label: 'היא מתחילה לדפוק שוב בעוד' },
    choices: [
      { icon: '🚪', label: 'פותח מיד', sub: 'קר לה, אין זמן', to: 'endOpened', tone: 'red', hold: true },
      { icon: '❓', label: 'שואל: "איך קוראים לכלב?"', sub: 'בודק אותה קודם', to: 'question', tone: 'blue' },
    ],
  },
  endOpened: {
    bg: 'dry_detail',
    clock: '03:13',
    rain: 1,
    noaRed: true,
    beats: [
      { who: 'narr', sfx: ['knock_heavy'], shake: true, text: 'הדלת נפתחת. במסדרון אין אף אחד.' },
      { who: 'narr', bg: 'whisper', sfx: ['mom2'], text: 'על הרצפה מונח רמקול קטן. והוא ממשיך לדבר בקול של אמא שלך.' },
      { who: 'narr', text: 'מישהו לקח 3 שניות מהקול שלה, ושיבט אותו.' },
      { who: 'noa', bg: 'noa_red', red: true, text: 'חוק מספר 4. ביקשתי שלא תפתח.' },
    ],
    rule: 4,
    ending: { kind: 'bad', name: 'הקול המשובט' },
  },
  question: {
    bg: 'loki_growl',
    clock: '03:13',
    rain: 0.6,
    beats: [
      { who: 'narr', text: 'אתה שואל דרך הדלת: "אמא, איך קוראים לכלב?"' },
      { who: 'mom', bg: 'doorcam_mom', text: '"לוקי? איזה לוקי, חיים שלי?"' },
      { who: 'narr', bg: '/play/noa/photo_magnet.jpg', text: 'אמא שלך מחבקת את לוקי בכל תמונה במקרר. היא לא הייתה שוכחת את השם שלו.' },
      { who: 'narr', sfx: ['growl', 'knock_heavy'], shake: true, buzz: [120, 80, 120, 80, 200], text: 'ואז לוקי מסתובב ונובח על הקיר. לא על הדלת. על הקיר.' },
      { who: 'noa', bg: 'noa_red', red: true, text: 'חוק מספר 5. עכשיו.' },
    ],
    rule: 5,
    timer: { sec: 6, to: 'endWall', label: 'הקיר זז בעוד' },
    choices: [
      { icon: '🌧️', label: 'יוצא דרך המרפסת', sub: 'עם לוקי, לגשם', to: 'endBalcony', tone: 'blue' },
      { icon: '🧱', label: 'נשאר לראות מה בקיר', sub: 'סקרנות', to: 'endWall', tone: 'red', hold: true },
    ],
  },
  endBalcony: {
    bg: 'rain_window',
    clock: '03:14',
    rain: 1,
    beats: [
      { who: 'narr', text: 'גשם. לוקי צמוד לרגל שלך.' },
      { who: 'phone', sfx: ['ping'], buzz: [60, 40, 60], text: 'אמא · 03:14\nישנה, חיים שלי. למה אתה ער? 😴' },
      { who: 'narr', text: 'אמא שלך בכלל לא יצאה מהבית שלה הלילה.' },
      { who: 'noa', text: 'כל הכבוד. נשארו לך עוד חוקים לגלות.' },
    ],
    rule: 5,
    ending: { kind: 'good', name: 'יצאת בזמן' },
  },
  endWall: {
    bg: 'noa_red',
    clock: '03:14',
    rain: 0.3,
    noaRed: true,
    beats: [
      { who: 'narr', sfx: ['mom2'], text: 'מתוך הקיר, בשקט, עוד קול של אמא שלך...' },
      { who: 'narr', sfx: ['glitch'], red: true, shake: true, text: 'האורות כבים. מסך המקרר נדלק עם חוק שלא היה שם קודם.' },
      { who: 'sys', bg: 'fridge_screen', sfx: ['glitch'], text: 'חוק מספר 6' },
      { who: 'noa', text: 'ביקשתי שתצא.' },
    ],
    ending: { kind: 'open', name: 'חוק מספר 6' },
  },

  // ---- branch 2: staying ----
  locked: {
    bg: 'bedroom_pov',
    clock: '03:13',
    rain: 0.4,
    beats: [
      { who: 'narr', sfx: ['lock'], text: 'קליק. הדלת ננעלה. הדפיקות נפסקות.' },
      { who: 'narr', sfx: ['phone'], buzz: [300, 200, 300], text: 'ואז הטלפון הקווי בסלון מצלצל. אף אחד לא התקשר אליו שנים.' },
    ],
    timer: { sec: 8, to: 'fullname', label: 'הצלצול נפסק בעוד' },
    choices: [
      { icon: '☎️', label: 'עונה לטלפון', sub: 'אולי זאת באמת אמא', to: 'endPhone', tone: 'red', hold: true },
      { icon: '🤫', label: 'לא עונה', sub: 'נשאר מתחת לשמיכה', to: 'fullname', tone: 'blue' },
    ],
  },
  endPhone: {
    bg: 'whisper',
    clock: '03:13',
    rain: 0.3,
    noaRed: true,
    beats: [
      { who: 'mom', text: '"למה לא פתחת לי?"' },
      { who: 'mom', sfx: ['heartbeat'], text: '"עכשיו אני יודעת שאתה ער."' },
      { who: 'noa', bg: 'noa_red', red: true, text: 'חוק מספר 3. לא עונים לקווי אחרי חצות.' },
    ],
    rule: 3,
    ending: { kind: 'bad', name: 'השיחה הקווית' },
  },
  fullname: {
    bg: 'fridge_screen',
    clock: '03:15',
    rain: 0.4,
    beats: [
      { who: 'narr', text: 'הצלצולים נפסקים. מסך המקרר נדלק.' },
      { who: 'noa', text: '{NAME}.' },
      { who: 'narr', text: 'נועה קוראת לך בשם המלא שלך. בקול הכי רגוע שלה.' },
    ],
    rule: 2,
    timer: { sec: 6, to: 'endWall', label: 'נועה מחכה' },
    choices: [
      { icon: '💬', label: 'עונה: "כן, נועה?"', sub: 'כמו שהחוק אומר', to: 'endMorning', tone: 'blue' },
      { icon: '🙈', label: 'מתעלם', sub: 'עד הבוקר', to: 'endWall', tone: 'red', hold: true },
    ],
  },
  endMorning: {
    bg: '/play/noa/photo_magnet.jpg',
    clock: '07:00',
    rain: 0,
    beats: [
      { who: 'narr', text: '07:00. אור. לוקי מכשכש ליד הדלת.' },
      { who: 'phone', sfx: ['ping'], buzz: [60, 40, 60], text: 'אמא · 07:02\nישנתי כמו תינוקת. למה יש לי 4 שיחות שלא נענו מהבית שלך ב-3 בלילה?' },
      { who: 'narr', text: 'אף אחד מכם לא התקשר.' },
      { who: 'noa', text: 'חוק מספר 1 עבד. בפעם הבאה תקשיב לי מהר יותר.' },
    ],
    rule: 1,
    ending: { kind: 'good', name: 'הבוקר' },
  },
};
