import { BriefReceivedEmail } from "@/lib/email/templates/BriefReceivedEmail"
import { BriefNotifyEmail } from "@/lib/email/templates/BriefNotifyEmail"
import { renderEmail } from "@/lib/email/render"
import { fromAddress, send, type SendResult } from "@/lib/email/send"

import type { Brief } from "./types"

/**
 * Brief lifecycle emails. Templates live in lib/email/templates/.
 *
 *   1. brief-received  → to the user, "we'll be in touch within 48h"
 *   2. brief-notify    → to the planner inbox, with summary + admin link
 *
 * Resolution order for the planner inbox stays the same as the pre-
 * React-Email version:
 *   1. PLANNER_INBOX env var
 *   2. app_settings.notification_email
 *   3. NOTIFICATION_EMAIL env var
 */

async function plannerInbox(): Promise<string | null> {
  if (process.env.PLANNER_INBOX) return process.env.PLANNER_INBOX
  try {
    const { getSettings } = await import("@/lib/settings")
    const settings = await getSettings()
    if (settings.notification_email) return settings.notification_email
  } catch {
    /* ignore — fall through to env */
  }
  return process.env.NOTIFICATION_EMAIL || null
}

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://safarioverland.com"
}

export async function sendBriefReceived(brief: Brief): Promise<SendResult> {
  const { html, text } = await renderEmail(
    <BriefReceivedEmail brief={brief} />,
  )
  return send({
    from: fromAddress(),
    to: brief.contact_email,
    subject: "Your Safari Overland trip brief — received",
    html,
    text,
  })
}

export async function sendBriefNotify(brief: Brief): Promise<SendResult> {
  const inbox = await plannerInbox()
  if (!inbox) {
    console.warn("No PLANNER_INBOX/NOTIFICATION_EMAIL set — skipping planner notify")
    return { ok: false, error: "no_inbox" }
  }

  const adminUrl = `${siteUrl()}/admin/briefs`
  const { html, text } = await renderEmail(
    <BriefNotifyEmail brief={brief} adminUrl={adminUrl} />,
  )

  return send({
    from: fromAddress(),
    to: inbox,
    subject: `New brief: ${brief.contact_name}`,
    html,
    text,
    reply_to: brief.contact_email,
  })
}
