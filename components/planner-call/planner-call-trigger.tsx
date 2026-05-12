"use client"

import { useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { PlannerCallModal } from "./planner-call-modal"
import { cn } from "@/lib/utils"

type Props = {
  /** Button label. Default: "Speak to a planner →". */
  children?: ReactNode
  variant?: "primary" | "outline" | "ghost"
  size?: "default" | "lg"
  className?: string
}

/**
 * Drop-in button that opens the planner-call modal. Used on the home
 * page, the listing-detail page, and anywhere else a modal CTA is
 * appropriate. /plan and /plan/sent use the inline section instead.
 */
export function PlannerCallTrigger({
  children = "Speak to a planner →",
  variant = "outline",
  size = "lg",
  className,
}: Props) {
  const [open, setOpen] = useState(false)

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
          onClick={() => setOpen(true)}
          className={cn(variantClass, className)}
        >
          {children}
        </button>
        <PlannerCallModal open={open} onClose={() => setOpen(false)} />
      </>
    )
  }

  return (
    <>
      <Button
        type="button"
        size={size}
        onClick={() => setOpen(true)}
        className={cn("rounded-none px-8 py-6 mono", variantClass, className)}
      >
        {children}
      </Button>
      <PlannerCallModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
