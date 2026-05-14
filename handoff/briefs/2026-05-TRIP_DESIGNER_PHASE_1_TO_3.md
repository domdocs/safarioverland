# Trip Designer — Phase 1 to Phase 3 (combined autonomous brief)

End-to-end implementation of the staff-facing itinerary builder, from
empty database to print-ready preview. Designed to be executed
autonomously by Claude Code without permission asks. Every decision
that needs to be made is made here.

The design handoff at `handoff/design_handoff_itinerary/` is the
canonical visual reference and contains the working prototype.

## Sequencing context

Three earlier phases are merged into one PR for this work:

- **Phase 1** — schema + admin scaffolding + trip-metadata form
- **Phase 2** — chapters, transits, photo uploads, practicals
- **Phase 3** — port the prototype design into the admin preview
  route + print CSS for Mac Print > PDF

Phase 4 (Playwright PDF microservice) is **explicitly deferred** —
Niels uses Mac's Print > PDF on the preview route for now. Phase 5
(publish workflow, snapshots, public URL, theme pickers) is also
deferred. The acceptance criteria below define done for Phases 1-3.

## Branch

```bash
git checkout main
git pull
git checkout -b feature/trip-designer
```

This branch is large by our project's normal standards. Suggested
commit cadence: one commit per logical unit (migration, types,
list page, create form, etc.) so the PR diff is reviewable.

## Required reading before starting

In this order:

1. `handoff/design_handoff_itinerary/README.md` — overview of what
   the feature is
2. `handoff/design_handoff_itinerary/SCHEMA.md` — the canonical data
   shape (this brief codifies it into Postgres + TypeScript)
3. `handoff/design_handoff_itinerary/STYLE_TOKENS.md` — colours,
   fonts, spacing (theme is **locked to savanna/editorial/spacious**
   — no theme picker, no variant logic)
4. `handoff/design_handoff_itinerary/PDF_NOTES.md` — the page-break
   strategy and the print-CSS recipes are directly applicable to
   the Mac Print > PDF workflow we're shipping
5. `handoff/design_handoff_itinerary/source-prototype/Itinerary.html`
   — open in a browser to see the visual target
6. `handoff/BRAND_VOICE.md` — for any copy you generate in empty
   states, error messages, validation messages

---

# Part 1 — Schema and data layer

## Migration

Filename: `supabase/migrations/20260516_itineraries.sql`

