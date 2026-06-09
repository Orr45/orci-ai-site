'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CopyPrompt } from '@/components/ui/CopyPrompt'
import { Footer } from '@/components/layout/Footer'

type Tab = 'advanced' | 'beginner'

export default function FanCamTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('advanced')

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="cap-card text-center">
            <h1 className="cap-hero-title mb-6 text-orci-cyan">
              טרנד מצלמת המשחק הוויראלי
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-6">
              שני כלים, שני פרומפטים, 60 שניות — וידאו של עצמך בתוך שידור ספורט חי
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="cap-badge text-sm">🎨 GPT Image 2</span>
              <span className="cap-badge text-sm">🎬 Seedance 2.0</span>
              <span className="cap-badge text-sm">🤖 Nano Banana 2</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Selector */}
      <div className="max-w-xl mx-auto px-6 py-8">
        <div className="flex rounded-2xl overflow-hidden border border-gray-700">
          <button
            onClick={() => setActiveTab('beginner')}
            className={`flex-1 py-4 text-lg font-bold transition-all ${
              activeTab === 'beginner'
                ? 'bg-orci-cyan text-black'
                : 'bg-gray-900 text-slate-400 hover:bg-gray-800'
            }`}
          >
            ✨ מתחילים
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`flex-1 py-4 text-lg font-bold transition-all border-r border-gray-700 ${
              activeTab === 'advanced'
                ? 'bg-orci-cyan text-black'
                : 'bg-gray-900 text-slate-400 hover:bg-gray-800'
            }`}
          >
            🔥 מתקדמים
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'advanced' ? <AdvancedContent /> : <BeginnerContent />}

      {/* CTA */}
      <section className="cap-section cap-section-teal">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              רוצים להישאר מעודכנים?
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              תכתבו &apos;מדריך&apos; בתגובות או שלחו לי הודעה
            </p>
            <a
              href="https://chat.whatsapp.com/FWfA1JK4NQ93apZAFNOB3n?s=cl&p=i&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="cap-btn cap-btn-primary inline-flex"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              הצטרפו לקבוצה
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/* ─────────────────────────────────────────
   BEGINNER CONTENT
───────────────────────────────────────── */
function BeginnerContent() {
  return (
    <article className="cap-section cap-section-white">
      <div className="max-w-4xl mx-auto px-6 space-y-8">

        {/* Step 1 */}
        <div className="cap-card">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orci-cyan">
            שלב 1: יצירת התמונה עם Nano Banana 2
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            נכנסים ל-<span className="text-orci-cyan font-bold">Nano Banana 2</span>, מעלים שתי תמונות — <span className="text-orci-cyan font-bold">תמונת הסצנה</span> (כדי שה-AI יבין את הסטייל) ו-<span className="text-orci-cyan font-bold">תמונת הפנים שלכם</span> — מדביקים את הפרומפט, ולוחצים Generate. התוצאה: אתם יושבים ליד לאמין יאמל בשידור ספורט חי.
          </p>

          {/* Input images */}
          <h3 className="text-xl font-bold mb-4 text-white">מה מעלים</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800/50 rounded-2xl p-4 flex flex-col gap-3">
              <p className="text-center text-sm text-orci-cyan font-bold">📸 תמונת הסצנה (רפרנס)</p>
              <p className="text-center text-xs text-slate-400">השתמשו בתמונה הזו בדיוק כרפרנס לסצנה</p>
              <div className="rounded-2xl overflow-hidden">
                <Image src="/guides/fan-cam-trend/result_9x16.png" alt="תמונת הסצנה לרפרנס" width={500} height={889} className="w-full h-auto" />
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-4 flex flex-col gap-3">
              <p className="text-center text-sm text-orci-cyan font-bold">🤳 תמונת הפנים שלכם</p>
              <p className="text-center text-xs text-slate-400">תמונה ברורה של הפנים שלכם — כדוגמה:</p>
              <div className="rounded-2xl overflow-hidden">
                <Image src="/guides/fan-cam-trend/face-example.jpg" alt="דוגמה לתמונת פנים" width={500} height={500} className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>

          {/* Prompt */}
          <h3 className="text-xl font-bold mb-4 text-white">הפרומפט</h3>
          <CopyPrompt prompt={`Real live Israeli sports broadcast fan cam frame, 9:16 vertical. Recreate the exact scene from the reference stadium image but replace the left person with a new person whose face and appearance comes from the second reference photo. The new person should appear naturally integrated into the scene — same seated posture, same casual streetwear style, same medium shot framing from mid-torso up, same lighting and shadows falling naturally on their face. Keep everything else completely identical: the right person (young dark-skinned teen with distinctive short blonde curly hair), Winner Liga scoreboard overlay at top with Hebrew text ביתר י-מ 0 | 31:55 | הפועל בש 0 and Winner Liga logo top right, the packed stadium crowd behind them with red seats, dark dramatic stadium lighting, shallow depth of field, partial figure at bottom of frame, muted broadcast TV color grade, ISO grain, telephoto lens compression. The result must look like a genuine paused frame from a real Winner Liga live telecast — completely natural and photorealistic, not a composite or face swap.`} />

          {/* Result */}
          <h3 className="text-xl font-bold mt-8 mb-4 text-white">התוצאה</h3>
          <p className="text-lg text-slate-300 mb-4">
            ככה נראית התמונה שיוצאת — <span className="text-orci-cyan font-bold">אתם ליד לאמין יאמל</span> בשידור חי, נראה מושלם:
          </p>
          <div className="max-w-xs mx-auto rounded-2xl overflow-hidden">
            <Image src="/guides/fan-cam-trend/result-beginner.png" alt="תוצאת המתחילים" width={500} height={889} className="w-full h-auto" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="cap-card">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orci-cyan">
            שלב 2: אנימציה עם Seedance 2.0
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            לוקחים את התמונה שיצאה, מעלים אותה ל-<span className="text-orci-cyan font-bold">Seedance 2.0</span>, ומדביקים את הפרומפט הבא. התוצאה: וידאו 6 שניות שבו אתם דופקים ללאמין יאמל עוגה בפרצוף.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-8">
            <div>
              <p className="text-center text-sm text-orci-cyan font-bold mb-2">התמונה שנכנסת ל-Seedance</p>
              <div className="rounded-2xl overflow-hidden">
                <Image src="/guides/fan-cam-trend/result-beginner.png" alt="תמונת קלט ל-Seedance" width={500} height={889} className="w-full h-auto" />
              </div>
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-sm text-orci-cyan font-bold mb-2">📋 פרומפט האנימציה</p>
              <CopyPrompt prompt={`Live Israeli sports broadcast fan-cam video, 9:16 vertical. Winner Liga scoreboard visible at top throughout — navy blue Hebrew text, score 0:0, clock ticking forward from 31:55. CAMERA: Slow organic telephoto push-in zoom over 6 seconds, subtle handheld micro-shake, small natural drift. Authentic broadcast cameraman feel. BACKGROUND CROWD: Every person in background moves independently — shifting seats, talking, nodding, looking toward pitch. Different rhythms, nobody frozen. MAIN ACTION — cause and effect, all movements slow and natural: 0:00-2:00 — Both people sit relaxed watching the game. Natural breathing, subtle body movement. 2:00-3:00 — The left person slowly reaches their hand down below the seat with a mischievous grin building on their face. They pull out a large white cream birthday cake. 3:00-3:30 — They look at the cake, then look at the person on the right (young teen with blonde curly hair) with an exaggerated comedic smirk. 3:30-6:00 — With maximum comic force they SMASH the entire cake directly into the face of the person on the right — cream and cake exploding everywhere in slow motion, massive splatter, exaggerated impact. The person on the right sits frozen in shock, face completely covered in white cream, cake pieces falling. Crowd in background reacts. Winner Liga overlay remains visible throughout. Broadcast TV compression, ISO grain, comedy energy.`} />
            </div>
          </div>

          {/* Video result */}
          <h3 className="text-xl font-bold mb-4 text-white">התוצאה הסופית 🎬</h3>
          <p className="text-lg text-slate-300 mb-4">
            הנה הגרסה שלנו — דופקים ללאמין יאמל עוגה בפרצוף:
          </p>
          <div className="max-w-xs mx-auto rounded-2xl overflow-hidden">
            <video
              controls
              playsInline
              className="w-full rounded-2xl"
              src="/guides/fan-cam-trend/trend_video.mp4"
            />
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="cap-card bg-orci-cyan/5">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-orci-cyan">
              💡 הסיכום
            </h3>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-4">
              <span className="text-orci-cyan font-bold">Nano Banana 2 + Seedance 2.0</span> — שני כלים, 60 שניות.
            </p>
            <p className="text-lg text-slate-300">
              תחליפו את הפנים בתמונת הרפרנס — ותקבלו את עצמכם ליד כל כוכב ספורט שתרצו.
            </p>
          </div>
        </div>

      </div>
    </article>
  )
}

