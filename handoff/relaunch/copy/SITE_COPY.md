# Site copy — self-drive relaunch

**Status:** draft for Dom's approval (D-10). Voice is Dom's call; nothing here is final until he says so.
**Date:** 2026-11-09
**Governs:** `handoff/BRAND_VOICE.md` (twelve unforgivables), `handoff/relaunch/STRATEGY.md` §5–6.

## How to use this deck

- Each slot has an exact string. Paste it as written.
- `*word*` marks the single italic-amber accent in a headline (`<span className="italic text-amber">`). One per headline, never more.
- `→` at the end of a button label is part of the label.
- Apostrophes are written straight here; escape them in JSX (`&apos;`) as the existing code does.
- Anything in `[square brackets]` is a placeholder. It stays visible on the preview until Dom supplies the value. All of them are listed at the end, under **Placeholders**.
- Page titles: `app/layout.tsx` applies the template `%s | Safari Overland`. Titles below are written **without** the suffix, except the homepage, which sets its own absolute title.
- Numbers: one to nine in words, 10 and above in numerals. Night ranges and prices in numerals.

---

## 1. Homepage (`app/page.tsx`)

### 1.1 Hero

| Slot | Copy |
|---|---|
| Eyebrow | `Self-drive · southern Africa` |
| Headline | `Africa, *slowly*.` (kept — it suits the drive better than anything new) |
| Subhead | `Drive yourself through southern Africa, and end each day at a camp or lodge that gives you more than a bed. We draw the route, book the nights and the vehicle, and stay at the end of the phone while you're on the road.` |
| Primary button | `Start a brief →` |
| Secondary button | `See the routes` (links to `/routes`) |
| Hero image alt | `Tented camp at sunset in the African bush` (unchanged) |

Note: if `/routes` is not live when the hero ships, the secondary button falls back to `Open the collection` → `/categories`.

### 1.2 The offer — "Three things"

| Slot | Copy |
|---|---|
| Eyebrow | `What we do` |
| Headline | `Three things we promise to do *properly*.` |

`NumberedList`, single column:

**01 — We draw the route.**
Drive times given as honest ranges, the road surface named for each stretch, and the fuel, border crossings and park gate times worked out before you leave. It comes to you as a road book, in print and offline on your phone.

**02 — We book the nights, and the vehicle.**
Camps and lodges we'd send our friends to, chosen for what waits at the end of a day's drive: a guide who can read a track, a hide at a waterhole, a fire. And a 4×4 or SUV matched to the roads, not a camper you'll never unpack.

**03 — We're at the end of the phone.**
A person you can call while you're on the road. Our partners on the ground in Victoria Falls hand over the vehicle, meet you where it helps, and are there if something goes wrong.

> Code comment for 03: name only towns where a partner on the ground is signed (D-02). Victoria Falls only, for now. Add Windhoek, then Maun or Kasane, when Dom confirms them.

### 1.3 "Can I do this?"

Placed between the offer and the featured listings. Two-column `NumberedList`.

| Slot | Copy |
|---|---|
| Eyebrow | `Before you ask` |
| Headline | `Yes, you can *drive* this.` |
| Lede (optional, italic serif) | `It's the question most people arrive with. The short answers are below; the long ones are in the road book.` |

**01 — The roads.**
The main roads are tar or graded gravel, and the road book names the surface for each day before you set off. Where a stretch needs a 4×4 — sand in a park, a rough track into a camp — we say so, and the vehicle is chosen for it. A 4×4 where it matters, not everywhere.

**02 — Driving on the left.**
All of the countries on our routes drive on the left. Ask for an automatic and there's one less thing to think about; the first morning feels strange, and by the second day you're watching the road, not which side of it you're on. Bring your licence and an International Driving Permit.

**03 — Borders.**
A border by car means paperwork: permission from the rental company to cross, permits, road fees, insurance papers. We arrange what can be arranged in advance and the road book lists what to have in hand at each post. Around Victoria Falls, our partners can meet you at the crossing.

