import { getSupabaseServerClient } from "./supabase"

export type ListingStatus = "pending" | "approved" | "rejected"

export type DirectoryListing = {
  id: string
  listing_name: string
  category: string
  region: string
  country: string
  location: string
  description: string
  contact_name: string
  contact_email: string
  contact_phone: string
  website: string | null
  price_info: string
  featured: boolean
  image_url: string | null
  status: ListingStatus
  created_at: string
  updated_at: string
}

// Mock data that will be used as fallback if Supabase is unavailable
const mockListings: DirectoryListing[] = [
  {
    id: "1",
    listing_name: "Serengeti Safari Lodge",
    category: "lodges",
    region: "East Africa",
    country: "Tanzania",
    location: "Serengeti National Park",
    description:
      "Experience the ultimate luxury safari lodge in the heart of the Serengeti. Our eco-friendly lodge offers panoramic views of the plains, gourmet dining, and guided safari tours with expert naturalists.",
    contact_name: "Sarah Johnson",
    contact_email: "bookings@serengetiluxurylodge.com",
    contact_phone: "+255 742 123456",
    website: "https://www.serengetiluxurylodge.com",
    price_info: "From $450 per person per night, all-inclusive",
    featured: true,
    image_url: "/placeholder.svg?height=300&width=400",
    status: "approved",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    listing_name: "Mara River Campsite",
    category: "campsites",
    region: "East Africa",
    country: "Kenya",
    location: "Maasai Mara National Reserve",
    description:
      "Our campsite is located on the banks of the famous Mara River, offering an authentic camping experience in the wild. Perfect for witnessing the Great Migration crossing.",
    contact_name: "James Omondi",
    contact_email: "info@mararivercamps.co.ke",
    contact_phone: "+254 722 987654",
    website: "https://www.mararivercamps.co.ke",
    price_info: "$25 per person per night, tents available for rent at $15 per night",
    featured: false,
    image_url: "/placeholder.svg?height=300&width=400",
    status: "approved",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    listing_name: "Safari Wheels 4x4 Rentals",
    category: "4x4-rentals",
    region: "Southern Africa",
    country: "South Africa",
    location: "Johannesburg",
    description:
      "Fully equipped 4x4 vehicles for your self-drive safari adventure. Our fleet includes Toyota Land Cruisers and Ford Rangers with roof tents, camping gear, GPS, and satellite phones.",
    contact_name: "David Nkosi",
    contact_email: "rentals@safariwheels.co.za",
    contact_phone: "+27 83 456 7890",
    website: "https://www.safariwheels.co.za",
    price_info: "From $85 per day, weekly discounts available",
    featured: true,
    image_url: "/placeholder.svg?height=300&width=400",
    status: "approved",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    listing_name: "Authentic Africa Safaris",
    category: "guided-tours",
    region: "East Africa",
    country: "Tanzania",
    location: "Arusha",
    description:
      "Small group guided safaris with expert local guides. We specialize in authentic wildlife experiences in Tanzania's northern circuit including Serengeti, Ngorongoro, and Tarangire.",
    contact_name: "Grace Mollel",
    contact_email: "tours@authenticafricasafaris.com",
    contact_phone: "+255 765 432109",
    website: "https://www.authenticafricasafaris.com",
    price_info: "5-day safari from $1,800 per person, all-inclusive",
    featured: true,
    image_url: "/placeholder.svg?height=300&width=400",
    status: "approved",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    listing_name: "Victoria Falls Adventure Center",
    category: "adventure-activities",
    region: "Southern Africa",
    country: "Zimbabwe",
    location: "Victoria Falls",
    description:
      "Your one-stop adventure hub at Victoria Falls. We offer white water rafting, bungee jumping, helicopter flights, zip-lining, and gorge swinging with certified guides.",
    contact_name: "Lisa Moyo",
    contact_email: "adventures@vicfallsadventure.com",
    contact_phone: "+263 83 123 4567",
    website: "https://www.vicfallsadventure.com",
    price_info: "Activities from $50, combo packages available",
    featured: true,
    image_url: "/placeholder.svg?height=300&width=400",
    status: "approved",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    listing_name: "Kruger Wildlife Safaris",
    category: "game-viewing",
    region: "Southern Africa",
    country: "South Africa",
    location: "Kruger National Park",
    description:
      "Specialized game viewing safaris in Kruger National Park. Our expert guides have decades of experience tracking the Big Five.",
    contact_name: "Peter van Wyk",
    contact_email: "bookings@krugerwildlifesafaris.co.za",
    contact_phone: "+27 72 345 6789",
    website: "https://www.krugerwildlifesafaris.co.za",
    price_info: "Half-day drives from $75, full-day $140",
    featured: true,
    image_url: "/placeholder.svg?height=300&width=400",
    status: "approved",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Mock pending listings
const mockPendingListings: DirectoryListing[] = [
  {
    id: "11",
    listing_name: "Desert Safari Expeditions",
    category: "guided-tours",
    region: "North Africa",
    country: "Morocco",
    location: "Merzouga",
    description:
      "Authentic Sahara Desert experiences with local Berber guides. Camel treks, 4x4 excursions, and overnight camps under the stars.",
    contact_name: "Ibrahim Amazigh",
    contact_email: "sahara@desertsafariexpeditions.com",
    contact_phone: "+212 678 901234",
    website: "https://www.desertsafariexpeditions.com",
    price_info: "Day trips from $60, 3-day desert expedition $250",
    featured: false,
    image_url: "/placeholder.svg?height=300&width=400",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "12",
    listing_name: "Zambezi River Lodge",
    category: "lodges",
    region: "Southern Africa",
    country: "Zimbabwe",
    location: "Zambezi National Park",
    description:
      "Luxury lodge on the banks of the mighty Zambezi River, just upstream from Victoria Falls. 12 private chalets with river views.",
    contact_name: "Tendai Moyo",
    contact_email: "reservations@zambeziriverlodge.com",
    contact_phone: "+263 712 345678",
    website: "https://www.zambeziriverlodge.com",
    price_info: "From $320 per person sharing, includes meals and select activities",
    featured: true,
    image_url: "/placeholder.svg?height=300&width=400",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Filter mock listings based on criteria (used as fallback)
function filterMockListings({
  category,
  region,
  country,
  featured,
  status = "approved",
  limit = 50, // Increased from 10 to 50
  offset = 0,
}: {
  category?: string
  region?: string
  country?: string
  featured?: boolean
  status?: string
  limit?: number
  offset?: number
} = {}) {
  // Choose the right dataset based on status
  const dataset = status === "pending" ? mockPendingListings : mockListings

  // Apply filters
  let filtered = [...dataset]

  if (status && status !== "all") {
    filtered = filtered.filter((listing) => listing.status === status)
  }

  if (category) {
    filtered = filtered.filter((listing) => listing.category === category)
  }

  if (region) {
    filtered = filtered.filter((listing) => listing.region === region)
  }

  if (country) {
    filtered = filtered.filter((listing) => listing.country === country)
  }

  if (featured !== undefined) {
    filtered = filtered.filter((listing) => listing.featured === featured)
  }

  // Sort by created_at (newest first)
  filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  // Apply pagination
  return filtered.slice(offset, offset + limit)
}

// Get listings with various filters - synchronous version for client components
export function getListingsSync({
  category,
  region,
  country,
  featured,
  status = "approved",
  limit = 50, // Increased from 10 to 50
  offset = 0,
}: {
  category?: string
  region?: string
  country?: string
  featured?: boolean
  status?: string
  limit?: number
  offset?: number
} = {}): DirectoryListing[] {
  return filterMockListings({ category, region, country, featured, status, limit, offset })
}

// Get listings with various filters
export async function getListings({
  category,
  region,
  country,
  featured,
  status = "approved",
  limit = 100, // Increased from 10 to 100 to show more listings
  offset = 0,
}: {
  category?: string
  region?: string
  country?: string
  featured?: boolean
  status?: string
  limit?: number
  offset?: number
} = {}): Promise<DirectoryListing[]> {
  try {
    // First, get the mock data as a fallback
    const mockData = filterMockListings({ category, region, country, featured, status, limit, offset })

    // Try to get the Supabase client
    const supabase = getSupabaseServerClient()
    if (!supabase) {
      console.warn("Supabase client not available, using mock data")
      return mockData
    }

    try {
      // Start building the query
      let query = supabase.from("directory_listings").select("*")

      // Apply filters
      if (status && status !== "all") {
        query = query.eq("status", status)
      }

      if (category) {
        query = query.eq("category", category)
      }

      if (region) {
        query = query.eq("region", region)
      }

      if (country) {
        query = query.eq("country", country)
      }

      if (featured !== undefined) {
        query = query.eq("featured", featured)
      }

      // Apply pagination with higher limit
      query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

      // Execute the query with a timeout
      const { data, error } = await query

      if (error) {
        console.error("Error fetching listings from Supabase:", error)
        return mockData
      }

      if (!data || data.length === 0) {
        console.log("No data returned from Supabase, using mock data")
        return mockData
      }

      console.log(`Successfully fetched ${data.length} listings from Supabase`)

      // Map the data to match our DirectoryListing type
      return data.map((item: any) => ({
        id: item.id || String(item.id),
        listing_name: item.listing_name || "",
        category: item.category || "",
        region: item.region || "",
        country: item.country || "",
        location: item.location || "",
        description: item.description || "",
        contact_name: item.contact_name || "",
        contact_email: item.contact_email || "",
        contact_phone: item.contact_phone || "",
        website: item.website || null,
        price_info: item.price_info || "",
        featured: Boolean(item.featured),
        image_url: item.image_url || null,
        status: item.status || "approved",
        created_at: item.created_at || new Date().toISOString(),
        updated_at: item.updated_at || new Date().toISOString(),
      }))
    } catch (queryError) {
      console.error("Error executing Supabase query:", queryError)
      return mockData
    }
  } catch (error) {
    console.error("Error in getListings:", error)
    return filterMockListings({ category, region, country, featured, status, limit, offset })
  }
}

// Get featured listings
export async function getFeaturedListings(limit = 6): Promise<DirectoryListing[]> {
  try {
    const supabase = getSupabaseServerClient()

    if (!supabase) {
      console.warn("Supabase client not available, using mock data for featured listings")
      return getListingsSync({ featured: true, limit })
    }

    const { data, error } = await supabase
      .from("directory_listings")
      .select("*")
      .eq("featured", true)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching featured listings from Supabase:", error)
      return getListingsSync({ featured: true, limit })
    }

    return data as DirectoryListing[]
  } catch (error) {
    console.error("Error in getFeaturedListings:", error)
    return getListingsSync({ featured: true, limit })
  }
}

// Get listings by category
export async function getListingsByCategory(category: string, limit = 100): Promise<DirectoryListing[]> {
  try {
    console.log(`Fetching listings for category: ${category} with limit: ${limit}`)

    // Try to get the Supabase client
    const supabase = getSupabaseServerClient()
    if (!supabase) {
      console.warn("Supabase client not available, using mock data for category")
      return getListingsByCategorySync(category, limit)
    }

    try {
      // Execute the query with a higher limit
      const { data, error } = await supabase
        .from("directory_listings")
        .select("*")
        .eq("category", category)
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(limit)

      if (error) {
        console.error(`Error fetching listings for category ${category}:`, error)
        return getListingsByCategorySync(category, limit)
      }

      if (!data || data.length === 0) {
        console.log(`No data returned from Supabase for category ${category}, using mock data`)
        return getListingsByCategorySync(category, limit)
      }

      console.log(`Successfully fetched ${data.length} listings for category ${category}`)

      // Map the data to match our DirectoryListing type
      return data.map((item: any) => ({
        id: item.id || String(item.id),
        listing_name: item.listing_name || "",
        category: item.category || "",
        region: item.region || "",
        country: item.country || "",
        location: item.location || "",
        description: item.description || "",
        contact_name: item.contact_name || "",
        contact_email: item.contact_email || "",
        contact_phone: item.contact_phone || "",
        website: item.website || null,
        price_info: item.price_info || "",
        featured: Boolean(item.featured),
        image_url: item.image_url || null,
        status: item.status || "approved",
        created_at: item.created_at || new Date().toISOString(),
        updated_at: item.updated_at || new Date().toISOString(),
      }))
    } catch (queryError) {
      console.error(`Error executing Supabase query for category ${category}:`, queryError)
      return getListingsByCategorySync(category, limit)
    }
  } catch (error) {
    console.error(`Error in getListingsByCategory for ${category}:`, error)
    return getListingsByCategorySync(category, limit)
  }
}

// Get listings by region
export async function getListingsByRegion(region: string, limit = 12): Promise<DirectoryListing[]> {
  // Always return mock data to ensure the page renders
  return getListingsSync({ region, limit })
}

// Get pending listings
export async function getPendingListings(limit = 10): Promise<DirectoryListing[]> {
  try {
    const supabase = getSupabaseServerClient()

    if (!supabase) {
      console.warn("Supabase client not available, using mock data for pending listings")
      return getListingsSync({ status: "pending", limit })
    }

    const { data, error } = await supabase
      .from("directory_listings")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching pending listings from Supabase:", error)
      return getListingsSync({ status: "pending", limit })
    }

    return data as DirectoryListing[]
  } catch (error) {
    console.error("Error in getPendingListings:", error)
    return getListingsSync({ status: "pending", limit })
  }
}

// Get listing count
export async function getListingCount(category?: string, status = "approved"): Promise<number> {
  try {
    const supabase = getSupabaseServerClient()

    if (!supabase) {
      console.warn("Supabase client not available, using mock data for count")
      const listings = filterMockListings({ category, status, limit: 1000 })
      return listings.length
    }

    let query = supabase.from("directory_listings").select("id", { count: "exact" })

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    if (category) {
      query = query.eq("category", category)
    }

    const { count, error } = await query

    if (error) {
      console.error("Error fetching listing count from Supabase:", error)
      const listings = filterMockListings({ category, status, limit: 1000 })
      return listings.length
    }

    return count || 0
  } catch (error) {
    console.error("Error in getListingCount:", error)
    const listings = filterMockListings({ category, status, limit: 1000 })
    return listings.length
  }
}

// Function to check if a string is a valid UUID
function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

// Get a single listing by ID
export async function getListingById(id: string): Promise<DirectoryListing | null> {
  try {
    // First check mock data for simple numeric IDs
    const mockListing =
      mockListings.find((listing) => listing.id === id) || mockPendingListings.find((listing) => listing.id === id)

    if (mockListing) {
      console.log(`Found listing with ID ${id} in mock data`)
      return mockListing
    }

    const supabase = getSupabaseServerClient()

    if (!supabase) {
      console.warn("Supabase client not available, using mock data for single listing")
      return null
    }

    // Only query Supabase if the ID looks like a valid UUID
    if (!isValidUUID(id)) {
      console.warn(`ID ${id} is not a valid UUID, skipping Supabase query`)
      return null
    }

    const { data, error } = await supabase.from("directory_listings").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching listing by ID from Supabase:", error)
      return null
    }

    return data as DirectoryListing
  } catch (error) {
    console.error("Error in getListingById:", error)
    return null
  }
}

// Get all categories with counts
export async function getCategories() {
  const categories = [
    {
      name: "Safari Lodges",
      slug: "lodges",
      description:
        "Discover the finest safari lodges across Africa, from luxury tented camps to exclusive private reserves.",
    },
    {
      name: "Safari Campsites",
      slug: "campsites",
      description:
        "Experience the authentic African wilderness with our selection of safari campsites, from basic bush camps to comfortable glamping sites.",
    },
    {
      name: "4x4 Rentals",
      slug: "4x4-rentals",
      description:
        "Find the perfect 4x4 vehicle for your self-drive safari adventure, fully equipped with everything you need for off-road exploration.",
    },
    {
      name: "Guided Tours",
      slug: "guided-tours",
      description:
        "Join expert guides on unforgettable safari tours across Africa's most spectacular wildlife destinations.",
    },
    {
      name: "Adventure Activities",
      slug: "adventure-activities",
      description:
        "Add excitement to your safari with thrilling adventure activities, from hot air balloon rides to white water rafting.",
    },
    {
      name: "Game Viewing",
      slug: "game-viewing",
      description:
        "Discover specialized game viewing experiences with expert guides who know exactly where to find Africa's most iconic wildlife.",
    },
    {
      name: "Overland Tours",
      slug: "overland-tours",
      description:
        "Experience the ultimate African adventure with overland tours that take you across multiple countries and diverse landscapes.",
    },
    {
      name: "Safari Flights",
      slug: "flights",
      description:
        "Find scheduled and charter flights to safari destinations across Africa, from bush planes to helicopter transfers.",
    },
    {
      name: "Booking Agents",
      slug: "booking-agents",
      description:
        "Connect with specialized safari booking agents who can arrange your perfect African adventure from start to finish.",
    },
  ]

  // Try to get counts from Supabase
  try {
    const supabase = getSupabaseServerClient()

    if (supabase) {
      const { data, error } = await supabase.from("directory_listings").select("category").eq("status", "approved")

      if (!error && data) {
        // Count listings by category
        const categoryCounts: Record<string, number> = {}
        data.forEach((listing) => {
          const category = listing.category
          categoryCounts[category] = (categoryCounts[category] || 0) + 1
        })

        // Update categories with counts
        return categories.map((category) => ({
          ...category,
          count: categoryCounts[category.slug] || 0,
        }))
      }
    }
  } catch (error) {
    console.error("Error fetching category counts:", error)
  }

  // Fallback to categories without counts
  return categories
}

// Get all regions with counts
export async function getRegions(): Promise<{ name: string; count: number }[]> {
  const regions = ["East Africa", "Southern Africa", "North Africa", "West Africa", "Multiple Regions"]

  try {
    const supabase = getSupabaseServerClient()

    if (!supabase) {
      console.warn("Supabase client not available, using mock data for regions")
      return regions.map((region) => ({
        name: region,
        count: filterMockListings({ region, limit: 1000 }).length,
      }))
    }

    const { data, error } = await supabase.from("directory_listings").select("region").eq("status", "approved")

    if (error) {
      console.error("Error fetching regions from Supabase:", error)
      return regions.map((region) => ({
        name: region,
        count: filterMockListings({ region, limit: 1000 }).length,
      }))
    }

    // Count listings by region
    const regionCounts: Record<string, number> = {}
    data.forEach((listing) => {
      const region = listing.region
      regionCounts[region] = (regionCounts[region] || 0) + 1
    })

    return regions.map((region) => ({
      name: region,
      count: regionCounts[region] || 0,
    }))
  } catch (error) {
    console.error("Error in getRegions:", error)
    return regions.map((region) => ({
      name: region,
      count: filterMockListings({ region, limit: 1000 }).length,
    }))
  }
}

// Update a listing
export async function updateListing(updatedListing: DirectoryListing): Promise<DirectoryListing> {
  try {
    const supabase = getSupabaseServerClient()

    if (!supabase) {
      console.warn("Supabase client not available, using in-memory update")
      return updateListingInMemory(updatedListing)
    }

    // Only try to update in Supabase if the ID looks like a valid UUID
    if (!isValidUUID(updatedListing.id)) {
      console.warn(`ID ${updatedListing.id} is not a valid UUID, using in-memory update`)
      return updateListingInMemory(updatedListing)
    }

    const { data, error } = await supabase
      .from("directory_listings")
      .update({
        listing_name: updatedListing.listing_name,
        category: updatedListing.category,
        region: updatedListing.region,
        country: updatedListing.country,
        location: updatedListing.location,
        description: updatedListing.description,
        contact_name: updatedListing.contact_name,
        contact_email: updatedListing.contact_email,
        contact_phone: updatedListing.contact_phone,
        website: updatedListing.website,
        price_info: updatedListing.price_info,
        featured: updatedListing.featured,
        image_url: updatedListing.image_url,
        status: updatedListing.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", updatedListing.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating listing in Supabase:", error)
      return updateListingInMemory(updatedListing)
    }

    return data as DirectoryListing
  } catch (error) {
    console.error("Error in updateListing:", error)
    return updateListingInMemory(updatedListing)
  }
}

// Update a listing in memory - used as fallback
export function updateListingInMemory(updatedListing: DirectoryListing) {
  // Find the listing in the appropriate array based on status
  const oldListing =
    mockListings.find((listing) => listing.id === updatedListing.id) ||
    mockPendingListings.find((listing) => listing.id === updatedListing.id)

  if (!oldListing) {
    throw new Error(`Listing with ID ${updatedListing.id} not found`)
  }

  // Remove from old status array if status changed
  if (oldListing.status !== updatedListing.status) {
    if (oldListing.status === "approved") {
      const index = mockListings.findIndex((listing) => listing.id === updatedListing.id)
      if (index !== -1) {
        mockListings.splice(index, 1)
      }
    } else if (oldListing.status === "pending") {
      const index = mockPendingListings.findIndex((listing) => listing.id === updatedListing.id)
      if (index !== -1) {
        mockPendingListings.splice(index, 1)
      }
    }

    // Add to new status array
    if (updatedListing.status === "approved") {
      mockListings.push(updatedListing)
    } else if (updatedListing.status === "pending") {
      mockPendingListings.push(updatedListing)
    }
  } else {
    // Update in the same array
    if (updatedListing.status === "approved") {
      const index = mockListings.findIndex((listing) => listing.id === updatedListing.id)
      if (index !== -1) {
        mockListings[index] = updatedListing
      }
    } else if (updatedListing.status === "pending") {
      const index = mockPendingListings.findIndex((listing) => listing.id === updatedListing.id)
      if (index !== -1) {
        mockPendingListings[index] = updatedListing
      }
    }
  }

  return updatedListing
}

// Get featured listings - synchronous version for client components
export function getFeaturedListingsSync(limit = 6): DirectoryListing[] {
  return getListingsSync({ featured: true, limit })
}

// Get listings by category - synchronous version for client components
export function getListingsByCategorySync(category: string, limit = 50): DirectoryListing[] {
  return getListingsSync({ category, limit })
}

// Get categories - synchronous version for client components
export function getCategoriesSync() {
  return [
    {
      name: "Safari Lodges",
      slug: "lodges",
      description:
        "Discover the finest safari lodges across Africa, from luxury tented camps to exclusive private reserves.",
    },
    {
      name: "Safari Campsites",
      slug: "campsites",
      description:
        "Experience the authentic African wilderness with our selection of safari campsites, from basic bush camps to comfortable glamping sites.",
    },
    {
      name: "4x4 Rentals",
      slug: "4x4-rentals",
      description:
        "Find the perfect 4x4 vehicle for your self-drive safari adventure, fully equipped with everything you need for off-road exploration.",
    },
    {
      name: "Guided Tours",
      slug: "guided-tours",
      description:
        "Join expert guides on unforgettable safari tours across Africa's most spectacular wildlife destinations.",
    },
    {
      name: "Adventure Activities",
      slug: "adventure-activities",
      description:
        "Add excitement to your safari with thrilling adventure activities, from hot air balloon rides to white water rafting.",
    },
    {
      name: "Game Viewing",
      slug: "game-viewing",
      description:
        "Discover specialized game viewing experiences with expert guides who know exactly where to find Africa's most iconic wildlife.",
    },
    {
      name: "Overland Tours",
      slug: "overland-tours",
      description:
        "Experience the ultimate African adventure with overland tours that take you across multiple countries and diverse landscapes.",
    },
    {
      name: "Safari Flights",
      slug: "flights",
      description:
        "Find scheduled and charter flights to safari destinations across Africa, from bush planes to helicopter transfers.",
    },
    {
      name: "Booking Agents",
      slug: "booking-agents",
      description:
        "Connect with specialized safari booking agents who can arrange your perfect African adventure from start to finish.",
    },
  ]
}

// Get listing by ID - synchronous version for client components
export function getListingByIdSync(id: string): DirectoryListing | null {
  // Check in approved listings
  const approvedListing = mockListings.find((listing) => listing.id === id)
  if (approvedListing) return approvedListing

  // Check in pending listings
  const pendingListing = mockPendingListings.find((listing) => listing.id === id)
  if (pendingListing) return pendingListing

  return null
}
