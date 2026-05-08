import { CURRENT_CONDITIONS, getStatusMeta } from "@/lib/conditions"
import { cn } from "@/lib/utils"
import { Eyebrow } from "./eyebrow"

const TONE_CLASSES: Record<string, string> = {
  moss: "border-moss/40 text-moss",
  amber: "border-amber/40 text-amber",
  flame: "border-flame/40 text-flame",
}

/**
 * Live "in-season right now" strip for the home page. Reads from
 * lib/conditions.ts (hard-coded for now — Phase 3 placeholder).
 *
 * Server Component. Renders a horizontal scroller of region chips,
 * each with an amber/moss/flame status tag and a one-line note.
 */
export function InSeasonStrip() {
  if (CURRENT_CONDITIONS.length === 0) return null

  return (
    <section
      aria-labelledby="in-season-heading"
      className="border-y border-rule bg-ink"
    >
      <div className="container py-6 md:py-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
          <Eyebrow as="p">
            <span id="in-season-heading">In season — right now</span>
          </Eyebrow>
          <p className="mono text-bone-mute">What the wild is doing this week</p>
        </div>
        <ul className="-mx-1 flex gap-4 overflow-x-auto scrollbar-none pb-2">
          {CURRENT_CONDITIONS.map((c) => {
            const meta = getStatusMeta(c.status)
            return (
              <li
                key={c.label}
                className="shrink-0 w-72 border border-rule bg-night p-5 transition-colors hover:border-amber"
              >
                <span
                  className={cn(
                    "inline-flex items-center gap-2 mono px-2 py-1 border",
                    TONE_CLASSES[meta.tone] ?? "border-rule text-bone-mute",
                  )}
                >
                  <span className="block h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                  {meta.label}
                </span>
                <h3 className="mt-4 font-serif text-xl text-bone leading-tight">
                  {c.label}
                </h3>
                <p className="mt-1 mono text-bone-mute">{c.context}</p>
                <p className="mt-3 text-sm text-bone-mute leading-relaxed">{c.note}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
