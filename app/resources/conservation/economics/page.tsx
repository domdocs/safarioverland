import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "The Economics of Conservation | Safari Overland",
  description:
    "How wildlife conservation is funded across Africa — tourism revenue, philanthropy, government budgets, and the gap between income and need.",
  keywords:
    "conservation economics, africa wildlife economy, tourism conservation revenue, conservation funding gap, sustainable financing",
}

export default function EconomicsPage() {
  return (
    <GuidePage
      backHref="/resources/conservation"
      backLabel="Back to Conservation"
      title="The Economics of Conservation"
      subtitle="Wildlife conservation is, before everything else, a financial problem."
      intro={
        <>
          <p className="mb-3">
            Africa's protected areas need an estimated $1–2 billion a year more than they currently receive to
            function effectively. The gap is filled — partially — by a patchwork of tourism revenue, international
            philanthropy, government allocations, NGO grants and a small number of innovative finance instruments.
          </p>
          <p>This guide explains how the money actually flows and where it falls short.</p>
        </>
      }
      sections={[
        {
          heading: "The funding mix today",
          bullets: [
            "Tourism — the largest single source for many parks; collapsed during COVID",
            "Government allocations — small as a share of GDP in most range states; high political volatility",
            "International donors — bilateral aid, EU, USAID, GEF, KfW",
            "Conservation NGOs — African Parks, AWF, FZS, WWF, WCS, TNC, etc.",
            "Philanthropy — high-net-worth individuals and foundations, increasing rapidly",
            "Newer instruments — wildlife conservation bonds, biodiversity offsets, REDD+ carbon credits",
          ],
        },
        {
          heading: "What tourism revenue actually does",
          body: (
            <p>
              In well-managed reserves, tourism revenue covers the bulk of operational costs — ranger salaries, vehicle
              fuel, fence maintenance, community benefit-sharing. In less-visited reserves, it covers a fraction. The
              gap is what donor and philanthropic capital tries to bridge.
            </p>
          ),
          bullets: [
            "Park entry fees — direct income for the wildlife authority",
            "Concession fees from lodges — revenue tied to land use",
            "Bednight or community levies — explicit benefit-sharing with local people",
            "Permits (gorilla, chimp, big-game) — high-value, low-volume revenue",
            "Indirect income — VAT, employment taxes, supplier income flowing into the regional economy",
          ],
          callout: {
            title: "The COVID lesson",
            body:
              "When tourism stopped overnight in 2020, anti-poaching units in dozens of reserves came within weeks of insolvency. Diversifying funding away from a pure tourism model is now an urgent industry priority.",
          },
        },
        {
          heading: "The funding gap",
          bullets: [
            "Less than 25% of Africa's protected areas have funding sufficient for basic management",
            "Ranger salaries across the region average $200–$400/month — high attrition, dangerous work",
            "Equipment, vehicles and infrastructure are systematically under-funded",
            "Newly created reserves often launch without operational budgets at all",
          ],
        },
        {
          heading: "Innovations to watch",
          bullets: [
            "Rhino impact bonds — pay-for-success financing tied to population growth",
            "Blue economy bonds for marine protected areas",
            "Carbon and biodiversity credits from large landscape projects",
            "Public-private park management partnerships (African Parks model)",
            "Insurance-linked weather and disaster policies for community wildlife funds",
          ],
        },
        {
          heading: "What travelers can do beyond the trip",
          bullets: [
            "Donate directly to vetted operators or NGOs — small recurring amounts compound",
            "Choose lodges and operators with transparent benefit-sharing data",
            "Buy carbon offsets through accredited African projects, not generic global schemes",
            "Advocate at home — most travelers underestimate how political donor funding is",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/conservation/funding", label: "Conservation Funding" },
        { href: "/resources/conservation/sustainable-tourism", label: "Sustainable Tourism" },
        { href: "/resources/conservation/community-conservation", label: "Community Conservation" },
      ]}
    />
  )
}
