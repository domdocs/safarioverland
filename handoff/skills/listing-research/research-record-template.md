# Research record template

The output format every listing draft must conform to. YAML frontmatter
at the top (machine-parseable, mirrors the `directory_listings` schema).
Human-readable body below (for context, confidence ratings, operator
outreach, and the sign-off checklist).

The import API parses the frontmatter and writes a row to
`directory_listings` with `status='pending'`. The body of the markdown
goes into the `editor_notes` column verbatim, so context survives the
import for the human reviewer in `/admin/listings/edit/[id]`.

---

## Template (copy this when drafting a new record)

```markdown
---
# Required fields (the import API will fail without these)
listing_name: "Matetsi Victoria Falls"
category: "Lodges"             # one of the existing category values
region: "Southern Africa"
country: "Zimbabwe"
location: "Matetsi Private Game Reserve, Zambezi River"

# Recommended fields (publishable listings will have these)
description: |
  A 136,000-acre family-owned private concession on the Zambezi River
  upstream of Victoria Falls. Run by the Gardiner family with an in-house
  anti-poaching unit.
website: "https://matetsivictoriafalls.com"
image_url: null                # operator-supplied hero, fill from outreach
featured: false                # set true only after Dom approves home rotation
status: "pending"              # always pending on import; Dom flips to approved

# Editorial fields (the heart of the listing)
verdict: >
  A 136,000-acre private concession on the Zambezi, run by the Gardiner
  family and underwritten by the kind of in-house anti-poaching programme
  that makes the scale meaningful.
signature_experience: |
  Two things mark Matetsi out — the river and the table. Nine miles of
  private Zambezi frontage make the boat the central rhythm of a stay:
  sunrise cruises that find the same hippos in the same channels day after
  day, sundowners on the water rather than under a tree. The kitchen earns
  equal weight — Zimbabwean cooking taken seriously, with a precision and
  a sense of place you don't always find in safari kitchens.
conservation_summary: |
  The Gardiners' in-house Amaganyane anti-poaching team runs the reserve —
  donated vehicles, sixty kilometres of radio coverage, regular de-snaring
  on the river. Sixteen solar boreholes and active translocation back the
  protection.
community_summary: |
  Over 200 staff, 99.5% Zimbabwean, 60% from local communities. Junior
  guides trained on-site into tracker roles. GRACE Foundation partnership
  funds education, healthcare, and rural livelihoods around the reserve.

# Array fields (use list syntax, one item per line)
wellness_offerings:
  - "spa"
activities:
  - "game drive"
  - "sunrise river cruise"
  - "sunset river cruise"
  - "Victoria Falls excursion"
  - "scenic flight"
  - "tasting menu"

# Founder / owner story (filled from operator outreach)
founder_name: null            # e.g. "Stein Gardiner"
founder_note: null            # the 50-word note from the operator
founder_image_url: null       # operator-supplied portrait

# Pull-quotes and external ratings (JSONB arrays — use list of mappings)
traveller_quotes: []
# Example shape when filled:
# traveller_quotes:
#   - quote: "The fifth time we've stayed and still finding new corners."
#     attributed_to: "Sarah K., London"
#     trip_year: 2024

external_ratings: []
# Example shape when filled:
# external_ratings:
#   - source: "TripAdvisor"
#     rating: 4.9
#     max: 5
#     count: 487
#     url: "https://www.tripadvisor.com/..."
#     fetched_at: "2026-05-12"

gallery_urls: []              # operator-supplied additional photography

# Practical detail
max_guests: 45                # approximate; refined by operator
best_time_to_visit: |
  April to October — the dry season. The river is full from the rains,
  the bush thins, the game funnels to water. November to March is the
  green season: birds, calving, dramatic skies, fewer guests, lower rates.
price_tier: "luxury"           # one of: budget / mid / luxury / exclusive

# Geographic precision (Google Maps right-click → copy lat/long)
latitude: null                 # e.g. -18.0123
longitude: null                # e.g. 25.7456

# Cross-references
field_notes_slugs: []          # slugs of articles featuring this property

# Internal-only — never shown publicly
editor_notes: |
  Strong conservation substance — Amaganyane Unit is the editorial
  headline if Dom hasn't stayed. Family-owned, independent — good fit.
  Public material is generic-marketing in places ("ultimate safari
  experience"); the conservation page is much more substantive.
  Dom (local knowledge, May 2026): verdict rings true; gastronomy is a
  real distinctive marker that the public site underplays. Walking
  safaris still unconfirmed — ask in outreach.

# Contact (filled from operator outreach when applicable)
contact_name: null
contact_email: null
contact_phone: null
price_info: null               # legacy free-text; price_tier supersedes it
---

# [Property Name] — research record

**Status:** Draft (AI-generated from public sources). Awaiting Dom's
verification, operator outreach, and personal verdict overlay.

**Pipeline stage:** Draft complete · operator outreach pending ·
publish blocked on photos + founder note + Dom verification.

## Sources

Public materials pulled [date]:

- [link 1]
- [link 2]
- ...
- *(Pages that returned 404 — list so future drafts know which paths the operator doesn't expose.)*

## Verified facts (from public material)

Bullet list of what's confirmed from the operator's own site, with
short attribution. This is the audit trail.

## Confidence ratings per field

For each editorial field above:

- `verdict` — confidence level + reason
- `signature_experience` — confidence level + reason
- `conservation_summary` — confidence level + reason
- ...etc

Levels: **high** (verified from operator's own conservation/about
page), **medium-high** (operator material confirms the claim broadly
but the exact phrasing is editorial), **medium** (inferred from
context), **low** (best guess, needs verification).

## Outstanding gaps

Categorised:

### For Dom to confirm
- Local-knowledge items

### For operator outreach
- Photographs, founder note, traveller quotes
- Specific clarifying questions

### For Dom to fetch
- TripAdvisor rating + count + URL
- Coordinates from Google Maps

## Operator outreach — Template A, personalised

The actual email to send. Includes the 2–3 specific clarifying
questions that emerged from the research. Signed by Niels.

## Sign-off checklist (before publishing)

- [ ] Dom verifies the verdict
- [ ] Outstanding-gap items resolved
- [ ] Operator photography permissioned and uploaded to `gallery_urls`
- [ ] Founder note received and entered
- [ ] At least one traveller quote with permission
- [ ] TripAdvisor rating fetched and added to `external_ratings`
- [ ] Coordinates added
- [ ] `price_tier` finalised
- [ ] Status flipped to `approved`; `featured` ticked if home rotation
```

