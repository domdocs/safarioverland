/**
 * Trip Builder brief — types shared between the form, the API, the
 * results page, and the admin views. Keep in lockstep with the briefs
 * table schema (migrations 20260507 + 20260513).
 */

export type BriefStatus = "new" | "reviewing" | "sent" | "closed"

export type Brief = {
  id: string
  created_at: string
  updated_at: string

  // Legacy fields (kept for back-compat with pre-Phase-2 rows)
  chapters: string[]
  rhythm: string | null
  months: string[]
  nights: number | null
  travelers: number | null
  budget_per_person: string | null
  notes: string | null

  // Phase 2 structured intake
  intent: string[] | null
  pace: "slow" | "mixed" | "active" | null
  quiet_markers: string[] | null
  wildlife_priorities: string[] | null
  duration: string | null
  season_preference: string | null
  budget_tier: "budget" | "mid" | "luxury" | "exclusive" | "discuss" | null
  source_listing_id: string | null

  contact_name: string
  contact_email: string
  contact_phone: string | null
  status: BriefStatus
  assigned_to: string | null
  internal_notes: string | null
  source_url: string | null
  utm: Record<string, string> | null
}

/** Shape submitted from the eight-question intake. */
export type BriefSubmission = {
  // Step 01
  months: string[]
  // Step 02 (up to 3)
  intent: string[]
  // Step 03
  pace?: "slow" | "mixed" | "active"
  // Step 04 (optional)
  quiet_markers: string[]
  // Step 05
  wildlife_priorities: string[]
  // Step 06
  duration?: string
  // Step 07
  season_preference?: string
  // Step 08
  budget_tier?: "budget" | "mid" | "luxury" | "exclusive" | "discuss"

  // Free text addendum
  notes?: string

  // Contact
  contact_name: string
  contact_email: string
  contact_phone?: string

  // Optional listing context — set when the user arrives from a
  // /listings/[id] "Add to a brief" CTA. (Phase 2 Pass 2 surfaces this
  // in the intake; the API already accepts it.)
  source_listing_id?: string

  // Attribution
  source_url?: string
  utm?: Record<string, string>
}

export const STATUS_LABELS: Record<BriefStatus, string> = {
  new: "New",
  reviewing: "Reviewing",
  sent: "Sent",
  closed: "Closed",
}
