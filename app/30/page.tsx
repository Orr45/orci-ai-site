import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '30 רעיונות AI לעסק שלכם, בלי לצלם | Orci AI',
  description:
    'לוח ל-30 הימים הקרובים: רעיון אחד ליום לתוכן AI לעסק. פרומפטים לתמונות, סרטונים קצרים ועבודה עם Claude, עם דוגמאות גמורות.',
  alternates: { canonical: 'https://www.orciai.app/30' },
  openGraph: {
    title: '30 רעיונות AI לעסק שלכם, בלי לצלם',
    description: 'רעיון אחד ליום: תמונות, סרטונים קצרים ו-Claude. עם דוגמאות גמורות.',
    url: 'https://www.orciai.app/30',
    siteName: 'Orci AI',
    locale: 'he_IL',
    type: 'website',
  },
};

type Idea = { title: string; what: string; tool: string; guide?: string; example?: string };

const WEEKS: { name: string; ideas: Idea[] }[] = [
  {
    name: 'שבוע 1: תמונות שמוכרות',
    ideas: [
      { title: 'המוצר בתמונת פרסומת', what: 'מצלמים את המוצר בטלפון, ו-ChatGPT הופך את התמונה לצילום של פרסומת.', tool: 'ChatGPT', guide: 'chatgpt-product-prompts', example: 'לפני ואחרי למטה' },
      { title: 'אותו בית קפה ב-20 סגנונות', what: 'פוסטר אחד לעסק, ומחליפים בפרומפט רק את שם הסגנון: מינימליסטי, רטרו, פופ ארט ועוד.', tool: 'ChatGPT', guide: '20-design-styles', example: 'דוגמה למטה' },
      { title: 'קוד אחד, תמונה חדשה', what: 'מעלים תמונה, כותבים קוד אחד קצר, ומקבלים מראה אחר לגמרי.', tool: 'ChatGPT', guide: 'chatgpt-image-codes' },
      { title: 'להעתיק סגנון שאהבתם', what: 'ראיתם תמונה יפה? לוקחים את הסגנון שלה ומלבישים אותו על המוצר שלכם.', tool: 'ChatGPT', guide: 'chatgpt-json-style' },
      { title: 'תמונה אחת, הרבה פרסומות', what: 'תמונה אחת של המוצר הופכת להרבה מודעות שונות בבת אחת.', tool: 'AI', guide: 'multi-ad-generator' },
      { title: 'תמונת פרופיל מקצועית', what: 'מסלפי בטלפון לתמונה שנראית כמו אצל צלם, לעמוד של העסק.', tool: 'ChatGPT', guide: 'ai-headshots' },
      { title: 'המוצר קופץ מהמסך', what: 'אפקט תלת מימד שגורם למוצר לצאת מהתמונה.', tool: 'AI', guide: '3d-product' },
    ],
  },
  {
    name: 'שבוע 2: סרטונים קצרים בלי לצלם',
    ideas: [
      { title: 'המוצר מתעורר לחיים', what: 'תמונה של המוצר שזזה לאט, עם אדים, נצנוץ או אור. 5 שניות.', tool: 'ChatGPT + Kling' },
      { title: 'המקום שלכם כמו בסרט', what: 'העסק שלכם בערב, עם אור חם ותנועת מצלמה איטית.', tool: 'ChatGPT + Kling', example: 'LAGO למטה' },
      { title: 'סיפור מצחיק עם דמויות', what: 'דמויות מצוירות "פורצות" לעסק, ומגלות שהוא כל כך יפה שהן מצלמות אותו במקום לגנוב.', tool: 'ChatGPT + Kling', example: 'TROYA למטה' },
      { title: 'סרטון רחפן מקו אדום', what: 'מציירים קו על תמונה של המקום, ו-AI הופך אותו לטיסת רחפן.', tool: 'AI', guide: 'red-line-drone' },
      { title: 'תאורה של סרט', what: 'אותה תמונה של העסק, עם אור של סרט קולנוע.', tool: 'AI', guide: 'cinematic-lighting' },
      { title: 'המוצר מדבר', what: 'המוצר מספר על עצמו בקול, כמו דמות.', tool: 'AI', guide: 'ai-beginners' },
      { title: 'הפרט הקטן', what: 'זום איטי על משהו שאף אחד לא שם לב אליו: התפר, השכבות, החומר.', tool: 'ChatGPT + Kling' },
    ],
  },
  {
    name: 'שבוע 3: Claude עושה את העבודה',
    ideas: [
      { title: 'סרטון מותג', what: 'Claude בונה סרטון קצר עם הלוגו והצבעים של העסק.', tool: 'Claude', guide: 'claude-code-brand-videos' },
      { title: 'אפקטים לסרטון', what: 'כתוביות קופצות, מעברים וזום, ש-Claude מוסיף לסרטון שכבר יש לכם.', tool: 'Claude', guide: 'claude-code-video-effects' },
      { title: 'Claude עורך לכם רילס', what: 'מעלים צילום, ו-Claude חותך, מוסיף כתוביות ומוזיקה.', tool: 'Claude', guide: 'claude-video-editing' },
      { title: 'המסך שלכם זז', what: 'האתר או האפליקציה של העסק זזים כמו בפרסומת, מפרומפט אחד.', tool: 'Claude', guide: 'claude-ui-animation' },
      { title: 'כיתוב שנשמע כמו בן אדם', what: 'כיתוב לפוסט שלא נשמע כמו רובוט.', tool: 'ChatGPT', guide: 'chatgpt-human-writing' },
      { title: 'לבדוק רעיון לפני שמשקיעים', what: '100 לקוחות מדומים אומרים מה הם חושבים על מוצר או מחיר חדש.', tool: 'Claude', guide: 'founder-skill' },
      { title: 'סטורי שהפוסט קופץ ממנו', what: 'הפוסט החדש שלכם "יוצא" מהמסך בסטורי.', tool: 'AI', guide: 'instagram-cutouts-story' },
    ],
  },
  {
    name: 'שבוע 4: אמון ומכירה',
    ideas: [
      { title: 'השאלה שכולם שואלים', what: 'השאלה שלקוחות שואלים כל יום, והתשובה ב-2 משפטים.', tool: 'סרטון קצר' },
      { title: 'לפני ואחרי', what: 'הלקוח לפני שהגיע אליכם, והלקוח אחרי.', tool: 'ChatGPT + Kling' },
      { title: 'המלצה אמיתית', what: 'משפט של לקוח (באישור שלו) על רקע של המוצר.', tool: 'ChatGPT' },
      { title: '3 סיבות לבחור בכם', what: '3 משפטים קצרים, 3 תמונות.', tool: 'ChatGPT' },
      { title: 'המחיר', what: 'כמה זה עולה ומה מקבלים. בלי להתבייש.', tool: 'סרטון קצר' },
      { title: 'בלאק פריידי', what: 'מה ההצעה, ועד מתי.', tool: 'ChatGPT + Kling' },
      { title: 'המוצר בחנוכה', what: 'המוצר עם אור של חנוכה, סופגנייה או חנוכייה.', tool: 'ChatGPT + Kling' },
      { title: 'שאלה לקהל', what: '"מה הכי חסר לכם ב___?" וסקר בסטורי.', tool: 'סטורי' },
      { title: 'סיכום החודש', what: 'מה עשיתם החודש, ומה הצעד הבא של הלקוח: "שלחו לי הודעה".', tool: 'סרטון קצר' },
    ],
  },
];

