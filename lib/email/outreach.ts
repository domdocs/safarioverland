/**
 * Helpers for the operator-outreach flow:
 *
 *   outreachSubject  — canonical subject line per template
 *   buildMailtoUrl   — properly-encoded mailto: that opens the user's
 *                      default mail client with subject + body filled
 *
 * The render + DB-insert flow lives in app/api/admin/listings/[id]/outreach/.
 * This module is pure functions — testable without a DB or HTTP.
 */

export type OutreachTemplate = "featured" | "kept" | "culled"

export function outreachSubject(
  template: OutreachTemplate,
  lodgeName: string,
): string {
  switch (template) {
    case "featured":
      return `A short note from Safari Overland — ${lodgeName} feature`
    case "kept":
      return "A short update from Safari Overland"
    case "culled":
      return "A note from Safari Overland"
  }
}

type MailtoArgs = {
  to: string
  subject: string
  /** Plain text. mailto: doesn't render HTML. */
  body: string
  cc?: string
  bcc?: string
}

/**
 * Build a mailto URL with the standard query params. Subject + body are
 * percent-encoded via URLSearchParams (which uses application/x-www-form-
 * urlencoded — i.e. spaces become `+`). Mail clients accept this just
 * fine; the alternative (RFC 6068 strict encoding) is more conservative
 * but several macOS clients balk at it.
 */
export function buildMailtoUrl({
  to,
  subject,
  body,
  cc,
  bcc,
}: MailtoArgs): string {
  const params = new URLSearchParams()
  params.set("subject", subject)
  params.set("body", body)
  if (cc) params.set("cc", cc)
  if (bcc) params.set("bcc", bcc)
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`
}

/**
 * Parse `editor_notes` for a "For operator outreach" block and pull
 * out the clarifying questions. Tolerant of formatting drift — we look
 * for either a `### For operator outreach` heading or a literal
 * "Three clarifying questions" line, then grab bullet/em-dash items
 * underneath until the next heading or blank-line break.
 *
 * Returns an empty array if nothing matches.
 */
export function extractClarifyingQuestions(
  editorNotes: string | null | undefined,
): string[] {
  if (!editorNotes) return []

  const lines = editorNotes.split(/\r?\n/)
  const startMarkers = [
    /^#{1,4}\s*for operator outreach/i,
    /clarifying questions/i,
  ]

  let inBlock = false
  const questions: string[] = []

  for (const line of lines) {
    if (!inBlock) {
      if (startMarkers.some((re) => re.test(line))) {
        inBlock = true
      }
      continue
    }

    // Stop at the next section header.
    if (/^#{1,4}\s+\S/.test(line)) break

    const trimmed = line.trim()
    if (!trimmed) {
      // Don't break on a single blank — many notes have spacing — only
      // break if we've already collected at least one question and hit
      // a second consecutive blank.
      continue
    }

    const bullet = trimmed.match(
      /^(?:[-*•—–]|>\s*[-—–]|\d+\.)\s*(.+?)\s*$/,
    )
    if (bullet) {
      const q = bullet[1].replace(/^["'`]|["'`]$/g, "").trim()
      if (q.length >= 5) questions.push(q)
    }
  }

  // De-dupe while preserving order.
  return [...new Set(questions)]
}
