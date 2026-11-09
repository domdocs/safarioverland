# Lodge photo request — email template and tracker

**Owner:** head of marketing (relaunch team), for Niels to send. **Date:** 2026-11-09.
**Why:** Dom agreed we should ask each lodge on the three routes for permission to use their photographs (D-56). Until a lodge says yes, its stay card shows "Photograph to come" or a licensed place photo, and we never copy or hotlink its images (STRATEGY §5).

**Voice:** operator outreach (`BRAND_VOICE.md`): more personal, slightly warmer than the site. First names. Signed by Niels. Sentence case, no exclamation marks.

**Order of sending:** R1 Zimbabwe first (social post 13 on Wednesday 2 December needs an R1 lodge image), then R2 Namibia (post 18 on Wednesday 9 December), then R3 four corners.

---

## 1. The email

**From:** Niels van de Meer
**Reply-to:** [Reply-to inbox — Dom to confirm; the same monitored inbox as the launch email]
**Subject:** Your photographs on Safari Overland — a request

> Hello {{first_name}} *[fallback: Hello,]*
>
> I'm Niels, the editor of Safari Overland. We plan self-drive journeys through southern Africa, and each night of a route ends somewhere we'd send a friend. {{lodge_name}} is one of those places: it's on our {{route_name}} route, because {{one_line_reason}}.
>
> I'm writing to ask whether we may use some of your photographs on our website and on our social accounts (Instagram @safari_overland, and my LinkedIn), credited to you.
>
> A few things you should know first:
>
> - **You'll never pay to be listed.** No lodge pays to be in our collection, and none ever will. We earn from the trips we book, never from who we list. Saying yes or no to this makes no difference to whether you're on the route.
> - **Permission is free, and you can take it back.** If you change your mind, tell me and we'll take the images down within five working days.
> - **We'll keep them as you made them.** We'll crop and resize to fit the page, but we won't alter, filter or combine them. We'll host the files ourselves, and we won't suggest you endorse or partner with us.
>
> If you're happy to go ahead, it would help to know:
>
> 1. **How you'd like to be credited** — for example "Photo: {{lodge_name}}", or a photographer's name.
> 2. **Which images to use**, or a link to your media library, and any you'd rather we didn't use.
> 3. **That you hold the rights** to let us use them this way, including the photographer's permission, and consent from anyone recognisable in them.
>
> A short reply covering those three is plenty. And if you'd rather not, that's fine too: just say so, and we'll keep using our own photographs.
>
> Thank you, either way.
>
> Niels van de Meer
> Editor, Safari Overland
> safarioverland.com

**For an operator group** (Gondwana, Wilderness, Namibia Wildlife Resorts and others in §3), send one email covering all their properties on our routes. Replace the first paragraph's second sentence with: *"{{property_list}} are on our routes, each for its own reason: {{one_line_reasons}}."*

