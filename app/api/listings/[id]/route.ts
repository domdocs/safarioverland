import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

/**
 * PUT /api/listings/[id]
 *
 * Whitelist-based update. Only the columns we know about are written —
 * unknown fields in the payload are silently dropped, which keeps stray
 * client-side state from poisoning the row.
 *
 * Editorial / transformational fields (verdict, signature_experience,
 * conservation_summary, …) are all nullable in the DB. Strings are
 * normalised to null when empty; arrays to null when empty; JSON to null
 * when empty array.
 */
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params
    const supabase = getSupabaseServerClient()

    if (!supabase) {
      return NextResponse.json(
        { error: "Failed to initialize Supabase client" },
        { status: 500 },
      )
    }

    let json: Record<string, unknown>
    try {
      json = (await request.json()) as Record<string, unknown>
    } catch (error) {
      console.error("Error parsing request body:", error)
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const updates: Record<string, unknown> = {
      // Legacy fields
      listing_name: json.listing_name,
      category: json.category,
      region: json.region,
      country: json.country,
      location: json.location,
      description: json.description,
      contact_name: json.contact_name,
      contact_email: json.contact_email,
      contact_phone: json.contact_phone,
      website: emptyToNull(json.website),
      price_info: (json.price_info as string) || "",
      image_url: emptyToNull(json.image_url),
      featured: !!json.featured,
      status: json.status,
      updated_at: new Date().toISOString(),

      // Editorial / transformational fields (all optional)
      verdict: emptyToNull(json.verdict),
      signature_experience: emptyToNull(json.signature_experience),
      conservation_summary: emptyToNull(json.conservation_summary),
      community_summary: emptyToNull(json.community_summary),
      wellness_offerings: emptyArrayToNull(json.wellness_offerings),
      activities: emptyArrayToNull(json.activities),
      founder_name: emptyToNull(json.founder_name),
      founder_note: emptyToNull(json.founder_note),
      founder_image_url: emptyToNull(json.founder_image_url),
      traveller_quotes: emptyArrayToNull(json.traveller_quotes),
      external_ratings: emptyArrayToNull(json.external_ratings),
      gallery_urls: emptyArrayToNull(json.gallery_urls),
      max_guests: numberOrNull(json.max_guests),
      best_time_to_visit: emptyToNull(json.best_time_to_visit),
      price_tier: emptyToNull(json.price_tier),
      latitude: numberOrNull(json.latitude),
      longitude: numberOrNull(json.longitude),
      field_notes_slugs: emptyArrayToNull(json.field_notes_slugs),
      editor_notes: emptyToNull(json.editor_notes),
    }

    // Strip undefined keys so we don't send "set X = undefined" to Supabase.
    for (const key of Object.keys(updates)) {
      if (updates[key] === undefined) delete updates[key]
    }

    const { data, error } = await supabase
      .from("directory_listings")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating listing:", error)
      return NextResponse.json(
        { error: error.message || "Failed to update listing" },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in PUT /api/listings/[id]:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// ── helpers ────────────────────────────────────────────────────────────────

function emptyToNull(v: unknown): string | null | undefined {
  if (v === undefined) return undefined
  if (v === null) return null
  if (typeof v !== "string") return null
  const trimmed = v.trim()
  return trimmed === "" ? null : trimmed
}

function emptyArrayToNull(v: unknown): unknown[] | null | undefined {
  if (v === undefined) return undefined
  if (v === null) return null
  if (!Array.isArray(v)) return null
  return v.length === 0 ? null : v
}

function numberOrNull(v: unknown): number | null | undefined {
  if (v === undefined) return undefined
  if (v === null || v === "") return null
  const n = typeof v === "number" ? v : Number(v)
  return Number.isFinite(n) ? n : null
}
