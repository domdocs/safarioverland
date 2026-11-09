import type { Metadata } from "next"
import Image from "next/image"

import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { media, type MediaArea, type MediaItem } from "@/lib/relaunch/media"
import { captionFor, cardSrc } from "@/lib/relaunch/media-select"

const SITE = "https://safarioverland.com"

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Credits, sources and licences for the photographs and film on Safari Overland.",
  alternates: { canonical: `${SITE}/credits` },
}

const GROUPS: { area: MediaArea; label: string }[] = [
  { area: "zimbabwe", label: "Zimbabwe" },
  { area: "namibia", label: "Namibia" },
  { area: "four-corners", label: "Chobe and the Zambezi Region" },
  { area: "atmosphere", label: "On the road" },
  { area: "video", label: "Film" },
]

/** "CC BY-SA 4.0 (https://…)" → name and link. */
function splitLicence(licence: string): { name: string; url?: string } {
  const m = licence.match(/^(.*?)\s*\((https?:\/\/[^)]+)\)\s*$/)
  return m ? { name: m[1], url: m[2] } : { name: licence }
}

function Row({ item }: { item: MediaItem }) {
  const licence = splitLicence(item.licence)
  const thumb = item.type === "video" ? item.poster : cardSrc(item)
  return (
    <li className="grid gap-4 border-t border-rule py-6 sm:grid-cols-[8rem_1fr] sm:gap-6">
      <div className="relative aspect-[4/3] w-32 overflow-hidden bg-card">
        {thumb && <Image src={thumb} alt="" fill sizes="128px" className="object-cover" />}
      </div>
      <div className="min-w-0">
        <p className="text-bone leading-snug">{item.alt}</p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-mute">{captionFor(item)}</p>
        <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm text-bone-mute sm:grid-cols-[7rem_1fr]">
          <dt className="font-mono text-[11px] uppercase tracking-[0.16em]">By</dt>
          <dd>
            {item.authorUrl ? (
              <a href={item.authorUrl} rel="noopener" className="text-amber underline decoration-amber/40 underline-offset-4 hover:decoration-amber">
                {item.author}
              </a>
            ) : (
              item.author
            )}
          </dd>
          <dt className="font-mono text-[11px] uppercase tracking-[0.16em]">Licence</dt>
          <dd>
            {licence.url ? (
              <a href={licence.url} rel="noopener" className="text-amber underline decoration-amber/40 underline-offset-4 hover:decoration-amber">
                {licence.name}
              </a>
            ) : (
              licence.name
            )}
            {item.attributionRequired ? "" : " · no attribution required"}
          </dd>
          {item.credit && (
            <>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em]">Credit</dt>
              <dd>{item.credit}</dd>
            </>
          )}
          <dt className="font-mono text-[11px] uppercase tracking-[0.16em]">Source</dt>
          <dd className="break-words">
            <a href={item.sourceUrl} rel="noopener" className="text-amber underline decoration-amber/40 underline-offset-4 hover:decoration-amber">
              {item.source === "wikimedia" ? "Wikimedia Commons" : item.source === "pexels" ? "Pexels" : "Unsplash"}
            </a>
          </dd>
        </dl>
      </div>
    </li>
  )
}

export default function CreditsPage() {
  return (
    <>
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow withRule>Photo credits</Eyebrow>
          <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-[0.96] tracking-tighter text-balance">
            Who took the <span className="italic text-amber">photographs</span>.
          </h1>
          <p className="mt-8 text-bone-mute leading-relaxed max-w-2xl">
            Every photograph and film on the site, with its source and licence. Files from Wikimedia
            Commons were resized and converted to WebP; the films were trimmed and re-encoded, with no
            sound. Where a place couldn&apos;t be confirmed, the caption says only what we know.
          </p>
        </div>
      </section>

      <SectionRule className="container" />

      {GROUPS.map((g) => {
        const items = media.filter((m) => m.area === g.area)
        if (items.length === 0) return null
        return (
          <section key={g.area} className="container py-16">
            <h2 className="font-serif text-h3-fluid text-bone leading-tight">{g.label}</h2>
            <ul className="mt-8 max-w-4xl">
              {items.map((m) => (
                <Row key={m.id} item={m} />
              ))}
            </ul>
          </section>
        )
      })}

      <SectionRule className="container my-16" />
    </>
  )
}
