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
  CloudRain, 
  Binoculars, 
  Camera, 
  Compass, 
  DollarSign 
} from "lucide-react"
import { DestinationHeader } from "@/components/destination-header"
import { DestinationAttractions } from "@/components/destination-attractions"
import { DestinationWildlife } from "@/components/destination-wildlife"
import { DestinationSeasons } from "@/components/destination-seasons"
import { DestinationMap } from "@/components/destination-map"
import { ListingsGrid } from "@/components/listings-grid"

export const metadata: Metadata = {
  title: "East Africa Safari | Kenya, Tanzania, Uganda & Rwanda",
  description: "Discover the iconic savannahs, mountain gorillas, and Great Migration of East Africa. Plan your ultimate safari adventure in Kenya, Tanzania, Uganda & Rwanda.",
  keywords: "East Africa safari, Kenya safari, Tanzania safari, Uganda gorilla trekking, Rwanda gorillas, Great Migration, Serengeti, Masai Mara, Ngorongoro Crater, African wildlife",
}

// East Africa attractions with enhanced content
const eastAfricaAttractions = [
  {
    name: "Masai Mara National Reserve",
    location: "Kenya",
    description:
      "Renowned worldwide for the Great Migration and exceptional big cat sightings, the Masai Mara offers classic safari landscapes and unmatched wildlife encounters. This iconic reserve shares an ecosystem with Tanzania's Serengeti and provides some of Africa's most spectacular game viewing opportunities year-round. The local Maasai communities add a rich cultural dimension to any visit.",
    image: "/images/destinations/attractions/masai-mara.jpg",
    highlights: ["Great Migration", "Big Cat Sightings", "Hot Air Balloon Safaris", "Maasai Cultural Visits"],
    bestTime: "July to October (Migration), January to February (Calving)",
  },
  {
    name: "Serengeti National Park",
    location: "Tanzania",
    description: "Tanzania's crown jewel, the Serengeti spans 14,750 square kilometers of pristine wilderness and hosts the largest terrestrial mammal migration on Earth. The endless plains (which give the park its name in Maasai language) support over 2 million wildebeest, zebra, and gazelle, along with the predators that follow them. Different regions offer unique experiences, from the kopjes of the central Seronera to the remote northern reaches.",
    image: "/images/destinations/attractions/serengeti.jpg",
    highlights: ["Great Migration", "Big Five Encounters", "Balloon Safaris", "Luxury Tented Camps"],
    bestTime: "June to September (Dry Season), January to February (Calving)",
  },
  {
    name: "Ngorongoro Crater",
    location: "Tanzania",
    description:
      "This UNESCO World Heritage site is the world's largest intact volcanic caldera, forming a natural enclosure for approximately 25,000 animals. The 600-meter deep crater spans 260 square kilometers and contains a remarkable concentration of wildlife, including one of Africa's highest densities of lions and endangered black rhinos. The crater's unique ecology creates a microcosm of East African habitats including plains, forest, and lake ecosystems.",
    image: "/images/destinations/attractions/ngorongoro.jpg",
    highlights: ["Big Five in a Single Day", "Panoramic Crater Views", "Ancient Volcanic Ecosystem", "Maasai Cultural Heritage"],
    bestTime: "June to September (Dry Season), December to February (Green Season)",
  },
  {
    name: "Bwindi Impenetrable Forest",
    location: "Uganda",
    description:
      "Home to nearly half of the world's remaining mountain gorillas, this ancient rainforest is one of Africa's most biologically diverse areas. The challenging terrain that gives the forest its name harbors over 120 mammal species, 350 bird species, and 220 butterfly species. Gorilla trekking here offers a profound wildlife encounter that ranks among the most moving experiences in nature travel.",
    image: "/images/destinations/attractions/bwindi.jpg",
    highlights: ["Mountain Gorilla Trekking", "Exceptional Birdwatching", "Batwa Cultural Experiences", "Rainforest Biodiversity"],
    bestTime: "June to August, December to February (Drier Periods)",
  },
  {
    name: "Amboseli National Park",
    location: "Kenya",
    description:
      "Offering the iconic postcard view of elephants against the backdrop of Mount Kilimanjaro, Amboseli delivers one of Africa's most memorable visual experiences. The park's mix of dried lake bed, wetlands, and savannah supports large elephant herds with some of the largest tuskers remaining in Africa. The clear mountain views and excellent wildlife density make it a photographer's paradise.",
    image: "/images/destinations/attractions/amboseli.jpg",
    highlights: ["Elephant Herds", "Mount Kilimanjaro Views", "Wetland Ecosystems", "Exceptional Photography"],
    bestTime: "June to October (Dry Season), January to February (Green Season)",
  },
  {
    name: "Volcanoes National Park",
    location: "Rwanda",
    description:
      "Part of the greater Virunga Conservation Area spanning Rwanda, Uganda, and Congo, this park protects the Rwandan portion of the Virunga Mountains. Beyond its famous mountain gorillas, the park offers treks to see golden monkeys, climbs of the volcanic peaks, and the legacy of Dian Fossey's groundbreaking conservation work. Rwanda's remarkable conservation success story is evident in the careful management and community integration of this precious ecosystem.",
    image: "/images/destinations/attractions/volcanoes.jpg",
    highlights: ["Mountain Gorilla Encounters", "Golden Monkey Tracking", "Volcano Hikes", "Dian Fossey's Karisoke Research Center"],
    bestTime: "June to September, December to February (Drier Months)",
  },
]

