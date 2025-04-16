import { getSupabaseServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"
import { z } from "zod"

const listingSchema = z.object({
  listing_name: z.string().min(2).max(100),
  category: z.string(),
  region: z.string().min(1),
  country: z.string(),
  location: z.string(),
  description: z.string().min(10).max(1000),
  contact_name: z.string().min(2).max(100),
  contact_email: z.string().email(),
  contact_phone: z.string().optional(),
  website: z.string().url().optional(),
  price_info: z.string().optional(),
  image_url: z.string().url().optional(),
  featured: z.boolean().optional().default(false),
  status: z.enum(["pending", "approved", "rejected"]).optional().default("pending"),
})

export async function POST(request: Request) {
  try {
    const supabase = await getSupabaseServerClient()

    if (!supabase) {
      console.error("Database client initialization failed")
      return NextResponse.json(
        { error: "Database client initialization failed" },
        { status: 500 }
      )
    }

    const rawData = await request.json()
    console.log("Received data:", rawData)

    // Validate the incoming data
    const validationResult = listingSchema.safeParse(rawData)

    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error.errors)
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()
    const data = {
      ...validationResult.data,
      status: validationResult.data.status || 'pending',
      created_at: now,
      updated_at: now,
      // Ensure optional fields are properly handled
      price_info: validationResult.data.price_info || null,
      website: validationResult.data.website || null,
      contact_phone: validationResult.data.contact_phone || null,
      image_url: validationResult.data.image_url || null,
      featured: validationResult.data.featured || false
    }

    console.log("Attempting to insert data:", data)

    // Insert the new listing into the directory_listings table
    const { data: listing, error } = await supabase
      .from("directory_listings")
      .insert([data])
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { error: "A listing with this name already exists" },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: "Failed to create listing", details: error.message },
        { status: 500 }
      )
    }

    console.log("Successfully created listing:", listing)
    return NextResponse.json({ 
      success: true, 
      message: "Listing submitted successfully and pending review",
      listing 
    })
  } catch (error) {
    console.error("Error in POST /api/listings/submit:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
} 