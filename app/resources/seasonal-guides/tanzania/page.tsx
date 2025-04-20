import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Sun, CloudRain, Camera, Compass } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tanzania Safari Seasonal Guide | Safari Overland',
  description: 'Month-by-month guide to Tanzania\'s safari seasons, including the Great Migration in the Serengeti, peak times for Ngorongoro Crater, and optimal seasons for each region.',
  keywords: 'Tanzania safari seasons, best time to visit Tanzania, Serengeti migration timing, Tanzania weather, Tanzania wildlife viewing, dry season Tanzania, green season Tanzania, Ngorongoro Crater',
};

const TanzaniaSeasonalGuidePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Tanzania Safari Seasonal Guide</h1>
        <p className="text-xl text-muted-foreground">
          A comprehensive month-by-month guide to Tanzania's diverse safari destinations, from the Serengeti to Selous
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-muted rounded-lg overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image 
              src="/images/seasonal-guides/travel-guide-tanzania.jpg" 
              alt="Wildlife during different seasons in Tanzania" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">When to Visit Tanzania</h2>
            <p className="text-muted-foreground mb-6">
              Tanzania offers exceptional wildlife viewing throughout the year, but different seasons provide unique experiences. The dry seasons (January-March and June-October) are ideal for concentrated wildlife viewing, while the green seasons (April-May and November-December) showcase lush landscapes and newborn animals at lower prices.
            </p>
            <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-lg">
              <CalendarDays className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="font-medium">Peak season: July to October (Great Migration river crossings)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-3xl font-bold mb-6">Tanzania's Safari Seasons Overview</h2>
        
        <p>
          Tanzania experiences two main safari seasons—dry and green—each offering distinct advantages for wildlife viewing, photography, and overall experience. With its diverse ecosystems from the plains of the Serengeti to the tropical forests of the south, understanding seasonal patterns is essential for planning the perfect safari.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <Sun className="h-5 w-5" /> Dry Season (Jan-Mar & Jun-Oct)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Wildlife concentrates around water sources</li>
              <li>Excellent visibility with sparse vegetation</li>
              <li>Great Migration in northern Serengeti (Jul-Oct)</li>
              <li>Calving season in southern Serengeti (Jan-Mar)</li>
              <li>Peak tourist season with higher prices</li>
              <li>Comfortable temperatures with low humidity</li>
              <li>Best time for Ngorongoro Crater visits</li>
              <li>Lower risk of malaria with fewer mosquitoes</li>
            </ul>
          </div>
          
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <CloudRain className="h-5 w-5" /> Green Season (Apr-May & Nov-Dec)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Lush, vibrant landscapes with dramatic skies</li>
              <li>Excellent for photography and birdwatching</li>
              <li>Lower tourist numbers and better rates</li>
              <li>Many newborn animals and predator action</li>
              <li>Some remote camps closed during heavy rains</li>
              <li>The "long rains" (Apr-May) can impact travel</li>
              <li>The "short rains" (Nov-Dec) usually milder</li>
              <li>Great Migration in central/southern Serengeti</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Month-by-Month Tanzania Safari Guide</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">January & February</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Hot and dry with average temperatures of 28-30°C (82-86°F). Clear skies in the north, possible short rains in southern parks.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Excellent for witnessing the Great Migration calving season in the southern Serengeti. Over 400,000 wildebeest calves are born in a 2-3 week period, attracting numerous predators.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Southern Serengeti (Ndutu area), Ngorongoro Conservation Area, Lake Manyara, central Serengeti
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Wildebeest calving season, abundant predator activity, many resident birds in breeding plumage
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> High season with good availability except in premium calving areas where advance booking is essential
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">March</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Warming up (29-31°C/84-88°F) with increasing humidity. Rain may begin toward month-end in northern circuits.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Still excellent viewing in southern Serengeti as the last of the calving season concludes. Migration begins moving northward.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Southern and central Serengeti, Ngorongoro Crater, Tarangire National Park
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> End of calving season, continued predator action, excellent bird watching with resident and migratory species
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Shoulder season begins with good rates and fewer visitors. Most camps still open.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">April & May</h3>
          <p className="mb-3">
            <strong>Weather:</strong> The "long rains" with heavy afternoon downpours. Warm and humid (25-28°C/77-82°F). Some areas, particularly in the north, may experience significant rainfall.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> More challenging as some roads become difficult to navigate. Wildlife more dispersed with abundant water sources. Great Migration herds spread through central Serengeti.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Central Serengeti (all-weather roads), Ngorongoro Crater (though foggy at times), western corridor of Serengeti (late May)
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Dramatic landscapes with lush vegetation and wildflowers. Excellent for landscape photography with moody skies and dramatic light.
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Low season with fewest tourists and best rates of the year. Many high-end camps offer 50%+ discounts, though some close entirely.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">June</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Drying out with cooler temperatures (22-26°C/72-79°F). Occasional showers possible, particularly in western areas.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Improving significantly as vegetation thins and wildlife begins to concentrate around permanent water sources. Migration moving through western corridor of Serengeti.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Western Serengeti (Grumeti River), Central Serengeti, Northern Tanzania circuit, Selous (southern Tanzania) reopening after rains
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Possible early Grumeti River crossings as migration moves north, excellent predator sightings
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Beginning of high season with increasing visitor numbers. Availability still good but prime locations booking up.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">July & August</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Cool and dry (20-25°C/68-77°F). Chilly mornings and evenings, especially in crater highlands and high-altitude areas.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Prime wildlife viewing conditions across the country. Migration reaches northern Serengeti and begins crossing the Mara River into Kenya.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Northern Serengeti (Mara River), Ngorongoro Crater, Tarangire National Park (elephant concentrations), Ruaha National Park
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Dramatic river crossings in northern Serengeti, massive elephant herds in Tarangire, peak predator activity across all parks
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Peak season with highest visitor numbers and rates. Book accommodations 9-12 months in advance, especially for northern Serengeti.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">September & October</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Warming up (25-28°C/77-82°F) and still dry. Some rain possible by late October in some regions.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Excellent conditions continue. Great Migration still crossing between northern Serengeti and Kenya's Masai Mara, with herds often moving back and forth.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Northern Serengeti, Tarangire National Park, Ruaha and Katavi (southern/western Tanzania)
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Continued river crossings, excellent predator sightings, large elephant herds in Tarangire
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Still peak season but slightly fewer visitors than July-August. Premium prices but slightly better availability.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">November & December</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Short rains begin, with brief afternoon showers. Warm temperatures (26-29°C/79-84°F) with increasing humidity.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Migration returns to central and southern Serengeti. Wildlife more dispersed but still excellent viewing, especially when showers pause.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Central Serengeti, Ngorongoro Crater (lush and green), southern Serengeti (by late December)
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Migration heading south, excellent bird watching as migratory species arrive, landscapes turning green and lush
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Shoulder season with good rates except during Christmas/New Year holiday period, which requires advance booking.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-6">Tanzania's Key Safari Regions by Season</h2>

        <div className="grid md:grid-cols-2 gap-8 my-10">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Serengeti National Park</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best dry season months:</strong>
                January-March (southern), June-October (northern)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best green season months:</strong>
                November-December (central), April-May (central/western)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Calving season (Jan-Feb), River crossings (Jul-Oct)
              </div>
            </div>
            <p className="mt-4 text-sm">
              The Serengeti's seasonal experience varies dramatically based on region. The migration follows a clockwise route: southern plains (Dec-Mar), western corridor (Apr-Jun), and northern Serengeti (Jul-Nov).
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Ngorongoro Crater</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best dry season months:</strong>
                June-October (clearest views), January-February
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best green season months:</strong>
                November-December (fewer crowds), March
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Flamingoes on crater lake (Nov-May), highest predator density year-round
              </div>
            </div>
            <p className="mt-4 text-sm">
              The crater's enclosed ecosystem means excellent wildlife viewing year-round, though misty conditions can affect visibility during rainy seasons. Morning visits are best to avoid crowds and afternoon fog.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Tarangire National Park</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best dry season months:</strong>
                July-October (massive elephant herds)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best green season months:</strong>
                November-December (baobab and landscape photography)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Elephant migration (Jun-Oct), python breeding season (Mar-Apr)
              </div>
            </div>
            <p className="mt-4 text-sm">
              Tarangire transforms dramatically between seasons. During dry months, hundreds of elephants congregate along the Tarangire River, creating one of Africa's greatest elephant spectacles.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Southern Tanzania (Selous/Ruaha/Katavi)</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best dry season months:</strong>
                July-November (peak wildlife concentrations)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best green season months:</strong>
                January-March (lush landscapes, some camps open)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Hippo pools in Katavi (Sept-Oct), wild dog denning in Selous (Jun-Aug)
              </div>
            </div>
            <p className="mt-4 text-sm">
              Southern parks operate seasonally, with many camps closed during the heavy rains (Apr-May). The dry season offers spectacular wildlife viewing with far fewer visitors than northern circuit parks.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Tracking the Great Migration in Tanzania</h2>
        
        <p>
          The Great Migration—a continuous movement of over 1.5 million wildebeest and hundreds of thousands of zebra and gazelle—is Tanzania's most famous wildlife spectacle. Unlike common misconceptions, the migration is a year-round, circular movement through the Serengeti ecosystem, with different highlights each season:
        </p>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">December - March</h4>
              <p className="text-sm">
                <strong>Location:</strong> Southern Serengeti plains and Ndutu area
              </p>
              <p className="text-sm">
                <strong>Highlight:</strong> Calving season with approximately 8,000 wildebeest born daily during the peak in February, creating intense predator action
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">April - June</h4>
              <p className="text-sm">
                <strong>Location:</strong> Central and Western Serengeti
              </p>
              <p className="text-sm">
                <strong>Highlight:</strong> Long columns of wildebeest moving northward, with potential river crossings at the Grumeti River in June
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">July - November</h4>
              <p className="text-sm">
                <strong>Location:</strong> Northern Serengeti and Masai Mara (Kenya)
              </p>
              <p className="text-sm">
                <strong>Highlight:</strong> Dramatic Mara River crossings with crocodile-infested waters creating the migration's most spectacular and perilous moments
              </p>
            </div>
          </div>
          <p className="text-sm mt-4">
            <strong>Note:</strong> Migration timing varies year to year based on rainfall patterns. The herds follow the rains and fresh grass, making their exact movements somewhat unpredictable.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-6">Tanzania Safari Planning Tips</h2>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold mb-4">Booking Recommendations</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Peak Season (Jul-Oct):</strong> Book 9-12 months in advance, especially for premium camps in northern Serengeti.</li>
            <li><strong>Calving Season (Jan-Feb):</strong> Book 6-9 months in advance for southern Serengeti/Ndutu area.</li>
            <li><strong>Shoulder Seasons (Nov-Dec, Mar):</strong> Book 3-6 months in advance for better availability and rates.</li>
            <li><strong>Green Season (Apr-May):</strong> Book 2-3 months in advance, with greater flexibility and significant discounts.</li>
          </ul>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold mb-4">What to Pack by Season</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Dry Season (Jun-Oct, Jan-Feb)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Lightweight, neutral-colored clothing (browns, khakis, olive)</li>
                <li>Warm jacket or fleece for morning game drives</li>
                <li>Wide-brimmed hat and high SPF sunscreen</li>
                <li>Dust mask or bandana (especially for northern circuit)</li>
                <li>Binoculars and camera with zoom lens</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Green Season (Nov-Dec, Mar-May)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Lightweight, quick-drying clothing</li>
                <li>Good quality rain jacket</li>
                <li>Waterproof bag for camera equipment</li>
                <li>Insect repellent with DEET</li>
                <li>Waterproof/mud-proof hiking boots</li>
              </ul>
            </div>
          </div>
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

export default TanzaniaSeasonalGuidePage; 