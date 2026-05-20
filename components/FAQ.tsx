/**
 * Reusable FAQ section — visible accordion + FAQPage JSON-LD in one.
 *
 * Built per the brief but only smoke-tested on /resources/faqs for
 * this ship. Wider rollout is Brief 3 (page content rewrites) where
 * the actual per-page FAQ questions live.
 */

export type FAQItem = { question: string; answer: string }

type Props = {
  items: FAQItem[]
  heading?: string
}

export function FAQ({ items, heading = "Frequently asked" }: Props) {
  if (!items || items.length === 0) return null

  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  }

  return (
    <section className="my-12">
      <h2 className="font-serif text-h2-fluid mb-6">{heading}</h2>
      <div className="space-y-4">
        {items.map((i, idx) => (
          <details
            key={idx}
            className="border-b border-rule pb-4 group"
          >
            <summary className="cursor-pointer font-medium text-bone list-none flex items-center justify-between">
              <span>{i.question}</span>
              <span
                aria-hidden
                className="ml-4 text-amber text-xl leading-none transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-2 text-bone-mute">{i.answer}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />
    </section>
  )
}
