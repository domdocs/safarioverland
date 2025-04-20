import { DestinationHeader } from "@/components/destination-header"
import { DestinationAttractions } from "@/components/destination-attractions"
import { DestinationWildlife } from "@/components/destination-wildlife"
import { DestinationSeasons } from "@/components/destination-seasons"
import { DestinationMap } from "@/components/destination-map"
import { ListingsGrid } from "@/components/listings-grid"

// Mock data for West Africa attractions
const westAfricaAttractions = [
  {
    name: "Mole National Park",
    location: "Ghana",
    description:
      "Ghana's largest wildlife sanctuary featuring savannah woodland and home to elephants, antelopes, and numerous bird species.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Elephants", "Walking Safaris", "Bird Watching", "Cultural Experiences"],
    bestTime: "Nov-Apr",
  },
  {
    name: "Pendjari National Park",
    location: "Benin",
    description:
      "One of West Africa's most important wildlife reserves, protecting lions, elephants, and numerous antelope species.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Big Game", "Remote Wilderness", "Few Visitors", "Conservation Focus"],
    bestTime: "Dec-Mar",
  },
  {
    name: "Niokolo-Koba National Park",
    location: "Senegal",
    description:
      "UNESCO World Heritage site with diverse ecosystems and wildlife including hippos, antelopes, and primates.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["River Ecosystems", "Diverse Wildlife", "Cultural Heritage", "Hiking"],
    bestTime: "Nov-May",
  },
  {
    name: "Yankari Game Reserve",
    location: "Nigeria",
    description: "Nigeria's premier wildlife destination with savannah woodland, warm springs, and diverse wildlife.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Elephants", "Warm Springs", "Ancient Rock Paintings", "Safari Drives"],
    bestTime: "Oct-Apr",
  },
  {
    name: "Boabeng-Fiema Monkey Sanctuary",
    location: "Ghana",
    description: "Community-managed sanctuary protecting sacred monkeys with unique cultural significance.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Colobus Monkeys", "Mona Monkeys", "Cultural Experience", "Community Tourism"],
    bestTime: "Year-round",
  },
  {
    name: "Bijagós Archipelago",
    location: "Guinea-Bissau",
    description: "UNESCO Biosphere Reserve comprising 88 islands with unique wildlife and traditional cultures.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Marine Life", "Saltwater Hippos", "Island Culture", "Pristine Beaches"],
    bestTime: "Nov-Apr",
  },
]

// Mock data for West Africa wildlife
const westAfricaWildlife = [
  {
    name: "Forest Elephant",
    description: "Smaller than savannah elephants",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Colobus Monkey",
    description: "Sacred in many communities",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "West African Lion",
    description: "Critically endangered subspecies",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Hippo",
    description: "Found in rivers and coastal areas",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Birdlife",
    description: "Over 500 species in coastal wetlands",
    image: "/placeholder.svg?height=150&width=150",
  },
]

// Mock data for West Africa seasons
const westAfricaSeasons = [
  {
    name: "Dry Season",
    months: "November to April",
    weather: "Hot days, cooler nights, minimal rain",
    wildlife: "Best viewing as animals gather at water sources",
    crowds: "Peak tourist season, moderate crowds",
    pros: ["Best Wildlife Viewing", "Comfortable Temperatures", "Accessible Roads", "Less Mosquitoes"],
    cons: [
      "Very hot in March-April",
      "Dusty conditions in late season",
      "Some water sources dry up",
      "Vegetation can be sparse and brown",
    ],
    icon: "sun",
  },
  {
    name: "Wet Season",
    months: "May to October",
    weather: "Hot, humid with regular rainfall",
    wildlife: "Dispersed wildlife, lush landscapes, breeding birds",
    crowds: "Low season, fewer tourists",
    pros: ["Lush Green Landscapes", "Fewer Tourists", "Lower Prices", "Bird Breeding Season"],
    cons: [
      "Roads can become impassable",
      "Some parks close during heavy rains",
      "Wildlife harder to spot in dense vegetation",
      "Mosquitoes and disease risk higher",
    ],
    icon: "rain",
  },
  {
    name: "Early Dry",
    months: "November to December",
    weather: "Warm days, mild nights, occasional showers",
    wildlife: "Good viewing, animals still dispersed",
    crowds: "Building up to peak season",
    pros: ["Green Landscapes", "Good Photography", "Comfortable Temperatures", "Wildlife Viewing"],
    cons: [
      "Some roads still difficult after rains",
      "Wildlife not yet concentrated at water sources",
      "Some lodges still closed from wet season",
      "Variable weather conditions",
    ],
    icon: "cloud",
  },
  {
    name: "Late Dry",
    months: "March to April",
    weather: "Very hot days, warm nights",
    wildlife: "Excellent viewing at limited water sources",
    crowds: "Tapering off from peak season",
    pros: ["Excellent Wildlife Concentration", "Clear Skies", "Good Photography", "Accessible Areas"],
    cons: [
      "Extremely hot temperatures",
      "Dusty conditions",
      "Sparse vegetation",
      "Limited water availability in some areas",
    ],
    icon: "thermometer",
  },
]

