import type { Metadata } from "next"
import Link from "next/link"
import type { ReactNode } from "react"
import { ChevronDown } from "lucide-react"

import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { NewsletterForm } from "@/components/newsletter-form"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Safari Overland",
  description:
    "Practical answers to the most common questions about planning an African safari — covering costs, safety, logistics, and what to expect on the ground.",
  keywords: [
    "safari FAQs",
    "African safari planning",
    "safari costs",
    "safari safety",
    "safari logistics",
  ],
}

type Faq = { q: string; a: ReactNode }

const planningFaqs: Faq[] = [
  {
    q: "What is the best time of year to go on safari?",
    a: (
      <>
        Most East and Southern African parks have a dry season (roughly June to October) that is widely considered the
        prime game-viewing window — vegetation thins out, animals concentrate at remaining water sources, and roads are
        easier to travel. The green season (November to April in most regions) brings dramatic skies, newborn animals,
        excellent birding, and noticeably lower rates, with the trade-off of taller grass and occasional washouts. For a
        country-by-country breakdown, our{" "}
        <Link href="/resources/seasonal-guides" className="text-amber hover:text-amber-deep transition-colors">
          seasonal guides
        </Link>{" "}
        explain what each month looks like across the major destinations.
      </>
    ),
  },
  {
    q: "How far in advance should I book my safari?",
    a: (
      <>
        For peak-season trips (July to October) and any itinerary involving small camps or gorilla trekking, 9 to 12
        months ahead is normal — the best lodges have very few rooms and book up early. For shoulder and green-season
        travel you can usually plan 4 to 6 months out without losing much choice. Last-minute bookings inside 60 days
        are sometimes possible, but expect more compromises on lodge selection and routing.
      </>
    ),
  },
  {
    q: "How do I choose between Kenya, Tanzania, Botswana, South Africa, and the rest?",
    a: (
      <>
        Each destination has a distinct character. Kenya and Tanzania are the classic Big Five and Great Migration
        circuits, with iconic open plains and a mature lodge network. Botswana is wilder and more water-based — think
        Okavango Delta mokoro trips and remote tented camps — and tends to sit at a higher price point. South Africa is
        the easiest first-time option: malaria-free private reserves, excellent infrastructure, and short flights. Add
        Rwanda or Uganda if gorilla trekking is the priority, and Zambia or Zimbabwe for walking safaris and Victoria
        Falls.
      </>
    ),
  },
  {
    q: "Are safaris suitable for families with young children?",
    a: (
      <>
        Yes, but the destination matters. Many private reserves in South Africa welcome children from any age and run
        dedicated kids&apos; programs, while some classic East African camps set minimums of 6, 8, or even 12 years old for
        game drives. Family-friendly lodges typically offer interconnecting rooms, shorter activities, and child-suited
        meals. If you&apos;re traveling with children under 12, ask about minimum ages before falling in love with a
        specific camp.
      </>
    ),
  },
  {
    q: "Is solo travel realistic on safari?",
    a: (
      <>
        Very much so. Group lodge stays are inherently social — meals are often communal, and game drives are shared
        with other guests — so solo travelers rarely feel isolated. The main consideration is the single supplement,
        which can add 25 to 100% to the per-person price. Some operators waive or reduce supplements during shoulder
        seasons, and small-group set-departure tours are a budget-friendly alternative.
      </>
    ),
  },
  {
    q: "How do gorilla trekking permits work?",
    a: (
      <>
        Permits are issued by the national parks authorities in Rwanda (currently the most expensive), Uganda (more
        affordable, with longer treks), and the DRC. They&apos;re limited daily and bookable through licensed operators
        well in advance — 6 to 12 months for high-season dates is sensible. Permits are tied to a specific date and
        non-transferable, so build them into your itinerary first and shape the rest of the trip around them.
      </>
    ),
  },
  {
    q: "How long should a first safari be?",
    a: (
      <>
        Aim for at least 7 nights on the ground, ideally split across two or three different camps or ecosystems.
        Anything shorter and you&apos;ll spend a disproportionate share of the trip on transfers and arrival admin. Ten to
        fourteen nights is the sweet spot for a classic multi-park itinerary, leaving room for a coastal or Victoria
        Falls extension at the end.
      </>
    ),
  },
]

