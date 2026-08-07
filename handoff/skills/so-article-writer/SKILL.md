---
name: so-article-writer
description: |
  Researches and drafts a Safari Overland Field Note from an idea in the
  backlog, in brand voice, and pushes it to the articles table as a draft
  for human review. Use when the user asks to "write a field note",
  "draft an article about X", "run the article routine", "pull the top
  idea off the backlog", or names a subject they want written up for
  safarioverland.com.
---

# Article writer — Safari Overland

A repeatable pipeline for turning an idea into a published-ready Field Note.
Bound to the Safari Overland brand voice and the `articles` schema. Output is
a database row at `status='draft'` — invisible to the public until a human
flips it. **This skill never publishes.**

Companion to `handoff/skills/listing-research/SKILL.md`, which does the same
job for lodges. Where that skill produces a markdown file for import, this one
writes directly to the API.

## When to invoke

- "Write a field note about [subject]"
- "Draft an article on [subject]"
- "Run the article routine"
- "Take the top idea off the backlog"
- Any time a subject is named for the Field Notes section.

## Required context files (read first)

Non-negotiable. Re-read if they have changed since the last run.

1. `handoff/BRAND_VOICE.md` — voice principles, the twelve unforgivables,
   lexicon, tone modulation. Field Notes sit at the most flexible end of the
   tone table: wry, journalistic, even argumentative. Opinionated is the asset.
2. `handoff/CHANGELOG.md`, top three entries — what shipped recently and what
   is currently broken.
3. The brain, in the private `ops-state` bucket (see **The brain** below).
4. `app/field-notes/` in the repo — the 58 hand-authored pages. **Read the
   list of paths before drafting.** Duplicating an existing note is the most
   likely failure of this skill.

Canonical worked example: the published rhino piece,
`/field-notes/hwange-community-rhino-conservation`. Read it when unsure what
the target looks like.

## The brain

State lives in the private Supabase Storage bucket `ops-state`, under `brain/`.
Read it at the start of every run and write to it at the end. A routine that
skips this is an amnesiac freelancer.

```
brain/ideas-backlog.json      scored ideas, status open|drafting|drafted|published|dropped
brain/editorial-calendar.json what has published and when
brain/memory.json             append one entry per run: did / learned / next
```

Read with the service-role key from `ops/credentials.md`:

```
GET https://<ref>.supabase.co/storage/v1/object/ops-state/brain/<file>
Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
```

Write back with `POST` to the same path and `x-upsert: true`.

**Parse `credentials.md` with a real parser, never by sourcing it in a shell** —
`ADMIN_PASSWORD` contains shell-special characters.

## Pipeline

### Step 1 — Choose the subject

If the user named one, use it. Otherwise take the highest-scoring `open` idea
from the backlog, subject to two rules:

- **Never below score 12** without logging the reason in `memory.json`.
- **Never the same category twice running.** Check the last two entries in
  `editorial-calendar.json`. A destination guide, then a conservation piece,
  then a seasonal one — the rotation is what makes the output read as an
  agency rather than a feed.

Set that idea's status to `drafting` before you start, so a parallel run
cannot pick it up.

### Step 2 — Check you are not duplicating

List `app/field-notes/` and compare against the subject. The existing tree is
broad and generic — Kenya, Tanzania, Morocco, packing lists. Safari Overland's
actual territory is Victoria Falls, Hwange, the Zambezi and Botswana, which is
where the gaps are.

If an existing note covers the ground, either sharpen the angle so the two are
complementary and link to it, or drop the idea and take the next one. Log
which you did.

### Step 3 — Research properly

Research first. Do not begin drafting until the facts are in hand.

- Prefer primary sources: the organisation's own site, the park authority, the
  research programme, the operator.
- Corroborate anything load-bearing against a second source.
- **When sources disagree, say so in the piece.** The published rhino note does
  exactly this on the date the original population was lost. Disagreement
  reported honestly reads as authority; a confident wrong number does not.
- Record what you could not confirm.

Rules on factual claims:

- Never state a figure you have not seen in a source.
- Attribute contested or self-serving claims to whoever made them
  ("Imvelo describes it as a world first").
- Prices, park fees, seasons, visa rules and distances are the claims that
  destroy a travel site's credibility. Check them or leave them out.
- **Never invent first-hand experience.** Field Notes may be written from
  research, but a first-person account requires Dom's real notes. If the piece
  wants a first-person anchor and none exists, write it in the editorial "we"
  or ask him for one.

### Step 4 — Draft

Structure varies by type; these hold for all of them:

- Open with something specific and physical, not a thesis statement.
- Sentence-case `##` headings. Never Title Case.
- British English throughout.
- Numbers: spell out one to nine, numerals from 10.
- Em dashes are welcome. Exclamation marks are not, anywhere.
- Vary sentence rhythm. Short sentence. A longer one that lets a clause
  breathe. A fragment.
