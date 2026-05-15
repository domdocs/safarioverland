/**
 * Zod schemas for Trip Designer payloads.
 *
 * Server-side authoritative — the API routes call `parse()` on input
 * bodies before they touch Supabase. Client-side forms also import these
 * for inline validation (zod is already a dependency).
 *
 * Source of truth for max-lengths and array bounds is
 * handoff/briefs/2026-05-TRIP_DESIGNER_PHASE_1_TO_3.md §"Validation rules".
 */

import { z } from "zod"

export const practicalCardSchema = z.object({
  title: z.string().min(1).max(40),
  body: z.string().min(1).max(2000),
})

export const lodgeSchema = z.object({
  name: z.string().max(80).default(""),
  kind: z.string().max(80).default(""),
  room: z.string().max(80).default(""),
  blurb: z.string().max(400).default(""),
  amenities: z.array(z.string().max(32)).max(8).default([]),
})

export const rhythmItemSchema = z.object({
  time: z.string().min(1).max(32),
  title: z.string().min(1).max(80),
  body: z.string().min(1).max(280),
})

/**
 * Create payload — title is the only required field. Everything else is
 * filled in via the edit form (autosave PATCH).
 */
export const createItinerarySchema = z.object({
  title: z.string().min(1).max(80),
  source_brief_id: z.string().uuid().optional(),
})

export type CreateItineraryInput = z.infer<typeof createItinerarySchema>

/**
 * Patch payload — every field optional. The form autosaves on blur, so
 * a single-field update is the common case.
 */
export const updateItinerarySchema = z.object({
  title: z.string().min(1).max(80).optional(),
  cover_title_lines: z.array(z.string().min(1).max(32)).max(4).optional(),
  subtitle: z.string().max(160).nullable().optional(),
  guests: z.array(z.string().min(1).max(60)).min(1).max(6).optional(),
  dates_from: z.string().max(60).nullable().optional(),
  dates_to: z.string().max(60).nullable().optional(),
  dates_year: z.string().max(8).nullable().optional(),
  pace: z.string().max(120).nullable().optional(),
  curator_name: z.string().max(120).nullable().optional(),
  curator_title: z.string().max(120).optional(),
  curator_location: z.string().max(120).optional(),
  prologue: z.array(z.string().min(1).max(1000)).max(5).optional(),
  cover_photo_url: z.string().url().nullable().optional(),
  show_curator_notes: z.boolean().optional(),
  practicals: z.array(practicalCardSchema).max(12).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  // Theme fields — exposed via the Phase 5 picker UI. Schema columns
  // already have CHECK constraints; zod enforces the same set on the
  // wire so a typo in a client payload fails before hitting Postgres.
  palette: z.enum(["savanna", "forest", "coast"]).optional(),
  typography: z.enum(["editorial", "modern", "classic"]).optional(),
  density: z.enum(["spacious", "compact"]).optional(),
  slug: z.string().min(1).max(120).nullable().optional(),
})

export type UpdateItineraryInput = z.infer<typeof updateItinerarySchema>

export const createChapterSchema = z.object({
  place: z.string().min(1).max(60).default("New chapter"),
  country: z.string().max(60).default(""),
})

export type CreateChapterInput = z.infer<typeof createChapterSchema>

export const updateChapterSchema = z.object({
  place: z.string().min(1).max(60).optional(),
  country: z.string().min(1).max(60).optional(),
  coords_lat: z.number().min(-90).max(90).nullable().optional(),
  coords_lon: z.number().min(-180).max(180).nullable().optional(),
  nights: z.number().int().min(1).max(14).optional(),
  dates: z.string().max(60).optional(),
  palette: z.string().max(20).nullable().optional(),
  epigraph: z.string().max(120).optional(),
  intro: z.array(z.string().min(1).max(1000)).max(4).optional(),
  seeing: z.array(z.string().min(1).max(120)).max(6).optional(),
  note: z.string().max(400).nullable().optional(),
  lodge: lodgeSchema.optional(),
  rhythm: z.array(rhythmItemSchema).max(6).optional(),
  photo_hero_url: z.string().url().nullable().optional(),
  photo_lodge_url: z.string().url().nullable().optional(),
})

export type UpdateChapterInput = z.infer<typeof updateChapterSchema>

export const reorderChaptersSchema = z.object({
  order: z.array(z.string().uuid()).min(1),
})

export type ReorderChaptersInput = z.infer<typeof reorderChaptersSchema>

export const updateTransitSchema = z.object({
  mode: z.string().min(1).max(60).optional(),
  duration: z.string().min(1).max(32).optional(),
  distance: z.string().min(1).max(32).optional(),
  crosses: z.string().min(1).max(120).optional(),
  note: z.string().min(1).max(300).optional(),
})

export type UpdateTransitInput = z.infer<typeof updateTransitSchema>
