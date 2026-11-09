import Image from "next/image"
import type { ReactNode } from "react"

import { cardSrc, type MediaItem } from "@/lib/relaunch/media-select"
import { cn } from "@/lib/utils"

import { MediaCaption } from "./media-caption"

export type ImageNumberedItem = {
  title: ReactNode
  body?: ReactNode
  item: MediaItem
}

/**
 * The editorial numbered list (amber mono counters, hairline rules) with
 * a small square photograph beside each entry (VISUAL_BRIEF §2.1, row 6).
 */
export function ImageNumberedList({ items, className }: { items: ImageNumberedItem[]; className?: string }) {
  return (
    <ul className={cn("grid gap-y-10", className)}>
      {items.map((it, i) => (
        <li
          key={i}
          className="grid grid-cols-[2rem_6rem_1fr] gap-x-4 border-t border-rule pt-6 sm:grid-cols-[2.5rem_8rem_1fr] sm:gap-x-6 md:grid-cols-[2.5rem_10rem_1fr]"
        >
          <span className="mono pt-1 text-amber" aria-hidden>
            {String(i + 1).padStart(2, "0")}
          </span>
          <figure>
            <div className="relative aspect-square overflow-hidden bg-card">
              <Image src={cardSrc(it.item)} alt={it.item.alt} fill sizes="160px" className="object-cover" />
            </div>
            <figcaption className="mt-2 hidden sm:block">
              <MediaCaption item={it.item} />
            </figcaption>
          </figure>
          <div className="min-w-0">
            <h3 className="mb-1 font-serif text-h4-fluid leading-tight text-bone">{it.title}</h3>
            {it.body && <p className="leading-relaxed text-bone-mute">{it.body}</p>}
            {/* Phones: caption and credit under the text, where there's room. */}
            <div className="mt-3 sm:hidden">
              <MediaCaption item={it.item} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
