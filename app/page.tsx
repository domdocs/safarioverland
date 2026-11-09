import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { NumberedList } from "@/components/editorial/numbered-list"
import { ListingCardEditorial } from "@/components/editorial/listing-card-editorial"
import { BlendOverlay } from "@/components/editorial/blend-overlay"
import { PlannerCallTrigger } from "@/components/planner-call/planner-call-trigger"
import { Button } from "@/components/ui/button"
import { getFeaturedListings } from "@/lib/listings"
import { getSettings } from "@/lib/settings"
import { OverviewMap } from "@/components/maps/overview-map"
import { RouteHoverProvider } from "@/components/maps/route-hover"
import { RouteCard } from "@/components/routes/route-card"
import { ROUTES } from "@/lib/relaunch/routes"
import { CAN_I } from "@/lib/relaunch/copy"
import { HeroMedia } from "@/components/media/hero-media"
import { FullBleedImage } from "@/components/media/full-bleed-image"
import { ParallaxImage } from "@/components/media/parallax-image"
import { CaptionedImage } from "@/components/media/captioned-image"
import { ImageNumberedList } from "@/components/media/image-numbered-list"
import { MediaCaption } from "@/components/media/media-caption"
import { HERO_VIDEOS, cardSrc, getMedia } from "@/lib/relaunch/media-select"
import { HOME_VISUALS, guideHero } from "@/lib/relaunch/visuals"

export const revalidate = 60

// ─── Homepage copy ───────────────────────────────────────────────
// Copy from handoff/relaunch/copy/SITE_COPY.md §1 (draft for Dom's
// approval, D-10). Every user-facing string for the relaunch sections
// lives in these consts so copy changes don't touch the markup.

export const metadata: Metadata = {
  title: { absolute: "Self-drive safari in southern Africa | Safari Overland" },
  description:
    "Self-drive safaris in Zimbabwe, Namibia, Botswana and Zambia. Drive yourself, sleep in camps and lodges, not a rooftop tent. We draw the route and book it.",
}

const HERO = {
  eyebrow: "Self-drive · southern Africa",
  // Headline stays "Africa, slowly." — rendered in markup with the
  // amber italic word.
  subhead:
    "Drive yourself through southern Africa, and end each day at a camp or lodge that gives you more than a bed. We draw the route, book the nights and the vehicle, and stay at the end of the phone while you're on the road.",
  primaryCta: "Start a brief →",
  secondaryCta: "See the routes",
}

const OFFER = {
  eyebrow: "What we do",
  // Headline: "Three things we promise to do properly." (amber italic
  // on "properly") — rendered in markup.
}

// The offer, in the house structure of three.
// Partner towns (D-02): Victoria Falls, Kasane, Maun and Windhoek
// (Dom, 9 Nov). Partners are not named. Support line is 24/7 (D-04).
const PILLARS = [
  {
    title: "We draw the route.",
    body: "Drive times given as honest ranges, the road surface named for each stretch, and the fuel, border crossings and park gate times worked out before you leave. It comes to you as a road book, in print and offline on your phone.",
  },
  {
    title: "We book the nights, and the vehicle.",
    body: "Camps and lodges we'd send our friends to, chosen for what waits at the end of a day's drive: a guide who can read a track, a hide at a waterhole, a fire. And a 4×4 or SUV matched to the roads, not a camper you'll never unpack.",
  },
  {
    title: "We're at the end of the phone.",
    body: "A person you can call while you're on the road, day or night. Our partners on the ground — in Victoria Falls, Kasane, Maun and Windhoek — meet you, hand over the vehicle and are there if something goes wrong.",
  },
]

const ROUTES_TEASER = {
  eyebrow: "Where we drive",
  // Headline: "Three routes to start from." (amber italic on "start")
  headlineLead: "Three routes to",
  headlineAccent: "start",
  headlineTail: " from.",
  lede: "Each one is a shape, not a package. Lengthen it, shorten it, join two together. We draw the final version around your dates.",
  allLink: "All routes →",
  cardLink: "See the route →",
}

// "Can I do this?" (deck §1.3) is shared with the /self-drive landing
// pages, so it lives in lib/relaunch/copy.ts.

const BY_HAND = {
  eyebrow: "By hand — open",
  // Headline: "A route, drawn by hand." (amber italic on "by hand")
  subhead:
    "Tell us how you like to travel and how long you're happy at the wheel. We'll come back with three routes within 48 hours.",
  primaryCta: "Start a brief →",
  secondaryCta: "Speak to a planner",
  stepsEyebrow: "How it works — in three steps",
  steps: [
    ["01", "You tell us the months, the pace, and how far you like to drive."],
    ["02", "We draw three routes — at different paces and budgets."],
    ["03", "You pick one. We book it and send the road book."],
  ],
}

const FEATURED = {
  eyebrow: "From the collection",
  headline: "A few we'd send our friends to.",
  link: "Open the collection →",
}