**04 — After dark, and the wildlife.**
You don't drive after sunset. Park gates close at dusk, cattle and wildlife use the roads at night, and the road book is timed so you're in camp well before either matters. Elephants have right of way; we'll tell you how to give it.

### 1.4 Routes teaser

| Slot | Copy |
|---|---|
| Eyebrow | `Where we drive` |
| Headline | `Three routes to *start* from.` |
| Lede | `Each one is a shape, not a package. Lengthen it, shorten it, join two together. We draw the final version around your dates.` |
| Link | `All routes →` |

Route cards (title, nights line, one-line hook):

**R1 — Zimbabwe: Falls, Hwange, Matobo**
`About 10–12 nights`
`Spray from the Falls, elephants at Hwange's waterholes, then granite hills and old rock art in the Matobo.`

**R2 — Namibia: Kalahari to Etosha**
`About 14–16 nights`
`Red Kalahari sand, the dunes at Sossusvlei, a cold Atlantic coast, and the white pan at Etosha, with long gravel roads in between.`

**R3 — The four corners: Falls, Chobe, Caprivi**
`About 8–10 nights`
`A short loop from the Falls along the Chobe and into the Zambezi Region, where four countries meet on the rivers.`

Card link label: `See the route →`

### 1.5 Featured listings

| Slot | Copy |
|---|---|
| Eyebrow | `From the collection` |
| Headline | `A few we'd send our friends to.` (kept) |
| Link | `Open the collection →` |

### 1.6 By hand card (existing section, light touch)

| Slot | Copy |
|---|---|
| Eyebrow | `By hand — open` |
| Headline | `A route, drawn *by hand*.` |
| Subhead | `Tell us how you like to travel and how long you're happy at the wheel. We'll come back with three routes within 48 hours.` |
| Primary button | `Start a brief →` |
| Secondary button | `Speak to a planner` |
| Side list eyebrow | `How it works — in three steps` |
| Step 01 | `You tell us the months, the pace, and how far you like to drive.` |
| Step 02 | `We draw three routes — at different paces and budgets.` |
| Step 03 | `You pick one. We book it and send the road book.` |

### 1.7 Field Notes

| Slot | Copy |
|---|---|
| Eyebrow | `Field Notes` (capital N — fixes the current `Field notes`) |
| Headline | `What to read before you *drive*.` |
| Link | `All Field Notes →` |

Note: the three featured notes currently include *East vs Southern Africa*. Swap in self-drive planning guides when they exist; that's a content decision outside this deck.

### 1.8 Metadata

| Slot | Copy |
|---|---|
| Title (absolute) | `Self-drive safari in southern Africa | Safari Overland` |
| Description | `Self-drive safaris in Zimbabwe, Namibia, Botswana and Zambia. Drive yourself, sleep in camps and lodges, not a rooftop tent. We draw the route and book it.` |
| OG/Twitter title (layout.tsx defaults) | `Safari Overland — Self-drive safaris in southern Africa, by hand` |

---

## 2. About (`app/about/page.tsx`, `app/about/layout.tsx`)

Full rewrite. Structure kept: hero → three things, always → mission and vision → (new) from Victoria Falls → three things we screen for → (new) who we are and how we're paid.

### 2.1 Hero

| Slot | Copy |
|---|---|
| Eyebrow | `About` |
| Headline | `Planned by hand, *driven by you*.` |
| Subhead | `Safari Overland plans and books self-drive safaris through southern Africa: the route, the vehicle, and a camp or lodge worth the drive at the end of each day.` |
| Image alt | `Sunrise over Victoria Falls, where our routes begin` |

### 2.2 Three things, always (the offer)

| Slot | Copy |
|---|---|
| Eyebrow | `What we promise to do properly` |
| Headline | `Three things, *always*.` |

