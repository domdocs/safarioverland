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
  Compass,
} from "lucide-react"
import { DestinationHeader } from "@/components/destination-header"
import { DestinationAttractions } from "@/components/destination-attractions"
import { DestinationWildlife } from "@/components/destination-wildlife"
import { DestinationSeasons } from "@/components/destination-seasons"
import { DestinationMap } from "@/components/destination-map"
import { ListingsGrid } from "@/components/listings-grid"
import { EditorialImage } from "@/components/editorial/editorial-image"
import { BlendOverlay } from "@/components/editorial/blend-overlay"
import { RelatedFieldNotes } from "@/components/RelatedFieldNotes"
import { RelatedListings } from "@/components/RelatedListings"
import { FAQ } from "@/components/FAQ"
import { getBlurDataURL } from "@/lib/images/blur"

export const metadata: Metadata = {
  title: "East Africa Safari Guide 2026 — Kenya, Tanzania, Uganda, Rwanda",
  description:
    "Plan an East Africa safari for 2026 — Maasai Mara, Serengeti, Bwindi gorillas, the Great Migration. Month-by-month conditions, costs, and the lodges we'd send our friends to.",
  alternates: { canonical: "https://safarioverland.com/destinations/east-africa" },
  keywords:
    "East Africa safari, Kenya safari, Tanzania safari, Uganda gorilla trekking, Rwanda gorillas, Great Migration, Serengeti, Maasai Mara, Ngorongoro Crater, African wildlife",
}

const EAST_AFRICA_FAQ = [
  {
    question: "Is East Africa or Southern Africa better for a first safari?",
    answer:
      "East Africa for the iconic image and the Migration. Southern Africa for variety, value, and fewer crowds.",
  },
  {
    question: "What's the cheapest month to go to East Africa?",
    answer:
      "April and November — the long and short rains. Camps that stay open often discount 25–40%. Game viewing is dramatic in green and predators are out. The trade-off: some roads close and some bush camps shut entirely.",
  },
  {
    question: "Can you do East Africa as a self-drive safari?",
    answer:
      "Kenya — yes, plausibly (Maasai Mara, Amboseli, Tsavo). Tanzania — possible but not recommended; the Serengeti is huge and rough. Uganda and Rwanda — no for gorilla trekking (permits are guide-led).",
  },
  {
    question: "How many days do you need for East Africa?",
    answer:
      "Seven to ten nights for a focused single-country trip. Twelve to fourteen for a meaningful two-country combination (e.g. Kenya + Rwanda for gorillas; or Tanzania northern circuit + Zanzibar).",
  },
]

// East Africa attractions with enhanced content
const eastAfricaAttractions = [
  {
    name: "Masai Mara National Reserve",
    location: "Kenya",
    description:
      "Renowned worldwide for the Great Migration and exceptional big cat sightings, the Masai Mara offers classic safari landscapes and unmatched wildlife encounters. This iconic reserve shares an ecosystem with Tanzania's Serengeti and provides some of Africa's most spectacular game viewing opportunities year-round. The local Maasai communities add a rich cultural dimension to any visit.",
    image: null as string | null,
    highlights: ["Great Migration", "Big Cat Sightings", "Hot Air Balloon Safaris", "Maasai Cultural Visits"],
    bestTime: "July to October (Migration), January to February (Calving)",
  },
  {
    name: "Serengeti National Park",
    location: "Tanzania",
    description: "Tanzania's crown jewel, the Serengeti spans 14,750 square kilometers of pristine wilderness and hosts the largest terrestrial mammal migration on Earth. The endless plains (which give the park its name in Maasai language) support over 2 million wildebeest, zebra, and gazelle, along with the predators that follow them. Different regions offer unique experiences, from the kopjes of the central Seronera to the remote northern reaches.",
    image: null,
    highlights: ["Great Migration", "Big Five Encounters", "Balloon Safaris", "Luxury Tented Camps"],
    bestTime: "June to September (Dry Season), January to February (Calving)",
  },
  {
    name: "Ngorongoro Crater",
    location: "Tanzania",
    description:
      "This UNESCO World Heritage site is the world's largest intact volcanic caldera, forming a natural enclosure for approximately 25,000 animals. The 600-meter deep crater spans 260 square kilometers and contains a remarkable concentration of wildlife, including one of Africa's highest densities of lions and endangered black rhinos. The crater's unique ecology creates a microcosm of East African habitats including plains, forest, and lake ecosystems.",
    image: null,
    highlights: ["Big Five in a Single Day", "Panoramic Crater Views", "Ancient Volcanic Ecosystem", "Maasai Cultural Heritage"],
    bestTime: "June to September (Dry Season), December to February (Green Season)",
  },
  {
    name: "Bwindi Impenetrable Forest",
    location: "Uganda",
    description:
      "Home to nearly half of the world's remaining mountain gorillas, this ancient rainforest is one of Africa's most biologically diverse areas. The challenging terrain that gives the forest its name harbors over 120 mammal species, 350 bird species, and 220 butterfly species. Gorilla trekking here offers a profound wildlife encounter that ranks among the most moving experiences in nature travel.",
    image: null,
    highlights: ["Mountain Gorilla Trekking", "Exceptional Birdwatching", "Batwa Cultural Experiences", "Rainforest Biodiversity"],
    bestTime: "June to August, December to February (Drier Periods)",
  },
  {
    name: "Amboseli National Park",
    location: "Kenya",
    description:
      "Offering the iconic postcard view of elephants against the backdrop of Mount Kilimanjaro, Amboseli delivers one of Africa's most memorable visual experiences. The park's mix of dried lake bed, wetlands, and savannah supports large elephant herds with some of the largest tuskers remaining in Africa. The clear mountain views and excellent wildlife density make it a photographer's paradise.",
    image: null,
    highlights: ["Elephant Herds", "Mount Kilimanjaro Views", "Wetland Ecosystems", "Exceptional Photography"],
    bestTime: "June to October (Dry Season), January to February (Green Season)",
  },
  {
    name: "Volcanoes National Park",
    location: "Rwanda",
    description:
      "Part of the greater Virunga Conservation Area spanning Rwanda, Uganda, and Congo, this park protects the Rwandan portion of the Virunga Mountains. Beyond its famous mountain gorillas, the park offers treks to see golden monkeys, climbs of the volcanic peaks, and the legacy of Dian Fossey's groundbreaking conservation work. Rwanda's remarkable conservation success story is evident in the careful management and community integration of this precious ecosystem.",
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
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
    image: null,
    price: "$850/person",
    premium: true,
    description: "Comprehensive primate safari including gorilla and golden monkey trekking in Rwanda.",
    features: ["Gorilla Trekking", "Golden Monkeys", "Luxury Lodges", "Cultural Experiences"],
  },
]

