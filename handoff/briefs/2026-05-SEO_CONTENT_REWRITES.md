# Safari Overland — SEO Brief 3: Rewrite the Existing Pages for Top-3 Ranking

Content rewrites for the five highest-traffic existing pages, derived
from the same external SEO audit that produced Briefs 1 and 2.

---

## Codebase context (Cowork preamble)

The audit-supplied copy is good editorial work — the voice is mostly
on-brand, the structure is sound, and the FAQ blocks are genuinely
useful. But four things need surgery before any of it ships, plus a
handful of smaller corrections. Code must read this preamble before
touching the rewrite blocks.

### CRITICAL — the business-model claim is materially false

The brief asserts in multiple places that **"we charge operators a
flat annual editorial fee"** and **"we are paid by the operators in
the collection, who each pay a flat annual editorial fee that is
invariant to bookings and to size."**

**This is not our business model.** We do not charge operators.
Shipping this copy would be a material misrepresentation to both
travellers and operators.

The actual business model has two paths:

1. **Booking margin against rack rates.** When we plan a trip that
   the traveller books through us, the lodge gives us a rate margin
   (a wholesale discount against published rack rates). The traveller
   pays rack or close to it; we retain the margin. The lodge
   underwrites our editorial via this margin. The traveller never
   sees the breakdown.
2. **Partner DMC referral.** Where we don't run the booking
   ourselves, we refer the enquiry to friends at established
   specialist travel companies. The compensation arrangement is
   between us and that partner.

That's it. No subscription fees. No paid placements. No preferred-
supplier deals — but ALSO no "flat annual editorial fee."

**Required rewrites:**

The homepage FAQ block needs the "Do you take a commission?" entry
rewritten:

```ts
{
  question: "How do you get paid, then?",
  answer: "Two ways. When you book a trip we plan, the lodge gives us a rate margin against rack — you pay rack-or-close-to-it; we keep the difference. When the trip is better routed through a specialist partner, we refer you to a friend's established travel company and they handle the booking. No subscription fees, no paid placements, no preferred-supplier deals. The collection is editorially independent because nobody pays to be in it.",
},
```

The About page "How the business actually works" section needs the
same rewrite — strike "We do not take commission from operators.
Listed operators pay a flat annual editorial fee..." Replace with:

> Three things travellers always want to know, answered plainly.
>
> - **The planning service is free to travellers.** Tell us what you're
>   chasing, we come back within 48 hours with three routes, you
>   pick one, we connect you directly to the operator. No fee
>   anywhere in this chain for the traveller.
> - **We are paid via booking margins, not operator subscriptions.**
>   Lodges in the collection give us a margin against their rack
>   rates when you book a trip we've planned. You pay rack or close
>   to it; the margin underwrites the editorial. Where a trip is
>   better routed through a specialist partner, we refer to a
>   trusted friend's travel company and they handle the booking.
> - **No paid placements, no preferred-supplier deals.** Operators
>   don't pay to be listed. The collection is editorially
>   independent because nobody pays to be in it.

The Plan page opening also asserts "unsponsored" — that word reads
as if we're subscription-funded. Soften to "editorially independent"
or "no paid placements."

### Editor count — one, not three

The About-page rewrite proposes three editors with regional
specialisms (Southern Africa / East Africa / planning + field
notes), with name placeholders.

**We have one editor: Niels van de Meer.** Dom is co-founder but
runs operations and engineering, not the editorial voice. The "three
editors" structure is fiction.

Required rewrite for the "Who builds the collection" section of
the about page:

> Safari Overland is built by Niels van de Meer, co-founder and
> editor. Niels lives in Victoria Falls and writes the collection
> from there — every lodge listed is one Niels has visited
> personally or knows by reputation from operators we work with
> directly. The technical and operational side is run by Dom
> Doherty, co-founder.

(Dom is acknowledged for accuracy but not foregrounded — the
editorial face is Niels. Adjust Dom's mention if you'd prefer to
leave him entirely out of the public copy.)

The Person JSON-LD work from Brief 1 already scaffolds a
single-editor structure pointing at `editor-niels`. Code should not
introduce three editor JSON-LD blocks.

### Collection-size numbers — soften the claims

The brief asserts variously:

- "fewer than 60 lodges across the continent" (homepage FAQ)
- "around fifty lodges and operators" (About opening)
- "There are roughly 1,200 commercial safari operators on the
  African continent; the collection currently sits at {x}" (About)

**Current reality:** the kept list has roughly 15 approved listings
(the Vic Falls and Hwange clusters from earlier sessions). 50–60 is
aspirational; specific numbers will be wrong within months either
way.

**Corrected wording:**

- Homepage FAQ "How is Safari Overland different from Go2Africa or
  Yellow Zebra?" — replace specific competitor name-checks (legal
  risk if any claim turns out wrong) with generic framing:

```ts
{
  question: "How is Safari Overland different from the big online safari planners?",
  answer: "Two things. First, scale: the big online planners run hundreds of staff and partner with hundreds of lodges. We are small on purpose — the kept list is deliberately under-built. Second, business model: we publish how we get paid (booking margins, not operator subscriptions) and we don't take preferred-supplier money. If a lodge is listed, it earned the listing.",
},
```

