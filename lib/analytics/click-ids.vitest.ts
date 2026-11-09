// ============================================================================
// lib/analytics/click-ids.vitest.ts
//
// Cookie-free ad-click capture: URL parsing, 90-day expiry, first-touch
// UTMs + last-touch click ID, the localStorage wrappers, and the lenient
// server-side schema (malformed tracking is dropped, never rejected).
// ============================================================================

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

import {
  MAX_AGE_MS,
  STORAGE_KEY,
  attributionForSubmit,
  captureClickAttribution,
  clearClickAttribution,
  clickAttributionColumns,
  clickAttributionSchema,
  extractTrackedParams,
  mergeTouch,
  parseStored,
  readClickAttribution,
} from "./click-ids"

const T0 = Date.parse("2026-11-01T12:00:00.000Z")
const DAY = 24 * 60 * 60 * 1000

describe("extractTrackedParams", () => {
  test("picks up click IDs and UTMs, ignores everything else", () => {
    expect(
      extractTrackedParams(
        "?gclid=TEST123&utm_source=google&utm_campaign=test&foo=bar&utm_term=self%20drive",
      ),
    ).toEqual({
      gclid: "TEST123",
      utm_source: "google",
      utm_campaign: "test",
      utm_term: "self drive",
    })
  })

  test("reads gbraid / wbraid and works without the leading ?", () => {
    expect(extractTrackedParams("gbraid=G1&wbraid=W1")).toEqual({
      gbraid: "G1",
      wbraid: "W1",
    })
  })

  test("drops empty, over-long and control-character values", () => {
    const long = "x".repeat(600)
    expect(
      extractTrackedParams(
        `?gclid=${long}&utm_source=%20%20&utm_medium=a%0Ab&utm_campaign=ok`,
      ),
    ).toEqual({ utm_campaign: "ok" })
  })

  test("returns {} for a URL with nothing tracked", () => {
    expect(extractTrackedParams("")).toEqual({})
    expect(extractTrackedParams("?q=namibia")).toEqual({})
  })
})

describe("mergeTouch / attributionForSubmit", () => {
  test("first touch keeps its UTMs; the last click ID wins", () => {
    let s = mergeTouch(
      { v: 1 },
      { gclid: "A", utm_source: "google", utm_campaign: "uk" },
      T0,
    )
    s = mergeTouch(s, { utm_source: "newsletter" }, T0 + DAY)
    s = mergeTouch(s, { gclid: "B", utm_campaign: "us" }, T0 + 2 * DAY)

    expect(attributionForSubmit(s, T0 + 3 * DAY)).toEqual({
      gclid: "B",
      utm_source: "google",
      utm_campaign: "uk",
      click_captured_at: new Date(T0 + 2 * DAY).toISOString(),
    })
  })

  test("a later visit with no parameters changes nothing", () => {
    const s = mergeTouch({ v: 1 }, { gclid: "A" }, T0)
    expect(mergeTouch(s, {}, T0 + DAY)).toBe(s)
  })

  test("UTM-only first touch gives UTMs with the first-touch time", () => {
    const s = mergeTouch({ v: 1 }, { utm_source: "linkedin" }, T0)
    expect(attributionForSubmit(s, T0 + DAY)).toEqual({
      utm_source: "linkedin",
      click_captured_at: new Date(T0).toISOString(),
    })
  })

  test("touches expire after 90 days", () => {
    const s = mergeTouch({ v: 1 }, { gclid: "A", utm_source: "google" }, T0)
    expect(attributionForSubmit(s, T0 + MAX_AGE_MS - 1).gclid).toBe("A")
    expect(attributionForSubmit(s, T0 + MAX_AGE_MS)).toEqual({})
  })

  test("an expired first touch is replaced by the next landing", () => {
    let s = mergeTouch({ v: 1 }, { utm_source: "old" }, T0)
    s = mergeTouch(s, { utm_source: "new" }, T0 + 91 * DAY)
    expect(attributionForSubmit(s, T0 + 92 * DAY).utm_source).toBe("new")
  })

  test("an expired last click falls back to nothing, not a stale ID", () => {
    let s = mergeTouch({ v: 1 }, { gclid: "OLD" }, T0)
    s = mergeTouch(s, { utm_source: "x" }, T0 + 95 * DAY) // new first touch, no click
    expect(attributionForSubmit(s, T0 + 96 * DAY)).toEqual({
      utm_source: "x",
      click_captured_at: new Date(T0 + 95 * DAY).toISOString(),
    })
  })
})

