# Relaunch strategy — Safari Overland, self-drive

**Owner:** chief of staff (Claude), for Dom. **Date:** 2026-11-09.
**Status:** working document for the relaunch team. Every agent reads this first.
Open questions for Dom are in `handoff/relaunch/DECISIONS.md`. Anything that needs his say gets a placeholder and an entry there. It never blocks the work.

---

## 1. What we are now

Safari Overland plans and books **lodge-based self-drive journeys through southern Africa**. Travellers drive themselves, and each night they stay at a camp or lodge that offers more than a bed: a guide who can read a track, a hide at a waterhole, a community that owns the place, a view worth the drive. The places don't have to be top-dollar.

**The drive is part of the safari.** The road between parks — the farm stall, the border post, the light on the gravel at four in the afternoon — is half of what people remember.

**Who arrives:** people who searched for a self-drive safari, expecting rooftop tents and camping kit. They find something better: the freedom of their own vehicle, with a proper bed and a guided morning at the end of the day.

**Markets:** United States first, then United Kingdom. Canada rides along with the US. India comes later, and an Arabic-language site later still. Build nothing for those yet, but don't hard-code anything that would block translation.

**Currency:** USD everywhere, because lodges price in USD. An indicative GBP figure where a price is shown is fine.

**Spelling:** British, as now. It suits the editorial voice.

## 2. The offer — three things (always three)

1. **We draw the route.** Daily drive times, road surfaces, fuel, border crossings and park gate times, delivered as a **road book**, in print and offline on the phone.
2. **We book every night, and the vehicle.** Camps and lodges from the collection, and a vehicle matched to the roads. Lodge-based travel means a 4×4 or SUV, not a kitted camper.
3. **We're at the end of the phone.** A support line while travellers are on the road. **Partners on the ground** (local DMCs) in the hubs: Victoria Falls now, Windhoek and Maun/Kasane to follow. They hand over the vehicle, meet travellers where it helps, and are the backup if something goes wrong.

**Commercials (internal):** the brief and first route sketch are free. A **planning fee of US$250 per trip** applies once the traveller wants the full road book and the lodges held, credited in full against the booking. This is a placeholder, D-01. Revenue otherwise comes from lodge margin, vehicle commission and DMC referral share. **Operators never pay to be listed.** That is permanent.

## 3. Where we drive — launch routes

Three signature routes. Each one can be extended, shortened or joined to another.

| # | Route | Shape | Why it leads |
|---|---|---|---|
| R1 | **Zimbabwe: Victoria Falls → Hwange → Matobo** (and back, or out via Bulawayo) | ~10–12 nights | Home ground, the strongest existing material, few people sell it well |
| R2 | **Namibia: Windhoek → Kalahari → Sossusvlei → Swakopmund → Damaraland → Etosha → Windhoek** | ~14–16 nights | The commercial engine: the most mature lodge-based self-drive country and the most search demand |
| R3 | **The four corners: Victoria Falls → Chobe (Kasane) → Zambezi Region / Caprivi → (optional Okavango panhandle) → Victoria Falls** | ~8–10 nights | Short, rich in wildlife, an easy add-on to the Falls |

Botswana's parks are camping country for self-drivers. It appears as set pieces at the edges (the Makgadikgadi, a fly-in Okavango segment from Maun), not as a core route. South Africa comes later.

**Route variants** (phase 2 pages can mention them): R1 + R3 joined ("Falls, both ways"); R2 + a northern extension to the Zambezi Region and Victoria Falls ("Windhoek to the Falls") — the long one.

## 4. What earns a place in the collection

A place must:

1. **Be reachable by road,** or have a secure park-and-transfer arrangement. Fly-in-only places don't qualify unless used as a deliberate "hand over the keys" set piece.
2. **Offer something only it offers:** a hide, a walking guide, rhino tracking, community ownership, a sleep-out, a landscape.
3. **Have guided activities available,** so self-drivers aren't limited to driving themselves around the park.
4. **Be honest value.** The target band is roughly **US$150–600 per person per night**. Higher is allowed when the place is clearly worth it, and we say so.
5. **Pass the friend test:** we'd send a friend there.

A new type of listing: **On the road**. Stopovers rather than destinations — a farm stay that breaks a long drive, a bakery in the middle of nowhere, the overnight before a border. They make the drive part of the safari.

**Target:** about 12–15 places per route at launch.

## 5. Accuracy rules (non-negotiable)

- Every fact about a lodge or road (location, access, road surface, rates, ownership, activities) carries a **source URL** in the research files. If a fact can't be sourced, say *unverified*, never guess.
- Rates are **indicative**, with a year, always labelled "from", and never quoted as a promise.
- Drive times are given as a range, with the road surface named.
- Don't name a specific DMC partner, rental company or person. Use "our partners in Victoria Falls" and so on until Dom confirms a name (D-03).
- Lodge photographs: never hotlink or copy third-party images into the site. Use existing site images, or leave an image placeholder logged in DECISIONS.md.
- No claim that a lodge is "partnered with", "endorsed by" or "exclusive to" us.

## 6. Voice

`handoff/BRAND_VOICE.md` still governs, including the twelve unforgivables (no *transformative*, no *life-changing*, no *journey of a lifetime*, no exclamation marks, sentence case). Changes for the relaunch:

- **Principle 5** becomes: *we earn from the trips we book, never from who we list.*
- New vocabulary: **self-drive** (hyphenated), **the road book**, **on the road**, **routes**, **partners on the ground**.
- Don't use *overland* to describe the trip in body copy; it draws overland-truck travellers. It stays in the name.
- *From Victoria Falls* returns as a working hub, not a personal home base.
- Ad copy for the US may test *road trip*; for the UK, *self-drive holiday*.

## 7. Information architecture after relaunch

- **Header:** Routes · The collection · Southern Africa · Field Notes · By hand · About. (Sign in and Register come out of the header.)
- **New routes:** `/routes` (index), `/routes/[slug]` (R1–R3), `/self-drive/[country]` (ad landing pages: zimbabwe, namibia, botswana-zambia).
- **Collection:** `/categories` stays the URL, labelled "The collection". The new lodges launch as **static data** (`lib/relaunch/`), not database rows. Nothing touches the live database before Dom approves. A SQL import file is prepared for later.
- **Atlas:** `/destinations/*` for East, West and North Africa redirect to `/destinations/southern-africa`.
- **Field Notes:** new self-drive planning guides. The off-region notes get unlinked now and dealt with after launch (D-07).

## 8. Working rules for the team

- Branch: `feat/self-drive-relaunch` in this worktree. **No pushes, no PRs, no merges, no remote database writes, no Vercel changes.** Dom reviews locally first.
- Stay inside your assigned files and folders (each brief lists them). If you need a change outside them, write it in your report; don't make it.
- Placeholders in user-facing copy use a short visible marker such as `[Partner name]`, plus a `D-xx` entry in DECISIONS.md, added by the chief of staff from your report. Agents report decisions needed; they don't edit DECISIONS.md.
- Research output goes to `handoff/relaunch/research/`. Marketing goes to `handoff/relaunch/marketing/`. Copy goes to `handoff/relaunch/copy/`.
