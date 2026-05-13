import { NextRequest, NextResponse } from "next/server"

import {
  uploadListingImage,
  validateUpload,
} from "@/lib/upload/storage"

export const dynamic = "force-dynamic"

/**
 * POST /api/admin/upload
 *
 * multipart/form-data fields:
 *   - file        — the image (image/jpeg, image/png, image/webp, ≤10 MB)
 *   - listing_id  — directory_listings.id this image belongs to
 *   - slot        — "hero" | "gallery" | "founder"
 *
 * Auth: the existing admin Basic Auth middleware covers /api/admin/*
 * (see middleware.ts). The route doesn't re-verify.
 *
 * Returns:
 *   201 { ok: true, url, path }
 *   400 { ok: false, error }   — validation
 *   500 { ok: false, error }   — supabase / storage failure
 */
export async function POST(request: NextRequest) {
  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json(
      { ok: false, error: "request must be multipart/form-data" },
      { status: 400 },
    )
  }

  const file = form.get("file")
  const listingId = form.get("listing_id")
  const slot = form.get("slot")

  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "'file' field is required and must be a file" },
      { status: 400 },
    )
  }
  if (typeof listingId !== "string") {
    return NextResponse.json(
      { ok: false, error: "'listing_id' field is required" },
      { status: 400 },
    )
  }
  if (typeof slot !== "string") {
    return NextResponse.json(
      { ok: false, error: "'slot' field is required" },
      { status: 400 },
    )
  }

  const validation = validateUpload({
    listingId,
    slot,
    type: file.type,
    size: file.size,
  })
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400 },
    )
  }

  const bytes = new Uint8Array(await file.arrayBuffer())
  const result = await uploadListingImage(
    listingId,
    validation.slot,
    bytes,
    file.type,
  )

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 500 },
    )
  }

  return NextResponse.json(
    { ok: true, url: result.url, path: result.path },
    { status: 201 },
  )
}
