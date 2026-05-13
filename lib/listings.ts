import { getSupabaseServerClient } from "./supabase"

export type ListingStatus = "pending" | "approved" | "rejected"

export type PriceTier = "budget" | "mid" | "luxury" | "exclusive"

export type TravellerQuote = {
  quote: string
  attributed_to: string
  trip_year?: number
}

export type ExternalRating = {
  source: string
  rating: number
  max?: number
  count?: number
  url?: string
  fetched_at?: string
}

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

  // ── Editorial / transformational layer ────────────────────────────────
  // All nullable. Populated case-by-case during the country-by-country audit.
  /** One-sentence "we'd send this here" line. Editorial voice. */
  verdict?: string | null
  /** The single thing that makes this stay distinctive. */
  signature_experience?: string | null
  /** ~200 chars on conservation work funded by stays here. */
  conservation_summary?: string | null
  /** ~200 chars on community / local-employment commitments. */
  community_summary?: string | null
  /** Wellness offerings: spa, yoga, sound bath, etc. */
  wellness_offerings?: string[] | null
  /** Activities: walking, mokoro, sleep-out, etc. */
  activities?: string[] | null

  // ── Owner / founder story ────────────────────────────────────────────
  founder_name?: string | null
  founder_note?: string | null
  founder_image_url?: string | null

  // ── Social proof ─────────────────────────────────────────────────────
  traveller_quotes?: TravellerQuote[] | null
  external_ratings?: ExternalRating[] | null

  // ── Photography ──────────────────────────────────────────────────────
  gallery_urls?: string[] | null

  // ── Practical ────────────────────────────────────────────────────────
  max_guests?: number | null
  best_time_to_visit?: string | null
  price_tier?: PriceTier | null
  latitude?: number | null
  longitude?: number | null

  // ── Cross-references ─────────────────────────────────────────────────
  /** Slugs of Field Notes articles that mention this stay. */
  field_notes_slugs?: string[] | null

  // ── Internal-only ────────────────────────────────────────────────────
  editor_notes?: string | null
}

/**
 * Mock fallback policy.
 *
 * `true` only in local development. In production a missing Supabase
 * client or a failed query surfaces as an empty list (or `0` for counts)
 * plus a server-side error log — *not* as a render of mock rows that
 * have non-UUID IDs and would break downstream admin operations
 * (approve / edit) which expect real database rows.
 *
 * The mock data block below is preserved for offline / no-network dev,
 * just gated behind this flag at every fallback site.
 */
const USE_MOCK_FALLBACK = process.env.NODE_ENV === "development"

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
    image_url: null,
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
    image_url: null,
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
    image_url: null,
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
    image_url: null,
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
    image_url: null,
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
    image_url: null,
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
    image_url: null,
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
    image_url: null,
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
    // Mock data fallback — only computed when USE_MOCK_FALLBACK is true.
    // In production this is `[]` so a Supabase outage surfaces as empty.
    const mockData: DirectoryListing[] = USE_MOCK_FALLBACK
      ? filterMockListings({ category, region, country, featured, status, limit, offset })
      : []

    // Try to get the Supabase client
    const supabase = getSupabaseServerClient()
    if (!supabase) {
      console.error("getListings: Supabase client not available")
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

      // Null data without an error → treat as empty. (We deliberately don't
      // fall back to mock data here — mock numeric IDs would surface in
      // production admin lists and break approve/edit which expect UUIDs.)
      if (!data) {
        return []
      }

      console.log(`Successfully fetched ${data.length} listings from Supabase`)

      // Map the data to match our DirectoryListing type. Editorial fields
      // are passed through as-is (all nullable; rows that don't yet have
      // them populated still render fine).
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

        // Editorial / transformational layer (all nullable)
        verdict: item.verdict ?? null,
        signature_experience: item.signature_experience ?? null,
        conservation_summary: item.conservation_summary ?? null,
        community_summary: item.community_summary ?? null,
        wellness_offerings: item.wellness_offerings ?? null,
        activities: item.activities ?? null,
        founder_name: item.founder_name ?? null,
        founder_note: item.founder_note ?? null,
        founder_image_url: item.founder_image_url ?? null,
        traveller_quotes: item.traveller_quotes ?? null,
        external_ratings: item.external_ratings ?? null,
        gallery_urls: item.gallery_urls ?? null,
        max_guests: item.max_guests ?? null,
        best_time_to_visit: item.best_time_to_visit ?? null,
        price_tier: item.price_tier ?? null,
        latitude: item.latitude ?? null,
        longitude: item.longitude ?? null,
        field_notes_slugs: item.field_notes_slugs ?? null,
        editor_notes: item.editor_notes ?? null,
      }))
    } catch (queryError) {
      console.error("Error executing Supabase query:", queryError)
      return mockData
    }
  } catch (error) {
    console.error("Error in getListings:", error)
    return USE_MOCK_FALLBACK
      ? filterMockListings({ category, region, country, featured, status, limit, offset })
      : []
  }
}

