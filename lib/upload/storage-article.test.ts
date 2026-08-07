import { test } from "node:test"
import assert from "node:assert/strict"

import {
  buildArticleStoragePath,
  MAX_BYTES,
  validateArticleUpload,
} from "./storage"

// ── validateArticleUpload ──────────────────────────────────────────

test("validateArticleUpload: valid JPEG hero", () => {
  const r = validateArticleUpload({
    articleId: "7b5a0d74-0ca0-4a7f-8221-032548b0ce39",
    slot: "hero",
    type: "image/jpeg",
    size: 1024,
  })
  assert.equal(r.ok, true)
  if (r.ok) assert.equal(r.slot, "hero")
})

test("validateArticleUpload: WebP accepted", () => {
  const r = validateArticleUpload({
    articleId: "7b5a0d74",
    slot: "hero",
    type: "image/webp",
    size: 200_000,
  })
  assert.equal(r.ok, true)
})

test("validateArticleUpload: missing article_id rejected", () => {
  const r = validateArticleUpload({
    articleId: "",
    slot: "hero",
    type: "image/jpeg",
    size: 1024,
  })
  assert.equal(r.ok, false)
  if (!r.ok) assert.match(r.error, /article_id/)
})

test("validateArticleUpload: unsupported slot rejected", () => {
  const r = validateArticleUpload({
    articleId: "7b5a0d74",
    slot: "gallery",
    type: "image/jpeg",
    size: 1024,
  })
  assert.equal(r.ok, false)
  if (!r.ok) assert.match(r.error, /hero/)
})

test("validateArticleUpload: unsupported mime rejected", () => {
  const r = validateArticleUpload({
    articleId: "7b5a0d74",
    slot: "hero",
    type: "image/heic",
    size: 1024,
  })
  assert.equal(r.ok, false)
  if (!r.ok) assert.match(r.error, /mime/)
})

test("validateArticleUpload: empty file rejected", () => {
  const r = validateArticleUpload({
    articleId: "7b5a0d74",
    slot: "hero",
    type: "image/jpeg",
    size: 0,
  })
  assert.equal(r.ok, false)
  if (!r.ok) assert.match(r.error, /empty/)
})

test("validateArticleUpload: oversize rejected", () => {
  const r = validateArticleUpload({
    articleId: "7b5a0d74",
    slot: "hero",
    type: "image/jpeg",
    size: MAX_BYTES + 1,
  })
  assert.equal(r.ok, false)
  if (!r.ok) assert.match(r.error, /max/)
})

// ── buildArticleStoragePath ────────────────────────────────────────

test("buildArticleStoragePath: shape matches articles/<id>/hero/<uuid>.<ext>", () => {
  const p = buildArticleStoragePath({
    articleId: "7b5a0d74-0ca0-4a7f-8221-032548b0ce39",
    slot: "hero",
    mimeType: "image/webp",
  })
  assert.match(
    p,
    /^articles\/7b5a0d74-0ca0-4a7f-8221-032548b0ce39\/hero\/[0-9a-f-]{36}\.webp$/,
  )
})

test("buildArticleStoragePath: JPEG mime → .jpg extension", () => {
  const p = buildArticleStoragePath({
    articleId: "abc123abc",
    slot: "hero",
    mimeType: "image/jpeg",
  })
  assert.match(p, /^articles\/abc123abc\/hero\/[0-9a-f-]{36}\.jpg$/)
})

test("buildArticleStoragePath: unknown mime → .bin", () => {
  const p = buildArticleStoragePath({
    articleId: "abc123abc",
    slot: "hero",
    mimeType: "application/octet-stream",
  })
  assert.match(p, /\.bin$/)
})

test("buildArticleStoragePath: matches the one manually-uploaded hero layout", () => {
  // Reference row 2026-08-07:
  //   articles/7b5a0d74-0ca0-4a7f-8221-032548b0ce39/hero/cf87e917-….webp
  const p = buildArticleStoragePath({
    articleId: "7b5a0d74-0ca0-4a7f-8221-032548b0ce39",
    slot: "hero",
    mimeType: "image/webp",
  })
  const parts = p.split("/")
  assert.equal(parts[0], "articles")
  assert.equal(parts[1], "7b5a0d74-0ca0-4a7f-8221-032548b0ce39")
  assert.equal(parts[2], "hero")
  assert.match(parts[3], /^[0-9a-f-]{36}\.webp$/)
})
