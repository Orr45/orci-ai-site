---
name: trip-planner
description: >
  Collects trip details conversationally (destination, dates, budget, travel group),
  generates a full AI trip plan with day-by-day itinerary, restaurants, attractions,
  travel tips, cost breakdown and recommendations, then produces a stunning dark-theme
  two-panel HTML file and opens it in the browser.
  Triggers on: "trip planner", "plan my trip", "×ª×›× ×Ÿ ×œ×™ ×˜×™×•×œ", "×ª×›× ×Ÿ ×˜×™×•×œ",
  "plan a trip", "trip plan", "×¤×œ×Ÿ ×œ×˜×™×•×œ", "×× ×™ ×¨×•×¦×” ×œ×ª×›× ×Ÿ ×˜×™×•×œ",
  "build me a trip", "create a trip plan", "×‘× ×” ×œ×™ ×˜×™×•×œ".
---

# Trip Planner Skill âœˆï¸

## Phase 0 â€” MANDATORY: Conversation (Gather Trip Details)

**Never skip this phase.** Before generating anything, send one friendly message asking for all inputs at once.

If the user triggered in Hebrew:
```
×©×œ×•×! ðŸŒ ×‘×•× × ×ª×›× ×Ÿ ×œ×š ××ª ×”×˜×™×•×œ ×”×ž×•×©×œ×.

×¡×¤×¨ ×œ×™:
- **×œ××Ÿ** ××ª×” ×˜×¡? (×™×¢×“)
- **×ž×ª×™** â€” ×ª××¨×™×š ×™×¦×™××” + ×ª××¨×™×š ×—×–×¨×”?
- **×ª×§×¦×™×‘** â€” ×›×ž×” ×™×© ×œ×š ×¡×”"×›? (×•×‘××™×–×• ×ž×˜×‘×¢)
- **×œ×ž×™** ×”×˜×™×•×œ? (×¨×•×•×§ / ×–×•×’ / ×ž×©×¤×—×” / ×§×‘×•×¦×ª ×—×‘×¨×™×)
- (××•×¤×¦×™×•× ×œ×™) **×¡×’× ×•×Ÿ** â€” ××“×•×•× ×¦×³×¨ / ×¨×•×ž× ×˜×™ / ×ª×¨×‘×•×ª / ×ž× ×•×—×” / ×§×•×œ×™× ×¨×™×”?
```

If the user triggered in English:
```
Hey! ðŸŒ Let's plan your perfect getaway.

Tell me:
- **Where** are you traveling? (destination)
- **When** â€” departure + return date?
- **Budget** â€” total budget? (and currency)
- **Who** is joining? (solo / couple / family / group)
- (optional) **Style** â€” adventure / romantic / culture / relaxation / foodie?
```

Wait for the answer. If partial, ask only for the missing fields in one follow-up message.

Derive automatically:
- **Number of days** = difference between return and departure dates (e.g., Aug 15â€“22 = 7 days)
- **Number of people** = Solo â†’ 1, Couple â†’ 2, Group â†’ 4 (default if not specified), Family â†’ ask if unclear

---

## Phase 1 â€” Generate Trip Plan (Internal Processing)

After receiving all inputs, echo a brief summary and proceed immediately without waiting:

```
×ž×¦×•×™×Ÿ! ×œ×¡×™×›×•×:
- ðŸŒ **×™×¢×“:** {Destination}
- ðŸ“… **×ª××¨×™×›×™×:** {start} â€“ {end} ({N} ×™×ž×™×)
- ðŸ’° **×ª×§×¦×™×‘:** {Budget}
- ðŸ‘¥ **×œ×ž×™:** {WHO_FOR}

×ž×ª×—×™×œ ×œ×‘× ×•×ª ××ª ×ª×•×›× ×™×ª ×”×˜×™×•×œ... âœ¨
```

Then internally generate ALL the following content sections before writing the HTML:

### A. Day-by-Day Itinerary
One card per travel day. First day = arrival (morning transfer + settle in). Last day = departure (morning activities only, no evening block).
Each day must include:
- Morning block (ðŸŒ… ×‘×•×§×¨) â€” activity + time hint
- Afternoon block (â˜€ï¸ ×¦×”×¨×™×™×) â€” activity or free exploration
- Evening block (ðŸŒ™ ×¢×¨×‘) â€” dinner suggestion or night activity (skip on last day)
- Estimated daily cost in user's currency

### B. Restaurant Recommendations (4â€“6 restaurants)
For each: name, cuisine type, price tier ($ / $$ / $$$ â€” must match the budget level), one highlight dish, 1-sentence description.
Budget matching:
- Under $50/day food budget â†’ mostly $ restaurants
- $50â€“100/day â†’ mix of $ and $$
- $100+/day â†’ include $$$

