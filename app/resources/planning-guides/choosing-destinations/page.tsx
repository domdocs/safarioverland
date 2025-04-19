import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Map, ArrowLeft, Compass, Calendar, LucideWallet, User, Mountain } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Choosing the Perfect Safari Destination | Safari Overland',
  description: 'A comprehensive guide to selecting the ideal African safari destinations based on your interests and preferences.',
  keywords: 'safari destinations, African safari, best safari locations, Kruger park, Masai Mara, Serengeti, Okavango Delta, gorilla trekking, safari planning, safari comparison',
};

const ChoosingDestinationsPage = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Page Header */}
            <div className="mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3">Choosing the Perfect Safari Destination</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">A comprehensive guide to selecting the ideal African safari destinations based on your interests and preferences.</p>
            </div>

            {/* Hero Section */}
            <div className="grid md:grid-cols-2 gap-10 mb-16">
                <div className="relative h-[400px] sm:h-[450px] rounded-xl overflow-hidden shadow-md">
                    <Image 
                        src="/images/resources/safari-destinations-hero.jpg" 
                        alt="Panoramic view of African safari landscape with giraffes and acacia trees" 
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-5 text-primary">Introduction</h2>
                    <p className="text-lg mb-6 leading-relaxed">
                        Africa is a continent of breathtaking landscapes and unrivaled wildlife diversity. From the sweeping savannahs of East Africa to the lush wetlands of Botswana and the rugged wilds of Southern Africa, there's a safari destination for every traveler. Whether you're a first-timer seeking iconic Big Five sightings, a seasoned adventurer chasing rare wildlife, or a nature lover yearning for unique landscapes, this guide will help you choose the perfect safari destination for your dream African adventure.
                    </p>
                    <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg border border-muted">
                        <Compass className="h-6 w-6 text-primary flex-shrink-0" />
                        <span className="font-medium">The right destination can make all the difference in your safari experience</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
                <h2 id="key-factors" className="text-3xl font-bold text-primary mt-16 mb-6">Key Factors to Consider When Choosing a Safari Destination</h2>
                
                <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-4 bg-muted/20 p-5 rounded-lg border border-muted/50">
                        <Map className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <strong className="text-primary font-medium">Wildlife Interests:</strong>
                            <span className="block mt-1">Are you hoping to witness the Great Migration, see the Big Five, or track rare species like wild dogs or mountain gorillas?</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-4 bg-muted/20 p-5 rounded-lg border border-muted/50">
                        <User className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <strong className="text-primary font-medium">Safari Style:</strong>
                            <span className="block mt-1">Do you prefer classic game drives, walking safaris, canoe excursions, or exclusive private reserves?</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-4 bg-muted/20 p-5 rounded-lg border border-muted/50">
                        <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <strong className="text-primary font-medium">Seasonality:</strong>
                            <span className="block mt-1">Wildlife sightings and experiences can vary greatly depending on the time of year.</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-4 bg-muted/20 p-5 rounded-lg border border-muted/50">
                        <LucideWallet className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <strong className="text-primary font-medium">Budget:</strong>
                            <span className="block mt-1">Destinations range from affordable self-drive parks to ultra-luxury private concessions.</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-4 bg-muted/20 p-5 rounded-lg border border-muted/50">
                        <Compass className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <strong className="text-primary font-medium">Travel Logistics:</strong>
                            <span className="block mt-1">Consider accessibility, visa requirements, and travel distances within each country.</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-4 bg-muted/20 p-5 rounded-lg border border-muted/50">
                        <Mountain className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <strong className="text-primary font-medium">Cultural Experiences:</strong>
                            <span className="block mt-1">Some destinations offer rich cultural interactions alongside wildlife viewing.</span>
                        </div>
                    </li>
                </ul>

                <h2 id="destinations-by-experience" className="text-3xl font-bold text-primary mt-16 mb-6">Top Safari Destinations by Experience</h2>

                <section id="first-timers" className="mb-12 bg-muted/10 p-6 rounded-xl border border-muted">
                    <h3 className="text-2xl font-semibold text-primary mb-6">1. Best for First-Time Safari-Goers</h3>
                    
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h4 className="text-xl font-semibold text-primary mb-3">Kruger National Park, South Africa</h4>
                            <p className="mb-4"><strong className="text-primary">Why Choose Kruger:</strong> Modern infrastructure, easy self-drive options, and a wide range of accommodation from budget to luxury make Kruger ideal for first-timers.</p>
                            <p className="mb-4"><strong className="text-primary">Wildlife:</strong> Big Five, abundant game, and excellent birdlife.</p>
                            <p className="mb-0"><strong className="text-primary">Extras:</strong> Combine with Cape Town or the Garden Route for a diverse trip.</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h4 className="text-xl font-semibold text-primary mb-3">Masai Mara National Reserve, Kenya</h4>
                            <p className="mb-4"><strong className="text-primary">Why Choose Masai Mara:</strong> Home to the Great Migration and high concentrations of predators. Offers classic game drives and cultural visits to Maasai villages.</p>
                            <p className="mb-4"><strong className="text-primary">Wildlife:</strong> Big Five, big cats, and dramatic river crossings.</p>
                            <p className="mb-0"><strong className="text-primary">Extras:</strong> Hot air balloon safaris and rich Maasai culture.</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h4 className="text-xl font-semibold text-primary mb-3">Serengeti National Park & Ngorongoro Crater, Tanzania</h4>
                            <p className="mb-4"><strong className="text-primary">Why Choose Serengeti & Ngorongoro:</strong> Endless plains, year-round game viewing, and the spectacle of the Great Migration. Ngorongoro is a UNESCO World Heritage Site with dense wildlife.</p>
                            <p className="mb-4"><strong className="text-primary">Wildlife:</strong> Big Five, wildebeest migration, rare black rhinos.</p>
                            <p className="mb-0"><strong className="text-primary">Extras:</strong> Combine with Zanzibar for a safari-and-beach holiday.</p>
                        </div>
                    </div>
                </section>

                <section id="exclusive-water" className="mb-12 bg-muted/10 p-6 rounded-xl border border-muted">
                    <h3 className="text-2xl font-semibold text-primary mb-6">2. Best for Exclusive and Water-Based Safaris</h3>
                    
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h4 className="text-xl font-semibold text-primary mb-3">Okavango Delta, Botswana</h4>
                            <p className="mb-4"><strong className="text-primary">Why Choose Okavango:</strong> Unique water-based safaris (canoe, boat) through pristine wetlands. Exclusive, low-impact tourism with outstanding wildlife.</p>
                            <p className="mb-4"><strong className="text-primary">Wildlife:</strong> Big Five (rhino sightings in Moremi), elephants, hippos, and rare antelope.</p>
                            <p className="mb-0"><strong className="text-primary">Extras:</strong> Private concessions for an intimate experience.</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h4 className="text-xl font-semibold text-primary mb-3">Chobe National Park, Botswana</h4>
                            <p className="mb-4"><strong className="text-primary">Why Choose Chobe:</strong> Known for massive elephant herds and river safaris. Excellent for photographers and those seeking abundant wildlife.</p>
                            <p className="mb-0"><strong className="text-primary">Wildlife:</strong> Four of the Big Five (no rhino), prolific birdlife, predators.</p>
                        </div>
                    </div>
                </section>

                <section id="walking-adventure" className="mb-12 bg-muted/10 p-6 rounded-xl border border-muted">
                    <h3 className="text-2xl font-semibold text-primary mb-6">3. Best for Walking and Adventure Safaris</h3>
                    
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h4 className="text-xl font-semibold text-primary mb-3">South Luangwa National Park, Zambia</h4>
                            <p className="mb-4"><strong className="text-primary">Why Choose South Luangwa:</strong> Pioneer of walking safaris. Exceptional wildlife, fewer crowds, and stunning landscapes.</p>
                            <p className="mb-4"><strong className="text-primary">Wildlife:</strong> Four of the Big Five (no rhino), giraffe, wild dogs.</p>
                            <p className="mb-0"><strong className="text-primary">Extras:</strong> Night drives and authentic bush camps.</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h4 className="text-xl font-semibold text-primary mb-3">Mana Pools National Park, Zimbabwe</h4>
                            <p className="mb-4"><strong className="text-primary">Why Choose Mana Pools:</strong> Renowned for canoe and walking safaris, remote wilderness, and close wildlife encounters.</p>
                            <p className="mb-0"><strong className="text-primary">Wildlife:</strong> Four of the Big Five (no rhino), wild dogs, elephants.</p>
                        </div>
                    </div>
                </section>

                <section id="gorilla-primate" className="mb-12 bg-muted/10 p-6 rounded-xl border border-muted">
                    <h3 className="text-2xl font-semibold text-primary mb-6">4. Best for Gorilla and Primate Tracking</h3>
                    
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h4 className="text-xl font-semibold text-primary mb-3">Bwindi Impenetrable Forest, Uganda & Volcanoes National Park, Rwanda</h4>
                            <p className="mb-4"><strong className="text-primary">Why Choose Bwindi & Volcanoes:</strong> The premier destinations for trekking to see endangered mountain gorillas in their natural habitat.</p>
                            <p className="mb-4"><strong className="text-primary">Wildlife:</strong> Mountain gorillas, chimpanzees, golden monkeys, forest elephants.</p>
                            <p className="mb-0"><strong className="text-primary">Extras:</strong> Birding and cultural experiences.</p>
                        </div>
                    </div>
                </section>

                <section id="unique-landscapes" className="mb-12 bg-muted/10 p-6 rounded-xl border border-muted">
                    <h3 className="text-2xl font-semibold text-primary mb-6">5. Best for Off-the-Beaten-Path and Unique Landscapes</h3>
                    
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h4 className="text-xl font-semibold text-primary mb-3">Etosha National Park, Namibia</h4>
                            <p className="mb-4"><strong className="text-primary">Why Choose Etosha:</strong> Dramatic salt pans, unique desert-adapted wildlife, and excellent self-drive options.</p>
                            <p className="mb-4"><strong className="text-primary">Wildlife:</strong> Elephants, lions, rhinos, and abundant plains game.</p>
                            <p className="mb-0"><strong className="text-primary">Extras:</strong> Combine with Namibia's dunes and Skeleton Coast.</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h4 className="text-xl font-semibold text-primary mb-3">Hwange National Park, Zimbabwe</h4>
                            <p className="mb-4"><strong className="text-primary">Why Choose Hwange:</strong> Vast, uncrowded wilderness, renowned guides, and diverse wildlife.</p>
                            <p className="mb-4"><strong className="text-primary">Wildlife:</strong> Big Five, large elephant herds, wild dogs.</p>
                            <p className="mb-0"><strong className="text-primary">Extras:</strong> Combine with Victoria Falls for a complete adventure.</p>
                        </div>
                    </div>
                </section>

                <h2 id="comparison-table" className="text-3xl font-bold text-primary mt-16 mb-6">Safari Destination Comparison Table</h2>

                <div className="overflow-hidden bg-muted/30 rounded-xl border border-muted mb-12">
                    <table className="w-full border-collapse min-w-full">
                        <thead>
                            <tr className="bg-primary/10">
                                <th className="text-left p-4 border-b border-muted font-semibold">Destination</th>
                                <th className="text-left p-4 border-b border-muted font-semibold">Best For</th>
                                <th className="text-left p-4 border-b border-muted font-semibold">Wildlife Highlights</th>
                                <th className="text-left p-4 border-b border-muted font-semibold">Unique Features</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Kruger (South Africa)</td>
                                <td className="p-4 border-b border-muted">First-timers, families</td>
                                <td className="p-4 border-b border-muted">Big Five, abundant game</td>
                                <td className="p-4 border-b border-muted">Self-drive, luxury lodges</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Masai Mara (Kenya)</td>
                                <td className="p-4 border-b border-muted">Migration, big cats</td>
                                <td className="p-4 border-b border-muted">Big Five, migration, predators</td>
                                <td className="p-4 border-b border-muted">Maasai culture, balloon safaris</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Serengeti (Tanzania)</td>
                                <td className="p-4 border-b border-muted">Migration, year-round</td>
                                <td className="p-4 border-b border-muted">Big Five, migration, cheetahs</td>
                                <td className="p-4 border-b border-muted">Endless plains, combine with Zanzibar</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Okavango Delta (Botswana)</td>
                                <td className="p-4 border-b border-muted">Water safaris, exclusivity</td>
                                <td className="p-4 border-b border-muted">Big Five, elephants, hippos</td>
                                <td className="p-4 border-b border-muted">Canoe/boat safaris, private camps</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">South Luangwa (Zambia)</td>
                                <td className="p-4 border-b border-muted">Walking safaris, adventure</td>
                                <td className="p-4 border-b border-muted">Four of Big Five, wild dogs</td>
                                <td className="p-4 border-b border-muted">Night drives, bush camps</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Bwindi/Volcanoes (Uganda/Rwanda)</td>
                                <td className="p-4 border-b border-muted">Gorilla trekking</td>
                                <td className="p-4 border-b border-muted">Mountain gorillas, primates</td>
                                <td className="p-4 border-b border-muted">Rainforest hikes, birding</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Etosha (Namibia)</td>
                                <td className="p-4 border-b border-muted">Self-drive, landscapes</td>
                                <td className="p-4 border-b border-muted">Elephants, rhinos, lions</td>
                                <td className="p-4 border-b border-muted">Salt pans, desert wildlife</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 font-medium">Hwange (Zimbabwe)</td>
                                <td className="p-4">Off-the-beaten-path</td>
                                <td className="p-4">Big Five, wild dogs, elephants</td>
                                <td className="p-4">Expert guides, combine with Vic Falls</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="tips" className="text-3xl font-bold text-primary mt-16 mb-6">Tips for Choosing Your Safari Destination</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                        <h3 className="text-xl font-semibold text-primary mb-3">Define Your Priorities</h3>
                        <p className="mb-0 leading-relaxed">
                            Decide if you want to focus on specific animals, unique landscapes, or cultural experiences.
                        </p>
                    </div>
                    
                    <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                        <h3 className="text-xl font-semibold text-primary mb-3">Consider the Season</h3>
                        <p className="mb-0 leading-relaxed">
                            Research the best times for wildlife viewing and weather in each region.
                        </p>
                    </div>
                    
                    <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                        <h3 className="text-xl font-semibold text-primary mb-3">Set Your Budget</h3>
                        <p className="mb-0 leading-relaxed">
                            Some destinations (like Botswana and Rwanda) are more exclusive and expensive, while others (like Kruger or Etosha) offer more affordable options.
                        </p>
                    </div>
                    
                    <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                        <h3 className="text-xl font-semibold text-primary mb-3">Think About Travel Logistics</h3>
                        <p className="mb-0 leading-relaxed">
                            Factor in flight connections, road transfers, and any visa requirements.
                        </p>
                    </div>
                    
                    <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 md:col-span-2">
                        <h3 className="text-xl font-semibold text-primary mb-3">Combine Destinations</h3>
                        <p className="mb-0 leading-relaxed">
                            Many travelers combine two or more regions for a richer, more varied safari.
                        </p>
                    </div>
                </div>

                <h2 id="conclusion" className="text-3xl font-bold text-primary mt-16 mb-6">Conclusion</h2>
                <p className="mb-8 leading-relaxed text-lg">
                    Africa's safari destinations are as diverse as the continent itself. Whether you dream of witnessing the thunder of migrating herds, tracking gorillas through misty forests, or gliding silently through the Okavango's waterways, there's a perfect safari waiting for you. Identify your top priorities, match them to the right destination, and let Africa's wild heart create memories that last a lifetime.
                </p>

                <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-t border-muted">
                    <Link href="/resources/planning-guides" className="flex items-center gap-2 text-primary hover:text-primary/80 bg-primary/5 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="font-medium">Back to Planning Guides</span>
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">Related:</span>
                        <Link href="/resources/planning-guides/wildlife-events" className="text-primary hover:text-primary/80 bg-primary/5 px-4 py-2 rounded-lg font-medium transition-colors">
                            Wildlife Events
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoosingDestinationsPage; 