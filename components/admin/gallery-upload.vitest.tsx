import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { GalleryUpload } from "./gallery-upload"

/**
 * The drag-to-reorder behaviour itself is a dnd-kit concern; we trust
 * the library and instead test the parts we own:
 *
 *   - drop N files → N sequential POSTs in order
 *   - returned URLs are appended to value
 *   - Remove X removes the right index
 *   - Existing URLs in `value` render as thumbnails on mount
 */
describe("GalleryUpload", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn())
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    cleanup()
  })

  function fakeJpeg(name: string): File {
    return new File([new Uint8Array([0xff, 0xd8, 0xff])], name, {
      type: "image/jpeg",
    })
  }

  function ok(url: string) {
    return new Response(JSON.stringify({ ok: true, url, path: "x" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  }

  test("Existing URLs render as numbered thumbnails", () => {
    render(
      <GalleryUpload
        listingId="abc"
        value={["https://x/1.jpg", "https://x/2.jpg"]}
        onChange={() => {}}
      />,
    )
    expect(screen.getByTestId("gallery-upload-thumb-0")).toBeTruthy()
    expect(screen.getByTestId("gallery-upload-thumb-1")).toBeTruthy()
  })

  test("Drop three files → three sequential POSTs, URLs appended in order", async () => {
    const fetchMock = global.fetch as unknown as ReturnType<typeof vi.fn>
    fetchMock
      .mockResolvedValueOnce(ok("https://x/a.jpg"))
      .mockResolvedValueOnce(ok("https://x/b.jpg"))
      .mockResolvedValueOnce(ok("https://x/c.jpg"))

    const onChange = vi.fn()
    const user = userEvent.setup()
    render(
      <GalleryUpload listingId="abc" value={[]} onChange={onChange} />,
    )

    await user.upload(
      screen.getByTestId("gallery-upload-input") as HTMLInputElement,
      [fakeJpeg("a.jpg"), fakeJpeg("b.jpg"), fakeJpeg("c.jpg")],
    )

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3))
    await waitFor(() =>
      expect(onChange).toHaveBeenLastCalledWith([
        "https://x/a.jpg",
        "https://x/b.jpg",
        "https://x/c.jpg",
      ]),
    )
  })

  test("Error during sequential upload halts batch with a message", async () => {
    const fetchMock = global.fetch as unknown as ReturnType<typeof vi.fn>
    fetchMock
      .mockResolvedValueOnce(ok("https://x/a.jpg"))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ ok: false, error: "file is 11MB; max is 10MB" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        ),
      )

    const onChange = vi.fn()
    const user = userEvent.setup()
    render(
      <GalleryUpload listingId="abc" value={[]} onChange={onChange} />,
    )

    await user.upload(
      screen.getByTestId("gallery-upload-input") as HTMLInputElement,
      [fakeJpeg("a.jpg"), fakeJpeg("toolarge.jpg")],
    )

    await waitFor(() =>
      expect(screen.getByTestId("gallery-upload-error").textContent).toMatch(
        /toolarge\.jpg/,
      ),
    )
    // Successful uploads before the failure still get flushed.
    expect(onChange).toHaveBeenLastCalledWith(["https://x/a.jpg"])
  })

  test("Remove X strips the right URL and calls onChange with the new array", async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(
      <GalleryUpload
        listingId="abc"
        value={["https://x/1.jpg", "https://x/2.jpg", "https://x/3.jpg"]}
        onChange={onChange}
      />,
    )
    await user.click(screen.getByTestId("gallery-upload-remove-1"))
    expect(onChange).toHaveBeenCalledWith([
      "https://x/1.jpg",
      "https://x/3.jpg",
    ])
  })
})
