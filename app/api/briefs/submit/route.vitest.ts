// @vitest-environment node
// ============================================================================
// app/api/briefs/submit/route.vitest.ts
//
// Payload validation for the ad-click attribution fields. Supabase and the
// email senders are mocked — nothing touches a database or sends mail.
// ============================================================================

import { beforeEach, describe, expect, test, vi } from "vitest"

const { insertMock, sendReceived, sendNotify } = vi.hoisted(() => ({
  insertMock: vi.fn(),
  sendReceived: vi.fn().mockResolvedValue(undefined),
  sendNotify: vi.fn().mockResolvedValue(undefined),
}))

vi.mock("@/lib/supabase", () => ({
  getSupabaseServerClient: () => ({
    from: () => ({
      insert: (payload: Record<string, unknown>) => ({
        select: () => ({ single: () => insertMock(payload) }),
      }),
    }),
  }),
}))

vi.mock("@/lib/briefs/email", () => ({
  sendBriefReceived: sendReceived,
  sendBriefNotify: sendNotify,
}))

import { POST } from "./route"

const base = {
  months: ["jul"],
  contact_name: "Test Person",
  contact_email: "test@example.com",
}

function post(body: unknown) {
  return POST(
    new Request("http://localhost/api/briefs/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }) as never,
  )
}

beforeEach(() => {
  insertMock.mockReset()
  insertMock.mockImplementation(async (payload: Record<string, unknown>) => ({
    data: { id: "brief-1", ...payload },
    error: null,
  }))
})

describe("POST /api/briefs/submit — click attribution", () => {
  test("writes valid attribution columns", async () => {
    const at = "2026-11-01T12:00:00.000Z"
    const res = await post({
      ...base,
      gclid: "TEST123",
      utm_source: "google",
      utm_campaign: "test",
      click_captured_at: at,
    })
    expect(res.status).toBe(201)
    const payload = insertMock.mock.calls[0][0]
    expect(payload).toMatchObject({
      gclid: "TEST123",
      utm_source: "google",
      utm_campaign: "test",
      click_captured_at: at,
    })
    expect(payload).not.toHaveProperty("gbraid")
  })

  test("sends no attribution columns when none are captured", async () => {
    const res = await post(base)
    expect(res.status).toBe(201)
    const payload = insertMock.mock.calls[0][0]
    for (const k of ["gclid", "utm_source", "click_captured_at"]) {
      expect(payload).not.toHaveProperty(k)
    }
  })

  test("malformed tracking data is dropped, the brief still goes through", async () => {
    const res = await post({
      ...base,
      gclid: "x".repeat(1000),
      gbraid: 12,
      utm_source: ["google"],
      utm_medium: "cpc\u0000",
      click_captured_at: "not a date",
      utm_campaign: "kept",
    })
    expect(res.status).toBe(201)
    const payload = insertMock.mock.calls[0][0]
    expect(payload.utm_campaign).toBe("kept")
    for (const k of ["gclid", "gbraid", "utm_source", "utm_medium", "click_captured_at"]) {
      expect(payload).not.toHaveProperty(k)
    }
  })

  test("retries without the new columns when they don't exist yet", async () => {
    insertMock
      .mockResolvedValueOnce({
        data: null,
        error: { code: "PGRST204", message: "Could not find the 'gclid' column" },
      })
      .mockImplementationOnce(async (payload: Record<string, unknown>) => ({
        data: { id: "brief-2", ...payload },
        error: null,
      }))
    vi.spyOn(console, "warn").mockImplementation(() => {})

    const res = await post({ ...base, gclid: "TEST123", drive_hours: "3-5h" })
    expect(res.status).toBe(201)
    expect(insertMock).toHaveBeenCalledTimes(2)
    const retry = insertMock.mock.calls[1][0]
    expect(retry).not.toHaveProperty("gclid")
    expect(retry).not.toHaveProperty("drive_hours")
    expect(retry.contact_email).toBe("test@example.com")
  })
})
