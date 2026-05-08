# Admin wire-up — Claude Code handoff

The admin section looks complete but is largely cosmetic. This brief
maps what is real, what is mock, and what to fix — in the order it
needs fixing.

Pair with `handoff/LISTINGS_AUDIT.md` (the rubric our staff will use)
and `handoff/BRAND_VOICE.md` (the editorial register).

Do this on `design-experiment`. Do not merge to main.

---

## Audit findings (state of the world)

### What actually works

| Surface | Status | Notes |
|---|---|---|
| `lib/listings.ts` data layer | **Real** | `getListings`, `getFeaturedListings`, `getListingById`, `getListingCount` all query Supabase first; mock data is fallback only. |
| `directory_listings` table | **Real, undocumented** | Created manually in Supabase dashboard, seeded from `public/directory_listings_rows.csv` (24 rows). No migration in source until now. |
| `/admin/listings` (manage) | **Real** | Lists approved rows from Supabase, paginates correctly. |
| `/admin/pending` | **Real** | Lists pending rows from Supabase. |
| `/admin/listings/edit/[id]` | **Real** but unverified | Form posts to `PUT /api/listings/[id]`, which does update Supabase. The user reports edit "doesn't work" — needs end-to-end verification. |
| `/api/listings/[id]` PUT | **Real** | Working updater. |
| `/api/listings/[id]/approve` POST | **Real** | Working approval. |
| `/admin/subscribers` | **Real** | Phase 4-era; queries `subscribers` and `download_events`. |
| `/admin/briefs` | **Real** | Phase 4 — confirmed end-to-end. |

### What is mock or broken

| Surface | Status | Why |
|---|---|---|
| `/admin` overview stats | **Hardcoded `--`** | No API; numbers never fetched. |
| `/admin` Connection Debugger | **Misleading** | Backend (`/api/db-check`) succeeds on the first query but then queries `information_schema.tables` via PostgREST, which is blocked by default — returns 500 with "Failed to connect to Supabase: ...". The connection itself is fine. |
| `/admin/database` | **Broken** | Same `information_schema.tables` mistake; this page never returns table names. |
| `/admin/articles` + `/admin/articles/new` + `/admin/articles/[id]/edit` | **Pure mock** | File-level comment: *"Temporary mock data until we set up proper data storage."* Two hardcoded articles. No DB, no migration, no API. |
| `/admin/all-listings` | **Unknown** — likely duplicate/stub of `/admin/listings`. Audit and consolidate. |
| `/admin/settings` | **Read-only** | Banner already says *"Settings are read-only for now — persistence isn't wired up yet."* |
| `/admin/database` info-schema query | **Always 500** | Same root cause as the debugger. |
| `articles` table | **Does not exist** | No migration. |
| `app_settings` table | **Does not exist** | No migration. |
| Admin auth | **HTTP Basic** via `middleware.ts`. Working. Don't touch. |

### Migrations summary

Before this session there were four:

```
20240611_create_contact_messages.sql
20240612_add_contact_notification_trigger.sql
20260506_create_subscribers_and_downloads.sql
20260507_create_briefs.sql
```

Two new ones added in this Cowork session, ready to apply:

```
20260508_directory_listings_baseline_and_editorial_fields.sql
20260509_create_articles_and_app_settings.sql
```

Read them. They are idempotent (safe to run on virgin or production
DB). The first brings `directory_listings` under version control AND
adds editorial / transformational fields (verdict, signature
experience, conservation/community summaries, wellness offerings,
founder story, traveller quotes, external ratings, gallery, etc.).
The second creates `articles` and `app_settings`.

**Note on a third file**:
`20260508_directory_listings_baseline_and_curation.sql` is a no-op
stub — an earlier draft introduced a six-criterion scoring rubric
that proved over-engineered for the actual workflow. The user can
delete it from Finder when convenient. The replacement is the
`...editorial_fields.sql` file above.

---

## Stream A — Critical (fix before staff start the audit)

### A1. Apply the two new migrations against production Supabase

```
supabase/migrations/20260508_directory_listings_baseline_and_curation.sql
supabase/migrations/20260509_create_articles_and_app_settings.sql
```

These add columns to `directory_listings` and create `articles` +
`app_settings`. All idempotent — re-running them is safe.

