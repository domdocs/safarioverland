/**
 * Slugs that collide with static routes under app/field-notes/. A DB
 * article claiming one of these would be silently unreachable — the
 * static route wins first-segment resolution. Keep in sync when any
 * new directory is added under app/field-notes/.
 *
 * Lives in its own file (no supabase imports) so client components
 * can consume it without pulling server-only code into the browser bundle.
 */
export const RESERVED_ARTICLE_SLUGS = [
  "conservation",
  "faqs",
  "planning-guides",
  "safety-tips",
  "seasonal-guides",
] as const
