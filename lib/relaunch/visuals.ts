/**
 * Where each photo and video goes (handoff/relaunch/design/VISUAL_BRIEF.md).
 * Ids refer to lib/relaunch/media.ts. Rules applied when choosing:
 *
 *  - A day photo shows the day's destination or the road that day, by
 *    the manifest's verified place. Where nothing matches, the day gets
 *    a generic atmosphere image (captioned generically) or no image.
 *  - A stay gets a photo of its area only where we have one that isn't
 *    already used for a day on the same page. It is captioned with the
 *    place, never presented as the lodge (no lodge photographs yet,
 *    STRATEGY §5), and carries "Photograph of the lodge to come".
 *  - Never public/rentals.jpg or any rooftop-tent image.
 */

import { getMedia, HERO_VIDEOS, type HeroVideoSource, type MediaItem } from "./media-select"

export type RouteVisuals = {
  /** Lead still: route cards, OG image, and the hero poster when there's no video. */
  card: string
  /** Hero: a looping video where we have footage, else a still with Ken Burns. */
  hero: { video?: string; still: string }
  /** Day key (RouteDay.days) → media id. Missing key = no image for that day. */
  days: Record<string, string>
  /** Primary stay slug → media id of the area. */
  stays: Record<string, string>
  /** Full-bleed interludes: after "The drive", and before "Before you go". */
  interludes: [string, string]
  /** Behind the closing call to action. */
  closing: string
}

export const ROUTE_VISUALS: Record<string, RouteVisuals> = {
  "zimbabwe-falls-hwange-matobo": {
    card: "victoria-falls-aerial-zambezi",
    hero: { video: "victoria-falls-rainbow", still: "victoria-falls-late-light" },
    days: {
      "1–2": "victoria-falls-late-light",
      "3–4": "hwange-dusk-pan",
      "5–7": "hwange-elephant-zebra-waterhole",
      "8": "matobo-road-sign",
      "9–11": "matobo-balancing-rocks",
    },
    stays: {
      "victoria-falls-safari-lodge": "zambezi-sunset-cruise",
      "amalinda-lodge": "matobo-nswatugi-rock-art",
    },
    interludes: ["matobo-granite-kopjes", "matobo-white-rhino-calf"],
    closing: "fire-at-night",
  },
  "namibia-kalahari-to-etosha": {
    card: "deadvlei-camelthorn-trees",
    hero: { video: "namibia-desert-road-aerial", still: "damaraland-gravel-road" },
    days: {
      "1": "binoculars-map-namibia",
      "2": "kalahari-giraffe-sunrise",
      "3": "sossusvlei-dune-45-sunrise",
      "4": "deadvlei-camelthorn-trees",
      "5": "coast-road-fog-bank",
      "6": "swakopmund-fog-sign",
      "7": "spitzkoppe-peak",
      "8": "damaraland-gravel-road",
      "9": "damaraland-desert-elephant-dust",
      "10": "long-gravel-road-sunrise",
      "11": "okaukuejo-black-rhino-drinking",
      "12": "etosha-pan-edge",
      "15": "game-drive-from-behind",
    },
    stays: {
      "bagatelle-kalahari-game-ranch": "kalahari-camelthorn-sunset",
      "sossus-dune-lodge": "deadvlei-aerial",
      "camp-kipwe": "twyfelfontein-giraffe-engravings",
      "okaukuejo-resort": "okaukuejo-waterhole-dusk",
      "okonjima-plains-camp": "okonjima-leopard",
    },
    interludes: ["namib-milky-way", "lodge-deck-namibian-desert"],
    closing: "fire-at-night",
  },
  "four-corners-falls-chobe-caprivi": {
    card: "chobe-elephants-evening-crossing",
    hero: { still: "chobe-elephants-evening-crossing" },
    days: {
      "1–2": "victoria-falls-rainbow-panorama",
      "3–4": "chobe-elephants-crossing",
      "5–6": "nkasa-rupara-red-lechwe",
      "7–8": "popa-falls-golden-light",
      "9": "b8-trans-caprivi-road",
    },
    stays: {
      "vic-falls-victoria-falls-safari-lodge": "zambezi-sunset-cruise",
      "muchenje-safari-lodge": "chobe-river-sunset",
      "nunda-river-lodge": "okavango-sunset-bwabwata",
    },
    interludes: ["victoria-falls-aerial-zambezi", "linyanti-hippo"],
    closing: "fire-at-night",
  },
}

export type CountryVisuals = {
  hero: string
  /** One per benefit, in order. */
  benefits: [string, string, string]
  gallery: [string, string, string]
  closing: string
}

