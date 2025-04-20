import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Sun, CloudRain, Camera, Compass } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Uganda & Rwanda Safari Seasonal Guide | Safari Overland',
  description: 'Comprehensive guide to the best times for gorilla trekking and wildlife viewing in Uganda and Rwanda throughout the year, including Bwindi, Volcanoes National Park, and Queen Elizabeth.',
  keywords: 'Uganda Rwanda safari seasons, gorilla trekking best time, Bwindi Impenetrable Forest, Volcanoes National Park, Queen Elizabeth National Park, Uganda wildlife viewing, Rwanda dry season, chimpanzee tracking',
};

const UgandaRwandaSeasonalGuidePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Uganda & Rwanda Seasonal Guide</h1>
        <p className="text-xl text-muted-foreground">
          Best times for gorilla trekking and wildlife viewing in Uganda and Rwanda throughout the year
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-muted rounded-lg overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image 
              src="/images/seasonal-guides/travel-guide-uganda-rwanda.jpg" 
              alt="Gorilla trekking in Uganda and Rwanda" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">When to Visit Uganda & Rwanda</h2>
            <p className="text-muted-foreground mb-6">
              The best time to visit Uganda and Rwanda for gorilla trekking is during the dry seasons (June-September and December-February), when trails are less muddy and hiking conditions are optimal. However, both countries offer year-round primate viewing with each season providing unique advantages.
            </p>
            <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-lg">
              <CalendarDays className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="font-medium">Peak season: June to September (Long dry season)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-3xl font-bold mb-6">Uganda & Rwanda Safari Seasons Overview</h2>
        
        <p>
          Located in the heart of East Africa along the Albertine Rift, Uganda and Rwanda share similar climatic patterns with two dry seasons and two rainy seasons. Both countries offer incredible primate experiences, including mountain gorillas, chimpanzees, and golden monkeys, alongside classic savanna safaris in Uganda.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <Sun className="h-5 w-5" /> Dry Seasons (Dec-Feb & Jun-Sep)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Optimal trekking conditions with drier trails</li>
              <li>Better gorilla photography opportunities</li>
              <li>Easier wildlife spotting in savanna parks</li>
              <li>Higher visitor numbers and permit demand</li>
              <li>Premium pricing for accommodations</li>
              <li>Long dry season (Jun-Sep) is generally drier</li>
              <li>Short dry season (Dec-Feb) may have occasional showers</li>
              <li>Advance booking essential, especially for permits</li>
            </ul>
          </div>
          
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <CloudRain className="h-5 w-5" /> Rainy Seasons (Mar-May & Oct-Nov)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Lush, vibrant landscapes with excellent photography</li>
              <li>More challenging trekking conditions</li>
              <li>Fewer tourists and better availability</li>
              <li>Lower rates for accommodations</li>
              <li>Excellent birding with migratory species</li>
              <li>Long rains (Mar-May) more intense and consistent</li>
              <li>Short rains (Oct-Nov) generally milder</li>
              <li>More fruit availability can mean easier gorilla tracking</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Month-by-Month Uganda & Rwanda Guide</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">December to February</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Generally dry with occasional light showers. Average temperatures of 24-27°C (75-80°F) in lower elevations, cooler in mountainous regions at 15-20°C (59-68°F).
          </p>
          <p className="mb-3">
            <strong>Gorilla trekking:</strong> Excellent conditions with relatively dry trails in Bwindi Impenetrable Forest (Uganda) and Volcanoes National Park (Rwanda). Gorillas tend to stay at lower elevations during this period.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Very good in Uganda's savanna parks like Queen Elizabeth and Murchison Falls, with animals congregating around water sources. Good visibility with shorter grass.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Bwindi Impenetrable Forest, Volcanoes National Park, Queen Elizabeth National Park, Murchison Falls National Park
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> High season during December-January holidays with advance booking essential. February offers excellent conditions with slightly lower visitor numbers.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">March to May</h3>
          <p className="mb-3">
            <strong>Weather:</strong> The "long rains" with regular downpours, particularly in April. Warm and humid with average temperatures of 23-25°C (73-77°F), though mountain regions remain cooler.
          </p>
          <p className="mb-3">
            <strong>Gorilla trekking:</strong> More challenging with muddy, slippery trails, but still possible. Increased fruit availability may mean easier gorilla locating as they move less for food. Rain gear essential.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Lush landscapes but more challenging wildlife spotting in savanna parks due to tall grass and dispersed wildlife. Exceptional bird watching with migratory species present.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Kibale Forest for chimpanzee tracking (Uganda), Nyungwe Forest (Rwanda), Lake Mburo National Park (Uganda)
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Low season with fewer tourists and better availability. Significant discounts on accommodations. Permits more readily available, even with shorter notice.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">June to September</h3>
          <p className="mb-3">
            <strong>Weather:</strong> The main dry season with minimal rainfall. Pleasant temperatures averaging 24-27°C (75-80°F) in lowlands and 15-20°C (59-68°F) in highlands. Clear skies with excellent visibility.
          </p>
          <p className="mb-3">
            <strong>Gorilla trekking:</strong> Optimal conditions with drier trails making for easier hiking in both Bwindi (Uganda) and Volcanoes National Park (Rwanda). Better photography opportunities with clearer lighting.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Excellent in Uganda's savanna parks. Animals concentrate around remaining water sources. Vegetation thins out providing better visibility. July-August is prime time for wildlife viewing.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> All gorilla regions (Bwindi, Mgahinga, Volcanoes), Queen Elizabeth National Park for tree-climbing lions, Murchison Falls for large mammals, Akagera National Park (Rwanda)
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Peak season with highest visitor numbers. Advance booking essential, especially for gorilla permits (6-12 months ahead). Premium pricing for accommodations.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">October to November</h3>
          <p className="mb-3">
            <strong>Weather:</strong> The "short rains" with afternoon showers, generally less intense than the March-May period. Temperatures averaging 23-26°C (73-79°F) with higher humidity.
          </p>
          <p className="mb-3">
            <strong>Gorilla trekking:</strong> Conditions are variable but generally good, with periodic showers making trails occasionally slippery. Gorillas may be found at lower elevations where fruiting trees are more abundant.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Transition period as landscapes begin to green. Still good viewing in early October before heavy rains begin. November brings lush vegetation but more dispersed wildlife.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Kibale Forest (Uganda) for chimpanzees, Lake Mburo for zebra and antelope, Semuliki National Park (Uganda) for Central African species
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Shoulder season with moderate visitor numbers. Good availability and reasonable rates. Permits more readily available than during peak season.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-6">Key Safari Regions by Season</h2>

        <div className="grid md:grid-cols-2 gap-8 my-10">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Mountain Gorilla Regions</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best dry season months:</strong>
                June-September, January-February
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Green season considerations:</strong>
                March-May (potentially more challenging, but lower permit demand)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special notes:</strong>
                Bwindi Impenetrable Forest (Uganda) has four separate gorilla tracking sectors offering different experiences. Volcanoes NP (Rwanda) features higher permit costs but generally easier trekking conditions.
              </div>
            </div>
            <p className="mt-4 text-sm">
              Mountain gorilla trekking is available year-round with a 95%+ success rate in both countries. The main seasonal consideration is trail conditions rather than gorilla viewing opportunities.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Chimpanzee Regions</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best dry season months:</strong>
                June-September (easier tracking with drier forest floors)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Green season advantages:</strong>
                Greater fruit availability means more predictable chimp locations
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special notes:</strong>
                Kibale Forest (Uganda) offers the highest success rate for chimpanzee tracking. Nyungwe Forest (Rwanda) combines chimp tracking with canopy walkway experiences.
              </div>
            </div>
            <p className="mt-4 text-sm">
              Unlike mountain gorillas, chimpanzee groups are more mobile and range widely. Tracking can be more challenging but is generally less physically demanding than gorilla trekking.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Uganda's Savanna Parks</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best dry season months:</strong>
                June-September, December-February (peak wildlife viewing)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Green season advantages:</strong>
                Dramatic landscapes, bird migrations, newborn animals
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Tree-climbing lions in Queen Elizabeth (year-round), Shoebill storks in Murchison Falls (best Jan-Mar)
              </div>
            </div>
            <p className="mt-4 text-sm">
              Uganda's savanna parks offer different experiences from East Africa's better-known reserves. With lower tourist numbers and diverse landscapes, they combine well with primate experiences.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Rwanda's Akagera National Park</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best dry season months:</strong>
                June-September (peak wildlife concentration around lakes)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Green season advantages:</strong>
                November-May for exceptional birdwatching and lush scenery
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Recently reintroduced rhinos and lions, large hippo pods year-round
              </div>
            </div>
            <p className="mt-4 text-sm">
              Rwanda's only savanna park, Akagera provides an excellent complement to gorilla trekking with a mix of woodland, swamps, lakes, and savanna supporting a growing wildlife population, including the Big Five.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Planning Your Uganda & Rwanda Safari</h2>
        
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Gorilla Permits & Booking</h3>
          <p className="mb-4">
            Gorilla tracking permits are strictly limited and essential to secure in advance:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Uganda permits:</strong> $700 per person (2023 rates), with 88 permits available daily across Bwindi and Mgahinga</li>
            <li><strong>Rwanda permits:</strong> $1,500 per person (2023 rates), with 96 permits available daily in Volcanoes National Park</li>
            <li><strong>Booking timeframe:</strong> 6-12 months in advance for peak season (Jun-Sep, Dec-Feb)</li>
            <li><strong>Green season:</strong> 3-6 months in advance often sufficient (Mar-May, Oct-Nov)</li>
            <li><strong>Age restrictions:</strong> Minimum age 15 years for gorilla trekking in both countries</li>
          </ul>
          <p className="text-sm italic">
            Note: Rwanda offers a 30% discount on permits when combining gorilla trekking with a minimum 3-night stay in other national parks.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold mb-4">What to Pack by Season</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Dry Season Essentials</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Lightweight, long-sleeved shirts and trousers (neutral colors)</li>
                <li>Hiking boots with good ankle support</li>
                <li>Garden/gardening gloves for grabbing onto vegetation</li>
                <li>Wide-brimmed hat and high SPF sunscreen</li>
                <li>Light fleece or jacket for cool mornings in highlands</li>
                <li>Reusable water bottle (minimum 1.5L capacity)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Rainy Season Additions</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Waterproof rain jacket and trousers</li>
                <li>Waterproofing spray for hiking boots</li>
                <li>Gaiters for muddy trails</li>
                <li>Quick-dry clothing and extra changes</li>
                <li>Waterproof backpack or cover</li>
                <li>Plastic bags for camera equipment protection</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm">
            Regardless of season, gorilla trekking requires sturdy hiking gear, insect repellent, and a camera with good low-light capabilities for forest conditions.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Recommended Safari Combinations</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">10-Day Uganda Highlights (Dry Season)</h4>
              <p className="text-sm">
                Entebbe → Murchison Falls National Park (3 nights) → Kibale Forest for chimpanzees (2 nights) → Queen Elizabeth National Park (2 nights) → Bwindi Impenetrable Forest for gorillas (2 nights) → Entebbe
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">7-Day Rwanda Experience (Green Season)</h4>
              <p className="text-sm">
                Kigali → Nyungwe Forest for chimpanzees and canopy walk (2 nights) → Lake Kivu (1 night) → Volcanoes National Park for gorillas and golden monkeys (3 nights) → Kigali
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">14-Day Uganda & Rwanda Combined (Any Season)</h4>
              <p className="text-sm">
                Entebbe → Queen Elizabeth National Park (3 nights) → Bwindi for gorillas (2 nights) → Lake Bunyonyi (1 night) → Volcanoes National Park for gorillas (2 nights) → Lake Kivu (2 nights) → Nyungwe Forest (2 nights) → Kigali (1 night)
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

export default UgandaRwandaSeasonalGuidePage; 