**Merge fields:** `{{first_name}}`, `{{lodge_name}}`, `{{route_name}}` (Zimbabwe, from Victoria Falls / Namibia, the Kalahari to Etosha / The four corners), `{{one_line_reason}}` (from `why_we_list_it` in the route data, rewritten as one clause, in Niels's words).

**Rules for whoever sends it:**

- Don't change the three bullets. "Never pay to be listed" and "free and revocable" are the point of the email.
- Don't promise traffic, bookings or features in return.
- Don't mention a commission, rates or contracts in this email. Commercial conversations are separate.
- Never send it to Linkwasha or Somalisa (retired, D-44).

### Follow-up (once, after ten days, then stop)

**Subject:** Re: Your photographs on Safari Overland — a request

> Hello {{first_name}},
>
> A gentle follow-up on my note about your photographs. No pressure at all; {{lodge_name}} stays on our route either way. If it's easier, a link to your media library and a credit line is all we need.
>
> Niels

---

## 2. Status key

| Status | Meaning |
|---|---|
| Not sent | — |
| Sent | First email sent; date recorded |
| Followed up | One follow-up sent; no more after this |
| Granted | Yes, with credit line and rights confirmed. Images may be used |
| Granted, with limits | Yes, but with images to avoid or other conditions (note them) |
| Declined | No. Keep using our own or licensed place photos |
| No reply | No answer 10 days after the follow-up. Treat as declined |
| Withdrawn | They took permission back. Remove images within five working days |

**Only "Granted" or "Granted, with limits" with all three answers (credit, images, rights) means an image can go live.**

---

## 3. Tracker — every stay on the three routes

From `lib/relaunch/data/*.json` (9 November 2026). Linkwasha and Somalisa are retired and not listed. Victoria Falls Safari Lodge and Ilala Lodge Hotel are on two routes; ask once.

Routes: **R1** Zimbabwe, from Victoria Falls · **R2** Namibia, the Kalahari to Etosha · **R3** the four corners.
"Operator" is from the research files; *unverified* where they say so. Check before addressing the email.

### R1 — Zimbabwe

| # | Stay | Route | Type | Operator (research) | Contact | Date sent | Status | Credit line / notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Victoria Falls Safari Lodge | R1, R3 | Lodge | Victoria Falls Safari Collection (parent unverified) | | | Not sent | |
| 2 | Ilala Lodge Hotel | R1, R3 | Lodge | Unverified | | | Not sent | |
| 3 | The Elephant Camp | R1 | Camp | Wild Horizons | | | Not sent | |
| 4 | Ivory Lodge | R1 | Lodge | Amalinda Collection | | | Not sent | One email with Amalinda Lodge |
| 5 | Hwange Safari Lodge | R1 | On the road | Unverified | | | Not sent | |
| 6 | The Hide | R1 | Camp | Family-owned | | | Not sent | |
| 7 | Davison's Camp | R1 | Camp | Wilderness | | | Not sent | One email with Kulala and Damaraland Camp. Ask for Davison's images only, not Linkwasha (same concession, retired) |
| 8 | Camelthorn Lodge | R1 | Lodge | Imvelo Safari Lodges | | | Not sent | |
| 9 | The Bulawayo Club | R1 | On the road | Unverified | | | Not sent | |
| 10 | Travellers' Guest House | R1 | On the road | Unverified | | | Not sent | |
| 11 | Amalinda Lodge | R1 | Lodge | Amalinda Collection | | | Not sent | One email with Ivory Lodge |
| 12 | Big Cave Camp | R1 | Camp | Owner-run | | | Not sent | |
| 13 | Farmhouse Lodge | R1 | Lodge | Owner-run | | | Not sent | |

### R2 — Namibia

| # | Stay | Route | Type | Operator (research) | Contact | Date sent | Status | Credit line / notes |
|---|---|---|---|---|---|---|---|---|
| 14 | Bagatelle Kalahari Game Ranch | R2 | Lodge | Owner-run | | | Not sent | |
| 15 | Kalahari Anib Lodge | R2 | Lodge | Gondwana Collection | | | Not sent | Gondwana: one email for seven properties |
| 16 | Sossus Dune Lodge | R2 | Lodge | Namibia Wildlife Resorts (NWR) | | | Not sent | NWR: one email for three properties |
| 17 | Kulala Desert Lodge | R2 | Lodge | Wilderness | | | Not sent | Wilderness email |
| 18 | The Delight Swakopmund | R2 | On the road | Gondwana Collection | | | Not sent | Gondwana email |
| 19 | Strand Hotel Swakopmund | R2 | On the road | Unverified | | | Not sent | |
| 20 | Camp Kipwe | R2 | Camp | Unverified | | | Not sent | |
| 21 | Damaraland Camp | R2 | Camp | Wilderness, with the Torra Conservancy | | | Not sent | Wilderness email. Ask whether the conservancy should be credited too |
| 22 | Grootberg Lodge | R2 | Lodge | ≠Khoadi-//Hôas Conservancy; managed by Journeys Namibia | | | Not sent | Ask whether the conservancy should be credited too |
| 23 | Palmwag Lodge | R2 | Lodge | Gondwana Collection | | | Not sent | Gondwana email |
| 24 | Okaukuejo | R2 | Camp | Namibia Wildlife Resorts (NWR) | | | Not sent | NWR email |
| 25 | Etosha Safari Lodge | R2 | Lodge | Gondwana Collection | | | Not sent | Gondwana email |
| 26 | Onguma Bush Camp | R2 | Camp | Onguma Safari Camps | | | Not sent | |
| 27 | Namutoni | R2 | Camp | Namibia Wildlife Resorts (NWR) | | | Not sent | NWR email |
| 28 | Okonjima Plains Camp | R2 | Lodge | Okonjima | | | Not sent | One email with Luxury Bush Camp |
| 29 | Okonjima Luxury Bush Camp | R2 | Camp | Okonjima | | | Not sent | One email with Plains Camp |

### R3 — The four corners

| # | Stay | Route | Type | Operator (research) | Contact | Date sent | Status | Credit line / notes |
|---|---|---|---|---|---|---|---|---|
| — | Victoria Falls Safari Lodge | R3 | Lodge | See #1 | | | | Asked under R1 |
| — | Ilala Lodge Hotel | R3 | Lodge | See #2 | | | | Asked under R1 |
| 30 | Muchenje Safari Lodge | R3 | Lodge | Unverified | | | Not sent | |
| 31 | Chobe Safari Lodge | R3 | Lodge | Unverified (website groups it with Nata Lodge) | | | Not sent | |
| 32 | Chobe Game Lodge | R3 | Lodge | Desert & Delta Safaris | | | Not sent | |
| 33 | Nambwa Tented Lodge | R3 | Camp | African Monarch Journeys (marketing) | | | Not sent | |
| 34 | Namushasha River Lodge | R3 | Lodge | Gondwana Collection | | | Not sent | Gondwana email |
| 35 | Nkasa Lupala Tented Lodge | R3 | Camp | Wild Waters Lodges; joint venture with the Wuparo Conservancy | | | Not sent | Ask whether the conservancy should be credited too |
| 36 | Nunda River Lodge | R3 | Lodge | Unverified | | | Not sent | |
| 37 | Divava Okavango Lodge & Spa | R3 | Lodge | Unverified (name varies: "Lodge & Spa" / "Resort & Spa") | | | Not sent | |
| 38 | Chobe River Camp | R3 | On the road | Gondwana Collection | | | Not sent | Gondwana email |
| 39 | Zambezi Mubala Lodge | R3 | On the road | Gondwana Collection | | | Not sent | Gondwana email |
| 40 | Tongabezi Lodge | R3 | Lodge | Green Safaris | | | Not sent | |
| 41 | Waterberry Zambezi Lodge | R3 | Lodge | Independent (unverified) | | | Not sent | |

### On-the-road stops (places, not single stays)

These are in the route data as stops, not nights at one business. No permission email unless we want a specific business's photographs; otherwise use Dom's own photographs or licensed place photos.

| Stop | Route | Note |
|---|---|---|
| Solitaire | R2 | Lunch and fuel stop. Bakery operator unverified; don't name or ask until checked |
| Spitzkoppe | R2 | Spitzkoppe Community Rest Camp, run for the community. Ask the community camp before using any of its photographs |
| Uis | R2 | Former mining town. Place photos only |

### Operator groups — one email each

| Group (research) | Properties on our routes |
|---|---|
| Gondwana Collection | Kalahari Anib Lodge, The Delight Swakopmund, Palmwag Lodge, Etosha Safari Lodge, Namushasha River Lodge, Chobe River Camp, Zambezi Mubala Lodge |
| Wilderness | Davison's Camp, Kulala Desert Lodge, Damaraland Camp |
| Namibia Wildlife Resorts (state-run) | Sossus Dune Lodge, Okaukuejo, Namutoni |
| Amalinda Collection | Ivory Lodge, Amalinda Lodge |
| Okonjima | Okonjima Plains Camp, Okonjima Luxury Bush Camp |

That's 41 stays, and about 31 emails once groups are combined.

---

## Open for Dom

1. **Reply-to inbox** for these emails (the same open item as the launch email, D-35).
2. **Contacts:** fill in the Contact column. If you already know people at a lodge, Niels should write to them by name rather than to a general address.
3. **Takedown promise:** "within five working days" is my suggestion. Change it if you'd rather say something else, but keep a number.