Apply via the Supabase dashboard SQL editor or the Supabase CLI:

```
npx supabase db push
```

Verify in the dashboard: `directory_listings` should now have ~18 new
nullable columns covering editorial layer (verdict, signature_experience,
conservation_summary, community_summary, wellness_offerings, activities,
founder_name/note/image_url, traveller_quotes, external_ratings,
gallery_urls, max_guests, best_time_to_visit, price_tier, latitude,
longitude, field_notes_slugs, editor_notes).

### A2. Update the `DirectoryListing` TypeScript type

File: `lib/listings.ts`

Add the new columns to the `DirectoryListing` type. Make all of them
optional (nullable) so existing rows continue to load:

```ts
export type DirectoryListing = {
  // …existing fields stay…

  // Editorial / transformational layer
  verdict?: string | null                 // one-sentence "we'd send this here" line
  signature_experience?: string | null
  conservation_summary?: string | null
  community_summary?: string | null
  wellness_offerings?: string[] | null    // yoga, spa, sound bath, …
  activities?: string[] | null            // walking, mokoro, sleep-out, …

  // Owner / founder story
  founder_name?: string | null
  founder_note?: string | null
  founder_image_url?: string | null

  // Social proof
  traveller_quotes?: { quote: string; attributed_to: string; trip_year?: number }[] | null
  external_ratings?: { source: string; rating: number; max?: number; count?: number; url?: string; fetched_at?: string }[] | null

  // Photography
  gallery_urls?: string[] | null

  // Practical
  max_guests?: number | null
  best_time_to_visit?: string | null
  price_tier?: "budget" | "mid" | "luxury" | "exclusive" | null
  latitude?: number | null
  longitude?: number | null

  // Cross-references
  field_notes_slugs?: string[] | null

  // Internal-only
  editor_notes?: string | null
}
```

Update the `getListings` mapping (around line 340) to surface these
new fields. They're nullable so existing data is unaffected.

### A3. Fix the Connection Debugger and remove the database viewer

The `information_schema.tables` query is the root cause of the user's
"Failed to connect to Supabase" report. Two specific fixes:

**Fix `/api/db-check/route.ts`** — replace the `information_schema`
query with a known-table count and return success based on that:

```ts
// Replace the broken information_schema query block with:
const { count, error: countError } = await supabase
  .from("directory_listings")
  .select("id", { count: "exact", head: true })

if (countError) {
  return NextResponse.json({
    success: false,
    connectionStatus: "Failed to connect: " + countError.message,
  }, { status: 500 })
}

return NextResponse.json({
  success: true,
  connectionStatus: `Connected. ${count ?? 0} listings in directory_listings.`,
  knownTables: ["directory_listings", "subscribers", "download_events", "briefs", "articles", "app_settings", "contact_messages"],
})
```

**Replace `/admin/database/page.tsx`** with a real, minimal data viewer
that uses the same approach — accept a hardcoded list of known tables,
let the user pick one, run `select * from <table> limit 100`. Don't
try to discover tables dynamically.

Or, simpler: delete `/admin/database/page.tsx` entirely and remove the
nav link to it from the admin sidebar/layout. The Supabase dashboard
already provides this viewer; we don't need to rebuild it.

### A4. Wire up `/admin` overview stats

The overview shows hardcoded `--` for Total Listings / Pending /
Featured / Categories. Build a real stats endpoint and consume it.

**Create `app/api/admin/stats/route.ts`** (Server Route):

```ts
import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function GET() {
  const supabase = getSupabaseServerClient()
  if (!supabase) return NextResponse.json({ error: "no client" }, { status: 500 })

  const [listings, pending, featured, briefs, subscribers] = await Promise.all([
    supabase.from("directory_listings").select("id", { count: "exact", head: true }).eq("status", "approved"),
    supabase.from("directory_listings").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("directory_listings").select("id", { count: "exact", head: true }).eq("featured", true),
    supabase.from("briefs").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
  ])

  return NextResponse.json({
    approved_listings: listings.count ?? 0,
    pending_listings: pending.count ?? 0,
    featured_listings: featured.count ?? 0,
    new_briefs: briefs.count ?? 0,
    subscribers: subscribers.count ?? 0,
    categories: 9, // from lib/category-tabs.ts; could derive at runtime
  })
}
```

