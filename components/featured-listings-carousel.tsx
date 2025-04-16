"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import type { DirectoryListing } from "@/lib/listings"

interface FeaturedListingsCarouselProps {
  listings: DirectoryListing[]
  title?: string
  description?: string
}

export function FeaturedListingsCarousel({
  listings,
  title = "Featured Listings",
  description = "Discover our handpicked selection of premium safari experiences",
}: FeaturedListingsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = Math.max(0, listings.length - 3)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const newIndex = Math.max(0, Math.min(index, maxIndex))
      setCurrentIndex(newIndex)

      const cardWidth = containerRef.current.offsetWidth / 3
      containerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth",
      })
    }
  }

  const nextSlide = () => {
    scrollToIndex(currentIndex + 1)
  }

  const prevSlide = () => {
    scrollToIndex(currentIndex - 1)
  }

  // Format category for display
  const formatCategory = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide} disabled={currentIndex === 0}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide} disabled={currentIndex >= maxIndex}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div ref={containerRef} className="flex gap-6 overflow-x-hidden scroll-smooth">
            {listings.map((listing) => (
              <Card
                key={listing.id}
                className="min-w-[calc(33.333%-1rem)] flex-shrink-0 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <Link href={`/listings/${listing.id}`} className="relative block h-48">
                  <Image
                    src={listing.image_url || "/placeholder.svg?height=300&width=400"}
                    alt={listing.listing_name}
                    fill
                    className="object-cover"
                  />
                  <Badge variant="secondary" className="absolute top-2 right-2 bg-primary text-white">
                    Featured
                  </Badge>
                </Link>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/listings/${listing.id}`} className="hover:underline">
                      <h3 className="font-bold text-lg line-clamp-1">{listing.listing_name}</h3>
                    </Link>
                    <Badge variant="outline">{formatCategory(listing.category)}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>
                      {listing.location}, {listing.country}
                    </span>
                  </div>
                  <p className="text-sm line-clamp-2 mb-4 text-muted-foreground">{listing.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="font-medium text-sm">{listing.price_info}</div>
                    <Link href={`/listings/${listing.id}`} className="text-sm font-medium text-primary hover:underline">
                      View Details
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
