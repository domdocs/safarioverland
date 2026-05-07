import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"

/**
 * Loading skeleton for the editorial listing detail page.
 * Mirrors the real layout — hero band, sticky meta rail, body column,
 * related rail — with low-contrast pulse blocks.
 */
export default function ListingLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />

      <main className="flex-1">
        {/* Hero band */}
        <div className="relative h-[72vh] min-h-[560px] w-full overflow-hidden bg-card animate-pulse">
          <div className="absolute inset-x-0 bottom-12 container">
            <div className="mb-4 h-3 w-40 bg-rule" />
            <div className="h-12 w-3/4 bg-rule" />
            <div className="mt-3 h-12 w-1/2 bg-rule" />
          </div>
        </div>

        {/* Body */}
        <div className="container grid grid-cols-1 gap-16 py-24 lg:grid-cols-12">
          <aside className="lg:col-span-4 space-y-12">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}>
                <div className="mb-3 h-3 w-24 bg-rule animate-pulse" />
                <div className="h-7 w-40 bg-card animate-pulse" />
              </div>
            ))}
          </aside>
          <div className="lg:col-span-8 space-y-6">
            <div className="border-l-2 border-rule pl-8">
              <div className="h-8 w-full bg-card animate-pulse" />
              <div className="mt-3 h-8 w-5/6 bg-card animate-pulse" />
            </div>
            <div className="mt-16 space-y-4">
              <div className="h-4 w-full bg-card animate-pulse" />
              <div className="h-4 w-11/12 bg-card animate-pulse" />
              <div className="h-4 w-3/4 bg-card animate-pulse" />
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="border-t border-rule bg-ink py-24">
          <div className="container">
            <div className="mb-4 h-3 w-24 bg-rule animate-pulse" />
            <div className="mb-12 h-10 w-72 bg-card animate-pulse" />
            <div className="space-y-12">
              {[0, 1, 2].map((i) => (
                <div key={i} className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10 border-t border-rule pt-8">
                  <div className="lg:col-span-5">
                    <div className="aspect-[4/3] bg-card animate-pulse" />
                  </div>
                  <div className="lg:col-span-7 space-y-4">
                    <div className="h-3 w-32 bg-rule animate-pulse" />
                    <div className="h-8 w-3/4 bg-card animate-pulse" />
                    <div className="h-4 w-full bg-card animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <EditorialFooter />
    </div>
  )
}
