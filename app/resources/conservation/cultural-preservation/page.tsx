import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Cultural Preservation in Safari Tourism | Safari Overland",
  description:
    "How tourism interacts with the cultures of safari regions — what works, what extracts, and how to choose experiences that respect rather than perform.",
  keywords:
    "cultural preservation, indigenous tourism, maasai culture, san bushmen, ethical cultural visits, africa cultural tourism",
}

export default function CulturalPreservationPage() {
  return (
    <GuidePage
      backHref="/resources/conservation"
      backLabel="Back to Conservation"
      heroImage="/images/conservation/community/cultural-preservation.jpg"
      heroAlt="Cultural preservation in an African community"
      title="Cultural Preservation"
      subtitle="Wildlife conservation cannot be separated from the cultures of the people who share the landscape with it."
      intro={
        <>
          <p className="mb-3">
            Safari travel has historically treated local cultures as a backdrop or a costumed photo op. The shift over
            the past two decades — toward community-led cultural experiences, language and knowledge preservation
            programmes, and a far more honest portrayal of contemporary African life — is one of the most important
            changes in the industry.
          </p>
          <p>This guide covers what's at stake, what's working, and how to choose cultural experiences well.</p>
        </>
      }
      sections={[
        {
          heading: "Why this matters for conservation",
          bullets: [
            "Indigenous knowledge of landscape, plants and wildlife is irreplaceable scientific data",
            "Communities that retain cultural identity and economic agency are the most effective conservation partners",
            "Loss of language is loss of ecological knowledge — many plant and animal names exist in no other system",
            "Wildlife policy without cultural input fails repeatedly; wildlife policy that incorporates it succeeds",
          ],
        },
        {
          heading: "Cultures most often encountered on safari",
          bullets: [
            "Maasai (Kenya, Tanzania) — pastoralist, deeply involved in conservancy models",
            "San / Bushmen (Botswana, Namibia) — among the world's oldest cultures, severe historical injustice",
            "Samburu, Turkana, Pokot (northern Kenya) — pastoralists with growing community-conservancy roles",
            "Himba (Namibia) — semi-nomadic, often misrepresented in tourism",
            "Hadzabe (Tanzania, around Lake Eyasi) — one of the last hunter-gatherer societies",
            "Berber and Saharawi (North Africa) — historically nomadic, complex modern realities",
          ],
          callout: {
            title: "The 'human zoo' problem",
            body:
              "If a cultural visit involves a staged dance performed for tourists, fixed entry fees paid to a non-community intermediary, and no opportunity for genuine conversation, you're funding a problem rather than solving one.",
          },
        },
        {
          heading: "What good cultural experiences look like",
          bullets: [
            "Hosts decide what to share — visits go where they take you, not a fixed script",
            "Direct payment to community institutions, with disclosed benefit allocation",
            "Long-form engagement (half-day or longer) — not 20 minutes between game drives",
            "Activities that match daily life — herding, walking, cooking, story-telling — not staged events",
            "Photography permission asked individually, not assumed",
            "Honest discussion of contemporary issues alongside traditional practice",
          ],
        },
        {
          heading: "Active cultural preservation projects",
          bullets: [
            "Maasai language and oral history archives — recording elders' knowledge",
            "San tracking academies in Botswana — training rangers in indigenous tracking science",
            "Community museums and visitor centres run by cultural associations themselves",
            "Indigenous-led tourism cooperatives that retain decision-making and revenue",
          ],
        },
        {
          heading: "How to engage well as a visitor",
          bullets: [
            "Learn ten words of the local language — it goes a long way",
            "Read one book on the culture before you arrive (recommendations vary; ask your operator)",
            "Buy crafts directly from makers, not at airport gift shops",
            "Tip cultural guides separately and visibly",
            "Don't photograph children without parental permission — apply your own standards",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/conservation/community-conservation", label: "Community Conservation" },
        { href: "/resources/conservation/responsible-practices", label: "Responsible Practices" },
        { href: "/resources/conservation/sustainable-tourism", label: "Sustainable Tourism" },
      ]}
    />
  )
}
