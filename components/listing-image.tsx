import {
  Compass,
  Tent,
  Hotel,
  Truck,
  Map as MapIcon,
  Camera,
  Plane,
  Utensils,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { ListingImageWithFallback } from "./listing-image-with-fallback"

/**
 * Treat empty strings, nulls, and our legacy placeholder.svg URLs as "no image".
 */
function isMissing(src: string | null | undefined): boolean {
  if (!src) return true
  if (src.trim() === "") return true
  if (src.includes("placeholder.svg")) return true
  return false
}

/**
 * Pick a category-appropriate Lucide icon for the fallback block.
 */
function iconForCategory(category?: string | null): LucideIcon {
  const c = (category ?? "").toLowerCase()
  if (c.includes("lodge") || c.includes("hotel")) return Hotel
  if (c.includes("camp") || c.includes("tent")) return Tent
  if (c.includes("4x4") || c.includes("rental") || c.includes("vehicle")) return Truck
  if (c.includes("tour") || c.includes("guide")) return MapIcon
  if (c.includes("photo")) return Camera
  if (c.includes("flight") || c.includes("transfer")) return Plane
  if (c.includes("food") || c.includes("dining")) return Utensils
  return Compass
}

type ListingImageProps = {
  src: string | null | undefined
  alt: string
  category?: string | null
  className?: string
}

/**
 * Renders a listing's image, or — when the URL is missing, points at a legacy
 * placeholder, OR the image fails to load at runtime — a tinted icon block
 * themed to the listing category.
 *
 * Always renders inside a parent that already has explicit width/height
 * (e.g. `relative h-48`); this component fills the parent.
 *
 * Server Component: chooses the icon at render time, then either emits the
 * fallback block directly or hands off to a tiny client component that can
 * react to `onError` if the URL exists but 404s/CORS-fails at fetch time.
 */
export function ListingImage({ src, alt, category, className }: ListingImageProps) {
  const Icon = iconForCategory(category)

  if (isMissing(src)) {
    return <Fallback Icon={Icon} alt={alt} className={className} />
  }

  return (
    <ListingImageWithFallback
      src={src as string}
      alt={alt}
      className={className}
      fallback={<Fallback Icon={Icon} alt={alt} className={className} />}
    />
  )
}

function Fallback({
  Icon,
  alt,
  className,
}: {
  Icon: LucideIcon
  alt: string
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex h-full w-full items-center justify-center bg-primary/10 ${className ?? ""}`}
    >
      <Icon className="h-12 w-12 text-primary/70" strokeWidth={1.5} aria-hidden="true" />
    </div>
  )
}