const FIELD_NOTES_BLOCK = {
  eyebrow: "Field Notes",
  // Headline: "What to read before you drive." (amber italic on "drive")
  headlineLead: "What to read before you",
  headlineAccent: "drive",
  headlineTail: ".",
  link: "All Field Notes →",
}

// Three of the self-drive planning guides (handoff/relaunch/copy/field-notes).
// Titles, ledes and eyebrows from each guide's frontmatter. Images are
// each guide's hero (lib/relaunch/visuals.ts), never public/rentals.jpg
// (rooftop tent).
const FIELD_NOTES = [
  {
    href: "/field-notes/self-drive/namibia-or-zimbabwe-first",
    eyebrow: "Self-drive · 7 min",
    title: "Namibia or Zimbabwe for your first self-drive",
    lede: "An honest comparison of Namibia and Zimbabwe for a first lodge-based self-drive in southern Africa, and where Botswana fits.",
  },
  {
    href: "/field-notes/self-drive/choosing-a-vehicle",
    eyebrow: "Self-drive · 6 min",
    title: "Choosing a vehicle for a lodge-based self-drive",
    lede: "SUV, 4×4 or camper. Why sleeping in lodges lets you leave the rooftop tent behind, and what to check in the insurance before you sign.",
  },
  {
    href: "/field-notes/self-drive/driving-on-the-left",
    eyebrow: "Self-drive · 6 min",
    title: "Driving on the left, for American drivers",
    lede: "The left side, manual or automatic, the International Driving Permit and roundabouts. What changes when you drive yourself in southern Africa.",
  },
]

