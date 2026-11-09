/**
 * Editorial layer for the route pages.
 *
 * The research records (lib/relaunch/data/*.json) are kept verbatim and
 * are written for the team, not for travellers: they carry source notes,
 * "unverified" flags, rate bases and cautions. This file decides what a
 * traveller sees, and is where the chief of staff's decisions for each
 * route are applied (handoff/relaunch/DECISIONS.md D-20 to D-29 and the
 * R1/R3 integration notes).
 *
 * The day notes, facts and "Before you go" text below are condensed
 * from the research by the build team. They are draft copy for Dom's
 * review (D-10), not the copywriter's deck.
 *
 * Rules that apply everywhere (STRATEGY §5):
 *  - Rates are indicative, "from", with a year; null is "rate on request".
 *  - Drive times are ranges with the road surface named; estimates say so.
 *  - No rental company, DMC or person is named.
 *  - No park-fee or border-charge amounts: the road book carries them.
 */

import type { RouteDetail, RouteStay } from "./routes"
import { collectRouteSources, getRouteDetail, getRouteSummary } from "./routes"

// ─── Types ───────────────────────────────────────────────────────

type DayEdit = {
  /** Matches RouteDay.days in the research record. */
  key: string
  from: string
  to: string
  drive?: string
  distance?: string
  surface?: string
  /** A day with no driving: rendered with the deck's "No driving" label. */
  noDriving?: boolean
  /** Drive time or distance is an estimate, not a sourced figure. */
  estimate?: boolean
  notes: string
  /** Overrides the research stay slug; null = no stay (departure). */
  staySlug?: string | null
  altStaySlugs?: string[]
  /** Optional extension: shown visually distinct, with this label. */
  optional?: string
}

type StayEdit = {
  stepUp?: boolean
  accessLabel?: string
  rateOnRequest?: boolean
  /** Appended to the rate line, e.g. "to be confirmed". */
  rateNote?: string
  unverified?: boolean
  setsItApart?: string
  whyWeListIt?: string
  activities?: string[]
}

type Fact = { label: string; value: string; note?: string }

export type BeforeYouGoItem = {
  heading: string
  body: string
  /** Optional link to a Field Note. */
  link?: { href: string; label: string }
}

export type BorderView = {
  name: string
  between: string
  hours: string
  notes: string
}

type RouteEditorial = {
  /** Short route name for the meta title pattern (deck §4.3). */
  metaName: string
  /** Places for the meta description pattern (deck §4.3). */
  metaPlaces: string
  heroAlt: string
  headline: { lead: string; accent: string; tail: string }
  facts: Fact[]
  days: DayEdit[]
  stays: Record<string, StayEdit>
  /** Stays the research doesn't hold (chief-of-staff additions). */
  extraStays?: RouteStay[]
  /** On-the-road stops that are not overnights, with the day they fall on. */
  stops?: { slug: string; dayKey: string }[]
  borders?: { lede: string; posts: BorderView[] }
  beforeYouGo: BeforeYouGoItem[]
  variants: string[]
  /** Self-drive Field Notes slugs (lib/field-notes/self-drive-notes.ts). */
  fieldNotes: string[]
}

// ─── Shared copy ─────────────────────────────────────────────────

const SIGNAL: BeforeYouGoItem = {
  heading: "Signal",
  body: "Mobile signal is good in towns and thin or absent between them, and in most parks. The road book works offline on your phone, and in print, because signal runs out before the road does.",
  link: { href: "/field-notes/self-drive/fuel-cash-and-signal", label: "Fuel, cash and signal →" },
}

// ─── R1 Zimbabwe ─────────────────────────────────────────────────

