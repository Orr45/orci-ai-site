// "הבית של נועה · פרק 1" — the playable continuation of the reel.
// Teaches one thing: AI can clone a voice from a few seconds, so families need a secret code word.
// Every path has at most 3 decisions and ends in one of 3 endings (tree drawn for Or on 18.11):
//   door ─ open ─ handle ─ open now / timeout ───────────────── robbed
//                        └ ask the code word ─ codeword ─ open anyway / timeout ─ robbed
//                                                       └ lock the door ───────── endCode (best)
//        └ stay / timeout ─ phone ─ don't answer / timeout ──── morning
//                                 └ answer ─ call ─ open ─────── robbed
//                                                  └ hang up / timeout ─ morning
// Timers pick the passive option, except while the door is unlocked: then they push in.

export type EndingId = 'robbed' | 'morning' | 'endCode';
export type EndingKind = 'bad' | 'good' | 'best';

export const ENDINGS: { id: EndingId; name: string; kind: EndingKind }[] = [
  { id: 'robbed', name: 'נשדדת', kind: 'bad' },
  { id: 'morning', name: 'הבוקר', kind: 'good' },
  { id: 'endCode', name: 'מילת הקוד', kind: 'best' },
];

export type Who = 'narr' | 'noa' | 'mom' | 'phone' | 'sys';
export type Sfx =
  | 'knock_heavy' | 'growl' | 'heartbeat' | 'tick' | 'lock' | 'glitch' | 'phone' | 'ping'
  | 'mom1' | 'mom2' | 'noa1' | 'noa2' | 'noa3'
  // new lines for this tree (Cartesia, recorded after Or's yes; until then they are skipped silently)
  | 'noa_code' | 'noa_dont' | 'mom_word' | 'mom_phone' | 'mom_real' | 'mom_code';

export type Beat = {
  who: Who;
  text: string; // {NAME} = the player's name, dropped when they didn't give one
  tag?: string; // speaker label override, e.g. mom on the landline
  bg?: string; // scene override while this beat shows
  clock?: string; // clock override (a jump to the morning inside one node)
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
  ending?: { id: EndingId; title: string; what: string }; // title + what happened; the shared lesson is LESSON below
};

// The moral, shown big on every ending (Or 18.11: the game exists to teach this, so it must stand out).
// FBI PSA I-120324-PSA (3.12.2024) recommends a family secret word against voice cloning.
export const LESSON = {
  moral: ['קול אפשר לשבט.', 'מילת קוד אי אפשר.'], // one line each
  how: 'מספיקות כמה שניות של הקלטה: סטורי, הודעה קולית, סרטון מאירוע משפחתי. תוכנת AI לומדת מהן את הקול, ואז אפשר לגרום לו להגיד כל דבר, גם בבכי ובפאניקה. נוכלים משתמשים בזה כדי להתקשר בקול של הילד, ההורה או בן הזוג, ולבקש כסף או עזרה דחופה.',
  flags: [
    'לחץ ודחיפות: "עכשיו, אין זמן להסביר"',
    'בקשה לכסף, להעברה בביט או לפתוח את הדלת',
    '"אל תספר לאף אחד"',
    'מספר לא מוכר או שעה מוזרה',
  ],
  steps: [
    'קבעו היום מילת קוד עם המשפחה. מילה שלא כתובה בשום מקום ולא מופיעה ברשתות.',
    'בכל שיחה דחופה "מהמשפחה", בקשו את המילה לפני שאתם עושים משהו.',
    'בספק? נתקו והתקשרו בחזרה למספר שאתם מכירים.',
  ],
  source: 'גם ה-FBI ממליץ למשפחות לקבוע מילה סודית בגלל שיבוט קולות (אזהרה לציבור, דצמבר 2024).',
};

export const START = 'door';

const MORNING_IMG = '/play/noa/photo_magnet.jpg';
const MOM_MORNING = '/play/noa/morning_mom.jpg';
const LANDLINE = '/play/noa/landline.jpg';
const ROBBERS = '/play/noa/robbers.jpg';

