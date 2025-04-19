import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Sun, CloudRain, Camera, Compass } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kenya Safari Seasonal Guide | Safari Overland',
  description: 'Month-by-month guide to Kenya\'s safari seasons, including the Great Migration in the Masai Mara, dry and green seasons, and the best times to visit each region.',
  keywords: 'Kenya safari seasons, best time to visit Kenya, Masai Mara migration timing, Kenya weather, Kenya wildlife viewing, Kenya dry season, Kenya green season',
};

const KenyaSeasonalGuidePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Kenya Safari Seasonal Guide</h1>
        <p className="text-xl text-muted-foreground">
          A comprehensive month-by-month guide to Kenya's safari seasons, including the Great Migration in the Masai Mara
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-muted rounded-lg overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image 
              src="/images/seasonal-guides/kenya-seasons.jpg" 
              alt="Wildlife during different seasons in Kenya" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">When to Visit Kenya</h2>
            <p className="text-muted-foreground mb-6">
              Kenya offers exceptional safari experiences year-round, but different seasons provide distinct advantages. The dry seasons (January-March and June-October) offer excellent wildlife viewing, while the green seasons (April-May and November-December) showcase lush landscapes and newborn animals at lower prices.
            </p>
            <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-lg">
              <CalendarDays className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="font-medium">Peak season: July to October (Great Migration)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-3xl font-bold mb-6">Kenya's Safari Seasons Overview</h2>
        
        <p>
          Kenya experiences two primary safari seasons—dry and green—each with distinct advantages for wildlife viewing, photography, and overall experience. Understanding these seasonal patterns will help you plan the perfect safari adventure.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <Sun className="h-5 w-5" /> Dry Season (Jan-Mar & Jun-Oct)
            </h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Wildlife congregates around water sources</li>
              <li>Excellent visibility due to sparse vegetation</li>
              <li>Peak tourist season, especially Jul-Oct</li>
              <li>Higher prices and advance booking essential</li>
              <li>The Great Migration is in the Masai Mara (Jul-Oct)</li>
              <li>Comfortable temperatures with low humidity</li>
              <li>Lower risk of malaria due to fewer mosquitoes</li>
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
              <li>Some roads may become difficult to navigate</li>
              <li>The "long rains" (Apr-May) can be heavier</li>
              <li>The "short rains" (Nov-Dec) usually milder</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Month-by-Month Kenya Safari Guide</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">January & February</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Hot and dry with average temperatures of 28-30°C (82-86°F). Clear skies and minimal rainfall.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Excellent visibility as vegetation thins out. Wildlife congregates around permanent water sources. Great for predator sightings.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Amboseli (superb views of Mt. Kilimanjaro), Tsavo, Samburu (good for unique northern species)
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Many resident birds in breeding plumage. Good time for photography with clear air quality.
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Moderate tourist numbers after the December holidays. Good value and availability except in premium reserves.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">March</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Warming up (29-31°C/84-88°F) with increasing humidity. Rain may begin toward month-end.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Still good viewing conditions before the rains. Last month of the dry season.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Masai Mara, Lake Nakuru (flamingoes), Ol Pejeta Conservancy (rhinos)
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Good time for bird photography as many migratory birds prepare to depart.
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Low season begins. Excellent rates and few crowds. Some camps may begin seasonal closures at month-end.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">April & May</h3>
          <p className="mb-3">
            <strong>Weather:</strong> The "long rains" with heavy afternoon downpours. Warm and humid (25-28°C/77-82°F).
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> More challenging as wildlife disperses with abundant water. However, predator action is high with many vulnerable newborns.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Central highlands and conservancies with all-weather roads like Lewa, Laikipia Plateau
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Dramatic landscapes with lush vegetation and wildflowers. Excellent for landscape photography.
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Lowest tourist numbers and best rates of the year. Many camps offer significant discounts, though some close entirely.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">June</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Transition month as rains taper off. Cooler temperatures (24-26°C/75-79°F) with occasional showers.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Improving as vegetation begins to dry out. Wildlife still somewhat dispersed.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Masai Mara (first wildebeest may arrive), Amboseli, Lake Naivasha
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> First herds of the Great Migration may begin crossing into the Mara (timing varies annually).
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Tourism picking up but still shoulder season with good availability and reasonable rates.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">July & August</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Cool and dry (22-25°C/72-77°F). Chilly mornings and evenings in higher elevations.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Excellent. Vegetation is sparse and wildlife concentrates around water. The Great Migration reaches the Masai Mara.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Masai Mara (peak time for river crossings), Amboseli, Laikipia, Meru
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Dramatic wildebeest river crossings in the Mara. Peak predator activity.
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Peak season with highest visitor numbers and rates. Book accommodations 9-12 months in advance.
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-muted my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">September & October</h3>
          <p className="mb-3">
            <strong>Weather:</strong> Warming up (26-28°C/79-82°F) and still dry. Some rain possible by late October.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Prime wildlife viewing conditions. Great Migration still in the Mara. Wildlife concentrated around remaining water sources.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Masai Mara, Samburu, Tsavo, Amboseli
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Continued migration activity with river crossings. Excellent predator sightings.
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> High season continues though crowds begin to diminish by October. Advanced booking still recommended.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">November & December</h3>
          <p className="mb-3">
            <strong>Weather:</strong> The "short rains" begin. Warm (27-29°C/81-84°F) with afternoon showers. Less intense than the long rains.
          </p>
          <p className="mb-3">
            <strong>Wildlife viewing:</strong> Good overall, especially between rain showers. Migration heads back to Tanzania by late November.
          </p>
          <p className="mb-3">
            <strong>Best regions:</strong> Ol Pejeta, Laikipia, Lake Nakuru, Amboseli, Tsavo
          </p>
          <p className="mb-3">
            <strong>Special events:</strong> Birthing season in many areas with newborn animals. Migratory birds return in large numbers.
          </p>
          <p className="mb-0">
            <strong>Visitor experience:</strong> Low season in November. December sees holiday crowds and higher rates, especially during Christmas and New Year.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-6">Great Migration in Kenya</h2>

        <p>
          The Great Migration—one of nature's most spectacular wildlife events—enters Kenya from Tanzania around July and remains in the Masai Mara until October/November before heading south again. The exact timing varies each year based on rainfall patterns.
        </p>

        <div className="relative h-[400px] rounded-xl overflow-hidden my-8">
          <Image 
            src="/images/seasonal-guides/kenya-migration.jpg" 
            alt="Wildebeest crossing the Mara River during the Great Migration" 
            fill
            className="object-cover"
          />
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Migration Timeline in the Masai Mara</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>July</strong> - First herds arrive from Tanzania, crossing the Mara River</li>
            <li><strong>August</strong> - Peak of the migration with most dramatic river crossings</li>
            <li><strong>September</strong> - Large herds spread across the Mara plains</li>
            <li><strong>October</strong> - Herds begin moving south as they sense the coming rains in Tanzania</li>
            <li><strong>November</strong> - Most wildebeest and zebra have left the Mara, heading back to the Serengeti</li>
          </ul>
        </div>

        <p>
          The migration involves approximately 1.5 million wildebeest and hundreds of thousands of zebra and gazelle. The most dramatic moments occur during river crossings, where crocodiles lie in wait and the chaotic mass of animals creates unforgettable scenes.
        </p>

        <p>
          For the best migration viewing, stay in camps located near the major crossing points along the Mara River, particularly in the north and western Mara. Private conservancies bordering the national reserve also offer excellent, less crowded viewing opportunities.
        </p>

        <h2 className="text-3xl font-bold mb-6">Regional Seasonal Considerations</h2>

        <p>
          Kenya's diverse ecosystems mean that different regions offer unique seasonal advantages:
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2">Masai Mara</h4>
            <ul className="list-disc pl-6 mb-0 space-y-1">
              <li><strong>Best:</strong> July-October (migration)</li>
              <li><strong>Good:</strong> January-February, June</li>
              <li><strong>Challenging:</strong> April-May (heavy rains)</li>
              <li>Year-round resident game including big cats</li>
              <li>December-March for fewer crowds but still good wildlife</li>
            </ul>
          </div>
          
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2">Amboseli</h4>
            <ul className="list-disc pl-6 mb-0 space-y-1">
              <li><strong>Best:</strong> June-October (clear views of Kilimanjaro)</li>
              <li><strong>Good:</strong> January-February</li>
              <li><strong>Challenging:</strong> April (wettest month)</li>
              <li>Famous for large elephant herds</li>
              <li>Dry seasons offer concentrated wildlife around marshes</li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2">Samburu & Northern Frontier</h4>
            <ul className="list-disc pl-6 mb-0 space-y-1">
              <li><strong>Best:</strong> June-October, January-February</li>
              <li><strong>Good:</strong> December</li>
              <li><strong>Challenging:</strong> April-May</li>
              <li>Special northern species like Grevy's zebra and reticulated giraffe</li>
              <li>Hotter and drier than southern parks</li>
            </ul>
          </div>
          
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2">Laikipia Plateau</h4>
            <ul className="list-disc pl-6 mb-0 space-y-1">
              <li><strong>Best:</strong> July-October, January-March</li>
              <li><strong>Good:</strong> June, December</li>
              <li><strong>Challenging:</strong> April-May</li>
              <li>Private conservancies with excellent rhino populations</li>
              <li>Good year-round with exclusive experiences</li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2">Tsavo National Parks</h4>
            <ul className="list-disc pl-6 mb-0 space-y-1">
              <li><strong>Best:</strong> June-October, January-February</li>
              <li><strong>Good:</strong> December</li>
              <li><strong>Challenging:</strong> April-May</li>
              <li>Less crowded than other major parks</li>
              <li>Famous red elephants in dry season</li>
            </ul>
          </div>
          
          <div className="bg-muted/10 p-6 rounded-xl border border-muted">
            <h4 className="font-semibold text-primary mb-2">Rift Valley Lakes</h4>
            <ul className="list-disc pl-6 mb-0 space-y-1">
              <li><strong>Best for birds:</strong> November-April (migratory birds)</li>
              <li><strong>Best for mammals:</strong> June-October</li>
              <li>Lake Nakuru - flamingos and rhinos</li>
              <li>Lake Naivasha - hippos and over 400 bird species</li>
              <li>Lake Bogoria - hot springs and flamingos</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Photography Considerations</h2>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
          <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
            <Camera className="h-5 w-5" /> Seasonal Photography Tips
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Dry season (Jun-Oct, Jan-Feb)</strong> - Excellent for wildlife photography with clear visibility and concentrated animals. Dusty conditions create atmospheric golden light, especially at sunrise and sunset. Stark landscapes contrast with wildlife.</li>
            <li><strong>Green season (Apr-May, Nov-Dec)</strong> - Vibrant landscapes make for beautiful backdrops. Dramatic skies and storm clouds add atmosphere. Calving season means plenty of newborns and predator action. Fewer vehicles means better positioning for shots.</li>
            <li><strong>Migration (Jul-Oct)</strong> - Dramatic river crossings require patience and luck. Position at crossings early morning or late afternoon when light is best and crossings more likely.</li>
            <li><strong>Bird photography</strong> - November to April when migratory species are present and many birds are in breeding plumage.</li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold mb-6">Seasonal Pricing Considerations</h2>

        <p>
          Safari costs in Kenya vary significantly by season:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Premium/Peak Season (Jul-Oct)</strong>: Prices 30-50% higher than low season, especially in the Masai Mara</li>
          <li><strong>High Season (Jan-Feb, Dec)</strong>: Slightly lower than peak but still premium pricing</li>
          <li><strong>Shoulder Season (Jun, Nov)</strong>: 10-30% lower than peak rates</li>
          <li><strong>Low/Green Season (Mar-May)</strong>: Lowest rates with discounts up to 40%</li>
        </ul>

        <p>
          For the best value while still enjoying excellent wildlife viewing, consider traveling in June (just before peak season) or November (just after). January and February also offer excellent game viewing with more moderate prices than the migration months.
        </p>

        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20 my-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Recommendation</h2>
          <p className="mb-4">
            For first-time visitors seeking the classic Kenya safari experience, we recommend visiting during September. The Great Migration is still in the Mara, weather conditions are excellent, and tourist numbers begin to decrease slightly from the August peak.
          </p>
          <p className="mb-0">
            For travelers prioritizing value and unique experiences over specific wildlife events, consider a green season safari in November or late May/early June. You'll enjoy lusher landscapes, newborn animals, and significantly lower prices—all while avoiding the peak tourist crowds.
          </p>
        </div>

        <div className="flex justify-center my-12">
          <Link href="/resources/seasonal-guides" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to All Seasonal Guides
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KenyaSeasonalGuidePage; 