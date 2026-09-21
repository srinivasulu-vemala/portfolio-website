# Vemala Srinivasulu — Personal Portfolio Website

A production-ready, editorial engineering portfolio for **Vemala Srinivasulu** (Full Stack Developer, Trinity Mobility, Bengaluru). Built with modern **Angular 20**, zoneless change detection, signal APIs, SSG prerendering, and a bespoke design system titled **"Signal on Paper"**.

---

## 1. Architectural Foundation

- **Framework**: Angular 20.x with Standalone Components (no NgModules).
- **Reactivity & Change Detection**:
  - Zoneless architecture enabled via `provideZonelessChangeDetection()`.
  - `ChangeDetectionStrategy.OnPush` across all components.
  - Signal-based state management (`signal()`, `computed()`, `input()`, `output()`).
- **Control Flow**: Modern template control flow (`@if`, `@for` with `track`, `@switch`, `@defer`).
  - System diagrams and heavy viewport elements utilize `@defer (on viewport)`.
- **Rendering & Prerendering (SSG)**:
  - Full static site generation (SSG) via `@angular/ssr` prerendering.
  - All static routes (`/`, `/about`, `/not-found`, and all 5 `/work/:slug` case studies) are prerendered into static HTML files at build time (`dist/portfolio/browser`).
  - Deployable to any static host (Netlify, Vercel, AWS S3 + CloudFront, GitHub Pages) with zero runtime server dependency.
- **Routing**:
  - `withComponentInputBinding()` for direct route parameter injection.
  - `withViewTransitions()` for native smooth page transitions.
  - `withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })`.
- **Styling**: Handcrafted CSS with CSS Custom Properties, logical properties, 12-column asymmetric grid, and `:focus-visible` accessibility. Zero third-party UI libraries (no Tailwind, Bootstrap, or Material).
- **Typography & Self-Hosting**:
  - Display: *Instrument Serif* (400, italic).
  - Body / UI: *Inter* (400, 500, 600).
  - Technical Data & Metadata: *JetBrains Mono* (400, 500).
  - Preloaded woff2 files hosted locally under `/public/fonts/` with `font-display: swap` and zero external CDN dependencies.

---

## 2. Visual Identity — "Signal on Paper"

The visual aesthetic evokes an editorial engineering document:
- **Ground Palette**:
  - `--paper`: `#F6F4F0` (light) / `#121210` (dark)
  - `--paper-raised`: `#FFFFFF` (light) / `#1A1A17` (dark)
  - `--ink`: `#14140F` (light) / `#F2EFE9` (dark)
  - `--ink-2`: `#454540` (light) / `#B7B3AA` (dark)
  - `--ink-3`: `#7C7A73` (light) / `#86827A` (dark)
  - `--rule`: `#DFDAD1` (light) / `#2B2B26` (dark)
  - `--signal`: `#C1300B` (light) / `#FF6B3D` (dark)
  - `--signal-soft`: `#F2E3DC` (light) / `#2A1C16` (dark)
- **Rules**:
  - 1px hairline rules are the primary structural device instead of cards and shadows.
  - Accent budget is strictly capped below 5% of any viewport.
  - Corner radius: `2px` or `0px` (only the resume button uses `4px`).
  - No neon cyan themes, terminal mockups, tilted 3D cards, particle effects, or generic SaaS gradients.

---

## 3. Project Structure

```text
src/
├── app/
│   ├── core/                      # Singleton layout & utilities
│   │   ├── layout/
│   │   │   ├── header/            # Typographic mark, desktop/mobile overlay, theme toggle
│   │   │   └── footer/            # Colophon, copyright, back-to-top, theme toggle
│   │   ├── scroll-reveal.directive.ts # IntersectionObserver entrance directive
│   │   ├── seo.service.ts         # Route metadata, Open Graph, Twitter, JSON-LD
│   │   └── theme.service.ts       # Signal theme mode with localStorage persistence
│   ├── shared/                    # UI primitives
│   │   ├── copy-button/           # Clipboard button with aria-live polite feedback
│   │   ├── hairline-row/          # Structural 1px rule containers
│   │   ├── mono-label/            # JetBrains Mono metadata labels & indices
│   │   ├── section-heading/       # Eyebrow + editorial title
│   │   ├── spec-table/            # Case study specification definition list
│   │   ├── system-diagram/        # Generic responsive SVG architecture diagram
│   │   └── tech-list/             # Monospace technology tags
│   ├── features/                  # Lazy-loaded page components
│   │   ├── home/                  # Hero, Selected Work, Practice, Background, Contact
│   │   ├── work/                  # Case study detail page (/work/:slug)
│   │   ├── about/                 # Narrative, Education table, Certification
│   │   └── not-found/             # In-voice 404 handler
│   ├── data/                      # Strictly typed factual data layer
│   │   ├── models.ts              # TypeScript domain models
│   │   ├── profile.data.ts        # Vemala Srinivasulu profile
│   │   ├── experience.data.ts     # Trinity Mobility work experience
│   │   ├── projects.data.ts       # 5 production projects & specs
│   │   ├── skills.data.ts         # Skills grouped into 5 domains + capabilities
│   │   ├── education.data.ts      # SVCE Tirupati, Intermediate, SSC, GenAI Cert
│   │   └── content.service.ts     # Injectable signal store
│   ├── app.config.ts              # Zoneless, view transitions, input binding
│   ├── app.config.server.ts       # Server config
│   ├── app.routes.ts              # Route definitions
│   ├── app.routes.server.ts       # Prerender routes with getPrerenderParams
│   └── app.ts                     # Root shell component
├── styles/
│   ├── tokens.css                 # Color tokens, spacing, radius, transitions
│   ├── typography.css             # Fluid clamp type scale & @font-face rules
│   ├── reset.css                  # Modern CSS reset & focus-visible styles
│   └── utilities.css              # 12-column grid, hairlines, skip link
public/
├── fonts/                         # Local self-hosted Instrument Serif, Inter, JetBrains Mono
├── Vemala-Srinivasulu-Resume.pdf  # Static PDF resume generated from factual corpus
├── favicon.svg                    # Vector SVG favicon with typographic mark
├── apple-touch-icon.png           # 180x180 PNG touch icon
├── og-image.svg & og-image.png    # 1200x630 Open Graph preview image
├── robots.txt                     # Crawler directives
└── sitemap.xml                    # Prerendered route sitemap
scripts/
├── generate-resume.js             # Node script to build Vemala-Srinivasulu-Resume.pdf
└── generate-og-image.js           # Node script to build og-image.png and touch icon
```