export default async function EastAfricaPage() {
  const heroBlur = await getBlurDataURL("/images/destinations/east-africa.jpg")
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
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={heroBlur}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  East Africa safari — Kenya, Tanzania, Uganda &amp; Rwanda
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  The safari of the brochure — vast open plains, the Great Migration, mountain gorillas in Bwindi mist. Opinionated, current, written from the bush.
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
              An East Africa safari is the safari of the brochure — vast open plains, the Great Migration, lions on a kopje, mountain gorillas in Bwindi mist. It is also the safari of distance: longer transfers, larger vehicles, and a more crowded peak season than the Southern Africa equivalent.
            </p>
            <p>
              This guide is the editorial position on East Africa: where to go, when to go, what it costs in 2026, the conservancy and community model worth paying extra for, and the kinds of lodges we&apos;d send our closest friends to. It is opinionated and current. Pricing reflects published 2026 rates at time of writing; lodges and parks adjust between seasons — we update this page on a rolling basis.
            </p>
          </div>
        </div>
      </section>

      {/* The four East African safari countries, briefly */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">The four East African safari countries, briefly</h2>
          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-bold mt-6">Kenya — the classic safari and the conservancy revolution</h3>
            <p>
              Kenya is where the modern safari was invented and where it is currently being re-invented. The Maasai Mara is the headline — the river crossings between July and October are genuinely as spectacular as they sound — but the conservancies on the Mara&apos;s borders (Olare Motorogi, Mara North, Naboisho, Ol Kinyei) are where the editorial picks live, because they cap vehicle numbers, allow night drives and walking, and put lease income directly into Maasai hands. Laikipia (Lewa, Borana, Ol Pejeta, Loisaba) is Kenya&apos;s quiet luxury heartland — black-rhino conservation, fewer crowds, exceptional guiding, and the chance to see African wild dog at scale. Amboseli for the Kilimanjaro backdrop. Samburu for the special-five (Grevy&apos;s zebra, reticulated giraffe, gerenuk, beisa oryx, Somali ostrich).
            </p>

            <h3 className="text-xl font-bold mt-6">Tanzania — the herd country</h3>
            <p>
              Tanzania is sheer scale. The Serengeti ecosystem is roughly the size of Northern Ireland and holds the bulk of the Migration herds for most of the year. Northern Serengeti and Mara River crossings (July–October) are the headline; southern Serengeti and Ndutu calving (January–March) is the editor&apos;s pick. Ngorongoro is a one-day destination — astonishing but crowded. Tarangire (June–October) is the elephant park and seriously underrated. Selous/Nyerere and Ruaha are the Tanzania of fewer vehicles, walking safaris, and boating — the editorial sweet spot for second-time visitors.
            </p>

            <h3 className="text-xl font-bold mt-6">Uganda — the gorilla country</h3>
            <p>
              Bwindi Impenetrable Forest and Mgahinga have around 459 mountain gorillas, roughly half the world population. Gorilla permits in Uganda are materially cheaper than Rwanda&apos;s; book 6–9 months ahead in peak. Pair gorillas with Kibale (chimps), Queen Elizabeth (tree-climbing lions in Ishasha), and Murchison Falls (the most dramatic stretch of the Nile in Africa).
            </p>

            <h3 className="text-xl font-bold mt-6">Rwanda — the boutique gorilla country</h3>
            <p>
              Rwanda&apos;s Volcanoes National Park is the higher-cost, higher-comfort gorilla option — shorter transfer from Kigali (2.5 hours vs 9–10 for Bwindi), and the lodges (Singita Kwitonda, One&amp;Only Gorilla&apos;s Nest, Bisate) are at the top of the gorilla-country comfort ranking. Akagera in the east is Rwanda&apos;s Big Five savanna park and an important community-conservation case study (African Parks management since 2010).
            </p>
          </div>
        </div>
      </section>

      {/* How much does an East Africa safari cost in 2026 */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">How much does an East Africa safari cost in 2026</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Honest 2026 numbers. Per person per night, full-board, including game drives but excluding international flights, regional flights, conservancy fees, and gratuities:
            </p>
            <ul>
              <li>Mid-range mobile camps and lodges: <strong>$450–$750</strong> per person per night</li>
              <li>Premium small camps in conservancies: <strong>$900–$1,600</strong> per person per night</li>
              <li>Luxury (Singita, Sanctuary, Asilia, &amp;Beyond&apos;s top tier): <strong>$1,500–$3,200</strong> per person per night</li>
              <li>Ultra-luxury fly-in private safaris: <strong>$3,500–$6,500</strong> per person per night</li>
            </ul>
            <p>
              Add: international flights $1,200–$2,500; East Africa regional flights $250–$600 per sector; conservancy and park fees that vary by region; gorilla permits (Uganda lower than Rwanda); gratuities typically 10–15%.
            </p>
            <p>
              A 10-night East Africa safari for two, mid-range, typically lands around <strong>$14,000–$22,000</strong> all-in; premium <strong>$24,000–$36,000</strong>; luxury <strong>$40,000–$65,000+</strong>.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Specific permit and park-fee prices change between seasons and are intentionally not listed here. Ask us in a brief and we&apos;ll quote current rates with the lodge.
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
                {attraction.image ? (
                  <Image src={attraction.image} alt={attraction.name} fill className="object-cover" />
                ) : (
                  <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                    <Compass className="h-16 w-16 text-primary/60" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                )}
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
            <EditorialImage src={animal.image} alt={animal.name} className="object-cover"/>
            <BlendOverlay />
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
        <h2 className="text-3xl font-bold mb-4 text-center">When to go to East Africa (month by month)</h2>
        <div className="max-w-4xl mx-auto mb-10">
          <div className="prose prose-lg max-w-none">
            <p>
              East Africa runs on two rainy seasons (the &quot;long&quot; rains in April–May and the &quot;short&quot; rains in November) and two dry seasons. The dry season from June to October is the famous safari window — the Mara/Serengeti migration drama, the best big-cat sightings, and dust-on-the-Land-Cruiser conditions. The green season (November–March) is dramatically better value, photographically spectacular, and underrated for predator action when the wildebeest are calving in the Ndutu region of southern Serengeti (January–March).
            </p>
          </div>
        </div>
        {/*
         * A detailed month-by-month table (12 rows: Month, Conditions,
         * Migration position, Game viewing, Cost band, Best for) is
         * the most-quoted block in AI Overviews for "best time" queries
         * — but the content needs Niels' editorial supply rather than
         * being invented here. Flagged in the Brief 3 PR. The four
         * season-cards below remain the current treatment.
         */}
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
        <h2 className="text-3xl font-bold mb-6 text-center">East Africa safari travel tips</h2>
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4 text-base">
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Mobile tented camps are the East African specialism — book one for at least 2 nights of every 10.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Off-road game viewing is generally not permitted inside the national parks, but is allowed in the conservancies. The conservancy levy is worth paying for that reason alone.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Light aircraft luggage limits are strict (15kg / 33lbs, soft-sided).</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Yellow fever certificate required for entry to many East African countries; check 30 days before.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Visa policies vary by country; check eVisa availability and costs at time of booking — these change.</span>
            </li>
          </ul>
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

      {/* FAQ block */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <FAQ items={EAST_AFRICA_FAQ} heading="Frequently asked — East Africa" />
        </div>
      </section>

      {/* Contextual internal links — keeps the East Africa page tied
          to the planning notes a curious reader is likely to want next,
          plus a few approved listings in the region. */}
      <RelatedFieldNotes topic="east-africa" heading="More on East Africa" />
      <RelatedListings region="East Africa" heading="Where we'd send you in East Africa" />
    </div>
  )
}
