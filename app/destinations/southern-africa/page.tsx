import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Calendar, 
  Sun, 
  Cloud, 
  Thermometer, 
  CloudRain
} from "lucide-react"
import { DestinationHeader } from "@/components/destination-header"
import { DestinationAttractions } from "@/components/destination-attractions"
import { DestinationWildlife } from "@/components/destination-wildlife"
import { DestinationSeasons } from "@/components/destination-seasons"
import { DestinationMap } from "@/components/destination-map"
import { ListingsGrid } from "@/components/listings-grid"

export const metadata: Metadata = {
  title: "Southern Africa Safaris | Ultimate Safari Guide | Safari Overland",
  description: "Explore the diverse wilderness of Southern Africa with our comprehensive safari guide. From Botswana's Okavango Delta to Kruger National Park and Victoria Falls.",
  keywords: "Southern Africa safari, Botswana safari, South Africa safari, Zimbabwe safari, Kruger National Park, Okavango Delta, Victoria Falls, safari destinations"
};

// Southern Africa attractions with enhanced content
const southernAfricaAttractions = [
  {
    name: "Okavango Delta",
    location: "Botswana",
    description:
      "The world's largest inland delta creates an oasis in the Kalahari Desert, attracting enormous concentrations of wildlife. This UNESCO World Heritage site offers a unique ecosystem where seasonal floods transform the landscape, creating islands, channels, and floodplains that support incredible biodiversity.",
    image: "/images/destinations/attractions/okavango.jpg",
    highlights: ["Mokoro Excursions", "Island Camping", "Exceptional Wildlife", "Bird Paradise"],
    bestTime: "June to September (peak flood season)",
  },
  {
    name: "Kruger National Park",
    location: "South Africa",
    description: "One of Africa's oldest and largest protected areas, spanning nearly 20,000 square kilometers of diverse habitats. Home to the Big Five and over 500 bird species, Kruger offers exceptional safari experiences with excellent infrastructure ranging from self-drive options to exclusive luxury lodges.",
    image: "/images/destinations/attractions/kruger.jpg",
    highlights: ["Big Five Viewing", "Self-Drive Options", "Diverse Ecosystems", "Excellent Infrastructure"],
    bestTime: "May to September (dry season)",
  },
  {
    name: "Victoria Falls",
    location: "Zimbabwe/Zambia",
    description:
      "Known locally as 'The Smoke That Thunders,' this UNESCO World Heritage site creates the world's largest curtain of falling water. Beyond the spectacular falls, the surrounding area offers wildlife viewing, adventure activities, and river cruises on the mighty Zambezi.",
    image: "/images/destinations/attractions/victoria-falls.jpg",
    highlights: ["Spectacular Waterfall", "Adventure Activities", "Zambezi Cruises", "Border Safari Loop"],
    bestTime: "February to May (highest water volume), June to August (moderate flow)",
  },
  {
    name: "Chobe National Park",
    location: "Botswana",
    description:
      "Famous for having one of Africa's highest concentrations of elephants, with herds sometimes exceeding 100 individuals. The Chobe River creates a wildlife magnet during the dry season, offering spectacular boat safaris with unique perspectives on wildlife interactions.",
    image: "/images/destinations/attractions/chobe.jpg",
    highlights: ["Elephant Herds", "River Safaris", "Predator Action", "Photography Paradise"],
    bestTime: "May to October (dry season)",
  },
  {
    name: "Sossusvlei",
    location: "Namibia",
    description:
      "A salt and clay pan surrounded by towering red dunes in the heart of the Namib Desert. This otherworldly landscape features some of the world's highest sand dunes, creating a photographer's paradise of geometric shapes, shadows, and contrasting colors against blue skies.",
    image: "/images/destinations/attractions/sossusvlei.jpg",
    highlights: ["Towering Red Dunes", "Dead Vlei", "Namib Desert Ecology", "Spectacular Photography"],
    bestTime: "April to October (cooler months, clearer skies)",
  },
  {
    name: "South Luangwa National Park",
    location: "Zambia",
    description:
      "The birthplace of walking safaris, offering one of Africa's most authentic wilderness experiences. The Luangwa River sustains exceptional wildlife concentrations, with particularly strong leopard populations and endemic subspecies like Thornicroft's giraffe and Crawshay's zebra.",
    image: "/images/destinations/attractions/south-luangwa.jpg",
    highlights: ["Walking Safaris", "Leopard Sightings", "Night Drives", "Authentic Bush Camps"],
    bestTime: "June to October (dry season)",
  },
]

