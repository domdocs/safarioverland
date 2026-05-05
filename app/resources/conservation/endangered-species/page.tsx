import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Endangered Species in Africa | Safari Overland",
  description:
    "Status, threats and recovery efforts for Africa's most endangered species — from black rhino and pangolin to African wild dog, vulture and grey crowned crane.",
  keywords:
    "endangered species africa, black rhino, pangolin, african wild dog, vulture decline, grey crowned crane, mountain gorilla",
}

export default function EndangeredSpeciesPage() {
  return (
    <GuidePage
      backHref="/resources/conservation"
      backLabel="Back to Conservation"
      title="Endangered Species"
      subtitle="Where Africa's species stand — and what's actually changing the curve."
      intro={
        <>
          <p className="mb-3">
            Headlines focus on a handful of charismatic species. The reality is broader and more uneven: some species
            (mountain gorilla, black rhino) have rebounded against the odds; others (vultures, pangolins) are sliding
            toward functional extinction with relatively little public attention.
          </p>
          <p>This guide gives an honest snapshot of where the major species stand.</p>
        </>
      }
      sections={[
        {
          heading: "Recovering — but fragile",
          bullets: [
            "Mountain gorilla — population trebled to 1,000+; the most successful African mammal recovery story",
            "Black rhino — South African population stabilised after the 2014 crisis; Kenya and Namibia growing",
            "White rhino — population still in decline overall; intensive protection in fewer reserves",
            "African elephant (Southern populations) — stable or growing in most of Botswana, Zimbabwe, parts of South Africa",
          ],
        },
        {
          heading: "Declining — significant concern",
          bullets: [
            "African forest elephant — listed as Critically Endangered; declined ~60% in 50 years",
            "African wild dog — fewer than 6,000 individuals; range fragmentation severe",
            "Cheetah — populations down to ~7,000; very low genetic diversity, conflict with farmers",
            "Lion — populations halved over 25 years; healthy in core conservancies but declining outside",
            "Grey crowned crane — wetland loss and chick collection have driven steep declines",
          ],
        },
        {
          heading: "Critical — under-attention",
          bullets: [
            "Pangolin (all four African species) — most-trafficked mammal in the world; Critically Endangered",
            "Hooded vulture and white-backed vulture — populations down 80%+ from poisoning",
            "Northern white rhino — functionally extinct (two females remaining); IVF efforts underway",
            "Saharan cheetah — fewer than 250 left across the entire Sahel",
            "Ethiopian wolf — fewer than 500; canine distemper and habitat fragmentation",
          ],
          callout: {
            title: "Why vultures matter",
            body:
              "Africa's vulture decline is one of the largest avian extinctions of our time. Vultures clean up carrion and prevent disease spread; their loss has cascading effects on ecosystems and on rural human health.",
          },
        },
        {
          heading: "What's working",
          bullets: [
            "Translocation and reintroduction — Akagera (Rwanda) lions, Mozambique elephants, Malawi rhinos all by air",
            "Sniffer-dog detection at airports interdicting wildlife crime shipments",
            "CITES enforcement and tougher national legislation in several range states",
            "Community-conservancy models that make wildlife economically valuable to local people",
            "Captive breeding for the most extreme cases (northern white rhino, gharial parallels)",
          ],
        },
        {
          heading: "How travelers help",
          bullets: [
            "Choose itineraries that include species in recovery — your park fee directly funds the work",
            "Visit lesser-visited reserves with high conservation value but lower tourism revenue",
            "Donate to specialist organisations (Save the Rhino, Pangolin Conservation Network, Vulpro, Painted Dog Conservation)",
            "Refuse any wildlife product, anywhere — legal or not, ancient or new",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/conservation/anti-poaching", label: "Anti-Poaching" },
        { href: "/resources/conservation/habitat-preservation", label: "Habitat Preservation" },
        { href: "/resources/conservation/funding", label: "Conservation Funding" },
      ]}
    />
  )
}