// Get featured listings
export async function getFeaturedListings(limit = 6): Promise<DirectoryListing[]> {
  // Mock fallback (dev only). In prod this is always [].
  const mockFallback = (): DirectoryListing[] => {
    if (!USE_MOCK_FALLBACK) return []
    const featured = mockListings.filter((l) => l.featured)
    return [...featured].sort(() => Math.random() - 0.5).slice(0, limit)
  }

  try {
    const supabase = getSupabaseServerClient()

    if (!supabase) {
      console.error("getFeaturedListings: Supabase client not available")
      return mockFallback()
    }

    const { data: allFeatured, error } = await supabase
      .from("directory_listings")
      .select("*")
      .eq("featured", true)
      .eq("status", "approved")

    if (error) {
      console.error("Error fetching featured listings:", error)
      return mockFallback()
    }

    // Empty is a valid result — return [] rather than masking with mocks.
    if (!allFeatured || allFeatured.length === 0) {
      return []
    }

    // Randomly shuffle the featured listings and take the requested number
    const shuffled = [...allFeatured].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, limit)
  } catch (error) {
    console.error("Error in getFeaturedListings:", error)
    return mockFallback()
  }
}

// Get listings by category
export async function getListingsByCategory(
  category: string,
  limit = 6,
  offset = 0
): Promise<DirectoryListing[]> {
  try {
    console.log(`Fetching listings for category: ${category} with limit: ${limit} and offset: ${offset}`)

    const mockFallback = () =>
      USE_MOCK_FALLBACK ? getListingsByCategorySync(category, limit) : []

    // Try to get the Supabase client
    const supabase = getSupabaseServerClient()
    if (!supabase) {
      console.error(`getListingsByCategory(${category}): Supabase client not available`)
      return mockFallback()
    }

    try {
      // Execute the query with pagination
      const { data, error } = await supabase
        .from("directory_listings")
        .select("*")
        .eq("category", category)
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        console.error(`Error fetching listings for category ${category}:`, error)
        return mockFallback()
      }

      // Empty is a valid result — return [] (the empty-state UI is wired).
      // We deliberately do not fall back to mock data here, even in dev,
      // because mock numeric IDs leak into the public listings pages.
      if (!data || data.length === 0) {
        return []
      }

      console.log(`Successfully fetched ${data.length} listings for category ${category}`)

      // Map the data to match our DirectoryListing type. Editorial fields
      // are passed through as-is (all nullable; rows that don't yet have
      // them populated still render fine).
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

        // Editorial / transformational layer (all nullable)
        verdict: item.verdict ?? null,
        signature_experience: item.signature_experience ?? null,
        conservation_summary: item.conservation_summary ?? null,
        community_summary: item.community_summary ?? null,
        wellness_offerings: item.wellness_offerings ?? null,
        activities: item.activities ?? null,
        founder_name: item.founder_name ?? null,
        founder_note: item.founder_note ?? null,
        founder_image_url: item.founder_image_url ?? null,
        traveller_quotes: item.traveller_quotes ?? null,
        external_ratings: item.external_ratings ?? null,
        gallery_urls: item.gallery_urls ?? null,
        max_guests: item.max_guests ?? null,
        best_time_to_visit: item.best_time_to_visit ?? null,
        price_tier: item.price_tier ?? null,
        latitude: item.latitude ?? null,
        longitude: item.longitude ?? null,
        field_notes_slugs: item.field_notes_slugs ?? null,
        editor_notes: item.editor_notes ?? null,
      }))
    } catch (queryError) {
      console.error(`Error executing Supabase query for category ${category}:`, queryError)
      return USE_MOCK_FALLBACK ? getListingsByCategorySync(category, limit) : []
    }
  } catch (error) {
    console.error(`Error in getListingsByCategory for ${category}:`, error)
    return USE_MOCK_FALLBACK ? getListingsByCategorySync(category, limit) : []
  }
}

// Get listings by region
//
// NOTE: this function predates the Supabase wire-up and was never converted
// — it always returned mock data. The mock branch is now gated to dev only;
// in production it returns []. A real Supabase query for this function is
// out of scope for the admin wire-up sprint (Stream C). Track separately
// if /destinations/[region] starts shipping live.
export async function getListingsByRegion(region: string, limit = 12): Promise<DirectoryListing[]> {
  return USE_MOCK_FALLBACK ? getListingsSync({ region, limit }) : []
}

