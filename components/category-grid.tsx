import Link from "next/link"
import { Home, Tent, Car, Users, Mountain, TelescopeIcon as Binoculars, Map, Plane, Phone } from "lucide-react"

export function CategoryGrid() {
  // The error is happening because getCategories() is now an async function
  // but we're using it synchronously. Let's use the predefined categories instead.

  const categoryData = [
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

  // Map of category slugs to icons
  const categoryIcons = {
    lodges: <Home className="h-6 w-6" />,
    campsites: <Tent className="h-6 w-6" />,
    "4x4-rentals": <Car className="h-6 w-6" />,
    "guided-tours": <Users className="h-6 w-6" />,
    "adventure-activities": <Mountain className="h-6 w-6" />,
    "game-viewing": <Binoculars className="h-6 w-6" />,
    "overland-tours": <Map className="h-6 w-6" />,
    flights: <Plane className="h-6 w-6" />,
    "booking-agents": <Phone className="h-6 w-6" />,
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {categoryData.map((category) => (
        <Link
          key={category.slug}
          href={`/categories/${category.slug}`}
          className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
            {categoryIcons[category.slug as keyof typeof categoryIcons]}
          </div>
          <h3 className="font-medium mb-1">{category.name}</h3>
          <p className="text-xs text-muted-foreground">
            {/* Use a safer approach to get listing counts */}
            Browse listings
          </p>
        </Link>
      ))}
    </div>
  )
}
