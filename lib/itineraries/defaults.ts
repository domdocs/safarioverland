import type { PracticalCard } from "./types"

/**
 * Default practical cards copied onto a new itinerary at creation time.
 *
 * These match the six fixed cards in the source-prototype but are
 * intentionally trip-agnostic copy — the curator edits them per trip.
 * Editing in place is the expected workflow; the cards aren't locked.
 */
export const DEFAULT_PRACTICALS: PracticalCard[] = [
  {
    title: "Included",
    body: "All accommodation on a fully-inclusive basis (meals, house drinks, scheduled activities, park and conservation fees). Internal flights and road transfers between camps. Airport meet-and-greet at both ends.",
  },
  {
    title: "Not included",
    body: "International flights to and from Africa. Travel insurance. Premium drinks and spa treatments. Tipping at lodges and for guides (we'll suggest amounts in your pre-trip notes). Visas where applicable.",
  },
  {
    title: "Weather",
    body: "Dry season runs roughly May to October across most safari regions — clear skies, cool mornings, warm afternoons, game concentrating at water sources. Green season (November to April) brings dramatic skies, newborn animals, and noticeably lower rates with the trade-off of taller grass.",
  },
  {
    title: "Packing, in essence",
    body: "Neutral colours (khaki, olive, stone), layers for cold dawn drives, a warm fleece, a wide-brimmed hat, polarised sunglasses, high-SPF sunscreen, insect repellent with DEET or picaridin, a soft duffel rather than a hard case (bush flights have strict baggage rules, usually 15-20kg).",
  },
  {
    title: "Health & visas",
    body: "Speak to a travel-medicine clinic 6-8 weeks before flying — they'll match your itinerary to the right malaria prophylaxis. Yellow fever certificate is mandatory in several countries. Visa requirements vary by passport; e-visas now cover most of the major safari countries.",
  },
  {
    title: "On the ground",
    body: "Niels van de Meer is the planning contact and the person you'll speak to on the ground in Victoria Falls. niels@safarioverland.com is the direct line. We're WhatsApp-reachable for any logistical questions before and during your trip.",
  },
]

export const DEFAULT_CURATOR_NAME = "Niels van de Meer"
export const DEFAULT_CURATOR_TITLE = "Curator, Safari Overland"
export const DEFAULT_CURATOR_LOCATION = "Victoria Falls, Zimbabwe"
