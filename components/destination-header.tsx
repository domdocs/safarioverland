import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Eyebrow } from "@/components/editorial/eyebrow"

interface DestinationHeaderProps {
  title: string
  description: string
  image: string
  facts: {
    label: string
    value: string
  }[]
  /** Optional eyebrow label, e.g. "East Africa · 04 countries". */
  eyebrow?: string
  /** Optional crumbs above the title. */
  breadcrumb?: { href: string; label: string }[]
}

export function DestinationHeader({
  title,
  description,
  image,
  facts,
  eyebrow,
  breadcrumb,
}: DestinationHeaderProps) {
  return (
    <>
      <section className="relative h-[72vh] min-h-[520px] w-full overflow-hidden bg-night">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-night/30 via-transparent to-night"
        />

        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="absolute left-0 right-0 top-0 z-10 border-b border-white/10 bg-night/30 backdrop-blur"
          >
            <ol className="container flex flex-wrap items-center gap-2 py-4 mono text-bone-mute">
              {breadcrumb.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden />}
                  {i === breadcrumb.length - 1 ? (
                    <span className="text-bone" aria-current="page">
                      {c.label}
                    </span>
                  ) : (
                    <Link href={c.href} className="hover:text-amber transition-colors">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="container relative h-full flex flex-col justify-end pb-16 md:pb-20">
          {eyebrow && <Eyebrow withRule>{eyebrow}</Eyebrow>}
          <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-[0.96] tracking-tighter text-balance max-w-4xl">
            {title}
          </h1>
          <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
            {description}
          </p>
        </div>
      </section>

      {facts.length > 0 && (
        <section className="border-y border-rule bg-ink">
          <dl className="container grid grid-cols-2 md:grid-cols-4 divide-x divide-rule">
            {facts.map((fact, index) => (
              <div key={index} className="px-4 py-6">
                <dt className="eyebrow mb-2">{fact.label}</dt>
                <dd className="font-serif text-h4-fluid text-bone leading-tight">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </>
  )
}
