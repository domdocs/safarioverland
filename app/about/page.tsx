import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, Users, History, MapPin, ChevronRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[400px] w-full">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Victoria Falls"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-40 mb-12 text-white z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Safari Overland</h1>
            <p className="text-lg md:text-xl max-w-3xl">
              Connecting travelers with exceptional safari experiences across Africa since 2018, from our headquarters
              in the safari capital of Africa: Victoria Falls, Zimbabwe.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* About Navigation */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Link href="/about">
            <Button variant="default">Overview</Button>
          </Link>
          <Link href="/about/history">
            <Button variant="outline">Our History</Button>
          </Link>
          <Link href="/about/location">
            <Button variant="outline">Our Location</Button>
          </Link>
        </div>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To connect travelers with authentic, responsible safari experiences across Africa, while supporting
                conservation efforts and local communities.
              </p>
              <p className="text-muted-foreground">
                At Safari Overland, we believe that exceptional safari experiences should be accessible to all
                travelers, while ensuring the protection of Africa's wildlife and ecosystems. Our comprehensive
                directory brings together the best safari providers across the continent, from luxury lodges to
                budget-friendly camping options, all vetted for quality and commitment to sustainable practices.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To be the most trusted resource for safari planning in Africa, known for our commitment to conservation,
                community development, and exceptional travel experiences.
              </p>
              <p className="text-muted-foreground">
                We envision a future where safari tourism serves as a powerful force for conservation and community
                development across Africa. By connecting travelers with responsible operators, we aim to ensure that
                tourism benefits both wildlife and local communities, creating a sustainable model for the future of
                African safaris.
              </p>
            </div>
          </div>
        </section>

        {/* Why Victoria Falls */}
        <section className="mb-16 bg-muted rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Home: Victoria Falls</h2>
              <p className="text-muted-foreground mb-4">
                Safari Overland is proudly headquartered in Victoria Falls, Zimbabwe – the safari capital of Africa.
                This strategic location at the crossroads of Southern Africa gives us unique insights into the safari
                industry and allows us to maintain close relationships with operators across the continent.
              </p>
              <p className="text-muted-foreground mb-4">
                Known locally as "Mosi-oa-Tunya" (The Smoke That Thunders), Victoria Falls is not only one of the
                world's most spectacular natural wonders but also a hub for safari activities across multiple countries.
                Our location gives us direct access to the safari circuits of Zimbabwe, Zambia, Botswana, Namibia, and
                South Africa.
              </p>
              <Link href="/about/location">
                <Button variant="outline" className="mt-2">
                  Learn more about our location <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Victoria Falls Office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Authenticity</h3>
                <p className="text-muted-foreground">
                  We believe in authentic safari experiences that connect travelers with the real Africa – its wildlife,
                  landscapes, and people. We prioritize operators who offer genuine, immersive experiences over
                  mass-market tourism.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We support safari operators who work closely with local communities, ensuring that tourism benefits
                  the people who live alongside wildlife. We believe that successful conservation depends on community
                  involvement and benefit-sharing.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Conservation</h3>
                <p className="text-muted-foreground">
                  We are committed to wildlife conservation and environmental protection. We prioritize operators who
                  demonstrate a clear commitment to conservation efforts, sustainable practices, and minimizing their
                  environmental footprint.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Explore More About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/about/history">
              <div className="bg-primary text-white p-6 rounded-lg hover:bg-primary/90 transition-colors">
                <History className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-bold mb-2">Our History</h3>
                <p className="mb-4">
                  Discover how Safari Overland grew from a small startup to Africa's leading safari resource.
                </p>
                <div className="flex items-center text-sm font-medium">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>
            <Link href="/about/location">
              <div className="bg-secondary text-white p-6 rounded-lg hover:bg-secondary/90 transition-colors">
                <MapPin className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-bold mb-2">Visit Our Headquarters</h3>
                <p className="mb-4">
                  Learn more about our Victoria Falls headquarters and why we chose the safari capital of Africa.
                </p>
                <div className="flex items-center text-sm font-medium">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