---

## Notes on YAML conventions

**Long string fields** (verdict, signature_experience, etc.):

- Use `>` for "folded" strings where line breaks become spaces — good
  for a paragraph wrapped across multiple source lines.
- Use `|` for "literal" strings where line breaks are preserved — good
  for multi-paragraph content.
- Always indent the continuation lines by two spaces.

**Arrays of strings** (wellness_offerings, activities, gallery_urls):

- One item per line, prefixed with `- ` and two-space indent.
- Empty arrays: `field_name: []` on a single line.

**JSONB arrays** (traveller_quotes, external_ratings):

- List of mappings — each item starts with `- ` then has indented
  key-value pairs underneath. See the commented examples in the
  template.

**Null values:**

- Use `null` (or `~`) explicitly. Don't leave the value blank — the
  parser may interpret an empty value as an empty string instead of null.

**Booleans:**

- `true` / `false` (lowercase).

## Validation rules the import API will enforce

The API rejects the import if:

- `listing_name`, `category`, `region`, `country`, or `location` is null
- `category` isn't one of the existing valid values
- `price_tier` isn't one of `budget / mid / luxury / exclusive` (null is allowed)
- `status` is anything other than `pending` at import time (publishable
  listings get flipped to approved in admin, not at import)
- `latitude` / `longitude` are present but out of valid range
- `traveller_quotes` or `external_ratings` don't match their JSONB
  shape

The body of the markdown (everything after the closing `---`) is
copied verbatim into `editor_notes`, replacing whatever's in the
frontmatter's `editor_notes` field if both are present.
