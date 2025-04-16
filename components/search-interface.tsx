"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Filter } from "lucide-react"
import { ListingCard } from "@/components/listing-card"

// Mock data for search results
const mockSearchResults = [
  {
    id: "1",
    title: "Serengeti Luxury Lodge",
    description: "Experience the ultimate safari luxury in the heart of the Serengeti.",
    location: "Serengeti, Tanzania",
    price: "$350",
    rating: 4.9,
    reviewCount: 127,
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "lodges",
    featured: true,
  },
  {
    id: "2",
    title: "Masai Mara Tented Camp",
    description: "Authentic safari experience with comfortable tented accommodation.",
    location: "Masai Mara, Kenya",
    price: "$180",
    rating: 4.7,
    reviewCount: 89,
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "campsites",
    featured: false,
  },
  {
    id: "3",
    title: "Kruger Safari 4x4 Rental",
    description: "Fully equipped 4x4 vehicles for self-drive safaris in Kruger National Park.",
    location: "Kruger National Park, South Africa",
    price: "$120",
    rating: 4.8,
    reviewCount: 64,
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "4x4-rentals",
    featured: false,
  },
  {
    id: "4",
    title: "Victoria Falls Adventure Tour",
    description: "Guided tour of Victoria Falls with optional adventure activities.",
    location: "Victoria Falls, Zimbabwe",
    price: "$95",
    rating: 4.6,
    reviewCount: 42,
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "guided-tours",
    featured: true,
  },
]

export function SearchInterface() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(mockSearchResults)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Initialize search query from URL params
  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
      performSearch(query)
    }
  }, [searchParams])

  const performSearch = (query) => {
    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Filter mock results based on search query
      const filteredResults = mockSearchResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )

      setSearchResults(filteredResults)
      setIsLoading(false)
    }, 800)
  }

  const handleSearch = (e) => {
    e.preventDefault()

    // Update URL with search query
    const params = new URLSearchParams(searchParams)
    if (searchQuery) {
      params.set("q", searchQuery)
    } else {
      params.delete("q")
    }

    router.push(`/search?${params.toString()}`)
    performSearch(searchQuery)
  }

  const filterByCategory = (category) => {
    setActiveTab(category)

    if (category === "all") {
      setSearchResults(mockSearchResults)
    } else {
      const filteredResults = mockSearchResults.filter((item) => item.category === category)
      setSearchResults(filteredResults)
    }
  }

  const applyFilters = () => {
    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      let filteredResults = [...mockSearchResults]

      // Apply region filter
      if (selectedRegion) {
        filteredResults = filteredResults.filter((item) =>
          item.location.toLowerCase().includes(selectedRegion.toLowerCase()),
        )
      }

      // Apply category filter
      if (selectedCategory && selectedCategory !== "all") {
        filteredResults = filteredResults.filter((item) => item.category === selectedCategory)
      }

      // Apply price range filter
      if (priceRange) {
        // This is a simplified example - in a real app, you'd have more sophisticated price filtering
        if (priceRange === "budget") {
          filteredResults = filteredResults.filter((item) => Number.parseInt(item.price.replace("$", "")) < 150)
        } else if (priceRange === "mid") {
          filteredResults = filteredResults.filter(
            (item) =>
              Number.parseInt(item.price.replace("$", "")) >= 150 && Number.parseInt(item.price.replace("$", "")) < 250,
          )
        } else if (priceRange === "luxury") {
          filteredResults = filteredResults.filter((item) => Number.parseInt(item.price.replace("$", "")) >= 250)
        }
      }

      setSearchResults(filteredResults)
      setIsLoading(false)
    }, 600)
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for lodges, tours, destinations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
          <Button type="button" variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </form>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Region</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="east africa">East Africa</SelectItem>
                    <SelectItem value="southern africa">Southern Africa</SelectItem>
                    <SelectItem value="west africa">West Africa</SelectItem>
                    <SelectItem value="north africa">North Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="lodges">Lodges</SelectItem>
                    <SelectItem value="campsites">Campsites</SelectItem>
                    <SelectItem value="4x4-rentals">4x4 Rentals</SelectItem>
                    <SelectItem value="guided-tours">Guided Tours</SelectItem>
                    <SelectItem value="adventure-activities">Adventure Activities</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Price Range</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="budget">Budget (Under $150)</SelectItem>
                    <SelectItem value="mid">Mid-Range ($150-$250)</SelectItem>
                    <SelectItem value="luxury">Luxury ($250+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center mt-6 space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" />
                <Label htmlFor="featured">Featured listings only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="available" />
                <Label htmlFor="available">Available now</Label>
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={filterByCategory}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="lodges">Lodges</TabsTrigger>
          <TabsTrigger value="campsites">Campsites</TabsTrigger>
          <TabsTrigger value="4x4-rentals">4x4 Rentals</TabsTrigger>
          <TabsTrigger value="guided-tours">Tours</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            {isLoading ? "Searching..." : `${searchResults.length} results found`}
          </p>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[300px] rounded-lg bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((result) => (
              <ListingCard key={result.id} {...result} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any matches for your search. Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>

      {/* Pagination - only show if we have results */}
      {searchResults.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-1">
            <Button variant="outline" size="icon" disabled>
              &lt;
            </Button>
            <Button variant="default" size="icon">
              1
            </Button>
            <Button variant="outline" size="icon">
              2
            </Button>
            <Button variant="outline" size="icon">
              3
            </Button>
            <Button variant="outline" size="icon">
              &gt;
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
