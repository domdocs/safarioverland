import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { shortlistFor } from "@/lib/briefs/shortlist"

export const dynamic = "force-dynamic"

const bodySchema = z.object({
  wildlife_priorities: z.array(z.string().max(40)).max(10).default([]),
  budget_tier: z
    .enum(["budget", "mid", "luxury", "exclusive", "discuss"])
    .optional(),
  season_preference: z.string().max(40).optional(),
})

/**
 * POST /api/briefs/shortlist
 *
 * Returns up to 4 editorial holding-pattern matches for the criteria
 * described in the intake. Takes raw criteria (not a brief id), so the
 * /plan/sent page can render the shortlist client-side without exposing
 * a brief id in the URL.
 */
export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const listings = await shortlistFor(parsed.data)
  return NextResponse.json({ listings })
}
