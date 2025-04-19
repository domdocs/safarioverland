import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Compass, Quote, Check } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Off-the-Beaten-Path Safari Destinations | Safari Overland',
  description: 'Discover Africa\'s hidden safari gems, from Timbuktu and Guinea Bissau to remote parks in Tanzania, Zambia, and Gabon that offer authentic wildlife experiences away from the crowds.',
  keywords: 'off the beaten path safaris, remote African destinations, Timbuktu, Guinea Bissau, Ruaha, Mahale, Kafue, Loango, hidden safari gems',
};

const OffTheBeatenPathPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3">Off-the-Beaten-Path Safari Destinations: My Journey Beyond the Map</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          There's a certain magic in stepping off Africa's well-worn safari trails—trading the crowds of the Serengeti or Kruger for places where the wild still feels raw and undiscovered.
        </p>
      </div>

      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="relative h-[400px] sm:h-[450px] rounded-xl overflow-hidden shadow-md">
          <Image 
            src="/images/planning-guides/destinations/off-the-beaten-path.jpg" 
            alt="A remote African landscape with wildlife away from the crowds" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-5 text-primary">A Personal Journey</h2>
          <p className="text-lg mb-6 leading-relaxed">
            Over the years, my search for unique safari experiences has led me to some of the continent's most remarkable, yet rarely visited, corners. Here are a few personal stories from the road less traveled—places like Timbuktu before the 2012 coup, the wilds of Guinea Bissau, and other hidden gems that have left an indelible mark on my soul.
          </p>
          <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg border border-muted">
            <Compass className="h-6 w-6 text-primary flex-shrink-0" />
            <span className="font-medium">Discover Africa's extraordinary hidden corners</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        {/* Timbuktu Section */}
        <h2 id="timbuktu" className="text-3xl font-bold text-primary mt-16 mb-6 flex items-center gap-3">
          <MapPin className="h-7 w-7 text-primary flex-shrink-0" />
          Timbuktu, Mali: Echoes of Empires and Desert Mysteries
        </h2>
        
        <div className="mb-10">
          <p className="leading-relaxed">
            It's hard to describe the feeling of finally arriving in Timbuktu—a place that exists as much in the imagination as it does on the map. For centuries, it was the fabled end of the trans-Saharan caravan routes, a city of scholars, gold, and secrets. When I visited, before the tragic events of 2012, the city was quiet but alive with echoes of its storied past.
          </p>
          
          <div className="relative h-[300px] rounded-xl overflow-hidden my-8">
            <Image 
              src="/images/stories/mosque-timbuktu.jpg" 
              alt="Ancient mud-brick mosques of Timbuktu with desert sand streets" 
              fill
              className="object-cover"
            />
          </div>
          
          <p className="leading-relaxed">
            Wandering the sand-caked streets, I found traces of the old days: the mud-brick walls of the Sankore and Djinguereber Mosques, the faded grandeur of ancient libraries, and the legendary manuscripts—centuries-old texts rescued from war and hidden from destruction. The air was thick with dust and history. In the evenings, I'd walk to the edge of town to watch the sun set over the Sahara, sometimes joining Tuareg guides for tea and stories in their camps.
          </p>
          
          <p className="leading-relaxed">
            Getting to Timbuktu was an adventure in itself—a slow, meandering journey by riverboat down the Niger, passing villages where the river was the lifeblood of daily existence. The sense of remoteness was profound. Even then, you could feel the city's vulnerability, its treasures at risk from the shifting tides of politics and conflict. Yet, for a brief moment, I glimpsed the magic that once made Timbuktu the center of the world.
          </p>
        </div>
        
        {/* Guinea Bissau Section */}
        <h2 id="guinea-bissau" className="text-3xl font-bold text-primary mt-16 mb-6 flex items-center gap-3">
          <MapPin className="h-7 w-7 text-primary flex-shrink-0" />
          Guinea Bissau: Where the Wild Rivers Run
        </h2>
        
        <div className="mb-10">
          <p className="leading-relaxed">
            Few travelers make it to Guinea Bissau, but those who do are rewarded with a safari experience that feels refreshingly authentic. My journey began with a border crossing from Senegal, bouncing along dusty roads to reach the sleepy capital of Bissau and onward to the lush, riverine landscapes that define the country.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-muted/10 p-6 rounded-xl border border-muted">
              <h4 className="font-semibold text-primary mb-2">The Riverine Magic</h4>
              <p className="mb-0">
                One of my fondest memories is of drifting along the mangrove-lined waterways, spotting monkeys and birds, and visiting villages where the pace of life is dictated by the tides. In the evenings, we'd gather in roundhouses, sharing food and laughter as the sun set over the river. The call to prayer would float across the water at dawn, and mornings began with strong coffee and the promise of another day's adventure.
              </p>
            </div>
            
            <div className="bg-muted/10 p-6 rounded-xl border border-muted">
              <h4 className="font-semibold text-primary mb-2">Wildlife & Hospitality</h4>
              <p className="mb-0">
                Guinea Bissau's wildlife might not match the sheer numbers of East Africa, but the intimacy of the experience is unparalleled. I'll never forget watching hippos and chimpanzees in the River Gambia National Park, or the warmth of the local families who welcomed us into their homes. Here, the safari is as much about people and culture as it is about animals.
              </p>
            </div>
          </div>
        </div>
        
        {/* Tanzania Section */}
        <h2 id="tanzania" className="text-3xl font-bold text-primary mt-16 mb-6 flex items-center gap-3">
          <MapPin className="h-7 w-7 text-primary flex-shrink-0" />
          Ruaha and Mahale, Tanzania: Wild Solitude
        </h2>
        
        <div className="mb-10">
          <p className="leading-relaxed">
            While Tanzania is famous for the Serengeti, my most memorable safari there was in Ruaha National Park—a vast, untamed wilderness where elephants roam in massive herds and lions hunt along the riverbanks. Unlike the busy northern circuit, Ruaha feels like a secret kept by those who crave solitude and raw nature. Game drives here are often solitary affairs, with only the distant trumpeting of elephants or the roar of a lion to break the silence.
          </p>
          
          <div className="relative h-[300px] rounded-xl overflow-hidden my-8">
            <Image 
              src="/images/resources/mahale-mountains.jpg" 
              alt="The lush forests of Mahale Mountains with Lake Tanganyika in the distance" 
              fill
              className="object-cover"
            />
          </div>
          
          <p className="leading-relaxed">
            Farther west, in the Mahale Mountains, I trekked through dense forests in search of wild chimpanzees. The journey was challenging—hours of hiking through tangled vines and steep slopes—but the reward was an hour spent in the company of a chimp family, watching their interactions up close. Few safari moments have felt as intimate or as humbling.
          </p>
        </div>
        
        {/* Zambia Section */}
        <h2 id="zambia" className="text-3xl font-bold text-primary mt-16 mb-6 flex items-center gap-3">
          <MapPin className="h-7 w-7 text-primary flex-shrink-0" />
          Kafue, Zambia: The Untamed Heart of Africa
        </h2>
        
        <div className="mb-10">
          <p className="leading-relaxed">
            Zambia's Kafue National Park is another destination that stole my heart. Vast and largely unexplored, Kafue offers a diversity of wildlife and habitats that rivals any of Africa's better-known parks, but without the crowds. Here, I explored grassy floodplains teeming with red lechwe and puku antelope, watched cheetahs hunt at dawn, and drifted along the river on a canoe, hippos grunting nearby.
          </p>
          
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
            <h4 className="text-xl font-semibold text-primary mb-3">What Sets Kafue Apart</h4>
            <p className="mb-0 leading-relaxed">
              What sets Kafue apart is the sense of adventure—traditional game drives, boat cruises, hot-air balloon safaris, and nature walks all reveal a different side of the park. Some days, we'd go hours without seeing another vehicle, a rare luxury in today's safari world.
            </p>
          </div>
        </div>
        
        {/* Gabon Section */}
        <h2 id="gabon" className="text-3xl font-bold text-primary mt-16 mb-6 flex items-center gap-3">
          <MapPin className="h-7 w-7 text-primary flex-shrink-0" />
          Loango, Gabon: Where Forest Meets the Sea
        </h2>
        
        <div className="mb-10">
          <p className="leading-relaxed">
            If you crave the truly unusual, few places compare to Gabon's Loango National Park. Here, the rainforest spills onto wild Atlantic beaches, and you can witness elephants and buffalo wandering along the surf, and hippos sometimes seen "surfing" the waves. The park is a haven for birdlife, primates, and even forest-dwelling gorillas. My days here were spent hiking through dense jungle, boating through lagoons, and marveling at the surreal sight of wildlife on the sand.
          </p>
        </div>
        
        {/* Madagascar Section */}
        <h2 id="madagascar" className="text-3xl font-bold text-primary mt-16 mb-6 flex items-center gap-3">
          <MapPin className="h-7 w-7 text-primary flex-shrink-0" />
          Andasibe, Madagascar: The Land of Lemurs
        </h2>
        
        <div className="mb-10">
          <p className="leading-relaxed">
            Madagascar is unlike anywhere else in Africa—an island that evolved in isolation, creating a wonderland of unique species. In Andasibe-Mantadia National Park, I spent nights tracking mouse lemurs with headlamps and days searching for the indri, whose haunting calls echo through the misty forest. Watching these endangered primates leap through the canopy, I felt like I'd stepped into another world entirely.
          </p>
          
          <div className="relative h-[300px] rounded-xl overflow-hidden my-8">
            <Image 
              src="/images/resources/indri-lemur.jpg" 
              alt="An Indri lemur in the rainforests of Madagascar" 
              fill
              className="object-cover"
            />
          </div>
          
          <p className="leading-relaxed">
            The real magic of Madagascar isn't just the lemurs, but the incredible diversity of life around every corner—chameleons changing colors before your eyes, frogs no bigger than your thumbnail, and orchids that bloom just once a year. This is a safari for the patient observer, one who finds joy in the small wonders of nature.
          </p>
        </div>
        
        {/* Republic of Congo Section */}
        <h2 id="congo" className="text-3xl font-bold text-primary mt-16 mb-6 flex items-center gap-3">
          <MapPin className="h-7 w-7 text-primary flex-shrink-0" />
          Odzala, Republic of Congo: Gorilla Encounters
        </h2>
        
        <div className="mb-10">
          <p className="leading-relaxed">
            My most profound wildlife experience happened in Odzala-Kokoua National Park in the Republic of Congo. After hours of trekking through swampy forest, we came upon a family of western lowland gorillas. Watching the silverback interact with his family—juveniles playing, mothers nursing infants—revealed intelligence and emotion that felt startlingly familiar.
          </p>
          
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8">
            <h4 className="text-xl font-semibold text-primary mb-3">Essential Planning Tips</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Book at least 6-12 months in advance for these remote destinations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Be prepared for basic accommodations in some locations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Pack light but include essentials like binoculars, insect repellent, and raingear</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Research seasonal variations—each destination has optimal visiting times</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Conclusion */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20 my-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Final Thoughts on Off-the-Beaten-Path Adventures</h2>
          <p className="leading-relaxed">
            These lesser-known destinations offer what has become increasingly rare in our connected world: genuine adventure and solitude. They require more effort to reach and often lack the polished infrastructure of popular safari circuits, but the rewards—pristine wilderness, authentic cultural encounters, and wildlife experiences that feel like true discovery—are immeasurable.
          </p>
          <p className="leading-relaxed mt-4 mb-0">
            If you're ready to venture beyond the famous parks and reserves, let us at Safari Overland help you craft a journey to these extraordinary places. The memories you'll create will be worth every extra mile traveled.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OffTheBeatenPathPage; 