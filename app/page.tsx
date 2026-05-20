import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { getBlurDataURL } from "@/lib/images/blur"
import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { NumberedList } from "@/components/editorial/numbered-list"
import { ListingCardEditorial } from "@/components/editorial/listing-card-editorial"
import { InSeasonStrip } from "@/components/editorial/in-season-strip"
import { BlendOverlay } from "@/components/editorial/blend-overlay"
import { PlannerCallTrigger } from "@/components/planner-call/planner-call-trigger"
import { EditorialImage } from "@/components/editorial/editorial-image"
import { Button } from "@/components/ui/button"
import { FAQ } from "@/components/FAQ"
import { getFeaturedListings } from "@/lib/listings"
import { getSettings } from "@/lib/settings"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Curated African Safaris — A Small, Honest Collection",
  description:
    "A small, opinionated collection of African safari lodges and operators, chosen by hand from Victoria Falls. Honest planning, three routes within 48 hours. Conservation-led. No catalogue, no kickbacks.",
  alternates: { canonical: "/" },
}

const PILLARS = [
  {
    title: "Curation, not catalogue.",
    body: "We list the African safari operators we'd send our closest friends to. Every lodge in the kept list has been visited by us in person or known to us by trusted reputation. We refuse paid placements. The collection is small because the bar is high.",
  },
  {
    title: "Trips that leave a mark.",
    body: "We favour stays that ask something of you. A walking morning in South Luangwa. A silent sundowner on the edge of the Linyanti. A sleep-out under the Hwange sky. These are the trips that linger long after the dust settles — and they are what we organise this site around.",
  },
  {
    title: "Travel with consequence.",
    body: "Every operator in the collection funds conservation, community, or both. We ask for the receipts — anti-poaching levies, community lease payments, science partnerships — and we publish the relationships. Your booking is not a transaction; it is a contribution to keeping these places wild.",
  },
]

type Region = {
  href: string
  name: string
  countries: string
  body: string
  tag?: string
}

const REGIONS: Region[] = [
  {
    href: "/destinations/east-africa",
    name: "East Africa",
    countries: "Kenya, Tanzania, Uganda, Rwanda",
    body: "Big country, big herds, the classic safari image. The Great Migration, mountain gorillas, Maasai cultural depth. Best June–October.",
    tag: "Coverage in progress",
  },
  {
    href: "/destinations/southern-africa",
    name: "Southern Africa",
    countries: "Botswana, Namibia, Zimbabwe, Zambia, South Africa",
    body: "More variety, more value, fewer crowds. Walking-led safaris, the Okavango Delta, the Namib desert, malaria-free reserves. Best May–October.",
  },
  {
    href: "/destinations/west-africa",
    name: "West Africa",
    countries: "Ghana, Senegal, Nigeria, Benin",
    body: "The continent's most under-rated safari corridor. Forest elephants, coastal reserves, exceptional birding.",
    tag: "Coverage in progress",
  },
  {
    href: "/destinations/north-africa",
    name: "North Africa",
    countries: "Morocco, Egypt, Tunisia",
    body: "Desert and antiquity. Sahara expeditions, Atlas raptors, Mediterranean migration corridors.",
    tag: "Coverage in progress",
  },
]

const HOMEPAGE_FAQ = [
  {
    question: "What does Safari Overland do, exactly?",
    answer:
      "We are an editorial planner — a small, opinionated collection of African safari lodges and operators with a free 48-hour planning service. You tell us what you're chasing; we come back with three routes; you pick one and we connect you to the operator. We do not sell trips ourselves; the operator quotes, contracts, and hosts.",
  },
  {
    question: "Who chooses the operators?",
    answer:
      "Niels van de Meer, co-founder and editor, working from Victoria Falls. Every lodge in the kept list is one Niels has visited personally or knows by reputation from operators we work with directly. We re-screen on a rolling basis — when something material changes at a property, it goes back through review.",
  },
  {
    question:
      "How is Safari Overland different from the big online safari planners?",
    answer:
      "Two things. First, scale: the big planners run hundreds of staff and partner with hundreds of lodges. We are small on purpose — the kept list is deliberately under-built. Second, business model: we publish how we get paid (booking margins, not operator subscriptions) and we don't take preferred-supplier money. If a lodge is listed, it earned the listing.",
  },
  {
    question: "How much does an African safari cost?",
    answer:
      "Honest answer: $400–$800 per person per night for a strong mid-range safari, $1,000–$2,500 per person per night for luxury, and $3,000+ for ultra-luxury with helicopter transfers. Add international flights ($1,200–$2,500), regional flights and transfers ($400–$1,500), park and conservancy fees ($60–$400/day), gratuities (~10%), and gear. A 10-day premium safari for two typically lands between $18,000 and $35,000 all-in.",
  },
  {
    question: "When is the best time to go on safari?",
    answer:
      "Depends on where. For East Africa's Great Migration river crossings, July–October. For Southern Africa's classic dry-season game viewing, May–October. For Botswana's Okavango flood, June–August. For green-season birding and calving (Tanzania's Ndutu), January–March. We track this month-by-month in the field notes.",
  },
  {
    question: "How do you get paid, then?",
    answer:
      "Two ways. When you book a trip we plan, the lodge gives us a rate margin against rack — you pay rack-or-close-to-it; we keep the difference. When the trip is better routed through a specialist partner, we refer you to a friend's established travel company and they handle the booking. No subscription fees, no paid placements, no preferred-supplier deals. The collection is editorially independent because nobody pays to be in it.",
  },
]

