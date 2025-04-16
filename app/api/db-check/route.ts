import { getSupabaseServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseServerClient()

    if (!supabase) {
      return NextResponse.json(
        {
          error: "Supabase client not initialized",
          success: false,
          connectionStatus: "Failed to initialize Supabase client",
        },
        { status: 500 },
      )
    }

    // Test the connection with a simple query
    const { data: testData, error: testError } = await supabase
      .from("directory_listings")
      .select("count(*)", { count: "exact" })
      .limit(1)

    if (testError) {
      return NextResponse.json(
        {
          error: testError.message,
          success: false,
          connectionStatus: "Failed to connect to Supabase: " + testError.message,
        },
        { status: 500 },
      )
    }

    // Get list of tables
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")

    if (tablesError) {
      return NextResponse.json(
        {
          error: tablesError.message,
          success: false,
          connectionStatus: "Connected but failed to fetch tables: " + tablesError.message,
          tables: [],
        },
        { status: 500 },
      )
    }

    // Get sample data from directory_listings if it exists
    let listingsData = null
    let listingsError = null

    const tableNames = tables.map((t) => t.table_name)

    if (tableNames.includes("directory_listings")) {
      const response = await supabase.from("directory_listings").select("*").limit(5)

      listingsData = response.data
      listingsError = response.error
    }

    return NextResponse.json({
      success: true,
      tables: tableNames,
      connectionStatus: "Connected to Supabase successfully",
      sampleData: listingsData,
      errors: {
        listings: listingsError ? listingsError.message : null,
      },
    })
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
        connectionStatus: "Error in API route: " + (error instanceof Error ? error.message : "Unknown error"),
      },
      { status: 500 },
    )
  }
}
