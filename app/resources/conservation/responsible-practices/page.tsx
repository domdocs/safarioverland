import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Responsible Safari Practices | Safari Overland",
  description:
    "Practical, day-to-day responsible behaviour on safari — for travelers, guides and lodges. What to do, what to avoid, and why each rule exists.",
  keywords:
    "responsible safari, safari etiquette, ethical safari practices, wildlife viewing rules, leave no trace safari",
}

export default function ResponsiblePracticesPage() {
  return (
    <GuidePage
      backHref="/resources/conservation"
      backLabel="Back to Conservation"
      heroImage="/images/conservation/traveler/responsible-safari.jpg"
      heroAlt="Responsible safari practices in the field"
      title="Responsible Practices"
      subtitle="The day-to-day behaviour that adds up to either an ethical safari industry or one that doesn't deserve to exist."
      intro={
        <>
          <p className="mb-3">
            Most travelers want to do the right thing. The problem is that "the right thing" on safari is unfamiliar
            — different from a city break, different from a beach holiday, and different from how social-media wildlife
            content is often presented. This guide is the short, practical version.
          </p>
        </>
      }
      sections={[
        {
          heading: "At a wildlife sighting",
          bullets: [
            "Stay in the vehicle unless your guide explicitly says otherwise — your safety depends on it",
            "Speak quietly. Animals tolerate the rumble of an engine far better than human voices",
            "No flash photography on game drives — particularly with predators and at night",
            "Let the guide position the vehicle. Stop asking to get closer; trust the framing",
            "If multiple vehicles are at a sighting, leave when the others are still arriving — share the space",
            "Never throw food or anything else from the vehicle",
          ],
          callout: {
            title: "The 'one more shot' problem",
            body:
              "The most common ethical breach on safari is staying too long, too close, with too many vehicles. The animal pays for it in stress and behaviour change. A great guide will leave a sighting before you want to.",
          },
        },
        {
          heading: "On foot",
          bullets: [
            "Single file behind the lead guide; never overtake",
            "Wear muted colours; no perfume or scented sunscreen",
            "Follow hand signals — if the guide stops, you stop",
            "If you encounter dangerous game, stay still and silent. Do not run",
            "Pack out everything you bring in, including biodegradable waste",
          ],
        },
        {
          heading: "At camps and lodges",
          bullets: [
            "Refill water bottles rather than buying plastic",
            "Reuse towels and linen — most camps now ask you to flag if you want them changed",
            "Conserve water and electricity; many camps run on solar with limited capacity",
            "Don't leave food in your tent or on the deck — it attracts wildlife and creates conflict",
            "Lock and zip your tent before leaving for game drives",
          ],
        },
        {
          heading: "Tipping",
          bullets: [
            "Tip in USD where possible; small clean bills",
            "Guides directly: $15–$25 per guest per day",
            "Trackers: $10–$15 per guest per day",
            "General staff envelope: $10–$15 per guest per day, distributed by the lodge",
            "Tip on the last morning, in person where you can",
          ],
        },
        {
          heading: "Cultural visits",
          bullets: [
            "Ask before photographing people; respect a 'no'",
            "Don't hand out sweets or pens to children — funnel through schools or community programmes instead",
            "Buy crafts directly from makers at fair prices; don't haggle aggressively for the experience",
            "Treat villages and homes as you'd want yours to be treated",
            "Listen more than you ask, and ask better questions when you do",
          ],
        },
        {
          heading: "Online afterwards",
          bullets: [
            "Don't geotag specific sightings of high-value species (rhinos especially) — poachers monitor social media",
            "Avoid posting images that imply close human-animal contact unless it's clearly explained",
            "If you saw something concerning — operator behaviour, animal stress — flag it constructively to the operator and to platforms like ours",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/conservation/ethical-operators", label: "Ethical Operators" },
        { href: "/resources/conservation/sustainable-tourism", label: "Sustainable Tourism" },
        { href: "/resources/safety-tips", label: "Safari Safety Tips" },
      ]}
    />
  )
}
