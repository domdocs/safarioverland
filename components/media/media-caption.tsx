import { captionFor, creditFor, type MediaItem } from "@/lib/relaunch/media-select"
import { cn } from "@/lib/utils"

type Props = {
  item: MediaItem
  /** Replaces the manifest caption (still mono, still "Place · detail"). */
  caption?: string
  /** "overlay" sits on a photo (bone on the night gradient); "below" sits under one. */
  tone?: "overlay" | "below"
  align?: "left" | "right"
  /** Hide the "Place · detail" line and keep only the credit. */
  creditOnly?: boolean
  className?: string
}

/**
 * The mono caption line plus, where the licence requires it, the credit
 * in smaller type. Renders as plain text (no figcaption) so it can sit
 * inside a link or an overlay; wrap it in <figcaption> where it labels
 * a <figure>.
 */
export function MediaCaption({ item, caption, tone = "below", align = "left", creditOnly, className }: Props) {
  const credit = creditFor(item)
  if (creditOnly && !credit) return null
  return (
    <span
      className={cn(
        "block",
        align === "right" && "text-right",
        className,
      )}
    >
      {!creditOnly && (
        <span
          className={cn(
            "block font-mono text-[11px] uppercase tracking-[0.16em]",
            tone === "overlay" ? "text-bone/85" : "text-bone-mute",
          )}
        >
          {caption ?? captionFor(item)}
        </span>
      )}
      {credit && (
        <span
          className={cn(
            "block font-mono text-[10px] leading-snug normal-case tracking-normal",
            !creditOnly && "mt-1",
            tone === "overlay" ? "text-bone/60" : "text-bone-mute/70",
          )}
        >
          {credit}
        </span>
      )}
    </span>
  )
}
