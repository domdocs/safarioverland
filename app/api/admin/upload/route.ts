import { NextRequest, NextResponse } from "next/server"

import {
  processImageForUpload,
  UnsupportedImageTypeError,
} from "@/lib/upload/processing"
import {
  buildStoragePath,
  uploadListingImage,
  validateUpload,
} from "@/lib/upload/storage"

export const dynamic = "force-dynamic"

// Image processing is CPU-heavy. Keep the function on the Node runtime
// (sharp doesn't run on the edge runtime) and give it a generous
// timeout for the resize step on a 10 MB JPEG.
export const runtime = "nodejs"
export const maxDuration = 60

/**
 * POST /api/admin/upload (v2)
 *
 * Same multipart/form-data interface as v1:
 *   - file        — image/jpeg, image/png, image/webp, image/avif, ≤10 MB
 *   - listing_id  — directory_listings.id
 *   - slot        — "hero" | "gallery" | "founder"
 *
 * v2 differences:
 *   - The file is run through processImageForUpload() BEFORE upload:
 *       rotate (honour EXIF) → resize (2400 long edge) → WebP encode
 *     EXIF (including GPS) is stripped as a side-effect of not calling
 *     `.withMetadata()`.
 *   - Storage objects are always `.webp` now (path: `<id>/<slot>/<uuid>.webp`).
 *   - The response carries original_size + processed_size + width + height
 *     so the admin UI can show "Original X → processed Y" feedback.
 *
 * Auth: covered by the existing admin Basic Auth middleware.
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

  // Pre-processing validation (size + MIME). Keeps a 50 MB upload from
  // ever reaching sharp.
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

  // Process — resize, strip, convert to WebP.
  let processed: Awaited<ReturnType<typeof processImageForUpload>>
  try {
    processed = await processImageForUpload(file)
  } catch (err) {
    if (err instanceof UnsupportedImageTypeError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: 400 },
      )
    }
    console.error("image processing failed", err)
    return NextResponse.json(
      {
        ok: false,
        error:
          err instanceof Error
            ? `image processing failed — ${err.message}`
            : "image processing failed",
      },
      { status: 400 },
    )
  }

  // Force `.webp` extension; ignore the source content-type when
  // building the path. Bucket policy whitelists `image/webp`.
  const path = buildStoragePath(listingId, validation.slot, "image/webp")
  const result = await uploadListingImage(
    listingId,
    validation.slot,
    processed.buffer,
    processed.contentType,
    { path },
  )

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 500 },
    )
  }

  return NextResponse.json(
    {
      ok: true,
      url: result.url,
      path: result.path,
      original_size: processed.originalSize,
      processed_size: processed.processedSize,
      width: processed.width,
      height: processed.height,
    },
    { status: 201 },
  )
}
