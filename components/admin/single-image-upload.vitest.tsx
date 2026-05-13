import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { SingleImageUpload } from "./single-image-upload"

/**
 * The component fetches /api/admin/upload at the file-drop boundary;
 * tests stub fetch at that boundary to assert the right form fields
 * are posted and that the URL it returns flows to onChange.
 */
describe("SingleImageUpload", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn())
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    cleanup()
  })

  function fakeJpeg(name = "hero.jpg") {
    // Just enough bytes for the test runtime to treat it as a non-empty
    // File. The component reads file.type/size, not the bytes.
    return new File([new Uint8Array([0xff, 0xd8, 0xff])], name, {
      type: "image/jpeg",
    })
  }

  test("Empty value shows the drop zone, hint, and a disabled-looking input", () => {
    render(
      <SingleImageUpload
        listingId="abc"
        slot="hero"
        value=""
        onChange={() => {}}
        hint="Landscape, please."
      />,
    )
    expect(screen.getByTestId("hero-upload-dropzone")).toBeTruthy()
    expect(screen.getByText(/Landscape, please/)).toBeTruthy()
    expect(screen.queryByTestId("hero-upload-filled")).toBeNull()
  })

  test("Drop a JPEG → POSTs multipart form to /api/admin/upload with right fields, onChange fires with returned URL", async () => {
    const fetchMock = global.fetch as unknown as ReturnType<typeof vi.fn>
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          ok: true,
          url: "https://supabase.example/listing-media/abc/hero/uuid.jpg",
          path: "abc/hero/uuid.jpg",
        }),
        { status: 201, headers: { "Content-Type": "application/json" } },
      ),
    )

    const onChange = vi.fn()
    const user = userEvent.setup()
    render(
      <SingleImageUpload
        listingId="abc"
        slot="hero"
        value=""
        onChange={onChange}
      />,
    )

    const input = screen.getByTestId("hero-upload-input") as HTMLInputElement
    await user.upload(input, fakeJpeg())

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe("/api/admin/upload")
    expect(init.method).toBe("POST")
    const form = init.body as FormData
    expect(form.get("listing_id")).toBe("abc")
    expect(form.get("slot")).toBe("hero")
    expect(form.get("file")).toBeInstanceOf(File)

    await waitFor(() =>
      expect(onChange).toHaveBeenCalledWith(
        "https://supabase.example/listing-media/abc/hero/uuid.jpg",
      ),
    )
  })

  test("API error response → renders the error message and onChange not called", async () => {
    const fetchMock = global.fetch as unknown as ReturnType<typeof vi.fn>
    // Simulate the server-side validator catching an oversize file
    // that slipped past client-side checks.
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          ok: false,
          error: "file is 12MB; max is 10MB",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      ),
    )

    const onChange = vi.fn()
    const user = userEvent.setup()
    render(
      <SingleImageUpload
        listingId="abc"
        slot="hero"
        value=""
        onChange={onChange}
      />,
    )
    await user.upload(
      screen.getByTestId("hero-upload-input") as HTMLInputElement,
      fakeJpeg("toolarge.jpg"),
    )

    await waitFor(() => {
      expect(screen.getByTestId("hero-upload-error").textContent).toMatch(
        /max is 10MB/,
      )
    })
    expect(onChange).not.toHaveBeenCalled()
  })

  test("Filled value shows thumbnail, URL block, and Remove clears via onChange('')", async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(
      <SingleImageUpload
        listingId="abc"
        slot="hero"
        value="https://supabase.example/listing-media/abc/hero/x.jpg"
        onChange={onChange}
      />,
    )

    expect(screen.getByTestId("hero-upload-filled")).toBeTruthy()
    expect(
      screen.getByText(
        "https://supabase.example/listing-media/abc/hero/x.jpg",
      ),
    ).toBeTruthy()

    await user.click(screen.getByTestId("hero-upload-remove"))
    expect(onChange).toHaveBeenCalledWith("")
  })

  test("Replace clears the URL (parent re-mounts the drop zone)", async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(
      <SingleImageUpload
        listingId="abc"
        slot="hero"
        value="https://supabase.example/listing-media/abc/hero/x.jpg"
        onChange={onChange}
      />,
    )
    await user.click(screen.getByTestId("hero-upload-replace"))
    expect(onChange).toHaveBeenCalledWith("")
  })
})
