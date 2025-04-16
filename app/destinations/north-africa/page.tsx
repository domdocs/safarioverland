import { DestinationHeader } from "@/components/destination-header"
import { DestinationAttractions } from "@/components/destination-attractions"
import { DestinationWildlife } from "@/components/destination-wildlife"
import { DestinationSeasons } from "@/components/destination-seasons"
import { DestinationMap } from "@/components/destination-map"
import { ListingsGrid } from "@/components/listings-grid"

// Mock data for North Africa attractions
const northAfricaAttractions = [
  {
    name: "Sahara Desert",
    location: "Morocco",
    description:
      "Experience the majestic Sahara with camel treks, overnight camps, and unique desert wildlife viewing opportunities.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Camel Treks", "Desert Camps", "Stargazing", "Desert Wildlife"],
    bestTime: "Oct-Apr",
  },
  {
    name: "Atlas Mountains",
    location: "Morocco",
    description:
      "Stunning mountain range offering trekking, wildlife viewing, and encounters with traditional Berber culture.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Trekking", "Berber Villages", "Wildlife", "Photography"],
    bestTime: "Apr-Jun, Sep-Oct",
  },
  {
    name: "Siwa Oasis",
    location: "Egypt",
    description: "Remote desert oasis with unique culture, desert adventures, and wildlife viewing opportunities.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Desert Safari", "Salt Lakes", "Cultural Experiences", "Bird Watching"],
    bestTime: "Oct-Apr",
  },
  {
    name: "Ichkeul National Park",
    location: "Tunisia",
    description: "UNESCO World Heritage site and important wetland for migratory birds with diverse ecosystems.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Bird Watching", "Wetlands", "Mountain Views", "Hiking"],
    bestTime: "Nov-Mar",
  },
  {
    name: "White Desert",
    location: "Egypt",
    description: "Surreal landscape of chalk rock formations with unique desert wildlife and spectacular night skies.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Unique Formations", "Desert Camping", "Wildlife", "Photography"],
    bestTime: "Oct-Apr",
  },
  {
    name: "Toubkal National Park",
    location: "Morocco",
    description:
      "Home to North Africa's highest peak with diverse ecosystems and wildlife from the valley to high altitude.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Mountain Trekking", "Wildlife", "Berber Culture", "Photography"],
    bestTime: "May-Oct",
  },
]

// Mock data for North Africa wildlife
const northAfricaWildlife = [
  {
    name: "Barbary Macaque",
    description: "Endemic to Atlas Mountains",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Fennec Fox",
    description: "Desert-adapted with large ears",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Dorcas Gazelle",
    description: "Small gazelle of desert regions",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Desert Hedgehog",
    description: "Smallest hedgehog species",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Flamingos",
    description: "Common in coastal wetlands",
    image: "/placeholder.svg?height=150&width=150",
  },
]

// Mock data for North Africa seasons
const northAfricaSeasons = [
  {
    name: "Winter",
    months: "November to February",
    weather: "Mild days, cold nights in desert/mountains",
    wildlife: "Active desert wildlife, migratory birds",
    crowds: "High season, moderate crowds",
    pros: ["Comfortable Temperatures", "Active Wildlife", "Bird Migration", "Clear Skies"],
    cons: [
      "Cold nights in desert and mountains",
      "Some mountain passes may be closed due to snow",
      "Higher prices during peak season",
      "Popular sites can be crowded",
    ],
    icon: "cloud",
  },
  {
    name: "Spring",
    months: "March to May",
    weather: "Warm days, mild nights, occasional rain",
    wildlife: "Breeding season, desert blooms",
    crowds: "Shoulder season, moderate crowds",
    pros: ["Desert Flowers", "Pleasant Temperatures", "Wildlife Activity", "Good Value"],
    cons: [
      "Occasional sandstorms (khamsin) in Egypt",
      "Variable weather conditions",
      "Increasing heat by late spring",
      "Some migratory birds departing",
    ],
    icon: "sun",
  },
  {
    name: "Summer",
    months: "June to August",
    weather: "Very hot days, warm nights",
    wildlife: "Limited activity during day, nocturnal viewing",
    crowds: "Low season in desert, high in coastal areas",
    pros: ["Few Tourists in Desert", "Lower Prices", "Night Wildlife Activity", "Mountain Trekking"],
    cons: [
      "Extreme heat in desert regions",
      "Limited wildlife activity during day",
      "Uncomfortable conditions for many activities",
      "Some camps and operations closed",
    ],
    icon: "thermometer",
  },
  {
    name: "Autumn",
    months: "September to October",
    weather: "Warm days, cooling nights",
    wildlife: "Increasing activity, returning migrants",
    crowds: "Shoulder season, building up",
    pros: ["Pleasant Temperatures", "Increasing Wildlife Activity", "Bird Migration", "Good Value"],
    cons: [
      "Variable weather conditions",
      "Still hot in early autumn",
      "Some facilities still closed from summer",
      "Increasing visitor numbers by October",
    ],
    icon: "cloud",
  },
]

