/**
 * Server-side Supabase Storage helper for listing media.
 *
 * Wraps the Supabase JS client's storage upload call with the rules
 * documented in handoff/briefs/2026-05-IMAGE_UPLOAD_AND_STORAGE.md and
 * supabase/storage-setup.md:
 *
 *   - Single bucket: `listing-media`
 *   - Path: [listing_id]/[slot]/[uuid].[ext]
 *   - Allowed MIME: image/jpeg, image/png, image/webp
 *   - Max 10 MB per file (Phase 2 will add server-side resize)
 *
 * Uses the service-role client so RLS is bypassed for writes — the API
 * route is gated by admin Basic Auth at the middleware layer.
 */

import { randomUUID } from "node:crypto"

import { getSupabaseServerClient } from "@/lib/supabase"

export type UploadSlot = "hero" | "gallery" | "founder"
export type ItinerarySlot = "itinerary-cover" | "chapter-hero" | "chapter-lodge"
export type AnySlot = UploadSlot | ItinerarySlot

const LISTING_SLOTS: ReadonlySet<UploadSlot> = new Set<UploadSlot>([
  "hero",
  "gallery",
  "founder",
])
const ITINERARY_SLOTS: ReadonlySet<ItinerarySlot> = new Set<ItinerarySlot>([
  "itinerary-cover",
  "chapter-hero",
  "chapter-lodge",
])

export const LISTING_MEDIA_BUCKET = "listing-media"
export const MAX_BYTES = 10 * 1024 * 1024 // 10 MB
export const ALLOWED_MIME = new Set<string>([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
])

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
}

export type UploadResult =
  | { ok: true; url: string; path: string }
  | { ok: false; error: string }

/**
 * Validate the file shape without writing anything. Exposed separately
 * so the API route can short-circuit before reading the file body.
 */
export function validateUpload(args: {
  listingId: string
  slot: string
  type: string
  size: number
}): { ok: true; slot: UploadSlot } | { ok: false; error: string } {
  if (!args.listingId || args.listingId.length < 8) {
    return { ok: false, error: "listing_id is required" }
  }
  if (!LISTING_SLOTS.has(args.slot as UploadSlot)) {
    return {
      ok: false,
      error: `slot must be one of hero / gallery / founder (got "${args.slot}")`,
    }
  }
  if (!ALLOWED_MIME.has(args.type)) {
    return {
      ok: false,
      error: `unsupported mime type "${args.type}" — accept image/jpeg, image/png, image/webp`,
    }
  }
  if (args.size <= 0) {
    return { ok: false, error: "file is empty" }
  }
  if (args.size > MAX_BYTES) {
    return {
      ok: false,
      error: `file is ${Math.round(args.size / 1024 / 1024)}MB; max is ${MAX_BYTES / 1024 / 1024}MB`,
    }
  }
  return { ok: true, slot: args.slot as UploadSlot }
}

/**
 * Validate an itinerary upload — separate from listings because the
 * required identifiers differ (chapter slots need an additional chapter_id).
 */
export function validateItineraryUpload(args: {
  itineraryId: string
  chapterId?: string | null
  slot: string
  type: string
  size: number
}):
  | { ok: true; slot: ItinerarySlot }
  | { ok: false; error: string } {
  if (!args.itineraryId || args.itineraryId.length < 8) {
    return { ok: false, error: "itinerary_id is required" }
  }
  if (!ITINERARY_SLOTS.has(args.slot as ItinerarySlot)) {
    return {
      ok: false,
      error: `slot must be one of itinerary-cover / chapter-hero / chapter-lodge (got "${args.slot}")`,
    }
  }
  const slot = args.slot as ItinerarySlot
  if (
    (slot === "chapter-hero" || slot === "chapter-lodge") &&
    (!args.chapterId || args.chapterId.length < 8)
  ) {
    return {
      ok: false,
      error: `chapter_id is required for slot "${slot}"`,
    }
  }
  if (!ALLOWED_MIME.has(args.type)) {
    return {
      ok: false,
      error: `unsupported mime type "${args.type}" — accept image/jpeg, image/png, image/webp`,
    }
  }
  if (args.size <= 0) {
    return { ok: false, error: "file is empty" }
  }
  if (args.size > MAX_BYTES) {
    return {
      ok: false,
      error: `file is ${Math.round(args.size / 1024 / 1024)}MB; max is ${MAX_BYTES / 1024 / 1024}MB`,
    }
  }
  return { ok: true, slot }
}

