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
 * Build a mailto URL per RFC 6068.
 *
 * Important encoding note: we deliberately *don't* use URLSearchParams
 * here. URLSearchParams produces application/x-www-form-urlencoded
 * output (space → `+`), and most mail clients (Apple Mail, Outlook,
 * Thunderbird) do not decode `+` back to space inside a mailto body —
 * the recipient sees literal `+` signs everywhere. RFC 6068 specifies
 * percent-encoding (space → `%20`), which is what encodeURIComponent
 * produces and what every mail client correctly decodes.
 */
export function buildMailtoUrl({
  to,
  subject,
  body,
  cc,
  bcc,
}: MailtoArgs): string {
  const parts: string[] = [
    `subject=${encodeURIComponent(subject)}`,
    `body=${encodeURIComponent(body)}`,
  ]
  if (cc) parts.push(`cc=${encodeURIComponent(cc)}`)
  if (bcc) parts.push(`bcc=${encodeURIComponent(bcc)}`)
  return `mailto:${encodeURIComponent(to)}?${parts.join("&")}`
}

/**
 * Parse `editor_notes` for a "For operator outreach" block and pull
 * out the clarifying questions. Tolerant of formatting drift — we look
 * for either a `### For operator outreach` heading or a literal
 * "Three clarifying questions" line, then grab bullet/em-dash items
 * underneath, including continuation lines that wrap a single question
 * across multiple source lines.
 *
 * A continuation line is one that is non-empty, doesn't start a new
 * bullet, and doesn't start a new heading. Common in the research
 * records produced by the listing-research skill, e.g.
 *
 *   > — Are walking safaris part of the offer on the concession? They're
 *   >   not prominently surfaced on the experiences page and we want to
 *   >   describe the activity mix accurately.
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
  // Bullet-prefix forms — em-dash, hyphen, asterisk, bullet, numbered.
  // Optional `>` quote prefix in front (one or more times).
  const bulletRe = /^(?:>+\s*)?(?:[-*•—–]|\d+\.)\s+(.+?)\s*$/
  const stripQuoteRe = /^>+\s?/

  let inBlock = false
  let current = ""
  const questions: string[] = []

  function flush() {
    const trimmed = current.replace(/\s+/g, " ").trim()
    if (trimmed.length >= 5) questions.push(trimmed)
    current = ""
  }

  for (const line of lines) {
    if (!inBlock) {
      if (startMarkers.some((re) => re.test(line))) {
        inBlock = true
      }
      continue
    }

    // Stop at the next markdown heading — the block is over.
    if (/^#{1,4}\s+\S/.test(line)) {
      flush()
      break
    }

    const trimmed = line.trim()
    if (!trimmed) {
      // Blank line ends a multi-line question, but doesn't end the
      // block (notes often have spacing between bullets).
      flush()
      continue
    }

    const bullet = trimmed.match(bulletRe)
    if (bullet) {
      // New bullet — flush any in-progress question, start a fresh one.
      flush()
      current = bullet[1].replace(/^["'`]|["'`]$/g, "").trim()
      continue
    }

    // Continuation line — append to whatever we're currently building.
    // Strip leading blockquote `> ` markers so wrapped lines look
    // clean when joined.
    if (current) {
      current += " " + trimmed.replace(stripQuoteRe, "").trim()
    }
  }

  flush()

  // De-dupe while preserving order.
  return [...new Set(questions)]
}
