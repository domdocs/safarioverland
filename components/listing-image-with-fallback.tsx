"use client"

import { useState, type ReactNode } from "react"
import Image from "next/image"

type Props = {
  src: string
  alt: string
  className?: string
  fallback: ReactNode
  /**
   * Tell Next which sizes the image will display at across breakpoints.
   * Defaults to `100vw` (cinematic hero on listing detail); callers in
   * narrower contexts (cards, thumbnails) should pass an accurate value
   * so the optimizer can serve a smaller variant.
   */
  sizes?: string
  /** First hero on the page should set this so Next preloads it. */
  priority?: boolean
}

/**
 * Renders the supplied URL via `next/image` (Vercel resizes + serves WebP
 * at the edge for any host whitelisted in next.config.mjs's
 * images.remotePatterns). On load failure — URL is dead, CORS-blocks,
 * etc. — swaps to the parent-supplied category fallback block.
 *
 * Previously this was a raw `<img>` paired with `images: { unoptimized:
 * true }` in next.config.mjs, which short-circuited all optimization.
 * The PR that landed Supabase Storage flipped both: optimization on,
 * next/image here. A multi-megabyte Supabase Storage source now reaches
 * the browser as a right-sized WebP off Vercel's CDN.
 */
export function ListingImageWithFallback({
  src,
  alt,
  className,
  fallback,
  sizes = "100vw",
  priority = false,
}: Props) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return <>{fallback}</>
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className ?? ""}`}
      onError={() => setErrored(true)}
    />
  )
}