- About opening: replace "around fifty lodges and operators" with
  "a small kept list, deliberately under-built — Victoria Falls and
  Hwange are the closest to fully written; the rest of the
  continent is in progress."

- About "Fewer, better" section: replace "the collection currently
  sits at {x}" with "the kept list sits in the low double digits and
  grows by hand. We are not trying to scale to a hundred lodges; we
  are trying to keep the bar high as we widen out."

- About "We turn down operators": replace "we've declined {x}
  operators who applied" with a softer factual claim:
  "We've declined operators where the conservation or community
  claim couldn't be evidenced when we asked. The most common reason
  for a decline is exactly that."

### Geographic coverage — limited, not continent-wide

The Homepage's "Where to go — the continent, by region" lists all
four regions (East / Southern / West / North) with confident
language. Reality: detailed editorial coverage exists only for
Vic Falls and Hwange (Southern Africa). The other three regions are
informational stubs at best.

This isn't a falsehood — the pages do exist — but Code shouldn't
ship copy that implies we have curated lodge picks for North Africa
when we don't. Soften:

- "West Africa (Ghana, Senegal, Nigeria, Benin) — the continent's
  most under-rated safari corridor. Forest elephants, coastal
  reserves, exceptional birding. *Coverage in progress*."

- "North Africa (Morocco, Egypt, Tunisia) — desert and antiquity.
  Sahara expeditions, Atlas raptors, Mediterranean migration
  corridors. *Coverage in progress*."

The italic note can be a small mono-caps tag rather than inline
italic — Code's call on the visual treatment, but flag it.

### "Last verified" / specific-date claims — only ship if true

The East Africa rewrite includes:

> "Park fees, permit prices, and crossings dates were last verified
> in May 2026."

If Niels has not actually verified the 2026 park fees and permit
prices listed in this rewrite, **don't ship this sentence.** Soften:

> "Pricing reflects published 2026 rates at time of writing; lodges
> and parks adjust between seasons. We update this page as we re-
> screen."

Specific prices the brief cites that Code should *not* invent:

- Maasai Mara conservancy fee $80–$120 per person per day
- Serengeti park fee $82.60 (2026)
- Bwindi gorilla permit $800
- Rwanda gorilla permit $1,500
- Tanzania visa $100 / Kenya eTA $34 / Rwanda visa $50 / Uganda eVisa $50

These all sound right against industry norms but Code should not be
asked to verify them. Two options:

1. Ship the prices with a "rates current at time of writing,
   subject to change without notice" disclaimer at the bottom of
   the section.