/* ─────────────────────────────────────────
   ADVANCED CONTENT
───────────────────────────────────────── */
function AdvancedContent() {
  return (
    <article className="cap-section cap-section-white">
      <div className="max-w-4xl mx-auto px-6 space-y-8">

        {/* Step 1 */}
        <div className="cap-card">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orci-cyan">
            שלב 1: יצירת תמונת השידור עם GPT Image 2
          </h2>

          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            נכנסים ל-<span className="text-orci-cyan font-bold">GPT Image 2</span>, מדביקים את הפרומפט של הקבוצה שרוצים, מוסיפים את <span className="text-orci-cyan font-bold">תמונות הרפרנס</span> שלכם — ולוחצים Generate. התוצאה: תמונה שנראית כאילו צולמה בשידור ספורט אמיתי.
          </p>

          {/* Israeli examples */}
          <h3 className="text-xl font-bold mb-4 text-white">דוגמאות — ליגת ה-Winner ישראל</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gray-800/50 rounded-2xl p-4 flex flex-col gap-4">
              <p className="text-center text-sm text-orci-cyan font-bold">דני ולאמין</p>
              <details>
                <summary className="cursor-pointer text-orci-cyan font-bold text-sm list-none">
                  📋 לחץ לצפייה בפרומפט GPT Image 2
                </summary>
                <CopyPrompt prompt={`Real live sports broadcast frame, fan cam shot of two famous athletes sitting together in regular stadium stands during a Hapoel Beer Sheva vs Beitar Jerusalem Israeli Winner Liga night match. No field visible — only rows of supporters and stadium seating filling the background.

Left person: tall young man with dark curly hair, Israeli-American NBA player appearance, athletic build, wearing stylish casual streetwear — clean designer outfit, no team jersey. Right person: young dark-skinned teen with distinctive short blonde curly hair, slim build, wearing fashionable casual clothes — luxury streetwear, no team jersey. Both seated naturally, relaxed posture, engaged in conversation or watching the game, candid moment not posed.

Captured by official Israeli broadcast cameras during live gameplay. Authentic Winner Liga scoreboard overlay positioned exactly in the top left corner: navy blue background, white Hebrew text reading "הפועל ב״ש  0  |  31:55  |  בית״ר י-מ  0", exact format matching Israeli broadcast style. Winner Liga logo with colorful ball icon positioned top right corner exactly as real Israeli broadcast.

Telephoto broadcast zoom lens from across the crowd, realistic television compression and digital softness, visible skin texture, subtle stadium heat atmosphere, nearby supporters partially entering frame, accidental fan cam framing exactly like real sports broadcasts. Giant floodlights creating natural highlights. Muted Israeli sports television color grading, subtle ISO noise in darker crowd areas. Authentic live television realism — feels like a genuine paused frame from a real Winner Liga telecast, not a posed photo.`} />
              </details>
              <div className="rounded-2xl overflow-hidden">
                <Image src="/guides/fan-cam-trend/result-danny.png" alt="תוצאת דני ולאמין" width={500} height={889} className="w-full h-auto" />
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-4 flex flex-col gap-4">
              <p className="text-center text-sm text-orci-cyan font-bold">אורן להב</p>
              <details>
                <summary className="cursor-pointer text-orci-cyan font-bold text-sm list-none">
                  📋 לחץ לצפייה בפרומפט GPT Image 2
                </summary>
                <CopyPrompt prompt={`Live Israeli sports broadcast fan-cam frame, 9:16 vertical. Composition identical to style reference — both subjects framed from mid-torso up, medium shot, telephoto compression, camera slightly below eye level, partial figure visible at bottom edge of frame.

Two people sitting close together in Israeli football stadium regular seats. LEFT: young stocky Israeli man, very short bleached platinum blonde buzz-cut hair, round friendly face, warm expression — wearing stylish casual streetwear outfit, one hand holding a clear plastic beer cup loosely. Exact face and hair from reference photos — platinum blonde almost white short hair, same round facial features. RIGHT: stunning blonde girl around 18, bright vivid blue eyes, long flowing blonde hair, natural glowing makeup, dark stylish casual jacket, leaning gently into him, soft warm expression, not looking at camera.

LIGHTING: Dark dramatic stadium atmosphere — powerful floodlights creating hard side-lighting, deep shadows, moody underexposed look matching style reference exactly.

COLOR GRADE: Muted desaturated Israeli TV broadcast grade — cool shadows, slightly warm skin tones.

CROWD: Dense packed rows of people behind, shallow DOF blur, red stadium seats visible, people engaged with the match.

Winner Liga scoreboard at top: navy blue bar, Hebrew text ביתר י-מ 0 | 31:55 | הפועל בש 0, Winner Liga logo top right. Authentic TV compression, ISO grain, telephoto lens. Genuine paused broadcast frame.`} />
              </details>
              <div className="rounded-2xl overflow-hidden">
                <Image src="/guides/fan-cam-trend/result-oren.png" alt="תוצאת אורן להב" width={500} height={889} className="w-full h-auto" />
              </div>
            </div>
          </div>

          {/* International formats */}
          <h3 className="text-xl font-bold mb-4 text-white">פורמטים בינלאומיים — 4 ליגות</h3>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            עובד גם עם <span className="text-orci-cyan font-bold">כל ליגת ספורט בעולם</span> — רק תחליפו את שמות הקבוצות, הלוגו ופרטי השידור:
          </p>

          <div className="space-y-3 mb-8">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-orci-cyan font-bold mb-2">⚾ MLB — ליגת הבייסבול האמריקאית</p>
              <details>
                <summary className="cursor-pointer text-orci-cyan text-sm font-bold list-none">📋 פרומפט מלא</summary>
                <CopyPrompt prompt={`Real MLB live broadcast frame, tight stadium crowd shot of an attractive woman based on the reference image sitting in packed seating during a New York Yankees vs Boston Red Sox night game, absolutely no baseball field visible, only crowded rows of fans and stadium seating, captured naturally by official ESPN baseball broadcast cameras between innings, authentic ESPN baseball scoreboard overlay placed in the upper left corner exactly like real MLB television coverage, showing Yankees 5, Red Sox 3, 8th inning, 2 outs and pitch count graphics in official ESPN formatting, ESPN LIVE watermark visible in the upper corner, the woman wearing a fitted low-cut Yankees top, dark baseball cap and layered jewelry, seated casually among loud fans while holding a clear plastic beer cup, relaxed confident expression, slightly messy hair from humid summer air, warm floodlights mixed with cool LED scoreboard reflections across skin, long broadcast zoom lens compressing crowd depth, realistic televised softness and compression artifacts, visible skin texture and slight sweat around neck, nearby fans and waving foam bats blurred in foreground motion, imperfect spontaneous framing exactly like real live television fan cam shots`} />
              </details>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-orci-cyan font-bold mb-2">🏈 NFL — פוטבול אמריקאי</p>
              <details>
                <summary className="cursor-pointer text-orci-cyan text-sm font-bold list-none">📋 פרומפט מלא</summary>
                <CopyPrompt prompt={`Real NFL live broadcast frame, tight crowd shot of an attractive woman based on the reference image sitting in packed stadium stands during a Kansas City Chiefs vs San Francisco 49ers night game, no football field visible anywhere, only stadium seating and surrounding spectators, captured naturally by official NBC Sunday Night Football broadcast cameras during a timeout, authentic NBC NFL scoreboard overlay positioned exactly at the top center like a real NFL broadcast, showing Chiefs 24, 49ers 21, 4th quarter, 5:42 remaining with official NBC Sunday Night Football graphics and possession indicator, NBC watermark visible in the corner, the woman wearing a fitted low-cut Chiefs jersey layered over casual streetwear, subtle jewelry and natural glossy makeup, seated among loud fans holding drinks and food trays, relaxed confident expression with slightly tired eyes, giant floodlights creating uneven highlights and shadow loss across faces, telephoto sports lens from across the crowd section, realistic live television compression and slight digital softness, visible skin texture and loose hair strands, foreground motion blur from cheering fans waving towels and phones, spontaneous accidental fan cam realism during live televised coverage`} />
              </details>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-orci-cyan font-bold mb-2">🏎️ F1 — פורמולה 1 מונקו</p>
              <details>
                <summary className="cursor-pointer text-orci-cyan text-sm font-bold list-none">📋 פרומפט מלא</summary>
                <CopyPrompt prompt={`Real Formula 1 live broadcast frame, tight grandstand crowd shot of an attractive woman based on the reference image sitting among Mercedes AMG Petronas supporters during the Monaco Grand Prix, no racetrack or race cars visible anywhere in frame, only crowded grandstand seating and fans surrounding the subject, captured naturally by official Sky Sports F1 broadcast cameras during safety car conditions, authentic Formula 1 timing tower graphics placed vertically along the left side exactly like real F1 broadcasts, showing Verstappen P1, Hamilton P2, Leclerc P3, lap 47 of 78, official Sky Sports F1 LIVE watermark in the upper right corner, the woman wearing a fitted low-cut Mercedes team top, layered jewelry and luxury sunglasses resting on her head, seated casually while holding a drink cup, confident detached expression with loose hair moving slightly in the wind, bright Mediterranean daylight creating harsh highlights across skin, long broadcast sports lens isolating the subject within the crowd, realistic television compression and digital sharpness, visible skin texture and slight sweat from outdoor heat, nearby spectators partially obstructing the frame with flags and phones, accidental televised fan cam composition exactly like real Formula 1 broadcasts`} />
              </details>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-orci-cyan font-bold mb-2">⚽ Premier League — מנצ&apos;סטר יונייטד</p>
              <details>
                <summary className="cursor-pointer text-orci-cyan text-sm font-bold list-none">📋 פרומפט מלא</summary>
                <CopyPrompt prompt={`Real live sports broadcast frame, tight fan cam shot of an attractive woman based on the reference image sitting in the crowded stadium stands during a Manchester United vs Arsenal Premier League night match, no field visible, only rows of supporters and stadium seating in the background, captured naturally by official Sky Sports broadcast cameras during gameplay, authentic Sky Sports Premier League scoreboard overlay positioned exactly in the top left corner like a real televised match, showing Manchester United 2, Arsenal 1, live match clock at 78:14 in official broadcast formatting, Sky Sports LIVE watermark in the upper right corner, the woman wearing a fitted low-cut Manchester United crop jersey, layered silver jewelry and natural glossy makeup, seated casually between blurred fans, holding a clear plastic beer cup, confident relaxed expression with slight smirk, long hair falling naturally over shoulders, giant floodlights creating uneven highlights across skin, telephoto broadcast zoom lens from across the crowd, realistic television compression and digital softness, visible skin texture, subtle sweat from stadium heat, nearby supporters partially entering frame with scarves and raised arms, accidental fan cam framing exactly like real sports broadcasts, muted television color grading, subtle ISO noise in darker crowd areas, authentic live television realism`} />
              </details>
            </div>
          </div>

          {/* Women examples */}
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            דוגמאות לתוצאה עם הפורמטים הבינלאומיים:
          </p>
          <div className="my-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden">
              <Image src="/guides/fan-cam-trend/result-women1.png" alt="דוגמאת תוצאה 1" width={500} height={889} className="w-full h-auto" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image src="/guides/fan-cam-trend/result-women2.png" alt="דוגמאת תוצאה 2" width={500} height={889} className="w-full h-auto" />
            </div>
          </div>
        </div>

        {/* Golden Tip */}
        <div className="cap-card border border-orci-cyan/30 bg-orci-cyan/5">
          <div className="flex items-start gap-4">
            <div className="text-4xl flex-shrink-0">💡</div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-orci-cyan">
                טיפ זהב — שליטה מלאה על הפרומפט
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                רוצים לכוונן את הפרומפט לצרכים שלכם? קחו אחד מהפורמטים המובנים למעלה, הדביקו אותו ב-<span className="text-orci-cyan font-bold">Gemini או Claude</span>, ואמרו לו בדיוק מה לשנות — שם הקבוצה, סגנון הלבוש, מיקום, צבעי הגרפיקה. ככה תקבלו שליטה חופשית על כל פרט בתמונה המדויקת שאתם רוצים ליצור.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="cap-card">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orci-cyan">
            שלב 2: אנימציה עם Seedance 2.0
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            לוקחים את התמונה שיצאה מ-<span className="text-orci-cyan font-bold">GPT Image 2</span>, מכניסים אותה ל-<span className="text-orci-cyan font-bold">Seedance 2.0</span>, ומוסיפים פרומפט אנימציה — ומקבלים וידאו 6 שניות שנראה כאילו צולם בשידור חי אמיתי. השתמשו ב-<span className="text-orci-cyan font-bold">Claude או Gemini</span> כדי לבנות פרומפט אנימציה מותאם לסצנה שלכם.
          </p>

          {/* Danny */}
          <div className="mb-10">
            <p className="text-orci-cyan font-bold text-lg mb-4">דני ולאמין — פרנק עם עוגה</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <div className="rounded-2xl overflow-hidden">
                  <Image src="/guides/fan-cam-trend/result-danny.png" alt="תמונת קלט לדני ב-Seedance" width={500} height={889} className="w-full h-auto" />
                </div>
                <p className="text-center text-sm text-orci-cyan font-bold mt-2">התמונה שנכנסת ל-Seedance</p>
              </div>
              <div className="flex flex-col justify-start">
                <details>
                  <summary className="cursor-pointer text-orci-cyan font-bold text-sm list-none mb-2">
                    📋 לחץ לצפייה בפרומפט האנימציה
                  </summary>
                  <CopyPrompt prompt={`Cinematic live sports broadcast fan-cam video, 9:16 vertical. Two young men sitting in Israeli football stadium stands, Winner Liga scoreboard visible at top (navy blue, Hebrew text, score 0:0, clock ticking forward from 31:55 to 32:01).

CAMERA MOVEMENT: Authentic live broadcast telephoto camera behavior throughout — starts with a slow organic push-in zoom toward the two subjects, subtle continuous handheld micro-shake as if held by a human cameraman, slight natural drift and small reframe adjustments mid-shot, the kind of imperfect organic movement seen in real sports broadcast fan-cam footage. Camera slowly zooms closer over the 6 seconds.

BACKGROUND CROWD: Every person in the background is alive and moving independently — people shifting in their seats, turning heads to talk to neighbors, nodding, clapping lightly, looking toward the pitch, adjusting position, leaning forward and back. Continuous subtle organic micromovement from every background figure at different rhythms, no one is frozen or static. The crowd feels like a real living stadium.

FOREGROUND ACTION: First 2 seconds — both men sit relaxed watching the game, natural casual movement, blinking, small head turns. At exactly 2 seconds — the tall man on the left reaches down below his seat with a mischievous grin, pulls out a large cream birthday cake. He looks at it then at the person on the right with an exaggerated comedic smirk. Then with maximum comic force SMASHES the entire cake into the face of the shorter person on the right — cream and cake exploding everywhere, massive splatter, exaggerated impact. The person on the right sits frozen in shock, face covered in white cream. Winner Liga broadcast overlay remains visible throughout. Broadcast TV compression, comedic timing, viral prank energy.`} />
                </details>
              </div>
            </div>
          </div>

          {/* Oren */}
          <div>
            <p className="text-orci-cyan font-bold text-lg mb-4">אורן להב — רגע רומנטי</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <div className="rounded-2xl overflow-hidden">
                  <Image src="/guides/fan-cam-trend/result-oren.png" alt="תמונת קלט לאורן ב-Seedance" width={500} height={889} className="w-full h-auto" />
                </div>
                <p className="text-center text-sm text-orci-cyan font-bold mt-2">התמונה שנכנסת ל-Seedance</p>
              </div>
              <div className="flex flex-col justify-start">
                <details>
                  <summary className="cursor-pointer text-orci-cyan font-bold text-sm list-none mb-2">
                    📋 לחץ לצפייה בפרומפט האנימציה
                  </summary>
                  <CopyPrompt prompt={`Live Israeli sports broadcast fan-cam video, 9:16 vertical. Winner Liga scoreboard visible at top throughout — navy blue Hebrew text, score 0:0, clock ticking from 31:55.

CAMERA: Slow organic telephoto push-in zoom over 6 seconds, subtle handheld micro-shake, small natural drift. Authentic broadcast cameraman feel.

BACKGROUND CROWD: Every background person moves independently and naturally — shifting seats, talking to neighbors, nodding, looking toward pitch. Different rhythms, nobody frozen, continuous organic life throughout entire video.

MAIN ACTION — strict cause and effect sequence, all movements slow and deliberate:

0:00-1:30 — Both sitting naturally watching the game. Subtle breathing movement visible. Small natural body adjustments. He holds the beer cup loosely in his hand resting on his knee.

1:30-2:30 — The blonde girl slowly and gently lowers her head onto his shoulder. Soft gradual motion, her hair falls naturally. Her eyes close softly, peaceful and content expression.

2:30-3:30 — He feels her head on his shoulder. He slowly turns his head toward her — gradual natural head turn. A genuine warm happy smile forms slowly on his face as he looks at her sleeping peacefully.

3:30-4:00 — He holds that warm look for a moment, then slowly turns his head back forward toward the pitch, still with a residual smile. Takes a calm casual sip of beer. Eyes forward on the match. Total gentleman energy.

4:00-5:00 — The girl remains sleeping on his shoulder, completely still and peaceful. Eyes closed. Gentle breathing movement visible. He watches the game quietly.

5:00-6:00 — Very slowly and dreamily, the girl opens her eyes. She does not lift her head from his shoulder. She tilts her gaze upward toward him — a slow, soft, deeply loving look. Eyes half-open, warm adoring expression, like someone waking from a dream and realizing they are exactly where they want to be.

All movements slow, human, weighted. Winner Liga overlay visible throughout. Broadcast TV color grade, ISO grain, telephoto compression.`} />
                </details>
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="cap-card border-2 border-orci-cyan">
          <div className="text-center">
            <div className="text-6xl mb-6">🔥</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orci-cyan">
              התוצאה
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-4">
              <span className="text-orci-cyan font-bold">וידאו של עצמך</span> בתוך שידור ספורט חי — שנראה אמיתי לחלוטין.
            </p>
            <p className="text-lg text-slate-300">
              שני כלים, שני פרומפטים, 60 שניות. כל אחד יכול ליצור את הגרסה שלו.
            </p>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="cap-card bg-orci-cyan/5">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-orci-cyan">
              💡 המסר המרכזי
            </h3>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-4">
              <span className="text-orci-cyan font-bold">הפורמט הוא הכלי</span> — לא הספורט, לא הקבוצה.
            </p>
            <p className="text-lg text-slate-300">
              תחליפו את הקבוצה, הלבוש, השותף — ותקבלו גרסה חדשה שמרגישה כאילו נולדה בשבילכם. זה למה הטרנד הזה לא נגמר.
            </p>
          </div>
        </div>

      </div>
    </article>
  )
}
