import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Sun, CloudRain, ChevronRight, CircleDot } from "lucide-react"

export const metadata: Metadata = {
  title: "Morocco Safari Seasonal Guide | Safari Overland",
  description: "Comprehensive guide to the best times for desert safaris and wildlife viewing in Morocco throughout the year.",
  keywords: "Morocco safari seasons, Morocco desert safari, Sahara Desert, Atlas Mountains, Moroccan wildlife, Morocco weather, Morocco travel guide",
}

export default function MoroccoSeasonalGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Morocco Safari Seasonal Guide</h1>
        <p className="text-lg text-muted-foreground">
          Discover the optimal times to explore Morocco's diverse landscapes, from the Sahara Desert to the Atlas Mountains and coastal regions.
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
        <span className="text-foreground">Morocco</span>
      </div>

      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px]">
          <Image 
            src="/images/seasonal-guides/travel-guide-morocco.jpg" 
            alt="Sahara Desert landscape in Morocco with camels and sand dunes" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                Morocco's Diverse Safari Experiences
              </h2>
              <p className="text-white/90 text-lg mb-4">
                From the golden dunes of the Sahara to the rugged Atlas Mountains and rich coastal ecosystems, Morocco offers extraordinary natural diversity.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Download Morocco Safari Guide</Button>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Morocco's Climate & Safari Seasons</h2>
          <p className="text-lg mb-6">
            Morocco's geographical diversity creates distinct microclimates across its regions. From the Mediterranean north to the Sahara in the south, and from coastal plains to high mountains, each area has its optimal visiting times for wildlife viewing and outdoor activities.
          </p>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-primary" /> Spring (March-May) & Fall (September-November)
                </h3>
                <p className="mb-4">These shoulder seasons offer the most pleasant temperatures across all regions of Morocco. They're ideal for combined itineraries that include desert, mountains, and coastal areas.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Comfortable temperatures in all regions (15-28°C/59-82°F)</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Spring wildflowers in Atlas Mountains (March-May)</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Bird migrations in coastal areas and wetlands</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Less crowded than peak winter season</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <CloudRain className="h-5 w-5 mr-2 text-primary" /> Winter (December-February) & Summer (June-August)
                </h3>
                <p className="mb-4">These seasons are more region-specific. Winter is ideal for desert experiences but can be cold in the mountains. Summer is best avoided in the desert but is perfect for coastal and high mountain activities.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Winter:</span> Perfect for Sahara (15-20°C/59-68°F days), but cold in Atlas Mountains</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Winter:</span> Peak tourism season with higher prices</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Summer:</span> Extreme heat in desert regions (40°C+/104°F+)</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Summer:</span> Ideal for coastal nature reserves and high Atlas trekking</span>
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
                months: "December-February",
                weather: "Mild in desert (15-20°C/59-68°F), cold in mountains with snow",
                wildlife: "Desert wildlife most active. Resident birds in wetlands. Mountain wildlife descends to lower elevations.",
                activities: "Desert safaris, stargazing, birdwatching at coastal wetlands",
                notes: "Peak tourist season. Book accommodations well in advance. Cold desert nights require warm clothing.",
              },
              {
                months: "March-April",
                weather: "Warming spring temperatures, 18-25°C (64-77°F), occasional rainfall",
                wildlife: "Spring bird migrations along coastal routes. Flowering season attracts insects and pollinators in Atlas Mountains.",
                activities: "Combined desert and mountain safaris, botanical tours in Atlas, coastal birdwatching",
                notes: "Excellent overall season. Occasional rain can cause flash floods in desert regions.",
              },
              {
                months: "May",
                weather: "Warm days, 22-30°C (72-86°F), comfortable nights",
                wildlife: "Last month before summer heat. Good for mammals in most regions. Late spring migrants along coast.",
                activities: "Desert safaris (before summer heat), trekking, wildlife photography",
                notes: "Ideal month before summer crowds at coastal areas and high temperatures in desert.",
              },
              {
                months: "June-August",
                weather: "Very hot in desert (35-45°C/95-113°F), pleasant in mountains and coast",
                wildlife: "Coastal and mountain wildlife active. Desert wildlife largely nocturnal.",
                activities: "Coastal nature reserves, mountain trekking, nocturnal desert wildlife viewing",
                notes: "Avoid desert daytime activities. Focus on coastal and high-altitude experiences.",
              },
              {
                months: "September-October",
                weather: "Cooling temperatures, 20-30°C (68-86°F), comfortable across regions",
                wildlife: "Fall bird migrations. Desert wildlife becomes more active as temperatures decrease.",
                activities: "Desert safaris resume, mountain trekking, coastal nature experiences",
                notes: "Excellent shoulder season with fewer tourists and comfortable conditions throughout the country.",
              },
              {
                months: "November",
                weather: "Fall transitioning to winter, 15-25°C (59-77°F), occasional rainfall",
                wildlife: "Desert wildlife very active. Late fall migrants along coastal routes.",
                activities: "Desert photography, wildlife drives, birdwatching",
                notes: "Good value month before peak winter season. Occasional rainfall can create temporary wetlands in desert regions.",
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
                  <h3 className="text-xl font-bold mb-2">Sahara Desert Experiences</h3>
                  <p className="text-muted-foreground mb-4">
                    Morocco's portion of the Sahara offers spectacular dune landscapes and unique desert-adapted wildlife, including several rare species.
                  </p>
                  <div className="space-y-2">
                    <p><span className="font-medium">Best time:</span> October to April, with November-February offering ideal daytime temperatures.</p>
                    <p><span className="font-medium">Highlights:</span> Fennec foxes, desert hedgehogs, gazelles, gerbils, cape hares, numerous reptiles, and unique desert flora.</p>
                    <p><span className="font-medium">Avoid:</span> June to August when daytime temperatures regularly exceed 45°C (113°F).</p>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src="/images/seasonal-guides/morocco-sahara.jpg" 
                    alt="Sahara Desert landscape in Morocco with sand dunes at sunset" 
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
                    src="/images/seasonal-guides/high-atlas.jpg" 
                    alt="High Atlas Mountains in Morocco with diverse flora and fauna" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Atlas Mountain Ecosystems</h3>
                  <p className="text-muted-foreground mb-4">
                    The Atlas Mountains harbor diverse ecosystems and wildlife, from forested foothills to high alpine zones with specialized fauna and flora.
                  </p>
                  <div className="space-y-2">
                    <p><span className="font-medium">Best time:</span> April to June for spring flowers and wildlife, and September to October for pleasant hiking conditions.</p>
                    <p><span className="font-medium">Highlights:</span> Barbary macaques, Barbary sheep (aoudad), Atlas Mountain gazelles, golden eagles, various reptiles and amphibians.</p>
                    <p><span className="font-medium">Avoid:</span> December to February in higher elevations due to snow and difficult conditions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Coastal and Wetland Reserves</h3>
                  <p className="text-muted-foreground mb-4">
                    Morocco's coastal areas and wetlands, including Souss-Massa National Park and Merja Zerga, are vital for resident and migratory birds.
                  </p>
                  <div className="space-y-2">
                    <p><span className="font-medium">Best time:</span> September to April for migratory bird species, with peak diversity from November to March.</p>
                    <p><span className="font-medium">Highlights:</span> Northern bald ibis (critically endangered), flamingos, marbled teal, white-headed duck, and hundreds of migratory species.</p>
                    <p><span className="font-medium">Avoid:</span> No major season to avoid, though summer (June-August) has fewer migratory species.</p>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src="/images/seasonal-guides/morocco-coast.jpg" 
                    alt="Coastal wetlands in Morocco with diverse bird species" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Wildlife Experiences */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Special Wildlife Experiences</h2>
          
          <p className="text-muted-foreground mb-8">
            Morocco offers several unique wildlife experiences that are highly seasonal. Planning your visit around these natural events can make your safari truly exceptional.
          </p>
          
          <div className="grid grid-cols-1 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Northern Bald Ibis Viewing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <p className="text-muted-foreground mb-4">
                      The critically endangered Northern Bald Ibis has one of its last wild breeding populations in Morocco. Viewing these rare birds requires careful timing and local expertise.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                        <span><span className="font-medium">Best time:</span> February to April to observe breeding behaviors at coastal cliffs near Souss-Massa National Park.</span>
                      </li>
                      <li className="flex items-start">
                        <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                        <span><span className="font-medium">Viewing notes:</span> Always view with official guides to protect these critically endangered birds.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-48 md:h-auto">
                    <Image 
                      src="/images/seasonal-guides/northern-bald-ibis.jpg" 
                      alt="Northern Bald Ibis in Morocco" 
                      fill 
                      className="object-cover rounded-md" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Atlas Mountains Spring Bloom</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative h-48 md:h-auto order-2 md:order-1">
                    <Image 
                      src="/images/seasonal-guides/atlas-spring.jpg" 
                      alt="Spring flowers in Atlas Mountains of Morocco" 
                      fill 
                      className="object-cover rounded-md" 
                    />
                  </div>
                  <div className="col-span-2 order-1 md:order-2">
                    <p className="text-muted-foreground mb-4">
                      The Atlas Mountains transform during spring when snow melt nurtures a spectacular bloom of wildflowers, attracting numerous pollinators and creating ideal wildlife viewing conditions.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                        <span><span className="font-medium">Best time:</span> April to early June, with peak bloom varying by elevation (earlier at lower altitudes).</span>
                      </li>
                      <li className="flex items-start">
                        <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                        <span><span className="font-medium">Wildlife benefits:</span> Excellent time for observing butterflies, birds, and mammals that become more active during this abundant season.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Desert Wildlife After Rainfall</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <p className="text-muted-foreground mb-4">
                      Occasional rainfall in desert regions creates brief but extraordinary transformations in the ecosystem. Desert blooms can occur, and wildlife activity increases dramatically.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                        <span><span className="font-medium">Best time:</span> Unpredictable, but most common from November to March when occasional rains may occur.</span>
                      </li>
                      <li className="flex items-start">
                        <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                        <span><span className="font-medium">Experience notes:</span> Not guaranteed in any given year, but local guides can advise on recent rainfall and conditions.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-48 md:h-auto">
                    <Image 
                      src="/images/seasonal-guides/desert-bloom.jpg" 
                      alt="Desert bloom after rainfall in Morocco" 
                      fill 
                      className="object-cover rounded-md" 
                    />
                  </div>
                </div>
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
                    <span><span className="font-medium">Desert Safaris:</span> Lightweight, breathable clothing, sun protection, warm layers for evenings, headlamp, binoculars.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Mountain Safaris:</span> Layers for variable temperatures, hiking boots, rain jacket (spring), sun protection.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Coastal Reserves:</span> Wind protection, binoculars (essential for birdwatching), field guides, waterproof footwear for wetlands.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Cultural Considerations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Ramadan:</span> Consider the timing of Ramadan (dates vary yearly) as it may affect services in rural areas.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Rural Communities:</span> Respect local customs when visiting rural areas near wildlife reserves, particularly regarding dress code and photography.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Conservation Awareness:</span> Support guides who demonstrate knowledge and respect for both wildlife and local cultures.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Combining Wildlife Viewing with Cultural Experiences</h3>
              <p className="mb-4">
                Morocco offers exceptional opportunities to combine wildlife safaris with rich cultural experiences:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Berber Cultural Experiences + Atlas Wildlife:</span> Best in spring and fall when weather is ideal for both mountain communities and wildlife viewing.</span>
                </li>
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Desert Nomadic Traditions + Sahara Wildlife:</span> Winter months (Dec-Feb) offer comfortable temperatures for combined cultural and wildlife experiences.</span>
                </li>
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Coastal Cities + Bird Reserves:</span> Winter months provide excellent opportunities to combine historical coastal cities with peak birdwatching.</span>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Explore Morocco's Natural Wonders?</h2>
            <p className="mb-6">
              Let our experienced local guides help you design the perfect Moroccan safari based on your interests and travel dates. Whether you're drawn to the Sahara's golden dunes, the Atlas Mountains' biodiversity, or the coastal wetlands' incredible birdlife, we'll create a journey that showcases Morocco's natural treasures at their best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Explore Morocco Safari Packages
              </Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" size="lg">
                Contact a Morocco Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 