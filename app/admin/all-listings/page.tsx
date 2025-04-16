import type { Metadata } from "next"
import { getSupabaseServerClient } from "@/lib/supabase"
import { SupabaseDebug } from "@/components/supabase-debug"

export const metadata: Metadata = {
  title: "All Listings | Admin | Safari Overland Directory",
  description: "View all listings in the database",
}

export default async function AllListingsPage() {
  // Fetch all listings directly from Supabase without any filtering
  const supabase = getSupabaseServerClient()
  let listings = []
  let error = null

  if (supabase) {
    try {
      const { data, error: fetchError } = await supabase.from("directory_listings").select("*")

      if (fetchError) {
        error = fetchError
      } else {
        listings = data || []
      }
    } catch (e) {
      error = e
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Listings in Database</h1>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error fetching listings</p>
          <p>{JSON.stringify(error)}</p>
        </div>
      ) : (
        <>
          <p className="mb-4">Total listings found: {listings.length}</p>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{listing.listing_name}</h2>
                <p className="text-sm text-gray-500">ID: {listing.id}</p>
                <p className="text-sm text-gray-500">Category: {listing.category}</p>
                <p className="text-sm text-gray-500">Status: {listing.status}</p>
              </div>
            ))}
          </div>

          <SupabaseDebug
            data={listings}
            title="Raw Listings Data"
            description="Complete data from Supabase directory_listings table"
          />
        </>
      )}
    </div>
  )
}
