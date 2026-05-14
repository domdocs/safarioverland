# Trip Designer — scope and phasing

This document scopes the Trip Designer feature before any Code briefs
are written. The design handoff at
`handoff/design_handoff_itinerary/` answers the visual, schema, and
PDF-rendering questions. What remains is engineering: where to draw
architectural lines, how to phase the work, and what to defer.

Once this scope is signed off, individual phases become standalone
briefs in `handoff/briefs/` following the established pattern.

---

## The shape of the feature

A staff-side tool (Niels, eventually a planner hire) for composing
custom multi-destination safari itineraries that render as a
high-fidelity editorial PDF. Replaces whatever generic third-party
tool you'd otherwise use with a bespoke, on-brand document.

The design treats the document as an editorial travel essay —
italic-display covers, drop-cap chapter intros, hand-traced country
maps, handwritten curator notes, full-bleed photography. The PDF is
the customer's primary takeaway. A web view is optional and can come
later.

This is the conversion mechanic for the entire brand: a brief comes
in via `/plan`, Niels (or a planner) drafts a personalised itinerary
in this tool, sends the PDF, the prospect either books through us
(direct DMC arrangement) or gets routed to a partner travel company.
The PDF is the editorial argument.

---

## Why this is substantial

Honest sizing: this is a 5-week piece of work end to end, broken into
five phases. Three reasons it's bigger than the briefs we've shipped
recently:

1. **Schema is non-trivial.** Itineraries contain ordered chapters and
   transits with cross-references. Multiple JSONB fields per chapter.
   Theme variants per trip. New migrations, new admin CRUD.

2. **The form has depth.** Trip metadata + N chapters (8 maximum) +
   N-1 transits + photos + practicals. Each chapter has ~15 fields
   including ordered sub-arrays (rhythm items, amenities, seeing
   list). Drag-to-reorder. Photo uploads per slot.

3. **PDF rendering is the hard part.** Server-side Chromium-headless,
   font self-hosting, page-break orchestration, asset preloading,
   probably a separate microservice because Puppeteer doesn't fit
   in Vercel function size limits.

We can absolutely build this. We just need to phase honestly.

---

## Architecture decisions

Nine decisions worth pinning down before any code is written. My
recommendation for each is given; flag if you'd rather go another
way.

### 1. Storage model — separate tables vs JSON columns

**Recommendation: separate tables for chapters and transits; JSONB
for the sub-arrays inside them.**

```
itineraries          ← one row per trip
  trip metadata, theme, status, slug, created_by

itinerary_chapters   ← N rows per itinerary, ordered
  trip_id, position, place, country, coords, nights, dates,
  intro (JSONB array of paragraphs), lodge (JSONB), rhythm (JSONB),
  seeing (JSONB array), note, photo_hero_url, photo_lodge_url

itinerary_transits   ← N-1 rows per itinerary
  trip_id, from_chapter_id, to_chapter_id, mode, duration,
  distance, crosses, note

itinerary_practicals ← one row per itinerary (or JSON on itineraries)
  cards (JSONB array)
```

Chapters and transits are first-class entities — they have IDs,
foreign keys, ordering. The sub-arrays inside them (rhythm items,
amenities) don't need their own tables; they're tightly coupled to
the chapter and don't have independent identity.

Alternative considered: single `itineraries` table with the entire
document as a JSONB column. Simpler to write the import, but you
lose query power (counts, joins, listing-by-chapter-location) and
referential integrity. Reject.

### 2. Form structure — single page / wizard / side-by-side preview

**Recommendation: single long page with collapsible sections for v1.
Side-by-side live preview in v2.**

The design handoff acknowledges live-preview is the best UX but
flags it as the most expensive to build. Single long page gets us
to functional quickly; live preview can graduate later when the
shape of the form is proven.

### 3. PDF rendering — where does Chromium run

**Recommendation: a small Playwright microservice deployed alongside
the main app. Not Vercel functions.**

Puppeteer or Playwright with bundled Chromium is ~150–250 MB.
Vercel's serverless function size limit is 50 MB compressed (Pro
tier). The `@sparticuz/chromium` trick works but is fragile across
Node versions and Chromium updates.

A small Node service on Render, Railway, or Fly.io (~$7/month) is
robust, reproducible, and survives Vercel's function-size churn.
The main app calls it over HTTP with the rendered HTML; it returns
the PDF binary.

Alternative considered: Browserless or DocRaptor (third-party
HTML-to-PDF SaaS). Quality is fine, costs are higher ($20–50/month),
introduces vendor lock for a relatively simple operation. Defer
unless self-hosting becomes a maintenance problem.

### 4. Public URL — yes/no for v1

**Recommendation: defer.**

The design handoff lists `/trips/[slug]` as "optional". For v1,
admin-side preview + PDF download is enough. Once the team is
sending PDFs and the workflow is stable, a public read-only URL
adds 1 day's work. Not blocking.