```sql
-- Itinerary master table
CREATE TABLE IF NOT EXISTS itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,                                  -- minted on first save; nullable until then
  reference TEXT UNIQUE NOT NULL,                    -- e.g. SO-2026-0001
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived')),

  -- Trip metadata (denormalised; design uses these directly)
  title TEXT NOT NULL,
  cover_title_lines TEXT[] NOT NULL DEFAULT '{}',    -- 1..4 lines for the cover display
  subtitle TEXT,
  guests TEXT[] NOT NULL DEFAULT '{}',               -- 1..6 names; joined with " & " on render
  dates_from TEXT,                                   -- "14 September"
  dates_to TEXT,                                     -- "24 September"
  dates_year TEXT,                                   -- "2026"
  pace TEXT,
  curator_name TEXT,
  curator_title TEXT DEFAULT 'Curator, Safari Overland',
  curator_location TEXT DEFAULT 'Victoria Falls, Zimbabwe',
  prologue TEXT[] NOT NULL DEFAULT '{}',             -- ordered paragraphs

  -- Cover photo
  cover_photo_url TEXT,

  -- Theme (locked to defaults for v1; columns exist for future use)
  palette TEXT NOT NULL DEFAULT 'savanna' CHECK (palette IN ('savanna', 'forest', 'coast')),
  typography TEXT NOT NULL DEFAULT 'editorial' CHECK (typography IN ('editorial', 'modern', 'classic')),
  density TEXT NOT NULL DEFAULT 'spacious' CHECK (density IN ('spacious', 'compact')),
  show_curator_notes BOOLEAN NOT NULL DEFAULT TRUE,

  -- Optional linkage to a brief
  source_brief_id UUID REFERENCES briefs(id) ON DELETE SET NULL,

  -- Practicals (JSONB array of cards; see SCHEMA.md §4)
  practicals JSONB NOT NULL DEFAULT '[]',

  -- Audit
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT                                    -- admin username from middleware
);

CREATE INDEX IF NOT EXISTS itineraries_status_idx ON itineraries(status);
CREATE INDEX IF NOT EXISTS itineraries_created_at_idx ON itineraries(created_at DESC);
CREATE INDEX IF NOT EXISTS itineraries_reference_idx ON itineraries(reference);

-- Per-year reference sequence (so 2026 starts at SO-2026-0001, 2027 starts at SO-2027-0001)
CREATE TABLE IF NOT EXISTS itinerary_reference_sequences (
  year INTEGER PRIMARY KEY,
  next_value INTEGER NOT NULL DEFAULT 1
);

-- Chapter table
CREATE TABLE IF NOT EXISTS itinerary_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,                         -- 0-indexed; roman numeral derived from this+1
  slug TEXT NOT NULL,                                -- url-safe within trip; e.g. "victoria-falls"

  place TEXT NOT NULL,
  country TEXT NOT NULL,
  coords_lat NUMERIC(8,5),
  coords_lon NUMERIC(8,5),
  nights INTEGER NOT NULL CHECK (nights BETWEEN 1 AND 14),
  dates TEXT NOT NULL,                               -- "14 — 16 September"
  palette TEXT,                                      -- atmospheric tag ("spray", "delta") — informational
  epigraph TEXT NOT NULL,

  intro TEXT[] NOT NULL DEFAULT '{}',                -- ordered paragraphs
  seeing TEXT[] NOT NULL DEFAULT '{}',
  note TEXT,                                         -- curator's handwritten note

  -- Lodge (JSONB for flexibility on amenities array)
  lodge JSONB NOT NULL DEFAULT '{}',                 -- { name, kind, room, blurb, amenities[] }

  -- Rhythm timeline (JSONB array)
  rhythm JSONB NOT NULL DEFAULT '[]',                -- [{ time, title, body }, ...]

  -- Photos
  photo_hero_url TEXT,
  photo_lodge_url TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (itinerary_id, position),
  UNIQUE (itinerary_id, slug)
);

CREATE INDEX IF NOT EXISTS itinerary_chapters_itinerary_id_idx ON itinerary_chapters(itinerary_id);

-- Transit table
CREATE TABLE IF NOT EXISTS itinerary_transits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
  from_chapter_id UUID NOT NULL REFERENCES itinerary_chapters(id) ON DELETE CASCADE,
  to_chapter_id UUID NOT NULL REFERENCES itinerary_chapters(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,                         -- matches position of from_chapter

  mode TEXT NOT NULL,
  duration TEXT NOT NULL,
  distance TEXT NOT NULL,
  crosses TEXT NOT NULL,
  note TEXT NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (itinerary_id, position),
  CHECK (from_chapter_id != to_chapter_id)
);

CREATE INDEX IF NOT EXISTS itinerary_transits_itinerary_id_idx ON itinerary_transits(itinerary_id);

-- updated_at trigger (reuses existing helper from previous migrations)
DROP TRIGGER IF EXISTS update_itineraries_updated_at ON itineraries;
CREATE TRIGGER update_itineraries_updated_at
  BEFORE UPDATE ON itineraries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_itinerary_chapters_updated_at ON itinerary_chapters;
CREATE TRIGGER update_itinerary_chapters_updated_at
  BEFORE UPDATE ON itinerary_chapters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_itinerary_transits_updated_at ON itinerary_transits;
CREATE TRIGGER update_itinerary_transits_updated_at
  BEFORE UPDATE ON itinerary_transits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (admin only via service role — no public read for v1)
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_transits ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_reference_sequences ENABLE ROW LEVEL SECURITY;

-- No public policies; service role bypasses RLS so admin operations work.
```

## TypeScript types — `lib/itineraries/types.ts`

Mirror the schema. Use the same field names as the design handoff
SCHEMA.md where possible. Add zod schemas for validation (matches the
existing pattern from `lib/listings/import-record.ts`).

```ts
// Itinerary
export type Itinerary = {
  id: string
  slug: string | null
  reference: string
  status: "draft" | "published" | "archived"
  title: string
  cover_title_lines: string[]
  subtitle: string | null
  guests: string[]
  dates_from: string | null
  dates_to: string | null
  dates_year: string | null
  pace: string | null
  curator_name: string | null
  curator_title: string
  curator_location: string
  prologue: string[]
  cover_photo_url: string | null
  palette: "savanna" | "forest" | "coast"
  typography: "editorial" | "modern" | "classic"
  density: "spacious" | "compact"
  show_curator_notes: boolean
  source_brief_id: string | null
  practicals: PracticalCard[]
  created_at: string
  updated_at: string
  created_by: string | null
}

export type PracticalCard = {
  title: string
  body: string  // plain text; line breaks become <p> tags on render
}

export type Chapter = {
  id: string
  itinerary_id: string
  position: number       // 0-indexed
  slug: string
  place: string
  country: string
  coords_lat: number | null
  coords_lon: number | null
  nights: number
  dates: string
  palette: string | null
  epigraph: string
  intro: string[]
  seeing: string[]
  note: string | null
  lodge: Lodge
  rhythm: RhythmItem[]
  photo_hero_url: string | null
  photo_lodge_url: string | null
  created_at: string
  updated_at: string
}

export type Lodge = {
  name: string
  kind: string
  room: string
  blurb: string
  amenities: string[]
}

export type RhythmItem = {
  time: string
  title: string
  body: string
}

export type Transit = {
  id: string
  itinerary_id: string
  from_chapter_id: string
  to_chapter_id: string
  position: number
  mode: string
  duration: string
  distance: string
  crosses: string
  note: string
  created_at: string
  updated_at: string
}

// Roman-numeral helper — derived from position (0-indexed)
export function toRoman(positionZeroBased: number): string {
  const n = positionZeroBased + 1
  const map: Array<[number, string]> = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ]
  let result = ""
  let remaining = n
  for (const [value, numeral] of map) {
    while (remaining >= value) {
      result += numeral
      remaining -= value
    }
  }
  return result
}
```

