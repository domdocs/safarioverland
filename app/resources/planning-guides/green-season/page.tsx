import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Green Season Safari Benefits | Safari Overland",
  description:
    "Why the wet 'green' season is a smart choice for many safari travelers — lower prices, dramatic skies, baby animals and birds in breeding plumage.",
  keywords: "green season safari, wet season africa, safari low season, emerald season, off-peak safari",
}

export default function GreenSeasonPage() {
  return (
    <GuidePage
      backHref="/resources/planning-guides"
      backLabel="Back to Planning Guides"
      heroImage="/images/planning-guides/timing/green-season.jpg"
      heroAlt="Lush African landscape during green season"
      title="Green Season Safari Benefits"
      subtitle="The off-peak case: lower prices, fewer vehicles, and a bush that looks nothing like the postcards."
      intro={
        <>
          <p className="mb-3">
            Most safari marketing pushes the dry months. Animals concentrate at water, foliage is sparse, and big-five
            sightings come easily. But "best for spotting predators" isn't the only reason to come to Africa — and the
            green season has advantages most travelers underestimate.
          </p>
          <p>Here's what you trade and what you gain when you choose to travel in the wet.</p>
        </>
      }
      sections={[
        {
          heading: "What 'green season' actually means",
          body: (
            <p>
              In Southern Africa, broadly November to April. In East Africa, March to May (long rains) and a shorter
              break in October–November (short rains). It does not mean constant rain — most days you'll get a
              spectacular afternoon thunderstorm, then clear skies again.
            </p>
          ),
        },
        {
          heading: "What you gain",
          bullets: [
            "Prices typically 25–45% lower than dry-season rates",
            "Fewer vehicles at sightings — a private experience even in popular parks",
            "Calving and birthing season — newborn impalas, wildebeest and zebras in numbers",
            "Resident migrant birds in full breeding plumage; serious birding peaks now",
            "Photographic conditions improve — dramatic clouds, rain-washed air, lush foreground",
            "Better availability — top camps that book a year out are bookable inside weeks",
          ],
        },
        {
          heading: "What you trade",
          bullets: [
            "Game viewing requires more patience — animals disperse with surface water",
            "Some lodges close for the wettest months (especially in Mana Pools, South Luangwa)",
            "Road access in remote areas can be limited — fly-in is sometimes the only option",
            "Mosquito populations spike — anti-malarial discipline matters more",
            "Some activities (bush walking) limited by terrain and visibility",
          ],
          callout: {
            title: "Where green season works best",
            body:
              "South Africa private reserves (Kruger area), Kenya (short rains in Nov), Madikwe and Pilanesberg, and Etosha during the early wet (Jan–Feb) all hold their own brilliantly during green months.",
          },
        },
        {
          heading: "Best green-season experiences",
          bullets: [
            "Calving in the southern Serengeti (Jan–Feb) — peak predator action",
            "Liuwa Plains, Zambia (Nov–Feb) — wildebeest migration, vast empty plains",
            "Madagascar (Nov–Mar) — lemurs and reptiles most active",
            "Birding in the Okavango Panhandle (Dec–Mar) — Pel's fishing owl, slaty egret",
            "Iconic landscape photography in Namibia — green Sossusvlei is rare and otherworldly",
          ],
        },
        {
          heading: "Practical packing additions",
          bullets: [
            "Lightweight waterproof shell jacket",
            "Quick-dry clothing — cotton stays soaked",
            "Dry bag for camera gear, phone and documents",
            "Insect repellent with DEET 30%+ or picaridin",
            "Antimalarial regimen confirmed with your doctor",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/planning-guides/best-times", label: "Best Times to Visit" },
        { href: "/resources/planning-guides/seasonal-packing", label: "Seasonal Packing Guide" },
        { href: "/resources/planning-guides/budgeting", label: "Safari Budgeting Guide" },
      ]}
    />
  )
}