const ZIMBABWE: RouteEditorial = {
  metaName: "Falls, Hwange, Matobo",
  metaPlaces: "Victoria Falls, Hwange and the Matobo Hills",
  heroAlt: "Victoria Falls and the Batoka Gorge, with elephants on the rim",
  headline: { lead: "Victoria Falls, Hwange and the", accent: "Matobo", tail: "." },
  facts: [
    { label: "Nights", value: "About 10–12" },
    { label: "Countries", value: "Zimbabwe" },
    { label: "Starts", value: "Victoria Falls" },
    {
      label: "Ends",
      value: "Bulawayo, flying out",
      note: "One-way vehicle drop arranged where possible, or loop back to the Falls.",
    },
    {
      label: "Longest drive",
      value: "6–8 hours, tar (estimate)",
      note: "Hwange to Bulawayo on the A8.",
    },
    { label: "Best months", value: "May to October" },
    { label: "Vehicle", value: "High-clearance 4×4" },
  ],
  days: [
    {
      key: "1–2",
      from: "Victoria Falls airport",
      to: "Victoria Falls",
      drive: "About 30 minutes",
      distance: "About 20 km",
      surface: "Tar",
      estimate: true,
      notes:
        "Collect the vehicle at the airport. Two nights: the Rainforest walk at the Falls, the one o'clock vulture feeding at Victoria Falls Safari Lodge, and a sunset on the upper Zambezi. Stock up on US dollars in small notes and on groceries in town, and fill the tank before you leave.",
    },
    {
      key: "3–4",
      from: "Victoria Falls",
      to: "Ivory Lodge, eastern Hwange",
      drive: "2.5–4.5 hours",
      distance: "About 175–180 km",
      surface: "Tar on the A8, potholed in places; the last 2.5–3 km is dirt, 4×4 recommended",
      notes:
        "Leave mid-morning so the drive is done well before dark; the A8 is not a road for night driving. Hwange Safari Lodge, just before the Main Camp gate, serves lunch to passing travellers, and the Painted Dog Conservation centre at Dete is a short detour. Park fees and two guided activities a day are in Ivory Lodge's rate, so the first game drives go in the lodge's vehicle.",
    },
    {
      key: "5–7",
      from: "Ivory Lodge",
      to: "The Hide, Hwange's eastern boundary",
      drive: "1.5–2 hours",
      distance: "About 55–60 km",
      surface: "Tar to Main Camp, then about 32 km of dirt; 4×4 required",
      estimate: true,
      notes:
        "Enter Hwange at Main Camp and pay the park fees at reception. If you'd rather not drive the dirt, The Hide will collect you from Main Camp. Three nights there means one can be spent in Dove's Nest, the treehouse sleep-out, when it's free. For Davison's Camp instead, leave the car under guard at Ngweshla picnic site by one o'clock and the camp's vehicle takes you in.",
    },
    {
      key: "8",
      from: "The Hide",
      to: "Bulawayo",
      drive: "6–8 hours",
      distance: "About 340 km",
      surface: "Dirt to Main Camp, then tar on the A8, with slow, damaged sections",
      estimate: true,
      notes:
        "The long day. Leave after breakfast rather than after the morning drive, fill up at Hwange or Dete before the A8, and be in Bulawayo before dark. Stock up at a Bulawayo supermarket for the Matobo.",
    },
    {
      key: "9–11",
      from: "Bulawayo",
      to: "The Matobo Hills",
      drive: "45 minutes to an hour",
      distance: "About 45 km",
      surface: "Tar",
      notes:
        "Three nights: rhino tracking on foot with a licensed guide, San rock art in the caves, and the view from World's View. In the dry season you can drive the park's gravel roads yourself; leave Whovi Game Park and the remoter tracks to a guided drive unless you're in a 4×4.",
    },
    {
      key: "12",
      from: "The Matobo Hills",
      to: "Bulawayo airport",
      drive: "About an hour",
      distance: "About 45–60 km",
      surface: "Tar",
      notes:
        "Fly out from Bulawayo. A one-way vehicle drop is arranged where possible; where it isn't, the route loops back to the Falls with a night in Hwange.",
      staySlug: null,
    },
  ],
  stays: {
    "victoria-falls-safari-lodge": {
      activities: ["Vulture Culture feeding, daily at one o'clock", "Falls and river activities, booked through the lodge"],
    },
    "ilala-lodge": {
      rateOnRequest: true,
      unverified: true,
      setsItApart: "A town hotel near the Falls.",
      whyWeListIt:
        "A town hotel close enough to the Rainforest to walk, for travellers who want the Falls at first light without a transfer.",
    },
    "the-elephant-camp": { stepUp: true },
    "the-hide": { accessLabel: "4×4 only, or a transfer from Main Camp" },
    "davisons-camp": { stepUp: true, accessLabel: "Park and transfer: hand over the keys" },
    // Research: parking at Halfway House unconfirmed; "do not sell as
    // park-and-transfer until Imvelo confirms" (D-42).
    "camelthorn-lodge": { accessLabel: "Park-and-transfer, by arrangement", unverified: true },
    "bulawayo-club": {
      rateOnRequest: true,
      setsItApart: "A members' club in the city centre, with a library, a garden and fifteen en-suite rooms.",
      whyWeListIt:
        "After a day on the A8, a quiet room in the city centre with a library and a garden. It is well under our usual price, and that is the point of a night on the road.",
      activities: [],
    },
    "travellers-guest-house-bulawayo": { rateOnRequest: true },
    // Research sets_it_apart has the lounge, not a bar, round the boulder.
    "big-cave-camp": {
      whyWeListIt:
        "Owner-run, ten chalets on a whaleback of granite, with the lounge built round a boulder and trees coming up through the thatch. Rhino tracking in the park goes out with licensed guides, at a lower price than Amalinda.",
    },
  },
  beforeYouGo: [
    {
      heading: "The road",
      body: "Most of the driving is on the A8 between Victoria Falls and Bulawayo, and much of it is badly potholed. Repairs began in 2025, stalled, and were due to restart in the second half of 2026; some sections are slow going at 20–30 km/h. Conditions change month to month, so the road book carries the date it was last checked. A high-clearance 4×4, and no driving after dark.",
    },
    {
      heading: "Licence and permits",
      body: "Bring your licence and an International Driving Permit. Expect police roadblocks: keep the vehicle papers and your licence to hand, check the rental's safety kit at handover, and ask for an official receipt for any fine.",
      link: { href: "/field-notes/self-drive/driving-on-the-left", label: "Driving on the left →" },
    },
    {
      heading: "Borders on this route",
      body: "None. You arrive at Victoria Falls and fly out from Bulawayo. Join the route to the four corners and the Botswana crossing applies: you return this vehicle first, cross at Kazungula as a passenger, and collect another in Kasane.",
    },
    {
      heading: "Money and fuel",
      body: "Zimbabwe runs on US dollars. Bring enough cash in small notes for fuel, park fees and tips: cash can be short and cards don't always work. Fill up in Victoria Falls, Hwange or Dete, and Bulawayo, and don't count on fuel inside the park.",
    },
    {
      heading: "Park gates and fees",
      body: "Hwange's gates open at about 06:00 and close at about 18:00; be at your camp before dark. Park fees are paid at Main Camp or through your lodge, and the road book carries the current ones.",
    },
    SIGNAL,
    {
      heading: "When to go",
      body: "May to October, the dry season, when game gathers at Hwange's pumped waterholes and walking is at its best. Try not to drive the A8 between December and March, when the rains make a damaged road worse.",
    },
  ],
  variants: [
    "Loop back to the Falls (+2 nights, a night in Hwange): from the Matobo back up the A8, with a night at Ivory Lodge or Hwange Safari Lodge, and the vehicle returned where you collected it.",
    "The Imvelo version of Hwange: swap The Hide for Camelthorn Lodge, and meet the guide at Halfway House on the A8, which is on the way to Bulawayo.",
    "Hand over the keys: leave the car under guard at Ngweshla and spend the deep-Hwange nights at Davison's Camp, with the camp's guides.",
    "Shorter, at 8–9 nights: the Falls two, Hwange three at one camp, Bulawayo one, the Matobo two.",
    "Falls, both ways: join the four corners, through Chobe and the Zambezi Region, before or after this route. The Zimbabwe vehicle stays in Zimbabwe and is returned before you cross at Kazungula; the four-corners vehicle is collected in Kasane.",
  ],
  fieldNotes: [
    "namibia-or-zimbabwe-first",
    "driving-on-the-left",
    "after-dark-and-wildlife-on-the-road",
    "fuel-cash-and-signal",
  ],
}

