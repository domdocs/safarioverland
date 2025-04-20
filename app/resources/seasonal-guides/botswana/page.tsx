import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Sun, CloudRain, Camera, Compass } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Botswana Safari Seasonal Guide | Safari Overland',
  description: 'Detailed information on Botswana\'s dramatic seasonal changes, from dry season to Okavango Delta floods, and the best times to visit each region.',
  keywords: 'Botswana safari seasons, Okavango Delta flood season, best time Chobe National Park, Botswana wildlife viewing, Makgadikgadi Pans, Kalahari Desert, green season Botswana',
};

const BotswanaSeasonalGuidePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Botswana Seasonal Guide</h1>
        <p className="text-xl text-muted-foreground">
          Detailed information on Botswana's dramatic seasonal changes, from dry season to Okavango floods
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-muted rounded-lg overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image 
              src="/images/seasonal-guides/travel-guide-botswana.jpg" 
              alt="Wildlife during Botswana's different seasons" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">When to Visit Botswana</h2>
            <p className="text-muted-foreground mb-6">
              Botswana offers diverse safari experiences throughout the year, with distinct advantages in each season. The dry winter months (May-October) provide exceptional game viewing around permanent water sources, while the green summer season (November-April) offers lush landscapes, lower rates, and unique wildlife events.
            </p>
            <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-lg">
              <CalendarDays className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="font-medium">Peak season: July to October (Peak flood & dry season)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-3xl font-bold mb-6">Botswana's Safari Seasons Overview</h2>
        
        <p>
          Botswana's seasons create a fascinating natural rhythm, particularly in the Okavango Delta, where flood waters arrive paradoxically during the dry winter months. This unique hydrological system, combined with the country's diverse ecosystems—from the lush waterways of the Delta to the arid expanses of the Kalahari—make seasonal planning essential for the optimal safari experience.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <Sun className="h-5 w-5" /> Dry Season (May-October)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Peak Okavango Delta flood levels (June-August)</li>
              <li>Exceptional wildlife concentration around water</li>
              <li>Excellent predator-prey interactions</li>
              <li>Clear, sunny days with minimal rainfall</li>
              <li>Cooler temperatures, especially at night</li>
              <li>Prime mokoro (traditional canoe) season</li>
              <li>Premium pricing and high demand for lodges</li>
              <li>Lower risk of malaria with fewer mosquitoes</li>
            </ul>
          </div>
          
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <CloudRain className="h-5 w-5" /> Green Season (November-April)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Dramatic summer thunderstorms and lush landscapes</li>
              <li>Birthing season with numerous newborn animals</li>
              <li>Exceptional bird watching with migratory species</li>
              <li>Lower rates with significant discounts available</li>
              <li>Fewer tourists and more exclusive experiences</li>
              <li>Zebra and wildebeest migrations in the Makgadikgadi</li>
              <li>Central Kalahari transforms with fresh vegetation</li>
              <li>Higher temperatures with afternoon cooling from storms</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Month-by-Month Botswana Safari Guide</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">January & February</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Peak of summer with warm to hot days (30-35°C/86-95°F) and warm nights. Frequent afternoon thunderstorms with dramatic skies. Highest rainfall months.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Lush green landscapes with dispersed wildlife. Excellent predator activity due to vulnerable newborns. Zebra migration in the Makgadikgadi. Large herds in Central Kalahari.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Central Kalahari Game Reserve, Makgadikgadi Pans, Nxai Pan National Park (spectacular zebra migration)
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Peak calving season, especially for plains game. Exceptional bird watching with migratory species in breeding plumage. Spectacular green Kalahari.
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Low season with significantly reduced rates (up to 40% off peak season prices). Fewer visitors creating more exclusive experiences. Some remote camps closed.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">March & April</h3>
          <p className="mb-3">
            <strong>Weather:</strong> End of rainy season with decreasing rainfall, especially by late April. Temperatures moderating (25-30°C/77-86°F) with pleasant evenings.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Still lush but beginning to dry out. Wildlife more visible as vegetation thins. Predators active with many young animals. Zebra migration returns north from Makgadikgadi.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Chobe National Park, Moremi Game Reserve, Makgadikgadi Pans (early March), Savuti
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Excellent photographic opportunities with dramatic skies and lush backdrops. Many young animals now more mobile.
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Shoulder season with moderate visitor numbers and good value rates. Most camps open and accessible by April. Excellent combination of value and good game viewing.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">May & June</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Beginning of dry season with cool to mild days (22-28°C/72-82°F) and cold nights (5-10°C/41-50°F). Virtually no rainfall. Floodwaters begin reaching the Okavango Delta.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Improving dramatically as vegetation dries and thins. Animals begin concentrating around permanent water. Flood plains in the Delta start filling, attracting wildlife.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Okavango Delta (water activities begin), Moremi Game Reserve, Chobe River
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Delta floods begin, offering boat and mokoro activities in select areas. Excellent time for combination of land and water activities.
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Beginning of high season with increasing visitor numbers. May offers better value before peak season pricing takes full effect in June. Excellent game viewing with moderate crowds.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">July & August</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Cool, dry winter. Warm days (20-25°C/68-77°F) and very cold nights (often below 5°C/41°F). Clear skies and excellent visibility. Okavango Delta floods reach their peak.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Prime wildlife viewing conditions. Animals concentrate around permanent water sources. Predators actively hunt around waterholes. Delta channels fully navigable.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Okavango Delta (peak water levels), Moremi Game Reserve, Chobe National Park, Linyanti and Selinda
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Peak flood season in the Delta, offering exceptional mokoro and boating experiences. Large elephant herds in Chobe.
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Peak tourist season with highest visitor numbers and rates. Advance booking (9-12 months) essential, especially for premium Delta camps. Coldest nights of the year—warm clothing necessary.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">September & October</h3>
          <p className="mb-3">
            <strong>Weather:</strong> End of dry season and hottest months. Temperatures rising dramatically (35-40°C/95-104°F). Very dry with minimal humidity initially. Heat builds toward October.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Often considered the best wildlife viewing months. Extreme concentration around remaining water. Dramatic predator-prey interactions. Delta flood receding.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> All major safari regions, particularly Chobe River, Savuti, Linyanti, and Khwai areas of Moremi
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Massive elephant herds along Chobe River frontage. Exceptional predator activity. Increasingly dramatic interactions at dwindling water sources.
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Still high season with premium rates, particularly in September. October can be extremely hot but offers extraordinary game viewing. Prepare for heat with afternoon siestas.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">November & December</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Transition to rainy season. Hot days (30-35°C/86-95°F) with increasing cloud cover and humidity. First rains typically arrive in November, bringing welcome relief from the heat.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Dramatic transformations as first rains arrive. Animals disperse with new water availability. Birthing season begins for many species. Fresh vegetation sprouts rapidly.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Central Kalahari (beginning to transform), Chobe National Park, Nxai Pan, Makgadikgadi (as zebra migration begins)
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> First newborn antelopes, especially impala. Arrival of migratory birds. Zebra migration begins moving south to Makgadikgadi from December. Dramatic skies for photography.
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Shoulder/low season with reduced rates beginning in November (except festive season in late December). Fewer visitors with more exclusive experiences. Some afternoon activities may be interrupted by thunderstorms.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-6">Botswana's Key Safari Regions by Season</h2>

        <div className="grid md:grid-cols-2 gap-8 my-10">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Okavango Delta</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Peak flood season:</strong>
                June to August (paradoxically during the dry winter)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Low water season:</strong>
                November to April (during the rainy summer)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special considerations:</strong>
                Water levels determine activities—mokoro (dugout canoe) and boating versus land-based game drives. Camp selection should reflect desired activities.
              </div>
            </div>
            <p className="mt-4 text-sm">
              This UNESCO World Heritage Site offers dramatically different experiences based on season. During flood season, water-based activities predominate in many areas, while low-water months provide more extensive land access. Some camps offer both year-round, while others specialize in specific experiences.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Chobe National Park</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best dry season months:</strong>
                August to October (massive elephant herds)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Green season advantages:</strong>
                February to April (fewer crowds, lush landscapes)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Up to 50,000 elephants in peak dry season, excellent predator activity in Savuti year-round
              </div>
            </div>
            <p className="mt-4 text-sm">
              Chobe offers distinct experiences in different sections. The riverfront is famous for elephant concentrations during dry months. Savuti Channel fluctuates between wet and dry cycles over years, creating changing wildlife patterns, while Linyanti offers exclusive, private experiences.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Central Kalahari & Makgadikgadi</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best green season months:</strong>
                January to April (Central Kalahari), December to April (Makgadikgadi zebra migration)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Dry season considerations:</strong>
                Limited wildlife but stark beauty, meerkats active year-round in Makgadikgadi
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Zebra migration (second largest in Africa), exceptional black-maned lion viewing, desert-adapted species
              </div>
            </div>
            <p className="mt-4 text-sm">
              These desert regions offer counter-intuitive seasonal patterns, with the best wildlife viewing during the "green season" when rains transform barren landscapes into wildlife havens. The Makgadikgadi Pans host spectacular zebra migrations, while the Central Kalahari bursts with life after rains.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Moremi Game Reserve</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best overall months:</strong>
                July to October (peak wildlife concentration)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Green season value:</strong>
                April to June (good wildlife, lower rates, fewer visitors)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Exceptional predator density, particularly around Khwai area
              </div>
            </div>
            <p className="mt-4 text-sm">
              Moremi occupies the eastern portion of the Okavango Delta, offering a mix of permanent water and seasonal floodplains. This creates diverse habitats supporting remarkable wildlife density. The Khwai River area is particularly known for predator activity year-round.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Botswana Safari Planning Tips</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold mb-4">Booking Recommendations</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Peak Season (Jul-Oct):</strong> Book 12-18 months in advance for premium Delta and Chobe camps</li>
            <li><strong>Green Season (Nov-Apr):</strong> Book 6-9 months in advance, with more last-minute availability possible</li>
            <li><strong>Holiday periods:</strong> Christmas/New Year and Easter require 12+ months advance booking regardless of season</li>
            <li><strong>Mobile safaris:</strong> 9-12 months for peak season, 3-6 months for green season</li>
            <li><strong>Scheduled departures:</strong> More economical options with set departure dates require 6+ months booking during peak season</li>
          </ul>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold mb-4">What to Pack by Season</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Dry Season (May-October)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Warm layers for morning/evening (temperatures can drop below freezing in July/August)</li>
                <li>Thermal underwear for Jul-Aug game drives</li>
                <li>Windproof jacket and warm hat/gloves</li>
                <li>Neutral colors (khaki, olive, brown)</li>
                <li>Sunscreen and sunglasses</li>
                <li>Dust protection (bandana/buff)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Green Season (November-April)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Lightweight, breathable clothing</li>
                <li>Rain jacket or poncho for afternoon storms</li>
                <li>Quick-dry fabrics</li>
                <li>Strong insect repellent with DEET</li>
                <li>Wide-brimmed hat for sun protection</li>
                <li>Antimalarial medication</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm">
            Year-round essentials include a good camera with telephoto lens, binoculars, and a headlamp/flashlight. Neutral-colored clothing is recommended regardless of season.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Recommended Safari Combinations</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">10-Day Classic Water & Wildlife (Dry Season)</h4>
              <p className="text-sm">
                Maun → Okavango Delta water camp (3 nights) → Moremi/Khwai (3 nights) → Chobe National Park (3 nights) → Victoria Falls (optional extension)
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">10-Day Green Season Special</h4>
              <p className="text-sm">
                Maun → Central Kalahari (3 nights) → Makgadikgadi Pans for zebra migration (2 nights) → Okavango Delta (4 nights) → Maun
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">14-Day Ultimate Botswana (Shoulder Season)</h4>
              <p className="text-sm">
                Maun → Nxai Pan (2 nights) → Okavango Delta (3 nights) → Moremi/Khwai (3 nights) → Savuti (2 nights) → Chobe River (2 nights) → Kasane
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

export default BotswanaSeasonalGuidePage; 