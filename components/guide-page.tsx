import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"

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
}

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
}: GuidePageProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link
          href={backHref}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {backLabel}
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3">{title}</h1>
        <p className="text-xl text-muted-foreground">{subtitle}</p>
      </div>

      <div className="text-lg leading-relaxed mb-10">{intro}</div>

      <div className="space-y-12">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">{s.heading}</h2>
            {s.body && <div className="text-base leading-relaxed mb-4 space-y-3">{s.body}</div>}
            {s.bullets && (
              <ul className="space-y-2 list-disc list-inside text-base text-muted-foreground">
                {s.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}
            {s.callout && (
              <div className="mt-4 bg-muted rounded-lg p-5 border-l-4 border-primary">
                <h3 className="font-semibold mb-1">{s.callout.title}</h3>
                <p className="text-sm text-muted-foreground">{s.callout.body}</p>
              </div>
            )}
          </section>
        ))}
      </div>

      {ctaTitle && (
        <section className="mt-16 bg-primary text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-3">{ctaTitle}</h2>
          {ctaBody && <p className="mb-5 max-w-2xl mx-auto">{ctaBody}</p>}
          {ctaHref && ctaLabel && (
            <Link
              href={ctaHref}
              className="inline-block bg-white text-primary font-medium px-6 py-3 rounded-lg hover:bg-white/90"
            >
              {ctaLabel}
            </Link>
          )}
        </section>
      )}

      {relatedLinks.length > 0 && (
        <div className="mt-16 border-t pt-8">
          <h3 className="text-lg font-semibold mb-4">Related guides</h3>
          <ul className="grid sm:grid-cols-2 gap-3">
            {relatedLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex items-center gap-2 text-primary hover:underline">
                  <ChevronRight className="h-4 w-4" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
