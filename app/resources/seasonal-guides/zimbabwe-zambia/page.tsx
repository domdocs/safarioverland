import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Sun, CloudRain, Camera, Compass } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zimbabwe & Zambia Safari Seasonal Guide | Safari Overland',
  description: 'Best times for visiting Victoria Falls and the wildlife-rich national parks of Zimbabwe and Zambia throughout the year.',
  keywords: 'Zimbabwe Zambia safari seasons, best time Victoria Falls, Hwange National Park, Mana Pools, South Luangwa, Lower Zambezi, Zimbabwe wildlife, Zambia wildlife viewing',
};

const ZimbabweZambiaSeasonalGuidePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Zimbabwe & Zambia Seasonal Guide</h1>
        <p className="text-xl text-muted-foreground">
          Best times for visiting Victoria Falls and the wildlife-rich national parks of Zimbabwe and Zambia
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-muted rounded-lg overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image 
              src="/images/seasonal-guides/travel-guide-zambia-zimbabwe.jpg" 
              alt="Victoria Falls and wildlife in Zimbabwe and Zambia" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">When to Visit Zimbabwe & Zambia</h2>
            <p className="text-muted-foreground mb-6">
              Zimbabwe and Zambia offer excellent safari experiences throughout the year, with the dry season (May-October) providing optimal wildlife viewing in most parks. Victoria Falls displays different faces across the seasons—from peak flow (February-May) to lower water levels that reveal the geological formations (September-December).
            </p>
            <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-lg">
              <CalendarDays className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="font-medium">Peak wildlife season: July to October (Dry season)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-3xl font-bold mb-6">Zimbabwe & Zambia Safari Seasons Overview</h2>
        
        <p>
          Zimbabwe and Zambia share similar seasonal patterns and both offer exceptional wildlife experiences centered around the mighty Zambezi River and its tributaries. From the iconic Victoria Falls that straddles both countries to remote wilderness areas like Mana Pools and South Luangwa, these neighboring nations provide diverse safari opportunities with distinct seasonal advantages.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <Sun className="h-5 w-5" /> Dry Season (May-October)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Prime wildlife viewing as animals concentrate around water</li>
              <li>Excellent visibility with thinned vegetation</li>
              <li>Cooler temperatures, especially at night</li>
              <li>Lower malaria risk with fewer mosquitoes</li>
              <li>Easier road access to remote areas</li>
              <li>Peak tourism season with higher rates</li>
              <li>Lower water levels at Victoria Falls (Sept-Dec)</li>
              <li>Walking safaris ideal in this season</li>
            </ul>
          </div>
          
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <CloudRain className="h-5 w-5" /> Green Season (November-April)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Lush, photogenic landscapes with dramatic skies</li>
              <li>Victoria Falls at peak flow (Feb-May)</li>
              <li>Birthing season with newborn animals</li>
              <li>Exceptional bird watching with migratory species</li>
              <li>Lower rates and fewer tourists</li>
              <li>Some areas inaccessible due to rains</li>
              <li>Higher temperatures with afternoon cooling from storms</li>
              <li>Higher malaria risk—preventative measures essential</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Month-by-Month Zimbabwe & Zambia Guide</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">January & February</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Peak of rainy season with frequent afternoon thunderstorms. Hot and humid with temperatures ranging from 25-32°C (77-90°F). Lush green landscapes across both countries.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> More challenging as wildlife disperses with abundant water sources. Many herbivores give birth during this period. Predator activity high around vulnerable young animals.
          </p>
          <p className="mb-3">
            <strong>Victoria Falls:</strong> Water levels rising, with a noticeable increase in flow and spray. Good time to see the falls gaining power.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Hwange National Park (Zimbabwe), Lower Zambezi edges (Zambia), areas near main lodges with all-weather roads
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Low season with significantly reduced rates and fewer tourists. Some remote camps closed, particularly in Zambia's South Luangwa and Lower Zambezi.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">March & April</h3>
          <p className="mb-3">
            <strong>Weather:</strong> End of rainy season with decreasing rainfall. Warm and humid with temperatures between 24-30°C (75-86°F). Landscapes at their greenest.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Improving as vegetation begins to thin. Young animals more visible. Bird watching exceptional with resident and migratory species present.
          </p>
          <p className="mb-3">
            <strong>Victoria Falls:</strong> Approaching peak flow—massive volume of water creates impressive spray visible from miles away. "The Smoke That Thunders" at its most dramatic.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Victoria Falls area, Zambezi National Park (Zimbabwe), Mosi-oa-Tunya National Park (Zambia)
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Shoulder season beginning. Some lodges reopening after seasonal closures. Good value period with moderate visitor numbers. Prepare for significant spray at Victoria Falls—raincoats essential.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">May & June</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Beginning of dry season. Pleasant daytime temperatures (20-28°C/68-82°F) with cooler evenings. Minimal rainfall and rapidly decreasing humidity.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Good and improving as water sources begin to shrink. Animals start concentrating around rivers and waterholes. Vegetation thinning improves visibility.
          </p>
          <p className="mb-3">
            <strong>Victoria Falls:</strong> Still impressive high flow, particularly in May. June sees beginning of gradual reduction. Great photography opportunities.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Hwange National Park, Mana Pools (Zimbabwe), South Luangwa, Lower Zambezi (Zambia)—all parks beginning to offer good viewing
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Beginning of high season with increasing visitor numbers. Most camps and lodges open. May offers excellent value before peak pricing takes full effect in June/July.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">July & August</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Heart of dry season. Mild, pleasant days (20-25°C/68-77°F) with cold nights, especially in Zimbabwe's highlands. Clear skies prevail.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Excellent as animals congregate around remaining water sources. Predator activity increases with prey concentration. Walking safaris ideal in this period.
          </p>
          <p className="mb-3">
            <strong>Victoria Falls:</strong> Water levels decreasing, especially on the Zambian side. Better views of the rock face and geological features beginning to emerge.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Hwange's pumped waterholes, Mana Pools (Zimbabwe), South Luangwa for walking safaris, Lower Zambezi for canoeing (Zambia)
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Peak season with highest visitor numbers and rates. Advance booking essential (9-12 months) for premium properties. Excellent game viewing compensates for premium pricing.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">September & October</h3>
          <p className="mb-3">
            <strong>Weather:</strong> End of dry season and hottest months. Temperatures rising dramatically (35-40°C/95-104°F), especially in the Zambezi Valley. Very dry with intense heat in October.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Often considered the best months for game viewing. Extreme wildlife concentration around remaining water. Dramatic predator-prey interactions. Elephant concentration in Hwange at its peak.
          </p>
          <p className="mb-3">
            <strong>Victoria Falls:</strong> Low water levels, particularly on the Zambian side which may be nearly dry. Zimbabwe side still flowing. Ideal time for Devil's Pool (Zambian side) and white-water rafting.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> All major national parks in both countries, especially Hwange, Mana Pools, South Luangwa, and Lower Zambezi
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Still high season with premium rates. October can be extremely hot—properties with pools and midday siestas recommended. Prepare for intense heat but exceptional wildlife viewing.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">November & December</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Transition to rainy season. Hot days (28-35°C/82-95°F) with increasing humidity. First rains typically arrive in November, bringing dramatic thunderstorms and relief from heat.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Initially excellent in early November, then more challenging as wildlife disperses with first rains. Birthing season begins for many antelope species. First migratory birds arrive.
          </p>
          <p className="mb-3">
            <strong>Victoria Falls:</strong> Lowest water levels, with significant portions dry, especially on Zambian side. Best time to see the gorge structure and for white-water rafting. Water levels begin rising again by late December.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Hwange National Park, Matobo National Park (Zimbabwe), Lower Zambezi edges (Zambia)
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Low season with reduced rates beginning in November (except festive season in late December). Many camps close by late November, particularly in Zambia. Roads may become challenging with early rains.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-6">Key Safari Regions by Season</h2>

        <div className="grid md:grid-cols-2 gap-8 my-10">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Victoria Falls</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">High water season:</strong>
                February to May (peak usually in April)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Low water season:</strong>
                September to December (lowest usually in November)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Activity considerations:</strong>
                White-water rafting best at low water (Aug-Dec). Devil's Pool accessible only at low water (Sept-Dec). Flight of Angels (helicopter) best at high water for spray spectacle.
              </div>
            </div>
            <p className="mt-4 text-sm">
              Victoria Falls offers dramatically different experiences across seasons. High water creates an impressive spectacle of spray and thunder but obscures views of the rock face. Low water reveals the geological structure and allows activities like Devil's Pool but reduces the overall spectacle on the Zambian side.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Hwange National Park (Zimbabwe)</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Best wildlife season:</strong>
                July to October (massive elephant herds)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Green season appeal:</strong>
                December to March (newborns, birds, lower rates)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special features:</strong>
                Pumped waterholes maintain wildlife concentrations even in dry season. Up to 40,000 elephants in peak dry months.
              </div>
            </div>
            <p className="mt-4 text-sm">
              Zimbabwe's largest national park transitions from semi-arid wilderness to lush woodland during the rains. The artificial waterholes create remarkable wildlife gathering points in the dry season, with some camps overlooking busy waterholes for 24-hour wildlife viewing.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Mana Pools (Zimbabwe)</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Operational season:</strong>
                April/May to November (closed in rainy season)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Peak wildlife viewing:</strong>
                August to October (extreme dry season concentration)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special activities:</strong>
                Walking safaris, canoeing along the Zambezi, incredible elephant viewing with unique behaviors like standing on hind legs to reach albida tree pods
              </div>
            </div>
            <p className="mt-4 text-sm">
              This UNESCO World Heritage Site becomes inaccessible during rainy season as roads flood. The concentration of wildlife along the Zambezi River during dry season creates exceptional game viewing opportunities, including famous elephant behaviors and pack hunting by wild dogs.
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">South Luangwa (Zambia)</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Peak safari season:</strong>
                June to October (best walking safaris)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Emerald season options:</strong>
                January to March (limited lodges open, boating safaris)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special wildlife events:</strong>
                Carmine bee-eater colonies (Sept-Oct), leopard sightings year-round, epic lion and wild dog hunting
              </div>
            </div>
            <p className="mt-4 text-sm">
              The birthplace of the walking safari offers exceptional wildlife experiences as animals concentrate along the Luangwa River. Some areas become completely inaccessible during rainy season, while others offer unique boating safaris during the "Emerald Season."
            </p>
          </div>

          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">Lower Zambezi (Zambia)</h3>
            <div className="flex items-start gap-2 mb-3">
              <Sun className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Operational season:</strong>
                April/May to November (most lodges closed in rainy season)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Peak activities:</strong>
                Canoeing and boating (June-October), fishing for tiger fish (September-October)
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="block">Special features:</strong>
                Multi-activity safaris including canoeing, boat cruises, walking, game drives, and fishing
              </div>
            </div>
            <p className="mt-4 text-sm">
              Directly across from Mana Pools, the Lower Zambezi offers a similar ecosystem with fewer visitors. The variety of water-based activities complements traditional safaris, with spectacular elephant, buffalo, and lion sightings along the river frontage.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Safari Planning Tips</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold mb-4">Combining Zimbabwe & Zambia</h3>
          <p className="mb-4">
            These neighboring countries complement each other perfectly, with easy border crossings at Victoria Falls and similar seasonal patterns:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Classic combination:</strong> Victoria Falls (both countries) → Hwange (Zimbabwe) → Chobe (Botswana) → Okavango Delta (Botswana)</li>
            <li><strong>Off-the-beaten-path:</strong> Victoria Falls → Mana Pools (Zimbabwe) → Lower Zambezi → South Luangwa (Zambia)</li>
            <li><strong>Zimbabwe focus:</strong> Victoria Falls → Hwange → Mana Pools → Matobo National Park</li>
            <li><strong>Zambia immersion:</strong> Livingstone (Victoria Falls) → Lower Zambezi → South Luangwa → Kasanka (Nov-Dec for bat migration)</li>
          </ul>
          <p className="mt-4 text-sm">
            Note: When combining countries, consider visa requirements. The KAZA Univisa (when available) covers both Zimbabwe and Zambia plus day trips to Botswana.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold mb-4">What to Pack by Season</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Dry Season (May-October)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Warm layers for morning/evening game drives</li>
                <li>Windproof jacket for open vehicles</li>
                <li>Light gloves and beanie for early mornings</li>
                <li>Neutral-colored clothing (khaki, olive, tan)</li>
                <li>Dust protection (bandana/buff)</li>
                <li>Good binoculars and camera with zoom lens</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Green Season (November-April)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Lightweight, quick-dry clothing</li>
                <li>Good quality rain jacket</li>
                <li>Insect repellent with high DEET content</li>
                <li>Antimalarial medication (essential)</li>
                <li>Waterproof bag for camera equipment</li>
                <li>At Victoria Falls: raincoat/poncho (Feb-May)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold mb-4">Booking Recommendations</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Peak Season (Jul-Oct):</strong> Book 9-12 months in advance for premium properties</li>
            <li><strong>Victoria Falls (Aug-Sept):</strong> Book 6-9 months in advance during international high season</li>
            <li><strong>Green Season (Nov-Apr):</strong> Book 3-6 months in advance, with more last-minute availability</li>
            <li><strong>Walking Safaris:</strong> Book specialized walking camps 9-12 months ahead for dry season dates</li>
            <li><strong>Self-drive Zimbabwe:</strong> More flexible, but still book park accommodation and popular lodges well ahead</li>
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

export default ZimbabweZambiaSeasonalGuidePage; 