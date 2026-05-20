import { readdirSync, statSync, writeFileSync } from "node:fs"
import path from "node:path"

const ROOT = path.join(process.cwd(), "app", "field-notes")
const OUT = path.join(process.cwd(), "lib", "field-note-dates.ts")

function walk(dir, urlPath, out) {
  let entries = []
  try { entries = readdirSync(dir) } catch { return }
  if (entries.includes("page.tsx")) {
    const stat = statSync(path.join(dir, "page.tsx"))
    // mtime → ISO date string (Y-M-D); not the full timestamp because
    // git ops can shuffle mtime around and the customer doesn't care
    // about the second.
    const iso = stat.mtime.toISOString().slice(0, 10)
    out[urlPath] = { datePublished: iso, dateModified: iso }
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

const banner = `/**
 * Per-resource publication / modification dates for the byline +
 * Article JSON-LD on field notes.
 *
 * Generated from fs.stat(page.tsx) mtime at the time of the SEO
 * Critical & High-Priority fixes ship. For v1 we use the same date
 * for both fields — the brief's preferred long-term solution is to
 * hardcode per-page editorial dates as each note is reviewed.
 *
 * To regenerate after a content sweep, re-run:
 *   node scripts/gen-field-note-dates.mjs
 * (the script lives at /tmp during the SEO ship; check it into
 * scripts/ when it earns a permanent home).
 */

export type FieldNoteDates = { datePublished: string; dateModified: string }

export const FIELD_NOTE_DATES: Record<string, FieldNoteDates> = ${JSON.stringify(sorted, null, 2)} as const

/** Fallback when a pathname isn't in the map — keeps the byline
 *  from breaking if a new resource page is added before regen. */
export const FALLBACK_DATE: FieldNoteDates = {
  datePublished: "${new Date().toISOString().slice(0, 10)}",
  dateModified: "${new Date().toISOString().slice(0, 10)}",
}
`

writeFileSync(OUT, banner)
console.log(`Wrote ${Object.keys(sorted).length} entries to ${OUT}`)
