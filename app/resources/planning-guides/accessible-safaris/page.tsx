import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Accessible Safari Options | Safari Overland",
  description:
    "Practical information on safari options for travelers with mobility, vision, hearing or other accessibility needs — from wheelchair-friendly lodges to specialist operators.",
  keywords: "accessible safari, wheelchair safari, disabled travel africa, mobility safari, inclusive safari",
}

export default function AccessibleSafarisPage() {
  return (
    <GuidePage
      backHref="/resources/planning-guides"
      backLabel="Back to Planning Guides"
      title="Accessible Safari Options"
      subtitle="A safari is more achievable than most brochures imply — but operators vary widely in what they actually accommodate."
      intro={
        <>
          <p className="mb-3">
            "Accessible" covers a wide range of needs: mobility (wheelchairs, walkers, limited stamina), vision,
            hearing, sensory, and chronic-condition management. African travel can absolutely accommodate all of them,
            but it requires choosing operators who treat accessibility as a real planning input rather than an
            afterthought.
          </p>
          <p>
            This guide covers what's available, what to ask before booking, and which destinations and lodges set the
            bar.
          </p>
        </>
      }
      sections={[
        {
          heading: "Mobility — wheelchairs and limited stamina",
          bullets: [
            "South Africa leads the region — Kruger and several private reserves have wheelchair-accessible lodges and adapted vehicles",
            "Adapted safari vehicles with lifts and tie-downs exist (Endeavour Safaris, Epic Enabled, others)",
            "Lodge access varies enormously — ask about boardwalks, room steps, bathroom layout, transfers from vehicle to bed",
            "Walking-safari camps are generally not suitable; vehicle-based itineraries are",
            "Charter flights can accommodate folding wheelchairs; bush flights have weight and width limits — check ahead",
          ],
          callout: {
            title: "What 'accessible' often means in marketing",
            body:
              "Some lodges describe themselves as accessible because they have one ground-floor room. Insist on photos of the bathroom, the path from room to dining, and the vehicle you'll actually use.",
          },
        },
        {
          heading: "Vision and hearing",
          bullets: [
            "Specialist guides with audio-description training exist; ask operators specifically",
            "Tactile experiences — track casts, animal hides, textured surfaces — feature in some camps",
            "Hearing-impaired travelers benefit from front-seat positioning and pre-briefed guides",
            "Service-animal policies vary by country and lodge; arrange in writing well ahead",
          ],
        },
        {
          heading: "Chronic conditions and medical needs",
          bullets: [
            "Carry medications in original packaging with prescriptions; some have border restrictions",
            "Confirm fridge availability for refrigerated medication at every lodge",
            "Travel with detailed medical letters for any implanted devices, oxygen needs, dialysis schedules",
            "Comprehensive evacuation insurance is non-negotiable — Flying Doctors, AMREF, AAA cover much of the region",
            "Some camps have on-call doctors or nurses; many do not — check before booking remote locations",
          ],
        },
        {
          heading: "Questions to ask before booking",
          bullets: [
            "Is the route from arrival airport to lodge wheelchair-accessible at every step?",
            "What's the actual surface at the lodge — gravel, boardwalk, sand, stairs?",
            "How many steps between the room and the main areas? Is there an alternative route?",
            "What's the vehicle? Does it have a lift, ramp, or wide door? Tie-down points?",
            "If something goes wrong medically, what's the evacuation protocol and time to a hospital?",
          ],
        },
        {
          heading: "Recommended specialist operators",
          body: (
            <p>
              A handful of African operators specialise in accessible safari travel. We don't endorse specific firms
              but the directory below filters for those advertising adapted vehicles and experience with mobility
              clients. Always cross-check independent reviews.
            </p>
          ),
          bullets: [
            "Search the directory for operators tagged 'accessible'",
            "Ask whether they have hosted similar requirements before, and request a reference",
            "Confirm the lead guide on your trip has experience with your specific needs",
          ],
        },
      ]}
      ctaTitle="Need a tailored accessible itinerary?"
      ctaBody="Tell us about the traveller's specific needs and dates. We'll point you at operators with a real track record, not just inclusive marketing."
      ctaHref="/contact"
      ctaLabel="Talk to a planner"
      relatedLinks={[
        { href: "/resources/planning-guides/family-safaris", label: "Family Safari Guide" },
        { href: "/resources/safety-tips", label: "Safari Safety Tips" },
        { href: "/resources/planning-guides/before-you-go", label: "Before You Go" },
      ]}
    />
  )
}
