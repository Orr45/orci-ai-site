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
│   └── BackgroundGradient.tsx
├── video/                # Video playback system
│   ├── VideoPlayer.tsx
│   ├── VideoModal.tsx
│   └── VideoGrid.tsx
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

**Last Updated:** 2025-01-31
**Status:** ✅ Core implementation complete, awaiting content
**Next Action:** User to provide header image, product features, and guide videos
