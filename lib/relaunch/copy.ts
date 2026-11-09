/**
 * Copy for the relaunch's route and landing pages, from
 * handoff/relaunch/copy/SITE_COPY.md (§1.3, §3, §4, §5, §8.3).
 * Draft for Dom's approval (D-10). Bracketed placeholders stay visible
 * on the page until Dom supplies the value; they never go into meta tags.
 */

/** §1.3 "Can I do this?" — shared by the homepage and the landing pages. */
export const CAN_I = {
  eyebrow: "Before you ask",
  headlineLead: "Yes, you can",
  headlineAccent: "drive",
  headlineTail: " this.",
  lede: "It's the question most people arrive with. The short answers are below; the long ones are in the road book.",
  items: [
    {
      title: "The roads.",
      body: "The main roads are tar or graded gravel, and the road book names the surface for each day before you set off. Where a stretch needs a 4×4 — sand in a park, a rough track into a camp — we say so, and the vehicle is chosen for it. A 4×4 where it matters, not everywhere.",
    },
    {
      title: "Driving on the left.",
      body: "All of the countries on our routes drive on the left. Ask for an automatic and there's one less thing to think about; the first morning feels strange, and by the second day you're watching the road, not which side of it you're on. Bring your licence and an International Driving Permit.",
    },
    {
      title: "Borders.",
      body: "A border by car means paperwork: permission from the rental company to cross, permits, road fees, insurance papers. We arrange what can be arranged in advance and the road book lists what to have in hand at each post. Around Victoria Falls, our partners can meet you at the crossing.",
    },
    {
      title: "After dark, and the wildlife.",
      body: "You don't drive after sunset. Park gates close at dusk, cattle and wildlife use the roads at night, and the road book is timed so you're in camp well before either matters. Elephants have right of way; we'll tell you how to give it.",
    },
  ],
}

/** §3 Routes index. */
export const ROUTES_INDEX = {
  eyebrow: "Routes",
  headlineLead: "Where we",
  headlineAccent: "drive",
  headlineTail: ".",
  lede: "Three routes to start from, drawn on roads we know and around places we'd send a friend. None of them is fixed. Lengthen one, shorten one, join two together.",
  metaTitle: "Self-drive safari routes in southern Africa",
  metaDescription:
    "Three self-drive safari routes: Zimbabwe, Namibia, and a short loop from Victoria Falls through Chobe and Caprivi. Lodge-based, with a road book for each day.",
  cardLink: "See the route →",
  how: {
    eyebrow: "How a route works",
    headlineLead: "A shape, then a",
    headlineAccent: "road book",
    headlineTail: ".",
    items: [
      {
        title: "We draw it for your dates.",
        body: "Start a brief and we come back with three routes. Pick one, and we turn it into a road book: each day's drive time and road surface, where to fill up, which border post, when the park gates open and close. In print, and offline on your phone, because signal runs out before the road does.",
      },
      {
        title: "We book it.",
        body: "The camps and lodges, held for your nights, and a vehicle matched to the roads. You get one itinerary and one set of people to talk to, not a folder of separate confirmations.",
      },
      {
        title: "We're on the phone.",
        // [support line hours]: D-04.
        body: "While you're on the road there's a person to call, [support line hours]. Partners on the ground meet you, hand over the vehicle and are the backup if something goes wrong. The first of them are in Victoria Falls.",
      },
    ],
    closing:
      "Prices depend on the season, the places and the vehicle, so we quote each route for your dates.",
    button: "Start a brief →",
  },
}

/** §4 Route detail template. */
export const ROUTE_DETAIL = {
  eyebrowPrefix: "Route",
  // D-11: price and year stay as placeholders until route costing is checked.
  priceLine: "From [US$X] per person, sharing",
  priceFootnote:
    "Indicative for [year], lodges only. The vehicle is priced with you. Confirmed when we hold your nights.",
  drive: {
    heading: "The drive",
    lede: "Day by day, with the drive time, the road surface and what's worth stopping for.",
  },
  stay: {
    heading: "Where you stay",
    lede: "The camps and lodges we'd book on this route. Places we'd send a friend to, chosen for what they give you at the end of a day's drive. Each can be swapped.",
    alternativesLabel: "Or",
    ratesNote:
      "Rates are indicative, from, per person sharing per night, in the year shown. They change with the season and are confirmed only when we hold your nights. “A step up” marks places above our usual price band that we think are worth it.",
    empty: "We're still choosing the places on this route. Start a brief and we'll draw it with you.",
  },
  onTheRoad: {
    heading: "On the road",
    lede: "Stops that make the drive part of the safari: a farm stall, a long lunch, the night before a border.",
    empty: "No stops listed yet. The road book will have them.",
    overnight: "Overnight",
    stop: "On the way",
  },
  beforeYouGo: {
    heading: "Before you go",
    lede: "The practical things, plainly.",
    bordersHeading: "Borders on this route",
  },
  variants: {
    heading: "Make it longer, or shorter",
    lede: "Ways this route bends.",
  },
  fieldNotes: {
    eyebrow: "Field Notes",
    heading: "Read before you drive",
  },
  sources: {
    summary: "Sources",
    lede: "Where the facts on this page come from. Checked November 2026; rates, fees and border hours change, and the road book carries the current ones.",
  },
  back: "← All routes",
  cta: {
    eyebrow: "Make it yours",
    headlineLead: "This route, drawn for",
    headlineAccent: "your",
    headlineTail: " dates.",
    body: "Tell us when you can travel, how long you're happy at the wheel and what you'd like at the end of the day. We'll come back with the route adjusted to fit, within 48 hours. The brief is free.",
    primary: "Start a brief for this route →",
    secondary: "Speak to a planner",
    reassurance: "Free, no commitment. About five minutes.",
  },
  drawing: {
    eyebrow: "Being drawn",
    body: "We're still drawing the day-by-day for this route. Start a brief and we'll draw it with you.",
  },
}

