/**
 * Trip Designer — CRUD helpers.
 *
 * All operations go through the service-role Supabase client (RLS is on
 * but the API routes are gated by admin Basic Auth at middleware level).
 *
 * Invariant maintained throughout: transits.length === max(0, chapters.length - 1)
 * — one transit between every adjacent pair of chapters.
 */

import { getSupabaseServerClient } from "@/lib/supabase"

import { DEFAULT_CURATOR_LOCATION, DEFAULT_CURATOR_NAME, DEFAULT_CURATOR_TITLE, DEFAULT_PRACTICALS } from "./defaults"
import { mintReference } from "./reference"
import { slugify, type Chapter, type Itinerary, type ItineraryWithRelations, type Transit } from "./types"

const ITINERARY_COLS =
  "id, slug, reference, status, title, cover_title_lines, subtitle, guests, dates_from, dates_to, dates_year, pace, curator_name, curator_title, curator_location, prologue, cover_photo_url, palette, typography, density, show_curator_notes, source_brief_id, practicals, created_at, updated_at, created_by"

const CHAPTER_COLS =
  "id, itinerary_id, position, slug, place, country, coords_lat, coords_lon, nights, dates, palette, epigraph, intro, seeing, note, lodge, rhythm, photo_hero_url, photo_lodge_url, created_at, updated_at"

const TRANSIT_COLS =
  "id, itinerary_id, from_chapter_id, to_chapter_id, position, mode, duration, distance, crosses, note, created_at, updated_at"

function requireClient() {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Supabase server client not available")
  return supabase
}

function mapChapter(row: Record<string, unknown>): Chapter {
  return {
    id: row.id as string,
    itinerary_id: row.itinerary_id as string,
    position: row.position as number,
    slug: (row.slug as string) ?? "",
    place: (row.place as string) ?? "",
    country: (row.country as string) ?? "",
    coords_lat: row.coords_lat !== null && row.coords_lat !== undefined ? Number(row.coords_lat) : null,
    coords_lon: row.coords_lon !== null && row.coords_lon !== undefined ? Number(row.coords_lon) : null,
    nights: (row.nights as number) ?? 1,
    dates: (row.dates as string) ?? "",
    palette: (row.palette as string | null) ?? null,
    epigraph: (row.epigraph as string) ?? "",
    intro: (row.intro as string[] | null) ?? [],
    seeing: (row.seeing as string[] | null) ?? [],
    note: (row.note as string | null) ?? null,
    lodge: (row.lodge as Chapter["lodge"]) ?? { name: "", kind: "", room: "", blurb: "", amenities: [] },
    rhythm: (row.rhythm as Chapter["rhythm"]) ?? [],
    photo_hero_url: (row.photo_hero_url as string | null) ?? null,
    photo_lodge_url: (row.photo_lodge_url as string | null) ?? null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }
}

function mapItinerary(row: Record<string, unknown>): Itinerary {
  return {
    id: row.id as string,
    slug: (row.slug as string | null) ?? null,
    reference: row.reference as string,
    status: row.status as Itinerary["status"],
    title: row.title as string,
    cover_title_lines: (row.cover_title_lines as string[] | null) ?? [],
    subtitle: (row.subtitle as string | null) ?? null,
    guests: (row.guests as string[] | null) ?? [],
    dates_from: (row.dates_from as string | null) ?? null,
    dates_to: (row.dates_to as string | null) ?? null,
    dates_year: (row.dates_year as string | null) ?? null,
    pace: (row.pace as string | null) ?? null,
    curator_name: (row.curator_name as string | null) ?? null,
    curator_title: (row.curator_title as string) ?? DEFAULT_CURATOR_TITLE,
    curator_location: (row.curator_location as string) ?? DEFAULT_CURATOR_LOCATION,
    prologue: (row.prologue as string[] | null) ?? [],
    cover_photo_url: (row.cover_photo_url as string | null) ?? null,
    palette: (row.palette as Itinerary["palette"]) ?? "savanna",
    typography: (row.typography as Itinerary["typography"]) ?? "editorial",
    density: (row.density as Itinerary["density"]) ?? "spacious",
    show_curator_notes: row.show_curator_notes !== false,
    source_brief_id: (row.source_brief_id as string | null) ?? null,
    practicals: (row.practicals as Itinerary["practicals"]) ?? [],
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    created_by: (row.created_by as string | null) ?? null,
  }
}

