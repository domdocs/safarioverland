import type { Metadata } from "next"
import { GuidePage } from "@/components/guide-page"

export const metadata: Metadata = {
  title: "Before You Go: Safari Pre-Departure Checklist | Safari Overland",
  description:
    "A pre-departure checklist for African safari travelers — passports, visas, vaccinations, insurance, money, communications and final-week logistics.",
  keywords: "safari pre-departure, safari preparation, safari checklist, africa visa, safari vaccinations",
}

export default function BeforeYouGoPage() {
  return (
    <GuidePage
      backHref="/resources/planning-guides"
      backLabel="Back to Planning Guides"
      heroImage="/images/planning-guides/first-time-safari-guide.jpg"
      heroAlt="Preparing for a first African safari"
      title="Before You Go"
      subtitle="A pre-departure checklist that will save you a lot of last-minute scrambling."
      intro={
        <>
          <p className="mb-3">
            Safari logistics differ from most travel — vaccinations sometimes need months of lead time, certain visas
            are e-visas issued in days while others still require courier-and-passport submissions, and bush
            communications are intermittent at best. Plan backwards from your departure date.
          </p>
          <p>This guide groups the prep into checkpoints: 3 months out, 1 month out, the final week, and the day of.</p>
        </>
      }
      sections={[
        {
          heading: "3+ months before — the long-lead items",
          bullets: [
            "Check passport expiry — most African countries require 6 months' validity beyond your return date",
            "Confirm at least 2–3 blank pages per country you're visiting",
            "Book yellow fever vaccination if needed — some countries require a certificate, others not",
            "Start malaria prophylaxis discussion with your travel doctor — some need 1–2 weeks pre-trip",
            "Review hepatitis A/B, typhoid, rabies, tetanus boosters",
            "Lock down major reservations — peak-season camps book 9–12 months ahead",
          ],
          callout: {
            title: "Yellow fever certificate",
            body:
              "Several countries (Kenya, Tanzania, others) demand a yellow fever certificate at the border if you're arriving from a high-risk country, including transits over 12 hours. Carry the yellow card with your passport.",
          },
        },
        {
          heading: "1 month before — administration",
          bullets: [
            "Apply for e-visas (Kenya, Tanzania, Uganda, Rwanda, Egypt) — usually 2–10 days to issue",
            "Buy comprehensive travel insurance covering medical evacuation in remote areas",
            "Confirm internal flight bookings and weight limits — bush planes often cap at 15kg in soft bags",
            "Notify your bank and card provider of travel dates",
            "Order USD cash in clean, post-2013 small denominations — many border posts and tip envelopes prefer USD",
            "Double-check accommodation confirmations and re-confirm dietary needs",
          ],
        },
        {
          heading: "Final week — logistics",
          bullets: [
            "Print every important document twice — paper copies still matter at borders",
            "Save offline copies of itinerary, insurance and emergency contacts on your phone",
            "Pack medications in carry-on, in original packaging",
            "Charge all batteries; check plug adapters (Type D, M, G are common)",
            "Download offline maps of your destinations on Google Maps and a backup like maps.me",
            "Inform a trusted contact at home of your full itinerary, lodge phone numbers, insurance hotline",
          ],
        },
        {
          heading: "Day of departure",
          bullets: [
            "Arrive at the international airport 3 hours early — long-haul to Africa often has slow check-in",
            "Carry all camera/electronic gear in your hand luggage; never check it",
            "Wear or carry warmer layers — overnight flights are cold and bush mornings are colder",
            "Keep a small \"first 24 hours\" pouch — sunscreen, repellent, basic meds, sunglasses — accessible",
            "Take a clear photo of your checked-bag tags in case of a lost-luggage claim",
          ],
        },
        {
          heading: "Communications",
          bullets: [
            "Buy a local eSIM (Airalo, Holafly) before flying — works the moment you land",
            "WhatsApp and basic email work on most lodge Wi-Fi; video calls often don't",
            "If you genuinely need connectivity in remote camps, ask the operator about Starlink — increasingly common",
            "Tell people at home that bush days = no signal; expect to be dark for hours at a time",
          ],
        },
      ]}
      ctaTitle="Want a custom checklist for your trip?"
      ctaBody="Different routes have different requirements. Tell us your itinerary and we can flag the country-specific steps that matter for you."
      ctaHref="/contact"
      ctaLabel="Contact our planners"
      relatedLinks={[
        { href: "/resources/planning-guides/packing-list", label: "Ultimate Safari Packing List" },
        { href: "/resources/planning-guides/what-to-pack", label: "What to Pack — Quick Reference" },
        { href: "/resources/safety-tips", label: "Safari Safety Tips" },
      ]}
    />
  )
}
