import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Sun, Cloud, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Photography Seasonal Guide | Safari Overland",
  description: "Discover the best seasons for wildlife photography in Africa's diverse regions, with tips on lighting, animal behavior, and landscape conditions.",
  keywords: "safari photography, wildlife photography, best light Africa, photography seasons, Africa photography guide, photography safari",
};

export default function PhotographyGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Photography Seasonal Guide</h1>
        <p className="text-lg text-muted-foreground">
          Best seasons for wildlife photography in different regions, considering light, landscapes, and animal behavior.
        </p>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/resources" className="hover:text-primary">Resources</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/resources/seasonal-guides" className="hover:text-primary">Seasonal Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Photography</span>
      </div>

      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px]">
          <Image 
            src="/images/seasonal-guides/photography-hero.jpg" 
            alt="Wildlife photography on safari" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                Capture Africa's Magic Through Your Lens
              </h2>
              <p className="text-white/90 text-lg mb-4">
                Each season brings distinct photographic opportunities across Africa's diverse ecosystems. Learn when and where to be for the perfect shot.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">
                  <Camera className="mr-2 h-4 w-4" /> Photography Safaris
                </Button>
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Equipment Recommendations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photography Seasons Overview */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Understanding Safari Photography Seasons</h2>
          <p className="text-lg mb-6">
            The perfect wildlife photograph combines several elements: subject, behavior, light, and setting. African seasons dramatically affect all these components, making timing one of the most crucial factors for successful safari photography.
          </p>
          <p className="text-lg mb-6">
            While professional photographers visit Africa year-round, each season offers unique advantages and challenges. This guide will help you plan your photography safari to capture the images you envision.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Sun className="h-8 w-8 text-amber-500 mr-3" />
                  <h3 className="text-xl font-bold">Dry Season Advantages</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Sparse vegetation provides clearer wildlife sightings and unobstructed shots</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Animals congregate around remaining water sources, creating concentration of subjects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Dusty conditions create dramatic sunrise and sunset light with rich golden hues</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Better road access to remote areas allows reaching unique photography locations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Less chance of rain interfering with photography sessions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Cloud className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-bold">Green Season Advantages</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Lush, vibrant landscapes create beautiful backdrops and context for wildlife</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Dramatic skies with cloud formations add dimension to landscape photography</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Birthing seasons provide opportunities to photograph newborn animals and maternal behavior</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Migrant birds in breeding plumage offer spectacular bird photography</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Fewer tourists means less crowded sightings and more exclusive photography opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Regional Photography Guide */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Regional Photography Guide</h2>
          
          {/* East Africa */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold mb-6 border-b pb-2">East Africa: Kenya & Tanzania</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  season: "January-March",
                  highlight: "Calving Season & Short Dry Period",
                  details: "Perfect for photographing predator-prey interaction during wildebeest calving in Serengeti/Ndutu. Clear skies with occasional dramatic cloud formations.",
                  subjects: "Newborn wildebeest calves, hunting predators, Ngorongoro Crater landscapes",
                  tips: "Use telephoto lenses (200-600mm) for calving action. Early morning light on the plains creates magical atmosphere.",
                  image: "/images/seasonal-guides/east-africa-jan.jpg",
                },
                {
                  season: "April-June",
                  highlight: "Long Rains & Migration Start",
                  details: "Challenging but rewarding with lush, emerald landscapes. Wildebeest beginning their northward migration creates river crossing opportunities.",
                  subjects: "Dramatic stormy skies, animals against green backdrops, Serengeti migration columns",
                  tips: "Bring rain protection for your gear. Overcast conditions provide even lighting for portraits without harsh shadows.",
                  image: "/images/seasonal-guides/east-africa-apr.jpg",
                },
                {
                  season: "July-October",
                  highlight: "Dry Season & Mara Crossings",
                  details: "Prime photography season with river crossings in Masai Mara. Excellent light conditions with golden mornings and evenings.",
                  subjects: "Mara River crossings, large predators, dust-filled landscapes at sunset",
                  tips: "Position at crossings with sun behind you. Capture action with fast shutter speeds (1/2000+) and continuous shooting.",
                  image: "/images/seasonal-guides/east-africa-jul.jpg",
                },
              ].map((period) => (
                <Card key={period.season} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={period.image} alt={`East Africa during ${period.season}`} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-lg text-primary">{period.season}</h4>
                    <p className="font-medium text-sm mb-2">{period.highlight}</p>
                    <p className="text-muted-foreground text-sm mb-2">{period.details}</p>
                    <p className="text-sm mb-1"><span className="font-medium">Key Subjects:</span> {period.subjects}</p>
                    <p className="text-sm"><span className="font-medium">Pro Tip:</span> {period.tips}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Southern Africa */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold mb-6 border-b pb-2">Southern Africa: Botswana, Namibia & South Africa</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  season: "November-March",
                  highlight: "Green Season & Summer Rains",
                  details: "Dramatic skies and lush landscapes in Okavango and Kruger. Excellent for wide-angle environmental shots showing animals in context.",
                  subjects: "Newborn impala, dramatic thunderstorms, birds in breeding plumage",
                  tips: "Use polarizing filters to enhance sky drama and reduce glare. Early morning photography before storms build.",
                  image: "/images/seasonal-guides/southern-africa-nov.jpg",
                },
                {
                  season: "April-July",
                  highlight: "Transition & Early Dry Season",
                  details: "Okavango Delta floods begin, creating reflective water scenes. Clear air after rains offers exceptional visibility.",
                  subjects: "Water reflections, elephants crossing channels, leopards in clear visibility",
                  tips: "Shoot low angles at water level for dramatic reflections. Early morning mists create atmospheric images.",
                  image: "/images/seasonal-guides/southern-africa-apr.jpg",
                },
                {
                  season: "August-October",
                  highlight: "Peak Dry Season",
                  details: "Ultimate wildlife concentration around water in Etosha, Chobe, and Kruger. Stark landscapes create dramatic contrast.",
                  subjects: "Large elephant herds at waterholes, predators at concentrated prey, dust-filled light",
                  tips: "Shoot during golden hour for rim lighting on animals. Capture silhouettes against colorful sunset skies.",
                  image: "/images/seasonal-guides/southern-africa-aug.jpg",
                },
              ].map((period) => (
                <Card key={period.season} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={period.image} alt={`Southern Africa during ${period.season}`} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-lg text-primary">{period.season}</h4>
                    <p className="font-medium text-sm mb-2">{period.highlight}</p>
                    <p className="text-muted-foreground text-sm mb-2">{period.details}</p>
                    <p className="text-sm mb-1"><span className="font-medium">Key Subjects:</span> {period.subjects}</p>
                    <p className="text-sm"><span className="font-medium">Pro Tip:</span> {period.tips}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Specialized Photography */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold mb-6 border-b pb-2">Specialized Photography Opportunities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  type: "Night & Astro Photography",
                  season: "May-September (Dry Season)",
                  locations: "Namibia (NamibRand), Botswana (Makgadikgadi), South Africa (Karoo)",
                  details: "Clear, dark skies during dry season offer spectacular Milky Way and star photography opportunities.",
                  tips: "Use fast wide-angle lenses (f/2.8 or faster) and sturdy tripods. Best during new moon phases.",
                  image: "/images/seasonal-guides/astro-photo.jpg",
                },
                {
                  type: "Gorilla Photography",
                  season: "December-February and June-September (Dry Periods)",
                  locations: "Uganda (Bwindi), Rwanda (Volcanoes NP)",
                  details: "Dry periods offer better trekking conditions and more reliable photography opportunities with mountain gorillas.",
                  tips: "Use high ISO capabilities (1600-6400) for forest conditions. A 70-200mm lens is ideal for balance of reach and light gathering.",
                  image: "/images/seasonal-guides/gorilla-photo.jpg",
                },
                {
                  type: "Desert Landscapes",
                  season: "March-May and September-November",
                  locations: "Namibia (Sossusvlei, Deadvlei), Morocco (Sahara)",
                  details: "Transition seasons offer dramatic cloud formations while maintaining desert clarity. Comfortable temperatures for long shoots.",
                  tips: "Use graduated ND filters for balancing bright skies with shadowed dunes. Dawn and dusk provide best side-lighting on dune ridges.",
                  image: "/images/seasonal-guides/desert-photo.jpg",
                },
                {
                  type: "Underwater & Marine",
                  season: "July-November for Whale Sharks, November-March for Sardine Run",
                  locations: "South Africa (Wild Coast), Mozambique (Tofo), Tanzania (Mafia Island)",
                  details: "Seasonal marine phenomena create extraordinary underwater photography opportunities.",
                  tips: "Use dome ports for split-level shots. Wide-angle lenses (16-35mm equivalent) capture large marine subjects in context.",
                  image: "/images/seasonal-guides/underwater-photo.jpg",
                },
              ].map((specialty) => (
                <Card key={specialty.type} className="overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="relative h-48 sm:h-auto">
                      <Image src={specialty.image} alt={specialty.type} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold text-lg">{specialty.type}</h4>
                      <p className="text-primary font-medium text-sm mb-2">{specialty.season}</p>
                      <p className="text-sm mb-2"><span className="font-medium">Best Locations:</span> {specialty.locations}</p>
                      <p className="text-muted-foreground text-sm mb-2">{specialty.details}</p>
                      <p className="text-sm"><span className="font-medium">Pro Tip:</span> {specialty.tips}</p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photography Tips */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Safari Photography Tips by Season</h2>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Dry Season Photography</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span><span className="font-medium">Dust Protection:</span> Bring multiple cameras rather than changing lenses in the field. Use dust covers and sensor cleaning kits.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span><span className="font-medium">High Contrast Handling:</span> Use graduated ND filters or HDR techniques to handle bright skies and shadowed subjects.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span><span className="font-medium">Golden Light Timing:</span> Plan for shorter, more intense golden hours. Position yourself with subjects between you and the sun for rim lighting.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span><span className="font-medium">Water Sources:</span> Research and position at waterholes or rivers early. Most activity happens in early morning and late afternoon.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span><span className="font-medium">Heat Haze:</span> Be aware of heat distortion affecting image sharpness during midday. Focus on close subjects or switch to landscape/detail work.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Green Season Photography</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span><span className="font-medium">Rain Protection:</span> Invest in proper rain covers for cameras and lenses. Bring silica gel packs to prevent fungus in humid conditions.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span><span className="font-medium">Lighting Techniques:</span> Use fill flash or reflectors to illuminate subjects in even, overcast conditions.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span><span className="font-medium">Composition:</span> Incorporate lush backgrounds and flowering plants to tell the "green season story" in your images.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span><span className="font-medium">After-Rain Opportunities:</span> Be ready immediately after rain stops for extraordinary light and wildlife activity.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span><span className="font-medium">Macro Photography:</span> Take advantage of insects, small reptiles, and flowering plants for close-up work when large mammals are dispersed.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Essential Equipment by Season</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Dry Season Must-Haves</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Dust-resistant camera bodies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Telephoto lens (200-600mm range)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Polarizing filter for reducing glare</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Extender/teleconverter for extra reach</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Lens cleaning kit with blower</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Graduated ND filters</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Green Season Must-Haves</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Weather-sealed camera bodies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Fast zoom lens (f/2.8 or faster)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Rain covers for equipment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Macro lens for small subjects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>External flash with diffuser</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span>Extra batteries (more shooting in cool weather)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="bg-primary text-white p-8 md:p-12 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Plan Your Photography Safari</h2>
            <p className="mb-6">
              Let our safari specialists and professional wildlife photographers help you plan the perfect photography safari tailored to your desired subjects and optimal seasons. Whether you're a beginner or professional, we'll ensure you're in the right place at the right time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                View Photography Safaris
              </Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" size="lg">
                Photography Workshops
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center my-10">
        <Link 
          href="/resources/seasonal-guides" 
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Seasonal Guides
        </Link>
      </div>
    </div>
  );
} 