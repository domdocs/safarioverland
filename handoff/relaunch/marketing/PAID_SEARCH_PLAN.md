# Paid search plan — Google Ads, US and UK

**Owner:** head of marketing (relaunch team). **Date:** 2026-11-09.
**Status:** draft for Dom. Nothing here has been set up in Google Ads. No account changes, no tags installed.
**Reads with:** `handoff/relaunch/STRATEGY.md`, `handoff/BRAND_VOICE.md`, `handoff/ANALYTICS.md`, `lib/analytics/events.ts`, `handoff/relaunch/marketing/COMPETITORS.md`.

---

## 1. The situation in four lines

- Organic presence is effectively zero: about 26 clicks from 1,790 impressions in the 12 months to 2026-11-09, mostly brand. US 697 impressions, UK 245, Canada 116.
- The only non-brand queries we show for ("overland safari", "overland kenya safari") carry the wrong intent: overland truck tours, in a country we no longer sell. There are no self-drive queries yet.
- Paid search is therefore the main source of qualified visitors at launch, not a supplement to SEO.
- The category is contested by well-funded tailor-made specialists (Audley, Expert Africa, Rainbow Tours, Go2Africa and others — see `COMPETITORS.md`). We will not win on breadth or budget. We win on narrow, high-intent queries, a sharper offer (lodges, not tents; the road book; partners in Victoria Falls), and landing pages that answer the query directly.

### What I could and couldn't verify

