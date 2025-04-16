import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ListingLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 h-4 w-64 animate-pulse rounded bg-gray-200"></div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-6 h-[400px] w-full animate-pulse rounded-lg bg-gray-200"></div>
              <div className="mb-4 h-8 w-3/4 animate-pulse rounded bg-gray-200"></div>
              <div className="mb-6 flex gap-2">
                <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-6 w-32 animate-pulse rounded-full bg-gray-200"></div>
              </div>
              <div className="mb-8">
                <div className="mb-3 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                <div className="mt-2 h-4 w-full animate-pulse rounded bg-gray-200"></div>
                <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>

            <div>
              <div className="mb-6 h-64 w-full animate-pulse rounded-lg bg-gray-200"></div>
              <div className="h-48 w-full animate-pulse rounded-lg bg-gray-200"></div>
            </div>
          </div>

          <div className="mt-12">
            <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="h-64 w-full animate-pulse rounded-lg bg-gray-200"></div>
              <div className="h-64 w-full animate-pulse rounded-lg bg-gray-200"></div>
              <div className="h-64 w-full animate-pulse rounded-lg bg-gray-200"></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