**Update `app/admin/page.tsx`** to fetch this on mount (or use it as a
Server Component if simpler) and replace the `--` placeholders with
real numbers.

While you're there, give the dashboard a small "recent activity" panel
that shows the 5 newest pending listings + 5 newest briefs, linking to
the relevant detail pages. The data layer for both is already in place.

### A5. End-to-end verify the edit + approve flow

The user reports edit "doesn't work." The code path looks correct
on inspection (form → `PUT /api/listings/[id]` → Supabase update →
toast). Reproduce in dev:

1. `pnpm dev` with `.env.local` populated
2. `/admin/listings` → click Edit on any row
3. Change a field, hit Save
4. Confirm the toast appears
5. Confirm the field value persists (refresh the page)
6. Confirm the change is visible on the public listing page

If the form silently fails on submit, check the browser console — the
likeliest culprits are zod validation rejecting an existing value
(e.g. `website` URL that doesn't validate), or `useToast` import
shape. Fix accordingly.

Repeat for the approve flow on a `/admin/pending` row.

### A6. Update the listing edit form for the new editorial fields

File: `components/listing-edit-form.tsx`

Add new sections to the form covering all the editorial / transformational
fields. Group them logically — the existing form already has "Business
Information" and a few other sections. Suggested grouping:

**Section: Editorial**
- `verdict` — single-line input (one sentence; the "we'd send this
  here" line)
- `signature_experience` — textarea (one paragraph)
- `conservation_summary` — textarea (~200 chars)
- `community_summary` — textarea (~200 chars)
- `wellness_offerings` — multi-input (chips or comma-separated text
  parsed to array)
- `activities` — multi-input (same shape)
- `editor_notes` — textarea (internal only — say so in field help)

**Section: Founder story**
- `founder_name` — text input
- `founder_note` — textarea (~500 chars)
- `founder_image_url` — URL input

**Section: Reputation**
- `traveller_quotes` — repeating field group: each row has Quote
  (textarea), Attributed to (text), Trip year (number). "Add another"
  button. Stored as JSONB.
- `external_ratings` — repeating field group: each row has Source
  (TripAdvisor / Google / Booking.com / etc., free text), Rating
  (number), Max (number, default 5), Count (number, optional), URL
  (URL, optional), Fetched at (date, defaults to today). Stored as
  JSONB.

**Section: Photography**
- `gallery_urls` — repeating URL inputs (or paste-multiple). Each one
  validated as URL.

**Section: Practical**
- `max_guests` — number
- `best_time_to_visit` — short textarea (1–2 sentences)
- `price_tier` — dropdown: budget / mid / luxury / exclusive
- `latitude` / `longitude` — number inputs (6 decimal places)

**Section: Cross-references**
- `field_notes_slugs` — multi-input (chips). Each is the slug of a
  Field Notes article that mentions this stay.

Preserve the existing fields. Use the same shadcn form primitives
already in the file (Form, FormControl, FormField, Input, Textarea,
Select, etc.). For repeating field groups (traveller_quotes,
external_ratings), use react-hook-form's `useFieldArray`.

All fields are optional — Zod validation should mark every new field
as `.optional()` and the form should allow saving partial data
freely.

Update `lib/listings.ts` `updateListing` (or the PUT route) to
accept and persist these new fields.

---

## Stream B — Articles and settings (after Stream A)

### B1. Wire `/admin/articles` to the real `articles` table

**API routes to create:**

- `app/api/admin/articles/route.ts` — `GET` (list, with status filter), `POST` (create)
- `app/api/admin/articles/[id]/route.ts` — `GET` (single), `PUT` (update), `DELETE`

**Pages:**

- `app/admin/articles/page.tsx` — replace mock-data list with a fetch
  from `/api/admin/articles` (or use a Server Component reading
  Supabase directly)
- `app/admin/articles/new/page.tsx` — wire the form to `POST /api/admin/articles`
- `app/admin/articles/[id]/edit/page.tsx` — wire to `PUT /api/admin/articles/[id]`

The schema is already provisioned (see migration `20260509`). Match
the existing edit-listing form pattern; reuse shadcn primitives.

### B2. Wire `/admin/settings` to read/write `app_settings`

**API route:**

- `app/api/admin/settings/route.ts` — `GET` (returns the singleton row), `PATCH` (updates fields)

**Page:**

- `app/admin/settings/page.tsx` — remove the "read-only for now" banner;
  load values via Server Component or client fetch; on save, send a
  PATCH to the API.

**Consumer wiring** — the listings, email, and submission flows need
to consume the saved values. At minimum:

- `auto_approve_listings` → `app/api/listings/submit/route.ts` should
  set `status = 'approved'` instead of `'pending'` when this is true
- `notification_email` → used in any place currently referencing
  `process.env.NOTIFICATION_EMAIL` for contact-form / brief-notify
  emails. Falls back to env var if app_settings is missing.
- `listings_per_page` → page-size constant in `/admin/listings`,
  `/admin/pending`, `/categories/[category]/page.tsx`. Reads at request
  time.
- `notify_admin_on_new` / `notify_user_on_approval` → gate on these
  in `lib/email.ts` send paths.

These are settings consumers, not just settings storage. The user
flagged this as *"persistence isn't wired up yet"* — the gap is
two-sided. Implement both.

---

## Stream C — Cleanup (post-launch is fine)

### C1. Audit `/admin/all-listings`

It's likely a duplicate of `/admin/listings`. Either delete it (and
remove from nav) or merge whatever distinct functionality it has into
the main listings page.

### C2. Demote the listings mock fallback

`lib/listings.ts` has an extensive mock-listings block (~200 lines)
that fires whenever the Supabase client returns null. Useful in early
dev; in production it can mask connection issues.

Suggested change: only return mocks when `process.env.NODE_ENV ===
"development"`. In production, return an empty array and log the
error. That way a real Supabase outage shows an empty list rather
than spurious "Serengeti Safari Lodge" rows that don't exist in the
database.

Don't delete the mock block — it's still useful for local dev without
a connection. Just gate it.

### C3. (Removed)

The earlier draft of this brief had a step here for seeding
`curation_bucket = 'borderline'` on every existing row — left over
from the over-engineered scoring approach that was dropped. No
seeding action is needed; the editor proceeds country-by-country
from `/admin/listings`, deciding keep/cull on each row directly via
the `status` field. See `handoff/LISTINGS_AUDIT.md` for the workflow.

---

## Constraints

- **Don't touch `main`.** Production stays where it is until the soft
  launch is complete.
- **Don't touch the editorial / visual work.** This brief is admin
  plumbing only. The brand-voice rewrites we just shipped (homepage,
  about, plan, OG image, listings audit toolkit) are not in scope.
- **Don't touch the briefs flow** (`/plan` + `/api/briefs/submit` +
  `/admin/briefs` + email templates). It's tested and working.
