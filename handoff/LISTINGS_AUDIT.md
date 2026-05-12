# Listings curation playbook

Curating safarioverland.com from a directory-of-many to a small
collection of properties we know personally.

We are not running a scoring rubric. The cull is editorial judgement,
country by country. The work is:

1. Decide: keep this listing or remove it.
2. For the ones we keep, enrich the database row with the editorial
   fields the new listing template surfaces (verdict, signature
   experience, conservation, community, wellness, founder note,
   traveller quotes, external ratings, gallery, coordinates, best
   time to visit).
3. The front end takes care of the rest.

---

## Where we start

Victoria Falls and the corridor we work from. Then outward — Hwange,
Lower Zambezi, South Luangwa, the Okavango, the Cape, Sabi Sands,
the Mara, Serengeti. One country / one region at a time. We are not
in a rush.

The current `directory_listings` table holds 24 seed rows imported
from `public/directory_listings_rows.csv`. Most of them are 4×4
rentals and booking agents — not the lodges and operators the new
positioning is built around. Expect more cuts than keeps in the first
pass; the seed was directory-era.

---

## Workflow

### 1. Filter to one country at a time

In the admin (`/admin/listings`), filter by country. Start with
Zimbabwe. Work through every row.

### 2. For each row, decide keep or cull

The decision is editorial. Some questions that help:

- Have we stayed there or visited it on a recce?
- Do we know the operator, by name or by reputation, well enough to
  send a friend?
- Does it sit in a place we cover (hyperlocal first; widening)?
- Does it embody the kind of trip we're now writing about — slower
  pace, immersion, conservation work, intentional design — or is it
  in the mass-market lane?

If yes-ish across the board, keep. If no, cull. There's no third
option for now.

**To cull**: in the edit form, set `status = 'rejected'`. We don't
delete rows — we keep the history. Rejected rows fall out of the
public site automatically (the `getListings` data layer filters on
`status = 'approved'` by default).

**To keep**: leave `status = 'approved'`. If it's home-page rotation
worthy, also tick `featured`.

### 3. For the ones we keep, enrich the row

This is where the editorial layer gets attached. Open the listing
edit form (`/admin/listings/edit/[id]`) and fill in as many of the
editorial fields as you can. None are required, but the more you fill
the richer the listing detail page renders.

| Field | What it is | Where it surfaces |
|---|---|---|
| `verdict` | One sentence. The "we'd send this here" line. | Top of listing detail page, italic. |
| `signature_experience` | One paragraph. The single thing that makes this stay distinctive. | Listing detail body. |
| `conservation_summary` | Editorial paragraph (~200 chars) on what they do. | Listing detail conservation block. |
| `community_summary` | Same shape, community side. | Listing detail community block. |
| `wellness_offerings` | Array — yoga, spa, sound bath, gym, calisthenics, silent walks. | Listing detail wellness block. |
| `activities` | Array — walking safari, mokoro, night drive, balloon, sleep-out. | Listing detail activities block. |
| `founder_name`, `founder_note`, `founder_image_url` | Owner story. Italic blockquote with attribution. | Listing detail "from the founder" pull-quote. |
| `traveller_quotes` | Array of `{quote, attributed_to, trip_year}`. | Listing detail pull-quote rail. |
| `external_ratings` | Array of `{source, rating, max, count, url, fetched_at}`. | Small mono-style block on the listing detail. |
| `gallery_urls` | Additional photography (operator-supplied). | Gallery on listing detail. |
| `max_guests` | Integer. Useful for editorial framing. | Mono-style fact in the meta column. |
| `best_time_to_visit` | Free text or short prose. | Practical sidebar. |
| `price_tier` | budget / mid / luxury / exclusive. | A cleaner version of the existing `price_info` text. |
| `latitude` / `longitude` | Numeric coords. | Small map module. |
| `field_notes_slugs` | Slugs of articles that mention this stay. | "Read more in our notes from …" block. |
| `editor_notes` | Free text — internal only. | Not shown publicly. |

### 4. Source the supporting material

Most of the editorial fields rely on operator-supplied or
externally-gathered content. For each kept listing, the gathering
work is:

- **Verdict**: write yourself. One sentence in the brand voice.
- **Signature experience, conservation, community summaries**: ideally
  written by us after a stay or a thorough call. Failing that, lift
  cleanly from the operator's own materials and tighten.
- **Wellness offerings, activities**: read the operator's site. Tick
  off what's actually on the ground.
