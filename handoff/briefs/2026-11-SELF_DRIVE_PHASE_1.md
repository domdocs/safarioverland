# Brief — Self-drive, phase 1: message, navigation, intake

**Date:** 2026-11-09
**For:** Claude Code (local, Crucial SSD working copy)
**Status:** DRAFT — copy marked *draft copy* is for Dom to approve in Cowork before build
**Size:** medium — three PRs, listed in build order below

---

## Why

Safari Overland is changing direction. It stops being a pan-African curated collection and becomes a travel company that plans and books **lodge-based self-drive journeys through southern Africa**. Travellers drive themselves and stay at camps and lodges that offer more than a bed, not in rooftop tents. The drive is part of the safari.

The site currently says none of this:

- The hero reads *African safaris, reconsidered*, and the atlas and Field Notes cover East, West and North Africa.
- There is no mention of a vehicle, a route, a road day or a border crossing anywhere on the site.
- The navigation leads with Categories (flights, booking agents, 4×4 rentals, campsites, overland tours), which is directory-era structure.
- The `/plan` intake asks about gorillas, Bwindi and wildebeest crossings. Its budget bands start at $500 per person per night.

Search Console (12 months to 2026-11-09) shows about 26 clicks from 1,790 impressions, most of them brand searches. There is almost no organic traffic to protect, so the change carries little SEO risk. Paid search aimed at US and UK self-drive travellers will be the main source of visitors, and they need to land on a site that speaks to them.

**Markets:** United States and United Kingdom first; Canada rides along with the US. India later; an Arabic-language site is a future phase. Nothing here needs to build for those, beyond not hard-coding things that would block translation.

**The offer, in the house structure of three:**

1. **We draw the route.** Drive times, road surfaces, fuel, borders, gate times, all in a road book.
2. **We book every night, and the vehicle.**
3. **We're on the end of the phone.** A support line while travellers are on the road, backed by partners on the ground.

**Commercials** (for context, not for publication in this phase): the brief is free, and so is a first route sketch. A planning fee of about US$250 / £200 per trip applies once the traveller wants the full road book and the lodges held. It is credited in full against the booking. Revenue otherwise comes from lodge margin, vehicle commission and DMC referral share.

---

## 0. Before any PR — the www certificate (Dom, in Vercel, ~5 minutes)

`https://www.safarioverland.com` fails TLS. The certificate covers only `safarioverland.com`, so anyone who types or clicks the www address gets a browser security warning. Search Console shows **732 impressions** on the www homepage, more than the bare domain's 529. Verified 2026-11-09:

```
subjectAltName does not match host name www.safarioverland.com
```

Fix in the Vercel dashboard: Project → Settings → Domains → add `www.safarioverland.com` set to **redirect (308) to `safarioverland.com`**. Vercel issues the certificate. Then check that `curl -I https://www.safarioverland.com/` returns a 308 to the apex. Not a code change.

---

## PR A — Message and navigation

**Branch:** `feat/self-drive-message` off `main`

### A1. Homepage hero (`app/page.tsx`)

Keep the image, the layout and the headline *Africa, slowly.*. It fits self-drive better than anything new would.

- Eyebrow: `African safaris, reconsidered` → *draft copy* `Self-drive · southern Africa`
- Subhead, *draft copy*:
  > Self-drive journeys through southern Africa, staying at camps and lodges that give you more than a bed. We plan the route, book every night, and stay at the end of the phone while you're on the road.
- Buttons: keep `Start a brief →`. The secondary button `Open the collection` stays.

Update the homepage `metadata` title and description to match. Use "self-drive safari" in both, because that is the phrase the ads and searches will use.

### A2. "Three things" section (`PILLARS` in `app/page.tsx`)

Replace the three pillars with the offer. Keep `NumberedList` and the headline *Three things we promise to do **properly**.*

*Draft copy:*

1. **We draw the route.** Every drive timed, every road surface named, fuel and border crossings and park gate times worked out before you leave. It arrives as a road book, in print and offline on your phone.
2. **We book every night, and the vehicle.** Camps and lodges we'd send our friends to, chosen for what they give you at the end of a day's drive. A vehicle suited to the roads, not a camper you'll never unpack.
3. **We're at the end of the phone.** A person you can call while you're on the road, and partners on the ground in Victoria Falls who hand over your vehicle and are there if something goes wrong.

