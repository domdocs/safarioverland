import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Seasonal Packing Guide | Safari Overland",
  description:
    "How your safari packing list should change by season — dry winter mornings, wet-season layers, peak heat — region by region.",
  keywords: "safari seasonal packing, what to pack safari winter, safari rainy season, safari clothing by season",
}

export default function SeasonalPackingPage() {
  return (
    <GuidePage
      backHref="/resources/planning-guides"
      backLabel="Back to Planning Guides"
      heroImage="/images/planning-guides/packing/seasonal-packing.jpg"
      heroAlt="Seasonal safari packing essentials"
      title="Seasonal Packing Guide"
      subtitle="One safari packing list won't work for every month. Here's how to adjust by season and region."
      intro={
        <>
          <p className="mb-3">
            African safari weather is more varied than most travelers expect. June mornings in Botswana hover near
            freezing; January afternoons in the same place push 38°C with thunderstorms by 4pm. Pack for the calendar
            month, not the postcard.
          </p>
          <p>This guide breaks down what to add or subtract from a baseline packing list, season by season.</p>
        </>
      }
      sections={[
        {
          heading: "Dry winter (May–August, Southern & East Africa)",
          body: <p>Cool mornings, warm middays, cold nights. Game viewing peaks but you'll feel every layer.</p>,
          bullets: [
            "Insulated jacket or fleece — sub-10°C dawns are normal",
            "Beanie and gloves for early game drives",
            "Long-sleeved shirts and trousers in neutral, breathable fabrics",
            "Closed-toe shoes for camp; trail shoes for bush walks",
            "Sunscreen and lip balm — UV is high even when it feels cool",
          ],
          callout: {
            title: "Bush vehicles are open-sided",
            body:
              "Wind chill on a 6am drive in July can be brutal. Ask your operator if they provide blankets and ponchos — most premium camps do.",
          },
        },
        {
          heading: "Hot dry late spring (September–November)",
          body: (
            <p>
              The hottest months in much of the region. Game viewing is excellent — animals concentrate around water —
              but afternoons can be punishing.
            </p>
          ),
          bullets: [
            "Lightweight long sleeves to protect from sun without overheating",
            "A wide-brim hat with a chin strap (vehicles move; hats fly off)",
            "Electrolyte tablets — you sweat a lot more than you realise",
            "Light buff or scarf for dust protection at viewpoints and on transfers",
          ],
        },
        {
          heading: "Wet 'green' season (November–April)",
          body: (
            <p>
              Lush landscapes, dramatic skies, lower prices and fewer crowds. Showers tend to be intense but short —
              don't be put off, but pack for them.
            </p>
          ),
          bullets: [
            "Lightweight waterproof shell jacket — packable, breathable",
            "Quick-dry trousers and shirts; cotton stays wet for hours",
            "Waterproof bag or dry sack for camera gear and electronics",
            "Insect repellent with DEET or picaridin — mosquito populations spike",
            "Trail shoes that handle mud; spare pair to alternate",
          ],
        },
        {
          heading: "Region-specific notes",
          bullets: [
            "Namib desert (Namibia) — extreme day-night swing year-round; pack as if for two seasons",
            "Highland trekking (Uganda, Rwanda, Ethiopia) — cool and damp even in dry months; rain shell essential",
            "Coastal Mozambique / Zanzibar — humid; light linen and reef-safe sunscreen",
            "Sahara fringe (Morocco, Egypt south) — cold desert nights; pack a warm layer regardless of month",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/planning-guides/packing-list", label: "Ultimate Safari Packing List" },
        { href: "/resources/seasonal-guides", label: "Seasonal Guides Hub" },
        { href: "/resources/planning-guides/best-times", label: "Best Times to Visit" },
      ]}
    />
  )
}