// Enhanced wildlife data with more detailed descriptions
const eastAfricaWildlife = [
  {
    name: "African Lion",
    description: "The iconic big cats of East Africa's savannahs, with particularly strong populations in the Serengeti-Mara ecosystem. Some prides have been studied for generations, providing incredible insights into their complex social structures.",
    image: "/images/destinations/wildlife/lion.jpg",
  },
  {
    name: "African Elephant",
    description: "East Africa's elephants roam in family herds led by matriarchs, with exceptional viewing in Amboseli, Tarangire, and parts of the Serengeti. Some of Africa's last remaining 'tuskers' with enormous ivory can still be found in the region.",
    image: "/images/destinations/wildlife/elephant.jpg",
  },
  {
    name: "Mountain Gorilla",
    description: "These gentle giants share 98% of human DNA and are found only in the Virunga Mountains and Uganda's Bwindi Forest. Conservation efforts have brought them back from the brink of extinction, with populations now slowly increasing.",
    image: "/images/destinations/wildlife/gorilla.jpg",
  },
  {
    name: "Wildebeest",
    description: "The architects of the Great Migration, with 1.5 million animals moving in a constant cycle through the Serengeti-Mara ecosystem. Their river crossings represent one of nature's most dramatic spectacles.",
    image: "/images/destinations/wildlife/wildebeest.jpg",
  },
  {
    name: "Cheetah",
    description: "The world's fastest land mammal thrives on the open plains of the Serengeti and Mara, where their incredible high-speed hunts can be observed. Their population faces pressures from habitat loss and competition with other predators.",
    image: "/images/destinations/wildlife/cheetah.jpg",
  },
  {
    name: "Black Rhino",
    description: "Critically endangered, these prehistoric-looking browsers are making a comeback in protected sanctuaries across East Africa. Conservation success stories in Kenya and Tanzania provide hope for this iconic species.",
    image: "/images/destinations/wildlife/rhino.jpg",
  },
]