**01 — We draw the route.**
The road book is the heart of it: drive times, road surfaces, fuel, borders and park gate times for each day, in print and offline on your phone. We'd rather tell you a day is long than let you find out at four in the afternoon.

**02 — We book the nights, and the vehicle.**
Places from the collection, held for your dates, and a vehicle matched to the roads you'll drive. One booking, one set of people to talk to.

**03 — We stay on the line.**
While you're on the road there's a person to call, and partners on the ground who can reach you. Help that is close by, not a ticket number.

### 2.3 Mission and vision

**Mission** (left column)

| Slot | Copy |
|---|---|
| Eyebrow | `Mission` |
| Headline | `Put travellers on the road, and somewhere worth arriving at the end of it.` |
| Subhead | `The drive is half of what people remember: the farm stall, the border post, the light on the gravel late in the day.` |
| Body | `A self-drive safari gives you something a fly-in trip can't — the country between the parks, at your own pace, with the windows down. What it usually lacks is a proper bed and a guide in the morning. We put the two together. You drive. Each night ends at a camp or lodge with something only it offers: a walking guide, a hide, rhino on foot, a community that owns the land. The collection is small on purpose. Each name on it is one we'd send our closest friends to.` |

**Vision** (right column)

| Slot | Copy |
|---|---|
| Eyebrow | `Vision` |
| Headline | `An honest second opinion, in writing.` |
| Subhead | `We earn from the trips we book, never from who we list.` |
| Body | `That's how we can tell you what other safari sites won't. A drive that's too long for one day. A park that's better in the shoulder season. A famous name that isn't worth what it asks. When you travel with us, your money goes to places that look after the land and the people who live beside it — anti-poaching work, community trusts, lease payments, habitat. The trip is the means. Southern Africa doing well by the people who live in it is the end.` |

### 2.4 From Victoria Falls (new section)

Replaces the retired "Our home" section with a working-hub framing (STRATEGY §6). No personal home base.

| Slot | Copy |
|---|---|
| Eyebrow | `From Victoria Falls` |
| Headline | `Where the *road* starts.` |
| Body ¶1 | `Our routes begin at Victoria Falls — Mosi-oa-Tunya, the smoke that thunders — where Zimbabwe, Zambia, Botswana and Namibia sit within a day's drive of each other. It's where our partners on the ground are.` |
| Body ¶2 | `They hand over your vehicle, walk you through the road book, meet you at a border where it helps, and are the people who come if something goes wrong. When a partner is signed in another hub, we'll name the town here, and not before.` |

### 2.5 Three things we screen each operator for

Note: headline drops "every" (unforgivable 12); the structure is unchanged.

| Slot | Copy |
|---|---|
| Eyebrow | `What earns a place` |
| Headline | `Three things we screen *each operator* for.` |
| Lede | `A place has to be reachable by road, or have a safe place to leave the car. After that, these three.` |

**01 — More than a bed.**
Something only it offers — a hide, a walking guide, rhino tracking, a sleep-out, a landscape you can't see from anywhere else — and guided activities, so you're not limited to driving yourself round the park.

**02 — Worth what it asks.**
Honest value at any price. Most of the collection sits between [US$150] and [US$600] per person per night; where a place costs more, we've decided it's worth it, and we say why. Last of all, the friend test: would we send a friend there.

**03 — Good for the place.**
Conservation and community, shown rather than claimed. Anti-poaching levies, habitat management, lease payments to community trusts, local people in real jobs — we ask operators to show us the work, and we favour the ones where the money stays where it was earned.

### 2.6 Who we are, and how we're paid (new section)

