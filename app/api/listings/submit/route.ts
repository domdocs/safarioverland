import { getSupabaseServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"
import { z } from "zod"

const listingSchema = z.object({
  listing_name: z.string().min(2),
  category: z.string(),
  region: z.string(),
  country: z.string().min(2),
  location: z.string().min(5),
  description: z.string().min(10),
  contact_name: z.string().min(2),
  contact_email: z.string().email(),
  contact_phone: z.string().min(5),
  website: z.string().url().optional().or(z.literal("")),
  price_info: z.string().min(1),
  image_url: z.string().url().optional().or(z.literal("")),
  featured: z.boolean(),
  status: z.enum(["pending", "approved", "rejected"]),
})

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const body = listingSchema.parse(json)

    const supabase = getSupabaseServerClient()

    // Check if a listing with the same name already exists
    const { data: existingListing } = await supabase
      .from("directory_listings")
      .select("id")
      .eq("listing_name", body.listing_name)
      .single()

    if (existingListing) {
      return NextResponse.json(
        { error: "A listing with this name already exists" },
        { status: 400 }
      )
    }

    // Insert the new listing
    const { data, error } = await supabase
      .from("directory_listings")
      .insert([
        {
          ...body,
          status: "pending", // Always set status to pending for new submissions
          featured: false, // Default to not featured
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error inserting listing:", error)
      return NextResponse.json(
        { error: "Failed to create listing" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: "Listing submitted successfully",
      listing: data,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error creating listing:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
} 