import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getSelfDriveNote, SELF_DRIVE_NOTES } from "@/lib/field-notes/self-drive-notes"
import { FALLBACK_DATE, FIELD_NOTE_DATES } from "@/lib/field-note-dates"
import { getEditorById } from "@/lib/editors"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { Byline } from "@/components/Byline"
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs"
import { BreadcrumbsJsonLd } from "@/components/JsonLd/BreadcrumbsJsonLd"
import { ArticleJsonLd } from "@/components/JsonLd/ArticleJsonLd"
import { ArticleBody } from "@/components/ArticleBody"
import { StickyCTA } from "@/components/editorial/sticky-cta"
import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { PlannerCallTrigger } from "@/components/planner-call/planner-call-trigger"
import { Button } from "@/components/ui/button"

const SITE = "https://safarioverland.com"

/**
 * Self-drive guides. Content is baked into lib/field-notes/self-drive-notes.ts
 * by scripts/gen-self-drive-notes.mjs — no filesystem access at request time.
 * The layout's AutoBreadcrumbs / AutoArticleMeta skip these paths; the page
 * renders its own trail, byline and Article JSON-LD so the terminal crumb
 * and headline use the guide's real title.
 */
export const dynamicParams = false

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SELF_DRIVE_NOTES.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const note = getSelfDriveNote(slug)
  if (!note) return { title: "Field note not found" }
  const url = `${SITE}/field-notes/self-drive/${note.slug}`
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: url },
    openGraph: {
      title: note.title,
      description: note.description,
      url,
      type: "article",
    },
  }
}

export default async function SelfDriveNotePage({ params }: PageProps) {
  const { slug } = await params
  const note = getSelfDriveNote(slug)
  if (!note) notFound()

  const path = `/field-notes/self-drive/${note.slug}`
  const dates = FIELD_NOTE_DATES[path] ?? FALLBACK_DATE
  const editor = getEditorById(dates.editorId)

  const crumbs: Crumb[] = [
    { name: "Home", href: "/", item: SITE },
    { name: "Field Notes", href: "/field-notes", item: `${SITE}/field-notes` },
    { name: "Self-drive", href: "/field-notes/self-drive", item: `${SITE}/field-notes/self-drive` },
    { name: note.title, item: `${SITE}${path}` },
  ]

  // The next three guides in reading order, wrapping round to the start.
  const index = SELF_DRIVE_NOTES.findIndex((n) => n.slug === note.slug)
  const readNext = [1, 2, 3]
    .map((k) => SELF_DRIVE_NOTES[(index + k) % SELF_DRIVE_NOTES.length])
    .filter((n) => n.slug !== note.slug)

  return (
    <>
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs crumbs={crumbs} />
        <BreadcrumbsJsonLd crumbs={crumbs} />
      </div>

      <ArticleJsonLd
        headline={note.title}
        url={`${SITE}${path}`}
        image={null}
        datePublished={dates.datePublished}
        dateModified={dates.dateModified}
        editor={editor}
      />

      {/* ─── Title block (typographic; the guides carry no hero image) ── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-4xl">
          <Eyebrow withRule>{note.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-[0.96] tracking-tighter text-balance">
            {note.title}
          </h1>
          <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
            {note.description}
          </p>
        </div>
      </section>

      {/* ─── Guide body ───────────────────────────────────────── */}
      <article className="container pb-16 md:pb-20 max-w-3xl">
        <Link
          href="/field-notes/self-drive"
          className="inline-flex items-center gap-2 mb-8 mono text-bone-mute hover:text-amber transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All self-drive guides
        </Link>

        <Byline editor={editor} published={dates.datePublished} updated={dates.dateModified} />

        <ArticleBody markdown={note.body} />
      </article>

      {/* ─── Brief CTA ────────────────────────────────────────── */}
      <section className="border-y border-rule bg-ink py-24">
        <div className="container max-w-3xl">
          <Eyebrow withRule>By hand — open</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            A route, drawn <span className="italic text-amber">by hand</span>.
          </h2>
          <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
            Tell us how you like to travel and how long you&apos;re happy at the wheel. We&apos;ll
            come back with three routes within 48 hours.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-none px-8 py-6 mono h-auto max-w-full whitespace-normal text-center" asChild>
              <StartBriefLink source="field-notes">Start a brief →</StartBriefLink>
            </Button>
            <PlannerCallTrigger size="lg" source="field-notes">
              Speak to a planner
            </PlannerCallTrigger>
          </div>
        </div>
      </section>

      {/* ─── Read next ────────────────────────────────────────── */}
      {readNext.length > 0 && (
        <section className="container py-24">
          <Eyebrow withRule>More self-drive guides</Eyebrow>
          <div className="mt-10 grid gap-12 md:grid-cols-3">
            {readNext.map((n) => (
              <Link
                key={n.slug}
                href={`/field-notes/self-drive/${n.slug}`}
                className="group block border-t border-rule pt-6 transition-colors hover:border-amber"
              >
                <span className="eyebrow">{n.eyebrow}</span>
                <h3 className="mt-3 font-serif text-h3-fluid text-bone leading-tight transition-colors group-hover:text-amber text-balance">
                  {n.title}
                </h3>
                <p className="mt-3 text-bone-mute leading-relaxed">{n.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <StickyCTA href="/plan" label="Start a brief" />
    </>
  )
}
