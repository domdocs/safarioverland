/**
 * Waypoints and day-by-day plans for the route maps.
 *
 * Coordinates are [lng, lat] in decimal degrees, at town or area level:
 * good enough for a map of southern Africa, not for navigation. Each
 * carries its source in a comment. "Wikipedia" means the coordinates in
 * the infobox of that place's English Wikipedia article; "research"
 * means the lat/lng in lib/relaunch/data/<route>.json; "approx." means a
 * placement from the research's description (e.g. "45 km south of
 * Bulawayo") and should be checked before anyone uses it for more than
 * a dot on a map.
 *
 * A route plan mirrors the research record's `days` one for one, in the
 * same order and with the same keys (the vitest checks this). Each day
 * ends at a waypoint, and lists the legs driven (or transferred) that
 * day. `via` points shape the line along the real road; they are never
 * labelled.
 */

export type WaypointKind =
  /** A night's stop. */
  | "overnight"
  /** A named place passed on the road (fuel, a walk, a park gate). */
  | "stop"
  | "airport"
  /** Shapes the line only; no marker, no label. */
  | "via"

/** Where the label sits relative to its marker. */
export type LabelAnchor = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"

export type Waypoint = {
  name: string
  lng: number
  lat: number
  kind: WaypointKind
  anchor?: LabelAnchor
}

