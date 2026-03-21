# AGENTS.md — Website Design Language (Calm Studio)

---

## 5. The Web Designer (Marketing Site)
**Role:** Maintains the public-facing website at [calmstudio.app] — the company site and landing page for Clean Reader.
**Audience:** Parents of children ages 3–6 seeking calm, educationally-grounded screen time.
**Tone:** Thoughtful, unhurried, honest. Like reading a well-edited independent magazine, not a SaaS landing page.

---

### Brand Identity

**Studio name:** Calm Studio
**App name:** Clean Reader
**Tagline:** "Learning to read, without the noise."
**Mission:** A one-person studio building technology that earns a place in a child's hands.

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
- Primary grid: **2-column** on desktop; single column on mobile (≤768px)
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

### Page Structure (index.html)

| Section | Purpose | Notes |
|---------|---------|-------|
| `<nav>` | Fixed top bar | Logo · Nav links · iOS download CTA |
| `#hero` | First impression | H1, lead text, 2 CTAs, phone mockup |
| `.manifesto` | Founder voice | Dark background, large italic quote |
| `#about` | Founder story | Portrait placeholder + 3 paragraphs |
| `#app` | App features | Feature grid (6 cards) + 3 screenshot placeholders |
| `#philosophy` | 4 design pillars | Calm Tech commitments |
| `tech table` | Transparency | Stack table for parent trust |
| `.roadmap` | What's next | 4 phases listed plainly |
| `.signup` | Email capture | Dark section, minimal form |
| `footer` | Links | Privacy · Press Kit · Contact |

---

### Component Conventions

**CTAs:**
- Primary: `background: var(--terracotta)`, white text, 2px border-radius
- Ghost: border-bottom only, no background
- Nav CTA: `border: 1.5px solid var(--ink)`, inverts on hover

**Labels (all-caps metadata):**
```html
<span class="label">Section Name · Detail</span>
```
Always precede section headings. Color: `var(--ink-faint)`.

**Section eyebrows:**
A 32px horizontal rule in `var(--terracotta)` + label text, used in the hero only.

**Feature cards:**
- Numbered `01–06` in Lora italic at top
- Icon circle (40px, colored background matching feature type)
- H3 + body copy
- Hover: `background: var(--cream-deep)`
- Arranged in a **3-column grid** separated by 1px `var(--rule)` lines

**Screenshot placeholders:**
- `aspect-ratio: 9/16` frames
- `background: var(--cream-deep)`, `border: 1px solid var(--rule)`
- Inner dashed border for "replace me" affordance
- Caption below in `.label` style
- **Replace with actual screenshots when available**

**Phone device mockup (hero):**
- Dark frame (`var(--ink)`) with rounded corners
- Shows a live-rendered mini soundboard using real app colors
- Hides on mobile (`display: none` below 768px)

---

### Content Placeholders (Replace These)

| Placeholder | Location | What to replace with |
|-------------|----------|----------------------|
| Founder photo | `#about` | Square/portrait photo |
| "Download on iOS" link | Nav + hero CTA | App Store URL |
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
- Embed any third-party tracking scripts (Google Analytics, Meta Pixel, etc.) — if analytics are needed, use a privacy-first tool like Fathom or Plausible

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

**`vercel.json` (optional, for clean URLs):**
```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

**Deploy command:** `vercel --prod` or connect GitHub repo to Vercel for automatic deploys.

**Custom domain:** Set `calmstudio.app` (or your chosen domain) in Vercel project settings → Domains.