const costFaqs: Faq[] = [
  {
    q: "What does a safari typically cost per day?",
    a: (
      <>
        Budget overland and camping safaris generally start around USD 150 to 250 per person per day. Mid-range
        lodge-based trips usually fall in the USD 350 to 700 range, and high-end fly-in safaris with small luxury camps
        commonly run from USD 800 to well over USD 1,500 per day. Botswana and remote conservancy camps sit at the
        upper end; South Africa and parts of Kenya offer the broadest mid-range options.
      </>
    ),
  },
  {
    q: "What is usually included in a quoted safari price?",
    a: (
      <>
        Most lodge rates are quoted on a fully-inclusive basis: accommodation, all meals, scheduled game activities,
        park fees, and house drinks. Mid- and budget-tier operators may quote bed-and-breakfast or half-board, with
        activities and park fees added separately. International flights, visas, travel insurance, premium drinks, and
        tipping are almost never included — always read the inclusions list line by line before comparing prices.
      </>
    ),
  },
  {
    q: "What hidden costs should I budget for?",
    a: (
      <>
        Common extras include conservancy and park fees (sometimes USD 80 to 150 per person per day), light-aircraft
        transfers between parks, premium activities like balloon flights or walking safaris, single supplements, visa
        fees, and tips. A useful rule of thumb is to budget an additional 10 to 15% on top of the headline price for
        ground-level extras.
      </>
    ),
  },
  {
    q: "How do deposits and cancellation policies work?",
    a: (
      <>
        Operators typically take a 25 to 30% deposit at booking and the balance 60 to 90 days before travel. Inside
        that final window, cancellation penalties step up sharply, often reaching 100% in the last 30 days. Gorilla
        permits and some flight tickets are non-refundable from the moment they&apos;re issued. This is one of the strongest
        arguments for comprehensive trip-cancellation insurance.
      </>
    ),
  },
  {
    q: "How much should I tip on safari?",
    a: (
      <>
        Tipping norms vary, but a common guideline is USD 10 to 20 per guest per day for your guide, USD 5 to 10 per
        guest per day for camp staff via a communal tip box, and a separate gratuity for any private trackers or
        butlers. Tips are usually given in USD cash at the end of your stay. Your operator&apos;s pre-trip notes will give
        you their specific recommendations.
      </>
    ),
  },
  {
    q: "Is travel insurance worth it for a safari?",
    a: (
      <>
        For a safari, comprehensive insurance is essentially non-negotiable. Look for cover that includes medical
        evacuation from remote areas (preferably with no upper geographic limit), trip cancellation matching the value
        of your booking, and adequate baggage cover. Some camps in remote regions actively require proof of evacuation
        membership, such as AMREF Flying Doctors, before arrival.
      </>
    ),
  },
]

