import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Sun, Cloud, CloudRain, Thermometer, Map, Compass } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gorilla Trekking Seasonal Guide | Best Time for Gorilla Safaris | Safari Overland',
  description: 'Discover the optimal times for gorilla trekking in Uganda, Rwanda, and DRC with our comprehensive seasonal guide covering weather conditions, permit availability, and trekking difficulty.',
  keywords: 'gorilla trekking season, best time gorilla safari, Uganda gorilla trekking, Rwanda gorilla permits, Bwindi Impenetrable Forest, Volcanoes National Park, Virunga, mountain gorillas, dry season gorilla trek',
};

const GorillaTrekkingSeasonalGuidePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Gorilla Trekking Seasonal Guide</h1>
        <p className="text-xl text-muted-foreground">
          Optimal times for gorilla trekking in Uganda, Rwanda, and DRC, with seasonal considerations for each location
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-muted rounded-lg overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image 
              src="/images/seasonal-guides/gorilla-trekking-seasonal.jpg" 
              alt="Mountain gorilla in misty forest" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">When to Trek for Gorillas</h2>
            <p className="text-muted-foreground mb-6">
              Gorilla trekking is available year-round in Uganda, Rwanda, and the Democratic Republic of Congo, but seasonal variations significantly impact the experience. The dry seasons offer easier hiking conditions and better photography, while the wet seasons provide lush scenery and sometimes lower permit costs.
            </p>
            <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-lg">
              <CalendarDays className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="font-medium">Peak trekking season: June to September and December to February</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-3xl font-bold mb-6">Gorilla Trekking Seasons Overview</h2>
        
        <p>
          While mountain gorillas can be visited throughout the year, the trekking experience varies dramatically with the seasons. The primary consideration is rainfall, which affects both trail conditions and overall comfort. Each country and specific gorilla habitat has slightly different optimal periods based on local climate patterns.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <Sun className="h-5 w-5" /> Dry Seasons (June-September & December-February)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1 text-sm">
              <li>Less rainfall making trails more accessible</li>
              <li>Reduced trekking difficulty with drier, less muddy conditions</li>
              <li>Better photography opportunities with clearer skies</li>
              <li>Higher permit availability during December-February</li>
              <li>Busier season with more trekkers, especially July-August</li>
              <li>Premium pricing (permits and accommodation)</li>
              <li>Advanced booking essential (6-12 months ahead)</li>
            </ul>
          </div>
          
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <CloudRain className="h-5 w-5" /> Wet Seasons (March-May & October-November)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1 text-sm">
              <li>More challenging trekking with muddy, slippery trails</li>
              <li>Lush, verdant forests with abundant plant life</li>
              <li>Fewer tourists and more solitary experiences</li>
              <li>Better permit availability with less competition</li>
              <li>Occasional discounts on accommodation</li>
              <li>Gorillas tend to stay at lower elevations (shorter treks)</li>
              <li>Atmospheric misty conditions create ethereal photography</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Country-by-Country Seasonal Guide</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Uganda: Bwindi Impenetrable Forest & Mgahinga</h3>
          <p className="mb-3">
            Uganda's gorilla regions experience less extreme seasonal variations than Rwanda, with rainfall distributed throughout the year but concentrated in two wet seasons.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Optimal Trekking Months</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>First choice:</strong> June to August and December to February</li>
                <li><strong>Second choice:</strong> September and March</li>
                <li><strong>Most challenging:</strong> April, May, October, November</li>
              </ul>
              <p className="text-sm mt-3">
                <strong>Permit availability:</strong> Easier year-round compared to Rwanda, but advance booking still recommended for dry seasons
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Weather Patterns</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Long rains:</strong> March to May (heaviest in April)</li>
                <li><strong>Short rains:</strong> October to November</li>
                <li><strong>Temperatures:</strong> Relatively constant (15-30°C) year-round</li>
                <li><strong>Altitude effect:</strong> Higher sectors of Bwindi are cooler and receive more rainfall</li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Bwindi Sector Variations</h4>
            <p className="text-sm mb-3">
              Bwindi's four sectors experience slightly different conditions:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Buhoma</strong> (northern sector): Most visited with well-maintained trails, slightly less rainfall than southern sectors</li>
              <li><strong>Ruhija</strong> (eastern sector): Highest elevation, coolest temperatures, more challenging terrain</li>
              <li><strong>Rushaga & Nkuringo</strong> (southern sectors): More gorilla families, somewhat warmer, but heavier rainfall during wet seasons</li>
            </ul>
          </div>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Rwanda: Volcanoes National Park</h3>
          <p className="mb-3">
            Rwanda's gorilla habitat generally receives more rainfall than Uganda's, with distinct seasonal patterns and excellent infrastructure to mitigate wet season challenges.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Optimal Trekking Months</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>First choice:</strong> June to August and December to February</li>
                <li><strong>Second choice:</strong> September and March</li>
                <li><strong>Most challenging:</strong> April, May, November</li>
              </ul>
              <p className="text-sm mt-3">
                <strong>Permit availability:</strong> Very limited in peak seasons due to high demand and fewer permits issued daily
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Weather Patterns</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Heavy rains:</strong> March to May</li>
                <li><strong>Moderate rains:</strong> October to November</li>
                <li><strong>Temperatures:</strong> Cooler than Uganda, especially at night (10-25°C)</li>
                <li><strong>Terrain:</strong> Steeper slopes than Uganda, more challenging in wet conditions</li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Rwanda Advantages</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Better infrastructure with superior roads to trailheads</li>
              <li>Shorter driving distance from international airport (Kigali)</li>
              <li>Generally shorter hikes to reach gorilla families (though still challenging)</li>
              <li>Premium lodging options closer to the park</li>
              <li>More predictable trekking times (typically 1-4 hours each way)</li>
            </ul>
          </div>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Democratic Republic of Congo: Virunga National Park</h3>
          <p className="mb-3">
            The DRC offers the most adventurous gorilla trekking experience with the most variable conditions. Political stability should be closely monitored before planning a trip.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Optimal Trekking Months</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>First choice:</strong> December to February (driest period)</li>
                <li><strong>Second choice:</strong> June to August (drier but can be misty)</li>
                <li><strong>Most challenging:</strong> April, May, October, November</li>
              </ul>
              <p className="text-sm mt-3">
                <strong>Permit availability:</strong> Generally good, but fluctuates based on security situation
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Weather Patterns</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Heavy rains:</strong> September to November</li>
                <li><strong>Moderate rains:</strong> March to May</li>
                <li><strong>Temperatures:</strong> Variable by elevation (12-30°C)</li>
                <li><strong>Unique factor:</strong> Active volcano creates distinctive microclimate</li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Important Considerations</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Security situation can change rapidly - check current advisories</li>
              <li>Less developed infrastructure than Rwanda or Uganda</li>
              <li>More adventurous experience with fewer tourists</li>
              <li>Lower permit costs compared to Rwanda and Uganda</li>
              <li>Opportunity to visit other unique attractions (active volcano, crater lake)</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Month-by-Month Gorilla Trekking Guide</h2>

        <div className="grid md:grid-cols-3 gap-4 my-8">
          <div className="bg-muted/10 p-4 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary">January - February</h4>
            <p className="text-sm mb-2"><strong>Season:</strong> Dry season</p>
            <p className="text-sm mb-2"><strong>Conditions:</strong> Excellent trekking with minimal rainfall</p>
            <p className="text-sm mb-2"><strong>Crowds:</strong> Moderate</p>
            <p className="text-sm mb-2"><strong>Permit availability:</strong> Good</p>
            <p className="text-sm"><strong>Recommendation:</strong> Highly recommended period</p>
          </div>
          
          <div className="bg-muted/10 p-4 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary">March</h4>
            <p className="text-sm mb-2"><strong>Season:</strong> Transitional</p>
            <p className="text-sm mb-2"><strong>Conditions:</strong> Increasing rainfall, still manageable</p>
            <p className="text-sm mb-2"><strong>Crowds:</strong> Lower</p>
            <p className="text-sm mb-2"><strong>Permit availability:</strong> Very good</p>
            <p className="text-sm"><strong>Recommendation:</strong> Good value period</p>
          </div>
          
          <div className="bg-muted/10 p-4 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary">April - May</h4>
            <p className="text-sm mb-2"><strong>Season:</strong> Heavy rains</p>
            <p className="text-sm mb-2"><strong>Conditions:</strong> Challenging, muddy trails</p>
            <p className="text-sm mb-2"><strong>Crowds:</strong> Lowest</p>
            <p className="text-sm mb-2"><strong>Permit availability:</strong> Excellent</p>
            <p className="text-sm"><strong>Recommendation:</strong> For adventurous travelers</p>
          </div>
          
          <div className="bg-muted/10 p-4 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary">June - August</h4>
            <p className="text-sm mb-2"><strong>Season:</strong> Dry season (peak)</p>
            <p className="text-sm mb-2"><strong>Conditions:</strong> Optimal, drier trails</p>
            <p className="text-sm mb-2"><strong>Crowds:</strong> Highest</p>
            <p className="text-sm mb-2"><strong>Permit availability:</strong> Limited, book far ahead</p>
            <p className="text-sm"><strong>Recommendation:</strong> Prime time, but crowded</p>
          </div>
          
          <div className="bg-muted/10 p-4 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary">September</h4>
            <p className="text-sm mb-2"><strong>Season:</strong> Transitional</p>
            <p className="text-sm mb-2"><strong>Conditions:</strong> Generally good, occasional showers</p>
            <p className="text-sm mb-2"><strong>Crowds:</strong> Moderate</p>
            <p className="text-sm mb-2"><strong>Permit availability:</strong> Good</p>
            <p className="text-sm"><strong>Recommendation:</strong> Excellent balanced option</p>
          </div>
          
          <div className="bg-muted/10 p-4 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary">October - November</h4>
            <p className="text-sm mb-2"><strong>Season:</strong> Short rains</p>
            <p className="text-sm mb-2"><strong>Conditions:</strong> Challenging but variable</p>
            <p className="text-sm mb-2"><strong>Crowds:</strong> Low</p>
            <p className="text-sm mb-2"><strong>Permit availability:</strong> Very good</p>
            <p className="text-sm"><strong>Recommendation:</strong> Budget-friendly option</p>
          </div>
          
          <div className="bg-muted/10 p-4 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary">December</h4>
            <p className="text-sm mb-2"><strong>Season:</strong> Start of dry season</p>
            <p className="text-sm mb-2"><strong>Conditions:</strong> Improving, increasingly dry</p>
            <p className="text-sm mb-2"><strong>Crowds:</strong> Increasing (holiday period)</p>
            <p className="text-sm mb-2"><strong>Permit availability:</strong> Moderate</p>
            <p className="text-sm"><strong>Recommendation:</strong> Very good option</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Practical Gorilla Trekking Considerations</h2>
        
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Permits & Booking Windows</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">Uganda Permits</h4>
              <p className="text-sm">
                <strong>Cost:</strong> $700 per person<br />
                <strong>Peak season booking window:</strong> 6-12 months in advance<br />
                <strong>Low season booking window:</strong> 2-6 months in advance<br />
                <strong>Availability patterns:</strong> Generally good availability year-round, with tighter supply June-August
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Rwanda Permits</h4>
              <p className="text-sm">
                <strong>Cost:</strong> $1,500 per person<br />
                <strong>Peak season booking window:</strong> 8-12 months in advance<br />
                <strong>Low season booking window:</strong> 3-6 months in advance<br />
                <strong>Availability patterns:</strong> Very limited availability in peak seasons (June-August); permits often sell out far in advance
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">DRC Permits</h4>
              <p className="text-sm">
                <strong>Cost:</strong> $400 per person<br />
                <strong>Peak season booking window:</strong> 3-6 months in advance<br />
                <strong>Low season booking window:</strong> 1-3 months in advance<br />
                <strong>Availability patterns:</strong> Generally good availability, but can fluctuate based on security situation
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold mb-4">Seasonal Packing Recommendations</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Dry Season Essentials</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Lightweight, long-sleeved shirts and pants</li>
                <li>Sturdy waterproof hiking boots (still essential)</li>
                <li>Garden gloves for grabbing vegetation</li>
                <li>Gaiters to protect against ants and thorns</li>
                <li>Hat with brim for sun protection</li>
                <li>Light rain jacket (sudden showers still possible)</li>
                <li>Insect repellent and sunscreen</li>
                <li>1-2 liters of water per person</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Wet Season Additions</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Heavy-duty waterproof jacket and pants</li>
                <li>Extra pairs of socks (feet will get wet)</li>
                <li>Waterproof backpack or cover</li>
                <li>Hiking poles for stability on slippery trails</li>
                <li>Plastic bags to protect camera equipment</li>
                <li>Quick-dry clothing (avoid cotton)</li>
                <li>Waterproof pants/gaiters highly recommended</li>
                <li>Change of clothes for after the trek</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Recommended Gorilla Safari Combinations</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">Dry Season (June-August): Uganda Explorer</h4>
              <p className="text-sm">
                Entebbe → Kibale Forest for chimpanzee tracking (2 nights) → Queen Elizabeth National Park for wildlife viewing (2 nights) → Bwindi Impenetrable Forest for gorilla trekking (3 nights) → Lake Mburo National Park (1 night) → Entebbe
              </p>
              <p className="text-sm italic mt-1">
                Excellent wildlife viewing throughout with optimal conditions for both gorilla trekking and traditional safari activities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Shoulder Season (September): Rwanda-Tanzania Combination</h4>
              <p className="text-sm">
                Kigali → Volcanoes National Park for gorilla trekking (3 nights) → Kigali → fly to Kilimanjaro → Northern Tanzania safari circuit (7 nights) → Zanzibar beach extension (optional)
              </p>
              <p className="text-sm italic mt-1">
                Combines gorilla trekking with excellent Serengeti wildlife viewing when both destinations offer good conditions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Value Season (March or November): Uganda Budget Option</h4>
              <p className="text-sm">
                Entebbe → Bwindi Impenetrable Forest for gorilla trekking (3 nights) → Lake Bunyonyi for relaxation and cultural activities (2 nights) → Entebbe
              </p>
              <p className="text-sm italic mt-1">
                Focused itinerary taking advantage of lower visitor numbers and potentially reduced accommodation rates during transitional seasons.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Final Gorilla Trekking Timing Tips</h2>

        <ul className="list-disc pl-6 space-y-2 my-6">
          <li><strong>Fitness considerations:</strong> Gorilla trekking is physically demanding in any season, but wet season treks require significantly more stamina and balance</li>
          <li><strong>Age and mobility:</strong> For travelers with reduced mobility or those over 65, dry season trekking is strongly recommended</li>
          <li><strong>Photography goals:</strong> Photographers seeking clear shots should prioritize dry seasons, while those wanting atmospheric misty forest images might appreciate the wet season</li>
          <li><strong>Multiple treks:</strong> If planning more than one trek, try to space them with a rest day in between regardless of season</li>
          <li><strong>Holiday planning:</strong> For those restricted to school holidays, book permits for July-August or December-January as far in advance as possible</li>
          <li><strong>Budget considerations:</strong> Those seeking value should consider March, May, October or November when lodges often offer reduced rates</li>
        </ul>

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

export default GorillaTrekkingSeasonalGuidePage; 