2. Strike the specific numbers; replace with bands ("expect
   $80-$150 per person per day in the Maasai Mara conservancies").

Option 1 is the editor's preference for SEO weight; option 2 is
the safe default. Either way, the dates ("(2026)") should come out
where they appear next to specific prices.

### Annual re-screening commitment — soften

The brief asserts:

> "Every operator in the collection has been visited by an editor in
> the last 24 months. We re-screen every operator annually against
> three criteria..."

We haven't committed to or operated an annual re-screening cycle.
Replace with a less specific commitment:

> "Every lodge in the kept list has been visited by us, or stayed
> in by a trusted friend whose judgement we'd back, within the
> last few years. We re-screen on a rolling basis — if anything
> material changes at a property (a sale, a new GM, a change in
> conservation funding), it goes back through review."

### Sentence-case H1s — convention

The brief proposes two H1s in Title Case:

- "East Africa Safari — Kenya, Tanzania, Uganda & Rwanda"
- "What to Pack for an African Safari — The Honest 2026 List"

Our H1 convention (per BRAND_VOICE.md and existing site copy) is
sentence case. Adjust to:

- `East Africa safari — Kenya, Tanzania, Uganda & Rwanda`
- `What to pack for an African safari — the honest 2026 list`

TITLE tags (browser-tab titles) stay Title Case — that's a
search-results convention and fine as proposed.

### Other small editorial flags

- **"Written by guides, not retailers"** (What to Pack META and
  opening). We don't have multiple guides on staff. Soften to
  "Written from the bush" or "Written by people who actually pack
  this list themselves."

- **"We are all in the bush more than we are at desks."** Plural-
  voice. Adjust to "Niels is in the bush more than he is at a desk"
  if you prefer; or drop the line entirely.

- **"None of us writes about a lodge we have not personally stayed
  in."** Plural again, and aspirational — Niels has personal
  experience of the Vic Falls + Hwange cluster but not (yet) every
  property the site will eventually cover. Soften to "We don't
  write about a lodge we don't know" or "Every lodge in the kept
  list is one we know first-hand or by trusted reputation."

- **In-season strip on the homepage** — the brief proposes expanding
  each in-season card by 30–50 words. Reasonable. But the existing
  in-season cards may not have dated observations to fill that
  expansion. Code should check what's there and either expand with
  current content or flag to Dom for content supply.

### Tech notes — what to use and what to know

**Components from Brief 1 / 2 to use here:**

- `<FAQ items={...} />` from `components/FAQ.tsx`
- `<Byline editor={...} published="..." updated="..." />` from
  `components/Byline.tsx`
- `<ArticleJsonLd ... />` from `components/JsonLd/ArticleJsonLd.tsx`
- `<RelatedFieldNotes topic="..." limit={6} />` from PR #14
- For the field-note page (What to Pack), the colocated `dates.ts`
  pattern from PR #15 — sibling file with `publishedAt`, `updatedAt`,
  `editorId`.

**Internal links that don't exist yet:**

- `[Open the seasonal calendar →]` — no such page. Either build a
  stub or change the link to point at the in-season strip on the
  home page (`/#in-season` or similar).
- Park-specific pages linked from East Africa — the brief
  acknowledges these will 404 until Brief 4 lands. Acceptable.
  Worth flagging in the PR description.
- `/categories` exists.
- `/destinations/east-africa` etc. all exist.
- `/field-notes` exists post Brief 2 URL migration.

**URL for What to Pack page after Brief 2 URL migration:**

The brief says the URL is now `/field-notes/planning/what-to-pack`.
Actually the Brief 2 migration was `/resources` → `/field-notes` —
the sub-path stayed (`/field-notes/planning-guides/what-to-pack`).
Confirm with the actual file structure under `app/field-notes/`.

**Existing page content:**

Code must read each existing page before rewriting. The brief calls
out that East Africa's existing page is ~1,835 words with proper
hierarchy — extend, don't replace the iconic-parks / iconic-wildlife
sections.

For the homepage, the existing in-season strip and three featured
listings should be preserved structurally; the brief just expands
their content. Don't tear out the working structure.

### Editor-data supply gap (still outstanding from Brief 1)

The Byline component needs Niels' photo and LinkedIn URL for full
fidelity. Both still pending. Until supplied:

- `photo: null` — Byline renders text-only
- `sameAs: []` — Person JSON-LD omits sameAs

That's the same graceful-degradation pattern Brief 1 shipped with.

### Out of scope reminders

The brief is clear but worth restating:

- **No technical work.** No JSON-LD components, no sitemap touches,
  no canonical changes. All of that landed in PRs #14 and #15.
- **No new pages.** Net-new pages were "Brief 2" in Dom's own
  numbering (separate from the audit's brief numbering — see
  CHANGELOG note). Not in scope here.
- **No structural redesign.** Voice + words + headings + FAQ
  blocks. The visual layer stays as-is.

---

## Brief verbatim (apply the corrections above)

What follows is the audit-supplied brief. Apply preamble corrections
wherever they intersect — most critically the business-model FAQ,
the single-editor structure, the collection-size numbers, and the
"last verified" claims.

### Workflow (please follow exactly)

1. `git checkout -b content/existing-page-rewrites`.
2. Implement the five rewrites in order. One commit per page.
3. Verify locally with `npm run dev` — eyeball every rewrite and
   confirm headings render with the right hierarchy and FAQ
   accordions work.
4. `npm run build` + `npm run lint` pass.
5. `git push -u origin content/existing-page-rewrites`.
6. Vercel auto-deploys a preview. Reply with the URL and a per-page
   checklist.
7. Do not merge to main. Dom will review and merge.

### How to use the rewrites below

Each rewrite block contains:

- TITLE — the new `<title>` tag (use it in `metadata.title`)
- META — the new meta description (use it in `metadata.description`)
- URL — the URL slug (confirm it matches the route)
- H1, H2, H3 — heading hierarchy (use the correct semantic level)
- Body copy — paragraphs and bullet content (ship as-is, except
  where the preamble flags corrections)
- FAQ — to render with the `<FAQ>` component built in PR #14
- Internal links — text in `[square brackets →]` indicates an
  internal link; replace with `<Link href="...">` using descriptive
  anchor text matching the bracket text

Preserve the existing editorial voice (em-dashes, lowercase aesthetic
where present, no exclamation marks). Do not "improve" the prose —
it has been written deliberately to balance SEO and brand voice.

---

### Page 1: Homepage rewrite

**TITLE:** `Curated African Safaris — A Small, Honest Collection | Safari Overland`
**META:** `A small, opinionated collection of African safari lodges and operators, chosen by hand from Victoria Falls. Honest planning, three routes within 48 hours. Conservation-led. No catalogue, no kickbacks.`
**URL:** `/` (unchanged)

#### H1

`Africa, slowly. A curated African safari collection.`

#### Opening section (no heading — sits directly under the hero)

This is a small, deliberately incomplete collection of African
safari lodges and operators — chosen by hand, written from Victoria
Falls, and shaped by what the wild actually does to people who
travel slowly. We are an editorial second opinion, not a catalogue.
Every lodge here earns its place by the depth of the experience it
offers, not by paying for the listing. Every operator here funds
conservation or community work, and shows us the receipts. If you
want a curated African safari that asks something of you and leaves
a mark, this is the page to start from.

**CTAs:** `[Start a brief →]` `[Open the collection →]`

#### H2 — In season, right now

Conditions on the ground, this week, across the continent. We
update this every Monday. Use it to choose where to go now — not
just where to go in theory. `[Open the seasonal calendar →]`

*(Keep the existing in-season card grid — Maasai Mara, Okavango,
South Luangwa, Hwange, Bwindi, Etosha — but expand each card by
30–50 words with a specific dated observation. **If the existing
cards don't have dated content, flag this to Dom for content supply
rather than inventing observations.**)*

#### H2 — How a safari is planned, by hand, in three steps

We do not sell packages. We listen to what you are chasing — the
months, the rhythm, the kind of quiet you want — and we draft three
different routes within 48 hours. You pick one. We make the
introduction directly to the operator. You book with them, and we
step out of the way. `[Start a brief →]`

1. You tell us the months you can travel, the regions you are drawn
   to, and the rhythm — slow and deep, or wider and lighter.
2. We come back within 48 hours with three routes, each at a
   different price-and-pace combination. No "preferred suppliers."
   No commission games.
3. You pick one. We connect you directly to the operator and step
   out. They quote, contract, and host.

#### H2 — What this collection promises to do properly

Three things, always.

**Curation, not catalogue.**
We list the African safari operators we'd send our closest friends
to. Every lodge in the collection has been visited by us in person
or known to us by trusted reputation. We refuse paid placements.
The collection is small because the bar is high.

**Trips that leave a mark.**
We favour stays that ask something of you. A walking morning in
South Luangwa. A silent sundowner on the edge of the Linyanti. A
sleep-out under the Hwange sky. These are the trips that linger
long after the dust settles, and they are what we organise this
site around.

**Travel with consequence.**
Every operator in the collection funds conservation, community, or
both. We ask for the receipts — anti-poaching levies, community
lease payments, science partnerships — and we publish the
relationships. Your booking is not a transaction; it is a
contribution to keeping these places wild.

#### H2 — Where to go — the continent, by region

Africa is not one safari. It is four. Each region has its own
rhythm, its own season, its own answer to the same question.

- **East Africa** (Kenya, Tanzania, Uganda, Rwanda) — big country,
  big herds, the classic safari image. The Great Migration,
  mountain gorillas, Maasai cultural depth. Best June–October.
  `[Open the East Africa guide →]` *(Coverage in progress)*
- **Southern Africa** (Botswana, Namibia, Zimbabwe, Zambia, South
  Africa) — more variety, more value, fewer crowds. Walking-led
  safaris, the Okavango Delta, the Namib desert, malaria-free
  reserves. Best May–October.
  `[Open the Southern Africa guide →]`
- **West Africa** (Ghana, Senegal, Nigeria, Benin) — the continent's
  most under-rated safari corridor. Forest elephants, coastal
  reserves, exceptional birding.
  `[Open the West Africa guide →]` *(Coverage in progress)*
- **North Africa** (Morocco, Egypt, Tunisia) — desert and
  antiquity. Sahara expeditions, Atlas raptors, Mediterranean
  migration corridors.
  `[Open the North Africa guide →]` *(Coverage in progress)*

#### H2 — A small selection from this week

Three lodges we are sending people to right now. The full collection
lives on the collection page. `[Open the collection →]`

*(Keep the three current featured cards — expand each card body to
80–120 words with the specific reason each is in this week's pick.
The card pages should each emit LodgingBusiness JSON-LD; that schema
work was scoped in Brief 1 — confirm it's in place before merging
this brief.)*

#### H2 — Field notes, long reads from the bush

Long-form planning, conservation reporting, and seasonal field notes
— written from the bush. `[All field notes →]`

#### FAQ block

```ts
const homepageFAQ = [
  {
    question: "What does Safari Overland do, exactly?",
    answer: "We are an editorial planner — a small, opinionated collection of African safari lodges and operators with a free 48-hour planning service. You tell us what you're chasing; we come back with three routes; you pick one and we connect you to the operator. We do not sell trips ourselves; the operator quotes, contracts, and hosts.",
  },
  {
    question: "Who chooses the operators?",
    answer: "Niels van de Meer, co-founder and editor, working from Victoria Falls. Every lodge in the kept list is one Niels has visited personally or knows by reputation from operators we work with directly. We re-screen on a rolling basis — when something material changes at a property, it goes back through review.",
  },
  {
    question: "How is Safari Overland different from the big online safari planners?",
    answer: "Two things. First, scale: the big planners run hundreds of staff and partner with hundreds of lodges. We are small on purpose — the kept list is deliberately under-built. Second, business model: we publish how we get paid (booking margins, not operator subscriptions) and we don't take preferred-supplier money. If a lodge is listed, it earned the listing.",
  },
  {
    question: "How much does an African safari cost?",
    answer: "Honest answer: $400–$800 per person per night for a strong mid-range safari, $1,000–$2,500 per person per night for luxury, and $3,000+ for ultra-luxury with helicopter transfers. Add international flights ($1,200–$2,500), regional flights and transfers ($400–$1,500), park and conservancy fees ($60–$400/day), gratuities (~10%), and gear. A 10-day premium safari for two typically lands between $18,000 and $35,000 all-in.",
  },
  {
    question: "When is the best time to go on safari?",
    answer: "Depends on where. For East Africa's Great Migration river crossings, July–October. For Southern Africa's classic dry-season game viewing, May–October. For Botswana's Okavango flood, June–August. For green-season birding and calving (Tanzania's Ndutu), January–March. We track this month-by-month in the field notes.",
  },
  {
    question: "How do you get paid, then?",
    answer: "Two ways. When you book a trip we plan, the lodge gives us a rate margin against rack — you pay rack-or-close-to-it; we keep the difference. When the trip is better routed through a specialist partner, we refer you to a friend's established travel company and they handle the booking. No subscription fees, no paid placements, no preferred-supplier deals. The collection is editorially independent because nobody pays to be in it.",
  },
];
```

---

### Page 2: About rewrite

**TITLE:** `About Safari Overland — A Curated African Safari Collection from Victoria Falls`
**META:** `Meet Safari Overland — a small, editor-led African safari collection written from Victoria Falls. Our criteria, our editor, our funding model. Honest, in writing.`
**URL:** `/about` (unchanged)

#### H1

`A small, opinionated collection — written from the bush.`

#### Opening

Safari Overland is a curated African safari collection of a small,
deliberately under-built kept list of lodges and operators —
Victoria Falls and Hwange are the closest to fully written; the
rest of the continent is in progress. The collection is written
from Victoria Falls, Zimbabwe — at the centre of the safari
continent rather than from a tour-desk in London — and the planning
service that sits alongside it is free to travellers, opinionated
by design, and editorially independent. This page tells you who
we are, how the collection is built, and how the business works.
We publish the criteria and the economics in full, because if you
can't see how the sausage is made, you can't trust the sausage.

#### H2 — Who builds the collection

Safari Overland is built by **Niels van de Meer**, co-founder and
editor. Niels lives in Victoria Falls and writes the collection
from there — every lodge listed is one Niels has visited personally
or knows by reputation from operators we work with directly. The
technical and operational side is run by Dom Doherty, co-founder.

Niels is in the bush more than he is at a desk. We don't write
about a lodge we don't know first-hand or by trusted reputation.

*(Render a small portrait of Niels with bio paragraph and link to
his LinkedIn. Emit Person JSON-LD with `@id` matching
`editor-niels` per Brief 1's Person scaffold. Photo and LinkedIn
URL pending Dom's supply — Byline component degrades gracefully
in the meantime.)*

#### H2 — Three things we screen every operator against

**01. Fewer, better.**
We list a small circle of operators we know personally rather than
a long catalogue we don't. Volume is a vanity metric; depth is the
point. There are roughly 1,200 commercial safari operators on the
African continent; our kept list sits in the low double digits and
grows by hand. We are not trying to scale to a hundred lodges; we
are trying to keep the bar high as we widen out.

**02. Communities, then visitors.**
We favour operators who work closely with the people who live
alongside the wildlife — where tourism revenue stays in the place
it was earned, and where local employment isn't decorative. We ask
for staff-from-community percentages, training-programme details,
and lease-payment records where they're shareable, and we publish
what we are allowed to publish.

**03. Conservation as a brief.**
Anti-poaching levies, habitat management, science partnerships,
lease payments to community trusts — every operator in the
collection does this work, and we ask them to show it. Conservation
isn't a tagline here; it is screening criterion number three and
the most common reason an otherwise-good lodge is declined.

#### H2 — How the business actually works

Three things travellers always want to know, answered plainly.

- **The planning service is free to travellers.** Tell us what
  you're chasing, we come back within 48 hours with three routes,
  you pick one, we connect you directly to the operator. No fee
  anywhere in this chain for the traveller.
- **We are paid via booking margins, not operator subscriptions.**
  Lodges in the collection give us a margin against their rack
  rates when you book a trip we've planned. You pay rack or close
  to it; the margin underwrites the editorial work. Where a trip
  is better routed through a specialist partner, we refer to a
  friend's established travel company and they handle the booking.
- **No paid placements, no preferred-supplier deals.** Operators
  don't pay to be listed. The collection is editorially independent
  because nobody pays to be in it. We turn down operators where
  the conservation or community claim couldn't be evidenced when
  we asked — that's the most common reason for a decline.

#### H2 — Where to next

If you want to see the collection, `[open the collection]`. If you
want to start a brief and get three routes back within 48 hours,
`[start a brief]`. If you want to see what we've written from the
bush so far, `[open the field notes]`.

#### FAQ block

```ts
const aboutFAQ = [
  {
    question: "Where are you based?",
    answer: "Victoria Falls, Zimbabwe — on the Zambezi, between Hwange and the Lower Zambezi, and within a four-hour flight of every major safari country in Southern Africa. We chose Victoria Falls deliberately: it is the geographic centre of the safari continent and lets the editorial work happen close to the camps rather than from a desk in another hemisphere.",
  },
  {
    question: "Are you a tour operator?",
    answer: "No. We are an editorial collection and a planner. The booking and the on-the-ground delivery are owned by the listed operator once we make the introduction. We never quote, contract, or host a trip ourselves.",
  },
  {
    question: "Do you cover countries outside Africa?",
    answer: "No. The collection is Africa-only and will remain so. There are plenty of editorial planners for the rest of the world; the safari continent deserves a planner that lives on it.",
  },
];
```

---

### Page 3: East Africa destination expansion

**TITLE:** `East Africa Safari Guide 2026 — Kenya, Tanzania, Uganda, Rwanda | Safari Overland`
**META:** `Plan an East Africa safari for 2026 — Maasai Mara, Serengeti, Bwindi gorillas, the Great Migration. Month-by-month conditions, costs, and the lodges we'd send our friends to.`
**URL:** `/destinations/east-africa` (unchanged)

The existing page is structurally good (~1,835 words, proper H1/H2/H3).
This rewrite adds ~1,200 words of country-specific depth, FAQ, and
2026 cost framing. Do not delete the existing iconic-parks /
iconic-wildlife / countries / when-to-visit sections — extend them.

#### H1

`East Africa safari — Kenya, Tanzania, Uganda & Rwanda`

#### Opening (replace current opening paragraph)

An East Africa safari is the safari of the brochure — vast open
plains, the Great Migration, lions on a kopje, mountain gorillas
in Bwindi mist. It is also the safari of distance: longer transfers,
larger vehicles, and a more crowded peak season than the Southern
Africa equivalent. This guide is the editorial position on East
Africa: where to go, when to go, what it costs in 2026, the
conservancy/community model worth paying extra for, and the kinds
of lodges we'd send our closest friends to. It is opinionated and
current. Pricing reflects published 2026 rates at time of writing;
lodges and parks adjust between seasons — we update this page on a
rolling basis.

#### H2 — When to go to East Africa (month by month) — REPLACE existing "When to Visit" section

East Africa runs on two rainy seasons (the "long" rains in April–May
and the "short" rains in November) and two dry seasons. The dry
season from June to October is the famous safari window — the
Mara/Serengeti migration drama, the best big-cat sightings, and
dust-on-the-Land-Cruiser conditions. The green season
(November–March) is dramatically better value, photographically
spectacular, and underrated for predator action when the wildebeest
are calving in the Ndutu region of southern Serengeti
(January–March).

*(Add a month-by-month table here with 12 rows. Columns: Month,
Conditions, Migration position, Game viewing, Cost band, Best for.
Each row 30–40 words. This is the most-quoted block in AI Overviews
for "best time" queries. **Niels to supply the table content if he
has it; otherwise scope this as a follow-up — Code shouldn't invent
month-by-month claims.**)*

#### H2 — The four East African safari countries, briefly — INSERT as new section before existing "Iconic Destinations"

**Kenya — the classic safari and the conservancy revolution**
Kenya is where the modern safari was invented and where it is
currently being re-invented. The Maasai Mara is the headline — the
river crossings between July and October are genuinely as
spectacular as they sound — but the conservancies on the Mara's
borders (Olare Motorogi, Mara North, Naboisho, Ol Kinyei) are where
the editorial picks live, because they cap vehicle numbers, allow
night drives and walking, and put lease income directly into Maasai
hands. Laikipia (Lewa, Borana, Ol Pejeta, Loisaba) is Kenya's quiet
luxury heartland — black-rhino conservation, fewer crowds,
exceptional guiding, and the chance to see African wild dog at
scale. Amboseli for the Kilimanjaro backdrop. Samburu for the
special-five (Grevy's zebra, reticulated giraffe, gerenuk, beisa
oryx, Somali ostrich).

**Tanzania — the herd country**
Tanzania is sheer scale. The Serengeti ecosystem is roughly the
size of Northern Ireland and holds the bulk of the Migration herds
for most of the year. Northern Serengeti and Mara River crossings
(July–October) are the headline; southern Serengeti and Ndutu
calving (January–March) is the editor's pick. Ngorongoro is a one-
day destination — astonishing but crowded. Tarangire (June–October)
is the elephant park and seriously underrated. Selous/Nyerere and
Ruaha are the Tanzania of fewer vehicles, walking safaris, and
boating — the editorial sweet spot for second-time visitors.

**Uganda — the gorilla country**
Bwindi Impenetrable Forest and Mgahinga have around 459 mountain
gorillas, roughly half the world population. Gorilla permits in
Uganda are materially cheaper than Rwanda's; book 6–9 months ahead
in peak. Pair gorillas with Kibale (chimps), Queen Elizabeth (tree-
climbing lions in Ishasha), and Murchison Falls (the most dramatic
stretch of the Nile in Africa).

**Rwanda — the boutique gorilla country**
Rwanda's Volcanoes National Park is the higher-cost, higher-comfort
gorilla option — shorter transfer from Kigali (2.5 hours vs 9–10
for Bwindi), and the lodges (Singita Kwitonda, One&Only Gorilla's
Nest, Bisate) are at the top of the gorilla-country comfort
ranking. Akagera in the east is Rwanda's Big Five savanna park and
an important community-conservation case study (African Parks
management since 2010).

#### H2 — How much does an East Africa safari cost in 2026 — INSERT as new section

Honest 2026 numbers. Per person per night, full-board, including
game drives but excluding international flights, regional flights,
conservancy fees, and gratuities:

- Mid-range mobile camps and lodges: $450–$750 per person per night
- Premium small camps in conservancies: $900–$1,600 per person per night
- Luxury (Singita, Sanctuary, Asilia, &Beyond's top tier): $1,500–$3,200 per person per night
- Ultra-luxury fly-in private safaris: $3,500–$6,500 per person per night

Add: international flights $1,200–$2,500; East Africa regional
flights $250–$600 per sector; conservancy and park fees that vary
by region; gorilla permits (Uganda lower than Rwanda); gratuities
typically 10–15%. A 10-night East Africa safari for two, mid-range,
typically lands around $14,000–$22,000 all-in; premium $24,000–
$36,000; luxury $40,000–$65,000+.

*(Specific permit prices and park fees stripped vs the audit's
copy. Re-add as a "rates current at time of writing" footnote with
verified 2026 numbers if Niels has confirmed them. Otherwise leave
the ranges generic — the SEO weight still lands, and there's
nothing to retract if a price changes.)*

#### Existing "Iconic Destinations" and "Iconic Wildlife" sections — EXPAND

Keep both H2 sections and the existing cards. For each card, expand
to 200–300 words including: best months, what it costs, how
travellers we'd send tend to combine it, who it suits, and what it
doesn't suit. Link each to its dedicated park page (once those
exist — link will 404 until a later brief lands; that is fine).

#### H2 — East Africa safari travel tips — REPLACE existing version

- Mobile tented camps are the East African specialism — book one
  for at least 2 nights of every 10.
- Off-road game viewing is generally not permitted inside the
  national parks, but is allowed in the conservancies. The
  conservancy levy is worth paying for that reason alone.
- Light aircraft luggage limits are strict (15kg / 33lbs,
  soft-sided).
- Yellow fever certificate required for entry to many East African
  countries; check 30 days before.
- Visa policies vary by country; check eVisa availability and
  costs at time of booking — these change.

#### FAQ block (add at bottom)

```ts
const eastAfricaFAQ = [
  {
    question: "Is East Africa or Southern Africa better for a first safari?",
    answer: "East Africa for the iconic image and the Migration. Southern Africa for variety, value, and fewer crowds.",
  },
  {
    question: "What's the cheapest month to go to East Africa?",
    answer: "April and November — the long and short rains. Camps that stay open often discount 25–40%. Game viewing is dramatic in green and predators are out. The trade-off: some roads close and some bush camps shut entirely.",
  },
  {
    question: "Can you do East Africa as a self-drive safari?",
    answer: "Kenya — yes, plausibly (Maasai Mara, Amboseli, Tsavo). Tanzania — possible but not recommended; the Serengeti is huge and rough. Uganda and Rwanda — no for gorilla trekking (permits are guide-led).",
  },
  {
    question: "How many days do you need for East Africa?",
    answer: "Seven to ten nights for a focused single-country trip. Twelve to fourteen for a meaningful two-country combination (e.g. Kenya + Rwanda for gorillas; or Tanzania northern circuit + Zanzibar).",
  },
];
```

---

### Page 4: Plan page rewrite

**TITLE:** `Plan a Safari, by Hand — Three Routes in 48 Hours | Safari Overland`
**META:** `Tell us what you're chasing — months, regions, rhythm — and we'll come back within 48 hours with three African safari routes at three different price-and-pace combinations. Free. Honest. Editorially independent.`
**URL:** `/plan` (unchanged)

#### H1

`A safari, planned by hand. Three routes in 48 hours.`

#### Opening copy (above the form)

This is the planning service that sits alongside the collection. It
is free to travellers, opinionated by design, and editorially
independent — no operator pays us a subscription to be considered
in the routing. Tell us the months you can travel, the regions you
are drawn to, and the rhythm you want — slow and deep, or wider and
lighter. We will come back within 48 hours with three different
routes, at three different price-and-pace combinations. You pick
one. We connect you directly to the operator. They quote and
contract. We step out of the way.

#### H2 — How the planning service works

1. **You tell us the brief.** Months you can travel, regions you
   are drawn to, the kind of pace you want. Five minutes.
2. **We draft three routes within 48 hours.** Each at a different
   rhythm and budget. Each with the specific lodges and operators
   we'd send our closest friends to. Written by a human; not a
   template.
3. **You pick one.** We make the introduction directly to the
   operator. They quote and contract. We step out.

#### H2 — What goes into a good brief

- **Months.** Even a window helps. Some places are exceptional in
  July and underwhelming in March — and vice versa.
- **Where you've been before.** If you've done East Africa, we will
  not send you back. If you've never been, we will not send you to
  Bwindi for your first trip.
- **Rhythm.** Two lodges deep, or four lodges wide? Walking days,
  or all driving? Camp sleep-outs, or proper beds?
- **Budget envelope.** Honest is better than aspirational. We will
  work to the budget you give us; if it is too low for the trip you
  want, we will say so directly.
- **What you're chasing.** Migration crossings, gorilla trek,
  walking, mokoro, photography, family, honeymoon, malaria-free.
  The more specific, the better the brief back.

*(Keep the existing brief form here — do not change form fields
without confirming with Dom)*

#### FAQ block

```ts
const planFAQ = [
  {
    question: "Is it really free?",
    answer: "Yes. The planning service is free to travellers. We are paid via booking margins on the trips we plan — the lodge gives us a margin against its rack rate when you book a trip we've drafted. No fee anywhere in this chain comes from you.",
  },
  {
    question: "Can you plan for someone else (a friend, a parent)?",
    answer: "Yes. Use their dates and rhythm in the brief, and note the relationship. We will draft three routes accordingly.",
  },
  {
    question: "How far ahead should I start a brief?",
    answer: "For July–October peak in East and Southern Africa, 8–12 months is comfortable. For green season, 3–4 months is fine. For gorilla permits (Bwindi, Volcanoes), 6–9 months minimum. Within 60 days of travel, we can still help but the lodge inventory shrinks fast.",
  },
  {
    question: "Do you do last-minute briefs?",
    answer: "Yes, but we will tell you what is realistic. Inside 30 days, the best camps are often sold out — we will find the best of what is still available rather than the best in theory.",
  },
  {
    question: "Can you plan for solo travellers?",
    answer: "Yes. We have a small list of operators who genuinely understand single-supplier rates and solo-friendly camps. Mention it in the brief.",
  },
];
```

---

### Page 5: What to Pack — full pillar rewrite

The current version is 494 words. This rewrite is a full ~2,400-word
pillar, structured to win the "safari packing list" cluster.

**TITLE:** `Safari Packing List 2026 — What to Pack, What to Wear, What to Leave Home`
**META:** `The honest 2026 African safari packing list — what you actually need, what you really don't, and the small list of things travellers always forget. Written from the bush.`
**URL:** `/field-notes/planning-guides/what-to-pack` (post-migration from `/resources/...`; confirm the actual route under `app/field-notes/`)

#### H1

`What to pack for an African safari — the honest 2026 list`

#### Byline + dates

Use the `<Byline>` component built in PR #14 and the colocated
`dates.ts` pattern from PR #15:

```ts
// app/field-notes/planning-guides/what-to-pack/dates.ts
export const publishedAt = "2026-01-12"   // adjust to true publication date
export const updatedAt   = "2026-05-19"   // adjust to today's edit date
export const editorId    = "editor-niels"
```

#### Opening (first 100 words, primary keyword in first sentence)

A good safari packing list is short and unglamorous. The dressed-
for-Africa retail aisle wants to sell you a $400 multi-pocketed
vest you will wear exactly twice. The truth is that for almost any
African safari in 2026, you need maybe nine pieces of clothing, two
pairs of shoes, and a small set of accessories — all of which fit
in a 50-litre soft-sided duffel weighing under 15kg, because that is
what East and Southern African bush planes will let you bring. This
list is what we actually pack ourselves. Written from the bush, not
the shop floor.

*(The rest of the page body — the non-negotiables list, clothing,
easy-to-forget, tech and camera, what you don't need, country-
specific notes, and the FAQ block — ships as-supplied from the
audit. No corrections needed beyond what's in the preamble.)*

[See the audit-supplied copy for the remainder of this section.
Code can copy verbatim from the original brief Dom pasted, after
applying the H1 sentence-case correction above and using
`<Byline>` + colocated dates as described.]

#### FAQ block — see audit-supplied content

```ts
const packingFAQ = [
  // ... five items as supplied by the audit, unchanged
];
```

#### Related field notes module

Use the `<RelatedFieldNotes topic="planning" limit={6} />`
component built in PR #14.

---

## Final validation checklist before pushing

Per page, confirm on the preview deploy:

- [ ] Page title matches the new TITLE exactly (one `| Safari Overland` suffix, no duplication)
- [ ] Meta description matches the new META exactly
- [ ] H1 matches; H2 hierarchy correct
- [ ] FAQ block renders with accordion + emits FAQPage JSON-LD
- [ ] Internal-link anchor text matches the bracket text (descriptive, never "Read more")
- [ ] Byline + Published/Updated dates visible on the field-note page
- [ ] No console errors
- [ ] Business-model language matches the preamble's corrected wording (booking margins, not subscription fees)
- [ ] About page introduces Niels as the single editor (no fictional three-editor team)
- [ ] Collection-size claims softened per preamble
- [ ] Sentence-case H1s on East Africa and What to Pack

Sitewide:

- [ ] `npm run build` and `npm run lint` pass
- [ ] All JSON-LD blocks validate clean at https://validator.schema.org/

## When done

1. `git push -u origin content/existing-page-rewrites`
2. Reply with: preview URL, per-page checklist, and a note flagging
   any item where Niels' input is still needed (in-season card
   content, month-by-month East Africa table, photo of Niels for
   Byline, etc.).
3. Do not merge to main. Dom will review and merge.
