import { createClient } from "@supabase/supabase-js"

// Global variable to store the browser client instance
let browserClient: ReturnType<typeof createClient> | null = null

// For client-side usage - implements proper singleton pattern
export function getSupabaseBrowserClient() {
  // Only create a new client if one doesn't exist already
  if (typeof window !== "undefined" && !browserClient) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        console.warn("Supabase URL or Anon Key is missing")
        return null
      }

      // Create a single client instance for the browser
      browserClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          storageKey: "safari-overland-auth", // Use a consistent storage key
        },
      })
    } catch (error) {
      console.error("Error initializing Supabase client:", error)
      return null
    }
  }
  return browserClient
}

// For server-side usage
export function getSupabaseServerClient() {
  // Don't store server client as a singleton since it's stateless
  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("Supabase URL or Service Key is missing")
      return null
    }

    // Create client without custom fetch options to avoid abort errors
    return createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  } catch (error) {
    console.error("Error initializing Supabase server client:", error)
    return null
  }
}

// Helper function to check if Supabase is available
export async function isSupabaseAvailable() {
  try {
    const supabase = getSupabaseServerClient()
    if (!supabase) return false

    // Try a simple query with a manual timeout to check if Supabase is responding
    const timeoutPromise = new Promise<boolean>((_, reject) => {
      setTimeout(() => reject(new Error("Supabase availability check timed out")), 5000)
    })

    const queryPromise = supabase
      .from("directory_listings")
      .select("id")
      .limit(1)
      .then(({ data, error }) => {
        if (error) {
          console.error("Supabase availability check failed:", error)
          return false
        }
        return true
      })
      .catch((error) => {
        console.error("Error in Supabase availability check:", error)
        return false
      })

    // Race between the query and the timeout
    return Promise.race([queryPromise, timeoutPromise]) as Promise<boolean>
  } catch (error) {
    console.error("Error checking Supabase availability:", error)
    return false
  }
}
