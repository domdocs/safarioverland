import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Habitat Preservation in Africa | Safari Overland",
  description:
    "How African ecosystems — savanna, miombo, rainforest, wetland, coast — are being protected, the threats they face, and how visitors support them.",
  keywords:
    "habitat preservation, african ecosystems, savanna protection, miombo woodland, wetland conservation, marine protected areas",
}

export default function HabitatPreservationPage() {
  return (
    <GuidePage
      backHref="/resources/conservation"
      backLabel="Back to Conservation"
      title="Habitat Preservation"
      subtitle="Saving species without saving habitat is a holding action, not a strategy."
      intro={
        <>
          <p className="mb-3">
            Anti-poaching protects what's already there. Habitat preservation — and where possible, restoration — is
            what allows wildlife to thrive across larger landscapes than any one fenced reserve can sustain. The
            single biggest predictor of long-term species health is connected, well-managed habitat.
          </p>
        </>
      }
      sections={[
        {
          heading: "Africa's major ecosystems and what's at stake",
          bullets: [
            "Savanna grasslands — the iconic safari biome; threatened by agricultural conversion and bush encroachment",
            "Miombo woodland — vast, under-recognised, providing carbon storage and crucial corridor habitat",
            "Tropical rainforest (Congo Basin) — second-largest on Earth; logging and shifting agriculture pressure",
            "Coastal mangroves — disappearing fast; critical for fish, carbon and storm protection",
            "Inland wetlands (Okavango, Bangweulu, Sudd) — underpin entire wildlife economies",
            "Montane forest (Albertine Rift, Eastern Arc) — ancient, biodiverse and tiny",
            "Sahel and Sahara — desertification, but also vital habitat for rare species",
          ],
        },
        {
          heading: "Primary threats",
          bullets: [
            "Agricultural expansion — particularly soybean, palm oil and cattle in former wilderness",
            "Settlement growth and infrastructure — roads, pipelines, railways fragmenting corridors",
            "Charcoal and timber harvesting — often illegal, hard to police",
            "Climate change — shifting rainfall, fire regimes and vegetation belts",
            "Invasive species — water hyacinth, opuntia cactus, prosopis",
            "Mining concessions in or adjacent to protected areas",
          ],
          callout: {
            title: "Wildlife corridors matter",
            body:
              "Many African parks are now too small to sustain viable populations of wide-ranging species like lion, wild dog and elephant. Connecting parks via wildlife corridors — and protecting community land between them — is the central conservation challenge of the next 30 years.",
          },
        },
        {
          heading: "Big-picture habitat initiatives",
          bullets: [
            "KAZA — the Kavango–Zambezi Transfrontier Conservation Area, world's largest at 520,000km², spanning five countries",
            "Great Limpopo Transfrontier Park — Mozambique, South Africa, Zimbabwe",
            "Northern Rangelands Trust corridors — Kenya, connecting Samburu, Lewa, Sera, Sarara",
            "African Parks' restoration of ecosystems in Akagera, Liwonde, Zakouma, Pendjari",
            "Marine protected area expansion in Gabon, Madagascar and the Seychelles",
          ],
        },
        {
          heading: "Restoration vs preservation",
          body: (
            <p>
              Restoration is harder, slower and more expensive than preventing damage in the first place — but where
              ecosystems have been lost, it's increasingly necessary. Notable success stories include Akagera in
              Rwanda (post-genocide) and Gorongosa in Mozambique (post-civil-war), both rebuilt nearly from zero.
            </p>
          ),
          bullets: [
            "Reforestation — most effective when species and provenance match local ecology",
            "Wildlife reintroduction following habitat readiness, not the reverse",
            "Invasive-species removal — slow, labour-intensive, persistent",
            "Fire management — both fire reintroduction and fire suppression depending on biome",
          ],
        },
        {
          heading: "How travelers help",
          bullets: [
            "Visit lesser-known reserves and corridors — your park fees fund habitat work",
            "Choose lodges in private reserves and conservancies — these are often the corridor land itself",
            "Support transfrontier conservation NGOs (Peace Parks Foundation, AWF)",
            "Buy local-source food and crafts — agricultural conversion is partly a market problem",
            "Carbon offsetting via accredited African forest and wetland projects",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/conservation/sustainable-tourism", label: "Sustainable Tourism" },
        { href: "/resources/conservation/economics", label: "Economics of Conservation" },
        { href: "/resources/conservation/community-conservation", label: "Community Conservation" },
      ]}
    />
  )
}
