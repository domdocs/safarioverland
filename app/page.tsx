import { SimpleMapView } from "@/components/simple-map-view"
import { CategoryGrid } from "@/components/category-grid"
import { CTASection } from "@/components/cta-section"
import { SafariFAQ } from "@/components/safari-faq"
import { Header } from "@/components/header"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FeaturedListings } from "@/components/featured-listings"

export const revalidate = 60 // revalidate every minute

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[100px]" />
      </div>
      <Header />
      <main className="space-y-24 pb-24 relative">
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
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl w-full max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                Find Your Perfect African Safari
              </h1>
              <p className="text-xl md:text-2xl mb-12 mx-auto max-w-2xl">
                Discover the best safari lodges, tour operators, and adventure activities across Africa
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white transition-all w-full sm:w-auto"
                  asChild
                >
                  <Link
                    href="/categories"
                    className="font-semibold"
                  >
                    Browse Categories
                  </Link>
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white transition-all w-full sm:w-auto"
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
          </div>
        </section>

        {/* Featured Listings */}
        <section className="container mx-auto px-4">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Featured Listings</h2>
            <FeaturedListings />
          </div>
        </section>

        {/* Categories */}
        <section className="container mx-auto px-4">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-xl">
            <CategoryGrid />
          </div>
        </section>

        {/* Map View */}
        <section className="container mx-auto px-4">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-xl">
            <SimpleMapView />
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-xl">
            <CTASection />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-xl">
            <SafariFAQ />
          </div>
        </section>
      </main>
    </div>
  )
}
