# Listings audit — staff playbook

A delegable workflow for curating safarioverland.com from a directory of
many to a small collection of right.

---

## Why we're doing this

The site is repositioning from "directory of African safari operators" to
"small, opinionated collection." The voice on the homepage now says, *we
list the lodges and operators we'd send our friends to. Each one earns a
place by the depth of the experience it offers — not by paying for one.*
The listings need to back that claim up.

We are starting hyperlocal — Victoria Falls and the lodges/operators
within reach of our home — and widening outward. The goal is **20–40
properties for soft launch**, not 200.

---

## The rubric

Score every existing listing on six criteria. Total out of 50.

| # | Criterion | What we're scoring | Range |
|---|---|---|---|
| 1 | **Conservation depth** | Documented, named conservation programmes — anti-poaching units, habitat management, science partnerships, lease payments to conservancies. Not "we love wildlife" boilerplate; verifiable, on-the-ground work. | 0–10 |
| 2 | **Community involvement** | Local employment percentage, community-owned land arrangements, named community projects, education or healthcare programmes funded by tourism revenue. Operators who hire and source locally score high. | 0–10 |
| 3 | **Guest density** | Fewer guests = more transformative experience. <16 rooms = 10 pts. 16–32 = 5 pts. >32 = 0 pts. Camps with multiple "branded" satellite properties at the same address count cumulatively. | 0–10 |
| 4 | **Pace & immersion** | Walking safaris, multi-day stays as default, no-Wi-Fi or low-tech options, slow itineraries, sleep-outs, sundowner-only-on-foot, mokoro days. Anything that signals slow, intentional time outdoors. | 0–10 |
| 5 | **Wellness & restoration** | Yoga, spa, sound baths, gym, calisthenics, intentional design (light, sound, materials), guided silence, structured time-without-screens. | 0–5 |
| 6 | **Editorial presence** | Has an existing Field Notes feature, a notable founder story, a signature experience worth writing about (e.g., a particular guide, a particular ritual, a unique habitat access). | 0–5 |

**Score interpretation**

| Score | Bucket | Action |
|---|---|---|
| 35–50 | **Featured** | Earns the curated collection. Full editorial write-up, home-page rotation eligibility, founder note + traveller quote requested. |
| 25–34 | **Listed** | Present in `/categories` and `/listings/[id]`, but not promoted on home or in Field Notes. |
| 15–24 | **Borderline** | Manual editor review needed. Default to listed unless something specific disqualifies. |
| 0–14 | **Removed** | Politely email and remove. See template below. |

---

## Workflow

### Week 1 — score every existing listing

Open each existing listing on safarioverland.com (or in the Supabase
`directory_listings` table) and fill in the scoring sheet (template
below). Aim for ~20 listings per day. Don't agonise — first-pass scores
are fine.

**Inputs to use**: the operator's own website, any photography you can
find, TripAdvisor / Booking.com / Google reviews (read for tone, not
star count), the current listing copy itself, any past correspondence we
have with the operator.

**When in doubt**: ask. Editorial judgment is the point. The score is
just a shortlist machine.

### Week 2 — manual editorial pass on top scorers

Take the 35+ scorers and read each listing personally. The score will
get you 60% of the right answer; the remaining 40% is feel.

For each top scorer, decide:
- Does this place "feel right"?
- Does the language of the brand voice fit?
- Would I send a discerning friend?
- Is the photography we have for them strong enough for the editorial template, or do we need to ask for more?

Collect a list of asks per featured operator: stronger photography (2–3
hero-quality shots), a 50-word founder's note, optional traveller quote
with attribution.

### Week 3 — outreach

Three template emails below. Send each at the right moment.

### Week 4 — bring it into the data

For featured listings, capture the new fields (see "Database fields" below).

---

## Scoring sheet — template

A Google Sheet or Notion database with these columns:

