import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Shield, Leaf, Calendar, Download, ChevronRight } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[300px] md:h-[400px] w-full">
          <Image
            src="/images/resources-hero.jpg"
            alt="African safari landscape with wildlife at sunset"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-32 mb-12 text-white z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Safari Resources</h1>
            <p className="text-lg md:text-xl max-w-3xl">
              Comprehensive guides, tips, and information to help you plan the perfect African safari adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Resource Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Essential Safari Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/resources/planning-guides">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Planning Guides</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive guides to help you plan every aspect of your safari adventure, from budgeting to
                    packing.
                  </p>
                  <Button variant="outline" className="mt-auto">
                    View Guides
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/resources/safety-tips">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Safety Tips</h3>
                  <p className="text-muted-foreground mb-4">
                    Essential safety information to ensure a secure and enjoyable safari experience in the African
                    wilderness.
                  </p>
                  <Button variant="outline" className="mt-auto">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/resources/conservation">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Conservation</h3>
                  <p className="text-muted-foreground mb-4">
                    Information about wildlife conservation efforts across Africa and how responsible tourism can make a
                    positive impact.
                  </p>
                  <Button variant="outline" className="mt-auto">
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/resources/seasonal-guides">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Seasonal Guides</h3>
                  <p className="text-muted-foreground mb-4">
                    Detailed information about the best times to visit different safari destinations based on wildlife
                    viewing and weather.
                  </p>
                  <Button variant="outline" className="mt-auto">
                    View Guides
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Featured Resource */}
        <section className="mb-16">
          <div className="bg-muted rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ultimate Safari Planning Checklist</h2>
                <p className="text-muted-foreground mb-6">
                  Our comprehensive checklist covers everything you need to prepare for your African safari adventure,
                  from booking accommodations to packing the right gear. Download it for free and ensure you're fully
                  prepared for your journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" /> Download Checklist
                  </Button>
                  <Button variant="outline">View All Checklists</Button>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Safari Checklist"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Resource Articles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Latest Resource Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "What to Pack for Your Safari Adventure",
                category: "Planning Guides",
                image: "/placeholder.svg?height=300&width=500",
                excerpt:
                  "A comprehensive guide to packing for different types of safaris, climates, and destinations across Africa.",
                link: "/resources/planning-guides/what-to-pack",
              },
              {
                title: "Understanding Wildlife Behavior on Safari",
                category: "Safety Tips",
                image: "/placeholder.svg?height=300&width=500",
                excerpt:
                  "Learn about animal behavior patterns to enhance your wildlife viewing experience and ensure safety during game drives.",
                link: "/resources/safety-tips/wildlife-behavior",
              },
              {
                title: "The Great Migration: Timing Your Visit",
                category: "Seasonal Guides",
                image: "/placeholder.svg?height=300&width=500",
                excerpt:
                  "A month-by-month guide to witnessing the Great Migration across the Serengeti and Masai Mara ecosystems.",
                link: "/resources/seasonal-guides/great-migration",
              },
            ].map((article) => (
              <Card key={article.title} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">{article.category}</div>
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <Link href={article.link} className="text-primary font-medium hover:underline flex items-center">
                    Read More <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              View All Articles
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="bg-secondary text-white p-8 md:p-12 rounded-lg">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  {
                    question: "What is the best time of year for an African safari?",
                    answer:
                      "The best time depends on your destination and what you want to see. Generally, the dry season (May to October) offers excellent wildlife viewing as animals gather around water sources. However, the green season (November to April) has its own advantages including lush landscapes, newborn animals, and fewer tourists.",
                  },
                  {
                    question: "How much does a safari typically cost?",
                    answer:
                      "Safari costs vary widely depending on the destination, accommodation type, and activities. Budget safaris can start from $150 per day, mid-range options from $350 per day, and luxury experiences from $750 per day. Our planning guides provide detailed budget information for different types of safaris.",
                  },
                  {
                    question: "Is it safe to go on safari with children?",
                    answer:
                      "Many safari destinations and lodges welcome families with children, though age restrictions may apply for certain activities. Family-friendly safaris typically offer specialized programs and accommodations for children. Our family safari guide provides detailed information on the best destinations and lodges for travelers with children.",
                  },
                ].map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="secondary" className="bg-white text-secondary hover:bg-white/90">
                  View All FAQs
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section>
          <div className="bg-primary/10 rounded-lg p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with Safari Insights</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest safari tips, seasonal updates, and conservation news delivered
              directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md border border-input bg-background"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