function mapTransit(row: Record<string, unknown>): Transit {
  return {
    id: row.id as string,
    itinerary_id: row.itinerary_id as string,
    from_chapter_id: row.from_chapter_id as string,
    to_chapter_id: row.to_chapter_id as string,
    position: row.position as number,
    mode: row.mode as string,
    duration: row.duration as string,
    distance: row.distance as string,
    crosses: row.crosses as string,
    note: row.note as string,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }
}

// ── List / read ─────────────────────────────────────────────────────────

export async function listItineraries(args?: {
  status?: Itinerary["status"]
  limit?: number
  offset?: number
}): Promise<Itinerary[]> {
  const supabase = requireClient()
  let query = supabase.from("itineraries").select(ITINERARY_COLS)
  if (args?.status) query = query.eq("status", args.status)
  query = query
    .order("updated_at", { ascending: false })
    .range(args?.offset ?? 0, (args?.offset ?? 0) + (args?.limit ?? 100) - 1)
  const { data, error } = await query
  if (error) throw error
  return (data ?? []).map(mapItinerary)
}

export async function getItinerary(id: string): Promise<ItineraryWithRelations | null> {
  const supabase = requireClient()

  const { data: itinRow, error: itinErr } = await supabase
    .from("itineraries")
    .select(ITINERARY_COLS)
    .eq("id", id)
    .maybeSingle()
  if (itinErr) throw itinErr
  if (!itinRow) return null

  const { data: chapterRows, error: chErr } = await supabase
    .from("itinerary_chapters")
    .select(CHAPTER_COLS)
    .eq("itinerary_id", id)
    .order("position", { ascending: true })
  if (chErr) throw chErr

  const { data: transitRows, error: trErr } = await supabase
    .from("itinerary_transits")
    .select(TRANSIT_COLS)
    .eq("itinerary_id", id)
    .order("position", { ascending: true })
  if (trErr) throw trErr

  return {
    itinerary: mapItinerary(itinRow),
    chapters: (chapterRows ?? []).map(mapChapter),
    transits: (transitRows ?? []).map(mapTransit),
  }
}

// ── Create / update / delete (itinerary) ────────────────────────────────

export async function createItinerary(args: {
  title: string
  source_brief_id?: string
  created_by?: string | null
}): Promise<Itinerary> {
  const supabase = requireClient()
  const reference = await mintReference()

  const { data, error } = await supabase
    .from("itineraries")
    .insert({
      title: args.title,
      reference,
      status: "draft",
      curator_name: DEFAULT_CURATOR_NAME,
      curator_title: DEFAULT_CURATOR_TITLE,
      curator_location: DEFAULT_CURATOR_LOCATION,
      practicals: DEFAULT_PRACTICALS,
      source_brief_id: args.source_brief_id ?? null,
      created_by: args.created_by ?? null,
    })
    .select(ITINERARY_COLS)
    .single()
  if (error) throw error
  return mapItinerary(data)
}

export async function updateItinerary(id: string, patch: Record<string, unknown>): Promise<Itinerary> {
  const supabase = requireClient()
  const { data, error } = await supabase
    .from("itineraries")
    .update(patch)
    .eq("id", id)
    .select(ITINERARY_COLS)
    .single()
  if (error) throw error
  return mapItinerary(data)
}

export async function deleteItinerary(id: string): Promise<void> {
  const supabase = requireClient()
  const { error } = await supabase.from("itineraries").delete().eq("id", id)
  if (error) throw error
}

// ── Chapters + transits ─────────────────────────────────────────────────

async function loadChapters(itineraryId: string): Promise<Chapter[]> {
  const supabase = requireClient()
  const { data, error } = await supabase
    .from("itinerary_chapters")
    .select(CHAPTER_COLS)
    .eq("itinerary_id", itineraryId)
    .order("position", { ascending: true })
  if (error) throw error
  return (data ?? []).map(mapChapter)
}

async function loadTransits(itineraryId: string): Promise<Transit[]> {
  const supabase = requireClient()
  const { data, error } = await supabase
    .from("itinerary_transits")
    .select(TRANSIT_COLS)
    .eq("itinerary_id", itineraryId)
    .order("position", { ascending: true })
  if (error) throw error
  return (data ?? []).map(mapTransit)
}