- **Include a section that says the unglamorous thing plainly.** The rhino
  piece has "What we would say plainly" — four animals is a demonstration, not
  a population. Safari Overland has nothing to sell, and that candour is the
  brand asset. A piece without it is off-voice even if every word passes the
  filter.
- Close with where to see it, linking to lodges in the collection.

**Internal linking is a requirement, not a nicety.** Every article links to at
least one approved listing, and those listing ids go in `related_listing_ids` —
it is a real database column, not a convention. Query the approved listings
first:

```
GET /rest/v1/directory_listings?status=eq.approved&select=id,listing_name,location
```

Link only where the connection is honest. Where a lodge is named but is not
part of the story, say so — the rhino piece states plainly that three of its
four linked lodges are not part of the initiative.

Length: 900–1,400 words. `read_minutes` is words ÷ 200, rounded.

### Step 5 — Check the voice before submitting

Mechanically check the draft for the twelve unforgivables:

`transformative`, `transformational`, `transform`, `unforgettable`,
`once-in-a-lifetime`, `life-changing`, `amazing`, `incredible`, `breathtaking`,
`stunning`, `embark`, `odyssey`, `journey of discovery`, `awaken`, `discover`
(as a marketing verb), `passionate`, `luxury` (applied to Safari Overland),
`state-of-the-art`, `best-in-class`, `world-class`, `!`, Title-Case headings,
`every` as a sweeping adjective.

Also check: no US spellings; `travellers` not guests or clients; *the
collection* not *the directory*; *Field Notes* capitalised, never *blog* or
*articles* in user-facing copy.

Then read it once against the standing question from `BRAND_VOICE.md`: *would
a magazine editor of an old, careful travel quarterly write this?* If not, cut
a sentence and try again.

### Step 6 — Push as a draft

`POST /api/admin/articles` with HTTP basic auth from `ops/credentials.md`:

```json
{
  "slug": "lowercase-hyphenated",
  "title": "Sentence case, no title case",
  "category": "planning|safety|conservation|seasonal|travellers|wildlife|culture|gear",
  "status": "draft",
  "excerpt": "One sentence. Shown on cards and in search results.",
  "body_md": "Markdown WITHOUT an H1 — the page renders the title as the h1",
  "read_minutes": 5,
  "author_name": "Niels van de Meer",
  "related_listing_ids": ["<uuid>", "..."]
}
```

Schema traps, all learned the hard way:

- **`category` is required** and validated against the enum. Omit it and older
  builds returned an opaque 500.
- **Strip the H1 from `body_md`.** The page renders `title` as the `<h1>`;
  leaving one in the markdown produces two.
- **Reserved slugs are rejected**: `conservation`, `faqs`, `planning-guides`,
  `safety-tips`, `seasonal-guides`. They collide with static routes and would
  make the article unreachable.
- **`status` is always `draft`.** This skill does not publish.

### Step 7 — Hero image

Upload rather than linking to someone else's host. `hero_image` is validated
against the image allow-list and a page URL will be rejected.

```
POST /api/admin/upload   multipart: file, article_id, slot=hero
```

The route strips EXIF. **Do not bypass it** — geotagged photographs of rhino
and other poached species are a live risk.

If no image with clear rights exists, leave `hero_image` null and flag it in
the report. A missing hero is a visible gap on the index card and in link
previews, but it is better than an image whose provenance cannot be shown.
Record the credit in `image_attribution`.

### Step 8 — Write back to the brain and report

- Set the idea's status to `drafted` in `ideas-backlog.json`.
- Add an entry to `editorial-calendar.json`.
- Append to `memory.json`: what was drafted, what was learned, what is next.

Then report to the user, briefly:

- the slug and the admin URL for review
- the angle in one line
- any factual claim you could not confirm
- whether a hero image is attached
- which listings it links to

Detail lives in the piece. Keep the summary short.

## Quality bar

A draft is ready for review when:

- Every factual claim is sourced, or explicitly flagged as unconfirmed
- No unforgivables; British English throughout
- It links to at least one approved listing, honestly, with ids in
  `related_listing_ids`
- It contains at least one passage that says something other safari sites
  would not
- It does not duplicate any of the 58 existing field notes
- It reads as though a person with an opinion wrote it

## When not to write

Some ideas should be dropped rather than drafted. Say so and move on:

- The research turns up nothing specific, and the piece would be generic
- The subject is already covered by an existing note and the angle will not
  separate
- The honest version would be commercially awkward — write it anyway, or drop
  it, but never write the dishonest version
- The piece needs first-hand experience nobody has

Mark the idea `dropped` with a reason in `notes`, and log it in `memory.json`.
An empty week is better than a thin piece under the Safari Overland name.

## Related files

- `handoff/BRAND_VOICE.md` — voice reference, twelve unforgivables
- `handoff/skills/listing-research/SKILL.md` — the sibling pipeline for lodges
- `handoff/CHANGELOG.md` — what shipped, what is broken
- `/field-notes/hwange-community-rhino-conservation` — canonical worked example
- `ops-state` bucket, `brain/` — backlog, calendar, memory
