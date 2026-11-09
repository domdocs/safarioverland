import Image from "next/image"
import type { ReactNode } from "react"

import type { HeroVideoSource, MediaItem } from "@/lib/relaunch/media-select"
import { cn } from "@/lib/utils"

import { HeroVideo } from "./hero-video"
import { MediaCaption } from "./media-caption"

type Props = {
  /** The still: the whole hero when there's no video. */
  still: MediaItem
  /** A looping video (with its manifest entry for alt and caption). */
  video?: { source: HeroVideoSource; item: MediaItem }
  /** Slow zoom on the still. Ignored when a video plays. */
  kenBurns?: boolean
  height?: string
  position?: string
  children: ReactNode
}

/**
 * Page hero: a still or a muted loop, the night gradient, the page's
 * own heading block (children, bottom-left) and the mono caption
 * bottom-right. The still is next/image with priority: the LCP element.
 */
export function HeroMedia({
  still,
  video,
  kenBurns,
  height = "h-[85vh] min-h-[600px]",
  position,
  children,
}: Props) {
  const captionItem = video?.item ?? still
  return (
    <section className={cn("relative w-full overflow-hidden bg-night", height)}>
      {video ? (
        <HeroVideo
          desktopSrc={video.source.desktop}
          portraitSrc={video.source.portrait}
          poster={video.source.poster}
          alt={video.item.alt}
        />
      ) : (
        <div className={cn("absolute inset-0", kenBurns && "ken-burns")}>
          <Image
            src={still.src}
            alt={still.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={position ? { objectPosition: position } : undefined}
          />
        </div>
      )}
      {/* Night gradients: down the frame, and in from the left where the type sits. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-night/50 via-night/35 to-night" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-night/70 via-night/30 to-transparent" />
      {children}
      <div className="pointer-events-none absolute bottom-4 right-4 max-w-[60%] sm:max-w-sm md:bottom-6 md:right-8">
        <MediaCaption item={captionItem} tone="overlay" align="right" />
      </div>
    </section>
  )
}
