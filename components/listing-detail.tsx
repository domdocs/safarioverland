"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ListingCard } from "@/components/listing-card"

interface ListingDetailProps {
  listing: any
  relatedListings?: any[]
}

export function ListingDetail({ listing, relatedListings = [] }: ListingDetailProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showMap, setShowMap] = useState(false)

  if (!listing) {
    return <div className="container mx-auto px-4 py-8">Listing not found</div>
  }

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

  // Truncate description if it's too long
  const shortDescription = description?.substring(0, 300) + "..."
  const displayDescription = showFullDescription ? description : shortDescription

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/categories" className="hover:text-primary">
          Categories
        </Link>{" "}
        /{" "}
        <Link href={`/categories/${category?.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-primary">
          {category}
        </Link>{" "}
        / <span className="text-gray-700">{listing_name}</span>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left column - Main info */}
        <div className="lg:col-span-2">
          <div className="mb-6 overflow-hidden rounded-lg">
            <img
              src={image_url || `/placeholder.svg?height=500&width=800&text=${encodeURIComponent(listing_name || "")}`}
              alt={listing_name}
              className="h-[400px] w-full object-cover"
            />
          </div>

          <h1 className="mb-4 text-3xl font-bold">{listing_name}</h1>
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{category}</span>
            <span className="text-sm text-gray-500">{location}</span>
            {price_info && <span className="font-medium text-green-600">{price_info}</span>}
          </div>

          <div className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">About</h2>
            <p className="text-gray-700">{displayDescription}</p>
            {description?.length > 300 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 text-sm font-medium text-primary hover:underline"
              >
                {showFullDescription ? "Show less" : "Read more"}
              </button>
            )}
          </div>

          {amenities?.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-3 text-xl font-semibold">Amenities</h2>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {amenities.map((amenity: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {coordinates && (
            <div className="mb-8">
              <h2 className="mb-3 text-xl font-semibold">Location</h2>
              <div className="h-[300px] overflow-hidden rounded-lg bg-gray-100">
                {/* Replace the SimpleMapView with a static map or button to load map */}
                <div className="flex h-full items-center justify-center">
                  {showMap ? (
                    <div className="h-full w-full p-4 text-center">
                      <p className="mb-2">Map loading is currently disabled to prevent errors.</p>
                      <Button onClick={() => setShowMap(false)}>Hide Map</Button>
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="mb-2">View location on map</p>
                      <Button onClick={() => setShowMap(true)}>Show Map</Button>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Coordinates: {coordinates.latitude?.toFixed(6)}, {coordinates.longitude?.toFixed(6)}
              </p>
            </div>
          )}
        </div>

        {/* Right column - Contact info */}
        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Contact Information</h2>
              <div className="space-y-4">
                {contact_phone && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="text-gray-700">{contact_phone}</p>
                  </div>
                )}
                {contact_email && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-gray-700">{contact_email}</p>
                  </div>
                )}
                {website_url && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Website</h3>
                    <a
                      href={website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {website_url.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-6">
                <Button className="w-full">Contact Business</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Business Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related listings */}
      {relatedListings && relatedListings.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Similar Listings</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedListings.map((related) => (
              <ListingCard key={related.id} listing={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
