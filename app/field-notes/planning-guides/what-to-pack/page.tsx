import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"
import { RelatedFieldNotes } from "@/components/RelatedFieldNotes"

export const metadata: Metadata = {
  title: "Safari Packing List 2026 — What to Pack, What to Wear, What to Leave Home",
  description:
    "The honest 2026 African safari packing list — what you actually need, what you really don't, and the small list of things travellers always forget. Written from the bush.",
  alternates: { canonical: "https://safarioverland.com/field-notes/planning-guides/what-to-pack" },
  keywords:
    "safari packing list, what to pack safari, safari packing essentials, 2026 safari packing list, africa packing list, what to wear on safari",
}


export default function WhatToPackPage() {
  return (
    <>
    <GuidePage
      backHref="/field-notes/planning-guides"
      backLabel="Back to Planning Guides"
      heroImage="/images/planning-guides/packing/packing-list.jpg"
      heroAlt="Safari packing list essentials laid out — neutral clothing, soft duffel, binoculars, hat"
      title="What to pack for an African safari — the honest 2026 list"
      subtitle="Nine pieces of clothing, two pairs of shoes, a small set of accessories. In a 50-litre soft duffel under 15kg — because that is what bush planes will let you bring."
      intro={
        <>
          <p className="mb-3">
            A good safari packing list is short and unglamorous. The
            dressed-for-Africa retail aisle wants to sell you a $400
            multi-pocketed vest you will wear exactly twice. The truth is
            that for almost any African safari in 2026, you need maybe nine
            pieces of clothing, two pairs of shoes, and a small set of
            accessories — all of which fit in a 50-litre soft-sided duffel
            weighing under 15kg, because that is what East and Southern
            African bush planes will let you bring.
          </p>
          <p className="mb-3">
            This list is what we actually pack ourselves. Written from the
            bush, not the shop floor.
          </p>
          <p>
            For a full clothing-by-clothing list see the{" "}
            <a className="text-primary underline" href="/field-notes/planning-guides/packing-list">
              Ultimate Safari Packing List
            </a>
            ; for season-specific advice see the{" "}
            <a className="text-primary underline" href="/field-notes/planning-guides/seasonal-packing">
              Seasonal Packing Guide
            </a>
            . If you remember nothing else, prioritise the items below.
          </p>
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
        { href: "/field-notes/planning-guides/packing-list", label: "Ultimate Safari Packing List" },
        { href: "/field-notes/planning-guides/seasonal-packing", label: "Seasonal Packing Guide" },
        { href: "/field-notes/planning-guides/before-you-go", label: "Before You Go" },
      ]}
    />
    <RelatedFieldNotes topic="planning" excludeSlug="what-to-pack" heading="More planning notes" />
    </>
  )
}
