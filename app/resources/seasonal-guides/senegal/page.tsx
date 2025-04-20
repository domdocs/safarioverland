import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Sun, CloudRain, ChevronRight, CircleDot } from "lucide-react"

export const metadata: Metadata = {
  title: "Senegal Safari Seasonal Guide | Safari Overland",
  description: "Comprehensive guide to the best times for wildlife viewing in Senegal's national parks and reserves throughout the year.",
  keywords: "Senegal safari seasons, Senegal wildlife viewing, Niokolo-Koba National Park, Djoudj National Bird Sanctuary, Senegal weather, Senegal travel guide",
}

export default function SenegalSeasonalGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Senegal Safari Seasonal Guide</h1>
        <p className="text-lg text-muted-foreground">
          Discover the best times to visit Senegal's diverse ecosystems, from the wetlands of Djoudj to the savannas of Niokolo-Koba.
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
        <span className="text-foreground">Senegal</span>
      </div>

      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px]">
          <Image 
            src="/images/seasonal-guides/travel-guide-senegal.jpg" 
            alt="Wildlife in Senegal's national parks" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                Senegal's Diverse Safari Experiences
              </h2>
              <p className="text-white/90 text-lg mb-4">
                From migratory birds at Djoudj National Bird Sanctuary to the elusive wildlife of Niokolo-Koba National Park.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Download Senegal Safari Guide</Button>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Senegal's Safari Seasons</h2>
          <p className="text-lg mb-6">
            Senegal's climate features a distinct dry season and wet season, which dramatically impact wildlife viewing opportunities across its diverse habitats. The country's location in West Africa creates a fascinating blend of Sahel and tropical climates, hosting an impressive range of species from large mammals to migratory birds.
          </p>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-primary" /> Dry Season (November-May)
                </h3>
                <p className="mb-4">The dry season is generally considered the best time for safaris in Senegal. Wildlife congregates around water sources in Niokolo-Koba National Park, and the Djoudj Bird Sanctuary fills with millions of migratory birds.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Peak wildlife viewing in Niokolo-Koba (Dec-Apr)</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Excellent birdwatching at Djoudj (Nov-Apr)</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Better road conditions throughout the country</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Hot temperatures, especially Mar-May (30-40°C)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <CloudRain className="h-5 w-5 mr-2 text-primary" /> Wet Season (June-October)
                </h3>
                <p className="mb-4">The wet season brings lush landscapes and fewer tourists. While some areas become less accessible, this season has its unique advantages, including cooler temperatures and lush scenery.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Lush green landscapes ideal for photography</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Lower visitor numbers and reduced accommodation rates</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>More challenging wildlife spotting in Niokolo-Koba</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>Some roads become impassable, particularly in southern regions</span>
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
                months: "November-December",
                weather: "Beginning of dry season, pleasant, 25-30°C (77-86°F)",
                wildlife: "Bird migrations begin at Djoudj. Niokolo-Koba drying out with improving wildlife viewing.",
                activities: "Bird safaris, river tours, wildlife drives",
                notes: "Excellent time to visit with good conditions and moderate crowds.",
              },
              {
                months: "January-February",
                weather: "Peak dry season, warm days, cool nights, 20-35°C (68-95°F)",
                wildlife: "Peak bird populations at Djoudj. Excellent viewing at Niokolo-Koba as animals concentrate around water.",
                activities: "Photography safaris, guided wildlife drives, boat excursions",
                notes: "Peak season with highest visitor numbers. Book well in advance.",
              },
              {
                months: "March-April",
                weather: "Hot and dry, increasing heat, 25-40°C (77-104°F)",
                wildlife: "Exceptional wildlife viewing in Niokolo-Koba. Birds begin to depart Djoudj by late April.",
                activities: "Early morning/late afternoon game drives, river safaris",
                notes: "Excellent wildlife viewing but temperatures can be challenging midday.",
              },
              {
                months: "May-June",
                weather: "Transition to wet season, building humidity, 25-35°C (77-95°F)",
                wildlife: "Wildlife still concentrated around water sources. Last chance to see mammals before rains disperse them.",
                activities: "Wildlife safaris, cultural experiences",
                notes: "May is last reliable month for Niokolo-Koba before rainy season impacts.",
              },
              {
                months: "July-August",
                weather: "Peak wet season, rain and high humidity, 25-32°C (77-90°F)",
                wildlife: "Lush vegetation makes spotting difficult. Breeding season for many species.",
                activities: "Cultural experiences, coastal activities, limited wildlife viewing",
                notes: "Many safari operators reduce operations during this period.",
              },
              {
                months: "September-October",
                weather: "Late rains, decreasing precipitation, 25-33°C (77-91°F)",
                wildlife: "Challenging wildlife viewing but beautiful landscapes. Preparations for bird migrations.",
                activities: "Cultural tourism, forest experiences, early bird migrations",
                notes: "Transition period with improving conditions towards October.",
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
                  <h3 className="text-xl font-bold mb-2">Niokolo-Koba National Park</h3>
                  <p className="text-muted-foreground mb-4">
                    Senegal's largest national park and a UNESCO World Heritage Site, home to lions, elephants, leopards, antelopes, and numerous primate species.
                  </p>
                  <div className="space-y-2">
                    <p><span className="font-medium">Best time:</span> December to April when wildlife congregates around rivers and water holes.</p>
                    <p><span className="font-medium">Highlights:</span> Derby eland (largest antelope), lions, elephants, western giant eland, chimpanzees.</p>
                    <p><span className="font-medium">Avoid:</span> July to October when roads can be impassable due to flooding.</p>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src="/images/seasonal-guides/niokolo-koba.jpg" 
                    alt="Wildlife in Niokolo-Koba National Park, Senegal" 
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
                    src="/images/seasonal-guides/djoudj-bird-sanctuary.jpg" 
                    alt="Migratory birds at Djoudj National Bird Sanctuary, Senegal" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Djoudj National Bird Sanctuary</h3>
                  <p className="text-muted-foreground mb-4">
                    A wetland paradise and UNESCO World Heritage Site that hosts over 3 million migratory birds, including pelicans, flamingos, and cormorants.
                  </p>
                  <div className="space-y-2">
                    <p><span className="font-medium">Best time:</span> November to April when migratory birds arrive from Europe.</p>
                    <p><span className="font-medium">Highlights:</span> White pelican colonies, African spoonbills, great egrets, boat safaris.</p>
                    <p><span className="font-medium">Avoid:</span> May to October when bird populations are significantly lower.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Bandia Reserve</h3>
                  <p className="text-muted-foreground mb-4">
                    A private wildlife reserve near Dakar that offers easily accessible wildlife viewing, particularly suitable for visitors with limited time.
                  </p>
                  <div className="space-y-2">
                    <p><span className="font-medium">Best time:</span> Year-round with good infrastructure, though November to May offers the most pleasant conditions.</p>
                    <p><span className="font-medium">Highlights:</span> White rhinos, giraffes, antelopes, crocodiles, easy access from Dakar.</p>
                    <p><span className="font-medium">Avoid:</span> No major season to avoid, though midday heat from March to May can be intense.</p>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src="/images/seasonal-guides/bandia-reserve.jpg" 
                    alt="Giraffes in Bandia Reserve, Senegal" 
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
                    <span><span className="font-medium">Dry Season:</span> Lightweight, breathable clothing, hat, sunglasses, high SPF sunscreen, insect repellent.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Wet Season:</span> Waterproof jacket, lightweight quick-dry clothing, waterproof bags for electronics.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Year-round:</span> Good quality binoculars (essential for bird watching), camera with zoom lens, field guides.</span>
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
                    <span><span className="font-medium">Malaria:</span> Present throughout Senegal, particularly in southern regions. Preventative medication recommended.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Vaccinations:</span> Yellow fever vaccination required for entry. Hepatitis A, typhoid also recommended.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Dehydration:</span> Major risk during hot dry season (March-May). Carry ample water on all excursions.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Safari Combinations</h3>
              <p className="mb-4">
                Senegal pairs well with other West African destinations for a comprehensive safari experience:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Senegal + The Gambia:</span> Perfect bird watching combination during Nov-Apr, with The Gambia's river and coastal habitats.</span>
                </li>
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Senegal + Ghana:</span> Combine Senegal's savannas with Ghana's forests during Dec-Feb for diverse ecosystems.</span>
                </li>
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">West African Circuit:</span> Combine Senegal, Guinea-Bissau, and Guinea during dry season for diverse wildlife and cultures.</span>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Plan Your Senegal Safari Adventure</h2>
            <p className="mb-6">
              Let our experienced local guides help you design the perfect Senegal safari itinerary based on your interests and the optimal season. Whether you're a passionate birder looking to visit Djoudj or seeking the elusive big cats of Niokolo-Koba, we can create your ideal West African adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Explore Senegal Safari Packages
              </Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" size="lg">
                Contact a Senegal Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 