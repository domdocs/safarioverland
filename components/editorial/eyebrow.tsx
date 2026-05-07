import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type EyebrowProps = {
  children: ReactNode
  className?: string
  /** Render a hairline rule above the eyebrow (typical pattern in section heads). */
  withRule?: boolean
  /** Render as an h-element if you want it to count semantically; default span. */
  as?: "span" | "p" | "div"
}

/**
 * Editorial eyebrow — short, uppercase, letterspaced label that introduces
 * a section. Inherits the `eyebrow` utility class from globals.css (amber,
 * 11px, 0.22em tracking).
 *
 * Usage:
 *   <Eyebrow>Field notes</Eyebrow>
 *   <Eyebrow withRule>01 — Plan</Eyebrow>
 */
export function Eyebrow({
  children,
  className,
  withRule = false,
  as: Tag = "span",
}: EyebrowProps) {
  if (withRule) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <span className="block h-px w-8 bg-amber" aria-hidden />
        <Tag className="eyebrow">{children}</Tag>
      </div>
    )
  }
  return <Tag className={cn("eyebrow", className)}>{children}</Tag>
}