### 5. Theme variants — configurable per trip from day one?

**Recommendation: ship with savanna/editorial/spacious as default;
expose theme picker in Phase 4 or later.**

The CSS variable system supports the three palettes, three
typography variants, and two densities out of the box. But the
admin UI for picking them is incremental work. Default-only first;
configurable after the core flow works.

### 6. Image storage — existing bucket or new

**Recommendation: same `listing-media` bucket, new prefix.**

```
listing-media/
  [listing_id]/...                     ← existing
  itineraries/[itinerary_id]/
    cover/[uuid].webp
    [chapter_id]/hero/[uuid].webp
    [chapter_id]/lodge/[uuid].webp
```

Reuses the image-pipeline-v2 work shipped in PR #7 (sharp resize,
EXIF strip, WebP conversion). Same upload API, just different
folder prefix.

### 7. Linkage to existing data — brief submissions, customers

**Recommendation: optional `source_brief_id` foreign key from
itineraries to the `briefs` table. Nothing else.**

When a planner drafts an itinerary in response to a `/plan`
submission, link the two. When they draft a speculative itinerary
("this is what I'd recommend for a generic Botswana trip"), no
link needed. Don't build a customer/CRM table — out of scope.

### 8. Versioning and snapshots

**Recommendation: published itineraries are read-only. To revise,
clone-and-edit creates a new draft.**

The design handoff says "POST /:id/publish freezes a snapshot,
mints a slug." That's the right shape — the PDF the customer
received needs to keep matching the URL they bookmarked. New
edits create a new version with a new slug. Old slugs continue
to resolve to their snapshot.

Simplest implementation: when status flips from `draft` to
`published`, copy the data to a `itinerary_snapshots` table keyed
by slug. The live `itineraries` table tracks the in-progress
working copy; snapshots are the customer-facing immutable record.

### 9. Currency / pricing

**Recommendation: out of scope. Don't include money fields.**

The design doesn't display per-night or total trip prices. Pricing
conversations happen separately — on calls, in follow-up emails,
in operator quotes. Keeping pricing out of the itinerary document
means the same PDF works whether we're sending the prospect direct
or routing through a partner DMC.

If pricing becomes part of the document later, it'd be a separate
schema addition (`itinerary_pricing` or a JSONB column) and a small
design extension.

---

## Phasing

Five phases. Each is one or two weeks of focused Code work, plus
your editorial review time. Each becomes its own brief once this
scope is signed off.

### Phase 1 — Foundation (~1 week)

Schema, scaffolding, list/create/edit at the trip-metadata level.

- New tables: `itineraries`, `itinerary_chapters`,
  `itinerary_transits`, `itinerary_practicals` (or JSONB column)
- New migrations
- Admin routes: `/admin/itineraries` (list), `/admin/itineraries/new`
  (create), `/admin/itineraries/[id]/edit` (edit)
- Form covers Trip section only (title, cover_title_lines, subtitle,
  reference, guests, dates, pace, curator, prologue)
- Save drafts; no chapters or transits yet
- Authentication via existing admin Basic Auth

**Done means:** admin can create a new trip, fill in metadata, save,
revisit, edit. No public-facing render yet.

### Phase 2 — Chapters, transits, photos (~1 week)

Add the body of the itinerary.

- Chapter form: place, country, coords, nights, dates, epigraph,
  intro paragraphs, lodge fields, rhythm items, seeing, note
- Photo upload integration — reuse `listing-media` bucket with
  `itineraries/` prefix, run through existing sharp pipeline
- Transit form: auto-generated between chapters, editable
- Drag-to-reorder chapters; auto-recalculate roman numerals and
  re-link transits
- Validation: chapter count, transit-count-matches, required fields,
  string length caps from `SCHEMA.md`

**Done means:** admin can compose a full multi-chapter itinerary
with photos. Still no rendered preview.

### Phase 3 — Render the design (~1 week)

Port the prototype into the codebase.

- Port `source-prototype/src/styles.css` to the app's stylesheet
  layer (probably `app/admin/itineraries/preview/styles.css` or
  similar, scoped to the preview route)
- Port the React components (`cover.jsx`, `chapter.jsx`,
  `transit.jsx`, `practicals.jsx`) to Next.js conventions
- Port the SVG map system (`maps.jsx`) — projection function + country
  paths verbatim
- Admin preview route `/admin/itineraries/[id]/preview` renders the
  saved data through the editorial design
- Theme variants: default to savanna/editorial/spacious; CSS
  variables flow through `data-` attributes (already designed this
  way)

**Done means:** admin can preview their saved itinerary rendered in
the editorial design, in the browser, looking identical to
`source-prototype/Itinerary.html` with the team's data substituted.

### Phase 4 — PDF export (~1–1.5 weeks)

The hard part.

- Stand up a Playwright microservice (Render or Railway, ~$7/month)
- Service receives a rendered HTML URL (or HTML string), returns a
  PDF binary
