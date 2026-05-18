# Changelog

Append-only record of significant work landed on `main`. Newest at top.

Where a PR was preceded by a brief in `handoff/briefs/`, that file is
referenced — it's the canonical spec for what was built and why.

---

## 2026-05-18 — Trip Designer (Phases 1–4) + Supabase security hardening

**Trip Designer — Phases 1–4** (PR #12)
Spec: `handoff/briefs/2026-05-TRIP_DESIGNER_PHASE_1_TO_3.md`
Handoff: `handoff/briefs/2026-05-TRIP_DESIGNER_HANDOFF.md`

End-to-end implementation of the staff-facing itinerary builder.
Phases 1–3 were specified as a single autonomous brief; Phase 4
(server-side PDF) was folded in early during the build because
Safari's print pipeline has unfixable quirks (`vh` resolving
against the screen viewport in print, `rgba()` gradients rendering
as opaque dark blocks, `break-after: page` firing inconsistently).
Chromium honours all three correctly; the print path therefore
uses Puppeteer rather than Mac Print > PDF.

- Schema: `itineraries`, `itinerary_chapters`, `itinerary_transits`,
  `itinerary_reference_sequences` — applied via
  `supabase/migrations/20260516_itineraries.sql`. Reference
  numbering uses an atomic per-year sequence
  (`SO-YYYY-NNNN`).
- CRUD library in `lib/itineraries/` (types, validate, index,
  reference, defaults, preflight). Roman numerals derived from
  position. Chapter add/delete/reorder cascades to transit
  invariant `transits.length === max(0, chapters.length − 1)`.
- API routes: list, create, edit, delete, chapter add/delete/
  reorder, transit edit, PDF generation. All under
  `/api/admin/itineraries/*` with existing admin Basic Auth.
- Admin UI: `/admin/itineraries` list, `/new` create, `/[id]/edit`
  long-page editor with autosave, `/[id]/preview` editorial render
  that escapes the admin chrome via a route group (admin sidebar
  lives under `(chrome)/`; the preview sits outside it for
  full-bleed editorial rendering).
- Image uploads route through the existing `/api/admin/upload`
  endpoint with three new slots (`itinerary-cover`, `chapter-hero`,
  `chapter-lodge`) — reuses image pipeline v2 (sharp resize, EXIF
  strip, WebP).
- Editorial render: `components/itinerary/*.tsx` ports the
  prototype JSX (Cover, Prologue, Overview, Chapter, Transit,
  Practicals, SignOff, Maps) into Next.js Server Components.
  CSS ported verbatim from `source-prototype/src/styles.css` into
  `app/admin/itineraries/[id]/preview/preview-styles.css`. Fonts:
  Caveat + Newsreader added via next/font/google; Cormorant
  Garamond + Inter reused from existing layout.
- PDF generation: `lib/pdf/generate.ts` splits between
  `puppeteer-core` + `@sparticuz/chromium` on Vercel
  (`process.env.VERCEL`) and full `puppeteer` locally. Both in
  `serverExternalPackages` in `next.config.mjs`. Cold start
  ~3–5 s, warm ~1–2 s. `maxDuration = 60` on the PDF route.
  Cookies forwarded to handle Vercel Deployment Protection on
  preview deploys.
- `handoff/PRINT_TO_PDF.md` exists but is now historical — the
  in-admin "Download PDF" button is the primary path. Mac
  Print > PDF still works as a fallback.

