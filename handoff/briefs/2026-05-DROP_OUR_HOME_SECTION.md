> ✓ **SHIPPED** — May 2026, merged to `main`.
> See `handoff/CHANGELOG.md` for the session-level summary.

# Drop the "Our Home / Vic Falls" section from /about

Editorial decision: the *"Our Home — Victoria Falls, Mosi-oa-Tunya"*
section on `/about` is being retired. It blurs a distinction that
matters: Niels writes from Vic Falls (personal, true, on-brand), but
Safari Overland is a Delaware LLC (legal, true, materially different).
The current copy ("We chose to be based here…") reads as if the
company is Zimbabwean, which creates downstream confusion for
travellers, operators, and any future commercial or compliance
conversation.

Not deleting permanently — removing for now, restorable from git when
the brand has grown to a point where revisiting makes sense.

## Branch

```bash
git checkout main
git pull
git checkout -b feature/drop-our-home-section
```

## What to remove

### From `app/about/page.tsx`

The entire *Our Home* section, identifiable by:

- Eyebrow: `OUR HOME`
- Headline: *"Victoria Falls, Mosi-oa-Tunya."*
- Subhead: *"The smoke that thunders. We chose to be based here…"*
- Two body paragraphs (the Okavango/Hwange geography, the
  starting-with-lodges-we-know paragraph)
- The `MORE ON THE HEADQUARTERS →` CTA link
- The accompanying Victoria Falls photograph

The next section on the page (`WHAT WE STAND FOR`) becomes the new
follow-on after the hero. Make sure the spacing reads cleanly — the
hero shouldn't sit too tight against *What We Stand For* without the
intermediate section as a visual beat. Adjust top padding on the
following section if needed.

### Linked target page (`/headquarters` or similar)

The `MORE ON THE HEADQUARTERS →` link points at a target page —
likely `app/about/headquarters/page.tsx` or `app/headquarters/page.tsx`.
Find it via:

```bash
rg "MORE ON THE HEADQUARTERS|headquarters" app/ components/ --type tsx
```

If a dedicated page exists, delete it. The whole device is being
retired; an orphaned page is worse than no page.

If the link target is the same `/about` page anchored to a section
below, no separate page exists — the section removal handles it.

### Any internal references / nav entries

Less likely but worth a sweep — the term *headquarters* shouldn't
remain anywhere in the public-facing surfaces (header, footer, page
metadata, About sub-navigation if any). Grep:

```bash
rg "headquarters|Headquarters|HEADQUARTERS" app/ components/
```

Internal-only references in code comments, brief files, or admin
strings can stay — they're not customer-facing.

## What NOT to change

These references to Vic Falls stay — they're personal, accurate, and
on-brand:

- The footer brand block: *"A small collection of African safaris,
  by hand. Lodges and operators chosen for what the wild does to you
  — not just what it shows you. From Victoria Falls."* The "From
  Victoria Falls" line refers to the person, not the company.
- Niels' email signature wording: *"Safari Overland · Victoria Falls"*
  alongside his name. Personal sign-off, fine.
- Operator-outreach templates signed *"Niels van de Meer · Safari
  Overland · Victoria Falls · niels@safarioverland.com"*. Same logic.
- BRAND_VOICE.md positioning of Niels as *"a discerning friend
  writing from Victoria Falls"*. Personal-voice device, not a legal
  claim about where the company sits.

The distinction is: anywhere it reads as the *individual* writing
from Vic Falls is fine. Anywhere it reads as the *company* being
based in Vic Falls needs to come out.

## Verify

1. Open `/about` on the preview deployment. The page now flows hero →
   *What We Stand For* without the *Our Home* interlude.
2. Page reads cleanly — no orphan spacing, no abrupt transitions.
3. `MORE ON THE HEADQUARTERS →` link is gone.
4. The target page (if it existed) returns 404 — `/headquarters`,
   `/about/headquarters`, or wherever it lived.
5. Niels' email signature, the footer, and operator-outreach
   templates remain untouched — *"From Victoria Falls"* still
   appears in those personal contexts.

## Tests

- Snapshot test for `/about` — assert *Our Home* section absent
- 404 assertion for the previous headquarters page path (if one
  existed)

## Out of scope

- Re-writing the rest of the `/about` page — only the *Our Home*
  section comes out. The hero, *What We Stand For*, and any
  subsequent sections stay.
- Editing Niels' email signature, footer copy, operator-outreach
  templates, or BRAND_VOICE.md. Those remain accurate as personal-
  voice / personal-attribution references.
- Re-introducing the section later — that's a future editorial
  decision. The git commit hash for this removal becomes the
  restoration reference.

## Done means

- `/about` no longer renders the *Our Home / Victoria Falls
  Mosi-oa-Tunya* section
- The linked headquarters page (if it existed) is deleted
- No "headquarters" / "HEADQUARTERS" string in public-facing
  components
- Footer and personal-attribution references to Vic Falls are
  intact (deliberately untouched)
- Tests pass
- PR description references this brief and notes the commit hash can
  be used to restore the section in future if the editorial
  direction changes
