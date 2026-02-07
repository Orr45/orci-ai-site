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
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Key Pages
- Home: http://localhost:3000
- Products: http://localhost:3000/products
- Guides: http://localhost:3000/guides

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

**Last Updated:** 2026-02-07
**Status:** ✅ AI-generated guide cover images, Mailchimp newsletter integration, comprehensive site audit completed
**Next Action:** Implement audit improvements (see Session 2026-02-07 audit report below)

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

**Home Page Structure (Final):**
```
BackgroundPathsEffect (fixed, full-page)
└── HeroSection (Highlighter + Particles + animated pointer)
└── InteractiveBentoGallery (featured guides, draggable bento grid)
└── DailyPulse (3-card AI news grid)
└── ContainerScroll (YouTube channel showcase)
└── OrbitingSkills (6 AI services on orbital rings)
└── Statistics (text stats section)
└── Newsletter/CTA (dark card)
└── Footer
```

**New Components Summary:**
| Component | File | Purpose |
|-----------|------|---------|
| InteractiveBentoGallery | `components/ui/interactive-bento-gallery.tsx` | Draggable image gallery with modal |
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
└── InteractiveBentoGallery (featured guides with AI cover images)
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
