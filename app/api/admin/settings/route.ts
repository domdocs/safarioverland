import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { getSettings, updateSettings } from "@/lib/settings"

export const dynamic = "force-dynamic"

const patchSchema = z.object({
  site_name: z.string().max(120).nullable().optional(),
  site_description: z.string().max(2000).nullable().optional(),
  maintenance_mode: z.boolean().optional(),
  auto_approve_listings: z.boolean().optional(),
  allow_user_reviews: z.boolean().optional(),
  show_featured_on_home: z.boolean().optional(),
  listings_per_page: z.number().int().min(1).max(100).optional(),
  notification_email: z.string().email().max(200).nullable().optional().or(z.literal("")),
  notify_admin_on_new: z.boolean().optional(),
  notify_user_on_approval: z.boolean().optional(),
})

/**
 * GET   /api/admin/settings  — read the global settings row
 * PATCH /api/admin/settings  — update one or more fields
 *
 * Admin-gated by middleware.ts.
 */
export async function GET() {
  const settings = await getSettings()
  return NextResponse.json({ settings })
}

export async function PATCH(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  // Coerce empty-string notification_email back to null.
  const patch = {
    ...parsed.data,
    notification_email:
      parsed.data.notification_email === "" ? null : parsed.data.notification_email,
  }

  try {
    const settings = await updateSettings(patch)
    return NextResponse.json({ status: "ok", settings })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("PATCH /api/admin/settings failed:", err)
    return NextResponse.json({ error: "update_failed", message }, { status: 500 })
  }
}
