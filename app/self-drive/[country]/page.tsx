import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Eyebrow } from "@/components/editorial/eyebrow"
import { NumberedList } from "@/components/editorial/numbered-list"
import { SectionRule } from "@/components/editorial/section-rule"
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs"
import { BreadcrumbsJsonLd } from "@/components/JsonLd/BreadcrumbsJsonLd"
import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { RouteCard } from "@/components/routes/route-card"
import { Button } from "@/components/ui/button"
import { CAN_I, LANDINGS, LANDING_SHARED as S, getLanding } from "@/lib/relaunch/copy"
import { getRouteSummary, type RouteSummary } from "@/lib/relaunch/routes"
import { HeroMedia } from "@/components/media/hero-media"
import { FullBleedImage } from "@/components/media/full-bleed-image"
import { ImageNumberedList } from "@/components/media/image-numbered-list"
import { Mosaic } from "@/components/media/mosaic"
import { NumbersStrip, type NumberItem } from "@/components/media/numbers-strip"
import { getMedia } from "@/lib/relaunch/media-select"
import { formatKm, getRouteStats } from "@/lib/relaunch/route-stats"
import { COUNTRY_VISUALS } from "@/lib/relaunch/visuals"

const SITE = "https://safarioverland.com"

/**
 * Ad landing pages (SITE_COPY.md §5). Indexable, and in the sitemap.
 * The H1s match the search phrase; ad headlines may test "road trip"
 * (US) or "self-drive holiday" (UK) without changing these.
 */
export const dynamicParams = false

interface PageProps {
  params: Promise<{ country: string }>
}

export function generateStaticParams() {
  return LANDINGS.map((l) => ({ country: l.country }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params
  const page = getLanding(country)
  if (!page) return { title: "Page not found" }
  const url = `${SITE}/self-drive/${page.country}`
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      images: [{ url: COUNTRY_VISUALS[page.country] ? getMedia(COUNTRY_VISUALS[page.country].hero).src : page.heroImage }],
    },
  }
}

function BriefCta({ cta }: { cta: React.ReactNode }) {
  return (
    <div className="container max-w-3xl">
      <Eyebrow withRule>By hand — open</Eyebrow>
      <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
        A route, drawn <span className="italic text-amber">by hand</span>.
      </h2>
      <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
        Tell us how you like to travel and how long you&apos;re happy at the wheel. We&apos;ll come
        back with three routes within 48 hours.
      </p>
      <div className="mt-10">{cta}</div>
      <p className="mt-6 mono text-bone-mute">{S.reassurance}</p>
    </div>
  )
}

/** The compact "Can I do this?": each answer's first sentence. */
function firstSentence(s: string): string {
  const m = s.match(/^.+?[.?!](?=\s|$)/)
  return m ? m[0] : s
}

