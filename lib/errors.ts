/**
 * Extract a diagnostic message from any throwable, with special handling
 * for Supabase / PostgREST error objects (which are not Error instances
 * and were previously surfaced as an opaque `"Unknown error"` in admin
 * API responses — see PR #17 v2 brief, fix 1).
 *
 * Returns a stable shape so callers can spread it into a JSON response
 * body: `{ message, ...(code|details|hint if present) }`.
 */

type SupabaseErrorShape = {
  message?: unknown
  code?: unknown
  details?: unknown
  hint?: unknown
}

export function extractSupabaseErrorMessage(err: unknown): {
  message: string
  code?: string
  details?: string
  hint?: string
} {
  if (err instanceof Error) {
    return { message: err.message }
  }
  if (err && typeof err === "object") {
    const e = err as SupabaseErrorShape
    const out: {
      message: string
      code?: string
      details?: string
      hint?: string
    } = {
      message:
        typeof e.message === "string" ? e.message : "Unknown error",
    }
    if (typeof e.code === "string") out.code = e.code
    if (typeof e.details === "string") out.details = e.details
    if (typeof e.hint === "string") out.hint = e.hint
    return out
  }
  return { message: "Unknown error" }
}
