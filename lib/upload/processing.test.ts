import { test } from "node:test"
import assert from "node:assert/strict"
import sharp from "sharp"

import {
  processImageForUpload,
  UnsupportedImageTypeError,
} from "./processing"

// ── Fixture builders ────────────────────────────────────────────────────
//
// Tests build their own bytes via sharp so we don't ship binary
// fixtures in the repo. Each helper returns a Buffer with predictable
// content.

async function jpegFixture(
  width: number,
  height: number,
  options?: { withGps?: boolean; orientation?: number },
): Promise<Buffer> {
  // A solid-coloured plain image. Sharp infers a sensible noise-free
  // bitmap so the JPEG encoder produces something compact and stable.
  let pipeline = sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 120, g: 80, b: 40 },
    },
  })

  if (options?.withGps || options?.orientation) {
    // sharp's withMetadata writes EXIF; we embed both an orientation
    // tag and a GPS block so the strip-on-output behaviour can be
    // verified end-to-end. The GPS group isn't in sharp's TS Exif
    // type but sharp accepts it at runtime — cast to bypass.
    pipeline = pipeline.withMetadata({
      orientation: options.orientation,
      exif: options?.withGps
        ? ({
            IFD0: {
              Make: "Phantom Camera Co",
              Model: "Test Sensor 9000",
            },
            GPS: {
              GPSLatitude: "51/1 30/1 0/1",
              GPSLongitude: "0/1 7/1 0/1",
              GPSLatitudeRef: "N",
              GPSLongitudeRef: "W",
            },
          } as unknown as Parameters<
            typeof pipeline.withMetadata
          >[0] extends infer T
            ? T extends { exif?: infer E }
              ? E
              : never
            : never)
        : undefined,
    })
  }

  return pipeline.jpeg().toBuffer()
}

async function pngFixture(width: number, height: number): Promise<Buffer> {
  return sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 20, g: 30, b: 40, alpha: 1 },
    },
  })
    .png()
    .toBuffer()
}

// ── JPEG → WebP path ────────────────────────────────────────────────────

test("JPEG input → WebP output, contentType image/webp, processed size set", async () => {
  const input = await jpegFixture(2000, 1500)
  const result = await processImageForUpload(input)
  assert.equal(result.contentType, "image/webp")
  assert.equal(result.originalSize, input.length)
  assert.ok(result.processedSize > 0)
  // First two bytes of a WebP file: "RIFF"
  const head = result.buffer.subarray(0, 4).toString("ascii")
  assert.equal(head, "RIFF")
  // Bytes 8–12: "WEBP"
  const fourcc = result.buffer.subarray(8, 12).toString("ascii")
  assert.equal(fourcc, "WEBP")
})

test("PNG input → WebP output", async () => {
  const input = await pngFixture(800, 600)
  const result = await processImageForUpload(input)
  assert.equal(result.contentType, "image/webp")
  const fourcc = result.buffer.subarray(8, 12).toString("ascii")
  assert.equal(fourcc, "WEBP")
})

// ── Resize behaviour ────────────────────────────────────────────────────

test("10000×10000 input → long edge capped at default 2400", async () => {
  const input = await jpegFixture(10000, 10000)
  const result = await processImageForUpload(input)
  assert.equal(result.width, 2400)
  assert.equal(result.height, 2400)
})

test("Custom maxWidth honoured", async () => {
  const input = await jpegFixture(4000, 3000)
  const result = await processImageForUpload(input, { maxWidth: 1200 })
  assert.equal(result.width, 1200)
  assert.equal(result.height, 900)
})

test("Small input → not upscaled (withoutEnlargement)", async () => {
  const input = await jpegFixture(1000, 800)
  const result = await processImageForUpload(input)
  assert.equal(result.width, 1000)
  assert.equal(result.height, 800)
})

test("Portrait orientation preserved", async () => {
  const input = await jpegFixture(800, 1200)
  const result = await processImageForUpload(input)
  assert.equal(result.width, 800)
  assert.equal(result.height, 1200)
})

// ── EXIF strip + orientation correction ─────────────────────────────────

test("EXIF GPS data stripped from output", async () => {
  const input = await jpegFixture(1600, 1200, { withGps: true })

  // Sanity: the fixture really does contain GPS.
  const inputMeta = await sharp(input).metadata()
  assert.ok(
    inputMeta.exif && inputMeta.exif.length > 0,
    "fixture should carry EXIF (test setup precondition)",
  )

  const result = await processImageForUpload(input)
  const outputMeta = await sharp(result.buffer).metadata()
  assert.equal(
    outputMeta.exif,
    undefined,
    "output WebP must not carry EXIF (especially GPS)",
  )
})

test("EXIF orientation=6 (rotate 90 CW) → output rendered upright", async () => {
  // A 1200×800 landscape source flagged for 90-CW rotation should
  // emerge as 800×1200 portrait after the .rotate() step.
  const input = await jpegFixture(1200, 800, { orientation: 6 })
  const result = await processImageForUpload(input)
  assert.equal(result.width, 800)
  assert.equal(result.height, 1200)

  // And the output should not be flagged for rotation — orientation
  // has been baked into the pixels.
  const outMeta = await sharp(result.buffer).metadata()
  // WebP doesn't carry the EXIF orientation tag through reliably;
  // assert it's either absent or 1 (no rotation needed).
  if (outMeta.orientation !== undefined) {
    assert.equal(outMeta.orientation, 1)
  }
})

// ── Type validation ─────────────────────────────────────────────────────

test("Unsupported MIME on a File input → UnsupportedImageTypeError", async () => {
  const file = new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47])], "x.svg", {
    type: "image/svg+xml",
  })
  await assert.rejects(
    () => processImageForUpload(file),
    (err: unknown) => err instanceof UnsupportedImageTypeError,
  )
})

test("Buffer input with no MIME metadata → sharp decodes if valid format", async () => {
  // Buffer doesn't carry a declared MIME, so the helper relies on
  // sharp's auto-detection. A valid JPEG buffer works fine.
  const input = await jpegFixture(400, 300)
  const result = await processImageForUpload(input)
  assert.equal(result.contentType, "image/webp")
})

// ── Reduction sanity ────────────────────────────────────────────────────

test("Large JPEG → processed size meaningfully smaller than original", async () => {
  // A 4000×3000 JPEG is 12 MP, the kind of thing operators send.
  // WebP at q=85 against a low-detail synthetic image won't show a
  // huge ratio, but processed should still be smaller than input.
  const input = await jpegFixture(4000, 3000)
  const result = await processImageForUpload(input)
  assert.ok(
    result.processedSize < result.originalSize,
    `processed (${result.processedSize}) should be < original (${result.originalSize})`,
  )
})
