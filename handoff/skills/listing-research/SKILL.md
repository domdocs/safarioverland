---
name: listing-research
description: |
  Researches an African safari property from public web sources and drafts
  a publishable editorial listing for safarioverland.com — in Safari Overland
  brand voice, ready for human verification, operator outreach, and import
  into the directory_listings table. Use when the user asks to "research a
  property", "draft a listing for [property]", "do the listing pipeline
  for [property]", or names a property they want surfaced into the
  collection.
---

# Listing research — Safari Overland

A repeatable pipeline for turning a property name into a publishable
draft listing. Bound to the Safari Overland brand voice and the
`directory_listings` schema. The output is a research record file that
goes through human sense-check before being imported into the admin.

## When to invoke

Trigger phrases:

- "Research [property]"
- "Draft a listing for [property]"
- "Run the listing pipeline on [property]"
- "Add [property] to the collection"
- Any time the user names a candidate property after the
  discovery/criteria step (see `handoff/listing-discovery-criteria.md`).

## Inputs

Minimum: the property name.

Helpful: the operator's website URL (saves a search step), Dom's
local knowledge of the property, any prior research record from
discovery phase.

If only the property name is given, search for the operator's site.
Confirm with the user before proceeding if the property is ambiguous
(e.g. "Wilderness" — which Wilderness camp?).

## Required context files (read first)

Always read these before drafting. They define the voice and the
schema the draft must match.

1. `handoff/BRAND_VOICE.md` — voice principles, twelve unforgivables,
   lexicon, tone modulation. Non-negotiable.
2. `handoff/LISTINGS_AUDIT.md` — schema of editorial fields and what
   each surfaces on the listing detail page.
3. `handoff/listing-discovery-criteria.md` — what counts as a fit and
   what the red flags are.
4. `handoff/skills/listing-research/research-record-template.md` — the
   output format with YAML frontmatter the import API parses.

If any of these have changed since last invocation, re-read.

## Pipeline

### Step 1 — Source gathering (5 min)

WebFetch the operator's site. Try the main page first, then walk
through these common sub-paths (skip 404s):

- `/about` or `/our-story` or `/who-we-are` — ownership, founder, history
- `/conservation` or `/sustainability` or `/our-impact` — programmes,
  named partners, specific numbers
- `/community` — local hiring, schools, projects
- `/experiences` or `/activities` — the activity mix
- `/accommodation` or `/rooms` or `/suites` — unit counts, capacity
- `/dining` or `/cuisine` — if gastronomy seems distinctive

Quote the operator's own language where it's specific or distinctive.
Don't paraphrase unless asked.

Other useful sources (when accessible):

- TripAdvisor — for aggregate rating, review count, common praise/complaint
- Booking.com — for unit counts if the operator site doesn't disclose
- Industry coverage if it surfaces (Conde Nast Traveler, Travel + Leisure)
- Named conservation partner pages (African Parks, Painted Dog
  Conservation, etc.) — if the operator names them, the partner's own
  site sometimes corroborates the relationship.

### Step 2 — Draft the editorial fields in brand voice

Open `handoff/skills/listing-research/research-record-template.md`
and fill in every field you can. Where a field needs operator input
or human verification, leave the value null and note it under the
"Outstanding gaps" section.

Each field has a confidence rating (high / medium-high / medium /
low). Use them honestly. Confidence is *not* about how confident you
are in your *writing*; it's about how confident you are that the
*claim* is factually correct. Conservation specifics with named
partners and numbers from the operator's own conservation page =
high. A signature_experience inferred from photographs alone =
medium at best.

**Brand voice non-negotiables when drafting:**

- Never use any of the twelve unforgivables from `BRAND_VOICE.md`
  (*transformative, transformational, transform, unforgettable,
  once-in-a-lifetime, amazing, incredible, breathtaking, stunning,
  embark, odyssey, journey of discovery, awaken your senses,
  discover (as transitive verb), passionate, luxury (as adjective
  applied to Safari Overland), state-of-the-art, best-in-class,
  world-class, !, Title-Case headlines, every (as sweeping
  marketing adjective)*)
- Sensory but specific, never generic poetry
- Editorial register — magazine editor of an old travel quarterly,
  not booking-site copy
- The wild as agent ("what the wild does to you")
- British English

Field-by-field guidance:

- **verdict (1 sentence):** the "we'd send this here" line.
  Specific, restrained, gives one anchored reason. Often a strong
  candidate for human override if the user has personal experience.
