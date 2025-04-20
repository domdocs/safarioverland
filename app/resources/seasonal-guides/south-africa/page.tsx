import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Sun, CloudRain, Camera, Compass } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'South Africa Safari Seasonal Guide | Safari Overland',
  description: 'Month-by-month guide to South Africa\'s diverse safari regions, including Kruger National Park, private reserves, and coastal wildlife areas.',
  keywords: 'South Africa safari seasons, best time to visit Kruger, South Africa wildlife viewing, private game reserves, Pilanesberg, Madikwe, Kgalagadi, South Africa whale watching, Big Five safari',
};

const SouthAfricaSeasonalGuidePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">South Africa Safari Seasonal Guide</h1>
        <p className="text-xl text-muted-foreground">
          Month-by-month guide to South Africa's diverse safari regions, including Kruger and private reserves
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-muted rounded-lg overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image 
              src="/images/seasonal-guides/travel-guide-south-africa.jpg" 
              alt="Wildlife in South Africa's diverse ecosystems" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">When to Visit South Africa</h2>
            <p className="text-muted-foreground mb-6">
              South Africa offers excellent safari experiences year-round, with each season providing unique advantages. The dry winter months (May-September) provide optimal wildlife viewing in savanna regions, while the green summer season (October-April) offers lush landscapes, newborn animals, and excellent bird watching.
            </p>
            <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-lg">
              <CalendarDays className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="font-medium">Peak game viewing: May to September (Dry season)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-3xl font-bold mb-6">South Africa's Safari Seasons Overview</h2>
        
        <p>
          South Africa's diverse geography creates distinct safari experiences across its various regions. From the iconic Kruger National Park in the northeast to the arid Kgalagadi in the northwest, and from malaria-free reserves in the North West Province to coastal wildlife viewing in the south, understanding seasonal patterns is key to planning the perfect safari.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <Sun className="h-5 w-5" /> Dry Season (May-September)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Wildlife concentrates around water sources</li>
              <li>Excellent visibility with sparse vegetation</li>
              <li>Cooler temperatures, especially mornings/evenings</li>
              <li>Minimal rain and generally cloudless skies</li>
              <li>Peak Kruger National Park season</li>
              <li>Lower risk of malaria in northeastern regions</li>
              <li>Ideal for first-time safari-goers</li>
              <li>Whale watching season along southern coast</li>
            </ul>
          </div>
          
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <CloudRain className="h-5 w-5" /> Green Season (October-April)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Lush, vibrant landscapes and dramatic skies</li>
              <li>Birthing season with numerous newborn animals</li>
              <li>Abundant migratory birds and year-round species in breeding plumage</li>
              <li>Afternoon thunderstorms but generally sunny mornings</li>
              <li>Warmer temperatures with higher humidity</li>
              <li>Less crowded parks and better rates (except holidays)</li>
              <li>Excellent photography with dramatic lighting</li>
              <li>Summer wildflowers in Northern and Western Cape</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Month-by-Month South Africa Safari Guide</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">January & February</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Hot and humid in the northeast (Kruger region), with average temperatures of 25-32°C (77-90°F). Afternoon thunderstorms common. Mild and pleasant in the Western Cape.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Lush vegetation makes wildlife spotting more challenging, but predator activity high due to vulnerable newborns. Excellent bird watching with migratory species present.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Private reserves with off-road driving privileges, malaria-free reserves in North West Province, Addo Elephant National Park
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Calving season for many antelope species, peak butterfly and insect activity, excellent reptile sightings
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> High season for domestic tourists until mid-January. Better availability thereafter. Higher risk of malaria in northeastern regions.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">March & April</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Temperatures begin to moderate, 20-28°C (68-82°F) with decreasing rainfall. Humidity lowers, and mornings and evenings become cooler.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Vegetation starts thinning out, improving wildlife visibility. Many young animals reaching independence. Predator action remains high.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Kruger National Park, Hluhluwe-iMfolozi in KwaZulu-Natal, Pilanesberg National Park
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Impala rutting season (April), migrant birds begin departing, autumn colors in some regions
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Excellent shoulder season with lower visitor numbers (except Easter holidays). Better rates and availability.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">May & June</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Beginning of dry season. Cooler temperatures 15-25°C (59-77°F), with cold mornings and evenings. Minimal rainfall and low humidity.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Improving dramatically as vegetation thins out. Animals begin concentrating around permanent water sources. Excellent predator sightings.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Kruger National Park, Sabi Sands and other private reserves, Madikwe Game Reserve
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Southern right whales begin arriving along the southern coast (June), excellent night sky viewing with clearer air
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Beginning of peak safari season with increasing international visitors. Excellent value in May before high season rates.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">July & August</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Peak dry season. Cold mornings and evenings (5-10°C/41-50°F) with mild, sunny days (20-25°C/68-77°F). Virtually no rainfall.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Prime wildlife viewing conditions. Water sources limited, leading to concentrated animal gatherings. Excellent predator-prey interaction.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> All major parks and reserves, especially waterholes in Kruger National Park and Kgalagadi Transfrontier Park
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Peak whale watching along the Western Cape coast, wildflower blooms begin in the Western Cape and Northern Cape
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Peak international tourism season with highest visitor numbers. Advance booking essential, especially for popular lodges.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">September & October</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Beginning of transition period. Warming up with temperatures 20-30°C (68-86°F). Still dry in September with first rains possible in October.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Excellent conditions continue through September. October brings dramatic sightings as animals congregate around dwindling water before the rains.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Kruger and surrounds, Pilanesberg, Madikwe, West Coast National Park (for spring flowers in September)
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Peak wildflower season in Northern and Western Cape (September), return of migratory birds (October), first newborns appear
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> September remains high season, while October is an excellent transition month as crowds diminish but wildlife viewing remains excellent.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">November & December</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Rainy season begins in earnest. Hot and often humid, 25-35°C (77-95°F) with afternoon thunderstorms. Dramatic cloud formations.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Landscapes transform as rain arrives. Many herbivores give birth, attracting predators. Excellent bird watching as migratory species are fully present.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Private reserves with off-road capabilities, Kgalagadi (still relatively dry), Addo Elephant National Park
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Peak birthing season for many antelope species, spectacular thunderstorms, vibrant bird life
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Early December offers good value before holiday rates apply. Mid-December through early January sees peak domestic tourism and higher rates.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-6">South Africa's Key Safari Regions by Season</h2>

        <div className="grid md:grid-cols-2 gap-8 my-10">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Kruger National Park & Private Reserves</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best dry season months:</strong>
                May-September (peak wildlife concentration)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best green season months:</strong>
                November-December (newborns and birds)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Impala rutting (April), Wild dog denning (June-August)
              </div>
            </div>
            <p className="mt-4 text-sm">
              South Africa's flagship wildlife destination with exceptional Big Five viewing. Private reserves like Sabi Sands, Timbavati, and Manyeleti offer off-road driving and walking safaris, providing more flexibility during green season.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Malaria-Free Reserves</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best dry season months:</strong>
                June-September (Madikwe, Pilanesberg)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best green season months:</strong>
                January-March (lush landscapes in Eastern Cape reserves)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Notable regions:</strong>
                Madikwe, Pilanesberg, Welgevonden, Eastern Cape reserves
              </div>
            </div>
            <p className="mt-4 text-sm">
              Perfect for families and those concerned about malaria medication. These reserves offer excellent Big Five viewing without malaria risk. The North West Province reserves (Madikwe, Pilanesberg) follow traditional dry/wet season patterns, while Eastern Cape reserves have more moderate seasonal variations.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Kgalagadi Transfrontier Park</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best months:</strong>
                March-May and September-November (transition seasons)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Seasonal considerations:</strong>
                Extreme heat in summer (Dec-Feb), cold nights in winter (Jun-Aug)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Predator concentration along dry riverbeds, magnificent Kalahari black-maned lions
              </div>
            </div>
            <p className="mt-4 text-sm">
              This semi-desert park spanning South Africa and Botswana offers dramatic predator action, especially along the fossil river valleys. Famous for black-maned lions, cheetahs, and raptors. Extreme temperatures make transition seasons most comfortable.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Coastal Wildlife Viewing</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Whale watching season:</strong>
                June-November (peak: August-October)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Great white shark season:</strong>
                April-October (peak: June-August)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Southern right whale calving (Aug-Oct), sardine run (June-July)
              </div>
            </div>
            <p className="mt-4 text-sm">
              South Africa's coastline offers exceptional marine wildlife viewing. Hermanus and the Western Cape coast are famous for whale watching, while the annual sardine run along the east coast creates a feeding frenzy involving dolphins, sharks, and seabirds.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">South Africa Safari Planning Tips</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold mb-4">Combining Wildlife Regions</h3>
          <p className="mb-4">
            South Africa's excellent infrastructure makes combining different wildlife regions relatively easy:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Classic combination:</strong> Kruger/private reserves with Cape Town and the Garden Route (year-round)</li>
            <li><strong>Whale and wildlife:</strong> Kruger safari with Hermanus whale watching (August-October)</li>
            <li><strong>Flowers and Kalahari:</strong> Northern Cape wildflowers and Kgalagadi predators (August-September)</li>
            <li><strong>Family-friendly:</strong> Malaria-free Eastern Cape reserves combined with Garden Route (year-round)</li>
            <li><strong>Marine Big Five and terrestrial Big Five:</strong> Gansbaai marine tours with Kruger safari (May-September)</li>
          </ul>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold mb-4">What to Pack by Season</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Dry Season (May-September)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Warm layers for morning/evening game drives</li>
                <li>Beanie/hat and gloves for winter mornings</li>
                <li>Jacket or warm fleece</li>
                <li>Sunscreen and sunglasses (still sunny days)</li>
                <li>Neutral-colored clothing (khaki, olive, brown)</li>
                <li>Camera with zoom lens (best visibility season)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Green Season (October-April)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Lightweight, breathable clothing</li>
                <li>Rain jacket or poncho</li>
                <li>Insect repellent with DEET</li>
                <li>Wide-brimmed hat and high SPF sunscreen</li>
                <li>Quick-dry fabrics</li>
                <li>Antimalarial medication (northeastern regions)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold mb-4">Booking Recommendations</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Peak Season (Jul-Sep):</strong> Book premium lodges 9-12 months in advance, National Park accommodations 11 months ahead when bookings open</li>
            <li><strong>Shoulder Seasons (May-Jun, Oct):</strong> Book 4-6 months in advance, with greater lodge availability</li>
            <li><strong>Green Season (Nov-Apr):</strong> Book 2-4 months in advance, except for December holidays which require 6+ months advance booking</li>
            <li><strong>Self-drive Kruger:</strong> Book accommodation 11 months in advance when SANParks opens bookings, regardless of season</li>
          </ul>
        </div>

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
    </div>
  )
}

export default SouthAfricaSeasonalGuidePage; 