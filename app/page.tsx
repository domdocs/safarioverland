import Link from "next/link"
import Image from "next/image"

import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { NumberedList } from "@/components/editorial/numbered-list"
import { ListingCardEditorial } from "@/components/editorial/listing-card-editorial"
import { InSeasonStrip } from "@/components/editorial/in-season-strip"
import { Button } from "@/components/ui/button"
import { getFeaturedListings } from "@/lib/listings"

export const revalidate = 60

const PILLARS = [
  {
    title: "Curated, not crowdsourced.",
    body: "Every operator is reviewed before publication. We list the people we'd send our friends to, not whoever paid for placement.",
  },
  {
    title: "Honest about tradeoffs.",
    body: "Crowded crossings, shoulder-season risks, hidden costs — we say it on the page rather than after you've booked.",
  },
  {
    title: "On the ground, year-round.",
    body: "Our editors visit, walk, and write from the parks themselves. The notes are field notes, not press releases.",
  },
]

const FIELD_NOTES = [
  {
    href: "/resources/planning-guides/east-vs-southern",
    eyebrow: "Planning · 04 min",
    title: "East vs Southern Africa",
    lede: "Two extraordinary safari regions, two different experiences. A direct comparison on landscapes, game viewing, and cost.",
    image: "/images/planning-guides/destinations/east-vs-southern.jpg",
  },
  {
    href: "/resources/planning-guides/luxury-vs-budget",
    eyebrow: "Budgeting · 06 min",
    title: "Luxury vs budget safaris",
    lede: "What you actually get at each price point — and how to spend smart at any budget.",
    image: "/images/planning-guides/budgeting/budget-vs-luxury.jpg",
  },
  {
    href: "/resources/conservation/community-conservation",
    eyebrow: "Conservation · 05 min",
    title: "Community conservation",
    lede: "How conservancies are reshaping African wildlife protection — and how to choose trips that fund the model.",
    image: "/images/planning-guides/destinations/safari-destinations.jpg",
  },
]

export default async function HomePage() {
  const featured = await getFeaturedListings(3)

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
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/30 to-night"
          />

          <div className="container relative h-full flex flex-col justify-end pb-20 md:pb-28">
            <div className="max-w-4xl">
              <Eyebrow withRule>A directory of African safari operators</Eyebrow>
              <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
                Africa, <span className="italic text-amber">slowly</span>.
              </h1>
              <p className="mt-8 max-w-2xl font-serif italic text-h4-fluid text-bone-mute leading-snug">
                Curated lodges, operators, and field notes from across the continent.
                The kind of trips we&apos;d want to take ourselves.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-none px-8 py-6 mono" asChild>
                  <Link href="/categories">Browse the directory →</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none px-8 py-6 mono border-bone/30 text-bone hover:border-amber hover:text-amber bg-transparent"
                  asChild
                >
                  <Link href="/destinations">Open the atlas</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── In-season strip ───────────────────────────────────── */}
        <InSeasonStrip />

        {/* ─── Three-pillar manifesto ────────────────────────────── */}
        <section className="container py-24 md:py-32">
          <div className="max-w-3xl mb-16">
            <Eyebrow withRule>What this directory is for</Eyebrow>
            <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              Three things we promise to do
              <span className="italic text-amber"> properly</span>.
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
                  <Eyebrow>This week in the directory</Eyebrow>
                  <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                    A few we&apos;d send our friends to.
                  </h2>
                </div>
                <Link
                  href="/categories"
                  className="mono text-amber hover:text-amber-deep transition-colors"
                >
                  All listings →
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
              <Eyebrow withRule>Field notes</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                Long reads from the bush.
              </h2>
            </div>
            <Link
              href="/resources"
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
                  <Image
                    src={note.image}
                    alt={note.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Editorial blend: dark at top + bottom, near-transparent middle.
                      Slight overall dim. Pointer-events-none so it doesn't block hover. */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(var(--night)/0.7)_0%,rgb(var(--night)/0.15)_35%,rgb(var(--night)/0.15)_65%,rgb(var(--night)/0.7)_100%)]"
                  />
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

        <SectionRule className="container" />

        {/* ─── Plan-with-us card ─────────────────────────────────── */}
        <section className="container py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow withRule>Trip builder — open</Eyebrow>
              <h2 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance">
                Tell us what you want from a safari. We&apos;ll send back{" "}
                <span className="italic text-amber">three options</span> in 48 hours.
              </h2>
              <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
                Free, no commitment. The brief is short — five questions about the months you can travel,
                the rhythm you want, and the budget you&apos;re working to.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-none px-8 py-6 mono" asChild>
                  <Link href="/plan">Start a brief →</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none px-8 py-6 mono border-rule text-bone hover:border-amber hover:text-amber"
                  asChild
                >
                  <Link href="/contact">Talk to a planner</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-rule lg:pl-12">
              <p className="eyebrow mb-6">How it works</p>
              <ol className="space-y-6">
                {[
                  ["01", "You tell us the months, the regions, and the rhythm."],
                  ["02", "We draft three options at different price points."],
                  ["03", "You pick one, we hand you off to the operator."],
                ].map(([n, t]) => (
                  <li key={n} className="flex gap-5 border-t border-rule pt-6">
                    <span className="mono text-amber pt-1 shrink-0" aria-hidden>
                      {n}
                    </span>
                    <p className="font-serif text-h4-fluid text-bone leading-tight">{t}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>

      <EditorialFooter />
    </div>
  )
}
