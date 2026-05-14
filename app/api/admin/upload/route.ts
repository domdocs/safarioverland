import { NextRequest, NextResponse } from "next/server"

import {
  processImageForUpload,
  UnsupportedImageTypeError,
} from "@/lib/upload/processing"
import {
  buildItineraryStoragePath,
  buildStoragePath,
  uploadListingImage,
  uploadToPath,
  validateItineraryUpload,
  validateUpload,
} from "@/lib/upload/storage"

export const dynamic = "force-dynamic"

// Image processing is CPU-heavy. Keep the function on the Node runtime
// (sharp doesn't run on the edge runtime) and give it a generous
// timeout for the resize step on a 10 MB JPEG.
export const runtime = "nodejs"
export const maxDuration = 60

/**
 * POST /api/admin/upload (v2 + itinerary slots)
 *
 * Two flavours, distinguished by which ID field is present:
 *
 * Listings flavour (original):
 *   - file        — image/jpeg, image/png, image/webp, image/avif, ≤10 MB
 *   - listing_id  — directory_listings.id
 *   - slot        — "hero" | "gallery" | "founder"
 *
 * Itinerary flavour (added for the Trip Designer):
 *   - file        — same constraints
 *   - itinerary_id — itineraries.id
 *   - chapter_id  — itinerary_chapters.id (required for chapter-* slots)
 *   - slot        — "itinerary-cover" | "chapter-hero" | "chapter-lodge"
 *
 * Both flavours run the file through the v2 sharp pipeline (rotate,
 * resize to 2400 long edge, EXIF-strip, WebP encode) and persist to the
 * `listing-media` bucket. Storage paths differ:
 *   - Listings: `[listing_id]/[slot]/[uuid].webp`
 *   - Itineraries: `itineraries/[id]/cover/[uuid].webp` or
 *     `itineraries/[id]/chapter-{hero|lodge}/[chapter_id]/[uuid].webp`
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
  const itineraryId = form.get("itinerary_id")
  const chapterId = form.get("chapter_id")
  const slot = form.get("slot")

  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "'file' field is required and must be a file" },
      { status: 400 },
    )
  }
  if (typeof slot !== "string") {
    return NextResponse.json(
      { ok: false, error: "'slot' field is required" },
      { status: 400 },
    )
  }

  const isItinerary = typeof itineraryId === "string" && itineraryId.length > 0

  if (!isItinerary && typeof listingId !== "string") {
    return NextResponse.json(
      { ok: false, error: "either 'listing_id' or 'itinerary_id' is required" },
      { status: 400 },
    )
  }

  // ── Branch on payload type ──────────────────────────────────────────
  let path: string
  if (isItinerary) {
    const validation = validateItineraryUpload({
      itineraryId: itineraryId as string,
      chapterId: typeof chapterId === "string" ? chapterId : null,
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

    path = buildItineraryStoragePath({
      itineraryId: itineraryId as string,
      chapterId: typeof chapterId === "string" ? chapterId : null,
      slot: validation.slot,
      mimeType: "image/webp",
    })
    const result = await uploadToPath(path, processed.buffer, processed.contentType)
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

  // ── Listings (unchanged flavour) ────────────────────────────────────
  const validation = validateUpload({
    listingId: listingId as string,
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

  path = buildStoragePath(listingId as string, validation.slot, "image/webp")
  const result = await uploadListingImage(
    listingId as string,
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