// ─── R2 Namibia ──────────────────────────────────────────────────

const NAMIBIA: RouteEditorial = {
  metaName: "Kalahari to Etosha",
  metaPlaces: "the Kalahari, Sossusvlei, Swakopmund, Damaraland and Etosha",
  heroAlt: "Dead camel thorn trees on the white pan at Deadvlei, below a red dune",
  headline: { lead: "The Kalahari to", accent: "Etosha", tail: "." },
  facts: [
    { label: "Nights", value: "About 14–16" },
    { label: "Countries", value: "Namibia" },
    { label: "Starts", value: "Windhoek" },
    { label: "Ends", value: "Windhoek" },
    {
      label: "Longest drive",
      value: "6–7 hours with stops, tar then gravel",
      note: "Swakopmund to Twyfelfontein.",
    },
    { label: "Best months", value: "May to October" },
    { label: "Vehicle", value: "High-clearance 4×4" },
  ],
  extraStays: [
    {
      slug: "etango-ranch-guest-farm",
      name: "Etango Ranch Guest Farm",
      area: "Near Hosea Kutako International Airport, east of Windhoek",
      country: "Namibia",
      lat: null,
      lng: null,
      type: "on-the-road",
      self_drive_access: "drive-in",
      access_notes: "About ten minutes from the airport, per an aggregator (unverified).",
      nightly_from_usd: null,
      rate_year: "unverified",
      rate_basis: "Per-room figure seen on an undated aggregator listing; not used. Rate on request.",
      sets_it_apart: "A guest farm close to the airport, for the first night.",
      guided_activities: [],
      ownership: "unverified",
      why_we_list_it:
        "The first night, close to the airport, so the first drive after a long flight is a short one. We're still checking it.",
      cautions: "Chief-of-staff working choice (D-25). Not yet researched against STRATEGY §4.",
      sources: [],
    },
  ],
  days: [
    {
      key: "1",
      from: "Hosea Kutako airport",
      to: "Near Windhoek",
      drive: "About 45 minutes",
      distance: "About 40–45 km",
      surface: "Tar",
      estimate: true,
      notes:
        "Collect the vehicle, buy a local SIM and draw Namibian dollars. A first night near the airport means no long drive after an international flight, and no risk of arriving after dark.",
      staySlug: "etango-ranch-guest-farm",
    },
    {
      key: "2",
      from: "Windhoek",
      to: "The Kalahari, near Mariental",
      drive: "2.5–3 hours",
      distance: "About 260 km",
      surface: "Tar on the B1 south; the last stretch to the ranch is still to be checked",
      notes:
        "An easy first day, on tar. Arrive in time for a sundowner drive on the dunes, and fill up in Mariental for tomorrow.",
    },
    {
      key: "3",
      from: "The Kalahari",
      to: "Sossusvlei (Sesriem)",
      drive: "5–6 hours",
      distance: "About 300–380 km",
      surface: "Tar to Maltahöhe, about 90 km; then gravel over the Zaris pass, steep and narrow in places",
      estimate: true,
      notes:
        "Fill up at Maltahöhe: fuel at Sesriem has been unreliable. Start early, and be through the Sesriem gate well before it closes at sunset.",
    },
    {
      key: "4",
      from: "Sossusvlei",
      to: "Sossusvlei",
      drive: "A day in the dunes",
      distance: "About 60 km each way to the 2×4 car park",
      surface: "Tar to the 2×4 car park, then 5 km of deep sand",
      notes:
        "Go in with the lodge's guided sunrise excursion rather than driving the sand yourself: lodge guests are through the inner gate before sunrise, when day visitors can't be. The rule on driving the last stretch has changed more than once; the road book carries the current one. In the afternoon, Sesriem Canyon on foot, or rest through the heat.",
    },
    {
      key: "5",
      from: "Sossusvlei",
      to: "Swakopmund",
      drive: "5–6 hours",
      distance: "About 340–360 km",
      surface: "Gravel to Solitaire and over the Gaub and Kuiseb passes to Walvis Bay; tar to Swakopmund",
      notes:
        "Stop at Solitaire for fuel, a tyre check and the bakery: there is no fuel between Solitaire and Walvis Bay. Take the Kuiseb pass slowly.",
    },
    {
      key: "6",
      from: "Swakopmund",
      to: "Swakopmund",
      noDriving: true,
      notes:
        "A morning in the dune belt between Swakopmund and Walvis Bay on a guided Living Desert tour (cash only), and the afternoon free. A good day to have the tyres and the vehicle looked over before Damaraland.",
    },
    {
      key: "7",
      from: "Swakopmund",
      to: "Twyfelfontein",
      drive: "6–7 hours with stops",
      distance: "About 325–450 km, depending on the way you take",
      surface: "Tar on the B2 inland, then gravel to Spitzkoppe and from Uis to Twyfelfontein",
      estimate: true,
      notes:
        "The longest day. Leave early, walk at Spitzkoppe mid-morning, and stop at Uis for lunch and fuel. If the morning slips, drop Spitzkoppe rather than drive into the evening.",
    },
    {
      key: "8",
      from: "Twyfelfontein",
      to: "The Grootberg plateau",
      drive: "1.5–2 hours",
      surface: "Gravel; the last climb onto the plateau is a steep 4×4 track",
      notes:
        "The rock engravings at Twyfelfontein in the cool of the morning, then a short drive to arrive for lunch. Most guests leave the vehicle at the lodge's guarded gate and are driven up.",
    },
    {
      key: "9",
      from: "The Grootberg plateau",
      to: "The Grootberg plateau",
      noDriving: true,
      notes:
        "Rhino tracking on foot with the conservancy's trackers: an early start and most of the day, for over-16s, with no promise of a sighting. Or go out after desert-adapted elephant.",
    },
    {
      key: "10",
      from: "The Grootberg plateau",
      to: "Etosha (Okaukuejo)",
      drive: "5–6 hours",
      distance: "About 330–380 km",
      surface: "Gravel for the 97 km to Kamanjab, then tar",
      estimate: true,
      notes:
        "Fill up at Kamanjab or Outjo; the pumps inside Etosha have been unreliable. Be inside the camp before the gate closes at sunset, and spend the evening at the floodlit waterhole.",
    },
    {
      key: "11",
      from: "Okaukuejo",
      to: "Okaukuejo",
      drive: "Gate open to gate close",
      surface: "Gravel park roads, 60 km/h",
      notes:
        "Drive yourself between the waterholes, or join a guided morning, afternoon or night drive. The night drive is the only way to be out in the park after dark.",
    },
    {
      key: "12",
      from: "Okaukuejo",
      to: "Eastern Etosha",
      drive: "About 2 hours without stops; a full day of game viewing",
      distance: "About 140–210 km inside the park",
      surface: "Gravel park road, with roadworks and detours reported",
      estimate: true,
      notes:
        "Cross the park slowly, by way of Halali. Leave through Von Lindequist Gate before sunset for Onguma, or be inside Namutoni by then.",
    },
    {
      key: "13",
      from: "Eastern Etosha",
      to: "Eastern Etosha",
      drive: "Your choice",
      surface: "Gravel",
      notes:
        "Fischer's Pan and the eastern waterholes on your own, or a guided drive from the lodge. Onguma has walks and hides on its own reserve.",
    },
    {
      key: "14",
      from: "Eastern Etosha",
      to: "Okonjima",
      drive: "4–5 hours",
      distance: "About 330–360 km",
      surface: "Tar by way of Tsumeb, Otavi and Otjiwarongo; about 25 km of gravel to the camps",
      estimate: true,
      notes: "An easy day on tar. Arrive in time for an afternoon activity.",
    },
    {
      key: "15",
      from: "Okonjima",
      to: "Okonjima",
      noDriving: true,
      notes:
        "Leopard tracking with the guides, and a visit to the AfriCat research centre. Sightings are not guaranteed.",
    },
    {
      key: "16",
      from: "Okonjima",
      to: "Hosea Kutako airport",
      drive: "About 3 hours",
      surface: "Gravel to the B1, then tar",
      notes:
        "Return the vehicle, and leave time for the inspection: gravel chips tyres and windscreens.",
      staySlug: null,
    },
  ],
  stays: {
    "etango-ranch-guest-farm": { unverified: true },
    "kulala-desert-lodge": { stepUp: true },
    "the-delight-swakopmund": { activities: ["The Living Desert tour, booked for you"] },
    // Research rate is undated; STRATEGY §5 wants a year on every rate.
    "strand-hotel-swakopmund": { rateOnRequest: true, activities: ["The Living Desert tour, booked for you"] },
    "damaraland-camp": { stepUp: true },
    "grootberg-lodge": { rateNote: "to be confirmed" },
    "okonjima-plains-camp": { activities: ["Leopard tracking, sightings not guaranteed"] },
    "okonjima-bush-camp": { stepUp: true, activities: ["Leopard tracking, sightings not guaranteed"] },
  },
  stops: [
    { slug: "solitaire", dayKey: "5" },
    { slug: "spitzkoppe", dayKey: "7" },
    { slug: "uis", dayKey: "7" },
  ],
  beforeYouGo: [
    {
      heading: "Licence and permits",
      body: "Bring your licence, in English and with a photo, and carry an International Driving Permit as well. Visitors with US and UK passports need a visa for Namibia, on arrival or as an e-visa.",
      link: { href: "/field-notes/self-drive/driving-on-the-left", label: "Driving on the left →" },
    },
    {
      heading: "Borders on this route",
      body: "None: the route stays inside Namibia. The longer version that runs on towards Victoria Falls needs the rental company's written permission to cross into Botswana, and road charges at each border. That drive ends in Kasane, where the vehicle is returned, and a road transfer takes you on to Victoria Falls.",
    },
    {
      heading: "Gravel",
      body: "Most of the route is gravel. Keep to 80 km/h at most, slower where the surface is poor: on loose gravel, speed is what rolls cars. Headlights on, two spare wheels, and a tyre check in each town.",
      link: { href: "/field-notes/self-drive/gravel-roads", label: "Gravel roads →" },
    },
    {
      heading: "Money and fuel",
      body: "Fill up in every town; filling stations are attended, and a tip is usual. Carry Namibian dollars or rand, which are pegged one to one, for fuel, tips and anything cash only, because card machines fail. The pumps at Sesriem and inside Etosha have been unreliable: fill up at Maltahöhe or Solitaire, and at Outjo, Kamanjab or Tsumeb.",
    },
    {
      heading: "Park gates and fees",
      body: "Etosha's gates open at sunrise and close at sunset, and you must be out of the park or inside a camp by then. At Sossusvlei, guests at the lodge inside the gate use an inner gate that opens earlier. Park fees are paid at the gate, and the road book carries the current ones.",
    },
    SIGNAL,
    {
      heading: "When to go",
      body: "May to October: dry, cooler days, and game gathers at Etosha's waterholes. April and early November are good shoulder months. From November to February it is very hot at Sossusvlei, and the north has its rains from about January to March.",
    },
  ],
  variants: [
    "Shorter, at 12 nights: drive from Windhoek straight to Sesriem, spend one night in Swakopmund rather than two, and one at each end of Etosha. It loses the slack days, and we wouldn't suggest it for a first time on gravel.",
    "The Waterberg instead of Okonjima: the Waterberg Plateau Park, near Otjiwarongo, works as the last night before Windhoek.",
    "Windhoek to the Falls: from eastern Etosha, go on north-east through the Zambezi Region rather than back to Windhoek, joining the four corners. The drive ends in Kasane, where the vehicle is returned, with a road transfer to Victoria Falls. It adds roughly five to seven nights.",
    "More Damaraland: a night at Palmwag, or a second at Twyfelfontein, for desert elephant, and less pressure on the long day 7.",
  ],
  fieldNotes: ["gravel-roads", "choosing-a-vehicle", "fuel-cash-and-signal", "namibia-or-zimbabwe-first"],
}

