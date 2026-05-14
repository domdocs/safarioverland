import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import ImportListingsPage from "./page"

/**
 * Component tests for the /admin/listings/import page.
 *
 * Covers what the brief lists:
 *  - Upload: dropping/choosing a file lands it in the list; remove-X
 *    works; Import disabled until at least one file present.
 *  - Paste: empty disables; content enables.
 *  - Single Matetsi-shaped POST → success state renders the admin URL.
 *  - Three files with one validation failure → 2 successes + 1 error.
 *
 * fetch is stubbed. We don't reach Supabase or anything else — the API
 * contract is mocked at the fetch boundary.
 */

const MATETSI_OK = {
  ok: true,
  id: "11111111-1111-1111-1111-111111111111",
  listing_name: "Matetsi Victoria Falls",
  admin_url: "/admin/listings/edit/11111111-1111-1111-1111-111111111111",
  action: "created",
  warnings: [],
}

const TONGABEZI_OK = {
  ok: true,
  id: "22222222-2222-2222-2222-222222222222",
  listing_name: "Tongabezi Lodge",
  admin_url: "/admin/listings/edit/22222222-2222-2222-2222-222222222222",
  action: "created",
  warnings: [],
}

const ROYAL_CHUNDU_OK = {
  ok: true,
  id: "33333333-3333-3333-3333-333333333333",
  listing_name: "Royal Chundu",
  admin_url: "/admin/listings/edit/33333333-3333-3333-3333-333333333333",
  action: "created",
  warnings: [],
}

const VALIDATION_FAIL = {
  ok: false,
  errors: [
    "listing_name: Required",
    "external_ratings.0.rating: Expected number, received null",
  ],
}

function fakeMd(name: string): File {
  return new File(
    [`---\nlisting_name: ${name}\ncategory: Lodges\nregion: Southern Africa\ncountry: Zimbabwe\nlocation: x\n---\n`],
    `${name.toLowerCase().replace(/\s+/g, "-")}.md`,
    { type: "text/markdown" },
  )
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

describe("ImportListingsPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn())
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    cleanup()
  })

  // ── Upload-mode state behaviour ────────────────────────────────────────

  test("Upload mode: import button disabled until at least one file present", () => {
    render(<ImportListingsPage />)
    const btn = screen.getByTestId("import-button") as HTMLButtonElement
    expect(btn.disabled).toBe(true)
  })

  test("Upload mode: choosing a file shows it in the list and enables Import", async () => {
    const user = userEvent.setup()
    render(<ImportListingsPage />)

    const file = fakeMd("Matetsi")
    const input = screen.getByTestId("file-input") as HTMLInputElement
    await user.upload(input, file)

    expect(screen.getByText("matetsi.md")).toBeTruthy()
    expect(screen.getByTestId("import-button")).not.toHaveProperty(
      "disabled",
      true,
    )
    expect(
      (screen.getByTestId("import-button") as HTMLButtonElement).disabled,
    ).toBe(false)
  })

  test("Upload mode: remove-X removes the file and re-disables Import", async () => {
    const user = userEvent.setup()
    render(<ImportListingsPage />)

    const file = fakeMd("Matetsi")
    const input = screen.getByTestId("file-input") as HTMLInputElement
    await user.upload(input, file)
    expect(screen.getByText("matetsi.md")).toBeTruthy()

    const remove = screen.getByRole("button", { name: /remove matetsi\.md/i })
    await user.click(remove)

    expect(screen.queryByText("matetsi.md")).toBeNull()
    expect(
      (screen.getByTestId("import-button") as HTMLButtonElement).disabled,
    ).toBe(true)
  })

  // ── Paste-mode state behaviour ─────────────────────────────────────────

  test("Paste mode: empty textarea disables Import, typing enables it", async () => {
    const user = userEvent.setup()
    render(<ImportListingsPage />)

    await user.click(screen.getByRole("tab", { name: /paste/i }))

    const btn = screen.getByTestId("import-button") as HTMLButtonElement
    expect(btn.disabled).toBe(true)

    const textarea = screen.getByTestId("paste-textarea") as HTMLTextAreaElement
    await user.type(textarea, "---\nlisting_name: Test\n---")
    expect(btn.disabled).toBe(false)
  })

  // ── Single import → success ────────────────────────────────────────────

  test("single upload import: POSTs JSON with markdown body, renders success entry with admin URL", async () => {
    const fetchMock = global.fetch as unknown as ReturnType<typeof vi.fn>
    fetchMock.mockResolvedValueOnce(jsonResponse(201, MATETSI_OK))

    const user = userEvent.setup()
    render(<ImportListingsPage />)

    const file = fakeMd("Matetsi")
    await user.upload(
      screen.getByTestId("file-input") as HTMLInputElement,
      file,
    )
    await user.click(screen.getByTestId("import-button"))

    await waitFor(() => {
      // Filename appears under Results
      expect(
        screen.getAllByText("matetsi.md").length,
      ).toBeGreaterThanOrEqual(1)
    })

    // Assert the API call shape
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe("/api/admin/listings/import")
    expect(init.method).toBe("POST")
    const body = JSON.parse(init.body as string) as { markdown: string }
    expect(body.markdown).toContain("listing_name: Matetsi")

    // Success row renders with the admin URL link
    const link = await screen.findByRole("link", { name: /open in admin/i })
    expect(link.getAttribute("href")).toBe(MATETSI_OK.admin_url)
    expect(screen.getByText(/Matetsi Victoria Falls/i)).toBeTruthy()
  })

  // ── Three-file batch with one failure ─────────────────────────────────

  test("three uploads with one validation failure: 2 successes + 1 inline error", async () => {
    const fetchMock = global.fetch as unknown as ReturnType<typeof vi.fn>
    fetchMock
      .mockResolvedValueOnce(jsonResponse(201, MATETSI_OK))
      .mockResolvedValueOnce(jsonResponse(400, VALIDATION_FAIL))
      .mockResolvedValueOnce(jsonResponse(201, ROYAL_CHUNDU_OK))

    const user = userEvent.setup()
    render(<ImportListingsPage />)

    const files = [
      fakeMd("Matetsi"),
      fakeMd("BrokenTongabezi"),
      fakeMd("RoyalChundu"),
    ]
    await user.upload(
      screen.getByTestId("file-input") as HTMLInputElement,
      files,
    )
    await user.click(screen.getByTestId("import-button"))

    // Three calls, sequential (assert order).
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3))

    // Both success rows rendered with their admin URLs
    const links = await screen.findAllByRole("link", { name: /open in admin/i })
    expect(links.length).toBe(2)
    const hrefs = links.map((l) => l.getAttribute("href"))
    expect(hrefs).toContain(MATETSI_OK.admin_url)
    expect(hrefs).toContain(ROYAL_CHUNDU_OK.admin_url)

    // Validation error rendered inline for the broken one
    expect(screen.getByText(/listing_name: Required/i)).toBeTruthy()
    expect(
      screen.getByText(/external_ratings\.0\.rating/i),
    ).toBeTruthy()
  })
})
