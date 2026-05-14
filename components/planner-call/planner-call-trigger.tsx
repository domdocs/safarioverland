"use client"

import { useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { PlannerCallModal } from "./planner-call-modal"
import { track } from "@/lib/analytics/track"
import type { SpeakToPlannerSource } from "@/lib/analytics/events"
import { cn } from "@/lib/utils"

type Props = {
  /** Button label. Default: "Speak to a planner →". */
  children?: ReactNode
  variant?: "primary" | "outline" | "ghost"
  size?: "default" | "lg"
  className?: string
  /**
   * Where on the site this trigger lives — drives the `source` param on
   * both `speak-to-planner-click` (opening the modal) and
   * `calendly-booking-completed` (Calendly's postMessage on successful
   * booking).
   */
  source: SpeakToPlannerSource
}

/**
 * Drop-in button that opens the planner-call modal. Used on the home
 * page, the listing-detail page, and anywhere else a modal CTA is
 * appropriate. /plan and /plan/sent use the inline section instead.
 *
 * Fires `speak-to-planner-click` with the supplied `source` on every
 * modal open, then threads `source` through to the modal/embed so the
 * later booking-completed event carries the same provenance.
 */
export function PlannerCallTrigger({
  children = "Speak to a planner →",
  variant = "outline",
  size = "lg",
  className,
  source,
}: Props) {
  const [open, setOpen] = useState(false)

  function handleOpen() {
    track("speak-to-planner-click", { source })
    setOpen(true)
  }

  const variantClass =
    variant === "primary"
      ? "bg-amber text-night hover:bg-amber-deep"
      : variant === "ghost"
        ? "mono text-bone-mute hover:text-amber transition-colors"
        : "border border-rule text-bone hover:border-amber hover:text-amber"

  if (variant === "ghost") {
    return (
      <>
        <button
          type="button"
          onClick={handleOpen}
          className={cn(variantClass, className)}
        >
          {children}
        </button>
        <PlannerCallModal
          open={open}
          source={source}
          onClose={() => setOpen(false)}
        />
      </>
    )
  }

  return (
    <>
      <Button
        type="button"
        size={size}
        onClick={handleOpen}
        className={cn("rounded-none px-8 py-6 mono", variantClass, className)}
      >
        {children}
      </Button>
      <PlannerCallModal
        open={open}
        source={source}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
