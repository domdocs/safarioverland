import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getSupabaseServerClient } from "@/lib/supabase"

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json()
    const result = contactFormSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid form data", 
          details: result.error.format() 
        }, 
        { status: 400 }
      )
    }

    const { name, email, subject, message } = result.data

    // Get Supabase client
    const supabase = getSupabaseServerClient()
    
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Database connection error" }, 
        { status: 500 }
      )
    }

    // Insert message into contact_messages table
    const { error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name,
          email,
          subject,
          message,
          created_at: new Date().toISOString(),
          status: "new"
        }
      ])

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { success: false, error: "Failed to save message" }, 
        { status: 500 }
      )
    }

    // Send notification email to admin (could be implemented with a third-party email service)
    // This is left as a TODO since it requires additional setup

    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" }, 
      { status: 500 }
    )
  }
} 