// ─── R3 The four corners ─────────────────────────────────────────

const FOUR_CORNERS: RouteEditorial = {
  metaName: "The four corners",
  metaPlaces: "Victoria Falls, the Chobe riverfront and the Zambezi Region",
  heroAlt: "A line of elephants crossing a flooded plain at sunset",
  headline: { lead: "The four", accent: "corners", tail: "." },
  facts: [
    {
      label: "Nights",
      value: "About 8–10",
      note: "Eight nights: skip the panhandle and spend two at Nkasa Rupara.",
    },
    { label: "Countries", value: "Zimbabwe, Botswana, Namibia" },
    { label: "Starts", value: "Victoria Falls", note: "No car for the first two nights." },
    { label: "Ends", value: "Victoria Falls, or fly out of Kasane" },
    {
      label: "Longest drive",
      value: "5–6 hours, tar (estimate)",
      note: "Divundu to Ngoma.",
    },
    { label: "Best months", value: "May to October" },
    { label: "Vehicle", value: "SUV or 4×4", note: "Collected and returned in Kasane." },
  ],
  days: [
    {
      key: "1–2",
      from: "Victoria Falls airport",
      to: "Victoria Falls",
      noDriving: true,
      notes:
        "Two nights without a car: our partners in Victoria Falls meet you at the airport. The Falls on foot, a sunset cruise on the upper Zambezi, and time to sort out visas and cash.",
    },
    {
      key: "3–4",
      from: "Victoria Falls",
      to: "Kasane and the western Chobe riverfront",
      drive: "1–1.5 hours to Kasane by road transfer, then about an hour's drive",
      distance: "80–90 km to Kasane, then about 60 km west",
      surface: "Tar",
      estimate: true,
      notes:
        "A road transfer takes you over the Kazungula border to Kasane as a passenger, and you collect the vehicle there. An afternoon boat on the Chobe from Kasane, then a full day in Chobe National Park. Muchenje is on the quieter western riverfront, close to the Ngoma border.",
    },
    {
      key: "5–6",
      from: "The Chobe riverfront",
      to: "The Kwando River, near Kongola",
      drive: "3–4 hours, plus the Ngoma border",
      distance: "About 200–230 km",
      surface: "Tar on the B8, through Katima Mulilo",
      estimate: true,
      notes:
        "Cross into Namibia at Ngoma, and fill up and draw cash in Katima Mulilo. Nambwa is park-and-transfer: leave the car at the Sijwa Project, a short way off the road, and the lodge takes you in. For a wetter, more remote two nights, Nkasa Lupala in Nkasa Rupara is the alternative.",
    },
    {
      key: "7–8",
      from: "The Kwando River",
      to: "The Okavango at Divundu and Popa Falls",
      drive: "2.5–3.5 hours",
      distance: "About 200 km",
      surface: "Tar on the B8, through Bwabwata",
      estimate: true,
      optional: "Optional: add two nights",
      notes:
        "Fill up at Kongola: there is nothing in Bwabwata before Divundu, and elephant cross the road. Game drives in the Mahango Core Area, and boats on the Okavango near Popa Falls. Without these two nights, the route spends them at Nkasa Rupara instead.",
    },
    {
      key: "9",
      from: "Divundu",
      to: "Ngoma, on the Namibian bank of the Chobe",
      drive: "5–6 hours",
      distance: "About 380–400 km",
      surface: "Tar to Ngoma; the last stretch to the camp is a track that turns to mud in the rains",
      estimate: true,
      notes:
        "The long day: start early and arrive before dark. A night four kilometres from the Ngoma border keeps the last morning short. In the rains the camp escorts 4×4s in, or you park at Ngoma and are collected. Without the panhandle, this day starts from Nkasa Rupara instead.",
    },
    {
      key: "10",
      from: "Ngoma",
      to: "Kasane, then Victoria Falls",
      drive: "About an hour to Kasane",
      surface: "Tar, on the transit road through Chobe National Park",
      notes:
        "Cross at Ngoma and take the transit road through the park to Kasane, staying on the tar. Return the vehicle in Kasane, then a road transfer back to Victoria Falls, or fly out of Kasane.",
      staySlug: null,
      altStaySlugs: [],
    },
  ],
  stays: {
    "vic-falls-victoria-falls-safari-lodge": { accessLabel: "No car needed: a shuttle to the Falls" },
    // Research: walking distance and everything beyond the rate unverified.
    "vic-falls-ilala-lodge": {
      accessLabel: "No car needed: a walk to the Falls",
      rateOnRequest: true,
      unverified: true,
      whyWeListIt:
        "For travellers who would rather walk to the Falls than be driven. A town hotel rather than a safari lodge, and the right price for the first two nights of a long trip.",
    },
    "muchenje-safari-lodge": { accessLabel: "Arrival by arrangement" },
    "chobe-game-lodge": { accessLabel: "Arrival by arrangement", stepUp: true },
    // Research rate came from a badly extracted rate card.
    "nambwa-tented-lodge": { stepUp: true, rateOnRequest: true },
    "nunda-river-lodge": { rateOnRequest: true },
    // Research: spa, ownership and activities not confirmed with the lodge.
    "divava-okavango-lodge": {
      whyWeListIt:
        "The more comfortable alternative at Divundu, for travellers who want a better room after a week on the road. Popa Falls is a short boat ride away.",
    },
  },
  borders: {
    lede: "Hours are as of the date shown; confirm before travel. The road book carries the current charges at each post.",
    posts: [
      {
        name: "Kazungula road border",
        between: "Zimbabwe and Botswana",
        hours: "06:00–20:00, as of April 2025",
        notes: "Crossed as a passenger on days 3 and 10, by road transfer. The vehicle stays on the Botswana side.",
      },
      {
        name: "Ngoma Bridge",
        between: "Botswana and Namibia",
        hours: "07:00–18:00, as of April 2025",
        notes:
          "Days 5 and 10. Reached from Kasane on the transit road through Chobe National Park; stay on the tar. Namibia charges foreign-registered vehicles at the border, and waits can be long.",
      },
      {
        name: "Kazungula Bridge",
        between: "Botswana and Zambia",
        hours: "06:00–22:00, as of April 2025",
        notes: "Only on the way out through Zambia, by road transfer after the vehicle is returned.",
      },
      {
        name: "Victoria Falls Bridge",
        between: "Zambia and Zimbabwe",
        hours: "Open 24 hours, as of November 2025",
        notes: "Only on the way out through Zambia, or for a day on the Zambian side of the Falls on foot.",
      },
    ],
  },
  beforeYouGo: [
    {
      heading: "Licence and permits",
      body: "Bring your licence and an International Driving Permit. The rental company's written authority to take the vehicle into Namibia is arranged when we book it. Visas for US and UK passports: none for Botswana or Zambia; Namibia requires one, on arrival or as an e-visa; Zimbabwe issues them on arrival or online, and because you leave on day 3 and come back on day 10, ask for a double entry. The KAZA UniVisa doesn't help on this route, because it ends once you sleep in Botswana.",
      link: { href: "/field-notes/self-drive/border-crossings", label: "Crossing borders in a rental car →" },
    },
    {
      heading: "Money and fuel",
      body: "In Zimbabwe, US dollars in small notes: cash can be short and cards don't always work. Botswana uses the pula and Namibia the Namibian dollar; carry some of each for the borders. In Namibia, fill up at Kongola and at Divundu, because there is nothing in Bwabwata between them.",
    },
    {
      heading: "Park gates and fees",
      body: "Chobe National Park is open 06:00–18:30 from April to September, and 05:30–19:00 from October to March. The transit road from Kasane to Ngoma is open around the clock; don't stop or leave the tar. The road book carries the current park fees.",
    },
    SIGNAL,
    {
      heading: "When to go",
      body: "May to October, for game and for the roads. June to August is the best balance: dry roads, and rivers still high enough for boats. From September to December some river lodges stop their boats as the water drops, and from December to March the rains turn some lodge tracks 4×4-only.",
    },
  ],
  variants: [
    "Without the panhandle, at 8 nights: the Falls two, Chobe two, the Kwando two, Nkasa Rupara two, then back by way of Ngoma and Kasane. Less driving, more time on the water.",
    "Out through Zambia: return the vehicle in Kasane and go on by road transfer over the Kazungula Bridge to Livingstone, for a night or two on the Zambian bank of the Zambezi (Tongabezi, upstream of the Falls, is one we'd book, above our usual price), then over the Victoria Falls Bridge into Zimbabwe.",
    "The Botswana panhandle: from Divundu through Mahango to the Mohembo border, and on to Shakawe on the Okavango, returning the same way. Two more borders; the places to stay are still being chosen.",
    "Falls, both ways: join this route to Victoria Falls, Hwange and the Matobo. This vehicle is returned in Kasane, and a separate one collected in Zimbabwe for that route.",
    "Windhoek to the Falls: come in from Namibia along the B8 through Rundu and Divundu, joining this route at day 7.",
  ],
  fieldNotes: [
    "border-crossings",
    "choosing-a-vehicle",
    "after-dark-and-wildlife-on-the-road",
    "fuel-cash-and-signal",
  ],
}

