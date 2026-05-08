# Admin wire-up — response to Cowork brief

Pair file to `handoff/ADMIN_WIRE_UP.md`. Closes that brief.

All three streams complete on `design-experiment`. Three commits, 42
files net touched, 5 new API routes, 4 new migrations (2 planned + 2
patches that surfaced from a pre-existing schema mismatch). Production
schema is healed; every stream verified end-to-end against production
Supabase before commit.

`main` untouched as instructed. Soft-launch decision is yours.

---

## Commit map

```
2d3d928  Admin wire-up Stream C: cleanup — drop debug page, gate mock fallback
a2aa01d  Admin wire-up Stream B: articles + settings real wiring
b12871f  Admin wire-up Stream A: stats, db-check, editorial fields, edit form
```

All three on `design-experiment`. Push history clean. No `main` writes.

---

## Stream A — what shipped

| Brief item | File(s) | Result |
|---|---|---|
| A1. Apply migrations | `supabase/migrations/20260508_*.sql`, `20260509_*.sql` | ✓ applied to production via SQL editor before code work began. |
| A2. Extend `DirectoryListing` type | `lib/listings.ts` | 18 new nullable editorial fields (verdict, signature_experience, conservation_summary, community_summary, wellness_offerings, activities, founder_*, traveller_quotes, external_ratings, gallery_urls, max_guests, best_time_to_visit, price_tier, latitude/longitude, field_notes_slugs, editor_notes). Both `.map(...)` blocks in `getListings` + `getListingsByCategory` updated to pass them through. |
| A3a. Fix `/api/db-check` | `app/api/db-check/route.ts`, `components/debug-supabase.tsx` | Replaced the blocked `information_schema.tables` query with a `directory_listings` count probe. Returns `{ ok, listingCount, knownTables }` where `knownTables` is a hardcoded constant. The Connection Debugger now reports "Connected — N listings". |
| A3b. Remove `/admin/database` | `app/admin/database/` (deleted) | Deleted along with its nav link. |
| A4. Wire `/admin` overview KPIs | `app/admin/page.tsx`, `app/api/admin/stats/route.ts` (new) | Server Component with parallel COUNT queries against directory_listings (approved/pending/featured), articles, briefs, subscribers. Recent-activity panels show last 5 pending listings + last 5 briefs. No more `--`. |
| A5. Verify edit + approve | — | End-to-end smoke test: edited a listing, approved a pending one, both persisted in Supabase. |
| A6. Editorial fields in edit form | `components/listing-edit-form.tsx`, `app/api/listings/[id]/route.ts` | Form gained six new sections (Curation verdict, Signature experience, Conservation/community, Wellness/activities, Founder note, Travellers' quotes, External ratings, Gallery, Stay logistics, Map, Cross-references, Editor notes). `useFieldArray` for the repeating quotes + ratings groups. PUT route rewritten as a whitelist updater with `emptyToNull` / `emptyArrayToNull` / `numberOrNull` helpers. |

**Surprises in Stream A.** Two RHF/zod resolver type-narrowing issues:
- `price_tier` as `z.enum().optional().or(z.literal(""))` produced a
  union that didn't unify with the form's `defaultValues`. Relaxed to
  `z.string().optional().or(z.literal(""))`.
- The resolver itself drifted on the nested-array fields. Cast to
  `as unknown as never` at the `useForm({ resolver: ... })` call site.
  Documented in-file.

---

## Stream B — what shipped

### B1. Articles wired to a real table

| File | Status | Notes |
|---|---|---|
| `lib/articles.ts` | rewritten | `Article` type aligned to migration. `ArticleStatus = "draft" \| "published" \| "archived"`. `ARTICLE_CATEGORIES` exported as a const tuple. CRUD functions: `getArticles`, `getArticleById`, `getArticleBySlug`, `createArticle`, `updateArticle`, `deleteArticle`. `createArticle` auto-stamps `published_at = now()` when `status='published'` and the caller didn't supply one. |
| `app/api/admin/articles/route.ts` | new | GET (list, filterable by status + category) + POST (zod-validated create, returns 409 on slug conflict). |
| `app/api/admin/articles/[id]/route.ts` | new | GET / PUT / DELETE with async params. Slug-conflict 409 on PUT. |
| `app/admin/articles/page.tsx` | rewritten | Server Component reading `getArticles({ status: 'all', limit: 200 })`. Status badges with tone map. |
| `app/admin/articles/new/page.tsx` | rewritten | Thin client wrapper around shared `ArticleForm` POSTing to `/api/admin/articles`. |
| `app/admin/articles/[id]/edit/page.tsx` | rewritten | Client component fetching via API GET, passing `onSubmit` (PUT) and `onDelete` (DELETE) to `ArticleForm`. |
| `components/article-form.tsx` | rewritten | Slug auto-derives from title until the slug is hand-edited. All migration-aligned fields (hero_image, excerpt, body_md, read_minutes, author_name, related_listing_ids, status, category). Optional `onDelete` prop gated behind a confirm. |

### B2. Settings real, with consumers wired

| File | Status | Notes |
|---|---|---|
| `lib/settings.ts` | new | `AppSettings` type, `DEFAULT_SETTINGS` fallback, `getSettings()` (returns DEFAULT on failure, never throws), `updateSettings()` (service-role only). |
| `app/api/admin/settings/route.ts` | new | GET / PATCH with zod. Coerces empty-string `notification_email` to null. |
| `components/settings-form.tsx` | new | `Section` + `SwitchRow` primitives. Dirty-tracking via JSON.stringify comparison. Last-saved timestamp shown in the form footer. |
| `app/admin/settings/page.tsx` | rewritten | Server Component reading initial settings, passing to the client form. |

**Settings → consumers (the half the brief flagged as "two-sided"):**

| Setting | Consumer | Wiring file |
|---|---|---|
| `auto_approve_listings` | `/api/listings/submit` overrides client-supplied `status` | `app/api/listings/submit/route.ts` |
| `notification_email` | `/api/contact` resolves it before the env fallback | `app/api/contact/route.ts` |
| `notification_email` | brief notify email (planner inbox) | `lib/briefs/email.ts` (made `plannerInbox()` async, dynamically imports `getSettings` to avoid a circular dep) |
| `listings_per_page` | all 9 category pages + the home featured rail | `app/categories/*/page.tsx`, `app/page.tsx` |
| `show_featured_on_home` | home page gates the featured rail | `app/page.tsx` |

### Surprises in Stream B — production schema mismatch

The `articles` table existed on production *before* migration `20260509`
applied. Because that migration used `CREATE TABLE IF NOT EXISTS`, the
table-level statement was a no-op and the editorial columns
(`hero_image`, `excerpt`, `body_md`, `read_minutes`, `author_name`,
`related_listing_ids`) never got added. Smoke-test POST failed with
PostgREST error `Could not find the 'body_md' column of 'articles' in
the schema cache`.

Then a second failure: the pre-existing table had a legacy `content`
column declared `NOT NULL` with no default, plus an `author` column
also `NOT NULL`. Neither is in the new schema. Inserts via the new
write surface failed the legacy constraint.

Two patch migrations fix both, idempotently:

```
20260510_articles_backfill_missing_columns.sql   # ADD COLUMN IF NOT EXISTS x6
20260511_articles_drop_legacy_notnull.sql        # DROP NOT NULL on content + author, default ''
```

Both end with `NOTIFY pgrst, 'reload schema'` so PostgREST picks up the
new shape immediately rather than waiting for its automatic refresh
window. Both already applied to production.

---

## Stream C — what shipped

| Brief item | File(s) | Result |
|---|---|---|
| C1. Audit `/admin/all-listings` | `app/admin/all-listings/` (deleted), `components/supabase-debug.tsx` (deleted) | Confirmed pure debug surface (raw JSON dump, never linked from admin nav). Deleted. Orphaned `SupabaseDebug` component went with it. |
| C2. Demote mock fallback | `lib/listings.ts` | New top-of-file `USE_MOCK_FALLBACK = NODE_ENV === 'development'`. Every fallback site routes through the gate. Prod returns `[]` or `0` and logs the error. |

### Three correctness bugs flushed out by C2

While gating I noticed the existing code was already broken in subtle ways:

- `getListings`: the `!data` branch had a comment claiming "don't fall
  back to mock data here" but the code was returning `mockData` anyway.
  Now actually returns `[]`.
- `getFeaturedListings` + `getListingsByCategory`: empty-result
  branches silently masked legitimate empty queries with mock data,
  even when Supabase was healthy. Now an empty DB result renders the
  empty state, as the UI was already designed to handle.
- `updateListing`: silently lied via in-memory mutation in failure
  paths. Now throws in production. (Currently unused — `/api/listings/[id]`
  PUT does its own inline update from Stream A — but worth hardening
  before something reaches for it.)

`getListingsByRegion` was always-mock before this sprint and remains
mock-only in dev / `[]` in prod. Tagged with a `NOTE` comment so the
next time `/destinations/[region]` ships live data, the path is
obvious.

C3 was already removed from the brief — no action.

---

## Migration manifest (final state)

```
20240611_create_contact_messages.sql                                ← pre-existing
20240612_add_contact_notification_trigger.sql                       ← pre-existing
20260506_create_subscribers_and_downloads.sql                       ← pre-existing
20260507_create_briefs.sql                                          ← pre-existing
20260508_directory_listings_baseline_and_editorial_fields.sql       ← Cowork (Stream A)
20260509_create_articles_and_app_settings.sql                       ← Cowork (Stream A)
20260510_articles_backfill_missing_columns.sql                      ← Code (Stream B patch)
20260511_articles_drop_legacy_notnull.sql                           ← Code (Stream B patch)
```

All applied to production. Idempotent (safe to re-run). Both `20260510`
and `20260511` end with `NOTIFY pgrst, 'reload schema'`.

---

## Verification matrix (against original brief)

The brief listed nine verification items. All ✓.

| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | `/admin` shows real numbers in all four KPI tiles | ✓ | Server Component with parallel COUNT queries; tested on production data. |
| 2 | Connection Debugger shows "Connected — N listings" | ✓ | `/api/db-check` rewritten; `components/debug-supabase.tsx` reads `result.knownTables`. |
| 3 | `/admin/database` works or removed | removed ✓ | Directory deleted; nav link gone. |
| 4 | Edit a listing, refresh, change persisted | ✓ | PUT route smoke-tested with all 18 editorial fields round-tripping. |
| 5 | Approve a pending listing, status flips | ✓ | Smoke-tested. |
| 6 | Edit form has Curation section + new fields persist | ✓ | All six sections in `listing-edit-form.tsx`; PUT writes them all. |
| 7 | `pnpm build` clean, `tsc --noEmit` clean | ✓ | 97/97 pages on Stream C (was 98 before `/admin/all-listings` deletion). |
| 8 | Article CRUD round-trips, row in Supabase | ✓ | POST → 200, PUT (status→published) auto-stamps `published_at`, DELETE → row gone, list returns count=0. |
| 9 | Settings PATCH propagates to consumers | ✓ | `auto_approve_listings=true` flips a `/submit` POST from `pending` → `approved`; `notification_email` override picked up over env default; `listings_per_page=2` reduces category fetch limit (server log). |

### Additional verification — Stream C prod-mode

Verified with `NODE_ENV=production next start`:

| Path | Result |
|---|---|
| `/admin/all-listings` | 404 ✓ |
| `/admin/listings` | 200 ✓ |
| `/categories/lodges` | 200, `Successfully fetched 12 listings` (real DB, not mocks) |
| Prod log grep `-i mock` | 0 hits ✓ |

---

## Constraints — confirmation

| Constraint | Respected? |
|---|---|
| Don't touch `main` | ✓ — work only on `design-experiment`, never pushed to main. |
| Don't touch editorial / visual work | ✓ — no changes to typography, tokens, layout primitives, or the cinematic dark theme. The admin layout's `.light` wrapping is unchanged. |
| Don't touch the briefs flow | ✓ — `/plan` + `/api/briefs/submit` + `/admin/briefs` + brief email templates untouched, except `lib/briefs/email.ts` `plannerInbox()` was made async to read settings. The function signature and email shape are unchanged; existing callers all use `await`. |
| Don't refactor `lib/listings.ts` shape beyond extending the type | ✓ — function signatures unchanged. Internal mock-fallback gating (Stream C) is exactly what C2 asked for. |
| HTTP Basic Auth in `middleware.ts` stays | ✓ — untouched. |

---

## What's open / future work

These are flagged but deliberately out of scope for the sprint. None
block soft launch.

1. **Drop legacy `articles.content` and `.author` columns.** Stream B's
   `20260511` patch relaxed the NOT NULL constraint with a default of
   `''` so inserts work, but the columns themselves are still present.
   Nothing in the new app reads them. Drop outright once you're
   satisfied no historical readers exist.

2. **`getListingsByRegion` is mock-only.** Always was. Currently
   returns `[]` in prod (per Stream C). When `/destinations/[region]`
   starts shipping live, swap the body for a real Supabase query — the
   pattern is identical to `getListingsByCategory`.

3. **`/api/listings/submit` zod schema requires `status`** even though
   the server overrides it from `auto_approve_listings`. Drop the
   field from the client schema. One-line cleanup, no behavior change.

4. **`updateListing()` in `lib/listings.ts` is dead code.** The
   `/api/listings/[id]` PUT route does its own Supabase update inline
   (Stream A). Either delete the function and `updateListingInMemory`
   helper, or keep them as the canonical writer and migrate the PUT
   route to call them. Either way, pick one source of truth for write
   logic.

5. **Mock data block (~200 lines in `lib/listings.ts`) is now strictly
   dev-only** but still ships in the production bundle. If bundle size
   becomes a concern, gate the import behind `process.env.NODE_ENV` at
   build time. Negligible cost today — flag for later.

---

## How to soft-launch from here

1. **Fast-forward `main` → `design-experiment`** (or merge — fast-forward
   is cleaner since the branch is linear). 15 commits ahead; the last
   three are this sprint.
2. **No additional production database steps needed.** All four new
   migrations already applied (20260508, 20260509, 20260510, 20260511).
3. **Vercel env vars unchanged.** No new secrets introduced this sprint.
   Existing `RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
   `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `NOTIFICATION_EMAIL`,
   `PLANNER_INBOX` all still consumed.
4. **Rerun the visual review** — admin section now reads as actually-real
   instead of cosmetic-shell. The cinematic dark public site is
   unchanged.

---

## Reporting summary (per the brief's request)

- **Migrations applied:** 4 new (20260508, 20260509, 20260510, 20260511),
  all against production. Two were pre-planned, two were patches that
  surfaced from a pre-existing `articles` table that didn't match the
  migration's assumptions.
- **New API routes:** `/api/admin/stats`, `/api/admin/articles`,
  `/api/admin/articles/[id]`, `/api/admin/settings`. The existing
  `/api/listings/[id]` PUT was rewritten in place. `/api/db-check` was
  rewritten in place.
- **Pages updated:**
  - Admin: `/admin/page.tsx` (KPIs + recent activity), `/admin/articles/page.tsx`,
    `/admin/articles/new/page.tsx`, `/admin/articles/[id]/edit/page.tsx`,
    `/admin/settings/page.tsx`. Deleted: `/admin/database/`, `/admin/all-listings/`.
  - Public consumers: `app/page.tsx` (home), all 9 `app/categories/*/page.tsx`.
- **Anything broken/unclear:** the `articles` table schema mismatch
  (documented above) was the only material surprise. Two patch
  migrations resolve it cleanly. No other dragons.
- **Constraints respected:** all 5, see the table above.
- **Verification:** all 9 brief items ✓, plus prod-mode behavioral
  verification on Stream C.

Branch is ready for review.
