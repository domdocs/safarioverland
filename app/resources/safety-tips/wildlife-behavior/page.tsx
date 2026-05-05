import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Wildlife Behavior on Safari | Safari Overland",
  description:
    "How to read wildlife behaviour on safari — recognising stress, threat displays and safe distances for the species you're most likely to encounter.",
  keywords:
    "wildlife behavior safari, animal body language, safari safety wildlife, lion behaviour, elephant warning signs, hippo danger",
}

export default function WildlifeBehaviorPage() {
  return (
    <GuidePage
      backHref="/resources/safety-tips"
      backLabel="Back to Safety Tips"
      title="Wildlife Behavior"
      subtitle="The single most useful safety skill on safari is reading what an animal is telling you."
      intro={
        <>
          <p className="mb-3">
            Most dangerous wildlife encounters happen because someone misread the animal's body language. Africa's
            big game gives clear, repeated signals before any aggressive act — but only if you know what you're
            looking for.
          </p>
          <p>
            This guide covers the species you're most likely to encounter and what their behaviour actually means.
            None of this replaces a qualified guide; it complements one.
          </p>
        </>
      }
      sections={[
        {
          heading: "The general rule",
          body: (
            <p>
              Wild animals usually don't want to engage with you. Most "attacks" are defensive — a startled animal,
              a perceived threat to young, a cornered escape. Give space, stay quiet, and let the animal decide it
              has options.
            </p>
          ),
          bullets: [
            "Calm posture, regular feeding or moving = relaxed",
            "Stillness, head up, ears swivelling toward you = aware and assessing",
            "Stiff legs, raised tail, body angled = increasingly uncomfortable",
            "Mock charges, vocal warnings, fluffing or flaring = explicit warning to retreat",
          ],
        },
        {
          heading: "Elephants",
          bullets: [
            "Relaxed: feeding calmly, ears flapping (cooling), tail swishing slowly",
            "Aware: head up, trunk raised to scent, slow turn to face you",
            "Warning: ears flared wide, head shake, dust thrown, mock charge",
            "Real charge: ears tucked back, trunk curled, head down — this is the one to take seriously",
            "Bulls in musth (hormonal phase, dark fluid down the temples) are unpredictable; give double the usual distance",
          ],
          callout: {
            title: "If your guide reverses fast",
            body:
              "Trust them. Elephant charges escalate in seconds, and the right call is to be 50 metres further away two seconds ago.",
          },
        },
        {
          heading: "Lions",
          bullets: [
            "In a vehicle, lions usually treat the car as a non-threatening shape — do not stand up or break the silhouette",
            "Direct eye contact is fine from a vehicle; standing or moving toward them is not",
            "On foot, lions hunt by ambush — never approach, especially at dawn or dusk",
            "If lions appear stressed (low growl, flattened ears, lashing tail), back away immediately",
            "A pride with cubs is the highest-risk encounter — the adults will defend young aggressively",
          ],
        },
        {
          heading: "Buffalo",
          body: (
            <p>
              Often listed as the most dangerous of the Big Five for walking encounters. Old solitary bulls
              ("dagga boys") are particularly unpredictable.
            </p>
          ),
          bullets: [
            "Relaxed buffalo are slow, deliberate grazers",
            "Single bulls staring directly at you, head raised: high alert",
            "Herd movement away in a tight bunch: stress",
            "Buffalo charge low and committed — climbing a tree is the textbook response on foot",
          ],
        },
        {
          heading: "Hippos",
          bullets: [
            "Cause more human deaths in Africa than any other large mammal",
            "Most attacks happen at dawn and dusk on the path between water and grazing land",
            "Yawning displays mouth as a threat — not relaxation",
            "Never get between a hippo and water; that's the reflex they defend",
            "On boats, give wide berth to floating heads — they can be on you in seconds",
          ],
        },
        {
          heading: "Crocodiles",
          bullets: [
            "Active mostly at dawn and dusk near water edges",
            "Rule one: stay away from any river or lake edge. There is no safe distance assumption",
            "Even small streams can hold large crocodiles",
            "Take guides' instructions on water-edge activities (fishing, photography) absolutely literally",
          ],
        },
        {
          heading: "Leopards, cheetahs and smaller cats",
          bullets: [
            "Solitary, generally avoidant; rarely a danger from a vehicle",
            "Leopards in trees with kills are at peak relaxation — keep noise down to keep the sighting",
            "Cheetahs are relatively shy of vehicles; never approach on foot",
            "Smaller cats (caracal, serval) are wary; sightings are quick — be ready",
          ],
        },
        {
          heading: "Wild dogs and hyenas",
          bullets: [
            "Wild dogs at a kill or den are intensely focused; vehicles are tolerated, anything else is not",
            "Hyenas at scavenging sites can be bold around vehicles — keep arms inside, no food on the deck",
            "Hyenas around camp at night are normal in many parks; do not stand out of your tent if you hear them close",
          ],
        },
        {
          heading: "Snakes and small wildlife",
          bullets: [
            "Most snakebites happen because someone stepped onto a snake; watch where you walk, especially at night with a torch",
            "Black mambas are fast and serious; back away slowly without sudden movement",
            "Spitting cobras aim for eyes — sunglasses help; if hit, irrigate eyes immediately and seek medical help",
            "Scorpions in tents — shake out shoes and clothes in the morning",
            "Spiders — generally over-feared. Few African species cause serious injury",
          ],
        },
        {
          heading: "When something goes wrong",
          bullets: [
            "Follow your guide's instructions immediately and without question",
            "Don't run from cats, dogs or hyenas — running triggers the chase response",
            "Stand your ground, raise arms to look bigger, make noise — opposite of what feels right but more often correct",
            "Fall onto your stomach with hands behind neck if charged by buffalo (last resort)",
            "Report any incident to lodge management; near-misses help train the next group",
          ],
        },
      ]}
      relatedLinks={[
        { href: "/resources/safety-tips", label: "All Safety Tips" },
        { href: "/resources/conservation/responsible-practices", label: "Responsible Practices" },
        { href: "/resources/planning-guides/before-you-go", label: "Before You Go" },
      ]}
    />
  )
}
