import { NextResponse } from "next/server"
import { z } from "zod"
import { getSupabaseServerClient } from "@/lib/supabase"

/**
 * PATCH /api/admin/listings/[id]/status
 *
 * Partial-field updater used by the inline row controls on
 * /admin/listings and /admin/pending — status select, featured toggle,
 * approve / reject buttons.
 *
 * Why this exists in addition to the existing PUT /api/listings/[id]:
 * the PUT route is a full whitelist updater that defaults `featured`
 * to false and `price_info` to "" if the caller doesn't include them,
 * which would clobber the row when a single-field inline toggle fires.
 * This route only writes the fields that were explicitly supplied.
 *
 * Mirrors the pattern at /api/admin/briefs/[id]/status.
 */

const isUUID = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)

const PatchSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  featured: z.boolean().optional(),
})

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params
    if (!isUUID(id)) {
      return NextResponse.json({ error: "Invalid listing ID format" }, { status: 400 })
    }

    let json: unknown
    try {
      json = await request.json()
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    const parsed = PatchSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parsed.error.errors },
        { status: 400 },
      )
    }

    if (Object.keys(parsed.data).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 })
    }

    const supabase = getSupabaseServerClient()
    if (!supabase) {
      return NextResponse.json(
        { error: "Failed to initialize Supabase client" },
        { status: 500 },
      )
    }

    const { data, error } = await supabase
      .from("directory_listings")
      .update({ ...parsed.data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error patching listing status:", error)
      return NextResponse.json(
        { error: error.message || "Update failed" },
        { status: 500 },
      )
    }

    return NextResponse.json({ status: "ok", listing: data })
  } catch (error) {
    console.error("Error in PATCH /api/admin/listings/[id]/status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