---

## 4. Content Layer Workflow (Adding / Editing a Project)

All content is decoupled from UI components and resides in `src/app/data/`:

To add or update a project, simply edit `src/app/data/projects.data.ts` and provide a typed `Project` object:

```typescript
{
  slug: 'new-project-slug',
  name: 'Project Title',
  subtitle: 'One-line role-accurate descriptor',
  domain: 'Infrastructure & Real-Time Systems',
  deployments: ['State Dispatch Center'],
  organisation: 'Trinity Mobility',
  roleLine: 'Backend Services & REST APIs',
  period: '2024 – Present',
  stack: ['Java', 'Spring Boot', 'SQL Server', 'REST APIs'],
  summary: 'One paragraph factual overview.',
  systemDescription: [
    'Paragraph 1 describing the platform and operational context.',
    'Paragraph 2 describing mission-critical constraints.'
  ],
  contributionGroups: [
    {
      title: 'Backend Services',
      points: [
        'Developed and maintained REST APIs for core incident handling.',
        'Wrote and optimized SQL Server queries and stored procedures.'
      ]
    }
  ],
  engineeringNotes: [
    'Key architectural consideration regarding data synchronization and failover.'
  ],
  diagram: {
    nodes: [
      { id: 'client', label: 'Console (Angular)', kind: 'client' },
      { id: 'api', label: 'Backend (Spring Boot)', kind: 'service' },
      { id: 'db', label: 'SQL Server', kind: 'store' }
    ],
    edges: [
      { from: 'client', to: 'api', label: 'API Request' },
      { from: 'api', to: 'db', label: 'Persist' },
      { from: 'api', to: 'client', label: 'Sync Event', direction: 'return' }
    ],
    caption: 'Architecture Flow',
    altText: 'Component interaction diagram'
  },
  isSolo: false,
  order: 6
}
```

Then add the slug to `getPrerenderParams` in `src/app/app.routes.server.ts` and `public/sitemap.xml`. The system will automatically:
- Generate the case study route `/work/new-project-slug`.
- Compute navigation order (previous/next links).
- Render the responsive SVG diagram without manual graphics editing.
- Prerender static HTML files during `npm run build`.

---

## 5. Development & Build Commands

```bash
# Install dependencies
npm install

# Generate static assets (Resume PDF, OG Image, Apple Touch Icon)
npm run generate:assets

# Start local development server
npm start

# Run unit test suite (Karma / Jasmine)
npm test -- --watch=false

# Build production static site (SSG prerendering)
npm run build
```

---

## 6. Static Deployment Guide

The static site bundle is compiled to `dist/portfolio/browser`.

### Netlify
Add a `netlify.toml` file in the root:
```toml
[build]
  publish = "dist/portfolio/browser"
  command = "npm run build"

[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### Vercel
Add a `vercel.json` file in the root:
```json
{
  "outputDirectory": "dist/portfolio/browser",
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(fonts|assets)/.*",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### AWS S3 + CloudFront
1. Sync build output to S3:
   ```bash
   aws s3 sync dist/portfolio/browser s3://<your-bucket-name> --delete
   ```
2. CloudFront configuration:
   - Default root object: `index.html`
   - Custom Error Response: HTTP 404 -> Response Page `/index.html`, HTTP 200 (or point to `/not-found/index.html`).
   - Caching behavior: Cache immutable assets (`*.js`, `*.css`, `*.woff2`) for 1 year, and `index.html` with `Cache-Control: no-cache`.

---

## 7. Verification & Quality Metrics

- **Total initial transfer size**: `82.97 kB` (well below the 130 kB gzipped budget).
- **Accessibility**: WCAG 2.2 AA compliant. Single `<h1>` per page, `:focus-visible` 2px `--signal` focus rings, high contrast ratios (minimum 4.5:1 text, 3:1 borders), skip-to-content link, `aria-live="polite"` feedback for clipboard copy, responsive SVG accessibility.
- **Unit Tests**: 21 unit tests covering `ContentService`, `SeoService`, `ThemeService`, `SystemDiagramLayout`, and `App` shell passing with 100% success.