/**
 * Compute the bucket path for a given listing + slot + mime. Exposed
 * for tests; production callers go through `uploadListingImage`.
 */
export function buildStoragePath(
  listingId: string,
  slot: UploadSlot,
  mimeType: string,
): string {
  const ext = EXT_BY_MIME[mimeType] ?? "bin"
  return `${listingId}/${slot}/${randomUUID()}.${ext}`
}

/**
 * Compute the bucket path for an itinerary asset. Cover assets land at
 * `itineraries/[id]/cover/[uuid].ext`; chapter assets nest the chapter id
 * one level deeper. The Phase-1 brief specifies this layout verbatim.
 */
export function buildItineraryStoragePath(args: {
  itineraryId: string
  chapterId?: string | null
  slot: ItinerarySlot
  mimeType: string
}): string {
  const ext = EXT_BY_MIME[args.mimeType] ?? "bin"
  if (args.slot === "itinerary-cover") {
    return `itineraries/${args.itineraryId}/cover/${randomUUID()}.${ext}`
  }
  // chapter-hero / chapter-lodge
  const sub = args.slot === "chapter-hero" ? "chapter-hero" : "chapter-lodge"
  return `itineraries/${args.itineraryId}/${sub}/${args.chapterId}/${randomUUID()}.${ext}`
}

/**
 * Compute the public URL for a stored object. Mirrors what
 * `supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl`
 * would return, but doesn't require a client call.
 */
function publicUrlFor(path: string): string | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!base) return null
  return `${base.replace(/\/$/, "")}/storage/v1/object/public/${LISTING_MEDIA_BUCKET}/${path}`
}

/**
 * Upload an image into `listing-media/[listingId]/[slot]/[uuid].[ext]`.
 *
 * `file` may be either a browser-side `File` (from a multipart
 * request) or an `ArrayBuffer` + metadata tuple — the Supabase SDK
 * accepts both. We normalise to `Buffer` server-side so the upload
 * stays Node-side and doesn't depend on global `File`/`Blob`.
 */
export async function uploadListingImage(
  listingId: string,
  slot: UploadSlot,
  body: ArrayBuffer | Uint8Array,
  mimeType: string,
  options?: {
    /**
     * Override the storage path. v2 needs this so the route can force
     * `.webp` regardless of the source mime type. When omitted we fall
     * back to `buildStoragePath(listingId, slot, mimeType)`.
     */
    path?: string
  },
): Promise<UploadResult> {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return { ok: false, error: "supabase server client unavailable" }
  }

  const path = options?.path ?? buildStoragePath(listingId, slot, mimeType)
  const bytes =
    body instanceof Uint8Array ? body : new Uint8Array(body)

  const { error: uploadErr } = await supabase.storage
    .from(LISTING_MEDIA_BUCKET)
    .upload(path, bytes, {
      contentType: mimeType,
      upsert: false,
    })

  if (uploadErr) {
    console.error("listing media upload failed", uploadErr)
    return { ok: false, error: uploadErr.message }
  }

  const url = publicUrlFor(path)
  if (!url) {
    return { ok: false, error: "NEXT_PUBLIC_SUPABASE_URL missing" }
  }
  return { ok: true, url, path }
}

/**
 * Upload bytes to an arbitrary path inside `listing-media`. Used by the
 * itinerary slots where the path layout differs from the listing layout.
 * Caller is responsible for computing the path via
 * `buildItineraryStoragePath()`.
 */
export async function uploadToPath(
  path: string,
  body: ArrayBuffer | Uint8Array,
  mimeType: string,
): Promise<UploadResult> {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return { ok: false, error: "supabase server client unavailable" }
  }

  const bytes = body instanceof Uint8Array ? body : new Uint8Array(body)
  const { error: uploadErr } = await supabase.storage
    .from(LISTING_MEDIA_BUCKET)
    .upload(path, bytes, {
      contentType: mimeType,
      upsert: false,
    })

  if (uploadErr) {
    console.error("listing media upload failed", uploadErr)
    return { ok: false, error: uploadErr.message }
  }

  const url = publicUrlFor(path)
  if (!url) {
    return { ok: false, error: "NEXT_PUBLIC_SUPABASE_URL missing" }
  }
  return { ok: true, url, path }
}
