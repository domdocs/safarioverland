"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

import { PlannerCallEmbed } from "./planner-call-embed"

type Props = {
  open: boolean
  onClose: () => void
}

/**
 * Modal wrapper around the Calendly embed.
 *
 * - Click backdrop to close.
 * - ESC to close.
 * - Locks body scroll while open.
 * - Focused on the close button on mount so keyboard users can dismiss.
 */
export function PlannerCallModal({ open, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // ESC + scroll lock + initial focus
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeBtnRef.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a 30-minute call with a planner"
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/80 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-night border border-rule shadow-2xl mt-12 mb-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-rule px-6 py-4">
          <p className="eyebrow">A call with a planner — 30 min</p>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-bone-mute hover:text-amber transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-6">
          <PlannerCallEmbed height={680} />
        </div>
      </div>
    </div>
  )
}