| Slot | Copy |
|---|---|
| Eyebrow | `Who we are` |
| Headline | `One editor, and *no* paid places.` |
| Body ¶1 | `The collection is edited by Niels van de Meer. He decides what's in it and what comes out, and he writes most of what you read here. [One-line bio for Niels.]` |
| Body ¶2 | `Operators never pay to be listed, and a place can't pay its way in or stay in once it stops earning its place. We're paid when you book a trip with us: by the camps and lodges, and by the partners who supply the vehicle and look after you on the ground. The brief and a first sketch of your route cost nothing.` |

### 2.7 About metadata

| Slot | Copy |
|---|---|
| Title | `About` |
| Description | `Safari Overland plans and books lodge-based self-drive safaris in southern Africa, from Victoria Falls. Operators never pay to be listed.` |

---

## 3. Routes index (`/routes`)

| Slot | Copy |
|---|---|
| Eyebrow | `Routes` |
| Headline | `Where we *drive*.` |
| Lede | `Three routes to start from, drawn on roads we know and around places we'd send a friend. None of them is fixed. Lengthen one, shorten one, join two together.` |
| Meta title | `Self-drive safari routes in southern Africa` |
| Meta description | `Three self-drive safari routes: Zimbabwe, Namibia, and a short loop from Victoria Falls through Chobe and Caprivi. Lodge-based, with a road book for each day.` |

Route cards reuse the titles, nights lines and hooks from §1.4. Card link: `See the route →`.

### 3.1 How a route works

| Slot | Copy |
|---|---|
| Eyebrow | `How a route works` |
| Headline | `A shape, then a *road book*.` |

**01 — We draw it for your dates.**
Start a brief and we come back with three routes. Pick one, and we turn it into a road book: each day's drive time and road surface, where to fill up, which border post, when the park gates open and close. In print, and offline on your phone, because signal runs out before the road does.

**02 — We book it.**
The camps and lodges, held for your nights, and a vehicle matched to the roads. You get one itinerary and one set of people to talk to, not a folder of separate confirmations.

**03 — We're on the phone.**
While you're on the road there's a person to call, [support line hours]. Our partners on the ground in Victoria Falls hand over the vehicle and are the backup if something goes wrong.

Closing line under the explainer: `Prices depend on the season, the places and the vehicle, so we quote each route for your dates.`
Button: `Start a brief →`

---

## 4. Route detail template (`/routes/[slug]`)

### 4.1 Static labels

| Slot | Copy |
|---|---|
| Eyebrow pattern | `Route · {country or countries}` e.g. `Route · Zimbabwe` |
| Facts strip labels | `Nights` · `Countries` · `Starts` · `Ends` · `Longest drive` · `Best months` · `Vehicle` |
| Facts strip value examples | `About 10–12` · `Zimbabwe` · `Victoria Falls` · `Bulawayo or Victoria Falls` · `[x–y hours], tar` · `[Months]` · `4×4` |
| Price line | `From [US$X] per person, sharing` |
| Price footnote | `Indicative for [year], lodges only. The vehicle is priced with you. Confirmed when we hold your nights.` |
| Section: The drive | `The drive` |
| The drive — lede | `Day by day, with the drive time, the road surface and what's worth stopping for.` |
| Day label pattern | `Day {nn}` e.g. `Day 01`, `Days 03–04` |
| Day sub-label pattern | `{From} to {To}` e.g. `Victoria Falls to Hwange` |
| Rest day label | `No driving` |
| Section: Where you stay | `Where you stay` |
| Where you stay — lede | `The camps and lodges we'd book on this route. Each one is in the collection, and each can be swapped.` |
| Section: On the road | `On the road` |
| On the road — lede | `Stops that make the drive part of the safari: a farm stall, a long lunch, the night before a border.` |
| Section: Before you go | `Before you go` |
| Before you go — lede | `The practical things, plainly.` |
| Before you go — sub-heads | `Licence and permits` · `Borders on this route` · `Money and fuel` · `Signal` · `Health` · `When to go` |
| Section: variants | `Make it longer, or shorter` |
| Variants — lede | `Ways this route bends.` |
| Back link | `← All routes` |