const STYLES = [
  { file: 'minimalism', name: 'מינימליסטי' },
  { file: 'retro', name: 'רטרו' },
  { file: 'pop-art', name: 'פופ ארט' },
  { file: 'swiss-design', name: 'שוויצרי' },
];

export default function ThirtyIdeasPage() {
  let n = 0;
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.hero}>
          <span className={`${styles.sticker} ${styles.lime}`}>לוח ל-30 הימים הקרובים</span>
          <h1 className={styles.title}>
            30 רעיונות AI
            <br />
            לעסק שלכם, בלי לצלם
          </h1>
          <p className={styles.lead}>
            רעיון אחד ליום: תמונות שמוכרות, סרטונים קצרים, ועבודה עם Claude. לכל רעיון שיש לו מדריך מלא באתר יש קישור.
          </p>
          <div className={styles.rule}>
            <strong>כלל אחד:</strong> רק דברים אמיתיים. מוצר אמיתי, מחיר אמיתי, המלצה אמיתית.
          </div>
          <a className={styles.jump} href="#examples">
            לדוגמאות הגמורות ↓
          </a>
        </header>

        {WEEKS.map((week) => (
          <section key={week.name} className={styles.week}>
            <h2 className={styles.weekTitle}>{week.name}</h2>
            <ol className={styles.list}>
              {week.ideas.map((idea) => {
                n += 1;
                return (
                  <li key={idea.title} className={styles.card}>
                    <span className={styles.num}>{n}</span>
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{idea.title}</h3>
                      <p className={styles.cardText}>{idea.what}</p>
                      <div className={styles.meta}>
                        <span className={styles.tool}>{idea.tool}</span>
                        {idea.example && <span className={styles.example}>{idea.example}</span>}
                        {idea.guide && (
                          <a className={styles.guideLink} href={`/guides/${idea.guide}?src=story30`}>
                            למדריך המלא ←
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}

        <section id="examples" className={styles.examples}>
          <h2 className={styles.weekTitle}>ככה זה נראה גמור</h2>

          <div className={styles.exBlock}>
            <div className={styles.exHead}>
              <h3 className={styles.cardTitle}>רעיון 2: אותו בית קפה, 4 סגנונות</h3>
              <span className={styles.tag}>דוגמה</span>
            </div>
            <div className={styles.grid4}>
              {STYLES.map((s) => (
                <figure key={s.file} className={styles.styleItem}>
                  <img src={`/guides/20-design-styles/${s.file}.webp`} alt={`פוסטר של בית קפה בסגנון ${s.name}`} loading="lazy" width={600} height={904} />
                  <figcaption>{s.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className={styles.exBlock}>
            <div className={styles.exHead}>
              <h3 className={styles.cardTitle}>רעיון 1: מתמונה בטלפון לתמונת פרסומת</h3>
              <span className={styles.tag}>דוגמה</span>
            </div>
            <div className={styles.beforeAfter}>
              <figure className={styles.styleItem}>
                <img src="/guides/chatgpt-product-prompts/before.png" alt="תמונה רגילה של המוצר, לפני" loading="lazy" width={309} height={500} />
                <figcaption>לפני</figcaption>
              </figure>
              <figure className={styles.styleItem}>
                <img src="/guides/chatgpt-product-prompts/after-luxuryedition.png" alt="אותו מוצר כתמונת פרסומת, אחרי" loading="lazy" width={900} height={1599} />
                <figcaption>אחרי</figcaption>
              </figure>
            </div>
          </div>

          <div className={styles.videos}>
            <figure className={styles.videoItem}>
              <div className={styles.exHead}>
                <h3 className={styles.cardTitle}>רעיון 9: LAGO</h3>
                <span className={`${styles.tag} ${styles.tagReal}`}>לקוח אמיתי</span>
              </div>
              <video src="/30/lago.mp4" poster="/products/work/poster-lago.jpg" muted autoPlay loop playsInline preload="metadata" />
            </figure>
            <figure className={styles.videoItem}>
              <div className={styles.exHead}>
                <h3 className={styles.cardTitle}>רעיון 10: TROYA</h3>
                <span className={`${styles.tag} ${styles.tagReal}`}>לקוח אמיתי</span>
              </div>
              <video src="/30/troya.mp4" poster="/products/work/poster-troya.jpg" muted autoPlay loop playsInline preload="metadata" />
            </figure>
          </div>
        </section>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>
            רוצים שכל זה יגיע אליכם מוכן כל שבוע, בלי לשבת על זה?
          </h2>
          <a className={styles.ctaBtn} href="https://ig.me/m/orciai45" target="_blank" rel="noopener noreferrer">
            שלחו לי &quot;חבילה&quot; באינסטגרם
          </a>
          <p className={styles.small}>*משלמים רק אחרי שאישרתם תסריט</p>
          <a className={styles.more} href="/guides?src=story30">
            עוד מדריכי AI בחינם ←
          </a>
        </section>
      </div>
    </div>
  );
}
