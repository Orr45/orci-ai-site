# Orci AI - Personal Brand Website - Memory Bank

## 1. Project Brief

**Project Name:** Orci AI Personal Brand Website

**Owner:** Or Shmer (Orci)

**Purpose:** High-end personal brand website showcasing Orci's journey from gaming content creator (oci Gaming - 130k subscribers, 25M views) → IDF Officer (חטיבת החילוץ וההצלה) → AI specialist. The site serves as a hub for AI guides, products, and lead generation through WhatsApp.

**Design Philosophy:** Premium, Apple/Stripe-level polish with glassmorphism effects and floating animations. Heavily inspired by high-end landing pages with Deep Blue/Cyan color palette.

**Target Audience:** Hebrew-speaking entrepreneurs, reservists (מילואימניקים), and businesses looking to leverage AI for growth.

**Primary CTA:** WhatsApp contact (wa.me/972542599107) for consultation and product sales.

---

## 2. Tech Stack

### Core Framework
- **Next.js 16.1.6** - App Router (latest)
- **React 19.2.3**
- **TypeScript 5** - Strict mode enabled

### Styling
- **Tailwind CSS v4** - With PostCSS plugin
- **Custom CSS Variables** - Deep blue/cyan palette
- **Heebo Font** - Google Font with Hebrew + Latin subsets

### Animation & Effects
- **Framer Motion** - Floating animations, page transitions, staggered grids
- **Glassmorphism** - Custom backdrop-filter utilities

### Utilities
- **clsx** + **tailwind-merge** - Class name management
- **next/image** - Optimized image loading

### Content & Data
- **MDX Support** (@mdx-js/loader, @mdx-js/react, @next/mdx)
- **Static TypeScript data files** - products.ts, guides.ts

### Plugins
- **tailwindcss-rtl** - RTL support for Hebrew

---

## 3. Architecture & Key Decisions

### Component Architecture

**Modular Component System:**
```
components/
├── ui/                   # Reusable UI primitives
│   ├── GlassmorphicCard.tsx
│   ├── FloatingElement.tsx
│   ├── SectionHeader.tsx
│   ├── CTAButton.tsx
│   ├── BackgroundGradient.tsx
│   ├── button.tsx        # Shadcn Button component
│   ├── background-paths.tsx  # Animated SVG paths background
│   ├── container-scroll-animation.tsx  # 3D scroll effect
│   └── CopyPrompt.tsx
├── video/                # Video playback system
│   ├── VideoPlayer.tsx
│   ├── VideoModal.tsx
│   └── VideoGrid.tsx
├── news/                 # News & content components
│   └── DailyPulse.tsx    # AI Daily Pulse with cron job
├── products/             # Product-specific components
│   ├── ProductHero.tsx
│   ├── ProductFeatureCard.tsx
│   └── ProductFeatureGrid.tsx
└── layout/               # Layout components
    ├── Navigation.tsx
    └── Footer.tsx
```

### Key Design Decisions

**1. Internal Video Playback System**
- **Problem:** Videos were linking to external Google Drive, breaking user flow
- **Solution:** Convert Google Drive share URLs to iframe embeds using `/preview` suffix
- **Implementation:** `getGoogleDriveEmbedUrl()` utility function in `lib/utils.ts`
- **UX:** VideoModal component with Framer Motion transitions for smooth playback

**2. Glassmorphism Enhancement**
- **Base:** `backdrop-blur-md` with semi-transparent backgrounds
- **Levels:** sm/md/lg/xl blur options in GlassmorphicCard
- **Fallback:** Solid backgrounds for browsers without backdrop-filter support
- **Border Accent:** Cyan borders with opacity (border-orci-cyan/20)

**3. Floating Animations Strategy**
- **Component:** FloatingElement wrapper using Framer Motion
- **Pattern:** Infinite y-axis movement with slight rotation
- **Performance:** Configurable duration, delay, and offset
- **Usage:** Applied to hero elements, gradient orbs, and glassmorphic cards

**4. RTL-First Design**
- **HTML:** `dir="rtl"` in root layout
- **Font:** Heebo with Hebrew subset loaded first
- **Navigation:** Links positioned for RTL flow
- **All text:** Hebrew with proper RTL alignment

**5. Color System**
- **Primary:** `--orci-cyan: #00d1ff`
- **Secondary:** `--orci-blue: #00bfff`
- **Background:** `--background: #0a0a0a` (dark mode)
- **Foreground:** `--foreground: #ededed`
- **Usage:** Gradient text, borders, shadows, glows

**6. Navigation Pattern**
- **Fixed header** with glassmorphic backdrop
- **Active link indicator** using Framer Motion layoutId
- **Mobile menu** with AnimatePresence transitions
- **WhatsApp CTA** always visible

**7. Data Management**
- **Separation of concerns:** Data in `/data`, logic in components
- **Type safety:** All data validated with TypeScript interfaces
- **Easy updates:** User can update products/guides without touching components

**8. Animated Background Paths**
- **Component:** BackgroundPathsEffect using Framer Motion and SVG animations
- **Design:** 36 animated curved paths with continuous motion
- **Styling:** Orci-cyan color (`#00d1ff`) with prominent visibility (25-100% opacity)
- **Stroke Width:** 1.0-3.16px (thick enough to be clearly visible)
- **Implementation:** Fixed full-page background behind all content
- **Transparency:** Section backgrounds made semi-transparent (92% opaque) to allow animation to show through
- **Performance:** Pointer-events disabled, GPU-accelerated transforms
- **Usage:** Full-page effect flowing continuously across all sections
- **Flexibility:** Two exports - BackgroundPathsEffect (background only) and BackgroundPaths (full hero)

**9. Interactive Bento Gallery**
- **Component:** InteractiveBentoGallery with drag-and-drop reordering
- **Usage:** Featured guides on home page and guides page
- **Features:** Animated dock navigation, modal view, Framer Motion drag physics
- **Integration:** Items link to guide pages via `href` field on MediaItemType

**10. Highlighter Hero**
- **Components:** HighlightGroup, HighlighterItem, Particles
- **Effect:** Mouse-tracking cyan glow + canvas particle system
- **Animation:** Animated pointer cycling between 4 Hebrew service labels
- **Engine:** framer-motion `useAnimate` for infinite animation sequence

**11. Orbiting Skills**
- **Component:** OrbitingSkills with requestAnimationFrame animation loop
- **Layout:** 2 orbital rings (inner: 3 icons, outer: 3 icons) around central Sparkles icon
- **Responsive:** Dynamic scale factor (`containerSize / 420`) for mobile compatibility
- **Interaction:** Hover to pause, hover on icon for tooltip

**12. 3D Scroll Animation**
- **Component:** ContainerScroll with perspective transforms
- **Effect:** Content rotates and scales as user scrolls
- **Responsive:** Different scale parameters for mobile vs desktop
- **Usage:** Showcasing YouTube channel achievement with visual impact
- **Border:** 4px orci-cyan border with dark gradient background for contrast

---

## 4. Current Status

### ✅ COMPLETED - Initial Implementation (2025-01-31)

All core functionality has been implemented and tested successfully:

