import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Twitter, Linkedin, Mail } from "lucide-react"

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h1>
        <p className="text-lg text-muted-foreground">
          Our diverse team of safari experts brings together decades of experience in African travel, conservation, and
          tourism. Based in Victoria Falls, Zimbabwe, we're passionate about connecting travelers with authentic safari
          experiences.
        </p>
      </div>

      {/* About Navigation */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <Link href="/about">
          <Button variant="outline">Overview</Button>
        </Link>
        <Link href="/about/team">
          <Button variant="default">Our Team</Button>
        </Link>
        <Link href="/about/history">
          <Button variant="outline">Our History</Button>
        </Link>
        <Link href="/about/location">
          <Button variant="outline">Our Location</Button>
        </Link>
      </div>

      {/* Leadership Team */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Tendai Moyo",
              role: "Founder & CEO",
              bio: "Born and raised in Zimbabwe, Tendai founded Safari Overland after 15 years as a professional safari guide. His deep knowledge of African wildlife and passion for conservation drives our mission.",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Sarah Johnson",
              role: "Chief Operations Officer",
              bio: "With a background in sustainable tourism development, Sarah oversees our day-to-day operations and ensures that our platform connects travelers with responsible safari operators.",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "David Nkomo",
              role: "Conservation Director",
              bio: "A former wildlife researcher with a PhD in Conservation Biology, David leads our conservation initiatives and vets operators for their environmental and community practices.",
              image: "/placeholder.svg?height=400&width=400",
            },
          ].map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="relative h-64">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Core Team */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Core Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Grace Mutasa",
              role: "Head of Partnerships",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Michael Chen",
              role: "Technology Director",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Fatima Osei",
              role: "Marketing Manager",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "James Wilson",
              role: "Content Curator",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Thabo Ndlovu",
              role: "Community Manager",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Emma Rodriguez",
              role: "Sustainability Advisor",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Samuel Dube",
              role: "Regional Expert: Southern Africa",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Aisha Kimani",
              role: "Regional Expert: East Africa",
              image: "/placeholder.svg?height=300&width=300",
            },
          ].map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Local Guides */}
      <section className="mb-16 bg-muted rounded-lg p-8">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Network of Local Experts</h2>
          <p className="text-muted-foreground">
            Beyond our core team, Safari Overland works with a network of local guides and experts across Africa. These
            passionate professionals provide on-the-ground insights, verify listings, and help us maintain the quality
            and authenticity of our directory.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Kenya", "Tanzania", "South Africa", "Botswana", "Namibia", "Uganda", "Rwanda", "Zimbabwe"].map(
            (country) => (
              <div key={country} className="bg-white p-4 rounded-md text-center">
                <p className="font-medium">{country}</p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* Join Our Team */}
      <section>
        <div className="bg-primary text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="mb-6">
              We're always looking for passionate individuals who share our love for African wildlife, sustainable
              tourism, and exceptional travel experiences. If you're interested in joining our team in Victoria Falls or
              working remotely, check out our current openings.
            </p>
            <Button variant="secondary" size="lg">
              View Career Opportunities
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
