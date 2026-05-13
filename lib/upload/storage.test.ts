import { test } from "node:test"
import assert from "node:assert/strict"

import {
  ALLOWED_MIME,
  buildStoragePath,
  LISTING_MEDIA_BUCKET,
  MAX_BYTES,
  validateUpload,
} from "./storage"

// ── validateUpload ───────────────────────────────────────────────────

test("validateUpload: valid JPEG hero", () => {
  const r = validateUpload({
    listingId: "d97e32c6-3740-45b7-9608-48df98a9a4c3",
    slot: "hero",
    type: "image/jpeg",
    size: 1024,
  })
  assert.equal(r.ok, true)
  if (r.ok) assert.equal(r.slot, "hero")
})

test("validateUpload: gallery + webp accepted", () => {
  const r = validateUpload({
    listingId: "d97e32c6",
    slot: "gallery",
    type: "image/webp",
    size: 200_000,
  })
  assert.equal(r.ok, true)
  if (r.ok) assert.equal(r.slot, "gallery")
})

test("validateUpload: founder + png accepted", () => {
  const r = validateUpload({
    listingId: "d97e32c6",
    slot: "founder",
    type: "image/png",
    size: 500,
  })
  assert.equal(r.ok, true)
})

test("validateUpload: missing listing id rejected", () => {
  const r = validateUpload({
    listingId: "",
    slot: "hero",
    type: "image/jpeg",
    size: 1024,
  })
  assert.equal(r.ok, false)
  if (!r.ok) assert.match(r.error, /listing_id/)
})

test("validateUpload: invalid slot rejected", () => {
  const r = validateUpload({
    listingId: "d97e32c6",
    slot: "cover",
    type: "image/jpeg",
    size: 1024,
  })
  assert.equal(r.ok, false)
  if (!r.ok) assert.match(r.error, /slot must be one of hero/)
})

test("validateUpload: SVG rejected (not in allowed MIME set)", () => {
  const r = validateUpload({
    listingId: "d97e32c6",
    slot: "hero",
    type: "image/svg+xml",
    size: 1024,
  })
  assert.equal(r.ok, false)
  if (!r.ok) assert.match(r.error, /unsupported mime/)
})

test("validateUpload: PDF rejected", () => {
  const r = validateUpload({
    listingId: "d97e32c6",
    slot: "hero",
    type: "application/pdf",
    size: 1024,
  })
  assert.equal(r.ok, false)
})

test("validateUpload: oversize file rejected with explicit size", () => {
  const r = validateUpload({
    listingId: "d97e32c6",
    slot: "hero",
    type: "image/jpeg",
    size: MAX_BYTES + 1,
  })
  assert.equal(r.ok, false)
  if (!r.ok) assert.match(r.error, /max is 10MB/i)
})

test("validateUpload: zero-byte file rejected", () => {
  const r = validateUpload({
    listingId: "d97e32c6",
    slot: "hero",
    type: "image/jpeg",
    size: 0,
  })
  assert.equal(r.ok, false)
  if (!r.ok) assert.match(r.error, /empty/)
})

// ── buildStoragePath ─────────────────────────────────────────────────

test("buildStoragePath: jpeg → .jpg, correct prefix shape", () => {
  const path = buildStoragePath("d97e32c6", "hero", "image/jpeg")
  assert.match(
    path,
    /^d97e32c6\/hero\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jpg$/,
  )
})

test("buildStoragePath: png + gallery", () => {
  const path = buildStoragePath("abc", "gallery", "image/png")
  assert.match(path, /^abc\/gallery\/.+\.png$/)
})

test("buildStoragePath: webp + founder", () => {
  const path = buildStoragePath("abc", "founder", "image/webp")
  assert.match(path, /^abc\/founder\/.+\.webp$/)
})

test("buildStoragePath: unknown mime falls back to .bin (won't pass validateUpload anyway)", () => {
  const path = buildStoragePath("abc", "hero", "image/svg+xml")
  assert.match(path, /\.bin$/)
})

test("buildStoragePath: every call produces a new UUID", () => {
  const a = buildStoragePath("abc", "hero", "image/jpeg")
  const b = buildStoragePath("abc", "hero", "image/jpeg")
  assert.notEqual(a, b)
})

// ── Constants pin ────────────────────────────────────────────────────

test("LISTING_MEDIA_BUCKET is the documented bucket name", () => {
  assert.equal(LISTING_MEDIA_BUCKET, "listing-media")
})

test("ALLOWED_MIME contains exactly the three documented types", () => {
  assert.deepEqual(
    [...ALLOWED_MIME].sort(),
    ["image/jpeg", "image/png", "image/webp"],
  )
})

test("MAX_BYTES is 10 MB", () => {
  assert.equal(MAX_BYTES, 10 * 1024 * 1024)
})
