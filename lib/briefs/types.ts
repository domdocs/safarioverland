/**
 * Trip Builder brief — types shared between the form, the API, and the
 * email templates. Keep in lockstep with supabase/migrations/20260507_create_briefs.sql.
 */

export type BriefStatus = "new" | "reviewing" | "sent" | "closed"

export type Brief = {
  id: string
  created_at: string
  updated_at: string
  chapters: string[]
  rhythm: string | null
  months: string[]
  nights: number | null
  travelers: number | null
  budget_per_person: string | null
  notes: string | null
  contact_name: string
  contact_email: string
  contact_phone: string | null
  status: BriefStatus
  assigned_to: string | null
  internal_notes: string | null
  source_url: string | null
  utm: Record<string, string> | null
}

/** Shape submitted from the form (no server-managed fields). */
export type BriefSubmission = {
  chapters: string[]
  rhythm?: string
  months: string[]
  nights?: number
  travelers?: number
  budget_per_person?: string
  notes?: string
  contact_name: string
  contact_email: string
  contact_phone?: string
  source_url?: string
  utm?: Record<string, string>
}

export const STATUS_LABELS: Record<BriefStatus, string> = {
  new: "New",
  reviewing: "Reviewing",
  sent: "Sent",
  closed: "Closed",
}