const EDITORIAL: Record<string, RouteEditorial> = {
  "zimbabwe-falls-hwange-matobo": ZIMBABWE,
  "namibia-kalahari-to-etosha": NAMIBIA,
  "four-corners-falls-chobe-caprivi": FOUR_CORNERS,
}

// ─── View model ──────────────────────────────────────────────────

/** Anything above this, per person per night, gets "a step up" (STRATEGY §4). */
const BAND_TOP_USD = 600

const TYPE_LABEL: Record<string, string> = {
  lodge: "Lodge",
  camp: "Camp",
  "on-the-road": "On the road",
}

const ACCESS_LABEL: Record<string, string> = {
  "drive-in": "Drive in",
  "park-and-transfer": "Park and transfer",
  "4x4-only": "4×4 only",
}

export type StayView = {
  slug: string
  name: string
  area: string
  country: string
  typeLabel: string
  accessLabel: string
  /** "From US$232 pppn (2026)" or "Rate on request". */
  rateLine: string
  hasRate: boolean
  stepUp: boolean
  unverified: boolean
  setsItApart: string
  whyWeListIt: string
  activities: string[]
}

export type DayView = {
  key: string
  /** "Day 01" / "Days 03–04" (deck §4.1). */
  label: string
  from: string
  to: string
  drive?: string
  distance?: string
  surface?: string
  noDriving: boolean
  estimate: boolean
  notes: string
  optional?: string
  stay?: StayView
  alternatives: StayView[]
}

