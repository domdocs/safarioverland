import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { notFound } from "next/navigation"

import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { StickyCTA } from "@/components/editorial/sticky-cta"
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs"
import { BreadcrumbsJsonLd } from "@/components/JsonLd/BreadcrumbsJsonLd"
import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { PlannerCallTrigger } from "@/components/planner-call/planner-call-trigger"
import { ScrollRouteMap } from "@/components/maps/scroll-route-map"
import { RouteItinerary } from "@/components/routes/route-itinerary"
import { StayCard } from "@/components/routes/stay-card"
import { Button } from "@/components/ui/button"
import { HeroMedia } from "@/components/media/hero-media"
import { NumbersStrip, type NumberItem } from "@/components/media/numbers-strip"
import { ParallaxImage } from "@/components/media/parallax-image"
import { FullBleedImage } from "@/components/media/full-bleed-image"
import { MediaCaption } from "@/components/media/media-caption"
import { cardSrc, getMedia, placeLabelFor, type MediaItem } from "@/lib/relaunch/media-select"
import { formatKm, getRouteStats, type RouteStats } from "@/lib/relaunch/route-stats"
import { ROUTE_VISUALS, guideHero, routeHero } from "@/lib/relaunch/visuals"
import { ROUTES, getRouteSummary } from "@/lib/relaunch/routes"
import { getRouteView } from "@/lib/relaunch/route-editorial"
import { ROUTE_DETAIL as C } from "@/lib/relaunch/copy"
import { getSelfDriveNote, type SelfDriveNote } from "@/lib/field-notes/self-drive-notes"

const SITE = "https://safarioverland.com"

/** Only the routes in ROUTES exist; anything else is a 404. */
export const dynamicParams = false

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return ROUTES.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const summary = getRouteSummary(slug)
  if (!summary) return { title: "Route not found" }
  const view = getRouteView(slug)
  const url = `${SITE}/routes/${slug}`
  const title = view?.metaTitle ?? `${summary.title}: a self-drive safari route`
  const description = view?.metaDescription ?? summary.hook
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: routeHero(slug)?.still.src ?? summary.heroImage ?? "" }].filter((i) => i.url),
    },
  }
}

function SectionHead({
  eyebrow,
  heading,
  lede,
}: {
  eyebrow?: string
  heading: string
  lede?: string
}) {
  return (
    <div className="max-w-3xl mb-12 md:mb-16">
      {eyebrow && <Eyebrow withRule>{eyebrow}</Eyebrow>}
      <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
        {heading}
      </h2>
      {lede && <p className="mt-6 text-bone-mute leading-relaxed">{lede}</p>}
    </div>
  )
}

/** Facts already shown as numerals in the strip. */
const IN_STRIP = new Set(["Nights", "Countries", "Longest drive"])

function numberItems(stats: RouteStats): NumberItem[] {
  const items: NumberItem[] = []
  if (stats.km) items.push({ value: formatKm(stats.km), label: "Kilometres, about" })
  items.push({ value: stats.nights, label: "Nights" })
  items.push({ value: String(stats.stays), label: stats.stays === 1 ? "Place to stay" : "Places to stay" })
  if (stats.borders === 0) items.push({ value: "0", label: "Border crossings" })
  else items.push({ value: String(stats.countries), label: stats.countries === 1 ? "Country" : "Countries" })
  if (stats.longestDrive) {
    items.push({
      value: stats.longestDrive.value,
      label: "Longest day at the wheel",
      note: stats.longestDrive.estimate ? "Estimate" : undefined,
    })
  }
  return items
}

