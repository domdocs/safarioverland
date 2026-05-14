import Link from "next/link"
import type { ReactNode } from "react"

import { ListingImage } from "@/components/listing-image"
import { Button } from "@/components/ui/button"
import { PlannerCallTrigger } from "@/components/planner-call/planner-call-trigger"
import { AddToBriefLink } from "@/components/analytics/add-to-brief-link"
import { GalleryLightbox } from "./gallery-lightbox"
import { ListingCardEditorial } from "./listing-card-editorial"
import type { DirectoryListing } from "@/lib/listings"

/**
 * Editorial listing detail — presentational. Takes the resolved listing +
 * related listings and renders the full page body. Server Component.
 *
 * Intentionally schema-tolerant: optional fields (`amenities`, `coordinates`,
 * `verdict`, `stayed_at`) are read off a permissive shape so they "just appear"
 * when those columns are added to Supabase later. Until then, those sections
 * simply don't render.
 */

type ImageAttributionEntry = {
  supplied_by?: string | null
  uploaded_at?: string | null
  licence?: string | null
  alt_text?: string | null
}

type ImageAttribution = {
  hero?: ImageAttributionEntry
  gallery?: (ImageAttributionEntry & { url?: string | null })[]
  founder?: ImageAttributionEntry
}

type LooseListing = DirectoryListing & {
  amenities?: string[]
  coordinates?: { latitude: number; longitude: number } | null
  verdict?: string | null
  stayed_at?: string | null
  website_url?: string | null
  image_attribution?: ImageAttribution | null
}

type ListingDetailProps = {
  listing: LooseListing
  related: DirectoryListing[]
}

function categoryHref(category: string | null | undefined): string {
  if (!category) return "/categories"
  return `/categories/${category.toLowerCase().replace(/\s+/g, "-")}`
}

function formatCoord(n: number | undefined, axis: "lat" | "lng"): string {
  if (n === undefined || n === null) return ""
  const abs = Math.abs(n)
  const deg = Math.floor(abs)
  const min = Math.floor((abs - deg) * 60)
  const dir = axis === "lat" ? (n >= 0 ? "N" : "S") : n >= 0 ? "E" : "W"
  return `${deg}°${String(min).padStart(2, "0")}′${dir}`
}