**Supabase security hardening** (rode along in an early PR #12 commit)
Spec: `handoff/briefs/2026-05-SUPABASE_SECURITY_HARDENING.md`

- Dropped overly permissive bucket SELECT policies on
  `listing-media` and `article-assets` (public URL access continues
  via the bucket public-flag; anonymous listing now blocked)
- Pinned `search_path` on `update_updated_at_column` and
  `mint_reference_for_year`
- Analytics tables: outcome documented in PR description (audit
  step from the brief)
- `contact_messages` INSERT policy: outcome documented in PR
  description (audit step from the brief)

### Test coverage at session close

- node:test (`pnpm test:unit`): 26 cases for `toRoman`, `slugify`,
  zod schemas, preflight rules. **Note:** corepack `pnpm` is broken
  on the build box — use
  `node --env-file=.env.local --import tsx --test lib/**/*.test.ts`
  or `npx tsx --test lib/itineraries/*.test.ts`.
- vitest (`npx vitest run`): 76 cases across itinerary components
  and preview render.
- `npx tsc --noEmit` clean across all checked routes.
- `npx next build` all routes compile.

### In review — Phase 5

**PR #13 — Trip Designer Phase 5**
Branch: `feature/trip-designer-phase-5`
Spec: derived from `SCOPE_TRIP_DESIGNER.md` Phase 5 outline

In review, not merged. Includes:

- Publish workflow with immutable snapshots (`itinerary_snapshots`
  table; `/trips/[slug]` reads `is_current` snapshot, never live
  tables)
- Public read-only URL `/trips/[slug]`
- Theme picker UI (palette / typography / density) exposed but
  with "(default)" labels nudging curators to leave savanna /
  editorial / spacious
- Duplicate trip → fresh draft
- Pre-flight validation on publish (rejects: missing cover photo,
  zero chapters, chapter missing coords/dates/epigraph/intro/hero,
  transit with placeholder values, transit count out of sync)
- Migration: `supabase/migrations/20260517_itinerary_publishing.sql`
  — apply when PR #13 merges

### Known gaps left at session close

- `NEXT_PUBLIC_CALENDLY_URL` still unset → "Speak to a planner"
  buttons fall back to the email mailto. Carry-over from prior
  sessions; no code change needed when Niels' Calendly is wired.
- Matetsi pending test row
  (`d97e32c6-3740-45b7-9808-98a6256df635`) still in admin — flip or
  delete when convenient.
- **Legacy-directory copy sweep** — Dom edited 13 files removing
  user-facing "directory" language (category subhead, error pages,
  404 pages, search heading, FAQ rewrite on contact page, Field
  Notes article CTAs, admin chrome subheads, newsletter form,
  destination map tooltip, settings, listing-edit toasts). These
  edits are uncommitted as of session close — commit and push to
  `main` separately.
- Templates library — single remaining item from the original Trip
  Designer scope. Deferred; write a brief after the team has run
  the publish flow on a few real trips.
- `next dev` cannot be started from the iCloud-synced repo path
  (OS denies executing `node_modules/.bin/next`); UI verification
  during PR #12 was done on Vercel preview deploys. If preview
  testing becomes painful, run the dev server from a non-iCloud
  checkout.

### Briefs queued and not yet shipped

None.

---

## 2026-05-14 — Vercel Web Analytics + Speed Insights

**Vercel Web Analytics + Speed Insights + seven custom conversion events** (PR #11)
Spec: `handoff/briefs/2026-05-VERCEL_ANALYTICS.md`

- `@vercel/analytics` and `@vercel/speed-insights` installed and wired
  into `app/layout.tsx`, both filtering `/admin/*` via `beforeSend`.
- New `lib/analytics/` module:
  - `events.ts` — single source of truth for the event taxonomy (typed
    name → param-shape map).
  - `track.ts` — typed wrapper around `@vercel/analytics`' `track()`
    that no-ops on `/admin/*` paths (defence in depth).
- New `components/analytics/` shared client components:
  - `StartBriefLink` — drop-in replacement for `<Link href="/plan">`
    that fires `start-brief-click` with a typed `source`.
  - `AddToBriefLink` — listing-detail Add-to-a-brief CTA wrapper.
  - `FieldNoteReadTracker` — zero-DOM scroll-depth observer.
- Seven events live:
  1. `start-brief-click` — instrumented at header, hero, home plan
     card, field-note CTAs, category empty state, categories root
     empty, `/resources/faqs` bottom CTA, `/404`, and `/plan/sent`
     fallback.
  2. `add-to-brief-click` — desktop CTA + mobile sticky on
     `/listings/[id]`.
  3. `speak-to-planner-click` — `PlannerCallTrigger` open with
     threaded `source`.
  4. `brief-submitted` — `/plan` success branch only (no attempts),
     captures pace / budget_tier / duration / has_source_listing.
     No PII.
  5. `newsletter-signup` — `NewsletterForm` on dispatch success.
  6. `field-note-read-complete` — fires once per page-load at 75%
     scroll depth on any `GuidePage`.
  7. `calendly-booking-completed` — `PlannerCallEmbed` listens for
     Calendly's `calendly.event_scheduled` postMessage; threaded
     `source` from the modal/inline mount.
- Documentation: `handoff/ANALYTICS.md` — taxonomy, dashboard
  locations, admin exclusion, and the "no PII / no cookies" stance.
- Tests: 11 new unit/component tests across `lib/analytics/track`,
  `StartBriefLink`, and `AddToBriefLink`; full vitest suite at 57/57.

Defence in depth on admin exclusion: `beforeSend` filters URL-keyed
events (page views + Core Web Vitals), the `track()` wrapper filters
custom events. Either alone is sufficient; both means a future
shared-CTA change on an admin page can't accidentally pollute the
dashboard.

---

## 2026-05-14 — Image pipeline v2 + category polish

Two PRs landed: the deferred Phase 2 image-processing work, and the
editorial polish on the categories surfaces. Final commit on main at
session close: `64e098c`.

### Shipped

7. **Image pipeline v2 + listing contact cleanup** (PR #7)
   Spec: `handoff/briefs/2026-05-IMAGE_PIPELINE_V2_AND_CONTACT_CLEANUP.md`
   - `sharp` (0.34.5) added; every upload routes through
     `/api/admin/upload` server-side pipeline:
     rotate (honour EXIF orientation first) → resize to 2400px
     long edge with no upscale → WebP encode at quality 85
   - EXIF (GPS, camera serials, ICC profiles) stripped as a
     side-effect of omitting `.withMetadata()`
   - All Supabase Storage objects now `.webp`
   - Admin upload UI surfaces "Original X → processed Y (WebP)" in
     green on success
   - Verified live: a 36 KB JPEG with sharp-injected GPS came back
     at 6.9 KB WebP, 2400×1600, EXIF absent
   - Listing contact cleanup: `contact_name` / `contact_email` /
     `contact_phone` no longer render on public listing pages.
     Former "Direct" section is now "Enquire" — operator website
     link + the two planning CTAs only. Fields stay in the DB and
     the admin edit form. Preview matches the public render.
   - Deleted the dead pre-editorial `components/listing-detail.tsx`
     (zero callers)

8. **Categories — hide empty cards everywhere** (PR #8)
   Spec: `handoff/briefs/2026-05-CATEGORIES_HIDE_EMPTY.md`
   - Three surfaces filter the same way: the `/categories` index
     grid, the sticky tab strip under the header, and the footer's
     Categories column
   - Driven by a new `getActiveCategories()` helper in
     `lib/categories.ts` that joins the master list of 9 categories
     against approved-listing counts and drops zero-count entries
   - Per-category pages no longer fall back to a stringly-typed
     "submissions open" message. New `<CategoryEmptyState noun="…">`
     component renders the editorial "No properties on the kept
     list here yet" copy with a "Send a brief →" CTA
   - Index numbering stays contiguous (`01 02 03 …`) regardless of
     how many categories are hidden — numbered by filtered position
   - Master list stays in the system; cards reappear automatically
     in master-list position when a listing is approved
   - Current live state: only **Lodges** has approved listings; the
     index reads "Categories — 01 section" and the tab strip shows
     All · Lodges

### Test coverage at session close

- node:test (`pnpm test:unit`): ~89 cases (added: `upload/processing`,
  `categories`, `category-tabs`)
- vitest (`pnpm test`): ~46 cases (added: `listing-detail` contact
  cleanup, `category-empty-state`)
- `tsc --noEmit` clean across all checked routes

### Known gaps left at session close

- `NEXT_PUBLIC_CALENDLY_URL` still unset → "Speak to a planner"
  buttons fall back to the "calendar isn't live yet — email instead"
  message. No code change needed when Niels' Calendly is configured.
- Matetsi pending test row (id
  `d97e32c6-3740-45b7-9808-98a6256df635`) still sits in admin from
  earlier sessions. Flip to approved/featured or delete via admin
  when convenient.

### Briefs queued and not yet shipped

None.

---

## 2026-05 — Listings publishing pipeline + image storage

Six PRs landed across the May 2026 work session. End-to-end the
session closed the loop from "research record drafted by AI" through
to "live listing on the public site with operator-supplied photography,
outreach tracked, and an editorial preview gate in front of approval."

Final commit on main at session close: `431add6`.

### Shipped

1. **Listing-import API + CLI** (PR #1)
   Spec: `handoff/briefs/2026-05-LISTING_IMPORT_API.md`
   - `POST /api/admin/listings/import` accepts a research-record
     markdown payload, validates frontmatter against the
     `directory_listings` schema, inserts as `status='pending'`
   - Idempotent — re-imports update existing pending rows; rejects
     re-imports over `approved` or `rejected` rows
   - `scripts/import-listing.ts` CLI wraps it for AI-pipeline calls

2. **Listing-import admin UI** (PR #2)
   Spec: `handoff/briefs/2026-05-LISTING_IMPORT_ADMIN_UI.md`
   - New page at `/admin/listings/import`
   - Drag-drop multi-file upload, or paste-markdown alternate mode
   - Sequential POSTs with per-file pass/fail panel
   - Removed terminal as the only import path

3. **React Email + operator outreach tracking** (PR #3)
   Spec: `handoff/briefs/2026-05-REACT_EMAIL_AND_OUTREACH.md`
   - All four existing transactional emails (brief received,
     brief notify, download confirmation, contact form) consolidated
     into React Email components in `lib/email/templates/`
   - New `OperatorOutreachFeaturedEmail` component for Template A
     from `LISTINGS_AUDIT.md`
   - New Outreach section on `/admin/listings/edit/[id]` —
     drafts a mailto: with subject + body pre-populated from the
     listing's `editor_notes` clarifying-questions block, opens in
     the user's default mail client
   - New `listing_outreach` table tracks status:
     `drafted → sent → replied / no_response / archived`

4. **Listing preview route + public-page leak fix** (PR #4)
   Spec: `handoff/briefs/2026-05-LISTING_PREVIEW.md`
   - `/admin/listings/preview/[id]` renders any status with a
     sticky `PREVIEW · status · ← edit form` banner
   - Closed a latent bug: pending and rejected listings were
     previously viewable on the public `/listings/[id]` path by
     anyone with the UUID. They now 404.

5. **Image upload + Supabase Storage (Phase 1)** (PR #5)
   Spec: `handoff/briefs/2026-05-IMAGE_UPLOAD_AND_STORAGE.md`
   - Drag-drop hero / gallery / founder uploads from admin
   - `listing-media` Supabase Storage bucket, public-read policy
   - Public listing pages render the gallery with click-to-zoom
     lightbox, prev/next navigation, keyboard support
   - Founder portrait + note rendered alongside the editorial body
   - Hero images route through Vercel's image optimizer for fast
     CDN-served WebP variants
   - Phase 2 deferred: server-side resize, EXIF stripping,
     multi-resolution variants, alt-text capture in upload UI

6. **Gallery thumbnail blend** (PR #6)
   - Applied the site-wide `BlendOverlay` gradient to gallery
     thumbnails so they sit cleanly against the dark page
     background. No brief — small visual polish.

### Test coverage at session close

- node:test (`pnpm test:unit`): ~58 cases across
  `briefs/options`, `briefs/shortlist`, `listings/import-record`,
  `email/outreach`, `upload/storage`
- vitest (`pnpm test`): ~38 cases across `/admin/listings/import`,
  email templates, outreach modal, preview banner, single-image
  and gallery uploads, gallery lightbox

### Known gaps left at session close

- `NEXT_PUBLIC_CALENDLY_URL` env var still unset. Every "Speak to a
  planner" CTA renders the "calendar isn't live yet — email instead"
  fallback until Niels' Calendly is configured. No code change
  needed when it lands; just set the env var in Vercel and redeploy.
- One leftover test-fodder pending listing: Matetsi Victoria Falls
  (id `d97e32c6-3740-45b7-9808-98a6256df635`). Flip to approved or
  delete via admin.
- Phase 2 image work — server-side resize, EXIF stripping,
  responsive-size variants, alt-text capture — deferred.
- Operator outreach for the 15 Vic Falls + Hwange listings still
  to be sent. Mailto modal in admin is ready when Niels is.

### Briefs queued and not yet shipped

None as of session close. All briefs in `handoff/briefs/` carry a
SHIPPED header at the top of the file.

---

## 2026-05 — Earlier May work (pre-listings-pipeline)

Three briefs shipped earlier in May 2026, before the listings
publishing pipeline session above:

1. **Home CTAs + directory-era cleanup**
   Spec: `handoff/briefs/2026-05-HOME_CTAS_AND_DIRECTORY_CLEANUP.md`
   - Header CTA swap (Register → Start a brief), hero CTA reshuffle,
     "By hand" section moved up the home page
   - Rewrote `/submit` as an editorial "For operators — by invitation"
     page; deleted dead `CTASection` component
   - FAQ closing CTA repointed at `/plan`; "in the directory" line
     removed
   - Mobile drawer cleaned of "List your business" entry

2. **Footer copy + favicon hygiene**
   Spec: `handoff/briefs/2026-05-FOOTER_FAVICON_FIX.md`
   - Editorial footer brand block now reads in the new positioning
     ("A small collection of African safaris, by hand") — directory-
     era copy removed
   - Legacy `components/footer.tsx` deleted; admin pages cleaned
   - Favicon hygiene confirmed (was a cache issue, not a build problem)

3. **Phase 2 — better intake, results, and CTAs (`/plan` rebuild)**
   Spec: `handoff/briefs/2026-05-PHASE_2_INTAKE_AND_RESULTS.md`
   - Eight-step structured intake replacing the free-form brief form
   - Interim results screen at `/plan/sent` with editorial summary +
     deterministic shortlist of kept-list operators
   - Calendly modal wired in from home, /plan, /plan/sent, and
     listing-detail pages
   - "Add to a brief" CTA on listing-detail pages, pre-populating
     intake with the listing as context
   - "By hand" added to top nav between Destinations and Field notes
   - Schema additions to `briefs` table: months, intent, rhythm,
     quiet_markers, wildlife_priorities, duration, season_preference,
     budget_tier, source_listing_id
