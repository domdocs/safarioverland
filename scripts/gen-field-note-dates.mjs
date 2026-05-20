/**
 * Regenerate lib/field-note-dates.ts from the file tree.
 *
 * For each app/field-notes/.../page.tsx the script optionally reads
 * a sibling `dates.ts` exporting:
 *   - `export const publishedAt = "YYYY-MM-DD"`
 *   - `export const updatedAt = "YYYY-MM-DD"`
 *   - `export const editorId = "editor-..."`
 *
 * The colocated dates module exists because Next.js's strict page-
 * module typing rejects arbitrary named exports from a route
 * segment. Pulling them one file over keeps the editorial source of
 * truth next to the content without fighting Next's validator.
 *
 * Anything found wins. Anything missing falls back to the page's
 * mtime (publishedAt + updatedAt) or `editor-niels` (editorId).
 *
 * Run after touching editorial dates on any page:
 *
 *   node scripts/gen-field-note-dates.mjs
 *
 * Idempotent: regenerates the entire output file from scratch.
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import path from "node:path"

const ROOT = path.join(process.cwd(), "app", "field-notes")
const OUT = path.join(process.cwd(), "lib", "field-note-dates.ts")

const PUBLISHED_RE =
  /^\s*export\s+const\s+publishedAt\s*=\s*["']([0-9]{4}-[0-9]{2}-[0-9]{2})["']/m
const UPDATED_RE =
  /^\s*export\s+const\s+updatedAt\s*=\s*["']([0-9]{4}-[0-9]{2}-[0-9]{2})["']/m
const EDITOR_RE =
  /^\s*export\s+const\s+editorId\s*=\s*["']([^"']+)["']/m

function extractFromSource(src, mtimeIso) {
  const published = src.match(PUBLISHED_RE)?.[1] ?? mtimeIso
  const updated = src.match(UPDATED_RE)?.[1] ?? mtimeIso
  const editor = src.match(EDITOR_RE)?.[1] ?? "editor-niels"
  return { datePublished: published, dateModified: updated, editorId: editor }
}

function walk(dir, urlPath, out) {
  let entries = []
  try { entries = readdirSync(dir) } catch { return }
  const pageFile = path.join(dir, "page.tsx")
  if (entries.includes("page.tsx")) {
    const stat = statSync(pageFile)
    const mtimeIso = stat.mtime.toISOString().slice(0, 10)
    // Prefer the sibling dates.ts if present; else fall back to
    // scanning page.tsx (older convention — kept for safety).
    let src = ""
    if (entries.includes("dates.ts")) {
      src = readFileSync(path.join(dir, "dates.ts"), "utf8")
    } else {
      src = readFileSync(pageFile, "utf8")
    }
    out[urlPath] = extractFromSource(src, mtimeIso)
  }
  for (const entry of entries) {
    if (entry.startsWith("[") || entry.startsWith("(") || entry.startsWith("_")) continue
    const full = path.join(dir, entry)
    try {
      if (statSync(full).isDirectory()) walk(full, `${urlPath}/${entry}`, out)
    } catch {}
  }
}

const dates = {}
walk(ROOT, "/field-notes", dates)

const sorted = Object.keys(dates).sort().reduce((a, k) => (a[k] = dates[k], a), {})

const today = new Date().toISOString().slice(0, 10)

const banner = `/**
 * Per-field-note publication / modification dates for the byline +
 * Article JSON-LD.
 *
 * Generated from a scan of every app/field-notes/.../page.tsx file.
 * Each entry uses the page's own \`export const publishedAt = "..."\`,
 * \`export const updatedAt = "..."\` and \`export const editorId = "..."\`
 * constants when present; pages without those exports fall back to
 * the file's mtime (dates) or "editor-niels" (editorId).
 *
 * Regenerate after editing any page's date exports:
 *   node scripts/gen-field-note-dates.mjs
 *
 * Long-term: once every note has explicit publishedAt / updatedAt
 * exports, this generated cache can be retired in favour of reading
 * exports directly. Until then it's the data source the client
 * <AutoArticleMeta /> component reads from.
 */

export type FieldNoteDates = {
  datePublished: string
  dateModified: string
  editorId: string
}

export const FIELD_NOTE_DATES: Record<string, FieldNoteDates> = ${JSON.stringify(sorted, null, 2)} as const

/** Fallback when a pathname isn't in the map — e.g. a new note
 *  added between regens. */
export const FALLBACK_DATE: FieldNoteDates = {
  datePublished: "${today}",
  dateModified: "${today}",
  editorId: "editor-niels",
}
`

writeFileSync(OUT, banner)
console.log(`Wrote ${Object.keys(sorted).length} entries to ${OUT}`)
