import { getSupabaseServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params
    const supabase = await getSupabaseServerClient()

    if (!supabase) {
      return NextResponse.json(
        { error: "Failed to initialize Supabase client" },
        { status: 500 }
      )
    }

    const json = await request.json()
    const { error } = await supabase
      .from("directory_listings")
      .update({
        ...json,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating listing:", error)
      return NextResponse.json(
        { error: "Failed to update listing" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in PUT /api/listings/[id]:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 