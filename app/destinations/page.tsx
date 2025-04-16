import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

const regions = [
  {
    name: "East Africa",
    slug: "east-africa",
    description:
      "Home to the Serengeti, Masai Mara, and the Great Migration, East Africa offers classic safari landscapes and incredible wildlife density.",
    image: "/placeholder.svg?height=400&width=600",
    countries: ["Kenya", "Tanzania", "Uganda", "Rwanda"],
    highlights: ["Great Migration", "Gorilla Trekking", "Serengeti", "Ngorongoro Crater"],
  },
  {
    name: "Southern Africa",
    slug: "southern-africa",
    description:
      "From the Okavango Delta to Kruger National Park, Southern Africa combines diverse ecosystems with excellent infrastructure.",
    image: "/placeholder.svg?height=400&width=600",
    countries: ["South Africa", "Botswana", "Namibia", "Zimbabwe", "Zambia"],
    highlights: ["Okavango Delta", "Kruger National Park", "Victoria Falls", "Namib Desert"],
  },
  {
    name: "West Africa",
    slug: "west-africa",
    description:
      "Less traveled but rich in culture and wildlife, West Africa offers unique safari experiences and vibrant cultural encounters.",
    image: "/placeholder.svg?height=400&width=600",
    countries: ["Ghana", "Senegal", "Nigeria", "Benin"],
    highlights: ["Mole National Park", "Pendjari National Park", "Cultural Experiences", "Coastal Reserves"],
  },
  {
    name: "North Africa",
    slug: "north-africa",
    description:
      "Combining desert adventures with historical sites, North Africa offers unique wildlife and stunning landscapes.",
    image: "/placeholder.svg?height=400&width=600",
    countries: ["Morocco", "Egypt", "Tunisia"],
    highlights: ["Sahara Desert", "Atlas Mountains", "Desert Wildlife", "Oasis Ecosystems"],
  },
]

export default function DestinationsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Safari Destinations</h1>
        <p className="text-lg text-muted-foreground">
          Explore Africa's diverse safari regions, each offering unique wildlife, landscapes, and experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {regions.map((region) => (
          <Link key={region.slug} href={`/destinations/${region.slug}`}>
            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <Image src={region.image || "/placeholder.svg"} alt={region.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-2xl font-bold mb-1">{region.name}</h2>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {region.countries.map((country) => (
                      <Badge key={country} variant="secondary" className="bg-primary text-white">
                        {country}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-muted-foreground mb-4">{region.description}</p>
                <div className="flex flex-wrap gap-2">
                  {region.highlights.map((highlight) => (
                    <Badge key={highlight} variant="outline">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="bg-muted rounded-lg p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Planning Your Safari</h2>
          <p className="mb-6">
            Each African region offers unique safari experiences, wildlife viewing opportunities, and cultural
            encounters. Consider factors like wildlife interests, travel season, budget, and desired activities when
            choosing your destination.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Best for First-Timers</h3>
              <p className="text-sm">Kenya, Tanzania, South Africa</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Best for Luxury</h3>
              <p className="text-sm">Botswana, Tanzania, South Africa</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Best Value</h3>
              <p className="text-sm">Namibia, Uganda, Zimbabwe</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Popular Safari Countries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                name: "Kenya",
                image: "/placeholder.svg?height=300&width=400",
                highlights: ["Masai Mara", "Amboseli", "Great Migration"],
              },
              {
                name: "Tanzania",
                image: "/placeholder.svg?height=300&width=400",
                highlights: ["Serengeti", "Ngorongoro", "Zanzibar"],
              },
              {
                name: "South Africa",
                image: "/placeholder.svg?height=300&width=400",
                highlights: ["Kruger", "Cape Town", "Garden Route"],
              },
              {
                name: "Botswana",
                image: "/placeholder.svg?height=300&width=400",
                highlights: ["Okavango Delta", "Chobe", "Kalahari"],
              },
            ].map((country) => (
              <div key={country.name} className="flex gap-4 items-start">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={country.image || "/placeholder.svg"}
                    alt={country.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{country.name}</h3>
                  <ul className="text-sm text-muted-foreground">
                    {country.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-1 mb-1">
                        <MapPin className="h-3 w-3 text-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">When to Go</h2>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Dry Season (Jun-Oct)</h3>
                <p className="text-sm text-muted-foreground">
                  Best for wildlife viewing as animals gather around water sources. Peak season with higher prices.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Green Season (Nov-May)</h3>
                <p className="text-sm text-muted-foreground">
                  Lush landscapes, bird watching, and newborn animals. Lower prices and fewer crowds.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Migration (Jul-Oct)</h3>
                <p className="text-sm text-muted-foreground">
                  Witness the Great Migration in Kenya and Tanzania. Book well in advance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Shoulder Season (May, Nov)</h3>
                <p className="text-sm text-muted-foreground">
                  Good balance of wildlife viewing, weather, and value. Recommended for budget travelers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
