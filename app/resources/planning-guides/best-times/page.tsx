import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Best Time to Visit Each Safari Destination | Safari Overland",
  description:
    "A month-by-month guide to the best time to safari in each major African destination — wildlife, weather, prices and crowds.",
  keywords: "best time safari, when to safari africa, safari season, safari weather, dry season africa, green season",
}

export default function BestTimesPage() {
  return (
    <GuidePage
      backHref="/resources/planning-guides"
      backLabel="Back to Planning Guides"
      heroImage="/images/planning-guides/timing/best-time-to-visit.jpg"
      heroAlt="Best time to visit African safari destinations"
      title="Best Time to Visit Each Safari Destination"
      subtitle="Timing is the single biggest decision in safari planning. This guide gets you to the right month."
      intro={
        <>
          <p className="mb-3">
            "Best time" depends on what you're optimising for: wildlife concentration, scenery, weather comfort,
            avoiding crowds, or saving money. Often these pull in opposite directions — peak game viewing usually
            collides with peak prices and peak occupancy.
          </p>
          <p>Below is a destination-by-destination breakdown of when to go and why.</p>
        </>
      }
      sections={[
        {
          heading: "Kenya — Maasai Mara",
          bullets: [
            "Peak: July–October — Great Migration herds in the Mara",
            "Excellent: January–February — calving on the southern conservancies",
            "Avoid: April–May long rains; many camps close",
          ],
        },
        {
          heading: "Tanzania — Serengeti & Ngorongoro",
          bullets: [
            "Peak: January–March (calving in southern Serengeti), June–July (river crossings in north)",
            "Excellent: All year in central Serengeti — game is resident",
            "Avoid: Mid-March to mid-May long rains",
          ],
        },
        {
          heading: "Botswana — Okavango Delta & Chobe",
          bullets: [
            "Peak: June–October — flood high, dry-land game concentrated at water",
            "Shoulder: November–December — dramatic skies, lower prices, baby animals",
            "Avoid: January–March deep wet season for road access",
          ],
        },
        {
          heading: "South Africa — Kruger & Sabi Sands",
          bullets: [
            "Peak: May–September — dry, cool, sparse foliage means easy spotting",
            "Excellent: April and October shoulder months — green but visible",
            "Year-round: Premium private reserves operate every month",
          ],
        },
        {
          heading: "Namibia — Etosha & Sossusvlei",
          bullets: [
            "Peak: May–October — dry months drive game to Etosha's waterholes",
            "Photography sweet spot: April–May, with green grass and rain-washed light",
            "Avoid: January–March if you're chasing big game (high water dispersal)",
          ],
        },
        {
          heading: "Zambia & Zimbabwe — South Luangwa, Mana Pools",
          bullets: [
            "Peak: July–October walking-safari season",
            "Spectacular: October — hot, but elephants and predators concentrate at the rivers",
            "Closed: Many camps shut December–March (wet season, impassable roads)",
          ],
        },
        {
          heading: "Uganda & Rwanda — Gorilla trekking",
          bullets: [
            "Peak: June–September, December–February — drier trails, easier hikes",
            "Excellent value: March–May and October–November — same gorillas, lower prices, wetter ground",
            "Permits sell out 6–12 months ahead in peak months",
          ],
        },
        {
          heading: "North Africa — Egypt & Morocco",
          body: <p>Different climate logic. Avoid summer (June–August) extreme heat; aim for the cooler shoulders.</p>,
          bullets: [
            "Egypt: October–April (cool, dry); avoid July–August in Luxor and Aswan",
            "Morocco Sahara fringe: October–April; spring and autumn are ideal",
            "Atlas Mountains for trekking: April–June, September–October",
          ],
        },
        {
          heading: "If you only have to pick one month",
          body: (
            <p>
              <strong>September</strong> — across the largest swath of the continent, you get dry-season game viewing,
              tolerable temperatures, no major rain risk and reasonable shoulder-season pricing. It's the safest single
              month if you're not chasing a specific event.
            </p>
          ),
        },
      ]}
      relatedLinks={[
        { href: "/resources/planning-guides/wildlife-events", label: "Planning Around Wildlife Events" },
        { href: "/resources/planning-guides/green-season", label: "Green Season Safari Benefits" },
        { href: "/resources/seasonal-guides", label: "All Seasonal Guides" },
      ]}
    />
  )
}