// Enhanced wildlife data with more detailed descriptions
const southernAfricaWildlife = [
  {
    name: "African Elephant",
    description: "Southern Africa is home to the continent's largest populations, particularly in Botswana, Zimbabwe, and northern Namibia.",
    image: "/images/destinations/wildlife/elephant.jpg",
  },
  {
    name: "Lion",
    description: "Strong populations exist throughout the region, with notable concentrations in Botswana's Okavango and South Africa's Kruger ecosystem.",
    image: "/images/destinations/wildlife/lion.jpg",
  },
  {
    name: "Leopard",
    description: "These elusive cats are relatively abundant in the region, with South Luangwa and Sabi Sands offering exceptional viewing opportunities.",
    image: "/images/destinations/wildlife/leopard.jpg",
  },
  {
    name: "White Rhino",
    description: "South Africa protects the vast majority of remaining white rhinos, with good populations in protected reserves and private conservancies.",
    image: "/images/destinations/wildlife/white-rhino.jpg",
  },
  {
    name: "Cape Buffalo",
    description: "Massive herds can be found throughout Southern Africa's savannah regions, making dramatic sightings common.",
    image: "/images/destinations/wildlife/buffalo.jpg",
  },
  {
    name: "Giraffe",
    description: "Several subspecies occur across the region, thriving in woodland savannahs with particularly good viewing in Botswana and South Africa.",
    image: "/images/destinations/wildlife/giraffe.jpg",
  },
]

// Enhanced seasonal information
const southernAfricaSeasons = [
  {
    name: "Dry Season",
    months: "May to October",
    weather: "Mild days (18-28°C), cold nights (0-10°C), minimal rainfall",
    wildlife: "Excellent viewing as animals concentrate around water sources. Sparse vegetation improves visibility.",
    crowds: "High season with premium pricing and advance booking required",
    pros: ["Peak Wildlife Viewing", "Malaria Risk Lower", "Comfortable Daytime Temperatures", "Clear Skies"],
    cons: [
      "Cold nights (especially June/July)",
      "Dusty conditions",
      "Higher prices (30-50% premium)",
      "Popular areas can become crowded",
    ],
    icon: "sun",
  },
  {
    name: "Green Season",
    months: "November to April",
    weather: "Hot days (25-35°C), warm nights (15-20°C), afternoon thunderstorms",
    wildlife: "Lush landscapes, birthing season, migratory birds present. More dispersed wildlife.",
    crowds: "Lower visitor numbers with value pricing available",
    pros: ["Dramatic Landscapes", "Birthing Season", "Incredible Bird Watching", "Value Pricing"],
    cons: [
      "Higher temperatures and humidity",
      "Afternoon thunderstorms may interrupt activities",
      "Higher malaria risk in some areas",
      "Some areas become inaccessible",
    ],
    icon: "cloud",
  },
  {
    name: "Shoulder Season",
    months: "November and April",
    weather: "Variable conditions transitioning between seasons",
    wildlife: "Good wildlife viewing with fewer visitors and interesting transitional landscapes",
    crowds: "Moderate visitor numbers with good availability",
    pros: ["Good Value", "Fewer Visitors", "Interesting Photography", "Pleasant Temperatures"],
    cons: [
      "Unpredictable weather patterns",
      "Some roads may be affected by early/late rains",
      "Wildlife more dispersed than peak dry season",
      "Variable game viewing conditions",
    ],
    icon: "thermometer",
  },
  {
    name: "Migration Season",
    months: "November to December, March to April",
    weather: "Variable, typically warm with some rainfall",
    wildlife: "Zebra migrations in Botswana, excellent predator action, birthing season for many species",
    crowds: "Moderate visitor numbers in migration areas",
    pros: ["Unique Wildlife Spectacles", "Dramatic Predator Action", "Good Photography", "Lush Landscapes"],
    cons: [
      "Limited to specific regions (mainly Botswana)",
      "Weather can be unpredictable",
      "Some areas may be inaccessible",
      "More challenging viewing conditions",
    ],
    icon: "cloud-rain",
  },
]