Name only the towns where a DMC partner is signed. Victoria Falls is named because that one is in place. Add Windhoek and Maun to the line only once their partners are confirmed. Leave a code comment saying so next to the copy.

The existing pillar *Every operator here contributes to conservation, community, or both* moves to the About page if it isn't there already. Don't lose it.

### A3. New homepage section: "Can I do this?"

Place it between the offer and the featured listings. This is the main doubt stopping a first-time self-driver from booking, so it earns its own section.

- Eyebrow `Before you ask`; headline *draft copy*: *Yes, you can **drive** this.*
- Four short answers, each two or three sentences, in a two-column `NumberedList`: **The roads** (tar and good gravel; a 4×4 where it matters, not everywhere), **Driving on the left** (for American travellers: an automatic gearbox on request, and an International Driving Permit), **Borders** (we prepare the paperwork; partners meet you where it helps), **Wildlife and the dark** (you don't drive after sunset; park gates make sure of it, and so do we).

The final wording is Dom's, in Cowork. Build the section with the draft copy above so it can be reviewed on the preview.

### A4. Header navigation (`components/editorial/editorial-header.tsx`, `mobile-drawer.tsx`)

| Now | After |
|---|---|
| Categories | **The collection** → `/categories` |
| Destinations | **Southern Africa** → `/destinations/southern-africa` |
| By hand | By hand (unchanged) |
| Field notes | Field Notes (unchanged; fix the capitalisation to the house style) |
| About | About (unchanged) |
| Sign in · Register | **remove** from the header and the drawer |

Keep the sign-in routes themselves working; just stop advertising them. A **Routes** item arrives in phase 2, when there are routes to show. Don't add an empty one now.

### A5. Footer (`components/editorial/editorial-footer.tsx`)

- **Regions** column → rename to **Where we drive**. Keep only Southern Africa for now; phase 2 adds route pages.
- **Social** — remove Facebook and Twitter (X is out of the social plan). Point Instagram at the account's real URL. `components/JsonLd/GlobalJsonLd.tsx` uses `instagram.com/safari_overland`, but CLAUDE.md names the handle `@safarioverland`. **Confirm with Dom which is right** and make the footer and the JSON-LD agree. Add a LinkedIn link only if Dom supplies Niels' URL; otherwise leave it out.
- The footer line *From Victoria Falls.* stays.

### A6. Off-region destination pages

- 308-redirect `/destinations/east-africa`, `/destinations/west-africa` and `/destinations/north-africa` to `/destinations/southern-africa`, in `next.config.mjs` alongside the existing `/resources` redirects.
- Redirect `/destinations` to `/destinations/southern-africa` too, while it is the only region. Delete the three page directories in the same PR, so nothing is left unreachable behind a redirect.
- In `app/sitemap.ts`, remove the `/destinations` entry (line ~67) and cut the `DESTINATIONS` list down to `southern-africa`. Otherwise the sitemap advertises URLs that redirect.

**Not in this PR:** the off-region Field Notes (Egypt, Morocco, Ghana, Kenya, Tanzania, gorillas and so on). They need a content decision per page and belong in phase 2's content rework. They simply stop being linked from navigation.

### A7. Legacy URLs

Search Console still shows `/community` (404 on production) and `/submit` (200, a directory-era submission form).

- Redirect `/community` → `/about`.
- `/submit`: redirect to `/contact`, unless the operator submission form is still wanted. **Ask Dom before removing it.**

---

## PR B — The intake, rewritten for self-drive

**Branch:** `feat/self-drive-intake` off `main` (after A merges, or in parallel — no shared files)

`lib/briefs/options.ts` says option `value`s are persisted to the `briefs` table and must stay stable. Labels can change freely. Follow that rule throughout.

### B1. Budget step

Keep the step and the stored values (`budget`, `mid`, `luxury`, `exclusive`, `discuss`). The CHECK constraint in `20260513_briefs_structured_fields.sql` depends on them. Relabel to bands that fit lodge-based self-drive. The vehicle is priced separately, so say so:

| value | new label |
|---|---|
| `budget` | Up to $250 per person per night |
| `mid` | $250–$500 per person per night |
| `luxury` | $500–$1,000 per person per night |
| `exclusive` | $1,000+ per person per night |
| `discuss` | I'd rather discuss this on a call |

Step lede: *Lodges only — we'll price the vehicle with you.*

**Side effect to check:** these values match `directory_listings.price_tier`, and `lib/briefs/shortlist.ts` uses them for matching. Relabelling moves the dollar meaning of every tier. Check the tier assigned to each listing still makes sense, and list any that should move in the PR description rather than changing them silently.

### B2. Intent and wildlife options

- `INTENT_OPTIONS`: drop `migration` from the options shown. Add `{ value: "first-self-drive", label: "My first self-drive in Africa" }` near the top.
- `WILDLIFE_OPTIONS`: drop `primates`, `migration` and `mountain-forest` from the options shown. Relabel `walking-landscapes` to name places self-drivers reach (*Big landscapes on foot — Hwange, Matobo, Mana Pools*). Set every remaining option's `regions` to `["Southern Africa"]` or `[]`.
- Retired values must still render on old briefs in the admin and the emails. Keep them in a `LEGACY_*` list that `labelFor` falls back to, not in the arrays the form maps over.

### B3. Three new questions

Add them as new steps after "The rhythm". Each is a single choice unless stated.

1. **"Have you driven in Africa before?"** — `never` · `once-or-twice` · `often`
2. **"How long are you happy to drive in a day?"** — `under-3h` *Up to three hours — the drive is a means, not the point* · `3-5h` *Three to five hours, with stops* · `5h-plus` *A long day at the wheel doesn't bother me*
3. **"Where are you drawn to?"** (multi-select) — `zimbabwe` · `namibia` · `botswana` · `zambia` · `south-africa` · `unsure` *Not sure yet — show me*

Store them in new columns on `briefs`, in a new migration file: `drive_experience TEXT`, `drive_hours TEXT`, `countries TEXT[]`, each with a CHECK constraint like the existing columns. Show the answers on the review step, in `brief-row.tsx`, and in both brief emails.

**After merge, push the migration** (CLAUDE.md rule 8): run `supabase migration list` and push what the remote is missing.

### B4. Copy on `/plan`

- The metadata description and opening subhead promise *three routes within 48 hours*. Keep the promise and make it self-drive: *draft copy* *Tell us how you like to travel and how long you're happy at the wheel. We'll come back with three routes within 48 hours.*
- The step count in the eyebrow (`eight short questions`) must match the new number of steps.

---

## PR C — Voice guide update (Cowork, not Claude Code)

Voice judgement stays in Cowork, so this is a note for Dom rather than a build task. `handoff/BRAND_VOICE.md` needs three changes before phase 2 copy is written:

1. **Principle 5** says *"we have nothing to sell"*. That is no longer true. Suggested replacement: *we earn from the trips we book, never from who we list* — which is still the honest second opinion, stated truthfully.
2. **Brand vocabulary** gains: *self-drive* (hyphenated, never *self drive*), *the road book*, *on the road*, *routes*. Avoid *overland* as a description of the trip in body copy — searches show it draws overland-truck travellers. It stays in the name.
3. **From Victoria Falls** returns as a working hub (partners on the ground, routes that start there), not as a personal home base. This keeps the company/personal separation the About page change was protecting.

---

## Out of scope for phase 1

- Route pages (`/trips/[slug]`), ad landing pages per country, and a Routes nav item — **phase 2**.
- Growing the collection from 5 listings to about 40–50, and the "Getting there by road" fields on listings — **phase 3**.
- The off-region Field Notes and new self-drive guides — **phase 2 content rework**.
- Publishing the planning fee on the site — wait until the first few briefs have been handled.
- Translation (Arabic, later) — nothing to build yet.

## Verification

- Preview: the homepage, `/plan` end to end with a test brief, header and drawer at mobile width, footer.
- `curl -I` each redirected URL **on production after merge**, not just the preview (see CHANGELOG 2026-08-07: preview is not evidence for runtime behaviour).
- After PR B merges: confirm the migration is applied remotely and a real brief writes the three new columns.
- The `ALLOWED_MIME` test failure on `main` (CHANGELOG 2026-08-07) is unrelated; don't let it block these PRs.