export default async function HomePage() {
  const settings = await getSettings()
  const featured = settings.show_featured_on_home
    ? await getFeaturedListings(3)
    : []

  const heroVideo = HERO_VIDEOS[HOME_VISUALS.heroVideo]
  const byHandImage = getMedia(HOME_VISUALS.byHand)
  const canIImage = getMedia(HOME_VISUALS.canI)

  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />

      <main className="flex-1">
        {/* ─── Hero: muted loop over a priority poster ───────────── */}
        <HeroMedia
          still={getMedia(HOME_VISUALS.heroVideo)}
          video={{ source: heroVideo, item: getMedia(heroVideo.id) }}
          height="h-[100svh] min-h-[640px] md:h-[92vh]"
        >
          <div className="container relative h-full flex flex-col justify-end pb-24 md:pb-28">
            <div className="max-w-4xl">
              <Eyebrow withRule>{HERO.eyebrow}</Eyebrow>
              <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
                Africa, <span className="italic text-amber">slowly</span>.
              </h1>
              <p className="mt-8 max-w-2xl font-serif italic text-h4-fluid text-bone-mute leading-snug">
                {HERO.subhead}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-none px-8 py-6 mono h-auto max-w-full whitespace-normal text-center" asChild>
                  <StartBriefLink source="hero">{HERO.primaryCta}</StartBriefLink>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none px-8 py-6 mono h-auto max-w-full whitespace-normal text-center border-bone/30 text-bone hover:border-amber hover:text-amber bg-transparent"
                  asChild
                >
                  <Link href="/routes">{HERO.secondaryCta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </HeroMedia>

        {/* In-season strip (InSeasonStrip) hidden pending southern-Africa seasonal data. */}

        {/* ─── By hand: the road book as an object ──────────────── */}
        <section className="container py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-5">
              <Eyebrow withRule>{BY_HAND.eyebrow}</Eyebrow>
              <h2 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance">
                A route, drawn{" "}
                <span className="italic text-amber">by hand</span>.
              </h2>
              <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
                {BY_HAND.subhead}
              </p>
              <p className="eyebrow mt-10 mb-4">{BY_HAND.stepsEyebrow}</p>
              <ol className="space-y-4">
                {BY_HAND.steps.map(([n, t]) => (
                  <li key={n} className="flex gap-5 border-t border-rule pt-4">
                    <span className="mono text-amber pt-1 shrink-0" aria-hidden>
                      {n}
                    </span>
                    <p className="font-serif text-h4-fluid text-bone leading-tight">{t}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-none px-8 py-6 mono h-auto max-w-full whitespace-normal text-center" asChild>
                  <StartBriefLink source="home-plan-card">
                    {BY_HAND.primaryCta}
                  </StartBriefLink>
                </Button>
                <PlannerCallTrigger size="lg" source="home">
                  {BY_HAND.secondaryCta}
                </PlannerCallTrigger>
              </div>
            </div>
            <CaptionedImage
              item={byHandImage}
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 55vw, 100vw"
              position="50% 60%"
              className="lg:col-span-7"
            />
          </div>
        </section>

        {/* ─── Routes: overview map + route cards (D-58: above "Three things") ── */}
        {ROUTES.length > 0 && (
          <section className="bg-ink border-y border-rule py-24 md:py-32">
            <div className="container">
              <RouteHoverProvider>
                <div className="grid gap-12 mb-16 lg:grid-cols-12 lg:items-end">
                  <div className="lg:col-span-5">
                    <Eyebrow withRule>{ROUTES_TEASER.eyebrow}</Eyebrow>
                    <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                      {ROUTES_TEASER.headlineLead}{" "}
                      <span className="italic text-amber">{ROUTES_TEASER.headlineAccent}</span>
                      {ROUTES_TEASER.headlineTail}
                    </h2>
                    <p className="mt-6 text-bone-mute leading-relaxed">{ROUTES_TEASER.lede}</p>
                    <Link
                      href="/routes"
                      className="mt-8 inline-block mono text-amber hover:text-amber-deep transition-colors"
                    >
                      {ROUTES_TEASER.allLink}
                    </Link>
                  </div>
                  <OverviewMap
                    titles={Object.fromEntries(ROUTES.map((r) => [r.slug, r.title]))}
                    className="lg:col-span-7"
                  />
                </div>

                <div className="grid gap-12 md:grid-cols-3">
                  {ROUTES.map((route, i) => (
                    <RouteCard key={route.slug} route={route} index={i + 1} linkLabel={ROUTES_TEASER.cardLink} thumbnail />
                  ))}
                </div>
              </RouteHoverProvider>
            </div>
          </section>
        )}

        {/* ─── Full bleed: Hwange ────────────────────────────────── */}
        <FullBleedImage item={getMedia(HOME_VISUALS.interludes[0])} kenBurns position="50% 60%" />

        {/* ─── The offer: three things ───────────────────────────── */}
        <section className="container py-24 md:py-32">
          <div className="max-w-3xl mb-16">
            <Eyebrow withRule>{OFFER.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              Three things we promise to do
              <span className="italic text-amber"> properly</span>.
            </h2>
          </div>

          <ImageNumberedList
            items={PILLARS.map((p, i) => ({ title: p.title, body: p.body, item: getMedia(HOME_VISUALS.pillars[i]) }))}
            className="max-w-4xl"
          />
        </section>

        {/* ─── Full bleed: Deadvlei ──────────────────────────────── */}
        <ParallaxImage item={getMedia(HOME_VISUALS.interludes[1])} />

        {/* ─── Can I do this? Against the road ───────────────────── */}
        <section className="container py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <Eyebrow withRule>{CAN_I.eyebrow}</Eyebrow>
                <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                  {CAN_I.headlineLead}{" "}
                  <span className="italic text-amber">{CAN_I.headlineAccent}</span>
                  {CAN_I.headlineTail}
                </h2>
                <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute leading-snug">
                  {CAN_I.lede}
                </p>
                <CaptionedImage
                  item={canIImage}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="mt-10"
                />
              </div>
            </div>
            <NumberedList items={CAN_I.items} twoColumn={false} className="lg:col-span-7 self-start" />
          </div>
        </section>

        {/* ─── Featured listings (real data) ─────────────────────── */}
        {featured.length > 0 && (
          <section className="py-24 md:py-32">
            <div className="container">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                  <Eyebrow>{FEATURED.eyebrow}</Eyebrow>
                  <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                    {FEATURED.headline}
                  </h2>
                </div>
                <Link
                  href="/categories"
                  className="mono text-amber hover:text-amber-deep transition-colors"
                >
                  {FEATURED.link}
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
              <Eyebrow withRule>{FIELD_NOTES_BLOCK.eyebrow}</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                {FIELD_NOTES_BLOCK.headlineLead}{" "}
                <span className="italic text-amber">{FIELD_NOTES_BLOCK.headlineAccent}</span>
                {FIELD_NOTES_BLOCK.headlineTail}
              </h2>
            </div>
            <Link
              href="/field-notes"
              className="mono text-amber hover:text-amber-deep transition-colors"
            >
              {FIELD_NOTES_BLOCK.link}
            </Link>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {FIELD_NOTES.map((note, i) => {
              const slug = note.href.split("/").pop() ?? ""
              const img = guideHero(slug)
              return (
                <Link
                  key={note.href}
                  href={note.href}
                  className="group block border-t border-rule pt-6 transition-colors hover:border-amber"
                >
                  {img && (
                    <div className="mb-6">
                      <div className="relative aspect-[4/3] overflow-hidden bg-card">
                        <Image
                          src={cardSrc(img)}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <BlendOverlay />
                      </div>
                      <MediaCaption item={img} className="mt-3" />
                    </div>
                  )}
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="mono text-amber">{String(i + 1).padStart(2, "0")}</span>
                    <span className="eyebrow">{note.eyebrow}</span>
                  </div>
                  <h3 className="font-serif text-h3-fluid text-bone leading-tight transition-colors group-hover:text-amber text-balance">
                    {note.title}
                  </h3>
                  <p className="mt-3 text-bone-mute leading-relaxed">{note.lede}</p>
                </Link>
              )
            })}
          </div>
        </section>

        <SectionRule className="container" />
      </main>

      <EditorialFooter />
    </div>
  )
}
