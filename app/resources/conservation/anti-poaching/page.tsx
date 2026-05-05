import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Anti-Poaching in African Conservation | Safari Overland",
  description:
    "How anti-poaching operations protect African wildlife — ranger units, technology, intelligence networks, and how travelers contribute through ethical operator choice.",
  keywords: "anti-poaching, rhino poaching, elephant poaching, ranger units, wildlife crime africa",
}

export default function AntiPoachingPage() {
  return (
    <GuidePage
      backHref="/resources/conservation"
      backLabel="Back to Conservation"
      title="Anti-Poaching"
      subtitle="The frontline of African wildlife conservation — and the work most visitors never see."
      intro={
        <>
          <p className="mb-3">
            Poaching has plummeted in some regions and ticked back up in others over the past decade. Behind the
            headlines are thousands of rangers, intelligence officers and community informants doing dangerous,
            unglamorous work that determines whether species like rhino and pangolin still exist in twenty years.
          </p>
          <p>This guide explains how anti-poaching actually works and how visitors can support it.</p>
        </>
      }
      sections={[
        {
          heading: "What anti-poaching looks like on the ground",
          bullets: [
            "Ranger patrols on foot, vehicle, horse and helicopter — typically 21 days on, 7 off",
            "Camera traps and drone surveillance over hotspots and fence lines",
            "K9 units — dogs trained to detect ammunition, ivory and rhino horn",
            "Intelligence networks reaching into supply chains and trafficking routes",
            "Forensic and prosecutorial support to convert arrests into convictions",
          ],
        },
        {
          heading: "What's working",
          bullets: [
            "Rhino poaching in South Africa down ~70% from 2014 peak; still serious but a real shift",
            "Community-based reporting — local informants are now the leading source of intelligence",
            "Mass-translocation programmes have re-seeded extirpated populations across Mozambique, Zambia, Rwanda",
            "Tech-led units (e.g. EarthRanger, SMART) make patrols smarter rather than just bigger",
          ],
          callout: {
            title: "Why community matters most",
            body:
              "Wildlife crime is a community-level problem before it's a wildlife problem. Reserves where local people earn meaningfully from tourism see dramatically less poaching than those where they don't.",
          },
        },
        {
          heading: "What's still hard",
          bullets: [
            "Pangolin trafficking is now the largest wildlife crime by volume — and underfunded",
            "Bushmeat poaching for protein, not horn or ivory, is harder to tackle and far larger in scale",
            "Cross-border syndicates exploit weak prosecutorial systems",
            "Ranger welfare, mental health and pay remain chronically poor across the region",
          ],
        },
        {
          heading: "How travelers contribute",
          bullets: [
            "Choose operators that channel a defined portion of revenue to anti-poaching units",
            "Stay in private concessions and conservancies where rangers fund the work",
            "Donate directly to vetted units (Black Mambas, Akashinga, Tsavo Trust, others)",
            "Avoid buying any wildlife product, including 'antique' ivory, regardless of origin",
            "Report suspicious activity in or near reserves to your guide or lodge",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/conservation/community-conservation", label: "Community Conservation" },
        { href: "/resources/conservation/endangered-species", label: "Endangered Species" },
        { href: "/resources/conservation/funding", label: "Conservation Funding" },
      ]}
    />
  )
}
