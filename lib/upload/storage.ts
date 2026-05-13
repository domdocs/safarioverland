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

export const LISTING_MEDIA_BUCKET = "listing-media"
export const MAX_BYTES = 10 * 1024 * 1024 // 10 MB
export const ALLOWED_MIME = new Set<string>([
  "image/jpeg",
  "image/png",
  "image/webp",
])

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
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
  if (
    args.slot !== "hero" &&
    args.slot !== "gallery" &&
    args.slot !== "founder"
  ) {
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
): Promise<UploadResult> {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return { ok: false, error: "supabase server client unavailable" }
  }

  const path = buildStoragePath(listingId, slot, mimeType)
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
