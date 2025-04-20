import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaCamera, FaLeaf, FaPaw, FaMapMarkedAlt, FaGlobe } from 'react-icons/fa';
import CTASection from '@/components/CTASection';
import PageHeader from '@/components/PageHeader';
import DestinationCard from '@/components/DestinationCard';
import ContentSection from '@/components/ContentSection';
import ImageTextSplit from '@/components/ImageTextSplit';
import FeatureGrid from '@/components/FeatureGrid';

export const metadata: Metadata = {
  title: "Southern Africa Safaris | Ultimate Safari Guide | Safari Overland",
  description: "Explore the diverse wilderness of Southern Africa with our comprehensive safari guide. From Botswana's Okavango Delta to Kruger National Park and Victoria Falls.",
  keywords: "Southern Africa safari, Botswana safari, South Africa safari, Zimbabwe safari, Kruger National Park, Okavango Delta, Victoria Falls, safari destinations"
};

export default function SouthernAfricaPage() {
  const countries = [
    {
      name: 'South Africa',
      image: '/images/destinations/south-africa.jpg',
      description: 'Home to the iconic Kruger National Park and diverse landscapes from coastal regions to bushveld, South Africa offers exceptional wildlife viewing and infrastructure.',
      highlights: ['Kruger National Park', 'Sabi Sands', 'Madikwe Game Reserve', 'Kgalagadi Transfrontier Park'],
      bestTime: 'May to September (dry winter season)'
    },
    {
      name: 'Botswana',
      image: '/images/destinations/botswana.jpg',
      description: 'Known for its pristine wilderness and conservation-focused tourism, Botswana's Okavango Delta and Chobe National Park offer some of Africa's most exclusive safari experiences.',
      highlights: ['Okavango Delta', 'Chobe National Park', 'Moremi Game Reserve', 'Makgadikgadi Pans'],
      bestTime: 'June to October (dry season)'
    },
    {
      name: 'Zimbabwe',
      image: '/images/destinations/zimbabwe.jpg',
      description: 'From the thundering Victoria Falls to the wildlife-rich Hwange National Park, Zimbabwe combines natural wonders with authentic safari experiences and warm hospitality.',
      highlights: ['Victoria Falls', 'Hwange National Park', 'Mana Pools', 'Matobo Hills'],
      bestTime: 'May to October (dry season)'
    },
    {
      name: 'Namibia',
      image: '/images/destinations/namibia.jpg',
      description: 'Characterized by dramatic desert landscapes, Namibia offers unique wildlife adapted to arid conditions, ancient cultures, and striking scenery from Sossusvlei to Etosha.',
      highlights: ['Etosha National Park', 'Sossusvlei', 'Damaraland', 'Skeleton Coast'],
      bestTime: 'June to October (cooler dry season)'
    },
    {
      name: 'Zambia',
      image: '/images/destinations/zambia.jpg',
      description: 'The birthplace of walking safaris, Zambia offers an authentic wilderness experience with pristine national parks, the mighty Zambezi River, and Victoria Falls.',
      highlights: ['South Luangwa', 'Lower Zambezi', 'Kafue National Park', 'Victoria Falls'],
      bestTime: 'May to October (dry season)'
    },
    {
      name: 'Mozambique',
      image: '/images/destinations/mozambique.jpg',
      description: 'With its pristine beaches and developing marine reserves, Mozambique is perfect for combining safari adventures with coastal relaxation and underwater exploration.',
      highlights: ['Bazaruto Archipelago', 'Quirimbas Islands', 'Gorongosa National Park', 'Niassa Reserve'],
      bestTime: 'May to November (dry season)'
    }
  ];

  const wildlife = [
    {
      name: 'Big Five',
      description: 'Southern Africa is renowned for Big Five sightings (lion, leopard, elephant, buffalo, and rhino), particularly in South Africa, Botswana, and Zimbabwe.',
      image: '/images/wildlife/big-five.jpg'
    },
    {
      name: 'Desert-adapted Species',
      description: 'Namibia hosts unique desert-adapted elephants and rhinos, while the Kalahari is home to specialized species like meerkats and bat-eared foxes.',
      image: '/images/wildlife/desert-adapted.jpg'
    },
    {
      name: 'Aquatic Wildlife',
      description: 'The Okavango Delta supports hippos, crocodiles, and water birds, while coastal areas of Mozambique offer marine encounters with dugongs and whale sharks.',
      image: '/images/wildlife/aquatic.jpg'
    },
    {
      name: 'Rare Antelope',
      description: 'Look for sable, roan, and puku in Zambia, while Botswana and Namibia host large herds of endemic species like red lechwe and gemsbok.',
      image: '/images/wildlife/antelope.jpg'
    }
  ];

  const seasons = [
    {
      name: 'Dry Season (May-October)',
      description: 'The prime game-viewing season with sparse vegetation, wildlife concentrating around water sources, and mild daytime temperatures with cool nights.',
      highlights: ['Best wildlife viewing', 'Lower malaria risk', 'Pleasant temperatures', 'Less foliage for better visibility']
    },
    {
      name: 'Green Season (November-April)',
      description: 'The summer rainy season brings lush landscapes, newborn animals, migrating birds, and fewer tourists, though some areas may have limited access.',
      highlights: ['Lush scenery', 'Bird watching', 'Lower rates', 'Newborn animals']
    },
    {
      name: 'Migration Season',
      description: 'Witness the zebra migration in Botswana (March-April and November), the bat migration in Zambia (November), or the sardine run along South Africa's coast (June-July).',
      highlights: ['Zebra migrations', 'Bat migrations', 'Sardine run', 'Mass wildlife movements']
    }
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image 
          src="/images/destinations/southern-africa-hero.jpg" 
          alt="Southern Africa Safari Landscape" 
          fill 
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white p-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Southern Africa</h1>
            <p className="text-xl md:text-2xl">Discover iconic wildlife destinations and breathtaking landscapes</p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <ContentSection>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">The Heart of African Safari Experiences</h2>
          <p className="mb-4">
            Southern Africa represents the quintessential African safari destination, where pristine wilderness areas, 
            abundant wildlife, and diverse ecosystems combine to create unparalleled safari experiences. From the 
            water-rich Okavango Delta to the dramatic dunes of Namibia and the iconic Kruger National Park, this 
            region offers an incredible variety of landscapes and wildlife encounters.
          </p>
          <p>
            With well-developed tourism infrastructure in countries like South Africa, exclusive private concessions 
            in Botswana, and emerging destinations like Zambia and Zimbabwe, Southern Africa caters to all types of 
            safari travelers—from first-timers to seasoned safari enthusiasts seeking authentic wilderness experiences.
          </p>
        </div>
      </ContentSection>

      {/* Key Countries */}
      <ContentSection className="bg-stone-100">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Southern Africa's Safari Countries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country, index) => (
            <DestinationCard 
              key={index}
              title={country.name}
              image={country.image}
              description={country.description}
              link={`/destinations/${country.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Highlights:</h4>
                <ul className="list-disc list-inside">
                  {country.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
                <p className="mt-2"><span className="font-semibold">Best time to visit:</span> {country.bestTime}</p>
              </div>
            </DestinationCard>
          ))}
        </div>
      </ContentSection>

      {/* Wildlife */}
      <ContentSection>
        <h2 className="text-3xl font-bold mb-8 text-center">Iconic Southern African Wildlife</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {wildlife.map((animal, index) => (
            <ImageTextSplit 
              key={index}
              title={animal.name}
              text={animal.description}
              imageSrc={animal.image}
              imageAlt={`${animal.name} in Southern Africa`}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </ContentSection>

      {/* Seasons */}
      <ContentSection className="bg-stone-100">
        <h2 className="text-3xl font-bold mb-8 text-center">When to Visit Southern Africa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {seasons.map((season, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-amber-700 mr-3 text-xl" />
                <h3 className="text-xl font-semibold">{season.name}</h3>
              </div>
              <p className="mb-4">{season.description}</p>
              <h4 className="font-semibold mb-2">Highlights:</h4>
              <ul className="list-disc list-inside">
                {season.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/resources/seasonal-guides" className="inline-block px-6 py-3 bg-amber-700 text-white font-medium rounded-md hover:bg-amber-800 transition-colors">
            View Detailed Seasonal Guides
          </Link>
        </div>
      </ContentSection>

      {/* Experiences */}
      <ContentSection>
        <h2 className="text-3xl font-bold mb-8 text-center">Signature Southern Africa Experiences</h2>
        <FeatureGrid 
          features={[
            {
              title: 'Mokoro Rides',
              description: 'Glide silently through the waterways of the Okavango Delta in a traditional dugout canoe.',
              icon: <FaLeaf className="text-amber-700" />
            },
            {
              title: 'Walking Safaris',
              description: 'Experience the birthplace of walking safaris in Zambia's South Luangwa National Park.',
              icon: <FaGlobe className="text-amber-700" />
            },
            {
              title: 'Victoria Falls',
              description: 'Witness the power of the "Smoke that Thunders" from both the Zimbabwe and Zambia sides.',
              icon: <FaMapMarkedAlt className="text-amber-700" />
            },
            {
              title: 'Desert Excursions',
              description: 'Explore Namibia's ancient desert landscapes and the striking red dunes of Sossusvlei.',
              icon: <FaMapMarkedAlt className="text-amber-700" />
            },
            {
              title: 'Big Five Safaris',
              description: 'Search for lion, leopard, elephant, rhino, and buffalo in renowned game reserves.',
              icon: <FaPaw className="text-amber-700" />
            },
            {
              title: 'Beach Extensions',
              description: 'Combine wildlife viewing with coastal relaxation in Mozambique or South Africa.',
              icon: <FaCamera className="text-amber-700" />
            }
          ]}
        />
      </ContentSection>

      {/* Photography */}
      <ContentSection className="bg-stone-100">
        <ImageTextSplit 
          title="Photography Paradise"
          text="Southern Africa offers exceptional photographic opportunities with its diverse landscapes and abundant wildlife. From dramatic sunsets over the Okavango to close encounters with the Big Five in private reserves, photographers will find endless inspiration. The region's excellent lighting conditions, specialized photographic safari vehicles, and knowledgeable guides make it ideal for capturing unforgettable images."
          imageSrc="/images/experiences/photography-safari.jpg"
          imageAlt="Photographer on safari in Southern Africa"
          cta={{
            text: "View Photography Tips",
            href: "/resources/photography-guide"
          }}
        />
      </ContentSection>

      {/* CTA Section */}
      <CTASection 
        title="Plan Your Southern Africa Safari Adventure"
        description="Work with our experienced safari specialists to create your perfect Southern African journey"
        buttonText="Start Planning"
        buttonLink="/contact"
      />
    </main>
  );
}
