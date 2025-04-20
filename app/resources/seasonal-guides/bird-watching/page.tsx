import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "African Bird Watching Seasonal Guide | Safari Overland",
  description: "Discover the best seasons for bird watching across Africa's diverse ecosystems, from the wetlands of the Okavango Delta to the forests of Uganda.",
  keywords: ["bird watching Africa", "birding safari", "best time bird watching", "African birds", "migratory birds Africa", "birding season", "bird photography"],
};

export default function BirdWatchingGuide() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Bird Watching Seasonal Guide"
        subtitle="Discover when and where to find Africa's spectacular birdlife"
      />
      
      <Breadcrumbs
        items={[
          { label: "Home", link: "/" },
          { label: "Resources", link: "/resources" },
          { label: "Seasonal Guides", link: "/resources/seasonal-guides" },
          { label: "Bird Watching", link: "/resources/seasonal-guides/bird-watching" },
        ]}
      />
      
      {/* Hero section */}
      <div className="relative h-[40vh] md:h-[60vh] w-full">
        <Image 
          src="/images/seasonal-guides/bird-watching.jpg" 
          alt="African Bird Watching"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Bird Watching in Africa
            </h1>
            <p className="text-xl text-white max-w-2xl">
              Follow the seasons to witness over 2,300 bird species in their natural habitats
            </p>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">When to Go Bird Watching in Africa</h2>
            <p className="mb-4">
              Africa hosts incredible avian diversity with over 2,300 bird species across its varied ecosystems. The best timing for your birding safari depends on your target species, with both resident and migratory birds offering different viewing opportunities throughout the year.
            </p>
            <div className="bg-stone-100 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-medium mb-3">Birding Seasons Overview</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>November to April:</strong> Peak for migratory birds from Europe and Asia, with lush landscapes from rainy seasons</li>
                <li><strong>May to October:</strong> Excellent for resident birds with clearer visibility during dry seasons</li>
                <li><strong>Breeding season:</strong> Many resident birds display vibrant plumage and fascinating behaviors during their respective breeding periods</li>
              </ul>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Regional Bird Watching Guide</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-medium mb-3">East Africa</h3>
              <p className="mb-3">
                Kenya, Tanzania, and Uganda offer exceptional birding year-round, with over 1,000 species each.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="border border-stone-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Best Season: November to April</h4>
                  <ul className="list-disc pl-5">
                    <li>Palearctic migrants present</li>
                    <li>Breeding plumage for many species</li>
                    <li>Lush, green habitats</li>
                    <li>Key spots: Lake Nakuru, Serengeti, Bwindi Forest</li>
                  </ul>
                </div>
                <div className="border border-stone-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Dry Season: June to October</h4>
                  <ul className="list-disc pl-5">
                    <li>Easier spotting with less foliage</li>
                    <li>Concentrated bird activity around water sources</li>
                    <li>Better accessibility to remote areas</li>
                    <li>Key spots: Mara River, Amboseli, Queen Elizabeth NP</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-medium mb-3">Southern Africa</h3>
              <p className="mb-3">
                Botswana, Zambia, South Africa, and Namibia feature diverse habitats from deserts to wetlands.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="border border-stone-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Best Season: November to March</h4>
                  <ul className="list-disc pl-5">
                    <li>Summer migrants present</li>
                    <li>Okavango Delta flooding (Botswana)</li>
                    <li>Breeding season for many species</li>
                    <li>Key spots: Okavango, Kruger, Chobe River</li>
                  </ul>
                </div>
                <div className="border border-stone-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Dry Season: April to October</h4>
                  <ul className="list-disc pl-5">
                    <li>Concentrated bird activity around water</li>
                    <li>Better visibility with less vegetation</li>
                    <li>Etosha Pan (Namibia) attracts numerous species</li>
                    <li>Key spots: Etosha, Walvis Bay, Zaagkuildrift Road</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-medium mb-3">West & Central Africa</h3>
              <p className="mb-3">
                Ghana, Cameroon, and Gabon offer unique forest birds and many endemic species.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-stone-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Best Season: November to April</h4>
                  <ul className="list-disc pl-5">
                    <li>Dry conditions improve forest visibility</li>
                    <li>Many specialty birds more vocal</li>
                    <li>Migratory species present</li>
                    <li>Key spots: Kakum NP, Ankasa Forest, Loango NP</li>
                  </ul>
                </div>
                <div className="border border-stone-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Less Optimal: May to October</h4>
                  <ul className="list-disc pl-5">
                    <li>Heavier rainfall in forest regions</li>
                    <li>More challenging conditions</li>
                    <li>Some unique breeding behaviors visible</li>
                    <li>Key spots: Mole NP, Mount Cameroon</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Iconic African Birds by Season</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-stone-200">
                <thead className="bg-stone-100">
                  <tr>
                    <th className="border border-stone-200 p-3 text-left">Season</th>
                    <th className="border border-stone-200 p-3 text-left">Notable Birds</th>
                    <th className="border border-stone-200 p-3 text-left">Best Locations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-stone-200 p-3">Wet Season<br/>(Nov-Apr)</td>
                    <td className="border border-stone-200 p-3">
                      <ul className="list-disc pl-5">
                        <li>European Bee-eaters</li>
                        <li>Eurasian Golden Orioles</li>
                        <li>Carmine Bee-eaters (breeding)</li>
                        <li>African Pittas</li>
                        <li>Wattled Cranes</li>
                      </ul>
                    </td>
                    <td className="border border-stone-200 p-3">
                      <ul className="list-disc pl-5">
                        <li>Rift Valley Lakes (Kenya)</li>
                        <li>Okavango Delta (Botswana)</li>
                        <li>South Luangwa (Zambia)</li>
                        <li>Mana Pools (Zimbabwe)</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-stone-200 p-3">Dry Season<br/>(May-Oct)</td>
                    <td className="border border-stone-200 p-3">
                      <ul className="list-disc pl-5">
                        <li>Shoebill</li>
                        <li>Secretary Bird</li>
                        <li>Ground Hornbills</li>
                        <li>Kori Bustard</li>
                        <li>Flamingos (concentrated)</li>
                      </ul>
                    </td>
                    <td className="border border-stone-200 p-3">
                      <ul className="list-disc pl-5">
                        <li>Murchison Falls (Uganda)</li>
                        <li>Etosha Pan (Namibia)</li>
                        <li>Lake Nakuru (Kenya)</li>
                        <li>Kruger National Park (South Africa)</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-stone-200 p-3">Year-round<br/>Highlights</td>
                    <td className="border border-stone-200 p-3">
                      <ul className="list-disc pl-5">
                        <li>Lilac-breasted Roller</li>
                        <li>African Fish Eagle</li>
                        <li>Malachite Kingfisher</li>
                        <li>Superb Starling</li>
                        <li>Helmeted Guineafowl</li>
                      </ul>
                    </td>
                    <td className="border border-stone-200 p-3">
                      <ul className="list-disc pl-5">
                        <li>Masai Mara (Kenya)</li>
                        <li>Queen Elizabeth NP (Uganda)</li>
                        <li>Chobe River (Botswana)</li>
                        <li>Kruger National Park (South Africa)</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Bird Watching Essentials</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-3">Equipment Checklist</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Binoculars:</strong> 8x42 or 10x42 recommended for birding</li>
                  <li><strong>Field guide:</strong> Region-specific bird guides</li>
                  <li><strong>Camera:</strong> With telephoto lens (300mm+)</li>
                  <li><strong>Notebook:</strong> For recording sightings</li>
                  <li><strong>Clothing:</strong> Neutral colors, sun protection</li>
                  <li><strong>Apps:</strong> Bird identification apps with offline mode</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3">Birding Etiquette</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Keep a respectful distance from birds</li>
                  <li>Avoid disturbing nesting areas</li>
                  <li>Use calls/playback sparingly and responsibly</li>
                  <li>Stay on designated paths in sensitive areas</li>
                  <li>Follow park regulations and guidelines</li>
                  <li>Share sightings with local conservation groups</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="bg-stone-100 p-6 rounded-lg mb-12">
            <h2 className="text-3xl font-semibold mb-4">Plan Your Birding Safari</h2>
            <p className="mb-6">
              Our specialists can help design a custom bird watching itinerary targeting your wishlist species during optimal seasons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg text-center font-medium transition duration-300">
                Contact a Specialist
              </Link>
              <Link href="/resources/seasonal-guides" className="bg-stone-700 hover:bg-stone-800 text-white py-3 px-6 rounded-lg text-center font-medium transition duration-300">
                Browse All Seasonal Guides
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 