import { DestinationHeader } from "@/components/destination-header"
import { DestinationAttractions } from "@/components/destination-attractions"
import { DestinationWildlife } from "@/components/destination-wildlife"
import { DestinationSeasons } from "@/components/destination-seasons"
import { DestinationMap } from "@/components/destination-map"
import { ListingsGrid } from "@/components/listings-grid"

// Mock data for Southern Africa attractions
const southernAfricaAttractions = [
  {
    name: "Okavango Delta",
    location: "Botswana",
    description:
      "A unique inland delta forming a lush oasis in the Kalahari Desert, offering water-based safaris and exceptional wildlife.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Water Safaris", "Mokoro Canoes", "Luxury Camps", "Bird Watching"],
    bestTime: "Jun-Sep",
  },
  {
    name: "Kruger National Park",
    location: "South Africa",
    description:
      "One of Africa's largest game reserves with an exceptional diversity of wildlife and excellent infrastructure.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Big Five", "Self-Drive Option", "Various Accommodations", "Accessible"],
    bestTime: "May-Sep",
  },
  {
    name: "Victoria Falls",
    location: "Zimbabwe/Zambia",
    description:
      "One of the world's largest waterfalls, offering breathtaking views and numerous adventure activities.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Scenic Views", "Adventure Activities", "River Cruises", "Wildlife Nearby"],
    bestTime: "Feb-May",
  },
  {
    name: "Namib Desert",
    location: "Namibia",
    description: "The world's oldest desert featuring towering red dunes, stark landscapes, and adapted wildlife.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Sossusvlei Dunes", "Dead Vlei", "Stargazing", "Desert Wildlife"],
    bestTime: "May-Oct",
  },
  {
    name: "Chobe National Park",
    location: "Botswana",
    description: "Famous for its large elephant herds and diverse wildlife along the Chobe River.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Elephant Herds", "River Safaris", "Photography", "Luxury Lodges"],
    bestTime: "May-Oct",
  },
  {
    name: "Hwange National Park",
    location: "Zimbabwe",
    description: "Zimbabwe's largest national park with over 100 mammal species and 400 bird species.",
    image: "/placeholder.svg?height=300&width=400",
    highlights: ["Elephants", "Predators", "Waterholes", "Walking Safaris"],
    bestTime: "Jul-Oct",
  },
]

// Mock data for Southern Africa wildlife
const southernAfricaWildlife = [
  {
    name: "Elephant",
    description: "Largest herds in Botswana & Zimbabwe",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Leopard",
    description: "Commonly seen in Kruger & private reserves",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Rhino",
    description: "Both black & white species",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Desert Elephant",
    description: "Adapted to Namibia's harsh conditions",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Wild Dog",
    description: "Endangered predator in protected areas",
    image: "/placeholder.svg?height=150&width=150",
  },
]

// Mock data for Southern Africa seasons
const southernAfricaSeasons = [
  {
    name: "Dry Season",
    months: "May to October",
    weather: "Mild days, cold nights, no rain",
    wildlife: "Excellent viewing at waterholes",
    crowds: "High season, premium prices",
    pros: ["Best Wildlife Viewing", "Comfortable Temperatures", "No Mosquitoes", "Clear Skies"],
    cons: [
      "Cold mornings and nights (Jun-Aug)",
      "Higher prices during peak season",
      "Popular destinations can be crowded",
      "Dusty conditions in some areas",
    ],
    icon: "sun",
  },
  {
    name: "Green Season",
    months: "November to April",
    weather: "Hot and humid with afternoon thunderstorms",
    wildlife: "Newborn animals, lush landscapes, birds",
    crowds: "Low season, better value",
    pros: ["Lower Prices", "Fewer Tourists", "Lush Scenery", "Bird Migration"],
    cons: [
      "Heavy rains can affect road conditions",
      "Some areas become inaccessible (Okavango)",
      "Hot and humid conditions",
      "Mosquitoes more prevalent",
    ],
    icon: "cloud",
  },
  {
    name: "Peak Summer",
    months: "December to February",
    weather: "Very hot, afternoon thunderstorms",
    wildlife: "Birthing season, abundant birds",
    crowds: "Holiday season (Dec-Jan), mixed prices",
    pros: ["Newborn Animals", "Migratory Birds", "Dramatic Skies", "Lush Landscapes"],
    cons: [
      "Very hot temperatures",
      "Heavy rains can disrupt activities",
      "Higher prices during holiday season",
      "Malaria risk higher in some areas",
    ],
    icon: "thermometer",
  },
  {
    name: "Shoulder Season",
    months: "April to May, November",
    weather: "Mild, transitional weather",
    wildlife: "Good viewing, less predictable",
    crowds: "Lower visitor numbers, good deals",
    pros: ["Good Value", "Fewer Tourists", "Pleasant Weather", "Good Photography"],
    cons: [
      "Weather can be unpredictable",
      "Some facilities may be closed for maintenance",
      "Victoria Falls may have low water (Nov)",
      "Transition periods for wildlife",
    ],
    icon: "cloud",
  },
]

