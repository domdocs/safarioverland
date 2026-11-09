import Image from "next/image"
import type { ReactNode } from "react"

import type { MediaItem } from "@/lib/relaunch/media-select"
import { cn } from "@/lib/utils"

import { MediaCaption } from "./media-caption"

type Props = {
  item: MediaItem
  /** Height classes. Default 80vh with a floor. */
  height?: string
  /** Slow zoom (1.00 → 1.06 over 28 s); off under reduced motion. */
  kenBurns?: boolean
  /** object-position, e.g. "50% 80%". */
  position?: string
  /** Overlay content (a CTA, a heading). Gets the stronger night gradient. */
  children?: ReactNode
  caption?: string
  className?: string
}

/**
 * Full-bleed photograph (100vw) between contained sections. The night
 * gradient sinks the top and bottom edges into the page; the mono caption
 * and credit sit bottom-right. Lazy-loaded: these are never the hero.
 */
export function FullBleedImage({
  item,
  height = "h-[70vh] min-h-[420px] md:h-[80vh]",
  kenBurns,
  position,
  children,
  caption,
  className,
}: Props) {
  return (
    <section className={cn("relative w-full overflow-hidden bg-night", height, className)}>
      <div className={cn("absolute inset-0", kenBurns && "ken-burns")}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          children
            ? "bg-gradient-to-b from-night/70 via-night/55 to-night/90"
            : "bg-gradient-to-b from-night via-night/10 to-night/70",
        )}
      />
      {children && <div className="relative h-full">{children}</div>}
      <div className="absolute bottom-4 right-4 left-4 md:bottom-6 md:right-8 md:left-auto md:max-w-md">
        <MediaCaption item={item} caption={caption} tone="overlay" align="right" />
      </div>
    </section>
  )
}
