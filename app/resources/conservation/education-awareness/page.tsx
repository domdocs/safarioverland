import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Education and Awareness in Conservation | Safari Overland",
  description:
    "How conservation education in schools, communities and visitor programmes drives long-term wildlife protection — and how travelers can support it.",
  keywords:
    "conservation education, environmental education africa, awareness campaigns wildlife, conservation curriculum, wildlife club",
}

export default function EducationAwarenessPage() {
  return (
    <GuidePage
      backHref="/resources/conservation"
      backLabel="Back to Conservation"
      heroImage="/images/conservation/community/conservation-education.jpg"
      heroAlt="Conservation education program in Africa"
      title="Education and Awareness"
      subtitle="The longest-lever investment in conservation is the next generation's understanding of it."
      intro={
        <>
          <p className="mb-3">
            Anti-poaching, fencing and rapid-response teams handle the immediate threats. Education builds the
            constituency that decides whether wildlife matters at all. In a region with a young, fast-growing
            population, the question is no longer "how do we save the rhino" — it's "how do we make sure the
            generation now in primary school grows up wanting to save the rhino".
          </p>
        </>
      }
      sections={[
        {
          heading: "School-based conservation education",
          bullets: [
            "Wildlife Clubs of Kenya — running since 1968, now active in 1,000+ schools",
            "Wildlife Friends Foundation, EWT and WWF run national curriculum partnerships",
            "Bush schools in lodge concessions — bringing kids on game drives, often their first time",
            "Teacher training — without trained teachers, curriculum reform doesn't reach classrooms",
            "Scholarships for conservation degrees at regional universities",
          ],
        },
        {
          heading: "Community awareness programmes",
          bullets: [
            "Human-wildlife conflict mitigation — predator-proof bomas, beehive fences, chili farming",
            "Radio campaigns — still the highest-reach medium across rural Africa",
            "Mobile cinemas and pop-up exhibits in communities bordering parks",
            "Religious-leader engagement — pastors, imams and traditional leaders carry weight on conservation messaging",
          ],
          callout: {
            title: "Demand-side awareness",
            body:
              "Demand for ivory, rhino horn, pangolin scales and bushmeat is the upstream driver of poaching. Awareness campaigns in consumer markets (especially East Asia) have measurably reduced demand and are arguably the most cost-effective conservation intervention available.",
          },
        },
        {
          heading: "Visitor education on safari",
          body: (
            <p>
              The hours spent with a guide on a game drive are an extraordinary education channel — for the visitor,
              and through them for the people they tell at home. Good lodges treat this as a deliberate part of the
              experience.
            </p>
          ),
          bullets: [
            "Pre-arrival reading lists, lodge libraries and species briefings",
            "Researcher and ecologist talks at sundowners or after dinner",
            "Behind-the-scenes visits to anti-poaching units, K9 kennels, rehabilitation centres",
            "Honest discussion of conservation tradeoffs — culling, translocation, fencing — not just heart-warming stories",
          ],
        },
        {
          heading: "How to support education programmes",
          bullets: [
            "Sponsor a school's wildlife club — many lodges run direct partnerships",
            "Donate books, binoculars and stationery via vetted programmes (not random village handouts)",
            "Fund teacher-training cohorts via NGOs like the African Wildlife Foundation",
            "Attend lodge talks and ask questions — engaged guests change what lodges deliver",
            "Talk about your trip when you get home — that's the demand-side ripple",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/conservation/community-conservation", label: "Community Conservation" },
        { href: "/resources/conservation/responsible-practices", label: "Responsible Practices" },
        { href: "/resources/conservation/cultural-preservation", label: "Cultural Preservation" },
      ]}
    />
  )
}
