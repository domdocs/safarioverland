import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="bg-ink border border-rule">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-card border border-rule lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <p className="eyebrow mb-4">For operators</p>
              <h2 className="font-serif text-bone sm:text-h2-fluid">
                <span className="block">Ready to list your</span>
                <span className="block italic text-amber">safari business?</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-bone-mute">
                Join our directory of trusted safari service providers and connect with travelers from around the world.
                Increase your visibility and grow your business.
              </p>
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
          <div className="aspect-w-5 aspect-h-3 -mt-6 md:aspect-w-2 md:aspect-h-1">
            <img
              className="translate-x-6 translate-y-6 transform rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="/images/home/cta.jpg"
              alt="Safari vehicle of guests watching a pride of lions at sunset"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
