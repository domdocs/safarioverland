import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { Eyebrow } from "./eyebrow"

type Props = {
  /**
   * Display label, woven into the prose. e.g. "lodge", "guided tour".
   * Use lower case + singular; the component does the rest.
   */
  noun?: string
}

/**
 * Soft empty state shown on a `/categories/[slug]` page that has no
 * approved listings yet.
 *
 * Editorial copy comes from
 * handoff/briefs/2026-05-CATEGORIES_HIDE_EMPTY.md. The CTA points at
 * the planning service rather than 404-ing, so inbound links + bookmarks
 * still land somewhere useful.
 */
export function CategoryEmptyState({ noun = "category" }: Props) {
  return (
    <div
      className="border border-rule p-12"
      data-testid="category-empty-state"
    >
      <Eyebrow withRule>The kept list grows by hand</Eyebrow>
      <p
        className="mt-6 font-serif italic text-h3-fluid text-bone leading-snug text-balance max-w-2xl"
        data-testid="category-empty-state-headline"
      >
        No properties on the kept list here yet.
      </p>
      <p className="mt-6 text-bone-mute leading-relaxed max-w-2xl">
        The collection grows by hand. When we feature a {noun} property,
        it&apos;ll appear here first.
      </p>
      <div className="mt-10">
        <StartBriefLink
          source="category-empty-state"
          className="inline-flex items-center gap-2 mono text-amber hover:text-amber-deep transition-colors"
          data-testid="category-empty-state-cta"
        >
          Send a brief →
        </StartBriefLink>
      </div>
    </div>
  )
}