export type StopView = StayView & { dayLabel: string; overnight: boolean }

export type RouteView = {
  slug: string
  title: string
  countries: string[]
  nightsRange: string
  summary: string
  heroImage?: string
  heroAlt: string
  headline: { lead: string; accent: string; tail: string }
  metaTitle: string
  metaDescription: string
  facts: Fact[]
  days: DayView[]
  /** Overnight stops in itinerary order, each with its alternatives. */
  nights: { dayLabel: string; place: string; optional?: string; primary: StayView; alternatives: StayView[] }[]
  onTheRoad: StopView[]
  borders?: { lede: string; posts: BorderView[] }
  beforeYouGo: BeforeYouGoItem[]
  variants: string[]
  fieldNotes: string[]
  sources: string[]
}

function pad(n: string): string {
  return /^\d+$/.test(n) ? n.padStart(2, "0") : n
}

/** "3–4" → "Days 03–04", "1" → "Day 01". */
export function dayLabel(key: string): string {
  const parts = key.split(/[–-]/).map((p) => p.trim())
  if (parts.length > 1) return `Days ${pad(parts[0])}–${pad(parts[parts.length - 1])}`
  return `Day ${pad(parts[0])}`
}

/** A short year from the research's rate_year: "2026", "2026–27". */
export function shortRateYear(rateYear: string): string | null {
  const lead = rateYear.match(/^(\d{4}(?:[–-]\d{2,4})?)/)
  if (lead) return lead[1].replace("-", "–")
  const any = rateYear.match(/\d{4}/)
  return any ? any[0] : null
}

