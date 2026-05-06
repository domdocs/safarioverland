import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "North Africa Birding Seasonal Guide | Safari Overland",
  description:
    "When and where to bird in North Africa — Morocco, Tunisia, Egypt — covering Palearctic migrants, desert specialists, wetland sites and seasonal timing.",
  keywords:
    "north africa birding, morocco birding, egypt birding, tunisia birding, palearctic migration, sahara birds, atlas mountain birds",
}

export default function NorthAfricaBirdsPage() {
  return (
    <GuidePage
      backHref="/resources/seasonal-guides"
      backLabel="Back to Seasonal Guides"
      heroImage="/images/seasonal-guides/travel-guide-north-africa-birds.jpg"
      heroAlt="North African birdlife in flight"
      title="North Africa Birding"
      subtitle="An under-rated birding region — desert specialists, Palearctic migration bottlenecks and Atlas Mountain endemics in a few hours from Europe."
      intro={
        <>
          <p className="mb-3">
            North Africa sits at one of the world's great migration crossroads. Birds funnel through the Strait of
            Gibraltar and the Sinai every spring and autumn in spectacular numbers. The region also hosts a strong
            cast of resident specialists — desert sparrows, lanner falcons, Egyptian vulture, Atlas finches — that
            most birders only see here.
          </p>
          <p>This guide covers when to go, where, and what to expect.</p>
        </>
      }
      sections={[
        {
          heading: "Spring migration (March–May)",
          body: (
            <p>
              The peak season for many birders. Northbound passerines, raptors and waterbirds cross the Mediterranean
              in vast numbers, and breeding plumage makes identification much easier.
            </p>
          ),
          bullets: [
            "Strait of Gibraltar — raptor migration peaks late March to early May",
            "Tarifa to Tangier — short crossing, exceptional concentration of honey buzzards, booted eagles, black kites",
            "Sahara fringe (Erg Chebbi, Merzouga) — desert breeders setting up territory",
            "Atlas Mountains — alpine accentor, crimson-winged finch, Moussier's redstart",
          ],
        },
        {
          heading: "Autumn migration (August–October)",
          bullets: [
            "Larger numbers than spring but in less dramatic plumage",
            "Bonelli's and short-toed eagles, vultures, kites concentrating along the coasts",
            "Wader passage at Merja Zerga, Ichkeul and the Nile Delta",
            "Storks and pelicans in large flocks at staging wetlands",
          ],
          callout: {
            title: "Palearctic-Afrotropical bottleneck",
            body:
              "Anything migrating between Europe and sub-Saharan Africa funnels through North Africa. On a good day at the right site you can see species you'd never encounter again on the same trip.",
          },
        },
        {
          heading: "Winter (November–February)",
          body: (
            <p>
              Often overlooked but excellent for waterfowl, large numbers of European wintering species, and easier
              access to desert sites before the heat returns.
            </p>
          ),
          bullets: [
            "Greater flamingo at Merja Zerga and Ichkeul — flocks in the thousands",
            "Ducks, geese and waders in Mediterranean coastal lagoons",
            "Resident desert species are easier — they're not nesting, easier to flush",
            "Egyptian Nile cruises for kingfishers, terns and African specialities",
          ],
        },
        {
          heading: "Summer (June–August)",
          body: (
            <p>
              Hot, often punishingly so in the south. Birding switches almost entirely to dawn and dusk, with high
              elevation and coastal sites the only viable options through the day.
            </p>
          ),
          bullets: [
            "Atlas high country — alpine specialists at coolest elevations",
            "Coastal Atlantic Morocco — cooler than the interior, breeding seabirds",
            "Avoid Sahara fringes through midday; safe to bird only first/last light",
            "Lower visitor numbers — easier access to popular sites",
          ],
        },
        {
          heading: "Top sites by country",
          bullets: [
            "Morocco — Boumalne Dadès (desert specialists), Souss-Massa (bald ibis, Eleonora's falcon), Oued Massa, Atlas Mountains",
            "Tunisia — Ichkeul National Park, Ras El Mar coastline, Sahara crossings via Tozeur",
            "Egypt — Lake Qarun, Wadi El Rayan, Nile Delta wetlands, Sinai mountain ranges",
            "Algeria — under-visited but rewarding; Tassili N'Ajjer for Sahara specialists",
            "Western Sahara / Mauritania — for serious birders chasing Saharan endemics",
          ],
        },
        {
          heading: "Logistics",
          bullets: [
            "Most birding guides in Morocco speak French; English availability is improving",
            "Standalone birding tours work well; pair with culture/ landscape interest for travelling partners",
            "Birding code of conduct matters in nesting deserts — keep distance from breeding pairs",
            "Bring a scope; many sites are at distance and identifications hinge on detail",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/seasonal-guides/bird-watching", label: "Africa Bird Watching Seasonal Guide" },
        { href: "/destinations/north-africa", label: "North Africa Destinations" },
        { href: "/resources/seasonal-guides/morocco", label: "Morocco Seasonal Guide" },
      ]}
    />
  )
}