## Reference number generation — `lib/itineraries/reference.ts`

Format: `SO-YYYY-NNNN`. Per-year sequence stored in
`itinerary_reference_sequences`. Increment atomically inside a
transaction so concurrent creates don't collide.

```ts
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function mintReference(): Promise<string> {
  const year = new Date().getFullYear()
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Supabase server client not available")

  // Use Postgres function or upsert + select-and-update.
  // Atomic-safe pattern: upsert returning the incremented value.
  const { data, error } = await supabase.rpc("mint_reference_for_year", {
    year_in: year,
  })
  if (error) throw error
  return `SO-${year}-${String(data).padStart(4, "0")}`
}
```

Add the RPC function to the migration:

```sql
CREATE OR REPLACE FUNCTION mint_reference_for_year(year_in INTEGER)
RETURNS INTEGER AS $$
DECLARE
  v_next INTEGER;
BEGIN
  INSERT INTO itinerary_reference_sequences (year, next_value)
  VALUES (year_in, 2)
  ON CONFLICT (year) DO UPDATE
  SET next_value = itinerary_reference_sequences.next_value + 1
  RETURNING next_value - 1 INTO v_next;

  RETURN v_next;
END;
$$ LANGUAGE plpgsql;
```

This returns the value just used (1, 2, 3, ...) and atomically
reserves the next one.

## Default practicals — `lib/itineraries/defaults.ts`

When a new itinerary is created, populate the `practicals` JSONB
array with six default cards. Edit-in-place from the admin form.

```ts
export const DEFAULT_PRACTICALS: PracticalCard[] = [
  {
    title: "Included",
    body: "All accommodation on a fully-inclusive basis (meals, house drinks, scheduled activities, park and conservation fees). Internal flights and road transfers between camps. Airport meet-and-greet at both ends."
  },
  {
    title: "Not included",
    body: "International flights to and from Africa. Travel insurance. Premium drinks and spa treatments. Tipping at lodges and for guides (we'll suggest amounts in your pre-trip notes). Visas where applicable."
  },
  {
    title: "Weather",
    body: "Dry season runs roughly May to October across most safari regions — clear skies, cool mornings, warm afternoons, game concentrating at water sources. Green season (November to April) brings dramatic skies, newborn animals, and noticeably lower rates with the trade-off of taller grass."
  },
  {
    title: "Packing, in essence",
    body: "Neutral colours (khaki, olive, stone), layers for cold dawn drives, a warm fleece, a wide-brimmed hat, polarised sunglasses, high-SPF sunscreen, insect repellent with DEET or picaridin, a soft duffel rather than a hard case (bush flights have strict baggage rules, usually 15-20kg)."
  },
  {
    title: "Health & visas",
    body: "Speak to a travel-medicine clinic 6-8 weeks before flying — they'll match your itinerary to the right malaria prophylaxis. Yellow fever certificate is mandatory in several countries. Visa requirements vary by passport; e-visas now cover most of the major safari countries."
  },
  {
    title: "On the ground",
    body: "Niels van de Meer is the planning contact and the person you'll speak to on the ground in Victoria Falls. niels@safarioverland.com is the direct line. We're WhatsApp-reachable for any logistical questions before and during your trip."
  }
]
```

These are editable per-trip via the admin form. Don't lock them.

## CRUD helpers — `lib/itineraries/index.ts`

Service-role Supabase client. CRUD operations for all three tables.
Standard pattern — see `lib/listings.ts` and `lib/briefs/*` for the
existing conventions to match.

Key operations:

- `createItinerary(input)` — mints reference, copies default practicals, returns the new itinerary
- `updateItinerary(id, patch)` — partial update
- `deleteItinerary(id)` — cascades to chapters and transits
- `listItineraries({ status?, limit?, offset? })` — for the admin list page
- `getItinerary(id)` — single fetch, returns itinerary + chapters + transits in one shape
- `createChapter(itineraryId, input)` — appends to end; recalculates transits
- `updateChapter(id, patch)`
- `deleteChapter(id)` — recalculates transits and positions of remaining chapters
- `reorderChapters(itineraryId, newOrder)` — array of chapter IDs in new order; transactional
- `upsertTransit(itineraryId, position, input)` — used when chapters change

