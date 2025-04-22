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

// Function to send email notification
async function sendEmailNotification(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  // Option 1: Use a third-party email service like Resend.com
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'contact@safarioverland.com',
          to: process.env.NOTIFICATION_EMAIL || 'info@safarioverland.com', // Update this to your email
          subject: `New Contact Form Submission: ${data.subject}`,
          html: `
            <h2>New Contact Message from ${data.name}</h2>
            <p><strong>From:</strong> ${data.name} (${data.email})</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="padding: 15px; border-left: 4px solid #ddd; margin: 10px 0;">
              ${data.message.replace(/\n/g, '<br />')}
            </div>
          `
        })
      })
      
      if (!response.ok) {
        throw new Error(`Failed to send email notification: ${response.statusText}`)
      }
      
      return true
    } catch (error) {
      console.error('Email notification error:', error)
      return false
    }
  }
  
  // Option 2: For development, just log it
  console.log('Contact form submission (would send email):', data)
  return true
}

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

    // Send email notification
    await sendEmailNotification({ name, email, subject, message })

    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" }, 
      { status: 500 }
    )
  }
} 