- **Founder story**: ask. Most operators will give you 50–500 words on
  request.
- **Traveller quotes**: ask the operator for permission to pull two or
  three from their guest book or testimonials page. Always with
  attribution and year.
- **External ratings**: TripAdvisor, Google Maps, Booking.com. Note
  the rating, the count of reviews, the URL, and the date you
  fetched it. Re-check quarterly.
- **Gallery**: ask the operator for two or three high-resolution
  photos (~3000px wide) that we have permission to use.
- **Coordinates**: Google Maps right-click → copy lat/long. 6 decimal
  places is fine.
- **Best time to visit**: short prose. *Late June to October —
  walking-safari season; the river runs high, the bush thins out.*
- **Field Notes links**: as we write articles featuring the property,
  add the article slug here.

### 5. Move on

When the country is done — every row reviewed, kept rows enriched,
culled rows marked `status='rejected'` — pick the next country.

---

## Outreach templates

Three short emails for the operators. Adapt names and signatures.

### Template A — featured (we're keeping it, here's what we'd love)

Subject: **A short note from Safari Overland**

> Dear [name],
>
> We are repositioning safarioverland.com as a small, opinionated
> collection of African lodges and operators — chosen for what the
> wild does to you, not just what it shows you. Fewer names than
> before, but each one written up properly.
>
> [Lodge name] is staying. We'd like to feature it on our home page
> rotation, in our planning briefs, and in our Field Notes coverage.
>
> Three small asks, only when convenient:
>
> 1. Two or three high-resolution photographs (~3000px wide) we can
>    use across the site. Anything atmospheric — guests interacting
>    with the bush, the camp at last light, the textures and details.
> 2. Fifty words from you or your founder on what makes a stay at
>    [lodge] different. Written as you'd say it, not as marketing.
> 3. Permission to pull two or three traveller quotes from your guest
>    book / testimonials page, with attribution.
>
> No commitments either way; we'll keep the listing live with what we
> have. But if you have time, the better the source material, the
> better the page reads.
>
> With thanks,
> Niels van de Meer
> Safari Overland · Victoria Falls
> niels@safarioverland.com

### Template B — kept but not featured (no news, kept)

> Dear [name],
>
> A short update. Safari Overland is becoming a more deliberately
> curated collection of African lodges and operators. [Lodge name]
> continues to be listed in the directory and is findable through
> the categories pages. We are not going to lead with it — that
> space is for a small handful of properties this season — but it
> remains in the collection in good standing.
>
> If anything material changes at [lodge] over the next year
> (significant conservation work, new wellness programming, a
> change of ownership) please let us know; we'd be glad to
> reconsider for the featured collection.
>
> With thanks,
> Niels van de Meer
> Safari Overland · Victoria Falls
> niels@safarioverland.com

### Template C — culled (politely)

> Dear [name],
>
> A short, candid note. Safari Overland is repositioning as a small
> collection of African lodges and operators chosen for the depth of
> the experience they offer — slower pace, conservation work,
> community involvement, intentional design.
>
> After review, we are removing [lodge name] from the directory at
> this stage. This is not a judgement of your work; it is a
> judgement about editorial fit. We do not want to give the
> impression that everything we list is what we'd recommend, when
> the bar we're now setting is a particular kind of trip.
>
> If [lodge] takes its work in a direction that fits later, we would
> be glad to reconsider. For now, our records will be updated
> accordingly.
>
> With thanks for the working relationship,
> Niels van de Meer
> Safari Overland · Victoria Falls
> niels@safarioverland.com

---

## A few asides

**On photos.** The single biggest lever for how a listing detail page
feels is operator photography. A kept listing without good photography
falls back to the gold-icon block — clean, but cold. Push featured
operators for two or three strong shots; everyone else, work with
what you can get.

**On rejected rows.** Be patient and gracious with the cull-emails.
The directory was making them money before; some won't take it well.
Template C does its best to soften the blow without bullshit. Don't
argue.

**On widening the circle.** Once Vic Falls + Hwange + the Zambezi
corridor are properly curated, move outward. Lower Zambezi, then
South Luangwa, then Linyanti, then Okavango, then Kruger, then Sabi
Sands, then the Mara, then Serengeti. One region at a time. We're
not in a rush.

---

## Questions that come up

Write them at the bottom of this doc as you hit them. Editorial
calls we should make collectively rather than individually:
threshold for rejection, treatment of operators we have a personal
relationship with, what to do when an operator stops responding, etc.