export function ListingDetail({ listing, related }: ListingDetailProps) {
  const {
    listing_name,
    description,
    image_url,
    location,
    country,
    category,
    website,
    website_url,
    price_info,
    amenities = [],
    coordinates,
    verdict,
    stayed_at,
    image_attribution,
  } = listing

  const gallery_urls = (listing.gallery_urls ?? []).filter(
    (u): u is string => typeof u === "string" && u.trim().length > 0,
  )
  const founder_name = listing.founder_name?.trim() || null
  const founder_note = listing.founder_note?.trim() || null
  const founder_image_url = listing.founder_image_url?.trim() || null

  // Prefer operator-supplied alt text where present; fall back to the
  // listing name so screen-reader users still get something useful.
  const heroAlt =
    image_attribution?.hero?.alt_text?.trim() || listing_name
  const founderAlt =
    image_attribution?.founder?.alt_text?.trim() ||
    (founder_name ? `Portrait of ${founder_name}` : `Portrait, ${listing_name}`)
  function galleryAlt(url: string, index: number): string {
    const fromAttribution = image_attribution?.gallery?.find(
      (g) => g?.url === url,
    )?.alt_text
    return (
      fromAttribution?.trim() || `${listing_name} — gallery ${index + 1}`
    )
  }

  const websiteHref = website_url ?? website ?? null

  // Verdict: prefer explicit field, fall back to first 1–2 sentences.
  const verdictText =
    verdict?.trim() ||
    description?.split(/(?<=[.?!])\s/).slice(0, 2).join(" ").trim() ||
    ""

  return (
    <main className="flex-1 pb-32 lg:pb-0">
      {/* ── Cinematic hero ─────────────────────────────────────────── */}
      <section className="relative h-[72vh] min-h-[560px] w-full overflow-hidden bg-night">
        <ListingImage
          src={image_url}
          alt={heroAlt}
          category={category}
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
          priority
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-night/30 via-transparent to-night"
        />

        {/* Breadcrumb floats over the image */}
        <nav
          aria-label="Breadcrumb"
          className="absolute left-0 right-0 top-0 z-10 border-b border-white/10 bg-night/30 backdrop-blur"
        >
          <div className="container flex flex-wrap items-center gap-3 py-4 mono text-bone-mute">
            <Link href="/" className="hover:text-amber transition-colors">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href={categoryHref(category)} className="hover:text-amber transition-colors">
              {category}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-bone">{listing_name}</span>
          </div>
        </nav>

        {/* Title block, pinned bottom */}
        <div className="container absolute inset-x-0 bottom-12 z-10">
          <p className="eyebrow mb-4">
            {category}
            {location ? <> · {location}</> : null}
            {country && location !== country ? <> · {country}</> : null}
          </p>
          <h1 className="font-serif text-h1-fluid text-bone leading-[0.94] tracking-tighter text-balance max-w-4xl">
            {listing_name}
          </h1>
          {coordinates && (
            <p className="mono mt-6 text-bone-mute">
              {formatCoord(coordinates.latitude, "lat")} ·{" "}
              {formatCoord(coordinates.longitude, "lng")}
            </p>
          )}
        </div>
      </section>

      {/* ── Verdict + body ────────────────────────────────────────── */}
      <section className="container grid grid-cols-1 gap-16 py-24 lg:grid-cols-12">
        {/* Sticky meta rail */}
        <aside className="lg:col-span-4">
          <div className="sticky top-32 space-y-12">
            {category && <MetaBlock label="Category">{category}</MetaBlock>}
            {location && <MetaBlock label="Location">{location}</MetaBlock>}
            {country && country !== location && (
              <MetaBlock label="Country">{country}</MetaBlock>
            )}
            {price_info && <MetaBlock label="Indicative">{price_info}</MetaBlock>}
            {coordinates && (
              <MetaBlock label="Coordinates">
                {coordinates.latitude.toFixed(4)},{" "}
                {coordinates.longitude.toFixed(4)}
              </MetaBlock>
            )}
            {stayed_at && (
              <MetaBlock label="Visited">{stayed_at}</MetaBlock>
            )}
          </div>
        </aside>

        {/* Verdict + description + amenities + contact */}
        <div className="lg:col-span-8">
          {verdictText && (
            <blockquote className="border-l-2 border-amber pl-8">
              <p className="font-serif text-h3-fluid text-bone leading-[1.25] tracking-editorial text-balance">
                {verdictText}
              </p>
              <footer className="mono mt-6 text-bone-mute">
                — Safari Overland editors
              </footer>
            </blockquote>
          )}

          {description && (
            <div className="mt-16 max-w-prose space-y-6 text-[19px] leading-[1.6] text-bone-mute">
              {description
                .split(/\n{2,}/)
                .filter((p) => p.trim())
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </div>
          )}

          {(founder_note || founder_image_url || founder_name) && (
            <section
              className="mt-16 border-t border-rule pt-12"
              aria-label="A note from the founder"
            >
              <p className="eyebrow mb-8">A note from the founder</p>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                {founder_image_url && (
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full bg-card">
                    <ListingImage
                      src={founder_image_url}
                      alt={founderAlt}
                      category={category}
                      className="absolute inset-0 h-full w-full object-cover"
                      sizes="128px"
                    />
                  </div>
                )}
                <div className="max-w-prose">
                  {founder_note && (
                    <blockquote className="font-serif italic text-h4-fluid text-bone leading-snug text-balance">
                      “{founder_note}”
                    </blockquote>
                  )}
                  {founder_name && (
                    <p className="mono mt-4 text-bone-mute">
                      — {founder_name}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {amenities.length > 0 && (
            <section className="mt-16 border-t border-rule pt-12">
              <p className="eyebrow mb-8">What&apos;s here</p>
              <ul className="grid grid-cols-1 gap-x-12 gap-y-0 sm:grid-cols-2">
                {amenities.map((a, i) => (
                  <li
                    key={`${a}-${i}`}
                    className="flex items-baseline gap-4 border-b border-rule/60 py-4"
                  >
                    <span className="mono text-amber" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-bone">{a}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/*
           * Direct section — operator contact name / email / phone are
           * deliberately not surfaced on the public listing page (see
           * handoff/briefs/2026-05-IMAGE_PIPELINE_V2_AND_CONTACT_CLEANUP.md).
           * Enquiries route through Safari Overland's planning service.
           * The website link is kept — visitors going to the operator
           * for further research is on-brand. Contact fields stay in
           * the admin edit form for internal record-keeping.
           */}
          <section className="mt-16 border-t border-rule pt-12">
            <p className="eyebrow mb-8">Enquire</p>
            {websiteHref && (
              <dl className="space-y-0">
                <ContactRow label="Website">
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber transition-colors"
                  >
                    {websiteHref
                      .replace(/^https?:\/\/(www\.)?/, "")
                      .replace(/\/$/, "")}
                  </a>
                </ContactRow>
              </dl>
            )}

            {/* Desktop CTA — mobile gets the StickyCTA island */}
            <div className="mt-12 hidden lg:flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-none px-8 py-6 mono bg-amber text-night hover:bg-amber-deep"
                asChild
              >
                <AddToBriefLink
                  href={`/plan?listing=${listing.id}`}
                  listingId={listing.id}
                  listingName={listing_name}
                  category={category ?? ""}
                  region={country ?? location ?? ""}
                >
                  Add this to a brief →
                </AddToBriefLink>
              </Button>
              <PlannerCallTrigger size="lg" source="listing-detail">
                Speak to a planner →
              </PlannerCallTrigger>
            </div>
          </section>
        </div>
      </section>

      {/* ── Gallery ────────────────────────────────────────────────── */}
      {gallery_urls.length > 0 && (
        <section
          className="border-t border-rule bg-ink py-24"
          aria-label="Photography"
        >
          <div className="container">
            <p className="eyebrow mb-4">Photography</p>
            <h2 className="mb-12 font-serif text-h2-fluid text-bone tracking-tight text-balance">
              <span className="italic-accent">{listing_name}</span> in
              pictures
            </h2>
            <GalleryLightbox
              listingName={listing_name}
              images={gallery_urls.map((url, i) => ({
                url,
                alt: galleryAlt(url, i),
              }))}
            />
          </div>
        </section>
      )}

      {/* ── Related ────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-rule bg-ink py-24">
          <div className="container">
            <p className="eyebrow mb-4">Adjacent</p>
            <h2 className="mb-12 font-serif text-h2-fluid text-bone tracking-tight text-balance">
              More in <span className="italic-accent">{category}</span>
            </h2>
            <div>
              {related.slice(0, 3).map((r, i) => (
                <ListingCardEditorial
                  key={r.id}
                  href={`/listings/${r.id}`}
                  index={i + 1}
                  eyebrow={r.category}
                  title={r.listing_name}
                  lede={
                    r.description
                      ? r.description.split(/(?<=[.?!])\s/).slice(0, 1).join(" ")
                      : undefined
                  }
                  location={
                    r.location && r.country && r.location !== r.country
                      ? `${r.location} · ${r.country}`
                      : r.location || r.country
                  }
                  imageUrl={r.image_url}
                  category={r.category}
                  price={r.price_info || undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

// ─── Local presentational helpers ──────────────────────────────────────────

function MetaBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{label}</p>
      <p className="font-serif text-2xl italic leading-tight tracking-editorial text-bone">
        {children}
      </p>
    </div>
  )
}

function ContactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule/60 py-4">
      <dt className="mono text-bone-mute">{label}</dt>
      <dd className="font-serif text-lg italic text-bone text-right">{children}</dd>
    </div>
  )
}
