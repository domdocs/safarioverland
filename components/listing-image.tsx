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
 * Renders a listing's image, or — when the URL is missing or a legacy
 * placeholder — a tinted icon block themed to the listing category.
 *
 * Always renders inside a parent that already has explicit width/height
 * (e.g. `relative h-48`); this component fills the parent.
 */
export function ListingImage({ src, alt, category, className }: ListingImageProps) {
  if (isMissing(src)) {
    const Icon = iconForCategory(category)
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex h-full w-full items-center justify-center bg-primary/10 ${className ?? ""}`}
      >
        <Icon
          className="h-12 w-12 text-primary/70"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
    )
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src as string}
      alt={alt}
      className={`h-full w-full object-cover ${className ?? ""}`}
    />
  )
}
