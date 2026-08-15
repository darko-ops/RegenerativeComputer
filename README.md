# Regenerative Computer

Marketing site and lead-capture backend for an independent compute-markets company.

- **Stack** — Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, Postgres (Neon via Vercel Marketplace)
- **Design** — light-only, warm paper background, Newsreader / Inter / IBM Plex Mono, hairline rules and data tables. No gradients.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Positioning, flow diagram, three steps, thesis, research index |
| `/compute` | Request-for-quote intake — the primary conversion surface |
| `/supply` | Supply-partner intake for infrastructure providers |
| `/markets` | Market intelligence. Ships empty on purpose — no fabricated numbers |
| `/research` `/research/[slug]` | Three long-form pieces, statically generated |
| `/about` | Short. Deliberately. |
| `/internal` | Password-gated view of both submission tables. `noindex`, disallowed in `robots.txt` |

## Setup

```bash
npm install
vercel link                       # once
vercel integration add neon       # provisions Postgres + DATABASE_URL
vercel env pull .env.local
npm run db:init                   # creates the rfq and supply_partner tables
npm run dev
```

### Environment variables

| Name | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | yes | Injected by the Neon Marketplace integration |
| `ADMIN_PASSWORD` | yes for `/internal` | Set with `vercel env add ADMIN_PASSWORD`, then re-pull |

`/internal` signs a session cookie derived from `ADMIN_PASSWORD` via HMAC. Rotating the
password invalidates every existing session.

## Data model

`scripts/init-db.mjs` is the single source of truth for the schema and is idempotent —
re-run it after changing a table.

- `rfq` — compute requests: hardware, workload, infrastructure, timing (including the
  interruptible / flexible-scheduling flags), and optional commercial context.
- `supply_partner` — provider inventory, locations, cluster and networking detail,
  availability, minimum commitment, pricing, and restrictions.

Both forms validate server-side with Zod, carry a honeypot field, and never surface raw
database errors to the visitor.

## Icon

`src/app/icon.svg` is "RC" in **IBM Plex Mono Medium (500)** — the same face as the header
wordmark and the Request Compute button — at the same `0.12em` tracking, paper on ink.

The glyphs are converted to vector outlines, not `<text>`, so the mark does not depend on
the font being installed on the viewer's machine. `apple-icon.png` (180px) and
`favicon.ico` (32px) are rasterized from the same SVG.

To regenerate: extract the `R` and `C` outlines from IBM Plex Mono Medium with
`opentype.js`, lay them out at 0.12em tracking, scale the combined bounding box to 46 of a
64-unit square, and centre it optically on that box rather than on font metrics.

## Content

Research articles live in `src/content/research.ts` as structured blocks — no CMS. Adding
an entry to `ARTICLES` creates the page, the listing row, and the sitemap entry.

## Deploy

```bash
npm run build
vercel deploy --prod
```

The Vercel project is linked to this repository, so pushes to `main` deploy automatically.
