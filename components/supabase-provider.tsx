"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { SupabaseClient } from "@supabase/supabase-js"

// Create a context to hold the Supabase client
const SupabaseContext = createContext<SupabaseClient | undefined>(undefined)

// Hook to use the Supabase client
export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
}

/**
 * Wraps the app in a client-side Supabase context.
 *
 * The provider must always render `children` — including during SSR
 * when `supabase` is undefined. The previous `if (!supabase) return null`
 * gate meant the server render produced null for every descendant, which
 * caused React to bail the entire subtree to client-side rendering
 * (marker: `<template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING">`).
 * That silently stripped page-level JSON-LD, `<h1>`s, and every other
 * SSR'd element from the initial HTML — GlobalJsonLd survived only
 * because it lives outside this provider in the root layout.
 *
 * Nothing in the current codebase actually calls `useSupabase()` —
 * browser Supabase calls use `getSupabaseBrowserClient()` directly —
 * so the context value being undefined during SSR is harmless.
 */
export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    getSupabaseBrowserClient().then((client) => {
      if (!cancelled && client) setSupabase(client)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  )
}
