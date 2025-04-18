import { createClient } from "@supabase/supabase-js"

// Make sure we're using the correct environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing environment variables for Supabase')
}

// Log the URL (but mask most of it for security)
const maskedUrl = supabaseUrl.replace(/^(https?:\/\/)([^.]+)(.*)$/, '$1***$3')
console.log('Initializing Supabase with URL:', maskedUrl)

// Create a single supabase client for interacting with your database
const browserClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'safari-overland-auth',
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Test the connection immediately
browserClient.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', {
    event,
    hasSession: !!session,
    email: session?.user?.email,
    timestamp: new Date().toISOString()
  })
})

// Export a function that ensures the client is working
export async function getSupabaseBrowserClient() {
  try {
    // Test the connection with a simple health check
    const { error } = await browserClient.from('health_check').select('count').limit(1).single()
    if (error && !error.message.includes('does not exist')) {
      // If the error is not about the table not existing, then there's a connection issue
      console.error('Supabase connection error:', error)
      return null
    }
    return browserClient
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error)
    return null
  }
}

// For server-side usage
export function getSupabaseServerClient() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing environment variables for Supabase server client")
    }

    return createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  } catch (error) {
    console.error("Error creating Supabase server client:", error)
    return null
  }
}

// Helper function to check if a user is authenticated
export async function isAuthenticated() {
  try {
    console.log('Checking authentication status...')
    const { data: { session }, error } = await browserClient.auth.getSession()
    if (error) {
      console.error('Authentication check error:', error)
      throw error
    }
    console.log('Session status:', {
      hasSession: !!session,
      email: session?.user?.email,
      timestamp: new Date().toISOString()
    })
    return !!session
  } catch (error) {
    console.error("Error checking authentication:", error)
    return false
  }
}

// Helper function to check if Supabase is available
export async function isSupabaseAvailable() {
  try {
    console.log('Checking Supabase availability...')
    // Try a simple query instead of RPC
    const { data, error } = await browserClient
      .from('directory_listings')
      .select('count')
      .limit(1)
      .single()

    if (error && !error.message.includes('does not exist')) {
      console.error("Supabase availability check failed:", error)
      return false
    }
    console.log('Supabase is available')
    return true
  } catch (error) {
    console.error("Error checking Supabase availability:", error)
    return false
  }
}