/** Strips source and price asides from an activity: "Hide (N$560 pp)" → "Hide". */
function cleanActivity(a: string): string {
  const s = a.replace(/\s*\([^)]*\)/g, "").trim()
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function toStayView(stay: RouteStay, edit: StayEdit | undefined): StayView {
  const price = edit?.rateOnRequest ? null : stay.nightly_from_usd
  const year = shortRateYear(stay.rate_year)
  let rateLine = "Rate on request"
  if (price !== null && price !== undefined) {
    rateLine = `From US$${price.toLocaleString("en-GB")} pppn${year ? ` (${year})` : ""}`
    if (edit?.rateNote) rateLine += `, ${edit.rateNote}`
  }
  return {
    slug: stay.slug,
    name: stay.name,
    area: stay.area,
    country: stay.country,
    typeLabel: TYPE_LABEL[stay.type] ?? stay.type,
    accessLabel: edit?.accessLabel ?? ACCESS_LABEL[stay.self_drive_access] ?? stay.self_drive_access,
    rateLine,
    hasRate: price !== null && price !== undefined,
    stepUp: Boolean(edit?.stepUp) || (price ?? 0) > BAND_TOP_USD,
    unverified: Boolean(edit?.unverified),
    setsItApart: edit?.setsItApart ?? stay.sets_it_apart,
    whyWeListIt: edit?.whyWeListIt ?? stay.why_we_list_it,
    activities: (edit?.activities ?? stay.guided_activities).map(cleanActivity).filter(Boolean),
  }
}

