import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Beyond Safari: Conservation Travel | Safari Overland",
  description:
    "Hands-on conservation travel beyond traditional game drives — research stations, citizen science, voluntourism, and tracking expeditions that fund real work.",
  keywords: "conservation travel, voluntourism africa, research safari, citizen science, conservation holidays",
}

export default function BeyondSafariPage() {
  return (
    <GuidePage
      backHref="/resources/conservation"
      backLabel="Back to Conservation"
      heroImage="/images/conservation/traveler/beyond-your-safari.jpg"
      heroAlt="Traveler engaging with conservation work beyond a safari"
      title="Beyond Safari"
      subtitle="When game drives aren't enough — travel that actively contributes to conservation work."
      intro={
        <>
          <p className="mb-3">
            For travelers who want their trip to do something more than stay carbon-neutral on paper, a growing number
            of operators run experiences embedded in real conservation projects. The good ones contribute meaningful
            data or funding; the bad ones are window-dressing.
          </p>
          <p>This guide shows you how to tell them apart and what's available across the region.</p>
        </>
      }
      sections={[
        {
          heading: "Citizen science experiences",
          body: (
            <p>
              Genuine citizen-science trips contribute to a defined research output — a population census, a habitat
              survey, a species behaviour study. Look for trips that name the institution, the lead researcher and the
              data use.
            </p>
          ),
          bullets: [
            "Predator collaring and monitoring (lions, wild dogs, leopards) with research NGOs",
            "Marine megafauna identification — whale sharks, manta rays, turtles",
            "Bird ringing and atlas projects across the migration corridors",
            "Vegetation and habitat plots, often with university partnerships",
          ],
        },
        {
          heading: "Research-station stays",
          bullets: [
            "Save the Elephants (Samburu, Kenya) — guest visits supporting long-term monitoring",
            "African Parks-managed reserves — controlled access to active conservation projects",
            "Rhino tagging and dehorning operations in Namibia and South Africa",
            "Rwandan and Ugandan gorilla research bases (limited access, structured programmes)",
          ],
          callout: {
            title: "What 'voluntourism' really is",
            body:
              "Many short-term volunteer trips primarily serve the volunteer, not the project. Look for placements 4+ weeks long with defined outcomes. If you have less time, donate the equivalent to a vetted NGO instead.",
          },
        },
        {
          heading: "Active expeditions",
          bullets: [
            "Walking safaris led by anti-poaching units (Akashinga in Zimbabwe; Black Mambas in South Africa)",
            "Ranger ride-alongs on multi-day patrols in vetted reserves",
            "Reforestation and rewilding plantings in degraded areas",
            "Community-livelihood projects — beekeeping, sustainable charcoal, predator-proof bomas",
          ],
        },
        {
          heading: "How to tell good from bad",
          bullets: [
            "Named partner organisation with a public website and audited accounts",
            "Clear metrics — what does your trip's revenue or labour produce?",
            "Operators happy to put you in touch with researchers directly",
            "No promises of holding, hugging or hand-feeding wild animals (red flag)",
            "Realistic about access limits — gorilla research isn't a daily walk-up activity",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/conservation/sustainable-tourism", label: "Sustainable Tourism" },
        { href: "/resources/conservation/responsible-practices", label: "Responsible Practices" },
        { href: "/resources/conservation/community-conservation", label: "Community Conservation" },
      ]}
    />
  )
}
