# AGENTS.md — Website Design Language (Calm Studio)

---

## 5. The Web Designer (Brand Portal)
**Role:** Maintains the public-facing website at [artfulroots.co] — the company portal and product landing pages.
**Audience:** Parents of children ages 3–7 seeking calm, educationally-grounded tools.
**Tone:** Thoughtful, unhurried, honest. Like reading a well-edited independent magazine, not a SaaS landing page.

---

### Brand Identity

**Studio name:** Artful Roots Co.
**App names:** Clean Reader, Clean Math
**Tagline:** "Calm technology for children."
**Mission:** A studio building tools that respect a child's attention and intelligence.
**Pricing:** $4.99 one-time purchase per app. No subscriptions or IAPs.

**Voice principles:**
- Speak *to* parents, not *at* them
- Never use superlatives ("amazing", "revolutionary", "the best")
- Acknowledge the parent's concern about screens as real and legitimate
- Short, declarative sentences. Prefer active voice.

---

### Design System

#### Aesthetic Direction
**"Editorial Calm"** — Warm and typographically rich, like a considered independent press. Think *The School of Life* meets a Montessori material catalog. Not clinical, not playful, not startup-generic.

#### Color Palette
```css
--cream:             #FDFBF7   /* Page background — never pure white */
--cream-deep:        #F5F0E8   /* Section backgrounds, subtle surfaces */
--ink:               #2A2724   /* Primary text — never pure black */
--ink-muted:         #6B6560   /* Body copy */
--ink-faint:         #A09890   /* Labels, metadata, rules */
--terracotta:        #C4694A   /* Primary accent — CTAs, rules, highlights */
--terracotta-light:  #F0E0D8   /* Consonant tile backgrounds, soft tints */
--sage:              #5A7A5C   /* Success, "available" indicators */
--sage-light:        #DDE8D8   /* Sage backgrounds, badges */
--blue-montessori:   #3A6FA8   /* Vowel tiles (Montessori convention) */
--blue-light:        #D8E6F5   /* Vowel tile backgrounds */
--rule:      rgba(42,39,36,.12)/* All borders and dividers */
```

#### Typography
- **Display/headings:** `Lora` (Google Fonts, Serif) — weight 400/500/600; italic variants for warmth
- **Body/UI:** `DM Sans` (Google Fonts, Sans-serif) — weight 300/400/500
- **Never use:** Inter, Roboto, Arial, system fonts, or purple gradients

**Scale:**
| Role | Size | Weight | Font |
|------|------|--------|------|
| Hero H1 | clamp(2.4rem, 5vw, 4rem) | 500 | Lora |
| Section H2 | clamp(1.8rem, 3.5vw, 2.6rem) | 500 | Lora |
| Card H3 | 1.1–1.5rem | 500 | Lora |
| Body | 1rem | 400 | DM Sans |
| Small/label | 0.72–0.85rem | 500 | DM Sans |
| All-caps label | 0.72rem, tracking 0.14em | 500 | DM Sans |

#### Layout Rules
- Max content width: **1080px**, narrow sections: **680px**
- Section vertical padding: **7rem 0** (generous breathing room)
- All borders: `1px solid var(--rule)` — never heavier
- Border-radius: **2–4px** on cards and buttons (restrained, not pill-shaped)
- Primary grid: **2-column** on desktop; single column on mobile (≤768px).
- **Three-Tier Breakpoints**: 
    - Desktop: > 1024px
    - Tablet: 769px – 1024px (compact nav)
    - Phone: ≤ 768px (hamburger menu MANDATORY)
- **Side Padding**: Minimum `1.5rem` to `2rem` on all screens to prevent content from touching edges.
- No card drop shadows. Use borders and background-color shifts only.

#### Motion
- Page-load: Elements fade in on scroll via `IntersectionObserver` — `opacity: 0 → 1`, `translateY(20px → 0)`, duration `0.6s ease`
- Stagger delays: 0, 0.1s, 0.15s, 0.2s between related elements
- Hover states: `background` or `color` transitions at `0.2s` only
- **No bouncy, elastic, or chaotic animation — ever**

#### Texture
- A subtle paper grain overlay via SVG `feTurbulence` at low opacity — applied as a fixed `::before` pseudo-element on `body`
- This is the only decorative background effect permitted

---

### Page Structure

| Page / Section | Purpose | Notes |
|---------|---------|-------|
| **Global** `<nav>` | Fixed top bar | Logo · Nav links · Philosophy-first order |
| **index.html** | Brand Portal | Hero mission statement, philosophy teaser, product cards |
| **CleanReader.html** | Product Showcase | Terracotta hero + journey track + feature rows + CTA |
| **CleanMath.html** | Product Showcase | Same showcase pattern, 6-tool kit layout |
| **download-clean-reader.html**| Acquisition | Acquisition page for Clean Reader |
| **download-clean-math.html**| Acquisition | Acquisition page for Clean Math |
| **philosophy.html** | Manifesto | Brand-level commitments and pedagogical pillars |
| **worksheets.html**| Resources | Resource grid; uses `.hero-worksheets` |
| **privacy.html** | Terms | Brand-wide privacy policy; uses `.policy-header` |

