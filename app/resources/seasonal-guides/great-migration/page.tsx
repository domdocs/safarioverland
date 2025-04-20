import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ChevronRight, CircleDot, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Great Migration Seasonal Guide | Safari Overland",
  description: "Month-by-month tracking of the Great Migration through Tanzania and Kenya, with the best viewing locations and times.",
  keywords: "Great Migration, Serengeti, Masai Mara, wildebeest migration, Kenya, Tanzania, river crossing, calving season, safari seasons",
}

export default function GreatMigrationGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Great Migration Seasonal Guide</h1>
        <p className="text-lg text-muted-foreground">
          Month-by-month tracking of the Great Migration through Tanzania and Kenya, with the best viewing locations and expert tips.
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
        <span className="text-foreground">Great Migration</span>
      </div>

      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px]">
          <Image 
            src="/images/seasonal-guides/kenya-migration.jpg" 
            alt="Wildebeest crossing the Mara River during the Great Migration" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                Nature's Greatest Wildlife Spectacle
              </h2>
              <p className="text-white/90 text-lg mb-4">
                Over 1.5 million wildebeest, 200,000 zebras, and 350,000 gazelles embark on an epic journey across the Serengeti-Mara ecosystem every year in search of fresh grazing and water.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Download Migration Calendar</Button>
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  View Migration Safaris
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Overview */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Understanding the Great Migration</h2>
          <p className="text-lg mb-6">
            The Great Migration is not a single event but a year-round movement of vast herds of wildebeest, zebra, and gazelles in a clockwise circuit across the Serengeti-Mara ecosystem, spanning Tanzania and Kenya. Driven by rainfall patterns and the resulting fresh grazing, these animals travel up to 1,000 km annually, facing predators, treacherous river crossings, and harsh landscapes.
          </p>
          <p className="text-lg mb-6">
            While the migration follows a general pattern, the exact timing can vary each year depending on rainfall. The information below provides a typical timeline, but flexibility in your safari planning is essential for witnessing this spectacular phenomenon.
          </p>
          
          <div className="bg-primary/10 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-3">Key Migration Events</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium">Calving Season (January-March):</span>
                  <p className="text-muted-foreground">Over 400,000 wildebeest calves are born in a synchronized birthing event in the southern Serengeti and Ndutu area.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium">Northward Migration (April-June):</span>
                  <p className="text-muted-foreground">Herds begin moving north and west through the central and western Serengeti, following the rainfall.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium">Mara River Crossings (July-October):</span>
                  <p className="text-muted-foreground">The most dramatic part of the migration, as herds cross the crocodile-infested Mara River to reach the Masai Mara.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium">Southward Return (November-December):</span>
                  <p className="text-muted-foreground">Herds move south again through eastern Serengeti towards the southern plains to begin the cycle anew.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Month-by-Month Guide */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Month-by-Month Migration Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                months: "January",
                location: "Southern Serengeti & Ndutu Area (Tanzania)",
                events: "Peak of calving season. Up to 8,000 wildebeest are born each day during a two-to-three-week period.",
                wildlife: "Huge concentrations of wildebeest with newborn calves. High predator activity, especially lions and cheetahs.",
                tips: "Book well in advance as this is a popular period. Lake Ndutu area offers the best viewing opportunities.",
                image: "/images/seasonal-guides/migration-jan.jpg"
              },
              {
                months: "February",
                location: "Southern Serengeti & Ndutu Area (Tanzania)",
                events: "Calving continues. Herds remain concentrated in the nutrient-rich plains of the southern Serengeti.",
                wildlife: "Large herds with young calves. Excellent predator sightings with frequent hunts.",
                tips: "Mobile tented camps in the Ndutu area provide the best access to the herds. Great for photography.",
                image: "/images/seasonal-guides/migration-feb.jpg"
              },
              {
                months: "March",
                location: "Southern to Central Serengeti (Tanzania)",
                events: "End of calving season. Herds begin to move northwards as short grass plains dry out.",
                wildlife: "Wildebeest herds start to form into long columns as they begin to move. Young calves are more mobile now.",
                tips: "Consider lodges in both southern and central Serengeti for flexibility. Excellent photography with dramatic skies.",
                image: "/images/seasonal-guides/migration-mar.jpg"
              },
              {
                months: "April",
                location: "Central Serengeti (Tanzania)",
                events: "Migration in transition. Herds continue moving northward into central Serengeti.",
                wildlife: "Long columns of wildebeest and zebra, often stretching for several kilometers.",
                tips: "Low season with fewer tourists and good value. Some rain may occur but typically won't impact viewing.",
                image: "/images/seasonal-guides/migration-apr.jpg"
              },
              {
                months: "May",
                location: "Central to Western Serengeti (Tanzania)",
                events: "Herds concentrate in the central and western corridors of Serengeti. Mating season begins.",
                wildlife: "Massive herds gathering, with males establishing territories and competing for females.",
                tips: "Excellent value month. Fewer tourists despite excellent wildlife viewing. Western Serengeti camps offer best access.",
                image: "/images/seasonal-guides/migration-may.jpg"
              },
              {
                months: "June",
                location: "Western Serengeti & Northern Serengeti (Tanzania)",
                events: "Herds begin moving towards the northern Serengeti. Some early crossings of the Grumeti River.",
                wildlife: "Spectacular river crossings at Grumeti. Massive herds spread across the western plains.",
                tips: "Book northern or western Serengeti camps. Balloon safaris offer spectacular views of the moving herds.",
                image: "/images/seasonal-guides/migration-jun.jpg"
              },
              {
                months: "July",
                location: "Northern Serengeti (Tanzania) & Masai Mara (Kenya)",
                events: "Early Mara River crossings begin. Herds arrive at the Kenya border and begin crossing into the Masai Mara.",
                wildlife: "Dramatic river crossings with crocodile action. Huge gatherings of wildebeest preparing to cross.",
                tips: "Northern Serengeti offers more exclusive viewing than the busier Masai Mara. Kogatende area is excellent.",
                image: "/images/seasonal-guides/migration-jul.jpg"
              },
              {
                months: "August",
                location: "Northern Serengeti (Tanzania) & Masai Mara (Kenya)",
                events: "Peak river crossing period. Multiple crossings at different points along the Mara River.",
                wildlife: "Spectacular crossings and intense predator action. Large crocodiles actively hunting at crossing points.",
                tips: "Prime time but very busy. Book at least a year in advance. Consider splitting time between northern Serengeti and Masai Mara.",
                image: "/images/seasonal-guides/migration-aug.jpg"
              },
              {
                months: "September",
                location: "Masai Mara (Kenya) & Northern Serengeti (Tanzania)",
                events: "Herds spread across the Mara. Continuous movement and river crossings as animals search for fresh grazing.",
                wildlife: "Excellent predator activity with abundant prey. Some river crossings continue.",
                tips: "Consider private conservancies around the Masai Mara for exclusive viewing away from crowds.",
                image: "/images/seasonal-guides/migration-sep.jpg"
              },
              {
                months: "October",
                location: "Masai Mara (Kenya) & Northern Serengeti (Tanzania)",
                events: "Herds begin moving southward as they respond to rainfall patterns. Some river crossings as they return to Tanzania.",
                wildlife: "More dispersed herds but still excellent game viewing. Final river crossings can be dramatic.",
                tips: "Northern Serengeti is less crowded than the Mara now, offering excellent value and good viewing.",
                image: "/images/seasonal-guides/migration-oct.jpg"
              },
              {
                months: "November",
                location: "Northern to Eastern Serengeti (Tanzania)",
                events: "Herds continue moving south through eastern Serengeti, following the short rains.",
                wildlife: "Dispersed but large herds moving quickly. Good general game viewing.",
                tips: "Consider central Serengeti lodges as herds move through. Short rains create beautiful green landscapes.",
                image: "/images/seasonal-guides/migration-nov.jpg"
              },
              {
                months: "December",
                location: "Eastern to Southern Serengeti (Tanzania)",
                events: "Herds arrive back in the southern plains of Serengeti, completing the annual cycle.",
                wildlife: "Large congregations forming in the southern Serengeti. Predators following the herds.",
                tips: "Southern Serengeti and Ndutu areas offer excellent viewing as herds gather before calving season.",
                image: "/images/seasonal-guides/migration-dec.jpg"
              },
            ].map((month) => (
              <Card key={month.months} className="overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="relative h-48 sm:h-auto">
                    <Image src={month.image} alt={`Great Migration in ${month.months}`} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="text-xl font-bold text-primary mb-2">{month.months}</div>
                    <div className="text-sm font-medium mb-1">Location:</div>
                    <p className="text-muted-foreground text-sm mb-2">{month.location}</p>
                    <div className="text-sm font-medium mb-1">Key Events:</div>
                    <p className="text-muted-foreground text-sm mb-2">{month.events}</p>
                    <div className="text-sm font-medium mb-1">Tips:</div>
                    <p className="text-muted-foreground text-sm">{month.tips}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Map */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Great Migration Route Map</h2>
          <div className="relative rounded-lg overflow-hidden h-[300px] md:h-[500px] mb-4">
            <Image 
              src="/images/seasonal-guides/migration-map.jpg" 
              alt="Map of the Great Migration route through Serengeti and Masai Mara" 
              fill 
              className="object-contain" 
            />
          </div>
          <p className="text-muted-foreground text-center italic">
            The Great Migration follows a clockwise route through the Serengeti-Mara ecosystem, driven by rainfall patterns and the search for fresh grazing.
          </p>
        </div>
      </section>

      {/* Viewing Tips */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Migration Viewing Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Best Viewing Practices</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Plan Ahead:</span> Book 12-18 months in advance for peak season (July-October) and at least 6 months for other times.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Stay Flexible:</span> Consider a mobile tented camp that follows the migration or split your stay between two locations.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Allow Time:</span> River crossings are unpredictable. Plan at least 3-4 days in an area to maximize chances of seeing a crossing.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Private Vehicles:</span> Consider booking a private safari vehicle for maximum flexibility to wait for river crossings.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Photography Tips</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Equipment:</span> Bring a versatile zoom lens (70-300mm minimum) and a wide-angle lens for landscape shots of massive herds.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Dust Protection:</span> Invest in good protection for your gear. Dust is prevalent, especially during dry season crossings.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Timing:</span> Early morning and late afternoon light provides the best conditions for dramatic migration shots.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span><span className="font-medium">Patience:</span> For river crossings, be prepared to wait. Setup your camera settings in advance to be ready when action starts.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Responsible Viewing</h3>
              <p className="mb-4">
                The Great Migration is a natural phenomenon that depends on the preservation of the ecosystem and wildlife corridors. Here's how to view it responsibly:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Choose Ethical Operators:</span> Select safari companies that follow responsible wildlife viewing guidelines and support conservation.</span>
                </li>
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Maintain Distance:</span> Don't crowd animals at river crossings or pressure guides to get too close. This can disrupt natural behavior.</span>
                </li>
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Support Conservation:</span> Consider adding a conservation experience or donation to your safari to support the ecosystem.</span>
                </li>
                <li className="flex items-start">
                  <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Stay on Designated Roads:</span> Especially in the Masai Mara where off-roading is prohibited in the main reserve.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Migration Accommodations */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Where to Stay</h2>
          <p className="text-lg mb-6 text-center">
            Choosing the right accommodation in the right location is crucial for maximizing your migration experience. Here are our top recommendations for each phase of the migration:
          </p>
          
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Calving Season (January-March)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Mobile Tented Camps in Ndutu:</span>
                      <p className="text-muted-foreground">Seasonal camps that position themselves in the heart of the action. These move with the migration and provide an authentic safari experience.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Southern Serengeti Lodges:</span>
                      <p className="text-muted-foreground">Permanent lodges in the southern Serengeti offer more amenities while still providing good access to the calving grounds.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Western & Northern Serengeti (May-July)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Western Corridor Camps:</span>
                      <p className="text-muted-foreground">Camps around the Grumeti River offer excellent viewing of the herds as they move through the Western Corridor.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Northern Serengeti Mobile Camps:</span>
                      <p className="text-muted-foreground">Seasonal camps in the Kogatende area provide front-row seats to Mara River crossings on the Tanzanian side.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Masai Mara (August-October)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Mara River Camps:</span>
                      <p className="text-muted-foreground">Camps located near the Mara River offer the best opportunities to witness river crossings. Look for options in the Mara Triangle.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Private Conservancies:</span>
                      <p className="text-muted-foreground">Camps in the private conservancies surrounding the Masai Mara offer more exclusive experiences away from the crowds.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="bg-primary text-white p-8 md:p-12 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Plan Your Great Migration Safari</h2>
            <p className="mb-6">
              Let our experienced safari specialists help you design the perfect Great Migration safari based on your travel dates, preferences, and budget. With expert guidance, we'll ensure you're in the right place at the right time to witness nature's greatest wildlife spectacle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                View Migration Safari Packages
              </Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" size="lg">
                Contact a Migration Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center my-10">
        <Link 
          href="/resources/seasonal-guides" 
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Seasonal Guides
        </Link>
      </div>
    </div>
  )
} 