When `reorderChapters` runs:
1. Update `position` on each chapter in order
2. Recalculate transits: for each pair of adjacent chapters (i, i+1), ensure a transit exists with `from=chapters[i]`, `to=chapters[i+1]`, `position=i`. Delete transits that no longer have matching adjacent pairs.
3. Run inside a transaction.

When `createChapter` runs:
1. Insert chapter at next position
2. If previous chapter exists, create a placeholder transit with `mode="Transfer"`, `duration="TBD"`, `distance="TBD"`, `crosses="TBD"`, `note="To be specified."` so the count matches. Form prompts the user to fill it.

When `deleteChapter` runs:
1. Delete chapter
2. Decrement positions of all chapters with position > deleted
3. Recalculate transits per the reorder logic above

---

# Part 2 — API routes

All under `/api/admin/itineraries/`. Same admin Basic Auth middleware
as everything else under `/admin/*`.

| Method | Path | Body | Returns |
|---|---|---|---|
| `GET` | `/api/admin/itineraries` | — | `{ itineraries: Itinerary[] }` |
| `POST` | `/api/admin/itineraries` | `{ title, ... }` | `{ ok: true, id, reference }` |
| `GET` | `/api/admin/itineraries/[id]` | — | `{ itinerary, chapters, transits }` |
| `PATCH` | `/api/admin/itineraries/[id]` | partial itinerary | `{ ok: true }` |
| `DELETE` | `/api/admin/itineraries/[id]` | — | `{ ok: true }` |
| `POST` | `/api/admin/itineraries/[id]/chapters` | chapter input | `{ ok: true, chapter, transits }` |
| `PATCH` | `/api/admin/itineraries/[id]/chapters/[chapterId]` | partial | `{ ok: true }` |
| `DELETE` | `/api/admin/itineraries/[id]/chapters/[chapterId]` | — | `{ ok: true, transits }` |
| `POST` | `/api/admin/itineraries/[id]/chapters/reorder` | `{ order: string[] }` | `{ ok: true, chapters, transits }` |
| `PATCH` | `/api/admin/itineraries/[id]/transits/[transitId]` | partial | `{ ok: true }` |

Use zod for body validation. Reject 400 on invalid input with clear
error messages. Return 401 if Basic Auth fails (middleware handles
this).

---

# Part 3 — Admin UI

## Route structure

```
app/admin/itineraries/
  page.tsx                          # list view
  new/
    page.tsx                        # create form (trip metadata only)
  [id]/
    edit/
      page.tsx                      # full edit form (trip + chapters + transits + photos + practicals)
    preview/
      page.tsx                      # rendered editorial preview (Phase 3)
      preview-styles.css            # scoped print + screen CSS (Phase 3)
```

## List view — `app/admin/itineraries/page.tsx`

Server Component. Mirrors `/admin/listings` pattern (the existing
admin listings index).

- Headline: "Itineraries"
- Subhead: "Trip designs in progress and ready to send."
- Table columns: Reference · Title · Guests · Status · Updated · Actions
- "+ New itinerary" button top-right → `/admin/itineraries/new`
- Empty state: editorial soft-state, "No itineraries yet. Start a new trip design →"
- Row click → `/admin/itineraries/[id]/edit`
- Sort: most recently updated first

Add an "Itineraries" entry to the admin nav sidebar (wherever the
existing admin nav lives — there's a sidebar visible on /admin/*
routes per earlier briefs).

## Create form — `app/admin/itineraries/new/page.tsx`

Client Component. Minimal — title only.

- Headline: "New itinerary"
- Single field: Title (required, max 80 chars, no display on cover — internal reference)
- Submit → `POST /api/admin/itineraries`, returns the new id and reference
- Redirect on success → `/admin/itineraries/[id]/edit`

Title is the only required field at create time. Everything else
gets filled in on the edit form. Reference is auto-minted server-side.

## Edit form — `app/admin/itineraries/[id]/edit/page.tsx`

Client Component. Single long page with collapsible sections (per the
scope doc). This is the heart of the feature.

Section order:

### Section 1 — Trip metadata

Fields, in form order:

- **Reference** (read-only, displayed but not editable; auto-minted)
- **Title** (text, required, ≤80) — internal reference, also shown in the admin
- **Cover title lines** (repeater of strings, 1-4 lines, each ≤24 chars; warn at >24 since the cover overflows). Drag to reorder. "+ Add line" button.
- **Subtitle** (text, ≤160) — single italic line under the cover title
- **Guests** (tag-input style, 1-6 items) — typed as separate names; UI shows them as chips; render in design with " & " joiner
- **Dates: from** (text, free-form: e.g. "14 September")
- **Dates: to** (text, free-form: e.g. "24 September")
- **Year** (text, e.g. "2026")
- **Pace** (text, ≤120) — short sentence
- **Curator name** (text, required) — defaults to "Niels van de Meer" on new trips, editable
- **Curator title** (text) — defaults to "Curator, Safari Overland"
- **Curator location** (text) — defaults to "Victoria Falls, Zimbabwe"
- **Prologue** — repeater of textareas (1-5 paragraphs). Drag to reorder. "+ Add paragraph" button.
- **Cover photo** — single image upload widget (drag-drop) calling existing `/api/admin/upload` with `slot=itinerary-cover` (extend the upload endpoint to accept `slot` values not just `hero|gallery|founder`)