- **signature_experience (1 paragraph):** what makes *this* stay
  distinctive. The thing only this property offers, written with one
  specific sensory anchor. If two things are distinctive (river +
  table at Matetsi), name both.
- **conservation_summary (~200 chars):** named programmes, named
  partners, specific numbers. *"Painted Dog Conservation since 2014,
  bed-night levy $80, ranger-employed-per-bed-night = 0.4"* is the
  shape. Vague *"passionate about wildlife"* is the shape we don't write.
- **community_summary (~200 chars):** same shape. Specific. Named
  schools, named percentages, named projects.
- **wellness_offerings[]:** array of concrete offerings (spa, yoga,
  silent walks, sleep-out platform). Don't pad with assumptions.
- **activities[]:** what guests actually do. Use the same vocabulary
  as `LISTINGS_AUDIT.md` (walking safari, mokoro, night drive,
  balloon, sleep-out, tasting menu). One word/phrase per array item.
- **best_time_to_visit (1 sentence):** seasonal logic anchored to the
  region's actual rhythms, not generic "year-round."
- **price_tier:** one of `budget / mid / luxury / exclusive`. If
  rates aren't public, infer from Virtuoso / Mr & Mrs Smith
  affiliations, capacity, market positioning. State the inference.

### Step 3 — Outstanding gaps + operator outreach

List under "Outstanding gaps" anything that needs human verification
or operator input. Categorise:

- **For Dom to confirm:** anything local knowledge would resolve
  (e.g. "is the walking safari a real thing here or just on the
  website?")
- **For operator outreach:** photographs, founder note, traveller
  quotes, anything proprietary
- **For Dom to fetch:** TripAdvisor rating + review count + URL
  (a 60-second look-up), coordinates from Google Maps

Then generate the personalised Template A operator outreach email
(see `handoff/LISTINGS_AUDIT.md` for the template). Personalise the
property name and lodge name; sign as Niels van de Meer with
`niels@safarioverland.com`; add 2–3 specific clarifying questions
based on the gaps you flagged.

### Step 4 — Write the file

Path: `handoff/listings/[slug].md`

Slug rule: lowercase, hyphenated, matches the operator's likely
public-facing slug. `matetsi-victoria-falls`, `royal-chundu`,
`the-elephant-camp`, etc.

The file uses YAML frontmatter (parseable by the import API) plus
human-readable body (for context, confidence ratings, outreach
email, sign-off checklist).

See `research-record-template.md` for the exact format.

### Step 5 — Report back

Summarise to the user:

- The file path
- The verdict (so they can sense-check immediately without opening)
- The signature_experience (same)
- The 2–3 top "outstanding gaps" requiring their input
- A one-line note on overall confidence

Keep the summary short. Detail lives in the file.

## Quality bar

A research record is "good enough to send to operator outreach" when:

- Every field is either filled or explicitly null with a reason
- No unforgivables in the drafted copy
- The verdict reads in brand voice (no marketing register)
- Conservation and community sections are specific, with named
  programmes or partners — not vague intent
- The operator outreach email asks the actual clarifying questions
  that emerged from the research, not just generic boilerplate

A research record is "ready to import" when:

- Dom has done a verification pass on the markdown
- Outstanding-gap items requiring his input are resolved or noted
- The verdict reflects his personal voice if he has personal experience

## When the pipeline doesn't work

If a property's public web presence is thin, the WebFetch will return
mostly generic marketing copy. In those cases, the draft will be
correspondingly thin — and that's the right output. Don't invent
substance. Leave fields null, flag the gaps, send a longer operator
outreach email asking for the missing material directly.

If a property's brand voice is fundamentally off (chain hotel,
mass-market positioning, no conservation programme detectable), say
so. The discovery criteria document is clear: not every property
fits. The right answer is sometimes "this isn't a Safari Overland
listing." Better to drop it than to write an editorial draft that
hides a wrong-fit underneath.

## Related files

- `handoff/BRAND_VOICE.md` — voice reference
- `handoff/LISTINGS_AUDIT.md` — schema + workflow + outreach templates
- `handoff/listing-discovery-criteria.md` — region-level discovery
- `handoff/skills/listing-research/research-record-template.md` — output format
- `handoff/briefs/2026-05-LISTING_IMPORT_API.md` — the import API spec
- `handoff/listings/matetsi-victoria-falls.md` — canonical example
