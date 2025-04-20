import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Sun, CloudRain, ChevronRight, CircleDot } from "lucide-react"

export const metadata: Metadata = {
  title: "Ghana Safari Seasonal Guide | Safari Overland",
  description: "Comprehensive guide to the best times for wildlife viewing and cultural experiences in Ghana throughout the year.",
  keywords: "Ghana safari seasons, Ghana wildlife viewing, Ghana national parks, Mole National Park, Ghana weather, Ghana travel guide",
}

export default function GhanaSeasonalGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Ghana Safari Seasonal Guide</h1>
        <p className="text-lg text-muted-foreground">
          Discover the best times to visit Ghana's national parks and experience its diverse wildlife and cultural heritage.
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
        <span className="text-foreground">Ghana</span>
      </div>

      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px]">
          <Image 
            src="/images/seasonal-guides/travel-guide-ghana.jpg" 
            alt="Scenic landscape in Ghana with elephants and savanna" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                Uncovering Ghana's Natural Wonders
              </h2>
              <p className="text-white/90 text-lg mb-4">
                From the savanna elephants of Mole National Park to the rainforests of Kakum, Ghana offers diverse wildlife experiences throughout the year.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Download Ghana Safari Guide</Button>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ghana's Safari Seasons</h2>
          <p className="text-lg mb-6">
            Ghana has a tropical climate with two distinct wet seasons in the south and one wet season in the north. Understanding these patterns is key to planning the perfect safari experience. The country's diverse ecosystems include savannas, rainforests, coastal wetlands, and mountains, each with its own optimal visiting time.
          </p>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-primary" /> Dry Season (November-March)
                </h3>
                <p className="mb-4">The dry season is generally considered the best time for wildlife viewing in Ghana. With less vegetation and animals gathering around limited water sources, spotting wildlife becomes easier, especially in the northern regions like Mole National Park.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Peak wildlife viewing in Mole National Park</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Comfortable temperatures and low humidity</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Clear skies ideal for photography</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>December-January brings harmattan winds with dusty conditions</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <CloudRain className="h-5 w-5 mr-2 text-primary" /> Wet Season (April-October)
                </h3>
                <p className="mb-4">The wet season brings lush landscapes and fewer tourists. While some roads may become difficult to navigate, this season offers unique advantages for birdwatching and experiencing Ghana's vibrant green landscapes.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Excellent birdwatching with migratory species present</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Lush green landscapes and flowing waterfalls</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Fewer tourists and potential for discounted accommodations</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Some roads become difficult to navigate, especially to remote areas</span>
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
                months: "January-February",
                weather: "Dry with harmattan winds, 23-33°C (73-91°F)",
                wildlife: "Excellent wildlife viewing in Mole National Park. Elephants, antelopes, and primates concentrate around waterholes.",
                activities: "Safari drives, walking safaris, cultural visits",
                notes: "Peak season with higher prices. Book accommodations well in advance.",
              },
              {
                months: "March-April",
                weather: "End of dry season, increasing humidity, 25-35°C (77-95°F)",
                wildlife: "Good wildlife viewing continues. Some migratory birds begin to arrive.",
                activities: "Safari drives, canopy walks in Kakum National Park, cultural festivals",
                notes: "Shoulder season with good value and fewer tourists.",
              },
              {
                months: "May-June",
                weather: "Main wet season begins, frequent rain, 24-32°C (75-90°F)",
                wildlife: "Wildlife disperses with more water available. Green landscapes make for beautiful scenery.",
                activities: "Birdwatching, forest hikes, waterfall visits",
                notes: "Lower accommodation rates. Some roads become challenging.",
              },
              {
                months: "July-August",
                weather: "Brief dry interlude in south, lighter rains, 22-29°C (72-84°F)",
                wildlife: "Good for forest wildlife and birds. Breeding season for many species.",
                activities: "Forest treks, cultural experiences, coastal activities",
                notes: "Good time to combine wildlife viewing with cultural experiences.",
              },
              {
                months: "September-October",
                weather: "Second rainy period in south, heavy showers, 23-31°C (73-88°F)",
                wildlife: "Lush vegetation makes wildlife spotting challenging, but great for photography.",
                activities: "Forest explorations, community visits, birdwatching",
                notes: "Lowest tourist numbers. Many operators offer significant discounts.",
              },
              {
                months: "November-December",
                weather: "Beginning of dry season, pleasant temps, 23-32°C (73-90°F)",
                wildlife: "Wildlife begins to concentrate around water sources again. Excellent game viewing.",
                activities: "Safari drives, walking safaris, cultural festivals",
                notes: "Transition to high season. Good balance of conditions and value.",
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
                  <h3 className="text-xl font-bold mb-2">Mole National Park</h3>
                  <p className="text-muted-foreground mb-4">
                    Ghana's largest wildlife sanctuary features savanna elephants, various antelope species, primates, and over 300 bird species.
                  </p>
                  <div className="space-y-2">
                    <p><span className="font-medium">Best time:</span> November to April for optimal wildlife viewing.</p>
                    <p><span className="font-medium">Highlights:</span> Walking safaris with rangers, elephant sightings at waterholes, Mole Motel viewpoint.</p>
                    <p><span className="font-medium">Avoid:</span> July-September when roads can be difficult.</p>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src="/images/seasonal-guides/mole-national-park.jpg" 
                    alt="Elephants in Mole National Park, Ghana" 
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
                    src="/images/seasonal-guides/kakum-national-park.jpg" 
                    alt="Canopy walkway in Kakum National Park, Ghana" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Kakum National Park</h3>
                  <p className="text-muted-foreground mb-4">
                    Tropical rainforest reserve featuring a famous canopy walkway offering unique perspectives of the forest ecosystem.
                  </p>
                  <div className="space-y-2">
                    <p><span className="font-medium">Best time:</span> October to March for drier conditions, December-February for highest wildlife activity.</p>
                    <p><span className="font-medium">Highlights:</span> Canopy walkway, forest elephants (rare), diverse primates, exceptional birdlife.</p>
                    <p><span className="font-medium">Avoid:</span> May-June during heaviest rains.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Bia National Park</h3>
                  <p className="text-muted-foreground mb-4">
                    A UNESCO Biosphere Reserve featuring pristine rainforest habitat with endangered species.
                  </p>
                  <div className="space-y-2">
                    <p><span className="font-medium">Best time:</span> November to February for drier conditions and better wildlife visibility.</p>
                    <p><span className="font-medium">Highlights:</span> Forest elephants, bongo antelopes, yellow-backed duikers, rich butterfly populations.</p>
                    <p><span className="font-medium">Avoid:</span> May-July when trails become muddy and difficult.</p>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src="/images/seasonal-guides/bia-national-park.jpg" 
                    alt="Rainforest in Bia National Park, Ghana" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>
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
                    <span><span className="font-medium">Dry Season:</span> Lightweight clothing, sun protection, dust mask for harmattan period, insect repellent.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Wet Season:</span> Quick-dry clothing, rain jacket, waterproof bags, sturdy footwear with good traction.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Year-round:</span> Neutral-colored clothing for safaris, binoculars, camera gear with protection.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Health Considerations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Malaria:</span> Present year-round, but higher risk during rainy seasons. Take appropriate prophylaxis.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Vaccinations:</span> Yellow fever vaccination is mandatory. Consider hepatitis A, typhoid, and other travel vaccines.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Heat:</span> Temperatures can be extreme, especially in the north during dry season. Stay hydrated.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Combining Ghana with Other Destinations</h3>
              <p className="mb-4">
                Ghana pairs well with other West African destinations for a comprehensive West African safari experience:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Ghana + Togo + Benin:</span> Perfect cultural circuit combining wildlife with West African heritage sites.</span>
                </li>
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Ghana + Senegal:</span> Combine Ghana's forests with Senegal's Niokolo-Koba National Park during Nov-May.</span>
                </li>
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Ghana + Ivory Coast:</span> Visit Taï National Park in Ivory Coast and Mole National Park in Ghana during dry season.</span>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Plan Your Ghana Safari?</h2>
            <p className="mb-6">
              Let our local experts help you design the perfect Ghana safari itinerary based on your interests and the optimal season for your preferred activities. Whether you're interested in wildlife viewing, birdwatching, or cultural experiences, we'll create a customized journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Explore Ghana Safari Packages
              </Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" size="lg">
                Contact a Ghana Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 