### 4.2 Make it yours (CTA block)

| Slot | Copy |
|---|---|
| Eyebrow | `Make it yours` |
| Headline | `This route, drawn for *your* dates.` |
| Body | `Tell us when you can travel, how long you're happy at the wheel and what you'd like at the end of the day. We'll come back with the route adjusted to fit, within 48 hours. The brief is free.` |
| Primary button | `Start a brief for this route →` |
| Secondary button | `Speak to a planner` |
| Reassurance (mono) | `Free, no commitment. About five minutes.` |

### 4.3 Route metadata pattern

| Slot | Copy |
|---|---|
| Title | `{Route name}: a self-drive safari route` e.g. `Falls, Hwange, Matobo: a self-drive safari route` |
| Description | `{Nights} nights by road through {places}, staying at camps and lodges with guided activities. Drive times, road surfaces and borders in a road book.` |

---

## 5. Ad landing pages (`/self-drive/[country]`)

Shared structure: H1, subhead, three benefit lines (`NumberedList` or a short ruled list), the "not camping" line, CTA, reassurance.

Shared slots:

| Slot | Copy |
|---|---|
| Benefits eyebrow | `What we do` |
| "Not camping" eyebrow | `Not a camping trip` |
| Reassurance (mono, under the CTA) | `Free, no commitment. Three routes back within 48 hours.` |
| Secondary link | `See the full route →` |

### 5.1 `/self-drive/zimbabwe`

| Slot | Copy |
|---|---|
| H1 | `A self-drive safari in *Zimbabwe*.` |
| Subhead | `Victoria Falls, Hwange and the Matobo hills by road, with a camp or lodge at the end of each day's drive. Our partners in Victoria Falls hand you the keys.` |
| Benefit 01 | `A road book with each day's drive time, road surface, fuel stop and park gate times.` |
| Benefit 02 | `Camps and lodges with guides, hides and walking, so you're not just driving yourself round the park.` |
| Benefit 03 | `Partners on the ground in Victoria Falls, and a person to call while you're on the road.` |
| Not camping | `No rooftop tent, no camp to pitch in the dark. You drive the day; someone else lights the fire.` |
| CTA | `Plan my Zimbabwe route →` (links to `/plan`) |
| Meta title | `Self-drive safari in Zimbabwe: Victoria Falls, Hwange, Matobo` |
| Meta description | `A lodge-based self-drive safari in Zimbabwe, from Victoria Falls to Hwange and the Matobo hills. We draw the route, book the nights and the vehicle.` |

### 5.2 `/self-drive/namibia`

| Slot | Copy |
|---|---|
| H1 | `A self-drive safari in *Namibia*.` |
| Subhead | `The Kalahari, the dunes at Sossusvlei, the coast at Swakopmund, Damaraland and Etosha, by road. Long distances, drawn into days that end somewhere worth arriving.` |
| Benefit 01 | `Days planned around Namibia's distances and gravel, with drive times as honest ranges.` |
| Benefit 02 | `Lodges with guided drives, walks and dark skies, booked for each night of the route.` |
| Benefit 03 | `A road book in print and offline on your phone, because signal runs out before the road does.` |
| Not camping | `No rooftop tent, no camp to pitch in the dark. A proper bed at the end of a long gravel day, and a guide in the morning.` |
| CTA | `Plan my Namibia route →` |
| Meta title | `Self-drive safari in Namibia: Kalahari, Sossusvlei, Etosha` |
| Meta description | `A lodge-based self-drive safari in Namibia, from the Kalahari and Sossusvlei to Etosha. A road book for each day, lodges booked, a vehicle matched to the roads.` |

### 5.3 `/self-drive/botswana-zambia`

