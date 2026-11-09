import type { Metadata } from "next"
import Image from "next/image"
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
      images: [{ url: page.heroImage }],
    },
  }
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
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[82vh] min-h-[620px] w-full overflow-hidden bg-night">
        <Image
          src={page.heroImage}
          alt={page.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/30 to-night"
        />
        <div className="container relative h-full flex flex-col justify-end pb-16 md:pb-24">
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
      </section>

      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs crumbs={crumbs} />
        <BreadcrumbsJsonLd crumbs={crumbs} />
      </div>

      {/* ─── What we do (three things) ─────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow withRule>{S.benefitsEyebrow}</Eyebrow>
            <NumberedList
              items={page.benefits.map((b) => ({ title: b }))}
              twoColumn={false}
              className="mt-10"
            />
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

      {/* ─── Brief CTA ────────────────────────────────────────── */}
      <section className="border-y border-rule bg-ink py-24">
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
      </section>

      <SectionRule className="container my-16" />
    </>
  )
}
