import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { StickyCTA } from "@/components/editorial/sticky-cta"
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs"
import { BreadcrumbsJsonLd } from "@/components/JsonLd/BreadcrumbsJsonLd"
import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { PlannerCallTrigger } from "@/components/planner-call/planner-call-trigger"
import { RouteItinerary } from "@/components/routes/route-itinerary"
import { StayCard } from "@/components/routes/stay-card"
import { Button } from "@/components/ui/button"
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
      ...(summary.heroImage ? { images: [{ url: summary.heroImage }] } : {}),
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

function MakeItYours({ slug }: { slug: string }) {
  return (
    <section className="border-y border-rule bg-ink py-24 md:py-32">
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
          <Button size="lg" className="rounded-none px-8 py-6 mono" asChild>
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
    </section>
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
  const notes = (view?.fieldNotes ?? [])
    .map((s) => getSelfDriveNote(s))
    .filter((n): n is SelfDriveNote => Boolean(n))

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[78vh] min-h-[600px] w-full overflow-hidden bg-night">
        {summary.heroImage && (
          <Image
            src={summary.heroImage}
            alt={view?.heroAlt ?? summary.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/30 to-night"
        />
        <div className="container relative h-full flex flex-col justify-end pb-16 md:pb-24">
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
      </section>

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
          <MakeItYours slug={slug} />
        </>
      ) : (
        <>
          {/* ─── Facts strip ──────────────────────────────────── */}
          <section className="container pt-12 pb-20 md:pb-24">
            <dl className="grid gap-x-8 gap-y-8 border-y border-rule py-10 sm:grid-cols-2 lg:grid-cols-4">
              {view.facts.map((f) => (
                <div key={f.label}>
                  <dt className="eyebrow">{f.label}</dt>
                  <dd className="mt-2 font-serif text-h4-fluid text-bone leading-tight">{f.value}</dd>
                  {f.note && <dd className="mt-1 text-sm text-bone-mute">{f.note}</dd>}
                </div>
              ))}
              <div>
                <dt className="eyebrow">Price</dt>
                <dd className="mt-2 font-serif text-h4-fluid text-bone leading-tight">{C.priceLine}</dd>
                <dd className="mt-1 text-sm text-bone-mute">{C.priceFootnote}</dd>
              </div>
            </dl>
          </section>

          {/* ─── The drive ────────────────────────────────────── */}
          <section className="container pb-16 md:pb-24">
            <SectionHead eyebrow="Day by day" heading={C.drive.heading} lede={C.drive.lede} />
            <div className="max-w-4xl">
              <RouteItinerary days={view.days} />
            </div>
          </section>

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
                          <StayCard stay={n.primary} />
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

          <MakeItYours slug={slug} />

          {/* ─── Field Notes ──────────────────────────────────── */}
          {notes.length > 0 && (
            <section className="container py-24">
              <Eyebrow withRule>{C.fieldNotes.eyebrow}</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight">
                {C.fieldNotes.heading}
              </h2>
              <div className="mt-10 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                {notes.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/field-notes/self-drive/${n.slug}`}
                    className="group block border-t border-rule pt-6 transition-colors hover:border-amber"
                  >
                    <span className="eyebrow">{n.eyebrow}</span>
                    <h3 className="mt-3 font-serif text-h4-fluid text-bone leading-tight transition-colors group-hover:text-amber text-balance">
                      {n.title}
                    </h3>
                    <p className="mt-3 text-sm text-bone-mute leading-relaxed">{n.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ─── Sources ──────────────────────────────────────── */}
          {view.sources.length > 0 && (
            <section className="container pb-16">
              <details className="group border-t border-rule pt-6">
                <summary className="cursor-pointer list-none mono text-bone-mute hover:text-amber transition-colors">
                  {C.sources.summary} ({view.sources.length})
                  <span className="ml-2 inline-block transition-transform group-open:rotate-90" aria-hidden>
                    →
                  </span>
                </summary>
                <p className="mt-4 text-sm text-bone-mute max-w-3xl">{C.sources.lede}</p>
                <ol className="mt-4 space-y-1 text-xs text-bone-mute break-all columns-1 lg:columns-2 gap-12">
                  {view.sources.map((u) => (
                    <li key={u}>
                      <a href={u} rel="nofollow noopener noreferrer" target="_blank" className="hover:text-amber">
                        {u}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            </section>
          )}
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