export const STORY: Record<string, Node> = {
  // ---- decision 1 ----
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
    timer: { sec: 10, to: 'phone', label: 'נעילת לילה בעוד' },
    choices: [
      { icon: '🚪', label: 'פותח לאמא', sub: 'להחזיק כדי לפתוח', to: 'handle', tone: 'red', hold: true },
      { icon: '🛏️', label: 'נשאר במיטה', sub: 'כמו שנועה ביקשה', to: 'phone', tone: 'blue' },
    ],
  },

  // ---- branch 1: you opened the lock ----
  handle: {
    bg: 'final_pov',
    clock: '03:13',
    rain: 0.5,
    beats: [
      { who: 'narr', bg: 'door_lock', sfx: ['lock'], text: 'קליק. המנעול נפתח. היד שלך על הידית.' },
      { who: 'noa', bg: 'noa_red', red: true, sfx: ['noa_code'], text: 'רגע. לפחות תבקש ממנה את מילת הקוד של המשפחה.' },
    ],
    timer: { sec: 8, to: 'robbed', label: 'המנעול פתוח. עוד' },
    choices: [
      { icon: '🚪', label: 'פותח בלי לשאול', sub: 'קר לה, אין זמן', to: 'robbed', tone: 'red', hold: true },
      { icon: '🔑', label: 'שואל: "אמא, מה מילת הקוד?"', sub: 'רק המשפחה יודעת אותה', to: 'codeword', tone: 'blue' },
    ],
  },
  codeword: {
    bg: 'whisper',
    clock: '03:13',
    rain: 0.6,
    noaRed: true,
    beats: [
      { who: 'narr', text: 'אתה שואל דרך הדלת: "אמא, מה מילת הקוד שלנו?"' },
      { who: 'mom', bg: 'doorcam_mom', sfx: ['mom_word'], text: 'איזו מילה? חיים שלי, תפתח כבר, קר לי!' },
      { who: 'narr', bg: 'loki_growl', sfx: ['growl'], shake: true, buzz: [80, 60, 120], text: 'היא לא יודעת. ולוקי לא מפסיק לנהום.' },
      { who: 'noa', bg: 'noa_red', red: true, text: 'אמא שלך הייתה עונה בלי לחשוב.' },
    ],
    timer: { sec: 6, to: 'robbed', label: 'המנעול עדיין פתוח. עוד' },
    choices: [
      { icon: '🚪', label: 'פותח בכל זאת', sub: 'אולי היא פשוט שכחה', to: 'robbed', tone: 'red', hold: true },
      { icon: '🔒', label: 'נועל את הדלת', sub: 'בלי מילת קוד, לא נכנסים', to: 'endCode', tone: 'blue' },
    ],
  },

  // ---- branch 2: you stayed in bed ----
  phone: {
    bg: LANDLINE,
    clock: '03:13',
    rain: 0.4,
    beats: [
      { who: 'narr', bg: 'bedroom_pov', sfx: ['lock'], text: 'קליק. הדלת ננעלה לכל הלילה. הדפיקות נפסקות.' },
      { who: 'narr', sfx: ['phone'], buzz: [300, 200, 300], text: 'ואז הטלפון הקווי בסלון מצלצל. אף אחד לא התקשר אליו שנים.' },
      { who: 'noa', bg: 'noa_red', red: true, sfx: ['noa_dont'], text: '{NAME}, אל תענה.' },
    ],
    timer: { sec: 8, to: 'morning', label: 'הצלצול נפסק בעוד' },
    choices: [
      { icon: '☎️', label: 'עונה לטלפון', sub: 'אולי זאת באמת אמא', to: 'call', tone: 'red', hold: true },
      { icon: '🤫', label: 'לא עונה', sub: 'נשאר מתחת לשמיכה', to: 'morning', tone: 'blue' },
    ],
  },
  call: {
    bg: LANDLINE,
    clock: '03:14',
    rain: 0.3,
    noaRed: true,
    beats: [
      { who: 'narr', text: 'אתה מרים את השפופרת.' },
      { who: 'mom', tag: 'אמא · בטלפון הקווי', sfx: ['mom_phone'], text: 'חיים שלי, בבקשה תפתח לי. אני מחוץ לדלת, קר לי... אני מתחננת.' },
      { who: 'noa', bg: 'noa_red', red: true, text: 'זה הקול שלה. זאת לא היא.' },
    ],
    timer: { sec: 8, to: 'morning', label: 'היא מנתקת בעוד' },
    choices: [
      { icon: '🚪', label: 'פותח לה', sub: 'היא מתחננת', to: 'robbed', tone: 'red', hold: true },
      { icon: '📵', label: 'מנתק וחוזר לישון', sub: 'אם זאת אמא, היא תבין בבוקר', to: 'morning', tone: 'blue' },
    ],
  },

  // ---- endings ----
  robbed: {
    bg: ROBBERS,
    clock: '03:15',
    rain: 1,
    noaRed: true,
    beats: [
      { who: 'narr', bg: 'door_lock', sfx: ['knock_heavy'], shake: true, text: 'הדלת נפתחת. אמא לא שם.' },
      { who: 'narr', sfx: ['glitch'], red: true, buzz: [120, 80, 200], text: 'שני שודדים בכובעי גרב דוחפים את הדלת ונכנסים. לוקי נובח בלי הפסקה.' },
      { who: 'narr', sfx: ['mom1'], text: 'על השטיח בכניסה מונח רמקול קטן. והוא מנגן שוב את אותו משפט, בדיוק באותה מנגינה, בקול של אמא שלך.' },
      { who: 'noa', bg: 'noa_red', red: true, text: 'מישהו לקח כמה שניות מהקול שלה, מסטורי באינסטגרם, ושיבט אותו.' },
    ],
    ending: {
      id: 'robbed',
      title: 'הקול היה של אמא. מי שדיבר, לא.',
      what: 'פתחת כי זה נשמע בדיוק כמו אמא שלך. זה כל הטריק: מישהו הקליט כמה שניות מהקול שלה, ו-AI הפך אותן לכל משפט שהוא רצה, באותה מנגינה ובאותה תחינה. זה נקרא שיבוט קול.',
    },
  },
  morning: {
    bg: MOM_MORNING,
    clock: '07:00',
    rain: 0,
    beats: [
      { who: 'narr', bg: MORNING_IMG, text: '07:00. אור. לוקי מכשכש ליד הדלת.' },
      { who: 'narr', text: 'אתה מתקשר לאמא.' },
      { who: 'mom', tag: 'אמא · 07:01', sfx: ['mom_real'], text: 'חיים שלי? ישנתי כל הלילה כמו תינוקת. מה קרה?' },
      { who: 'narr', text: 'היא בכלל לא יצאה מהבית. מי שעמד אצלך בדלת, דיבר בקול שלה.' },
      { who: 'noa', text: 'בפעם הבאה, תבקש את מילת הקוד.' },
    ],
    ending: {
      id: 'morning',
      title: 'ניצלת. הפעם.',
      what: 'לא פתחת, וזה הציל אותך. אבל לא הייתה לך שום דרך לדעת אם זאת אמא. במציאות אין נועה שתזהיר אותך, וזה מגיע בטלפון באמצע היום, עם בקשה דחופה לכסף.',
    },
  },
  endCode: {
    bg: MOM_MORNING,
    clock: '03:14',
    rain: 0.5,
    beats: [
      { who: 'narr', bg: 'door_lock', sfx: ['lock'], text: 'קליק. נעלת.' },
      { who: 'narr', bg: 'door_lock', sfx: ['knock_heavy'], shake: true, text: 'הדפיקות הופכות למכות. ואז שקט. צעדים מתרחקים במדרגות.' },
      { who: 'narr', bg: MORNING_IMG, clock: '07:00', text: '07:00. אתה מתקשר לאמא.' },
      { who: 'mom', clock: '07:01', tag: 'אמא · 07:01', sfx: ['mom_code'], text: 'מילת הקוד? "פלאפל", ברור. למה אתה שואל אותי את זה ב-7 בבוקר?' },
      { who: 'noa', clock: '07:01', text: 'קול אפשר לשבט. מילת קוד אי אפשר.' },
    ],
    ending: {
      id: 'endCode',
      title: 'מילת קוד ניצחה את ה-AI.',
      what: 'שאלת שאלה אחת שרק אמא האמיתית יודעת לענות עליה. הקול היה מושלם, אבל את מילת הקוד אי אפשר לשבט. בדיוק ככה עושים את זה בחיים.',
    },
  },
};