export default async function SelfDriveLandingPage({ params }: PageProps) {
  const { country } = await params
  const page = getLanding(country)
  if (!page) notFound()

  const routes = page.routeSlugs
    .map((s) => getRouteSummary(s))
    .filter((r): r is RouteSummary => Boolean(r))

  const visuals = COUNTRY_VISUALS[page.country]
  const heroItem = visuals ? getMedia(visuals.hero) : undefined
  // Numbers from the lead route's data only; anything not computable is left out.
  const stats = routes[0] ? getRouteStats(routes[0].slug) : undefined
  const numbers: NumberItem[] = []
  numbers.push({ value: String(routes.length), label: routes.length === 1 ? "Signature route" : "Signature routes" })
  if (stats) {
    numbers.push({ value: stats.nights, label: "Nights" })
    if (stats.km) numbers.push({ value: formatKm(stats.km), label: "Kilometres, about" })
    numbers.push({ value: String(stats.stays), label: "Places to stay" })
    if (stats.bestMonths) numbers.push({ value: stats.bestMonths, label: "Best months" })
  }

  const crumbs: Crumb[] = [
    { name: "Home", href: "/", item: SITE },
    { name: `Self-drive in ${page.label}`, item: `${SITE}/self-drive/${page.country}` },
  ]

  const cta = (
    <Button
      size="lg"
      className="rounded-none px-8 py-6 mono h-auto max-w-full whitespace-normal text-center"
      asChild
    >
      <StartBriefLink source="self-drive-landing">{page.cta}</StartBriefLink>
    </Button>
  )

  return (
    <>
      {/* ─── Hero: a fast still, no video (paid traffic) ──────── */}
      {heroItem ? (
        <HeroMedia still={heroItem} height="flex min-h-[max(82vh,620px)] flex-col">
          {/* min-height, not height: on narrow phones the copy runs taller than
              the frame, and the top padding keeps it clear of the caption
              HeroMedia pins top-right on phones. */}
          <div className="container relative flex flex-1 flex-col justify-end pt-40 pb-20 md:pt-28 md:pb-24">
            <div className="max-w-4xl">
              <Eyebrow withRule>Self-drive · {page.label}</Eyebrow>
              <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
                {page.h1.lead} <span className="italic text-amber">{page.h1.accent}</span>
                {page.h1.tail}
              </h1>
              <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
                {page.subhead}
              </p>
              <div className="mt-10">{cta}</div>
              <p className="mt-5 mono text-bone-mute">{S.reassurance}</p>
            </div>
          </div>
        </HeroMedia>
      ) : null}

      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs crumbs={crumbs} />
        <BreadcrumbsJsonLd crumbs={crumbs} />
      </div>

      {/* ─── By the numbers ───────────────────────────────────── */}
      <section className="container pt-10">
        <NumbersStrip items={numbers} />
      </section>

      {/* ─── What we do (three things) ─────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow withRule>{S.benefitsEyebrow}</Eyebrow>
            {visuals ? (
              <ImageNumberedList
                items={page.benefits.map((b, i) => ({ title: b, item: getMedia(visuals.benefits[i]) }))}
                className="mt-10"
              />
            ) : (
              <NumberedList items={page.benefits.map((b) => ({ title: b }))} twoColumn={false} className="mt-10" />
            )}
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-rule lg:pl-12">
            <Eyebrow withRule>{S.notCampingEyebrow}</Eyebrow>
            <p className="mt-8 font-serif italic text-h3-fluid text-bone leading-snug text-balance">
              {page.notCamping}
            </p>
          </div>
        </div>
      </section>

      {/* ─── The route ───────────────────────────────────────── */}
      {routes.length > 0 && (
        <section className="bg-ink border-y border-rule py-24 md:py-32">
          <div className="container">
            <div className="mb-12">
              <Eyebrow withRule>{S.routesEyebrow}</Eyebrow>
            </div>
            <div className="grid gap-12 md:grid-cols-2">
              {routes.map((r) => (
                <RouteCard key={r.slug} route={r} linkLabel={S.secondaryLink} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── The country in three photographs ─────────────────── */}
      {visuals && (
        <section className="container pt-24 md:pt-32">
          <Mosaic items={visuals.gallery.map((id) => getMedia(id))} label={page.label} />
        </section>
      )}

      {/* ─── Can I do this? (compact) ─────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl mb-12">
          <Eyebrow withRule>{CAN_I.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            {CAN_I.headlineLead} <span className="italic text-amber">{CAN_I.headlineAccent}</span>
            {CAN_I.headlineTail}
          </h2>
        </div>
        <NumberedList
          items={CAN_I.items.map((i) => ({ title: i.title, body: firstSentence(i.body) }))}
          className="max-w-5xl"
        />
      </section>

      {/* ─── Brief CTA, over the country after dark ────────────── */}
      {visuals ? (
        <FullBleedImage item={getMedia(visuals.closing)} height="min-h-[600px] md:min-h-[75vh]" position="50% 60%">
          <div className="flex min-h-[600px] items-center py-24 md:min-h-[75vh]">
            <BriefCta cta={cta} />
          </div>
        </FullBleedImage>
      ) : (
        <section className="border-y border-rule bg-ink py-24">
          <BriefCta cta={cta} />
        </section>
      )}

      <SectionRule className="container my-16" />
    </>
  )
}