// Mock data for West Africa countries
const westAfricaCountries = [
  {
    name: "Ghana",
    description:
      "Offers a combination of wildlife viewing, cultural experiences, and coastal attractions with good infrastructure.",
    listings: 42,
  },
  {
    name: "Senegal",
    description:
      "Features diverse ecosystems from coastal wetlands to savannah, with a focus on bird watching and cultural tourism.",
    listings: 35,
  },
  {
    name: "Nigeria",
    description:
      "Home to important wildlife reserves protecting forest and savannah species, combined with rich cultural heritage.",
    listings: 28,
  },
  {
    name: "Benin",
    description:
      "Known for Pendjari National Park, one of West Africa's most important wildlife reserves, and vibrant cultural traditions.",
    listings: 22,
  },
]

// Mock data for West Africa listings
const westAfricaListings = [
  {
    id: 1,
    title: "Ghana Wildlife & Culture Tour",
    category: "Guided Tours",
    location: "Ghana",
    rating: 4.7,
    reviews: 48,
    image: "/placeholder.svg?height=300&width=400",
    price: "$180/day",
    premium: true,
    description: "Comprehensive tour combining wildlife viewing in Mole National Park with cultural experiences.",
    features: ["Wildlife Viewing", "Cultural Immersion", "Local Guides", "Community Visits"],
  },
  {
    id: 2,
    title: "Pendjari Safari Experience",
    category: "Guided Tours",
    location: "Benin",
    rating: 4.8,
    reviews: 36,
    image: "/placeholder.svg?height=300&width=400",
    price: "$210/day",
    premium: true,
    description: "Exclusive safari in one of West Africa's most important wildlife reserves with expert local guides.",
    features: ["Big Game", "Conservation Focus", "Remote Experience", "All-Inclusive"],
  },
  {
    id: 3,
    title: "Senegal Bird Watching Tour",
    category: "Guided Tours",
    location: "Senegal",
    rating: 4.9,
    reviews: 42,
    image: "/placeholder.svg?height=300&width=400",
    price: "$160/day",
    description: "Specialized bird watching tour through Senegal's diverse ecosystems with expert ornithologists.",
    features: ["Bird Specialists", "Multiple Habitats", "Photography Focus", "Small Groups"],
  },
  {
    id: 4,
    title: "West Africa 4x4 Adventure",
    category: "4x4 Rentals",
    location: "Multiple Countries",
    rating: 4.6,
    reviews: 32,
    image: "/placeholder.svg?height=300&width=400",
    price: "$85/day",
    description: "Fully equipped 4x4 vehicles for self-drive adventures across West African countries.",
    features: ["Cross-border Permits", "GPS Navigation", "Camping Equipment", "24/7 Support"],
  },
  {
    id: 5,
    title: "Bijagós Archipelago Expedition",
    category: "Adventure Activities",
    location: "Guinea-Bissau",
    rating: 4.8,
    reviews: 28,
    image: "/placeholder.svg?height=300&width=400",
    price: "$250/day",
    premium: true,
    description: "Unique expedition to the remote Bijagós islands to observe wildlife and traditional cultures.",
    features: ["Island Hopping", "Wildlife Viewing", "Cultural Experiences", "Boat Transport"],
  },
  {
    id: 6,
    title: "Yankari Game Reserve Safari",
    category: "Guided Tours",
    location: "Nigeria",
    rating: 4.5,
    reviews: 34,
    image: "/placeholder.svg?height=300&width=400",
    price: "$140/day",
    description: "Comprehensive safari experience in Nigeria's premier wildlife destination with warm springs visit.",
    features: ["Game Drives", "Warm Springs", "Accommodation", "Local Guides"],
  },
]

export default function WestAfricaPage() {
  return (
    <div>
      <DestinationHeader
        title="West Africa"
        description="Discover the less-traveled safari destinations of West Africa, offering unique wildlife, vibrant cultures, and authentic experiences away from the tourist crowds."
        image="/images/destinations/west-africa.jpg"
        facts={[
          { label: "Countries", value: "Ghana, Senegal, Nigeria, Benin" },
          { label: "Best Time to Visit", value: "November to April" },
          { label: "Famous For", value: "Cultural Safaris, Bird Watching" },
          { label: "Safari Types", value: "Wildlife & Culture, Bird Watching" },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        <DestinationAttractions attractions={westAfricaAttractions} />
        <DestinationWildlife
          wildlife={westAfricaWildlife}
          title="Unique Wildlife"
          description="West Africa is home to distinct wildlife species and subspecies, with a focus on forest elephants, primates, and incredible birdlife."
        />
        <DestinationSeasons seasons={westAfricaSeasons} />
        <DestinationMap countries={westAfricaCountries} regionName="West Africa" />

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured West Africa Experiences</h2>
          <ListingsGrid listings={westAfricaListings} category="West Africa" />
        </div>
      </div>
    </div>
  )
}
