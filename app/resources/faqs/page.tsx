import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Compass, DollarSign, ShieldCheck, Plane, Binoculars } from "lucide-react"
import { NewsletterForm } from "@/components/newsletter-form"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Safari Overland",
  description:
    "Practical answers to the most common questions about planning an African safari — covering costs, safety, logistics, and what to expect on the ground. Built for first-time and returning safari travelers.",
  keywords: [
    "safari FAQs",
    "African safari planning",
    "safari costs",
    "safari safety",
    "safari logistics",
  ],
}

type Faq = { q: string; a: React.ReactNode }

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
        <Link href="/resources/seasonal-guides" className="text-primary hover:underline">
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
        dedicated kids' programs, while some classic East African camps set minimums of 6, 8, or even 12 years old for
        game drives. Family-friendly lodges typically offer interconnecting rooms, shorter activities, and child-suited
        meals. If you're traveling with children under 12, ask about minimum ages before falling in love with a
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
        affordable, with longer treks), and the DRC. They're limited daily and bookable through licensed operators
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
        Anything shorter and you'll spend a disproportionate share of the trip on transfers and arrival admin. Ten to
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
        permits and some flight tickets are non-refundable from the moment they're issued. This is one of the strongest
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
        butlers. Tips are usually given in USD cash at the end of your stay. Your operator's pre-trip notes will give
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
        before you fly — they'll match your itinerary and medical history to the right prophylaxis. In addition, plan
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
        you're arriving from a yellow-fever-risk country (the certificate is checked at the border). Hepatitis A,
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
        are stay in the vehicle and follow your guide's instructions without exception. In camp, never walk between
        rooms after dark without an escort, keep doors and tent zips closed, and don't leave food in the open. Our{" "}
        <Link href="/resources/safety-tips" className="text-primary hover:underline">
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
        and many now refill reusable bottles to cut plastic. Use bottled water for brushing teeth in cities you're
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
        Always check your government's travel advisory close to departure, and rely on your operator's local
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
        helicopter, usually flown by a service like AMREF Flying Doctors, and you're taken to the nearest equipped
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
        or capped, and some deliberately offline camps don't offer it at all. If you need to stay connected for work,
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
          className="text-primary hover:underline"
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
        think you'll need — ATM access in remote areas is limited.
      </>
    ),
  },
  {
    q: "Will language be a barrier?",
    a: (
      <>
        English is widely spoken across the lodge industry in Kenya, Tanzania, Uganda, Rwanda, Zambia, Zimbabwe,
        Botswana, Namibia, and South Africa, so you can travel comfortably with English alone. Learning a handful of
        Swahili greetings (jambo, asante, karibu) is genuinely appreciated in East Africa, but it isn't a practical
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
        are unscripted — there's no zoo schedule — and a great deal of wildlife watching is patient observation rather
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
        Yes, and they vary by camp and country. Many private reserves accept any age and run children's programs,
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
        flag requirements at the time of booking, not on arrival. Remote camps order food in advance and can't easily
        adjust on the day. The more specific you are in writing up front, the better the experience on the ground.
      </>
    ),
  },
  {
    q: "Is there a dress code?",
    a: (
      <>
        Safari is fundamentally informal: practical, neutral-colored clothing during the day and smart-casual at
        dinner. There's no need for formalwear, even at high-end lodges. Avoid camo and military-pattern clothing —
        it's restricted or banned in several countries — and skip strong perfumes and aftershaves, which can spook
        wildlife.
      </>
    ),
  },
]

type Category = {
  value: string
  label: string
  heading: string
  icon: typeof Compass
  faqs: Faq[]
}

const categories: Category[] = [
  { value: "planning", label: "Planning", heading: "Planning your safari", icon: Compass, faqs: planningFaqs },
  { value: "costs", label: "Costs", heading: "Costs & budgeting", icon: DollarSign, faqs: costFaqs },
  { value: "safety", label: "Safety", heading: "Safety & health", icon: ShieldCheck, faqs: safetyFaqs },
  { value: "logistics", label: "Logistics", heading: "Travel & logistics", icon: Plane, faqs: logisticsFaqs },
  { value: "experience", label: "Experience", heading: "On safari", icon: Binoculars, faqs: experienceFaqs },
]

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export default function FaqsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive answers to the questions we hear most often — written for first-timers planning their first
          African safari and for returning travelers refining a more ambitious itinerary.
        </p>
      </div>

      {/* Resource Navigation */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <Link href="/resources">
          <Button variant="outline">All Resources</Button>
        </Link>
        <Link href="/resources/planning-guides">
          <Button variant="outline">Planning Guides</Button>
        </Link>
        <Link href="/resources/safety-tips">
          <Button variant="outline">Safety Tips</Button>
        </Link>
        <Link href="/resources/conservation">
          <Button variant="outline">Conservation</Button>
        </Link>
        <Link href="/resources/seasonal-guides">
          <Button variant="outline">Seasonal Guides</Button>
        </Link>
        <Link href="/resources/faqs">
          <Button variant="default">FAQs</Button>
        </Link>
      </div>

      {/* Categorized FAQs */}
      <section className="mb-16">
        <Tabs defaultValue="planning">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8 h-auto md:h-10">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <TabsTrigger key={category.value} value={category.value} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" /> {category.label}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.value} value={category.value}>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">{category.heading}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem key={slugify(faq.q)} value={`${category.value}-${index}-${slugify(faq.q)}`}>
                      <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Bottom CTA */}
      <section className="mb-16">
        <div className="bg-primary text-white p-8 md:p-12 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="mb-6">
              If your question isn't covered here, we're happy to point you toward the right operator, lodge, or
              resource in the directory.
            </p>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Get in touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section>
        <div className="bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay updated with safari insights</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest safari tips, seasonal updates, and conservation news delivered
            directly to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
