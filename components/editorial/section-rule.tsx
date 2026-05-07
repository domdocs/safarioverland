import { cn } from "@/lib/utils"

type SectionRuleProps = {
  /** e.g. 1 of 4 → "01 / 04" */
  index?: number
  /** total siblings, used with index */
  total?: number
  /** standalone label, overrides index/total */
  label?: string
  className?: string
}

function pad(n: number): string {
  return n.toString().padStart(2, "0")
}

/**
 * Hairline divider with an optional monospace label inset.
 * Use to separate sections within a list, or to mark progression
 * inside an article (01 / 04, 02 / 04 …).
 *
 * Usage:
 *   <SectionRule index={1} total={4} />
 *   <SectionRule label="In season" />
 *   <SectionRule />  // plain hairline
 */
export function SectionRule({ index, total, label, className }: SectionRuleProps) {
  const text = label ?? (index !== undefined && total !== undefined ? `${pad(index)} / ${pad(total)}` : null)

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="block h-px flex-1 bg-rule" aria-hidden />
      {text && (
        <span className="mono text-bone-mute" aria-hidden>
          {text}
        </span>
      )}
      <span className="block h-px flex-1 bg-rule" aria-hidden />
    </div>
  )
}