- Self-host the Google Fonts as WOFF2 in the service
- `@page A4` rules, page-break orchestration, `printBackground: true`
- Asset preloading before `page.pdf()` call
- Admin route `/admin/itineraries/[id]/pdf` triggers the render,
  streams the PDF back to the browser
- Filename convention: `SO-{reference}-{guest_lastname}-{YYYY-MM}.pdf`
- Visual regression baseline using the prototype's sample data

**Done means:** clicking "Download PDF" on a finished itinerary
produces a 20–24-page A4 portrait PDF, fonts embedded, images
crisp, page breaks clean.

### Phase 5 — Polish + optional public URL (~3–5 days)

The finishing pass.

- Publish workflow: status `draft → published` triggers snapshot
  creation, mints slug
- Optional: public read-only URL `/trips/[slug]` that renders the
  snapshot (not the live editable copy)
- Pre-flight validation on publish (all required fields, all photos
  uploaded, transit count matches chapter count, etc.)
- Optional: "Duplicate trip" action for cloning a published itinerary
  as a new draft
- Theme picker in admin (palette/typography/density per trip)
- Documentation: `handoff/ITINERARIES.md` with the workflow,
  schema, and PDF render pipeline

**Done means:** the workflow is durable — Niels can compose,
preview, publish, download, and (optionally) share an itinerary
in the same admin session.

---

## Open questions for you

Before any code is written, six things worth confirming:

1. **Source of truth for guests / customer details.** The schema
   has `guests` as a free-text array. Do you want any linkage to
   the brief submission (so "Mr & Mrs Whitford" auto-fills from
   their `/plan` submission), or always manual entry?

2. **Curator name / "From" attribution.** The design has "Curator,
   Safari Overland" and "Victoria Falls, Zimbabwe" baked into the
   sample data. Should this default to Niels, default to whoever's
   logged in, or be free-form per trip?

3. **PDF delivery channel.** Once the PDF exists, is the workflow
   *"download from admin → attach to a Gmail email from Niels"* (the
   current pattern for operator outreach), or do you want a "Send
   PDF" button that emails it via Resend with a tracked open?

4. **Reference numbering.** `SO-YYYY-NNNN` — should NNNN be a
   per-year sequence (resets each January), an all-time counter, or
   user-typed? Auto-incrementing is easiest; user-typed is more
   flexible.

5. **Fonts — self-host all six?** Cormorant Garamond, Newsreader,
   EB Garamond, Lora, Manrope, Caveat. Self-hosting six families is
   ~6–8 MB of WOFF2 files. Worth it for PDF reliability; mildly more
   to maintain. Or just Cormorant + Newsreader + Caveat (the editorial
   default) and load the alternates on demand if a different theme
   variant is picked? Less storage; thematic switching slightly
   slower.

6. **Live preview pane in v2?** The design handoff recommends a
   side-by-side editor with live preview. Worth it for the editorial
   workflow but adds substantial UI work. Defer to v2, or include
   in Phase 5?

---

## What I'd recommend doing right now

1. **Read this scope, mark up any decisions where you'd rather go
   another way.**

2. **Answer the six open questions above** — even short answers help
   the briefs be precise.

3. **Decide on phasing pace.** All five phases sequentially? Or ship
   Phase 1 + Phase 2 (admin form, no render) and use that with a
   manual PDF workflow until Phase 3 and 4 ship? The latter gets
   you faster feedback on whether the form shape is right.

4. **Pick a real customer case to build against.** The prototype
   uses the Whitford / Botswana → Cape Town itinerary. We should
   have a real (or realistic) customer case in mind so the test
   data isn't generic — bias toward what you'd actually plan as the
   first itinerary you'd send.

Once those answers come back, I write the Phase 1 brief and hand it
to Code. Each subsequent phase becomes its own brief at its own
checkpoint — you get to course-correct between them.

---

## What this scope deliberately doesn't cover

For completeness, calling these out so they aren't surprises later:

- **Customer-facing booking flow.** This tool produces the
  *itinerary proposal*. The actual booking — agreeing dates,
  passing the brief to operators, taking deposit — is a separate
  conversation and probably a separate piece of infrastructure
  later.

- **Operator-facing tools.** This is staff-side only. Operators
  receive whatever you forward from your inbox.

- **Multi-currency, real pricing, commission tracking.** Out of
  scope as flagged in decision #9.

- **Translations or multi-language.** English only.

- **Mobile-first authoring.** The admin form will be desktop-
  primary. The PDF will be A4 portrait. The optional web view at
  `/trips/[slug]` will be responsive.

- **Saved chapter templates / itinerary library.** Recommended in
  the design handoff as a productivity feature but explicitly
  deferred to v2.

- **Versioning beyond `draft → published` snapshots.** No diff view,
  no revert, no edit history. If a published itinerary needs
  revision, clone-and-edit creates a new draft.
