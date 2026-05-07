import Link from "next/link"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/editorial/eyebrow"

export default function ListingNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />

      <main className="flex-1 container py-24 md:py-32">
        <div className="max-w-2xl">
          <Eyebrow withRule>404 — not in the directory</Eyebrow>
          <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-tight text-balance">
            That listing isn&apos;t here.
          </h1>
          <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-xl">
            It may have been removed, renamed, or it never existed. The directory
            still has plenty to explore.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="rounded-none px-8 py-6 mono" asChild>
              <Link href="/categories">Browse categories</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-none px-8 py-6 mono" asChild>
              <Link href="/destinations">Browse by region</Link>
            </Button>
          </div>
        </div>
      </main>

      <EditorialFooter />
    </div>
  )
}
