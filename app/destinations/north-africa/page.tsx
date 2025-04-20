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
  Mountain, 
  Building, 
  Camera 
} from "lucide-react"
import { DestinationHeader } from "@/components/destination-header"
import { DestinationAttractions } from "@/components/destination-attractions"
import { DestinationWildlife } from "@/components/destination-wildlife"
import { DestinationSeasons } from "@/components/destination-seasons"
import { DestinationMap } from "@/components/destination-map"
import { ListingsGrid } from "@/components/listings-grid"

export const metadata: Metadata = {
  title: "North Africa Safaris & Adventures | Morocco, Egypt & Tunisia",
  description: "Discover North Africa's unique blend of desert exploration, historical wonders, and wildlife adventures in Morocco, Egypt, and Tunisia. Plan your perfect safari experience.",
  keywords: "North Africa safari, Morocco desert safari, Egypt safari, Tunisia wildlife, Atlas Mountains, Sahara Desert, desert wildlife, North African adventure, historical safari",
}

// North Africa attractions with enhanced content
const northAfricaAttractions = [
  {
    name: "Sahara Desert",
    location: "Morocco, Tunisia, Egypt",
    description:
      "The world's largest hot desert offers an otherworldly landscape of endless sand dunes, rugged mountains, and scattered oases. The Sahara's unique ecosystem supports specialized wildlife adapted to extreme conditions, while its nomadic peoples maintain ancient traditions. Experience camel treks, 4x4 adventures, and unforgettable nights under the stars in traditional desert camps.",
    image: "/images/destinations/attractions/sahara-desert.jpg",
    highlights: ["Erg Chebbi Dunes", "Desert Wildlife", "Berber Culture", "Stargazing"],
    bestTime: "October to April (avoiding summer heat)",
  },
  {
    name: "Atlas Mountains",
    location: "Morocco",
    description: "This majestic mountain range stretches 2,500km across Morocco, Algeria, and Tunisia, reaching 4,167m at Toubkal Peak. The diverse ecological zones support unique wildlife, including Barbary macaques, eagles, and the elusive Barbary leopard. Traditional Berber villages dot the valleys, offering authentic cultural experiences, while hiking trails range from gentle valley walks to challenging summit ascents.",
    image: "/images/destinations/attractions/atlas-mountains.jpg",
    highlights: ["Mount Toubkal", "Berber Villages", "High Altitude Wildlife", "Spectacular Hiking"],
    bestTime: "April to May, September to October (mild temperatures)",
  },
  {
    name: "Siwa Oasis",
    location: "Egypt",
    description:
      "This remote desert oasis near the Libyan border offers a glimpse into traditional desert life with its mud-brick architecture, natural springs, and ancient temples. Once home to the famous Oracle of Amun consulted by Alexander the Great, Siwa remains culturally distinct with its own Berber language and traditions. The surrounding desert supports fascinating wildlife adapted to the harsh conditions.",
    image: "/images/destinations/attractions/siwa-oasis.jpg",
    highlights: ["Desert Salt Lakes", "Shali Fortress", "Natural Springs", "Ancient Temple of the Oracle"],
    bestTime: "October to April (comfortable temperatures)",
  },
  {
    name: "Ichkeul National Park",
    location: "Tunisia",
    description:
      "This UNESCO World Heritage site and Ramsar wetland provides critical habitat for hundreds of thousands of migratory birds. Centered around Lake Ichkeul, the park's fluctuating freshwater and saltwater ecosystem creates one of North Africa's most important bird sanctuaries. The adjacent mountain and marshlands support diverse wildlife, including water buffalo introduced in the 1700s.",
    image: "/images/destinations/attractions/ichkeul.jpg",
    highlights: ["Bird Migration Spectacle", "Lake Ecosystem", "Wetland Wildlife", "Mountain Hikes"],
    bestTime: "November to March (peak bird migration)",
  },
  {
    name: "Sinai Peninsula",
    location: "Egypt",
    description:
      "This triangular peninsula bridging Africa and Asia offers extraordinary diversity: world-class coral reefs along the Red Sea coast, rugged mountain interior with biblical significance, and desert landscapes inhabited by Bedouin tribes. Mount Sinai (biblically where Moses received the Ten Commandments) draws pilgrims and hikers for spectacular sunrise views, while the coastal areas provide exceptional snorkeling and diving.",
    image: "/images/destinations/attractions/sinai.jpg",
    highlights: ["Mount Sinai", "Red Sea Reefs", "Bedouin Culture", "Saint Catherine's Monastery"],
    bestTime: "September to November, March to May (mild temperatures)",
  },
  {
    name: "Fez Medina",
    location: "Morocco",
    description:
      "The world's largest car-free urban area, this UNESCO-listed medieval city transports visitors back in time with its 9,000+ narrow lanes, ancient mosques, markets, and workshops practicing crafts unchanged for centuries. Founded in the 9th century, Fez houses the world's oldest university and remains Morocco's cultural and spiritual center. The surrounding area offers excellent day trips to Middle Atlas forests and lakes.",
    image: "/images/destinations/attractions/fez-medina.jpg",
    highlights: ["Medieval Architecture", "Traditional Craft Workshops", "Cultural Immersion", "Nearby Wildlife Excursions"],
    bestTime: "March to May, September to November (pleasant temperatures)",
  },
]

