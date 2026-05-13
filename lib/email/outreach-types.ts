/**
 * Type for the `listing_outreach` table — kept in lockstep with
 * supabase/migrations/20260514_listing_outreach.sql.
 */

import type { OutreachTemplate } from "./outreach"

export type OutreachStatus =
  | "drafted"
  | "sent"
  | "replied"
  | "no_response"
  | "archived"

export type OutreachSentVia = "mailto" | "resend" | "manual"

export type ListingOutreach = {
  id: string
  listing_id: string
  template: OutreachTemplate
  recipient_email: string
  recipient_name: string | null
  subject: string
  body_html: string
  custom_questions: string | null
  sent_at: string | null
  sent_via: OutreachSentVia | null
  status: OutreachStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export const STATUS_LABELS: Record<OutreachStatus, string> = {
  drafted: "Drafted",
  sent: "Sent",
  replied: "Replied",
  no_response: "No response",
  archived: "Archived",
}

export const TEMPLATE_LABELS: Record<OutreachTemplate, string> = {
  featured: "Featured (Template A)",
  kept: "Kept (Template B)",
  culled: "Culled (Template C)",
}
