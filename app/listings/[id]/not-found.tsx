import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ListingNotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Listing Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The safari listing you're looking for doesn't exist or may have been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
