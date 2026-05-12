# Phase 2 — better intake, results, and CTAs

## Source

A strategic brief came in from an outside review (Grok) proposing a
move toward "transformative luxury safari planning." The surface
language conflicted with `handoff/BRAND_VOICE.md` — *transformative*,
*luxury*, *Discover. Plan. Transform.*, *Your Journey into Africa's
Soul*, *25+ years expertise*, title-case headlines and so on are all
on the unforgivables list.

The strategic intent underneath, though, is sound. The site has shipped
the editorial repositioning but the conversion mechanics behind `/plan`
are still thin: a single free-form brief form, no structured intake, no
interim feedback to the user, no formal call slot.

This brief takes the strategic spine of the outside review and
re-skins it in BRAND_VOICE.md language for Code to ship.

---

## What's in scope

1. **Restructure `/plan` as a guided eight-step intake.** Replace the
   current free-form form with a multi-step flow that captures the
   right shape of information, with a progress indicator, in the
   editorial register.
2. **Add an interim results screen after submission.** Acknowledge
   what we heard, set the expectation for the 48-hour response,
   surface 2–3 operators we're already shortlisting. Not algorithmic
   matching — editorial holding-pattern.
3. **Add a "speak to a planner" call slot.** Calendly or similar,
   embedded under the existing button on home + plan + listing pages.
4. **Tighten the listing-detail CTAs.** Currently a listing page sends
   you back to the homepage. Add an "Add to a brief" / "Include in a
   draft route" CTA that links through to `/plan` pre-populated with
   the listing as context.
5. **Tighten the navigation.** Make `/plan` more findable; clarify
   `Field Notes`; trim what doesn't earn its place.

## What's out of scope

- No homepage hero rewrite. The current hero (*"Africa, slowly."* with
  the BY HAND — OPEN module) is on-voice and shouldn't be touched.
- No "transformative luxury" repositioning. The editorial voice in
  BRAND_VOICE.md stands.
- No "25+ years expertise" claim anywhere. We are not a 25-year
  authority. We are a small editorial collection writing from Vic
  Falls.
- No "archetype" labelling. We don't categorise travellers — we
  draw routes for them.
- No "Discovery Calls" branding. We use *a call with a planner* /
  *speak to a planner* — already established.

---

## 1. Eight-step intake — `/plan`

Replace the current free-form brief form with a guided flow. Each
step is one question, full-screen, with the question rendered in the
editorial register and 2–6 answer options where appropriate. Free-text
where appropriate.

Visual treatment: serif question typography matching the rest of the
site. Mono progress indicator (`01 / 08`, `02 / 08`...). Amber accent
on one word per question, italic, matching the home page treatment.

### The eight questions

#### Step 01 — *When could you travel?*

> Single-select. The months matter for season, game-viewing, climate.

Options:
- Specific months (multi-select chips: Jan / Feb / Mar / Apr / ...)
- Open to suggestions
- Free text: "We're flexible — anywhere in the next twelve months"

#### Step 02 — *What kind of trip are you chasing?*

> Multi-select, up to three. Captures intent without forcing a label.

Options:
- A first proper safari
- Walking and tracking on foot
- The big migrations and crossings
- Wildlife photography
- A slower trip — fewer moves, longer stays
- A wellness rhythm — yoga, silence, sleep-outs
- A trip with conservation work or community visits
- A family safari that works for children
- A honeymoon or anniversary
- A solo trip with a planner's hand
- Something else (free text)

#### Step 03 — *The rhythm.*

> How busy do you want the days to be?

Single-select:
- **Slow.** One or two camps, long stays, deep time in a single
  landscape.
- **Mixed.** Two or three camps, a thread that ties them together.
- **Active.** Multi-camp, moving every two or three nights, more
  ground.

#### Step 04 — *The kind of quiet you want.*

> Multi-select. Optional. Captures the texture of the trip more than
> the substance.

Options:
- Walking days with a guide who can read a track
- Sundowners, slow drives, no fixed schedule
- Time enough to read, write, or do nothing
- Yoga or stretching on offer at the camp
- Silent walks or meditation on offer
- A sleep-out platform under stars
- An open fire, a proper bath, an early bed
- None of the above — I want excitement

#### Step 05 — *The wildlife or landscape you're after.*

> Multi-select. The specifics anchor everything.

Options:
- The big cats — lion, leopard, cheetah
- Elephants in large herds
- Gorillas or chimpanzees on foot
- The great migration — wildebeest crossings
- Big walking landscapes — Mana Pools, South Luangwa
- Desert / dune country — Namibia, the Skeleton Coast
- Wetland country — the Okavango, the Linyanti
- Mountain or forest — Bwindi, Mahale, the Aberdares
- Rare or specialist sightings (free text)