// Enhanced wildlife data with more detailed descriptions
const northAfricaWildlife = [
  {
    name: "Barbary Macaque",
    description: "The only primate native to North Africa, these endangered monkeys inhabit the Atlas Mountains and cedar forests. Morocco's Middle Atlas populations offer excellent viewing opportunities.",
    image: "/images/destinations/wildlife/barbary-macaque.jpg",
  },
  {
    name: "Fennec Fox",
    description: "The world's smallest fox species, adapted to desert life with oversized ears for heat regulation. These nocturnal hunters can occasionally be spotted during desert excursions.",
    image: "/images/destinations/wildlife/fennec-fox.jpg",
  },
  {
    name: "Egyptian Vulture",
    description: "This endangered vulture species migrates between North Africa and Europe. Look for them soaring over mountains and desert edges during spring and autumn migrations.",
    image: "/images/destinations/wildlife/egyptian-vulture.jpg",
  },
  {
    name: "Scimitar-Horned Oryx",
    description: "Once extinct in the wild, conservation efforts are reintroducing these magnificent antelopes to their native desert habitat in Tunisia and Morocco.",
    image: "/images/destinations/wildlife/scimitar-oryx.jpg",
  },
  {
    name: "Desert Hedgehog",
    description: "The world's smallest hedgehog species has adapted to harsh desert conditions. Their nocturnal habits make sightings rare but possible during night safaris.",
    image: "/images/destinations/wildlife/desert-hedgehog.jpg",
  },
  {
    name: "Flamingos",
    description: "North Africa's salt lakes and coastal wetlands host spectacular flocks of greater flamingos, especially in Tunisia's Ichkeul and Morocco's Merja Zerga.",
    image: "/images/destinations/wildlife/flamingos.jpg",
  },
]

// Enhanced seasonal information
const northAfricaSeasons = [
  {
    name: "Autumn",
    months: "September to November",
    weather: "Mild temperatures (15-25°C), occasional light rainfall, comfortable evenings",
    wildlife: "Bird migration begins, desert wildlife more active, ideal for diverse viewing",
    crowds: "Moderate visitor numbers with good availability and reasonable pricing",
    pros: ["Perfect Temperatures for Desert Exploration", "Beginning of Bird Migration", "Lush Oases after Summer Heat", "Ideal Photography Conditions"],
    cons: [
      "Some popular sites still relatively busy",
      "Occasional dust storms possible",
      "Desert nights becoming cooler",
      "Variable conditions in mountain regions",
    ],
    icon: "cloud",
  },
  {
    name: "Winter",
    months: "December to February",
    weather: "Mild days (10-20°C) in lowlands, cold in mountains, occasional rain, snow at higher elevations",
    wildlife: "Peak bird migration, excellent wetland viewing, increased desert wildlife activity",
    crowds: "Peak season for cultural tourism, moderate for nature experiences",
    pros: ["Peak Bird Migration Season", "Abundant Water in Desert Oases", "Snow-capped Atlas Mountains", "Clear Desert Skies"],
    cons: [
      "Cold temperatures at higher elevations",
      "Mountain trails may be snow-covered",
      "Some rain in coastal areas",
      "Higher prices in popular tourist areas",
    ],
    icon: "thermometer",
  },
  {
    name: "Spring",
    months: "March to May",
    weather: "Warm days (18-28°C), cool nights, occasional rainfall creating desert blooms",
    wildlife: "Desert in bloom, breeding season for many species, excellent all-around viewing",
    crowds: "Moderate visitor numbers, good balance of availability and experience",
    pros: ["Desert Wildflower Blooms", "Pleasant Temperatures", "Spring Migration Birds", "Green Landscapes in Atlas Mountains"],
    cons: [
      "Occasional sandstorms (khamsin) in April/May",
      "Variable weather conditions",
      "Increasing temperatures by late May",
      "Easter period can be crowded in some areas",
    ],
    icon: "sun",
  },
  {
    name: "Summer",
    months: "June to August",
    weather: "Very hot (30-45°C) in desert and lowlands, warm in mountains, minimal rainfall",
    wildlife: "Limited desert activity due to heat, mountain regions remain productive",
    crowds: "Low season in desert regions, moderate in coastal and mountain areas",
    pros: ["Excellent Value in Desert Regions", "Fewer Tourists at Popular Sites", "Good Conditions in High Atlas", "Coastal Marine Wildlife"],
    cons: [
      "Extreme desert heat limits wildlife activity",
      "Challenging conditions for desert exploration",
      "Reduced water sources affect wildlife viewing",
      "Uncomfortable humidity in some coastal areas",
    ],
    icon: "cloud-rain",
  },
]

