/**
 * Editor / author identities for the byline + Article JSON-LD.
 *
 * Niels van de Meer is the canonical author voice for every published
 * piece — see handoff/BRAND_VOICE.md. Photo and LinkedIn URL are
 * deliberately omitted (per the SEO brief preamble + Dom's
 * confirmation: don't use placeholders, link only confirmed URLs).
 * A follow-up brief should add the headshot and personal LinkedIn
 * once supplied.
 */

export type Editor = {
  id: string
  name: string
  jobTitle: string
  bio: string
  /** Site-relative path. `null` means omit from byline + JSON-LD. */
  photo: string | null
  /** External profile URLs for schema.org Person.sameAs. */
  sameAs: string[]
}

export const niels: Editor = {
  id: "editor-niels",
  name: "Niels van de Meer",
  jobTitle: "Co-founder, Safari Overland",
  bio: "Co-founder of Safari Overland. Writes from Victoria Falls.",
  photo: null,
  sameAs: [],
}

/**
 * Registry — keyed by Editor.id. The `editorId` field exported from
 * each /field-notes/.../page.tsx is looked up here. New editors
 * register by adding to this map. Unknown ids fall back to niels.
 */
export const EDITORS: Record<string, Editor> = {
  [niels.id]: niels,
}

export function getEditorById(id: string | undefined | null): Editor {
  if (!id) return niels
  return EDITORS[id] ?? niels
}
