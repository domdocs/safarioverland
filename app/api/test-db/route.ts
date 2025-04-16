import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = getSupabaseServerClient()
    
    if (!supabase) {
      console.error("Failed to initialize Supabase client")
      return NextResponse.json(
        { error: "Database connection failed - client initialization failed" },
        { status: 500 }
      )
    }

    // Try a simple query
    const { data, error } = await supabase
      .from("directory_listings")
      .select("id")
      .limit(1)

    if (error) {
      console.error("Database query failed:", error)
      return NextResponse.json(
        { error: "Database query failed", details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      data
    })
  } catch (error) {
    console.error("Test endpoint error:", error)
    return NextResponse.json(
      { error: "Database connection test failed" },
      { status: 500 }
    )
  }
} 