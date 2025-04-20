import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Sun, CloudRain, ChevronRight, CircleDot } from "lucide-react"

export const metadata: Metadata = {
  title: "Egypt Safari Seasonal Guide | Safari Overland",
  description: "Comprehensive guide to the best times for desert safaris and wildlife viewing in Egypt throughout the year.",
  keywords: "Egypt safari seasons, Egypt desert safari, White Desert, Siwa Oasis, Western Desert, Egyptian wildlife, Egypt weather, Egypt travel guide",
}

export default function EgyptSeasonalGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Egypt Desert Safari Seasonal Guide</h1>
        <p className="text-lg text-muted-foreground">
          Discover the optimal times to explore Egypt's desert landscapes, oases, and unique wildlife throughout the year.
        </p>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/resources" className="hover:text-primary">Resources</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/resources/seasonal-guides" className="hover:text-primary">Seasonal Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Egypt</span>
      </div>

      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px]">
          <Image 
            src="/images/seasonal-guides/travel-guide-egypt.jpg" 
            alt="Egypt's White Desert landscape with unique chalk formations" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                Egypt's Desert Safari Experiences
              </h2>
              <p className="text-white/90 text-lg mb-4">
                From the otherworldly landscapes of the White Desert to the lush Siwa Oasis, Egypt offers unique safari experiences beyond the Nile Valley.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Download Egypt Safari Guide</Button>
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  View Safari Packages
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Overview */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Egypt's Desert Safari Seasons</h2>
          <p className="text-lg mb-6">
            While most visitors associate Egypt with the Nile Valley and its ancient monuments, the country's vast deserts offer exceptional safari experiences. Egypt's Western Desert, comprising about two-thirds of the country's land area, features dramatic landscapes, unique wildlife, and ancient oases. Timing your visit is crucial for comfort and optimal experiences.
          </p>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-primary" /> High Season (October-April)
                </h3>
                <p className="mb-4">The cooler months from fall through spring are ideal for desert exploration, with pleasant daytime temperatures and cool nights. This period offers the most comfortable conditions for desert safaris.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Comfortable daytime temperatures (18-28°C/65-82°F)</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Clear skies ideal for stargazing and photography</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Cool nights (5-15°C/41-59°F) require warm clothing</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Peak tourist season with higher prices and more visitors</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <CloudRain className="h-5 w-5 mr-2 text-primary" /> Low Season (May-September)
                </h3>
                <p className="mb-4">Summer brings extremely high temperatures to Egypt's deserts, making extended outdoor activities challenging. However, this period offers significantly lower prices and fewer tourists.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Extreme daytime heat (35-45°C/95-113°F)</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Lower tourist numbers and reduced prices</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Many safari operators limit activities to early morning/late evening</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Occasional khamsin winds can cause sandstorms (particularly March-May)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Month-by-Month Guide */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Month-by-Month Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                months: "October-November",
                weather: "Ideal conditions, warm days, cool nights, 18-30°C (65-86°F)",
                wildlife: "Active period for desert wildlife. Good chance to spot fennec foxes, desert gazelles, and numerous bird species.",
                activities: "Desert safaris, overnight camping, stargazing, oasis exploration",
                notes: "Shoulder season with good value and comfortable temperatures.",
              },
              {
                months: "December-February",
                weather: "Cool winter season, 15-25°C (59-77°F) days, cold nights",
                wildlife: "Peak birdwatching in wetland areas. Desert mammals most active at dawn/dusk.",
                activities: "Full-day desert excursions, White Desert camping, bird watching at Lake Qarun",
                notes: "Cold desert nights (5-10°C/41-50°F) require proper warm clothing for overnight trips.",
              },
              {
                months: "March-April",
                weather: "Warming spring days, 20-35°C (68-95°F), pleasant nights",
                wildlife: "Spring migration period for birds. Reptiles becoming more active.",
                activities: "Desert safaris, geological tours, oasis exploration",
                notes: "Risk of khamsin winds and sandstorms. Have flexible itinerary during this period.",
              },
              {
                months: "May-June",
                weather: "Hot early summer, 30-40°C (86-104°F)",
                wildlife: "Wildlife less active during daytime heat. Nocturnal species viewable on night safaris.",
                activities: "Early morning/late evening safaris, oasis visits, cultural experiences",
                notes: "Lower prices but heat can be challenging. Not recommended for full desert crossings.",
              },
              {
                months: "July-August",
                weather: "Extreme summer heat, 35-45°C (95-113°F)",
                wildlife: "Desert wildlife primarily nocturnal during this period.",
                activities: "Limited to very early morning/late evening excursions, oasis stays",
                notes: "Not recommended for extended desert exploration. Consider coastal alternatives.",
              },
              {
                months: "September",
                weather: "Transitional month, gradually cooling, 28-38°C (82-100°F)",
                wildlife: "Wildlife becoming more active as temperatures decrease. Good bird watching.",
                activities: "Short desert excursions, oasis exploration, cultural experiences",
                notes: "Good value month as temperatures begin to moderate but before peak season prices.",
              },
            ].map((period) => (
              <Card key={period.months} className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3 text-primary">{period.months}</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium block">Weather:</span>
                      <span className="text-muted-foreground">{period.weather}</span>
                    </div>
                    <div>
                      <span className="font-medium block">Wildlife:</span>
                      <span className="text-muted-foreground">{period.wildlife}</span>
                    </div>
                    <div>
                      <span className="font-medium block">Activities:</span>
                      <span className="text-muted-foreground">{period.activities}</span>
                    </div>
                    <div>
                      <span className="font-medium block">Notes:</span>
                      <span className="text-muted-foreground">{period.notes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Safari Regions */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Key Safari Regions & Best Times</h2>
          
          <div className="space-y-8">
            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">White Desert National Park</h3>
                  <p className="text-muted-foreground mb-4">
                    Known for its surreal chalk formations that resemble an arctic landscape in the middle of the desert. The area is home to desert foxes, gazelles, and rare desert plants.
                  </p>
                  <div className="space-y-2">
                    <p><span className="font-medium">Best time:</span> October to April for comfortable temperatures and clear night skies for spectacular stargazing.</p>
                    <p><span className="font-medium">Highlights:</span> Unique chalk formations, desert wildlife, stargazing, overnight camping.</p>
                    <p><span className="font-medium">Avoid:</span> June to August when daytime temperatures can exceed 45°C (113°F).</p>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src="/images/seasonal-guides/white-desert.jpg" 
                    alt="Chalk formations in Egypt's White Desert" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto md:order-1">
                  <Image 
                    src="/images/seasonal-guides/siwa-oasis.jpg" 
                    alt="Lush palm trees and traditional buildings at Siwa Oasis, Egypt" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Siwa Oasis</h3>
                  <p className="text-muted-foreground mb-4">
                    A remote oasis near the Libyan border with freshwater springs, salt lakes, and palm groves. The area is known for its unique Berber culture and desert wildlife.
                  </p>
                  <div className="space-y-2">
                    <p><span className="font-medium">Best time:</span> September to May when temperatures are pleasant for exploration and swimming in the springs.</p>
                    <p><span className="font-medium">Highlights:</span> Shali Fortress, Cleopatra's Bath, salt lakes, desert safaris, birdwatching, cultural experiences.</p>
                    <p><span className="font-medium">Avoid:</span> July and August when temperatures can exceed 40°C (104°F).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Fayoum Oasis & Lake Qarun</h3>
                  <p className="text-muted-foreground mb-4">
                    One of Egypt's oldest cities and a lush agricultural area around Lake Qarun, a saltwater lake that's excellent for birdwatching and nature exploration.
                  </p>
                  <div className="space-y-2">
                    <p><span className="font-medium">Best time:</span> November to March for birdwatching when migratory birds visit the lake. October to April for desert explorations.</p>
                    <p><span className="font-medium">Highlights:</span> Wadi El-Rayan waterfalls, Lake Qarun birdwatching, Wadi Al-Hitan (Valley of the Whales) fossil site, desert safari.</p>
                    <p><span className="font-medium">Avoid:</span> Summer months (June-August) due to excessive heat.</p>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src="/images/seasonal-guides/fayoum-lake.jpg" 
                    alt="Lake Qarun in Fayoum Oasis, Egypt with birds and wetlands" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wildlife Viewing */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Desert Wildlife Viewing</h2>
          
          <p className="text-muted-foreground mb-8">
            Egypt's deserts host a surprising diversity of wildlife that has adapted to the harsh conditions. Knowing when and where to look significantly increases your chances of memorable wildlife encounters.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Mammals</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Fennec Fox:</span>
                      <p className="text-muted-foreground">Best seen during night safaris year-round, particularly in the White Desert and around Siwa Oasis.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Dorcas Gazelle:</span>
                      <p className="text-muted-foreground">Most active at dawn and dusk. Best spotted during cooler months (Oct-Apr) in the Western Desert.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Desert Jerboa:</span>
                      <p className="text-muted-foreground">These nocturnal rodents are best seen during night walks in all desert regions year-round.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Birds & Reptiles</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Migratory Birds:</span>
                      <p className="text-muted-foreground">Winter (Nov-Mar) is optimal for birdwatching at Lake Qarun and Siwa's salt lakes when European migrants winter here.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Desert Monitor:</span>
                      <p className="text-muted-foreground">Most active during spring and early summer (Mar-Jun) in rocky desert areas.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Sandfish Skink:</span>
                      <p className="text-muted-foreground">These fascinating "swimming" lizards are best spotted in sandy areas during morning hours in spring and fall.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Practical Considerations */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Practical Considerations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">What to Pack</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Year-round:</span> High SPF sunscreen, sunglasses, hat with neck protection, insect repellent, headlamp for night exploration.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Winter (Oct-Mar):</span> Warm clothing for cold desert nights, including thermal layers, hat, and gloves.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Summer (Apr-Sep):</span> Ultra-lightweight clothing, electrolyte supplements, cooling towels, extra water containers.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Health & Safety</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Hydration:</span> Critical in all seasons. Minimum 3-4 liters of water per day required, more in summer.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Sun Protection:</span> Essential year-round. The desert sun is intense even in winter.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Desert Travel:</span> Always travel with experienced guides and appropriate vehicles. Solo desert travel is not recommended.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Combining Desert Safaris with Other Experiences</h3>
              <p className="mb-4">
                Egypt's desert safaris can be perfectly combined with other experiences for a comprehensive Egyptian adventure:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Nile Valley + Western Desert:</span> Combine cultural exploration of ancient temples with desert adventures (best Oct-Apr).</span>
                </li>
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Red Sea + Desert Safari:</span> Mix marine experiences (diving/snorkeling) with desert exploration. Good year-round with seasonal adjustments.</span>
                </li>
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Cairo + Fayoum:</span> Easy weekend combination accessible from Cairo, ideal for shorter trips (best Sep-May).</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="bg-primary text-white p-8 md:p-12 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Explore Egypt's Deserts?</h2>
            <p className="mb-6">
              Let our experienced local guides help you design the perfect Egyptian desert safari based on your interests and travel dates. From overnight camping under the stars in the White Desert to exploring ancient oases, we'll create an unforgettable desert adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Explore Egypt Safari Packages
              </Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" size="lg">
                Contact a Desert Safari Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 