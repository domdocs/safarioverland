import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, ShieldCheck, Stethoscope, Bug, Sun, ChevronRight } from "lucide-react"

export default function SafetyTipsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Safari Safety Tips</h1>
        <p className="text-lg text-muted-foreground">
          Essential safety information to ensure a secure and enjoyable safari experience in the African wilderness.
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
          <Button variant="default">Safety Tips</Button>
        </Link>
        <Link href="/resources/conservation">
          <Button variant="outline">Conservation</Button>
        </Link>
        <Link href="/resources/seasonal-guides">
          <Button variant="outline">Seasonal Guides</Button>
        </Link>
      </div>

      {/* Safety Overview */}
      <section className="mb-16">
        <div className="bg-muted rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Safari Safety Essentials</h2>
              <p className="text-muted-foreground mb-6">
                African safaris are generally safe experiences, but it's important to be prepared and informed. Our
                comprehensive safety guide covers everything from wildlife encounters to health precautions, ensuring
                you can focus on enjoying your adventure with peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button>Download Safety Guide</Button>
                <Button variant="outline">Watch Safety Video</Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto">
              <Image src="/placeholder.svg?height=600&width=800" alt="Safari Safety" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Safety Categories */}
      <section className="mb-16">
        <Tabs defaultValue="wildlife">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="wildlife" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Wildlife
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" /> Health
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> General
            </TabsTrigger>
            <TabsTrigger value="insects" className="flex items-center gap-2">
              <Bug className="h-4 w-4" /> Insects
            </TabsTrigger>
            <TabsTrigger value="climate" className="flex items-center gap-2">
              <Sun className="h-4 w-4" /> Climate
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wildlife">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Wildlife Viewing Safety",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Essential guidelines for safe wildlife viewing, including proper behavior around different animal species.",
                  link: "/resources/safety-tips/wildlife-viewing",
                },
                {
                  title: "Understanding Animal Behavior",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Learn to recognize animal warning signs and behaviors to ensure safe and respectful wildlife encounters.",
                  link: "/resources/safety-tips/animal-behavior",
                },
                {
                  title: "Vehicle Safety on Game Drives",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Important safety protocols for game drives, including proper positioning and behavior in safari vehicles.",
                  link: "/resources/safety-tips/vehicle-safety",
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

          <TabsContent value="health">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Vaccinations & Medications",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Essential information about required and recommended vaccinations and medications for safari travel.",
                  link: "/resources/safety-tips/vaccinations",
                },
                {
                  title: "First Aid on Safari",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "What to include in your safari first aid kit and basic first aid knowledge for wilderness travel.",
                  link: "/resources/safety-tips/first-aid",
                },
                {
                  title: "Water & Food Safety",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt: "Guidelines for safe drinking water and food consumption during your safari adventure.",
                  link: "/resources/safety-tips/water-food-safety",
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

          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Camp & Lodge Safety",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt: "Safety guidelines for staying in safari camps and lodges, including nighttime protocols.",
                  link: "/resources/safety-tips/camp-safety",
                },
                {
                  title: "Travel Insurance for Safaris",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Understanding the importance of travel insurance and what to look for in a safari-specific policy.",
                  link: "/resources/safety-tips/travel-insurance",
                },
                {
                  title: "Communication & Emergency Plans",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "How to stay connected and what emergency plans to have in place for remote safari locations.",
                  link: "/resources/safety-tips/emergency-plans",
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

          <TabsContent value="insects">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Malaria Prevention",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Comprehensive guide to malaria prevention, including medication options and practical prevention tips.",
                  link: "/resources/safety-tips/malaria-prevention",
                },
                {
                  title: "Insect Protection Guide",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Effective strategies for protecting yourself from mosquitoes, tsetse flies, and other insects on safari.",
                  link: "/resources/safety-tips/insect-protection",
                },
                {
                  title: "Dealing with Insect Bites & Stings",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "What to do if you experience insect bites or stings, including identification and treatment options.",
                  link: "/resources/safety-tips/insect-bites",
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

          <TabsContent value="climate">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Heat Safety on Safari",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "How to stay safe in hot safari climates, including preventing heat exhaustion and dehydration.",
                  link: "/resources/safety-tips/heat-safety",
                },
                {
                  title: "Sun Protection Guide",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Comprehensive sun protection strategies for the intense African sun, including clothing and sunscreen recommendations.",
                  link: "/resources/safety-tips/sun-protection",
                },
                {
                  title: "Weather Hazards & Precautions",
                  image: "/placeholder.svg?height=300&width=500",
                  excerpt:
                    "Understanding potential weather hazards in different safari regions and how to prepare for them.",
                  link: "/resources/safety-tips/weather-hazards",
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

      {/* Safety Essentials */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Safari Safety Essentials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Do's</h3>
            <ul className="space-y-3">
              {[
                "Always listen to your guide's instructions",
                "Stay in your vehicle during game drives unless instructed otherwise",
                "Keep a safe distance from wildlife",
                "Wear neutral-colored clothing (khaki, olive, tan)",
                "Use insect repellent, especially in the evenings",
                "Stay hydrated and protect yourself from the sun",
                "Keep noise levels low to avoid disturbing wildlife",
                "Secure your tent/room at night and use a flashlight when walking",
                "Inform staff if you need to leave your accommodation at night",
                "Carry a basic first aid kit and any necessary medications",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Don'ts</h3>
            <ul className="space-y-3">
              {[
                "Don't wander off on your own in wildlife areas",
                "Don't approach, touch, or feed wild animals",
                "Don't make sudden movements or loud noises around wildlife",
                "Don't wear bright colors or strong perfumes on safari",
                "Don't hang limbs outside the vehicle during game drives",
                "Don't stand up in open safari vehicles unless instructed",
                "Don't leave food in your tent or room",
                "Don't ignore signs of dehydration or heat exhaustion",
                "Don't forget to take malaria prophylaxis if recommended",
                "Don't leave valuables unattended in your accommodation",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Emergency Information */}
      <section className="mb-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-red-800">Emergency Information</h2>
          <p className="text-red-700 mb-6">
            While emergencies are rare on safari, it's important to be prepared. Keep this information handy during your
            trip.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Emergency Contacts</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>International Emergency:</strong> Dial your country's embassy
                  </li>
                  <li>
                    <strong>Medical Evacuation:</strong> Check your travel insurance
                  </li>
                  <li>
                    <strong>Local Emergency:</strong> Ask your lodge/guide for local numbers
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Medical Facilities</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Major Cities:</strong> Have well-equipped hospitals
                  </li>
                  <li>
                    <strong>Remote Areas:</strong> Limited medical facilities
                  </li>
                  <li>
                    <strong>Safari Lodges:</strong> Basic first aid, evacuation plans
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Emergency Procedures</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Wildlife Incident:</strong> Alert your guide immediately
                  </li>
                  <li>
                    <strong>Medical Emergency:</strong> Inform lodge management
                  </li>
                  <li>
                    <strong>Natural Disaster:</strong> Follow staff instructions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expert Safety Advice */}
      <section>
        <div className="bg-primary text-white p-8 md:p-12 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Expert Safety Advice</h2>
            <p className="mb-6">
              Have specific safety concerns about your upcoming safari? Our team of experienced safari guides based in
              Victoria Falls, Zimbabwe can provide personalized safety advice for your particular destination and
              activities.
            </p>
            <Button variant="secondary" size="lg">
              Ask Our Safety Experts
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