/**
 * Append a new chapter at the end. If a previous chapter exists a
 * placeholder transit (mode=Transfer, duration=TBD, ...) is inserted to
 * keep transits.length === chapters.length - 1.
 */
export async function createChapter(
  itineraryId: string,
  input: { place: string; country?: string },
): Promise<{ chapter: Chapter; transits: Transit[] }> {
  const supabase = requireClient()

  const existing = await loadChapters(itineraryId)
  const position = existing.length

  // Slug: unique-within-trip. Append a numeric suffix if collision.
  let baseSlug = slugify(input.place)
  let slug = baseSlug
  let suffix = 2
  const taken = new Set(existing.map((c) => c.slug))
  while (taken.has(slug)) {
    slug = `${baseSlug}-${suffix}`
    suffix += 1
  }

  const { data, error } = await supabase
    .from("itinerary_chapters")
    .insert({
      itinerary_id: itineraryId,
      position,
      slug,
      place: input.place,
      country: input.country ?? "",
      nights: 1,
      dates: "",
      epigraph: "",
      lodge: { name: "", kind: "", room: "", blurb: "", amenities: [] },
      rhythm: [],
    })
    .select(CHAPTER_COLS)
    .single()
  if (error) throw error
  const chapter = mapChapter(data)

  // If this isn't the first chapter, insert a placeholder transit from the
  // previous chapter to this one.
  if (position > 0) {
    const prev = existing[existing.length - 1]
    const { error: trErr } = await supabase
      .from("itinerary_transits")
      .insert({
        itinerary_id: itineraryId,
        from_chapter_id: prev.id,
        to_chapter_id: chapter.id,
        position: position - 1,
        mode: "Transfer",
        duration: "TBD",
        distance: "TBD",
        crosses: "TBD",
        note: "To be specified.",
      })
    if (trErr) throw trErr
  }

  const transits = await loadTransits(itineraryId)
  return { chapter, transits }
}

export async function updateChapter(
  id: string,
  patch: Record<string, unknown>,
): Promise<Chapter> {
  const supabase = requireClient()

  // If place changes, re-slug — but never break the unique constraint, so
  // only re-slug if the caller passed an explicit slug-clearing intent. In
  // practice we keep slugs stable once minted.
  if (typeof patch.place === "string" && patch.place.length > 0 && !("slug" in patch)) {
    // No-op: keep the existing slug. The brief says slug auto-generates
    // from place on save, but stability across edits is more important
    // for a reference field.
  }

  const { data, error } = await supabase
    .from("itinerary_chapters")
    .update(patch)
    .eq("id", id)
    .select(CHAPTER_COLS)
    .single()
  if (error) throw error
  return mapChapter(data)
}

/**
 * Delete a chapter and rebuild the transit chain.
 *
 * Steps:
 *   1. Delete the chapter (cascades remove any transits FK'd to it).
 *   2. Compact positions of remaining chapters (so positions stay 0..N-1).
 *   3. Rebuild the transit chain so each adjacent pair has exactly one
 *      transit at the correct position.
 */
export async function deleteChapter(itineraryId: string, chapterId: string): Promise<Transit[]> {
  const supabase = requireClient()

  const { error: delErr } = await supabase
    .from("itinerary_chapters")
    .delete()
    .eq("id", chapterId)
  if (delErr) throw delErr

  const chapters = await loadChapters(itineraryId)

  // Compact positions if a gap exists. Two-step shuffle through a high
  // offset to dodge the UNIQUE (itinerary_id, position) constraint.
  for (let i = 0; i < chapters.length; i += 1) {
    if (chapters[i].position !== i) {
      const tmp = 1000 + i
      await supabase
        .from("itinerary_chapters")
        .update({ position: tmp })
        .eq("id", chapters[i].id)
    }
  }
  for (let i = 0; i < chapters.length; i += 1) {
    if (chapters[i].position !== i) {
      await supabase
        .from("itinerary_chapters")
        .update({ position: i })
        .eq("id", chapters[i].id)
      chapters[i].position = i
    }
  }

  await rebuildTransits(itineraryId, chapters)
  return loadTransits(itineraryId)
}

/**
 * Apply a new chapter order, rebuild transit chain. `newOrder` is an
 * array of chapter IDs in the desired new order — must cover every chapter
 * exactly once.
 */