| Slot | Copy |
|---|---|
| H1 | `A self-drive safari from *Victoria Falls*.` |
| Subhead | `The Falls, the Chobe riverfront and the Zambezi Region, where four countries meet on the rivers. A short loop with a lodge at the end of each day's drive.` |
| Benefit 01 | `Border crossings prepared before you leave, with the paperwork listed for each post.` |
| Benefit 02 | `Lodges by the rivers, with boats and guided drives, so the wildlife comes to you as well.` |
| Benefit 03 | `Partners on the ground in Victoria Falls, where the route begins and ends.` |
| Not camping | `No rooftop tent, no camp to pitch in the dark. You keep the freedom of your own vehicle and lose the camping kit.` |
| CTA | `Plan my route from the Falls →` |
| Meta title | `Self-drive safari in Botswana and Zambia, from Victoria Falls` |
| Meta description | `A short lodge-based self-drive safari from Victoria Falls through Chobe and the Zambezi Region. Borders prepared, lodges booked, a road book for each day.` |

Ad testing note (STRATEGY §6): for US campaigns, Dom may test `road trip` in ad headlines (e.g. `A safari road trip through Zimbabwe`); for UK campaigns, `self-drive holiday`. Landing-page H1s stay as above so they match the search phrase.

---

## 6. `/plan` intake (`app/plan/page.tsx`, `lib/briefs/options.ts`, `components/trip-builder/trip-builder-form.tsx`)

### 6.1 Page

| Slot | Copy |
|---|---|
| Eyebrow | `By hand — eleven short questions` (eight existing + three new; update if the count changes) |
| H1 | `Your route, drawn *by hand*.` |
| Subhead | `Tell us how you like to travel and how long you're happy at the wheel. We'll come back with three routes within 48 hours.` |
| Reassurance (mono) | `Free, no commitment. About five minutes. Saved on this device — come back any time.` |
| Listing chip | `Including {listing} in this brief` (unchanged) |
| Planner block heading | `Or speak to a planner first.` (unchanged) |
| Planner block lede | `Thirty minutes on a call before you fill anything in. Sometimes faster than a form.` |
| Meta title | `Plan a self-drive safari, by hand` |
| Meta description | `Tell us how you like to travel and how long you're happy at the wheel. We'll come back with three self-drive routes within 48 hours. Free, no commitment.` |

### 6.2 Budget step (relabelled; values unchanged)

| Slot | Copy |
|---|---|
| Step title | `A comfortable budget, per person per night.` (unchanged) |
| Step lede | `Lodges only — we'll price the vehicle with you.` |

| value | label |
|---|---|
| `budget` | `Up to $250 per person per night` |
| `mid` | `$250–$500 per person per night` |
| `luxury` | `$500–$1,000 per person per night` |
| `exclusive` | `$1,000+ per person per night` |
| `discuss` | `I'd rather discuss this on a call` |

### 6.3 New questions (after "The rhythm")

**Driving experience** — single choice

| Slot | Copy |
|---|---|
| Step title | `Have you driven in Africa before?` |
| Step lede | `No wrong answer. It tells us how much to put in the road book.` |

| value | label |
|---|---|
| `never` | `Never — this would be my first time` |
| `once-or-twice` | `Once or twice` |
| `often` | `Often — I know the roads` |

**Hours at the wheel** — single choice

| Slot | Copy |
|---|---|
| Step title | `How long are you happy to drive in a day?` |
| Step lede | `We'll keep most days inside it, and tell you about any that aren't.` |

| value | label | lede |
|---|---|---|
| `under-3h` | `Under three hours` | `The drive is a means, not the point.` |
| `3-5h` | `Three to five hours` | `With stops along the way.` |
| `5h-plus` | `Five hours or more` | `A long day at the wheel doesn't bother me.` |

**Countries** — multi-select

| Slot | Copy |
|---|---|
| Step title | `Where are you drawn to?` |
| Step lede | `Pick as many as you like.` |

