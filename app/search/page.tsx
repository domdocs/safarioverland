import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { SearchInterface } from "@/components/search-interface"

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <main className="flex-1 container py-24 md:py-32">
        <div className="mb-12 max-w-3xl">
          <Eyebrow withRule>Search</Eyebrow>
          <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance">
            Search the collection.
          </h1>
        </div>
        <SearchInterface />
      </main>
      <EditorialFooter />
    </div>
  )
}