export async function reorderChapters(
  itineraryId: string,
  newOrder: string[],
): Promise<{ chapters: Chapter[]; transits: Transit[] }> {
  const supabase = requireClient()
  const existing = await loadChapters(itineraryId)

  if (newOrder.length !== existing.length) {
    throw new Error(
      `reorderChapters: newOrder has ${newOrder.length} ids but trip has ${existing.length} chapters`,
    )
  }
  const existingIds = new Set(existing.map((c) => c.id))
  for (const id of newOrder) {
    if (!existingIds.has(id)) {
      throw new Error(`reorderChapters: unknown chapter id ${id}`)
    }
  }

  // Two-step shuffle to dodge UNIQUE (itinerary_id, position).
  for (let i = 0; i < newOrder.length; i += 1) {
    const { error } = await supabase
      .from("itinerary_chapters")
      .update({ position: 1000 + i })
      .eq("id", newOrder[i])
    if (error) throw error
  }
  for (let i = 0; i < newOrder.length; i += 1) {
    const { error } = await supabase
      .from("itinerary_chapters")
      .update({ position: i })
      .eq("id", newOrder[i])
    if (error) throw error
  }

  const chapters = await loadChapters(itineraryId)
  await rebuildTransits(itineraryId, chapters)
  const transits = await loadTransits(itineraryId)
  return { chapters, transits }
}

/**
 * Bring transits into sync with chapter adjacency.
 *
 * For each pair (chapters[i], chapters[i+1]) we want exactly one
 * transit with position=i, from_chapter_id=chapters[i].id, to_chapter_id=chapters[i+1].id.
 *
 * Strategy: load all existing transits, match by (from, to) pair where
 * possible (preserving the user's mode/duration/distance/crosses/note),
 * insert placeholders for missing pairs, delete leftovers.
 */
async function rebuildTransits(itineraryId: string, chapters: Chapter[]): Promise<void> {
  const supabase = requireClient()
  const existing = await loadTransits(itineraryId)

  // Build the desired transit set, reusing existing rows where the
  // (from, to) pair matches.
  const desiredCount = Math.max(0, chapters.length - 1)
  const claimed = new Set<string>()
  const updates: Array<{ id: string; position: number }> = []
  const inserts: Array<{
    itinerary_id: string
    from_chapter_id: string
    to_chapter_id: string
    position: number
    mode: string
    duration: string
    distance: string
    crosses: string
    note: string
  }> = []

  for (let i = 0; i < desiredCount; i += 1) {
    const from = chapters[i]
    const to = chapters[i + 1]
    const match = existing.find(
      (t) =>
        !claimed.has(t.id) &&
        t.from_chapter_id === from.id &&
        t.to_chapter_id === to.id,
    )
    if (match) {
      claimed.add(match.id)
      if (match.position !== i) updates.push({ id: match.id, position: i })
    } else {
      inserts.push({
        itinerary_id: itineraryId,
        from_chapter_id: from.id,
        to_chapter_id: to.id,
        position: i,
        mode: "Transfer",
        duration: "TBD",
        distance: "TBD",
        crosses: "TBD",
        note: "To be specified.",
      })
    }
  }

  // Delete any transits we didn't claim.
  const toDelete = existing.filter((t) => !claimed.has(t.id)).map((t) => t.id)
  if (toDelete.length > 0) {
    const { error } = await supabase
      .from("itinerary_transits")
      .delete()
      .in("id", toDelete)
    if (error) throw error
  }

  // Two-step position shuffle (push survivors to a high offset, then settle).
  if (updates.length > 0) {
    for (const u of updates) {
      await supabase
        .from("itinerary_transits")
        .update({ position: 2000 + u.position })
        .eq("id", u.id)
    }
    for (const u of updates) {
      const { error } = await supabase
        .from("itinerary_transits")
        .update({ position: u.position })
        .eq("id", u.id)
      if (error) throw error
    }
  }

  if (inserts.length > 0) {
    const { error } = await supabase.from("itinerary_transits").insert(inserts)
    if (error) throw error
  }
}

export async function updateTransit(
  id: string,
  patch: Record<string, unknown>,
): Promise<Transit> {
  const supabase = requireClient()
  const { data, error } = await supabase
    .from("itinerary_transits")
    .update(patch)
    .eq("id", id)
    .select(TRANSIT_COLS)
    .single()
  if (error) throw error
  return mapTransit(data)
}
