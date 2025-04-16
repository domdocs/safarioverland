import { DestinationHeader } from "@/components/destination-header"
import { DestinationAttractions } from "@/components/destination-attractions"
import { DestinationWildlife } from "@/components/destination-wildlife"
import { DestinationSeasons } from "@/components/destination-seasons"
import { DestinationMap } from "@/components/destination-map"
import { ListingsGrid } from "@/components/listings-grid"

// Mock data for East Africa attractions
const eastAfricaAttractions = [
  {
    name: "Masai Mara National Reserve",
    location: "Kenya",
    description:
      "Famous for the Great Migration and exceptional big cat sightings, the Masai Mara offers classic safari landscapes.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Great Migration", "Big Cats", "Hot Air Balloons", "Masai Culture"],
    bestTime: "Jul-Oct",
  },
  {
    name: "Serengeti National Park",
    location: "Tanzania",
    description: "Vast plains teeming with wildlife and home to the largest terrestrial mammal migration in the world.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Great Migration", "Big Five", "Balloon Safaris", "Luxury Camps"],
    bestTime: "Jun-Sep",
  },
  {
    name: "Ngorongoro Crater",
    location: "Tanzania",
    description:
      "A UNESCO World Heritage Site, this extinct volcanic caldera contains one of the densest concentrations of wildlife in Africa.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Big Five", "Crater Views", "Compact Safari", "Maasai Villages"],
    bestTime: "Jun-Sep",
  },
  {
    name: "Bwindi Impenetrable Forest",
    location: "Uganda",
    description:
      "Home to nearly half of the world's remaining mountain gorillas, offering unforgettable trekking experiences.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Gorilla Trekking", "Bird Watching", "Forest Walks", "Cultural Visits"],
    bestTime: "Jun-Aug, Dec-Feb",
  },
  {
    name: "Amboseli National Park",
    location: "Kenya",
    description:
      "Known for large elephant herds and spectacular views of Mount Kilimanjaro across the border in Tanzania.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Elephants", "Mt. Kilimanjaro Views", "Wetlands", "Bird Watching"],
    bestTime: "Jun-Oct",
  },
  {
    name: "Volcanoes National Park",
    location: "Rwanda",
    description:
      "Part of the Virunga Conservation Area, this park is home to endangered mountain gorillas and golden monkeys.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Gorilla Trekking", "Golden Monkeys", "Volcano Hikes", "Dian Fossey Tomb"],
    bestTime: "Jun-Sep, Dec-Feb",
  },
]

// Mock data for East Africa wildlife
const eastAfricaWildlife = [
  {
    name: "Lion",
    description: "Abundant in savannah parks",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Elephant",
    description: "Large herds throughout region",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Mountain Gorilla",
    description: "Uganda and Rwanda forests",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Wildebeest",
    description: "Famous for Great Migration",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Cheetah",
    description: "Open plains of Mara and Serengeti",
    image: "/placeholder.svg?height=150&width=150",
  },
]

// Mock data for East Africa seasons
const eastAfricaSeasons = [
  {
    name: "Dry Season",
    months: "June to October",
    weather: "Warm days, cool nights, minimal rain",
    wildlife: "Excellent viewing, animals at water sources",
    crowds: "High season, premium prices",
    pros: ["Best Wildlife Viewing", "Great Migration", "Less Mosquitoes", "Clear Skies"],
    cons: [
      "Higher prices during peak season",
      "More crowded at popular sightings",
      "Dusty conditions can occur",
      "Advance booking essential for popular lodges",
    ],
    icon: "sun",
  },
  {
    name: "Short Rains",
    months: "November to December",
    weather: "Afternoon showers, warm",
    wildlife: "Good viewing, newborn animals",
    crowds: "Shoulder season, better value",
    pros: ["Lower Prices", "Fewer Tourists", "Green Landscapes", "Bird Watching"],
    cons: [
      "Afternoon thunderstorms may interrupt activities",
      "Some roads may become muddy",
      "Slightly reduced visibility for photography",
      "Some camps close for maintenance",
    ],
    icon: "cloud",
  },
  {
    name: "Green Season",
    months: "January to February",
    weather: "Warm, short dry period",
    wildlife: "Excellent for birds, newborns",
    crowds: "Lower visitor numbers, good deals",
    pros: ["Lush Scenery", "Calving Season", "Bird Migration", "Photography"],
    cons: [
      "Tall grass can obscure wildlife viewing",
      "Some remote areas may be inaccessible",
      "Heat and humidity can be high",
      "Mosquitoes more prevalent",
    ],
    icon: "thermometer",
  },
  {
    name: "Long Rains",
    months: "March to May",
    weather: "Heavy rainfall, humid",
    wildlife: "Challenging viewing, but lush and green",
    crowds: "Low season, lowest prices",
    pros: ["Lowest Prices", "Few Tourists", "Dramatic Skies", "Unique Photography"],
    cons: [
      "Heavy rains can disrupt activities",
      "Many camps and lodges close",
      "Difficult road conditions",
      "Limited wildlife visibility in dense vegetation",
    ],
    icon: "rain",
  },
]

