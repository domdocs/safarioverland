import { Eyebrow } from "@/components/editorial/eyebrow"
import { PlannerCallEmbed } from "./planner-call-embed"
import type { CalendlyBookingSource } from "@/lib/analytics/events"

type Props = {
  /** Section heading copy. Defaults to the /plan/sent treatment. */
  heading?: string
  /** Subhead in editorial italic. */
  lede?: string
  className?: string
  /**
   * Provenance label for `calendly-booking-completed`. Required for
   * the canonical /plan and /plan/sent placements; optional everywhere
   * else (the listener no-ops without it).
   */
  source?: CalendlyBookingSource
}

/**
 * Inline section used at the bottom of /plan and /plan/sent. Reads as
 * part of the page flow rather than as a modal popping over the form.
 */
export function PlannerCallInline({
  heading = "Want to talk it through first?",
  lede = "Thirty minutes with a planner. Bring your dates and the trip you're picturing.",
  className,
  source,
}: Props) {
  return (
    <section className={className}>
      <div className="max-w-3xl">
        <Eyebrow withRule>A call with a planner</Eyebrow>
        <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
          {heading}
        </h2>
        <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
          {lede}
        </p>
      </div>
      <div className="mt-10">
        <PlannerCallEmbed height={760} source={source} />
      </div>
    </section>
  )
}
