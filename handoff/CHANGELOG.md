# Changelog

Append-only record of significant work landed on `main`. Newest at top.

Where a PR was preceded by a brief in `handoff/briefs/`, that file is
referenced — it's the canonical spec for what was built and why.

---

## 2026-11-09 — Self-drive relaunch

**Brief:** `handoff/briefs/2026-11-SELF_DRIVE_PHASE_1.md`, then `handoff/relaunch/` (STRATEGY, DECISIONS, research, copy, design, marketing) (PR #21)

Safari Overland now plans and books **lodge-based self-drive journeys through southern Africa**: travellers drive themselves and stay at camps and lodges, not in rooftop tents. US and UK first. Every decision Dom made is logged at the top of `handoff/relaunch/DECISIONS.md`.

**What shipped.**
- **Routes:** `/routes` and three routes with animated scroll maps, day-by-day drive times and road surfaces, stays, practicalities and "from" prices:
  - Zimbabwe: Falls, Hwange, Matobo, US$3,050
  - Namibia: Kalahari to Etosha, US$2,800
  - Four corners: Falls, Chobe, Caprivi, US$2,900

  Prices are per person sharing, accommodation only; the costing is in `handoff/relaunch/ROUTE_COSTING.md`.
- **Ad landing pages:** `/self-drive/zimbabwe`, `/self-drive/namibia`, `/self-drive/botswana-zambia`.
- **Image-led redesign:** video heroes, a photo per day, and 45 licensed photos plus 6 clips. EXIF and GPS are stripped from all media, including the rhino images. Short on-image credits, with full licences on `/credits`.
- **Field Notes:** seven self-drive guides. 17 off-region notes deleted, each with a 308 redirect.
- **About and Southern Africa:** both rewritten. East, West and North Africa redirect to Southern Africa.
- **Brief form:** asks about driving experience, hours at the wheel and countries, with lodge-only budget bands.
- **Ad tracking:** cookie-free capture of the Google Ads click ID into the brief, for weekly offline-conversion upload (see `handoff/ANALYTICS.md`).

**Database, done on 9 Nov.** Linkwasha and Somalisa are set to `rejected`: they're private concessions that self-drivers can't drive into. The live collection is now Royal Chundu, Camelthorn Lodge and The Hide.

**Database, briefs migration (applied 9 Nov).** Dom ran `handoff/relaunch/GO_LIVE_MIGRATION.sql` in the Supabase SQL editor, because the Supabase CLI isn't installed on this machine. The twelve new `briefs` columns were confirmed through the REST API afterwards. It also widened the `budget_tier` check to allow `discuss`. Briefs choosing that option had been failing to save since May: the last brief in the table before this is dated 14 May 2026. The 42703/PGRST204 fallbacks in the submit route and the admin can now be removed.

**Lessons worth keeping.**
- **Don't share `.next` between servers.** Several `next dev` servers running from one worktree overwrote the `.next` that `next start` was serving. Run one server per worktree, or build to a separate output directory.
- **gh doesn't install on this macOS.** It has no Homebrew bottle for macOS 27. Pushes work over SSH (`git@github.com:domdocs/safarioverland.git`), and PRs are opened from the GitHub link.
- **The apex domain is primary (Dom, 9 Nov).** `safarioverland.com` serves the site. `www.` and `http://` each 308-redirect to it in one hop, matching the canonicals and the sitemap. That morning the apex had been redirecting to `www`; it was changed in Vercel → Domains, which the MCP tools can't edit.

---

## 2026-08-07 — Article images: upload path, attribution, hero URL validation

**Brief:** `handoff/briefs/2026-08-ARTICLE_IMAGES.md` (PR #19)

Third of three PRs shipped today; see the SSR entry below for the day's most significant finding.

Field notes could publish from the database but images had no way in. The article form offered a bare text input labelled "Hero image URL" with no validation, and `POST /api/admin/upload` accepted only `listing_id` or `itinerary_id`. The first published article proved the gap immediately: a Pexels *webpage* URL was saved as `hero_image`, the optimizer returned `400 INVALID_IMAGE_OPTIMIZE_REQUEST`, and `og:image` pointed at an HTML page.

**Articles flavour on the upload route.** `POST /api/admin/upload` now takes `article_id` with slot `hero`, writing to `articles/[article_id]/hero/[uuid].webp` in the `listing-media` bucket. It runs through `processImageForUpload` exactly as the listings and itinerary flavours do — deliberately, and commented as such. **The pipeline strips EXIF, and geotagged photographs of rhino are a live poaching risk.** Any future article image path that skips EXIF-stripping is a defect, not an optimisation. Verified on the output rather than assumed: a source JPEG carrying fabricated camera tags and GPS coordinates came back out with neither.

**Uploader on the article form.** `SingleImageUpload` was generalised with an optional `ownerType: "listing" | "article"` prop rather than forked — roughly three lines against two hundred duplicated. Listing call sites unchanged. A collapsible manual-URL fallback remains for images already in the bucket. In create mode, where no article id exists yet, the uploader is replaced with a note to save as draft first; routines don't hit this because they POST first and upload against the returned id.

**Attribution.** `articles.image_attribution JSONB` added, mirroring `directory_listings`. The form writes `hero.credit`; the fuller `source` / `supplied_by` / `licence` / `granted_social_use` fields are for routines to populate later.

**Validation.** `hero_image` must be an absolute `https:` URL on a host in the image allow-list, or the API returns `400 invalid_hero_image` naming the problem. `next.config.mjs` and the API validator now read one shared constant (`lib/images/remote-patterns.mjs`) so the two cannot drift.

**Known follow-up not taken:** `lib/upload/storage.test.ts:148` asserts `ALLOWED_MIME` holds exactly three types; `image/avif` was added at some point without updating it. Failing on `main` before this PR. One-line fix.

---

## 2026-08-07 — Sitemap regression: field-note URLs restored

**Brief:** `handoff/briefs/2026-08-SITEMAP_FIELD_NOTE_URLS_HOTFIX.md` (PR #18)

PR #17 added `export const revalidate = 3600` to `app/sitemap.ts` so database content would stay fresh without a redeploy. That moved sitemap generation from build time to runtime — and `discoverFieldNoteUrls()` walked `process.cwd()/app/field-notes` on the filesystem. That directory exists during a build but not inside the deployed serverless function, so **all 57 hand-authored field-note URLs silently vanished from the live sitemap**. The database-driven branches were unaffected, which is why the listing URLs stayed.

Confirmed by measuring pre-merge production deployments, which still return 76 URLs with 57 field notes, against live production at 19 URLs with none.

Fixed by sourcing field-note routes from the generated `FIELD_NOTE_DATES` map (`lib/field-note-dates.ts`) instead of walking the filesystem — a static import that works at runtime, and one already maintained by `scripts/gen-field-note-dates.mjs`. `revalidate = 3600` kept. Side benefit: field-note URLs now carry per-page `lastModified`, which the filesystem walk never supplied.

**Lesson worth keeping.** Preview deployments still reported 76 URLs throughout, because they were serving their build-time prerender; only production had regenerated at runtime. **A healthy preview is not evidence for anything that depends on runtime behaviour — verify on production.** The same trap applies to any `process.cwd()` or `fs` access reached from a route with `revalidate`, `force-dynamic`, or a dynamic segment. One other instance exists: `lib/images/blur.ts:50` reads from `public/` and is reached from the homepage, which has `revalidate = 60`. Checked on live production and it is working — the blur placeholder is a real 350-character data-URI, not the transparent fallback — so `/public` is evidently included in Vercel's output tracing. Left alone, but it depends on Vercel behaviour rather than anything we control.

---

## 2026-08-07 — Field Notes from the database, and a site-wide SSR regression fixed

**Brief:** `handoff/briefs/2026-08-FIELD_NOTES_DB_RENDERER.md` and `handoff/briefs/2026-08-FIELD_NOTES_RENDERER_FIXES.md` (PR #17)

**The headline is not the renderer.** While building it, `components/supabase-provider.tsx` was found to contain an `if (!supabase) return null` gate that caused React to bail the entire subtree to client-side rendering. The effect was site-wide and had been live since the provider was introduced: **every page was serving crawlers an empty shell** — no `<h1>`, no `<h2>`, and none of the page-level `Article` or `BreadcrumbList` JSON-LD that SEO Brief 1 and the E-E-A-T work exist to produce. Only the global `Organization` / `WebSite` block from the layout survived.

Measured on live production before and after:

| Page | Before | After |
|---|---|---|
| `/field-notes/planning-guides/what-to-pack` | `h1=0 h2=0`, no `Article` JSON-LD | `h1=1 h2=7`, `Article` + `BreadcrumbList` |
| `/field-notes` | `h1=0 h2=0` | `h1=1 h2=7` |
| a listing detail page | `h1=0 h2=0` | `h1=1 h2=2` |

Nothing calls `useSupabase()` anywhere, so the provider now renders children with `value={undefined}`. **Consider deleting the provider outright** — it is dead code holding a wrap in `app/layout.tsx`.

Every listing page carried this too. It is a plausible explanation for why the SEO work of May 2026 may not have moved anything: the markup was correct and crawlers were not receiving it in the first pass.

**The renderer itself.** `app/field-notes/[slug]/page.tsx` renders `articles` rows: async params, `notFound()` when `status !== "published"` in both `generateMetadata` and the page body, explicit `Byline` / `ArticleJsonLd` / `Breadcrumbs`, `react-markdown` + `remark-gfm` via a new `components/ArticleBody.tsx`. Deliberately one level deep — `[category]/[slug]` would let the static `planning-guides` directory shadow every database article beneath it. Reserved-slug guard rejects `conservation`, `faqs`, `planning-guides`, `safety-tips`, `seasonal-guides`, any of which would otherwise become silently unreachable. The 58 hand-authored pages are untouched and unchanged.

**Also fixed in the same PR:** `category` was required by the database but optional in the zod schema, surfacing as an opaque `500 create_failed / "Unknown error"`; it is now `z.enum(ARTICLE_CATEGORIES)` and create failures carry the real Postgres message. `revalidate = 3600` added to `app/sitemap.ts` and `app/field-notes/page.tsx` — see the sitemap entry above for the regression that caused.

**First article published.** `hwange-community-rhino-conservation` — the Hwange Community Rhino Conservation Initiative — drafted in Cowork, pushed via the admin API, held at `status='draft'` until reviewed, then published. Four internal listing links carried in `related_listing_ids`. The first content the `articles` table has ever held.

**Known follow-ups.**
- **Soft 404** — `/field-notes/[slug]` and `/listings/[id]` return HTTP 200 with not-found content. Pre-existing, affects both routes, own PR. No content leaks; drafts are correctly hidden.
- **`revalidatePath` on publish** — a published field note is missing from `/field-notes` and `/sitemap.xml` for up to an hour. Felt twice in one day.
- **Listing structured data** — no `Product` / `LodgingBusiness` schema on listing pages. Invisible while nothing server-rendered; now a cheap win on the highest-value pages.

---

## 2026-05-21 — Migrated to external SSD + GitHub backups for Vercel-only repos

**Workspace move.** All projects migrated from iCloud Drive to the Crucial external SSD. Repo now lives at `/Volumes/Dom Crucial/Projects/safari-overland/`. iCloud was actively fighting git operations all session — stale lock files, vanishing files, conflict copies — so safari-overland was cloned fresh from `origin/main` onto the SSD rather than copied across. The iCloud copy is untouched as a 24–48-hour safety net before deletion.

**GitHub backups created for previously local-only repos.** Created `domdocs/mosi`, `domdocs/probita-iq`, `domdocs/v0-project-new` (all private) and pushed all uncommitted work as Checkpoint commits. Previously these existed only on local disk despite being Vercel-deployed.

**Vestigial stub removed.** `Probita IQ/probitaiq/` — a 79-byte empty git stub unrelated to the actual project — deleted as part of the GitHub backup work.

**SEO Brief 3 (content rewrites) — REJECTED.** External audit produced off-brand content that misread Safari Overland's voice and business model. PR closed, branch deleted, brief archived at `handoff/briefs/2026-05-SEO_CONTENT_REWRITES.md` with REJECTED header. Future content work happens inside Cowork rather than via external audit handoffs.

**Tooling notes for next session.**
- Node 20.19.6 + pnpm 10 (NOT pnpm 11, which requires Node 22+).
- Run `pnpm approve-builds` once to allow puppeteer/sharp/esbuild install scripts (required for Trip Designer PDF generation).
- The `gh` CLI is installed and authenticated as `domdocs`.
- Future task: upgrade Node 20 → 22+ (Node 20 is now EOL) and then optionally re-upgrade pnpm to 11.

## 2026-05-19 — Hidden-costs canonical fix

**Standalone follow-up to SEO PR #14** — merged same day, small
single-bug fix.

`app/resources/planning-guides/hidden-costs/page.tsx` was a
`"use client"` component and therefore couldn't export `metadata`,
which meant it inherited the parent layout's canonical
(`/resources`) instead of its own
(`/resources/planning-guides/hidden-costs`). Fixed by splitting:

- `hidden-costs-content.tsx` — the original client component,
  renamed verbatim, all 1052 lines preserved and untouched
- `page.tsx` — new server-component wrapper, exports `metadata`
  with the correct canonical, default-exports a function that
  renders `<HiddenCostsContent />`

Standard Next.js pattern for "big client component that also
needs page-level metadata." Closes follow-up item #2 from the
SEO PR.

The three remaining SEO follow-ups (success-stories pages on the
bespoke layout, weak meta descriptions across resource pages, full
related-content sweep) still belong in Brief 3.

---

## 2026-05-19 — Technical SEO (Critical & High-Priority)

**SEO Brief 1 — Critical & High-Priority Technical Fixes** (PR #14)
Spec: `handoff/briefs/2026-05-SEO_CRITICAL_AND_HIGH_PRIORITY.md`

Template-level SEO fixes that apply across every page on the site.
Composed by Dom from an external audit; brief annotated in Cowork
with codebase-specific context (URL structures, content loader names,
editor identity, social handles, style tokens) before handing to Code.

### Shipped

- **Title-tag duplication fixed.** `metadata.title.template` in
  `app/layout.tsx` kept; redundant `" | Safari Overland"` suffixes
  stripped from individual page titles. View source on `/about`,
  `/categories`, `/destinations`, `/resources`, `/plan` shows exactly
  one suffix per title.
- **Global structured data shipped.** `components/JsonLd/GlobalJsonLd.tsx`
  emits an Organization + WebSite `@graph` block site-wide via
  `app/layout.tsx`. Cross-referenced `@id`s; `SearchAction` wired to
  `/search?q=...`. Logo points at
  `/images/logo/safari-overland-horizontal-600.png`. Validates clean
  at validator.schema.org.
- **BreadcrumbList schema + visible breadcrumb UI.**
  `components/JsonLd/BreadcrumbsJsonLd.tsx` and
  `components/Breadcrumbs.tsx` use the existing brand tokens
  (`.eyebrow`, `text-bone-mute`, `text-amber` hover). Wired onto
  every non-homepage page.
- **Sitemap rebuilt.** Replaced the static `public/sitemap.xml` with
  dynamic `app/sitemap.ts`. Pulls approved listings from
  `getListings()`, active categories from `getActiveCategories()`,
  hand-enumerates destination regions and field-note pages. Admin and
  utility paths excluded. Sitemap count materially larger than the
  prior 13 URLs.
- **Canonical tags on every page.** Static pages set
  `metadata.alternates.canonical`; dynamic routes generate canonical
  via `generateMetadata({ params })`. One canonical per page,
  verified on five page types.
- **E-E-A-T author/dateline layer.** Editor data structure for Niels
  van de Meer added (photo and LinkedIn omitted pending Dom's supply
  — degraded gracefully). `components/JsonLd/ArticleJsonLd.tsx` emits
  Article + Person JSON-LD on field-note pages.
  `components/Byline.tsx` renders the visible byline under the H1.
  Article dates: file mtime via `fs.stat` at build time for
  `dateModified`; hard-coded `datePublished` per page (a TODO for
  Brief 3 graduation to per-page editorial metadata).
- **FAQ component built.** `components/FAQ.tsx` renders both visible
  `<details>` accordion UI and FAQPage JSON-LD. Wired only as a smoke
  test on `/resources/faqs` for this brief — sitewide wiring lives in
  Brief 3 alongside the content rewrites.
- **Contextual internal-link module.**
  `components/RelatedFieldNotes.tsx` and `components/RelatedListings.tsx`
  with hand-rolled topic-tag matching in `lib/content/related.ts`.
  Keyword-bearing anchor text. Wired as samples onto three pages —
  full sweep in a follow-up.

### Follow-up notes from Code

Four items worth tracking for subsequent briefs:

1. **17 `app/resources/conservation/success-stories/*` pages use a
   bespoke layout** instead of the `GuidePage` component. The byline,
   ArticleJsonLd, and breadcrumbs work didn't reach them. Falls into
   Brief 3 (content rewrites) when those pages get the editorial pass.

2. **`app/resources/planning-guides/hidden-costs/page.tsx` is a
   client component** (`"use client"`) and therefore can't export
   `metadata`. It inherits the layout's canonical (`/resources`)
   which is wrong. Small fix: extract a server wrapper that exports
   `metadata` and passes children to the client component. Discrete
   bug; doesn't need to wait for Brief 3.

3. **Weak / missing meta descriptions** on several resource pages.
   Brief 3 (content rewrites).

4. **Related-content modules wired onto only 3 pages as samples.**
   Full sweep across every destination, category, and field-note
   page is either a quick follow-up brief or naturally part of
   Brief 3.

### Editor data supply gap

The byline degrades gracefully when `editor.photo` is null and
`editor.sameAs` is empty. Both are flagged for Dom to supply:

- Niels' professional headshot (square crop, ≥600×600px). Drop in
  `/public/team/niels.webp` once available.
- Niels' LinkedIn URL for the `sameAs` array on the Person JSON-LD.
- Confirmation that `https://www.instagram.com/safarioverland` exists
  for the Organization `sameAs` (or the actual handle if different).

Until supplied, the photo is omitted and `sameAs` is left empty
rather than scaffolded with placeholders.

### Known gaps left at session close

(In addition to the four follow-up notes above)

- `NEXT_PUBLIC_CALENDLY_URL` still unset.
- Matetsi pending test row still in admin.
- Templates library still deferred (Trip Designer scope).
- Legacy-directory copy sweep — status to be verified via `git log`.

### Briefs queued and not yet shipped

- **Brief 2** — net-new pages (not yet written)
- **Brief 3** — page content rewrites + meta-description sweep +
  full related-content wiring (not yet written)
- Optional follow-up: hidden-costs canonical fix (discrete bug;
  doesn't need a full brief)

---

## 2026-05-19 — Trip Designer Phase 5 merged

**Trip Designer — Phase 5** (PR #13)
Branch (now merged): `feature/trip-designer-phase-5`
Spec: derived from `handoff/SCOPE_TRIP_DESIGNER.md` Phase 5 outline
(no separate brief).

Closes the Trip Designer loop. With this PR merged, the staff-side
itinerary builder is complete end-to-end: a curator can compose,
preview, generate a PDF, publish to a stable customer URL, and
clone the trip for next season.

### Shipped

- **Publish workflow with immutable snapshots.** New
  `itinerary_snapshots` table copied at publish time; `is_current`
  flag on the active snapshot per slug. `/trips/[slug]` reads
  snapshots, never live tables — so editing a published itinerary
  doesn't change what the customer sees until you re-publish.
  Re-publishing keeps the same slug (stable customer URL) and
  flips the previous `is_current` snapshot to false.
- **Public read-only URL** `/trips/[slug]` — no auth, renders the
  editorial design from the snapshot. Slug minted from the trip
  reference + guest lastname; stable across re-publishes.
- **Theme picker UI** in the admin editor. Palette
  (savanna/forest/coast), typography (editorial/modern/classic),
  and density (spacious/compact) all exposed, with "(default)"
  labels nudging curators to leave savanna / editorial / spacious.
  The forest/coast palettes and modern/classic type pairings work
  but haven't been visually QA'd at PDF fidelity — expect rough
  edges if a curator switches them.
- **Duplicate trip** → clones a published itinerary into a fresh
  draft with a new reference. Photos copy across; status resets to
  `draft`. Used for "this year's Botswana trip is mostly the same
  as last year's."
- **Pre-flight validation on publish** (`lib/itineraries/preflight.ts`)
  rejects publishing if: no cover photo, zero chapters, any chapter
  missing coords/dates/epigraph/intro/hero, any transit still
  showing placeholder values (`Transfer` / `TBD` /
  `To be specified.`), or transit count out of sync with chapter
  count. Errors render inline on the editor; user fixes and re-tries.
- **Migration applied:** `supabase/migrations/20260517_itinerary_publishing.sql`.

### Known gaps left at session close

- **Templates library** — the final deferred item from the original
  Trip Designer scope. Recommended approach: write a brief after
  the team has run the publish flow on a few real trips and knows
  which chapter/trip shapes get reached for repeatedly. Scope
  sketch in `handoff/briefs/2026-05-TRIP_DESIGNER_HANDOFF.md` §7.
- `NEXT_PUBLIC_CALENDLY_URL` still unset (carry-over from prior
  sessions).
- Matetsi pending test row
  (`d97e32c6-3740-45b7-9808-98a6256df635`) still in admin.
- Legacy-directory copy sweep — flagged in the 2026-05-18 entry —
  status as of this entry is whatever you committed in the
  intervening hours; check git log.

### Briefs queued and not yet shipped

None.

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

### Phase 5 — merged the following day

Phase 5 (publish workflow + snapshots + public URL + theme picker +
duplicate + preflight) shipped as PR #13 on 2026-05-19. See the
entry above for the detail.

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
