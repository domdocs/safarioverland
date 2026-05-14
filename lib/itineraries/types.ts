/**
 * Trip Designer — shared types.
 *
 * Mirrors the columns defined in supabase/migrations/20260516_itineraries.sql
 * and the canonical schema documented in
 * handoff/design_handoff_itinerary/SCHEMA.md.
 *
 * Roman numerals are NOT stored — they're derived from chapter.position
 * via `toRoman()`.
 */

export type ItineraryStatus = "draft" | "published" | "archived"
export type Palette = "savanna" | "forest" | "coast"
export type Typography = "editorial" | "modern" | "classic"
export type Density = "spacious" | "compact"

export type PracticalCard = {
  title: string
  body: string
}

export type Lodge = {
  name: string
  kind: string
  room: string
  blurb: string
  amenities: string[]
}

export type RhythmItem = {
  time: string
  title: string
  body: string
}

export type Itinerary = {
  id: string
  slug: string | null
  reference: string
  status: ItineraryStatus
  title: string
  cover_title_lines: string[]
  subtitle: string | null
  guests: string[]
  dates_from: string | null
  dates_to: string | null
  dates_year: string | null
  pace: string | null
  curator_name: string | null
  curator_title: string
  curator_location: string
  prologue: string[]
  cover_photo_url: string | null
  palette: Palette
  typography: Typography
  density: Density
  show_curator_notes: boolean
  source_brief_id: string | null
  practicals: PracticalCard[]
  created_at: string
  updated_at: string
  created_by: string | null
}

export type Chapter = {
  id: string
  itinerary_id: string
  position: number
  slug: string
  place: string
  country: string
  coords_lat: number | null
  coords_lon: number | null
  nights: number
  dates: string
  palette: string | null
  epigraph: string
  intro: string[]
  seeing: string[]
  note: string | null
  lodge: Lodge
  rhythm: RhythmItem[]
  photo_hero_url: string | null
  photo_lodge_url: string | null
  created_at: string
  updated_at: string
}

export type Transit = {
  id: string
  itinerary_id: string
  from_chapter_id: string
  to_chapter_id: string
  position: number
  mode: string
  duration: string
  distance: string
  crosses: string
  note: string
  created_at: string
  updated_at: string
}

export type ItineraryWithRelations = {
  itinerary: Itinerary
  chapters: Chapter[]
  transits: Transit[]
}

/**
 * Roman numeral helper. Derived from 0-indexed position.
 *
 * Caps at 14 to match the 1..8 chapter ceiling the brief enforces — we
 * give it a few extra slots so it doesn't crash on bad data.
 */
export function toRoman(positionZeroBased: number): string {
  const n = positionZeroBased + 1
  if (n < 1) return ""
  const map: Array<[number, string]> = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ]
  let result = ""
  let remaining = n
  for (const [value, numeral] of map) {
    while (remaining >= value) {
      result += numeral
      remaining -= value
    }
  }
  return result
}

/**
 * URL-safe slug from a place name. Lowercased, hyphenated, ASCII-only.
 * Matches the convention used elsewhere in the codebase (briefs, listings).
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "chapter"
}
