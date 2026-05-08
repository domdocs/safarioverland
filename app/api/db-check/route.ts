import { getSupabaseServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

/**
 * Connection debugger endpoint — used by /admin (the `DebugSupabase`
 * widget on the dashboard).
 *
 * The previous implementation queried `information_schema.tables` to
 * enumerate the schema. That endpoint is blocked by default in PostgREST,
 * which made the debugger always report "Failed to connect to Supabase"
 * on a perfectly healthy connection.
 *
 * This version pings a known table (`directory_listings`) for a count,
 * which is the actual signal we care about: can the server-side service-
 * role key reach the database. We list known tables as a hardcoded
 * constant — those are the tables our migrations create.
 */

const KNOWN_TABLES = [
  "directory_listings",
  "subscribers",
  "download_events",
  "briefs",
  "articles",
  "app_settings",
  "contact_messages",
] as const

export async function GET() {
  try {
    const supabase = getSupabaseServerClient()

    if (!supabase) {
      return NextResponse.json(
        {
          success: false,
          connectionStatus: "Failed to initialize Supabase client",
          error: "Supabase client not initialized",
        },
        { status: 500 },
      )
    }

    const { count, error } = await supabase
      .from("directory_listings")
      .select("id", { count: "exact", head: true })

    if (error) {
      return NextResponse.json(
        {
          success: false,
          connectionStatus: `Failed to connect: ${error.message}`,
          error: error.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      connectionStatus: `Connected. ${count ?? 0} listings in directory_listings.`,
      knownTables: KNOWN_TABLES,
      directoryListingsCount: count ?? 0,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("/api/db-check error:", err)
    return NextResponse.json(
      {
        success: false,
        connectionStatus: `Error in API route: ${message}`,
        error: message,
      },
      { status: 500 },
    )
  }
}
