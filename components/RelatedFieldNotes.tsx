import Link from "next/link"

import {
  getRelatedFieldNotes,
  type RelatedOpts,
} from "@/lib/content/related"

type Props = {
  /** Topic tag — destination slug, category slug, or canonical topic. */
  topic: string
  /** Heading shown above the list. */
  heading?: string
} & RelatedOpts

/**
 * Surface 3-4 related field notes on a destination, category, or
 * field-note page. Anchor text is the linked page's title — never
 * "Read more" — per the brief's keyword-bearing-anchor rule.
 */
export async function RelatedFieldNotes({
  topic,
  heading = "Adjacent field notes",
  excludeSlug,
  limit = 4,
}: Props) {
  const notes = getRelatedFieldNotes(topic, { excludeSlug, limit })
  if (notes.length === 0) return null
  return (
    <section
      className="my-12 container mx-auto px-4"
      aria-labelledby="related-fn-heading"
    >
      <h2
        id="related-fn-heading"
        className="font-serif text-h3-fluid mb-4 text-bone"
      >
        {heading}
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((n) => (
          <li key={n.slug}>
            <Link
              href={n.url}
              className="block hover:bg-card p-3 -mx-3 rounded transition-colors"
            >
              <div className="font-medium text-bone">{n.title}</div>
              <div className="text-sm text-bone-mute mt-1">{n.excerpt}</div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
