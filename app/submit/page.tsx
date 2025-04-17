import { ListingSubmissionForm } from "@/components/listing-submission-form"
import { Container } from "@/components/ui/container"

export const metadata = {
  title: "Submit Listing - Safari Overland",
  description: "Submit your safari, tour, accommodation, or adventure activity listing to Safari Overland.",
}

export default function SubmitListingPage() {
  return (
    <Container>
      <div className="max-w-3xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Submit Your Listing</h1>
          <p className="text-gray-600">
            List your safari, tour, accommodation, or adventure activity on Safari Overland. 
            Fill out the form below and our team will review your submission.
          </p>
        </div>
        <ListingSubmissionForm />
      </div>
    </Container>
  )
}
