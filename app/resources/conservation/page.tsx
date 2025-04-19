import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Users, DollarSign, Footprints, ChevronRight } from "lucide-react"

export default function ConservationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Conservation Information</h1>
        <p className="text-lg text-muted-foreground">
          Learn about wildlife conservation efforts across Africa and how responsible tourism can make a positive impact
          on preserving the continent's natural heritage.
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
          <Button variant="default">Conservation</Button>
        </Link>
        <Link href="/resources/seasonal-guides">
          <Button variant="outline">Seasonal Guides</Button>
        </Link>
        <Link href="/resources/conservation/success-stories/zimbabwe-rhinos">
          <Button variant="outline">Zimbabwe Rhinos Success Stories</Button>
        </Link>
      </div>

      {/* Conservation Overview */}
      <section className="mb-16">
        <div className="bg-muted rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Safari Tourism & Conservation</h2>
              <p className="text-muted-foreground mb-6">
                Safari tourism plays a vital role in wildlife conservation across Africa. When done responsibly, it
                provides economic incentives for protecting natural habitats, supports anti-poaching efforts, and
                creates sustainable livelihoods for local communities.
              </p>
              <p className="text-muted-foreground mb-6">
                By choosing responsible safari operators and practicing ethical tourism, you can ensure your adventure
                contributes positively to conservation efforts and helps preserve Africa's incredible biodiversity for
                future generations.
              </p>
              <Button>Our Conservation Commitment</Button>
            </div>
            <div className="relative h-64 md:h-auto">
              <Image 
                src="/images/conservation/conservation-overview.jpg" 
                alt="Conservation rangers monitoring wildlife in a protected area" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conservation Categories */}
      <section className="mb-16">
        <Tabs defaultValue="wildlife">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="wildlife" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" /> Wildlife
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Community
            </TabsTrigger>
            <TabsTrigger value="economic" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Economic
            </TabsTrigger>
            <TabsTrigger value="traveler" className="flex items-center gap-2">
              <Footprints className="h-4 w-4" /> Traveler Impact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wildlife">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Endangered Species Protection",
                  image: "/images/conservation/wildlife/endangered-species.jpg",
                  excerpt:
                    "Learn about efforts to protect Africa's most endangered species and how safari tourism supports these initiatives.",
                  link: "/resources/conservation/endangered-species",
                },
                {
                  title: "Anti-Poaching Initiatives",
                  image: "/images/conservation/wildlife/anti-poaching.jpg",
                  excerpt:
                    "Discover how safari operators and conservation organizations are working together to combat poaching.",
                  link: "/resources/conservation/anti-poaching",
                },
                {
                  title: "Habitat Preservation",
                  image: "/images/conservation/wildlife/habitat-preservation.jpg",
                  excerpt:
                    "Understand the importance of preserving natural habitats and corridors for wildlife movement across Africa.",
                  link: "/resources/conservation/habitat-preservation",
                },
              ].map((article) => (
                <Card key={article.title} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <Link href={article.link} className="text-primary font-medium hover:underline flex items-center">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Community-Based Conservation",
                  image: "/images/conservation/community/community-conservation.jpg",
                  excerpt:
                    "How local communities are becoming stewards of wildlife through innovative conservation programs.",
                  link: "/resources/conservation/community-conservation",
                },
                {
                  title: "Cultural Preservation",
                  image: "/images/conservation/community/cultural-preservation.jpg",
                  excerpt:
                    "The importance of preserving traditional knowledge and cultural practices in conservation efforts.",
                  link: "/resources/conservation/cultural-preservation",
                },
                {
                  title: "Education & Awareness",
                  image: "/images/conservation/community/conservation-education.jpg",
                  excerpt:
                    "How conservation education programs are creating the next generation of wildlife stewards in Africa.",
                  link: "/resources/conservation/education-awareness",
                },
              ].map((article) => (
                <Card key={article.title} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <Link href={article.link} className="text-primary font-medium hover:underline flex items-center">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="economic">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "The Economics of Conservation",
                  image: "/images/conservation/economic/economics-of-conservation.jpg",
                  excerpt:
                    "Understanding how tourism creates economic incentives for wildlife conservation across Africa.",
                  link: "/resources/conservation/economics",
                },
                {
                  title: "Sustainable Tourism Models",
                  image: "/images/conservation/economic/sustainable-tourism.jpg",
                  excerpt:
                    "Innovative approaches to sustainable tourism that maximize conservation benefits while minimizing impacts.",
                  link: "/resources/conservation/sustainable-tourism",
                },
                {
                  title: "Conservation Funding",
                  image: "/images/conservation/economic/conservation-funding.jpg",
                  excerpt:
                    "How safari tourism directly and indirectly funds conservation efforts across the continent.",
                  link: "/resources/conservation/funding",
                },
              ].map((article) => (
                <Card key={article.title} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <Link href={article.link} className="text-primary font-medium hover:underline flex items-center">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="traveler">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Responsible Safari Practices",
                  image: "/images/conservation/traveler/responsible-safari.jpg",
                  excerpt: "Practical guidelines for travelers to minimize their environmental impact while on safari.",
                  link: "/resources/conservation/responsible-practices",
                },
                {
                  title: "Choosing Ethical Operators",
                  image: "/images/conservation/traveler/ethical-operators.jpg",
                  excerpt:
                    "How to identify and select safari operators with strong conservation and community commitments.",
                  link: "/resources/conservation/ethical-operators",
                },
                {
                  title: "Beyond Your Safari",
                  image: "/images/conservation/traveler/beyond-your-safari.jpg",
                  excerpt: "Ways to continue supporting African conservation efforts after your safari adventure ends.",
                  link: "/resources/conservation/beyond-safari",
                },
              ].map((article) => (
                <Card key={article.title} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <Link href={article.link} className="text-primary font-medium hover:underline flex items-center">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Conservation Success Stories */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Conservation Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Rhino Conservation in Zimbabwe",
              location: "Matobo National Park, Zimbabwe",
              image: "/images/success-stories/rhino-conservation.jpg",
              excerpt:
                "How community involvement and tourism have helped rhino populations recover in Zimbabwe's Matobo National Park.",
              link: "/resources/conservation/success-stories/zimbabwe-rhinos",
            },
            {
              title: "Mountain Gorilla Recovery",
              location: "Virunga Mountains, Rwanda/Uganda",
              image: "/images/success-stories/gorilla-recovery.jpg",
              excerpt:
                "The remarkable story of how mountain gorilla populations have more than doubled through conservation efforts supported by tourism.",
              link: "/resources/conservation/success-stories/mountain-gorillas",
            },
            {
              title: "Elephant Corridors in Kenya",
              location: "Amboseli-Tsavo Ecosystem, Kenya",
              image: "/images/success-stories/elephant-corridor.jpg",
              excerpt:
                "How strategic land conservation has restored vital elephant migration corridors between national parks in Kenya.",
              link: "/resources/conservation/success-stories/kenya-corridors",
            },
            {
              title: "Community Conservation in Namibia",
              location: "Namibian Conservancies",
              image: "/images/success-stories/namib-community.jpg",
              excerpt:
                "Namibia's innovative conservancy model that has put wildlife management in the hands of local communities with remarkable results.",
              link: "/resources/conservation/success-stories/namibia-conservancies",
            },
          ].map((story) => (
            <Card key={story.title} className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="relative h-48 sm:h-auto">
                  <Image src={story.image || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-primary font-medium mb-1">{story.location}</div>
                  <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                  <p className="text-muted-foreground mb-4">{story.excerpt}</p>
                  <Link href={story.link} className="text-primary font-medium hover:underline flex items-center">
                    Read Full Story <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            View All Success Stories
          </Button>
        </div>
      </section>

      {/* Conservation Organizations */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Key Conservation Organizations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "African Wildlife Foundation",
              logo: "/images/organisations/african-wildlife-foundation.jpg", 
              link: "https://www.awf.org/",
            },
            {
              name: "African Parks",
              logo: "/images/organisations/african-parks.png",
              link: "https://www.africanparks.org/",
            },
            {
              name: "Wildlife Conservation Society",
              logo: "/images/organisations/wildlife-conservation-society.jpg", 
              link: "https://www.wcs.org/",
            },
            {
              name: "World Wildlife Fund",
              logo: "/images/organisations/world-wildlife-fund.png",
              link: "https://www.worldwildlife.org/",
            },
            {
              name: "Save the Rhino",
              logo: "/images/organisations/save-the-rhino.png",
              link: "https://www.savetherhino.org/",
            },
            {
              name: "Cheetah Conservation Fund",
              logo: "/images/organisations/cheetah-conservation-fund.jpg", 
              link: "https://cheetah.org/",
            },
            {
              name: "Painted Dog Conservation",
              logo: "/images/organisations/painted-dog-conservation.png",
              link: "https://www.painteddogresearch.org/",
            },
            {
              name: "Gorilla Doctors",
              logo: "/images/organisations/gorilla-doctors.png",
              link: "https://www.gorilladoctors.org/",
            },
          ].map((org) => (
            <Link key={org.name} href={org.link} target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 mb-4">
                    <Image 
                      src={org.logo} 
                      alt={org.name} 
                      width={96}
                      height={96}
                      className="object-contain" 
                      unoptimized
                      priority
                    />
                  </div>
                  <h3 className="font-medium text-sm">{org.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Support Conservation */}
      <section>
        <div className="bg-primary text-white p-8 md:p-12 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Support Conservation Efforts</h2>
            <p className="mb-6">
              At Safari Overland, we're committed to supporting conservation efforts across Africa. A portion of our
              booking fees goes directly to wildlife conservation and community development projects in the regions
              where we operate.
            </p>
            <p className="mb-6">
              By booking through our platform, you're already making a positive impact. Want to do more? Consider
              donating directly to one of our partner conservation organizations or participating in a conservation
              experience during your safari.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Our Conservation Partners
              </Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" size="lg">
                Conservation Experiences
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
