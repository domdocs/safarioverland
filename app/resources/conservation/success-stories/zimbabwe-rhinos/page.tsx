import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, ChevronLeft } from "lucide-react"

export default function ZimbabweRhinosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb Navigation */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/resources" className="hover:text-primary">
            Resources
          </Link>
          <span className="mx-2">/</span>
          <Link href="/resources/conservation" className="hover:text-primary">
            Conservation
          </Link>
          <span className="mx-2">/</span>
          <Link href="/resources/conservation/success-stories" className="hover:text-primary">
            Success Stories
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Zimbabwe Rhinos</span>
        </div>
      </div>

      {/* Back Button */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" className="flex items-center gap-2" asChild>
          <Link href="/resources/conservation">
            <ChevronLeft className="h-4 w-4" /> Back to Conservation Resources
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Black Rhino Recovery in Zimbabwe's Matobo National Park
        </h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-muted px-3 py-1 rounded-full text-sm">
            Conservation Success
          </div>
          <div className="bg-muted px-3 py-1 rounded-full text-sm">
            Zimbabwe
          </div>
          <div className="bg-muted px-3 py-1 rounded-full text-sm">
            Black Rhino
          </div>
        </div>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=600&width=1200&text=Black+Rhino+in+Matobo+National+Park"
            alt="Black Rhino in Matobo National Park"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-primary/10 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-primary mb-2">43%</div>
          <div className="text-sm text-muted-foreground">Population Increase</div>
        </div>
        <div className="bg-primary/10 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-primary mb-2">12 years</div>
          <div className="text-sm text-muted-foreground">Program Duration</div>
        </div>
        <div className="bg-primary/10 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-primary mb-2">424 km²</div>
          <div className="text-sm text-muted-foreground">Protected Area</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <h2>Introduction</h2>
        <p>
          Zimbabwe's Matobo National Park has achieved remarkable success in black rhino conservation, increasing the population by 43% over twelve years through a comprehensive approach combining intensive anti-poaching measures, community engagement, and sustainable tourism initiatives that fund conservation efforts.
        </p>
        <p>
          This success story demonstrates how targeted conservation strategies, community involvement, and sustainable funding can reverse the decline of endangered species, even in regions facing significant economic and political challenges.
        </p>

        <h2>Historical Context</h2>
        <p>
          Black rhinos once roamed widely across sub-Saharan Africa, with population estimates of 65,000 in the 1970s. However, a devastating wave of poaching reduced their numbers by more than 90% by the early 1990s, with Zimbabwe's population plummeting from 3,000 to fewer than 370 animals.
        </p>
        <p>
          Matobo National Park, a UNESCO World Heritage site known for its dramatic granite kopjes and rich biodiversity, became a critical refuge for the remaining black rhinos in Zimbabwe. However, even this protected area faced serious threats from poaching and habitat degradation during Zimbabwe's economic crisis in the early 2000s.
        </p>

        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image 
              src="/placeholder.svg?height=400&width=600&text=Anti-Poaching+Rangers" 
              alt="Anti-poaching rangers patrolling in Matobo National Park" 
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="text-white text-sm">
                Anti-poaching rangers patrolling in Matobo National Park
              </div>
            </div>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image 
              src="/placeholder.svg?height=400&width=600&text=Black+Rhino+Monitoring" 
              alt="Conservation team monitoring a black rhino" 
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="text-white text-sm">
                Conservation team monitoring a black rhino
              </div>
            </div>
          </div>
        </div>

        <h2>The Conservation Strategy</h2>
        <p>
          In 2010, Zimbabwe Parks and Wildlife Management Authority (ZimParks) partnered with international conservation organizations to implement a multi-faceted approach to black rhino conservation in Matobo. The strategy focused on:
        </p>
        <ul>
          <li>
            <strong>Enhanced Anti-Poaching Measures:</strong> Deployment of well-trained and equipped ranger units, implementation of advanced monitoring technologies including GPS tracking and drone surveillance, and development of rapid response protocols.
          </li>
          <li>
            <strong>Intensive Population Management:</strong> Regular monitoring of individual rhinos, strategic translocations to maintain genetic diversity, and veterinary interventions when necessary.
          </li>
          <li>
            <strong>Habitat Protection and Expansion:</strong> Securing critical water sources, managing vegetation to ensure optimal feeding grounds, and creating buffer zones around the park.
          </li>
          <li>
            <strong>Community Engagement:</strong> Implementing education programs in surrounding villages, creating employment opportunities in conservation and tourism, and establishing revenue-sharing mechanisms from tourism.
          </li>
          <li>
            <strong>Sustainable Funding:</strong> Developing eco-tourism initiatives focused on rhino conservation, securing long-term donor commitments, and creating a dedicated conservation trust fund.
          </li>
        </ul>

        <h2>Results and Impact</h2>
        <p>
          The comprehensive conservation approach has yielded impressive results:
        </p>
        <ul>
          <li>The black rhino population in Matobo increased by 43% between 2010 and 2022, from 28 to 40 individuals.</li>
          <li>Poaching incidents decreased by 87% during the same period.</li>
          <li>The genetic diversity of the population improved significantly through strategic translocations.</li>
          <li>Over 120 local community members gained employment in conservation and tourism related to rhino protection.</li>
          <li>Annual tourism revenue increased by 65%, with a portion directly supporting conservation efforts.</li>
          <li>Educational programs reached more than 15,000 students from surrounding communities.</li>
        </ul>

        <div className="my-8 relative h-96 rounded-lg overflow-hidden">
          <Image 
            src="/placeholder.svg?height=600&width=1200&text=Black+Rhino+Mother+and+Calf" 
            alt="Black rhino mother and calf in Matobo National Park" 
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="text-white text-sm">
              Black rhino mother and calf in Matobo National Park - a sign of successful breeding programs
            </div>
          </div>
        </div>

        <h2>Challenges and Lessons Learned</h2>
        <p>
          Despite its success, the conservation project faced significant challenges:
        </p>
        <ul>
          <li>
            <strong>Political Instability:</strong> Zimbabwe's political and economic challenges periodically threatened funding and operational continuity.
          </li>
          <li>
            <strong>Poaching Pressure:</strong> Increasing values of rhino horn in international black markets created ongoing incentives for poaching.
          </li>
          <li>
            <strong>Human-Wildlife Conflict:</strong> Expanding rhino populations occasionally created tensions with local communities when animals strayed outside park boundaries.
          </li>
          <li>
            <strong>Climate Change:</strong> Droughts affected water availability and vegetation quality, requiring adaptive management strategies.
          </li>
        </ul>
        <p>
          Key lessons learned from the project include:
        </p>
        <ul>
          <li>Community engagement is essential for long-term conservation success.</li>
          <li>Diverse funding streams provide resilience during political and economic uncertainty.</li>
          <li>Technology must be balanced with human intelligence and community reporting networks.</li>
          <li>Adaptive management strategies are necessary to respond to changing threats and conditions.</li>
          <li>Transparency in revenue sharing builds trust with local communities.</li>
        </ul>

        <h2>Replication and Future Directions</h2>
        <p>
          The Matobo black rhino conservation model has influenced rhino protection strategies across Zimbabwe and beyond. Elements of the approach have been replicated in:
        </p>
        <ul>
          <li>Bubye Valley Conservancy, Zimbabwe</li>
          <li>Save Valley Conservancy, Zimbabwe</li>
          <li>Community conservancies in Namibia</li>
          <li>Private reserves in South Africa</li>
        </ul>
        <p>
          Looking forward, ZimParks and its partners are focusing on:
        </p>
        <ul>
          <li>Expanding the protected habitat by creating wildlife corridors connecting to nearby conservation areas</li>
          <li>Further developing sustainable tourism models that directly support conservation</li>
          <li>Building capacity for local management of conservation initiatives</li>
          <li>Implementing innovative technologies for monitoring and protection</li>
          <li>Strengthening regional collaboration for black rhino conservation across southern Africa</li>
        </ul>

        <h2>How Visitors Can Contribute</h2>
        <p>
          Visitors to Matobo National Park can directly support black rhino conservation through:
        </p>
        <ul>
          <li>
            <strong>Guided Rhino Tracking:</strong> Participation in guided tracking experiences, where a portion of fees directly supports conservation efforts.
          </li>
          <li>
            <strong>Community Tourism:</strong> Engaging with community-based tourism initiatives that create economic incentives for conservation.
          </li>
          <li>
            <strong>Conservation Donations:</strong> Contributing to the Matobo Rhino Conservation Trust, which funds anti-poaching operations and community programs.
          </li>
          <li>
            <strong>Volunteer Opportunities:</strong> Joining short-term volunteer programs supporting research, monitoring, and community education.
          </li>
          <li>
            <strong>Spreading Awareness:</strong> Sharing experiences and raising awareness about rhino conservation needs and successes.
          </li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          The black rhino recovery in Zimbabwe's Matobo National Park demonstrates that with dedicated effort, strategic partnerships, and community engagement, the tide can be turned for endangered species. By creating a model where conservation delivers tangible benefits to local communities while protecting a critically endangered species, Matobo has established a sustainable approach that balances ecological needs with human development.
        </p>
        <p>
          This success story provides hope and practical lessons for conservation efforts across Africa and highlights the critical role of protected areas in preserving biodiversity for future generations.
        </p>
      </div>

      {/* Download Guide Button */}
      <div className="mt-12 text-center">
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" /> Download PDF Guide
        </Button>
      </div>
    </div>
  )
} 