### C. Attractions & Things to Do (5â€“8 items)
For each: name, type (nature / culture / adventure / food / nightlife / shopping), 1â€“2 sentence description, cost estimate.

### D. Travel Tips (5â€“7 tips)
Must cover: local transport options, currency/payment advice, safety or etiquette, climate/packing, and at least one insider tip specific to this destination and season.

### E. Cost Breakdown
Lines (all in user's currency):
- âœˆï¸ Flights â€” round-trip estimate
- ðŸ¨ Hotel â€” (per night Ã— nights)
- ðŸ½ï¸ Food â€” (per day Ã— days)
- ðŸŽ¯ Activities â€” estimated total
- ðŸš• Transport â€” local transport total

For each line: estimated amount + bar width percentage = (amount / total_budget) Ã— 100, min 5%, max 95%.
Also compute: estimated total vs. user's budget (show if under/over).

### F. Other Recommendations
- ðŸ¨ Hotel: mention tier (budget/mid-range/luxury) that fits the budget, list 2â€“3 specific real hotel names
- âœˆï¸ Flights: recommend a booking platform (Skyscanner / Google Flights / direct airline), estimated price range, tip for best time to book
- ðŸŽ’ Packing: 6â€“8 items specific to destination + season (not generic)

---

## Phase 2 â€” Destination Image

Construct Unsplash Source URL for the hero image:
```
https://source.unsplash.com/1200x600/?{destination-encoded},travel,landscape
```

Where `{destination-encoded}` = destination name lowercased, spaces replaced with `+`.
- "Maldives" â†’ `maldives,travel,landscape`
- "New York" â†’ `new+york,travel,landscape`
- "Tel Aviv" â†’ `tel+aviv,travel,landscape`

Fallback for obscure destinations: use country name + `,travel,landscape`.
Always append `,travel,landscape` â€” this ensures the photo is appropriate for travel content.

---

## Phase 3 â€” Build HTML File

1. **Read the template:**
   `$env:USERPROFILE\.claude\skills\trip-planner\assets\trip-template.html`

2. **Replace all `{{PLACEHOLDER}}` tokens** with the generated content (full list in Placeholder Reference below).

3. **Ensure the output folder exists:**
   ```powershell
   New-Item -ItemType Directory -Path "$env:USERPROFILE\Documents\Trip" -Force
   ```

4. **Write the completed HTML to:**
   `$env:USERPROFILE\Documents\Trip\trip-{destination-slug}-{YYYY-MM-DD}.html`
   
   Where:
   - `{destination-slug}` = destination name lowercased, spaces â†’ hyphens (e.g., `new-york`, `tel-aviv`)
   - `{YYYY-MM-DD}` = today's date

---

## Phase 4 â€” Open Browser + Completion Message

Open the file in the default browser:
```powershell
Start-Process "$env:USERPROFILE\Documents\Trip\trip-{slug}-{date}.html"
```

Then show:
```
âœ… ×”×˜×™×•×œ ×©×œ×š ×œ-{Destination} ×ž×•×›×Ÿ!
ðŸ“„ ×”×§×•×‘×¥ × ×¤×ª×— ×‘×“×¤×“×¤×Ÿ
ðŸ“ ×©×ž×•×¨ ×‘: $env:USERPROFILE\Documents\Trip\trip-{slug}-{date}.html

×¨×•×¦×” ×œ×©× ×•×ª ×ž×©×”×•? ×¡×¤×¨ ×œ×™ ×•××¢×“×›×Ÿ ðŸ™‚
```

---

## Placeholder Reference

### Scalar Placeholders (simple text replacement)

| Placeholder | Example Value | Source |
|---|---|---|
| `{{DESTINATION_NAME}}` | `Maldives` | User input |
| `{{DATES_DISPLAY}}` | `15â€“22 Aug 2025` | Formatted from user input |
| `{{BUDGET_DISPLAY}}` | `$3,000` | User input formatted |
| `{{WHO_FOR}}` | `×–×•×’` | User input |
| `{{TRAVEL_STYLE}}` | `Romantic & Relaxing` | User input (or leave empty) |
| `{{NUM_DAYS}}` | `7` | Calculated from dates |
| `{{NUM_PEOPLE}}` | `2` | Derived from WHO_FOR |
| `{{MONTH_YEAR}}` | `August 2025` | From departure date |
| `{{MONTH_SHORT}}` | `Aug` | From departure date |
| `{{UNSPLASH_URL}}` | `https://source.unsplash.com/1200x600/?maldives,travel,landscape` | Constructed |
| `{{DESTINATION_TAGLINE}}` | `Paradise Found in the Indian Ocean` | Claude-generated poetic tagline |
| `{{TOTAL_COST}}` | `$2,800â€“$3,100` | Calculated sum |
| `{{TODAY_DATE}}` | `May 26, 2026` | Current date |

### HTML Block Placeholders (multi-line HTML snippets)

| Placeholder | Contains |
|---|---|
| `{{ITINERARY_HTML}}` | N `.day-card` divs â€” one per travel day |
| `{{RESTAURANTS_HTML}}` | 4â€“6 `.restaurant-card` divs |
| `{{ATTRACTIONS_HTML}}` | 5â€“8 `.attraction-card` divs |
| `{{TIPS_HTML}}` | 5â€“7 `.tip-item` `<li>` elements |
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
    <h4 class="day-title">Arrival in MalÃ©</h4>
  </div>
  <div class="day-body">
    <div class="time-block">
      <span class="time-label">ðŸŒ… ×‘×•×§×¨</span>
      <p>Land at Velana International Airport. Take a speedboat transfer to your island resort (30 min).</p>
    </div>
    <div class="time-block">
      <span class="time-label">â˜€ï¸ ×¦×”×¨×™×™×</span>
      <p>Check in, explore the resort, first snorkel in the house reef.</p>
    </div>
    <div class="time-block">
      <span class="time-label">ðŸŒ™ ×¢×¨×‘</span>
      <p>Sunset cocktails on the overwater deck. Welcome dinner at the resort restaurant.</p>
    </div>
    <div class="day-cost">×¢×œ×•×ª ×™×•×ž×™×ª: ~$420</div>
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
  <p class="restaurant-cuisine">Seafood Â· Maldivian Fusion</p>
  <p class="restaurant-desc">World's first all-glass undersea restaurant, 5 meters below the Indian Ocean surface.</p>
  <p class="restaurant-dish">ðŸ½ï¸ Try: Fresh lobster with coconut-lime butter</p>
</div>
```

Price tier class: `price-tier--1` ($), `price-tier--2` ($$), `price-tier--3` ($$$)

**Attraction card:**
```html
<div class="attraction-card">
  <div class="attraction-type">Nature</div>
  <h4 class="attraction-name">North MalÃ© Atoll</h4>
  <p class="attraction-desc">Spectacular coral reefs with sea turtles, manta rays, and technicolor fish. Best snorkeling in the Maldives.</p>
  <p class="attraction-cost">Free â€“ $30</p>
</div>
```

**Tip item:**
```html
<li class="tip-item">
  <span class="tip-icon">ðŸ’³</span>
  <span class="tip-text">USD is universally accepted at resorts; bring small bills for local island shopping and tips.</span>
</li>
```

**Cost row:**
```html
<div class="cost-row">
  <div class="cost-row-info">
    <span class="cost-label">âœˆï¸ ×˜×™×¡×•×ª</span>
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
  <div class="rec-card-icon">ðŸ¨</div>
  <div class="rec-card-title">HOTEL</div>
  <ul class="rec-list">
    <li>Conrad Maldives Rangali Island â­â­â­â­â­</li>
    <li>Soneva Fushi â€“ Luxury all-inclusive</li>
    <li>Cinnamon Dhonveli â€“ Mid-range, great surf</li>
  </ul>
</div>
```

**Rec card (flights example):**
```html
<div class="rec-card">
  <div class="rec-card-icon">âœˆï¸</div>
  <div class="rec-card-title">FLIGHTS</div>
  <ul class="rec-list">
    <li>Book via: Skyscanner / Google Flights</li>
    <li>Estimated: $800â€“$1,400 round-trip</li>
    <li>Best deal: Book 6â€“8 weeks ahead</li>
    <li>Hub: Connect via Dubai (Emirates)</li>
  </ul>
</div>
```

**Rec card (packing example):**
```html
<div class="rec-card">
  <div class="rec-card-icon">ðŸŽ’</div>
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
6. **Bar widths:** (line_item_cost / total_budget) Ã— 100, floor at 5%, ceil at 95%.
7. **Day count:** derive exactly from dates. Last day is departure â€” morning block only, no evening block.
8. **Left panel labels always in Hebrew** (×™×¢×“, ×ª××¨×™×›×™×, ×ª×§×¦×™×‘, ×œ×ž×™ ×ž×™×•×¢×“) regardless of content language.
9. **Open browser on Windows** with `Start-Process "full\path\to\file.html"`.
10. **Create output folder** if it doesn't exist: `New-Item -ItemType Directory -Path "..." -Force`.
11. **Escape HTML entities** in user-provided text: `<` â†’ `&lt;`, `>` â†’ `&gt;`, `&` â†’ `&amp;`, `"` â†’ `&quot;`.
12. **Content language:** match the language the user used to trigger the skill (Hebrew trigger â†’ Hebrew content body; English trigger â†’ English content body). Left panel labels are always Hebrew.