Save behaviour: autosave on field blur via PATCH. Show a small
"Saved" indicator briefly after each successful save. Failures show
a "Save failed — retry" inline.

### Section 2 — Chapters

Repeater of chapter cards. Each card is collapsible. Click to expand
and edit.

Top of section:
- "Chapters" heading
- "+ Add chapter" button (creates an empty chapter via the API; opens it expanded)
- Drag-to-reorder by chapter-card handle. Visually shows the roman numeral updating as you drag.

Each expanded chapter card has:

- **Place** (text, required, ≤60)
- **Country** (text, required, ≤60)
- **Coords: latitude** (number, -90 to 90) — used by the map
- **Coords: longitude** (number, -180 to 180)
- **Nights** (number, 1-14)
- **Dates** (text, free-form: e.g. "14 — 16 September")
- **Palette** (select: spray / river / delta / atlantic / [empty]) — atmospheric tag, informational only
- **Epigraph** (text, ≤120) — short italic motto
- **Intro paragraphs** (repeater of textareas, 1-4 paragraphs)
- **Lodge** (sub-form):
  - Name (text, ≤80)
  - Kind (text, ≤80) — e.g. "Grande dame, est. 1904"
  - Room (text, ≤80) — e.g. "Stables Garden Suite"
  - Blurb (textarea, 50-400 chars)
  - Amenities (repeater of strings, 3-8 items, each ≤32 chars)
- **Rhythm** (repeater of 3-6 items):
  - Time (text, ≤32) — e.g. "Dawn"
  - Title (text, ≤80)
  - Body (textarea, 50-280)
- **Seeing** (repeater of strings, 3-6 items, each ≤120 chars)
- **Curator's note** (textarea, 50-400) — handwritten note
- **Hero photo** (image upload, slot=`chapter-hero`)
- **Lodge photo** (image upload, slot=`chapter-lodge`)
- **Delete chapter** button (with confirm — "This deletes the chapter and any adjacent transit.")

Slug auto-generated from `place` on save (lowercase, hyphenated).

### Section 3 — Transits

Auto-generated from chapter adjacencies. One transit between each
adjacent pair of chapters. Cannot be added or removed manually
(deleted automatically when a chapter is removed; created
automatically when a chapter is added).

Each transit card shows:

- "Transit: [from chapter place] → [to chapter place]" (read-only label)
- **Mode** (text, ≤60) — e.g. "Private road transfer", "Light aircraft (Cessna 208)"
- **Duration** (text, ≤32) — e.g. "≈ 1 hr 30 min"
- **Distance** (text, ≤32) — e.g. "440 km"
- **Crosses** (text, ≤120)
- **Note** (textarea, 50-300)

On creation of a new chapter, the transit between previous and new
chapter starts with placeholder values ("Transfer", "TBD", etc.) —
user fills them in.

### Section 4 — Practicals

Six cards by default (the `DEFAULT_PRACTICALS` constants), each
editable.

- Card title (text, ≤40)
- Card body (textarea, markdown allowed but only inline marks — `*em*`, `**strong**`; line breaks become `<p>` tags)
- "+ Add card" and per-card delete buttons (in case Niels wants to add a custom card or remove a default one)
- Drag to reorder

### Section 5 — Preview & save

Bottom of edit form:

- **Save** (just persists everything — already happens via autosave, but a "Save now" affordance for confidence)
- **Preview** (opens `/admin/itineraries/[id]/preview` in a new tab — the rendered editorial design)
- **Delete itinerary** (confirm modal — "This is permanent. Delete?")

## Photo upload integration

