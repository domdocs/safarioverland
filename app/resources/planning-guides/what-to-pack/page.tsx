import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "What to Pack for Safari — Quick Reference | Safari Overland",
  description:
    "A condensed safari packing reference — the essentials, the easy-to-forget items, and the things you really don't need to bring.",
  keywords: "what to pack safari, safari packing essentials, safari quick packing list, safari must-haves",
}

export default function WhatToPackPage() {
  return (
    <GuidePage
      backHref="/resources/planning-guides"
      backLabel="Back to Planning Guides"
      heroImage="/images/planning-guides/packing/packing-list.jpg"
      heroAlt="Safari packing list essentials"
      title="What to Pack for Safari"
      subtitle="A no-fluff reference: what you actually need, what you'll forget, and what you can leave at home."
      intro={
        <>
          <p className="mb-3">
            This is the short version. For a full clothing-by-clothing list see the{" "}
            <a className="text-primary underline" href="/resources/planning-guides/packing-list">
              Ultimate Safari Packing List
            </a>
            ; for season-specific advice see the{" "}
            <a className="text-primary underline" href="/resources/planning-guides/seasonal-packing">
              Seasonal Packing Guide
            </a>
            .
          </p>
          <p>If you remember nothing else, prioritise the items below.</p>
        </>
      }
      sections={[
        {
          heading: "The non-negotiables",
          bullets: [
            "Passport with 6+ months validity and 2–3 blank pages",
            "Yellow fever certificate (where required) and prescriptions in original packaging",
            "Comprehensive travel insurance details, printed and saved offline",
            "Soft-sided duffel bag — bush planes refuse hard suitcases",
            "Sun hat with brim, polarised sunglasses, high-SPF sunscreen",
            "Insect repellent — DEET 30%+ or picaridin",
            "Small first-aid kit including rehydration salts and your malaria prophylaxis",
          ],
        },
        {
          heading: "Clothing — keep it simple",
          bullets: [
            "Neutral colours (khaki, olive, brown). Avoid bright white and dark blue/black",
            "3–4 lightweight shirts (mix of long and short sleeve)",
            "2 pairs of safari trousers, ideally zip-off",
            "1 warm fleece or insulated jacket — yes, even in tropical destinations",
            "Light waterproof shell if traveling green-season",
            "Closed-toe shoes for bush walks; sandals for camp",
            "Swimsuit — most lodges have a pool",
          ],
        },
        {
          heading: "Easy to forget",
          bullets: [
            "Universal plug adapter (Type D, M and G are common across the region)",
            "Headlamp or small torch — power cuts happen, walks to your tent are dark",
            "Small day pack for game drives",
            "Reusable water bottle — most camps now refill rather than supplying plastic",
            "Spare prescription glasses or contacts in a sealed bag",
            "USD cash in clean small bills for tips and incidentals",
            "Lip balm with SPF — high-altitude wind dries everything",
          ],
        },
        {
          heading: "Tech and camera",
          bullets: [
            "Phone with offline maps downloaded; eSIM activated",
            "Power bank (10,000 mAh+)",
            "Camera with a long zoom or paired lenses (see Photography Gear guide)",
            "Spare camera batteries; one full charge per drive minimum",
            "128GB+ memory card per shooting day",
          ],
        },
        {
          heading: "What you really don't need",
          bullets: [
            "Hairdryers, irons — most camps provide them or strongly discourage them",
            "Excess formal wear — even premium camps are bush-formal at most",
            "Camouflage clothing — illegal to wear in some countries",
            "Drones — banned in many parks; ask before packing",
            "A second large suitcase — internal flights enforce 15–20kg limits, soft bags only",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/planning-guides/packing-list", label: "Ultimate Safari Packing List" },
        { href: "/resources/planning-guides/seasonal-packing", label: "Seasonal Packing Guide" },
        { href: "/resources/planning-guides/before-you-go", label: "Before You Go" },
      ]}
    />
  )
}
