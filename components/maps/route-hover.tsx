"use client"

/**
 * Shared hover state between the route cards and the OverviewMap.
 * Without a provider, RouteHoverTarget is a plain wrapper and nothing
 * highlights.
 */

import { createContext, useContext, useState, type ReactNode } from "react"

type HoverState = { slug: string | null; setSlug: (slug: string | null) => void }

const RouteHoverContext = createContext<HoverState | null>(null)

export function RouteHoverProvider({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null)
  return <RouteHoverContext.Provider value={{ slug, setSlug }}>{children}</RouteHoverContext.Provider>
}

export function useRouteHover(): HoverState | null {
  return useContext(RouteHoverContext)
}

export function RouteHoverTarget({ slug, children, className }: { slug: string; children: ReactNode; className?: string }) {
  const ctx = useRouteHover()
  return (
    <div
      className={className}
      onMouseEnter={() => ctx?.setSlug(slug)}
      onMouseLeave={() => ctx?.setSlug(null)}
      onFocus={() => ctx?.setSlug(slug)}
      onBlur={() => ctx?.setSlug(null)}
    >
      {children}
    </div>
  )
}
