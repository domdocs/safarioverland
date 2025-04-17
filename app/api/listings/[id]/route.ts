import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = await Promise.resolve(context.params.id)
    const supabase = await getSupabaseServerClient()

    if (!supabase) {
      return NextResponse.json(
        { error: "Failed to initialize Supabase client" },
        { status: 500 }
      )
    }

    let json
    try {
      json = await request.json()
    } catch (error) {
      console.error("Error parsing request body:", error)
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    // Update the listing
    const { data, error } = await supabase
      .from("directory_listings")
      .update({
        listing_name: json.listing_name,
        category: json.category,
        region: json.region,
        country: json.country,
        location: json.location,
        description: json.description,
        contact_name: json.contact_name,
        contact_email: json.contact_email,
        contact_phone: json.contact_phone,
        website: json.website || null,
        price_info: json.price_info || "",
        image_url: json.image_url || null,
        featured: json.featured,
        status: json.status,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating listing:", error)
      return NextResponse.json(
        { error: "Failed to update listing" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in PUT /api/listings/[id]:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 