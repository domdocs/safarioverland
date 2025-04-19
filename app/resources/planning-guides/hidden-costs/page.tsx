import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, DollarSign, Info, Check, CreditCard, Coffee, Camera, MapPin, Wifi, Shield, Cloud, Zap, ShoppingBag, Package } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hidden Costs of Safari Travel | Safari Overland',
  description: 'Be prepared for all expenses with our comprehensive guide to the often overlooked costs associated with safari travel in Africa.',
  keywords: 'safari hidden costs, unexpected safari expenses, safari tipping, safari travel insurance, safari budgeting, safari visa fees, safari gear costs',
};

const HiddenCostsPage = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Page Header */}
            <div className="mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3">Hidden Costs of Safari Travel</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">Be prepared for all expenses with our guide to the often overlooked costs associated with safari travel</p>
            </div>

            {/* Hero Section */}
            <div className="grid md:grid-cols-2 gap-10 mb-16">
                <div className="relative h-[400px] sm:h-[450px] rounded-xl overflow-hidden shadow-md">
                    <Image 
                        src="/images/resources/hidden-costs-hero.jpg" 
                        alt="Traveler reviewing safari expenses and planning budget" 
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-5 text-primary">Beyond the Package Price</h2>
                    <p className="text-lg mb-6 leading-relaxed">
                        While safari brochures advertise enticing package rates, the true cost of an African safari often includes numerous expenses that travelers don't anticipate. Understanding these hidden costs is essential for accurate budgeting and avoiding financial surprises during your adventure.
                    </p>
                    <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg border border-muted">
                        <AlertCircle className="h-6 w-6 text-primary flex-shrink-0" />
                        <span className="font-medium">Most travelers report spending 20-30% above their initial safari budget due to hidden costs</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
                <h2 id="introduction" className="text-3xl font-bold text-primary mt-16 mb-6">Introduction: The True Cost of Safari Travel</h2>
                <p className="mb-4 leading-relaxed">
                    Planning a safari adventure in Africa is a dream for many travelers, but sticker shock can quickly dampen the excitement when unexpected costs arise. Even the most carefully planned safari budget can spiral out of control when hidden expenses emerge. According to recent surveys of safari travelers, nearly 60% reported spending between 15-30% more than their initial budget due to unanticipated costs.
                </p>
                <p className="mb-4 leading-relaxed">
                    While tour operators provide package prices that cover the essentials—accommodation, some meals, and game drives—numerous additional expenses often remain unmentioned in the glossy brochures. This comprehensive guide identifies and quantifies these hidden costs to help you develop a more accurate budget for your African safari adventure.
                </p>
                <p className="mb-8 leading-relaxed">
                    Whether you're planning a luxury lodge experience in the Serengeti or a self-drive adventure through Kruger National Park, understanding the full financial picture will prevent unwelcome surprises and allow you to fully immerse yourself in the safari experience without constant money worries. From pre-departure preparations to on-the-ground expenses and post-safari considerations, we'll cover the complete spectrum of potential hidden costs.
                </p>

                <div className="bg-muted p-8 rounded-xl my-10 shadow-sm border border-muted">
                    <h3 className="mt-0 flex items-center gap-3 text-primary text-2xl font-semibold mb-5">
                        <DollarSign className="h-7 w-7 text-primary" />
                        Quick Summary: Top Hidden Safari Costs
                    </h3>
                    <ul className="mt-4 grid gap-3 mb-0">
                        <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div><strong>Visa and passport fees:</strong> $50-200 per person</div>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div><strong>Vaccinations and medications:</strong> $200-500 per person</div>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div><strong>Comprehensive travel insurance:</strong> $150-500 per trip</div>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div><strong>Specialized safari clothing and gear:</strong> $300-800</div>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div><strong>Guide and staff tipping:</strong> $15-50 per person per day</div>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div><strong>Optional activities not included in packages:</strong> $50-300 per activity</div>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div><strong>Currency exchange fees and international transaction charges:</strong> 2-5% of total spending</div>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div><strong>Connectivity solutions:</strong> $10-15 per day for internet access</div>
                        </li>
                    </ul>
                </div>

                <h2 id="pre-departure" className="text-3xl font-bold text-primary mt-16 mb-6">Pre-Departure Hidden Costs</h2>
                <p className="mb-6 leading-relaxed">
                    Long before you set foot on African soil, your safari budget will already face demands from various pre-departure expenses. Many travelers focus exclusively on the quoted safari package price, overlooking significant costs required to prepare for the journey.
                </p>

                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">Visa and Entry Requirements</h3>
                <p className="mb-4 leading-relaxed">
                    Most African safari destinations require visas for international visitors, with fees ranging from $50 to $200 per person, depending on the country and visa type. Some countries, like Kenya and Rwanda, offer e-visas that simplify the process but still represent an additional expense. Others, such as Tanzania, may require multiple entry visas if your itinerary includes border crossings to neighboring countries.
                </p>
                <p className="mb-8 leading-relaxed">
                    Additionally, passport renewal or expedited processing fees can add $130-$200 if your passport expiration date is less than six months beyond your return date—a common requirement for international travel. Some countries also charge departure taxes (usually $20-50) that aren't included in airfare, though these are becoming less common.
                </p>

                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">Health Preparations</h3>
                <p className="mb-4 leading-relaxed">
                    Safari destinations often require specific vaccinations and preventative medications that can significantly impact your budget:
                </p>
                <ul className="mb-6 space-y-3">
                    <li className="flex items-start gap-2">
                        <div className="bg-primary/10 p-1 rounded-full mt-1">
                            <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div><strong className="text-primary">Yellow Fever vaccination:</strong> $80-$250, required for entry to many East and Central African countries</div>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="bg-primary/10 p-1 rounded-full mt-1">
                            <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div><strong className="text-primary">Malaria prophylaxis:</strong> $50-$250 depending on medication type and trip duration</div>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="bg-primary/10 p-1 rounded-full mt-1">
                            <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div><strong className="text-primary">Other recommended vaccinations:</strong> $35-$150 each for Typhoid, Hepatitis A/B, etc.</div>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="bg-primary/10 p-1 rounded-full mt-1">
                            <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div><strong className="text-primary">Travel medicine consultation:</strong> $50-$200, often not covered by insurance</div>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="bg-primary/10 p-1 rounded-full mt-1">
                            <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div><strong className="text-primary">Travel-specific first aid kit:</strong> $30-$100 for safari-appropriate supplies</div>
                    </li>
                </ul>
                <p className="mb-8 leading-relaxed">
                    It's worth noting that some insurance policies don't cover travel vaccinations, making this a significant out-of-pocket expense. Planning these medical preparations well in advance can sometimes reduce costs through public health clinics rather than private travel medicine specialists.
                </p>

                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">Safari-Specific Clothing and Gear</h3>
                <p className="mb-4 leading-relaxed">
                    The specialized clothing and equipment needed for a comfortable safari experience represent another substantial pre-departure investment. While budget-conscious travelers can minimize these expenses through strategic purchases and rentals, certain items are considered essential:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                            <div className="bg-primary/10 p-1 rounded-full mt-1">
                                <Check className="h-4 w-4 text-primary" />
                            </div>
                            <div><strong className="text-primary">Neutral-colored clothing:</strong> $150-$300 for appropriate shirts, pants, and layers</div>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="bg-primary/10 p-1 rounded-full mt-1">
                                <Check className="h-4 w-4 text-primary" />
                            </div>
                            <div><strong className="text-primary">Safari hat with sun protection:</strong> $25-$60</div>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="bg-primary/10 p-1 rounded-full mt-1">
                                <Check className="h-4 w-4 text-primary" />
                            </div>
                            <div><strong className="text-primary">Appropriate footwear:</strong> $80-$150 for comfortable walking shoes or hiking boots</div>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="bg-primary/10 p-1 rounded-full mt-1">
                                <Check className="h-4 w-4 text-primary" />
                            </div>
                            <div><strong className="text-primary">High-quality binoculars:</strong> $100-$300 (a safari essential often overlooked)</div>
                        </li>
                    </ul>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                            <div className="bg-primary/10 p-1 rounded-full mt-1">
                                <Check className="h-4 w-4 text-primary" />
                            </div>
                            <div><strong className="text-primary">Camera equipment:</strong> Variable, but potentially $200-$2,000+ for adequate wildlife photography gear</div>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="bg-primary/10 p-1 rounded-full mt-1">
                                <Check className="h-4 w-4 text-primary" />
                            </div>
                            <div><strong className="text-primary">Durable luggage:</strong> $100-$300 for soft-sided duffel bags suited to safari vehicles</div>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="bg-primary/10 p-1 rounded-full mt-1">
                                <Check className="h-4 w-4 text-primary" />
                            </div>
                            <div><strong className="text-primary">Insect repellent and sun protection:</strong> $30-$60 for high-quality, long-lasting products</div>
                        </li>
                    </ul>
                </div>
                <p className="mb-8 leading-relaxed">
                    While these expenses can be significant, many items represent one-time investments that can be used for future travel adventures. Quality gear often enhances the safari experience substantially, particularly good binoculars and appropriate clothing for variable weather conditions.
                </p>

                <h2 id="on-the-ground" className="text-3xl font-bold text-primary mt-16 mb-6">On-the-Ground Safari Extras</h2>
                <p className="mb-6 leading-relaxed">
                    Once your safari begins, several categories of expenses frequently surprise travelers, even those on seemingly "all-inclusive" packages. Understanding these potential costs in advance allows for more informed decisions about where to allocate your budget.
                </p>

                <div className="relative my-10 p-8 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="absolute -top-5 left-8 bg-primary text-white px-4 py-2 rounded-lg text-lg font-medium">
                        Pro Tip
                    </div>
                    <p className="mb-0 italic">
                        When booking your safari, request a detailed breakdown of exactly what is and isn't included in your package. Ask specifically about drinks, activities, park fees, and conservation levies to avoid surprises once you're in the African bush.
                    </p>
                </div>

                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">Activity Surcharges and Optional Experiences</h3>
                <p className="mb-4 leading-relaxed">
                    Safari packages typically include standard game drives, but many extraordinary experiences come with additional price tags. These optional activities can transform your safari, but costs quickly accumulate:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-muted/30 p-5 rounded-lg border border-muted">
                        <h4 className="font-semibold text-lg mb-3 text-primary">Air-Based Activities</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <div className="mt-1 text-primary">•</div>
                                <div><strong>Hot air balloon safaris:</strong> $400-$600 per person</div>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1 text-primary">•</div>
                                <div><strong>Helicopter excursions:</strong> $300-$500 per person per hour</div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-muted/30 p-5 rounded-lg border border-muted">
                        <h4 className="font-semibold text-lg mb-3 text-primary">Ground-Based Activities</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <div className="mt-1 text-primary">•</div>
                                <div><strong>Walking safaris:</strong> $50-$150 per person</div>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1 text-primary">•</div>
                                <div><strong>Night game drives:</strong> $50-$100 per person</div>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1 text-primary">•</div>
                                <div><strong>Cultural village visits:</strong> $20-$80 per person</div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-muted/30 p-5 rounded-lg border border-muted">
                        <h4 className="font-semibold text-lg mb-3 text-primary">Vehicle and Guide Upgrades</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <div className="mt-1 text-primary">•</div>
                                <div><strong>Private vehicle upgrades:</strong> $250-$400 per day</div>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1 text-primary">•</div>
                                <div><strong>Photography-specific guides:</strong> $100-$300 per day</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className="mb-8 leading-relaxed">
                    Many travelers report that these optional activities were among their most memorable safari experiences, making them worthwhile splurges. However, not accounting for them in advance can lead to difficult decisions or budget overruns during your trip.
                </p>

                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">Beverage and Special Meal Costs</h3>
                <p className="mb-4 leading-relaxed">
                    While most safari packages include standard meals, beverages often represent a significant hidden cost. Even in "full board" accommodations, the following often incur additional charges:
                </p>
                
                <div className="bg-muted/30 p-6 rounded-xl mb-6 border border-muted">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Coffee className="h-5 w-5 text-primary" />
                                <h4 className="font-semibold text-lg">Drinks & Beverages</h4>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex justify-between items-center pb-2 border-b border-muted">
                                    <span className="font-medium">Alcoholic beverages:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$5-$20</span>
                                </li>
                                <li className="flex justify-between items-center pb-2 border-b border-muted">
                                    <span className="font-medium">Bottled water/soft drinks:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$3-$6</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="font-medium">Premium beverages:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">varies</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Coffee className="h-5 w-5 text-primary" />
                                <h4 className="font-semibold text-lg">Special Dining</h4>
                            </div>
                            <div className="flex items-start gap-3 bg-white/60 p-4 rounded-lg h-full">
                                <div>
                                    <strong className="block text-primary mb-2">Private dining experiences</strong>
                                    <span>Bush dinners or romantic setups typically cost $50-$150 per person beyond the standard meal plan</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <p className="mb-8 leading-relaxed">
                    Some luxury lodges offer truly all-inclusive packages with premium alcoholic beverages, but most mid-range options charge separately for alcohol. In remote locations, these beverage prices can be 30-50% higher than urban areas due to transportation costs and import duties.
                </p>

                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">Park Fees and Conservation Charges</h3>
                <p className="mb-4 leading-relaxed">
                    While reputable tour operators typically include standard park entry fees, several related costs may appear as surprises:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-5 mb-6">
                    <div className="bg-muted/20 p-5 rounded-lg border border-muted flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                            <MapPin className="h-5 w-5 text-primary" />
                            <h4 className="font-semibold">Premium Park Zones</h4>
                        </div>
                        <p className="text-sm mb-2">Some reserves charge additional fees for exclusive or specialized areas</p>
                        <div className="mt-auto text-center bg-primary/10 py-2 px-3 rounded-lg font-semibold">
                            $50-$100 per visit
                        </div>
                    </div>
                    
                    <div className="bg-muted/20 p-5 rounded-lg border border-muted flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                            <MapPin className="h-5 w-5 text-primary" />
                            <h4 className="font-semibold">Conservation Fees</h4>
                        </div>
                        <p className="text-sm mb-2">Daily charges in many private conservancies to support protection efforts</p>
                        <div className="mt-auto text-center bg-primary/10 py-2 px-3 rounded-lg font-semibold">
                            $10-$30 per day
                        </div>
                    </div>
                    
                    <div className="bg-muted/20 p-5 rounded-lg border border-muted flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                            <Camera className="h-5 w-5 text-primary" />
                            <h4 className="font-semibold">Camera Fees</h4>
                        </div>
                        <p className="text-sm mb-2">Some parks charge for professional cameras or commercial photography</p>
                        <div className="mt-auto text-center bg-primary/10 py-2 px-3 rounded-lg font-semibold">
                            Varies by camera type
                        </div>
                    </div>
                    
                    <div className="bg-muted/20 p-5 rounded-lg border border-muted flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                            <MapPin className="h-5 w-5 text-primary" />
                            <h4 className="font-semibold">Vehicle Entrance Fees</h4>
                        </div>
                        <p className="text-sm mb-2">For self-drive safaris, separate from personal entry fees</p>
                        <div className="mt-auto text-center bg-primary/10 py-2 px-3 rounded-lg font-semibold">
                            $20-$50 per vehicle
                        </div>
                    </div>
                </div>
                
                <p className="mb-8 leading-relaxed">
                    These fees directly support critical conservation efforts and local community development, making them worthwhile investments in Africa's wildlife heritage. However, they should be factored into your budget planning, especially for itineraries visiting multiple parks or private conservancies.
                </p>

                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">Currency Exchange and Payment Challenges</h3>
                <p className="mb-4 leading-relaxed">
                    The financial logistics of safari travel create several hidden costs that travelers frequently overlook:
                </p>
                
                <div className="overflow-hidden bg-muted/30 rounded-xl border border-muted mb-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-primary/10">
                                <th className="text-left p-4 border-b border-muted font-semibold">Fee Type</th>
                                <th className="text-right p-4 border-b border-muted font-semibold">Typical Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 text-primary flex-shrink-0" />
                                    <span>Foreign transaction fees</span>
                                </td>
                                <td className="p-4 border-b border-muted text-right font-medium">2-3% per transaction</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 text-primary flex-shrink-0" />
                                    <span>ATM withdrawal fees</span>
                                </td>
                                <td className="p-4 border-b border-muted text-right font-medium">$5-$10 plus conversion fees</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 text-primary flex-shrink-0" />
                                    <span>Currency exchange margins</span>
                                </td>
                                <td className="p-4 border-b border-muted text-right font-medium">2-8% at airports and hotels</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 text-primary flex-shrink-0" />
                                    <span>Credit card surcharges</span>
                                </td>
                                <td className="p-4 text-right font-medium">3-5% at some lodges</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className="bg-primary/5 p-5 rounded-lg border border-primary/10 mb-8">
                    <p className="mb-0 leading-relaxed">
                        Remote lodges may have limited or no credit card facilities, requiring cash payments for extras and gratuities. Strategic planning can minimize these costs through bank cards that offer no foreign transaction fees and exchanging currency before departure or at favorable urban locations rather than at airports or lodges.
                    </p>
                </div>

                <h2 id="tipping" className="text-3xl font-bold text-primary mt-16 mb-6">Tipping Expectations on Safari</h2>
                <p className="mb-6 leading-relaxed">
                    Perhaps the most significant hidden cost for many safari travelers is gratuities. Tipping culture varies across African destinations but is generally expected and represents a substantial portion of service providers' income. Failing to budget adequately for tips can lead to awkward situations or financial strain at the end of your journey.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-semibold text-primary mt-6 mb-4">Daily Tipping Guidelines</h3>
                        <p className="mb-4 leading-relaxed">
                            Tipping expectations vary by country, service quality, and accommodation category, but general guidelines include:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-5 border border-muted">
                            <ul className="space-y-3">
                                <li className="flex justify-between items-center pb-2 border-b border-muted">
                                    <span className="font-medium">Safari guides:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$15-$50 per day</span>
                                </li>
                                <li className="flex justify-between items-center pb-2 border-b border-muted">
                                    <span className="font-medium">Safari trackers:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$10-$20 per day</span>
                                </li>
                                <li className="flex justify-between items-center pb-2 border-b border-muted">
                                    <span className="font-medium">Camp/lodge staff:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$5-$15 per day</span>
                                </li>
                                <li className="flex justify-between items-center pb-2 border-b border-muted">
                                    <span className="font-medium">Transfer drivers:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$5-$10 per transfer</span>
                                </li>
                                <li className="flex justify-between items-center pb-2 border-b border-muted">
                                    <span className="font-medium">Porters:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$1-$2 per bag</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="font-medium">Butler service:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$10-$20 per day</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-2xl font-semibold text-primary mt-6 mb-4">Tipping Logistics</h3>
                        <p className="mb-4 leading-relaxed">
                            The practical aspects of tipping create additional considerations:
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 bg-muted/20 p-4 rounded-lg">
                                <DollarSign className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="block text-primary">Cash requirements</strong>
                                    <span>Most tips are expected in cash, preferably USD, EUR, or local currency</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 bg-muted/20 p-4 rounded-lg">
                                <DollarSign className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="block text-primary">Small denominations</strong>
                                    <span>Bringing an adequate supply of small bills is essential</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 bg-muted/20 p-4 rounded-lg">
                                <DollarSign className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="block text-primary">Tipping envelopes</strong>
                                    <span>Some lodges provide these, but carrying your own is helpful</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 bg-muted/20 p-4 rounded-lg">
                                <DollarSign className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="block text-primary">End-of-stay vs. daily tipping</strong>
                                    <span>Understanding local conventions is important</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <p className="mb-5 leading-relaxed">
                    The need for cash tips means carrying more currency than many travelers anticipate. Some guides also appreciate quality gifts from your home country as supplementary gestures, particularly items difficult to obtain locally.
                </p>

                <div className="bg-primary/10 p-6 rounded-xl my-8 border border-primary/20">
                    <h3 className="mt-0 text-primary text-xl font-semibold mb-3 flex items-center gap-2">
                        <Info className="h-5 w-5" /> Tipping Strategy Tip
                    </h3>
                    <p className="mb-0 leading-relaxed">
                        Create a dedicated "tip envelope" before your trip with pre-allocated cash in appropriate denominations for each service provider. This prevents awkward cash shortages and helps maintain your overall budget discipline.
                    </p>
                </div>

                <h2 id="travel-protection" className="text-3xl font-bold text-primary mt-16 mb-6">Travel Protection Costs</h2>
                <p className="mb-6 leading-relaxed">
                    Safari travel involves significant financial investment and unique risks that make comprehensive travel protection essential. However, the costs associated with adequate coverage can be higher than for standard vacations due to the remote nature and specialized activities involved.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div className="bg-muted/30 p-6 rounded-xl border border-muted">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="h-6 w-6 text-primary" />
                            <h3 className="text-xl font-semibold text-primary">Specialized Travel Insurance</h3>
                        </div>
                        <p className="mb-4 text-sm">
                            Standard travel insurance often proves insufficient for safari adventures, necessitating more comprehensive (and expensive) coverage:
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <div className="bg-primary/10 p-1 rounded-full mt-1">
                                    <Check className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <strong className="text-primary">Medical evacuation coverage:</strong>
                                    <span className="block text-sm">$50-$150 premium increase for policies covering remote evacuations</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="bg-primary/10 p-1 rounded-full mt-1">
                                    <Check className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <strong className="text-primary">High-value equipment coverage:</strong>
                                    <span className="block text-sm">Additional $50-$100 for photography gear protection</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="bg-primary/10 p-1 rounded-full mt-1">
                                    <Check className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <strong className="text-primary">Adventure activity coverage:</strong>
                                    <span className="block text-sm">$30-$80 supplement for walking safaris and other activities</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="bg-primary/10 p-1 rounded-full mt-1">
                                    <Check className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <strong className="text-primary">Cancel-for-any-reason upgrades:</strong>
                                    <span className="block text-sm">Adds approximately 40% to the base policy cost</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-muted/30 p-6 rounded-xl border border-muted">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="h-6 w-6 text-primary" />
                            <h3 className="text-xl font-semibold text-primary">Visa Insurance Requirements</h3>
                        </div>
                        <p className="mb-4 text-sm">
                            Some African nations require proof of travel insurance for visa issuance:
                        </p>
                        <div className="space-y-4">
                            <div className="bg-white/60 p-4 rounded-lg">
                                <strong className="block text-primary mb-1">Medical coverage minimums</strong>
                                <span className="text-sm">Often $25,000-$50,000</span>
                            </div>
                            <div className="bg-white/60 p-4 rounded-lg">
                                <strong className="block text-primary mb-1">Repatriation coverage</strong>
                                <span className="text-sm">May be separately required</span>
                            </div>
                            <div className="bg-white/60 p-4 rounded-lg">
                                <strong className="block text-primary mb-1">COVID-specific provisions</strong>
                                <span className="text-sm">Several countries now require coverage for pandemic-related expenses</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <p className="mb-8 leading-relaxed">
                    Comprehensive safari-appropriate insurance typically costs $150-$500 for a two-week trip, varying by age, coverage levels, and trip cost. While expensive, this protection is vital given that medical evacuation from remote areas can exceed $50,000 without insurance.
                </p>

                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 mb-8">
                    <p className="mb-0 leading-relaxed flex items-start gap-3">
                        <Info className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span>
                            These requirements change frequently, so verifying current insurance mandates for each country on your itinerary is essential during the planning phase.
                        </span>
                    </p>
                </div>

                <h2 id="connectivity" className="text-3xl font-bold text-primary mt-16 mb-6">Connectivity and Communication Expenses</h2>
                <p className="mb-6 leading-relaxed">
                    While many travelers embark on safari hoping to disconnect, practical communication needs often arise, creating another category of hidden expenses. Even "digital detox" enthusiasts typically want periodic access to communication channels for emergency contact or sharing experiences.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                            <Wifi className="h-5 w-5 text-primary" />
                            Mobile and Internet Access
                        </h3>
                        <div className="bg-muted/30 p-6 rounded-xl border border-muted">
                            <ul className="space-y-3">
                                <li className="flex justify-between items-center pb-3 border-b border-muted">
                                    <span className="font-medium">International roaming:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$10-$15/day</span>
                                </li>
                                <li className="flex justify-between items-center pb-3 border-b border-muted">
                                    <span className="font-medium">Local SIM cards:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$10-$30</span>
                                </li>
                                <li className="flex justify-between items-center pb-3 border-b border-muted">
                                    <span className="font-medium">Lodge Wi-Fi fees:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$5-$15/day</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="font-medium">Satellite internet:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$20+/day</span>
                                </li>
                            </ul>
                            
                            <div className="mt-5 bg-white/60 p-4 rounded-lg">
                                <p className="mb-0 text-sm italic">
                                    Connection quality varies dramatically, with bandwidth often restricted in remote areas. Budget-conscious travelers should investigate local SIM options in gateway cities.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                            <Cloud className="h-5 w-5 text-primary" />
                            Photography Data Storage
                        </h3>
                        <p className="mb-4 leading-relaxed">
                            A frequently overlooked technology expense involves managing the thousands of photos typically taken during safari:
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-lg border border-muted">
                                <div className="bg-primary/10 p-1 rounded-full mt-1">
                                    <Check className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <strong className="text-primary">Extra memory cards</strong>
                                    <span className="block text-sm">$20-$100 each for high-capacity, high-speed cards</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-lg border border-muted">
                                <div className="bg-primary/10 p-1 rounded-full mt-1">
                                    <Check className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <strong className="text-primary">Portable hard drives</strong>
                                    <span className="block text-sm">$80-$200 for rugged, safari-appropriate storage</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-lg border border-muted">
                                <div className="bg-primary/10 p-1 rounded-full mt-1">
                                    <Check className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <strong className="text-primary">Cloud storage upgrades</strong>
                                    <span className="block text-sm">$10-$20 per month for sufficient capacity</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <p className="mb-8 leading-relaxed">
                    Safari travelers often underestimate how many photos they'll take, leading to last-minute, high-priced purchases at limited retail options. Planning adequate storage in advance prevents both expense and the frustration of missing once-in-a-lifetime shots.
                </p>

                <h2 id="shopping" className="text-3xl font-bold text-primary mt-16 mb-6">Souvenir and Shopping Considerations</h2>
                <p className="mb-6 leading-relaxed">
                    African crafts, artwork, and mementos represent significant unplanned expenses for many safari travelers. The unique nature and cultural significance of safari souvenirs often lead to more substantial purchases than anticipated.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5 text-primary" />
                            Common Souvenir Expenditures
                        </h3>
                        <div className="bg-muted/30 p-6 rounded-xl border border-muted">
                            <ul className="space-y-3">
                                <li className="flex justify-between items-center pb-3 border-b border-muted">
                                    <span className="font-medium">Local artwork:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$50-$1,000+</span>
                                </li>
                                <li className="flex justify-between items-center pb-3 border-b border-muted">
                                    <span className="font-medium">Textile crafts:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$30-$200</span>
                                </li>
                                <li className="flex justify-between items-center pb-3 border-b border-muted">
                                    <span className="font-medium">Jewelry and beadwork:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$20-$300</span>
                                </li>
                                <li className="flex justify-between items-center pb-3 border-b border-muted">
                                    <span className="font-medium">Wood carvings:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$25-$500</span>
                                </li>
                                <li className="flex justify-between items-center pb-3 border-b border-muted">
                                    <span className="font-medium">Specialty foods:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$15-$50</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="font-medium">Books and field guides:</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$20-$60</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                            <Package className="h-5 w-5 text-primary" />
                            Additional Shopping Costs
                        </h3>
                        <p className="mb-4 leading-relaxed">
                            Beyond the purchase price, several additional expenses often arise:
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-lg border border-muted">
                                <div className="bg-primary/10 p-1 rounded-full mt-1">
                                    <Check className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <strong className="text-primary">Shipping expenses</strong>
                                    <span className="block text-sm">$50-$300 for larger items requiring shipment home</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-lg border border-muted">
                                <div className="bg-primary/10 p-1 rounded-full mt-1">
                                    <Check className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <strong className="text-primary">Export permits</strong>
                                    <span className="block text-sm">Required for certain materials like wood or animal products</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-lg border border-muted">
                                <div className="bg-primary/10 p-1 rounded-full mt-1">
                                    <Check className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <strong className="text-primary">Customs duties</strong>
                                    <span className="block text-sm">Potentially 5-25% of declared value upon return home</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-lg border border-muted">
                                <div className="bg-primary/10 p-1 rounded-full mt-1">
                                    <Check className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <strong className="text-primary">Extra baggage fees</strong>
                                    <span className="block text-sm">$50-$200 for additional or overweight luggage</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 mb-8 flex gap-4">
                    <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="text-lg font-semibold text-primary mb-2">Souvenir Budget Tip</h4>
                        <p className="mb-0 leading-relaxed">
                            Establishing a souvenir budget before departure helps prevent financial strain, as the unique and authentic crafts available in safari destinations can be difficult to resist. Many travelers report spending 5-15% of their total trip budget on souvenirs and gifts.
                        </p>
                    </div>
                </div>

                <h2 id="post-safari" className="text-3xl font-bold text-primary mt-16 mb-6">Post-Safari Expenses</h2>
                <p className="mb-6 leading-relaxed">
                    The financial impact of your safari doesn't end when you board your flight home. Several post-trip expenses frequently surprise travelers:
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div className="bg-muted/30 p-6 rounded-xl border border-muted">
                        <div className="flex items-center gap-3 mb-4">
                            <Camera className="h-5 w-5 text-primary" />
                            <h3 className="text-xl font-semibold text-primary">Photo Processing and Organization</h3>
                        </div>
                        <p className="mb-4 text-sm">
                            The thousands of photos captured during a typical safari often require:
                        </p>
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center pb-2 border-b border-muted">
                                <span className="font-medium">Photo editing software:</span>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$10-$20/month</span>
                            </li>
                            <li className="flex justify-between items-center pb-2 border-b border-muted">
                                <span className="font-medium">Professional printing:</span>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$50-$300</span>
                            </li>
                            <li className="flex justify-between items-center pb-2 border-b border-muted">
                                <span className="font-medium">Premium cloud storage:</span>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$2-$10/month</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="font-medium">Custom framing:</span>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">$50-$300/piece</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-muted/30 p-6 rounded-xl border border-muted">
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="h-5 w-5 text-primary" />
                            <h3 className="text-xl font-semibold text-primary">Medical Follow-ups</h3>
                        </div>
                        <p className="mb-4 text-sm">
                            Post-safari medical attention occasionally becomes necessary:
                        </p>
                        <div className="space-y-4">
                            <div className="bg-white/60 p-4 rounded-lg">
                                <strong className="block text-primary mb-1">Malaria testing</strong>
                                <p className="text-sm mb-0">$50-$200 if symptoms develop after return</p>
                            </div>
                            <div className="bg-white/60 p-4 rounded-lg">
                                <strong className="block text-primary mb-1">Parasite screening</strong>
                                <p className="text-sm mb-0">$100-$400 depending on symptoms and tests required</p>
                            </div>
                            <div className="bg-white/60 p-4 rounded-lg">
                                <strong className="block text-primary mb-1">Follow-up vaccinations</strong>
                                <p className="text-sm mb-0">Some multi-dose vaccines require completion upon return</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <p className="mb-8 leading-relaxed">
                    Many travelers find these expenses worthwhile for preserving and sharing their once-in-a-lifetime safari memories, but they represent another category of safari-related costs that extends long after your return. While medical follow-ups aren't common, travelers should maintain a small contingency fund for potential medical needs, particularly if any unusual symptoms develop in the weeks following your safari.
                </p>

                <h2 id="budget-planning" className="text-3xl font-bold text-primary mt-16 mb-6">Comprehensive Safari Budget Planning</h2>
                <p className="mb-6 leading-relaxed">
                    Armed with awareness of these hidden expenses, you can develop a more realistic safari budget that minimizes financial surprises and maximizes enjoyment. Our research indicates that travelers should typically add 20-30% beyond the quoted safari package price to account for these hidden costs.
                </p>

                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">Hidden Cost Allocation Strategy</h3>
                <p className="mb-4 leading-relaxed">
                    Based on expenditure patterns from hundreds of safari travelers, we recommend the following allocation for your hidden cost budget:
                </p>
                
                <div className="bg-muted/30 p-6 rounded-xl mb-8 border border-muted overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-4">
                            <div className="relative pt-5">
                                <div className="w-full bg-muted rounded-full h-4">
                                    <div className="bg-primary rounded-full h-4" style={{width: '12%'}}></div>
                                </div>
                                <div className="flex justify-between mt-1 text-sm">
                                    <span className="font-medium">Pre-departure expenses</span>
                                    <span className="text-primary font-bold">8-12%</span>
                                </div>
                            </div>
                            
                            <div className="relative pt-5">
                                <div className="w-full bg-muted rounded-full h-4">
                                    <div className="bg-primary rounded-full h-4" style={{width: '15%'}}></div>
                                </div>
                                <div className="flex justify-between mt-1 text-sm">
                                    <span className="font-medium">On-the-ground extras</span>
                                    <span className="text-primary font-bold">10-15%</span>
                                </div>
                            </div>
                            
                            <div className="relative pt-5">
                                <div className="w-full bg-muted rounded-full h-4">
                                    <div className="bg-primary rounded-full h-4" style={{width: '10%'}}></div>
                                </div>
                                <div className="flex justify-between mt-1 text-sm">
                                    <span className="font-medium">Tipping</span>
                                    <span className="text-primary font-bold">5-10%</span>
                                </div>
                            </div>
                            
                            <div className="relative pt-5">
                                <div className="w-full bg-muted rounded-full h-4">
                                    <div className="bg-primary rounded-full h-4" style={{width: '7%'}}></div>
                                </div>
                                <div className="flex justify-between mt-1 text-sm">
                                    <span className="font-medium">Insurance and protection</span>
                                    <span className="text-primary font-bold">3-7%</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="relative pt-5">
                                <div className="w-full bg-muted rounded-full h-4">
                                    <div className="bg-primary rounded-full h-4" style={{width: '3%'}}></div>
                                </div>
                                <div className="flex justify-between mt-1 text-sm">
                                    <span className="font-medium">Connectivity</span>
                                    <span className="text-primary font-bold">1-3%</span>
                                </div>
                            </div>
                            
                            <div className="relative pt-5">
                                <div className="w-full bg-muted rounded-full h-4">
                                    <div className="bg-primary rounded-full h-4" style={{width: '15%'}}></div>
                                </div>
                                <div className="flex justify-between mt-1 text-sm">
                                    <span className="font-medium">Shopping and souvenirs</span>
                                    <span className="text-primary font-bold">5-15%</span>
                                </div>
                            </div>
                            
                            <div className="relative pt-5">
                                <div className="w-full bg-muted rounded-full h-4">
                                    <div className="bg-primary rounded-full h-4" style={{width: '5%'}}></div>
                                </div>
                                <div className="flex justify-between mt-1 text-sm">
                                    <span className="font-medium">Post-safari expenses</span>
                                    <span className="text-primary font-bold">2-5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-muted p-8 rounded-xl my-10 shadow-sm border border-muted">
                    <h3 className="mt-0 flex items-center gap-3 text-primary text-2xl font-semibold mb-5">
                        <DollarSign className="h-7 w-7 text-primary" />
                        Safari Budget Planning Tool
                    </h3>
                    <p className="mb-4 leading-relaxed">
                        To help you develop a comprehensive safari budget that accounts for these hidden costs, we've created a downloadable Safari Budget Calculator. This spreadsheet includes:
                    </p>
                    <ul className="grid md:grid-cols-2 gap-3 mb-6">
                        <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>Line items for all common safari expenses</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>Country-specific guidance for tipping and fees</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>Customizable categories for personalized planning</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>Built-in contingency calculations</span>
                        </li>
                    </ul>
                    <div className="mt-4">
                        <a 
                            href="#" 
                            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 font-medium transition-colors"
                        >
                            Download Safari Budget Calculator
                        </a>
                    </div>
                </div>

                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">Final Recommendations</h3>
                <p className="mb-5 leading-relaxed">
                    As you prepare your safari budget, consider these proven strategies for managing hidden costs:
                </p>
                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4 p-5 bg-muted/20 rounded-lg border border-muted/50">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary mb-1">Research thoroughly</h4>
                            <p className="mb-0">Understanding potential expenses is the first step to managing them effectively. Spend time researching destination-specific costs.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-5 bg-muted/20 rounded-lg border border-muted/50">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary mb-1">Prioritize experiences</h4>
                            <p className="mb-0">Allocate funds to activities that align with your safari dreams. If hot air ballooning is a bucket-list item, budget for it specifically.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-5 bg-muted/20 rounded-lg border border-muted/50">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary mb-1">Establish spending limits</h4>
                            <p className="mb-0">Set clear budgets for flexible categories like shopping and optional activities to avoid overspending in the moment.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-5 bg-muted/20 rounded-lg border border-muted/50">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary mb-1">Include a contingency fund</h4>
                            <p className="mb-0">Add a 10-15% buffer for truly unexpected expenses that may arise during your adventure.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-5 bg-muted/20 rounded-lg border border-muted/50">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary mb-1">Track expenses during your trip</h4>
                            <p className="mb-0">Use a simple app or notebook to maintain awareness of spending as you travel.</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-10">
                    <p className="text-lg leading-relaxed mb-4">
                        While these hidden costs may seem daunting, they shouldn't discourage you from experiencing the magic of an African safari. With proper planning, these expenses become manageable aspects of what will likely be one of your most treasured travel experiences. The key is awareness and preparation—exactly what this guide aims to provide.
                    </p>
                    <p className="text-lg leading-relaxed mb-0">
                        Remember that investing in quality experiences, supporting conservation efforts, and fairly compensating the dedicated professionals who make your safari possible are all worthwhile expenditures. The memories and impact of your African adventure will far outlast the financial considerations discussed here.
                    </p>
                </div>

                <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-t border-muted">
                    <Link href="/resources/planning-guides" className="flex items-center gap-2 text-primary hover:text-primary/80 bg-primary/5 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="font-medium">Back to Planning Guides</span>
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">Related:</span>
                        <Link href="/resources/planning-guides/budgeting" className="text-primary hover:text-primary/80 bg-primary/5 px-4 py-2 rounded-lg font-medium transition-colors">
                            Safari Budget Planning
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HiddenCostsPage; 