export const WAYPOINTS = {
  // ─── Zimbabwe ──────────────────────────────────────────────────
  // Wikipedia, "Victoria Falls (town)": 17°56′S 25°50′E. The airport (VFA)
  // is ~18 km south; at this scale both are drawn as the town.
  "victoria-falls": { name: "Victoria Falls", lng: 25.84, lat: -17.93, kind: "overnight", anchor: "e" },
  // Wikipedia, "Hwange (town)": 18°22′S 26°30′E. Via only (the A8).
  hwange: { name: "Hwange", lng: 26.5, lat: -18.37, kind: "via" },
  // approx.: Ivory Lodge is in Sikumi Forest on Hwange's eastern edge,
  // near Dete (Wikipedia, "Dete": 18°37′S 26°52′E). Placed just east of Dete.
  "ivory-lodge": { name: "Ivory Lodge", lng: 26.98, lat: -18.6, kind: "overnight", anchor: "n" },
  // approx.: Hwange Main Camp, the park's main entrance, ~23 km from the
  // Cross Mabale turn-off (research day 5–7). Main Camp is commonly given
  // as about 18°44′S 26°57′E.
  "hwange-main-camp": { name: "Main Camp", lng: 26.95, lat: -18.73, kind: "stop", anchor: "w" },
  // research: the-hide lat/lng.
  "the-hide": { name: "The Hide", lng: 27.16, lat: -18.873, kind: "overnight", anchor: "e" },
  // Wikipedia, "Lupane": 18°56′S 27°48′E. Via only (the A8).
  lupane: { name: "Lupane", lng: 27.8, lat: -18.93, kind: "via" },
  // research: bulawayo-club lat/lng (city centre).
  bulawayo: { name: "Bulawayo", lng: 28.582, lat: -20.155, kind: "overnight", anchor: "w" },
  // approx.: Joshua Mqabuko Nkomo International Airport (BUQ), ~20 km
  // north of the city; commonly given as 20°01′S 28°37′E.
  "bulawayo-airport": { name: "Bulawayo airport", lng: 28.62, lat: -20.02, kind: "airport", anchor: "e" },
  // approx.: Amalinda Lodge is ~45 km south of Bulawayo on the Matopos
  // road; Maleme Dam rest camp in Matobo NP is about 20°33′S 28°30′E.
  // Placed between the two.
  matobo: { name: "Matobo Hills", lng: 28.5, lat: -20.52, kind: "overnight", anchor: "e" },

  // ─── Namibia ───────────────────────────────────────────────────
  // Wikipedia, "Hosea Kutako International Airport": 22°29′S 17°28′E.
  "hosea-kutako": { name: "Hosea Kutako airport", lng: 17.47, lat: -22.48, kind: "airport", anchor: "e" },
  // Wikipedia, "Windhoek": 22°34′S 17°05′E. Night 1 is a guest farm "in
  // or near Windhoek" (not yet chosen), drawn as the city.
  windhoek: { name: "Windhoek", lng: 17.08, lat: -22.57, kind: "overnight", anchor: "w" },
  // Wikipedia, "Mariental": 24°38′S 17°58′E. Via only (the B1).
  mariental: { name: "Mariental", lng: 17.97, lat: -24.63, kind: "via" },
  // approx.: Bagatelle Kalahari Game Ranch, "between Hardap and Stampriet,
  // about 45 km from Mariental" (research). Placed NNE of Mariental.
  kalahari: { name: "Kalahari", lng: 18.1, lat: -24.3, kind: "overnight", anchor: "e" },
  // Wikipedia, "Maltahöhe": 24°50′S 16°59′E. Via only (C19).
  maltahohe: { name: "Maltahöhe", lng: 16.98, lat: -24.83, kind: "via" },
  // research: sossus-dune-lodge lat/lng (inside the Sesriem gate).
  sesriem: { name: "Sesriem", lng: 15.787, lat: -24.507, kind: "overnight", anchor: "s" },
  // Wikipedia, "Solitaire, Namibia": 23°53′S 16°00′E.
  solitaire: { name: "Solitaire", lng: 16.0, lat: -23.89, kind: "stop", anchor: "e" },
  // Wikipedia, "Walvis Bay": 22°57′S 14°30′E. Via only.
  "walvis-bay": { name: "Walvis Bay", lng: 14.51, lat: -22.95, kind: "via" },
  // Wikipedia, "Swakopmund": 22°41′S 14°32′E.
  swakopmund: { name: "Swakopmund", lng: 14.53, lat: -22.68, kind: "overnight", anchor: "w" },
  // Wikipedia, "Spitzkoppe": 21°50′S 15°12′E.
  spitzkoppe: { name: "Spitzkoppe", lng: 15.2, lat: -21.83, kind: "stop", anchor: "e" },
  // Wikipedia, "Uis": 21°13′S 14°52′E.
  uis: { name: "Uis", lng: 14.87, lat: -21.22, kind: "stop", anchor: "e" },
  // Wikipedia, "Twyfelfontein": 20°35′S 14°22′E.
  twyfelfontein: { name: "Twyfelfontein", lng: 14.37, lat: -20.58, kind: "overnight", anchor: "w" },
  // approx.: Grootberg Lodge, on the C40 between Kamanjab and Palmwag at
  // the Klip River pass. Palmwag Lodge (research: 19°53′S 13°56′E) is ~20 km
  // west; at this scale one point covers both.
  grootberg: { name: "Grootberg", lng: 14.12, lat: -19.84, kind: "overnight", anchor: "w" },
  // Wikipedia, "Kamanjab": 19°37′S 14°50′E. Via only (C40).
  kamanjab: { name: "Kamanjab", lng: 14.84, lat: -19.62, kind: "via" },
  // Wikipedia, "Outjo": 20°07′S 16°09′E. Via only (C38).
  outjo: { name: "Outjo", lng: 16.15, lat: -20.11, kind: "via" },
  // Wikipedia, "Okaukuejo": 19°11′S 15°55′E.
  okaukuejo: { name: "Okaukuejo", lng: 15.92, lat: -19.18, kind: "overnight", anchor: "w" },
  // approx.: Halali camp, midway across Etosha (~19°02′S 16°28′E). Via only.
  halali: { name: "Halali", lng: 16.47, lat: -19.03, kind: "via" },
  // approx.: between Namutoni (Wikipedia, 18°48′S 16°56′E) and Onguma at
  // the Von Lindequist gate, a few km east.
  "eastern-etosha": { name: "Namutoni / Onguma", lng: 16.98, lat: -18.78, kind: "overnight", anchor: "n" },
  // Wikipedia, "Tsumeb": 19°15′S 17°43′E. Via only (B1).
  tsumeb: { name: "Tsumeb", lng: 17.72, lat: -19.25, kind: "via" },
  // Wikipedia, "Otavi": 19°39′S 17°20′E. Via only (B1).
  otavi: { name: "Otavi", lng: 17.34, lat: -19.65, kind: "via" },
  // Wikipedia, "Otjiwarongo": 20°28′S 16°39′E. Via only (B1).
  otjiwarongo: { name: "Otjiwarongo", lng: 16.65, lat: -20.46, kind: "via" },
  // approx.: Okonjima Nature Reserve, ~24–26 km of gravel off the B1
  // south of Otjiwarongo (research day 14). Commonly given as ~20°51′S 16°38′E.
  okonjima: { name: "Okonjima", lng: 16.64, lat: -20.85, kind: "overnight", anchor: "e" },
  // Wikipedia, "Okahandja": 21°59′S 16°55′E. Via only (B1).
  okahandja: { name: "Okahandja", lng: 16.92, lat: -21.98, kind: "via" },

  // ─── The four corners ──────────────────────────────────────────
  // approx.: Kazungula border crossing (~17°47′S 25°16′E). Via only.
  kazungula: { name: "Kazungula", lng: 25.27, lat: -17.79, kind: "via" },
  // Wikipedia, "Kasane": 17°48′S 25°09′E.
  kasane: { name: "Kasane", lng: 25.15, lat: -17.8, kind: "stop", anchor: "s" },
  // approx.: Muchenje Safari Lodge, "western Chobe riverfront, Chobe Forest
  // Reserve, about 60 km west of Kasane" (research), near Ngoma.
  muchenje: { name: "Chobe riverfront", lng: 24.66, lat: -17.95, kind: "overnight", anchor: "s" },
  // research: chobe-river-camp lat/lng, "4 km from Ngoma border".
  ngoma: { name: "Ngoma", lng: 24.73, lat: -17.9, kind: "overnight", anchor: "n" },
  // Wikipedia, "Katima Mulilo": 17°30′S 24°16′E.
  "katima-mulilo": { name: "Katima Mulilo", lng: 24.27, lat: -17.5, kind: "stop", anchor: "n" },
  // approx.: Nambwa, on the Kwando a few km south of Kongola (Wikipedia,
  // "Kongola": 17°47′S 23°20′E). Research gives Namushasha, 24 km south of
  // Kongola, at 17°59′S 23°18′E.
  kongola: { name: "Kongola / Kwando", lng: 23.33, lat: -17.84, kind: "overnight", anchor: "s" },
  // approx.: Divundu (Wikipedia, 18°06′S 21°32′E) and Popa Falls a few km
  // east; Nunda is ~2 km downstream of the falls (research).
  divundu: { name: "Divundu / Popa Falls", lng: 21.56, lat: -18.11, kind: "overnight", anchor: "s" },
} as const satisfies Record<string, Waypoint>