export const COUNTRY_VISUALS: Record<string, CountryVisuals> = {
  zimbabwe: {
    hero: "matobo-granite-kopjes",
    benefits: ["matobo-road-sign", "hwange-elephant-zebra-waterhole", "victoria-falls-late-light"],
    gallery: ["hwange-dusk-pan", "matobo-balancing-rocks", "matobo-nswatugi-rock-art"],
    closing: "fire-at-night",
  },
  namibia: {
    hero: "sossusvlei-dune-45-sunrise",
    benefits: ["damaraland-gravel-road", "okaukuejo-waterhole-dusk", "binoculars-map-namibia"],
    gallery: ["deadvlei-camelthorn-trees", "damaraland-desert-elephant-dust", "spitzkoppe-peak"],
    closing: "namib-milky-way",
  },
  "botswana-zambia": {
    hero: "chobe-elephants-crossing",
    benefits: ["b8-trans-caprivi-road", "chobe-river-sunset", "victoria-falls-sunset-mist"],
    gallery: ["popa-falls-golden-light", "nkasa-rupara-red-lechwe", "linyanti-hippo"],
    closing: "okavango-sunset-bwabwata",
  },
}

export type GuideVisuals = {
  /** One image, or two for a diptych. */
  hero: string[]
  /** Inline images, each placed before the H2 with this exact text. */
  inline?: { beforeHeading: string; id: string }[]
}

/** Field Notes self-drive guides. Only subjects we actually have a photo for. */
export const GUIDE_VISUALS: Record<string, GuideVisuals> = {
  "namibia-or-zimbabwe-first": {
    hero: ["sossusvlei-dune-45-sunrise", "hwange-dusk-pan"],
    inline: [{ beforeHeading: "Where Botswana fits", id: "hwange-elephant-zebra-waterhole" }],
  },
  "choosing-a-vehicle": {
    hero: ["coast-road-fog-bank"],
    inline: [{ beforeHeading: "Which roads need which car", id: "damaraland-gravel-road" }],
  },
  "driving-on-the-left": {
    hero: ["b8-trans-caprivi-road"],
  },
  "gravel-roads": {
    hero: ["damaraland-gravel-road"],
    inline: [{ beforeHeading: "Dust and other cars", id: "long-gravel-road-sunrise" }],
  },
  "border-crossings": {
    hero: ["chobe-river-sunset"],
  },
  "fuel-cash-and-signal": {
    hero: ["long-gravel-road-sunrise"],
    inline: [{ beforeHeading: "Offline maps", id: "binoculars-map-namibia" }],
  },
  "after-dark-and-wildlife-on-the-road": {
    hero: ["okaukuejo-waterhole-dusk"],
    inline: [
      { beforeHeading: "Why we don't drive after sunset", id: "namib-milky-way" },
      { beforeHeading: "Elephants in the road", id: "damaraland-desert-elephant-dust" },
    ],
  },
}

/** Homepage and shared bands. */
export const HOME_VISUALS = {
  heroVideo: "victoria-falls-rainbow",
  byHand: "binoculars-map-namibia",
  interludes: ["hwange-elephant-zebra-waterhole", "deadvlei-aerial"] as const,
  pillars: ["damaraland-gravel-road", "lodge-deck-river-dusk", "victoria-falls-sunset-mist"] as const,
  canI: "b8-trans-caprivi-road",
}

export const ROUTES_INDEX_VISUALS = {
  hero: "long-gravel-road-sunrise",
  how: ["binoculars-map-namibia", "coast-road-fog-bank"] as const,
}

export const FIELD_NOTES_INDEX_VISUALS = {
  hero: "binoculars-map-namibia",
}

export const ABOUT_VISUALS = {
  principles: ["damaraland-gravel-road", "lodge-deck-river-dusk", "victoria-falls-sunset-mist"] as const,
  fromVictoriaFalls: "victoria-falls-aerial-zambezi",
  values: ["lodge-deck-namibian-desert", "okaukuejo-waterhole-dusk", "matobo-white-rhino-calf"] as const,
}

// ─── Lookups ─────────────────────────────────────────────────────

export function routeCardMedia(slug: string): MediaItem | undefined {
  const v = ROUTE_VISUALS[slug]
  return v ? getMedia(v.card) : undefined
}

export function routeHero(slug: string): { still: MediaItem; video?: HeroVideoSource; videoItem?: MediaItem } | undefined {
  const v = ROUTE_VISUALS[slug]
  if (!v) return undefined
  const video = v.hero.video ? HERO_VIDEOS[v.hero.video] : undefined
  return {
    still: getMedia(v.hero.still),
    video,
    videoItem: video ? getMedia(video.id) : undefined,
  }
}

export function guideHero(slug: string): MediaItem | undefined {
  const v = GUIDE_VISUALS[slug]
  return v ? getMedia(v.hero[0]) : undefined
}
