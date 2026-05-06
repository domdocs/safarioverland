import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Photography Gear for Safari | Safari Overland",
  description:
    "Practical camera and lens recommendations for safari — for smartphones, enthusiast bodies and pro setups — plus accessories, settings and field tips.",
  keywords:
    "safari photography gear, wildlife photography, safari camera, telephoto lens safari, safari photography tips",
}

export default function PhotographyGearPage() {
  return (
    <GuidePage
      backHref="/resources/planning-guides"
      backLabel="Back to Planning Guides"
      heroImage="/images/planning-guides/packing/photography-gear.jpg"
      heroAlt="Photography gear laid out for a safari"
      title="Photography Gear for Safari"
      subtitle="What to bring, what to skip, and how not to wreck your trip carrying it all."
      intro={
        <>
          <p className="mb-3">
            Wildlife photography rewards reach, speed and stability — three things that get expensive fast. The good
            news: a thoughtful kit beats an expensive one. The bad news: weight limits on bush flights are real, and
            you'll feel every spare kilogram.
          </p>
          <p>This guide gives you three honest setups depending on where you sit on the photographer spectrum.</p>
        </>
      }
      sections={[
        {
          heading: "Setup 1: Phone-only — perfectly fine",
          body: (
            <p>
              Modern phones produce excellent images for sharing and family albums. They struggle with distant wildlife
              — phone "zoom" past 3x is mostly software interpolation — but for landscapes, lodges, and animals close
              to the vehicle they're more than enough.
            </p>
          ),
          bullets: [
            "Bring a small clip-on tele lens or a phone-mounting bracket for binoculars (digiscoping)",
            "Carry a portable 10,000+ mAh power bank — bush charging is intermittent",
            "Buy a sealed phone pouch for dust — Kalahari and Etosha will eat your charging port",
          ],
        },
        {
          heading: "Setup 2: Enthusiast — one body, two lenses",
          body: (
            <p>
              The most-recommended safari kit and the one most operators see in vehicles: a mid-range mirrorless or DSLR
              with a long zoom for wildlife and a wider lens for environment shots.
            </p>
          ),
          bullets: [
            "Body: any current APS-C or full-frame mirrorless with good autofocus",
            "Telephoto: 100–400mm or 150–600mm zoom — covers 95% of subjects",
            "Wide-to-mid: 24–70mm or 24–105mm for scenes, lodges, people",
            "Two batteries minimum, four if you can — bush days drain them",
            "128GB+ memory card per shooting day, with a backup card",
          ],
          callout: {
            title: "If you only buy one thing",
            body:
              "Spend on the long lens, not the body. A modest body with a sharp 150–600mm beats a top body with a slow kit lens every time on safari.",
          },
        },
        {
          heading: "Setup 3: Serious / pro — what changes",
          bullets: [
            "Two bodies — one tele, one mid — to avoid lens swaps in dust",
            "Fast prime in the 400–600mm range for low light at dawn and dusk",
            "Beanbag rather than a tripod — vehicles can't accommodate tripods well",
            "Laptop or dedicated card backup device — back up at the end of every drive",
            "Insurance specifically covering camera gear in the bush — your travel policy may not",
          ],
        },
        {
          heading: "Accessories that earn their weight",
          bullets: [
            "Bean bag (small, fillable on arrival) — the single best safari support",
            "Lens cleaning kit with rocket blower — dust is the enemy",
            "Rain cover for body + lens — green-season showers come fast",
            "Polariser for scenes and water; ND filter for waterfalls and bright skies",
            "Soft-sided camera bag that fits under your seat on a 12-seater bush plane",
          ],
        },
        {
          heading: "Settings to dial in before you arrive",
          bullets: [
            "Continuous autofocus + animal eye detection if your body has it",
            "Burst mode at the highest reasonable rate your buffer can sustain",
            "Auto ISO with a maximum that you trust your sensor at (often 6400 for modern bodies)",
            "Back-button focus — separates focus from shutter, much easier for moving subjects",
          ],
        },
      ]}
      ctaTitle="Looking for a photographic safari?"
      ctaBody="Some operators run dedicated photography vehicles with bean bags, fewer guests, and guides who understand light. We can point you at the best ones."
      ctaHref="/contact"
      ctaLabel="Contact our planners"
      relatedLinks={[
        { href: "/resources/planning-guides/packing-list", label: "Ultimate Safari Packing List" },
        { href: "/resources/seasonal-guides/photography", label: "Photography Seasonal Guide" },
        { href: "/resources/planning-guides/wildlife-events", label: "Planning Around Wildlife Events" },
      ]}
    />
  )
}
