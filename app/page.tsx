import { SimpleFeaturedListings } from "@/components/simple-featured-listings"
import { SimpleMapView } from "@/components/simple-map-view"
import { CategoryGrid } from "@/components/category-grid"
import { CTASection } from "@/components/cta-section"
import { SafariFAQ } from "@/components/safari-faq"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect African Safari</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover the best safari lodges, tour operators, and adventure activities across Africa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/categories"
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg"
              >
                Browse Categories
              </a>
              <a
                href="/submit-listing"
                className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-6 rounded-lg"
              >
                Add Your Business
              </a>
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <SimpleFeaturedListings />

        {/* Categories */}
        <CategoryGrid />

        {/* Map View */}
        <SimpleMapView />

        {/* CTA Section */}
        <CTASection />

        {/* FAQ Section */}
        <SafariFAQ />
      </main>
    </>
  )
}
