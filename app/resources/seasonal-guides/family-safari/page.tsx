import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Sun, Cloud, CloudRain, Thermometer, Users, School } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Family Safari Guide | Best Seasons for Children | Safari Overland',
  description: 'Plan the perfect family safari with our guide to the best times to visit Africa with children, considering school holidays, weather conditions, and family-friendly activities.',
  keywords: 'family safari, safari with kids, safari school holidays, family friendly safari, children safari africa, malaria-free safari family, best time safari children',
};

const FamilySafariSeasonalGuidePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Family Safari Seasonal Guide</h1>
        <p className="text-xl text-muted-foreground">
          Best times for family safaris, considering school holidays, weather conditions, and child-friendly activities
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-muted rounded-lg overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image 
              src="/images/seasonal-guides/family-safari-timing.jpg" 
              alt="Family enjoying wildlife viewing on safari" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Planning Your Family Safari</h2>
            <p className="text-muted-foreground mb-6">
              A safari presents an incredible educational adventure for children, creating memories that last a lifetime. The key to a successful family safari is timing your visit to balance wildlife viewing opportunities with comfortable conditions for young travelers and alignment with school holidays.
            </p>
            <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-lg">
              <School className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="font-medium">Best family safari periods: July-August and December-January</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-3xl font-bold mb-6">Key Factors for Family Safari Timing</h2>
        
        <p>
          Choosing the right time for a family safari involves balancing several important factors to ensure the experience is enjoyable and stress-free for all family members. Wildlife viewing is just one consideration—comfort, health, and practical logistics all play crucial roles in timing decisions.
        </p>

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <School className="h-5 w-5" /> School Holidays
            </h4>
            <p className="text-sm mb-3">For most families, safari timing is primarily dictated by school vacation periods:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1 text-sm">
              <li><strong>Summer holidays:</strong> Mid-July to early September</li>
              <li><strong>Christmas break:</strong> Mid-December to early January</li>
              <li><strong>Easter holidays:</strong> Late March/April (variable)</li>
              <li><strong>Half-term breaks:</strong> Typically October and February</li>
            </ul>
            <p className="text-sm">
              Peak safari season (July-October) conveniently overlaps with summer holidays, making this period especially popular for family safaris.
            </p>
          </div>
          
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <Thermometer className="h-5 w-5" /> Weather Considerations
            </h4>
            <p className="text-sm mb-3">Children typically have less tolerance for extreme conditions:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1 text-sm">
              <li><strong>Avoid extreme heat</strong> (October-November can be very hot)</li>
              <li><strong>Steady temperatures</strong> are preferable (June-August)</li>
              <li><strong>Lower humidity</strong> increases comfort (dry season)</li>
              <li><strong>Rain disrupts activities</strong> more with children</li>
              <li><strong>Cold mornings</strong> require extra clothing (particularly June-July)</li>
            </ul>
            <p className="text-sm">
              July-September offers the most comfortable weather conditions for family safaris across most of Africa.
            </p>
          </div>
          
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <Users className="h-5 w-5" /> Health & Safety
            </h4>
            <p className="text-sm mb-3">Traveling with children requires extra attention to health considerations:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1 text-sm">
              <li><strong>Malaria risk</strong> varies by season (lower in dry season)</li>
              <li><strong>Malaria-free regions</strong> ideal for very young children</li>
              <li><strong>Fewer insects</strong> during dry months (June-October)</li>
              <li><strong>Lower disease risk</strong> with less standing water</li>
              <li><strong>Better road conditions</strong> in dry season for safer transfers</li>
            </ul>
            <p className="text-sm">
              For families with younger children, consider malaria-free destinations like South Africa's Eastern Cape or Madikwe.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Best Family Safari Seasons by Region</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Southern Africa (South Africa, Botswana, Namibia)</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">July-August (Best Overall)</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Coincides with major school holidays</li>
                <li>Excellent wildlife viewing (dry season)</li>
                <li>Pleasant daytime temperatures (18-25°C)</li>
                <li>Very low rainfall and humidity</li>
                <li>Reduced malaria risk</li>
                <li>Advanced booking essential (6-12 months)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">December-January (Good Alternative)</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Coincides with Christmas school break</li>
                <li>Green season with newborn animals</li>
                <li>Good bird watching opportunities</li>
                <li>Lower rates in many locations</li>
                <li>Some afternoon thunderstorms</li>
                <li>Higher temperatures (25-32°C)</li>
                <li>Higher humidity and insect activity</li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Special Family Considerations</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>South Africa's malaria-free reserves (Madikwe, Eastern Cape) are ideal for families with young children</li>
              <li>Kruger National Park's rest camps and private reserves offer excellent family accommodation</li>
              <li>Self-drive options in Kruger and Etosha (Namibia) provide flexibility for families</li>
              <li>Botswana typically has higher age restrictions (8-12 years) for safari activities</li>
            </ul>
          </div>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">East Africa (Kenya, Tanzania)</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">July-August (Ideal)</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Coincides with major school holidays</li>
                <li>Great Migration in northern Serengeti/Masai Mara</li>
                <li>Dry season with excellent overall wildlife viewing</li>
                <li>Pleasant temperatures (20-28°C)</li>
                <li>Peak season with premium pricing</li>
                <li>Most family-friendly lodges fully booked</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">December-January (Very Good)</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Aligns with Christmas school break</li>
                <li>Short rains usually finished by late December</li>
                <li>Migration in southern Serengeti (calving season)</li>
                <li>Lush, green landscapes</li>
                <li>Excellent bird watching opportunities</li>
                <li>Fewer crowds at major attractions</li>
                <li>Warmer temperatures (24-30°C)</li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Special Family Considerations</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Masai Mara conservancies offer exclusive wildlife viewing with fewer vehicles</li>
              <li>Tanzania's northern circuit provides diverse landscapes that keep children engaged</li>
              <li>Cultural interactions with Maasai communities are educational highlights</li>
              <li>Consider properties with swimming pools for afternoon relaxation</li>
              <li>Many lodges offer specialized children's programs during school holiday periods</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Age-Appropriate Safari Timing</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Young Children (Ages 4-7)</h3>
          <p className="mb-3">
            For families with very young children, timing and destination selection require special attention to health considerations, comfort, and activity options.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Best Timing Options</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>First choice:</strong> July-August (comfortable temperatures, low disease risk)</li>
                <li><strong>Second choice:</strong> May-June (shoulder season with good value and conditions)</li>
                <li><strong>Avoid:</strong> October-November (excessive heat) and peak rainy seasons</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Recommended Destinations</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>South Africa's malaria-free reserves (Madikwe, Pilanesberg, Eastern Cape)</li>
                <li>Private conservancies with flexible activity scheduling</li>
                <li>Lodges with family accommodation and children's programs</li>
                <li>Destinations with shorter drive times between attractions</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm">
            Young children benefit from shorter game drives and varied activities. Look for lodges offering "bush bumbles" (abbreviated drives) and nature-based activities like tracking, butterfly collecting, and junior ranger programs.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Older Children & Teens (Ages 8-16)</h3>
          <p className="mb-3">
            Older children and teenagers can handle more varied safari conditions and often appreciate more adventurous scheduling that aligns with unique wildlife events.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Best Timing Options</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Wildlife spectacles:</strong> July-October (Great Migration, peak predator action)</li>
                <li><strong>Adventure activities:</strong> August-September (ideal water levels for rafting, canoeing)</li>
                <li><strong>Cultural experiences:</strong> December-January (many traditional festivals)</li>
                <li><strong>Photography:</strong> April-May and November (dramatic skies, fewer vehicles)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Recommended Activities</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Walking safaris (minimum age typically 12-16)</li>
                <li>Canoe safaris in Zimbabwe/Zambia (typically 12+)</li>
                <li>Warrior training with Maasai guides</li>
                <li>Behind-the-scenes conservation experiences</li>
                <li>Night drives for nocturnal wildlife</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm">
            Many activities have minimum age requirements for safety reasons. These typically range from 6-16 years depending on the activity and location. Always confirm age policies when booking.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-6">Family-Friendly Wildlife Events by Season</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">July-August (Summer Holidays)</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Great Migration river crossings</strong> (northern Serengeti/Masai Mara)<br />
                <span className="text-sm">Dramatic wildebeest crossings of the Mara River with predator action</span>
              </li>
              <li>
                <strong>Elephant congregations</strong> (Chobe River, Hwange National Park)<br />
                <span className="text-sm">Massive herds gather at water sources, excellent for photography</span>
              </li>
              <li>
                <strong>Whale watching</strong> (South Africa's Hermanus)<br />
                <span className="text-sm">Southern right whales visit with calves, visible from shore</span>
              </li>
              <li>
                <strong>Wild dog denning season</strong> (Botswana, Zimbabwe)<br />
                <span className="text-sm">Pups emerge from dens, providing rare viewing opportunities</span>
              </li>
            </ul>
          </div>
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h3 className="text-xl font-semibold mb-4">December-January (Christmas Holidays)</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Wildebeest calving season</strong> (southern Serengeti)<br />
                <span className="text-sm">Thousands of calves born daily with intense predator activity</span>
              </li>
              <li>
                <strong>Green season bird watching</strong> (throughout Southern Africa)<br />
                <span className="text-sm">Migratory species in breeding plumage, excellent for young birders</span>
              </li>
              <li>
                <strong>Sea turtle nesting</strong> (KwaZulu-Natal coast)<br />
                <span className="text-sm">Guided turtle walks to witness nesting leatherback and loggerhead turtles</span>
              </li>
              <li>
                <strong>Fruit bat migrations</strong> (Kasanka National Park, Zambia)<br />
                <span className="text-sm">Spectacular gathering of millions of fruit bats</span>
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Practical Family Safari Planning Tips</h2>
        
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Accommodation Considerations</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">Family Rooms & Villas</h4>
              <p className="text-sm">
                During school holiday periods, family accommodation options book up 9-12 months in advance. Look for lodges with dedicated family units offering connecting rooms or multi-bedroom villas that allow families to stay together.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Private Safari Houses</h4>
              <p className="text-sm">
                For multi-generational trips or larger families, exclusive-use safari houses provide privacy, flexibility, and dedicated staff. These properties typically include a private vehicle and guide, allowing complete customization of your safari schedule.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Child-Friendly Facilities</h4>
              <p className="text-sm">
                Swimming pools, game rooms, and supervised activity programs become especially valuable during hot afternoon rest periods. Many family-oriented lodges offer special children's menus, earlier dining times, and babysitting services.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold mb-4">Family Safari Packing by Season</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Dry Season (June-October)</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Warm layers for cold mornings (especially June-July)</li>
                <li>Sun protection (hats, high SPF sunscreen, sunglasses)</li>
                <li>Dust protection (bandanas/buffs)</li>
                <li>Neutral-colored clothing (avoid bright colors/black/white)</li>
                <li>Comfortable closed shoes for walks</li>
                <li>Insect repellent (even in dry season)</li>
                <li>Binoculars for each child (creates engagement)</li>
                <li>Wildlife identification guides appropriate for age</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Green Season (November-May)</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Lightweight rain jackets/ponchos</li>
                <li>Extra sets of clothes (things get wet more often)</li>
                <li>Quick-dry fabrics (avoid cotton)</li>
                <li>Waterproof bags for electronics</li>
                <li>Higher concentration insect repellent</li>
                <li>Antimalarial medications appropriate for children</li>
                <li>Light long-sleeved shirts and pants for evening</li>
                <li>Battery packs for devices (power outages more common)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Recommended Family Safari Itineraries</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">10-Day South Africa Family Safari (July-August)</h4>
              <p className="text-sm">
                Johannesburg → Madikwe Game Reserve (malaria-free, 3 nights) → Sun City Resort (1 night) → Cape Town (4 nights, including penguin colony visit & whale watching) → Johannesburg
              </p>
              <p className="text-sm italic mt-1">
                Ideal for families with younger children, offering Big Five viewing without malaria risk, combined with family-friendly activities in Cape Town.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">12-Day Kenya Family Adventure (December-January)</h4>
              <p className="text-sm">
                Nairobi (Giraffe Centre visit, 1 night) → Amboseli National Park (2 nights) → Laikipia (private conservancy with family activities, 3 nights) → Masai Mara conservancy (4 nights) → Nairobi (1 night)
              </p>
              <p className="text-sm italic mt-1">
                Perfect for families with teens, offering diverse ecosystems, cultural experiences with local communities, and family-friendly tented camps.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">14-Day Southern Africa Family Expedition (August)</h4>
              <p className="text-sm">
                Johannesburg → Victoria Falls (2 nights) → Chobe National Park (3 nights) → Okavango Delta (3 nights) → Cape Town (4 nights) → Johannesburg
              </p>
              <p className="text-sm italic mt-1">
                Comprehensive family adventure combining iconic wildlife areas with Victoria Falls adventures and Cape Town activities, suitable for active families with children 10+.
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

export default FamilySafariSeasonalGuidePage; 