The existing `/api/admin/upload` endpoint (from PR #5, image pipeline
v2 from PR #7) accepts:

```json
{
  "file": ...,
  "listing_id": "...",
  "slot": "hero" | "gallery" | "founder"
}
```

**Extend** the slot validation to accept these new values too:
- `itinerary-cover`
- `chapter-hero`
- `chapter-lodge`

When the slot is one of the itinerary types, replace `listing_id`
with an `itinerary_id` field in the multipart form. Inside the
endpoint, branch on which ID is present and write to the correct
storage path:

```
listing-media/
  itineraries/[itinerary_id]/
    cover/[uuid].webp
    chapter-hero/[chapter_id]/[uuid].webp
    chapter-lodge/[chapter_id]/[uuid].webp
```

The same sharp pipeline (resize, EXIF strip, WebP) applies. The
returned URL is stored on the itinerary or chapter record by the
client after upload completes.

If extending the slot enum is complex, an alternative shape is a
second endpoint `/api/admin/upload/itinerary` — but extending the
existing endpoint is cleaner and reuses the validation and
processing.

---

# Part 4 — Preview render (Phase 3)

## Route: `app/admin/itineraries/[id]/preview/page.tsx`

Server Component. Fetches the itinerary + chapters + transits via
the data layer. Renders them through the editorial design.

The preview page is **not** wrapped in the admin chrome (no sidebar,
no header). It's a full-bleed editorial document. Use a separate
layout or render outside the admin layout.

Top of the preview, hovering, a small thin sticky banner reads:

```
PREVIEW · DRAFT · ← Back to edit · Print this page
```

Same restraint as the listing preview banner — mono caps, amber on
ink, sticky top. The "Print this page" link is a styled `<a>` that
triggers `window.print()`.

This banner is hidden in `@media print`.

## Component port

The prototype components in
`handoff/design_handoff_itinerary/source-prototype/src/` are JSX
files using Babel-in-the-browser. Port them to proper Next.js
Server Components / Client Components as needed.

Suggested file mapping:

```
handoff/.../source-prototype/src/        →  components/itinerary/
  styles.css                              →  app/admin/itineraries/preview/preview-styles.css
  data.jsx                                →  (skip — sample data, not needed)
  maps.jsx                                →  components/itinerary/maps.tsx
  cover.jsx                               →  components/itinerary/cover.tsx
                                          →    exports <Cover />, <Prologue />, <Overview />
  chapter.jsx                             →  components/itinerary/chapter.tsx
                                          →    exports <Chapter />
  transit.jsx                             →  components/itinerary/transit.tsx
                                          →    exports <Transit />
  practicals.jsx                          →  components/itinerary/practicals.tsx
                                          →    exports <Practicals />, <SignOff />
  app.jsx                                 →  app/admin/itineraries/[id]/preview/page.tsx
                                          →    composes the whole document in order
```

Porting rules:

1. **Replace `useState`/Babel-only patterns** with Server Component
   data fetching where possible. Most of these components are
   presentational — they take props and render. Mark them as Server
   Components.

2. **CSS port verbatim.** Copy `styles.css` into
   `app/admin/itineraries/preview/preview-styles.css` and import it
   from the preview page. The CSS variables on `:root` need to land
   only on this preview route — scope by wrapping the preview page
   tree in a `<div className="itinerary-preview">` and prefixing
   selectors, OR (easier) accept that the CSS variables override
   the site-wide ones on the preview route (which is fine since
   the route is admin-only and renders its own layout).

3. **SVG map system** — port `maps.tsx` with the projection function
   and country path strings verbatim. The `<TransitMap fromId toId>`
   component takes the two chapter IDs and auto-bounds the SVG
   viewBox.

4. **Drop the dev-only files:** `image-slot.js`, `tweaks-panel.jsx`
   — these are prototype-only and don't get ported.

5. **The `<Cover>` component currently expects sample data.** Replace
   the data-fetching with props passed from the preview page.

6. **Image fallback:** If a chapter's `photo_hero_url` is null,
   render the same tinted gradient the prototype uses (defined in
   `styles.css` under `.cover .cover-photo`). Don't render an empty
   box.

7. **Roman numerals** are derived from `chapter.position` (0-indexed)
   using the `toRoman()` helper in `lib/itineraries/types.ts`. Do not
   store roman numerals.

## Theme — locked

The preview always renders with:

```html
<html data-palette="savanna" data-typography="editorial" data-density="spacious">
```

These attributes can be set directly on the root or on the wrapping
`<div className="itinerary-preview">` element. **No theme picker UI.**
The columns exist in the schema for future expansion; they're not
exposed in v1.

## Fonts — add Caveat and Newsreader

Currently `app/layout.tsx` loads Cormorant Garamond, Inter, JetBrains
Mono. Add two more for the itinerary preview:

```ts
import { Cormorant_Garamond, Inter, JetBrains_Mono, Caveat, Newsreader } from "next/font/google"

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-hand",
  display: "swap",
})

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body-serif",
  display: "swap",
})
```

Add the variable names to the `<html>` className list. The
preview-styles.css references these via the CSS variable names from
the design handoff:

```css
--display: var(--font-serif), Georgia, serif;   /* Cormorant Garamond — already loaded */
--body:    var(--font-body-serif), Georgia, serif;   /* Newsreader — newly loaded */
--sans:    var(--font-sans), -apple-system, sans-serif;   /* Inter — already loaded */
--hand:    var(--font-hand), cursive;   /* Caveat — newly loaded */
```

Manrope (the design's sans choice) is replaced with Inter — they're
visually close enough for utility text.

## Print CSS — `app/admin/itineraries/preview/preview-styles.css`

In addition to the screen styles ported from the prototype, add a
substantial `@media print` block. The page-break recipes from
`handoff/design_handoff_itinerary/PDF_NOTES.md` §2 and §3 apply
directly — copy them verbatim, adjusted for the component class
names used in the port.

Key rules to include:

```css
@page {
  size: A4 portrait;
  margin: 0;
}

@media print {
  html, body {
    background: var(--bone);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Hide preview chrome */
  .preview-banner, .progress, .tweaks-panel { display: none !important; }

  /* Each major section starts on a new page */
  .cover, .prologue, .overview,
  .chapter, .transit, .practicals, .signoff {
    break-before: page;
    break-inside: avoid;
  }

  .cover { break-before: auto; }

  /* Hero photos must not split */
  .chapter-hero, .cover-photo, .lodge .photo {
    break-inside: avoid;
  }

  /* Per-chapter granular breaks (chapter is too tall for single-page) */
  .chapter-hero { break-after: page; }
  .chapter-intro { break-inside: avoid; }
  .lodge { break-inside: avoid; }
  .rhythm-item { break-inside: avoid; }
  .note-card { break-inside: avoid; }
  .practical-card { break-inside: avoid; }
}
```

## Workflow doc — `handoff/PRINT_TO_PDF.md`

Create this file as part of Phase 3 deliverables. Contents:

```markdown
# Print itinerary to PDF — Mac workflow

The Trip Designer preview is designed to print cleanly to A4 PDF
from any Mac browser. Safari is recommended (best WebKit rendering
for editorial typography).

## Steps

1. Open the itinerary in admin: `/admin/itineraries/[id]/edit`
2. Click **Preview** (top right of the edit form). The full
   editorial document opens in a new tab.
3. In the preview tab, press **⌘P** (or click the *Print this page*
   link in the top banner).
4. In the print dialog:
   - **Paper Size:** A4
   - **Orientation:** Portrait
   - **Margins:** None / 0 (under "Show Details" if needed)
   - **Print backgrounds:** ON ("Print headers and footers" OFF;
     "Print backgrounds" or "Background graphics" ON — naming varies
     by browser)
   - **Scale:** 100%
5. In the bottom-left of the print dialog, click the **PDF** dropdown
   and choose **Save as PDF**.
6. Name the file using the convention: `SO-{REFERENCE}-{LASTNAME}-{YYYY-MM}.pdf`
   - e.g. `SO-2026-0001-Whitford-2026-09.pdf`
7. Save. The PDF is now ready to attach to a personal email from
   Niels' Gmail.

## If the PDF looks wrong

- **Margins or white borders:** margins setting in print dialog isn't 0
- **Missing backgrounds, photos:** "Print backgrounds" checkbox isn't on
- **Headers like the URL or date appearing:** "Print headers and footers" is on; turn it off
- **Fonts looking wrong:** open the preview in Safari rather than Chrome
- **Pages breaking in odd places:** check that the browser zoom is 100%

## Future: automated PDF

This manual workflow exists because we're at low volume. When
itinerary production scales past ~5 per month, we'll automate via
a Playwright microservice (separate brief). The print CSS we write
for the manual workflow carries over with no rework.
```

---

# Part 5 — Validation rules (consolidated)

Enforced both client-side (zod in form handlers) and server-side
(zod in API routes). Server-side is authoritative.

| Field | Rule |
|---|---|
| `itineraries.title` | required, 1-80 |
| `itineraries.cover_title_lines` | array length 1-4; each item 1-32 (warn at >24) |
| `itineraries.subtitle` | optional, ≤160 |
| `itineraries.guests` | array length 1-6; each item 1-60 |
| `itineraries.prologue` | array length 0-5; each paragraph 1-1000 |
| `itineraries.pace` | optional, ≤120 |
| `itineraries.curator_name` | optional, ≤120 (defaults to "Niels van de Meer" on create) |
| `chapters[]` | array length 1-8 |
| `chapter.place` | required, 1-60 |
| `chapter.country` | required, 1-60 |
| `chapter.coords_lat` | optional, -90 to 90 |
| `chapter.coords_lon` | optional, -180 to 180 |
| `chapter.nights` | required, 1-14 |
| `chapter.dates` | required, ≤60 |
| `chapter.epigraph` | required, ≤120 |
| `chapter.intro` | array 0-4; each paragraph 1-1000 |
| `chapter.seeing` | array 0-6; each item ≤120 |
| `chapter.note` | optional, ≤400 |
| `chapter.lodge.name` | required if lodge present, ≤80 |
| `chapter.lodge.kind` | optional, ≤80 |
| `chapter.lodge.room` | optional, ≤80 |
| `chapter.lodge.blurb` | optional, ≤400 |
| `chapter.lodge.amenities` | array 0-8; each item ≤32 |
| `chapter.rhythm` | array 0-6; each item: time ≤32, title ≤80, body ≤280 |
| `transits[].mode` | required, ≤60 |
| `transits[].duration` | required, ≤32 |
| `transits[].distance` | required, ≤32 |
| `transits[].crosses` | required, ≤120 |
| `transits[].note` | required, 1-300 |
| `practicals[].title` | ≤40 |
| `practicals[].body` | ≤2000 |

**Critical invariant:** `transits.length === max(0, chapters.length - 1)`.
Server enforces; client UI shouldn't be able to break it.

---

# Tests

## node:test (`pnpm test:unit`)

- `lib/itineraries/types`: `toRoman()` for 0..7
- `lib/itineraries/reference`: mint sequence increments correctly (mock Supabase)
- `lib/itineraries/validate`: each zod schema accepts valid input, rejects invalid input with named errors
- `lib/itineraries/index`:
  - createItinerary mints reference, copies default practicals
  - createChapter at position 0 adds no transit (single chapter); at position 1 adds one transit
  - deleteChapter removes adjacent transits and shifts positions
  - reorderChapters reassigns positions and rebuilds transit chain

## vitest (`pnpm test`)

- Admin list page renders itineraries with correct columns
- New itinerary form: submitting title creates row and redirects
- Edit form: each section renders; field validation displays errors
- Edit form: chapter add/delete/reorder reflects in UI
- Preview page: renders a fixture itinerary through the editorial design
  components (snapshot test)

---

# End-to-end verify

Manual on the preview deployment:

1. Open `/admin`, see "Itineraries" in the nav
2. Click into the new section, see empty list with "+ New itinerary" button
3. Create a new itinerary with title "Test trip" — redirects to edit
4. Reference shows as `SO-2026-NNNN` (auto-minted)
5. Fill in trip metadata (cover title lines, guests, dates, pace, etc.) — autosave indicator appears
6. Upload a cover photo — succeeds, image renders as a thumbnail
7. Add 3 chapters with the place names and coords
8. Reorder them by dragging — roman numerals update visually
9. Add hero + lodge photos to each chapter
10. Verify transits appear automatically between adjacent chapters
11. Edit the auto-generated transits with real mode/duration/distance/crosses/note
12. Open preview in new tab → editorial design renders with all content
13. Print to PDF via ⌘P, save to disk
14. Verify the PDF:
    - 20+ pages
    - Cover renders full-bleed with photo on left
    - Each chapter has the hero + intro + lodge + rhythm + seeing + note
    - Transits render in dark `--ink` style with their maps
    - Practicals card grid renders correctly
    - Sign-off page with handwritten "T" / curator's name

---

# Out of scope — explicitly deferred to Phase 4+

These are documented out-of-scope so Code doesn't accidentally
build them:

- **Playwright PDF microservice** — Niels uses Mac Print > PDF
- **Public read-only URL** `/trips/[slug]` — admin-only for v1
- **Publish workflow** / `status='published'` — everything stays draft
- **Snapshots** / immutable record on publish
- **Theme picker UI** — palette/typography/density locked to defaults
- **Live side-by-side preview pane in the editor** — preview opens in
  new tab only
- **Duplicate / clone trip**
- **Chapter / itinerary templates library**
- **Pre-flight validation on publish**
- **Email PDF directly** — manual attach to Gmail
- **Linking to a customer/booking table** — `source_brief_id` is the
  only existing-data linkage; no CRM tables
- **Multi-currency, pricing, deposits**
- **Multi-language / translations**
- **Per-trip theme overrides** (the columns exist; the UI doesn't)

---

# Done means

- All migrations applied; tables visible in Supabase Studio
- `/admin/itineraries` accessible from admin nav, lists existing trips
- `/admin/itineraries/new` creates a trip with auto-minted reference
- `/admin/itineraries/[id]/edit` renders the full form with all
  sections (trip metadata, chapters, transits, practicals)
- Photo uploads work for cover, chapter hero, chapter lodge — all
  routing through the existing `/api/admin/upload` endpoint and
  image pipeline v2
- Chapter add/delete/reorder reflects correctly; transits stay in
  sync with chapter count
- Default practicals populate on new trips and are editable
- `/admin/itineraries/[id]/preview` renders the editorial design,
  matching `source-prototype/Itinerary.html` visually
- Theme locked to savanna/editorial/spacious — no picker UI
- Caveat + Newsreader fonts loaded; Cormorant Garamond + Inter
  reused from existing layout
- Print CSS produces a clean A4 PDF via Mac Print > PDF, matching the
  acceptance criteria in `handoff/design_handoff_itinerary/README.md`
  §11
- `handoff/PRINT_TO_PDF.md` exists with the documented workflow
- Tests pass (node:test + vitest)
- `tsc --noEmit` clean across the new routes
- PR description references this brief and links to the design handoff
  folder
- PR description notes Phase 4 (PDF microservice) and Phase 5 (publish
  workflow, public URL) as explicitly deferred

When done, push the branch, open a PR back to main, and tell Dom the
preview URL.
