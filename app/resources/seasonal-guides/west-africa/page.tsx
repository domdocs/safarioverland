import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Sun, CloudRain, Camera, Compass } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'West Africa Safari Seasonal Guide | Safari Overland',
  description: 'Comprehensive guide to the best times for wildlife viewing in West Africa, including Ghana, Senegal, Gambia, and other countries throughout the year.',
  keywords: 'West Africa safari seasons, Ghana wildlife viewing, Senegal birding, Mole National Park, Gambia river cruise, best time visit West Africa, green season, dry season',
};

const WestAfricaSeasonalGuidePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">West Africa Seasonal Guide</h1>
        <p className="text-xl text-muted-foreground">
          Best times for wildlife viewing and cultural experiences in Ghana, Senegal, and other West African destinations
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-muted rounded-lg overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image 
              src="/images/seasonal-guides/travel-guide-west-africa-birds.jpg" 
              alt="Birding and wildlife in West Africa" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">When to Visit West Africa</h2>
            <p className="text-muted-foreground mb-6">
              West Africa offers exceptional wildlife and cultural experiences, with distinct advantages in each season. The dry season (November-April) provides optimal wildlife viewing with clear skies and minimal rainfall, while the green season (May-October) offers lush landscapes, fewer tourists, and unique natural phenomena.
            </p>
            <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-lg">
              <CalendarDays className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="font-medium">Peak season: November to March (Dry season)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-3xl font-bold mb-6">West Africa Safari Seasons Overview</h2>
        
        <p>
          West Africa's diverse ecosystems—from the coastal mangroves of Senegal to the savanna woodlands of Ghana and the pristine forests of Ivory Coast—offer unique safari experiences that differ considerably from those in Eastern and Southern Africa. While less visited by traditional safari-goers, West Africa rewards travelers with exceptional bird watching, primate encounters, and authentic cultural experiences in less-frequented national parks and reserves.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <Sun className="h-5 w-5" /> Dry Season (November-April)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Optimal wildlife viewing with animals concentrated around water sources</li>
              <li>Excellent visibility with sparse vegetation</li>
              <li>Clear skies with minimal rainfall</li>
              <li>Migratory birds present in coastal areas</li>
              <li>Cooler temperatures, especially December-January</li>
              <li>Lower humidity and minimal mosquitoes</li>
              <li>Better road conditions for accessing remote parks</li>
              <li>Peak season for most wildlife destinations</li>
            </ul>
          </div>
          
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <CloudRain className="h-5 w-5" /> Green Season (May-October)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Lush, vibrant landscapes with dramatic lighting</li>
              <li>Fewer tourists and more exclusive experiences</li>
              <li>Lower rates for accommodations</li>
              <li>Breeding season for many bird species</li>
              <li>Flowering plants and fruiting trees attract diverse wildlife</li>
              <li>Cultural festivals and traditional ceremonies</li>
              <li>Higher humidity and temperatures</li>
              <li>Some areas may have limited accessibility due to road conditions</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Month-by-Month West Africa Guide</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">November to January</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Beginning of the dry season with cooling temperatures. Daytime temperatures range from 25-32°C (77-90°F) with cooler evenings, especially in inland areas. The Harmattan wind brings dry, dusty conditions from December onwards, particularly in the Sahel regions.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Excellent conditions as vegetation thins and wildlife concentrates around water sources. Peak birding season in coastal areas like Senegal and Gambia with numerous migratory species arriving from Europe.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Mole National Park (Ghana), Sine-Saloum Delta (Senegal), River Gambia National Park, Pendjari National Park (Benin)
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Arrival of migratory birds to coastal wetlands, traditional harvest festivals in rural communities
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Peak tourist season, especially during December holidays. Advance booking recommended for popular lodges. Excellent photography conditions with clear air (except during heavy Harmattan periods).
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">February to April</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Heart of the dry season. Temperatures gradually increasing, reaching 30-38°C (86-100°F) by April. Low humidity and minimal rainfall. Harmattan winds diminish by late February in coastal areas but may persist inland.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Prime game viewing continues with maximum visibility through sparse vegetation. Animals increasingly concentrate around permanent water sources. Many migratory birds begin departing by April.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Comoé National Park (Ivory Coast), Kiang West National Park (Gambia), Mole National Park (Ghana), W National Park (Niger)
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Traditional mask festivals, hippo gatherings at shrinking water bodies, excellent elephant viewing in Mole National Park
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> High season continues through February, transitioning to shoulder season by April. Increasingly hot conditions, especially inland, with afternoon activities often curtailed due to heat.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">May to July</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Transition to rainy season. Initially hot with increasing humidity, followed by cooling rainfall patterns. Coastal regions typically receive rain earlier than inland areas. Temperatures range from 25-33°C (77-91°F) with high humidity.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Changing conditions as early rains stimulate new growth. Animals begin dispersing as water becomes more widely available. Excellent for forest primates as fruiting trees become productive.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Kakum National Park (Ghana), Taï National Park (Ivory Coast), Boabeng-Fiema Monkey Sanctuary (Ghana)
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Breeding season for many birds with vibrant plumage, amphibian emergence, increased primate activity around fruiting trees
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Low season with significantly reduced tourist numbers. Better availability and rates at lodges. Some roads may become difficult to navigate as rains intensify, particularly in more remote areas.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">August to October</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Peak of the rainy season, particularly in coastal areas. High humidity with regular rainfall, often in dramatic afternoon thunderstorms. Temperatures moderate at 24-30°C (75-86°F) but with high humidity.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Lush landscapes with dispersed wildlife. More challenging game viewing in savanna regions, but excellent for forest species. Numerous insects, amphibians, and reptiles active.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Gola Rainforest National Park (Sierra Leone), Ankasa Conservation Area (Ghana), coastal regions for marine life
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Turtle nesting season along coastal areas, maximum forest productivity with numerous plant species flowering and fruiting
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Continued low season with fewest visitors. Some lodges may close for renovations or offer limited services. Dramatic lighting conditions for photography. Some areas may be inaccessible due to flooded roads.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-6">Key West African Safari Regions by Season</h2>

        <div className="grid md:grid-cols-2 gap-8 my-10">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Ghana's Northern Parks</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best dry season months:</strong>
                November to March (optimal wildlife viewing)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Green season considerations:</strong>
                Limited access to some areas from July to September
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Elephant gatherings at water sources (January-March), excellent antelope viewing
              </div>
            </div>
            <p className="mt-4 text-sm">
              Mole National Park offers Ghana's premier safari experience with elephants, buffalo, kob, waterbuck, and baboons. Walking safaris are a highlight, with experienced rangers leading guided treks to encounter wildlife up close.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Coastal Wetlands & Mangroves</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best birding months:</strong>
                November to February (migratory birds present)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Green season advantages:</strong>
                Breeding plumage for resident birds (May-July)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Notable regions:</strong>
                Sine-Saloum Delta (Senegal), Bijagos Archipelago (Guinea-Bissau), Keta Lagoon (Ghana)
              </div>
            </div>
            <p className="mt-4 text-sm">
              West Africa's coastal wetlands host impressive concentrations of wading birds, including flamingos, pelicans, herons, and numerous migratory species. The Sine-Saloum Delta in Senegal is particularly renowned for its biodiversity and traditional fishing communities.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Rainforest Regions</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Less seasonal variability:</strong>
                Year-round wildlife viewing with slight advantages in drier months
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Fruiting seasons:</strong>
                May-June and September-October (peak primate activity)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Chimpanzee tracking, forest elephant sightings, incredible diversity of butterflies and birds
              </div>
            </div>
            <p className="mt-4 text-sm">
              West Africa's rainforests harbor exceptional biodiversity, including chimpanzees, forest elephants, and numerous primate species. Kakum National Park in Ghana is famous for its canopy walkway, while Taï National Park in Ivory Coast offers pristine habitat for endangered western chimpanzees.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">The Gambia River Basin</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best cruise months:</strong>
                November to February (comfortable temperatures, clear skies)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Water level considerations:</strong>
                Higher water levels from August to October (better navigation, less wildlife concentration)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Hippo pods, Nile crocodiles, diverse birdlife along river banks
              </div>
            </div>
            <p className="mt-4 text-sm">
              River cruises along the Gambia River offer exceptional wildlife viewing opportunities with minimal exertion. Baboon Island (part of River Gambia National Park) is home to the Chimpanzee Rehabilitation Project, where orphaned chimps have been successfully reintroduced to the wild.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Planning Your West Africa Safari</h2>
        
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Practical Considerations</h3>
          <p className="mb-4">
            When planning a West African safari, several practical considerations are important:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Health precautions:</strong> Yellow fever vaccination is mandatory for entry to most West African countries. Malaria prophylaxis is strongly recommended year-round.</li>
            <li><strong>Visa requirements:</strong> Most West African countries require visas, which should be arranged well in advance of travel.</li>
            <li><strong>Transportation:</strong> Internal flights are limited in many countries, making road transfers necessary. Allow extra time during green season when road conditions may deteriorate.</li>
            <li><strong>Accommodation:</strong> Wildlife tourism infrastructure is less developed than in Eastern or Southern Africa, with fewer luxury options but more authentic experiences.</li>
            <li><strong>Guides:</strong> Local expertise is essential for wildlife spotting. Arrange qualified guides in advance, especially for specialized interests like birding or primate viewing.</li>
          </ul>
          <p className="text-sm italic">
            Note: Political situations can change quickly in some West African countries. Always check current travel advisories before planning your trip.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold mb-4">What to Pack by Season</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Dry Season (November-April)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Lightweight, breathable clothing in neutral colors</li>
                <li>Long-sleeved shirts and trousers for sun protection</li>
                <li>Light sweater or jacket for cool evenings (Dec-Jan)</li>
                <li>Wide-brimmed hat and high SPF sunscreen</li>
                <li>Dust protection (bandana/buff) during Harmattan</li>
                <li>Comfortable walking shoes or lightweight hiking boots</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Green Season (May-October)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Quick-dry clothing and extra changes</li>
                <li>Lightweight rain jacket or poncho</li>
                <li>Waterproof bag for electronics</li>
                <li>Insect repellent with high DEET concentration</li>
                <li>Moisture-wicking fabrics</li>
                <li>Waterproof footwear for muddy conditions</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm">
            Year-round essentials include good binoculars (essential for birding), a camera with telephoto lens, personal medications, and a reusable water bottle.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Recommended Safari Combinations</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">12-Day Ghana Wildlife & Culture (Dry Season)</h4>
              <p className="text-sm">
                Accra → Kakum National Park for canopy walkway and forest wildlife (2 nights) → Ankasa Conservation Area (2 nights) → Boabeng-Fiema Monkey Sanctuary (1 night) → Mole National Park for elephants and walking safaris (3 nights) → Wechiau Community Hippo Sanctuary (1 night) → Cultural experiences in Kumasi (2 nights) → Accra
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">10-Day Senegal & Gambia Birding (November-February)</h4>
              <p className="text-sm">
                Dakar → Sine-Saloum Delta for coastal birds (3 nights) → Djoudj National Bird Sanctuary (2 nights) → Gambia River cruise (3 nights) → Banjul with visits to nearby reserves (1 night)
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">14-Day West Africa Biodiversity (Transition Season - April/May)</h4>
              <p className="text-sm">
                Abidjan → Taï National Park for chimpanzees (3 nights) → Banco National Park (1 night) → Accra → Shai Hills Resource Reserve (1 night) → Kakum National Park (2 nights) → Mole National Park (3 nights) → Wli Waterfalls and surrounding forests (2 nights) → Accra
              </p>
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

export default WestAfricaSeasonalGuidePage;