// Get pending listings
export async function getPendingListings(limit = 10): Promise<DirectoryListing[]> {
  const mockFallback = () =>
    USE_MOCK_FALLBACK ? getListingsSync({ status: "pending", limit }) : []

  try {
    const supabase = getSupabaseServerClient()

    if (!supabase) {
      console.error("getPendingListings: Supabase client not available")
      return mockFallback()
    }

    const { data, error } = await supabase
      .from("directory_listings")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching pending listings from Supabase:", error)
      return mockFallback()
    }

    return (data ?? []) as DirectoryListing[]
  } catch (error) {
    console.error("Error in getPendingListings:", error)
    return mockFallback()
  }
}

// Get listing count
export async function getListingCount(category?: string, status = "approved"): Promise<number> {
  const mockCount = () =>
    USE_MOCK_FALLBACK
      ? filterMockListings({ category, status, limit: 1000 }).length
      : 0

  try {
    const supabase = getSupabaseServerClient()

    if (!supabase) {
      console.error("getListingCount: Supabase client not available")
      return mockCount()
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
      return mockCount()
    }

    return count || 0
  } catch (error) {
    console.error("Error in getListingCount:", error)
    return mockCount()
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
    const supabase = getSupabaseServerClient()

    // If Supabase is up and the ID is a valid UUID, the database is the source of truth.
    if (supabase && isValidUUID(id)) {
      const { data, error } = await supabase.from("directory_listings").select("*").eq("id", id).single()
      if (!error && data) return data as DirectoryListing
      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows. Anything else is a real error worth logging.
        console.error("Error fetching listing by ID from Supabase:", error)
      }
    }

    // Fall back to mock data only in dev (mock numeric IDs only exist there).
    if (USE_MOCK_FALLBACK) {
      const mockListing =
        mockListings.find((listing) => listing.id === id) ||
        mockPendingListings.find((listing) => listing.id === id)
      if (mockListing) {
        console.log(`Falling back to mock listing for ID ${id}`)
        return mockListing
      }
    }

    return null
  } catch (error) {
    console.error("Error in getListingById:", error)
    return null
  }
}

/**
 * Admin-side fetcher. Identical implementation to `getListingById` — both
 * use the service-role client which already bypasses RLS — but kept
 * separate so admin call sites (edit form, preview route, outreach API)
 * read clearly: "we deliberately want pending and rejected rows too."
 *
 * Public surfaces must continue to call `getListingById` and gate the
 * result on `listing.status === "approved"` at the page level.
 */
export async function getListingForAdmin(id: string): Promise<DirectoryListing | null> {
  return getListingById(id)
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

  const mockOrEmpty = () =>
    regions.map((region) => ({
      name: region,
      count: USE_MOCK_FALLBACK
        ? filterMockListings({ region, limit: 1000 }).length
        : 0,
    }))

  try {
    const supabase = getSupabaseServerClient()

    if (!supabase) {
      console.error("getRegions: Supabase client not available")
      return mockOrEmpty()
    }

    const { data, error } = await supabase.from("directory_listings").select("region").eq("status", "approved")

    if (error) {
      console.error("Error fetching regions from Supabase:", error)
      return mockOrEmpty()
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
    return mockOrEmpty()
  }
}

// Update a listing
//
// NOTE: this function is no longer called from the app — /api/listings/[id]
// PUT does its own Supabase update inline (Stream A). It's preserved for
// the Auto-flow tests that still import it. The in-memory fallback is
// dev-only; in production a write failure throws so the caller surfaces
// the error rather than silently lying about success.
export async function updateListing(updatedListing: DirectoryListing): Promise<DirectoryListing> {
  const mockUpdateOrThrow = (reason: string): DirectoryListing => {
    if (USE_MOCK_FALLBACK) {
      console.warn(`updateListing: ${reason} — using in-memory update`)
      return updateListingInMemory(updatedListing)
    }
    throw new Error(`updateListing failed: ${reason}`)
  }

  try {
    const supabase = getSupabaseServerClient()

    if (!supabase) {
      return mockUpdateOrThrow("Supabase client not available")
    }

    // Only try to update in Supabase if the ID looks like a valid UUID
    if (!isValidUUID(updatedListing.id)) {
      return mockUpdateOrThrow(`ID ${updatedListing.id} is not a valid UUID`)
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
      return mockUpdateOrThrow("Supabase update returned error")
    }

    return data as DirectoryListing
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("updateListing failed:")) {
      // The throw from mockUpdateOrThrow — re-raise rather than swallow.
      throw error
    }
    console.error("Error in updateListing:", error)
    return mockUpdateOrThrow("threw before reaching DB")
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
