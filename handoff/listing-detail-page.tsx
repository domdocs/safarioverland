// ============================================================================
// Safari Overland — app/listings/[id]/page.tsx
//
// Reference Server Component port of the listing-detail mockup
// (B_Listing in the design canvas) onto the existing Next.js architecture.
//
// What changed vs. the current implementation:
//   • Replaces the shadcn Card-based right-rail + tabbed body with a
//     full-bleed editorial layout. Hero is no longer a rounded rectangle.
//   • Removes the placeholder business-hours card. Real data only.
//   • Splits into two files: this page (Server Component, data fetching)
//     and ListingDetailEditorial (presentational, mostly server-renderable).
//   • Sticky mobile CTA via a small Client Component island.
//
// What did NOT change:
//   • Data layer. Still calls getListingById / getListingsByCategory
//     from "@/lib/listings".
//   • Routing, generateMetadata, notFound handling.
//   • shadcn Button is still used for the primary CTA — it just inherits
//     the new tokens, so it renders amber-on-night automatically.
//
// File placement:
//   app/listings/[id]/page.tsx                ← this file (replaces existing)
//   components/editorial/listing-detail.tsx   ← presentational component
//   components/editorial/sticky-cta.tsx       ← client island
// ============================================================================

import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata, ResolvingMetadata } from "next"

import { getListingById, getListingsByCategory } from "@/lib/listings"
import { ListingImage } from "@/components/listing-image"
import { ListingCard } from "@/components/listing-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/editorial/sticky-cta"
import { Button } from "@/components/ui/button"

