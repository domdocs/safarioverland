/**
 * Server-side image processing pipeline (v2).
 *
 * Operator photos arrive as multi-megabyte JPEGs / PNGs with embedded
 * EXIF (often including GPS coordinates and camera serials). v2 runs
 * each upload through sharp to produce a lean, EXIF-free WebP before
 * it ever touches Supabase Storage.
 *
 * Pipeline order matters:
 *   1. .rotate()          — honour EXIF orientation BEFORE stripping
 *                            metadata, otherwise portrait phone shots
 *                            land sideways.
 *   2. .resize(maxWidth)  — only downsample (`withoutEnlargement: true`),
 *                            preserve aspect ratio. Defaults to 2400px on
 *                            the long edge.
 *   3. .webp({ quality }) — convert + compress. Sharp's WebP encoder
 *                            does not carry EXIF/ICC over by default, so
 *                            calling `.withMetadata()` is precisely what
 *                            we DON'T do — omission is the strip.
 *   4. .toBuffer()        — return raw bytes + the produced metadata.
 */

import sharp from "sharp"

export type ProcessedImage = {
  buffer: Buffer
  contentType: "image/webp"
  /** Bytes in the source (pre-processing). */
  originalSize: number
  /** Bytes in the produced WebP. */
  processedSize: number
  /** Output width after resize (px). */
  width: number
  /** Output height after resize (px). */
  height: number
}

export type ProcessingOptions = {
  /** Long-edge cap in pixels. Default 2400. */
  maxWidth?: number
  /** WebP quality 1–100. Default 85 — a sweet spot for editorial. */
  quality?: number
}

/**
 * Allowed input types. HEIC is intentionally out — sharp can decode it
 * but support is patchy across Vercel deploy targets, and operators
 * with iPhones should be exporting JPEG anyway.
 */
const ALLOWED_INPUT_MIME = new Set<string>([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
])

export class UnsupportedImageTypeError extends Error {
  constructor(mime: string) {
    super(
      `unsupported image type "${mime}" — accept image/jpeg, image/png, image/webp, image/avif`,
    )
    this.name = "UnsupportedImageTypeError"
  }
}

function inputBytes(input: Buffer | File | Uint8Array): Promise<Buffer> {
  if (Buffer.isBuffer(input)) return Promise.resolve(input)
  if (input instanceof Uint8Array) return Promise.resolve(Buffer.from(input))
  // Browser-style File / Blob
  return input.arrayBuffer().then((ab) => Buffer.from(ab))
}

function inputMime(input: Buffer | File | Uint8Array): string | null {
  if (typeof File !== "undefined" && input instanceof File) {
    return input.type || null
  }
  return null
}

/**
 * Process an image for upload.
 *
 * Returns the WebP buffer plus original / processed size and final
 * dimensions so the caller can persist metrics or surface them in the
 * UI ("Original 4.2 MB → 287 KB").
 *
 * Throws `UnsupportedImageTypeError` when the caller hands in a File
 * with an unsupported MIME type. For Buffer / Uint8Array inputs there's
 * no type metadata to check; sharp itself will throw `Input buffer
 * contains unsupported image format` on decode if the bytes are bogus.
 */
export async function processImageForUpload(
  input: Buffer | File | Uint8Array,
  options?: ProcessingOptions,
): Promise<ProcessedImage> {
  const declaredMime = inputMime(input)
  if (declaredMime !== null && !ALLOWED_INPUT_MIME.has(declaredMime)) {
    throw new UnsupportedImageTypeError(declaredMime)
  }

  const buffer = await inputBytes(input)
  const originalSize = buffer.length

  const maxWidth = options?.maxWidth ?? 2400
  const quality = options?.quality ?? 85

  // Sharp pipeline. `.rotate()` with no args honours the EXIF
  // Orientation tag. The lack of `.withMetadata()` is deliberate — that
  // call would re-attach EXIF (including GPS) to the output, which is
  // exactly what we're stripping.
  const pipeline = sharp(buffer)
    .rotate()
    .resize(maxWidth, null, {
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality })

  const { data, info } = await pipeline.toBuffer({ resolveWithObject: true })

  return {
    buffer: data,
    contentType: "image/webp",
    originalSize,
    processedSize: data.length,
    width: info.width,
    height: info.height,
  }
}
