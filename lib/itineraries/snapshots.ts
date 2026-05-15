/**
 * Snapshots — immutable copies of an itinerary at publish time.
 *
 * The public `/trips/[slug]` route reads from snapshots, not from the
 * live itinerary tables. That separation means:
 *   - Editing a published itinerary doesn't leak unfinished changes
 *     to the customer
 *   - Re-publishing creates a new "current" snapshot; older ones
 *     remain for audit
 *   - Public reads never touch admin-protected data
 */

import { getSupabaseServerClient } from "@/lib/supabase"

import type { Chapter, Itinerary, Transit } from "./types"
import { slugify } from "./types"

/** The full payload baked into a snapshot. */
export type SnapshotData = {
  itinerary: Itinerary
  chapters: Chapter[]
  transits: Transit[]
}

export type Snapshot = {
  id: string
  itinerary_id: string
  slug: string
  reference: string
  data: SnapshotData
  published_at: string
  published_by: string | null
  is_current: boolean
  created_at: string
}

function requireClient() {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Supabase server client not available")
  return supabase
}

/**
 * Mint a URL-safe slug for an itinerary, unique across all
 * `itineraries.slug`. Strategy: combine guest lastname + year. Fall
 * back to title-based slug if guests are missing. Append a numeric
 * suffix if collision (rare).
 *
 * The slug is stable once minted — re-publishing keeps the same slug
 * so customer-facing URLs never break.
 */
export async function mintSlug(itinerary: Itinerary): Promise<string> {
  const supabase = requireClient()

  // Compose the base: prefer guest lastname + year, fall back to
  // title-slugified, then to reference.
  let base = ""
  const firstGuest = itinerary.guests[0]
  if (firstGuest) {
    const last = firstGuest.split(/\s+/).filter(Boolean).pop() ?? ""
    base = slugify(last)
  }
  if (!base) base = slugify(itinerary.title)
  if (!base) base = slugify(itinerary.reference)

  const year = itinerary.dates_year ?? new Date().getFullYear().toString()
  let candidate = `${base}-${year}`
  let suffix = 2

  // Collision check across both itineraries.slug and itinerary_snapshots.slug.
  while (await slugExists(candidate)) {
    candidate = `${base}-${year}-${suffix}`
    suffix += 1
    if (suffix > 50) {
      // Very unlikely — bail with reference-based slug as a last resort.
      candidate = `${slugify(itinerary.reference)}-${Date.now()}`
      break
    }
  }
  return candidate
}

async function slugExists(slug: string): Promise<boolean> {
  const supabase = requireClient()
  const { data: itin } = await supabase
    .from("itineraries")
    .select("id")
    .eq("slug", slug)
    .maybeSingle()
  if (itin) return true
  const { data: snap } = await supabase
    .from("itinerary_snapshots")
    .select("id")
    .eq("slug", slug)
    .maybeSingle()
  return Boolean(snap)
}

/**
 * Save a snapshot of the current itinerary state. Marks any existing
 * "current" snapshot for this slug as not-current, then inserts the
 * new one as current.
 */
export async function createSnapshot(args: {
  data: SnapshotData
  publishedBy?: string | null
}): Promise<Snapshot> {
  const supabase = requireClient()
  const { itinerary } = args.data
  if (!itinerary.slug) {
    throw new Error("Cannot snapshot an itinerary without a slug")
  }

  // Flip prior current to not-current.
  await supabase
    .from("itinerary_snapshots")
    .update({ is_current: false })
    .eq("slug", itinerary.slug)
    .eq("is_current", true)

  const { data, error } = await supabase
    .from("itinerary_snapshots")
    .insert({
      itinerary_id: itinerary.id,
      slug: itinerary.slug,
      reference: itinerary.reference,
      data: args.data,
      published_by: args.publishedBy ?? null,
      is_current: true,
    })
    .select("*")
    .single()
  if (error) throw error
  return data as Snapshot
}

/** Look up the current snapshot for a public slug — feeds /trips/[slug]. */
export async function getCurrentSnapshotBySlug(
  slug: string,
): Promise<Snapshot | null> {
  const supabase = requireClient()
  const { data, error } = await supabase
    .from("itinerary_snapshots")
    .select("*")
    .eq("slug", slug)
    .eq("is_current", true)
    .maybeSingle()
  if (error) throw error
  return (data as Snapshot | null) ?? null
}
