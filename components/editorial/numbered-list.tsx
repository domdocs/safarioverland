import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type NumberedListItem = {
  /** Optional explicit label, e.g. "01a". Defaults to padded index. */
  label?: string
  /** Heading line — usually a noun phrase. */
  title: ReactNode
  /** Body line — supporting detail. */
  body?: ReactNode
}

type NumberedListProps = {
  items: NumberedListItem[]
  className?: string
  /** Two-column on lg+ by default; pass false for single column. */
  twoColumn?: boolean
  /** Starting index for the auto-numbered labels (1-based). */
  startAt?: number
}

function pad(n: number): string {
  return n.toString().padStart(2, "0")
}

/**
 * Editorial numbered list — monospace counters in the left rail,
 * serif/sans heading + supporting copy in the body.
 *
 * Used for amenities, FAQs, decision matrices.
 */
export function NumberedList({
  items,
  className,
  twoColumn = true,
  startAt = 1,
}: NumberedListProps) {
  return (
    <ul
      className={cn(
        "grid gap-x-12 gap-y-8",
        twoColumn ? "lg:grid-cols-2" : "grid-cols-1",
        className,
      )}
    >
      {items.map((item, i) => {
        const label = item.label ?? pad(startAt + i)
        return (
          <li key={`${label}-${i}`} className="flex gap-6 border-t border-rule pt-6">
            <span className="mono text-amber pt-1 shrink-0" aria-hidden>
              {label}
            </span>
            <div className="flex-1">
              <h4 className="font-serif text-h4-fluid text-bone leading-tight mb-1">
                {item.title}
              </h4>
              {item.body && <p className="text-bone-mute leading-relaxed">{item.body}</p>}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
