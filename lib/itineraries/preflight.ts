/**
 * Pre-flight validation for publishing an itinerary.
 *
 * Returns an array of human-readable issues. Empty array means the
 * itinerary is publish-ready. Each issue has a `path` (a section/field
 * pointer the editor UI can surface inline) and a `message` (what to
 * tell the curator).
 *
 * Rules are pragmatic — they match the brief's "ready to send" bar:
 * the customer must see a coherent document, not a half-filled one.
 * We don't reject for nice-to-haves (coords, palette) but we DO
 * reject anything that would render visibly as "TBD" or empty space.
 */

import type { Chapter, Itinerary, Transit } from "./types"

export type PreflightIssue = {
  path: string
  message: string
}

export type PreflightInput = {
  itinerary: Itinerary
  chapters: Chapter[]
  transits: Transit[]
}

export function preflightItinerary(input: PreflightInput): PreflightIssue[] {
  const { itinerary, chapters, transits } = input
  const issues: PreflightIssue[] = []

  // ── Trip metadata ─────────────────────────────────────────────────
  if (!itinerary.cover_title_lines || itinerary.cover_title_lines.length === 0) {
    issues.push({
      path: "itinerary.cover_title_lines",
      message: "Add at least one cover title line",
    })
  }
  if (!itinerary.subtitle || itinerary.subtitle.trim().length === 0) {
    issues.push({
      path: "itinerary.subtitle",
      message: "Subtitle is empty",
    })
  }
  if (!itinerary.guests || itinerary.guests.length === 0) {
    issues.push({
      path: "itinerary.guests",
      message: "Add at least one guest",
    })
  }
  if (!itinerary.dates_from || !itinerary.dates_to || !itinerary.dates_year) {
    issues.push({
      path: "itinerary.dates",
      message: "Travelling dates are incomplete",
    })
  }
  if (!itinerary.pace || itinerary.pace.trim().length === 0) {
    issues.push({
      path: "itinerary.pace",
      message: "Pace sentence is empty",
    })
  }
  if (!itinerary.curator_name || itinerary.curator_name.trim().length === 0) {
    issues.push({
      path: "itinerary.curator_name",
      message: "Curator name is empty",
    })
  }
  if (!itinerary.prologue || itinerary.prologue.length === 0) {
    issues.push({
      path: "itinerary.prologue",
      message: "Add at least one prologue paragraph",
    })
  }
  if (!itinerary.cover_photo_url) {
    issues.push({
      path: "itinerary.cover_photo_url",
      message: "Upload a cover photo",
    })
  }

  // ── Chapters ──────────────────────────────────────────────────────
  if (chapters.length === 0) {
    issues.push({
      path: "chapters",
      message: "Add at least one chapter",
    })
  }
  for (const chapter of chapters) {
    const prefix = `chapter[${chapter.position}]`
    if (!chapter.place) issues.push({ path: `${prefix}.place`, message: `Chapter ${chapter.position + 1}: place is empty` })
    if (!chapter.country) issues.push({ path: `${prefix}.country`, message: `Chapter ${chapter.position + 1}: country is empty` })
    if (chapter.coords_lat === null || chapter.coords_lon === null) {
      issues.push({
        path: `${prefix}.coords`,
        message: `Chapter ${chapter.position + 1} (${chapter.place || "?"}): coordinates missing — needed for the overview & transit maps`,
      })
    }
    if (!chapter.dates) {
      issues.push({
        path: `${prefix}.dates`,
        message: `Chapter ${chapter.position + 1} (${chapter.place || "?"}): dates are empty`,
      })
    }
    if (!chapter.epigraph) {
      issues.push({
        path: `${prefix}.epigraph`,
        message: `Chapter ${chapter.position + 1} (${chapter.place || "?"}): epigraph is empty`,
      })
    }
    if (chapter.intro.length === 0) {
      issues.push({
        path: `${prefix}.intro`,
        message: `Chapter ${chapter.position + 1} (${chapter.place || "?"}): add at least one intro paragraph`,
      })
    }
    if (!chapter.photo_hero_url) {
      issues.push({
        path: `${prefix}.photo_hero_url`,
        message: `Chapter ${chapter.position + 1} (${chapter.place || "?"}): upload a hero photo`,
      })
    }
    // Lodge is optional structurally but if any field is filled, name must be present
    const lodge = chapter.lodge
    if (lodge && (lodge.kind || lodge.room || lodge.blurb || lodge.amenities.length > 0) && !lodge.name) {
      issues.push({
        path: `${prefix}.lodge.name`,
        message: `Chapter ${chapter.position + 1}: lodge details added but lodge name is empty`,
      })
    }
  }

  // ── Transits ──────────────────────────────────────────────────────
  if (transits.length !== Math.max(0, chapters.length - 1)) {
    issues.push({
      path: "transits",
      message: `Transit chain is out of sync (${transits.length} transits for ${chapters.length} chapters)`,
    })
  }
  for (const transit of transits) {
    const prefix = `transit[${transit.position}]`
    if (isPlaceholder(transit.mode))
      issues.push({ path: `${prefix}.mode`, message: `Transit ${transit.position + 1}: mode is still "${transit.mode}"` })
    if (isPlaceholder(transit.duration))
      issues.push({ path: `${prefix}.duration`, message: `Transit ${transit.position + 1}: duration is still "${transit.duration}"` })
    if (isPlaceholder(transit.distance))
      issues.push({ path: `${prefix}.distance`, message: `Transit ${transit.position + 1}: distance is still "${transit.distance}"` })
    if (isPlaceholder(transit.crosses))
      issues.push({ path: `${prefix}.crosses`, message: `Transit ${transit.position + 1}: crosses is still "${transit.crosses}"` })
    if (!transit.note || transit.note === "To be specified.")
      issues.push({ path: `${prefix}.note`, message: `Transit ${transit.position + 1}: note is still the placeholder` })
  }

  return issues
}

/** Recognises the placeholder strings inserted by createChapter()
 *  when a new transit is auto-generated. */
function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true
  const trimmed = value.trim()
  return trimmed === "" || trimmed === "TBD" || trimmed === "Transfer"
}