| value | label |
|---|---|
| `zimbabwe` | `Zimbabwe` |
| `namibia` | `Namibia` |
| `botswana` | `Botswana` |
| `zambia` | `Zambia` |
| `south-africa` | `South Africa` |
| `unsure` | `Not sure yet — show me` |

Review-step labels for the three answers: `Driven in Africa` · `Hours at the wheel` · `Countries`.

### 6.4 Intent and wildlife

New `INTENT_OPTIONS` entry, near the top:

| value | label |
|---|---|
| `first-self-drive` | `My first self-drive in Africa` |

Relabelled `WILDLIFE_OPTIONS` entry:

| value | label |
|---|---|
| `walking-landscapes` | `Big landscapes on foot — Hwange, Matobo, Mana Pools` |

---

## 7. Header and footer

### 7.1 Header (`editorial-header.tsx`, `mobile-drawer.tsx`)

Primary nav, in order:

| href | label |
|---|---|
| `/routes` | `Routes` |
| `/categories` | `The collection` |
| `/destinations/southern-africa` | `Southern Africa` |
| `/field-notes` | `Field Notes` |
| `/plan` | `By hand` |
| `/about` | `About` |

Utility links (unchanged): `Search` · `Contact`. `Sign in` and `Register` come out of the header and the drawer.
Logo aria-label: `Safari Overland — home` (unchanged).

### 7.2 Footer (`editorial-footer.tsx`)

| Slot | Copy |
|---|---|
| Brand eyebrow | `Safari Overland` |
| Tagline (serif) | `Self-drive safaris in southern Africa, by hand.` |
| Line under it | `Routes we draw, camps and lodges we'd send our friends to, and someone at the end of the phone. From Victoria Falls.` |
| Column 1 title | `Where we drive` |
| Column 1 links | `Zimbabwe: Falls, Hwange, Matobo` · `Namibia: Kalahari to Etosha` · `The four corners` · `Southern Africa` |
| Column 2 title | `The collection` (data-driven categories, as now) |
| Column 3 title | `Field Notes` |
| Column 3 links | `Planning guides` · `Seasonal guides` · `Conservation` · `Safety` (unchanged) |
| Social | `Instagram` only, linking to [Instagram URL]. No Facebook, no X. |
| Copyright | `© {year} Safari Overland. All rights reserved.` |
| Policy | `Privacy` · `Terms` · `Contact` |

---

## 8. Microcopy

### 8.1 Headings and labels

| Slot | Copy |
|---|---|
| Lodges on a route | `Lodges on this route` |
| On-the-road listings on a route | `Stops on this route` |
| Listing → route cross-link | `On these routes` |
| Listing type label for stopovers | `On the road` |
| Listing CTA | `Add this to a brief →` |

### 8.2 Getting there by road (listing detail)

| Slot | Copy |
|---|---|
| Section heading | `Getting there by road` |
| Label | `From the previous stop` |
| Value pattern | `{x–y} hours from {place}, about {n} km` |
| Label | `Road surface` |
| Value options | `Tar` · `Graded gravel` · `Sand` · `Tar, then gravel for the last {n} km` |
| Label | `4×4 needed` |
| Value options | `Yes` · `No` · `Recommended` · `In the rains` |
| Label | `Gate times` |
| Value pattern | `Open {hh:mm}, close {hh:mm}` / `Varies by month — check the road book` / `No park gate` |
| Label | `Fuel` |
| Value pattern | `Last fuel at {town}, {n} km before` / `Fuel on site` |
| Source footnote | `Drive times are ranges and depend on the season and the road. Checked [month year].` |
| Missing value | `Not yet verified` |

### 8.3 Empty states

| Where | Copy |
|---|---|
| Route with no lodges yet | `We're still choosing the places on this route. Start a brief and we'll draw it with you.` |
| Route with no on-the-road stops | `No stops listed yet. The road book will have them.` |
| Collection category with no listings | `Nothing here yet. We'd rather list nothing than something we wouldn't send a friend to.` |
| Search, no results | `Nothing matched that. Try a place, a park or a route name.` |
| Field Notes category, empty | `No Field Notes here yet.` |
| Getting there by road, no data | `Road details to follow. We'll put them in your road book.` |

