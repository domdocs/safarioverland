import { afterEach, describe, expect, test } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { GalleryLightbox } from "./gallery-lightbox"

const IMAGES = [
  { url: "https://x/1.jpg", alt: "Lioness at dawn" },
  { url: "https://x/2.jpg", alt: "Elephant detail" },
  { url: "https://x/3.jpg", alt: "Sunset, Linkwasha" },
  { url: "https://x/4.jpg", alt: "Bull elephant grazing" },
]

describe("GalleryLightbox", () => {
  afterEach(cleanup)

  test("Renders thumbnails as buttons with accessible labels", () => {
    render(
      <GalleryLightbox listingName="Linkwasha Camp" images={IMAGES} />,
    )
    for (let i = 0; i < IMAGES.length; i++) {
      expect(screen.getByTestId(`gallery-thumb-${i}`)).toBeTruthy()
    }
    expect(
      screen.getByRole("button", {
        name: /Open Lioness at dawn — 1 of 4/,
      }),
    ).toBeTruthy()
  })

  test("Click thumb 2 → modal opens on image 2, counter reads 02 / 04", async () => {
    const user = userEvent.setup()
    render(
      <GalleryLightbox listingName="Linkwasha Camp" images={IMAGES} />,
    )

    expect(screen.queryByTestId("gallery-lightbox")).toBeNull()
    await user.click(screen.getByTestId("gallery-thumb-1"))

    const lightbox = screen.getByTestId("gallery-lightbox")
    expect(lightbox).toBeTruthy()
    expect(lightbox.textContent).toContain("02 / 04")
    expect(lightbox.textContent).toContain("Elephant detail")
  })

  test("Next button advances; wraps at the end back to 01", async () => {
    const user = userEvent.setup()
    render(
      <GalleryLightbox listingName="Linkwasha Camp" images={IMAGES} />,
    )

    await user.click(screen.getByTestId("gallery-thumb-2")) // open at 3rd
    expect(screen.getByTestId("gallery-lightbox").textContent).toContain(
      "03 / 04",
    )

    await user.click(screen.getByTestId("gallery-lightbox-next"))
    expect(screen.getByTestId("gallery-lightbox").textContent).toContain(
      "04 / 04",
    )

    await user.click(screen.getByTestId("gallery-lightbox-next"))
    // Wraps to first
    expect(screen.getByTestId("gallery-lightbox").textContent).toContain(
      "01 / 04",
    )
  })

  test("Prev button retreats; wraps at the start back to last", async () => {
    const user = userEvent.setup()
    render(
      <GalleryLightbox listingName="Linkwasha Camp" images={IMAGES} />,
    )

    await user.click(screen.getByTestId("gallery-thumb-0")) // open at 1st
    await user.click(screen.getByTestId("gallery-lightbox-prev"))
    // Wraps to last
    expect(screen.getByTestId("gallery-lightbox").textContent).toContain(
      "04 / 04",
    )
  })

  test("ESC closes the lightbox", async () => {
    const user = userEvent.setup()
    render(
      <GalleryLightbox listingName="Linkwasha Camp" images={IMAGES} />,
    )
    await user.click(screen.getByTestId("gallery-thumb-0"))
    expect(screen.queryByTestId("gallery-lightbox")).toBeTruthy()

    fireEvent.keyDown(window, { key: "Escape" })
    expect(screen.queryByTestId("gallery-lightbox")).toBeNull()
  })

  test("ArrowRight + ArrowLeft drive navigation from the keyboard", async () => {
    const user = userEvent.setup()
    render(
      <GalleryLightbox listingName="Linkwasha Camp" images={IMAGES} />,
    )
    await user.click(screen.getByTestId("gallery-thumb-1")) // open at 02

    fireEvent.keyDown(window, { key: "ArrowRight" })
    expect(screen.getByTestId("gallery-lightbox").textContent).toContain(
      "03 / 04",
    )

    fireEvent.keyDown(window, { key: "ArrowLeft" })
    fireEvent.keyDown(window, { key: "ArrowLeft" })
    expect(screen.getByTestId("gallery-lightbox").textContent).toContain(
      "01 / 04",
    )
  })

  test("Close button (X) closes the modal", async () => {
    const user = userEvent.setup()
    render(
      <GalleryLightbox listingName="Linkwasha Camp" images={IMAGES} />,
    )
    await user.click(screen.getByTestId("gallery-thumb-0"))
    await user.click(screen.getByTestId("gallery-lightbox-close"))
    expect(screen.queryByTestId("gallery-lightbox")).toBeNull()
  })

  test("Single image: prev/next buttons are not rendered", async () => {
    const user = userEvent.setup()
    render(
      <GalleryLightbox
        listingName="Linkwasha Camp"
        images={[IMAGES[0]]}
      />,
    )
    await user.click(screen.getByTestId("gallery-thumb-0"))
    expect(screen.queryByTestId("gallery-lightbox-prev")).toBeNull()
    expect(screen.queryByTestId("gallery-lightbox-next")).toBeNull()
    // Counter still renders correctly
    expect(screen.getByTestId("gallery-lightbox").textContent).toContain(
      "01 / 01",
    )
  })

  test("Empty image list → renders nothing", () => {
    const { container } = render(
      <GalleryLightbox listingName="Linkwasha Camp" images={[]} />,
    )
    expect(container.textContent).toBe("")
  })
})
