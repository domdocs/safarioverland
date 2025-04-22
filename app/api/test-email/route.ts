import { NextRequest, NextResponse } from "next/server"

// Test function to send an email
async function sendTestEmail() {
  console.log("Starting test email process...")
  
  // Check if API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured in environment variables")
    return { success: false, error: "RESEND_API_KEY not configured" }
  }
  
  // Get notification email (with fallback)
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@safarioverland.com'
  console.log(`Will send test email to: ${notificationEmail}`)
  
  try {
    console.log("Preparing to send test email via Resend API...")
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: notificationEmail,
        subject: `Test Email from Safari Overland`,
        html: `
          <h2>This is a test email</h2>
          <p>If you're seeing this, your email configuration is working correctly!</p>
          <p>Resend API Key is properly configured.</p>
          <p>Environment: ${process.env.NODE_ENV || 'not set'}</p>
          <p>Time sent: ${new Date().toISOString()}</p>
        `
      })
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
      return { 
        success: false, 
        error: `Failed to send test email: ${JSON.stringify(responseData)}`,
        status: response.status,
        response: responseData
      }
    }
    
    console.log("Test email sent successfully:", JSON.stringify(responseData))
    return { 
      success: true, 
      message: "Test email sent successfully", 
      response: responseData 
    }
  } catch (error: any) {
    console.error('Test email error:', error)
    return { 
      success: false, 
      error: error.message || "Unknown error occurred"
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    // Send test email
    const result = await sendTestEmail()
    
    if (!result.success) {
      return NextResponse.json(result, { status: 500 })
    }
    
    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Test email route error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" }, 
      { status: 500 }
    )
  }
} 