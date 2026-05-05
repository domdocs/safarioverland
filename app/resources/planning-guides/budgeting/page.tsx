import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Safari Budgeting Guide | Safari Overland",
  description:
    "A practical breakdown of safari costs — flights, park fees, accommodation, transfers, tipping — with realistic budget ranges for every traveler type.",
  keywords:
    "safari budget, safari cost, africa travel budget, safari pricing, how much does a safari cost, safari park fees",
}

export default function SafariBudgetingPage() {
  return (
    <GuidePage
      backHref="/resources/planning-guides"
      backLabel="Back to Planning Guides"
      title="Safari Budgeting Guide"
      subtitle="Where the money actually goes — and how to get the most safari for what you spend."
      intro={
        <>
          <p className="mb-3">
            A safari is one of the biggest discretionary travel purchases most people make in a lifetime. Costs are also
            unusually opaque: a quoted "from" rate often hides park fees, transfers, drinks, tips and conservation
            levies that materially change the bill.
          </p>
          <p>
            This guide breaks down the real cost components, gives you realistic ranges by travel style, and shows you
            where you have leverage and where you don't.
          </p>
        </>
      }
      sections={[
        {
          heading: "What goes into the price",
          body: (
            <p>
              Roughly seven cost categories drive the total. Knowing the relative weight of each lets you spot where a
              quote is padded and where it's lean.
            </p>
          ),
          bullets: [
            "International flights — typically 15–30% of the total trip",
            "In-country flights and road transfers — 10–20%, higher for fly-in safaris",
            "Accommodation — usually the single biggest line item, 30–50%",
            "Park, conservation and concession fees — 10–25%, paid per person per day",
            "Activities and game drives — included at most lodges, extra at hotels",
            "Tips for guides, trackers and camp staff — budget 5–8% of trip cost",
            "Visas, vaccinations, insurance, gear, drinks and incidentals — 5–10%",
          ],
        },
        {
          heading: "Realistic per-day budgets",
          body: (
            <p>
              These ranges are per person sharing, excluding international flights. They assume a mix of game drives
              and bush time — fly-in or remote-camp itineraries push the upper bound up sharply.
            </p>
          ),
          bullets: [
            "Backpacker / camping overland: $150–$300 per day",
            "Group tour (lodge + scheduled departures): $300–$500 per day",
            "Mid-range tailored safari: $500–$900 per day",
            "Premium fly-in safari: $900–$1,500 per day",
            "Top-tier private concession or expedition: $1,500–$3,000+ per day",
          ],
          callout: {
            title: "Watch for park fees",
            body:
              "Some parks (Serengeti, Ngorongoro, Bwindi) charge $70–$1,500 per person per day in fees alone. They're often quoted separately from the lodge rate, so make sure your quote is fully inclusive.",
          },
        },
        {
          heading: "Where you have leverage",
          bullets: [
            "Travel just outside peak — May or November in Southern Africa save 30–40% with near-peak game viewing",
            "Pick conservancies bordering big parks — same wildlife, lower park fees, fewer vehicles",
            "Stay 3+ nights per camp — short stays burn money on transfers",
            "Self-drive where it's safe (South Africa, Namibia) — a fraction of guided fly-in cost",
            "Group your tipping — one envelope per camp at the end, rather than guessing daily",
          ],
        },
        {
          heading: "Where you don't",
          bullets: [
            "Park entry fees — fixed, non-negotiable, often paid in USD",
            "Gorilla, chimp and rhino trekking permits — fixed by government, often $700–$1,500 per trek",
            "Internal flights to remote camps — small operators, limited competition",
            "Peak-season premium lodge nights — they sell out 12+ months ahead",
          ],
        },
      ]}
      ctaTitle="Need a costed itinerary?"
      ctaBody="Tell us your budget and dates and we'll suggest operators in our directory who deliver real value at your price point."
      ctaHref="/contact"
      ctaLabel="Contact our planners"
      relatedLinks={[
        { href: "/resources/planning-guides/luxury-vs-budget", label: "Luxury vs Budget Safaris" },
        { href: "/resources/planning-guides/hidden-costs", label: "Hidden Costs of Safari Travel" },
        { href: "/resources/planning-guides/before-you-go", label: "Before You Go" },
      ]}
    />
  )
}
