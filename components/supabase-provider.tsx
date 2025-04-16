"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase"

// Create a context to hold the Supabase client
const SupabaseContext = createContext<ReturnType<typeof getSupabaseBrowserClient>>(null)

// Hook to use the Supabase client
export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
}

// Provider component to wrap the application
export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => getSupabaseBrowserClient())

  return <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
}
