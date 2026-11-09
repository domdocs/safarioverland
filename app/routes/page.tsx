import type { Metadata } from "next"

import { Eyebrow } from "@/components/editorial/eyebrow"
import { NumberedList } from "@/components/editorial/numbered-list"
import { SectionRule } from "@/components/editorial/section-rule"
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs"
import { BreadcrumbsJsonLd } from "@/components/JsonLd/BreadcrumbsJsonLd"
import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { OverviewMap } from "@/components/maps/overview-map"
import { RouteHoverProvider } from "@/components/maps/route-hover"
import { RouteCard } from "@/components/routes/route-card"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/relaunch/routes"
import { ROUTES_INDEX as C } from "@/lib/relaunch/copy"
import { HeroMedia } from "@/components/media/hero-media"
import { CaptionedImage } from "@/components/media/captioned-image"
import { getMedia } from "@/lib/relaunch/media-select"
import { ROUTES_INDEX_VISUALS as V } from "@/lib/relaunch/visuals"

const SITE = "https://safarioverland.com"

export const metadata: Metadata = {
  title: C.metaTitle,
  description: C.metaDescription,
  alternates: { canonical: `${SITE}/routes` },
  openGraph: {
    title: C.metaTitle,
    description: C.metaDescription,
    url: `${SITE}/routes`,
    images: [{ url: getMedia(V.hero).src }],
  },
}

const crumbs: Crumb[] = [
  { name: "Home", href: "/", item: SITE },
  { name: "Routes", item: `${SITE}/routes` },
]

export default function RoutesIndexPage() {
  return (
    <>
      {/* ─── Opening: a photograph of the road ───────────────── */}
      <HeroMedia still={getMedia(V.hero)} kenBurns height="h-[75vh] min-h-[560px]" position="50% 70%">
        <div className="container relative h-full flex flex-col justify-end pb-20 md:pb-24">
          <div className="max-w-3xl">
            <Eyebrow withRule>{C.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
              {C.headlineLead} <span className="italic text-amber">{C.headlineAccent}</span>
              {C.headlineTail}
            </h1>
            <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
              {C.lede}
            </p>
          </div>
        </div>
      </HeroMedia>

      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs crumbs={crumbs} />
        <BreadcrumbsJsonLd crumbs={crumbs} />
      </div>

      {/* ─── Routes: the overview map, then a row per route ──── */}
      <RouteHoverProvider>
        <section className="container py-20 md:py-28">
          <OverviewMap
            titles={Object.fromEntries(ROUTES.map((r) => [r.slug, r.title]))}
            className="mb-20 max-w-5xl md:mb-28"
          />
          <div className="space-y-20 md:space-y-28">
            {ROUTES.map((route, i) => (
              <RouteCard
                key={route.slug}
                route={route}
                index={i + 1}
                linkLabel={C.cardLink}
                thumbnail
                variant="row"
                flip={i % 2 === 1}
              />
            ))}
          </div>
        </section>
      </RouteHoverProvider>

      {/* ─── How a route works ───────────────────────────────── */}
      <section className="bg-ink border-y border-rule py-24 md:py-32">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <Eyebrow withRule>{C.how.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              {C.how.headlineLead} <span className="italic text-amber">{C.how.headlineAccent}</span>
              {C.how.headlineTail}
            </h2>
          </div>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <NumberedList items={C.how.items} twoColumn={false} className="lg:col-span-7 self-start" />
            <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:grid-cols-1">
              {V.how.map((id) => (
                <CaptionedImage
                  key={id}
                  item={getMedia(id)}
                  card
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 1024px) 35vw, 50vw"
                />
              ))}
            </div>
          </div>
          <div className="mt-16 max-w-4xl border-t border-rule pt-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <p className="font-serif italic text-h4-fluid text-bone-mute leading-snug max-w-xl">
              {C.how.closing}
            </p>
            <Button size="lg" className="rounded-none px-8 py-6 mono h-auto max-w-full whitespace-normal text-center shrink-0" asChild>
              <StartBriefLink source="routes-index">{C.how.button}</StartBriefLink>
            </Button>
          </div>
        </div>
      </section>

      <SectionRule className="container my-16" />
    </>
  )
}
