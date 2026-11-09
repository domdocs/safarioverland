/**
 * Helpers over the media manifest (lib/relaunch/media.ts).
 *
 * Captions follow the visual brief: mono, "Place · detail", built only
 * from what the manifest records (place, alt, notes). No times or
 * details are invented. Where `verifiedPlace` is false the caption is
 * generic ("On the road", "Namibia · the dunes") and never names a
 * specific park, lodge or road.
 *
 * Credits: CC BY / CC BY-SA files must show their `credit` line wherever
 * they appear. `creditFor` returns it, or null when none is required
 * (Pexels licence, CC0).
 */

import { media, mediaById, type MediaArea, type MediaItem } from "./media"

export type { MediaItem }

/** One manifest item by id. Throws in development if the id is wrong. */
export function getMedia(id: string): MediaItem {
  const item = mediaById[id]
  if (!item) throw new Error(`Unknown media id: ${id}`)
  return item
}

/**
 * Photos for a place or an area. A place matches when the manifest's
 * `place` contains it (case-insensitive), and only verified places
 * match by name. An area ("zimbabwe", "namibia"…) returns every photo
 * filed under it.
 */
export function mediaFor(placeOrArea: string): MediaItem[] {
  const q = placeOrArea.toLowerCase()
  const areas: MediaArea[] = ["zimbabwe", "namibia", "four-corners", "atmosphere", "video"]
  if ((areas as string[]).includes(q)) return media.filter((m) => m.area === q)
  return media.filter((m) => m.type === "photo" && m.verifiedPlace && m.place.toLowerCase().includes(q))
}

/**
 * Mono captions. Verified items name the place the manifest gives;
 * unverified items stay generic. Each detail is taken from the item's
 * alt text or notes.
 */
const CAPTIONS: Record<string, string> = {
  // Zimbabwe
  "victoria-falls-late-light": "Victoria Falls · late afternoon",
  "victoria-falls-aerial-zambezi": "Victoria Falls · the Zambezi from the air",
  "victoria-falls-rainbow-panorama": "Victoria Falls · a rainbow in the spray",
  "victoria-falls-sunset-mist": "Victoria Falls · sunset",
  "zambezi-sunset-cruise": "Upper Zambezi, Victoria Falls · sunset",
  "hwange-dusk-pan": "Hwange National Park · a pan at dusk",
  "hwange-elephant-zebra-waterhole": "Hwange National Park · a waterhole",
  "matobo-granite-kopjes": "Matobo National Park · granite boulders",
  "matobo-balancing-rocks": "Matobo National Park · Mother and Child rocks",
  "matobo-road-sign": "Matobo, near Bulawayo · road sign",
  "matobo-nswatugi-rock-art": "Nswatugi Cave, Matobo · rock paintings",
  // Manifest note: caption rhino images by region only.
  "matobo-white-rhino-calf": "Zimbabwe · white rhino and calf",
  // Namibia
  "deadvlei-camelthorn-trees": "Deadvlei · camelthorn trees",
  "deadvlei-aerial": "Deadvlei · from the air",
  "spitzkoppe-peak": "Spitzkoppe · Erongo",
  "twyfelfontein-giraffe-engravings": "Twyfelfontein · rock engravings",
  "okaukuejo-waterhole-dusk": "Okaukuejo waterhole, Etosha · dusk",
  "etosha-pan-edge": "Etosha National Park · the edge of the pan",
  "okaukuejo-black-rhino-drinking": "Etosha · black rhino",
  "sossusvlei-dune-45-sunrise": "Dune 45, Sossusvlei · sunrise",
  "kalahari-giraffe-sunrise": "Kalahari, Namibia · sunrise",
  "skeleton-coast-fog": "Skeleton Coast · fog",
  "skeleton-coast-oil-rig-wreck": "Skeleton Coast · an old oil rig",
  "kalahari-camelthorn-sunset": "Kalahari, Namibia · sunset",
  "damaraland-desert-elephant-dust": "Damaraland · desert-adapted elephant",
  "damaraland-gravel-road": "Damaraland · gravel road",
  "okonjima-leopard": "Okonjima Nature Reserve · leopard",
  "namib-milky-way": "Namib-Naukluft · the Milky Way",
  "swakopmund-fog-sign": "Swakopmund · fog warning",
  "coast-road-fog-bank": "Namibia · the coast road",
  // Four corners
  "chobe-elephants-crossing": "Chobe River · elephants crossing",
  "chobe-elephants-evening-crossing": "Chobe River · an evening crossing",
  "chobe-river-sunset": "Chobe River · sunset",
  "popa-falls-golden-light": "Popa Falls · the Okavango",
  "mudumu-park-sign": "Mudumu National Park · the entrance",
  "nkasa-rupara-red-lechwe": "Nkasa Rupara National Park · red lechwe",
  "linyanti-hippo": "Linyanti River · hippo",
  "okavango-sunset-bwabwata": "Okavango River, Bwabwata · sunset",
  "b8-trans-caprivi-road": "The B8 · Bwabwata National Park",
  // Atmosphere (all unverified: generic captions only)
  "lodge-deck-river-dusk": "A lodge deck · dusk",
  "lodge-deck-namibian-desert": "Namibia · a lodge deck",
  "fire-at-night": "After dark",
  "game-drive-from-behind": "On a game drive",
  "long-gravel-road-sunrise": "On the road",
  "binoculars-map-namibia": "A map of Namibia",
  // Video
  "victoria-falls-rainbow": "Victoria Falls · a rainbow in the spray",
  "river-sunset-from-boat": "On the river · sunset",
  "elephants-at-waterhole": "At a waterhole",
  "namib-tiras-mountains-aerial": "Namib Desert · near the Tiras Mountains",
  "namibian-dunes-aerial": "Namibia · the dunes",
  "namibia-desert-road-aerial": "Namibia · on the road",
}

