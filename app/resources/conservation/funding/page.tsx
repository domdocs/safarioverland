import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Conservation Funding in Africa | Safari Overland",
  description:
    "Where conservation money comes from, where it goes, and how individual travelers can contribute meaningfully — vetted organisations and giving strategies.",
  keywords:
    "conservation funding, africa wildlife donations, conservation NGOs, where to donate africa wildlife, sustainable conservation finance",
}

export default function FundingPage() {
  return (
    <GuidePage
      backHref="/resources/conservation"
      backLabel="Back to Conservation"
      heroImage="/images/conservation/economic/conservation-funding.jpg"
      heroAlt="Conservation funding flowing into protected areas"
      title="Conservation Funding"
      subtitle="Where the money comes from, where it goes, and how to make your contribution count."
      intro={
        <>
          <p className="mb-3">
            African conservation runs on a complex stack of finance — government, tourism, philanthropy, NGOs, and a
            growing set of innovative instruments. Individual donations are a small slice of the total, but per dollar
            they often have outsized impact, especially for under-funded species and frontline ranger work.
          </p>
          <p>This guide tells you where to give and how to think about whether it's working.</p>
        </>
      }
      sections={[
        {
          heading: "Where to give — proven, large operators",
          bullets: [
            "African Parks — manages 22+ parks across 12 countries; rebuilds collapsed wildlife systems at scale",
            "African Wildlife Foundation — long-running, broad-scope, particularly strong on community work",
            "Frankfurt Zoological Society — deep technical work, particularly Serengeti, Selous and Mahale",
            "WCS, WWF — global organisations with substantial Africa programmes",
            "TUSK Trust — UK-based, funds 60+ smaller field projects across the region",
          ],
        },
        {
          heading: "Where to give — frontline specialists",
          bullets: [
            "Save the Rhino — supports rhino monitoring across multiple range states",
            "Painted Dog Conservation — wild dog protection in Zimbabwe",
            "Akashinga (IAPF) — all-female anti-poaching units in Zimbabwe",
            "Black Mambas — pioneering all-female ranger unit in South Africa",
            "Tsavo Trust — anti-poaching and aerial surveillance in Tsavo",
            "Pangolin Conservation Network — most-trafficked mammal, very under-funded",
            "VulPro — vulture rescue and rehabilitation in South Africa",
          ],
          callout: {
            title: "Recurring beats one-off",
            body:
              "A $20/month commitment compounds into reliable budget that lets organisations plan and hire. A $250 one-off donation is welcome but harder to operationalise.",
          },
        },
        {
          heading: "How to evaluate an organisation",
          bullets: [
            "Audited financials available publicly (look for 80%+ to programme work; under 70% is a flag)",
            "Named field projects with measurable outputs — populations counted, hectares protected, cases prosecuted",
            "Local presence and leadership — diaspora-led NGOs without African staff are a flag",
            "Years of operation and track record through political/economic shocks",
            "Independent ratings on Charity Navigator, GiveWell, or platform equivalents",
          ],
        },
        {
          heading: "Less common but high-leverage giving",
          bullets: [
            "Ranger welfare and family support funds — chronically underfunded",
            "Veterinary teams that handle snare removal, dehornings, capture operations",
            "Translocation costs — helicopters, sedation drugs, telemetry collars, bomas",
            "Community livelihoods — beekeeping, predator-proof bomas, women's cooperatives",
            "University scholarships in conservation biology and protected-area management",
          ],
        },
        {
          heading: "Beyond direct donation",
          bullets: [
            "Sponsor a ranger's annual salary — typically $5,000–$8,000",
            "Adopt a collared animal — ongoing telemetry funding for individual rhinos, elephants, lions",
            "Bequest planning — many NGOs accept legacy giving",
            "Skill-based volunteering remotely — GIS, comms, fundraising help",
            "Talk about it — donations track public attention, especially from major donors",
          ],
        },
      ]}
      ctaTitle="Want help choosing where to give?"
      ctaBody="If you've travelled with us or are planning to, tell us what species or region you care about. We can suggest field projects with track records to match."
      ctaHref="/contact"
      ctaLabel="Get in touch"
      relatedLinks={[
        { href: "/resources/conservation/economics", label: "Economics of Conservation" },
        { href: "/resources/conservation/anti-poaching", label: "Anti-Poaching" },
        { href: "/resources/conservation/endangered-species", label: "Endangered Species" },
      ]}
    />
  )
}