#### Step 06 — *How long, give or take?*

> Single-select.

Options:
- 5–7 nights
- 8–10 nights
- 11–14 nights
- More than two weeks
- I'm not sure — talk me through it

#### Step 07 — *Season preference, if any.*

> Single-select.

Options:
- Dry / high season — best game, busier camps, higher prices
- Green / shoulder season — quieter, lush, fewer animals at waterholes
- Migration windows — specific to East Africa
- No preference — work it around our months

#### Step 08 — *Comfortable budget, per person per night.*

> Single-select. Names should match BRAND_VOICE.md's price-tier
> naming (budget / mid / luxury / exclusive) but the user-facing
> labels should be specific to the trip, not the brand.

Options:
- Up to $500 per person per night, all-in
- $500–$1,000 per person per night, all-in
- $1,000–$2,000 per person per night, all-in
- $2,000+ per person per night, all-in
- I'd rather discuss this on a call

Add a free-text field at the end, optional, headed:

> *Anything else we should know?*
> Anniversaries, mobility, dietary, allergies, the trip that lodged in
> your head ten years ago — anything.

Then a final review screen with all answers, an editable summary, and
a single primary CTA: **Send the brief →**

---

## 2. Interim results screen

After submission, the user lands on a results page (`/plan/sent` or
similar). This is editorial holding-pattern, not algorithmic
matching. The page shows:

### Header

> *Brief received.*
>
> Three routes — drawn by hand — within 48 hours.

### What we heard

Reflect the brief back in three or four sentence summaries, in the
editorial voice:

> Slow rhythm, eight to ten nights, walking days, green season. Big
> cats and elephants. Budget around $1,200 per person per night.

(Render dynamically from the answers — same content, prose form.)

### A shortlist forming

Show 3–4 operators from the kept-list that match the brief at a high
level. This is not "your matched results" — it's "the names already on
our shortlist for this kind of trip." Phrasing matters:

> Already on our shortlist for a trip like this:
>
> — Lodge name, location. *One sentence of editorial verdict.*
> — Lodge name, location. *One sentence of editorial verdict.*
> — Lodge name, location. *One sentence of editorial verdict.*
>
> The three routes will weigh these and others against your specific
> dates, rhythm, and budget.

Algorithm for shortlisting: simple, deterministic, not ML.

- Filter `directory_listings` to `status = 'approved'` and `featured = TRUE`
- Filter by region if Step 07/05 implies it
- Filter by price_tier matching Step 08
- Cap at 4
- Order by Dom's editorial priority field (`featured_rank` if it exists,
  else `updated_at desc`)

If the filter returns fewer than 2 matches, omit the shortlist
section and say only:

> Your brief is unusual enough that we'd rather think on it before
> shortlisting. Niels will read it personally this week.

### Call slot

Below the shortlist, a clear CTA:

> *Want to talk it through first?*
>
> [Calendly embed: 30-min slot with a planner]

The Calendly link should go to whatever Niels sets up — `niels-30min`
or similar.

### What happens next

> Niels and the planning team will read your brief and come back with
> three drawn-by-hand routes, at different rhythms and budgets, within
> 48 hours. We don't take commission, we don't add markup, and we'll
> tell you when a different specialist is a better fit than we are.

---

## 3. Speak-to-a-planner call slot

Add a Calendly embed (or equivalent — Cal.com is open-source and free,
worth considering) accessible from:

- Home page — beneath the existing "Speak to a planner" button. Click
  opens a modal with the Calendly embed.
- `/plan` — at the end of the eight-step intake as an alternative to
  submitting the form ("Or speak to a planner first").
- `/plan/sent` — under the interim results, as above.
- Every listing-detail page — small CTA in the meta column.

Niels owns the calendar. Slot length 30 min. Calendly form should
include: name, email, the safari they're thinking about (free text),
how they heard about us.

---

## 4. Listing-detail CTAs

Currently the listing detail page (`/listings/[id]`) ends without a
strong forward action. Add two CTAs in a sticky right-hand column or
beneath the body:

- **Primary, amber filled:** *Add this to a brief →*
  Links to `/plan?listing=[id]`. The intake flow detects the `listing`
  param and pre-populates Step 05 (wildlife/landscape) and Step 07
  (region) from the listing's metadata, and adds a chip at the top:
  *"Including [Lodge name] in this brief"*.

- **Secondary, outline:** *Speak to a planner →*
  Opens the Calendly modal.

---

## 5. Navigation tightening

Current top nav: `Categories · Destinations · Field notes · About`

Two changes:

### A. Add `By hand` as a top-level item

Currently `/plan` is reachable only via the BY HAND — OPEN module on
the home page and via inline CTAs. It should be in the main nav,
between `Destinations` and `Field notes`, named simply **By hand**.