// Enhanced country information
const southernAfricaCountries = [
  {
    name: "South Africa",
    description:
      "Home to the iconic Kruger National Park and diverse landscapes from coastal regions to bushveld, South Africa offers exceptional wildlife viewing and infrastructure. The perfect introduction to African safaris with excellent roads, accommodation options for all budgets, and malaria-free reserves ideal for families.",
    highlights: ["Kruger National Park", "Sabi Sands", "Madikwe", "Eastern Cape Reserves"],
    listings: 187,
    flag: "/images/destinations/flags/south-africa.svg"
  },
  {
    name: "Botswana",
    description:
      "Known for its pristine wilderness and conservation-focused tourism, Botswana's Okavango Delta and Chobe National Park offer some of Africa's most exclusive safari experiences. The country's low-impact, high-value tourism model protects vast wilderness areas while providing extraordinary wildlife encounters.",
    highlights: ["Okavango Delta", "Chobe", "Moremi", "Kalahari"],
    listings: 112,
    flag: "/images/destinations/flags/botswana.svg"
  },
  {
    name: "Namibia",
    description:
      "Characterized by dramatic desert landscapes, Namibia offers unique wildlife adapted to arid conditions, ancient cultures, and striking scenery from Sossusvlei to Etosha. The country pioneered community-based conservation, creating a model where local communities directly benefit from and participate in wildlife protection.",
    highlights: ["Etosha", "Sossusvlei", "Damaraland", "Skeleton Coast"],
    listings: 98,
    flag: "/images/destinations/flags/namibia.svg"
  },
  {
    name: "Zimbabwe",
    description:
      "From the thundering Victoria Falls to the wildlife-rich Hwange National Park, Zimbabwe combines natural wonders with authentic safari experiences and warm hospitality. The country's exceptional guides are renowned as some of Africa's best, providing in-depth interpretation of the bush.",
    highlights: ["Hwange", "Mana Pools", "Victoria Falls", "Matobo Hills"],
    listings: 76,
    flag: "/images/destinations/flags/zimbabwe.svg"
  },
]

// Mock data for Southern Africa listings
const southernAfricaListings = [
  {
    id: 1,
    title: "Okavango Delta Safari",
    category: "Guided Tours",
    location: "Botswana",
    rating: 4.9,
    reviews: 86,
    image: "/placeholder.svg?height=300&width=400",
    price: "$450/day",
    premium: true,
    description:
      "Exclusive safari experience in the heart of the Okavango Delta with mokoro excursions and island camping.",
    features: ["Mokoro Excursions", "Wildlife Viewing", "Bush Camping", "Expert Guides"],
  },
  {
    id: 2,
    title: "Kruger National Park Lodge",
    category: "Lodges",
    location: "South Africa",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=400",
    price: "$350/night",
    premium: true,
    description: "Luxury lodge in the greater Kruger ecosystem with exceptional Big Five viewing opportunities.",
    features: ["Big Five", "Luxury Accommodation", "Game Drives", "Bush Walks"],
  },
  {
    id: 3,
    title: "Namibian Desert Safari",
    category: "Guided Tours",
    location: "Namibia",
    rating: 4.7,
    reviews: 58,
    image: "/placeholder.svg?height=300&width=400",
    price: "$280/day",
    premium: false,
    description: "Explore Namibia's dramatic landscapes and desert-adapted wildlife on this comprehensive tour.",
    features: ["Desert Wildlife", "Sossusvlei", "Etosha", "Damaraland"],
  },
  {
    id: 4,
    title: "Victoria Falls Experience",
    category: "Adventure Activities",
    location: "Zimbabwe",
    rating: 4.8,
    reviews: 92,
    image: "/placeholder.svg?height=300&width=400",
    price: "$200/day",
    premium: false,
    description:
      "Comprehensive Victoria Falls package with wildlife viewing, adventure activities, and cultural experiences.",
    features: ["Waterfall Tours", "Zambezi Cruise", "Helicopter Flight", "Game Drives"],
  },
  {
    id: 5,
    title: "South Africa Self-Drive",
    category: "4x4 Rentals",
    location: "South Africa",
    rating: 4.6,
    reviews: 64,
    image: "/placeholder.svg?height=300&width=400",
    price: "$85/day",
    premium: false,
    description: "Fully-equipped 4x4 vehicles for self-drive safari adventures across South Africa.",
    features: ["4x4 Vehicle", "Camping Equipment", "GPS Navigation", "24/7 Support"],
  },
  {
    id: 6,
    title: "Luxury Botswana Safari",
    category: "Guided Tours",
    location: "Botswana",
    rating: 4.9,
    reviews: 46,
    image: "/placeholder.svg?height=300&width=400",
    price: "$750/day",
    premium: true,
    description: "Ultimate luxury safari combining the Okavango Delta, Chobe, and private concessions.",
    features: ["Luxury Accommodation", "Private Concessions", "Charter Flights", "All-Inclusive"],
  },
]

