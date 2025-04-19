import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, ChevronRight, DollarSign, Luggage, Calendar, Users, Compass } from "lucide-react"

export default function PlanningGuidesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Safari Planning Guides</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive resources to help you plan every aspect of your African safari adventure, from choosing the
          right destination to packing the perfect gear.
        </p>
      </div>

      {/* Resource Navigation */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <Link href="/resources">
          <Button variant="outline">All Resources</Button>
        </Link>
        <Link href="/resources/planning-guides">
          <Button variant="default">Planning Guides</Button>
        </Link>
        <Link href="/resources/safety-tips">
          <Button variant="outline">Safety Tips</Button>
        </Link>
        <Link href="/resources/conservation">
          <Button variant="outline">Conservation</Button>
        </Link>
        <Link href="/resources/seasonal-guides">
          <Button variant="outline">Seasonal Guides</Button>
        </Link>
      </div>

      {/* Featured Guide */}
      <section className="mb-16">
        <div className="bg-muted rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">First-Time Safari Planner</h2>
              <p className="text-muted-foreground mb-6">
                Our comprehensive guide for first-time safari travelers covers everything you need to know, from
                choosing the right destination and time of year to budgeting, packing, and preparing for your adventure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> Download Guide
                </Button>
                <Button variant="outline">Read Online</Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto">
              <Image
                src="/images/planning-guides/first-time-safari-guide.jpg"
                alt="First-Time Safari Guide showing excited travelers on a safari vehicle"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Planning Categories */}
      <section className="mb-16">
        <Tabs defaultValue="destinations">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="destinations" className="flex items-center gap-2">
              <Compass className="h-4 w-4" /> Destinations
            </TabsTrigger>
            <TabsTrigger value="budgeting" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Budgeting
            </TabsTrigger>
            <TabsTrigger value="packing" className="flex items-center gap-2">
              <Luggage className="h-4 w-4" /> Packing
            </TabsTrigger>
            <TabsTrigger value="timing" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Timing
            </TabsTrigger>
            <TabsTrigger value="travelers" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Travelers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="destinations">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Choosing the Right Safari Destination",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "A comprehensive comparison of safari destinations across Africa to help you choose the perfect location for your interests and budget.",
                  link: "/resources/planning-guides/choosing-destinations",
                },
                {
                  title: "East Africa vs. Southern Africa",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "An in-depth comparison of East Africa and Southern Africa safari experiences, highlighting the unique features of each region.",
                  link: "/resources/planning-guides/east-vs-southern",
                },
                {
                  title: "Off-the-Beaten-Path Safari Destinations",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Discover lesser-known but equally rewarding safari destinations for travelers seeking unique experiences away from the crowds.",
                  link: "/resources/planning-guides/off-the-beaten-path",
                },
              ].map((guide) => (
                <Card key={guide.title} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
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

          <TabsContent value="budgeting">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Safari Budgeting Guide",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "A comprehensive guide to budgeting for your safari, with cost breakdowns for different types of safaris and destinations.",
                  link: "/resources/planning-guides/budgeting",
                },
                {
                  title: "Luxury vs. Budget Safaris",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Compare luxury and budget safari options to find the right balance of comfort and value for your African adventure.",
                  link: "/resources/planning-guides/luxury-vs-budget",
                },
                {
                  title: "Hidden Costs of Safari Travel",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Be prepared for all expenses with our guide to the often overlooked costs associated with safari travel.",
                  link: "/resources/planning-guides/hidden-costs",
                },
              ].map((guide) => (
                <Card key={guide.title} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
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

          <TabsContent value="packing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Ultimate Safari Packing List",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "A comprehensive packing list for safari travelers, with recommendations for clothing, gear, and essentials.",
                  link: "/resources/planning-guides/packing-list",
                },
                {
                  title: "Photography Gear for Safari",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Expert recommendations for photography equipment to capture your safari memories, from professional setups to smartphone tips.",
                  link: "/resources/planning-guides/photography-gear",
                },
                {
                  title: "Seasonal Packing Guide",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Adjust your packing list based on the season and destination with our specialized seasonal packing guides.",
                  link: "/resources/planning-guides/seasonal-packing",
                },
              ].map((guide) => (
                <Card key={guide.title} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
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

          <TabsContent value="timing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Best Time to Visit Each Safari Destination",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "A month-by-month guide to the optimal times for visiting different safari destinations across Africa.",
                  link: "/resources/planning-guides/best-times",
                },
                {
                  title: "Planning Around Wildlife Events",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Time your safari to witness spectacular wildlife events like the Great Migration, calving season, or bird migrations.",
                  link: "/resources/planning-guides/wildlife-events",
                },
                {
                  title: "Green Season Safari Benefits",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Discover the advantages of traveling during the less crowded green season, from lower prices to unique wildlife viewing.",
                  link: "/resources/planning-guides/green-season",
                },
              ].map((guide) => (
                <Card key={guide.title} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
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

          <TabsContent value="travelers">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Family Safari Guide",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Everything you need to know about planning a safari with children, including family-friendly destinations and accommodations.",
                  link: "/resources/planning-guides/family-safaris",
                },
                {
                  title: "Solo Traveler Safari Tips",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Practical advice for solo travelers on safari, from choosing the right tour to safety considerations and social opportunities.",
                  link: "/resources/planning-guides/solo-travel",
                },
                {
                  title: "Accessible Safari Options",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Information on safari options for travelers with mobility challenges or other accessibility needs.",
                  link: "/resources/planning-guides/accessible-safaris",
                },
              ].map((guide) => (
                <Card key={guide.title} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
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

      {/* Downloadable Resources */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Downloadable Planning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Safari Planning Checklist",
              description: "A comprehensive checklist to ensure you don't miss any important planning steps.",
              icon: <Download className="h-8 w-8 text-primary" />,
            },
            {
              title: "Safari Budget Calculator",
              description: "An Excel spreadsheet to help you estimate and track your safari expenses.",
              icon: <DollarSign className="h-8 w-8 text-primary" />,
            },
            {
              title: "Ultimate Packing List",
              description: "A printable packing list customized for safari travel in different regions and seasons.",
              icon: <Luggage className="h-8 w-8 text-primary" />,
            },
            {
              title: "Safari Calendar Planner",
              description: "A calendar tool to help you identify the best times for specific wildlife experiences.",
              icon: <Calendar className="h-8 w-8 text-primary" />,
            },
            {
              title: "Destination Comparison Chart",
              description: "A detailed comparison of major safari destinations to help you choose the right one.",
              icon: <Compass className="h-8 w-8 text-primary" />,
            },
            {
              title: "Family Safari Planner",
              description: "A specialized planning guide for families traveling with children of different ages.",
              icon: <Users className="h-8 w-8 text-primary" />,
            },
          ].map((resource) => (
            <Card key={resource.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <Button variant="outline" className="mt-auto">
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Expert Planning Assistance */}
      <section>
        <div className="bg-primary text-white p-8 md:p-12 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Personalized Planning Help?</h2>
            <p className="mb-6">
              Our team of safari experts based in Victoria Falls, Zimbabwe is available to provide personalized planning
              assistance for your African adventure. Whether you have specific questions or need comprehensive planning
              support, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Contact Our Experts
              </Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" size="lg">
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
