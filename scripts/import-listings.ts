import { createReadStream, readFileSync } from "fs"
import { getSupabaseServerClient } from "@/lib/supabase"
import type { DirectoryListing } from "@/lib/listings"
import path from "path"

const CSV_FILE = path.join(process.cwd(), "public", "directory_listings_rows.csv")

type CSVListing = Omit<DirectoryListing, "id" | "created_at" | "updated_at">

async function importListings() {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    console.error("Failed to initialize Supabase client")
    process.exit(1)
  }

  try {
    const fileContent = readFileSync(CSV_FILE, 'utf-8')
    const rows = fileContent.split('\n').map(line => line.trim()).filter(Boolean)
    const headers = rows[0].split(',').map(h => h.trim())
    const listings: CSVListing[] = []
    let rowCount = 0
    let errorCount = 0

    for (let i = 1; i < rows.length; i++) {
      rowCount++
      const values = rows[i].split(',').map(v => v.trim())
      const rawRow = Object.fromEntries(headers.map((h, idx) => [h, values[idx] || null]))

      try {
        // Convert featured to boolean
        const featured = rawRow.featured === "true" || rawRow.featured === "1"

        // Ensure website and image_url are null if empty
        const website = rawRow.website || null
        const image_url = rawRow.image_url || null

        // Set default status if not provided
        const status = (rawRow.status as DirectoryListing['status']) || "pending"

        // Validate status
        if (!["pending", "approved", "rejected"].includes(status)) {
          console.error(`Row ${rowCount}: Invalid status: ${status}`)
          errorCount++
          continue
        }

        // Validate required fields
        const requiredFields = [
          "listing_name",
          "category",
          "region",
          "country",
          "location",
          "description",
          "contact_name",
          "contact_email",
          "contact_phone",
          "price_info",
        ] as const

        const missingFields = requiredFields.filter(field => !rawRow[field])
        if (missingFields.length > 0) {
          console.error(`Row ${rowCount}: Missing required fields: ${missingFields.join(", ")}`)
          errorCount++
          continue
        }

        // Create the listing with proper types
        const listing: CSVListing = {
          listing_name: rawRow.listing_name!,
          category: rawRow.category!,
          region: rawRow.region!,
          country: rawRow.country!,
          location: rawRow.location!,
          description: rawRow.description!,
          contact_name: rawRow.contact_name!,
          contact_email: rawRow.contact_email!,
          contact_phone: rawRow.contact_phone!,
          website,
          price_info: rawRow.price_info!,
          image_url,
          featured,
          status,
        }

        listings.push(listing)
      } catch (error) {
        console.error(`Error processing row ${rowCount}:`, error)
        errorCount++
      }
    }

    console.log(`\nProcessed ${rowCount} rows from CSV`)
    console.log(`Found ${errorCount} errors`)
    console.log(`Importing ${listings.length} valid listings...`)

    const { data, error } = await supabase
      .from("directory_listings")
      .insert(listings.map(listing => ({
        ...listing,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })))
      .select()

    if (error) {
      console.error("Error inserting listings:", error)
      process.exit(1)
    }

    console.log(`Successfully imported ${data.length} listings`)
    console.log("\nSample of imported listings:")
    console.log(JSON.stringify(data.slice(0, 2), null, 2))
  } catch (error) {
    console.error("Error during import:", error)
    process.exit(1)
  }
}

importListings().catch((error) => {
  console.error("Import failed:", error)
  process.exit(1)
}) 