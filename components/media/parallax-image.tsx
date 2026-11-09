import Image from "next/image"

import type { MediaItem } from "@/lib/relaunch/media-select"
import { cn } from "@/lib/utils"

import { MediaCaption } from "./media-caption"

type Props = {
  item: MediaItem
  height?: string
  position?: string
  caption?: string
  className?: string
}

/**
 * Full-bleed photograph whose image drifts slightly slower than the page
 * (about 0.9× scroll speed). Pure CSS: `animation-timeline: view()` where
 * the browser supports it, a still image everywhere else, and a still
 * image under prefers-reduced-motion. No scroll listeners.
 *
 * Use at most twice per page (VISUAL_BRIEF §3).
 */
export function ParallaxImage({ item, height = "h-[60vh] min-h-[380px] md:h-[75vh]", position, caption, className }: Props) {
  return (
    <section className={cn("relative w-full overflow-hidden bg-night", height, className)}>
      {/* 12% taller than the band so the drift never shows an edge. */}
      <div className="parallax-media absolute inset-x-0 -top-[6%] -bottom-[6%]">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-night via-night/10 to-night/70" />
      <div className="absolute bottom-4 right-4 left-4 md:bottom-6 md:right-8 md:left-auto md:max-w-md">
        <MediaCaption item={item} caption={caption} tone="overlay" align="right" />
      </div>
    </section>
  )
}
