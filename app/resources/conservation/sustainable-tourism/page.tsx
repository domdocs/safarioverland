import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Sustainable Tourism in Safari Travel | Safari Overland",
  description:
    "What sustainable tourism actually means in the African safari context — economic, environmental and social pillars, certifications and how travelers fit in.",
  keywords:
    "sustainable tourism africa, ecotourism, responsible travel, regenerative tourism, sustainable safari, low impact safari",
}

export default function SustainableTourismPage() {
  return (
    <GuidePage
      backHref="/resources/conservation"
      backLabel="Back to Conservation"
      title="Sustainable Tourism"
      subtitle="The model — and the gaps between the model and the day-to-day reality."
      intro={
        <>
          <p className="mb-3">
            Sustainable tourism is often used interchangeably with eco-tourism, responsible tourism, regenerative
            tourism — terms that mean different things to different practitioners. The substance behind the words is a
            three-pillar model: trips that are economically beneficial to host communities, environmentally low-impact,
            and culturally respectful, simultaneously and verifiably.
          </p>
          <p>This guide explains what to expect, what to ask for, and where the model still falls short.</p>
        </>
      }
      sections={[
        {
          heading: "The three pillars in practice",
          body: (
            <p>
              A genuinely sustainable safari experience can show evidence on all three pillars. If only one or two
              hold up, you have a partial — but not complete — operation.
            </p>
          ),
          bullets: [
            "Economic — local employment, local procurement, transparent benefit-sharing, fair wages",
            "Environmental — energy and water management, low-impact infrastructure, waste reduction, climate accountability",
            "Social — cultural respect, community decision-making, support for local institutions like schools and clinics",
          ],
        },
        {
          heading: "What economic sustainability looks like",
          bullets: [
            "70%+ of staff drawn from neighbouring communities, including senior roles",
            "Local procurement of food and supplies, not flown in from Europe or South Africa",
            "Public benefit-sharing data: $X per bednight to the conservancy fund",
            "Career development and succession plans — not just entry-level service jobs",
            "Crisis-time commitments: many top operators kept paying staff through COVID closures",
          ],
        },
        {
          heading: "What environmental sustainability looks like",
          bullets: [
            "Solar primary, generator backup — not the other way around",
            "Greywater recycling for landscaping; rainwater harvesting where viable",
            "No single-use plastics in guest-facing areas",
            "Locally-built tented infrastructure, low-footprint, reversible",
            "Carbon accounting for camp + flights, with offsetting via accredited African projects",
            "Fire and vegetation management within scientific guidelines, not aesthetic preferences",
          ],
          callout: {
            title: "Watch for 'eco' as branding",
            body:
              "An 'eco-lodge' built of imported teak with diesel generators and an infinity pool drawing borehole water is not eco. Look for evidence, not the word.",
          },
        },
        {
          heading: "What social sustainability looks like",
          bullets: [
            "Cultural visits run by the community itself, not booked through a third party",
            "School and clinic partnerships disclosed publicly — not used for marketing photos only",
            "Local cuisine, music, art and language present in the experience without being performed for tourists",
            "Land rights and access negotiations open to public scrutiny",
            "Respect for community decision-making about wildlife and tourism",
          ],
        },
        {
          heading: "Certifications worth checking",
          bullets: [
            "The Long Run — leading global standard for nature-based tourism, 4Cs framework",
            "Fair Trade Tourism — Southern African certification, focus on labour standards",
            "B Corporation — broad governance and sustainability certification",
            "GSTC criteria — global framework adopted by many national bodies",
            "Long-term independent reviews on platforms with stable methodologies (Mr & Mrs Smith, Beyond Green)",
          ],
        },
        {
          heading: "Where the model falls short",
          bullets: [
            "International flights remain the biggest emissions component of any safari, hard to fix",
            "Carbon offsetting is highly variable in quality — many projects don't deliver claimed benefits",
            "'Sustainability' often defaults to environmental metrics, neglecting social and economic",
            "Greenwashing is rampant; genuine certification is still relatively rare",
            "The economics of low-volume / high-value tourism don't scale to all reserves",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/conservation/ethical-operators", label: "Ethical Operators" },
        { href: "/resources/conservation/responsible-practices", label: "Responsible Practices" },
        { href: "/resources/conservation/community-conservation", label: "Community Conservation" },
      ]}
    />
  )
}
