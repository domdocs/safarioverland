import { SimpleFeaturedListings } from "@/components/simple-featured-listings"
import { SimpleMapView } from "@/components/simple-map-view"
import { CategoryGrid } from "@/components/category-grid"
import { CTASection } from "@/components/cta-section"
import { SafariFAQ } from "@/components/safari-faq"
import { Header } from "@/components/header"
import Image from "next/image"

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
              <a
                href="/submit-listing"
                className="bg-white hover:bg-gray-100 text-primary font-bold py-4 px-8 rounded-lg text-lg"
              >
                Add Your Business
              </a>
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="container mx-auto px-4">
          <SimpleFeaturedListings />
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