/** The mono caption for an item. Falls back to the area for anything unlisted. */
export function captionFor(item: MediaItem): string {
  const c = CAPTIONS[item.id]
  if (c) return c
  if (item.verifiedPlace) return item.place
  const area: Record<MediaArea, string> = {
    zimbabwe: "Zimbabwe",
    namibia: "Namibia",
    "four-corners": "Southern Africa",
    atmosphere: "On the road",
    video: "Southern Africa",
  }
  return area[item.area]
}

/** The place name alone, for labels such as a stay's area photo. Verified places only. */
export function placeLabelFor(item: MediaItem): string | null {
  if (!item.verifiedPlace) return null
  return captionFor(item).split(" · ")[0]
}

/** The credit line that must be printed, or null when none is required. */
/**
 * The short on-image credit: the photographer's name, as they ask to be
 * credited. The licence, source link and the note that files were resized
 * and converted live on /credits, linked from every page's footer — CC 4.0
 * allows attribution "in any reasonable manner", including via a linked
 * page. The full licence line stays in `item.credit` for /credits.
 */
export function creditFor(item: MediaItem): string | null {
  return item.attributionRequired && item.author ? `Photo: ${item.author}` : null
}

/** Card-size source where one exists. */
export function cardSrc(item: MediaItem): string {
  return item.src1200 ?? item.src
}

// ─── Hero video renditions ───────────────────────────────────────
// Re-encoded from the manifest's Pexels files (H.264, no audio track,
// faststart, 10 s): a 1280×720 desktop file and a 576×720 (4:5) centre
// crop for portrait phones. The poster is the first frame of the trim.

export type HeroVideoSource = {
  id: string
  desktop: string
  portrait: string
  poster: string
}

export const HERO_VIDEOS: Record<string, HeroVideoSource> = {
  "victoria-falls-rainbow": {
    id: "victoria-falls-rainbow",
    desktop: "/media/video/victoria-falls-rainbow-720.mp4",
    portrait: "/media/video/victoria-falls-rainbow-portrait.mp4",
    poster: "/media/video/victoria-falls-rainbow-hero-poster.webp",
  },
  "namibia-desert-road-aerial": {
    id: "namibia-desert-road-aerial",
    desktop: "/media/video/namibia-desert-road-aerial-720.mp4",
    portrait: "/media/video/namibia-desert-road-aerial-portrait.mp4",
    poster: "/media/video/namibia-desert-road-aerial-hero-poster.webp",
  },
}
