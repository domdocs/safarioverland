"use client"

import { useState, type ReactNode } from "react"

type Props = {
  src: string
  alt: string
  className?: string
  fallback: ReactNode
}

/**
 * Renders an <img>; on load failure, swaps to the parent-supplied fallback
 * block. Used by ListingImage to handle URLs that exist but 404 / CORS-fail
 * at fetch time (e.g. the homepage's broken-image instances).
 */
export function ListingImageWithFallback({ src, alt, className, fallback }: Props) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return <>{fallback}</>
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={`h-full w-full object-cover ${className ?? ""}`}
      onError={() => setErrored(true)}
      loading="lazy"
    />
  )
}
