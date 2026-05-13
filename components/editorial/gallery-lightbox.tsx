"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { BlendOverlay } from "./blend-overlay"
import { cn } from "@/lib/utils"

export type LightboxImage = {
  /** Public URL — usually a Supabase Storage URL routed through next/image. */
  url: string
  alt: string
}

type Props = {
  images: LightboxImage[]
  listingName: string
}

/**
 * Single-component gallery surface used inside ListingDetail.
 *
 * Thumbnails render in a 2-column grid (single column on mobile) and
 * each one is a button. Clicking opens a modal portal with the
 * full-size image, prev / next arrows, an X close, ESC + arrow-key
 * support, scroll lock, and a counter (e.g. "3 / 7").
 *
 * The HTML thumbnails are still server-rendered through `next/image`,
 * so first paint stays optimized; only the modal is client-only.
 *
 * Mirrors the PlannerCallModal a11y pattern — ESC + backdrop close,
 * `document.body.style.overflow="hidden"` for scroll lock, focus on
 * the close button when the modal opens.
 */
export function GalleryLightbox({ images, listingName }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (images.length === 0) return null

  function open(i: number) {
    setOpenIndex(i)
  }
  function close() {
    setOpenIndex(null)
  }
  function prev() {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    )
  }
  function next() {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length))
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {images.map((img, i) => (
          <li key={`${img.url}-${i}`}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`Open ${img.alt} — ${i + 1} of ${images.length}`}
              className="relative block w-full aspect-[4/3] overflow-hidden bg-card group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              data-testid={`gallery-thumb-${i}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <BlendOverlay />
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <LightboxModal
          image={images[openIndex]}
          index={openIndex}
          total={images.length}
          listingName={listingName}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  )
}

// ── Modal ───────────────────────────────────────────────────────────────

type ModalProps = {
  image: LightboxImage
  index: number
  total: number
  listingName: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function LightboxModal({
  image,
  index,
  total,
  listingName,
  onClose,
  onPrev,
  onNext,
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeBtnRef.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowLeft") onPrev()
      else if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, onPrev, onNext])

  const showNav = total > 1

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery — ${listingName}, image ${index + 1} of ${total}`}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-night/95 backdrop-blur-sm"
      onClick={onClose}
      data-testid="gallery-lightbox"
    >
      {/* Top bar — counter + close */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mono text-xs text-bone-mute tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="text-bone-mute hover:text-amber transition-colors p-2 -m-2"
          data-testid="gallery-lightbox-close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Previous */}
      {showNav && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          aria-label="Previous image"
          className={cn(
            "absolute left-4 md:left-8 z-10 inline-flex h-12 w-12 items-center justify-center",
            "text-bone-mute hover:text-amber transition-colors",
          )}
          data-testid="gallery-lightbox-prev"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {/* Image — click to close (mirrors the backdrop click) */}
      <div
        className="relative h-full w-full max-w-6xl max-h-[88vh] flex items-center justify-center p-12 sm:p-16"
        onClick={onClose}
      >
        <div
          className="relative w-full h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 90vw, 100vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Next */}
      {showNav && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label="Next image"
          className={cn(
            "absolute right-4 md:right-8 z-10 inline-flex h-12 w-12 items-center justify-center",
            "text-bone-mute hover:text-amber transition-colors",
          )}
          data-testid="gallery-lightbox-next"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {/* Caption — alt text + listing name */}
      <div
        className="absolute bottom-0 left-0 right-0 px-6 py-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mono text-xs text-bone-mute">
          {image.alt}
        </p>
      </div>
    </div>
  )
}