export type WaypointId = keyof typeof WAYPOINTS

export function getWaypoint(id: WaypointId): Waypoint {
  return WAYPOINTS[id]
}

// ─── Plans ─────────────────────────────────────────────────────────

/** "drive": self-drive. "transfer": a road transfer as a passenger. */
export type LegMode = "drive" | "transfer"

export type RouteLeg = {
  from: WaypointId
  to: WaypointId
  /** Points the road passes through, in order. */
  via?: WaypointId[]
  mode: LegMode
  /** Part of an optional extension (drawn dashed, faint). */
  optional?: boolean
  /** Mostly gravel or dirt (drawn dashed). Default tar. From the research's road_surface. */
  gravel?: boolean
}

export type RouteDayPlan = {
  /** Matches RouteDay.days in the research record ("1", "3–4"). */
  key: string
  /** Where the day ends: the night's stop, or the departure point. */
  end: WaypointId
  /** Empty on a day with no driving. */
  legs: RouteLeg[]
}

export type RoutePlan = {
  slug: string
  /** Short name for the overview map, e.g. "Zimbabwe". */
  shortName: string
  start: WaypointId
  days: RouteDayPlan[]
  /** Where the overview map puts this route's label. */
  overviewLabel: { lng: number; lat: number; anchor: LabelAnchor }
  /** Extra labels for the detail map (seas, parks). */
  extraLabels?: { text: string; lng: number; lat: number }[]
}