describe("parseStored", () => {
  test("survives garbage", () => {
    expect(parseStored(null, T0)).toEqual({ v: 1 })
    expect(parseStored("not json", T0)).toEqual({ v: 1 })
    expect(parseStored("[1,2]", T0)).toEqual({ v: 1 })
    expect(
      parseStored(JSON.stringify({ first: { params: "x", at: 5 } }), T0),
    ).toEqual({ v: 1 })
  })

  test("drops expired and future-dated touches, cleans params", () => {
    const raw = JSON.stringify({
      first: {
        params: { utm_source: "google", evil: "x" },
        at: new Date(T0 - 100 * DAY).toISOString(),
      },
      lastClick: {
        params: { gclid: "A", utm_source: 7 },
        at: new Date(T0 - DAY).toISOString(),
      },
    })
    expect(parseStored(raw, T0)).toEqual({
      v: 1,
      lastClick: { params: { gclid: "A" }, at: new Date(T0 - DAY).toISOString() },
    })
    const future = JSON.stringify({
      first: { params: { gclid: "F" }, at: new Date(T0 + 10 * DAY).toISOString() },
    })
    expect(parseStored(future, T0)).toEqual({ v: 1 })
  })
})

describe("browser wrappers", () => {
  beforeEach(() => window.localStorage.clear())
  afterEach(() => vi.restoreAllMocks())

  test("capture → read → clear round trip, no cookies", () => {
    captureClickAttribution("?gclid=TEST123&utm_source=google&utm_campaign=test", T0)
    expect(window.localStorage.getItem(STORAGE_KEY)).toContain("TEST123")
    expect(document.cookie).toBe("")
    expect(readClickAttribution(T0 + DAY)).toEqual({
      gclid: "TEST123",
      utm_source: "google",
      utm_campaign: "test",
      click_captured_at: new Date(T0).toISOString(),
    })
    clearClickAttribution()
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull()
    expect(readClickAttribution(T0)).toEqual({})
  })

  test("removes the key once everything has expired", () => {
    captureClickAttribution("?gclid=A", T0)
    captureClickAttribution("", T0 + 91 * DAY)
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  test("never throws when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError")
    })
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError")
    })
    expect(() => captureClickAttribution("?gclid=A", T0)).not.toThrow()
    expect(readClickAttribution(T0)).toEqual({})
    expect(() => clearClickAttribution()).not.toThrow()
  })
})

describe("clickAttributionSchema (server-side)", () => {
  test("passes clean values through", () => {
    const at = new Date(T0).toISOString()
    expect(
      clickAttributionSchema.parse({ gclid: "A", utm_source: "google", click_captured_at: at }),
    ).toEqual({ gclid: "A", utm_source: "google", click_captured_at: at })
  })

  test("drops malformed values instead of failing", () => {
    const result = clickAttributionSchema.safeParse({
      gclid: "x".repeat(513),
      gbraid: 42,
      wbraid: "",
      utm_source: { nested: true },
      utm_medium: "c\npc",
      utm_campaign: "y".repeat(201),
      click_captured_at: "yesterday",
    })
    expect(result.success).toBe(true)
    expect(clickAttributionColumns(result.success ? result.data : {})).toEqual({})
  })

  test("clickAttributionColumns keeps only present values", () => {
    expect(
      clickAttributionColumns({ gclid: "A", utm_term: undefined, utm_source: "" }),
    ).toEqual({ gclid: "A" })
  })
})
