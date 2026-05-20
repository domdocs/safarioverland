import type { Metadata } from "next"
import HiddenCostsContent from "./hidden-costs-content"

// Server-component wrapper exists so this page can export its own
// metadata. The original page.tsx was a "use client" component which
// is incompatible with `export const metadata` — without this wrapper,
// the page inherited the parent layout's canonical (/field-notes)
// instead of declaring its own (/field-notes/planning-guides/hidden-costs).
//
// All interactive UI lives in hidden-costs-content.tsx (the original
// client component, file-renamed verbatim).

export const metadata: Metadata = {
  title: "Hidden Costs of Safari Travel — What to Budget Beyond the Headline Rate",
  description:
    "Park fees, conservancy levies, light-aircraft transfers, single supplements, tips: the often-overlooked expenses that sit alongside the headline safari rate. A practical guide to what to budget for.",
  alternates: {
    canonical: "https://safarioverland.com/field-notes/planning-guides/hidden-costs",
  },
}

export default function HiddenCostsPage() {
  return <HiddenCostsContent />
}
