import { getSupabaseServerClient } from "@/lib/supabase"

/**
 * Mint the next SO-YYYY-NNNN reference for the current year.
 *
 * Atomic — backed by the `mint_reference_for_year` Postgres function
 * (see supabase/migrations/20260516_itineraries.sql). Concurrent
 * creates will see strictly-increasing values within a year.
 */
export async function mintReference(year?: number): Promise<string> {
  const y = year ?? new Date().getFullYear()
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Supabase server client not available")

  const { data, error } = await supabase.rpc("mint_reference_for_year", {
    year_in: y,
  })
  if (error) throw error
  return `SO-${y}-${String(data).padStart(4, "0")}`
}
