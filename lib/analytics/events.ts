// ============================================================================
// lib/analytics/events.ts
//
// Vercel Web Analytics — event taxonomy.
//
// Single source of truth for the seven custom events we capture across the
// public site. Strings used in `track()` calls must be one of EVENT_NAMES;
// parameter shapes are typed against the union below so the dashboard
// columns stay consistent and the typechecker catches drift.
//
// Editorial principle: no PII, no cookies. Listing ids/names are
// non-personal; everything else here is a categorical slice (source,
// pace, budget tier, etc.) used for funnel reasoning, never identity.
// ============================================================================

// ── Source unions ──────────────────────────────────────────────────────────
//
// `source` is the parameter we lean on hardest — it tells us which CTA
// placement on the site is actually doing the conversion work. Keep
// these unions tight; only add a value when the matching placement is
// instrumented in the wild.

/** Every public placement of the "Start a brief" CTA. */
export type StartBriefSource =
  | "header"               // EditorialHeader amber button (every public page)
  | "hero"                 // Home page hero block
  | "home-plan-card"       // Home page "A safari, drawn by hand" card
  | "field-notes"          // /resources listing + inline links inside Field Notes
  | "category-empty-state" // CategoryEmptyState component
  | "categories-empty"     // /categories root with no categories yet
  | "faq"                  // /resources/faqs bottom CTA
  | "404"                  // /404 (not-found) page
  | "plan-sent"            // /plan/sent missing-handoff path
  | "mobile-drawer"        // MobileDrawer "Register" CTA — close-cousin entry point

/** Every public placement of the "Speak to a planner" modal trigger. */
export type SpeakToPlannerSource =
  | "home"           // Home page plan-card
  | "plan"           // /plan inline section
  | "plan-sent"     // /plan/sent inline section
  | "listing-detail" // /listings/[id] desktop CTA
  | "field-notes"    // any Field Notes article

/** The Calendly booking-completed event re-uses the same set. */
export type CalendlyBookingSource = SpeakToPlannerSource

/** Newsletter signup placements. */
export type NewsletterSource =
  | "faq"           // /resources/faqs newsletter block
  | "field-notes"   // /resources newsletter block
  | "footer"        // EditorialFooter (if wired)
  | "home"          // Home page (if wired)

// ── Parameter shapes ───────────────────────────────────────────────────────

export type StartBriefClickProps = { source: StartBriefSource }

export type AddToBriefClickProps = {
  listing_id: string
  /** Human-readable name — useful at-a-glance in the dashboard. NOT PII. */
  listing_name: string
  category: string
  /** Country or region label — Southern Africa / East Africa / etc. */
  region: string
}

export type SpeakToPlannerClickProps = { source: SpeakToPlannerSource }

export type BriefSubmittedProps = {
  pace: "slow" | "mixed" | "active" | null
  budget_tier: "budget" | "mid" | "luxury" | "exclusive" | null
  /** The raw `duration` answer (e.g. "8-10 nights"). Optional. */
  duration: string | null
  /** Did this brief come from the listing-detail Add-to-a-brief path? */
  has_source_listing: boolean
}

export type NewsletterSignupProps = { source: NewsletterSource }

export type FieldNoteReadCompleteProps = {
  /** Article slug, e.g. "east-vs-southern". */
  slug: string
  /** Field Notes category bucket: planning / seasonal / conservation / safety. */
  category: string
}

export type CalendlyBookingCompletedProps = { source: CalendlyBookingSource }

// ── Event name → params map ────────────────────────────────────────────────
//
// Used by `track()` in lib/analytics/track.ts to enforce the right
// parameter shape per event name at the typechecker.

export type EventMap = {
  "start-brief-click": StartBriefClickProps
  "add-to-brief-click": AddToBriefClickProps
  "speak-to-planner-click": SpeakToPlannerClickProps
  "brief-submitted": BriefSubmittedProps
  "newsletter-signup": NewsletterSignupProps
  "field-note-read-complete": FieldNoteReadCompleteProps
  "calendly-booking-completed": CalendlyBookingCompletedProps
}

export type EventName = keyof EventMap

/**
 * Documented list of event names — handy for tests and the
 * handoff/ANALYTICS.md taxonomy. Kept in sync with EventMap.
 */
export const EVENT_NAMES: readonly EventName[] = [
  "start-brief-click",
  "add-to-brief-click",
  "speak-to-planner-click",
  "brief-submitted",
  "newsletter-signup",
  "field-note-read-complete",
  "calendly-booking-completed",
] as const