New nav: `Categories · Destinations · By hand · Field notes · About`

### B. Audit `Categories`

The Categories page lists every category including 4×4 rentals,
Booking agents, Campsites, Flights, Game viewing, Guided tours,
Luxury safari lodges, Overland tours. Per LISTINGS_AUDIT.md, we are
moving away from breadth.

Two options:
- **Demote `/categories` from the nav, replace with `/collection`** —
  the new home for the curated list, organised by region and pace
  rather than by transactional category.
- **Keep `/categories` but trim the visible list** — show only
  Lodges, Guided tours, Game viewing in the nav-revealed menu; the
  others still exist at their URLs for SEO but are not surfaced.

Recommend the second option as a Phase 2 move; the first as a Phase 3
once the kept-list is fully populated.

---

## Schema notes for Code

Look for `directory_listings.price_tier` (added in the editorial
fields migration) — Step 08 of the intake should map directly to
this tier. Also `directory_listings.featured` and `featured_rank` (if
it exists; if not, add it as a nullable integer, smaller = higher
priority).

The intake form's eight answers should be persisted to a new `briefs`
table column or extended structure. The current `briefs` table has a
free-text body; we want structured fields too. Don't drop the free
text — keep it as the Step 08 "anything else" payload.

Suggested schema additions (new migration):

```sql
ALTER TABLE briefs
  ADD COLUMN IF NOT EXISTS months TEXT[],
  ADD COLUMN IF NOT EXISTS intent TEXT[],
  ADD COLUMN IF NOT EXISTS rhythm TEXT
    CHECK (rhythm IS NULL OR rhythm IN ('slow','mixed','active')),
  ADD COLUMN IF NOT EXISTS quiet_markers TEXT[],
  ADD COLUMN IF NOT EXISTS wildlife_priorities TEXT[],
  ADD COLUMN IF NOT EXISTS duration TEXT,
  ADD COLUMN IF NOT EXISTS season_preference TEXT,
  ADD COLUMN IF NOT EXISTS budget_tier TEXT
    CHECK (budget_tier IS NULL OR budget_tier IN ('budget','mid','luxury','exclusive')),
  ADD COLUMN IF NOT EXISTS source_listing_id UUID
    REFERENCES directory_listings(id);
```

Existing `briefs` rows continue to work — all new columns are
nullable.

The admin `/admin/briefs` page should render these structured fields
alongside the free-text body.

---

## Phasing and branching

This brief is sized for two passes, not one. Each pass is its own
feature branch off `main` (the new baseline since `design-experiment`
was merged in). `design-experiment` is a historical branch — don't
switch back to it.

### Pass 1 — intake + results (target: 1 week)

Branch: `feature/intake-flow`

```bash
git checkout main
git pull
git checkout -b feature/intake-flow
```

Work:
- Schema migration for `briefs` structured fields
- Multi-step intake UI for `/plan`
- Interim results page at `/plan/sent` with dynamic shortlist
- `briefs` admin page updates to surface structured fields

PR back to main when ready; verify on preview before merge.

### Pass 2 — call slot, CTAs, nav (target: second week)

Branch: `feature/call-slot-and-ctas`

Created off `main` after Pass 1 has merged:

```bash
git checkout main
git pull
git checkout -b feature/call-slot-and-ctas
```

Work:
- Calendly (or Cal.com) integration + modal component
- Listing-detail "Add to a brief" CTA + pre-populate logic
- Nav reshuffle (`By hand` added, `Categories` audit)

Ship Pass 1 first; verify on preview; then Pass 2.

---

## Verify

Pass 1:
- `/plan` renders the new eight-step flow with progress indicator
- All eight steps capture and persist data correctly
- A submitted brief writes structured fields into `briefs`
- `/plan/sent` renders the dynamic summary + shortlist
- The shortlist algorithm returns sensible matches against the
  current `directory_listings` data
- The admin `/admin/briefs` page surfaces the new structured fields

Pass 2:
- The Calendly modal opens from every entry point
- "Add to a brief" CTA pre-populates Step 05 and Step 07 from listing
  metadata
- Nav shows `By hand`; Categories menu trimmed per the recommendation
- All changes verified on the preview deployment, not just locally

---

## Out of scope reminders

- No "transformative" language. None.
- No "luxury" applied to Safari Overland as a brand adjective.
- No "Discovery Calls" naming. We use *a call with a planner*.
- No archetypes, profiles, personality types. We draw routes for
  individuals; we don't bucket them.
- No homepage rewrite.

## Done means

Pass 1 + Pass 2 both live on the preview, the structured intake is
collecting data, the call slot is bookable, listing detail pages route
into the intake properly, and the nav has `By hand` in it.

PR descriptions should reference this brief and BRAND_VOICE.md.
