import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Solo Traveler Safari Tips | Safari Overland",
  description:
    "How to plan a great safari as a solo traveler — managing single supplements, choosing the right operator, safety, and getting the most out of social camp life.",
  keywords: "solo safari, solo female safari, single supplement safari, solo traveler africa, solo safari tips",
}

export default function SoloTravelPage() {
  return (
    <GuidePage
      backHref="/resources/planning-guides"
      backLabel="Back to Planning Guides"
      heroImage="/images/planning-guides/travelers/solo-traveler.jpg"
      heroAlt="Solo traveler on an African safari"
      title="Solo Traveler Safari Tips"
      subtitle="Solo safari is more popular than the brochures suggest — and arguably the best way to get under the skin of the bush."
      intro={
        <>
          <p className="mb-3">
            Camp dinners are communal, guides have time for the questions a couple won't ask, and you set the pace.
            The biggest practical hurdles are cost (the single supplement) and choosing operators who handle solo
            travelers thoughtfully.
          </p>
          <p>This guide tackles both, plus safety, social fit, and how to maximise the experience.</p>
        </>
      }
      sections={[
        {
          heading: "Beating the single supplement",
          body: (
            <p>
              Most lodge rates are quoted "per person sharing". Travel alone and you'll often be charged 50–100% extra
              for the room. Some operators waive or reduce this — actively look for them rather than accepting the
              first quote.
            </p>
          ),
          bullets: [
            "Look for shoulder-season specials — many camps drop the single supplement entirely outside peak",
            "Small group tours — a single supplement on group tours is usually 10–25%, not 100%",
            "Solo-friendly lodges — some camps have rooms designed for single travelers at sharing rates",
            "Loyalty programmes — Wilderness, Singita and others offer solo packages quietly",
            "Direct vs through an agent — sometimes agents have negotiated solo rates that don't appear publicly",
          ],
        },
        {
          heading: "Choosing the right operator",
          bullets: [
            "Small camps (8–16 guests) — solo travelers integrate easily at communal dinners",
            "Camps with a host or manager — they make a real effort to include solo guests at meals",
            "Avoid camps that only do private dining — you'll feel isolated for a week",
            "Group safaris with set departure dates — instant social travel without the supplement",
          ],
        },
        {
          heading: "Safety as a solo traveler",
          body: (
            <p>
              On safari proper, you're never really alone — you're with a guide, in vehicles, in established camps.
              The riskier parts of solo travel are city transit and pre-/post-safari days.
            </p>
          ),
          bullets: [
            "Pre-arrange airport transfers — never hail a taxi at Nairobi or Johannesburg arrivals",
            "Choose hotels in safer neighbourhoods, even if more expensive (Westlands in Nairobi, Sandton in Johannesburg)",
            "Share itineraries with one person at home; check in daily where signal allows",
            "Carry a small amount of USD cash for emergencies; main spend on a no-fee travel card",
            "Treat any unsolicited offer of help at borders or stations with healthy skepticism",
          ],
          callout: {
            title: "For solo female travelers",
            body:
              "Most safari camps and operators have excellent track records. Choose lodges where guides accompany you between your tent and main areas after dark — standard practice in real bush camps and a sensible default everywhere.",
          },
        },
        {
          heading: "Getting the most out of solo bush time",
          bullets: [
            "Take the open seat at the back of the vehicle — best photos, fewer distractions",
            "Eat at the communal table when offered — that's where the trip's stories happen",
            "Carry a paperback for camp downtime; phone signal will be patchy at best",
            "Build a relationship with your guide — ask about their family, their training, the bush they grew up in",
            "Add 1–2 nights either side of the safari for decompression — solo bush time is intense",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/planning-guides/budgeting", label: "Safari Budgeting Guide" },
        { href: "/resources/safety-tips", label: "Safari Safety Tips" },
        { href: "/resources/planning-guides/before-you-go", label: "Before You Go" },
      ]}
    />
  )
}
