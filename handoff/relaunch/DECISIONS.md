# Decisions for Dom — before the relaunch goes live

Everything here has a working placeholder, so the relaunch built around it. Nothing here blocks local review. Each item needs a yes, or a replacement value, before anything is pushed to the live site.

| ID | Decision | Working placeholder | Where it shows |
|---|---|---|---|
| D-01 | Planning fee amount and terms | US$250 per trip, credited in full against the booking; not shown on the site yet | Internal only (STRATEGY §2) |
| D-02 | Names of the DMC partners on the ground | "Our partners in Victoria Falls"; Windhoek and Maun not named until signed | Homepage offer, About, route pages |
| D-03 | Vehicle rental partner(s) | Unnamed — "a vehicle matched to the roads" | Route pages, the offer |
| D-04 | Support line: hours, channel, whether a number is published | "A person you can call while you're on the road" — no number shown | Homepage, route pages |
| D-05 | Instagram handle — `safari_overland` (JSON-LD) or `safarioverland` (CLAUDE.md) | Footer link left on `safari_overland`, matching the live JSON-LD | Footer, JSON-LD |
| D-06 | `/submit` (operator submission form) — keep or retire | Kept, unlinked | — |
| D-07 | Off-region Field Notes (Egypt, Morocco, Ghana, Kenya, Tanzania, gorillas…) — redirect, keep unlinked, or rewrite | Kept live but unlinked from navigation | Field Notes |
| D-08 | Re-tiering existing listings against the new budget bands | Unchanged | Brief form budget step |
| D-09 | Regulatory advice — US seller-of-travel registration / UK Package Travel Regulations | Not yet taken; required before the first paid booking | Terms of service |
| D-10 | Approval of all new user-facing copy (voice is yours) | Draft copy built in, for review on the local preview | Whole site |

| D-11 | Publish a "from US$X" price per route | Placeholder `[US$X]` until route costing is checked | Route detail pages |
| D-12 | Publish the US$150–600 per night target band on About | Bracketed placeholder | About |
| D-13 | One-line bio for Niels van de Meer | `[One-line bio for Niels.]` | About |
| D-14 | Say on About that the brief and first sketch are free, and in general terms who pays us | Included; a shorter fallback line is in SITE_COPY.md | About |
| D-15 | Promise an automatic gearbox on request (depends on the vehicle partner) | Copy says "on request" | Homepage "Can I do this?", Field Notes |
| D-16 | Apply the briefs migration (`20261109_briefs_self_drive_fields.sql`) to production at go-live | Not applied; the API falls back without the new fields | — |

| D-17 | **Live bug, possibly now:** briefs choosing "I'd rather discuss this on a call" probably fail to save, because the database CHECK doesn't allow `discuss`. Fix is in the D-16 migration. Check production with the query in that file. | Fix written, not applied | /plan on the live site |
| D-18 | Navigation collapses to the menu below 1280px instead of 1024px, so six items fit | Accepted for review | Header |
| D-19 | Old briefs in the admin now show the new budget bands (an old "budget" brief reads "Up to $250") | Accepted — internal only | Admin |

| D-20 | Sossusvlei: can self-drivers currently drive the last sand stretch to Deadvlei? (A May 2026 ban was announced, then reportedly reversed) | Copy says the rule has changed and the road book carries the current one | Field Notes, Namibia route |
| D-21 | What the guides promise: border charges per post in the road book, an offline phone version, and partner handover of the vehicle — while partners exist only in Victoria Falls | Promised as written | Field Notes |
| D-22 | Editorial line: "Namibia or Zimbabwe first" recommends Zimbabwe for most first-timers (Namibia is the commercial engine) | Zimbabwe-first, with the Victoria Falls bias stated openly | Field Notes |
| D-23 | Manually check the International Driving Permit wording for US travellers (the State Department site blocked fetches; the copy relies on AAA) | Advisory wording | Field Notes |
| D-24 | Zimbabwe police equipment rules for rental cars (triangles, extinguisher) — sources conflict; ask the Victoria Falls partners | Left out of the copy | Field Notes |

