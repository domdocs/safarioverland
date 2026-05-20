/**
 * Organization + WebSite JSON-LD, mounted once from app/layout.tsx so
 * it renders on every page (admin included — Organization+WebSite is
 * universal). Uses the @graph pattern so the WebSite references the
 * Organization via @id rather than duplicating the publisher block.
 *
 * sameAs is deliberately sparse:
 *   - Instagram handle is `safari_overland` (with underscore) — see
 *     handoff/briefs/2026-05-SEO_CRITICAL_AND_HIGH_PRIORITY.md preamble.
 *   - LinkedIn is omitted until Niels' personal profile URL is
 *     confirmed (founder-led posting, per the social playbook).
 *   - Twitter / X is explicitly out of scope per the playbook.
 */
export function GlobalJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://safarioverland.com/#org",
        name: "Safari Overland",
        alternateName: "Safari Overland Collection",
        url: "https://safarioverland.com",
        logo: "https://safarioverland.com/images/logo/safari-overland-horizontal-600.png",
        description:
          "A small, opinionated collection of African safari lodges and operators, written from Victoria Falls.",
        foundingLocation: {
          "@type": "Place",
          name: "Victoria Falls, Zimbabwe",
        },
        areaServed: [
          "Kenya",
          "Tanzania",
          "Uganda",
          "Rwanda",
          "Botswana",
          "Namibia",
          "Zambia",
          "Zimbabwe",
          "South Africa",
        ],
        knowsAbout: [
          "African safari",
          "Great Migration",
          "Walking safari",
          "Community conservancy",
          "Mobile tented camp",
          "Gorilla trekking",
        ],
        sameAs: ["https://www.instagram.com/safari_overland"],
      },
      {
        "@type": "WebSite",
        "@id": "https://safarioverland.com/#website",
        url: "https://safarioverland.com",
        name: "Safari Overland",
        publisher: { "@id": "https://safarioverland.com/#org" },
        inLanguage: "en",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://safarioverland.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
