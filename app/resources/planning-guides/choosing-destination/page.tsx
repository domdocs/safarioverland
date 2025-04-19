import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const ChoosingDestination = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Page Header */}
            <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">How to Choose the Perfect Safari Destination</h1>
                <p className="text-xl text-muted-foreground">
                    A comprehensive guide to selecting the ideal African safari destination based on your preferences, budget, and travel style
                </p>
            </div>

            {/* Hero Section */}
            <div className="bg-muted rounded-lg overflow-hidden mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                        <Image 
                            src="/placeholder.svg?height=600&width=800" 
                            alt="African safari landscape with elephants and acacia trees" 
                            fill 
                            className="object-cover" 
                        />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Finding Your Perfect Safari Match</h2>
                        <p className="text-muted-foreground mb-4">
                            Africa offers an incredible diversity of safari experiences across more than 20 countries. From the vast plains of the Serengeti to the lush Okavango Delta and the dramatic landscapes of Namibia, your options are nearly limitless.
                        </p>
                        <p className="text-muted-foreground">
                            This guide will help you navigate the key factors to consider when choosing your ideal safari destination, ensuring your adventure aligns perfectly with your expectations, interests, and budget.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6">Key Factors to Consider When Choosing a Safari Destination</h2>
                
                <p>
                    Selecting the right safari destination is perhaps the most important decision you'll make when planning your African adventure. Every country offers a unique experience, and understanding your priorities will help you make the perfect choice.
                </p>

                <h3 className="text-2xl font-bold mb-4 mt-8">1. Wildlife Viewing Priorities</h3>
                
                <p>
                    The wildlife you hope to see should be a primary consideration when selecting your destination:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>The Big Five (lion, leopard, elephant, rhino, buffalo):</strong> Kenya, Tanzania, South Africa, and Botswana offer excellent opportunities to see all five.</li>
                    <li><strong>Great Migration:</strong> If witnessing millions of wildebeest and zebra migrating is your dream, focus on Kenya's Masai Mara (July-October) or Tanzania's Serengeti (December-July).</li>
                    <li><strong>Mountain Gorillas:</strong> Only found in Rwanda, Uganda, and the Democratic Republic of Congo.</li>
                    <li><strong>Chimpanzees:</strong> Best observed in Tanzania (Gombe, Mahale), Uganda, and Rwanda.</li>
                    <li><strong>Desert-adapted wildlife:</strong> Namibia is unmatched for seeing wildlife that has adapted to arid conditions.</li>
                    <li><strong>Unique species:</strong> For endemic species, consider Madagascar's lemurs or Ethiopia's Gelada baboons and Ethiopian wolves.</li>
                </ul>

                <div className="my-8 bg-muted p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-2">Pro Tip: Wildlife Calendar</h4>
                    <p>
                        Research which specific species or behaviors you're most interested in seeing, then plan your trip during the optimal time of year. For example, many animals have specific birthing seasons, while predator activity may increase during the dry season when prey is concentrated around water sources.
                    </p>
                </div>

                <h3 className="text-2xl font-bold mb-4">2. Landscape and Scenery Preferences</h3>
                
                <p>
                    Africa's diverse landscapes offer dramatically different backdrops for your safari experience:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Open savannah plains:</strong> Kenya and Tanzania are iconic for their vast grasslands dotted with acacia trees.</li>
                    <li><strong>Desert landscapes:</strong> Namibia features spectacular sand dunes, dramatic canyons, and otherworldly scenery.</li>
                    <li><strong>Waterways and deltas:</strong> Botswana's Okavango Delta offers water-based safaris through a unique inland delta system.</li>
                    <li><strong>Rainforest and mountains:</strong> Rwanda, Uganda, and parts of Tanzania feature lush, mountainous terrain.</li>
                    <li><strong>Diverse ecosystems in one country:</strong> South Africa offers everything from bushveld to beaches, mountains to semi-desert.</li>
                    <li><strong>Dramatic geographic features:</strong> Consider Tanzania for Ngorongoro Crater and Kilimanjaro or Zambia/Zimbabwe for Victoria Falls.</li>
                </ul>

                <blockquote className="bg-muted p-6 rounded-lg my-8 border-l-4 border-primary">
                    <p className="italic">
                        "The landscape you choose becomes the canvas for your safari memories. Each ecosystem not only determines which animals you'll encounter but creates a distinctive atmosphere that shapes your entire experience."
                    </p>
                    <cite>— Jane Goodall, Primatologist and Conservationist</cite>
                </blockquote>

                <h3 className="text-2xl font-bold mb-4">3. Budget Considerations</h3>
                
                <p>
                    Safari costs vary significantly between destinations:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Premium destinations:</strong> Botswana, Zambia, Zimbabwe, and Rwanda tend to be the most expensive, with many luxury-only options.</li>
                    <li><strong>Mid-range destinations:</strong> Kenya, Tanzania, and South Africa offer a wide range of options from budget to luxury.</li>
                    <li><strong>More affordable options:</strong> Uganda and Namibia can provide excellent wildlife viewing at more moderate prices.</li>
                </ul>
                
                <p>
                    Your budget will also be affected by:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Park fees:</strong> These vary dramatically (Rwanda's gorilla permits exceed $1,500 per person for one hour, while many parks in South Africa charge under $25 daily).</li>
                    <li><strong>Accessibility:</strong> Remote destinations require charter flights, adding significant costs.</li>
                    <li><strong>Season:</strong> Low season rates can be 30-50% less than peak season.</li>
                    <li><strong>Accommodation style:</strong> From camping to ultra-luxury lodges.</li>
                </ul>

                <h3 className="text-2xl font-bold mb-4">4. Travel Style and Preferences</h3>
                
                <p>
                    Consider how you prefer to experience your safari:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className="bg-muted p-6 rounded-lg">
                        <h4 className="text-lg font-bold mb-2">Self-Drive Safari</h4>
                        <p className="mb-4">Perfect for independent travelers who want flexibility and cost savings.</p>
                        <p className="font-medium">Best in: South Africa, Namibia, parts of Botswana</p>
                        <div className="flex items-center mt-4 text-green-600">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            <span>Most affordable option</span>
                        </div>
                        <div className="flex items-center mt-2 text-green-600">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            <span>Complete flexibility</span>
                        </div>
                        <div className="flex items-center mt-2 text-amber-600">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <span>Requires navigation skills</span>
                        </div>
                        <div className="flex items-center mt-2 text-amber-600">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <span>Limited wildlife expertise</span>
                        </div>
                    </div>
                    
                    <div className="bg-muted p-6 rounded-lg">
                        <h4 className="text-lg font-bold mb-2">Guided Safari Tours</h4>
                        <p className="mb-4">Organized experiences with expert guides and logistics handled for you.</p>
                        <p className="font-medium">Best in: Any safari destination</p>
                        <div className="flex items-center mt-4 text-green-600">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            <span>Expert wildlife knowledge</span>
                        </div>
                        <div className="flex items-center mt-2 text-green-600">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            <span>No planning stress</span>
                        </div>
                        <div className="flex items-center mt-2 text-amber-600">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <span>Higher cost</span>
                        </div>
                        <div className="flex items-center mt-2 text-amber-600">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <span>Fixed schedules</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className="bg-muted p-6 rounded-lg">
                        <h4 className="text-lg font-bold mb-2">Luxury Lodge Experience</h4>
                        <p className="mb-4">Premium accommodations with exceptional service and amenities.</p>
                        <p className="font-medium">Best in: Botswana, Tanzania, Kenya, South Africa</p>
                        <div className="flex items-center mt-4 text-green-600">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            <span>Maximum comfort</span>
                        </div>
                        <div className="flex items-center mt-2 text-green-600">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            <span>Excellent guiding</span>
                        </div>
                        <div className="flex items-center mt-2 text-amber-600">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <span>Very expensive</span>
                        </div>
                    </div>
                    
                    <div className="bg-muted p-6 rounded-lg">
                        <h4 className="text-lg font-bold mb-2">Mobile Camping Safari</h4>
                        <p className="mb-4">Authentic wilderness experience with more basic accommodations.</p>
                        <p className="font-medium">Best in: Tanzania, Botswana, Kenya</p>
                        <div className="flex items-center mt-4 text-green-600">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            <span>Immersive experience</span>
                        </div>
                        <div className="flex items-center mt-2 text-green-600">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            <span>More affordable</span>
                        </div>
                        <div className="flex items-center mt-2 text-amber-600">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <span>Basic facilities</span>
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-bold mb-4">5. Accessibility and Travel Time</h3>
                
                <p>
                    Some safari destinations are significantly easier to reach than others:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Easy access:</strong> South Africa has excellent infrastructure and direct international flights to Johannesburg, with quick connections to Kruger and other parks.</li>
                    <li><strong>Moderate access:</strong> Kenya and Tanzania have good international connections but may require additional domestic flights to reach safari areas.</li>
                    <li><strong>More remote:</strong> Botswana, Zambia, Zimbabwe, and Uganda typically require more travel connections and possibly charter flights.</li>
                    <li><strong>Very remote:</strong> Congo, parts of Namibia, and northern Kenya often require multiple flight connections and longer travel times.</li>
                </ul>
                
                <div className="my-8 bg-muted p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-2">Time Consideration</h4>
                    <p>
                        If you have limited vacation time, prioritize destinations with easier accessibility. South Africa offers excellent wildlife viewing with minimal travel time, while more remote destinations like Botswana's Okavango Delta require additional days just for transit.
                    </p>
                </div>

                <h3 className="text-2xl font-bold mb-4">6. Combining with Other Experiences</h3>
                
                <p>
                    Many travelers want to combine safari with other African experiences:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Beach extension:</strong> Kenya, Tanzania, and South Africa all offer excellent beach options (Zanzibar, Kenyan coast, Cape Town).</li>
                    <li><strong>Cultural experiences:</strong> Ethiopia's historical sites, Morocco's medinas, or South Africa's wine country.</li>
                    <li><strong>Adventure activities:</strong> Victoria Falls (Zimbabwe/Zambia) for rafting and bungee jumping or Cape Town for hiking and shark cage diving.</li>
                    <li><strong>Gorilla trekking:</strong> Rwanda or Uganda can be combined with traditional safari in Kenya or Tanzania.</li>
                </ul>

                <h2 className="text-3xl font-bold mb-6 mt-10">Top Safari Destinations at a Glance</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse my-8">
                        <thead>
                            <tr className="bg-muted">
                                <th className="border p-3 text-left">Country</th>
                                <th className="border p-3 text-left">Key Strengths</th>
                                <th className="border p-3 text-left">Best For</th>
                                <th className="border p-3 text-left">Budget Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-3 font-medium">Kenya</td>
                                <td className="border p-3">Great Migration (Jul-Oct), diverse landscapes, established infrastructure</td>
                                <td className="border p-3">First-time safari-goers, migration, big cats</td>
                                <td className="border p-3">$$ - $$$</td>
                            </tr>
                            <tr className="bg-muted/30">
                                <td className="border p-3 font-medium">Tanzania</td>
                                <td className="border p-3">Serengeti, Ngorongoro Crater, Migration (Dec-Jul), Kilimanjaro, chimp trekking</td>
                                <td className="border p-3">Epic landscapes, migration, diversity of experiences</td>
                                <td className="border p-3">$$ - $$$</td>
                            </tr>
                            <tr>
                                <td className="border p-3 font-medium">South Africa</td>
                                <td className="border p-3">Excellent infrastructure, malaria-free options, self-drive potential, combined with Cape Town</td>
                                <td className="border p-3">Families, first-timers, self-drivers, luxury seekers</td>
                                <td className="border p-3">$ - $$$</td>
                            </tr>
                            <tr className="bg-muted/30">
                                <td className="border p-3 font-medium">Botswana</td>
                                <td className="border p-3">Okavango Delta, exclusivity, water-based safaris, exceptional wildlife</td>
                                <td className="border p-3">Luxury travelers, photography, water experiences</td>
                                <td className="border p-3">$$$ - $$$$</td>
                            </tr>
                            <tr>
                                <td className="border p-3 font-medium">Namibia</td>
                                <td className="border p-3">Dramatic landscapes, desert-adapted wildlife, self-drive friendly</td>
                                <td className="border p-3">Photographers, self-drivers, unique landscapes</td>
                                <td className="border p-3">$$ - $$$</td>
                            </tr>
                            <tr className="bg-muted/30">
                                <td className="border p-3 font-medium">Uganda</td>
                                <td className="border p-3">Gorilla trekking, chimpanzees, affordability</td>
                                <td className="border p-3">Primate enthusiasts on a budget</td>
                                <td className="border p-3">$ - $$</td>
                            </tr>
                            <tr>
                                <td className="border p-3 font-medium">Rwanda</td>
                                <td className="border p-3">Premier gorilla trekking, beautiful scenery, excellent infrastructure</td>
                                <td className="border p-3">Luxury primate experiences</td>
                                <td className="border p-3">$$$ - $$$$</td>
                            </tr>
                            <tr className="bg-muted/30">
                                <td className="border p-3 font-medium">Zambia</td>
                                <td className="border p-3">Walking safaris, authentic bush experience, Victoria Falls</td>
                                <td className="border p-3">Safari enthusiasts, adventure seekers</td>
                                <td className="border p-3">$$$ - $$$$</td>
                            </tr>
                            <tr>
                                <td className="border p-3 font-medium">Zimbabwe</td>
                                <td className="border p-3">Excellent guiding, Mana Pools canoe safaris, Victoria Falls</td>
                                <td className="border p-3">Wildlife enthusiasts, adventure activities</td>
                                <td className="border p-3">$$ - $$$</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-3xl font-bold mb-6">Making Your Final Decision</h2>
                
                <p>
                    After considering all these factors, you'll likely have narrowed your options to two or three destinations. Here are some final tips to help you make your decision:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Speak with safari specialists</strong> who have first-hand experience with your shortlisted destinations.</li>
                    <li><strong>Read traveler reviews</strong> for the specific areas you're considering, not just the country in general.</li>
                    <li><strong>Consider your travel dates</strong> and match them to the optimal season for your preferred destinations.</li>
                    <li><strong>Assess total travel time</strong> including international flights, connections, and internal transfers.</li>
                    <li><strong>Check visa requirements</strong> as they vary by country and can affect your decision.</li>
                </ul>
                
                <blockquote className="bg-muted p-6 rounded-lg my-8 border-l-4 border-primary">
                    <p className="italic">
                        "The perfect safari destination isn't necessarily the most famous or expensive, but the one that aligns with your personal interests, travel style, and budget. Trust your instincts after doing thorough research."
                    </p>
                    <cite>— Craig Sholley, African Wildlife Foundation</cite>
                </blockquote>

                <h2 className="text-3xl font-bold mb-6">Final Thoughts</h2>
                
                <p>
                    Choosing the right safari destination is the crucial first step in planning an unforgettable African adventure. By carefully considering your wildlife priorities, landscape preferences, budget, travel style, and accessibility needs, you'll find the perfect match for your dream safari.
                </p>
                
                <p>
                    Remember that while this guide offers comprehensive information, nothing beats personalized advice from experts who understand your specific interests and needs. Our team at Safari Overland is always available to help you navigate these choices and craft the perfect safari itinerary.
                </p>

                <div className="bg-primary text-white p-8 rounded-lg my-10">
                    <h3 className="text-2xl font-bold mb-4">Ready to Plan Your Safari?</h3>
                    <p className="mb-4">
                        Whether you've decided on your perfect destination or still need guidance, our safari experts are ready to help turn your African dream into reality.
                    </p>
                    <Link href="/contact" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary bg-white hover:bg-gray-100">
                        Contact Our Safari Specialists
                    </Link>
                </div>
            </div>

            {/* Back Button */}
            <div className="mt-12">
                <Link href="/resources/planning-guides" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark">
                    ← Back to Planning Guides
                </Link>
            </div>
        </div>
    );
};

export default ChoosingDestination; 