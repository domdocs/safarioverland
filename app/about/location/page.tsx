import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react"

export default function LocationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Location</h1>
        <p className="text-lg text-muted-foreground">
          Discover our headquarters in Victoria Falls, Zimbabwe – the safari capital of Africa and gateway to incredible
          wildlife experiences across Southern Africa.
        </p>
      </div>

      {/* About Navigation */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <Link href="/about">
          <Button variant="outline">Overview</Button>
        </Link>
        <Link href="/about/history">
          <Button variant="outline">Our History</Button>
        </Link>
        <Link href="/about/location">
          <Button variant="default">Our Location</Button>
        </Link>
      </div>

      {/* Victoria Falls */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Victoria Falls: Safari Capital of Africa</h2>
            <p className="text-muted-foreground mb-4">
              Safari Overland is proudly headquartered in Victoria Falls, Zimbabwe – often referred to as the safari
              capital of Africa. This strategic location at the heart of Southern Africa's safari circuit gives us
              unique insights into the industry and allows us to maintain close relationships with operators across the
              region.
            </p>
            <p className="text-muted-foreground mb-4">
              Known locally as "Mosi-oa-Tunya" (The Smoke That Thunders), Victoria Falls is one of the Seven Natural
              Wonders of the World and a UNESCO World Heritage Site. The town serves as a gateway to incredible safari
              experiences in Zimbabwe, Zambia, Botswana, and Namibia.
            </p>
            <p className="text-muted-foreground">
              Our location allows our team to personally vet safari operators, stay updated on conservation initiatives,
              and provide firsthand knowledge of the experiences we recommend to travelers.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/about/about-hero.jpg"
              alt="Sunrise over Victoria Falls — Safari Overland's home base"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Map & Contact */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Visit Our Office</h2>
            <div className="aspect-video bg-muted rounded-md mb-6 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Interactive Map</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Safari Overland Headquarters</p>
                  <p className="text-muted-foreground">123 Livingstone Way</p>
                  <p className="text-muted-foreground">Victoria Falls, Zimbabwe</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <p>+263 83 123 4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <p>info@safarioverland.com</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <p>Monday - Friday: 8:00 AM - 5:00 PM CAT</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Plan Your Visit</h2>
            <p className="text-muted-foreground mb-4">
              If you're planning a safari in Southern Africa, we invite you to visit our office in Victoria Falls. Our
              team would be delighted to meet you, discuss your safari plans, and provide personalized recommendations
              based on your interests and budget.
            </p>
            <p className="text-muted-foreground mb-6">
              Victoria Falls is easily accessible by air, with regular flights from Johannesburg, Harare, and other
              major cities in the region. The town offers a range of accommodation options, from luxury hotels to
              budget-friendly guesthouses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex items-center gap-2">
                Schedule a Visit <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                Travel Information <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Why Victoria Falls */}
      <section className="mb-16 bg-muted rounded-lg p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why We Chose Victoria Falls</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Strategic Location</h3>
              <p className="text-muted-foreground">
                Victoria Falls sits at the crossroads of four major safari destinations: Zimbabwe, Zambia, Botswana, and
                Namibia. This central location gives us easy access to a wide range of safari experiences.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Safari Hub</h3>
              <p className="text-muted-foreground">
                As a major tourism hub, Victoria Falls attracts safari operators, guides, and conservation experts from
                across Africa, allowing us to build strong industry relationships and stay updated on the latest
                developments.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Conservation Focus</h3>
              <p className="text-muted-foreground">
                The area around Victoria Falls is home to numerous conservation initiatives and protected areas,
                aligning with our commitment to wildlife protection and sustainable tourism practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Where We Operate */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Where We Operate</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          From our base in Victoria Falls we cover four of southern Africa's defining safari countries.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              country: "Zimbabwe",
              tagline: "Victoria Falls · Hwange · Mana Pools",
              alt: "Elephants and rainbow at Victoria Falls, Zimbabwe",
              image: "/images/about/zimbabwe.jpg",
            },
            {
              country: "Zambia",
              tagline: "Mosi-oa-Tunya · South Luangwa · Lower Zambezi",
              alt: "Sunset over Victoria Falls from the Zambian side",
              image: "/images/about/zambia.jpg",
            },
            {
              country: "Botswana",
              tagline: "Okavango Delta · Chobe · Kalahari",
              alt: "Elephant herd crossing the Chobe River wetlands at sunset",
              image: "/images/about/botswana.jpg",
            },
            {
              country: "Namibia",
              tagline: "Sossusvlei · Etosha · Skeleton Coast",
              alt: "Sossusvlei dunes and dead trees in Deadvlei, Namibia",
              image: "/images/about/namibia.jpg",
            },
          ].map((destination) => (
            <Card key={destination.country} className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src={destination.image}
                  alt={destination.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Bottom-up gradient scrim for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="text-2xl font-bold tracking-tight drop-shadow-md">
                    {destination.country}
                  </h3>
                  <p className="text-sm text-white/90 drop-shadow">
                    {destination.tagline}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
