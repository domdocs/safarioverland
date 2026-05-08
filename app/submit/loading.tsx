import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function SubmitListingLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <main className="flex-1 container py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-3 bg-card" />
          <Skeleton className="h-4 w-full mb-2 bg-card" />
          <Skeleton className="h-4 w-5/6 mb-8 bg-card" />
          <div className="space-y-6">
            <Skeleton className="h-[600px] w-full bg-card" />
          </div>
        </div>
      </main>
      <EditorialFooter />
    </div>
  )
}