- ✅ Dependencies installed (framer-motion, clsx, tailwind-merge)
- ✅ TypeScript types defined (types/index.ts)
- ✅ Utility functions created (lib/utils.ts)
- ✅ Global styles enhanced with glassmorphism
- ✅ All 13 components built and tested
- ✅ Video playback system fully functional
- ✅ Navigation with mobile menu working
- ✅ Home page refactored with new components
- ✅ Products page created
- ✅ Guides page created
- ✅ Build successful (no TypeScript errors)

### 🔄 AWAITING USER INPUT

**Content to Replace:**

1. **Header Image** (app/page.tsx:38-49)
   - Currently commented out
   - Need: High-resolution image URL or file
   - Action: Uncomment and replace `USER_PROVIDED_IMAGE_URL`

2. **Product Features** (data/products.ts)
   - Currently: 6 placeholder features
   - Need: Complete feature list for "חבילת המיליון למילואימניק"
   - Format: title, description, icon (emoji), highlighted (yes/no)

3. **Guide Videos** (data/guides.ts)
   - Currently: 6 placeholder videos with example Drive URLs
   - Need: Real Google Drive video links with metadata
   - Format: title, description, URL, category

### ⚠️ MINOR WARNINGS (Non-Breaking)

Build warnings about viewport metadata (can be ignored or fixed later):
```
⚠ Unsupported metadata viewport is configured in metadata export
Read more: https://nextjs.org/docs/app/api-reference/functions/generate-viewport
```