// Mock data for Southern Africa countries
const southernAfricaCountries = [
  {
    name: "South Africa",
    description:
      "Offers excellent infrastructure, diverse landscapes from savannah to mountains, and a wide range of safari options for all budgets.",
    listings: 187,
  },
  {
    name: "Botswana",
    description:
      "Known for its conservation focus, low-impact tourism, and pristine wilderness areas including the Okavango Delta and Chobe.",
    listings: 142,
  },
  {
    name: "Namibia",
    description:
      "Features dramatic desert landscapes, unique wildlife adaptations, and excellent self-drive safari opportunities.",
    listings: 98,
  },
  {
    name: "Zimbabwe",
    description:
      "Home to Victoria Falls, excellent national parks with abundant wildlife, and some of Africa's best safari guides.",
    listings: 76,
  },
  {
    name: "Zambia",
    description:
      "Known for walking safaris, remote wilderness areas, and authentic safari experiences with excellent guiding.",
    listings: 64,
  },
]

// Mock data for Southern Africa listings
const southernAfricaListings = [
  {
    id: 1,
    title: "Okavango Delta Safari",
    category: "Guided Tours",
    location: "Okavango Delta, Botswana",
    rating: 4.9,
    reviews: 142,
    image: "/placeholder.svg?height=300&width=400",
    price: "$450/day",
    premium: true,
    description: "Luxury water-based safari in the heart of the Okavango Delta with expert guides and premium camps.",
    features: ["Water Safari", "Mokoro Canoes", "Luxury Camps", "Flight Transfers"],
  },
  {
    id: 2,
    title: "Kruger Private Reserve",
    category: "Lodges",
    location: "Sabi Sands, South Africa",
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400",
    price: "$350/night",
    premium: true,
    description:
      "Exclusive safari experience in a private reserve bordering Kruger National Park with exceptional game viewing.",
    features: ["Big Five", "Off-road Driving", "Night Drives", "Luxury Accommodation"],
  },
  {
    id: 3,
    title: "Namibia Self-Drive Adventure",
    category: "4x4 Rentals",
    location: "Windhoek, Namibia",
    rating: 4.7,
    reviews: 98,
    image: "/placeholder.svg?height=300&width=400",
    price: "$95/day",
    description:
      "Fully equipped 4x4 vehicles for self-drive exploration of Namibia's stunning landscapes and wildlife.",
    features: ["Roof Tent", "GPS Navigation", "Comprehensive Maps", "24/7 Support"],
  },
  {
    id: 4,
    title: "Victoria Falls Experience",
    category: "Adventure Activities",
    location: "Victoria Falls, Zimbabwe",
    rating: 4.9,
    reviews: 187,
    image: "/placeholder.svg?height=300&width=400",
    price: "$180/person",
    premium: true,
    description:
      "Comprehensive Victoria Falls experience including guided tour, sunset cruise, and adventure activities.",
    features: ["Falls Tour", "Sunset Cruise", "Helicopter Option", "Adventure Activities"],
  },
  {
    id: 5,
    title: "South Luangwa Walking Safari",
    category: "Guided Tours",
    location: "South Luangwa, Zambia",
    rating: 4.8,
    reviews: 76,
    image: "/placeholder.svg?height=300&width=400",
    price: "$320/day",
    premium: true,
    description: "Authentic walking safari experience in Zambia's premier national park with expert guides.",
    features: ["Walking Safaris", "Night Drives", "Bush Camps", "Expert Guides"],
  },
  {
    id: 6,
    title: "Chobe Riverside Camp",
    category: "Campsites",
    location: "Chobe National Park, Botswana",
    rating: 4.6,
    reviews: 87,
    image: "/placeholder.svg?height=300&width=400",
    price: "$75/night",
    description: "Comfortable camping along the Chobe River with excellent elephant viewing and boat safaris.",
    features: ["River Views", "Boat Safaris", "Game Drives", "Comfortable Tents"],
  },
]

export default function SouthernAfricaPage() {
  return (
    <div>
      <DestinationHeader
        title="Southern Africa"
        description="From the waterways of the Okavango Delta to the desert landscapes of Namibia, Southern Africa offers diverse ecosystems, excellent infrastructure, and unforgettable safari experiences."
        image="/placeholder.svg?height=800&width=1600"
        facts={[
          { label: "Countries", value: "South Africa, Botswana, Namibia, Zimbabwe, Zambia" },
          { label: "Best Time to Visit", value: "May to October" },
          { label: "Famous For", value: "Okavango Delta, Kruger, Victoria Falls" },
          { label: "Safari Types", value: "Game Drives, Walking, Self-Drive, Water" },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        <DestinationAttractions attractions={southernAfricaAttractions} />
        <DestinationWildlife
          wildlife={southernAfricaWildlife}
          title="Iconic Wildlife"
          description="Southern Africa is home to diverse wildlife across varied ecosystems, from desert-adapted species to water-loving creatures."
        />
        <DestinationSeasons seasons={southernAfricaSeasons} />
        <DestinationMap countries={southernAfricaCountries} regionName="Southern Africa" />

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Southern Africa Safaris</h2>
          <ListingsGrid listings={southernAfricaListings} category="Southern Africa" />
        </div>
      </div>
    </div>
  )
}