function buildView(detail: RouteDetail, ed: RouteEditorial): RouteView {
  const summary = getRouteSummary(detail.slug)
  const allStays = [...detail.stays, ...(ed.extraStays ?? [])]
  const staysBySlug = new Map(allStays.map((s) => [s.slug, s]))
  const view = (slug: string | null | undefined): StayView | undefined => {
    if (!slug) return undefined
    const s = staysBySlug.get(slug)
    return s ? toStayView(s, ed.stays[slug]) : undefined
  }

  const rawDays = new Map(detail.days.map((d) => [d.days, d]))
  const days: DayView[] = ed.days.map((d) => {
    const raw = rawDays.get(d.key)
    const staySlug = d.staySlug !== undefined ? d.staySlug : raw?.stay_slug
    const altSlugs = d.altStaySlugs ?? raw?.alt_stay_slugs ?? []
    return {
      key: d.key,
      label: dayLabel(d.key),
      from: d.from,
      to: d.to,
      drive: d.drive,
      distance: d.distance,
      surface: d.surface,
      noDriving: Boolean(d.noDriving),
      estimate: Boolean(d.estimate),
      notes: d.notes,
      optional: d.optional,
      stay: view(staySlug),
      alternatives: altSlugs.map(view).filter((s): s is StayView => Boolean(s)),
    }
  })

  const nights = days
    .filter((d) => d.stay)
    .map((d) => ({
      dayLabel: d.label,
      place: d.to,
      optional: d.optional,
      primary: d.stay as StayView,
      alternatives: d.alternatives,
    }))

  // On the road: stops that aren't overnights, then on-the-road overnights.
  const onTheRoad: StopView[] = []
  for (const stop of ed.stops ?? []) {
    const s = view(stop.slug)
    if (s) onTheRoad.push({ ...s, dayLabel: dayLabel(stop.dayKey), overnight: false })
  }
  for (const d of days) {
    for (const s of [d.stay, ...d.alternatives]) {
      if (s && s.typeLabel === TYPE_LABEL["on-the-road"] && !onTheRoad.some((o) => o.slug === s.slug)) {
        onTheRoad.push({ ...s, dayLabel: d.label, overnight: true })
      }
    }
  }

  const nightsRange = detail.nights
  const metaTitle = `${ed.metaName}: a self-drive safari route`
  const metaDescription = `${nightsRange} nights by road through ${ed.metaPlaces}, staying at camps and lodges with guided activities. Drive times, road surfaces and borders in a road book.`

  return {
    slug: detail.slug,
    title: summary?.title ?? detail.title,
    countries: summary?.countries ?? detail.countries,
    nightsRange,
    summary: detail.summary,
    heroImage: summary?.heroImage,
    heroAlt: ed.heroAlt,
    headline: ed.headline,
    metaTitle,
    metaDescription,
    facts: ed.facts,
    days,
    nights,
    onTheRoad,
    borders: ed.borders,
    beforeYouGo: ed.beforeYouGo,
    variants: ed.variants,
    fieldNotes: ed.fieldNotes,
    sources: collectRouteSources(detail),
  }
}

/**
 * The display model for /routes/[slug]. Returns undefined when the route
 * has no research record or no editorial layer yet; the page then shows
 * the "route being drawn" state.
 */
export function getRouteView(slug: string): RouteView | undefined {
  const detail = getRouteDetail(slug)
  const ed = EDITORIAL[slug]
  if (!detail || !ed) return undefined
  return buildView(detail, ed)
}
