import type { Editor } from "@/lib/editors"

const SITE = "https://safarioverland.com"

type Props = {
  headline: string
  url: string
  /** Absolute or site-relative URL for the article hero image. Optional. */
  image?: string | null
  /** ISO date string. */
  datePublished: string
  /** ISO date string. */
  dateModified: string
  editor: Editor
}

/**
 * Article + nested Person + Organization references for any field
 * note. Image and `sameAs` are conditional — both omitted when not
 * supplied, since Google prefers a missing field to an empty/null one.
 *
 * The Organization is referenced by @id ("/#org") rather than inlined
 * — it's defined once in <GlobalJsonLd /> on every page.
 */
export function ArticleJsonLd({
  headline,
  url,
  image,
  datePublished,
  dateModified,
  editor,
}: Props) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    ...(image ? { image: image.startsWith("http") ? image : `${SITE}${image}` } : {}),
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      "@id": `${SITE}/about#${editor.id}`,
      name: editor.name,
      jobTitle: editor.jobTitle,
      ...(editor.photo
        ? { image: editor.photo.startsWith("http") ? editor.photo : `${SITE}${editor.photo}` }
        : {}),
      worksFor: { "@id": `${SITE}/#org` },
      ...(editor.sameAs.length > 0 ? { sameAs: editor.sameAs } : {}),
    },
    publisher: { "@id": `${SITE}/#org` },
    mainEntityOfPage: url.startsWith("http") ? url : `${SITE}${url}`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
