import { getSupabaseServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = await Promise.resolve(context.params.id)

    // Initialize Supabase client
    const supabase = await getSupabaseServerClient()

    if (!supabase) {
      return NextResponse.json(
        { error: "Database client initialization failed" },
        { status: 500 }
      )
    }

    // Only try to update in Supabase if the ID looks like a valid UUID
    if (!isValidUUID(id)) {
      return NextResponse.json(
        { error: "Invalid listing ID format" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("directory_listings")
      .update({
        status: "approved",
        updated_at: new Date().toISOString()
      })
      .eq("id", id)

    if (error) {
      console.error("Error approving listing:", error)
      return NextResponse.json(
        { error: "Failed to approve listing" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in POST /api/listings/[id]/approve:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 