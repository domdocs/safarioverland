import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Community Conservation | Safari Overland",
  description:
    "How community-led conservancies and benefit-sharing models are reshaping African wildlife protection — examples, results and how travelers support the model.",
  keywords:
    "community conservation, conservancies, namibia conservancies, maasai mara conservancies, community-based natural resource management",
}

export default function CommunityConservationPage() {
  return (
    <GuidePage
      backHref="/resources/conservation"
      backLabel="Back to Conservation"
      heroImage="/images/conservation/community/community-conservation.jpg"
      heroAlt="Local community members participating in conservation"
      title="Community Conservation"
      subtitle="The most important shift in African conservation in fifty years has been giving communities the tools to manage their own wildlife."
      intro={
        <>
          <p className="mb-3">
            For most of the last century, African conservation worked on a fortress model — fences, parks, exclusion.
            That model produced spectacular wildlife pockets but left local people excluded, hostile or actively
            poaching. Community-based conservation flips the equation: communities own or co-manage land, earn directly
            from wildlife, and decide what survives.
          </p>
          <p>Where the model has been given time and resources, it has been transformative.</p>
        </>
      }
      sections={[
        {
          heading: "What a community conservancy is",
          body: (
            <p>
              A defined area of community-owned or community-managed land, governed by an elected committee, with the
              right to lease portions to tourism operators in exchange for revenue, employment and infrastructure.
              Wildlife use is regulated by the community itself within national laws.
            </p>
          ),
          bullets: [
            "Land remains under local ownership — usually communal or trust-held",
            "Revenue from tourism leases flows back via a transparent benefit-sharing formula",
            "Decisions about land use, grazing and wildlife are taken locally",
            "External NGOs typically support but do not run the conservancy",
          ],
        },
        {
          heading: "Where it's working",
          bullets: [
            "Namibia — 86 registered communal conservancies covering ~20% of the country; black rhino population trebled in two decades",
            "Maasai Mara conservancies (Kenya) — Mara Naboisho, Olare Motorogi, Naboisho and others — vehicles capped, livestock and wildlife coexist",
            "Northern Kenya — Northern Rangelands Trust supports ~40 community conservancies across pastoralist regions",
            "Botswana — community trusts manage Chobe Enclave, NG/CT zones, with tourism leases as primary income",
            "Ngorongoro Conservation Area Authority — co-management between Maasai pastoralists and the wildlife authority (politically complex)",
          ],
          callout: {
            title: "A simple test",
            body:
              "Ask any operator on conservancy land: how much per bednight goes to the community, and how is that money spent? The good ones will answer in seconds.",
          },
        },
        {
          heading: "What goes well — and what doesn't",
          bullets: [
            "Goes well: wildlife recovery on community land, dramatic poaching reduction, broader political support for conservation",
            "Goes well: education and healthcare investment funded by tourism leases",
            "Hard: equitable distribution of benefits within communities — elite capture is a real risk",
            "Hard: tourism downturns (COVID, instability) collapse the funding model overnight",
            "Hard: scaling beyond charismatic mega-fauna areas where tourism doesn't pay",
          ],
        },
        {
          heading: "How to choose conservancy-supporting trips",
          bullets: [
            "Stay in conservancy lodges, not just the headline national parks",
            "Ask whether your bed levy is publicly disclosed and where it goes",
            "Choose operators that employ from the host community, with transparent training programmes",
            "Read independent assessments — Long Run, Fair Trade Tourism, B Corp accreditations are signals not guarantees",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/conservation/anti-poaching", label: "Anti-Poaching" },
        { href: "/resources/conservation/economics", label: "Economics of Conservation" },
        { href: "/resources/conservation/funding", label: "Conservation Funding" },
      ]}
    />
  )
}
