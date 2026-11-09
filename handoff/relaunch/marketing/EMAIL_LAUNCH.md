# Email — relaunch announcement and brief nurture sequence

**Owner:** head of marketing (relaunch team). **Date:** 2026-11-09.
**Status:** draft copy for Dom. Nothing has been sent, scheduled or set up in any email tool.

**Voice rules for email** (`BRAND_VOICE.md`, operator outreach / emails row): more personal, slightly warmer than the site. Use first names. Sign with a real person: **Niels**. Everything else holds: sentence case, no exclamation marks, none of the twelve unforgivables, *self-drive* hyphenated, no *overland* in the copy.

**Merge fields** are shown as `{{first_name}}`. If a first name isn't held, the greeting falls back to "Hello,".

**Every email carries** an unsubscribe link and a postal address in the footer (CAN-SPAM requires a valid physical postal address for the US; Safari Overland is a Delaware LLC, so use the registered or business address — [Postal address — Dom to confirm]).

---

## 1. Announcement — to the existing dispatch list

**Audience:** current newsletter (dispatch) subscribers. They signed up for Field Notes and the collection, so this is a change of subject for them and should say so honestly.
**Send:** the Tuesday or Wednesday after the relaunch is live on production, 13:00 UK time (08:00 US Eastern).
**From:** Niels van de Meer, Safari Overland
**Reply-to:** a monitored inbox [Reply-to address — Dom to confirm]

**Subject line options** (test the first two if the tool allows a split):

1. A change, and three routes
2. We now plan self-drive journeys
3. Your own car, and a proper bed

**Preview text:** Southern Africa, by road, with a camp or lodge at the end of each day.

---

