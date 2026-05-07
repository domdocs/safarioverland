# Safari Overland — Developer Handoff Brief

> Companion to the design canvas at `Safari Overland Review.html`.
> Pair this with `handoff/tokens.css`, `handoff/tailwind.config.ts`, and
> `handoff/listing-detail-page.tsx` for paste-ready starting points.

This is a **re-skin and re-template**, not a rebuild. The architecture
(Next.js 15 App Router · Tailwind · shadcn/ui · Supabase · Resend on Vercel)
stays exactly as it is. Data model, routing, auth, admin, gated downloads,
PDF generation, email pipeline — all untouched. What changes is presentation.

---

## Phase 0 — Tokens (½ day, ship same week)

The cheapest, highest-leverage change. Once landed, every shadcn component
on the site adopts the new colour system automatically.

**Files**

1. Replace `app/globals.css` with `handoff/tokens.css`.
2. Replace `tailwind.config.ts` with `handoff/tailwind.config.ts`.
3. Wire fonts in `app/layout.tsx`:

   ```tsx
   import localFont from "next/font/local"
   // or use next/font/google for Cormorant Garamond as a free fallback:
   import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google"

   const serif = Cormorant_Garamond({
     subsets: ["latin"],
     weight: ["400", "500", "600"],
     variable: "--font-serif",
   })
   const sans = Inter({ subsets: ["latin"], variable: "--font-sans" })
   const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
         <body>{children}</body>
       </html>
     )
   }
   ```

   When you're ready to license the premium serif (GT Sectra or Tiempos
   Headline) replace `Cormorant_Garamond` with `localFont` pointing at
   the woff2 files. No template changes needed — the variable stays.

**What this gives you**

- Site-wide palette swap to the cinematic dark theme.
- Editorial heading defaults (serif, tight tracking, balanced wrapping).
- `eyebrow`, `mono`, `rule`, `italic-accent` utility classes ready to use.
- shadcn buttons / dialogs / dropdowns continue to work — they inherit
  via `--primary`, `--background`, etc.

**Risk:** very low. The site will look different the moment this ships.
If anyone hates it, revert is one git commit.

---

## Phase 1 — Editorial primitives (1 week)

Build the components every page in Phase 2+ depends on.

Create `components/editorial/` and add:

| Component | Purpose | Used by |
|---|---|---|
| `Eyebrow.tsx` | `<span className="eyebrow">` wrapper with optional rule | Every page |
| `SectionRule.tsx` | Hairline divider with optional numeric label (`01 / 04`) | Lists, sections |
| `NumberedList.tsx` | Two-column list with monospace counters | Listing amenities, FAQs |
| `PullQuote.tsx` | Italic accent quote with attribution | Articles, listing verdict |
| `EditorialHeader.tsx` | New site header, replaces `components/header.tsx` | Root layout |
| `EditorialFooter.tsx` | New site footer, replaces `components/footer.tsx` | Root layout |
| `MobileDrawer.tsx` | Full-screen menu overlay, opened from header hamburger | EditorialHeader |
| `StickyCTA.tsx` | Mobile bottom action bar (already provided in handoff/) | Listing detail, plan |
| `ListingHero.tsx` | 72vh full-bleed hero with breadcrumb + title block | Listing detail |
| `ListingCardEditorial.tsx` | New card style — replaces `components/listing-card.tsx` | Index, related |

**Style conventions**
- Use Tailwind classes built from the new tokens (`bg-night`, `text-bone`,
  `border-rule`, `text-amber`).
- Keep most of these as Server Components. Only `StickyCTA`, `MobileDrawer`,
  and search inputs need `"use client"`.
- Follow the type scale — never hand-roll font sizes. Use `text-h1-fluid`,
  `text-h2-fluid`, `text-eyebrow`, `text-mono`.

---

## Phase 2 — Listing detail + listings index (2 weeks · highest impact)

The pages that drive the directory's commercial value.

### `app/listings/[id]/page.tsx`

Replace with `handoff/listing-detail-page.tsx`. It's a Server Component
that calls your existing `getListingById` / `getListingsByCategory` helpers.

**Data fields read** (no schema changes required):
- `listing_name`, `description`, `image_url`, `location`, `category`
- `contact_email`, `contact_phone`, `website_url`, `price_info`
- `amenities[]`, `coordinates: { latitude, longitude }`

**Optional schema additions you may want later:**
- `verdict` (text) — explicit first-person review separate from description.
  Currently the page uses the first 1–2 sentences of `description`.
