# Paid search plan — Google Ads, US$500 a month

**Owner:** head of marketing (relaunch team). **Date:** 2026-11-09, revised the same day after Dom's answers.
**Status:** draft for Dom. Nothing here has been set up in Google Ads. No account changes, no tags installed.
**Reads with:** `handoff/relaunch/STRATEGY.md`, `handoff/BRAND_VOICE.md`, `handoff/ANALYTICS.md`, `lib/analytics/events.ts`, `handoff/relaunch/marketing/COMPETITORS.md`.

**What changed in this revision (Dom, 9 Nov):**

- **Budget is US$500 a month** (D-30), not the US$2,000–3,400 first recommended. The structure below is rebuilt for that budget: one campaign, three ad groups, exact and phrase match only.
- **Conversion tracking is option B** (D-31): cookie-free, click ID stored with the brief, offline upload weekly. Option A (Google tag and cookie banner) is no longer the plan.
- **UK ads are not held back** for regulatory advice (D-09, D-34: "carry on").
- **Support line is 24/7** (D-04), number in the road book. Ads can say so.
- **Partners on the ground** in Victoria Falls, Kasane, Maun and Windhoek (D-02), never named.
- The separate US and UK campaigns, the four-corners and road-trip ad groups, and the road-trip test are gone at this budget. They come back when spend rises (§8).

---

## 1. The situation in four lines

- Organic presence is effectively zero: about 26 clicks from 1,790 impressions in the 12 months to 2026-11-09, mostly brand. US 697 impressions, UK 245, Canada 116.
- The only non-brand queries we show for ("overland safari", "overland kenya safari") carry the wrong intent: overland truck tours, in a country we no longer sell. There are no self-drive queries yet.
- Paid search is therefore the main source of qualified visitors at launch, not a supplement to SEO.
- The category is contested by well-funded tailor-made specialists (Audley, Expert Africa, Rainbow Tours, Go2Africa and others — see `COMPETITORS.md`). At US$500 a month we can't compete on breadth or bids anywhere. We can compete on narrow, high-intent queries where few specialists bid (Zimbabwe, Victoria Falls, Chobe from the Falls), a sharper offer (lodges, not tents; the road book; partners on the ground; a 24/7 line), and landing pages that answer the query directly.

### What I could and couldn't verify

