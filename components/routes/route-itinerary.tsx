import { CaptionedImage } from "@/components/media/captioned-image"
import type { MediaItem } from "@/lib/relaunch/media-select"
import type { DayView } from "@/lib/relaunch/route-editorial"
import { cn } from "@/lib/utils"

/**
 * "The drive": a vertical, day-by-day itinerary with a rail down the
 * left. Each leg shows drive time, distance and road surface; rest days
 * carry the deck's "No driving" label; optional extensions are dashed
 * and set back so they read as an add-on.
 *
 * Built here rather than reusing components/itinerary/{transit,chapter}:
 * those are styled by the Trip Designer's own print stylesheet and typed
 * to its Chapter/Transit records, not to the route research.
 */
export function RouteItinerary({ days, media = {} }: { days: DayView[]; media?: Record<string, MediaItem> }) {
  return (
    <ol className="relative">
      {days.map((day, i) => {
        const last = i === days.length - 1
        const optional = Boolean(day.optional)
        const photo = media[day.key]
        return (
          <li
            key={day.key}
            data-route-day={day.key}
            className="group/day relative grid scroll-mt-60 grid-cols-[2rem_1fr] gap-x-5 md:scroll-mt-28 md:grid-cols-[2.5rem_1fr] md:gap-x-8"
          >
            {/* Rail */}
            <div className="relative flex justify-center" aria-hidden>
              {!last && (
                <span
                  className={cn(
                    "absolute top-3 bottom-0 w-px",
                    optional ? "border-l border-dashed border-amber/50" : "bg-rule",
                  )}
                />
              )}
              <span
                className={cn(
                  "relative mt-1.5 block h-3 w-3 rounded-full border",
                  optional ? "border-amber bg-night" : "border-amber bg-amber",
                )}
              />
            </div>

            <div className={cn("pb-12 md:pb-14", optional && "md:pl-6")}>
              <div
                className={cn(
                  optional && "border border-dashed border-amber/40 p-5 md:p-6",
                )}
              >
                {photo && (
                  <CaptionedImage
                    item={photo}
                    card
                    aspect="aspect-[4/3] sm:aspect-[16/9]"
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 55vw, 90vw"
                    className="mb-6"
                  />
                )}
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="mono text-amber">{day.label}</span>
                  {day.optional && (
                    <span className="mono text-[11px] uppercase tracking-[0.18em] text-amber border border-amber/60 px-2 py-0.5">
                      {day.optional}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-serif text-h4-fluid text-bone leading-tight text-balance transition-colors group-data-[map-hover]/day:text-amber">
                  {day.from === day.to ? day.to : `${day.from} to ${day.to.replace(/^The /, "the ")}`}
                </h3>

                {day.noDriving ? (
                  <p className="mt-3 mono text-bone-mute">No driving</p>
                ) : (
                  (day.drive || day.distance || day.surface) && (
                    <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-3 border-t border-rule pt-4">
                      {day.drive && (
                        <div>
                          <dt className="mono text-[11px] uppercase tracking-[0.18em] text-bone-mute">Drive</dt>
                          <dd className="mt-1 text-bone">
                            {day.drive}
                            {day.estimate && <span className="text-bone-mute"> (estimate)</span>}
                          </dd>
                        </div>
                      )}
                      {day.distance && (
                        <div>
                          <dt className="mono text-[11px] uppercase tracking-[0.18em] text-bone-mute">Distance</dt>
                          <dd className="mt-1 text-bone">{day.distance}</dd>
                        </div>
                      )}
                      {day.surface && (
                        <div className={cn(!day.distance && "sm:col-span-2")}>
                          <dt className="mono text-[11px] uppercase tracking-[0.18em] text-bone-mute">Road</dt>
                          <dd className="mt-1 text-bone">{day.surface}</dd>
                        </div>
                      )}
                    </dl>
                  )
                )}

                <p className="mt-4 text-bone-mute leading-relaxed max-w-2xl">{day.notes}</p>

                {day.stay && (
                  <p className="mt-4 text-sm text-bone-mute">
                    <span className="mb-1 block mono text-[11px] uppercase tracking-[0.18em]">Stay</span>
                    <span className="text-bone">{day.stay.name}</span>
                    {day.alternatives.length > 0 && (
                      <> or {day.alternatives.map((a) => a.name).join(" or ")}</>
                    )}
                  </p>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
