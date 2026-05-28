---
name: trip-planner
description: >
  Collects trip details conversationally (destination, dates, budget, travel group),
  generates a full AI trip plan with day-by-day itinerary, restaurants, attractions,
  travel tips, cost breakdown and recommendations, then produces a stunning dark-theme
  two-panel HTML file and opens it in the browser.
  Triggers on: "trip planner", "plan my trip", "תכנן לי טיול", "תכנן טיול",
  "plan a trip", "trip plan", "פלן לטיול", "אני רוצה לתכנן טיול",
  "build me a trip", "create a trip plan", "בנה לי טיול".
---

# Trip Planner Skill ✈️

## Phase 0 — MANDATORY: Conversation (Gather Trip Details)

**Never skip this phase.** Before generating anything, send one friendly message asking for all inputs at once.

If the user triggered in Hebrew:
```
שלום! 🌍 בוא נתכנן לך את הטיול המושלם.

ספר לי:
- **לאן** אתה טס? (יעד)
- **מתי** — תאריך יציאה + תאריך חזרה?
- **תקציב** — כמה יש לך סה"כ? (ובאיזו מטבע)
- **למי** הטיול? (רווק / זוג / משפחה / קבוצת חברים)
- (אופציונלי) **סגנון** — אדוונצ׳ר / רומנטי / תרבות / מנוחה / קולינריה?
```

If the user triggered in English:
```
Hey! 🌍 Let's plan your perfect getaway.

Tell me:
- **Where** are you traveling? (destination)
- **When** — departure + return date?
- **Budget** — total budget? (and currency)
- **Who** is joining? (solo / couple / family / group)
- (optional) **Style** — adventure / romantic / culture / relaxation / foodie?
```

Wait for the answer. If partial, ask only for the missing fields in one follow-up message.

Derive automatically:
- **Number of days** = difference between return and departure dates (e.g., Aug 15–22 = 7 days)
- **Number of people** = Solo → 1, Couple → 2, Group → 4 (default if not specified), Family → ask if unclear

---

## Phase 1 — Generate Trip Plan (Internal Processing)

After receiving all inputs, echo a brief summary and proceed immediately without waiting:

```
מצוין! לסיכום:
- 🌍 **יעד:** {Destination}
- 📅 **תאריכים:** {start} – {end} ({N} ימים)
- 💰 **תקציב:** {Budget}
- 👥 **למי:** {WHO_FOR}

מתחיל לבנות את תוכנית הטיול... ✨
```

Then internally generate ALL the following content sections before writing the HTML:

### A. Day-by-Day Itinerary
One card per travel day. First day = arrival (morning transfer + settle in). Last day = departure (morning activities only, no evening block).
Each day must include:
- Morning block (🌅 בוקר) — activity + time hint
- Afternoon block (☀️ צהריים) — activity or free exploration
- Evening block (🌙 ערב) — dinner suggestion or night activity (skip on last day)
- Estimated daily cost in user's currency

### B. Restaurant Recommendations (4–6 restaurants)
For each: name, cuisine type, price tier ($ / $$ / $$$ — must match the budget level), one highlight dish, 1-sentence description.
Budget matching:
- Under $50/day food budget → mostly $ restaurants
- $50–100/day → mix of $ and $$
- $100+/day → include $$$

### C. Attractions & Things to Do (5–8 items)
For each: name, type (nature / culture / adventure / food / nightlife / shopping), 1–2 sentence description, cost estimate.

### D. Travel Tips (5–7 tips)
Must cover: local transport options, currency/payment advice, safety or etiquette, climate/packing, and at least one insider tip specific to this destination and season.