const safetyFaqs: Faq[] = [
  {
    q: "Do I need to take malaria prophylaxis?",
    a: (
      <>
        Most classic safari areas in East and Southern Africa are malaria zones, with the main exceptions being
        higher-altitude parts of South Africa, Namibia, and the Eastern Cape. Speak to a travel-medicine clinic well
        before you fly — they&apos;ll match your itinerary and medical history to the right prophylaxis. In addition, plan
        on long sleeves at dusk, repellent with DEET or picaridin, and the insecticide-treated nets that virtually
        every camp provides.
      </>
    ),
  },
  {
    q: "What vaccinations should I have?",
    a: (
      <>
        Routine vaccinations should be up to date, and yellow fever is mandatory for entry to several countries if
        you&apos;re arriving from a yellow-fever-risk country (the certificate is checked at the border). Hepatitis A,
        typhoid, and tetanus are commonly recommended; rabies is sometimes added for longer trips or remote routing.
        Always confirm with a travel clinic 6 to 8 weeks before departure, since some vaccines require multiple doses.
      </>
    ),
  },
  {
    q: "How dangerous are wildlife encounters?",
    a: (
      <>
        Serious incidents on guided safaris are rare. The two simple rules that account for most safety on game drives
        are stay in the vehicle and follow your guide&apos;s instructions without exception. In camp, never walk between
        rooms after dark without an escort, keep doors and tent zips closed, and don&apos;t leave food in the open. Our{" "}
        <Link href="/resources/safety-tips" className="text-amber hover:text-amber-deep transition-colors">
          safety tips
        </Link>{" "}
        section covers wildlife behavior in more depth.
      </>
    ),
  },
  {
    q: "Is the tap water safe to drink?",
    a: (
      <>
        As a default, drink bottled or filtered water. Most lodges provide unlimited filtered or sealed bottled water
        and many now refill reusable bottles to cut plastic. Use bottled water for brushing teeth in cities you&apos;re
        unfamiliar with, and be cautious with ice, salads, and raw vegetables outside reputable lodges and restaurants.
      </>
    ),
  },
  {
    q: "Are safari destinations politically stable?",
    a: (
      <>
        The major safari countries — Kenya, Tanzania, Botswana, South Africa, Namibia, Zambia, Zimbabwe, Rwanda, and
        Uganda — are generally stable for tourism, with safari areas typically far from any political flashpoints.
        Always check your government&apos;s travel advisory close to departure, and rely on your operator&apos;s local
        intelligence for region-specific issues.
      </>
    ),
  },
  {
    q: "Is safari a good destination for women travelers, including solo?",
    a: (
      <>
        Safari is one of the easier ways to travel solo as a woman. Most of your time is on lodge property or with a
        guide, transfers are arranged door-to-door, and the lodge community is generally very attentive. Standard
        precautions for cities at either end of the trip — Nairobi, Johannesburg, Addis — apply, but the safari portion
        itself is widely regarded as low-risk.
      </>
    ),
  },
  {
    q: "What happens if there's a medical emergency in a remote camp?",
    a: (
      <>
        Reputable camps have established evacuation procedures: a satellite or radio call brings in a light aircraft or
        helicopter, usually flown by a service like AMREF Flying Doctors, and you&apos;re taken to the nearest equipped
        hospital. Confirm before booking that your camp has a clear evacuation plan, and make sure your insurance will
        actually pay the bill rather than expecting you to claim it back later.
      </>
    ),
  },
]

const logisticsFaqs: Faq[] = [
  {
    q: "Do I need a visa?",
    a: (
      <>
        Most safari countries require a visa for visitors from Europe, North America, and Australasia. Many — Kenya,
        Tanzania, Rwanda, Uganda, Zambia, Zimbabwe — now offer e-visas or visas on arrival, while others (notably
        Mozambique and the DRC) need pre-application. The East Africa Tourist Visa covers Kenya, Uganda, and Rwanda for
        90 days, and KAZA covers Zimbabwe and Zambia. Always confirm the latest rules on the official immigration site
        a few weeks before travel.
      </>
    ),
  },
  {
    q: "What about international flights and internal transfers?",
    a: (
      <>
        Most safari trips route through hubs like Nairobi, Addis Ababa, Johannesburg, or Doha. Internal transfers are
        typically a mix of light-aircraft hops on small bush airstrips and 4x4 road transfers. Bush flights have strict
        baggage limits — usually 15 to 20 kg in a soft duffel — so plan your packing around the smallest aircraft on
        your itinerary.
      </>
    ),
  },
  {
    q: "What plug types and electricity should I expect?",
    a: (
      <>
        Most of East and Southern Africa runs on 220 to 240 V. South Africa famously uses the bulky three-pin Type M,
        Kenya, Tanzania, Uganda, and Zimbabwe primarily use the British Type G, and Rwanda is mostly Type C/J. Bring a
        good multi-region adapter and a small power bank — remote camps often run on solar with limited charging
        windows.
      </>
    ),
  },
  {
    q: "Will I have mobile signal and Wi-Fi?",
    a: (
      <>
        Cell coverage in towns and on main roads is usually solid, with cheap local SIMs widely available. In national
        parks, signal can be patchy or non-existent. Most lodges now offer Wi-Fi in main areas, though it may be slow
        or capped, and some deliberately offline camps don&apos;t offer it at all. If you need to stay connected for work,
        confirm connectivity expectations before booking.
      </>
    ),
  },
  {
    q: "What should I pack?",
    a: (
      <>
        Stick to neutral colors (khaki, olive, stone, brown), pack layers for cold dawn drives and warm afternoons, and
        avoid bright colors and dark blue or black, which can attract tsetse flies. Essentials include a wide-brimmed
        hat, sunglasses, high-SPF sunscreen, repellent, a fleece or light down jacket, and a small daypack. Our full{" "}
        <Link
          href="/resources/planning-guides/what-to-pack"
          className="text-amber hover:text-amber-deep transition-colors"
        >
          packing guide
        </Link>{" "}
        breaks this down by season and destination.
      </>
    ),
  },
  {
    q: "What currency should I take?",
    a: (
      <>
        US dollars in clean, post-2013 notes are the most useful catch-all currency for park fees, tips, and gorilla
        permits. Local currency (Kenyan or Tanzanian shillings, South African rand, Zambian kwacha) is best for small
        purchases at markets and town shops. Major lodges accept Visa and Mastercard, but bring more cash than you
        think you&apos;ll need — ATM access in remote areas is limited.
      </>
    ),
  },
  {
    q: "Will language be a barrier?",
    a: (
      <>
        English is widely spoken across the lodge industry in Kenya, Tanzania, Uganda, Rwanda, Zambia, Zimbabwe,
        Botswana, Namibia, and South Africa, so you can travel comfortably with English alone. Learning a handful of
        Swahili greetings (jambo, asante, karibu) is genuinely appreciated in East Africa, but it isn&apos;t a practical
        requirement.
      </>
    ),
  },
]