- `stayed_at` (date) — to render "Stayed May 2024" credibility line.
- `gallery_urls[]` — for a horizontal scroller above the meta column.

### `app/listings/page.tsx` (or wherever your index lives)

Mirror the Direction B listings mockup. Sticky tab strip for category
filter; numbered editorial cards in a two-column grid (one column on
mobile). Reuse `listing-filters.tsx` for the actual filter logic — just
restyle the chrome.

---

## Phase 3 — Marketing pages (2 weeks)

Order by impact:

1. **`app/page.tsx` (Home)** — port from `B_HomeV2`. Cinematic hero,
   live in-season strip (data source TBD — start with hard-coded JSON in
   a `lib/conditions.ts`), three-pillar manifesto, Field Notes editorial
   block, plan-with-us card, editorial footer.

2. **`app/destinations/page.tsx` (Atlas)** — full-bleed region cards,
   one per region. Existing `app/destinations/[region]/page.tsx` files
   keep their data — just retheme `destination-header.tsx`,
   `destination-seasons.tsx`, etc.

3. **`app/resources/` (Field Notes)** — restyle `guide-page.tsx` to the
   editorial article template (drop-cap intro, pull quotes, numbered
   lists, related-article footer). The download-gating modal stays
   exactly as is — just retoned by tokens.

---

## Phase 4 — Trip Builder (2–3 weeks · real backend)

The mockup is interactive but client-only. Shipping it for real means:

**Schema (Supabase)**

```sql
create table briefs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  chapters text[] not null,         -- ['East', 'Southern']
  rhythm text,                      -- 'Walking-led'
  months text[],                    -- ['May','Jun','Jul']
  nights int,
  contact_email text,
  contact_name text,
  notes text,
  status text default 'new',        -- new | reviewing | sent | closed
  assigned_to uuid references profiles(id)
);

alter table briefs enable row level security;
-- public can insert, only admins can read.
create policy "anyone can submit a brief"
  on briefs for insert with check (true);
create policy "admins read briefs"
  on briefs for select using (auth.jwt() ->> 'role' = 'admin');
```

**Routes**

- `app/plan/page.tsx` — multi-step form (port `B_TripBuilder`).
- `app/api/briefs/submit/route.ts` — `POST` writes to `briefs`, fires
  Resend email to planner inbox + confirmation to user.
- `app/admin/briefs/page.tsx` — list + filter + status update,
  parallel structure to your existing `/admin/subscribers`.

**Email templates** (Resend, matches existing patterns)

- `emails/brief-received.tsx` — to user, "We'll be in touch within 48h".
- `emails/brief-notify.tsx` — to planner, with brief summary + admin link.

**Risk:** medium. The form UX needs to handle abandonment (auto-save
to localStorage on every step) and the planner workflow needs to be
defined before the schema is locked. Worth a kickoff conversation.

---

## What stays exactly as it is

- `lib/listings.ts`, `lib/articles.ts`, all data fetching helpers.
- `lib/supabase.ts` and the Supabase project itself.
- `app/admin/*` — retoned by tokens but no template changes.
- `app/api/*` existing routes (subscribers, downloads, articles).
- `lib/email.ts` and existing Resend templates.
- `lib/pdf.ts` and gated download flow.
- shadcn/ui primitives (`components/ui/*`) — they re-skin via tokens.

---

## Suggested rollout

```
Week 1       Phase 0 (tokens + fonts) ships behind a feature flag.
             Internal review on staging.
Week 2–3     Phase 1 components built and visually QA'd in Storybook
             (or just on a /design-review page that mounts each one).
Week 4–5     Phase 2 — listing detail then listings index.
             First page that ships publicly.
Week 6–7     Phase 3 — home, atlas, field notes.
Week 8–10    Phase 4 — trip builder front-end + back-end + admin.
```

Total: ~10 weeks for one developer, ~6 for two.

---

## Questions for the team

- Are you happy to license a premium serif (GT Sectra ≈ £400/year for the
  weights we need), or should Phase 0 ship on Cormorant Garamond and
  swap in the licensed font later?
- Do you have rights to operator-supplied photography for hero images?
  The mockups currently use Unsplash placeholders.
- What's the volume target for the trip builder? If it's >20 briefs/week,
  Phase 4 grows by another week to add a proper triage pipeline.
- Is the admin dashboard staying on the current dark-on-light theme, or
  moving to the cinematic palette? (Recommendation: keep admin light —
  it's a back-office tool, readability beats brand.)
