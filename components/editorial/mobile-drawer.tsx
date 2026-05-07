"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type DrawerLink = {
  href: string
  label: string
  /** When true, renders as the primary CTA (amber filled button). */
  primary?: boolean
}

type MobileDrawerProps = {
  /** Top-level nav items (Categories, Destinations, About, Resources). */
  links: DrawerLink[]
  /** Optional auth shortcuts — Sign in / Register. */
  authLinks?: DrawerLink[]
  /** Footer rail of secondary links — Contact, Submit, etc. */
  secondaryLinks?: DrawerLink[]
  /** Visual label for the trigger button (sr-only). */
  triggerLabel?: string
  className?: string
}

/**
 * Full-screen overlay menu used by EditorialHeader on small viewports.
 *
 * Locks body scroll while open, closes on Escape and on link click.
 * Animations are CSS-only — no transition deps.
 */
export function MobileDrawer({
  links,
  authLinks = [],
  secondaryLinks = [],
  triggerLabel = "Open menu",
  className,
}: MobileDrawerProps) {
  const [open, setOpen] = useState(false)

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-label={triggerLabel}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center justify-center h-9 w-9 text-bone hover:text-amber transition-colors lg:hidden",
          className,
        )}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[100] lg:hidden",
          "transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-night" onClick={() => setOpen(false)} aria-hidden />

        {/* Drawer panel */}
        <div className="relative flex flex-col h-full bg-night text-bone">
          <div className="flex items-center justify-between px-6 py-5 border-b border-rule">
            <span className="eyebrow">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center text-bone hover:text-amber transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="space-y-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block font-serif text-h2-fluid leading-none text-bone hover:text-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {secondaryLinks.length > 0 && (
              <ul className="mt-12 space-y-3 border-t border-rule pt-8">
                {secondaryLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="mono text-bone-mute hover:text-amber transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </nav>

          {authLinks.length > 0 && (
            <div className="border-t border-rule p-6 space-y-3">
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block w-full text-center py-3 mono transition-colors",
                    link.primary
                      ? "bg-amber text-night hover:bg-amber-deep"
                      : "border border-rule text-bone hover:border-amber hover:text-amber",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