// Mock data for North Africa countries
const northAfricaCountries = [
  {
    name: "Morocco",
    description:
      "Offers diverse experiences from Sahara Desert adventures to Atlas Mountain treks, with rich culture and wildlife.",
    listings: 56,
  },
  {
    name: "Egypt",
    description:
      "Combines historical sites with unique desert ecosystems and oases, offering distinctive wildlife experiences.",
    listings: 48,
  },
  {
    name: "Tunisia",
    description: "Features important wetlands for migratory birds, desert landscapes, and Mediterranean ecosystems.",
    listings: 32,
  },
]

// Mock data for North Africa listings
const northAfricaListings = [
  {
    id: 1,
    title: "Sahara Desert Expedition",
    category: "Adventure Activities",
    location: "Morocco",
    rating: 4.8,
    reviews: 64,
    image: "/placeholder.svg?height=300&width=400",
    price: "$180/day",
    premium: true,
    description:
      "Multi-day expedition into the Sahara Desert with camel trekking, wildlife viewing, and desert camping.",
    features: ["Camel Trek", "Desert Camp", "Wildlife Viewing", "Berber Guides"],
  },
  {
    id: 2,
    title: "Atlas Mountains Trek",
    category: "Guided Tours",
    location: "Morocco",
    rating: 4.7,
    reviews: 58,
    image: "/placeholder.svg?height=300&width=400",
    price: "$150/day",
    description: "Guided trekking through the Atlas Mountains with wildlife viewing and cultural experiences.",
    features: ["Mountain Trekking", "Wildlife Spotting", "Berber Villages", "Local Cuisine"],
  },
  {
    id: 3,
    title: "Egyptian Desert Safari",
    category: "4x4 Rentals",
    location: "Egypt",
    rating: 4.6,
    reviews: 42,
    image: "/placeholder.svg?height=300&width=400",
    price: "$95/day",
    description: "4x4 adventures through Egypt's Western Desert with visits to oases and unique desert formations.",
    features: ["4x4 Vehicle", "Desert Guide", "Camping Equipment", "Route Planning"],
  },
  {
    id: 4,
    title: "Siwa Oasis Experience",
    category: "Guided Tours",
    location: "Egypt",
    rating: 4.9,
    reviews: 38,
    image: "/placeholder.svg?height=300&width=400",
    price: "$140/day",
    premium: true,
    description: "Immersive experience in the remote Siwa Oasis with desert adventures and wildlife observation.",
    features: ["Oasis Exploration", "Salt Lakes", "Desert Safari", "Cultural Immersion"],
  },
  {
    id: 5,
    title: "Tunisia Bird Watching Tour",
    category: "Guided Tours",
    location: "Tunisia",
    rating: 4.8,
    reviews: 36,
    image: "/placeholder.svg?height=300&width=400",
    price: "$130/day",
    description: "Specialized bird watching tour through Tunisia's wetlands and diverse ecosystems.",
    features: ["Expert Ornithologists", "Multiple Habitats", "Photography Tips", "Small Groups"],
  },
  {
    id: 6,
    title: "Morocco Wildlife Photography",
    category: "Guided Tours",
    location: "Morocco",
    rating: 4.7,
    reviews: 32,
    image: "/placeholder.svg?height=300&width=400",
    price: "$190/day",
    premium: true,
    description: "Photography-focused tour of Morocco's diverse ecosystems with expert wildlife photographers.",
    features: ["Photography Focus", "Multiple Ecosystems", "Expert Guides", "Small Groups"],
  },
]

export default function NorthAfricaPage() {
  return (
    <div>
      <DestinationHeader
        title="North Africa"
        description="Explore the unique safari experiences of North Africa, from desert adventures to mountain treks, offering distinctive wildlife and breathtaking landscapes."
        image="/placeholder.svg?height=800&width=1600"
        facts={[
          { label: "Countries", value: "Morocco, Egypt, Tunisia" },
          { label: "Best Time to Visit", value: "October to April" },
          { label: "Famous For", value: "Desert Safaris, Bird Watching" },
          { label: "Safari Types", value: "Desert, Mountain, Wetland" },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        <DestinationAttractions attractions={northAfricaAttractions} />
        <DestinationWildlife
          wildlife={northAfricaWildlife}
          title="Unique Wildlife"
          description="North Africa is home to distinctive desert-adapted species and important habitats for migratory birds."
        />
        <DestinationSeasons seasons={northAfricaSeasons} />
        <DestinationMap countries={northAfricaCountries} regionName="North Africa" />

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured North Africa Experiences</h2>
          <ListingsGrid listings={northAfricaListings} category="North Africa" />
        </div>
      </div>
    </div>
  )
}
