import { test } from "node:test"
import assert from "node:assert/strict"

import { heroImageRejectReason, isAllowedHeroImageUrl } from "./hero-image"

// ── isAllowedHeroImageUrl ──────────────────────────────────────────

test("accepts a Supabase Storage listing-media hero URL", () => {
  assert.equal(
    isAllowedHeroImageUrl(
      "https://ajqpeggdjohbnysozggf.supabase.co/storage/v1/object/public/listing-media/articles/7b5a0d74-0ca0-4a7f-8221-032548b0ce39/hero/cf87e917-1234-1234-1234-123456789abc.webp",
    ),
    true,
  )
})

test("accepts a Supabase Storage listings hero URL (different project ref)", () => {
  assert.equal(
    isAllowedHeroImageUrl(
      "https://xyz.supabase.co/storage/v1/object/public/listing-media/some-listing-id/hero/abc.webp",
    ),
    true,
  )
})

test("rejects a Pexels page URL (the actual first-published bug)", () => {
  assert.equal(
    isAllowedHeroImageUrl("https://www.pexels.com/photo/elephants-in-hwange-12345/"),
    false,
  )
})

test("rejects a random image URL on an unlisted CDN", () => {
  assert.equal(
    isAllowedHeroImageUrl("https://images.pexels.com/photos/12345/photo.jpg"),
    false,
  )
})

test("rejects http:// even on an allow-listed host", () => {
  assert.equal(
    isAllowedHeroImageUrl(
      "http://xyz.supabase.co/storage/v1/object/public/listing-media/x.webp",
    ),
    false,
  )
})

test("rejects a Supabase URL under the wrong path prefix", () => {
  assert.equal(
    isAllowedHeroImageUrl("https://xyz.supabase.co/rest/v1/anything"),
    false,
  )
})

test("rejects a garbage string", () => {
  assert.equal(isAllowedHeroImageUrl("not a url"), false)
})

test("rejects a bare hostname (no scheme)", () => {
  assert.equal(isAllowedHeroImageUrl("xyz.supabase.co/storage/v1/object/public/x"), false)
})

// ── heroImageRejectReason ──────────────────────────────────────────

test("reason: garbage → mentions absolute URL", () => {
  assert.match(heroImageRejectReason("not a url"), /absolute URL/)
})

test("reason: http → mentions https", () => {
  assert.match(
    heroImageRejectReason("http://xyz.supabase.co/anything"),
    /https/,
  )
})

test("reason: wrong host → names allow-list constraint", () => {
  assert.match(
    heroImageRejectReason("https://www.pexels.com/photo/x/"),
    /allow-list|Supabase/,
  )
})
