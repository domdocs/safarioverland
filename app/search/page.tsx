import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchInterface } from "@/components/search-interface"

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search Safari Overland</h1>
          <SearchInterface />
        </div>
      </main>
      <Footer />
    </div>
  )
}
