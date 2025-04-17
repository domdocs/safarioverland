import { SimpleFeaturedListings } from "@/components/simple-featured-listings"
import { SimpleMapView } from "@/components/simple-map-view"
import { CategoryGrid } from "@/components/category-grid"
import { CTASection } from "@/components/cta-section"
import { SafariFAQ } from "@/components/safari-faq"
import { Header } from "@/components/header"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FeaturedListings } from "@/components/featured-listings"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="space-y-24 pb-24">
        {/* Hero Section */}
        <section className="relative h-[600px] text-white">
          <div className="absolute inset-0">
            <Image
              src="/safari-tent.jpg"
              alt="Luxury safari tent in Africa"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 max-w-4xl">
              Find Your Perfect African Safari
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-2xl">
              Discover the best safari lodges, tour operators, and adventure activities across Africa
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/categories"
                className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg text-lg"
              >
                Browse Categories
              </a>
              <Button
                variant="default"
                size="lg"
                asChild
              >
                <Link
                  href="/submit"
                  className="font-semibold"
                >
                  Submit Your Listing
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="container mx-auto px-4">
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Featured Listings</h2>
            <FeaturedListings />
          </div>
        </section>

        {/* Categories */}
        <section className="container mx-auto px-4">
          <CategoryGrid />
        </section>

        {/* Map View */}
        <section className="container mx-auto px-4">
          <SimpleMapView />
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4">
          <CTASection />
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4">
          <SafariFAQ />
        </section>
      </main>
    </>
  )
}
