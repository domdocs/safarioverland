import React from 'react';
import Image from 'next/image';

const MountainGorillaPage = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Page Header */}
            <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Mountain Gorilla Recovery</h1>
                <p className="text-xl text-muted-foreground">
                    The remarkable story of how mountain gorilla populations have more than doubled through conservation efforts supported by tourism in Rwanda and Uganda
                </p>
            </div>

            {/* Hero Section */}
            <div className="bg-muted rounded-lg overflow-hidden mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                        <Image 
                            src="/images/success-stories/gorilla-recovery.jpg" 
                            alt="Mountain Gorilla in Virunga Mountains" 
                            fill 
                            className="object-cover" 
                        />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">From the Brink of Extinction</h2>
                        <p className="text-muted-foreground mb-4">
                            In the 1980s, mountain gorillas were on the verge of extinction with fewer than 250 individuals remaining in the wild. Today, thanks to intensive conservation efforts, their population has grown to over 1,000 individuals - a conservation success story that offers hope for endangered species worldwide.
                        </p>
                        <p className="text-muted-foreground">
                            This remarkable recovery demonstrates how dedicated protection, community involvement, and responsible tourism can turn the tide for a species once destined for extinction.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6">Understanding Mountain Gorillas</h2>
                
                <p>
                    <strong>Mountain gorillas (Gorilla beringei beringei)</strong> are one of the most endangered great apes in the world. These magnificent creatures are found only in two isolated populations:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>The <strong>Virunga Massif</strong> - a chain of volcanoes spanning Rwanda, Uganda, and the Democratic Republic of Congo (DRC)</li>
                    <li><strong>Bwindi Impenetrable National Park</strong> in Uganda</li>
                </ul>
                
                <p>
                    Mountain gorillas live in family groups led by a dominant silverback male. They are largely vegetarian, feeding on leaves, shoots, and stems from over 142 plant species. These gentle giants share approximately 98% of their DNA with humans, making them one of our closest relatives in the animal kingdom.
                </p>

                <blockquote className="bg-muted p-6 rounded-lg my-8 border-l-4 border-primary">
                    <p className="italic">
                        "When you realize the value of all life, you dwell less on what is past and concentrate more on the preservation of the future."
                    </p>
                    <cite>— Dian Fossey, Primatologist & Founder of the Karisoke Research Center</cite>
                </blockquote>

                <h2 className="text-3xl font-bold mb-6">The Decline and the Turning Point</h2>
                
                <p>
                    In the 1970s and early 1980s, mountain gorillas faced multiple threats:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Habitat loss</strong> due to agricultural expansion and human settlement</li>
                    <li><strong>Poaching</strong> for trophies and the bushmeat trade</li>
                    <li><strong>Civil unrest</strong> in the region that made conservation work dangerous</li>
                    <li><strong>Disease transmission</strong> from humans, which gorillas are highly susceptible to</li>
                </ul>
                
                <p>
                    The turning point came with the pioneering work of researchers like Dian Fossey, whose dedicated study of gorillas and passionate advocacy helped bring global attention to their plight. Her work at the Karisoke Research Center, established in 1967 between Mount Karisimbi and Mount Visoke in Rwanda, laid the foundation for mountain gorilla conservation.
                </p>
                
                <p>
                    Following Fossey's tragic murder in 1985, conservation efforts intensified rather than faltered. Her legacy inspired a generation of conservationists and researchers who were determined to prevent the extinction of mountain gorillas.
                </p>

                <div className="my-8 bg-muted p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-2">Did You Know?</h4>
                    <p>
                        The 1988 film "Gorillas in the Mist," starring Sigourney Weaver as Dian Fossey, brought international attention to the plight of mountain gorillas and helped generate public support for conservation efforts.
                    </p>
                </div>

                <h2 className="text-3xl font-bold mb-6">A Multi-faceted Conservation Approach</h2>
                
                <p>
                    The remarkable recovery of mountain gorillas can be attributed to several interconnected conservation strategies:
                </p>
                
                <h3 className="text-2xl font-bold mb-4">1. Protected Area Management</h3>
                
                <p>
                    The establishment and effective management of protected areas has been crucial for gorilla conservation:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Volcanoes National Park</strong> in Rwanda</li>
                    <li><strong>Bwindi Impenetrable National Park</strong> and <strong>Mgahinga Gorilla National Park</strong> in Uganda</li>
                    <li><strong>Virunga National Park</strong> in the Democratic Republic of Congo</li>
                </ul>
                
                <p>
                    These parks employ rangers who conduct daily monitoring of gorilla groups, remove snares set for other wildlife, and deter poachers through regular patrols.
                </p>

                <h3 className="text-2xl font-bold mb-4">2. Veterinary Intervention</h3>
                
                <p>
                    The <strong>Gorilla Doctors</strong> program, established in 1986, provides medical care to wild mountain gorillas. Their interventions include:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Treating gorillas injured by snares</li>
                    <li>Addressing respiratory infections and other illnesses</li>
                    <li>Conducting health monitoring to prevent disease outbreaks</li>
                </ul>
                
                <p>
                    This veterinary care has saved numerous individual gorillas and contributed significantly to population growth.
                </p>

                <h3 className="text-2xl font-bold mb-4">3. Community Engagement</h3>
                
                <p>
                    Recognizing that conservation cannot succeed without local support, programs were developed to benefit communities living near gorilla habitats:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Revenue sharing</strong> - a percentage of tourism fees goes directly to community development</li>
                    <li><strong>Employment opportunities</strong> as park rangers, guides, and in tourism facilities</li>
                    <li><strong>Education programs</strong> that foster conservation awareness</li>
                    <li><strong>Alternative livelihood initiatives</strong> to reduce dependence on forest resources</li>
                </ul>
                
                <blockquote className="bg-muted p-6 rounded-lg my-8 border-l-4 border-primary">
                    <p className="italic">
                        "Conservation will only succeed when people living alongside wildlife see and receive tangible benefits from conservation efforts."
                    </p>
                    <cite>— Eugene Rutagarama, Rwandan conservationist and Goldman Environmental Prize winner</cite>
                </blockquote>

                <h3 className="text-2xl font-bold mb-4">4. Sustainable Tourism</h3>
                
                <p>
                    Perhaps the most innovative aspect of mountain gorilla conservation has been the development of carefully managed gorilla tourism:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Strict <strong>visitation protocols</strong> - limited group size, time restrictions, and distance requirements</li>
                    <li><strong>High permit fees</strong> ($1,500 in Rwanda, $700 in Uganda) that generate substantial revenue for conservation</li>
                    <li><strong>Habituated gorilla groups</strong> specifically for tourism, leaving others undisturbed</li>
                    <li><strong>Health protocols</strong> to minimize disease transmission from visitors to gorillas</li>
                </ul>
                
                <p>
                    This approach has transformed gorillas from being seen as hunting targets to valuable living assets that bring sustainable income to the region.
                </p>

                <h2 className="text-3xl font-bold mb-6">Measurable Success</h2>
                
                <p>
                    The conservation efforts have yielded impressive results:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>The population has grown from fewer than 250 individuals in the 1980s to over 1,000 today</li>
                    <li>In 2018, the IUCN downgraded mountain gorillas from "Critically Endangered" to "Endangered"</li>
                    <li>The Virunga population grew from 380 in 2003 to 604 in 2016 - an increase of 59%</li>
                    <li>Bwindi's population increased from an estimated 300 to over 400 gorillas</li>
                    <li>Infant mortality rates have decreased significantly</li>
                    <li>Incidents of poaching have declined dramatically</li>
                </ul>
                
                <p>
                    These numbers represent a rare conservation success story in an era of biodiversity decline. The mountain gorilla recovery demonstrates that with sufficient resources, political will, and innovative approaches, even severely threatened species can be brought back from the brink.
                </p>

                <h2 className="text-3xl font-bold mb-6">Ongoing Challenges</h2>
                
                <p>
                    Despite the success, mountain gorillas still face significant challenges:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Limited habitat</strong> - their entire range covers just about 300 square miles</li>
                    <li><strong>Human population growth</strong> in surrounding areas increases pressure on the parks</li>
                    <li><strong>Political instability</strong>, particularly in the DRC</li>
                    <li><strong>Climate change</strong> affecting the mountain ecosystem and vegetation patterns</li>
                    <li><strong>Disease risks</strong>, highlighted by the COVID-19 pandemic which temporarily halted tourism</li>
                </ul>
                
                <p>
                    Additionally, conservationists must balance the benefits of tourism with its potential risks. While tourism provides critical funding, too much human contact could stress gorillas or expose them to diseases.
                </p>

                <h2 className="text-3xl font-bold mb-6">Lessons for Conservation Worldwide</h2>
                
                <p>
                    The mountain gorilla conservation model offers valuable lessons that can be applied to other endangered species:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>The importance of <strong>international cooperation</strong> across political boundaries</li>
                    <li>The effectiveness of <strong>community-based conservation</strong> that provides tangible benefits</li>
                    <li>The value of <strong>sustainable tourism</strong> as a conservation financing mechanism</li>
                    <li>The necessity of <strong>long-term commitment</strong> to conservation goals</li>
                    <li>The power of <strong>public awareness and engagement</strong> to support conservation efforts</li>
                </ul>
                
                <p>
                    Perhaps most importantly, the mountain gorilla story provides hope that dedicated conservation work can succeed, even in the face of seemingly insurmountable challenges.
                </p>

                <h2 className="text-3xl font-bold mb-6">How You Can Help</h2>
                
                <p>
                    There are several ways individuals can contribute to mountain gorilla conservation:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Responsible tourism</strong> - visit the gorillas following all guidelines and protocols</li>
                    <li><strong>Support conservation organizations</strong> working to protect gorillas</li>
                    <li><strong>Spread awareness</strong> about the gorillas' story and ongoing needs</li>
                    <li><strong>Reduce carbon footprint</strong> to help mitigate climate change impacts</li>
                    <li><strong>Purchase sustainable products</strong> that don't contribute to deforestation</li>
                </ul>
                
                <p>
                    By continuing to build on the successful strategies of the past decades and addressing emerging challenges, we can ensure that mountain gorillas thrive for generations to come.
                </p>

                <div className="bg-primary text-white p-8 rounded-lg my-10">
                    <h3 className="text-2xl font-bold mb-4">Key Organizations Working to Protect Mountain Gorillas</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Dian Fossey Gorilla Fund International</strong></li>
                        <li><strong>Gorilla Doctors</strong></li>
                        <li><strong>International Gorilla Conservation Programme</strong></li>
                        <li><strong>Rwanda Development Board</strong></li>
                        <li><strong>Uganda Wildlife Authority</strong></li>
                        <li><strong>World Wildlife Fund</strong></li>
                    </ul>
                </div>
            </div>

            {/* Back Button */}
            <div className="mt-12">
                <a href="/resources/conservation" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark">
                    ← Back to Conservation
                </a>
            </div>
        </div>
    );
};

export default MountainGorillaPage; 