- **Don't refactor `lib/listings.ts` shape** beyond extending the type
  with the new fields. The data layer is consumed in many places.
- **HTTP Basic Auth in `middleware.ts` stays.** Auth is not in scope
  for this brief.

## Verification

After Stream A is done, manually verify:

1. `/admin` shows real numbers in all four KPI tiles (no more `--`).
2. The Connection Debugger reports success and shows a useful
   "Connected — N listings" message.
3. `/admin/database` either works correctly or has been removed
   (and its nav link with it).
4. Edit a listing on `/admin/listings/edit/[id]`, refresh the page,
   confirm the change persisted in Supabase.
5. Approve a pending listing, confirm `status` transitions to
   `approved` in Supabase.
6. The listing edit form has a "Curation" section with all the new
   fields, and saving them persists to the new columns.
7. `pnpm build` is clean. `tsc --noEmit -p tsconfig.json` is clean.

After Stream B, manually verify:

8. Create a new article in `/admin/articles/new`, see it appear in
   the list, edit it, delete it. Confirm the row in Supabase.
9. Change a setting in `/admin/settings`, save, refresh, confirm
   persisted. Trigger one of the consumer flows (e.g. enable
   `auto_approve_listings`, submit a listing via the public form,
   confirm it lands as `approved` not `pending`).

## Reporting back

At the end of each stream, summarise:

- Migrations applied (yes/no, against which environment)
- New API routes created
- Pages updated (file paths)
- Anything broken or unclear discovered along the way
- Confirmation that the listed constraints were respected
- One-line status of each verification item above

Ping the user (in Cowork) when Stream A is done so we can re-run the
visual review and decide on soft launch.