| D-25 | Namibia night 1, near Windhoek | Chief of staff choice: a guest farm near the airport (Etango Ranch, rate unconfirmed), listed as "on the road" | Namibia route |
| D-26 | Swakopmund: town hotels (The Delight, Strand) listed as "on the road", with the Living Desert tour as the guided part | Accepted as working choice | Namibia route |
| D-27 | Alternatives priced above US$600 (Damaraland Camp, Kulala, Okonjima Bush Camp) | Kept, labelled "a step up" | Namibia route |
| D-28 | Confirm the Grootberg rate basis (per room or per person) and the rhino-tracking price | Rate shown as "from, to be confirmed" | Namibia route |
| D-29 | Verify the estimated drive distances (Namibia days 3, 7, 10, 14) before any road book is printed | Shown as ranges and estimates | Namibia route |

| D-30 | Google Ads monthly budget and launch date | Recommended US$2,000–3,400/month for three months, about 70% US and Canada, 30% UK; launch as soon as the landing pages are live | marketing/PAID_SEARCH_PLAN.md |
| D-31 | Conversion tracking: A (Google tag, cookies, UK consent banner) or B (store the click ID on the brief, upload offline conversions) | B recommended — needs a small form and migration change later | Ads, /plan |
| D-32 | Planning fee vs competitors who advertise free consultations | Keep the brief and first route sketch free; the fee applies only at the road-book stage (D-01) | Offer |
| D-33 | Image rights: origin and licence of `public/images/about/*.jpg` (they look composited), and a photographer for new route imagery | Used on the local preview only; not for social until confirmed. Never use `public/rentals.jpg` (rooftop tent) | Homepage, routes, social |
| D-34 | UK launch before ATOL/ABTA/package-travel advice (D-09) is settled | Hold paid UK campaigns until D-09 | Ads |
| D-35 | Email: postal address, reply-to inbox, sending tool for the nurture sequence, consent wording | Placeholders in marketing/EMAIL_LAUNCH.md | Email |
| D-36 | Retire `handoff/SOCIAL_LAUNCH_QUEUE.md` ("No commission. No markup." is no longer true) and update SOCIAL_PLAYBOOK.md (Niels is not "founder") | Superseded by marketing/SOCIAL_RELAUNCH.md | Social |

| D-37 | Four corners: no car in Zimbabwe — collect and return it in Kasane (avoids an unconfirmed Zimbabwe hire-car import rule; needs a Kasane partner, and ZIMRA confirmation if we ever drive a rental into Zimbabwe) | Working choice | Four corners route |
| D-38 | Four corners: the Okavango panhandle as an optional "add two nights" extension; 8-night default via Nkasa Rupara | Working choice | Four corners route |
| D-39 | Chobe riverfront has nothing under ~US$430: keep Chobe Game Lodge as a declared "step up", and Chobe Safari Lodge (107 rooms) as the in-town option | Kept, tagged | Four corners route |
| D-40 | Four corners stays to verify before going live: Nunda (no rate or ownership found), Divava (ownership), Muchenje and Chobe Game Lodge (self-drive arrival), Nambwa (2026 rates); unpublished leg distances (Ngoma–Katima, Kongola–Divundu, Divundu–Ngoma) | Shown with "rate on request" / "arrival by arrangement" | Four corners route |

| D-41 | Zimbabwe route: end in Bulawayo (one-way rental — no supplier has confirmed one yet) or loop back to the Falls (+2 nights) | End in Bulawayo; loop shown as a variant; ask the Victoria Falls partners about one-way drops | Zimbabwe route |
| D-42 | Deep Hwange: The Hide (self-drive 4×4, in band) primary; Davison's as the "hand over the keys" step-up; ask Imvelo about secure parking at Halfway House for Camelthorn | Working choice | Zimbabwe route |
| D-43 | Before publishing Zimbabwe figures: open the ZimParks 2026 tariff PDF and The Hide's rate card; confirm Ilala and Travellers' Guest House rates; Hwange–Bulawayo drive time (est. 6–8 h) | Rates on request / no fees printed | Zimbabwe route |
| D-44 | The existing live listings Linkwasha and Somalisa are private Hwange concessions self-drivers can't drive into — keep in the collection (as fly-in "set pieces") or retire | Unchanged for now; collection review comes next phase | The collection |
| D-45 | Lodge photographs: none of the ~45 new stays has a licensed image; cards are typographic until lodges supply images | Typographic cards | Route pages |

Further entries are added as the team reports them.
