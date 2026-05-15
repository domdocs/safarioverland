import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Choosing Ethical Safari Operators | Safari Overland",
  description:
    "How to identify operators that practice genuine conservation and community engagement — beyond marketing claims and greenwashing.",
  keywords:
    "ethical safari operators, responsible tour operators, sustainable tourism africa, greenwashing safari, choosing safari operator",
}

export default function EthicalOperatorsPage() {
  return (
    <GuidePage
      backHref="/resources/conservation"
      backLabel="Back to Conservation"
      heroImage="/images/conservation/traveler/ethical-operators.jpg"
      heroAlt="Ethical safari operators leading a tour"
      title="Choosing Ethical Operators"
      subtitle="Every safari brochure now claims to be 'sustainable'. Here's how to tell the real ones from the rest."
      intro={
        <>
          <p className="mb-3">
            The honest truth: nearly every operator's website claims meaningful contribution to conservation and
            community. A small fraction can back that up with audited numbers, named partners and structural
            commitments. The rest is marketing.
          </p>
          <p>
            This guide gives you a short checklist that strips out greenwashing in about ten minutes per operator.
          </p>
        </>
      }
      sections={[
        {
          heading: "Six questions that filter the field",
          body: (
            <p>
              If an operator can't answer all six clearly and quickly, you have a strong signal that the marketing is
              ahead of the practice.
            </p>
          ),
          bullets: [
            "What percentage of every booking goes to conservation and community, and how is that audited?",
            "Where do the people working at your camps come from? What's the local-employment ratio?",
            "Which named conservation projects do you fund, and can I speak to one of them directly?",
            "What are your written guidelines for off-roading, vehicle distance, night drives and animal interaction?",
            "What's your approach to single-use plastics, water and energy at the camp level?",
            "Have you been independently certified — Long Run, Fair Trade Tourism, B Corp, GSTC?",
          ],
        },
        {
          heading: "Green flags",
          bullets: [
            "Public benefit-sharing data with year-on-year tracking",
            "Operating in private concessions or community conservancies, not just popular parks",
            "Long-tenured staff and senior local management",
            "Active partnership with a researcher, NGO or anti-poaching unit, named publicly",
            "Honest about tradeoffs — willing to say 'we're not great at X yet'",
            "Limits guests per vehicle and rotates routes — not racing to sightings",
          ],
        },
        {
          heading: "Red flags",
          bullets: [
            "Vague claims of 'supporting the local community' with no specifics",
            "Animal interactions of any kind (riding, walking with predators, holding cubs, petting cheetahs)",
            "Guarantees of specific sightings — that means off-road pressure on animals",
            "Drone footage advertised as routine — drones are illegal or restricted in most African parks",
            "All-included pricing that's significantly below comparable concessions — corners are being cut somewhere",
            "Owners and management entirely from outside the country, with no investment in succession",
          ],
          callout: {
            title: "The 'cubs' test",
            body:
              "Any operator advertising cheetah, lion or elephant interactions where you touch, feed or walk with the animal is not an ethical operator. Walk away — there's no version of this that benefits the animal.",
          },
        },
        {
          heading: "Trusted certifications and bodies",
          bullets: [
            "The Long Run — leading global standard for nature-based tourism",
            "B Corporation — broader sustainability/governance standard, increasingly common",
            "Fair Trade Tourism (Southern Africa)",
            "ATTA — African Travel and Tourism Association (membership signals scrutiny but not full audit)",
            "GSTC — Global Sustainable Tourism Council (criteria framework rather than certification itself)",
          ],
        },
        {
          heading: "Using the collection",
          body: (
            <p>
              Listings on Safari Overland include the operator's stated conservation commitments where they are
              public, but we don't audit them. Use the questions above on any operator before booking — and feel free
              to share what you learn back with us.
            </p>
          ),
        },
      ]}
      ctaTitle="Need a vetted shortlist?"
      ctaBody="Tell us your dates, region and what 'ethical' means most to you. We'll suggest operators with track records that match."
      ctaHref="/contact"
      ctaLabel="Talk to a planner"
      relatedLinks={[
        { href: "/resources/conservation/responsible-practices", label: "Responsible Practices" },
        { href: "/resources/conservation/sustainable-tourism", label: "Sustainable Tourism" },
        { href: "/resources/conservation/community-conservation", label: "Community Conservation" },
      ]}
    />
  )
}