export const ROUTE_PLANS: RoutePlan[] = [
  {
    slug: "zimbabwe-falls-hwange-matobo",
    shortName: "Zimbabwe",
    start: "victoria-falls",
    overviewLabel: { lng: 27.6, lat: -19.35, anchor: "se" },
    extraLabels: [{ text: "Hwange National Park", lng: 26.3, lat: -19.05 }],
    days: [
      { key: "1–2", end: "victoria-falls", legs: [] },
      {
        key: "3–4",
        end: "ivory-lodge",
        legs: [{ from: "victoria-falls", to: "ivory-lodge", via: ["hwange"], mode: "drive" }],
      },
      {
        key: "5–7",
        end: "the-hide",
        legs: [
          // Tar to Main Camp, then about 32 km of dirt (research day 5–7).
          { from: "ivory-lodge", to: "hwange-main-camp", mode: "drive" },
          { from: "hwange-main-camp", to: "the-hide", mode: "drive", gravel: true },
        ],
      },
      {
        key: "8",
        end: "bulawayo",
        legs: [
          { from: "the-hide", to: "hwange-main-camp", mode: "drive", gravel: true },
          { from: "hwange-main-camp", to: "bulawayo", via: ["lupane"], mode: "drive" },
        ],
      },
      { key: "9–11", end: "matobo", legs: [{ from: "bulawayo", to: "matobo", mode: "drive" }] },
      { key: "12", end: "bulawayo-airport", legs: [{ from: "matobo", to: "bulawayo-airport", mode: "drive" }] },
    ],
  },
  {
    slug: "namibia-kalahari-to-etosha",
    shortName: "Namibia",
    start: "hosea-kutako",
    overviewLabel: { lng: 15.0, lat: -24.2, anchor: "sw" },
    extraLabels: [
      { text: "Atlantic Ocean", lng: 13.2, lat: -23.6 },
      { text: "Etosha", lng: 16.2, lat: -18.75 },
    ],
    days: [
      { key: "1", end: "windhoek", legs: [{ from: "hosea-kutako", to: "windhoek", mode: "drive" }] },
      { key: "2", end: "kalahari", legs: [{ from: "windhoek", to: "kalahari", via: ["mariental"], mode: "drive" }] },
      {
        key: "3",
        end: "sesriem",
        legs: [
          // Tar to Maltahöhe, gravel to Sesriem (research day 3).
          { from: "kalahari", to: "maltahohe", via: ["mariental"], mode: "drive" },
          { from: "maltahohe", to: "sesriem", mode: "drive", gravel: true },
        ],
      },
      { key: "4", end: "sesriem", legs: [] },
      {
        key: "5",
        end: "swakopmund",
        legs: [
          // Gravel to Walvis Bay via Solitaire, tar on the B2 (research day 5).
          { from: "sesriem", to: "walvis-bay", via: ["solitaire"], mode: "drive", gravel: true },
          { from: "walvis-bay", to: "swakopmund", mode: "drive" },
        ],
      },
      { key: "6", end: "swakopmund", legs: [] },
      {
        key: "7",
        end: "twyfelfontein",
        // Tar inland on the B2, gravel from Spitzkoppe on; segment surfaces
        // unverified in the research, drawn as gravel.
        legs: [{ from: "swakopmund", to: "twyfelfontein", via: ["spitzkoppe", "uis"], mode: "drive", gravel: true }],
      },
      { key: "8", end: "grootberg", legs: [{ from: "twyfelfontein", to: "grootberg", mode: "drive", gravel: true }] },
      { key: "9", end: "grootberg", legs: [] },
      {
        key: "10",
        end: "okaukuejo",
        legs: [
          // Gravel on the C40 to Kamanjab, tar beyond (research day 10).
          { from: "grootberg", to: "kamanjab", mode: "drive", gravel: true },
          { from: "kamanjab", to: "okaukuejo", via: ["outjo"], mode: "drive" },
        ],
      },
      { key: "11", end: "okaukuejo", legs: [] },
      {
        key: "12",
        end: "eastern-etosha",
        legs: [{ from: "okaukuejo", to: "eastern-etosha", via: ["halali"], mode: "drive", gravel: true }],
      },
      { key: "13", end: "eastern-etosha", legs: [] },
      {
        key: "14",
        end: "okonjima",
        legs: [{ from: "eastern-etosha", to: "okonjima", via: ["tsumeb", "otavi", "otjiwarongo"], mode: "drive" }],
      },
      { key: "15", end: "okonjima", legs: [] },
      {
        key: "16",
        end: "hosea-kutako",
        legs: [{ from: "okonjima", to: "hosea-kutako", via: ["okahandja"], mode: "drive" }],
      },
    ],
  },
  {
    slug: "four-corners-falls-chobe-caprivi",
    shortName: "The four corners",
    start: "victoria-falls",
    overviewLabel: { lng: 22.4, lat: -17.4, anchor: "n" },
    extraLabels: [{ text: "Chobe National Park", lng: 24.6, lat: -18.45 }],
    days: [
      { key: "1–2", end: "victoria-falls", legs: [] },
      {
        key: "3–4",
        end: "muchenje",
        legs: [
          { from: "victoria-falls", to: "kasane", via: ["kazungula"], mode: "transfer" },
          { from: "kasane", to: "muchenje", mode: "drive" },
        ],
      },
      {
        key: "5–6",
        end: "kongola",
        legs: [{ from: "muchenje", to: "kongola", via: ["ngoma", "katima-mulilo"], mode: "drive" }],
      },
      {
        key: "7–8",
        end: "divundu",
        legs: [{ from: "kongola", to: "divundu", mode: "drive", optional: true }],
      },
      {
        key: "9",
        end: "ngoma",
        legs: [
          { from: "divundu", to: "kongola", mode: "drive", optional: true },
          { from: "kongola", to: "ngoma", via: ["katima-mulilo"], mode: "drive" },
        ],
      },
      {
        key: "10",
        end: "victoria-falls",
        legs: [
          { from: "ngoma", to: "kasane", mode: "drive" },
          { from: "kasane", to: "victoria-falls", via: ["kazungula"], mode: "transfer" },
        ],
      },
    ],
  },
]