- **Search volumes:** I could not source a monthly search volume for "self drive safari", "namibia self drive" or any other keyword in this plan. Public pages returned nothing usable. **No volumes are quoted in this document.** Before launch, pull them from Google Keyword Planner inside the account (US and UK separately) and record them in §11.
- **Demand evidence (qualitative):** the volume of competitor product pages is itself a signal that there is paid and organic demand for Namibia self-drive in particular. A single search surfaced Namibia self-drive itineraries from Responsible Travel, Rainbow Tours, Wexas, Eshores and On The Go Tours ([Responsible Travel](https://www.responsibletravel.com/holidays/namibia/travel-guide/self-drive-holidays-in-namibia), [Rainbow Tours](https://www.rainbowtours.co.uk/tours/africa/classic-namibia-selfdrive-holiday), [Wexas](https://wexas.com/itinerary-offers/best-of-namibia-self-drive-102490), [Eshores](https://www.eshores.co.uk/holidays/safaris/namibia-explorer-self-drive-safari/), [On The Go Tours](https://www.onthegotours.com/uk/Namibia/Etosha-Wildlife-Exploration-SelfDrive-5-days)). Zimbabwe self-drive has far fewer sellers (Far and Wild, Wild Foot Travel, Jenman-style operators, Wetu-hosted itineraries — [Far and Wild](https://farandwild.travel/africa/zimbabwe/zimbabwe-encounter), [Wild Foot Travel](https://www.wildfoottravel.com/itinerary/4170/zimbabwe-botswana-self-drive-16-days)). One Zimbabwe guide notes the country is "still finding its feet" as a self-drive destination (from the search summary; not read first-hand). Inference, not data: **Namibia has the volume and the competition; Zimbabwe has less of both.**
- **CPCs:** see §8. Every CPC in this plan is an estimate.

---

## 2. Account structure

Two campaigns per market at launch, plus an optional brand campaign. Search network only.

```
Account: Safari Overland
├── US | Search | Self-drive            (locations: United States + Canada, see below)
│   ├── AG  Generic self-drive          → /routes
│   ├── AG  Namibia                     → /self-drive/namibia
│   ├── AG  Zimbabwe                    → /self-drive/zimbabwe
│   ├── AG  Four corners (Botswana, Zambia) → /self-drive/botswana-zambia
│   └── AG  Road trip (test)            → /routes, or the country page when the query names one
├── UK | Search | Self-drive            (location: United Kingdom)
│   ├── AG  Generic self-drive          → /routes
│   ├── AG  Namibia                     → /self-drive/namibia
│   ├── AG  Zimbabwe                    → /self-drive/zimbabwe
│   └── AG  Four corners (Botswana, Zambia) → /self-drive/botswana-zambia
└── (optional) Brand | Search | Exact   (US + UK; "safari overland" exact only — see Decisions)
```

### Campaign settings (both markets)

| Setting | Recommendation | Why |
|---|---|---|
| Networks | Search only. Search partners **off**, Display **off** | Control. Partners and Display dilute a small budget before we know what converts |
| Locations | US campaign: United States, plus Canada as a separate location row so it reports separately. UK campaign: United Kingdom | STRATEGY §1: Canada rides with the US |
| Location option | **Presence**: "people in or regularly in your targeted locations". Not "presence or interest" | Stops spend on people searching from inside southern Africa (self-drive campers in Johannesburg, Windhoek locals) |
| Location exclusions | South Africa, Namibia, Botswana, Zimbabwe, Zambia | Same reason, belt and braces |
| Language | English | — |
| Bidding (weeks 1–6) | Manual CPC with enhanced CPC off, or Maximise clicks with a max CPC cap | No conversion history yet. Smart bidding needs data it doesn't have |
| Bidding (from ~week 6–8) | Maximise conversions, then target CPA once the account has a steady conversion count | Google's own minimum-volume guidance varies by strategy; treat "about 15–30 conversions in 30 days per campaign" as a rule of thumb, not a fact |
| Ad rotation | Optimise (default) for RSAs | — |
| Schedule | All hours at launch. Review hour-of-day after eight weeks | Not enough data to daypart sooner |
| Devices | No adjustments at launch | — |
| Audiences | Add in-market "Trips to Africa" style segments in **observation** mode only, if available in the account | Learn, don't restrict. Segment names in the UI change; check what exists |
| Final URL suffix | `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}` | Lets the site and the brief record attribute a lead to a campaign. Auto-tagging (gclid) on as well |

**Separate US and UK campaigns** (rather than one campaign with two locations) because budgets, wording and seasonality differ, and so the "road trip" test stays inside the US.

---

## 3. Keywords

Match types: `[exact]` and `"phrase"` only at launch. **No broad match** until smart bidding has conversion data to steer it; broad match on "self drive safari" would pull in UK drive-through safari parks and US drive-thru wildlife parks (see negatives).

Hyphenation: I believe Google treats "self drive" and "self-drive" as the same keyword under close variants, but I have not confirmed this in Google's documentation. Add both spellings for the exact-match terms that matter most; it costs nothing.

Keywords marked **(UK)** go only in the UK campaign; **(US)** only in the US campaign. Everything else goes in both.

### AG Generic self-drive → `/routes`

| Keyword | Match |
|---|---|
| self drive safari | [exact] |
| self-drive safari | [exact] |
| self drive safari africa | "phrase" |
| self drive safari southern africa | "phrase" |
| self drive african safari | "phrase" |
| lodge based self drive safari | "phrase" |
| self drive safari lodges | "phrase" |
| self drive safari with lodges | "phrase" |
| tailor made self drive safari | "phrase" |
| self drive safari itinerary | "phrase" |
| self guided safari africa | "phrase" |
| self drive safari holiday **(UK)** | "phrase" |
| self drive holiday africa **(UK)** | "phrase" |
| fly drive safari **(UK)** | "phrase" |
| self drive safari tour **(US)** | "phrase" |

### AG Namibia → `/self-drive/namibia`

| Keyword | Match |
|---|---|
| namibia self drive | [exact] |
| namibia self-drive | [exact] |
| namibia self drive safari | "phrase" |
| namibia self drive itinerary | "phrase" |
| namibia self drive tour | "phrase" |
| self drive namibia lodges | "phrase" |
| namibia self drive 2 weeks | "phrase" |
| tailor made namibia self drive | "phrase" |
| etosha self drive | "phrase" |
| sossusvlei self drive | "phrase" |
| windhoek to etosha self drive | "phrase" |
| namibia self drive holiday **(UK)** | "phrase" |
| namibia fly drive **(UK)** | "phrase" |
| namibia self drive trip **(US)** | "phrase" |

### AG Zimbabwe → `/self-drive/zimbabwe`

| Keyword | Match |
|---|---|
| zimbabwe self drive | [exact] |
| zimbabwe self drive safari | "phrase" |
| zimbabwe self drive itinerary | "phrase" |
| hwange self drive | "phrase" |
| victoria falls self drive | "phrase" |
| victoria falls hwange self drive | "phrase" |
| victoria falls and hwange | "phrase" |
| matobo self drive | "phrase" |
| hwange and matobo | "phrase" |
| zimbabwe self drive holiday **(UK)** | "phrase" |
| zimbabwe self drive tour **(US)** | "phrase" |

Expect low volume here. That's fine: this is the route we sell best and competitors sell least (see `COMPETITORS.md`). If Keyword Planner shows near-zero volume, keep the ad group and let "victoria falls and hwange" carry it.

### AG Four corners (Botswana, Zambia) → `/self-drive/botswana-zambia`

| Keyword | Match |
|---|---|
| chobe self drive | "phrase" |
| kasane self drive | "phrase" |
| caprivi self drive | "phrase" |
| zambezi region self drive | "phrase" |
| victoria falls chobe self drive | "phrase" |
| victoria falls to chobe | "phrase" |
| botswana self drive lodges | "phrase" |
| botswana self drive safari | "phrase" |
| zambia self drive safari | "phrase" |
| livingstone self drive | "phrase" |
| four corners africa | "phrase" |
| kaza self drive | "phrase" |

**Watch:** "botswana self drive" is camping-heavy intent (STRATEGY §3: Botswana's parks are camping country). The camping negatives below are essential for this group. "Four corners" on its own means the US Four Corners (Arizona, Utah, Colorado, New Mexico) — never bid on it unqualified, and see the negatives.

### AG Road trip (test, US only) → `/routes`, or the country page when the query names one

| Keyword | Match | Final URL |
|---|---|---|
| southern africa road trip | "phrase" | /routes |
| africa road trip | "phrase" | /routes |
| african road trip | "phrase" | /routes |
| safari road trip | "phrase" | /routes |
| namibia road trip | "phrase" | /self-drive/namibia (keyword-level final URL) |
| zimbabwe road trip | "phrase" | /self-drive/zimbabwe |
| botswana road trip | "phrase" | /self-drive/botswana-zambia |
| victoria falls road trip | "phrase" | /self-drive/zimbabwe |

### Negative keywords

Apply as two shared negative lists. Phrase match unless shown. Review the search terms report **twice a week for the first four weeks**, then weekly. This list will grow.

**List A — Wrong trip (apply to all campaigns)**

| Theme | Negatives |
|---|---|
| Camping and kit | camping, camp site, campsite, campsites, rooftop tent, roof top tent, rooftop, roof tent, tent hire, camping equipment, fully equipped, camper, campervan, camper van, motorhome, motor home, rv, 4x4 camper, bushcamp, bush camping, wild camping |
| Overland trucks and group tours | overland truck, overland tour, overland tours, overlanding, overlander, truck tour, group tour, group tours, small group, participation safari, backpacker, backpackers, hostel |
| Price-led | cheap, cheapest, budget, low cost, discount, deal, deals, free |
| Vehicle-only | car hire, car rental, rent a car, 4x4 hire, 4x4 rental, vehicle hire, bakkie, hilux hire (revisit later: some of these may be future vehicle-plus-route buyers) |
| Wrong region | kenya, tanzania, serengeti, masai mara, maasai mara, ngorongoro, uganda, rwanda, gorilla, gorillas, egypt, morocco, madagascar, kruger, cape town, garden route, south africa (remove when South Africa launches) |
| Jobs and study | job, jobs, career, careers, vacancy, vacancies, salary, hiring, internship, volunteer, volunteering, course, guide training, field guide course |
| Research only | reddit, tripadvisor, forum, blog, pdf, map, wiki, wikipedia, lonely planet, youtube, video |
| Browser / tech | safari browser, apple, iphone, ipad, mac, macbook, download, update, extension |

**List B — Drive-through wildlife parks (critical; apply to all campaigns)**

"Self drive safari" in the UK and "drive thru safari" in the US often means a drive-through safari park at home. Without these negatives the generic ad group will spend on day tickets.

| Market | Negatives |
|---|---|
| Both | safari park, wildlife park, zoo, tickets, ticket, drive thru, drive through, drive-through, animal park, theme park, near me, day out |
| UK | woburn, knowsley, longleat, west midlands, blair drummond, uk, england, scotland, wales |
| US | lion country, wild safari, wildlife safari oregon, fossil rim, six flags, natural bridge, texas, georgia, florida, virginia, pennsylvania, ohio, oregon, animal kingdom, disney |

Spot-check the US state list in the search terms report: a few states may appear in legitimate queries ("self drive safari from texas" is unlikely but possible). These are cheap to remove if they block anything real.

**List C — Ad-group-specific**

- Four corners group: arizona, utah, colorado, new mexico, monument, navajo, four corners usa.
- Generic group: add the country terms (namibia, zimbabwe, botswana, zambia, chobe, hwange, etosha) as **exact-match negatives** so country queries route to their own ad group and landing page.
- Competitor brand names (audley, expert africa, rainbow tours, go2africa, wexas, responsible travel, jenman, discover africa, far and wild, wild foot): negatives at launch. We don't bid on competitor names (Decisions for Dom).

---

## 4. Responsive search ads

One RSA per ad group at launch (two in the US groups that carry the wording test, see §6). Fifteen headlines (≤30 characters) and four descriptions (≤90 characters) each. Every line below was length-checked by script. Character counts include spaces and punctuation, as Google counts them.

House voice rules applied: sentence case, no exclamation marks (Google Ads also rejects them in headlines), none of the twelve unforgivables, no *overland* in the copy except our name, no price in the ad, no claim that a lodge is partnered with or exclusive to us. Victoria Falls is the only town where a partner is named (STRATEGY §5); Namibia ads say "someone to call on the road", not "partners in Windhoek".

**Pinning:** pin nothing at launch, except **H1 to position 1 in the Namibia and Zimbabwe groups** if Google's asset report shows the country headline being served below position 1 more than half the time. Country relevance matters more than variety on those queries.

**Wording by market:** US uses *self-drive safari*; UK uses *self-drive holiday* and *car hire*; the US test group uses *road trip* (STRATEGY §6).

**Claims to check before launch** (marketing can't verify them; the research team or Dom must):

- "Rhino tracking in Matobo" and "Guided walks in Hwange": only if at least one lodge on the R1 route offers them. Swap for "Rock art in the Matobo hills" or "A hide at a Hwange waterhole" if not.
- "Boat safaris on the Chobe": only if the four-corners route includes a Kasane lodge that offers them.
- "Border paperwork prepared": depends on the partner set-up (D-03).
- "Someone to call on the road": depends on D-04. If the support line isn't confirmed by launch, remove the headline.
- "Three routes within 48 hours": matches the existing `/plan` promise. If the team can't hold 48 hours at ad volume, change it everywhere at once.
- "Send a brief. It's free": true under D-01 (the brief and first sketch are free). Don't mention the planning fee in ads.

### Ad copy

#### US — Generic self-drive

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
| H8 | Someone to call on the road | 27 |
| H9 | Partners in Victoria Falls | 26 |
| H10 | Three routes within 48 hours | 28 |
| H11 | Send a brief. It's free | 23 |
| H12 | Namibia, Zimbabwe, Botswana | 27 |
| H13 | The drive is half the safari | 28 |
| H14 | Guided mornings, your own car | 29 |
| H15 | Safari Overland | 15 |

| # | Description | Chars |
|---|---|---|
| D1 | Self-drive journeys through southern Africa, staying at camps and lodges, not in tents. | 87 |
| D2 | We draw the route, book the lodges and the vehicle, and stay at the end of the phone. | 85 |
| D3 | Drive times, road surfaces, fuel and border crossings, worked out before you leave. | 83 |
| D4 | Tell us your months and how long you'll drive in a day. Three routes within 48 hours. | 85 |

#### US — Namibia

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
| H9 | Someone to call on the road | 27 |
| H10 | Gravel roads, timed in advance | 30 |
| H11 | Three routes within 48 hours | 28 |
| H12 | Send a brief. It's free | 23 |
| H13 | 14 to 16 nights, or shorter | 27 |
| H14 | Guided drives at the lodges | 27 |
| H15 | Safari Overland | 15 |

| # | Description | Chars |
|---|---|---|
| D1 | Windhoek, the Kalahari, Sossusvlei, the coast, Damaraland and Etosha, in your own car. | 86 |
| D2 | We draw the route, book the lodges and the vehicle, and stay at the end of the phone. | 85 |
| D3 | Drive times and road surfaces in a road book, in print and offline on your phone. | 81 |
| D4 | Tell us your months and how long you'll drive in a day. Three routes within 48 hours. | 85 |

#### US — Zimbabwe

**Final URL:** `/self-drive/zimbabwe`

| # | Headline | Chars |
|---|---|---|
| H1 | Zimbabwe self-drive safari | 26 |
| H2 | Victoria Falls to Hwange | 24 |
| H3 | Hwange, Matobo and the Falls | 28 |
| H4 | Rhino tracking in Matobo | 24 |
| H5 | Lodges, not rooftop tents | 25 |
| H6 | We draw the route for you | 25 |
| H7 | Lodges and vehicle booked | 25 |
| H8 | Your route in a road book | 25 |
| H9 | Partners in Victoria Falls | 26 |
| H10 | Someone to call on the road | 27 |
| H11 | 10 to 12 nights, or shorter | 27 |
| H12 | Three routes within 48 hours | 28 |
| H13 | Send a brief. It's free | 23 |
| H14 | Guided walks in Hwange | 22 |
| H15 | Safari Overland | 15 |

| # | Description | Chars |
|---|---|---|
| D1 | Victoria Falls, Hwange and Matobo in your own car, with guided activities at each camp. | 87 |
| D2 | Partners in Victoria Falls hand over the vehicle, and are there if something goes wrong. | 88 |
| D3 | Drive times, road surfaces, fuel and park gate times, worked out before you leave. | 82 |
| D4 | Tell us your months and how long you'll drive in a day. Three routes within 48 hours. | 85 |

#### US — Four corners (Botswana, Zambia)

**Final URL:** `/self-drive/botswana-zambia`

| # | Headline | Chars |
|---|---|---|
| H1 | Victoria Falls and Chobe | 24 |
| H2 | Chobe, Caprivi and the Falls | 28 |
| H3 | Self-drive from Victoria Falls | 30 |
| H4 | Botswana and Zambia self-drive | 30 |
| H5 | Where four countries meet | 25 |
| H6 | Lodges, not rooftop tents | 25 |
| H7 | We draw the route for you | 25 |
| H8 | Border paperwork prepared | 25 |
| H9 | Partners in Victoria Falls | 26 |
| H10 | Someone to call on the road | 27 |
| H11 | An easy add-on to the Falls | 27 |
| H12 | Three routes within 48 hours | 28 |
| H13 | Send a brief. It's free | 23 |
| H14 | Boat safaris on the Chobe | 25 |
| H15 | Safari Overland | 15 |

| # | Description | Chars |
|---|---|---|
| D1 | Victoria Falls, Chobe and the Zambezi Region in 8 to 10 nights, staying at lodges. | 82 |
| D2 | We prepare the border paperwork. Our partners in Victoria Falls hand over the vehicle. | 86 |
| D3 | We draw the route, book the lodges and the vehicle, and stay at the end of the phone. | 85 |
| D4 | Tell us your months and how long you'll drive in a day. Three routes within 48 hours. | 85 |

#### US — Road trip (test)

**Final URL:** `/routes (Namibia queries: /self-drive/namibia)`

| # | Headline | Chars |
|---|---|---|
| H1 | Southern Africa road trip | 25 |
| H2 | A Namibia road trip, planned | 28 |
| H3 | An African road trip, planned | 29 |
| H4 | A road trip with safari lodges | 30 |
| H5 | Lodges, not rooftop tents | 25 |
| H6 | We draw the route for you | 25 |
| H7 | Lodges and vehicle booked | 25 |
| H8 | Your route in a road book | 25 |
| H9 | Someone to call on the road | 27 |
| H10 | The drive is half the safari | 28 |
| H11 | Zimbabwe, Namibia, Botswana | 27 |
| H12 | Three routes within 48 hours | 28 |
| H13 | Send a brief. It's free | 23 |
| H14 | Gravel roads, timed in advance | 30 |
| H15 | Safari Overland | 15 |

| # | Description | Chars |
|---|---|---|
| D1 | A road trip through southern Africa, with a lodge and a guide at the end of the day. | 84 |
| D2 | We draw the route, book the lodges and the vehicle, and stay at the end of the phone. | 85 |
| D3 | Drive times, road surfaces, fuel and border crossings, worked out before you leave. | 83 |
| D4 | Tell us your months and how long you'll drive in a day. Three routes within 48 hours. | 85 |

#### UK — Generic self-drive

**Final URL:** `/routes`

| # | Headline | Chars |
|---|---|---|
| H1 | Self-drive safari holidays | 26 |
| H2 | Southern Africa self-drive | 26 |
| H3 | Drive yourself, sleep well | 26 |
| H4 | Lodges, not rooftop tents | 25 |
| H5 | We draw the route for you | 25 |
| H6 | We book the lodges and car | 26 |
| H7 | Your route in a road book | 25 |
| H8 | Someone to call on the road | 27 |
| H9 | Partners in Victoria Falls | 26 |
| H10 | Three routes within 48 hours | 28 |
| H11 | Send a brief. It's free | 23 |
| H12 | Namibia, Zimbabwe, Botswana | 27 |
| H13 | Tailor-made self-drive | 22 |
| H14 | The drive is half the safari | 28 |
| H15 | Safari Overland | 15 |

| # | Description | Chars |
|---|---|---|
| D1 | Self-drive holidays in southern Africa, staying at camps and lodges, not in tents. | 82 |
| D2 | We draw the route, book the lodges and the vehicle, and stay at the end of the phone. | 85 |
| D3 | Drive times, road surfaces, fuel and border crossings, worked out before you leave. | 83 |
| D4 | Tell us your months and how long you'll drive in a day. Three routes within 48 hours. | 85 |

#### UK — Namibia

**Final URL:** `/self-drive/namibia`

| # | Headline | Chars |
|---|---|---|
| H1 | Namibia self-drive holiday | 26 |
| H2 | Namibia fly-drive, planned | 26 |
| H3 | Windhoek to Etosha, planned | 27 |
| H4 | Sossusvlei, Damaraland, Etosha | 30 |
| H5 | Lodges, not rooftop tents | 25 |
| H6 | We draw the route for you | 25 |
| H7 | Lodges and car hire booked | 26 |
| H8 | Your route in a road book | 25 |
| H9 | Someone to call on the road | 27 |
| H10 | Gravel roads, timed in advance | 30 |
| H11 | Three routes within 48 hours | 28 |
| H12 | Send a brief. It's free | 23 |
| H13 | 14 to 16 nights, or shorter | 27 |
| H14 | Guided drives at the lodges | 27 |
| H15 | Safari Overland | 15 |

| # | Description | Chars |
|---|---|---|
| D1 | A Namibia self-drive holiday: the Kalahari, Sossusvlei, the coast, Damaraland, Etosha. | 86 |
| D2 | We draw the route, book the lodges and the vehicle, and stay at the end of the phone. | 85 |
| D3 | Drive times and road surfaces in a road book, in print and offline on your phone. | 81 |
| D4 | Tell us your months and how long you'll drive in a day. Three routes within 48 hours. | 85 |

#### UK — Zimbabwe

**Final URL:** `/self-drive/zimbabwe`

| # | Headline | Chars |
|---|---|---|
| H1 | Zimbabwe self-drive holiday | 27 |
| H2 | Victoria Falls to Hwange | 24 |
| H3 | Hwange, Matobo and the Falls | 28 |
| H4 | Rhino tracking in Matobo | 24 |
| H5 | Lodges, not rooftop tents | 25 |
| H6 | We draw the route for you | 25 |
| H7 | Lodges and car hire booked | 26 |
| H8 | Your route in a road book | 25 |
| H9 | Partners in Victoria Falls | 26 |
| H10 | Someone to call on the road | 27 |
| H11 | 10 to 12 nights, or shorter | 27 |
| H12 | Three routes within 48 hours | 28 |
| H13 | Send a brief. It's free | 23 |
| H14 | Guided walks in Hwange | 22 |
| H15 | Safari Overland | 15 |

| # | Description | Chars |
|---|---|---|
| D1 | A Zimbabwe self-drive holiday: Victoria Falls, Hwange and Matobo, staying at lodges. | 84 |
| D2 | Partners in Victoria Falls hand over the vehicle, and are there if something goes wrong. | 88 |
| D3 | Drive times, road surfaces, fuel and park gate times, worked out before you leave. | 82 |
| D4 | Tell us your months and how long you'll drive in a day. Three routes within 48 hours. | 85 |

#### UK — Four corners (Botswana, Zambia)

**Final URL:** `/self-drive/botswana-zambia`

| # | Headline | Chars |
|---|---|---|
| H1 | Victoria Falls and Chobe | 24 |
| H2 | Chobe, Caprivi and the Falls | 28 |
| H3 | Self-drive from Victoria Falls | 30 |
| H4 | Botswana and Zambia self-drive | 30 |
| H5 | Where four countries meet | 25 |
| H6 | Lodges, not rooftop tents | 25 |
| H7 | We draw the route for you | 25 |
| H8 | Border paperwork prepared | 25 |
| H9 | Partners in Victoria Falls | 26 |
| H10 | Someone to call on the road | 27 |
| H11 | An easy add-on to the Falls | 27 |
| H12 | Three routes within 48 hours | 28 |
| H13 | Send a brief. It's free | 23 |
| H14 | Boat safaris on the Chobe | 25 |
| H15 | Safari Overland | 15 |

| # | Description | Chars |
|---|---|---|
| D1 | A short self-drive holiday: Victoria Falls, Chobe and the Zambezi Region, 8 to 10 nights. | 89 |
| D2 | We prepare the border paperwork. Our partners in Victoria Falls hand over the vehicle. | 86 |
| D3 | We draw the route, book the lodges and the vehicle, and stay at the end of the phone. | 85 |
| D4 | Tell us your months and how long you'll drive in a day. Three routes within 48 hours. | 85 |

### Assets (all ad groups)

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
| Support while on the road | 25 |

#### Structured snippet

Header **Destinations**: Namibia · Zimbabwe · Botswana · Zambia · Victoria Falls (each value ≤25).


---

## 5. Landing page mapping

| Ad group | Final URL | What the page must do above the fold |
|---|---|---|
| Generic self-drive (US, UK) | `/routes` | Name the three routes, say "lodges, not tents" in the first screen, and show a brief CTA |
| Namibia (US, UK) | `/self-drive/namibia` | Repeat the query's words ("Namibia self-drive") in the H1 or eyebrow; the R2 route at a glance (nights, drive-day range, road surfaces); one brief CTA |
| Zimbabwe (US, UK) | `/self-drive/zimbabwe` | Same, for R1; name the Victoria Falls partners on the ground |
| Four corners (US, UK) | `/self-drive/botswana-zambia` | Same, for R3; explain the borders plainly |
| Road trip test (US) | `/routes`, or country page by keyword | Same pages. The test is in the ad and the query, not the page |

**Dependencies (outside marketing's files):**

1. The four landing pages are phase-2 builds. **Ads can't launch until they're live on production**, not just the preview.
2. The landing pages' "Start a brief" CTAs need their own `source` values in `StartBriefSource` (`lib/analytics/events.ts`), for example `self-drive-landing` and `routes`, so the dashboard shows which page converts. Today the union has no value for them. Reported for the build team; I haven't changed the file.
3. The brief form should carry the landing page and UTM values (or gclid) into the brief record, so a booking can be traced to a campaign. See §7.
4. Landing pages need `noindex` **off** and should be in the sitemap. They double as the organic pages we don't have yet.

---

## 6. Test plan — "road trip" vs "self-drive" (US only)

**Question:** do American travellers respond better to *road trip* than to *self-drive*, and are the people who search *road trip* worth as much as those who search *self-drive*?

Two separate tests, because they answer different questions:

### Test 1 — Query test (who searches what)

- **Arms:** the Road trip ad group (road-trip keywords, road-trip copy) vs the Generic and country self-drive groups (self-drive keywords, self-drive copy).
- **Measures:** cost per brief submitted, brief-to-call rate, and (once bookings happen) cost per booking. CTR is secondary.
- **What it tells us:** whether road-trip searchers are a different, cheaper or poorer-quality audience.

### Test 2 — Copy test (same searcher, different word)

- **Set-up:** in the US Generic and US Namibia groups, run a Google Ads ad variation (Experiments → Ad variations, find-and-replace "self-drive" → "road trip" in headlines), 50/50 split. If ad variations aren't available for RSAs in the account, run a second RSA in each group with the road-trip headlines and compare at the ad level (less clean, because Google's rotation favours the early winner).
- **Measures:** CTR first (it moves fastest), then brief rate per click.
- **Hold constant:** landing page, descriptions, all other headlines.

### Rules

- **Duration:** at least six weeks, or until each arm has about 1,000 impressions **and** at least 10 briefs, whichever comes later. Stop at 12 weeks regardless.
- **Expect a directional answer, not a significant one.** At launch volumes this test may never reach statistical significance on briefs. Make the call on CTR plus a clear direction in cost per brief, and write the result into this file.
- **Don't** run Test 2 in the UK. UK copy stays *self-drive holiday*.
- **Decision rule:** if *road trip* wins on CTR by a clear margin and cost per brief is no worse, roll *road trip* into US headlines 1–3 and the US landing page H1 tests. If road-trip queries bring cheap clicks and few briefs, keep the copy and cut the Road trip ad group's budget.

---

## 7. Conversion tracking

### What exists today

The site uses **Vercel Web Analytics**, cookieless, no PII (`handoff/ANALYTICS.md`). Relevant events in `lib/analytics/events.ts`:

| Event | Fires when | Use for ads |
|---|---|---|
| `brief-submitted` | `/plan` submission returns 2xx | **Primary conversion: Brief submitted** |
| `calendly-booking-completed` | Calendly posts `calendly.event_scheduled` | **Primary conversion: Planner call booked** |
| `speak-to-planner-click` | Calendly modal opened | Secondary (observation only) |
| `start-brief-click` | Any "Start a brief" CTA clicked | Secondary (observation only) |
| `newsletter-signup` | Dispatch signup succeeds | Secondary (observation only) |

**Vercel Analytics events can't be imported into Google Ads.** Google Ads needs its own signal. There are two ways to give it one. This is a real choice for Dom, because the site is cookieless today and the first option changes that.

### Option A — Google tag with Consent Mode v2 (standard)

- Add the Google tag (gtag.js) and fire two Google Ads conversion actions alongside the existing `track()` calls, at the same two moments: `brief-submitted` and `calendly-booking-completed`. The cleanest place is inside `lib/analytics/track.ts`, so the two systems can't drift. That file is outside marketing's scope; this is a recommendation for the build team.
- The Google tag uses cookies. For UK visitors this needs a consent banner, and Google requires **Consent Mode v2** for advertisers using Google Ads measurement and remarketing with UK and EEA users (in force since March 2024, per [Usercentrics](https://usercentrics.com/us/resources/google-consent-mode-gcm-checklist/?output_format=md) and [Cardinal Path](https://www.cardinalpath.com/blog/navigating-changes-to-google-consent-mode); I couldn't reach Google's own help page to confirm the exact terms). Without consent, UK conversions are modelled or lost.
- The privacy policy and ANALYTICS.md ("No cookies") would both need to change.
- **Pro:** standard, real-time, feeds smart bidding properly. **Con:** a cookie banner on an editorial site, and a change to a stated privacy principle.

### Option B — Cookieless capture and offline import (recommended to start)

- The landing page reads `gclid` and the UTM values from the URL and passes them through the brief form into the `briefs` row (new nullable columns; a migration, outside marketing's scope).
- Weekly, upload briefs and planner calls that carry a gclid to Google Ads as offline conversions (CSV upload in the UI at our volume; Google's API or a Zapier connector later). Google's offline import matches on gclid, conversion name and conversion time ([Google Ads Help](https://support.google.com/adwords/answer/6179720), [Relevant Audience](https://www.relevantaudience.com/google-ads-en/google-ads-offline-conversion-import-guide/)).
- Later, upload **"Booking confirmed"** as a third offline conversion with its real value. This is the signal that matters most, and only Option B (or A plus B) can send it.
- **Caveats (unverified, check before building):** one third-party guide says Google now calls gclid-only import "legacy" and steers new advertisers to *enhanced conversions for leads*, which normally needs the Google tag ([Relevant Audience](https://www.relevantaudience.com/google-ads-en/google-ads-offline-conversion-import-guide/)). Another says clicks older than 90 days can't be uploaded against. A gclid stored against a named brief is personal data in the UK, so it needs to be covered in the privacy policy. Get a view on that as part of D-09.
- **Pro:** keeps the site cookieless; measures bookings, not just form fills. **Con:** conversions arrive days late, so smart bidding learns more slowly; there's a weekly manual task.

### Conversion actions to create (either option)

| Conversion action | Source event | Category | Primary? | Count | Value (placeholder) | Window |
|---|---|---|---|---|---|---|
| Brief submitted | `brief-submitted` | Submit lead form | Yes | One | [Value — Dom to confirm], suggest a relative value of 1 | 90 days click-through |
| Planner call booked | `calendly-booking-completed` | Book appointment | Yes | One | [Value — Dom to confirm], suggest about 3× a brief | 90 days |
| Booking confirmed (offline, later) | Manual / CRM | Purchase | Yes, once live | One | Actual margin + planning fee | 90 days (maximum available) |
| Start brief click | `start-brief-click` | Other | No (observation) | One | — | 30 days |
| Speak to planner click | `speak-to-planner-click` | Other | No (observation) | One | — | 30 days |

90-day windows because this is a long-consideration purchase (§9).

**Source parameters:** `calendly-booking-completed` and `speak-to-planner-click` carry a `source` limited to `home | plan | plan-sent | listing-detail | field-notes`. If the landing pages get a "Speak to a planner" button, `SpeakToPlannerSource` needs a new value too. Reported for the build team.

---

## 8. Budget

**[Monthly budget — Dom to confirm]**

### Recommended starting range

| Market | Recommended start | Share |
|---|---|---|
| US (incl. Canada) | US$1,400–2,400 per month | ~70% |
| UK | US$600–1,000 per month (about £470–790 at roughly 1.27 $/£, rate unverified, check on the day) | ~30% |
| **Total** | **US$2,000–3,400 per month** for the first three months | |

Optional brand campaign: cap at US$100 per month.

### Reasoning

- **CPC assumptions are estimates, not facts.** The published 2025 benchmark for "travel" ranges from US$0.25 ([Pixis, ~100 brands](https://pixis.ai/blog/2025-google-advertising-benchmarks-for-every-industry/)) to US$2.12 ([Search Engine Land](https://searchengineland.com/google-ads-costs-rise-again-but-conversions-improve-report-455663)). Both are cross-travel averages that include hotels and flights, and neither describes high-value tailor-made safari queries. **My working estimate for our keywords is US$2–6 per click in the US and £1.50–4.50 in the UK, and it is a guess** based on the price of the trip (US$4,000–7,000+ per person at competitors, see `COMPETITORS.md`) and the number of specialists bidding. Replace it with Keyword Planner's top-of-page bid ranges before launch.
- **Clicks the range buys:** at US$2–6, US$2,000–3,400 buys roughly 330–1,700 clicks a month across both markets. That's a wide band, which is why the CPC check matters.
- **Briefs it might produce:** assuming 2–5% of clicks submit a brief (my estimate, unverified for this site; it has no paid history), that's roughly 7–85 briefs a month. The midpoint, around 20–30, is enough to read the road-trip test directionally and to move to smart bidding by month two or three.
- **What a booking is worth (internal, rough, unverified):** a 12-night trip for two at US$300–400 per person per night is US$7,200–9,600 of lodge spend, plus the vehicle. Lodge margin and vehicle commission depend on contracts we haven't seen. Add the US$250 planning fee (D-01). Even a modest margin makes an acquisition cost of several hundred dollars per *booking* affordable, but that only holds if briefs convert to bookings at a reasonable rate. **We'll know the real figure after the first 20–30 briefs. Set the month-four budget from that, not from this paragraph.**
- **Why not lower:** below about US$1,500 a month in total, the four ad groups per market each get too few clicks to learn anything in a quarter, and the test is meaningless.
- **Why not higher:** the landing pages, the brief form and the 48-hour reply are untested at volume. Spend more once the funnel is shown to hold.
- **Split:** US-first per STRATEGY §1; US impressions in Search Console are almost three times the UK's. The UK gets enough to learn, not to scale. The UK may also convert worse at first, because UK competitors show ATOL and ABTA protection and we can't yet (see `COMPETITORS.md`, D-09).

### Within-market split at launch

| Ad group | Share of market budget |
|---|---|
| Namibia | 40% |
| Generic self-drive | 25% |
| Zimbabwe | 15% (spend will be capped by volume anyway) |
| Four corners | 10% |
| Road trip (US only; UK re-allocates this to Namibia) | 10% |

Ad groups share a campaign budget, so these are steering targets, set through bids, not hard caps. If a group needs a guaranteed share, split it into its own campaign.

---

## 9. Seasonality and timing

### When people travel

The dry winter months are peak season for Namibia. Guides put it at July to October or June to September depending on the source ([Wild Wings Safaris](https://wild-wings-safaris.com/travel-guide-calendars/when-to-visit-namibia), [Rough Guides](https://www.roughguides.com/destinations/africa/namibia/when-to-go)). I'm assuming the same broadly holds for Hwange, Chobe and the Zambezi Region; the research team should confirm. One operator also names April, October and November as shoulder months worth selling.

### When they book July–October trips

Industry guidance is consistent that peak-season southern Africa trips are booked **9 to 18 months ahead**:

- 12–18 months for peak-season Botswana and premier camps ([Rhino Africa](https://blog.rhinoafrica.com/2026/07/23/how-far-in-advance-should-i-book-my-african-safari/), [Secret Africa](https://secretafrica.com/when-should-i-book-my-african-safari/)).
- 9–12 months for most standard East or southern African safaris ([Holidify](https://holidify.com/pages/how-far-in-advance-to-book-african-safari-6938.html)).
- Some South African and Botswana lodges confirm July and August a year or more ahead ([Africa Geographic](https://travel-origin.africageographic.com/experiences/honeymoon-safaris/honeymoon-safari-booking-timeline)).

These are operators' marketing blogs, so treat them as industry convention, not data. Mid-range, road-accessible lodges (our band, US$150–600 per person per night) probably fill later than the premier fly-in camps the sources describe. That's my inference, unverified.

I couldn't find a US vs UK breakdown of booking lead times. **Widely repeated but unsourced here:** UK holiday booking concentrates in January ("peak booking season" after New Year), and US travellers plan international trips somewhat later. Treat both as hypotheses to check in our own data, not plan assumptions.

### What that means for the calendar

Today is 2026-11-09. Travellers booking July–October **2027** are in their booking window now and through roughly March 2027.

| Period | US | UK | Message emphasis |
|---|---|---|---|
| Launch (once landing pages are live; target late Nov / early Dec 2026) | Full recommended budget | Full recommended budget | 2027 dry season: "July to October 2027 — the small camps fill first" (on landing pages, not as a pressure line in ads) |
| 20 Dec – 1 Jan | Reduce ~30% | Reduce ~30% | Low intent over the holidays (assumption; check the data) |
| Jan – Mar 2027 | Full, consider +20% if cost per brief is in line | Full, consider +30% (if the January hypothesis shows in the data) | 2027 peak season; last good availability |
| Apr – Jun 2027 | Hold or trim | Hold or trim | Late 2027 bookers, shoulder months (Oct–Nov 2027) |
| Jul – Sep 2027 | Hold | Hold | Switch to **2028** dry season; people on the road now are next year's referrals |
| Oct – Dec 2027 | Full | Full | 2028 dry season |

Ad copy doesn't name a year, so it doesn't need rewriting at the switch. Landing pages and sitelinks do.

---

## 10. Launch checklist (in order)

1. Dom confirms budget, conversion option (A or B), and the claims in §4.
2. Landing pages live on production; `curl -I` each one.
3. Conversion actions created; test conversions recorded from a test brief and a test Calendly booking (on production, tagged so they're excluded from reporting).
4. Keyword Planner pull: volumes and top-of-page bid ranges recorded in §11; drop keywords with no volume, adjust CPC caps.
5. Shared negative lists A and B attached to both campaigns before any ad goes live.
6. Campaigns built paused; Dom reviews in the UI; then enabled.
7. Search terms report twice a week for four weeks.
8. Week-four review: CPCs vs estimate, brief rate, first read of the road-trip test, negative-list additions.

---

## 11. To fill in after the Keyword Planner pull

| Keyword | US avg monthly searches | UK avg monthly searches | US top-of-page bid (low–high) | UK top-of-page bid (low–high) |
|---|---|---|---|---|
| self drive safari | | | | |
| namibia self drive | | | | |
| zimbabwe self drive | | | | |
| victoria falls and hwange | | | | |
| chobe self drive | | | | |
| southern africa road trip | | | | |
| namibia road trip | | | | |

---

## Sources

- Search Console figures: supplied in the brief, 12 months to 2026-11-09.
- Responsible Travel, Namibia self-drive guide — https://www.responsibletravel.com/holidays/namibia/travel-guide/self-drive-holidays-in-namibia
- Rainbow Tours, Classic Namibia self-drive — https://www.rainbowtours.co.uk/tours/africa/classic-namibia-selfdrive-holiday
- Wexas, Best of Namibia self-drive — https://wexas.com/itinerary-offers/best-of-namibia-self-drive-102490
- Eshores, Namibia explorer self-drive — https://www.eshores.co.uk/holidays/safaris/namibia-explorer-self-drive-safari/
- On The Go Tours, Etosha self-drive — https://www.onthegotours.com/uk/Namibia/Etosha-Wildlife-Exploration-SelfDrive-5-days
- Far and Wild, Classic Zimbabwe self-drive — https://farandwild.travel/africa/zimbabwe/zimbabwe-encounter
- Wild Foot Travel, Zimbabwe and Botswana self-drive — https://www.wildfoottravel.com/itinerary/4170/zimbabwe-botswana-self-drive-16-days (page returned 403 to my fetch; listed from search results only)
- Pixis, 2025 Google advertising benchmarks — https://pixis.ai/blog/2025-google-advertising-benchmarks-for-every-industry/
- Search Engine Land, Google Ads costs 2025 — https://searchengineland.com/google-ads-costs-rise-again-but-conversions-improve-report-455663
- Usercentrics, Consent Mode checklist — https://usercentrics.com/us/resources/google-consent-mode-gcm-checklist/?output_format=md
- Cardinal Path, Consent Mode changes — https://www.cardinalpath.com/blog/navigating-changes-to-google-consent-mode
- Google Ads Help, offline conversion import — https://support.google.com/adwords/answer/6179720
- Relevant Audience, gclid import vs enhanced conversions for leads — https://www.relevantaudience.com/google-ads-en/google-ads-offline-conversion-import-guide/
- Rhino Africa, booking lead times — https://blog.rhinoafrica.com/2026/07/23/how-far-in-advance-should-i-book-my-african-safari/
- Secret Africa, booking lead times — https://secretafrica.com/when-should-i-book-my-african-safari/
- Holidify, booking lead times — https://holidify.com/pages/how-far-in-advance-to-book-african-safari-6938.html
- Africa Geographic, booking timeline — https://travel-origin.africageographic.com/experiences/honeymoon-safaris/honeymoon-safari-booking-timeline
- Wild Wings Safaris, when to visit Namibia — https://wild-wings-safaris.com/travel-guide-calendars/when-to-visit-namibia
- Rough Guides, when to go to Namibia — https://www.roughguides.com/destinations/africa/namibia/when-to-go

---

## Decisions for Dom

1. **Monthly budget.** Recommended US$2,000–3,400 total for the first three months, ~70% US / ~30% UK. Confirm a figure, or a cap.
2. **Conversion tracking: Option A (Google tag, cookie banner, Consent Mode v2) or Option B (cookieless gclid capture plus weekly offline upload).** I recommend B to start, which keeps the site's no-cookie principle, then revisit at month three. Either option needs build work outside marketing's files: `lib/analytics/track.ts` (A), or a `briefs` migration plus form changes (B).
3. **Conversion values.** Placeholders: brief = 1, planner call = 3. Confirm, or give real numbers once margins are known.
4. **Ad claims to confirm:** support line (D-04), border paperwork (D-03), rhino tracking in Matobo, guided walks in Hwange, boat safaris on the Chobe, and that the 48-hour promise holds at ad volume.
5. **Brand campaign** (exact "safari overland", ≤US$100/month): yes or no. It protects the name cheaply, but organic brand clicks are already ours, so it's optional.
6. **Competitor brand terms:** I recommend we don't bid on competitors' names (off-voice, and expensive). Confirm.
7. **Launch date.** Ads wait for the four landing pages to be live on production. Target late November or early December 2026 to catch the 2027 dry-season booking window.
8. **Who runs the account day to day** (search terms twice a week for the first month, a weekly offline upload under Option B). Is that Dom or someone else?
9. **Canada:** inside the US campaign as a separate location row (recommended), or its own campaign?
10. **UK trust gap:** UK competitors display ATOL/ABTA protection. Until D-09 is settled, expect weaker UK conversion. Factor that into whether the UK starts at the same time as the US or a month later.
11. **New analytics `source` values** for the landing pages (`StartBriefSource`, and `SpeakToPlannerSource` if a planner button is added). This is a build-team change to `lib/analytics/events.ts`.
