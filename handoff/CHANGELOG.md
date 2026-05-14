# Changelog

Append-only record of significant work landed on `main`. Newest at top.

Where a PR was preceded by a brief in `handoff/briefs/`, that file is
referenced — it's the canonical spec for what was built and why.

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
