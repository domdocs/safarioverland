import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronRight, Info } from "lucide-react"

import { Eyebrow } from "@/components/editorial/eyebrow"
import { Button } from "@/components/ui/button"

export type GuideSection = {
  heading: string
  body?: ReactNode
  bullets?: string[]
  callout?: { title: string; body: string }
}

export type RelatedLink = { href: string; label: string }

export type GuidePageProps = {
  title: string
  subtitle: string
  intro: ReactNode
  sections: GuideSection[]
  relatedLinks?: RelatedLink[]
  backHref: string
  backLabel: string
  ctaTitle?: string
  ctaBody?: string
  ctaHref?: string
  ctaLabel?: string
  heroImage?: string
  heroAlt?: string
  /** Optional reading time, e.g. "06 min". Renders in the eyebrow. */
  readingTime?: string
  /** Optional eyebrow context line, e.g. "Field notes — Planning". */
  eyebrow?: string
}

/**
 * Editorial article template — used by every long-form guide under
 * /resources/* (planning guides, conservation, seasonal, safety,
 * country guides). Drop-cap intro, ruled section heads, italic-amber
 * callouts, related-guide footer, optional CTA card.
 *
 * Header/Footer chrome comes from app/resources/layout.tsx — this
 * component is just the article body. Server Component.
 */
export function GuidePage({
  title,
  subtitle,
  intro,
  sections,
  relatedLinks = [],
  backHref,
  backLabel,
  ctaTitle,
  ctaBody,
  ctaHref,
  ctaLabel,
  heroImage,
  heroAlt,
  readingTime,
  eyebrow,
}: GuidePageProps) {
  const eyebrowText = eyebrow
    ? readingTime
      ? `${eyebrow} · ${readingTime}`
      : eyebrow
    : readingTime
      ? `Field notes · ${readingTime}`
      : "Field notes"

  return (
    <>
      {/* ─── Hero / title block ─────────────────────────────── */}
        {heroImage ? (
          <section className="relative h-[68vh] min-h-[480px] w-full overflow-hidden bg-night">
            <Image
              src={heroImage}
              alt={heroAlt ?? title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-night/30 via-transparent to-night"
            />
            <div className="container relative h-full flex flex-col justify-end pb-16">
              <Eyebrow withRule>{eyebrowText}</Eyebrow>
              <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-[0.96] tracking-tighter text-balance max-w-4xl">
                {title}
              </h1>
              <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
                {subtitle}
              </p>
            </div>
          </section>
        ) : (
          <section className="container py-24 md:py-32">
            <div className="max-w-4xl">
              <Eyebrow withRule>{eyebrowText}</Eyebrow>
              <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-[0.96] tracking-tighter text-balance">
                {title}
              </h1>
              <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
                {subtitle}
              </p>
            </div>
          </section>
        )}

        {/* ─── Article body ───────────────────────────────────── */}
        <article className="container py-16 md:py-20 max-w-3xl">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 mb-12 mono text-bone-mute hover:text-amber transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>

          {/* Drop-cap intro — first paragraph's first letter scaled up. */}
          <div className="text-[19px] leading-[1.7] text-bone-mute [&>p]:mb-5 [&>p:first-of-type]:text-bone [&>p:first-of-type]:first-letter:font-serif [&>p:first-of-type]:first-letter:text-amber [&>p:first-of-type]:first-letter:text-[5rem] [&>p:first-of-type]:first-letter:leading-[0.9] [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-1">
            {intro}
          </div>

          {/* Sections */}
          <div className="mt-16 space-y-16">
            {sections.map((s, i) => (
              <section key={i}>
                <div className="flex items-baseline gap-4 mb-4 border-t border-rule pt-8">
                  <span className="mono text-amber" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-serif text-h3-fluid text-bone leading-tight tracking-tight text-balance">
                    {s.heading}
                  </h2>
                </div>

                {s.body && (
                  <div className="text-[18px] leading-[1.65] text-bone-mute space-y-4">{s.body}</div>
                )}

                {s.bullets && (
                  <ul className="mt-4 space-y-3">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex gap-4 text-bone-mute leading-relaxed">
                        <span className="mono text-amber shrink-0 pt-0.5" aria-hidden>
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.callout && (
                  <aside className="mt-8 border-l-2 border-amber pl-6 py-3 bg-card/40">
                    <div className="flex items-baseline gap-3 mb-2">
                      <Info className="h-4 w-4 text-amber" aria-hidden />
                      <p className="eyebrow">{s.callout.title}</p>
                    </div>
                    <p className="font-serif italic text-lg text-bone leading-snug">
                      {s.callout.body}
                    </p>
                  </aside>
                )}
              </section>
            ))}
          </div>

          {/* Optional CTA card */}
          {ctaTitle && (
            <section className="mt-20 border-t border-rule pt-12">
              <div className="bg-amber text-night p-10">
                <p className="mono mb-3 text-night/80">Next step</p>
                <h2 className="font-serif text-h3-fluid leading-tight tracking-tight text-balance">
                  {ctaTitle}
                </h2>
                {ctaBody && (
                  <p className="mt-4 font-serif italic text-h4-fluid leading-snug max-w-2xl">
                    {ctaBody}
                  </p>
                )}
                {ctaHref && ctaLabel && (
                  <div className="mt-8">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-none px-8 py-6 mono bg-night text-bone hover:bg-ink"
                    >
                      <Link href={ctaHref}>{ctaLabel} →</Link>
                    </Button>
                  </div>
                )}
              </div>
            </section>
          )}
        </article>

        {/* ─── Related guides ─────────────────────────────────── */}
        {relatedLinks.length > 0 && (
          <section className="border-t border-rule bg-ink py-20">
            <div className="container max-w-5xl">
              <Eyebrow>Read next</Eyebrow>
              <h2 className="mt-4 mb-10 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                Adjacent field notes.
              </h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                {relatedLinks.map((l, i) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group flex items-baseline gap-4 border-t border-rule pt-5 hover:border-amber transition-colors"
                    >
                      <span className="mono text-amber" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif text-h4-fluid text-bone leading-tight transition-colors group-hover:text-amber">
                        {l.label}
                      </span>
                      <ChevronRight className="h-4 w-4 text-bone-mute shrink-0 ml-auto transition-colors group-hover:text-amber" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
    </>
  )
}