const experienceFaqs: Faq[] = [
  {
    q: "What does a typical day on safari look like?",
    a: (
      <>
        Days are built around the times animals are most active. A wake-up call at first light is followed by a
        3-to-4-hour morning game drive, then brunch back at camp and a midday rest during the heat. An afternoon tea
        precedes the second game drive at around 4 pm, often ending with a sundowner drink in the bush. Dinner is
        typically communal, and most camps are quiet by 10 pm.
      </>
    ),
  },
  {
    q: "What should I expect on a game drive?",
    a: (
      <>
        Game drives are usually 3 to 4 hours in an open or semi-open 4x4, with a guide and sometimes a tracker. Sightings
        are unscripted — there&apos;s no zoo schedule — and a great deal of wildlife watching is patient observation rather
        than constant action. Bring a camera, binoculars, layered clothing, and water; your guide will handle radio
        calls between vehicles to share notable sightings.
      </>
    ),
  },
  {
    q: "Are there rules around wildlife photography?",
    a: (
      <>
        On safari itself, wildlife photography is generally encouraged — just turn off any flash and never ask a guide
        to break park rules for a better shot. Outside the parks, photographing people requires permission, and
        photographing government buildings, airports, and military sites is often illegal. Drones are restricted or
        outright banned in most national parks; check before you bring one.
      </>
    ),
  },
  {
    q: "Are there age limits for children on safari?",
    a: (
      <>
        Yes, and they vary by camp and country. Many private reserves accept any age and run children&apos;s programs,
        whereas some classic East African and Botswana camps set minimums of 6, 8, or even 12 years old for game
        drives. Walking safaris and gorilla trekking commonly require travelers to be 15 or 16+. Always confirm minimum
        ages with your operator before booking.
      </>
    ),
  },
  {
    q: "Can lodges accommodate dietary requirements?",
    a: (
      <>
        Almost all lodges handle vegetarian, vegan, gluten-free, halal, kosher, and most allergies well — provided you
        flag requirements at the time of booking, not on arrival. Remote camps order food in advance and can&apos;t easily
        adjust on the day. The more specific you are in writing up front, the better the experience on the ground.
      </>
    ),
  },
  {
    q: "Is there a dress code?",
    a: (
      <>
        Safari is fundamentally informal: practical, neutral-colored clothing during the day and smart-casual at
        dinner. There&apos;s no need for formalwear, even at high-end lodges. Avoid camo and military-pattern clothing —
        it&apos;s restricted or banned in several countries — and skip strong perfumes and aftershaves, which can spook
        wildlife.
      </>
    ),
  },
]