/** The area photo above a stay card: labelled as the place, never as the lodge. */
function StayFigure({ item }: { item?: MediaItem }): ReactNode {
  if (!item) {
    return (
      <div className="flex h-20 items-center justify-center border-b border-rule bg-card">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-mute">
          Photograph of the lodge to come
        </span>
      </div>
    )
  }
  return (
    <figure>
      <div className="relative aspect-[16/9] overflow-hidden bg-card">
        <Image src={cardSrc(item)} alt={item.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
      </div>
      <figcaption className="px-6 pt-3 md:px-8">
        <MediaCaption item={item} caption={placeLabelFor(item) ?? undefined} />
        <span className="mt-1 block text-xs text-bone-mute">Photograph of the lodge to come</span>
      </figcaption>
    </figure>
  )
}

function MakeItYours({ slug, image }: { slug: string; image?: MediaItem }) {
  const inner = (
      <div className="container max-w-3xl">
        <Eyebrow withRule>{C.cta.eyebrow}</Eyebrow>
        <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
          {C.cta.headlineLead} <span className="italic text-amber">{C.cta.headlineAccent}</span>
          {C.cta.headlineTail}
        </h2>
        <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
          {C.cta.body}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="rounded-none px-8 py-6 mono h-auto max-w-full whitespace-normal text-center" asChild>
            <StartBriefLink source="route-page" href={`/plan?route=${slug}`}>
              {C.cta.primary}
            </StartBriefLink>
          </Button>
          <PlannerCallTrigger size="lg" source="route-page">
            {C.cta.secondary}
          </PlannerCallTrigger>
        </div>
        <p className="mt-6 mono text-bone-mute">{C.cta.reassurance}</p>
      </div>
  )
  if (!image) return <section className="border-y border-rule bg-ink py-24 md:py-32">{inner}</section>
  return (
    <FullBleedImage item={image} height="min-h-[640px] md:min-h-[80vh]" position="50% 60%">
      <div className="flex min-h-[640px] items-center py-24 md:min-h-[80vh] md:py-32">{inner}</div>
    </FullBleedImage>
  )
}

export default async function RoutePage({ params }: PageProps) {
  const { slug } = await params
  const summary = getRouteSummary(slug)
  if (!summary) notFound()
  const view = getRouteView(slug)

  const crumbs: Crumb[] = [
    { name: "Home", href: "/", item: SITE },
    { name: "Routes", href: "/routes", item: `${SITE}/routes` },
    { name: summary.title, item: `${SITE}/routes/${slug}` },
  ]

  const eyebrow = `${C.eyebrowPrefix} · ${summary.countries.join(" · ")}`
  const hero = routeHero(slug)
  const visuals = ROUTE_VISUALS[slug]
  const stats = getRouteStats(slug)
  const dayMedia: Record<string, MediaItem> = Object.fromEntries(
    Object.entries(visuals?.days ?? {}).map(([k, id]) => [k, getMedia(id)]),
  )
  const closing = visuals ? getMedia(visuals.closing) : undefined
  const notes = (view?.fieldNotes ?? [])
    .map((s) => getSelfDriveNote(s))
    .filter((n): n is SelfDriveNote => Boolean(n))

  return (
    <>
      {/* ─── Hero: a loop where we have footage, else a still with a slow zoom ── */}
      <HeroMedia
        still={hero?.still ?? getMedia("long-gravel-road-sunrise")}
        video={hero?.video && hero.videoItem ? { source: hero.video, item: hero.videoItem } : undefined}
        kenBurns={!hero?.video}
        height="h-[100svh] min-h-[600px] md:h-[85vh]"
      >
        <div className="container relative h-full flex flex-col justify-end pb-20 md:pb-24">
          <div className="max-w-4xl">
            <Eyebrow withRule>{eyebrow}</Eyebrow>
            <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
              {view ? (
                <>
                  {view.headline.lead} <span className="italic text-amber">{view.headline.accent}</span>
                  {view.headline.tail}
                </>
              ) : (
                summary.title
              )}
            </h1>
            <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
              {view?.summary ?? summary.hook}
            </p>
          </div>
        </div>
      </HeroMedia>

      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs crumbs={crumbs} />
        <BreadcrumbsJsonLd crumbs={crumbs} />
      </div>

      {!view ? (
        /* ─── Route still being drawn ──────────────────────────── */
        <>
          <section className="container py-24 md:py-32">
            <div className="max-w-3xl">
              <Eyebrow withRule>{C.drawing.eyebrow}</Eyebrow>
              <p className="mt-6 font-serif text-h3-fluid text-bone leading-snug text-balance">
                {C.drawing.body}
              </p>
              <p className="mt-6 mono text-bone-mute">{summary.nights}</p>
            </div>
          </section>
          <MakeItYours slug={slug} image={closing} />
        </>
      ) : (
        <>
          {/* ─── By the numbers, then the remaining facts ─────── */}
          <section className="container pt-10 pb-20 md:pb-24">
            {stats && <NumbersStrip items={numberItems(stats)} className="border-t-0 pt-4" />}
            <dl className="grid gap-x-8 gap-y-6 border-b border-rule py-8 sm:grid-cols-2 lg:grid-cols-5">
              {view.facts
                .filter((f) => !IN_STRIP.has(f.label))
                .map((f) => (
                  <div key={f.label}>
                    <dt className="eyebrow">{f.label}</dt>
                    <dd className="mt-2 text-bone leading-snug">{f.value}</dd>
                    {f.note && <dd className="mt-1 text-sm text-bone-mute">{f.note}</dd>}
                  </div>
                ))}
              <div>
                <dt className="eyebrow">Price</dt>
                <dd className="mt-2 text-bone leading-snug">{C.priceLine}</dd>
                <dd className="mt-1 text-sm text-bone-mute">{C.priceFootnote}</dd>
              </div>
            </dl>
          </section>

          {/* ─── The drive ────────────────────────────────────── */}
          <section className="container pb-16 md:pb-24">
            <SectionHead eyebrow="Day by day" heading={C.drive.heading} lede={C.drive.lede} />
            <ScrollRouteMap
              slug={slug}
              title={summary.title}
              days={view.days.map((d) => ({ key: d.key, label: d.label, from: d.from, to: d.to, noDriving: d.noDriving }))}
            >
              <RouteItinerary days={view.days} media={dayMedia} />
            </ScrollRouteMap>
          </section>

          {visuals && <ParallaxImage item={getMedia(visuals.interludes[0])} position="50% 65%" />}

          {/* ─── Where you stay ───────────────────────────────── */}
          <section className="bg-ink/40 border-y border-rule py-24 md:py-32">
            <div className="container">
              <SectionHead eyebrow="The nights" heading={C.stay.heading} lede={C.stay.lede} />
              {view.nights.length === 0 ? (
                <p className="text-bone-mute max-w-2xl">{C.stay.empty}</p>
              ) : (
                <div className="space-y-16">
                  {view.nights.map((n) => (
                    <div key={n.dayLabel} className="border-t border-rule pt-8">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-6">
                        <span className="mono text-amber">{n.dayLabel}</span>
                        <span className="font-serif text-h4-fluid text-bone">{n.place}</span>
                        {n.optional && (
                          <span className="mono text-[11px] uppercase tracking-[0.18em] text-amber border border-dashed border-amber/60 px-2 py-0.5">
                            {n.optional}
                          </span>
                        )}
                      </div>
                      <div className="grid gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                          <StayCard
                            stay={n.primary}
                            figure={
                              <StayFigure
                                item={visuals?.stays[n.primary.slug] ? getMedia(visuals.stays[n.primary.slug]) : undefined}
                              />
                            }
                          />
                        </div>
                        {n.alternatives.length > 0 && (
                          <div className="lg:col-span-5 space-y-6">
                            <p className="eyebrow">{C.stay.alternativesLabel}</p>
                            {n.alternatives.map((a) => (
                              <StayCard key={a.slug} stay={a} variant="alternative" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <p className="text-sm text-bone-mute max-w-3xl">{C.stay.ratesNote}</p>
                </div>
              )}
            </div>
          </section>

          {/* ─── On the road ──────────────────────────────────── */}
          <section className="container py-24 md:py-32">
            <SectionHead eyebrow="Between the parks" heading={C.onTheRoad.heading} lede={C.onTheRoad.lede} />
            {view.onTheRoad.length === 0 ? (
              <p className="text-bone-mute max-w-2xl">{C.onTheRoad.empty}</p>
            ) : (
              <ul className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
                {view.onTheRoad.map((s) => (
                  <li key={s.slug} className="border-t border-rule pt-6">
                    <p className="mono text-amber">
                      {s.dayLabel} · {s.overnight ? C.onTheRoad.overnight : C.onTheRoad.stop}
                    </p>
                    <h3 className="mt-2 font-serif text-h4-fluid text-bone leading-tight">{s.name}</h3>
                    <p className="mt-1 text-sm text-bone-mute">{s.area}</p>
                    <p className="mt-3 text-bone-mute leading-relaxed">{s.whyWeListIt}</p>
                    {s.overnight && (
                      <p className="mt-3 mono text-[13px] text-bone-mute">
                        {s.rateLine}
                        {s.hasRate && " · indicative"}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {visuals && <ParallaxImage item={getMedia(visuals.interludes[1])} />}

          {/* ─── Before you go ────────────────────────────────── */}
          <section className="bg-ink border-y border-rule py-24 md:py-32">
            <div className="container">
              <SectionHead eyebrow="Practicalities" heading={C.beforeYouGo.heading} lede={C.beforeYouGo.lede} />
              <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
                {view.beforeYouGo.map((item) => (
                  <div key={item.heading} className="border-t border-rule pt-6">
                    <h3 className="font-serif text-h4-fluid text-bone leading-tight">{item.heading}</h3>
                    <p className="mt-3 text-bone-mute leading-relaxed">{item.body}</p>
                    {item.link && (
                      <Link
                        href={item.link.href}
                        className="mt-3 inline-block mono text-amber hover:text-amber-deep transition-colors"
                      >
                        {item.link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {view.borders && (
                <div className="mt-16">
                  <h3 className="font-serif text-h3-fluid text-bone leading-tight">
                    {C.beforeYouGo.bordersHeading}
                  </h3>
                  <p className="mt-3 text-bone-mute max-w-3xl">{view.borders.lede}</p>
                  <ul className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-2">
                    {view.borders.posts.map((b) => (
                      <li key={b.name} className="border-t border-rule pt-6">
                        <p className="eyebrow">{b.between}</p>
                        <h4 className="mt-2 font-serif text-h4-fluid text-bone">{b.name}</h4>
                        <p className="mt-2 mono text-amber">{b.hours}, confirm before travel</p>
                        <p className="mt-3 text-bone-mute leading-relaxed">{b.notes}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* ─── Variants ─────────────────────────────────────── */}
          {view.variants.length > 0 && (
            <section className="container py-24 md:py-32">
              <SectionHead eyebrow="Variants" heading={C.variants.heading} lede={C.variants.lede} />
              <ul className="max-w-4xl">
                {view.variants.map((v, i) => (
                  <li key={i} className="flex gap-6 border-t border-rule py-6">
                    <span className="mono text-amber pt-1 shrink-0" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-bone leading-relaxed">{v}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <MakeItYours slug={slug} image={closing} />

          {/* ─── Field Notes ──────────────────────────────────── */}
          {notes.length > 0 && (
            <section className="container py-24">
              <Eyebrow withRule>{C.fieldNotes.eyebrow}</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight">
                {C.fieldNotes.heading}
              </h2>
              <div className="mt-10 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                {notes.map((n) => {
                  const img = guideHero(n.slug)
                  return (
                  <Link
                    key={n.slug}
                    href={`/field-notes/self-drive/${n.slug}`}
                    className="group block border-t border-rule pt-6 transition-colors hover:border-amber"
                  >
                    {img && (
                      <div className="mb-5">
                        <div className="relative aspect-[16/10] overflow-hidden bg-card">
                          <Image
                            src={cardSrc(img)}
                            alt={img.alt}
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                        <MediaCaption item={img} creditOnly className="mt-2" />
                      </div>
                    )}
                    <span className="eyebrow">{n.eyebrow}</span>
                    <h3 className="mt-3 font-serif text-h4-fluid text-bone leading-tight transition-colors group-hover:text-amber text-balance">
                      {n.title}
                    </h3>
                    <p className="mt-3 text-sm text-bone-mute leading-relaxed">{n.description}</p>
                  </Link>
                  )
                })}
              </div>
            </section>
          )}

          {/* Sources are kept in handoff/relaunch/research/, not shown on the page. */}
        </>
      )}

      <div className="container pb-16">
        <Link href="/routes" className="mono text-bone-mute hover:text-amber transition-colors">
          {C.back}
        </Link>
      </div>

      <SectionRule className="container mb-16" />
      <StickyCTA href={`/plan?route=${slug}`} label="Start a brief" />
    </>
  )
}
