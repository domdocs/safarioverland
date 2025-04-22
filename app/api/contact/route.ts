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
  console.log("Starting email notification process...")
  
  // Check if API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured in environment variables")
    return false
  }
  
  // Get notification email (with fallback)
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@safarioverland.com'
  console.log(`Will send notification to: ${notificationEmail}`)
  
  try {
    console.log("Preparing to send email via Resend API...")
    
    const emailPayload = {
      from: 'onboarding@resend.dev',
      to: notificationEmail,
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
    }
    
    console.log("Email payload prepared:", JSON.stringify({
      to: emailPayload.to,
      subject: emailPayload.subject
    }))
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify(emailPayload)
    })
    
    // Log detailed response information
    const responseText = await response.text()
    console.log(`Resend API response status: ${response.status}`)
    console.log(`Resend API response body: ${responseText}`)
    
    let responseData
    try {
      // Try to parse as JSON if possible
      responseData = JSON.parse(responseText)
    } catch (e) {
      // Not JSON, use text as is
      responseData = responseText
    }
    
    if (!response.ok) {
      throw new Error(`Failed to send email notification: ${JSON.stringify(responseData)}`)
    }
    
    console.log("Email sent successfully:", JSON.stringify(responseData))
    return true
  } catch (error) {
    console.error('Email notification error:', error)
    return false
  }
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
    const emailSent = await sendEmailNotification({ name, email, subject, message })
    
    // Include email status in response for debugging
    return NextResponse.json({ 
      success: true, 
      emailSent 
    })
    
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" }, 
      { status: 500 }
    )
  }
} 