type Category = {
  slug: string
  label: string
  heading: string
  faqs: Faq[]
}

const CATEGORIES: Category[] = [
  { slug: "planning", label: "Planning", heading: "Planning your safari", faqs: planningFaqs },
  { slug: "costs", label: "Costs", heading: "Costs & budgeting", faqs: costFaqs },
  { slug: "safety", label: "Safety", heading: "Safety & health", faqs: safetyFaqs },
  { slug: "logistics", label: "Logistics", heading: "Travel & logistics", faqs: logisticsFaqs },
  { slug: "experience", label: "Experience", heading: "On safari", faqs: experienceFaqs },
]

const TOTAL_FAQS = CATEGORIES.reduce((n, c) => n + c.faqs.length, 0)

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export default function FaqsPage() {
  return (
    <>
      {/* ─── Opening ───────────────────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow withRule>Frequently asked — {TOTAL_FAQS} answers</Eyebrow>
          <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
            The questions we hear
            <br />
            <span className="italic text-amber">most</span>.
          </h1>
          <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
            Built for first-time travellers planning their first African safari, and for
            returning travellers refining a more ambitious itinerary. Direct, opinionated,
            updated as conditions change.
          </p>
        </div>

        {/* In-page nav: jump to category */}
        <nav aria-label="FAQ categories" className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-rule pt-8">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.slug}
              href={`#${c.slug}`}
              className="mono text-bone-mute hover:text-amber transition-colors"
            >
              <span className="text-amber" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              {c.label}
            </Link>
          ))}
        </nav>
      </section>

      <SectionRule className="container" />

      {/* ─── Categorised FAQs ─────────────────────────────── */}
      <section className="container max-w-4xl py-16 md:py-20 space-y-20">
        {CATEGORIES.map((category, ci) => (
          <section key={category.slug} id={category.slug} className="scroll-mt-24">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="mono text-amber" aria-hidden>
                {String(ci + 1).padStart(2, "0")} / {String(CATEGORIES.length).padStart(2, "0")}
              </span>
              <span className="eyebrow">{category.label}</span>
            </div>
            <h2 className="mt-2 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              {category.heading}
            </h2>

            <div className="mt-10">
              {category.faqs.map((faq) => (
                <details
                  key={slugify(faq.q)}
                  className="group border-t border-rule [&_svg]:open:rotate-180 last:border-b last:border-rule"
                >
                  <summary className="flex items-baseline gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="font-serif text-h4-fluid text-bone leading-snug flex-1 transition-colors group-hover:text-amber">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className="h-5 w-5 text-amber shrink-0 mt-2 transition-transform"
                      aria-hidden
                    />
                  </summary>
                  <div className="pb-8 pr-12 text-bone-mute leading-relaxed text-[17px] max-w-prose">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </section>

      {/* ─── Still have questions ─────────────────────────── */}
      <section className="border-t border-rule bg-ink py-24 md:py-32">
        <div className="container max-w-3xl">
          <Eyebrow withRule>Still planning?</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            Tell us what you&apos;re <span className="italic text-amber">trying to figure out</span>.
          </h2>
          <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
            If your question isn&apos;t answered here, send us a brief. Niels and
            the team will come back within 48 hours with three drawn-by-hand
            routes — and a more useful answer than we could fit in a FAQ.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-none px-8 py-6 mono">
              <Link href="/plan">Start a brief →</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none px-8 py-6 mono border-rule text-bone hover:border-amber hover:text-amber"
            >
              <Link href="/contact">Speak to a planner</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Newsletter ───────────────────────────────────── */}
      <section className="border-t border-rule py-24">
        <div className="container max-w-3xl">
          <Eyebrow>The dispatch</Eyebrow>
          <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            Field notes, monthly.
          </h2>
          <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
            One email a month. Seasonal picks, new field notes, the occasional unsolicited
            opinion. Unsubscribe in one click.
          </p>
          <div className="mt-10">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}
