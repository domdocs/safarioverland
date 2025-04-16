import { getSupabaseServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id
    const supabase = await getSupabaseServerClient()

    if (!supabase) {
      return NextResponse.json(
        { error: "Database client initialization failed" },
        { status: 500 }
      )
    }

    const data = await request.json()

    const { error } = await supabase
      .from("directory_listings")
      .update({
        listing_name: data.listing_name,
        category: data.category,
        region: data.region,
        country: data.country,
        location: data.location,
        description: data.description,
        contact_name: data.contact_name,
        contact_email: data.contact_email,
        contact_phone: data.contact_phone,
        website: data.website || null,
        price_info: data.price_info || "",
        image_url: data.image_url || null,
        featured: data.featured,
        status: data.status,
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