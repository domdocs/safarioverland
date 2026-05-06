import type { Resource } from "./resources"

/**
 * Sends a welcome / fulfilment email via the Resend HTTP API.
 *
 * Reuses the same fetch pattern as the existing /api/contact route to avoid
 * adding a new SDK dependency. RESEND_API_KEY must be set; from-address can
 * be customised via RESEND_FROM_ADDRESS (defaults to onboarding@resend.dev).
 */
export async function sendDownloadEmail(args: {
  to: string
  firstName?: string | null
  resource: Resource
  signedUrl: string | null
  isFirstDownload: boolean
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY missing — skipping download email")
    return { ok: false, error: "missing_api_key" }
  }

  const from = process.env.RESEND_FROM_ADDRESS || "onboarding@resend.dev"
  const greeting = args.firstName ? `Hi ${args.firstName},` : "Hi there,"

  const subject = args.isFirstDownload
    ? `Your ${args.resource.title} — and welcome to Safari Overland`
    : `Your ${args.resource.title}`

  const downloadBlock = args.signedUrl
    ? `<p>You can download your copy here (link expires in 1 hour):</p>
       <p style="margin: 24px 0;">
         <a href="${args.signedUrl}"
            style="display:inline-block;background:#4F6D7A;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:500;">
           Download ${escapeHtml(args.resource.title)}
         </a>
       </p>
       <p style="font-size:13px;color:#666;">If the button doesn't work, paste this link into your browser:<br>
         <span style="word-break:break-all;">${args.signedUrl}</span>
       </p>`
    : `<p>The ${escapeHtml(args.resource.title)} is being finalised — we'll email it to you the moment it's ready. Thanks for your patience.</p>`

  const welcomeBlock = args.isFirstDownload
    ? `<p>You'll occasionally hear from us with new safari planning resources, seasonal tips and operator recommendations. You can unsubscribe any time from the link at the bottom of every email.</p>`
    : ""

  const html = `
    <div style="font-family:system-ui,-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#222;line-height:1.6;">
      <h2 style="color:#4F6D7A;margin-bottom:8px;">${escapeHtml(args.resource.title)}</h2>
      <p style="color:#666;margin-top:0;">${escapeHtml(args.resource.description)}</p>
      <p>${greeting}</p>
      ${downloadBlock}
      ${welcomeBlock}
      <hr style="border:none;border-top:1px solid #eee;margin:32px 0;">
      <p style="font-size:12px;color:#999;">Safari Overland · A directory of African safari operators, lodges and resources.</p>
    </div>
  `

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: args.to,
        subject,
        html,
      }),
    })
    if (!response.ok) {
      const body = await response.text()
      console.error("Resend send failed", response.status, body)
      return { ok: false, error: `resend_${response.status}` }
    }
    return { ok: true }
  } catch (err) {
    console.error("Resend send threw", err)
    return { ok: false, error: "fetch_error" }
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