### 8.4 System messages

| Where | Copy |
|---|---|
| Brief saved locally | `Brief saved. Continue when you're ready.` |
| Brief sent (heading) | `Brief received.` |
| Brief sent (body) | `We'll come back with three routes within 48 hours, by email.` |
| Form error, generic | `Something went wrong sending that. Your answers are saved — try again in a moment.` |
| Required field | `We need this one to get back to you.` |

---

## Placeholders

Each needs a value from Dom before launch. Decision IDs refer to `handoff/relaunch/DECISIONS.md`; new items are marked *new* for the chief of staff to log.

| Placeholder | Where | Decision |
|---|---|---|
| `[support line hours]` | §3.1 item 03 (e.g. "from 06:00 to 22:00 local time", or remove the clause) | D-04 |
| Support phone number | Not shown anywhere in this deck. If Dom wants a number published, it goes in §3.1 and §4.2 | D-04 |
| `[Partner name]` | Not used — copy says "our partners in Victoria Falls" throughout, per STRATEGY §5. Swap in a name only once confirmed | D-02 |
| Other hubs (Windhoek, Maun or Kasane) | §1.2 item 03, §2.4 ¶2 — not named until signed | D-02 |
| Vehicle partner | Not named; copy says "a vehicle matched to the roads" | D-03 |
| `[US$X]` per route "from" price, and `[year]` | §4.1 price line and footnote | *new* |
| `[x–y hours]`, `[Months]` | §4.1 facts strip examples, per route, from research | *new* (research team) |
| `[US$150]`, `[US$600]` | §2.5 item 02 — the target band from STRATEGY §4; confirm Dom is happy to publish it | *new* |
| `[One-line bio for Niels.]` | §2.6 ¶1 | *new* |
| `[Instagram URL]` | §7.2 social | D-05 |
| `[month year]` | §8.2 source footnote, per listing | *new* (research team) |

## Facts to confirm (not placeholders, but not mine to assert)

- **Automatic gearbox on request** (§1.3 item 02) depends on the vehicle partner's fleet (D-03). If automatics can't be guaranteed, change to `Ask for an automatic and we'll do our best to find one`.
- **International Driving Permit** (§1.3 item 02): I believe it's required or strongly advised for US licence holders in these countries, but requirements differ by country and I haven't verified them. The research team should source this before launch.
- **"Park gates close at dusk"** (§1.3 item 04) is true of the national parks on these routes as far as I know; times vary by park and month, which is why the deck avoids quoting them.
- **"The brief and a first sketch of your route cost nothing"** (§2.6 ¶2) states the free part of the commercials (STRATEGY §2). It does not mention the planning fee, which isn't published yet (D-01). Dom should confirm he's happy to say this much.
- **"We're paid by the camps and lodges, and by the partners"** (§2.6 ¶2) describes the revenue model in general terms. STRATEGY marks commercials as internal; Dom should confirm this level of disclosure. A shorter fallback: `Operators never pay to be listed. We're paid when you book a trip with us.`
- **Rock art in the Matobo, rhino on foot** (§1.4, §2.3) are place-level, widely documented facts, not claims about a particular lodge. Rhino on foot is used as an example of what a place might offer, not attributed to any listing.

## Notes outside this deck's scope

- `SEASON_OPTIONS` still contains `migration-window` with the lede "Specific to East Africa." It should probably be retired to the legacy list with the other East Africa options.
- The homepage Field Notes block links *East vs Southern Africa* and *Luxury vs budget safaris*. Both read as directory-era; replace when self-drive guides exist (D-07).
- `app/layout.tsx` default and OG titles still say "A small collection of African safaris, by hand". §1.8 gives a replacement.
