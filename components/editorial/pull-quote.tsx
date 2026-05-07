import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type PullQuoteProps = {
  children: ReactNode
  /** Optional attribution — guide name, source, etc. */
  attribution?: ReactNode
  /** Smaller variant suitable for sidebars. Default is the full-bleed editorial size. */
  size?: "default" | "sm"
  className?: string
}

/**
 * Editorial pull quote — italic serif at large display size, amber accent,
 * with optional attribution rendered below in mono.
 *
 * Used inside articles, listing verdict sections, and the home manifesto.
 */
export function PullQuote({
  children,
  attribution,
  size = "default",
  className,
}: PullQuoteProps) {
  return (
    <figure
      className={cn(
        "relative border-l-2 border-amber pl-6 py-2",
        size === "default" ? "max-w-3xl" : "max-w-xl",
        className,
      )}
    >
      <blockquote
        className={cn(
          "font-serif italic text-amber leading-tight text-balance",
          size === "default" ? "text-h2-fluid" : "text-h3-fluid",
        )}
      >
        {typeof children === "string" ? `“${children}”` : children}
      </blockquote>
      {attribution && (
        <figcaption className="mono text-bone-mute mt-4">— {attribution}</figcaption>
      )}
    </figure>
  )
}
