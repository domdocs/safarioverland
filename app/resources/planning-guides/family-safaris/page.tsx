import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Family Safari Guide | Safari Overland",
  description:
    "Practical advice on planning a safari with children — choosing destinations, lodges, age-appropriate activities, malaria considerations and how to keep kids engaged.",
  keywords: "family safari, kids safari, safari with children, family-friendly safari, family africa trip",
}

export default function FamilySafarisPage() {
  return (
    <GuidePage
      backHref="/resources/planning-guides"
      backLabel="Back to Planning Guides"
      title="Family Safari Guide"
      subtitle="A safari with kids is one of the great family trips — but the wrong lodge choice can make it a long week."
      intro={
        <>
          <p className="mb-3">
            Children handle long bush days better than most parents expect. The trick is choosing accommodation and
            activities pitched at the right age, in a region with manageable health risks, and pacing the trip so the
            travel doesn't outweigh the time on safari.
          </p>
          <p>This guide covers what works at each age, where to go, and the questions to ask before booking.</p>
        </>
      }
      sections={[
        {
          heading: "What works at each age",
          bullets: [
            "Under 6 — short game drives only; lodges with pools, shaded areas, and structured kids' programmes",
            "6–9 — the sweet spot for first safaris; full game drives if morning-only, junior ranger programmes",
            "10–14 — old enough for full days, walking safaris with age limits, photography, conservation activities",
            "15+ — essentially adult itineraries; canoeing, walking, longer transfers all in scope",
          ],
        },
        {
          heading: "Where to go with kids",
          body: (
            <p>
              The right region depends on the youngest traveller's age, malaria considerations, and how long the family
              can tolerate sitting still in a vehicle.
            </p>
          ),
          bullets: [
            "South Africa private reserves (Madikwe, Welgevonden, Eastern Cape) — malaria-free, family-friendly lodges",
            "Sabi Sands (Kruger) — exceptional game viewing and lodges with strong children's programmes",
            "Kenya — Maasai Mara conservancies welcome families; cultural visits add depth",
            "Tanzania — northern circuit works for older children; logistics tougher for under-6s",
            "Botswana — generally adult-focused, though a few family camps exist",
          ],
          callout: {
            title: "Most camps have minimum-age policies",
            body:
              "Many premium camps don't accept under-6s, or restrict them to private vehicles at a daily fee. Check this before falling in love with a camp on the website.",
          },
        },
        {
          heading: "Malaria and family travel",
          bullets: [
            "Malaria-free reserves exist in South Africa (Madikwe, Welgevonden, Pilanesberg, Eastern Cape)",
            "Children's antimalarial options are limited — discuss with a travel doctor 6+ weeks before",
            "If using malaria zones with children, book a lodge with sealed rooms, not open-fronted tents",
            "Long sleeves, repellent, and dawn-and-dusk vigilance reduce risk substantially",
          ],
        },
        {
          heading: "Keeping kids engaged",
          bullets: [
            "Junior ranger programmes — many camps offer track casts, scat investigation, archery",
            "Age-appropriate cameras — children remember more when they have something to do",
            "Bush skills sessions — fire-making, tracking, knot tying",
            "A wildlife journal — sticker books for younger kids; sketchbooks for older ones",
            "Cultural visits to local schools and communities — often a highlight",
          ],
        },
        {
          heading: "Family-friendly logistics",
          bullets: [
            "Direct international flights where possible — avoid two layovers with young kids",
            "Three nights minimum per camp — moving every two nights is exhausting",
            "Family villas or two-bedroom suites rather than separate rooms",
            "Set early dinners with the kids; parents can dine later if the lodge offers babysitting",
            "Mid-day downtime is essential — pool, books, naps are not wasted safari hours",
          ],
        },
      ]}
      ctaTitle="Planning a multi-generational trip?"
      ctaBody="Family safaris with grandparents in tow add complexity — accessibility, pacing and accommodation all need a careful look. We can help."
      ctaHref="/contact"
      ctaLabel="Talk to a planner"
      relatedLinks={[
        { href: "/resources/planning-guides/accessible-safaris", label: "Accessible Safari Options" },
        { href: "/resources/seasonal-guides/family-safari", label: "Family Safari Seasonal Guide" },
        { href: "/resources/safety-tips", label: "Safari Safety Tips" },
      ]}
    />
  )
}
