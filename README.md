# Safari Overland

A directory of African safari operators, lodges, campsites, and travel resources, with an editorial layer of planning guides, seasonal information and conservation content.

Production: https://safarioverland.com
Vercel project: `domdocs-icloudcoms-projects/safarioverland`
Supabase project: `ufraczrwltunvdkgaeeb` ([dashboard](https://supabase.com/dashboard/project/ufraczrwltunvdkgaeeb))

---

## Tech stack

- **Framework:** Next.js 15.5 (App Router, Server Components, RSC streaming)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui (Radix primitives)
- **Database / auth / storage:** Supabase
- **Email:** Resend (transactional + welcome flow)
- **Hosting:** Vercel
- **Package manager:** pnpm

---

## Local setup

```bash
# 1. Install dependencies
npx pnpm install
# or, if you have pnpm globally:
pnpm install

# 2. Pull production environment variables (Vercel CLI required)
npx vercel link --yes --project safarioverland
npx vercel env pull .env.local --environment=production

# 3. Run dev
npx pnpm dev          # http://localhost:3000

# 4. Production build / serve (needed for some tooling, e.g. PDF generation)
npx pnpm build
npx pnpm start
```

---

## Environment variables

| Name | Required | Notes |
|------|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Public Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | Server-only; used by API routes for writes & signed URLs |
| `RESEND_API_KEY` | yes | Transactional email |
| `RESEND_FROM_ADDRESS` | recommended | Defaults to `onboarding@resend.dev`. Set to a verified domain (e.g. `hello@safarioverland.com`) for production |
| `NOTIFICATION_EMAIL` | optional | Inbox for contact-form submissions; defaults to `info@safarioverland.com` |
| `ADMIN_USERNAME` | yes (prod) | HTTP Basic Auth username for `/admin/*` and `/api/admin/*`. If unset, the admin section returns 503. |
| `ADMIN_PASSWORD` | yes (prod) | HTTP Basic Auth password for the admin section. Pair with `ADMIN_USERNAME`. Use a long random string. |

All env vars are managed in **Vercel → Project Settings → Environment Variables** and pulled locally with `vercel env pull`.

---

## Architecture overview

### App Router layout
- `app/` — route handlers and pages (App Router)
- `app/api/` — server route handlers
- `app/admin/` — admin section (currently unauthenticated; see [Outstanding items](#outstanding-items))
- `components/` — shared React components (most are client components)
- `components/ui/` — shadcn/ui primitives
- `lib/` — server and client utilities
- `lib/downloads/` — gated-download infrastructure (registry, storage, email)
- `supabase/migrations/` — versioned SQL migrations

### Key data tables
- `contact_messages` — contact form submissions
- `subscribers` — email captures from gated downloads
- `download_events` — per-resource download log
- (Plus the existing listings / articles tables that pre-date this work)

### Storage buckets
- `downloads` — private bucket holding all gated PDF / XLSX resources. Files are served via short-lived signed URLs.

---

## Gated download workflow

Every "Download X" CTA on the site is gated through a single email-capture flow.

### Flow
1. User clicks any `<DownloadButton slug="…" />` on the site.
2. `DownloadGateProvider` checks for the `so_subscriber_id` cookie.
3. If present and DB-valid → `GET /api/downloads/[slug]` redirects to a signed Supabase Storage URL. No modal.
4. If absent → modal asks for first name + email + (default-checked) marketing consent. `POST /api/downloads/request` upserts the subscriber, logs the download event, sets the cookie, and returns a signed URL.
5. Resend sends a welcome / fulfilment email containing a backup download link valid 1 hour.

### Resource registry
The single source of truth is [`lib/downloads/resources.ts`](lib/downloads/resources.ts). Each entry:
- `slug` — stable identifier used in URLs and analytics
- `title`, `description` — shown in the capture modal and welcome email
- `filename` — what the downloaded file is called
- `storagePath` — path in the `downloads` Supabase Storage bucket
- `sourceUrl` — page on the site the PDF is rendered from (used by the generation script)
- `available` — when `false`, the modal still captures the email but tells the user the resource is being finalised

### Adding a new resource
1. Add an entry to `lib/downloads/resources.ts` with `available: false`.
2. Drop a `<DownloadButton slug="..." title={...} description={...} />` wherever you want the CTA.
3. Generate the PDF (or upload a custom file) — see [Regenerating PDFs](#regenerating-pdfs).
4. Flip `available: true` once the file is in Supabase Storage.

---

## Regenerating PDFs

The 14 downloadable resources are produced by rendering existing site pages to PDF via Puppeteer.

### Important: requires the production server, not dev

Next.js dev mode streams content via RSC chunks that don't fully hydrate inside Puppeteer. The script must run against a production build.

```bash
# 1. Production build (needs env vars)
set -a && source .env.local && set +a
npx pnpm build
npx pnpm start &      # serves on :3000

# 2. Install Puppeteer's bundled Chrome (one-off)
npx puppeteer browsers install chrome

# 3. Generate PDFs locally
node scripts/generate-pdfs.mjs
# → writes to ./generated-pdfs/

# 4. Upload to Supabase Storage
node scripts/generate-pdfs.mjs --upload
```

The Safari Budget Calculator (`safari-budget-calculator.xlsx`) is the only non-PDF resource and isn't produced by the script. Edit the source file in `generated-pdfs/` (gitignored, kept locally) and re-upload manually via the Supabase dashboard.

### Re-running individual resources
The script regenerates everything that has a `sourceUrl` on each invocation. To target a single resource, temporarily comment out the others or filter by slug in the script's main loop.

---

## Admin

`/admin/subscribers` shows:
- Total subscribers, marketing-opted-in count, total downloads
- Per-resource download counts
- The 500 most-recent subscribers
- CSV export at `/api/admin/subscribers/export`

⚠️ **Currently unauthenticated.** See Outstanding items.

---

## Deployment

Vercel auto-deploys on push to `main`.

```bash
git add -A
git commit -m "..."
git push origin main
```

Or deploy directly without git: `npx vercel --prod`.

Watch deploys with `npx vercel ls | head -5`.

---

## Recent changelog

Reverse chronological. The May 2026 entries below were the major work in this session.

### 2026-05-06 — Email-gated download workflow
- New tables: `subscribers`, `download_events` ([migration](supabase/migrations/20260506_create_subscribers_and_downloads.sql))
- New private Supabase Storage bucket: `downloads`
- New routes:
  - `POST /api/downloads/request` — capture / log / signed URL
  - `GET /api/downloads/[slug]` — direct download for known users
  - `GET /api/admin/subscribers/export` — CSV export
- New components: `DownloadButton`, `DownloadGateModal`, `DownloadGateProvider`
- Rewired all **14 download CTAs** across 9 pages through the gate
- Welcome email via Resend with signed-URL backup link
- New admin section at `/admin/subscribers` (KPIs, per-resource counts, table, CSV)
- Generated 13 content PDFs + a custom XLSX budget calculator and uploaded to Supabase

### 2026-05-06 — Site content fill-in (24 new pages)
- Built shared `<GuidePage />` template ([components/guide-page.tsx](components/guide-page.tsx)) for consistent theming
- **Planning Guides (10 new):** budgeting, photography-gear, seasonal-packing, best-times, green-season, family-safaris, solo-travel, accessible-safaris, before-you-go, what-to-pack
- **Conservation (12 new):** anti-poaching, beyond-safari, community-conservation, cultural-preservation, economics, education-awareness, endangered-species, ethical-operators, funding, habitat-preservation, responsible-practices, sustainable-tourism
- **Other:** seasonal-guides/north-africa-birds, safety-tips/wildlife-behavior
- Replaced two stub pages with full content: east-vs-southern, luxury-vs-budget
- Added a Preparation tab to the planning-guides index covering before-you-go and what-to-pack

### 2026-05-06 — Site fixes
- Removed all `/community` references (header, footer, mobile-nav)
- Fixed broken header links: `/signin` → `/sign-in`, `/register` → `/sign-up`
- Replaced fake internal social-link routes with `target="_blank"` placeholders
- Fixed seasonal-guides typo: `/family-safaris` → `/family-safari`
- Created `public/ads.txt` for AdSense

### 2026-05-06 — Vulnerability patch
- Upgraded Next.js from 15.2.4 → 15.5.15 (Vercel was blocking deploys due to a CVE in 15.2.4)

---

## Outstanding items

Picked these up during the May 2026 session but didn't ship — track here so they don't get lost.

| Item | Priority | Notes |
|------|----------|-------|
| ~~Auth gate on `/admin/subscribers`~~ | **Done** | HTTP Basic Auth gate added in `middleware.ts` — protects `/admin/*` and `/api/admin/*`. Set `ADMIN_USERNAME` + `ADMIN_PASSWORD` in Vercel before sharing the URL. Replace with proper Supabase auth + role check once the stub `SignInForm` is built out. |
| Build out the stub `SignInForm` | Medium | `components/sign-in-form.tsx` currently has a `// TODO: Implement sign in logic` stub that just toasts and pushes to `/`. Wire it to `supabase.auth.signInWithPassword`, then swap the admin Basic Auth gate for a proper session check + email allowlist. |
| `RESEND_FROM_ADDRESS` env var | Medium | Welcome emails currently come from `onboarding@resend.dev`. Set up a verified domain in Resend and point this env var at it. |
| GDPR-strict opt-in | Medium | Marketing consent checkbox defaults to checked, which is non-compliant for EU traffic. Flip the default in [`download-gate-modal.tsx`](components/download-gate-modal.tsx) (one line: `useState(true)` → `useState(false)`) when EU traffic becomes meaningful. |
| `/api/test-db` route | Low | Diagnostic-only route that fails locally without env vars — fine on Vercel but a candidate for cleanup. |
| Designed PDFs (Option B) | Low | The current PDFs are content-first auto-generated from the site (Option A). Premium guides (First-Time Safari Planner, Family Safari Planner, country guides) would benefit from designed PDFs in Figma/Canva when there's time. |
| Resend nurture sequence | Low | Welcome email is wired up. A 3-email nurture series (planning tips → operator picks → conservation) would convert subscribers to leads. |

---

## Useful commands

```bash
# Run dev with production-ish env
set -a && source .env.local && set +a && npx pnpm dev

# See what's about to deploy
git status
git diff --stat origin/main..HEAD

# Watch a deployment
npx vercel ls | head -5
npx vercel logs [url]

# Pull latest env from Vercel
npx vercel env pull .env.local --environment=production

# Quick subscriber sanity check from CLI
psql "$(grep DATABASE_URL .env.local | cut -d= -f2-)" -c "SELECT COUNT(*) FROM subscribers; SELECT COUNT(*) FROM download_events;"
```

---

## File map (key directories)

```
app/
├── admin/                       # Admin dashboard
│   ├── subscribers/             # ← New: email-capture admin
│   └── …                        # Articles, listings, settings
├── api/
│   ├── admin/subscribers/       # ← New: CSV export
│   ├── contact/                 # Contact form (existing)
│   └── downloads/               # ← New: gated download endpoints
├── resources/
│   ├── conservation/            # 12 new sub-pages + index
│   ├── planning-guides/         # 10 new sub-pages + new "Preparation" tab
│   ├── safety-tips/             # New wildlife-behavior sub-page
│   └── seasonal-guides/         # New north-africa-birds sub-page
└── …
components/
├── download-button.tsx          # ← New
├── download-gate-modal.tsx      # ← New
├── download-gate-provider.tsx   # ← New: mounted in app/layout.tsx
├── guide-page.tsx               # ← New: shared GuidePage template
└── …
lib/
└── downloads/
    ├── resources.ts             # ← New: registry
    ├── storage.ts               # ← New: signed URL helper
    └── email.ts                 # ← New: Resend send
scripts/
└── generate-pdfs.mjs            # ← New: Puppeteer-based PDF generator
supabase/
└── migrations/
    └── 20260506_create_subscribers_and_downloads.sql   # ← New
```
