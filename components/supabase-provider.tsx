"use client"

import { createContext, useContext, useState, useEffect } from "react"
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

// Provider component to wrap the application
export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => getSupabaseBrowserClient())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // or a loading spinner
  }

  return <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
}
