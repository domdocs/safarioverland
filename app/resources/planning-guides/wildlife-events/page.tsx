import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowLeft, Bird, Info, Map, Check } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planning Around Wildlife Events | Safari Overland',
  description: 'Time your safari to witness Africa\'s most spectacular wildlife events—like the Great Migration, calving season, and bird migrations—for a truly unforgettable adventure.',
  keywords: 'wildlife events, great migration, calving season, bird migration, safari timing, river crossing, wildebeest migration, serengeti migration, masai mara migration',
};

const WildlifeEventsPage = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Page Header */}
            <div className="mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3">Planning Around Wildlife Events</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">Time your safari to witness Africa's most spectacular wildlife events—like the Great Migration, calving season, and bird migrations—for a truly unforgettable adventure.</p>
            </div>

            {/* Hero Section */}
            <div className="grid md:grid-cols-2 gap-10 mb-16">
                <div className="relative h-[400px] sm:h-[450px] rounded-xl overflow-hidden shadow-md">
                    <Image 
                        src="/images/resources/wildlife-events-hero.jpg" 
                        alt="Wildebeest herd crossing the Mara River during the Great Migration" 
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-5 text-primary">Why Time Your Safari?</h2>
                    <p className="text-lg mb-6 leading-relaxed">
                        Africa's wildlife spectacles are governed by nature's rhythms. By aligning your travel dates with major wildlife events—like the Great Migration's river crossings, the calving season, or seasonal bird migrations—you'll witness dramatic scenes, rare behaviors, and the raw power of the wild. Here's how to plan your safari around these unforgettable moments.
                    </p>
                    <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg border border-muted">
                        <Calendar className="h-6 w-6 text-primary flex-shrink-0" />
                        <span className="font-medium">Strategic timing can transform a great safari into an extraordinary one</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
                <h2 id="great-migration" className="text-3xl font-bold text-primary mt-16 mb-6">The Great Migration: Nature's Grandest Show</h2>
                <p className="mb-4 leading-relaxed">
                    The Great Migration is the world's largest overland wildlife movement, involving over 1.5 million wildebeest, hundreds of thousands of zebras, and gazelles as they journey in a circular route between Tanzania's Serengeti and Kenya's Masai Mara. This epic trek is driven by the search for fresh grazing and water, following the seasonal rains. Timing your safari to the migration's key phases guarantees front-row seats to some of Africa's most dramatic wildlife encounters.
                </p>

                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">Migration Events Calendar</h3>
                
                <div className="overflow-hidden bg-muted/30 rounded-xl border border-muted mb-8">
                    <table className="w-full border-collapse min-w-full">
                        <thead>
                            <tr className="bg-primary/10">
                                <th className="text-left p-4 border-b border-muted font-semibold">Event</th>
                                <th className="text-left p-4 border-b border-muted font-semibold">Approximate Timing</th>
                                <th className="text-left p-4 border-b border-muted font-semibold">Best Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Calving Season</td>
                                <td className="p-4 border-b border-muted">Jan – Mar</td>
                                <td className="p-4 border-b border-muted">Southern Serengeti (Ndutu Plains)</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Grumeti River Crossings</td>
                                <td className="p-4 border-b border-muted">May – Jun</td>
                                <td className="p-4 border-b border-muted">Western Serengeti</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 border-b border-muted font-medium">Mara River Crossings</td>
                                <td className="p-4 border-b border-muted">Jul – Oct</td>
                                <td className="p-4 border-b border-muted">Northern Serengeti & Masai Mara</td>
                            </tr>
                            <tr className="hover:bg-muted/40 transition-colors">
                                <td className="p-4 font-medium">Return South</td>
                                <td className="p-4">Nov – Dec</td>
                                <td className="p-4">Masai Mara to Southern Serengeti</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">Calving Season: New Life and Predator Action</h3>
                <p className="mb-4 leading-relaxed">
                    From January to March, the southern Serengeti's Ndutu Plains transform into a nursery as nearly half a million wildebeest calves are born in just a few weeks. This "calving season" is a spectacle of new life—and of survival, as predators like lions, cheetahs, and hyenas gather for the feast. The synchronized birthing overwhelms predators, ensuring most calves survive.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div className="bg-muted/30 p-5 rounded-lg border border-muted">
                        <h4 className="font-semibold text-lg text-primary mb-3">Best for predator-prey drama</h4>
                        <p className="mb-0">Expect thrilling chases and hunting scenes as big cats and hyenas target the vulnerable newborns.</p>
                    </div>
                    
                    <div className="bg-muted/30 p-5 rounded-lg border border-muted">
                        <h4 className="font-semibold text-lg text-primary mb-3">Photography tip</h4>
                        <p className="mb-0">Early mornings offer the best light for capturing tender moments and dramatic action.</p>
                    </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8 flex gap-4">
                    <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="text-lg font-semibold text-primary mb-2">Expert Tip</h4>
                        <p className="mb-0 leading-relaxed">
                            Book your calving season safari at least six months in advance—this is a popular time, and the best camps fill up quickly.
                        </p>
                    </div>
                </div>

                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">River Crossings: The Ultimate Migration Drama</h3>
                <p className="mb-4 leading-relaxed">
                    From July to October, herds gather at the Mara River's banks in northern Serengeti and Masai Mara, hesitating before plunging into crocodile-infested waters. These crossings are unpredictable—sometimes happening several times a day, sometimes not at all—but when they do, they're among Africa's most dramatic wildlife spectacles.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div className="bg-muted/30 p-5 rounded-lg border border-muted">
                        <h4 className="font-semibold text-lg text-primary mb-3">Best for adrenaline</h4>
                        <p className="mb-0">Watch thousands of wildebeest and zebras brave strong currents and lurking crocodiles.</p>
                    </div>
                    
                    <div className="bg-muted/30 p-5 rounded-lg border border-muted">
                        <h4 className="font-semibold text-lg text-primary mb-3">Plan to wait</h4>
                        <p className="mb-0">River crossings are unpredictable—be patient and allow several days near the river for the best chance.</p>
                    </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8 flex gap-4">
                    <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="text-lg font-semibold text-primary mb-2">Flexibility Is Key</h4>
                        <p className="mb-0 leading-relaxed">
                            Migration events depend on rainfall, which is increasingly unpredictable. Plan a longer stay and remain flexible to maximize your chances of witnessing dramatic crossings.
                        </p>
                    </div>
                </div>

                <h2 id="beyond-migration" className="text-3xl font-bold text-primary mt-16 mb-6">Beyond the Migration: Calving, Bird Migrations & More</h2>
                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4 flex items-center gap-2">
                    <Bird className="h-5 w-5 text-primary" />
                    Bird Migrations: A Spectacle in the Skies
                </h3>
                <p className="mb-4 leading-relaxed">
                    While the Great Migration steals the limelight, Africa's bird migrations are equally astonishing. The "green season" (April–June) brings a flush of migratory birds to East Africa, transforming wetlands and savannahs into a birder's paradise. Expect vibrant flocks, dazzling courtship displays, and rare sightings—especially in the Serengeti, Ngorongoro, and Rift Valley lakes.
                </p>

                <div className="bg-muted/30 p-6 rounded-xl mb-8 border border-muted">
                    <h4 className="font-semibold text-lg text-primary mb-3">Best Birding Months</h4>
                    <p className="mb-0">
                        April to June is prime for migratory birds, while November to December also sees an influx of species following the rains.
                    </p>
                </div>

                <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">Other Iconic Wildlife Events</h3>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3 bg-muted/20 p-4 rounded-lg">
                        <div className="bg-primary/10 p-1 rounded-full mt-1">
                            <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <strong className="text-primary">Rutting (Breeding) Season</strong>
                            <span className="block">April–May in the western and central Serengeti—witness dramatic clashes between male wildebeest.</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-3 bg-muted/20 p-4 rounded-lg">
                        <div className="bg-primary/10 p-1 rounded-full mt-1">
                            <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <strong className="text-primary">Return Migration</strong>
                            <span className="block">November–December as herds move south, offering quieter game viewing and lush landscapes.</span>
                        </div>
                    </li>
                </ul>

                <blockquote className="bg-muted p-6 rounded-lg my-8 border-l-4 border-primary italic">
                    "The best safari experiences happen when you let nature lead the way. Plan for the event you most want to see, but always be open to the unexpected."
                    <cite className="block mt-2 text-sm not-italic">— Safari Guide Wisdom</cite>
                </blockquote>

                <h2 id="practical-tips" className="text-3xl font-bold text-primary mt-16 mb-6">Practical Tips for Planning Around Wildlife Events</h2>
                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4 p-5 bg-muted/20 rounded-lg border border-muted/50">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary mb-1">Book Early</h4>
                            <p className="mb-0">Secure your spot at least 6–12 months in advance, especially for peak migration and calving seasons.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-5 bg-muted/20 rounded-lg border border-muted/50">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary mb-1">Choose Your Region Wisely</h4>
                            <p className="mb-0">Pick camps or lodges close to the action—Ndutu for calving, Mara River for crossings, or private conservancies for exclusivity.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-5 bg-muted/20 rounded-lg border border-muted/50">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary mb-1">Allow Enough Time</h4>
                            <p className="mb-0">Spend several days in each location to maximize your chances of witnessing key events.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-5 bg-muted/20 rounded-lg border border-muted/50">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary mb-1">Be Flexible</h4>
                            <p className="mb-0">Wildlife events don't run on a schedule—embrace the unpredictability for the most rewarding safari.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-10">
                    <h3 className="text-xl font-semibold text-primary mb-3">Combine Events for a Richer Safari</h3>
                    <p className="mb-0 leading-relaxed">
                        Consider combining migration viewing with birding, predator action, or quieter periods for a more diverse and less crowded safari experience.
                    </p>
                </div>

                <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-t border-muted">
                    <Link href="/resources/planning-guides" className="flex items-center gap-2 text-primary hover:text-primary/80 bg-primary/5 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="font-medium">Back to Planning Guides</span>
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">Related:</span>
                        <Link href="/resources/planning-guides/best-times" className="text-primary hover:text-primary/80 bg-primary/5 px-4 py-2 rounded-lg font-medium transition-colors">
                            Best Times to Visit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WildlifeEventsPage;