> Hello {{first_name}},
>
> You signed up to hear from us about the collection and Field Notes. Something has changed, and I'd rather tell you directly.
>
> Safari Overland now plans and books self-drive journeys through southern Africa. You drive yourself, and each night ends at a camp or lodge from the collection — somewhere with a guide who can read a track, a hide at a waterhole, or a view worth the road. Not a rooftop tent.
>
> We do three things:
>
> **01 — We draw the route.** Drive times, road surfaces, fuel, borders and park gate times, in a road book. In print, and offline on your phone.
>
> **02 — We book every night, and the vehicle.** Places chosen for what they give you at the end of a day's drive, and a vehicle suited to the roads.
>
> **03 — We're at the end of the phone.** Someone to call while you're on the road, and partners on the ground in Victoria Falls.
>
> There are three routes to start:
>
> - **Zimbabwe, from Victoria Falls** — Hwange's waterholes and the Matobo hills. About ten to twelve nights.
> - **Namibia** — the Kalahari, Sossusvlei, the coast, Damaraland and Etosha. Fourteen to sixteen nights.
> - **The four corners** — Victoria Falls, the Chobe riverfront and Namibia's Zambezi Region. Eight to ten nights.
>
> [See the routes →](https://safarioverland.com/routes?utm_source=dispatch&utm_medium=email&utm_campaign=relaunch)
>
> One thing hasn't changed: no lodge pays to be in the collection. We earn from the trips we book, never from who we list.
>
> If you've been thinking about southern Africa, send us a brief. Tell us the months, and how long you're happy at the wheel in a day. We'll come back with three routes within 48 hours, and the brief costs nothing.
>
> [Send a brief →](https://safarioverland.com/plan?utm_source=dispatch&utm_medium=email&utm_campaign=relaunch)
>
> Field Notes carry on. You'll still hear from us when there's something worth reading, now mostly about the road.
>
> From Victoria Falls,
>
> Niels
> Editor, Safari Overland
>
> *If self-drive isn't for you, you can unsubscribe below. No hard feelings.*

---

**Footer:** Safari Overland · [Postal address] · [Unsubscribe] · [Privacy policy]

**Notes:**

- Line 03 depends on D-04 (support line). If it isn't confirmed, use: "**We're there if something goes wrong.** Partners on the ground in Victoria Falls who hand over the vehicle and stay in touch while you travel."
- Route lengths match STRATEGY §3. Keep them in step with the route pages.
- No price, and no planning fee (D-01 is not published).
- Measure: clicks to `/routes` and `/plan` by UTM; `brief-submitted` in the week after the send; unsubscribe rate. An unsubscribe spike is expected and fine. It's the list re-sorting itself.

---

## 2. Nurture sequence — brief submitted, no booking

### Who gets it

People who submitted a brief on `/plan` **and** have received their three routes from a planner **and** haven't booked a planner call or replied within **5 days** of the routes being sent.

### Who doesn't

- Anyone who has booked a call (`calendly-booking-completed`), replied to the planner, or booked.
- Anyone who has asked not to be contacted.
- Anyone whose brief is being handled actively by a planner. **The planner's personal emails always come first. This sequence must never arrive in the middle of a live conversation.** Exit anyone from the sequence the moment they reply or book.

### Timing

| Email | Sent | Purpose |
|---|---|---|
| N1 | Day 5 after routes sent | Answer the doubts that usually stop people (the practicalities) |
| N2 | Day 12 | Show what they'd get (the road book, the partners on the ground) |
| N3 | Day 26 | Honest timing, then close the loop and ask whether to keep their routes on file |

Three emails, then stop. If they don't answer N3, they go to the ordinary dispatch list only if they ticked the newsletter box. Otherwise, nothing more.

**Sender for all three:** Niels, or the planner who handled the brief if the tool allows a per-brief sender. Replies go to a monitored inbox, never a no-reply address.

**Merge fields used:** `{{first_name}}`, `{{route_name}}` (the route their sketch was based on, e.g. "Zimbabwe, from Victoria Falls"), `{{travel_month}}` (from the brief, if given). Each email has a fallback line for when a field is empty, shown in brackets.

---

### N1 — Day 5: the questions people don't always ask

**Subject:** The questions people don't always ask
**Preview:** Roads, the left side, borders and the dark.

> Hello {{first_name}},
>
> I hope the routes we sent for {{route_name}} *[fallback: your trip]* gave you something to think about.
>
> When people go quiet at this point, it's often because of a question they didn't want to ask. So here are the four we hear most, answered plainly.
>
> **The roads.** Mostly tar and good gravel. A 4×4 where it matters, not everywhere. The road book names the surface for each day, and gives drive times as a range rather than a promise.
>
> **Driving on the left.** We can book an automatic gearbox, and you'll need an International Driving Permit alongside your licence. *[Research to confirm per country and nationality before this goes live.]*
>
> **Borders.** We prepare the paperwork, and tell you what to have in your hand at the window. Our partners meet you where it helps.
>
> **The dark.** You don't drive after sunset. Park gate times see to that, and so does the way we plan each day.
>
> If something else is holding you back — the budget, the length of the drives, whether this is the right year — just reply. It comes straight to me, and I'd rather adjust the route than have you book the wrong trip.
>
> Niels
> Editor, Safari Overland

---

### N2 — Day 12: what's in the road book

**Subject:** What the road book looks like
**Preview:** One page a day, and a person at the end of the phone.

> Hello {{first_name}},
>
> A quick look at what you'd travel with, if you go ahead with {{route_name}} *[fallback: one of our routes]*.
>
> **The road book.** One page a day: where you start, where you sleep, the drive time as a range, the road surface named, where to fill up, the border and its hours, the park gate times. And a line or two that isn't strictly practical — the farm stall worth stopping at, the view you'd miss if you were watching the odometer. It comes in print, and offline on your phone, because the best places often have no signal.
>
> [Image: one road book spread — a real route day. Placeholder until the sample exists.]
>
> **The nights.** Each one at a camp or lodge from the collection, chosen for one thing it offers that the others don't. We book them all, and the vehicle.
>
> **The people.** Our partners on the ground in Victoria Falls hand over the vehicle and are there if something goes wrong. And there's someone to call while you're on the road. *[Depends on D-02/D-04, and on route: for Namibia, describe the support arrangement that actually exists.]*
>
> If you'd like to talk it through, a short call is often quicker than email.
>
> [Book a call with a planner →](https://safarioverland.com/plan?utm_source=nurture&utm_medium=email&utm_campaign=n2#planner)
>
> Or reply with whatever you'd change about the route. Shorter, slower, a different country — it's all still open.
>
> Niels

**Note:** the call link needs to open the Calendly modal, which fires `speak-to-planner-click` and `calendly-booking-completed`. The `#planner` anchor is a placeholder; the build team needs to confirm how to deep-link the modal. Today the event's `source` union has no `email` value, so either add one or accept that these calls report as `plan`.

---

### N3 — Day 26: timing, honestly, and a question

**Subject:** Shall we keep your routes on file?
**Preview:** A note on timing, and then I'll leave it with you.

> Hello {{first_name}},
>
> This is my last note about your brief, so I'll be brief.
>
> A word on timing, because it's the thing people tell us they wish they'd known. The camps and lodges on our routes are small, and for the dry months — roughly July to October — the better ones fill well ahead. If you're thinking of {{travel_month}} *[fallback: the dry season]*, it's worth deciding sooner rather than later. If your dates are flexible, the shoulder months can be quieter and easier to book.
>
> That's not a reason to rush. It's just how it works.
>
> If now isn't the time, that's fine. Reply with one word:
>
> - **Keep** — we'll hold your routes on file and you can pick them up whenever you like.
> - **Later** — tell us roughly when, and we'll get in touch then, once.
> - **No** — we'll close the brief and you won't hear from us about it again.
>
> Or, if you're ready, reply and we'll start holding the lodges.
>
> Thank you for thinking of us for this.
>
> Niels
> Editor, Safari Overland

**Notes:**

- The timing paragraph has no numbers on purpose. Industry sources suggest 9–18 months ahead for peak-season southern Africa (`PAID_SEARCH_PLAN.md` §9), but those describe premier camps. Don't put a lead time in an email until our own bookings show one.
- "Reply and we'll start holding the lodges" is the point where the planning fee applies (D-01). The planner explains it in their reply. Don't put it in the email until D-01 is settled and the fee is published on the site.
- "Later" replies need a manual reminder for whoever handles briefs. One follow-up, then stop.

---

## 3. Set-up notes (for whoever builds it)

- **Tool:** the site already sends transactional email through Resend (brief notifications). Whether to run the announcement and sequence there or in a newsletter tool is a decision for Dom. I haven't checked whether Resend's broadcast and automation features cover the triggers and exits above, so treat that as **unverified**.
- **Trigger data:** the sequence needs "routes sent" (date) and "replied / call booked / booked" (exit) on the brief record. Today `brief-submitted` and `calendly-booking-completed` are client-side Vercel events, which can't trigger an email. The trigger has to come from the `briefs` table or the admin, not from analytics.
- **Consent (UK and US):** the dispatch list opted in to a newsletter, so the announcement is fine. The nurture sequence goes to people who sent a brief, not people who subscribed. Under UK PECR, the "soft opt-in" can cover people met "in the course of the sale or negotiations for the sale" of a service, with a clear opt-out in every message. A brief is probably that, but **this is my reading, not legal advice**. Fold it into D-09. The brief form's privacy notice should say that we'll follow up about the brief.
- **Tracking:** UTM-tag every link (`utm_source=dispatch` / `nurture`, `utm_medium=email`, `utm_campaign=relaunch` / `n1` / `n2` / `n3`). Don't add open-tracking pixels without deciding whether that sits with the site's no-cookie, no-PII principle. Recommend click tracking only.
- **Plain text:** send a plain-text version alongside the HTML. These emails should look like a letter from a person, not a campaign. A simple React Email template with the logo small at the top is enough.

---

## Decisions for Dom

1. **Postal address** for the email footer (CAN-SPAM) and the **reply-to inbox**.
2. **Send date** for the announcement: the Tuesday or Wednesday after the relaunch is live on production.
3. **Tool:** Resend (already in use, automation fit unverified) or a newsletter tool for the list and the sequence.
4. **Sender:** Niels for all emails, or the handling planner for the nurture sequence.
5. **Consent position for the nurture sequence** (soft opt-in for brief senders). Add to D-09.
6. **Support line (D-04) and Namibia support wording** in the announcement and N2.
7. **Road book sample image** for N2. It doesn't exist yet. The same asset is needed for social and the landing pages.
8. **Open tracking:** off (recommended, in keeping with the site's privacy stance) or on.
9. **Planning fee (D-01):** when it first appears in email. Recommended: never in the automated sequence; the planner explains it in person.
10. **Analytics source value** for calls booked from email (`SpeakToPlannerSource` has no `email` value). A build-team change to `lib/analytics/events.ts`.
