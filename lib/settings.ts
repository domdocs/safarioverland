import { getSupabaseServerClient } from "./supabase"

/**
 * Site-wide app_settings — single-row config in Supabase.
 *
 * Schema matches supabase/migrations/20260509_create_articles_and_app_settings.sql
 * (id is fixed to 'global'). The DEFAULTS object below is the safe fallback when
 * the table is unreachable or the row is missing — values match the migration's
 * column defaults so reads degrade gracefully.
 *
 * Reads are cached for the duration of a single request (Next's `unstable_cache`
 * isn't ideal here because we want changes to apply on the next page load, not
 * 60 seconds later). Caller-side memoisation per request is enough — the table
 * is single-row and the queries are cheap.
 */

export type AppSettings = {
  id: "global"
  site_name: string | null
  site_description: string | null
  maintenance_mode: boolean
  auto_approve_listings: boolean
  allow_user_reviews: boolean
  show_featured_on_home: boolean
  listings_per_page: number
  notification_email: string | null
  notify_admin_on_new: boolean
  notify_user_on_approval: boolean
  updated_at: string
}

export const DEFAULT_SETTINGS: AppSettings = {
  id: "global",
  site_name: "Safari Overland",
  site_description: null,
  maintenance_mode: false,
  auto_approve_listings: false,
  allow_user_reviews: false,
  show_featured_on_home: true,
  listings_per_page: 12,
  notification_email: null,
  notify_admin_on_new: true,
  notify_user_on_approval: true,
  updated_at: new Date(0).toISOString(),
}

export type SettingsPatch = Partial<
  Omit<AppSettings, "id" | "updated_at">
>

/**
 * Read the global settings row. Returns DEFAULT_SETTINGS if the table can't
 * be reached or the row doesn't exist — never throws.
 */
export async function getSettings(): Promise<AppSettings> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return DEFAULT_SETTINGS

  const { data, error } = await supabase
    .from("app_settings")
    .select("*")
    .eq("id", "global")
    .maybeSingle()

  if (error) {
    console.warn("getSettings failed, falling back to defaults:", error.message)
    return DEFAULT_SETTINGS
  }
  if (!data) return DEFAULT_SETTINGS

  // Merge with defaults so a partial row still satisfies the type.
  return { ...DEFAULT_SETTINGS, ...(data as Partial<AppSettings>), id: "global" }
}

/**
 * Update the global settings row. Returns the new row.
 * Service-role only (RLS denies anon write).
 */
export async function updateSettings(patch: SettingsPatch): Promise<AppSettings> {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Supabase client not available")

  const { data, error } = await supabase
    .from("app_settings")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", "global")
    .select()
    .single()

  if (error) {
    console.error("updateSettings failed:", error)
    throw error
  }
  return { ...DEFAULT_SETTINGS, ...(data as Partial<AppSettings>), id: "global" }
}
