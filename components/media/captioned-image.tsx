import Image from "next/image"
import type { ReactNode } from "react"

import { BlendOverlay } from "@/components/editorial/blend-overlay"
import { cardSrc, type MediaItem } from "@/lib/relaunch/media-select"
import { cn } from "@/lib/utils"

import { MediaCaption } from "./media-caption"

type Props = {
  item: MediaItem
  /** Fixed aspect box so nothing shifts while it loads. */
  aspect?: string
  sizes: string
  /** Replaces the manifest caption. */
  caption?: string
  /** Extra line under the caption, e.g. "Photograph of the lodge to come". */
  note?: ReactNode
  /** Use the 1200 px card file (small slots). */
  card?: boolean
  priority?: boolean
  /** object-position, e.g. "50% 70%". */
  position?: string
  blend?: boolean
  className?: string
  imageClassName?: string
}

/** A photograph in a fixed aspect box with its mono caption (and credit) beneath. */
export function CaptionedImage({
  item,
  aspect = "aspect-[16/9]",
  sizes,
  caption,
  note,
  card,
  priority,
  position,
  blend = true,
  className,
  imageClassName,
}: Props) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div className={cn("relative overflow-hidden bg-card", aspect)}>
        <Image
          src={card ? cardSrc(item) : item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
          style={position ? { objectPosition: position } : undefined}
        />
        {blend && <BlendOverlay className="opacity-60" />}
      </div>
      <figcaption className="mt-3">
        <MediaCaption item={item} caption={caption} />
        {note && <span className="mt-1 block text-xs text-bone-mute">{note}</span>}
      </figcaption>
    </figure>
  )
}
