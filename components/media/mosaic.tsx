"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { BlendOverlay } from "@/components/editorial/blend-overlay"
import { cardSrc, captionFor, type MediaItem } from "@/lib/relaunch/media-select"
import { cn } from "@/lib/utils"

import { MediaCaption } from "./media-caption"

type Props = {
  /** Three: one large, two stacked. Only the first three are shown. */
  items: MediaItem[]
  /** Names the set for the dialog, e.g. "Zimbabwe". */
  label: string
  className?: string
}

/**
 * A fixed three-image mosaic (no carousel, no auto-advance). Each image
 * is a button that opens a lightbox: Esc closes, arrow keys step, Tab
 * stays inside the dialog, and focus returns to the image that opened it.
 *
 * Not built on components/editorial/gallery-lightbox.tsx: that one is a
 * two-column thumbnail grid tied to listing pages, and its caption has
 * no room for the licence credit these images need.
 */
export function Mosaic({ items: all, label, className }: Props) {
  const items = all.slice(0, 3)
  const [open, setOpen] = useState<number | null>(null)
  const triggers = useRef<(HTMLButtonElement | null)[]>([])
  const lastTrigger = useRef<number>(0)

  const show = (i: number) => {
    lastTrigger.current = i
    setOpen(i)
  }
  const close = useCallback(() => {
    setOpen(null)
    // Return focus to whatever opened the dialog.
    requestAnimationFrame(() => triggers.current[lastTrigger.current]?.focus())
  }, [])
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? null : (i + d + items.length) % items.length)),
    [items.length],
  )

  const tile = (i: number, sizes: string, cls: string) => {
    const m = items[i]
    return (
      <figure className={cn("min-w-0", cls)}>
        <button
          ref={(el) => {
            triggers.current[i] = el
          }}
          type="button"
          onClick={() => show(i)}
          aria-label={`Open photograph ${i + 1} of ${items.length}: ${captionFor(m)}`}
          className="group relative block aspect-[4/3] w-full overflow-hidden bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-amber sm:aspect-auto sm:h-full"
        >
          <Image
            src={cardSrc(m)}
            alt={m.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <BlendOverlay className="opacity-70" />
          {/* From sm up the caption sits on the photo; phones get it underneath. */}
          <span className="pointer-events-none absolute bottom-3 left-3 right-3 hidden text-left sm:block">
            <MediaCaption item={m} tone="overlay" />
          </span>
        </button>
        <figcaption className="mt-2 sm:hidden">
          <MediaCaption item={m} />
        </figcaption>
      </figure>
    )
  }

  if (items.length < 3) return null

  return (
    <>
      {/* Phones: one column, each caption under its own photograph. */}
      <div className={cn("grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:grid-rows-2", className)}>
        {tile(0, "(min-width: 768px) 66vw, 100vw", "sm:col-span-2 sm:aspect-[4/3] md:row-span-2 md:aspect-auto")}
        {tile(1, "(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw", "sm:aspect-[4/3]")}
        {tile(2, "(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw", "sm:aspect-[4/3]")}
      </div>
      {open !== null && (
        <Lightbox item={items[open]} index={open} total={items.length} label={label} onClose={close} onStep={step} />
      )}
    </>
  )
}

function Lightbox({
  item,
  index,
  total,
  label,
  onClose,
  onStep,
}: {
  item: MediaItem
  index: number
  total: number
  label: string
  onClose: () => void
  onStep: (d: number) => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowLeft") onStep(-1)
      else if (e.key === "ArrowRight") onStep(1)
      else if (e.key === "Tab") {
        // Keep focus inside the dialog.
        const f = dialogRef.current?.querySelectorAll<HTMLElement>("button")
        if (!f || f.length === 0) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, onStep])

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${label}: photograph ${index + 1} of ${total}`}
      className="fixed inset-0 z-[80] flex flex-col bg-night/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-6 py-4" onClick={(e) => e.stopPropagation()}>
        <p className="font-mono text-xs text-bone-mute tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-m-2 p-2 text-bone-mute transition-colors hover:text-amber focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex-1 px-14 sm:px-20">
        <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
          <Image src={item.src} alt={item.alt} fill sizes="90vw" className="object-contain" />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onStep(-1)
          }}
          aria-label="Previous photograph"
          className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center text-bone-mute transition-colors hover:text-amber focus:outline-none focus-visible:ring-2 focus-visible:ring-amber sm:left-4"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onStep(1)
          }}
          aria-label="Next photograph"
          className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center text-bone-mute transition-colors hover:text-amber focus:outline-none focus-visible:ring-2 focus-visible:ring-amber sm:right-4"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      <div className="px-6 py-5 text-center" onClick={(e) => e.stopPropagation()}>
        <p className="mx-auto max-w-2xl text-sm text-bone">{item.alt}</p>
        <MediaCaption item={item} className="mt-2" />
      </div>
    </div>
  )
}