// Enhanced country information
const northAfricaCountries = [
  {
    name: "Morocco",
    description:
      "A land of dramatic contrasts, Morocco offers extraordinary diversity from the Sahara's golden dunes to the snow-capped Atlas Mountains and ancient imperial cities. The country's unique wildlife includes the endangered Barbary macaque, desert-adapted species, and rich birdlife. Combine wildlife experiences with cultural exploration in medinas, historic kasbahs, and traditional Berber villages for a multifaceted adventure.",
    highlights: ["Atlas Mountains", "Sahara Desert", "Coastal Reserves", "Cedar Forests"],
    listings: 87,
    flag: "/images/destinations/flags/morocco.svg"
  },
  {
    name: "Egypt",
    description:
      "Beyond its world-famous archaeological treasures, Egypt offers surprising wildlife experiences in diverse ecosystems. The Western Desert oases harbor unique desert-adapted species, while the Sinai Peninsula combines mountain wilderness with world-class marine environments. The Nile Valley provides crucial habitat for migratory birds, while the Red Sea coast offers some of the world's most spectacular coral reef ecosystems.",
    highlights: ["Sinai Peninsula", "Western Desert Oases", "Red Sea Reefs", "Nile Valley"],
    listings: 64,
    flag: "/images/destinations/flags/egypt.svg"
  },
  {
    name: "Tunisia",
    description:
      "This compact country packs remarkable biodiversity into its borders, from Mediterranean forests and wetlands to Saharan dunes. Tunisia's location on major bird migration routes makes it a paradise for birdwatchers, while its southern desert regions harbor fascinating adaptations to extreme conditions. National parks protect important habitats, while the country's rich history adds cultural dimension to any wildlife journey.",
    highlights: ["Ichkeul National Park", "Desert Oases", "Cap Bon Peninsula", "Saharan Fringe"],
    listings: 43,
    flag: "/images/destinations/flags/tunisia.svg"
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
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="relative rounded-xl overflow-hidden">
          <div className="aspect-video relative">
            <Image 
              src="/images/destinations/north-africa.jpg" 
              alt="North Africa desert landscape with camels and dunes at sunset" 
              fill 
              className="object-cover" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  North Africa Adventures
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  Where ancient civilizations meet breathtaking desert landscapes and unique wildlife in Morocco, Egypt, and Tunisia.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-3 py-1 text-sm">
                    Sahara Desert
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-3 py-1 text-sm">
                    Atlas Mountains
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-3 py-1 text-sm">
                    Historical Sites
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 px-3 py-1 text-sm">
                    Desert Wildlife
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
          <h2 className="text-3xl font-bold mb-6 text-center">Discover North Africa</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              North Africa offers a unique safari experience that blends natural wonders with extraordinary cultural heritage. The region spans the massive Sahara Desert, the rugged Atlas Mountains, Mediterranean coastlines, and ancient cities whose roots stretch back millennia. This diverse landscape creates a habitat for specialized wildlife that has adapted to some of Earth's most extreme environments.
            </p>
            <p>
              While different from the classic big game safaris of East and Southern Africa, North African adventures provide equally compelling wildlife experiences. Desert expeditions reveal the fascinating adaptations of creatures like fennec foxes and addax antelopes, mountain excursions offer encounters with Barbary macaques and golden eagles, while coastal wetlands attract spectacular bird migrations.
            </p>
            <p>
              What makes North Africa truly special is the seamless integration of nature and culture. Here, wildlife viewing can be combined with exploration of ancient Roman ruins, medieval medinas, traditional Berber villages, and oasis communities whose ways of life have remained largely unchanged for centuries. From Morocco's imperial cities to Egypt's pharaonic wonders, the cultural dimension adds remarkable depth to any North African safari.
            </p>
          </div>
        </div>
      </section>

      {/* Key Attractions Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Iconic Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {northAfricaAttractions.map((attraction) => (
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
        <h2 className="text-3xl font-bold mb-8 text-center">Unique Wildlife</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {northAfricaWildlife.map((animal) => (
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
        <h2 className="text-3xl font-bold mb-8 text-center">North African Countries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {northAfricaCountries.map((country) => (
            <Card key={country.name} className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-12 flex-shrink-0 border rounded">
                    <Image 
                      src={country.flag} 
                      alt={`${country.name} flag`} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <h3 className="text-xl font-bold">{country.name}</h3>
                </div>
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
                <Link href={`/destinations/north-africa/${country.name.toLowerCase()}`}>
                  <Button variant="outline" size="sm">
                    Explore {country.name} ({country.listings} listings)
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Seasons Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">When to Visit North Africa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {northAfricaSeasons.map((season) => (
            <Card key={season.name} className="h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {season.icon === 'sun' && <Sun className="h-8 w-8 text-yellow-500 mr-3" />}
                  {season.icon === 'cloud' && <Cloud className="h-8 w-8 text-blue-400 mr-3" />}
                  {season.icon === 'thermometer' && <Thermometer className="h-8 w-8 text-blue-500 mr-3" />}
                  {season.icon === 'cloud-rain' && <CloudRain className="h-8 w-8 text-red-500 mr-3" />}
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
      
      {/* Experience Types */}
      <section className="mb-16 bg-muted p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">North Africa Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Compass className="h-8 w-8 text-amber-600 mr-3" />
                <h3 className="text-lg font-bold">Desert Adventures</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Experience the magic of the Sahara through camel treks, 4x4 expeditions, and overnight camps under starlit skies. Witness unique desert wildlife and learn about Bedouin and Berber culture from local guides.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Multi-day desert caravans</li>
                <li>• Luxury desert camps</li>
                <li>• Dune hiking and sandboarding</li>
                <li>• Desert astronomy experiences</li>
                <li>• Wildlife tracking with local experts</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Mountain className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-lg font-bold">Mountain Exploration</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Discover the Atlas Mountains' diverse ecosystems and endemic wildlife through guided treks, village stays, and nature walks. Encounter Barbary macaques, eagles, and the region's rich biodiversity.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Guided wildlife treks</li>
                <li>• Berber village homestays</li>
                <li>• Cedar forest excursions</li>
                <li>• Mountain photography workshops</li>
                <li>• Traditional cooking classes</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Building className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-bold">Cultural Immersion</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Enhance your wildlife experience with cultural exploration of ancient cities, archaeological wonders, and traditional communities. North Africa's cultural heritage adds depth to any natural adventure.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Medina walking tours</li>
                <li>• Archaeological site visits</li>
                <li>• Traditional craft workshops</li>
                <li>• Local market experiences</li>
                <li>• Historical conservation projects</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Photography Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Photography in North Africa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image 
              src="/images/destinations/north-africa-photo1.jpg" 
              alt="Desert landscape photography in North Africa" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center mb-4">
              <Camera className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-bold">Capture the Magic</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              North Africa offers extraordinary photography opportunities, from sweeping desert landscapes to intimate wildlife portraits and vibrant cultural scenes. The region's unique light conditions—especially during golden hours in the desert—create magical possibilities for photographers of all levels.
            </p>
            <h4 className="font-bold mb-2">Photography Highlights:</h4>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">•</span>
                <span><span className="font-medium">Desert Landscapes:</span> Sweeping dunes, dramatic shadows, and star-filled night skies.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">•</span>
                <span><span className="font-medium">Wildlife:</span> Desert-adapted species, mountain wildlife, and migratory birds.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">•</span>
                <span><span className="font-medium">Cultural:</span> Ancient architecture, traditional craftspeople, and vibrant markets.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">•</span>
                <span><span className="font-medium">Adventure:</span> Camel caravans, mountain trekking, and traditional desert camps.</span>
              </li>
            </ul>
            <p className="text-sm">
              Many of our tours offer specialized photography options with expert guides who know the best locations and timing for exceptional images. Photography workshops and dedicated photo safaris are available for enthusiasts seeking to improve their skills.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="bg-primary text-white p-8 md:p-12 rounded-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience North Africa's Magic</h2>
            <p className="mb-6">
              Discover our curated selection of adventures across Morocco, Egypt, and Tunisia. From desert expeditions and mountain treks to cultural journeys and wildlife experiences, we offer authentic North African adventures for every traveler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Browse North Africa Adventures
              </Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" size="lg">
                Contact a Specialist
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