**Fix:** Move viewport to separate export (low priority, doesn't affect functionality)

---

## 5. Progress & Roadmap

### ✅ Phase 1: Foundation & Infrastructure (COMPLETED)

- [x] Next.js project initialized with App Router
- [x] Tailwind CSS v4 configured
- [x] Heebo font integrated with Hebrew support
- [x] RTL support configured
- [x] Custom color palette defined
- [x] MDX support configured

### ✅ Phase 2: Component Library (COMPLETED)

- [x] TypeScript type definitions (types/index.ts)
- [x] Utility functions (cn, getGoogleDriveEmbedUrl)
- [x] GlassmorphicCard component with blur levels
- [x] FloatingElement animation wrapper
- [x] SectionHeader with gradient text
- [x] CTAButton with variants (primary/secondary/outline)
- [x] BackgroundGradient animated orbs

### ✅ Phase 3: Video System (COMPLETED)

- [x] VideoPlayer component (Google Drive iframe)
- [x] VideoModal with Framer Motion
- [x] VideoGrid for Guides page
- [x] ESC key handler for modal
- [x] Click-outside-to-close functionality

### ✅ Phase 4: Layout Components (COMPLETED)

- [x] Navigation with fixed header
- [x] Active link indicator (Framer Motion layoutId)
- [x] Mobile hamburger menu
- [x] Footer with links

### ✅ Phase 5: Product Components (COMPLETED)

- [x] ProductHero with floating title
- [x] ProductFeatureCard with icons
- [x] ProductFeatureGrid responsive layout
- [x] Highlighted feature badge

### ✅ Phase 6: Pages (COMPLETED)

- [x] Home page refactored with components
- [x] Products page (/products)
- [x] Guides page (/guides)
- [x] Header image placeholder (awaiting user content)

### ✅ Phase 7: Testing & Build (COMPLETED)

- [x] TypeScript compilation successful
- [x] Production build successful
- [x] All routes generating correctly
- [x] No runtime errors

### 🔲 Phase 8: Content Population (PENDING USER INPUT)

- [ ] Add header image to home page
- [ ] Replace product features with real data
- [ ] Replace guide videos with real Drive links
- [ ] Test video playback with real URLs

### 🔲 Phase 9: Optional Enhancements (FUTURE)

- [ ] Category filtering on Guides page
- [ ] Search functionality for videos
- [ ] Testimonials section
- [ ] Blog/Articles page using MDX
- [ ] Analytics integration (Google Analytics or Plausible)
- [ ] Video playlists feature
- [ ] Performance optimization (lazy loading)
- [ ] SEO optimization (meta tags, structured data)
- [ ] Fix viewport metadata warnings

---

## 6. File Structure Overview

```
orci-ai-site/
├── app/
│   ├── layout.tsx           # Root layout with Navigation
│   ├── page.tsx             # Home page (with header image placeholder)
│   ├── globals.css          # Global styles + glassmorphism utilities
│   ├── products/
│   │   └── page.tsx         # Products page
│   └── guides/
│       └── page.tsx         # Guides page
├── components/
│   ├── ui/                  # 5 UI components
│   ├── video/               # 3 video components
│   ├── products/            # 3 product components
│   └── layout/              # 2 layout components
├── data/
│   ├── products.ts          # Product features (NEEDS USER DATA)
│   └── guides.ts            # Guide videos (NEEDS USER DATA)
├── lib/
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript interfaces
├── public/                  # Static assets
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── next.config.ts           # Next.js config
├── tailwind.config.ts       # Tailwind config (v4 inline)
└── claude.md                # THIS FILE - Memory Bank
```

---

## 7. Important URLs & Credentials

### WhatsApp Contact
- **Number:** 972542599107
- **Link:** https://wa.me/972542599107
- **Usage:** All CTAs throughout site

### Google Drive Video URLs (Placeholder)
- Video 1: https://drive.google.com/file/d/1t8UxYi84o7mw4pYQPywae6nNr9ESGleU/view?usp=sharing
- Video 2: https://drive.google.com/file/d/1VKn0udX27xpT3MhJd8EzmjHb-a6dTmq0/view?usp=sharing
- Video 3: https://drive.google.com/file/d/1V540n8u5zz2zbcVdMLAzHI9-VK3B6lS7/view?usp=sharing

**Note:** These are placeholder URLs. Replace with real content.

---

## 8. Commands & Workflows

### Development
```bash
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
npm run generate-weekly  # Generate weekly AI dashboard draft (requires OPENAI_API_KEY)
```

### Key Pages
- Home: http://localhost:3000
- Products: http://localhost:3000/products
- Guides: http://localhost:3000/guides
- **Weekly Dashboard: http://localhost:3000/weekly**

### Weekly Dashboard Workflow
```bash
# Every week (Monday morning recommended):
OPENAI_API_KEY=sk-... npm run generate-weekly
# → Opens data/weekly-dashboard.json in VS Code
# → Review, edit titles/descriptions, add/replace image URLs
# → git add data/weekly-dashboard.json && git commit -m "weekly update"
# → git push → Vercel deploys automatically
```

### Deployment
- **Recommended:** Vercel (zero-config deployment)
- **Alternative:** Any Node.js hosting platform

---

## 9. Known Issues & Limitations

### Non-Critical Warnings
- Viewport metadata deprecation (doesn't affect functionality)

### Google Drive Limitations
- Some videos may have embedding restrictions
- If embed fails, fallback to external link with warning
- Test with actual video URLs before deployment

### Performance Considerations
- Framer Motion adds ~60KB to bundle (acceptable)
- Large number of videos on Guides page may impact performance
- Consider lazy loading for optimization

---

## 10. Next Session Checklist

**When user returns with content:**

1. **Read this file first** to understand current state
2. **Ask for:**
   - Header image URL or file
   - Product features list (Excel/doc/text)
   - Guide video URLs with titles/descriptions
3. **Update files:**
   - app/page.tsx (uncomment header image section)
   - data/products.ts (replace placeholder features)
   - data/guides.ts (replace placeholder videos)
4. **Test:**
   - Run `npm run dev`
   - Check all pages load correctly
   - Test video playback in modal
   - Verify mobile responsiveness
   - Test WhatsApp CTAs
5. **Update this file:**
   - Mark Phase 8 as completed
   - Add any new issues discovered
   - Update "Current Status" section

---

## 11. Design System Reference

### Color Palette
- Cyan: `#00d1ff` (primary accent)
- Blue: `#00bfff` (secondary accent)
- Dark BG: `#0a0a0a`
- Light text: `#ededed`
- Gray tones: gray-800, gray-900

### Typography Scale
- Hero: `text-4xl sm:text-5xl md:text-7xl`
- Section Header: `text-3xl md:text-5xl`
- Body Large: `text-xl md:text-2xl`
- Body: `text-lg md:text-xl`

### Spacing
- Section padding: `py-20 px-4`
- Card padding: `p-8 md:p-12`
- Grid gap: `gap-6`

### Breakpoints (Tailwind defaults)
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

---

## 12. Contact & Support

**Project Owner:** Or Shmer (Orci)
**WhatsApp:** +972542599107
**Brand:** Orci AI

---

**Last Updated:** 2026-06-10
**Status:** ✅ דף נחיתה B2B חדש "המוצרים שלנו" (/products) בסגנון מותג ORCIAI — חבילת השקה 3+1 ב-₪2,250, טופס לידים ל-Mailchimp, 3 קאברים ויראליים מ-Higgsfield, עיצוב פרימיום בהשראת hd-media.ai.
**Next Action:** מעקב אחרי לידים ראשונים מהדף + בדיקת טופס הליד ב-production.

---

## 13. Session Log

### Session 2026-02-01 (continued)

**Guide Content & Images:**
- Updated "ai-beginners" guide with real content about the "talking objects" AI trend
- Added 3 guide images: GPTS.png, ForkImage.png, kLING2.6.png to public/guides/
- Fixed image file extension mismatch (.jpg → .png) and case mismatch (kLing2.6 → kLING2.6)
- Styled guide text: each step in its own GlassmorphicCard with cyan gradient titles, key terms highlighted in cyan bold

**YouTube Video Integration:**
- Added YouTube Shorts support to `getGoogleDriveEmbedUrl()` in lib/utils.ts (handles /shorts/ URLs)
- Embedded video (https://www.youtube.com/shorts/lxrvd_y8tPI) on home page as inline player (no modal)
- Added same video to guides page under "מדריכי וידאו" section
- Replaced all placeholder Google Drive videos with real YouTube content in data/guides.ts
- Guides page order: "מדריכים כתובים" first, then "מדריכי וידאו"

**Styling Changes (all pages):**
- Subtitle text across all pages: white text + light blue background (bg-orci-blue/30, rounded-xl)
- Applied to: home page, guides page, products page (ProductHero), guide article pages

**New Guide Template:**
- Created blank template at app/guides/new-guide/page.mdx
- Same structure as ai-beginners: hero, step cards with gradient titles, CTA
- Added to guides page card list (needs title/description/category update)

**Cleanup:**
- Removed unused VideoModal, useState, Image imports from home page
- Removed placeholder sections from ai-beginners guide (unused steps, tips, comments)


### Session 2026-02-03

**AI Daily Pulse Feature (Replaced NewsSection):**
- Removed old NewsSection component (was unstable, called OpenAI on every request)
- Created new "AI Daily Pulse" feature with Vercel Cron Job

**New Files Created:**
- `data/daily-pulse.json` - Stores the daily summary, timestamp, and sources
- `app/api/cron/update-news/route.ts` - Cron job endpoint that:
  - Fetches headlines from 3 RSS sources (TechCrunch AI, The Verge AI, VentureBeat AI)
  - Sends to GPT-4o-mini to generate Hebrew summary in Orci persona
  - Saves result to JSON file
  - Protected by CRON_SECRET header
- `app/api/daily-pulse/route.ts` - Public endpoint to read cached data for frontend
- `components/news/DailyPulse.tsx` - Frontend component with:
  - Glassmorphism design with cyan glow border
  - Pulsing "Live" indicator
  - Hebrew summary paragraph
  - Source links footer
  - Timestamp showing last update
- `vercel.json` - Configures cron job to run at 07:00 AM IST daily (4:00 UTC)

**How It Works:**
1. Vercel Cron triggers `/api/cron/update-news` once daily at 07:00 AM IST
2. Endpoint fetches RSS, calls OpenAI once, saves result to `data/daily-pulse.json`
3. Frontend component reads from `/api/daily-pulse` (no OpenAI calls)
4. Result: OpenAI called only once per day, not per visitor

**Environment Variables Required:**
- `OPENAI_API_KEY` - For GPT-4o-mini summary generation
- `CRON_SECRET` - Optional security for cron endpoint (add to Vercel)

**First-Time Setup:**
After deploying, manually trigger the cron endpoint once to populate initial data:
`curl https://your-site.vercel.app/api/cron/update-news`


### Session 2026-02-06

**Scroll Animation Enhancement:**
- Updated home page scroll animation (ContainerScroll component) to showcase YouTube channel achievement
- Changed text from generic "viral content" to specific stats: "בעל ערוץ יוטיוב שהגיע ל-25 מיליון צפיות ו-130,000 רשומים"
- Replaced Unsplash stock image with real channel screenshot (`public/Chanel.png`)
- Copied image from Desktop: `C:\Users\0rr Shemer\Desktop\OrciAiSite\Chanel.png` → `public/Chanel.png`
- Commit: dc2b122

**Background Paths Animation Feature:**
- Installed dependencies for shadcn components:
  - `@radix-ui/react-slot` - Slot component for flexible composition
  - `class-variance-authority` - CVA for managing component variants
- Created `components/ui/button.tsx` - Shadcn Button component with variants (ghost, outline, secondary, etc.)
- Created `components/ui/background-paths.tsx` - Animated SVG paths background effect
  - **FloatingPaths component:** Generates 36 animated SVG paths with continuous motion
  - **BackgroundPathsEffect:** Subtle background version for layering behind content
  - **BackgroundPaths:** Full hero version with animated letter-by-letter title (available for future use)
  - Adapted colors to orci-cyan brand (`#00d1ff` instead of slate)
  - Reduced opacity (8-15%) for subtlety and readability
  - Smooth infinite animations creating flowing motion effect
  - RTL-compatible with Hebrew content
- Integrated into home page hero section:
  - Added `BackgroundPathsEffect` behind existing hero content
  - Hero content layered with `z-10` to sit above animated paths
  - Maintains cap4learning clean design while adding depth
- Build successful (16/16 pages)
- Commit: c4965ce

**Technical Notes:**
- Framer Motion used for path animations (pathLength, opacity, pathOffset)
- SVG preserveAspectRatio set to "xMidYMid slice" for responsive scaling
- Animations staggered with random durations (20-30s) for organic feel
- Pointer events disabled on background layer to ensure content remains interactive

**Full-Page Background Animation & Visibility Fixes:**
- Extended background animation from hero-only to entire page:
  - Moved `BackgroundPathsEffect` from hero section to page-level wrapper
  - Changed to `fixed inset-0` positioning to cover entire viewport
  - Animation now stays visible as user scrolls through all sections
  - Commit: 0037f44

**Visibility Issue Resolution (Iterative Improvements):**
- **Problem:** Animation was initially invisible due to solid section backgrounds covering it
- **Fix 1:** Made section backgrounds semi-transparent (commit: fdffe6e)
  - `.cap-section-teal`: solid #d2e6e4 → rgba(210, 230, 228, 0.92)
  - `.cap-section-white`: solid white → rgba(255, 255, 255, 0.92)
  - Increased path opacity: strokeOpacity 0.08-0.6 → 0.15-0.87
  - Increased animation opacity: [0.2, 0.5, 0.2] → [0.4, 0.8, 0.4]

- **Problem:** Animation still too faint, barely visible
- **Fix 2:** Significantly enhanced visibility (commit: 70ae7ac)
  - Doubled stroke width: 0.5-1.55px → 1.0-3.16px
  - Further increased opacity: strokeOpacity 0.15-0.87 → 0.25-1.15 (reaches 100%)
  - Boosted animation opacity: [0.4, 0.8, 0.4] → [0.6, 1.0, 0.6]
  - Initial opacity: 0.6 → 0.8

**Final Result:**
- Animated orci-cyan paths flow continuously across entire page
- Clearly visible with thicker strokes and higher opacity
- Maintains cap4learning clean aesthetic while adding dynamic motion
- Fixed positioning keeps animation consistent during scroll


### Session 2026-02-06 (continued) - Major Home Page Redesign

**Interactive Bento Gallery on Home Page:**
- Added `InteractiveBentoGallery` component to home page "המדריכים המובילים שלנו" section
- Replaced static card grid with interactive draggable bento gallery (same as guides page)
- 5 guide items with images from `public/guides/`, each linking to their guide page
- Commit: ccf436e

**DailyPulse News Cards Redesign:**
- Rewrote `components/news/DailyPulse.tsx` from single text block to 3-card grid layout
- Created `parseNewsItems()` function to split summary by `•` and extract title/content/orciTake
- Each card has: numbered badge, title, content, "💡 הזווית של Orci" section, source links
- Sources distributed across cards via `getSourcesForCard(index)`
- Staggered Framer Motion entrance animations (delay: index * 0.15)
- Loading skeleton shows 3 placeholder cards matching grid layout
- Commit: f50bbda

**Highlighter Hero Section:**
- Created `components/ui/highlighter.tsx` with 3 exports:
  - `useMousePosition` hook tracking mouse coordinates
  - `HighlightGroup` - container setting CSS custom properties (--mouse-x/--mouse-y) on children
  - `HighlighterItem` - child with mouse-tracking cyan glow effect (`before:bg-orci-cyan`)
  - `Particles` - canvas-based particle system (default color `#00d1ff`, quantity 200)
- Created `HeroSection` component in `app/page.tsx`:
  - Animated pointer (orci-cyan SVG cursor + "Orci" label) cycling between 4 Hebrew labels
  - Labels: יצירת תוכן AI, אוטומציות חכמות, שיווק דיגיטלי, וידאו ויראלי
  - `useAnimate` from framer-motion for infinite pointer animation sequence
  - Center Sparkles icon, particle background, mouse-tracking glow
  - CTA buttons: WhatsApp "בואו נדבר" + "למדריכים"
- Replaced old colored blocks hero with new interactive HeroSection
- Commit: 5487f07

**Orbiting Skills Section:**
- Created `components/ui/orbiting-skills.tsx`:
  - 6 AI service icons on two orbital rings using requestAnimationFrame
  - Inner orbit (radius 100): PenTool (יצירת תוכן AI), Zap (אוטומציות חכמות), TrendingUp (שיווק דיגיטלי)
  - Outer orbit (radius 175): Users (ניהול רשתות חברתיות), Brain (ייעוץ AI לעסקים), Video (וידאו ויראלי)
  - White icon backgrounds with orci-cyan borders/glows
  - Hover: icon scales up, tooltip shows Hebrew service name
  - Pause on container hover
  - Orbit paths with pulsing glow animation
- Replaced scattered badges section in home page
- Commit: 189a047

**Orbiting Skills Mobile Fix:**
- **Problem:** Orbit radii (100px/175px) overflow on small mobile screens (375px phone container ~335px, but outer orbit extends 199px from center)
- **Solution:** Dynamic responsive scaling system:
  - Added `containerRef` to measure actual container width
  - `scale = containerSize / BASE_SIZE` where `BASE_SIZE = 420`
  - All orbit radii multiply by scale: `scaledRadius = orbitRadius * scale`
  - Icon sizes scale with minimum floor: `scaledSize = Math.round(size * Math.max(scale, 0.7))`
  - Orbit path circles also scale via `orbitConfigs` array
  - Container changed to `w-full max-w-[420px] aspect-square`
  - `ResizeObserver` pattern via resize event listener for responsive updates
- Result: Orbiting skills now fit perfectly on any screen size

**Home Page Structure (Final — updated 2026-04-29):**
```
BackgroundPathsEffect (fixed, full-page)
└── HeroSection (Highlighter + Particles + animated pointer)
└── InteractiveBentoGallery (featured guides, static bento grid)
└── ContentTabs:
│   ├── מדריכים tab → TutorialGrid
│   ├── עדכון שבועי tab → WeeklyPreview (4 hot items + link to /weekly)  ← WAS: DailyPulse
│   └── יוטיוב tab → YouTubeSection
└── ContainerScroll (YouTube channel showcase)
└── OrbitingSkills (6 AI services on orbital rings)
└── Statistics (text stats section)
└── Newsletter/CTA (dark card)
└── Footer
```

**New Components Summary:**
| Component | File | Purpose |
|-----------|------|---------|
| InteractiveBentoGallery | `components/ui/interactive-bento-gallery.tsx` | Static bento grid with direct guide navigation |
| HighlightGroup/Item | `components/ui/highlighter.tsx` | Mouse-tracking glow container |
| Particles | `components/ui/highlighter.tsx` | Canvas-based particle effect |
| OrbitingSkills | `components/ui/orbiting-skills.tsx` | Animated orbital service icons |


### Session 2026-02-07

**Orbiting Skills Mobile Fix (continued):**
- Fixed mobile jitter: removed `transition-all duration-300` from orbiting icon wrapper (fought against requestAnimationFrame)
- Added `MobileServiceCard` component for static 2-column grid on mobile (<640px)
- Added `willChange: 'transform'` for GPU acceleration

**Stats Carousel (Added then Removed):**
- Created `components/ui/carousel.tsx` (shadcn embla-carousel) and `components/ui/stats-carousel.tsx`
- Installed `embla-carousel-react` and `embla-carousel-auto-scroll`
- Fixed mobile issues: `stopOnInteraction: false, watchDrag: false`
- Changed mobile basis from `1/2` to `1/3`
- **Removed from home page** after user reported it broke the page (file still exists but not imported)

**Newsletter / Mailchimp Integration:**
- Created `components/ui/newsletter.tsx` - email signup form with loading/success/error states
- Created `app/api/subscribe/route.ts` - POST endpoint for Mailchimp API
- Dark gradient card with mail icon, orci-cyan accents, Hebrew UI
- Env vars: `MAILCHIMP_API_KEY`, `MAILCHIMP_AUDIENCE_ID`, `MAILCHIMP_SERVER_PREFIX`
- **Important:** Vercel env vars must be set at **Project level**, not Team level (Team-level vars don't inject into serverless functions)
- Added debug logging for missing env vars
- Replaced old CTA section in home page with Newsletter component

**AI-Generated Guide Cover Images:**
- Generated 5 cover images using Nano Banana Pro AI
- Saved with clean filenames in `public/guides/`:
  - `guide-talking-objects.png` - Pixar fork in restaurant (Guide 1: חפצים מדברים)
  - `guide-ai-influencer.png` - Woman with phone (Guide 2: משפיענית AI)
  - `guide-penguin-viral.png` - Penguins with Israeli flag (Guide 3: פינגווין ויראלי)
  - `guide-floating-trend.png` - Man levitating in sunset (Guide 4: טרנד הריחוף)
  - `guide-abandoned-figures.png` - Creepy doll in tunnel (Guide 5: דמיות נטושות)
- Updated image references in both `app/page.tsx` and `app/guides/page.tsx`
- Original images preserved for use inside guide articles (step-by-step screenshots)
- Commit: 2a17669

**Home Page Structure (Current):**
```
BackgroundPathsEffect (fixed, full-page)
└── HeroSection (Highlighter + Particles + animated pointer)
└── InteractiveBentoGallery (static grid, direct navigation to guides)
└── DailyPulse (3-card AI news grid)
└── ContainerScroll (YouTube channel showcase - 25M views, 130K subs)
└── OrbitingSkills (6 AI services on orbital rings / mobile grid)
└── Newsletter (Mailchimp email signup - dark gradient card)
└── Footer
```

**Comprehensive Site Audit Completed:**
Full audit covering Technical Debt, UI/UX, Conversion/Trust, and Content Strategy.

**Essential items to implement next session:**
1. Remove `'use client'` from static pages (products, contact, portfolio, about) + add metadata
2. Fix viewport metadata deprecation warning
3. Hide Dock on desktop (`lg:hidden`) + add bottom padding for dock overlap
4. Add Course Waitlist section (for Feb 2026 course launch)
5. Add Testimonials section (trust signals)
6. Fix inconsistent 2.4M stats in about/portfolio pages
7. Replace Unsplash stock image in about page with real content
8. Create AI Prompt Library page (/prompts)

**Enhancement items for later:**
- Framer Motion animations for inner pages
- GuidesLayout template + categories/difficulty levels
- Daily Pulse sharing buttons + weekly archive
- FAQ Accordion component
- CTASection component to reduce duplication
- Background animation prefers-reduced-motion support
- Before & After gallery
- AI Tool of the Week feature


### Session 2026-03-10

**Car Miniature Guide Completion:**
- Filled in car miniature guide (`app/guides/car-miniature/page.mdx`) with real content:
  - **Step 1:** Added `car-1.png` and `car-2.png` side by side (filming process)
  - **Step 2:** Added `mini-car.png` and `car-2.png` with CopyPrompt: "replace the tiny green dinosaur in image 1 to a tiny model of chevrolet cruze 2014 like in image 2"
  - **Step 3:** Added `car-1.png` (labeled "פריים ראשון") and `mini-car.png` (labeled "פריים אחרון") with CopyPrompt: "cars fold into a tiny model car"
  - **Step 4:** Embedded YouTube video (https://www.youtube.com/shorts/dU6vFcGjKRs) as final result
- All 3 images copied to `public/guides/car-miniature/`
- Commit: b9fae45

**Car Miniature Cover Image:**
- Replaced placeholder cover image with real cover: `guide-car-miniature.png`
- Updated references in both `app/page.tsx` and `app/guides/page.tsx`
- Commit: 022a042

**Static Bento Gallery Refactor:**
- **Problem:** User wanted non-draggable guides, direct navigation on click (no modal)
- **Solution:** Completely rewrote `components/ui/interactive-bento-gallery.tsx`:
  - Removed all drag-related code (drag props, isDragging state, onDragStart/End handlers)
  - Removed modal system (GalleryModal component, Dock, selectedItem state)
  - Removed AnimatePresence modal switching
  - Changed click behavior: items now wrapped in `<Link>` for direct navigation to guide page
  - Kept bento grid layout, hover animations, and stagger entrance
- Updated description text on both pages: "גררו וחקרו..." → "לחצו על מדריך כדי לקרוא עוד"
- Component reduced from 242 lines to ~100 lines
- Commit: 1eb27f4

**Bento Gallery Layout Fix:**
- **Problem:** Images not showing after Link wrapper added - `span` classes on wrong element
- **Root cause:** When wrapping in `<Link>`, the grid child is the Link, but `motion.div` inside had the span classes and no explicit height for `Image fill`
- **Solution:**
  - Used dynamic wrapper pattern: `const Wrapper = item.href ? Link : 'div'`
  - Grid span classes (`item.span`) moved to wrapper (the actual grid child)
  - Inner `motion.div` changed to `w-full h-full` to fill wrapper
  - Wrapper gets `block` class to ensure proper sizing
- Images now display correctly, clicking navigates directly to guide
- Commit: b549335

**New Component Behavior:**
| Before | After |
|--------|-------|
| Drag items to reorder | Static grid, no dragging |
| Click opens modal with image | Click navigates to guide page |
| Modal has Dock navigation | No modal at all |
| "גררו וחקרו..." description | "לחצו על מדריך..." description |


### Session 2026-03-13

**Guide Builder Skill:**
- New skill added: `/guide-builder` (trigger: "בנה מדריך", "build a guide", or paste a video script)
- Interactive flow: extracts title/tools/steps/prompts from script → confirms with user → asks for images step by step → creates MDX + updates guides.ts
- Skill file: `C:\Users\0rr Shemer\.claude\skills\guide-builder\`

**Cinematic Lighting Guide (built with /guide-builder):**
- `app/guides/cinematic-lighting/page.mdx`
- Tools: Nano Banana Pro (Gemini) + Kling Motion
- Images: `image.png` (filming), `lighting-1/2/3.png` (reference examples side by side), `result-1/2/3` (before/after side by side)
- Long Gemini prompt wrapped in expandable `<details>` block
- Cover: `public/guides/guide-cinematic-lighting.png`
- `data/guides.ts` entry: free: true, isNew: true, category: יצירת תוכן

**Game World Guide:**
- `app/guides/game-world/page.mdx` (built previous session, first pushed this session)
- Cover image required multiple fixes: `/guides/Cover.png` → `/guides/game-world/CoverWorld.png` → `/guides/guide-game-world.png`

**⚠️ Critical Convention — Guide Cover Images:**
- ✅ Correct: `public/guides/guide-[slug].png` (at root of `public/guides/`)
- ❌ Wrong: `public/guides/[slug]/image.png` (in subfolder) — causes Next.js Image **400 error**
- All guide covers must follow the `guide-[slug].png` naming pattern at root level

---

### Session 2026-03-25

**3D Product AR Guide (built with /guide-builder):**
- `app/guides/3d-product/page.mdx` — אפקט AR תלת מימד על מוצר ב-60 שניות
- Tools: Higgsfield NanoBananaPro + Kling 3.0 Omni + Kling Edit
- 3 prompts extracted: Higgsfield AR overlay, Kling animation transition, Kling Edit tracking
- Images: `public/guides/3d-product/` — original.jpg + 4 result images (jordan, cream, perfume, dumbbell)
- Cover: `public/guides/guide-3d-product.png` (latest Higgsfield result image)
- `data/guides.ts` entry: free: true, isNew: true, category: שיווק דיגיטלי
- YouTube: https://www.youtube.com/shorts/vnj6utNTjE0

**Services/Packages Page:**
- Rewrote `app/products/page.tsx` with 3-tier pricing: Starter, Growth, Full Stack (coming soon)
- No prices shown — CTA leads to Instagram DM
- Full Stack card greyed out with "בקרוב" badge
- FAQ section with 3 questions
- Trust line: "כל החבילות כוללות ליווי אישי, תמיכה שוטפת, ותוצאות מדידות"

**Navigation Cleanup:**
- Removed contact page link from desktop nav and mobile dock
- Removed `Phone` icon import (no longer needed)
- Dock now: בית, מדריכים, שירותים, עבודות, וואטסאפ (5 items)

**Full SEO Audit (score: 41/100):**
- Crawled 7 pages via WebFetch
- Reports saved: `FULL-AUDIT-REPORT.md` + `ACTION-PLAN.md`
- Critical issues found: no robots.txt, no sitemap, identical titles on 4 pages, no OG tags, no structured data

**SEO Critical Fixes (score → ~58/100):**
- `public/robots.txt` — with AI crawler permissions (GPTBot, ClaudeBot, PerplexityBot)
- `public/sitemap.xml` — 13 pages listed
- `public/llms.txt` — AI search readiness (Perplexity, ChatGPT)
- `app/guides/layout.tsx` — unique metadata + OG for guides
- `app/products/layout.tsx` — unique metadata + OG for products
- `app/portfolio/layout.tsx` — unique metadata + OG for portfolio
- `app/layout.tsx` — Open Graph + Twitter Cards + canonical added
- **Why nested layouts:** guides/products/portfolio are `'use client'` so can't export metadata directly — solved with layout.tsx wrapper per folder

**OG Image:**
- Created `public/og-image.png` — 1200×630px landscape, "Orci AI / מדריכי AI בעברית" with cyan HUD aesthetic
- Connected to layout.tsx og:image + twitter:image
- **Issue:** 1.25MB was too large — WhatsApp timed out and showed Vercel logo instead
- **Fix:** Compressed with sharp (built-in to Next.js) from 1.25MB → 355KB
- WhatsApp now shows image correctly when sharing links

**⚠️ OG Image lesson:**
- WhatsApp has a timeout for loading preview images — keep og-image under 500KB
- Use `node -e "require('sharp')('public/og-image.png').resize(1200,630).png({quality:85,compressionLevel:9}).toFile('public/og-image-new.png')"` to compress
- WhatsApp caches links — test with `?v=N` suffix to force re-scrape

**SEO Next Steps (from ACTION-PLAN.md):**
- HowTo Schema JSON-LD on guide pages (Rich Results in Google)
- Rename /new-guide → /floating-trend, /new-guide-2 → /abandoned-figures
- Add testimonials for E-E-A-T signals
- Add update dates on guide articles

---

### Session 2026-04-12

**iPhone Notification Animation (Remotion):**
- Created standalone Remotion project at `C:\Users\0rr Shemer\Documents\iphone-notification`
- Component: `src/Notification.tsx` — iPhone-style "אין קליטה" banner with spring animation
- Transparent background (ProRes 4444 with alpha channel)
- Animation: slides in from top, holds 3s, slides out — total 5s at 30fps
- Render command: `npm run render` → outputs `out/notification.mov` (ProRes .mov, transparent)
- Render command full: `npx remotion render src/index.ts IPhoneNotification out/notification.mov --image-format=png --pixel-format=yuva444p10le --codec=prores --prores-profile=4444`
- **Note:** Remotion downloads Chrome Headless Shell on first render (~107MB), subsequent renders are faster
- **Note:** Disk must have ~500MB free for Remotion + Chrome install

**First-Time Visitor Onboarding Modal:**
- New component: `components/ui/onboarding-modal.tsx`
- Mounted in `app/page.tsx` — self-manages visibility via localStorage
- localStorage key: `'orci-onboarded'` (separate from `'orci-content-unlocked'`)
- 3-step flow:
  1. Welcome — stats (130K subs, 25M views), brand intro
  2. Guide showcase — scrollable grid of all 10 guides, lock icon on non-free, banner explaining locked = email only
  3. CTA — "קח אותי למדריכים" + WhatsApp + packages teaser (Starter/Growth) linking to /products
- Appears 0.8s after first page load, ESC to dismiss
- Portal-rendered, Framer Motion spring animations, z-index 9999

**GuideGuard — Email Gate Enforcement:**
- Problem: locked guides (`free: false`) were accessible via direct URL from any entry point
- Solution: `components/ui/guide-guard.tsx` — client component that wraps all guide pages via `app/guides/layout.tsx`
- Logic: reads `usePathname()` → finds guide in GUIDES array → if `free: false` AND `!isContentUnlocked()` → shows blur overlay + email form
- Email gate inline (no separate modal needed) — submits to `/api/subscribe`, sets localStorage on success, fires `'orci-unlocked'` event
- Free guides and unlocked users: zero impact, renders children directly
- Works regardless of entry path (direct URL, onboarding modal, Google, etc.)

**⚠️ package.json incident:**
- Running `npm init -y` in the wrong directory accidentally added `"type": "commonjs"` to orci-ai-site's package.json
- This broke the Next.js build (44 errors — ESM/CJS conflict)
- Fix: `git checkout package.json` to restore
- Prevention: always run `npm init` with `--prefix` or `cd` to the correct directory first

---

### Session 2026-04-29

**Weekly AI Dashboard — מחליף את DailyPulse:**

**הבעיה:** DailyPulse הישן הציג 3 כרטיסיות טקסט בלבד, מתעדכן יומית, ולא נותן תמונה שלמה של מה שקורה בעולם ה-AI.

**הפתרון:** דשבורד שבועי מלא עם:
- כרטיסיות עם תמונות
- סינון לפי קטגוריה
- modal עם פרטים מלאים + "הזווית של Orci" + שתף בווטסאפ
- תהליך עדכון היברידי: AI מייצר טיוטה → אורצי עורך → git push

**קבצים שנוצרו:**
- `data/weekly-dashboard.json` — מבנה נתונים עם 12 פריטי דמו לשבוע 18, אפריל–מאי 2026
- `scripts/generate-weekly.mjs` — סקריפט Node שמושך RSS מ-5 מקורות, מסכם ב-GPT-4o-mini לעברית, שולף OG images, ומוציא JSON
- `components/ui/weekly-card.tsx` — כרטיס עם תמונה, badge קטגוריה (5 צבעים), badge חם/חדש, hover cyan glow
- `components/ui/weekly-modal.tsx` — מודאל Framer Motion עם תמונה גדולה, details, orciTake, קישור למקור, שתף בווטסאפ
- `components/ui/weekly-dashboard.tsx` — client component עם filter tabs, grid חם/שאר, ניהול selectedItem
- `app/weekly/page.tsx` — Server Component עם metadata, מייבא JSON ב-build time (static)

**קבצים שעודכנו:**
- `types/index.ts` — נוספו `WeeklyItem` ו-`WeeklyDashboardData` interfaces
- `app/page.tsx` — הוסרה `DailyPulse`, tab "חדשות AI" שונה ל-"עדכון שבועי" עם תצוגת 4 פריטים חמים + קישור ל-`/weekly`
- `components/layout/Navigation.tsx` — נוסף "עדכון שבועי" בניווט desktop (עם badge "חדש") ו-dock מובייל
- `package.json` — נוסף `"generate-weekly": "node scripts/generate-weekly.mjs"`

**מבנה הדשבורד:**
- 5 קטגוריות עם צבעים: כלים חדשים (ציאן), עדכוני גרסה (סגול), חדשות גדולות (אדום), טרנדים (כתום), מחקר (ירוק)
- פריטים `isHot: true` מופיעים בשורה ראשונה עם גריד גדול יותר
- פריטים רגילים: 4 עמודות desktop / 2 tablet / 1 mobile
- modal: `fixed inset`, scroll פנימי, ESC/click-outside לסגירה

**Data schema כל פריט:**
```typescript
{
  id, title, category, emoji, image,
  summary,    // 2 משפטות — מוצג על הכרטיס
  details,    // פסקה מפורטת — מוצגת במודאל
  orciTake,   // הזווית של Orci — במודאל
  link, source, isHot, isNew
}
```

**Build:** עבר ✅ — `/weekly` מסומן כ-Static prerendered (קורא JSON ב-build time).

**⚠️ חשוב לגבי תמונות בדשבורד:**
- ה-JSON יכול להכיל כל URL תמונה — Unsplash, OG images מאתרים, או URLs ישירים
- `<Image unoptimized>` משמש כי URLs חיצוניים לא מוגדרים ב-next.config domains
- אם תמונה נכשלת — הכרטיס מציג emoji על רקע gradient כ-fallback

**תהליך עדכון שבועי:**
```bash
OPENAI_API_KEY=sk-... npm run generate-weekly
# עורך data/weekly-dashboard.json
# git commit -m "עדכון שבועי — שבוע X"
# git push → Vercel deploy אוטומטי
```

---

### Session 2026-05-13

**Fan Cam Trend Guide (built with /guide-builder):**
- `app/guides/fan-cam-trend/page.mdx` — טרנד מצלמת המשחק הוויראלי
- Tools: GPT Image 2 + Seedance 2.0 + Gemini/Claude
- `data/guides.ts` entry: popular: true, isNew: true, free: false, category: וידאו ויראלי

**מבנה המדריך:**
- **שלב 1 — GPT Image 2:** 2 דוגמאות ישראליות (דני ולאמין, אורן להב) side by side עם פרומפטים ותוצאות
- **4 פורמטים בינלאומיים:** MLB, NFL, F1, Premier League — כל אחד עם תיאור קצר + פרומפט מלא מתקפל
- **Women1 + Women2 side by side** — דוגמאות לתוצאה עם הפורמטים הבינלאומיים
- **טיפ זהב:** שימוש ב-Gemini/Claude לכוונון הפרומפט
- **שלב 2 — Seedance 2.0:** לכל דוגמא — תמונת הקלט לצד פרומפט האנימציה (grid 2 עמודות)

**תמונות:**
- `public/guides/fan-cam-trend/result-danny.png` ← Desktop\Asset\result_9x16.png
- `public/guides/fan-cam-trend/result-oren.png` ← Desktop\Asset\oren_blonde_result.png
- `public/guides/fan-cam-trend/result-women1.png` ← Downloads\Women1.png
- `public/guides/fan-cam-trend/result-women2.png` ← Downloads\Women2.png
- `public/guides/guide-fan-cam-trend.png` ← D:\AI\Instagram\GameBreakAs\hf_20260512_...png (כריכה)

**כל הפרומפטים** — ארוכים, עטופים ב-`<details>` expandable. תמונות ופרומפטים side by side ב-grid `md:grid-cols-2`.

---

### Session 2026-05-13 (המשך) — Fan Cam Guide Upgrade

**שדרוג מדריך fan-cam-trend לשתי וריאציות:**

**שינויים:**
- `app/guides/fan-cam-trend/page.mdx` → נמחק
- `app/guides/fan-cam-trend/page.tsx` — Server Component עם metadata, מייבא FanCamTabs
- `app/guides/fan-cam-trend/FanCamTabs.tsx` — Client Component עם tab state: מתחילים / מתקדמים

**טאב מתחילים (חדש):**
- שלב 1: Nano Banana 2 — העלאת תמונת סצנה (result_9x16.png) + תמונת פנים (face-example.jpg) עם פרומפט להחלפת אדם שמאלי
- שלב 2: Seedance 2.0 — אנימציית עוגה בפרצוף על result-beginner.png
- וידאו מוטמע: `trend_video.mp4` (HTML5 `<video>` tag)

**טאב מתקדמים (קיים, עם ניקוי):**
- הוסרו שורות subtitle descriptions מ-4 כרטיסי הליגות הבינלאומיות (MLB/NFL/F1/Premier League)

**תמונות/קבצים שנוספו ל-`public/guides/fan-cam-trend/`:**
- `result_9x16.png` — תמונת הסצנה (דני+לאמין, 6.9MB)
- `face-example.jpg` — תמונת פנים לדוגמה (1.8MB)
- `result-beginner.png` — תוצאת Nano Banana 2 (7.4MB)
- `trend_video.mp4` — וידאו תוצאה סופית (3.8MB)

**⚠️ Pattern חשוב — MDX עם state:**
- כשדף MDX צריך React state (טאבים, toggle וכו') → ממירים ל-TSX עם ארכיטקטורה:
  - `page.tsx` = Server Component עם `export const metadata`
  - `ComponentName.tsx` = `'use client'` עם כל הלוגיקה והתוכן
- לא לנסות להכניס `useState` ישירות ב-MDX

---

### Session 2026-06-10

**מדריך חדש — Best AI Tools:**
- `app/guides/best-ai-tools/page.mdx` — דירגתי את כלי ה-AI שלי
- 5 סקשנים: Claude (יצירת תוכן), Claude Code/Codex (קוד), Perplexity (מחקר), Higgsfield (וידאו), Loveable+Base44 (אתרים)
- 3 תמונות דוגמה של Claude (example-1/2/3.png) + תמונות כלים מ-`D:\AI\Instagram\BestWorst\`
- `data/guides.ts` entry: free: false, isNew: true, category: יצירת תוכן

**עדכון CTA — כל המדריכים:**
- 19 קבצי MDX/TSX עודכנו בבת אחת עם PowerShell bulk replace
- "רוצים את כל הפרומפטים?" → "רוצים להישאר מעודכנים?"
- כפתור וואטסאפ אישי → קבוצת וואטסאפ: `https://chat.whatsapp.com/FWfA1JK4NQ93apZAFNOB3n?s=cl&p=i&ilr=0`
- "בואו נדבר בוואטסאפ" → "הצטרפו לקבוצה"

**ניקוי ניווט + מחיקת עמודים:**
- `Navigation.tsx` — הוסרו: dropdown ממדריכים, לינקי שירותים + עבודות
- `app/products/` ו-`app/portfolio/` — **נמחקו לגמרי**
- Dock מובייל: נשארו בית, מדריכים, וואטסאפ

**דף הבית — ניקוי:**
- הוסרו: `ContentTabs`, `YouTubeSection`, `YT_VIDEOS`, `TABS`, imports של `Youtube/TrendingUp/ExternalLink/BookOpen`
- הוחלפו ב-`GuidesSection` — רנדור ישיר של TutorialGrid ללא טאבים

**Footer — פישוט:**
- 3 עמודות: Brand | קישורים מהירים | יצירת קשר
- הוסרו: שירותים, עבודות, צור קשר
- נוספו: תנאי שימוש `/terms`, מדיניות פרטיות `/privacy`
- שנה מ-2025 ל-2026

**Accessibility Widget — `components/ui/accessibility-widget.tsx`:**
- כפתור צף `bottom-20 left-4` (אייקון נגישות)
- Panel עם 9 אפשרויות: גודל טקסט (80%-150%), ניגודיות גבוהה, היפוך צבעים, גווני אפור, גופן קריא, ריווח שורות, ריווח אותיות, הדגשת קישורים, הפחת אנימציות
- CSS classes בגלובלס: `a11y-high-contrast`, `a11y-invert`, `a11y-grayscale` וכו' על `html` element
- State נשמר ב-localStorage תחת `orci-a11y`
- מוזרק מ-`app/layout.tsx`

**עמודים משפטיים:**
- `app/terms/page.tsx` — 8 סעיפים, עיצוב dark מותאם לאתר
- `app/privacy/page.tsx` — 8 סעיפים, ללא מידע לא רלוונטי (טיקרים וכו')
- מייל יצירת קשר: `orciai45@gmail.com`
- שניהם נוספו ל-Footer + bottom bar

**Privacy Checkbox — כל 4 טפסי המייל:**
- `components/ui/newsletter.tsx` ✅
- `components/ui/guide-guard.tsx` ✅
- `app/page.tsx` → EmailSection ✅
- `components/ui/email-gate-modal.tsx` ✅
- Checkbox מחייב סימון לפני שניתן לשלוח, לינק ל-`/privacy`

**מחיקת סקשן "מדריכי וידאו":**
- הוסר מ-`app/guides/page.tsx`
- הוסרו imports: `VideoModal`, `GUIDE_VIDEOS`, `useState`

**⚠️ מייל הפרויקט:** `orciai45@gmail.com` (לא support@orciai.com)

---

### Session 2026-06-10 (המשך) — דף נחיתה "המוצרים שלנו" (/products)

**הקונספט:** דף נחיתה B2B למכירת שירותי יצירת פרסומות ותוכן סושיאל מבוסס AI לעסקים. עוצב בסגנון **מותג ORCIAI של האינסטגרם** (לא בסגנון האתר!) — בכוונה שונה משאר האתר כדי להתאים למי שמגיע מהסושיאל.

**פלטת ORCIAI (לדף הזה בלבד):**
- רקע: `#0D0D1A` | סגול חשמלי: `#534AB7` | מנטה: `#00FFD1`
- היררכיית טקסט בשקיפויות: לבן מלא / 65% / 40% (לא גווני אפור)
- קווי-שיער: `rgba(255,255,255,0.08)` במקום גבולות כבדים

**קבצים שנוצרו:**
- `app/products/page.tsx` — דף הנחיתה (client component, self-contained styling)
- `app/products/layout.tsx` — metadata + OG (pattern של layout-wrapper כי הדף 'use client')
- `app/api/lead/route.ts` — טופס לידים → Mailchimp עם merge fields (FNAME, PHONE) + tag `business-lead` + console.log כגיבוי ב-Vercel logs
- `public/products/` — cover-847k/297k/137k.png (נוצרו ב-Higgsfield nano_banana_2, כווצו ל-~0.5MB עם sharp) + logo-wave-adv.png + logo-pinookim.jpg

**מבנה הדף (10 סקשנים):**
Hero (כותרת ענקית clamp עד 116px) → קרוסלת כלים marquee → פס סטטיסטיקות → תוצאות ויראליות (3 קאברים עם badge צפיות → לינק לרילים) → סקשן הצהרה → שירותים (4 כרטיסים) → השוואה AI מול הפקה רגילה → לקוחות (Wave-Adv, Pinookim Sweet) → חבילת השקה 3+1 → טופס ליד + וואטסאפ → FAQ

**החלטות עסקיות (אחרי מחקר מתחרים):**
- **מחיר גלוי:** ₪4,000 מחוק → ₪2,250 לחבילת 3+1 (3 סרטונים + רביעי מתנה)
- נימוק: hd-media.ai (המתחרה המוביל) מציגים ₪3,450 ל-3 וריאציות — אנחנו מנצחים אותם במחיר וזה יתרון שצריך להראות. מחיר גלוי גם מסנן לידים לא רציניים
- וואטסאפ נשאר CTA משני בכל סקשן (עם הודעה prefilled על החבילה)
- סטטיסטיקות בלי מספרי הגיימינג (130K/25M הוסרו מהפס) — הוחלפו ב-"x10 זול מהפקה רגילה" ו-"100% AI"

**עקרונות עיצוב שנלמדו מ-hd-media.ai (חולצו מהקוד שלהם):**
- המערכת שלהם: bg `#07070a`, זהב `#FFB54C` יחיד, ink `#f6efe1` עם סולם שקיפויות, קווי-שיער `rgba(.09)`
- טיפוגרפיה ענקית מול מיקרו-תוויות mono — זה מה שעושה "פרימיום"
- מספור סקשנים עריכתי (01/, 02/...) במונו-פונט
- כפתורי גלולה (border-radius: 100px)
- מספרים/מחירים במונו-פונט

**ניווט:** "המוצרים שלנו" נוסף לדסקטופ + dock מובייל (אייקון Megaphone)

**לינקים לרילים בדף:**
- טרנד היציע (847K): instagram.com/p/DYPD4JRx3J2
- טרנד הפירות (297K): instagram.com/p/DYIItEFKx8A
- הפינגווין הישראלי (137K): instagram.com/p/DUS01xYilsL

**⚠️ לקוחות קיימים:** Wave-Adv + Pinookim Sweet (לוגואים ב-public/products/)