export function getRoutePlan(slug: string): RoutePlan | undefined {
  return ROUTE_PLANS.find((p) => p.slug === slug)
}

/** Labelled places on a route, in the order first reached. */
export function routeStops(plan: RoutePlan): { id: WaypointId; firstDay: number }[] {
  const seen = new Map<WaypointId, number>()
  const add = (id: WaypointId, day: number) => {
    if (WAYPOINTS[id].kind === "via" || seen.has(id)) return
    seen.set(id, day)
  }
  add(plan.start, 0)
  plan.days.forEach((d, i) => {
    d.legs.forEach((l) => {
      add(l.from, i)
      l.via?.forEach((v) => add(v, i))
      add(l.to, i)
    })
    add(d.end, i)
  })
  return [...seen].map(([id, firstDay]) => ({ id, firstDay }))
}

/** One-line summary of a route for the map's aria-label. */
export function routeMapLabel(plan: RoutePlan, title: string): string {
  const names = routeStops(plan)
    .filter(({ id }) => WAYPOINTS[id].kind === "overnight" || WAYPOINTS[id].kind === "airport")
    .map(({ id }) => WAYPOINTS[id].name)
  const end = WAYPOINTS[plan.days[plan.days.length - 1].end].name
  const loop = plan.start === plan.days[plan.days.length - 1].end
  return `Route map, ${title}: ${names.join(", ")}${loop ? `, and back to ${end}` : ""}. The day-by-day itinerary gives the full detail.`
}