// Enhanced seasonal information
const eastAfricaSeasons = [
  {
    name: "Dry Season",
    months: "June to October",
    weather: "Warm days (20-30°C), cool nights (10-15°C), minimal rainfall",
    wildlife: "Peak wildlife viewing with animals concentrated around water sources. Great Migration river crossings in July-September.",
    crowds: "High season with premium prices and advance booking essential for popular properties",
    pros: ["Exceptional Wildlife Viewing", "Great Migration River Crossings", "Comfortable Temperatures", "Minimal Mosquitoes"],
    cons: [
      "Premium pricing (30-50% higher than green season)",
      "Popular sightings can become crowded",
      "Dusty conditions, especially late in the season",
      "Limited availability at top properties without advance booking",
    ],
    icon: "sun",
  },
  {
    name: "Short Rains",
    months: "November to December",
    weather: "Warm days (23-28°C), afternoon thundershowers, refreshed landscapes",
    wildlife: "Excellent wildlife viewing, beginning of calving season in southern Serengeti, migratory birds arrive",
    crowds: "Shoulder season with better availability and value pricing",
    pros: ["Lush Green Landscapes", "Dramatic Photography with Storm Clouds", "Newborn Wildlife", "Excellent Bird Watching"],
    cons: [
      "Afternoon thunderstorms may interrupt activities",
      "Some secondary roads become temporarily impassable",
      "Higher humidity levels than dry season",
      "Some mobile camps relocate during this period",
    ],
    icon: "cloud",
  },
  {
    name: "Green Season",
    months: "January to February",
    weather: "Warm days (25-30°C), short dry interval between rain seasons",
    wildlife: "Calving season in southern Serengeti (500,000+ wildebeest born), peak bird watching, predator activity",
    crowds: "Lower visitor numbers with excellent value opportunities",
    pros: ["Calving Season Spectacle", "Superb Bird Watching (400+ migratory species)", "Photographers' Paradise", "Value Pricing (up to 40% lower than peak)"],
    cons: [
      "Taller grasses can sometimes obscure wildlife viewing",
      "Heat and humidity higher than during dry season",
      "Occasional heavy downpours between dry periods",
      "Some remote areas remain inaccessible",
    ],
    icon: "thermometer",
  },
  {
    name: "Long Rains",
    months: "March to May",
    weather: "Moderate to heavy rainfall, high humidity, overcast days",
    wildlife: "Challenging viewing in some areas, but stunning landscapes and unique photography opportunities",
    crowds: "Low season with lowest prices and maximum availability",
    pros: ["Maximum Value (40-60% discounts possible)", "Virtually No Crowds", "Lush Emerald Landscapes", "Unique Wildlife Behaviors"],
    cons: [
      "Regular heavy rainfall can disrupt activities",
      "Many seasonal camps and some lodges close for maintenance",
      "Difficult road conditions in more remote areas",
      "Reduced visibility in areas with tall vegetation",
    ],
    icon: "cloud-rain",
  },
]