- **Search volumes:** I could not source a monthly search volume for any keyword in this plan. **No volumes are quoted in this document.** Before launch, pull them from Google Keyword Planner inside the account (US, UK and Canada separately) and record them in §10.
- **Demand evidence (qualitative):** a single search surfaced Namibia self-drive itineraries from Responsible Travel, Rainbow Tours, Wexas, Eshores and On The Go Tours ([Responsible Travel](https://www.responsibletravel.com/holidays/namibia/travel-guide/self-drive-holidays-in-namibia), [Rainbow Tours](https://www.rainbowtours.co.uk/tours/africa/classic-namibia-selfdrive-holiday), [Wexas](https://wexas.com/itinerary-offers/best-of-namibia-self-drive-102490), [Eshores](https://www.eshores.co.uk/holidays/safaris/namibia-explorer-self-drive-safari/), [On The Go Tours](https://www.onthegotours.com/uk/Namibia/Etosha-Wildlife-Exploration-SelfDrive-5-days)). Zimbabwe self-drive has far fewer sellers ([Far and Wild](https://farandwild.travel/africa/zimbabwe/zimbabwe-encounter), [Wild Foot Travel](https://www.wildfoottravel.com/itinerary/4170/zimbabwe-botswana-self-drive-16-days)). Inference, not data: **Namibia has the volume and the competition; Zimbabwe has less of both.** At this budget that points us at Zimbabwe and the Falls first.
- **CPCs:** every CPC in this plan is an estimate (§6).

---

## 2. What US$500 a month buys, honestly

US$500 a month is about **US$16.40 a day** (Google sets the monthly limit at the daily budget × 30.4, and may spend up to twice the daily budget on a busy day, balancing out across the month).

At the CPCs estimated in §6, that is **one to ten clicks a day**. The original structure — two campaigns, eight to nine ad groups, around 90 keywords — would split those clicks so thinly that most ad groups would see a handful of clicks a month and most keywords none. Nothing would learn, and the search terms report would be too sparse to mine.

So the rules at this budget:

1. **One campaign.** Every click lands in one pot, so the budget isn't divided before it's spent.
2. **Three ad groups, tightly themed.** Each maps to one landing page and one reason to choose us.
3. **Exact and phrase match only.** No broad match, ever, at this budget.
4. **Lead with the cheapest relevant clicks.** Zimbabwe and the Falls first, generic lodge-based self-drive second, Namibia only on long-tail phrases with a hard bid cap.
5. **Cut waste hard.** The negative lists (§4) matter more here than the keyword lists.
6. **Don't test what we can't measure.** No copy tests, no road-trip test, no smart bidding in the first 90 days.

---

## 3. Account structure

```
Account: Safari Overland   (time zone: US Eastern — set at account creation, can't be changed later)
└── Search | Self-drive | US-UK-CA       US$16.40/day
    ├── AG 1  Victoria Falls, Zimbabwe and Chobe   → /self-drive/zimbabwe  (Chobe keywords → /self-drive/botswana-zambia)
    ├── AG 2  Lodge-based self-drive (generic)     → /routes
    └── AG 3  Namibia, long-tail only              → /self-drive/namibia
```

No brand campaign at launch. Organic brand clicks are already ours, and US$500 has no room for insurance.

### Campaign settings

| Setting | Recommendation | Why |
|---|---|---|
| Networks | Search only. Search partners **off**, Display **off** | Every dollar on Google Search, where intent is clearest |
| Locations | United States, United Kingdom, Canada, each as its own location row | One budget, but reporting by country, and per-country bid adjustments if one market proves costly |
| Location option | **Presence**: "people in or regularly in your targeted locations" | Stops spend on people searching from inside southern Africa |
| Location exclusions | South Africa, Namibia, Botswana, Zimbabwe, Zambia | Belt and braces |
| Language | English | — |
| Bidding | **Manual CPC**, enhanced CPC off, with a max CPC per ad group (§6). For the full 90 days | Smart bidding needs a steady conversion count we won't have (rule of thumb: about 15–30 conversions in 30 days per campaign; not a Google guarantee). Offline conversions also arrive days late (§7) |
| Ad schedule | **07:00–23:00 US Eastern, seven days** | See below |
| Devices | No adjustments at launch | — |
| Audiences | "Trips to Africa"-style in-market segments in **observation** mode only, if available | Learn, don't restrict |
| Auto-tagging | **On** | Required for the click ID (gclid) that option B depends on |
| Final URL suffix | `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}` | Lets the brief record show which ad group and keyword produced it |

### Ad schedule — booking hours, and the trade-off

Google runs a campaign's schedule in the account's time zone, not the searcher's. With one campaign across three markets, the schedule is a compromise:

| Schedule (US Eastern) | US East | US Pacific | UK |
|---|---|---|---|
| 07:00–23:00 | 07:00–23:00 | 04:00–20:00 | 12:00–04:00 (GMT, Nov–Mar) |

- **Kept:** US and Canadian waking hours, and UK afternoons and evenings, when leisure trips get planned.
- **Traded away:** UK mornings (07:00–12:00 UK), and late evenings on the US west coast. The UK is the smaller market (Search Console impressions about a third of the US), so I'd lose its mornings before I'd lose US evenings.
- **Wasted:** a little UK spend between midnight and 04:00 UK. Schedule bid adjustments apply to every location in the campaign, so they can't trim UK hours alone. Watch it in the hour-of-day report; if it's material, the fix is the one below.
- **Weekends stay on.** Holiday planning happens at weekends.
- **Review at day 45** using the hour-of-day report split by country. If the UK converts well and its mornings matter, the fix is a separate UK campaign on a **shared budget** (one US$16.40 pot, two schedules). That's the first structural change I'd make when spend rises (§8), not before.
- Clock changes: UK and US daylight-saving dates differ by one to three weeks in March and October/November, so the UK hours shift by an hour in those weeks. Not worth adjusting for.

---

## 4. Keywords and negatives

Match types: `[exact]` and `"phrase"` only. Hyphenation: I believe Google treats "self drive" and "self-drive" as close variants, but I haven't confirmed it in Google's documentation. Add both spellings for the exact-match terms that matter most.

About 30 keywords in total, down from about 90. If Keyword Planner shows a keyword with no measurable volume in all three countries, leave it out rather than carry dead weight.

### AG 1 — Victoria Falls, Zimbabwe and Chobe → `/self-drive/zimbabwe`

The ad group we lead with: our home ground, the route we sell best, partners on the ground at both ends, and few specialists bidding.

| Keyword | Match | Final URL |
|---|---|---|
| zimbabwe self drive | [exact] | /self-drive/zimbabwe |
| zimbabwe self-drive | [exact] | /self-drive/zimbabwe |
| zimbabwe self drive safari | "phrase" | /self-drive/zimbabwe |
| zimbabwe self drive itinerary | "phrase" | /self-drive/zimbabwe |
| hwange self drive | "phrase" | /self-drive/zimbabwe |
| victoria falls self drive | "phrase" | /self-drive/zimbabwe |
| victoria falls and hwange | "phrase" | /self-drive/zimbabwe |
| hwange and matobo | "phrase" | /self-drive/zimbabwe |
| matobo self drive | "phrase" | /self-drive/zimbabwe |
| chobe self drive | "phrase" | /self-drive/botswana-zambia (keyword-level final URL) |
| victoria falls chobe self drive | "phrase" | /self-drive/botswana-zambia |
| victoria falls to chobe | "phrase" | /self-drive/botswana-zambia |
| kasane self drive | "phrase" | /self-drive/botswana-zambia |

Dropped at this budget: the rest of the old four-corners group ("botswana self drive safari", "zambia self drive safari", "caprivi self drive", "four corners africa" and similar). "Botswana self drive" is camping-heavy, and "four corners" alone pulls in Arizona.

### AG 2 — Lodge-based self-drive (generic) → `/routes`

Only phrases that already say *lodges*, *southern Africa* or *tailor-made*: the qualifier does the filtering that a bigger budget would buy with bids.

| Keyword | Match |
|---|---|
| self drive safari lodges | "phrase" |
| self drive safari with lodges | "phrase" |
| lodge based self drive safari | "phrase" |
| self drive safari southern africa | "phrase" |
| tailor made self drive safari | "phrase" |
| self drive safari itinerary | "phrase" |
| self drive safari holiday | "phrase" |
| self drive safari africa | "phrase" |
| self drive safari | [exact] — **paused at launch** |

**`[self drive safari]` starts paused.** It's the biggest and most contested term, and the one most likely to match drive-through safari parks. Enable it only if the campaign underspends by more than 20% for two weeks running, with the lowest max CPC in the account.

### AG 3 — Namibia, long-tail only → `/self-drive/namibia`

Namibia is the bigger market and the most crowded auction (Audley alone will outbid us on "namibia self drive" in the US — `COMPETITORS.md`). At US$500 we don't bid on the head term. Long-tail phrases only, with a hard max CPC, and this is the first group to pause if it takes more than 35% of spend without briefs.

| Keyword | Match |
|---|---|
| namibia self drive lodges | "phrase" |
| tailor made namibia self drive | "phrase" |
| namibia self drive itinerary | "phrase" |
| namibia self drive 2 weeks | "phrase" |
| windhoek to etosha self drive | "phrase" |
| sossusvlei self drive | "phrase" |
| etosha self drive | "phrase" |

Not bid on at launch: `[namibia self drive]`, "namibia self drive safari", "namibia self drive tour", "namibia fly drive". Revisit when spend rises.

### Negative keywords (kept in full)

Apply as shared negative lists. Phrase match unless shown. At this budget a single wasted click is 5–15% of a day's spend, so **review the search terms report twice a week for the first six weeks**, then weekly. The lists will grow.

**List A — Wrong trip**

| Theme | Negatives |
|---|---|
| Camping and kit | camping, camp site, campsite, campsites, rooftop tent, roof top tent, rooftop, roof tent, tent hire, camping equipment, fully equipped, camper, campervan, camper van, motorhome, motor home, rv, 4x4 camper, bushcamp, bush camping, wild camping |
| Overland trucks and group tours | overland truck, overland tour, overland tours, overlanding, overlander, truck tour, group tour, group tours, small group, participation safari, backpacker, backpackers, hostel |
| Price-led | cheap, cheapest, budget, low cost, discount, deal, deals, free |
| Vehicle-only | car hire, car rental, rent a car, 4x4 hire, 4x4 rental, vehicle hire, bakkie, hilux hire (revisit later: some may be future vehicle-plus-route buyers) |
| Wrong region | kenya, tanzania, serengeti, masai mara, maasai mara, ngorongoro, uganda, rwanda, gorilla, gorillas, egypt, morocco, madagascar, kruger, cape town, garden route, south africa (remove when South Africa launches) |
| Jobs and study | job, jobs, career, careers, vacancy, vacancies, salary, hiring, internship, volunteer, volunteering, course, guide training, field guide course |
| Research only | reddit, tripadvisor, forum, blog, pdf, map, wiki, wikipedia, lonely planet, youtube, video |
| Browser / tech | safari browser, apple, iphone, ipad, mac, macbook, download, update, extension |

**List B — Drive-through wildlife parks (critical)**

"Self drive safari" in the UK and "drive thru safari" in the US often mean a drive-through safari park at home.

| Market | Negatives |
|---|---|
| All | safari park, wildlife park, zoo, tickets, ticket, drive thru, drive through, drive-through, animal park, theme park, near me, day out |
| UK | woburn, knowsley, longleat, west midlands, blair drummond, uk, england, scotland, wales |
| US | lion country, wild safari, wildlife safari oregon, fossil rim, six flags, natural bridge, texas, georgia, florida, virginia, pennsylvania, ohio, oregon, animal kingdom, disney |
| Canada | african lion safari, hamilton, ontario, parc omega, quebec (my additions for Canada; check them in the search terms report) |

Spot-check the US state list in the search terms report: a few states may appear in legitimate queries. They're cheap to remove if they block anything real.

**List C — Ad-group-specific**

- AG 1 (Chobe keywords): arizona, utah, colorado, new mexico, monument, navajo, four corners usa.
- AG 2: the country and park terms (namibia, zimbabwe, botswana, zambia, chobe, hwange, etosha, victoria falls) as **exact-match negatives**, so country queries go to their own group and landing page.
- AG 3: namibia self drive [exact], namibia self drive safari [exact] (keeps us out of the head-term auction even through close variants).
- **Linkwasha, Somalisa:** add both as negatives. They've left the collection (D-44), and we shouldn't pay for their names.
- Competitor brand names (audley, expert africa, rainbow tours, go2africa, wexas, responsible travel, jenman, discover africa, far and wild, wild foot): negatives. We don't bid on competitor names.

---

## 5. Responsive search ads

One RSA per ad group: three in all. Fifteen headlines (≤30 characters) and four descriptions (≤90 characters) each, character counts checked by script, including spaces and punctuation.

**One campaign means one set of ads for all three countries**, so the copy is market-neutral: *self-drive safari*, not *self-drive holiday* or *road trip*. The UK-specific ads (*holiday*, *car hire*, *fly-drive*) and the US road-trip ads from the first draft are retired for now; restore them from this file's history when the UK gets its own campaign (§8).

House voice rules: sentence case, no exclamation marks (Google also rejects them in headlines), none of the twelve unforgivables, no *overland* in the copy except our name, no price in the ad (route "from" prices go on the landing pages once `ROUTE_COSTING.md` is checked, not in ads), no claim that a lodge is partnered with or exclusive to us. Partners are named by town only, never by company (STRATEGY §5).

**Pinning:** none at launch, except H1 to position 1 in AG 1 and AG 3 if the asset report shows the country headline served below position 1 more than half the time.

**Claims to check before launch** (marketing can't verify them):

- "Rhino tracking in Matobo": only if a Matobo stay on R1 offers it. Swap for "Rock art in the Matobo hills" if not.
- "Boat safaris on the Chobe": only if a Kasane stay on R3 offers them.
- "Border paperwork prepared": partners are in place (D-03); confirm they prepare it.
- "Three routes within 48 hours": matches the `/plan` promise. At this budget, volume won't threaten it.
- "Send a brief. It's free": true under D-01. Don't mention the planning fee in ads.
- "Support on the road, 24/7": confirmed (D-04). The number itself never appears in ads.

### AG 1 — Victoria Falls, Zimbabwe and Chobe

**Final URL:** `/self-drive/zimbabwe` (Chobe keywords: `/self-drive/botswana-zambia`). Every line must be true on both pages.

| # | Headline | Chars |
|---|---|---|
| H1 | Zimbabwe self-drive safari | 26 |
| H2 | Victoria Falls to Hwange | 24 |
| H3 | Hwange, Matobo and the Falls | 28 |
| H4 | Victoria Falls and Chobe | 24 |
| H5 | Chobe, Caprivi and the Falls | 28 |
| H6 | Lodges, not rooftop tents | 25 |
| H7 | We draw the route for you | 25 |
| H8 | Lodges and vehicle booked | 25 |
| H9 | Your route in a road book | 25 |
| H10 | Partners in Victoria Falls | 26 |
| H11 | Support on the road, 24/7 | 25 |
| H12 | Three routes within 48 hours | 28 |
| H13 | Send a brief. It's free | 23 |
| H14 | Rhino tracking in Matobo | 24 |
| H15 | Safari Overland | 15 |

| # | Description | Chars |
|---|---|---|
| D1 | Victoria Falls, Hwange and Matobo, or the Falls and Chobe, in your own car, at lodges. | 86 |
| D2 | Partners on the ground in Victoria Falls and Kasane, and a 24/7 line while you drive. | 85 |
| D3 | Drive times, road surfaces, fuel and park gate times, worked out before you leave. | 82 |
| D4 | Tell us your months and how long you'll drive in a day. Three routes within 48 hours. | 85 |

### AG 2 — Lodge-based self-drive (generic)

**Final URL:** `/routes`

| # | Headline | Chars |
|---|---|---|
| H1 | Self-drive safari, planned | 26 |
| H2 | Southern Africa self-drive | 26 |
| H3 | Drive yourself, sleep well | 26 |
| H4 | Lodges, not rooftop tents | 25 |
| H5 | We draw the route for you | 25 |
| H6 | We book the lodges and car | 26 |
| H7 | Your route in a road book | 25 |
| H8 | Support on the road, 24/7 | 25 |
| H9 | Partners on the ground | 22 |
| H10 | Three routes within 48 hours | 28 |
| H11 | Send a brief. It's free | 23 |
| H12 | Namibia, Zimbabwe, Botswana | 27 |
| H13 | The drive is half the safari | 28 |
| H14 | Guided mornings, your own car | 29 |
| H15 | Safari Overland | 15 |

| # | Description | Chars |
|---|---|---|
| D1 | Self-drive journeys through southern Africa, staying at camps and lodges, not in tents. | 87 |
| D2 | We draw the route, book the lodges and the vehicle, and answer the phone 24/7. | 78 |
| D3 | Drive times, road surfaces, fuel and border crossings, worked out before you leave. | 83 |
| D4 | Tell us your months and how long you'll drive in a day. Three routes within 48 hours. | 85 |

### AG 3 — Namibia, long-tail only

**Final URL:** `/self-drive/namibia`

| # | Headline | Chars |
|---|---|---|
| H1 | Namibia self-drive safari | 25 |
| H2 | Namibia, by road and lodge | 26 |
| H3 | Windhoek to Etosha, planned | 27 |
| H4 | Sossusvlei, Damaraland, Etosha | 30 |
| H5 | Lodges, not rooftop tents | 25 |
| H6 | We draw the route for you | 25 |
| H7 | Lodges and vehicle booked | 25 |
| H8 | Your route in a road book | 25 |
| H9 | Partners in Windhoek | 20 |
| H10 | Support on the road, 24/7 | 25 |
| H11 | Gravel roads, timed in advance | 30 |
| H12 | Three routes within 48 hours | 28 |
| H13 | Send a brief. It's free | 23 |
| H14 | 14 to 16 nights, or shorter | 27 |
| H15 | Safari Overland | 15 |

| # | Description | Chars |
|---|---|---|
| D1 | Windhoek, the Kalahari, Sossusvlei, the coast, Damaraland and Etosha, in your own car. | 86 |
| D2 | Partners on the ground in Windhoek, and a 24/7 line while you drive. | 68 |
| D3 | Drive times and road surfaces in a road book, in print and offline on your phone. | 81 |
| D4 | Tell us your months and how long you'll drive in a day. Three routes within 48 hours. | 85 |

**H9 and D2 depend on the Windhoek partner being in place when the ads go live.** Dom has said to say Windhoek (D-02) and is arranging it. If it isn't in place on launch day, remove H9 and use "We draw the route, book the lodges and the vehicle, and answer the phone 24/7." (78) for D2.

### Assets (campaign level)

#### Sitelinks (text ≤25, each description line ≤35)

| Text | Line 1 | Line 2 | URL |
|---|---|---|---|
| Our three routes (16) | Zimbabwe, Namibia, four corners (31) | How we plan a route (19) | `/routes` |
| Send us a brief (15) | Free. Three routes within 48 hours (34) | Months, pace, how long you'll drive (35) | `/plan` |
| Speak to a planner (18) | A short call, at a time that suits (34) | Book it in the calendar (23) | `/plan` |
| Can I drive this? (17) | Roads, the left side, borders (29) | And why nobody drives after dark (32) | `/routes` |

#### Callouts (≤25)

| Callout | Chars |
|---|---|
| Lodges, not tents | 17 |
| Road book, print/offline | 24 |
| Partners on the ground | 22 |
| First route sketch free | 23 |
| Vehicle matched to roads | 24 |
| 24/7 support on the road | 24 |

#### Structured snippet

Header **Destinations**: Zimbabwe · Victoria Falls · Botswana · Namibia · Zambia.

---

## 6. Budget, CPC assumptions and what to expect

### Budget

| Item | Amount |
|---|---|
| Monthly | **US$500** (Dom, D-30) |
| Daily budget setting | **US$16.40** |
| Brand campaign | None |
| Seasonal changes | None in the first 90 days. The budget is too small for a holiday dip or a January push to change anything we could measure |

### Steering by ad group

Ad groups share the campaign budget, so these are targets, steered with max CPCs, not hard caps.

| Ad group | Target share | Max CPC at launch (estimate — replace with Keyword Planner's top-of-page range) |
|---|---|---|
| AG 1 Victoria Falls, Zimbabwe and Chobe | ~40% | US$3.00 |
| AG 2 Lodge-based self-drive | ~35% | US$3.50 |
| AG 3 Namibia, long-tail | ~25% (pause if over 35% with no briefs) | US$3.00 |

If AG 1 can't spend its share because volume is thin — likely, since Zimbabwe self-drive is a small niche — let AG 2 take it. Don't raise AG 1 bids just to spend the money.

### CPC assumptions (all estimates, all unverified)

Published "travel" CPC benchmarks run from US$0.25 ([Pixis](https://pixis.ai/blog/2025-google-advertising-benchmarks-for-every-industry/)) to US$2.12 ([Search Engine Land](https://searchengineland.com/google-ads-costs-rise-again-but-conversions-improve-report-455663)). Both are cross-travel averages that include hotels and flights; neither describes tailor-made safari queries. **My working estimates, which are guesses** based on trip value and how many specialists bid:

| Ad group | Estimated average CPC |
|---|---|
| AG 1 Victoria Falls, Zimbabwe and Chobe | US$1.00–3.00 (fewer bidders) |
| AG 2 Lodge-based self-drive | US$2.00–5.00 |
| AG 3 Namibia, long-tail | US$2.50–6.00 (crowded auction; the cap will limit how often we show) |
| **Blended** | **US$1.75–4.50** |

UK CPCs are probably a little lower in pounds than US CPCs in dollars, but I have no source for that. Treat the three countries as one blended estimate until the location report shows otherwise.

### Expected clicks and briefs

| | Per month | Over 90 days |
|---|---|---|
| Clicks (US$500 ÷ US$1.75–4.50) | **about 110–285** | about 330–860 |
| Briefs, if 2–5% of clicks submit one (estimate; the site has no paid history) | **about 2–14** | about 7–43 |
| A realistic middle | 4–8 briefs a month | **10–25 briefs** |

If the campaign underspends because the long-tail keywords have too little volume, clicks fall but so does cost. That's information, not failure: it tells us how big the niche is.

### What a booking is worth (internal, rough, unverified)

A 12-night trip for two at US$300–400 per person per night is US$7,200–9,600 of lodge spend, plus the vehicle, plus the US$250 planning fee (D-01). Lodge margin and vehicle commission depend on contracts I haven't seen. **One booking a quarter from ads would very likely pay for the US$1,500 spent.** Whether we get one in the first 90 days is uncertain: a brief in December may not book until February or March.

---

## 7. Conversion tracking — option B, cookie-free

Dom chose option B (D-31). The site stays cookieless. Google Ads learns from briefs (and later bookings) that we upload ourselves, once a week. **The capture is already built on this branch**; the operating detail, including the weekly SQL export, lives in `handoff/ANALYTICS.md` ("Google Ads offline conversions"). This section is the marketing view of it.

### How it works

1. **Auto-tagging is on**, so every ad click lands with a `gclid` (or, on some iPhone traffic, `gbraid` / `wbraid`) in the URL, plus the UTM values from the final URL suffix.
2. **The site keeps them in the visitor's browser, not in a cookie.** `components/analytics/click-capture.tsx` and `lib/analytics/click-ids.ts` read the click ID and UTMs from the landing URL and hold them in `localStorage` for up to 90 days. Nothing is sent anywhere until a brief is submitted.
3. **The brief record stores them**: `briefs.gclid`, `gbraid`, `wbraid`, `utm_*` and `click_captured_at` (migration `20261109_briefs_self_drive_fields.sql`, D-16, applied at go-live).
4. **Weekly upload, every Monday**, as a CSV in Google Ads (Goals → Conversions → Uploads): Google Click ID, Conversion Name, Conversion Time. About 15 minutes; the query is in `ANALYTICS.md`. Google's import matches on gclid, conversion name and conversion time ([Google Ads Help](https://support.google.com/adwords/answer/6179720)).
5. **Clicks older than 90 days can't be uploaded against.** With a weekly upload that never bites.

### Conversion actions

| Conversion action | What triggers it | Primary? | Count | Value (placeholder) | Window |
|---|---|---|---|---|---|
| Brief submitted | A brief with a gclid (name must match exactly: `Brief submitted`) | Yes | One | 1 — [Dom to confirm] | 90 days |
| Planner call held | A planner call that can be matched to a brief with a gclid | Yes, once we start uploading it | One | 3 — [Dom to confirm] | 90 days |
| Booking confirmed | A booking whose brief carries a gclid | Yes, once live | One | Actual margin + planning fee | 90 days |

Start with **Brief submitted** only; that's what the built export produces. Add the other two when the admin records calls held and bookings against briefs. Calls booked straight from Calendly with no brief have no gclid and can't be uploaded; that's acceptable.

The site's Vercel Analytics events (`brief-submitted`, `calendly-booking-completed` and the rest) carry on for site reporting. They can't be imported into Google Ads and don't need to be.

### Caveats

- **Delay.** Conversions reach Google up to a week late. With manual CPC that doesn't matter; it's one more reason not to switch to smart bidding in the first 90 days.
- **Google's direction.** Google labels gclid file import "legacy" and points new advertisers to Data Manager and *enhanced conversions for leads*, which normally assumes the Google tag (`ANALYTICS.md` has the sources). The file upload still works as far as the docs say, but it may be retired. If it is, revisit this section.
- **`localStorage` is still storage on the visitor's device.** It isn't a cookie, but UK PECR covers any storage on the user's device, not just cookies, and needs consent unless the storage is strictly necessary for a service the user asked for. Ad attribution probably isn't. **This is my reading, not legal advice**, and Dom has said to carry on with regulatory questions (D-09). If he wants to close the gap without a banner, the alternative is to carry the click ID in the URL from the landing page to `/plan` (no storage at all), at the cost of losing attribution when someone leaves and comes back later. A build-team decision; I haven't changed anything.
- **Privacy policy.** A gclid stored against a named brief is personal data in the UK. The privacy policy needs a sentence saying that when someone arrives from an ad, we keep the ad's click reference with their brief and share it with Google to measure the ad. Dom / build team to add, if it isn't there already.
- **Option A** (Google tag, Consent Mode v2, cookie banner) is not the plan. Revisit only if spend rises a lot and the weekly upload becomes the bottleneck.

---

## 8. What 90 days can teach us, and when to spend more

### Realistic learning at US$500 a month

**We can expect to learn:**

1. **Which queries are real.** The search terms report will show what people actually type, and the negative lists will sharpen fast. This is the most valuable output of the first 90 days.
2. **Real CPCs** per ad group and per country, replacing the estimates in §6.
3. **Whether ad clicks become briefs at all**, and roughly at what rate (directional, from 330–860 clicks).
4. **Whether ad briefs are qualified**: months, budget band, trip length, first-timer or not. The planner judges each brief from an ad as *qualified* or *not*; that judgement matters more than the count.
5. **A rough read on Zimbabwe vs generic vs Namibia**, and US vs UK vs Canada, as a direction, not a result.

**We can't expect to learn:**

- Anything statistically significant about ad copy. No A/B tests.
- Whether *road trip* beats *self-drive* for Americans. Deferred.
- A reliable cost per booking. Bookings lag briefs by weeks or months; we may see zero to three in 90 days.
- What smart bidding would do. It needs more conversions than we'll have.

### Review points

| When | What |
|---|---|
| Twice a week, weeks 1–6 | Search terms report; add negatives |
| Every Monday | Offline conversion upload (§7) |
| Day 30 | Real CPCs vs §6; adjust max CPCs; check spend split by ad group |
| Day 45 | Hour-of-day by country (schedule, §3); first read of brief quality |
| Day 90 | Full review against the triggers below; write the result into this file |

### Trigger for raising spend

Raise the budget (suggested next step: **US$1,000 a month**) when **all three** hold:

1. **Budget is the limit.** Google reports the campaign "limited by budget", and search lost impression share (budget) is above ~30% on AG 1 or AG 2 — there's more qualified demand than we're paying for.
2. **The funnel holds.** At least **10 briefs from ads**, at least half judged qualified by the planner, and every one answered within the 48-hour promise.
3. **The cost is affordable.** Cost per qualified brief at or below **[target — Dom to set once margins are known]**. As a working placeholder only: US$150 per qualified brief, on the assumption (unverified) that around one in ten qualified briefs books.

A first confirmed booking from an ad, with a margin above three months' spend (US$1,500), overrides condition 3.

**What the next money buys, in order:** (1) a separate UK campaign on a shared budget, so UK copy and UK hours come back; (2) `[self drive safari]` exact and the Namibia head terms with a sensible cap; (3) the road-trip copy test in the US.

### Trigger for pausing

If after **60 days and roughly 250 clicks** there are **no briefs**, pause the campaign and fix the landing pages and the brief form before spending more. Clicks without briefs at that volume point to the page, not the keywords.

---

## 9. Landing pages and timing

| Ad group | Final URL | What the page must do above the fold |
|---|---|---|
| AG 1 Victoria Falls, Zimbabwe and Chobe | `/self-drive/zimbabwe`; Chobe keywords `/self-drive/botswana-zambia` | Repeat the query's words in the H1 or eyebrow; the route at a glance (nights, drive-day range, road surfaces); partners on the ground in Victoria Falls (Zimbabwe) or Kasane (four corners — the vehicle is collected and returned in Kasane, D-37); one brief CTA |
| AG 2 Lodge-based self-drive | `/routes` | Name the three routes and say "lodges, not tents" in the first screen; one brief CTA |
| AG 3 Namibia, long-tail | `/self-drive/namibia` | "Namibia self-drive" in the H1 or eyebrow; R2 at a glance; partners on the ground in Windhoek; one brief CTA |

Route "from" prices (D-11) should appear on these pages once `handoff/relaunch/ROUTE_COSTING.md` exists and Dom has checked it. A visible starting price filters out people who would never book, which matters more at this budget than at any other.

**Dependencies (outside marketing's files):**

1. The landing pages must be live on production before any ad runs.
2. The click-ID capture (§7) and the briefs migration (D-16) must be on production. Both are built on this branch; the migration is applied at go-live.
3. `StartBriefSource` in `lib/analytics/events.ts` needs values for these pages (for example `self-drive-landing` and `routes`) so the site dashboard shows which page converts.
4. Landing pages indexable and in the sitemap; they double as the organic pages we don't have yet.

### Timing

Social week 1 starts Monday 16 November 2026. **Ads go live as soon as the landing pages and the click-ID capture are on production**, ideally the same week or the one after. Travellers booking the July–October 2027 dry season are in their booking window now and through roughly March 2027. Industry blogs put peak-season southern Africa bookings 9–18 months ahead ([Rhino Africa](https://blog.rhinoafrica.com/2026/07/23/how-far-in-advance-should-i-book-my-african-safari/), [Secret Africa](https://secretafrica.com/when-should-i-book-my-african-safari/), [Holidify](https://holidify.com/pages/how-far-in-advance-to-book-african-safari-6938.html)); those describe premier camps, and mid-range road-accessible lodges probably fill later (my inference, unverified). Ad copy names no year, so it never needs rewriting; landing pages do when the season switches to 2028 (around July 2027).

### Launch checklist

1. Landing pages live on production; `curl -I` each one.
2. Click-ID capture tested on production: open a landing page with `?gclid=TEST123`, submit a test brief, confirm the brief record holds it (tag the test brief so it's excluded from the upload).
3. Account created with the **US Eastern** time zone. Auto-tagging on.
4. The `Brief submitted` offline conversion action created (§7); the other two later.
5. Keyword Planner pull recorded in §10; drop keywords with no volume; set max CPCs from the top-of-page ranges.
6. Shared negative lists A and B, and the list C entries, attached before any ad goes live.
7. Campaign built paused; Dom reviews in the UI; then enabled.
8. First Monday upload done, even if empty, so the routine starts.

---

## 10. To fill in after the Keyword Planner pull

| Keyword | US searches/mo | UK searches/mo | CA searches/mo | US top-of-page bid (low–high) | UK top-of-page bid (low–high) |
|---|---|---|---|---|---|
| zimbabwe self drive | | | | | |
| victoria falls and hwange | | | | | |
| chobe self drive | | | | | |
| self drive safari lodges | | | | | |
| self drive safari southern africa | | | | | |
| self drive safari | | | | | |
| namibia self drive itinerary | | | | | |
| windhoek to etosha self drive | | | | | |

---

## Sources

- Search Console figures: supplied in the brief, 12 months to 2026-11-09.
- Responsible Travel, Namibia self-drive guide — https://www.responsibletravel.com/holidays/namibia/travel-guide/self-drive-holidays-in-namibia
- Rainbow Tours, Classic Namibia self-drive — https://www.rainbowtours.co.uk/tours/africa/classic-namibia-selfdrive-holiday
- Wexas, Best of Namibia self-drive — https://wexas.com/itinerary-offers/best-of-namibia-self-drive-102490
- Eshores, Namibia explorer self-drive — https://www.eshores.co.uk/holidays/safaris/namibia-explorer-self-drive-safari/
- On The Go Tours, Etosha self-drive — https://www.onthegotours.com/uk/Namibia/Etosha-Wildlife-Exploration-SelfDrive-5-days
- Far and Wild, Classic Zimbabwe self-drive — https://farandwild.travel/africa/zimbabwe/zimbabwe-encounter
- Wild Foot Travel, Zimbabwe and Botswana self-drive — https://www.wildfoottravel.com/itinerary/4170/zimbabwe-botswana-self-drive-16-days (listed from search results only)
- Pixis, 2025 Google advertising benchmarks — https://pixis.ai/blog/2025-google-advertising-benchmarks-for-every-industry/
- Search Engine Land, Google Ads costs 2025 — https://searchengineland.com/google-ads-costs-rise-again-but-conversions-improve-report-455663
- Google Ads Help, offline conversion import — https://support.google.com/adwords/answer/6179720
- Relevant Audience, gclid import vs enhanced conversions for leads — https://www.relevantaudience.com/google-ads-en/google-ads-offline-conversion-import-guide/
- Rhino Africa, booking lead times — https://blog.rhinoafrica.com/2026/07/23/how-far-in-advance-should-i-book-my-african-safari/
- Secret Africa, booking lead times — https://secretafrica.com/when-should-i-book-my-african-safari/
- Holidify, booking lead times — https://holidify.com/pages/how-far-in-advance-to-book-african-safari-6938.html

---

## Still open for Dom

1. **Conversion values.** Placeholders: brief = 1, planner call = 3. Confirm, or give real numbers once margins are known.
2. **Target cost per qualified brief** for the spend trigger (§8). Working placeholder US$150.
3. **Ad claims to confirm:** rhino tracking in Matobo, boat safaris on the Chobe, border paperwork prepared by partners.
4. **Windhoek partner in place by ad launch?** If not, AG 3 drops H9 and D2 changes (§5).
5. **Who runs the account day to day:** search terms twice a week for six weeks, and the Monday upload. Dom, or someone else?
6. **`localStorage` and PECR** (§7 caveats): accept the current build, or ask for URL-only carry-through.
7. **Build work** (not marketing's files): the privacy-policy sentence about click references, and new `StartBriefSource` values for the landing pages. Click-ID capture and the briefs columns are already built.
