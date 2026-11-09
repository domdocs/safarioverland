import type { StayView } from "@/lib/relaunch/route-editorial"
import { cn } from "@/lib/utils"

type Props = {
  stay: StayView
  /** Optional photograph above the text: the area, never presented as the lodge. */
  figure?: React.ReactNode
  /** "Primary" card is larger; alternatives are compact. */
  variant?: "primary" | "alternative"
  className?: string
}

function Tag({ children, tone = "rule" }: { children: React.ReactNode; tone?: "rule" | "amber" }) {
  return (
    <span
      className={cn(
        "mono inline-block border px-2 py-0.5 text-[11px] leading-5",
        tone === "amber" ? "border-amber/60 text-amber" : "border-rule text-bone-mute",
      )}
    >
      {children}
    </span>
  )
}

/**
 * Stay card. No lodge photographs are used on route pages (STRATEGY §5:
 * never hotlink or copy third-party images). The route page may pass a
 * `figure` with a photograph of the area, captioned with the place and
 * "Photograph of the lodge to come", or a placeholder block.
 */
export function StayCard({ stay, figure, variant = "primary", className }: Props) {
  const primary = variant === "primary"
  return (
    <article
      className={cn(
        // h-full only on the primary card, where it fills its grid cell.
        // Alternatives stack in a column; h-full there made each one as
        // tall as the whole column, overflowing into the next night.
        "flex flex-col border border-rule bg-ink",
        primary ? "h-full p-6 md:p-8" : "p-5 md:p-6",
        className,
      )}
    >
      {figure && <div className="-mx-6 -mt-6 mb-6 md:-mx-8 md:-mt-8">{figure}</div>}
      <p className="eyebrow">
        {stay.typeLabel} · {stay.country}
      </p>
      <h4
        className={cn(
          "mt-3 font-serif text-bone leading-tight text-balance",
          primary ? "text-h3-fluid" : "text-h4-fluid",
        )}
      >
        {stay.name}
      </h4>
      <p className="mt-2 text-sm text-bone-mute">{stay.area}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Tag>{stay.accessLabel}</Tag>
        {stay.stepUp && <Tag tone="amber">A step up</Tag>}
        {stay.unverified && <Tag>Unverified</Tag>}
      </div>

      {stay.whyWeListIt && (
        <p className={cn("mt-5 text-bone leading-relaxed", primary ? "" : "text-sm")}>
          {stay.whyWeListIt}
        </p>
      )}

      {primary && stay.activities.length > 0 && (
        <div className="mt-5">
          <p className="mono text-bone-mute text-[11px] uppercase tracking-[0.18em]">Guided here</p>
          <ul className="mt-2 space-y-1 text-sm text-bone-mute">
            {stay.activities.map((a) => (
              <li key={a} className="flex gap-2">
                <span aria-hidden className="text-amber">·</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-auto pt-6 mono text-amber">
        {stay.rateLine}
        {stay.hasRate && <span className="text-bone-mute"> · indicative</span>}
      </p>
    </article>
  )
}