### E. Cost Breakdown
Lines (all in user's currency):
- ✈️ Flights — round-trip estimate
- 🏨 Hotel — (per night × nights)
- 🍽️ Food — (per day × days)
- 🎯 Activities — estimated total
- 🚕 Transport — local transport total

For each line: estimated amount + bar width percentage = (amount / total_budget) × 100, min 5%, max 95%.
Also compute: estimated total vs. user's budget (show if under/over).

### F. Other Recommendations
- 🏨 Hotel: mention tier (budget/mid-range/luxury) that fits the budget, list 2–3 specific real hotel names
- ✈️ Flights: recommend a booking platform (Skyscanner / Google Flights / direct airline), estimated price range, tip for best time to book
- 🎒 Packing: 6–8 items specific to destination + season (not generic)

---

## Phase 2 — Destination Image

Construct Unsplash Source URL for the hero image:
```
https://source.unsplash.com/1200x600/?{destination-encoded},travel,landscape
```

Where `{destination-encoded}` = destination name lowercased, spaces replaced with `+`.
- "Maldives" → `maldives,travel,landscape`
- "New York" → `new+york,travel,landscape`
- "Tel Aviv" → `tel+aviv,travel,landscape`

Fallback for obscure destinations: use country name + `,travel,landscape`.
Always append `,travel,landscape` — this ensures the photo is appropriate for travel content.

---

## Phase 3 — Build HTML File

1. **Use the HTML template below** — copy it exactly and replace all `{{PLACEHOLDER}}` tokens with the generated content (full list in Placeholder Reference below).

2. **Ensure the output folder exists:**
   ```powershell
   New-Item -ItemType Directory -Path "$env:USERPROFILE\Documents\Trip" -Force
   ```

3. **Write the completed HTML to:**
   `C:\Users\0rr Shemer\Documents\Trip\trip-{destination-slug}-{YYYY-MM-DD}.html`

   Where:
   - `{destination-slug}` = destination name lowercased, spaces → hyphens (e.g., `new-york`, `tel-aviv`)
   - `{YYYY-MM-DD}` = today's date

### HTML Template (embed this fully, replacing all {{PLACEHOLDER}} tokens):

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{DESTINATION_NAME}} ✈️ Trip Plan</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    /* ─── RESET ─── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    img { display: block; max-width: 100%; }
    ul { list-style: none; }
    button { font-family: inherit; cursor: pointer; }

    /* ─── DESIGN TOKENS ─── */
    :root {
      --bg-base:          #0a0a0f;
      --bg-panel:         #0d0d18;
      --bg-card:          #11111e;
      --bg-card-hover:    #161628;
      --accent-gold:      #f59e0b;
      --accent-gold-glow: rgba(245,158,11,0.2);
      --accent-gold-dim:  rgba(245,158,11,0.08);
      --accent-purple:    #8b5cf6;
      --accent-purple-glow: rgba(139,92,246,0.2);
      --accent-purple-dim:  rgba(139,92,246,0.08);
      --text-primary:     #f1f5f9;
      --text-secondary:   #94a3b8;
      --text-muted:       #475569;
      --border-dim:       rgba(255,255,255,0.07);
      --border-accent:    rgba(245,158,11,0.28);
      --border-purple:    rgba(139,92,246,0.28);
      --font-display:     'Space Grotesk', sans-serif;
      --font-body:        'Inter', sans-serif;
      --radius-sm:        8px;
      --radius-md:        14px;
      --radius-lg:        20px;
      --shadow-glow-gold: 0 0 30px rgba(245,158,11,0.12);
      --shadow-glow-purple: 0 0 30px rgba(139,92,246,0.12);
    }

    /* ─── BASE ─── */
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg-base);
      color: var(--text-primary);
      font-family: var(--font-body);
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* ─── PARTICLES CANVAS ─── */
    #particles {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: 0.35;
    }

    /* ─── LAYOUT ─── */
    .layout {
      display: flex;
      min-height: 100vh;
      position: relative;
      z-index: 1;
    }

    /* ─── LEFT PANEL ─── */
    .panel-left {
      width: 38%;
      min-width: 300px;
      max-width: 420px;
      background: var(--bg-panel);
      border-left: 1px solid var(--border-accent);
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 36px 28px 36px;
      box-shadow: -4px 0 60px rgba(245,158,11,0.07);
      display: flex;
      flex-direction: column;
      gap: 0;
      scrollbar-width: thin;
      scrollbar-color: var(--border-accent) transparent;
    }

    .brand-tag {
      font-family: var(--font-display);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--accent-gold);
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .brand-tag::before {
      content: '';
      display: inline-block;
      width: 20px;
      height: 1px;
      background: var(--accent-gold);
      opacity: 0.5;
    }

    .panel-title {
      font-family: var(--font-display);
      font-size: clamp(1.35rem, 2.2vw, 1.65rem);
      font-weight: 700;
      line-height: 1.15;
      background: linear-gradient(140deg, #f59e0b 0%, #fcd34d 45%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 28px;
    }

    /* Form fields display */
    .form-display { display: flex; flex-direction: column; gap: 16px; flex: 1; }

    .field-group { display: flex; flex-direction: column; gap: 6px; }

    .field-label {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--accent-gold);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .field-label .field-icon { font-size: 0.8rem; }

    .field-value {
      background: var(--bg-card);
      border: 1px solid var(--border-dim);
      border-radius: var(--radius-sm);
      padding: 11px 14px;
      font-size: 0.92rem;
      color: var(--text-primary);
      font-weight: 500;
      transition: border-color 0.2s;
    }
    .field-value:hover { border-color: var(--border-accent); }

    .field-value--badge {
      display: inline-block;
      background: var(--accent-gold-dim);
      border-color: var(--border-accent);
      color: var(--accent-gold);
      padding: 7px 16px;
      border-radius: 24px;
      font-size: 0.85rem;
      font-weight: 600;
      align-self: flex-start;
    }

    /* Stats pill */
    .stats-pill {
      margin-top: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--accent-gold-dim);
      border: 1px solid var(--border-accent);
      border-radius: 24px;
      padding: 8px 16px;
      font-size: 0.78rem;
      color: var(--text-secondary);
      font-weight: 500;
    }
    .stats-pill .s-divider {
      color: var(--accent-gold);
      opacity: 0.5;
    }

    /* Generate button */
    .btn-regenerate {
      margin-top: 20px;
      width: 100%;
      padding: 14px 20px;
      background: linear-gradient(135deg, var(--accent-gold) 0%, #f97316 50%, var(--accent-purple) 100%);
      border: none;
      border-radius: var(--radius-md);
      color: #fff;
      font-family: var(--font-display);
      font-size: 0.88rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
      box-shadow: 0 4px 20px rgba(245,158,11,0.25);
    }
    .btn-regenerate:hover {
      opacity: 0.92;
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(245,158,11,0.35);
    }
    .btn-regenerate:active { transform: translateY(0); }

    /* ─── RIGHT PANEL ─── */
    .panel-right {
      flex: 1;
      background: var(--bg-base);
      overflow-y: auto;
      min-width: 0;
    }

    /* ─── HERO ─── */
    .hero {
      position: relative;
      height: 340px;
      overflow: hidden;
    }
    .hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.55) saturate(1.1);
      transition: transform 8s ease;
    }
    .hero:hover .hero-img { transform: scale(1.04); }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(10,10,15,0.96) 0%,
        rgba(10,10,15,0.4) 50%,
        transparent 100%
      );
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 32px 36px;
    }

    .hero-eyebrow {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--accent-gold);
      margin-bottom: 8px;
    }

    .hero-destination {
      font-family: var(--font-display);
      font-size: clamp(2.2rem, 5vw, 3.2rem);
      font-weight: 700;
      color: #fff;
      line-height: 1.05;
      text-shadow: 0 2px 30px rgba(0,0,0,0.6);
      margin-bottom: 6px;
    }

    .hero-tagline {
      font-size: 0.9rem;
      color: rgba(255,255,255,0.65);
      margin-bottom: 18px;
      font-style: italic;
    }

    .hero-stats {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    .hero-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    .hero-stat-value {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--accent-gold);
      line-height: 1;
    }
    .hero-stat-label {
      font-size: 0.62rem;
      color: rgba(255,255,255,0.5);
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    .hero-stat-divider {
      width: 1px;
      height: 30px;
      background: rgba(255,255,255,0.15);
    }

    /* ─── CONTENT WRAPPER ─── */
    .content-wrap {
      padding: 36px 36px 20px;
      display: flex;
      flex-direction: column;
      gap: 44px;
    }

    /* ─── SECTION ─── */
    .content-section { display: flex; flex-direction: column; gap: 18px; }

    .section-title {
      font-family: var(--font-display);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 3.5px;
      text-transform: uppercase;
      color: var(--accent-gold);
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-dim);
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -1px;
      right: 0;
      width: 50px;
      height: 2px;
      background: linear-gradient(270deg, var(--accent-gold), var(--accent-purple));
      border-radius: 2px;
    }

    /* ─── DAY CARDS ─── */
    .day-card {
      background: var(--bg-card);
      border: 1px solid var(--border-dim);
      border-radius: var(--radius-md);
      overflow: hidden;
      transition: border-color 0.25s, box-shadow 0.25s;
    }
    .day-card:hover {
      border-color: var(--border-accent);
      box-shadow: var(--shadow-glow-gold);
    }

    .day-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
      background: var(--bg-card-hover);
      border-bottom: 1px solid var(--border-dim);
    }

    .day-number {
      background: linear-gradient(135deg, var(--accent-gold), #f97316, var(--accent-purple));
      color: #fff;
      font-family: var(--font-display);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      padding: 4px 12px;
      border-radius: 20px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .day-title {
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.3;
    }

    .day-body { padding: 18px 18px 14px; display: flex; flex-direction: column; gap: 12px; }

    .time-block {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    .time-label {
      flex-shrink: 0;
      min-width: 85px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--accent-gold);
      padding-top: 2px;
    }
    .time-block p {
      font-size: 0.87rem;
      color: var(--text-secondary);
      line-height: 1.55;
    }

    .day-cost {
      margin-top: 4px;
      padding-top: 10px;
      border-top: 1px solid var(--border-dim);
      font-size: 0.8rem;
      color: var(--text-muted);
      display: flex;
      justify-content: flex-end;
    }

    /* ─── CARDS GRID ─── */
    .cards-grid { display: grid; gap: 14px; }
    .cards-grid--2 { grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); }
    .cards-grid--3 { grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); }

    /* ─── RESTAURANT CARDS ─── */
    .restaurant-card {
      background: var(--bg-card);
      border: 1px solid var(--border-dim);
      border-radius: var(--radius-md);
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s;
    }
    .restaurant-card:hover {
      border-color: var(--border-accent);
      transform: translateY(-3px);
      box-shadow: var(--shadow-glow-gold);
    }

    .restaurant-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
    }

    .restaurant-name {
      font-family: var(--font-display);
      font-size: 0.93rem;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.3;
    }

    .price-tier {
      flex-shrink: 0;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 6px;
      letter-spacing: 0.5px;
    }
    .price-tier--1 { background: rgba(34,197,94,0.12); color: #4ade80; border: 1px solid rgba(34,197,94,0.2); }
    .price-tier--2 { background: rgba(245,158,11,0.12); color: var(--accent-gold); border: 1px solid rgba(245,158,11,0.25); }
    .price-tier--3 { background: rgba(139,92,246,0.12); color: #c084fc; border: 1px solid rgba(139,92,246,0.25); }

    .restaurant-cuisine {
      font-size: 0.75rem;
      color: var(--accent-purple);
      font-weight: 500;
      letter-spacing: 0.3px;
    }
    .restaurant-desc {
      font-size: 0.83rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    .restaurant-dish {
      font-size: 0.8rem;
      color: var(--text-muted);
      padding-top: 6px;
      border-top: 1px solid var(--border-dim);
      margin-top: 2px;
    }

    /* ─── ATTRACTION CARDS ─── */
    .attraction-card {
      background: var(--bg-card);
      border: 1px solid var(--border-dim);
      border-radius: var(--radius-md);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s;
    }
    .attraction-card:hover {
      border-color: var(--border-purple);
      transform: translateY(-3px);
      box-shadow: var(--shadow-glow-purple);
    }

    .attraction-type {
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--accent-purple);
    }
    .attraction-name {
      font-family: var(--font-display);
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.3;
    }
    .attraction-desc {
      font-size: 0.82rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    .attraction-cost {
      margin-top: 4px;
      font-size: 0.75rem;
      color: var(--accent-gold);
      font-weight: 500;
    }

    /* ─── TIPS ─── */
    .tips-list { display: flex; flex-direction: column; gap: 10px; }
    .tip-item {
      display: flex;
      gap: 14px;
      align-items: flex-start;
      background: var(--bg-card);
      border: 1px solid var(--border-dim);
      border-radius: var(--radius-md);
      padding: 14px 16px;
      transition: border-color 0.25s;
    }
    .tip-item:hover { border-color: var(--border-accent); }
    .tip-icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 1px; }
    .tip-text {
      font-size: 0.87rem;
      color: var(--text-secondary);
      line-height: 1.58;
    }

    /* ─── COST BREAKDOWN ─── */
    .cost-breakdown { display: flex; flex-direction: column; gap: 16px; }
    .cost-row { display: flex; flex-direction: column; gap: 7px; }
    .cost-row-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cost-label {
      font-size: 0.84rem;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .cost-amount {
      font-family: var(--font-display);
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--accent-gold);
    }
    .cost-bar-track {
      height: 5px;
      background: var(--bg-card);
      border-radius: 4px;
      overflow: hidden;
    }
    .cost-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-gold), #f97316, var(--accent-purple));
      border-radius: 4px;
      transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
    }

    .cost-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      padding-top: 16px;
      border-top: 1px solid var(--border-accent);
    }
    .cost-total-label {
      font-family: var(--font-display);
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--text-secondary);
    }
    .cost-total-amount {
      font-family: var(--font-display);
      font-size: 1.55rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--accent-gold), #fcd34d);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ─── RECOMMENDATIONS GRID ─── */
    .recs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 14px;
    }
    .rec-card {
      background: var(--bg-card);
      border: 1px solid var(--border-dim);
      border-radius: var(--radius-md);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: border-color 0.25s, box-shadow 0.25s;
    }
    .rec-card:hover {
      border-color: var(--border-accent);
      box-shadow: var(--shadow-glow-gold);
    }
    .rec-card-icon { font-size: 1.7rem; }
    .rec-card-title {
      font-family: var(--font-display);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: var(--accent-gold);
    }
    .rec-list { display: flex; flex-direction: column; gap: 0; }
    .rec-list li {
      font-size: 0.83rem;
      color: var(--text-secondary);
      padding: 6px 0;
      border-bottom: 1px solid var(--border-dim);
      line-height: 1.4;
    }
    .rec-list li:last-child { border-bottom: none; }

    /* ─── FOOTER ─── */
    .trip-footer {
      text-align: center;
      padding: 48px 36px 52px;
      border-top: 1px solid var(--border-dim);
      margin-top: 4px;
      position: relative;
    }
    .trip-footer::before {
      content: '';
      position: absolute;
      top: 0; left: 50%; transform: translateX(-50%);
      width: 120px; height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent-gold), var(--accent-purple), transparent);
    }
    .footer-tagline {
      font-family: var(--font-display);
      font-size: clamp(1.3rem, 3vw, 1.7rem);
      font-weight: 700;
      background: linear-gradient(135deg, var(--accent-gold) 0%, #fcd34d 40%, var(--accent-purple) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
    }
    .footer-sub {
      font-size: 0.78rem;
      color: var(--text-muted);
      letter-spacing: 0.5px;
    }

    /* ─── SCROLL REVEAL (initial state) ─── */
    .reveal {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ─── RESPONSIVE ─── */
    @media (max-width: 920px) {
      .layout { flex-direction: column; }
      .panel-left {
        width: 100%;
        max-width: 100%;
        height: auto;
        position: static;
        border-left: none;
        border-bottom: 1px solid var(--border-accent);
        padding: 28px 20px;
      }
      .panel-left .form-display { flex-direction: row; flex-wrap: wrap; gap: 12px; }
      .panel-left .field-group { flex: 1 1 140px; }
      .panel-left .stats-pill { display: none; }
      .hero { height: 240px; }
      .hero-overlay { padding: 20px 20px; }
      .content-wrap { padding: 24px 16px; gap: 34px; }
      .cards-grid--3 { grid-template-columns: repeat(auto-fill, minmax(145px, 1fr)); }
      .recs-grid { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); }
    }

    @media (max-width: 560px) {
      .hero-destination { font-size: 1.8rem; }
      .hero-stats { gap: 12px; }
      .cards-grid--2 { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

<!-- Animated background particles -->
<canvas id="particles" aria-hidden="true"></canvas>

<div class="layout">

  <!-- ═══════════════════════════════════════════
       LEFT PANEL — Input Summary
  ═══════════════════════════════════════════ -->
  <aside class="panel-left">
    <div class="brand-tag">✈️ TRIP PLANNER</div>
    <h1 class="panel-title">PLAN YOUR<br>PERFECT GETAWAY</h1>

    <div class="form-display">
      <div class="field-group">
        <label class="field-label"><span class="field-icon">📍</span> יעד</label>
        <div class="field-value">{{DESTINATION_NAME}}</div>
      </div>

      <div class="field-group">
        <label class="field-label"><span class="field-icon">📅</span> תאריכים</label>
        <div class="field-value">{{DATES_DISPLAY}}</div>
      </div>

      <div class="field-group">
        <label class="field-label"><span class="field-icon">💰</span> תקציב</label>
        <div class="field-value">{{BUDGET_DISPLAY}}</div>
      </div>

      <div class="field-group">
        <label class="field-label"><span class="field-icon">👥</span> למי מיועד</label>
        <div class="field-value field-value--badge">{{WHO_FOR}}</div>
      </div>
    </div>

    <div class="stats-pill">
      <span>{{NUM_DAYS}} ימים</span>
      <span class="s-divider">·</span>
      <span>{{NUM_PEOPLE}} אנשים</span>
      <span class="s-divider">·</span>
      <span>{{MONTH_YEAR}}</span>
    </div>

    <button class="btn-regenerate" onclick="window.location.reload()">
      ✨ Generate Again
    </button>
  </aside>

  <!-- ═══════════════════════════════════════════
       RIGHT PANEL — Trip Plan
  ═══════════════════════════════════════════ -->
  <main class="panel-right">

    <!-- HERO -->
    <section class="hero">
      <img
        class="hero-img"
        src="{{UNSPLASH_URL}}"
        alt="{{DESTINATION_NAME}}"
        onerror="this.src='https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&h=600&fit=crop'"
        loading="eager"
      >
      <div class="hero-overlay">
        <p class="hero-eyebrow">✦ YOUR AI-GENERATED GETAWAY ✦</p>
        <h2 class="hero-destination">{{DESTINATION_NAME}}</h2>
        <p class="hero-tagline">{{DESTINATION_TAGLINE}}</p>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="hero-stat-value">{{MONTH_SHORT}}</span>
            <span class="hero-stat-label">חודש</span>
          </div>
          <div class="hero-stat-divider"></div>
          <div class="hero-stat">
            <span class="hero-stat-value">{{NUM_DAYS}}</span>
            <span class="hero-stat-label">ימים</span>
          </div>
          <div class="hero-stat-divider"></div>
          <div class="hero-stat">
            <span class="hero-stat-value">{{NUM_PEOPLE}}</span>
            <span class="hero-stat-label">אנשים</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <div class="content-wrap">

      <!-- ITINERARY -->
      <section class="content-section">
        <h3 class="section-title">🗓️ ITINERARY</h3>
        {{ITINERARY_HTML}}
      </section>

      <!-- RESTAURANTS -->
      <section class="content-section">
        <h3 class="section-title">🍽️ RESTAURANTS</h3>
        <div class="cards-grid cards-grid--2">
          {{RESTAURANTS_HTML}}
        </div>
      </section>

      <!-- ATTRACTIONS -->
      <section class="content-section">
        <h3 class="section-title">🎯 ATTRACTIONS</h3>
        <div class="cards-grid cards-grid--3">
          {{ATTRACTIONS_HTML}}
        </div>
      </section>

      <!-- TRAVEL TIPS -->
      <section class="content-section">
        <h3 class="section-title">💡 TRAVEL TIPS</h3>
        <ul class="tips-list">
          {{TIPS_HTML}}
        </ul>
      </section>

      <!-- COST BREAKDOWN -->
      <section class="content-section">
        <h3 class="section-title">💰 COST BREAKDOWN</h3>
        <div class="cost-breakdown">
          {{COST_HTML}}
        </div>
        <div class="cost-total">
          <span class="cost-total-label">סה&quot;כ משוער</span>
          <span class="cost-total-amount">{{TOTAL_COST}}</span>
        </div>
      </section>

      <!-- OTHER RECOMMENDATIONS -->
      <section class="content-section">
        <h3 class="section-title">✈️ OTHER RECOMMENDATIONS</h3>
        <div class="recs-grid">
          {{HOTEL_CARD_HTML}}
          {{FLIGHTS_CARD_HTML}}
          {{PACKING_CARD_HTML}}
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="trip-footer">
        <p class="footer-tagline">Your dream escape is ready ✨</p>
        <p class="footer-sub">Generated by Trip Planner · {{TODAY_DATE}}</p>
      </footer>

    </div><!-- /content-wrap -->
  </main>
</div><!-- /layout -->

<script>
/* ─────────────────────────────────────────────
   PARTICLES
───────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let particles = [];
  const GOLD   = 'rgba(245,158,11,';
  const PURPLE = 'rgba(139,92,246,';
  const COLORS = [GOLD, PURPLE, GOLD, GOLD]; // bias toward gold

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function spawn() {
    particles = Array.from({ length: 65 }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      r:    Math.random() * 2.5 + 0.8,
      dx:   (Math.random() - 0.5) * 0.35,
      dy:   (Math.random() - 0.5) * 0.35,
      o:    Math.random() * 0.45 + 0.05,
      do_:  (Math.random() - 0.5) * 0.003,
      c:    COLORS[Math.floor(Math.random() * COLORS.length)]
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.dx; p.y += p.dy;
      p.o += p.do_;
      if (p.o <= 0.04 || p.o >= 0.55) p.do_ *= -1;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c + p.o.toFixed(2) + ')';
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', () => { resize(); spawn(); });
  resize(); spawn(); tick();
})();

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
(function () {
  const targets = document.querySelectorAll(
    '.day-card, .restaurant-card, .attraction-card, .tip-item, .rec-card, .cost-row'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // Stagger siblings inside the same parent
        const siblings = Array.from(e.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
        const idx = siblings.indexOf(e.target);
        setTimeout(() => {
          e.target.classList.add('visible');
        }, Math.min(idx * 60, 300));
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  targets.forEach(el => observer.observe(el));
})();

/* ─────────────────────────────────────────────
   COST BAR ANIMATION (trigger on first paint)
───────────────────────────────────────────── */
(function () {
  // Store original widths and set to 0 initially
  const bars = document.querySelectorAll('.cost-bar');
  bars.forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0%';
    bar._targetWidth = w;
  });

  const trigger = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bars2 = e.target.querySelectorAll('.cost-bar');
        bars2.forEach((bar, i) => {
          setTimeout(() => { bar.style.width = bar._targetWidth; }, i * 100);
        });
        trigger.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  const costSection = document.querySelector('.cost-breakdown');
  if (costSection) trigger.observe(costSection);
})();
</script>
</body>
</html>

```

---

## Phase 4 — Open Browser + Completion Message

Open the file in the default browser:
```powershell
Start-Process "$env:USERPROFILE\Documents\Trip\trip-{slug}-{date}.html"
```

Then show:
```
✅ הטיול שלך ל-{Destination} מוכן!
📄 הקובץ נפתח בדפדפן
📁 שמור ב: $env:USERPROFILE\Documents\Trip\trip-{slug}-{date}.html

רוצה לשנות משהו? ספר לי ואעדכן 🙂
```

---

## Placeholder Reference

### Scalar Placeholders (simple text replacement)

| Placeholder | Example Value | Source |
|---|---|---|
| `{{DESTINATION_NAME}}` | `Maldives` | User input |
| `{{DATES_DISPLAY}}` | `15–22 Aug 2025` | Formatted from user input |
| `{{BUDGET_DISPLAY}}` | `$3,000` | User input formatted |
| `{{WHO_FOR}}` | `זוג` | User input |
| `{{TRAVEL_STYLE}}` | `Romantic & Relaxing` | User input (or leave empty) |
| `{{NUM_DAYS}}` | `7` | Calculated from dates |
| `{{NUM_PEOPLE}}` | `2` | Derived from WHO_FOR |
| `{{MONTH_YEAR}}` | `August 2025` | From departure date |
| `{{MONTH_SHORT}}` | `Aug` | From departure date |
| `{{UNSPLASH_URL}}` | `https://source.unsplash.com/1200x600/?maldives,travel,landscape` | Constructed |
| `{{DESTINATION_TAGLINE}}` | `Paradise Found in the Indian Ocean` | Claude-generated poetic tagline |
| `{{TOTAL_COST}}` | `$2,800–$3,100` | Calculated sum |
| `{{TODAY_DATE}}` | `May 26, 2026` | Current date |

### HTML Block Placeholders (multi-line HTML snippets)

| Placeholder | Contains |
|---|---|
| `{{ITINERARY_HTML}}` | N `.day-card` divs — one per travel day |
| `{{RESTAURANTS_HTML}}` | 4–6 `.restaurant-card` divs |
| `{{ATTRACTIONS_HTML}}` | 5–8 `.attraction-card` divs |
| `{{TIPS_HTML}}` | 5–7 `.tip-item` `<li>` elements |
| `{{COST_HTML}}` | Cost rows with animated bar widths |
| `{{HOTEL_CARD_HTML}}` | Hotel recommendation `.rec-card` |
| `{{FLIGHTS_CARD_HTML}}` | Flights `.rec-card` |
| `{{PACKING_CARD_HTML}}` | Packing list `.rec-card` |

### HTML Snippet Patterns

**Day card:**
```html
<div class="day-card">
  <div class="day-header">
    <span class="day-number">Day 1</span>
    <h4 class="day-title">Arrival in Malé</h4>
  </div>
  <div class="day-body">
    <div class="time-block">
      <span class="time-label">🌅 בוקר</span>
      <p>Land at Velana International Airport. Take a speedboat transfer to your island resort (30 min).</p>
    </div>
    <div class="time-block">
      <span class="time-label">☀️ צהריים</span>
      <p>Check in, explore the resort, first snorkel in the house reef.</p>
    </div>
    <div class="time-block">
      <span class="time-label">🌙 ערב</span>
      <p>Sunset cocktails on the overwater deck. Welcome dinner at the resort restaurant.</p>
    </div>
    <div class="day-cost">עלות יומית: ~$420</div>
  </div>
</div>
```

**Restaurant card:**
```html
<div class="restaurant-card">
  <div class="restaurant-header">
    <h4 class="restaurant-name">Ithaa Undersea Restaurant</h4>
    <span class="price-tier price-tier--3">$$$</span>
  </div>
  <p class="restaurant-cuisine">Seafood · Maldivian Fusion</p>
  <p class="restaurant-desc">World's first all-glass undersea restaurant, 5 meters below the Indian Ocean surface.</p>
  <p class="restaurant-dish">🍽️ Try: Fresh lobster with coconut-lime butter</p>
</div>
```

Price tier class: `price-tier--1` ($), `price-tier--2` ($$), `price-tier--3` ($$$)

**Attraction card:**
```html
<div class="attraction-card">
  <div class="attraction-type">Nature</div>
  <h4 class="attraction-name">North Malé Atoll</h4>
  <p class="attraction-desc">Spectacular coral reefs with sea turtles, manta rays, and technicolor fish. Best snorkeling in the Maldives.</p>
  <p class="attraction-cost">Free – $30</p>
</div>
```

**Tip item:**
```html
<li class="tip-item">
  <span class="tip-icon">💳</span>
  <span class="tip-text">USD is universally accepted at resorts; bring small bills for local island shopping and tips.</span>
</li>
```

**Cost row:**
```html
<div class="cost-row">
  <div class="cost-row-info">
    <span class="cost-label">✈️ טיסות</span>
    <span class="cost-amount">$1,200</span>
  </div>
  <div class="cost-bar-track">
    <div class="cost-bar" style="width: 40%"></div>
  </div>
</div>
```

**Rec card (hotel example):**
```html
<div class="rec-card">
  <div class="rec-card-icon">🏨</div>
  <div class="rec-card-title">HOTEL</div>
  <ul class="rec-list">
    <li>Conrad Maldives Rangali Island ⭐⭐⭐⭐⭐</li>
    <li>Soneva Fushi – Luxury all-inclusive</li>
    <li>Cinnamon Dhonveli – Mid-range, great surf</li>
  </ul>
</div>
```

**Rec card (flights example):**
```html
<div class="rec-card">
  <div class="rec-card-icon">✈️</div>
  <div class="rec-card-title">FLIGHTS</div>
  <ul class="rec-list">
    <li>Book via: Skyscanner / Google Flights</li>
    <li>Estimated: $800–$1,400 round-trip</li>
    <li>Best deal: Book 6–8 weeks ahead</li>
    <li>Hub: Connect via Dubai (Emirates)</li>
  </ul>
</div>
```

**Rec card (packing example):**
```html
<div class="rec-card">
  <div class="rec-card-icon">🎒</div>
  <div class="rec-card-title">PACKING LIST</div>
  <ul class="rec-list">
    <li>Reef-safe sunscreen SPF 50+</li>
    <li>Underwater camera / GoPro</li>
    <li>Snorkeling mask (own is better)</li>
    <li>Light linen clothes for evenings</li>
    <li>Mosquito repellent</li>
    <li>Power adapter (Type D/G)</li>
  </ul>
</div>
```

---

## Rules

1. **Never skip Phase 0.** Always collect inputs before generating anything.
2. **Always read the template** from `assets/trip-template.html` and replace placeholders. Never write the full HTML from scratch inline.
3. **Template path:** `$env:USERPROFILE\.claude\skills\trip-planner\assets\trip-template.html`
4. **Output path:** `$env:USERPROFILE\Documents\Trip\trip-{slug}-{YYYY-MM-DD}.html`
5. **Unsplash URL:** always append `,travel,landscape` to the destination slug.
6. **Bar widths:** (line_item_cost / total_budget) × 100, floor at 5%, ceil at 95%.
7. **Day count:** derive exactly from dates. Last day is departure — morning block only, no evening block.
8. **Left panel labels always in Hebrew** (יעד, תאריכים, תקציב, למי מיועד) regardless of content language.
9. **Open browser on Windows** with `Start-Process "full\path\to\file.html"`.
10. **Create output folder** if it doesn't exist: `New-Item -ItemType Directory -Path "..." -Force`.
11. **Escape HTML entities** in user-provided text: `<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;`, `"` → `&quot;`.
12. **Content language:** match the language the user used to trigger the skill (Hebrew trigger → Hebrew content body; English trigger → English content body). Left panel labels are always Hebrew.