export default function SouthernAfricaPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="relative rounded-xl overflow-hidden">
          <div className="aspect-video relative">
            <Image 
              src="/images/destinations/southern-africa.jpg" 
              alt="Southern Africa Safari Landscape" 
              fill 
              className="object-cover" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Southern Africa Safari Destinations
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  Explore iconic wildlife experiences from the Okavango Delta to Kruger National Park and the breathtaking Victoria Falls
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-3 py-1 text-sm">
                    Okavango Delta
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-3 py-1 text-sm">
                    Victoria Falls
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-3 py-1 text-sm">
                    Big Five Safari
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-3 py-1 text-sm">
                    Desert Landscapes
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">The Heart of African Safari Experiences</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Southern Africa represents the quintessential African safari destination, where pristine wilderness areas, 
              abundant wildlife, and diverse ecosystems combine to create unparalleled safari experiences. From the 
              water-rich Okavango Delta to the dramatic dunes of Namibia and the iconic Kruger National Park, this 
              region offers an incredible variety of landscapes and wildlife encounters.
            </p>
            <p>
              With well-developed tourism infrastructure in countries like South Africa, exclusive private concessions 
              in Botswana, and emerging destinations like Zambia and Zimbabwe, Southern Africa caters to all types of 
              safari travelers—from first-timers to seasoned safari enthusiasts seeking authentic wilderness experiences.
            </p>
            <p>
              The region is renowned for its exceptional Big Five viewing opportunities, unique experiences like mokoro excursions in the Okavango Delta, and the breathtaking Victoria Falls – one of the Seven Natural Wonders of the World. Whether you're seeking luxury lodges, self-drive adventures, or authentic camping safaris, Southern Africa offers unmatched diversity and quality of safari experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Key Attractions Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Iconic Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {southernAfricaAttractions.map((attraction) => (
            <Card key={attraction.name} className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
              <div className="relative h-60">
                <Image src={attraction.image} alt={attraction.name} fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 text-black text-xs font-medium py-1 px-2 rounded">
                  {attraction.location}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{attraction.description}</p>
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span><span className="font-medium">Best time:</span> {attraction.bestTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {attraction.highlights.map((highlight) => (
                    <Badge key={highlight} variant="outline">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Wildlife Showcase */}
      <section className="mb-16 bg-muted p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Iconic Wildlife</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {southernAfricaWildlife.map((animal) => (
            <div key={animal.name} className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src={animal.image} alt={animal.name} fill className="object-cover" />
              </div>
              <h3 className="font-bold mb-1">{animal.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-3">{animal.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Countries Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Southern African Countries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {southernAfricaCountries.map((country) => (
            <Card key={country.name} className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
              <div className="p-6 flex gap-4">
                <div className="relative w-16 h-12 flex-shrink-0 border rounded">
                  <Image 
                    src={country.flag} 
                    alt={`${country.name} flag`} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{country.name}</h3>
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div className="flex flex-wrap gap-x-2">
                      {country.highlights.map((highlight, index) => (
                        <span key={highlight}>
                          {highlight}{index < country.highlights.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{country.description}</p>
                  <Link href={`/destinations/southern-africa/${country.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button variant="outline" size="sm">
                      Explore {country.name} ({country.listings} listings)
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Seasons Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">When to Visit Southern Africa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {southernAfricaSeasons.map((season) => (
            <Card key={season.name} className="h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {season.icon === 'sun' && <Sun className="h-8 w-8 text-yellow-500 mr-3" />}
                  {season.icon === 'cloud' && <Cloud className="h-8 w-8 text-blue-400 mr-3" />}
                  {season.icon === 'thermometer' && <Thermometer className="h-8 w-8 text-red-500 mr-3" />}
                  {season.icon === 'cloud-rain' && <CloudRain className="h-8 w-8 text-blue-600 mr-3" />}
                  <h3 className="text-xl font-bold">{season.name}</h3>
                </div>
                <div className="mb-4">
                  <p className="text-primary font-medium mb-1">{season.months}</p>
                  <p className="text-sm text-muted-foreground">{season.weather}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium mb-1">Wildlife Viewing</p>
                  <p className="text-sm text-muted-foreground">{season.wildlife}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium mb-1">Tourism</p>
                  <p className="text-sm text-muted-foreground">{season.crowds}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="font-medium mb-2">Pros</p>
                    <ul className="text-xs space-y-2">
                      {season.pros.map((pro) => (
                        <li key={pro} className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Cons</p>
                    <ul className="text-xs space-y-2">
                      {season.cons.map((con) => (
                        <li key={con} className="flex items-start">
                          <span className="text-red-500 mr-1">✗</span> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="bg-primary text-white p-8 md:p-12 rounded-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Plan Your Southern Africa Safari Adventure</h2>
            <p className="mb-6">
              Discover our curated selection of tours, accommodations, and safari experiences across Southern Africa. From luxury lodges to self-drive adventures, we have options to match your dream safari.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Browse Southern Africa Safaris
              </Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" size="lg">
                Contact a Safari Specialist
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 