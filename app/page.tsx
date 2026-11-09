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
import { getFeaturedListings } from "@/lib/listings"
import { getSettings } from "@/lib/settings"
import { ROUTES } from "@/lib/relaunch/routes"

export const revalidate = 60

// ─── Homepage copy ───────────────────────────────────────────────
// Draft copy from handoff/briefs/2026-11-SELF_DRIVE_PHASE_1.md (PR A).
// Every user-facing string for the relaunch sections lives in these
// consts so the copywriter's final copy can be swapped in without
// touching the markup.

const HERO = {
  eyebrow: "Self-drive · southern Africa",
  // Headline stays "Africa, slowly." — rendered in markup with the
  // amber italic word.
  subhead:
    "Self-drive journeys through southern Africa, staying at camps and lodges that give you more than a bed. We plan the route, book every night, and stay at the end of the phone while you're on the road.",
  primaryCta: "Start a brief →",
  secondaryCta: "Open the collection",
}

const OFFER = {
  eyebrow: "What we do",
  // Headline: "Three things we promise to do properly." (amber italic
  // on "properly") — rendered in markup.
}

// The offer, in the house structure of three.
// Partner towns: name only the hubs where a partner on the ground is
// signed. Victoria Falls is in place. Add Windhoek and Maun to pillar
// 03 only once their partners are confirmed.
const PILLARS = [
  {
    title: "We draw the route.",
    body: "Every drive timed, every road surface named, fuel and border crossings and park gate times worked out before you leave. It arrives as a road book, in print and offline on your phone.",
  },
  {
    title: "We book every night, and the vehicle.",
    body: "Camps and lodges we'd send our friends to, chosen for what they give you at the end of a day's drive. A vehicle suited to the roads, not a camper you'll never unpack.",
  },
  {
    title: "We're at the end of the phone.",
    body: "A person you can call while you're on the road, and partners on the ground in Victoria Falls who hand over your vehicle and are there if something goes wrong.",
  },
]

const ROUTES_TEASER = {
  eyebrow: "Routes",
  // Headline: "Three routes, drawn by hand." (amber italic on "drawn")
  headlineLead: "Three routes,",
  headlineAccent: "drawn",
  headlineTail: " by hand.",
  lede: "Each one can be stretched, shortened or joined to another. Start from one, and we'll redraw it around you.",
  allLink: "All routes →",
}

const CAN_I = {
  eyebrow: "Before you ask",
  // Headline: "Yes, you can drive this." (amber italic on "drive")
  headlineLead: "Yes, you can",
  headlineAccent: "drive",
  headlineTail: " this.",
  items: [
    {
      title: "The roads",
      body: "Mostly tar and good gravel. You need a 4×4 where it matters, not everywhere, and the road book tells you which is which.",
    },
    {
      title: "Driving on the left",
      body: "It takes a morning to settle in. For American travellers we ask for an automatic gearbox, and you'll want an International Driving Permit.",
    },
    {
      title: "Borders",
      body: "We prepare the paperwork before you leave. Our partners on the ground meet you at a crossing where it helps.",
    },
    {
      title: "Wildlife and the dark",
      body: "You don't drive after sunset. Park gate times make sure of it, and so does the way we draw each day.",
    },
  ],
}

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
              <Eyebrow withRule>{HERO.eyebrow}</Eyebrow>
              <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
                Africa, <span className="italic text-amber">slowly</span>.
              </h1>
              <p className="mt-8 max-w-2xl font-serif italic text-h4-fluid text-bone-mute leading-snug">
                {HERO.subhead}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-none px-8 py-6 mono" asChild>
                  <StartBriefLink source="hero">{HERO.primaryCta}</StartBriefLink>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none px-8 py-6 mono border-bone/30 text-bone hover:border-amber hover:text-amber bg-transparent"
                  asChild
                >
                  <Link href="/categories">{HERO.secondaryCta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── In-season strip ───────────────────────────────────── */}
        <InSeasonStrip />

        {/* ─── Plan-with-us card ─────────────────────────────────── */}
        <section className="container py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow withRule>By hand — open</Eyebrow>
              <h2 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance">
                A safari, drawn{" "}
                <span className="italic text-amber">by hand</span>.
              </h2>
              <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
                Tell us what you&apos;re chasing — the months, the rhythm, the kind of quiet you want.
                We&apos;ll come back with three routes within 48 hours.
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
                  ["01", "You tell us the months, the regions, and the rhythm."],
                  ["02", "We draft three routes — at different rhythms and budgets."],
                  ["03", "You pick one, we make the introduction."],
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

        {/* ─── The offer: three things ───────────────────────────── */}
        <section className="container py-24 md:py-32">
          <div className="max-w-3xl mb-16">
            <Eyebrow withRule>{OFFER.eyebrow}</Eyebrow>
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

        {/* ─── Routes teaser (empty-safe) ────────────────────────── */}
        {ROUTES.length > 0 && (
          <section className="bg-ink border-y border-rule py-24 md:py-32">
            <div className="container">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                  <Eyebrow withRule>{ROUTES_TEASER.eyebrow}</Eyebrow>
                  <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                    {ROUTES_TEASER.headlineLead}{" "}
                    <span className="italic text-amber">{ROUTES_TEASER.headlineAccent}</span>
                    {ROUTES_TEASER.headlineTail}
                  </h2>
                  <p className="mt-6 text-bone-mute leading-relaxed">{ROUTES_TEASER.lede}</p>
                </div>
                <Link
                  href="/routes"
                  className="mono text-amber hover:text-amber-deep transition-colors"
                >
                  {ROUTES_TEASER.allLink}
                </Link>
              </div>

              <div className="grid gap-12 md:grid-cols-3">
                {ROUTES.map((route, i) => (
                  <Link
                    key={route.slug}
                    href={`/routes/${route.slug}`}
                    className="group block border-t border-rule pt-6 transition-colors hover:border-amber"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-card mb-6">
                      <EditorialImage
                        src={route.heroImage}
                        alt={route.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <BlendOverlay />
                    </div>
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="mono text-amber">{String(i + 1).padStart(2, "0")}</span>
                      <span className="eyebrow">
                        {[route.countries.join(" · "), route.nights].filter(Boolean).join(" — ")}
                      </span>
                    </div>
                    <h3 className="font-serif text-h3-fluid text-bone leading-tight transition-colors group-hover:text-amber text-balance">
                      {route.title}
                    </h3>
                    <p className="mt-3 text-bone-mute leading-relaxed">{route.hook}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Can I do this? ────────────────────────────────────── */}
        <section className="container py-24 md:py-32">
          <div className="max-w-3xl mb-16">
            <Eyebrow withRule>{CAN_I.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              {CAN_I.headlineLead}{" "}
              <span className="italic text-amber">{CAN_I.headlineAccent}</span>
              {CAN_I.headlineTail}
            </h2>
          </div>

          <NumberedList items={CAN_I.items} className="max-w-5xl" />
        </section>

        {/* ─── Featured listings (real data) ─────────────────────── */}
        {featured.length > 0 && (
          <section className="bg-ink border-y border-rule py-24 md:py-32">
            <div className="container">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                  <Eyebrow>This week on the collection</Eyebrow>
                  <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                    A few we&apos;d send our friends to.
                  </h2>
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
              <Eyebrow withRule>Field notes</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                Long reads from the bush.
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

        <SectionRule className="container" />
      </main>

      <EditorialFooter />
    </div>
  )
}
