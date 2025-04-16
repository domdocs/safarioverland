import Link from "next/link"

export function CTASection() {
  return (
    <section className="bg-orange-600">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-orange-700 shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span className="block">Ready to list your</span>
                <span className="block">safari business?</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-white">
                Join our directory of trusted safari service providers and connect with travelers from around the world.
                Increase your visibility and grow your business.
              </p>
              <Link
                href="/submit-listing"
                className="mt-8 inline-flex items-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-orange-600 shadow hover:bg-orange-50"
              >
                List Your Business
              </Link>
            </div>
          </div>
          <div className="aspect-w-5 aspect-h-3 -mt-6 md:aspect-w-2 md:aspect-h-1">
            <img
              className="translate-x-6 translate-y-6 transform rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="/placeholder.svg?height=400&width=600"
              alt="Safari guide with tourists"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