// Enhanced country information
const eastAfricaCountries = [
  {
    name: "Kenya",
    description:
      "The birthplace of the modern safari, Kenya offers incredible diversity from the iconic Masai Mara to the arid northern frontier. Combining exceptional wildlife viewing with established tourism infrastructure and authentic cultural experiences, Kenya remains the ideal introduction to African safaris. Its conservation model of community conservancies is revolutionizing wildlife protection across the continent.",
    highlights: ["Masai Mara", "Amboseli", "Laikipia", "Samburu", "Tsavo"],
    listings: 145,
    flag: "/images/destinations/flags/kenya.svg"
  },
  {
    name: "Tanzania",
    description:
      "Home to the Serengeti, Ngorongoro Crater, and Mount Kilimanjaro, Tanzania boasts unmatched natural wonders and wildlife spectacles. The country's vast protected areas harbor enormous wildlife populations, while the Zanzibar archipelago offers perfect beach extensions. Tanzania's safari circuits can be combined for comprehensive experiences or visited individually for focused adventures.",
    highlights: ["Serengeti", "Ngorongoro", "Tarangire", "Selous", "Ruaha"],
    listings: 168,
    flag: "/images/destinations/flags/tanzania.svg"
  },
  {
    name: "Uganda",
    description:
      "Known as the 'Pearl of Africa', Uganda combines primate tracking with traditional safaris and stunning landscapes. Offering both mountain gorillas and chimpanzees alongside savannah game viewing, Uganda delivers remarkably diverse experiences within a compact geography. The country's rich biodiversity includes over 1,000 bird species, making it a birder's paradise.",
    highlights: ["Bwindi Impenetrable Forest", "Queen Elizabeth NP", "Kibale Forest", "Murchison Falls"],
    listings: 87,
    flag: "/images/destinations/flags/uganda.svg"
  },
  {
    name: "Rwanda",
    description:
      "The 'Land of a Thousand Hills' has transformed into a premium wildlife destination focused on sustainable luxury experiences. Beyond its exceptional gorilla trekking, Rwanda offers chimpanzee tracking, savannah safaris in Akagera National Park, and vibrant cultural experiences. The country's remarkable recovery and forward-thinking conservation policies make it an inspiring destination.",
    highlights: ["Volcanoes National Park", "Nyungwe Forest", "Akagera", "Lake Kivu"],
    listings: 54,
    flag: "/images/destinations/flags/rwanda.svg"
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
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="relative rounded-xl overflow-hidden">
          <div className="aspect-video relative">
            <Image 
              src="/images/destinations/east-africa.jpg" 
              alt="East Africa Safari Landscape with elephants and Mount Kilimanjaro" 
              fill 
              className="object-cover" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  East Africa Safari Destinations
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  Experience the iconic savannahs, mountain gorillas, and the Great Migration in Kenya, Tanzania, Uganda, and Rwanda.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-3 py-1 text-sm">
                    Great Migration
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-3 py-1 text-sm">
                    Mountain Gorillas
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-3 py-1 text-sm">
                    Big Five Safaris
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-3 py-1 text-sm">
                    Cultural Experiences
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
          <h2 className="text-3xl font-bold mb-6 text-center">Discover East Africa</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              East Africa represents the quintessential safari destination—a land of sweeping savannah plains, snow-capped mountains, dense rainforests, and incredible wildlife spectacles. This diverse region encompasses Kenya, Tanzania, Uganda, and Rwanda, each offering distinctive experiences while sharing the remarkable landscapes and wildlife that make East Africa legendary among safari enthusiasts.
            </p>
            <p>
              The region's crown jewel is undoubtedly the Great Migration—the annual movement of over 1.5 million wildebeest and hundreds of thousands of zebra and gazelle between Tanzania's Serengeti and Kenya's Masai Mara in a constant search for fresh grazing. This natural spectacle, with its dramatic river crossings and attendant predator action, ranks among the world's most awe-inspiring wildlife events.
            </p>
            <p>
              Beyond the migration, East Africa offers extraordinary diversity: track endangered mountain gorillas in the misty forests of Uganda and Rwanda, witness the snow-capped peak of Kilimanjaro rising above Amboseli's elephant herds, explore the wildlife-packed caldera of Ngorongoro Crater, or experience authentic cultural encounters with the Maasai, Samburu, and other traditional communities who maintain ancient ways of life in a modern world.
            </p>
          </div>
        </div>
      </section>

      {/* Key Attractions Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Iconic Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eastAfricaAttractions.map((attraction) => (
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
          {eastAfricaWildlife.map((animal) => (
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
        <h2 className="text-3xl font-bold mb-8 text-center">East African Countries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eastAfricaCountries.map((country) => (
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
                  <Link href={`/destinations/east-africa/${country.name.toLowerCase()}`}>
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
        <h2 className="text-3xl font-bold mb-8 text-center">When to Visit East Africa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eastAfricaSeasons.map((season) => (
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
      
      {/* Travel Tips */}
      <section className="mb-16 bg-muted p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">East Africa Travel Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Binoculars className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-lg font-bold">Safari Essentials</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Pack neutral-colored clothing (beige, khaki, olive)</li>
                <li>• Bring lightweight, breathable fabrics</li>
                <li>• Include a warm layer for cool mornings</li>
                <li>• Quality binoculars enhance wildlife viewing</li>
                <li>• Dust-proof camera bag for equipment protection</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Camera className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-lg font-bold">Photography Tips</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Bring a versatile zoom lens (70-300mm minimum)</li>
                <li>• Golden hours provide the best lighting</li>
                <li>• Pack extra batteries and memory cards</li>
                <li>• Consider a beanbag for vehicle stability</li>
                <li>• Ask permission before photographing local people</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Compass className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-lg font-bold">Trip Planning</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Book peak season safaris 6-12 months in advance</li>
                <li>• Gorilla permits sell out months ahead</li>
                <li>• Consider combining countries for diverse experiences</li>
                <li>• Allow at least 7-10 days for a meaningful safari</li>
                <li>• Build in rest days between long safari drives</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-lg font-bold">Budget Considerations</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Most lodges are all-inclusive with activities</li>
                <li>• Green season offers significant discounts (30-40%)</li>
                <li>• Budget $150-800 per person/day for accommodations</li>
                <li>• Factor in park fees ($50-150 per day)</li>
                <li>• Gorilla permits cost $700-1,500 per trek</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="bg-primary text-white p-8 md:p-12 rounded-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Explore East Africa?</h2>
            <p className="mb-6">
              Discover our curated selection of tours, accommodations, and safari experiences across Kenya, Tanzania, Uganda, and Rwanda. Whether you're drawn to the Great Migration, mountain gorillas, or simply the classic safari experience, we have options to match your dream adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Browse East Africa Safaris
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