// ─── Metadata ───────────────────────────────────────────────────────────────
interface ListingPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: ListingPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  await parent
  const { id } = await params
  const listing = await getListingById(id)

  if (!listing) {
    return {
      title: "Listing Not Found",
      description: "The requested safari listing could not be found.",
    }
  }

  return {
    title: `${listing.listing_name} | Safari Overland`,
    description: listing.description?.substring(0, 160),
    openGraph: {
      title: listing.listing_name,
      description: listing.description?.substring(0, 160),
      images: [listing.image_url || "/placeholder.svg?height=1200&width=2400"],
    },
  }
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params
  const listing = await getListingById(id)
  if (!listing) notFound()

  const related = (await getListingsByCategory(listing.category, 4))
    .filter((r) => r.id !== listing.id)
    .slice(0, 3)

  const {
    listing_name,
    description,
    image_url,
    location,
    category,
    contact_email,
    contact_phone,
    website_url,
    price_info,
    amenities = [],
    coordinates,
  } = listing

  // First-person verdict if provided in description metadata, else fall back
  // to a leading paragraph. (You may want to add a `verdict` column.)
  const firstSentence =
    description?.split(/(?<=[.?!])\s/).slice(0, 2).join(" ") ?? ""

  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <Header />

      <main className="flex-1 pb-32 lg:pb-0">
        {/* ── Cinematic hero ──────────────────────────────────────── */}
        <section className="relative h-[72vh] min-h-[560px] w-full overflow-hidden">
          <ListingImage
            src={image_url}
            alt={listing_name}
            category={category}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-night/30 via-transparent to-night"
          />

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="absolute left-0 right-0 top-0 z-10 border-b border-white/10 bg-night/30 backdrop-blur"
          >
            <div className="container flex items-center gap-3 py-4 mono text-bone-mute">
              <Link href="/" className="hover:text-amber">Home</Link>
              <span aria-hidden>/</span>
              <Link
                href={`/categories/${category?.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-amber"
              >
                {category}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-bone">{listing_name}</span>
            </div>
          </nav>

          {/* Title block */}
          <div className="container absolute inset-x-0 bottom-12 z-10">
            <p className="eyebrow mb-4">
              {category}
              {location ? <> · {location}</> : null}
            </p>
            <h1 className="font-serif text-h1-fluid leading-[0.94] tracking-tighter">
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

        {/* ── Verdict + body ─────────────────────────────────────── */}
        <section className="container grid grid-cols-1 gap-16 py-24 lg:grid-cols-12">
          {/* Left rail — sticky meta */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <MetaBlock label="Category">{category}</MetaBlock>
              <MetaBlock label="Location">{location}</MetaBlock>
              {price_info && <MetaBlock label="Indicative">{price_info}</MetaBlock>}
              {coordinates && (
                <MetaBlock label="Coordinates">
                  {coordinates.latitude.toFixed(4)},{" "}
                  {coordinates.longitude.toFixed(4)}
                </MetaBlock>
              )}
            </div>
          </aside>

          {/* Right column — verdict + description + amenities */}
          <div className="lg:col-span-8">
            {firstSentence && (
              <blockquote className="border-l-2 border-amber pl-8">
                <p className="font-serif text-h3-fluid leading-[1.25] tracking-editorial">
                  {firstSentence}
                </p>
                <footer className="mono mt-6 text-bone-mute">
                  — Safari Overland editors
                </footer>
              </blockquote>
            )}

            {description && (
              <div className="mt-16 max-w-prose space-y-6 text-[19px] leading-[1.6] text-bone-mute">
                {description.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {amenities.length > 0 && (
              <section className="mt-16 border-t border-rule pt-12">
                <p className="eyebrow mb-8">What's here</p>
                <ul className="grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2">
                  {amenities.map((a: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-4 border-b border-rule/60 py-3"
                    >
                      <span className="mono text-amber">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-bone">{a}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Contact */}
            {(contact_email || contact_phone || website_url) && (
              <section className="mt-16 border-t border-rule pt-12">
                <p className="eyebrow mb-8">Direct</p>
                <dl className="space-y-0">
                  {website_url && (
                    <ContactRow label="Website">
                      <a
                        href={website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber"
                      >
                        {website_url.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    </ContactRow>
                  )}
                  {contact_email && (
                    <ContactRow label="Email">
                      <a href={`mailto:${contact_email}`} className="hover:text-amber">
                        {contact_email}
                      </a>
                    </ContactRow>
                  )}
                  {contact_phone && (
                    <ContactRow label="Phone">
                      <a href={`tel:${contact_phone}`} className="hover:text-amber">
                        {contact_phone}
                      </a>
                    </ContactRow>
                  )}
                </dl>

                {/* Desktop CTA — mobile gets the StickyCTA island */}
                <div className="mt-12 hidden lg:block">
                  <Button
                    size="lg"
                    className="rounded-none px-8 py-6 mono"
                    asChild
                  >
                    <Link href={`/plan?ref=${listing.id}`}>
                      Add to a planning brief →
                    </Link>
                  </Button>
                </div>
              </section>
            )}
          </div>
        </section>

        {/* ── Related ─────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="border-t border-rule bg-ink py-24">
            <div className="container">
              <p className="eyebrow mb-4">Adjacent</p>
              <h2 className="mb-12 font-serif text-h2-fluid tracking-tight">
                More in <span className="italic-accent">{category}</span>
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <ListingCard key={r.id} listing={r} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Mobile-only sticky CTA (Client Component) */}
      <StickyCTA
        href={`/plan?ref=${listing.id}`}
        price={price_info}
        label="Add to plan"
      />
    </div>
  )
}

// ─── Local presentational helpers ──────────────────────────────────────────

function MetaBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{label}</p>
      <p className="font-serif text-2xl italic leading-tight tracking-editorial text-bone">
        {children}
      </p>
    </div>
  )
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between border-b border-rule/60 py-4">
      <dt className="mono text-bone-mute">{label}</dt>
      <dd className="font-serif text-lg italic text-bone">{children}</dd>
    </div>
  )
}

function formatCoord(n: number | undefined, axis: "lat" | "lng") {
  if (n === undefined || n === null) return ""
  const abs = Math.abs(n)
  const deg = Math.floor(abs)
  const min = Math.floor((abs - deg) * 60)
  const dir =
    axis === "lat" ? (n >= 0 ? "N" : "S") : n >= 0 ? "E" : "W"
  return `${deg}°${String(min).padStart(2, "0")}′${dir}`
}