const FIELD_NOTES = [
  {
    href: "/field-notes/planning-guides/east-vs-southern",
    eyebrow: "Planning · 04 min",
    title: "East vs Southern Africa",
    lede: "Two extraordinary safari regions, two different experiences. A direct comparison on landscapes, game viewing, and cost.",
    image: "/images/planning-guides/destinations/east-vs-southern.jpg",
  },
  {
    href: "/field-notes/planning-guides/luxury-vs-budget",
    eyebrow: "Budgeting · 06 min",
    title: "Luxury vs budget safaris",
    lede: "What you actually get at each price point — and how to spend smart at any budget.",
    image: "/images/planning-guides/budgeting/budget-vs-luxury.jpg",
  },
  {
    href: "/field-notes/conservation/community-conservation",
    eyebrow: "Conservation · 05 min",
    title: "Community conservation",
    lede: "How conservancies are reshaping African wildlife protection — and how to choose trips that fund the model.",
    image: "/images/planning-guides/destinations/safari-destinations.jpg",
  },
]

export default async function HomePage() {
  const [settings, heroBlur] = await Promise.all([
    getSettings(),
    getBlurDataURL("/safari-tent.jpg"),
  ])
  const featured = settings.show_featured_on_home
    ? await getFeaturedListings(3)
    : []

  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />

      <main className="flex-1">
        {/* ─── Cinematic hero ────────────────────────────────────── */}
        <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden">
          <Image
            src="/safari-tent.jpg"
            alt="Tented camp at sunset in the African bush"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={heroBlur}
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/30 to-night"
          />

          <div className="container relative h-full flex flex-col justify-end pb-20 md:pb-28">
            <div className="max-w-4xl">
              <Eyebrow withRule>African safaris, reconsidered</Eyebrow>
              <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
                Africa, <span className="italic text-amber">slowly</span>.{" "}
                <span className="block mt-2 text-h1-fluid text-bone-mute leading-tight">
                  A curated African safari collection.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl font-serif italic text-h4-fluid text-bone-mute leading-snug">
                A small collection of lodges and operators chosen for what the wild does to you
                — not just what it shows you.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-none px-8 py-6 mono" asChild>
                  <StartBriefLink source="hero">Start a brief →</StartBriefLink>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none px-8 py-6 mono border-bone/30 text-bone hover:border-amber hover:text-amber bg-transparent"
                  asChild
                >
                  <Link href="/categories">Open the collection</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Editorial intro (sits directly under hero) ────────── */}
        <section className="container py-20 md:py-24">
          <div className="max-w-3xl">
            <p className="font-serif text-h4-fluid text-bone leading-snug">
              This is a small, deliberately incomplete collection of African
              safari lodges and operators — chosen by hand, written from
              Victoria Falls, and shaped by what the wild actually does to
              people who travel slowly.
            </p>
            <p className="mt-6 text-bone-mute leading-relaxed">
              We are an editorial second opinion, not a catalogue. Every
              lodge here earns its place by the depth of the experience it
              offers, not by paying for the listing. Every operator here
              funds conservation or community work, and shows us the
              receipts. If you want a curated African safari that asks
              something of you and leaves a mark, this is the page to start
              from.
            </p>
          </div>
        </section>

        {/* ─── In-season strip ───────────────────────────────────── */}
        <section className="container">
          <Eyebrow withRule>In season, right now</Eyebrow>
          <p className="mt-6 max-w-2xl text-bone-mute leading-relaxed">
            Conditions on the ground, this week, across the continent. Use
            it to choose where to go now — not just where to go in theory.
          </p>
        </section>
        <InSeasonStrip />

        {/* ─── Plan-with-us card ─────────────────────────────────── */}
        <section className="container py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow withRule>By hand — open</Eyebrow>
              <h2 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance">
                A safari, planned{" "}
                <span className="italic text-amber">by hand</span>. Three
                routes in 48 hours.
              </h2>
              <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
                We do not sell packages. We listen to what you are chasing —
                the months, the rhythm, the kind of quiet you want — and we
                draft three different routes within 48 hours.
              </p>
              <p className="mt-6 max-w-2xl text-bone-mute leading-relaxed">
                You pick one. We make the introduction directly to the
                operator. You book with them, and we step out of the way.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-none px-8 py-6 mono" asChild>
                  <StartBriefLink source="home-plan-card">
                    Start a brief →
                  </StartBriefLink>
                </Button>
                <PlannerCallTrigger size="lg" source="home">
                  Speak to a planner
                </PlannerCallTrigger>
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-rule lg:pl-12">
              <p className="eyebrow mb-6">How it works — in three steps</p>
              <ol className="space-y-6">
                {[
                  [
                    "01",
                    "You tell us the months you can travel, the regions you are drawn to, and the rhythm — slow and deep, or wider and lighter.",
                  ],
                  [
                    "02",
                    "We come back within 48 hours with three routes, each at a different price-and-pace combination. No preferred suppliers. No commission games.",
                  ],
                  [
                    "03",
                    "You pick one. We connect you directly to the operator and step out. They quote, contract, and host.",
                  ],
                ].map(([n, t]) => (
                  <li key={n} className="flex gap-5 border-t border-rule pt-6">
                    <span className="mono text-amber pt-1 shrink-0" aria-hidden>
                      {n}
                    </span>
                    <p className="text-bone leading-relaxed">{t}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ─── Where to go — the continent, by region ────────────── */}
        <section className="bg-ink border-y border-rule py-24 md:py-32">
          <div className="container">
            <div className="max-w-3xl mb-16">
              <Eyebrow withRule>Where to go — the continent, by region</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                Africa is not one safari.{" "}
                <span className="italic text-amber">It is four.</span>
              </h2>
              <p className="mt-6 text-bone-mute leading-relaxed">
                Each region has its own rhythm, its own season, its own
                answer to the same question.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2">
              {REGIONS.map((r, i) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group block border-t border-rule pt-8 transition-colors hover:border-amber"
                >
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="mono text-amber">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow">{r.countries}</span>
                  </div>
                  <h3 className="font-serif text-h3-fluid text-bone leading-tight transition-colors group-hover:text-amber text-balance">
                    {r.name}
                  </h3>
                  <p className="mt-3 text-bone-mute leading-relaxed">{r.body}</p>
                  {r.tag && (
                    <p className="eyebrow mt-4 text-amber/80">{r.tag}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Three-pillar manifesto ────────────────────────────── */}
        <section className="container py-24 md:py-32">
          <div className="max-w-3xl mb-16">
            <Eyebrow withRule>What this collection promises to do properly</Eyebrow>
            <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              Three things,{" "}
              <span className="italic text-amber">always</span>.
            </h2>
          </div>

          <NumberedList
            items={PILLARS.map((p) => ({ title: p.title, body: p.body }))}
            twoColumn={false}
            className="max-w-4xl"
          />
        </section>

        {/* ─── Featured listings (real data) ─────────────────────── */}
        {featured.length > 0 && (
          <section className="bg-ink border-y border-rule py-24 md:py-32">
            <div className="container">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                  <Eyebrow>A small selection from this week</Eyebrow>
                  <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                    Three lodges we&apos;re sending people to{" "}
                    <span className="italic text-amber">right now</span>.
                  </h2>
                  <p className="mt-4 text-bone-mute leading-relaxed">
                    The full collection lives on the collection page.
                  </p>
                </div>
                <Link
                  href="/categories"
                  className="mono text-amber hover:text-amber-deep transition-colors"
                >
                  Open the collection →
                </Link>
              </div>
              <div>
                {featured.map((listing, i) => {
                  const lede = listing.description
                    ? listing.description
                        .split(/(?<=[.?!])\s/)
                        .slice(0, 1)
                        .join(" ")
                    : undefined
                  const location =
                    listing.location && listing.country && listing.location !== listing.country
                      ? `${listing.location} · ${listing.country}`
                      : listing.location || listing.country
                  return (
                    <ListingCardEditorial
                      key={listing.id}
                      href={`/listings/${listing.id}`}
                      index={i + 1}
                      eyebrow={listing.category}
                      title={listing.listing_name}
                      lede={lede}
                      location={location}
                      imageUrl={listing.image_url}
                      category={listing.category}
                      price={listing.price_info || undefined}
                    />
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ─── Field Notes ───────────────────────────────────────── */}
        <section className="container py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <Eyebrow withRule>Field notes, long reads from the bush</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                Long-form planning, conservation reporting, and seasonal
                field notes —{" "}
                <span className="italic text-amber">written from the bush</span>.
              </h2>
            </div>
            <Link
              href="/field-notes"
              className="mono text-amber hover:text-amber-deep transition-colors"
            >
              All field notes →
            </Link>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {FIELD_NOTES.map((note, i) => (
              <Link
                key={note.href}
                href={note.href}
                className="group block border-t border-rule pt-6 transition-colors hover:border-amber"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-card mb-6">
                  <EditorialImage
                    src={note.image}
                    alt={note.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <BlendOverlay />
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="mono text-amber">{String(i + 1).padStart(2, "0")}</span>
                  <span className="eyebrow">{note.eyebrow}</span>
                </div>
                <h3 className="font-serif text-h3-fluid text-bone leading-tight transition-colors group-hover:text-amber text-balance">
                  {note.title}
                </h3>
                <p className="mt-3 text-bone-mute leading-relaxed">{note.lede}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── FAQ block ─────────────────────────────────────────── */}
        <section className="container pb-24 md:pb-32">
          <div className="max-w-3xl">
            <FAQ items={HOMEPAGE_FAQ} heading="Frequently asked" />
          </div>
        </section>

        <SectionRule className="container" />
      </main>

      <EditorialFooter />
    </div>
  )
}