/** §5 Ad landing pages. */
export type LandingCopy = {
  country: string
  /** Breadcrumb / eyebrow label. */
  label: string
  routeSlugs: string[]
  h1: { lead: string; accent: string; tail: string }
  subhead: string
  benefits: string[]
  notCamping: string
  cta: string
  metaTitle: string
  metaDescription: string
  heroImage: string
  heroAlt: string
}

export const LANDING_SHARED = {
  benefitsEyebrow: "What we do",
  notCampingEyebrow: "Not a camping trip",
  reassurance: "Free, no commitment. Three routes back within 48 hours.",
  secondaryLink: "See the full route →",
  routesEyebrow: "The route",
}

export const LANDINGS: LandingCopy[] = [
  {
    country: "zimbabwe",
    label: "Zimbabwe",
    routeSlugs: ["zimbabwe-falls-hwange-matobo"],
    h1: { lead: "A self-drive safari in", accent: "Zimbabwe", tail: "." },
    subhead:
      "Victoria Falls, Hwange and the Matobo hills by road, with a camp or lodge at the end of each day's drive. Our partners in Victoria Falls hand you the keys.",
    benefits: [
      "A road book with each day's drive time, road surface, fuel stop and park gate times.",
      "Camps and lodges with guides, hides and walking, so you're not just driving yourself round the park.",
      "Partners on the ground in Victoria Falls, and a person to call while you're on the road.",
    ],
    notCamping: "No rooftop tent, no camp to pitch in the dark. You drive the day; someone else lights the fire.",
    cta: "Plan my Zimbabwe route →",
    metaTitle: "Self-drive safari in Zimbabwe: Victoria Falls, Hwange, Matobo",
    metaDescription:
      "A lodge-based self-drive safari in Zimbabwe, from Victoria Falls to Hwange and the Matobo hills. We draw the route, book the nights and the vehicle.",
    heroImage: "/media/zimbabwe/matobo-granite-kopjes.webp",
    heroAlt: "Granite boulders and a lone tree on a whaleback dome in the Matobo Hills under storm cloud",
  },
  {
    country: "namibia",
    label: "Namibia",
    routeSlugs: ["namibia-kalahari-to-etosha"],
    h1: { lead: "A self-drive safari in", accent: "Namibia", tail: "." },
    subhead:
      "The Kalahari, the dunes at Sossusvlei, the coast at Swakopmund, Damaraland and Etosha, by road. Long distances, drawn into days that end somewhere worth arriving.",
    benefits: [
      "Days planned around Namibia's distances and gravel, with drive times as honest ranges.",
      "Lodges with guided drives, walks and dark skies, booked for each night of the route.",
      "A road book in print and offline on your phone, because signal runs out before the road does.",
    ],
    notCamping:
      "No rooftop tent, no camp to pitch in the dark. A proper bed at the end of a long gravel day, and a guide in the morning.",
    cta: "Plan my Namibia route →",
    metaTitle: "Self-drive safari in Namibia: Kalahari, Sossusvlei, Etosha",
    metaDescription:
      "A lodge-based self-drive safari in Namibia, from the Kalahari and Sossusvlei to Etosha. A road book for each day, lodges booked, a vehicle matched to the roads.",
    heroImage: "/media/namibia/sossusvlei-dune-45-sunrise.webp",
    heroAlt: "Dune 45 at sunrise, one face lit and one in shadow",
  },
  {
    country: "botswana-zambia",
    label: "Botswana and Zambia",
    routeSlugs: ["four-corners-falls-chobe-caprivi"],
    h1: { lead: "A self-drive safari from", accent: "Victoria Falls", tail: "." },
    subhead:
      "The Falls, the Chobe riverfront and the Zambezi Region, where four countries meet on the rivers. A short loop with a lodge at the end of each day's drive.",
    benefits: [
      "Border crossings prepared before you leave, with the paperwork listed for each post.",
      "Lodges by the rivers, with boats and guided drives, so the wildlife comes to you as well.",
      "Partners on the ground in Victoria Falls, where the route begins and ends.",
    ],
    notCamping:
      "No rooftop tent, no camp to pitch in the dark. You keep the freedom of your own vehicle and lose the camping kit.",
    cta: "Plan my route from the Falls →",
    metaTitle: "Self-drive safari in Botswana and Zambia, from Victoria Falls",
    metaDescription:
      "A short lodge-based self-drive safari from Victoria Falls through Chobe and the Zambezi Region. Borders prepared, lodges booked, a road book for each day.",
    heroImage: "/media/four-corners/chobe-elephants-crossing.webp",
    heroAlt: "Elephants wading across the Chobe River in single file",
  },
]

export function getLanding(country: string): LandingCopy | undefined {
  return LANDINGS.find((l) => l.country === country)
}
