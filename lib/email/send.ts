import { SITE } from "./brand"

/**
 * Single Resend HTTP send helper. The existing email modules each had
 * their own copy of this — this is the consolidated one.
 *
 * Keep this the only place we POST to Resend's HTTP API so future
 * changes (idempotency key, custom headers, error tracking) land once.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails"

export type SendPayload = {
  from?: string
  to: string | string[]
  subject: string
  html: string
  text?: string
  reply_to?: string
}

export type SendResult = { ok: boolean; error?: string }

export function fromAddress(): string {
  return SITE.fromAddress
}

export async function send(payload: SendPayload): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY missing — skipping send")
    return { ok: false, error: "missing_api_key" }
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: payload.from ?? fromAddress(),
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        ...(payload.text ? { text: payload.text } : {}),
        ...(payload.reply_to ? { reply_to: payload.reply_to } : {}),
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
