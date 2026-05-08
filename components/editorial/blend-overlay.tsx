import { cn } from "@/lib/utils"

/**
 * Editorial image blend — a 4-stop vertical gradient that softens the top
 * and bottom edges of a thumbnail image, leaving the centre near-transparent.
 *
 *   night/0.70 ── 0%
 *   night/0.15 ── 35%
 *   night/0.15 ── 65%
 *   night/0.70 ── 100%
 *
 * Drop inside any `relative` parent with an Image / ListingImage child. The
 * overlay is `pointer-events-none` so card hover states pass through.
 *
 * Usage:
 *   <div className="relative aspect-[4/3] overflow-hidden bg-card">
 *     <Image fill ... />
 *     <BlendOverlay />
 *   </div>
 */
export function BlendOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        "bg-[linear-gradient(to_bottom,rgb(var(--night)/0.7)_0%,rgb(var(--night)/0.15)_35%,rgb(var(--night)/0.15)_65%,rgb(var(--night)/0.7)_100%)]",
        className,
      )}
    />
  )
}
