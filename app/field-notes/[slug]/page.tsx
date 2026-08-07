import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getArticleBySlug } from "@/lib/articles"
import { getEditorById } from "@/lib/editors"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { Byline } from "@/components/Byline"
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs"
import { BreadcrumbsJsonLd } from "@/components/JsonLd/BreadcrumbsJsonLd"
import { ArticleJsonLd } from "@/components/JsonLd/ArticleJsonLd"
import { ArticleBody } from "@/components/ArticleBody"
import { StickyCTA } from "@/components/editorial/sticky-cta"

const SITE = "https://safarioverland.com"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  await parent
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  // Public surface — only published articles get rendered or appear in
  // page metadata. Draft / archived rows must 404 (admin surface is at
  // /admin/articles).
  if (!article || article.status !== "published") {
    return {
      title: "Field note not found",
      description: "The requested field note could not be found.",
    }
  }

  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    alternates: {
      canonical: `${SITE}/field-notes/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.hero_image ? [article.hero_image] : [],
    },
  }
}

export default async function FieldNotePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  // Public surface — same gate as the metadata branch.
  if (!article || article.status !== "published") notFound()

  // author_name is a free text column; getEditorById returns Niels for
  // any unknown id, keeping the one-editor voice enforced by CLAUDE.md.
  const editor = getEditorById(article.author_name)
  const published = article.published_at ?? article.created_at
  const updated = article.updated_at

  const crumbs: Crumb[] = [
    { name: "Home", href: "/", item: SITE },
    { name: "Field Notes", href: "/field-notes", item: `${SITE}/field-notes` },
    { name: article.title, item: `${SITE}/field-notes/${slug}` },
  ]

  return (
    <>
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs crumbs={crumbs} />
        <BreadcrumbsJsonLd crumbs={crumbs} />
      </div>

      <ArticleJsonLd
        headline={article.title}
        url={`${SITE}/field-notes/${slug}`}
        image={article.hero_image}
        datePublished={published}
        dateModified={updated}
        editor={editor}
      />

      {/* ─── Hero / title block ─────────────────────────────── */}
      {article.hero_image ? (
        <section className="relative h-[68vh] min-h-[480px] w-full overflow-hidden bg-night">
          <Image
            src={article.hero_image}
            alt={article.title}
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
            <Eyebrow withRule>Field notes</Eyebrow>
            <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-[0.96] tracking-tighter text-balance max-w-4xl">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
                {article.excerpt}
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="container py-24 md:py-32">
          <div className="max-w-4xl">
            <Eyebrow withRule>Field notes</Eyebrow>
            <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-[0.96] tracking-tighter text-balance">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
                {article.excerpt}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ─── Article body ───────────────────────────────────── */}
      <article className="container py-16 md:py-20 max-w-3xl">
        <Link
          href="/field-notes"
          className="inline-flex items-center gap-2 mb-8 mono text-bone-mute hover:text-amber transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to field notes
        </Link>

        <Byline editor={editor} published={published} updated={updated} />

        {article.body_md && <ArticleBody markdown={article.body_md} />}
      </article>

      <StickyCTA href="/plan" label="Start a brief" />
    </>
  )
}
