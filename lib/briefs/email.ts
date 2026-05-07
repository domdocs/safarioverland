import type { Brief } from "./types"

/**
 * Brief lifecycle emails — match the existing Resend HTTP fetch pattern
 * used by /api/contact and /lib/downloads/email.ts. No SDK dependency.
 *
 * Two transactional emails per submission:
 *   1. brief-received  → to the user, "We'll be in touch within 48h"
 *   2. brief-notify    → to the planner inbox, with summary + admin link
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails"

function fromAddress(): string {
  return process.env.RESEND_FROM_ADDRESS || "onboarding@resend.dev"
}

function plannerInbox(): string | null {
  return process.env.PLANNER_INBOX || process.env.NOTIFICATION_EMAIL || null
}

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://safarioverland.com"
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function listBlock(label: string, value: string | null | undefined): string {
  if (!value) return ""
  return `<tr><td style="padding:8px 0;color:#888;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;width:140px;">${escapeHtml(
    label,
  )}</td><td style="padding:8px 0;color:#222;">${escapeHtml(value)}</td></tr>`
}

async function send(payload: {
  from: string
  to: string
  subject: string
  html: string
  reply_to?: string
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY missing — skipping brief email")
    return { ok: false, error: "missing_api_key" }
  }
  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
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

/**
 * Email 1 — to the user. Confirms the brief was received.
 */
export async function sendBriefReceived(brief: Brief): Promise<{ ok: boolean }> {
  const greeting = brief.contact_name?.split(" ")[0] || "there"
  const summary = `
    <table cellpadding="0" cellspacing="0" border="0" style="width:100%;font-family:system-ui,-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif;">
      ${listBlock("Months", brief.months.join(", ") || null)}
      ${listBlock("Regions", brief.chapters.join(", ") || null)}
      ${listBlock("Rhythm", brief.rhythm)}
      ${listBlock(
        "Length",
        brief.nights !== null && brief.travelers !== null
          ? `${brief.nights} nights · ${brief.travelers} travellers`
          : brief.nights !== null
            ? `${brief.nights} nights`
            : null,
      )}
      ${listBlock("Budget", brief.budget_per_person)}
    </table>
  `

  const html = `
    <div style="font-family:system-ui,-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#222;line-height:1.6;">
      <h2 style="color:#4F6D7A;margin-bottom:8px;font-weight:500;">Your brief is in.</h2>
      <p>Hi ${escapeHtml(greeting)},</p>
      <p>Thanks for sending across your trip brief. Here's what we have:</p>
      ${summary}
      <p style="margin-top:24px;">A planner will be in touch within <strong>48 hours</strong> with three options at different price points. If you remember anything else worth knowing, just reply to this email.</p>
      <hr style="border:none;border-top:1px solid #eee;margin:32px 0;">
      <p style="font-size:12px;color:#999;">Safari Overland · Curated African safari operators, lodges and field notes.</p>
    </div>
  `

  return send({
    from: fromAddress(),
    to: brief.contact_email,
    subject: "Your Safari Overland trip brief — received",
    html,
  })
}

/**
 * Email 2 — to the planner inbox. Contains the full brief and a link to admin.
 */
export async function sendBriefNotify(brief: Brief): Promise<{ ok: boolean }> {
  const inbox = plannerInbox()
  if (!inbox) {
    console.warn("No PLANNER_INBOX/NOTIFICATION_EMAIL set — skipping planner notify")
    return { ok: false }
  }

  const adminLink = `${siteUrl()}/admin/briefs`

  const summary = `
    <table cellpadding="0" cellspacing="0" border="0" style="width:100%;font-family:system-ui,-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif;">
      ${listBlock("From", `${brief.contact_name} <${brief.contact_email}>`)}
      ${listBlock("Phone", brief.contact_phone)}
      ${listBlock("Months", brief.months.join(", ") || null)}
      ${listBlock("Regions", brief.chapters.join(", ") || null)}
      ${listBlock("Rhythm", brief.rhythm)}
      ${listBlock(
        "Length",
        brief.nights !== null && brief.travelers !== null
          ? `${brief.nights} nights · ${brief.travelers} travellers`
          : null,
      )}
      ${listBlock("Budget", brief.budget_per_person)}
    </table>
  `

  const notesBlock = brief.notes
    ? `<div style="margin-top:20px;padding:16px;background:#f5f0e2;border-left:3px solid #d6a24a;">
         <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#888;">Notes</p>
         <p style="margin:0;color:#222;white-space:pre-wrap;">${escapeHtml(brief.notes)}</p>
       </div>`
    : ""

  const html = `
    <div style="font-family:system-ui,-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#222;line-height:1.6;">
      <p style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#d6a24a;margin:0 0 8px 0;">New brief — Trip Builder</p>
      <h2 style="margin:0 0 16px 0;font-weight:500;color:#222;">${escapeHtml(brief.contact_name)}</h2>
      ${summary}
      ${notesBlock}
      <p style="margin-top:24px;">
        <a href="${adminLink}"
           style="display:inline-block;background:#4F6D7A;color:#fff;padding:12px 24px;text-decoration:none;font-weight:500;">
          Open in admin →
        </a>
      </p>
      <p style="font-size:12px;color:#999;margin-top:8px;">${adminLink}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:32px 0;">
      <p style="font-size:12px;color:#999;">Safari Overland · /admin/briefs</p>
    </div>
  `

  return send({
    from: fromAddress(),
    to: inbox,
    subject: `New brief: ${brief.contact_name} · ${
      brief.chapters.join(", ") || "no region"
    }`,
    html,
    reply_to: brief.contact_email,
  })
}
