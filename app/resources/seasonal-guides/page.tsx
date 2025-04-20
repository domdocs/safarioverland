import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Sun, CloudRain, ChevronRight } from "lucide-react"

export default function SeasonalGuidesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Seasonal Safari Guides</h1>
        <p className="text-lg text-muted-foreground">
          Detailed information about the best times to visit different safari destinations based on wildlife viewing,
          weather conditions, and special events.
        </p>
      </div>

      {/* Resource Navigation */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <Link href="/resources">
          <Button variant="outline">All Resources</Button>
        </Link>
        <Link href="/resources/planning-guides">
          <Button variant="outline">Planning Guides</Button>
        </Link>
        <Link href="/resources/safety-tips">
          <Button variant="outline">Safety Tips</Button>
        </Link>
        <Link href="/resources/conservation">
          <Button variant="outline">Conservation</Button>
        </Link>
        <Link href="/resources/seasonal-guides">
          <Button variant="default">Seasonal Guides</Button>
        </Link>
      </div>

      {/* Seasonal Overview */}
      <section className="mb-16">
        <div className="bg-muted rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Safari Seasons</h2>
              <p className="text-muted-foreground mb-6">
                Timing is crucial for an optimal safari experience. Africa's safari destinations have distinct seasons
                that dramatically affect wildlife viewing, landscapes, and overall experience. Our seasonal guides help
                you choose the perfect time for your safari based on your interests and preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button>Download Seasonal Calendar</Button>
                <Button variant="outline">View Wildlife Events</Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto">
              <Image src="/images/seasonal-guides/safari-seasons.jpg" alt="Safari Seasons" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Season Types */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Safari Season Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Sun className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dry Season</h3>
              <p className="text-muted-foreground mb-4">
                The dry season (typically May to October) offers excellent wildlife viewing as animals gather around
                limited water sources. Vegetation is sparse, making animals easier to spot. This is generally considered
                the peak safari season.
              </p>
              <div className="mt-auto">
                <span className="text-sm font-medium">Pros:</span>
                <ul className="text-sm text-muted-foreground mb-2">
                  <li>Best wildlife viewing</li>
                  <li>Less mosquitoes</li>
                  <li>Comfortable temperatures</li>
                </ul>
                <span className="text-sm font-medium">Cons:</span>
                <ul className="text-sm text-muted-foreground">
                  <li>Higher prices</li>
                  <li>More crowded</li>
                  <li>Dusty conditions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <CloudRain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Green Season</h3>
              <p className="text-muted-foreground mb-4">
                The green or wet season (typically November to April) brings lush landscapes, newborn animals, and
                migrating birds. While wildlife can be harder to spot in dense vegetation, this season offers unique
                experiences and better value.
              </p>
              <div className="mt-auto">
                <span className="text-sm font-medium">Pros:</span>
                <ul className="text-sm text-muted-foreground mb-2">
                  <li>Lower prices</li>
                  <li>Fewer tourists</li>
                  <li>Beautiful green landscapes</li>
                  <li>Newborn animals</li>
                </ul>
                <span className="text-sm font-medium">Cons:</span>
                <ul className="text-sm text-muted-foreground">
                  <li>Some roads may be impassable</li>
                  <li>Wildlife more dispersed</li>
                  <li>Afternoon rain showers</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Shoulder Season</h3>
              <p className="text-muted-foreground mb-4">
                The transitional months between wet and dry seasons (typically April-May and November) offer a balance
                of good wildlife viewing, pleasant weather, and better value. These periods can be ideal for travelers
                seeking to avoid crowds and high prices.
              </p>
              <div className="mt-auto">
                <span className="text-sm font-medium">Pros:</span>
                <ul className="text-sm text-muted-foreground mb-2">
                  <li>Good value</li>
                  <li>Moderate crowds</li>
                  <li>Pleasant weather</li>
                  <li>Good photography conditions</li>
                </ul>
                <span className="text-sm font-medium">Cons:</span>
                <ul className="text-sm text-muted-foreground">
                  <li>Unpredictable weather</li>
                  <li>Variable wildlife viewing</li>
                  <li>Some facilities may be closed</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Regional Seasonal Guides */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Regional Seasonal Guides</h2>
        <Tabs defaultValue="east-africa">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="east-africa">East Africa</TabsTrigger>
            <TabsTrigger value="southern-africa">Southern Africa</TabsTrigger>
            <TabsTrigger value="west-africa">West Africa</TabsTrigger>
            <TabsTrigger value="north-africa">North Africa</TabsTrigger>
          </TabsList>

          <TabsContent value="east-africa">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Kenya Seasonal Guide",
                  image: "/images/seasonal-guides/travel-guide-kenya.jpg",
                  excerpt:
                    "Month-by-month guide to Kenya's safari seasons, including the Great Migration in the Masai Mara.",
                  link: "/resources/seasonal-guides/kenya",
                },
                {
                  title: "Tanzania Seasonal Guide",
                  image: "/images/seasonal-guides/travel-guide-tanzania.jpg",
                  excerpt:
                    "Detailed seasonal information for Tanzania's diverse safari destinations, from Serengeti to Selous.",
                  link: "/resources/seasonal-guides/tanzania",
                },
                {
                  title: "Uganda & Rwanda Seasonal Guide",
                  image: "/images/seasonal-guides/travel-guide-uganda-rwanda.jpg",
                  excerpt:
                    "Best times for gorilla trekking and wildlife viewing in Uganda and Rwanda throughout the year.",
                  link: "/resources/seasonal-guides/uganda-rwanda",
                },
              ].map((guide) => (
                <Card key={guide.title} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={guide.image} alt={guide.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                    <p className="text-muted-foreground mb-4">{guide.excerpt}</p>
                    <Link href={guide.link} className="text-primary font-medium hover:underline flex items-center">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="southern-africa">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "South Africa Seasonal Guide",
                  image: "/images/seasonal-guides/travel-guide-south-africa.jpg",
                  excerpt:
                    "Month-by-month guide to South Africa's diverse safari regions, including Kruger and private reserves.",
                  link: "/resources/seasonal-guides/south-africa",
                },
                {
                  title: "Botswana Seasonal Guide",
                  image: "/images/seasonal-guides/travel-guide-botswana.jpg",
                  excerpt:
                    "Detailed information on Botswana's dramatic seasonal changes, from dry season to Okavango floods.",
                  link: "/resources/seasonal-guides/botswana",
                },
                {
                  title: "Zimbabwe & Zambia Seasonal Guide",
                  image: "/images/seasonal-guides/travel-guide-zambia-zimbabwe.jpg",
                  excerpt:
                    "Best times for visiting Victoria Falls and the wildlife-rich national parks of Zimbabwe and Zambia.",
                  link: "/resources/seasonal-guides/zimbabwe-zambia",
                },
              ].map((guide) => (
                <Card key={guide.title} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={guide.image} alt={guide.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                    <p className="text-muted-foreground mb-4">{guide.excerpt}</p>
                    <Link href={guide.link} className="text-primary font-medium hover:underline flex items-center">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="west-africa">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "West Africa Safari Seasons",
                  image: "/images/seasonal-guides/travel-guide-west-africa.jpg",
                  excerpt:
                    "Comprehensive guide to the best times for wildlife viewing across West Africa's diverse safari destinations.",
                  link: "/resources/seasonal-guides/west-africa",
                },
                {
                  title: "Ghana Seasonal Guide",
                  image: "/images/seasonal-guides/travel-guide-ghana.jpg",
                  excerpt:
                    "Optimal times for wildlife viewing and cultural experiences in Ghana's emerging safari destinations.",
                  link: "/resources/seasonal-guides/ghana-senegal",
                },
                {
                  title: "Senegal Seasonal Guide",
                  image: "/images/seasonal-guides/travel-guide-senegal.jpg",
                  excerpt:
                    "Seasonal information for visiting national parks and wildlife reserves in Senegal.",
                  link: "/resources/seasonal-guides/nigeria-benin",
                },
              ].map((guide) => (
                <Card key={guide.title} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={guide.image} alt={guide.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                    <p className="text-muted-foreground mb-4">{guide.excerpt}</p>
                    <Link href={guide.link} className="text-primary font-medium hover:underline flex items-center">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="north-africa">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Morocco Seasonal Guide",
                  image: "/images/seasonal-guides/travel-guide-morocco.jpg",
                  excerpt:
                    "Best times for desert safaris, mountain trekking, and wildlife viewing in Morocco's diverse landscapes.",
                  link: "/resources/seasonal-guides/morocco",
                },
                {
                  title: "Egypt Desert Safari Seasons",
                  image: "/images/seasonal-guides/travel-guide-egypt.jpg",
                  excerpt: "Optimal times for exploring Egypt's Western Desert, oases, and unique desert wildlife.",
                  link: "/resources/seasonal-guides/egypt",
                },
                {
                  title: "North Africa Bird Migration Guide",
                  image: "/images/seasonal-guides/travel-guide-north-africa-birds.jpg",
                  excerpt: "Seasonal guide to bird migrations across North Africa's wetlands and coastal areas.",
                  link: "/resources/seasonal-guides/north-africa-birds",
                },
              ].map((guide) => (
                <Card key={guide.title} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={guide.image} alt={guide.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                    <p className="text-muted-foreground mb-4">{guide.excerpt}</p>
                    <Link href={guide.link} className="text-primary font-medium hover:underline flex items-center">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Wildlife Events Calendar */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Wildlife Events Calendar</h2>
        <div className="bg-muted p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                season: "January-March",
                events: [
                  "Calving season in Serengeti & Ngorongoro (Tanzania)",
                  "Green season in Botswana's Okavango Delta",
                  "Peak bird watching in many regions",
                  "Whale shark season in Tanzania",
                ],
              },
              {
                season: "April-June",
                events: [
                  "Start of Great Migration in Serengeti",
                  "Okavango Delta floods begin (Botswana)",
                  "Victoria Falls at peak flow (Zimbabwe/Zambia)",
                  "Low season begins with great value opportunities",
                ],
              },
              {
                season: "July-September",
                events: [
                  "Great Migration river crossings in Masai Mara (Kenya)",
                  "Peak dry season across Southern Africa",
                  "Excellent predator viewing in most regions",
                  "Whale watching along South Africa's coast",
                ],
              },
              {
                season: "October-December",
                events: [
                  "Short rains begin in East Africa",
                  "Migration returns to Tanzania",
                  "Summer arrives in Southern Africa",
                  "Baby animals appear in many regions",
                ],
              },
            ].map((quarter) => (
              <Card key={quarter.season}>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2">{quarter.season}</h3>
                  <ul className="space-y-2 text-sm">
                    {quarter.events.map((event, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{event}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Interest Seasonal Guides */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Special Interest Seasonal Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Great Migration Seasonal Guide",
              image: "/images/seasonal-guides/kenya-migration.jpg",
              excerpt:
                "Month-by-month tracking of the Great Migration through Tanzania and Kenya, with the best viewing locations.",
              link: "/resources/seasonal-guides/great-migration",
            },
            {
              title: "Bird Watching Seasonal Guide",
              image: "/images/seasonal-guides/travel-guide-west-africa-birds.jpg",
              excerpt:
                "Optimal times for bird watching across Africa, including migratory seasons and endemic species.",
              link: "/resources/seasonal-guides/bird-watching",
            },
            {
              title: "Photography Seasonal Guide",
              image: "/images/seasonal-guides/safari-seasons.jpg",
              excerpt:
                "Best seasons for wildlife photography in different regions, considering light, landscapes, and animal behavior.",
              link: "/resources/seasonal-guides/photography",
            },
            {
              title: "Budget Travel Seasonal Guide",
              image: "/images/seasonal-guides/travel-guide-botswana.jpg",
              excerpt:
                "How to maximize value by traveling during shoulder and green seasons while still enjoying excellent experiences.",
              link: "/resources/seasonal-guides/budget-travel",
            },
            {
              title: "Family Safari Seasonal Guide",
              image: "/images/seasonal-guides/travel-guide-south-africa.jpg",
              excerpt:
                "Best times for family safaris, considering school holidays, weather conditions, and child-friendly activities.",
              link: "/resources/seasonal-guides/family-safaris",
            },
            {
              title: "Gorilla Trekking Seasonal Guide",
              image: "/images/seasonal-guides/travel-guide-uganda-rwanda.jpg",
              excerpt:
                "Optimal times for gorilla trekking in Uganda, Rwanda, and DRC, with seasonal considerations for each location.",
              link: "/resources/seasonal-guides/gorilla-trekking",
            },
          ].map((guide) => (
            <Card key={guide.title} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={guide.image} alt={guide.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                <p className="text-muted-foreground mb-4">{guide.excerpt}</p>
                <Link href={guide.link} className="text-primary font-medium hover:underline flex items-center">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Seasonal Planning Assistance */}
      <section>
        <div className="bg-primary text-white p-8 md:p-12 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help Planning Your Safari Timing?</h2>
            <p className="mb-6">
              Our team of safari experts based in Victoria Falls, Zimbabwe can help you determine the best time for your
              safari based on your interests, budget, and desired experiences. With firsthand knowledge of seasonal
              conditions across Africa, we'll ensure you visit at the optimal time.
            </p>
            <Button variant="secondary" size="lg">
              Get Personalized Seasonal Advice
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
