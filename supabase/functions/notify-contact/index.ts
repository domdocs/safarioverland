// Follow this setup guide to integrate the Deno runtime:
// https://deno.com/manual/getting_started/setup_your_environment

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// Replace with your email service provider details
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || ""
const FROM_EMAIL = "onboarding@resend.dev"
const TO_EMAIL = "info@safarioverland.com" // Change this to your email address

// Function to send email using Resend API
async function sendEmail(name: string, email: string, subject: string, message: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Message from ${name}</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 15px; border-left: 4px solid #ddd; margin: 10px 0;">
          ${message.replace(/\n/g, '<br />')}
        </div>
        <p>
          <a href="${Deno.env.get("SUPABASE_URL")}/auth/v1/admin/contact_messages" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 10px;">
            View in Dashboard
          </a>
        </p>
      `
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Failed to send email: ${JSON.stringify(error)}`)
  }

  return await response.json()
}

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    )

    // Only support POST requests
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { 
        status: 405,
        headers: { "Content-Type": "application/json" }
      })
    }

    // Get contact message details from request body
    const { record } = await req.json()

    if (!record || !record.id) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      })
    }

    // Fetch the complete contact message details
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .eq("id", record.id)
      .single()

    if (error || !data) {
      return new Response(JSON.stringify({ error: "Message not found" }), { 
        status: 404,
        headers: { "Content-Type": "application/json" }
      })
    }

    // Send email notification
    const emailResult = await sendEmail(
      data.name,
      data.email,
      data.subject,
      data.message
    )

    // Update the message to mark as notified
    await supabase
      .from("contact_messages")
      .update({ status: "notified" })
      .eq("id", record.id)

    return new Response(
      JSON.stringify({ success: true, emailResult }),
      { headers: { "Content-Type": "application/json" } }
    )

  } catch (error) {
    console.error("Error sending notification:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}) 