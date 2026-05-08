"use client"

import Image from "next/image"
import { useState } from "react"
import { Compass } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  src: string | null | undefined
  alt: string
  /** Forwarded to Next.js Image. */
  sizes?: string
  /** Forwarded to Next.js Image. */
  priority?: boolean
  /** Extra classes for the underlying Image. Default: object-cover. */
  className?: string
}

/**
 * Next.js Image + onError fallback. Drop-in replacement for the
 * `<Image fill className="object-cover" />` pattern when the source
 * URL might 404 at runtime.
 *
 * On load failure or a missing/empty src, swaps to a tinted icon block
 * sized to fill the parent (the parent must be `relative`).
 *
 * Client component because of the onError handler — the rest of the
 * page still renders on the server.
 */
export function EditorialImage({ src, alt, sizes, priority, className }: Props) {
  const [errored, setErrored] = useState(false)
  const missing = !src || src.trim() === "" || src.includes("placeholder.svg")

  if (missing || errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-card",
          className,
        )}
      >
        <Compass className="h-12 w-12 text-amber/60" strokeWidth={1.5} aria-hidden />
      </div>
    )
  }

  return (
    <Image
      src={src as string}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      onError={() => setErrored(true)}
    />
  )
}