// Mock data for East Africa countries
const eastAfricaCountries = [
  {
    name: "Kenya",
    description:
      "The original safari destination, Kenya offers diverse landscapes from savannah to mountains, with excellent wildlife viewing and cultural experiences.",
    listings: 145,
  },
  {
    name: "Tanzania",
    description:
      "Home to the Serengeti and Ngorongoro Crater, Tanzania boasts incredible wildlife concentrations and the Great Migration.",
    listings: 168,
  },
  {
    name: "Uganda",
    description:
      "Known as the 'Pearl of Africa', Uganda combines gorilla trekking with traditional safaris and stunning landscapes.",
    listings: 87,
  },
  {
    name: "Rwanda",
    description:
      "The 'Land of a Thousand Hills' offers exceptional gorilla trekking experiences and beautiful mountain scenery.",
    listings: 54,
  },
]

// Mock data for East Africa listings
const eastAfricaListings = [
  {
    id: 1,
    title: "Masai Mara Luxury Safari",
    category: "Guided Tours",
    location: "Masai Mara, Kenya",
    rating: 4.9,
    reviews: 128,
    image: "/placeholder.svg?height=300&width=400",
    price: "$350/day",
    premium: true,
    description:
      "Luxury safari experience in the heart of the Masai Mara with expert guides and premium accommodations.",
    features: ["Big Five", "Great Migration", "Luxury Lodges", "Hot Air Balloon"],
  },
  {
    id: 2,
    title: "Serengeti Migration Camp",
    category: "Lodges",
    location: "Serengeti, Tanzania",
    rating: 4.8,
    reviews: 95,
    image: "/placeholder.svg?height=300&width=400",
    price: "$280/night",
    premium: true,
    description: "Luxury tented camp strategically located along the Great Migration route in the Serengeti.",
    features: ["Migration Views", "Game Drives", "Guided Walks", "All-Inclusive"],
  },
  {
    id: 3,
    title: "Gorilla Trekking Experience",
    category: "Adventure Activities",
    location: "Bwindi, Uganda",
    rating: 4.9,
    reviews: 76,
    image: "/placeholder.svg?height=300&width=400",
    price: "$700/person",
    premium: true,
    description: "Once-in-a-lifetime gorilla trekking experience in Uganda's Bwindi Impenetrable Forest.",
    features: ["Gorilla Permits", "Expert Guides", "Forest Accommodation", "Conservation Focus"],
  },
  {
    id: 4,
    title: "Ngorongoro Crater Lodge",
    category: "Lodges",
    location: "Ngorongoro, Tanzania",
    rating: 4.7,
    reviews: 112,
    image: "/placeholder.svg?height=300&width=400",
    price: "$450/night",
    premium: true,
    description:
      "Luxury lodge perched on the rim of the Ngorongoro Crater with stunning views and elegant accommodations.",
    features: ["Crater Views", "Game Drives", "Fine Dining", "Butler Service"],
  },
  {
    id: 5,
    title: "Kenya Safari 4x4 Rental",
    category: "4x4 Rentals",
    location: "Nairobi, Kenya",
    rating: 4.6,
    reviews: 83,
    image: "/placeholder.svg?height=300&width=400",
    price: "$120/day",
    description: "Well-maintained 4x4 vehicles for self-drive safaris across Kenya's national parks.",
    features: ["Roof Tent", "GPS", "24/7 Support", "Camping Equipment"],
  },
  {
    id: 6,
    title: "Rwanda Primate Safari",
    category: "Guided Tours",
    location: "Volcanoes National Park, Rwanda",
    rating: 4.8,
    reviews: 64,
    image: "/placeholder.svg?height=300&width=400",
    price: "$850/person",
    premium: true,
    description: "Comprehensive primate safari including gorilla and golden monkey trekking in Rwanda.",
    features: ["Gorilla Trekking", "Golden Monkeys", "Luxury Lodges", "Cultural Experiences"],
  },
]

export default function EastAfricaPage() {
  return (
    <div>
      <DestinationHeader
        title="East Africa"
        description="Home to the Great Migration, mountain gorillas, and classic safari landscapes, East Africa offers some of the continent's most iconic wildlife experiences."
        image="/placeholder.svg?height=800&width=1600"
        facts={[
          { label: "Countries", value: "Kenya, Tanzania, Uganda, Rwanda" },
          { label: "Best Time to Visit", value: "June to October" },
          { label: "Famous For", value: "Great Migration, Gorillas" },
          { label: "Safari Types", value: "Game Drives, Walking, Trekking" },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        <DestinationAttractions attractions={eastAfricaAttractions} />
        <DestinationWildlife
          wildlife={eastAfricaWildlife}
          title="Iconic Wildlife"
          description="East Africa is home to an incredible diversity of wildlife, including the Big Five and rare primates."
        />
        <DestinationSeasons seasons={eastAfricaSeasons} />
        <DestinationMap countries={eastAfricaCountries} regionName="East Africa" />

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured East Africa Safaris</h2>
          <ListingsGrid listings={eastAfricaListings} category="East Africa" />
        </div>
      </div>
    </div>
  )
}
