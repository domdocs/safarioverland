import { cn } from "@/lib/utils"

export type NumberItem = {
  value: string
  label: string
  note?: string
}

/**
 * Large Cormorant numerals over mono labels. Values are facts, so they
 * are shown as they are: no counting-up animation.
 */
export function NumbersStrip({ items, className }: { items: NumberItem[]; className?: string }) {
  if (items.length === 0) return null
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-8 gap-y-10 border-y border-rule py-10 md:py-12",
        items.length >= 5 ? "lg:grid-cols-5" : items.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3",
        className,
      )}
    >
      {items.map((it) => (
        <div key={it.label} className="flex flex-col-reverse">
          <dt className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-mute">
            {it.label}
            {it.note && <span className="block mt-1 normal-case tracking-normal text-bone-mute/70">{it.note}</span>}
          </dt>
          <dd className="font-serif text-h2-fluid leading-none text-bone tabular-nums">{it.value}</dd>
        </div>
      ))}
    </dl>
  )
}