---

### Component Conventions

**CTAs:**
- Primary on cream: `background: var(--terracotta)`, white text, 2px border-radius
- Primary on terracotta: `.btn-primary-light` — cream background, ink text, 3px radius
- Ghost: border-bottom only, no background
- Nav CTA: `border: 1.5px solid var(--ink)`, inverts on hover

**Labels (all-caps metadata):**
```html
<span class="label">Section Name · Detail</span>
```
Always precede section headings. Color: `var(--ink-faint)`.

**Section eyebrows:**
A 32px horizontal rule in `var(--terracotta)` + label text, used in the hero only.

**Product page showcase (CleanReader.html, CleanMath.html):**
The product pages follow a fixed section flow:

1. **`.product-hero`** — Full-width terracotta gradient (`linear-gradient(150deg, #a85839…#d4856b)`). Left: app icon + h1 + lead + CTA. Right: 3 staggered device frames (`.hero-device--left/center/right`) with rotation and z-index layering. On mobile, only center device shown.
2. **`.manifesto`** — Dark blockquote strip (existing pattern).
3. **`.journey-section`** — Horizontal connected flow (`.journey-track`) of step dots + connectors. Shows how modules form a progressive system. Goes vertical on mobile.
4. **`.feature-showcase-section`** — Alternating 2-col rows (`.feature-row` / `.feature-row.reversed`). Each pairs text (number + h3 + description) with a device-framed screenshot. Visual always shows first on mobile.
5. **`.privacy-strip`** — Dark centered strip with shield icon, h2, and copy.
6. **`.product-how-section`** — 3-col grid (`.product-how-grid`) on `--cream-deep`. Steps numbered 01/02/03 with title + description.
7. **`.trust-strip-section`** — Horizontal badge row (`.trust-badges`) with icon circles + labels.
8. **`.product-cta-section`** — Dark section with app icon, h2, copy, and store download buttons.
9. **Email signup** + **Footer** (shared components).

**Feature cards (legacy, used on older layouts):**
- Numbered `01–06` in Lora italic at top
- Icon circle (40px, colored background matching feature type)
- H3 + body copy
- Hover: `background: var(--cream-deep)`
- Arranged in a **3-column grid** separated by 1px `var(--rule)` lines

**Product showcase cards (index.html):**
- 2-column grid on desktop, 1 on mobile
- `aspect-ratio: 16/10` preview at top
- H3 + brand label + body copy + "Learn more" button
- Hover: `transform: translateY(-4px)`, shadow transition

**Composite worksheet visual (worksheets page):**
- Layered `SheetMockup.png` (base) and iPhone mockup (overlay).
- Uses `.worksheet-visual-group` for relative positioning and responsive scaling.
- Remains visible on all layouts to bridge the gap between physical and digital.

---

### Content Placeholders (Replace These)

| Placeholder | Location | What to replace with |
|-------------|----------|----------------------|
| "Download on iOS" link | Nav + hero CTA | App Store URL (Live) |
| "Get it on Android" link | Nav + hero CTA | Play Store URL (Live) |
| Screenshot × 3 | App section | Actual app screenshots |
| Email form action | Signup section | Mailchimp / Resend endpoint |
| `hello@calmstudio.app` | Footer | Real contact email |
| App Store badge | (add) | Official Apple App Store badge SVG |

---

### What This Site Must Never Do
- Use confetti, animations that celebrate actions
- Show a leaderboard, score counter, or progress bar
- Display cartoon characters or illustrated mascots
- Use purple gradients, neon accents, or dark-mode-first design
- Include pop-ups, interstitials, or cookie banners beyond what's legally required

---

### Deployment (Vercel)

**File structure:**
```
/
├── index.html          ← Single-page site
├── assets/
│   ├── fonts/          ← (optional, if self-hosting Google Fonts)
│   ├── screenshots/    ← App screenshots (9:16 ratio, PNG)
│   └── founder.jpg     ← Founder portrait (4:5 ratio)
└── vercel.json         ← (optional config)
```

**`vercel.json` (Required for SEO):**
Ensure `cleanUrls` is set to `true` and `trailingSlash` is set to `false` to maintain single-URL consistency.

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

---

### SEO Best Practices

To avoid duplicate content and ensure search engines index the correct pages:
- **Canonical Tags**: Every public-facing HTML file must have a `<link rel="canonical" href="https://artfulroots.co/[path]">` in the `<head>`.
- **URL Consistency**: Use non-www, HTTPS, and avoid `.html` extensions in internal links.

### Analytics
- **Google Analytics 4**: Every public-facing HTML file must include the GA4 tracking snippet (Measurement ID: `G-3XDSSCVQ25`) directly before the `</head>` closing tag.

**Deploy command:** `vercel --prod` or connect GitHub repo to Vercel for automatic deploys.

