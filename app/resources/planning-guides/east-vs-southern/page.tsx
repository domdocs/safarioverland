import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Globe, Camera, Calendar, Scale, Map } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'East Africa vs. Southern Africa: An In-Depth Safari Comparison | Safari Overland',
  description: 'Explore the unique features, wildlife, landscapes, and experiences that set East Africa and Southern Africa apart—so you can choose your ideal safari adventure.',
  keywords: 'east africa safari, southern africa safari, safari comparison, africa safari regions, serengeti vs kruger, masai mara, okavango delta, safari planning, africa wildlife',
};

const EastVsSouthernPage = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Page Header */}
            <div className="mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3">East Africa vs. Southern Africa: An In-Depth Safari Comparison</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">Explore the unique features, wildlife, landscapes, and experiences that set East Africa and Southern Africa apart—so you can choose your ideal safari adventure.</p>
            </div>

            {/* Hero Section */}
            <div className="grid md:grid-cols-2 gap-10 mb-16">
                <div className="relative h-[400px] sm:h-[450px] rounded-xl overflow-hidden shadow-md">
                    <Image 
                        src="/images/resources/east-vs-southern-hero.jpg" 
                        alt="Split image showing East African savannah with wildlife and Southern African delta landscape" 
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-5 text-primary">Introduction</h2>
                    <p className="text-lg mb-6 leading-relaxed">
                        Africa's two premier safari regions—East Africa and Southern Africa—offer travelers a wealth of wildlife, landscapes, and cultural encounters. Each region boasts its own signature experiences, from the thunder of the Great Migration to the tranquil waterways of the Okavango Delta. This comprehensive guide compares East and Southern Africa across every major safari consideration, helping you decide which region best matches your interests, travel style, and dream safari moments.
                    </p>
                    <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg border border-muted">
                        <Map className="h-6 w-6 text-primary flex-shrink-0" />
                        <span className="font-medium">Explore our detailed comparison guide below</span>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
                <h2 id="overview" className="text-3xl font-bold text-primary mt-16 mb-6">Overview: Key Differences at a Glance</h2>
                
                <div className="overflow-hidden bg-muted/30 rounded-xl border border-muted mb-12">
                    <table className="w-full border-collapse min-w-full">
                        <thead>
                            <tr className="bg-primary/10">
                                <th className="text-left p-4 border-b border-muted font-semibold">Feature</th>
                                <th className="text-left p-4 border-b border-muted font-semibold">East Africa</th>
                                <th className="text-left p-4 border-b border-muted font-semibold">Southern Africa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Countries</td>
                                <td className="p-4 border-b border-muted">Kenya, Tanzania, Uganda, Rwanda, Ethiopia</td>
                                <td className="p-4 border-b border-muted">South Africa, Botswana, Zimbabwe, Zambia, Namibia, Malawi, Mozambique</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Iconic Parks</td>
                                <td className="p-4 border-b border-muted">Serengeti, Masai Mara, Ngorongoro, Bwindi</td>
                                <td className="p-4 border-b border-muted">Kruger, Okavango Delta, Chobe, Hwange, Etosha</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Signature Experience</td>
                                <td className="p-4 border-b border-muted">Great Migration, gorilla trekking</td>
                                <td className="p-4 border-b border-muted">Big Five, water-based safaris, walking safaris</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Landscapes</td>
                                <td className="p-4 border-b border-muted">Vast savannahs, volcanic craters, rainforests</td>
                                <td className="p-4 border-b border-muted">Wetlands, deserts, bushveld, rivers, salt pans</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Safari Vehicles</td>
                                <td className="p-4 border-b border-muted">Mostly closed 4x4s with pop-up roofs</td>
                                <td className="p-4 border-b border-muted">Mostly open-sided 4x4s, tiered seating</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Wildlife Viewing</td>
                                <td className="p-4 border-b border-muted">Large herds, dramatic predator-prey action</td>
                                <td className="p-4 border-b border-muted">Up-close Big Five, rare species (wild dog, rhino)</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Seasonality</td>
                                <td className="p-4 border-b border-muted">Year-round, best July–Sept (migration)</td>
                                <td className="p-4 border-b border-muted">Best May–Oct (dry season)</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Night Drives</td>
                                <td className="p-4 border-b border-muted">Rare (except in private conservancies)</td>
                                <td className="p-4 border-b border-muted">Common in private reserves</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Accommodation</td>
                                <td className="p-4 border-b border-muted">Authentic tented camps, classic lodges</td>
                                <td className="p-4 border-b border-muted">Contemporary luxury lodges, exclusive camps</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 font-medium">Add-Ons</td>
                                <td className="p-4">Zanzibar, gorilla trekking</td>
                                <td className="p-4">Victoria Falls, Cape Town, wine regions</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                {/* Landscapes & Scenery Section */}
                <h2 id="landscapes" className="text-3xl font-bold text-primary mt-16 mb-6">Landscapes & Scenery</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-muted/10 p-6 rounded-xl border border-muted">
                        <h3 className="text-2xl font-semibold text-primary mb-4">East Africa</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Classic African vistas:</strong> Endless rolling savannahs dotted with acacia trees, dramatic volcanic craters (Ngorongoro), and snow-capped peaks (Mount Kilimanjaro).</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Diverse habitats:</strong> Includes lush equatorial rainforests (Bwindi, Volcanoes), arid plains (Tsavo), and the Rift Valley lakes.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Iconic imagery:</strong> The Serengeti and Masai Mara deliver the "Out of Africa" landscape that many travelers dream of.</p>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-muted/10 p-6 rounded-xl border border-muted">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Southern Africa</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Ecological variety:</strong> From the wetlands of the Okavango Delta and mighty Victoria Falls to the deserts of the Kalahari and Namibia's salt pans.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Unique features:</strong> South Africa's bushveld, Namibia's Skeleton Coast, and the river systems of Botswana and Zimbabwe.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Dramatic contrasts:</strong> Expect everything from lush floodplains to stark desert wilderness.</p>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* Wildlife & Signature Experiences Section */}
                <h2 id="wildlife" className="text-3xl font-bold text-primary mt-16 mb-6">Wildlife & Signature Experiences</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-muted/10 p-6 rounded-xl border border-muted">
                        <h3 className="text-2xl font-semibold text-primary mb-4">East Africa</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">The Great Migration:</strong> The world's largest overland wildlife movement, with over 1.5 million wildebeest and hundreds of thousands of zebras and gazelles crossing the Serengeti and Masai Mara. River crossings (July–October) are legendary for predator-prey drama.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Big Five & More:</strong> Reliable sightings of lions, elephants, buffalo, leopards, and rhinos, especially in Ngorongoro Crater and private reserves.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Primate Encounters:</strong> Only East Africa offers gorilla and chimpanzee trekking in Uganda and Rwanda—a once-in-a-lifetime experience.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Birding Paradise:</strong> Over 1,000 bird species, including flamingos, pelicans, and raptors, especially around Rift Valley lakes.</p>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-muted/10 p-6 rounded-xl border border-muted">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Southern Africa</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Big Five Hotspots:</strong> Kruger, Sabi Sand, Chobe, and Hwange offer some of Africa's most consistent Big Five sightings, often up close and with fewer vehicles around.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Rare Species:</strong> Southern Africa is renowned for wild dog and rhino conservation, and you're more likely to spot these elusive animals here.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Water-Based Safaris:</strong> The Okavango Delta and Chobe River provide unique opportunities for boat and canoe safaris, offering a different perspective on wildlife.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Night Drives & Walking Safaris:</strong> Private reserves allow off-road driving, night safaris, and guided bush walks—activities rarely permitted in East Africa's national parks.</p>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* Safari Activities & Styles Section */}
                <h2 id="activities" className="text-3xl font-bold text-primary mt-16 mb-6">Safari Activities & Styles</h2>
                
                <div className="overflow-hidden bg-muted/30 rounded-xl border border-muted mb-12">
                    <table className="w-full border-collapse min-w-full">
                        <thead>
                            <tr className="bg-primary/10">
                                <th className="text-left p-4 border-b border-muted font-semibold">Activity</th>
                                <th className="text-left p-4 border-b border-muted font-semibold">East Africa</th>
                                <th className="text-left p-4 border-b border-muted font-semibold">Southern Africa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Game Drives</td>
                                <td className="p-4 border-b border-muted">All-day, closed vehicles, pop-up roofs</td>
                                <td className="p-4 border-b border-muted">Morning/afternoon, open vehicles</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Walking Safaris</td>
                                <td className="p-4 border-b border-muted">Limited, mostly in private conservancies</td>
                                <td className="p-4 border-b border-muted">Excellent, especially in Zambia/Zimbabwe</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Water Safaris</td>
                                <td className="p-4 border-b border-muted">Rare (except Lake Victoria)</td>
                                <td className="p-4 border-b border-muted">World-class (Okavango, Chobe)</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Night Drives</td>
                                <td className="p-4 border-b border-muted">Rare (except private areas)</td>
                                <td className="p-4 border-b border-muted">Common in private reserves</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Hot Air Ballooning</td>
                                <td className="p-4 border-b border-muted">Serengeti, Masai Mara</td>
                                <td className="p-4 border-b border-muted">Some Botswana/Zambia parks</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Cultural Visits</td>
                                <td className="p-4 border-b border-muted">Maasai, Samburu, Hadzabe, Batwa</td>
                                <td className="p-4 border-b border-muted">San, Zulu, Tswana, local communities</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 font-medium">Primate Trekking</td>
                                <td className="p-4">Gorillas, chimpanzees (Uganda/Rwanda)</td>
                                <td className="p-4">Not available</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Infrastructure, Accessibility & Accommodation Section */}
                <h2 id="infrastructure" className="text-3xl font-bold text-primary mt-16 mb-6">Infrastructure, Accessibility & Accommodation</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-muted/10 p-6 rounded-xl border border-muted">
                        <h3 className="text-2xl font-semibold text-primary mb-4">East Africa</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Well-developed tourism circuits</strong> in Kenya and Tanzania, with a wide range of lodges and tented camps, from budget to ultra-luxury.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Road and air transfers</strong> are common; road safaris allow multi-park itineraries.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Peak season crowds:</strong> Popular parks can be busy, especially during the migration.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Authentic atmosphere:</strong> Many camps are classic, canvas tented or eco-lodges, often with a traditional safari feel.</p>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-muted/10 p-6 rounded-xl border border-muted">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Southern Africa</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Private reserves</strong> dominate, especially in South Africa and Botswana, offering exclusivity and low visitor density.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Luxury lodges and camps</strong> are the norm, with some of Africa's most stylish and contemporary accommodations.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Excellent infrastructure</strong> in South Africa (good roads, self-drive options), while Botswana and Zambia offer more remote, fly-in experiences.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold text-lg leading-tight mt-1">•</span>
                                <p className="mt-0 mb-0"><strong className="text-primary">Affordability:</strong> South Africa is generally more budget-friendly, while Botswana is exclusive and higher cost.</p>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* Seasonality Section */}
                <h2 id="seasonality" className="text-3xl font-bold text-primary mt-16 mb-6">Seasonality & Best Times to Visit</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                        <h3 className="text-2xl font-semibold text-primary mb-4">East Africa</h3>
                        <p className="mb-3 leading-relaxed">
                            Wildlife viewing is good year-round due to temperate climate and open landscapes. The Great Migration's river crossings peak July–October, and calving season is January–March. Rainy seasons (April–May, November) can affect road conditions and camp availability.
                        </p>
                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-primary mb-2">Peak Season:</h4>
                            <p className="mb-0">July to October (Migration river crossings)</p>
                        </div>
                    </div>
                    
                    <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Southern Africa</h3>
                        <p className="mb-3 leading-relaxed">
                            Peak wildlife viewing is during the dry season (May–October), when animals congregate at water sources and vegetation is sparse. Wet season (November–April) brings lush scenery, birding, and fewer crowds, but wildlife is more dispersed.
                        </p>
                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-primary mb-2">Peak Season:</h4>
                            <p className="mb-0">May to October (Dry season)</p>
                        </div>
                    </div>
                </div>

                {/* Crowds & Exclusivity Section */}
                <h2 id="crowds" className="text-3xl font-bold text-primary mt-16 mb-6">Crowds, Exclusivity & Authenticity</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-muted/10 p-6 rounded-xl border border-muted">
                        <h3 className="text-2xl font-semibold text-primary mb-4">East Africa</h3>
                        <p className="leading-relaxed">
                            Major parks (Serengeti, Masai Mara) can be crowded during peak migration; private conservancies offer more exclusivity but at a premium.
                        </p>
                        <div className="flex items-center gap-3 bg-muted/50 mt-4 p-4 rounded-lg">
                            <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="font-medium">Visit in shoulder seasons for fewer crowds but good wildlife</span>
                        </div>
                    </div>
                    
                    <div className="bg-muted/10 p-6 rounded-xl border border-muted">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Southern Africa</h3>
                        <p className="leading-relaxed">
                            More private reserves mean fewer vehicles at sightings and a more intimate experience. Botswana, Zambia, and Zimbabwe offer remote, uncrowded safaris, though often at higher cost.
                        </p>
                        <div className="flex items-center gap-3 bg-muted/50 mt-4 p-4 rounded-lg">
                            <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="font-medium">Many private reserves limit vehicle numbers at sightings</span>
                        </div>
                    </div>
                </div>

                {/* Cultural & Add-On Experiences Section */}
                <h2 id="cultural" className="text-3xl font-bold text-primary mt-16 mb-6">Cultural & Add-On Experiences</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-muted/10 p-6 rounded-xl border border-muted">
                        <h3 className="text-2xl font-semibold text-primary mb-4">East Africa</h3>
                        <p className="leading-relaxed mb-4">
                            Rich cultural encounters with Maasai, Samburu, and Hadzabe peoples; combine with gorilla trekking in Uganda/Rwanda or beach escapes to Zanzibar.
                        </p>
                        <h4 className="font-semibold text-primary mb-2">Popular Add-Ons:</h4>
                        <ul className="space-y-1 pl-5 list-disc">
                            <li>Zanzibar beaches</li>
                            <li>Gorilla trekking in Uganda/Rwanda</li>
                            <li>Mount Kilimanjaro climb</li>
                            <li>Lamu Island</li>
                        </ul>
                    </div>
                    
                    <div className="bg-muted/10 p-6 rounded-xl border border-muted">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Southern Africa</h3>
                        <p className="leading-relaxed mb-4">
                            Interactions with San (Bushmen), Zulu, and Tswana communities; easy add-ons to Victoria Falls, Cape Town, or the winelands of South Africa.
                        </p>
                        <h4 className="font-semibold text-primary mb-2">Popular Add-Ons:</h4>
                        <ul className="space-y-1 pl-5 list-disc">
                            <li>Cape Town</li>
                            <li>Victoria Falls</li>
                            <li>South African wine regions</li>
                            <li>Namibian deserts</li>
                        </ul>
                    </div>
                </div>

                {/* Pros & Cons Summary Section */}
                <h2 id="pros-cons" className="text-3xl font-bold text-primary mt-16 mb-6">Pros & Cons Summary Table</h2>
                
                <div className="overflow-hidden bg-muted/30 rounded-xl border border-muted mb-12">
                    <table className="w-full border-collapse min-w-full">
                        <thead>
                            <tr className="bg-primary/10">
                                <th className="text-left p-4 border-b border-muted font-semibold">Region</th>
                                <th className="text-left p-4 border-b border-muted font-semibold">Pros</th>
                                <th className="text-left p-4 border-b border-muted font-semibold">Cons</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">East Africa</td>
                                <td className="p-4 border-b border-muted">Great Migration, classic scenery, gorilla trekking, cultural depth</td>
                                <td className="p-4 border-b border-muted">Peak crowds, limited off-road/night drives in parks</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 font-medium">Southern Africa</td>
                                <td className="p-4">Up-close Big Five, rare species, exclusive camps, diverse activities</td>
                                <td className="p-4">Higher cost (Botswana), less primate trekking</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                {/* Which Should You Choose Section */}
                <h2 id="which-to-choose" className="text-3xl font-bold text-primary mt-16 mb-6">Which Should You Choose?</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Choose East Africa if you:</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3">
                                <div className="bg-primary/20 p-1 rounded-full mt-1">
                                    <Scale className="h-4 w-4 text-primary" />
                                </div>
                                <span>Dream of witnessing the Great Migration or want to see vast herds and dramatic predator-prey action.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="bg-primary/20 p-1 rounded-full mt-1">
                                    <Scale className="h-4 w-4 text-primary" />
                                </div>
                                <span>Are interested in gorilla or chimpanzee trekking.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="bg-primary/20 p-1 rounded-full mt-1">
                                    <Scale className="h-4 w-4 text-primary" />
                                </div>
                                <span>Prefer classic tented camps and the "Out of Africa" scenery.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="bg-primary/20 p-1 rounded-full mt-1">
                                    <Scale className="h-4 w-4 text-primary" />
                                </div>
                                <span>Want to combine safari with cultural immersion or a beach holiday in Zanzibar.</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Choose Southern Africa if you:</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3">
                                <div className="bg-primary/20 p-1 rounded-full mt-1">
                                    <Scale className="h-4 w-4 text-primary" />
                                </div>
                                <span>Want up-close Big Five sightings, rare species like wild dogs and rhinos, and fewer crowds.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="bg-primary/20 p-1 rounded-full mt-1">
                                    <Scale className="h-4 w-4 text-primary" />
                                </div>
                                <span>Prefer luxury lodges, private reserves, and a wider variety of activities (night drives, walking, water safaris).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="bg-primary/20 p-1 rounded-full mt-1">
                                    <Scale className="h-4 w-4 text-primary" />
                                </div>
                                <span>Value exclusivity, intimacy, and diverse landscapes.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="bg-primary/20 p-1 rounded-full mt-1">
                                    <Scale className="h-4 w-4 text-primary" />
                                </div>
                                <span>Wish to combine safari with Victoria Falls, Cape Town, or the Okavango Delta.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Conclusion Section */}
                <h2 id="conclusion" className="text-3xl font-bold text-primary mt-16 mb-6">Conclusion</h2>
                
                <div className="bg-muted/10 p-8 rounded-xl border border-muted mb-12">
                    <p className="text-lg leading-relaxed mb-0">
                        Both East and Southern Africa deliver world-class safari adventures, but the character of your experience will differ. East Africa offers epic wildlife spectacles, classic landscapes, and rich cultures, while Southern Africa excels in exclusivity, variety, and up-close encounters. Many seasoned travelers choose to experience both regions—sometimes in a single trip—for the ultimate African safari journey.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-t border-muted">
                    <Link href="/resources/planning-guides" className="flex items-center gap-2 text-primary hover:text-primary/80 bg-primary/5 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="font-medium">Back to Planning Guides</span>
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">Related:</span>
                        <Link href="/resources/planning-guides/choosing-destinations" className="text-primary hover:text-primary/80 bg-primary/5 px-4 py-2 rounded-lg font-medium transition-colors">
                            Choosing Destinations
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EastVsSouthernPage; 