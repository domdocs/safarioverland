import { DirectoryListingForm } from "@/components/directory-listing-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function SubmitListingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Submit a Directory Listing</h1>
          <p className="text-gray-600 mb-8">
            Complete the form below to add your safari business or service to our directory. All submissions will be
            reviewed before being published.
          </p>

          <DirectoryListingForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
