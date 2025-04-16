import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
} from "@/components/timeline"

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our History</h1>
        <p className="text-lg text-muted-foreground">
          From humble beginnings in Victoria Falls to becoming Africa's leading safari directory, our journey has been
          driven by passion for wildlife, conservation, and authentic travel experiences.
        </p>
      </div>

      {/* About Navigation */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <Link href="/about">
          <Button variant="outline">Overview</Button>
        </Link>
        <Link href="/about/team">
          <Button variant="outline">Our Team</Button>
        </Link>
        <Link href="/about/history">
          <Button variant="default">Our History</Button>
        </Link>
        <Link href="/about/location">
          <Button variant="outline">Our Location</Button>
        </Link>
      </div>

      {/* Founding Story */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">The Founding Story</h2>
            <p className="text-muted-foreground mb-4">
              Safari Overland was founded in 2018 by Tendai Moyo, a professional safari guide with 15 years of
              experience across Southern and East Africa. After years of connecting travelers with safari operators
              informally, Tendai recognized the need for a comprehensive, trustworthy resource that would bring together
              the best safari experiences across the continent.
            </p>
            <p className="text-muted-foreground mb-4">
              Starting from a small office in Victoria Falls, Zimbabwe – the safari capital of Africa – Tendai and a
              small team of passionate safari experts began building relationships with operators across the continent,
              personally vetting each one for quality, authenticity, and commitment to responsible tourism practices.
            </p>
            <p className="text-muted-foreground">
              The company's strategic location at the crossroads of multiple safari destinations gave it unique insights
              into the industry and allowed for close relationships with operators across Southern Africa, which later
              expanded to East Africa and beyond.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=800&width=600" alt="Founder" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className="bg-primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">2018: The Beginning</h3>
                  <p className="text-muted-foreground">
                    Safari Overland was founded in Victoria Falls, Zimbabwe by Tendai Moyo. The initial directory
                    features 50 personally vetted safari operators across Zimbabwe, Botswana, and Zambia.
                  </p>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className="bg-primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">2019: Southern Africa Expansion</h3>
                  <p className="text-muted-foreground">
                    The directory expands to cover South Africa and Namibia, growing to over 200 listings. The company
                    establishes its conservation commitment program, requiring all listed operators to demonstrate
                    responsible tourism practices.
                  </p>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className="bg-primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">2020: Digital Transformation</h3>
                  <p className="text-muted-foreground">
                    Despite the global pandemic's impact on tourism, Safari Overland invests in digital transformation,
                    launching an enhanced online platform and virtual safari experiences to support operators during the
                    downturn.
                  </p>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className="bg-primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">2021: East Africa Expansion</h3>
                  <p className="text-muted-foreground">
                    The directory expands to East Africa, adding listings in Kenya, Tanzania, Uganda, and Rwanda. The
                    team grows to include regional experts with deep knowledge of each safari destination.
                  </p>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className="bg-primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">2022: Conservation Initiative</h3>
                  <p className="text-muted-foreground">
                    Launch of the Safari Overland Conservation Initiative, which directs a portion of all booking fees
                    to wildlife conservation and community development projects across Africa.
                  </p>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className="bg-primary" />
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">2023: Africa's Leading Directory</h3>
                  <p className="text-muted-foreground">
                    Safari Overland becomes the largest curated safari directory in Africa, featuring over 500 vetted
                    operators across 12 countries. The company expands its headquarters in Victoria Falls and launches
                    its community tourism certification program.
                  </p>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </section>

      {/* Milestones */}
      <section className="mb-16 bg-muted rounded-lg p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Key Milestones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="font-medium">Vetted Safari Operators</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <p className="font-medium">African Countries</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <p className="font-medium">Travelers Connected</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">$250K</div>
              <p className="font-medium">Conservation Contributions</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Looking Forward */}
      <section>
        <div className="bg-primary text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Looking Forward</h2>
            <p className="mb-6">
              As we continue to grow, our commitment to connecting travelers with authentic, responsible safari
              experiences remains unwavering. From our headquarters in Victoria Falls, we're expanding our reach while
              deepening our impact on conservation and community development across Africa.
            </p>
            <p className="mb-6">
              Our vision for the future includes expanding to West and North Africa, enhancing our digital platform with
              innovative features, and strengthening our conservation initiatives to ensure that safari tourism
              continues to be a positive force for wildlife protection and community empowerment.
            </p>
            <Button variant="secondary" size="lg">
              Join Our Journey
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
