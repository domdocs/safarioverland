import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { ContactAcknowledgementEmail } from "@/lib/email/templates/ContactAcknowledgementEmail"
import { renderEmail } from "@/lib/email/render"
import { fromAddress, send } from "@/lib/email/send"
import { getSettings } from "@/lib/settings"
import { getSupabaseServerClient } from "@/lib/supabase"

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

type ContactPayload = z.infer<typeof contactFormSchema>

async function sendNotification(data: ContactPayload): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured — skipping contact notify")
    return false
  }

  const settings = await getSettings().catch(() => ({
    notification_email: null,
  }))
  const notificationEmail =
    settings.notification_email ||
    process.env.NOTIFICATION_EMAIL ||
    "info@safarioverland.com"

  const { html, text } = await renderEmail(
    <ContactAcknowledgementEmail
      name={data.name}
      email={data.email}
      subject={data.subject}
      message={data.message}
      internal
    />,
  )

  const result = await send({
    from: fromAddress(),
    to: notificationEmail,
    subject: `New Contact Form Submission: ${data.subject}`,
    html,
    text,
    reply_to: data.email,
  })

  return result.ok
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid form data",
          details: result.error.format(),
        },
        { status: 400 },
      )
    }

    const { name, email, subject, message } = result.data

    const supabase = getSupabaseServerClient()
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Database connection error" },
        { status: 500 },
      )
    }

    const { error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        subject,
        message,
        created_at: new Date().toISOString(),
        status: "new",
      },
    ])

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { success: false, error: "Failed to save message" },
        { status: 500 },
      )
    }

    const emailSent = await sendNotification({ name, email, subject, message })

    return NextResponse.json({
      success: true,
      emailSent,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    )
  }
}