```
listing_id          (Supabase UUID)
listing_name        (string)
location            (string, free text — Vic Falls, Mara, Okavango etc)
country             (string)
website             (URL)
category            (lodges | campsites | guided-tours | …)
score_conservation  (0-10)
score_community     (0-10)
score_density       (0-10)
score_pace          (0-10)
score_wellness      (0-5)
score_editorial     (0-5)
total_score         (computed sum, 0-50)
bucket              (featured | listed | borderline | removed)
notes               (free text — anything the score doesn't capture)
photo_quality       (good | needs-work | none)
follow_ups          (free text — what we're going to ask the operator for)
audited_by          (initials)
audited_on          (date)
```

If you'd rather work in Supabase: add the matching columns to the
`directory_listings` table and update via the admin UI.

---

## Outreach templates

### Template A — featured (good news)

Subject: **A short note from Safari Overland**

> Dear [name],
>
> We are repositioning safarioverland.com as a small, opinionated
> collection of African lodges and operators — chosen for what the
> wild does to you, not just what it shows you. Fewer names than
> before, but each one written up properly.
>
> [Lodge name] is in. We'd like to feature it on the home page rotation,
> in our planning briefs, and in our Field Notes coverage.
>
> Two small asks, and only when convenient:
>
> 1. Two or three high-resolution photographs (~3000px wide) we can
>    use across the site. Anything atmospheric — guests interacting
>    with the bush, not posed property shots.
> 2. A short note from you — fifty words or so — on what makes a
>    stay at [lodge] different. Written as you'd say it, not as
>    marketing.
>
> No commitments either way; we'll keep the listing live with what we
> have. But if you have time, the better the source material, the
> better the page reads.
>
> With thanks,
> [your name]
> Safari Overland · Victoria Falls

### Template B — listed (no news, kept)

> Dear [name],
>
> A short update. Safari Overland is becoming a smaller, more
> deliberately curated collection of African lodges and operators.
> [Lodge name] continues to be listed in the directory and is
> findable through the categories pages. We are not going to lead
> with it — that space is for a small handful of properties this
> season — but it remains in the collection in good standing.
>
> If anything material changes at [lodge] over the next year
> (significant conservation work, new wellness programming, a
> change of ownership) please let us know; we'd be glad to
> reconsider for the featured collection.
>
> With thanks,
> [your name]
> Safari Overland

### Template C — removed (politely)

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
> [your name]
> Safari Overland

---

## Database fields to add

When the audit is done and we have a featured set, the schema needs
these additions on `directory_listings`. (This is engineering work —
flag it, don't try to do it yourself.)

```
curation_score        int           -- from the rubric
featured_collection   boolean       -- true = on home rotation
max_guests            int           -- for guest-density signal
signature_experience  text          -- one thing that makes this stay distinctive
conservation_summary  text          -- ~200 chars, editorial-ready
community_summary     text          -- ~200 chars, editorial-ready
wellness_offerings    text[]        -- ['yoga', 'spa', 'sound bath', …]
founder_note          text          -- operator-supplied, ~500 chars
field_notes_links     text[]        -- slugs of articles featuring this stay
traveller_quotes      jsonb         -- [{quote, attributed_to, trip_year}]
```

Plus consider new tables for `traveller_stories` and
`signature_experiences` if scope grows.

---

## A few asides

**On removed operators.** Be patient and gracious. The directory was
making them money before; some won't take it well. Template C does
its best to soften the blow without bullshit. Don't argue.

**On photos.** The single biggest lever for how the site feels is
operator photography. A featured listing without good photography
falls back to the icon-only template — clean, but cold. Push featured
operators for two or three strong shots; everyone else, work with what
they give you.

**On the score.** It's a tool, not a verdict. You will sometimes score
a place at 32 and feel certain it should be featured. Trust the feel —
the score is to triage, not decide. Note it in the audit sheet so we
can refine the rubric later.

**On widening the circle.** Once Vic Falls + Hwange + the Zambezi
corridor are properly curated, we move outward: Lower Zambezi → South
Luangwa → Linyanti → Okavango → Kruger → Sabi Sands → Mara → Serengeti.
One region at a time. We're not in a rush.

---

## Questions

When you hit them, write them down here in the doc. We'll work through
them together.
