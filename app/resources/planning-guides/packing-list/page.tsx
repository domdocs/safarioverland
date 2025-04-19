import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckSquare, Info, Compass, ShieldCheck, Check, Sun, Camera, Umbrella, Luggage } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ultimate Safari Packing List | Safari Overland',
  description: 'The essential safari packing list for all seasons and destinations. From clothing and gear to medical supplies and electronics, prepare for your African adventure.',
  keywords: 'safari packing list, what to pack for safari, safari clothing, safari gear, safari essentials, africa travel packing',
};

const PackingListPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3">
          Ultimate Safari Packing List
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Prepare for your African safari adventure with this comprehensive packing list—covering clothing, gear, and must-have essentials for a safe and comfortable journey.
        </p>
      </div>
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="relative h-[400px] sm:h-[450px] rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/resources/packing-list-safari.jpg"
            alt="Safari hat, binoculars, and camera on a wooden table"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-5 text-primary">
            Pack Smart, Travel Light
          </h2>
          <p className="text-lg mb-6 leading-relaxed">
            Packing for safari is all about comfort, practicality, and preparation. From lightweight clothing to essential gear and handy extras, this guide ensures you're ready for every adventure—whether you're tracking lions at dawn or relaxing by the campfire at night.
          </p>
        </div>
      </div>
      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-3xl font-bold text-primary mt-16 mb-6">
          Safari Clothing Essentials
        </h2>
        <p className="mb-4 leading-relaxed">
          Safari days can be hot, dusty, and sunny, while mornings and evenings may be surprisingly cool. Choose versatile, neutral-colored clothing that blends into the bush and keeps you comfortable from sunrise to sunset.
        </p>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Lightweight, long-sleeved shirts (2–3):</strong> For sun protection and to guard against insects.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Convertible trousers/long pants (2–3):</strong> Zip-off styles offer flexibility for hot days and cool evenings.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">T-shirts and/or tank tops (2–3):</strong> Breathable fabrics are best for layering.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Fleece or warm jacket (1):</strong> Essential for chilly mornings and evenings.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Light rain jacket or windbreaker (1):</strong> For unexpected showers or windy drives.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Shorts (1–2):</strong> For relaxing at camp during the heat of the day.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Wide-brimmed hat:</strong> For sun protection on game drives and walks.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Comfortable walking shoes or hiking boots:</strong> Closed-toe, sturdy, and broken-in.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Sandals or flip-flops:</strong> For use around camp or at the pool.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Swimsuit:</strong> Many lodges and camps have pools.
            </div>
          </li>
        </ul>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8 flex gap-4">
          <Sun className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-semibold text-primary mb-2">Color Matters</h4>
            <p className="mb-0 leading-relaxed">
              Choose neutral earth tones (khaki, olive, brown) to blend in with the environment and avoid attracting insects. Avoid bright colors and camouflage patterns (the latter can be illegal in some countries).
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-primary mt-16 mb-6">
          Gear & Safari Essentials
        </h2>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Daypack or small backpack:</strong> For carrying water, camera, and personal items on drives and walks.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Soft-sided duffel bag:</strong> Preferred for light aircraft transfers; easier to stow than hard cases.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Binoculars (8x42 or 10x42):</strong> Essential for spotting distant wildlife.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Camera with zoom lens:</strong> For capturing those unforgettable moments.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Spare batteries and memory cards:</strong> Power and storage can be limited in remote camps.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Travel adapter and power bank:</strong> Check plug types for your destination.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Reusable water bottle:</strong> Stay hydrated and reduce plastic waste.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Headlamp or flashlight:</strong> For moving around camp at night.
            </div>
          </li>
        </ul>

        <div className="bg-muted/30 p-6 rounded-xl mb-6 border border-muted">
          <div className="flex items-center gap-3 mb-3">
            <Camera className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-lg">Photography Tip</h4>
          </div>
          <p className="mb-0">
            Bring a beanbag or small tripod for steady shots in safari vehicles. Dust covers are also useful for protecting your gear.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-primary mt-16 mb-6">
          Health, Safety & Personal Items
        </h2>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Prescription medications & copies of scripts:</strong> Carry enough for your entire trip.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Basic first-aid kit:</strong> Include plasters, antiseptic, painkillers, antihistamines, and motion sickness tablets.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">High-SPF sunscreen & lip balm:</strong> The African sun is strong, even on cloudy days.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Insect repellent (DEET-based):</strong> For mosquitoes and tsetse flies.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Malaria prophylaxis (if recommended):</strong> Consult your doctor before travel.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Hand sanitizer & wet wipes:</strong> Useful for freshening up on the go.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Toiletries in travel sizes:</strong> Camps often provide basics, but bring your favorites.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Travel insurance documents:</strong> Print and digital copies.
            </div>
          </li>
        </ul>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 my-8 flex gap-4">
          <Umbrella className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-semibold text-primary mb-2">Stay Healthy</h4>
            <p className="mb-0 leading-relaxed">
              Check vaccination requirements and health advisories for your safari destination well in advance. Carry a yellow fever certificate if needed.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-primary mt-16 mb-6">
          Important Documents & Money
        </h2>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Passport (with at least 6 months validity):</strong> Plus required visas.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Travel insurance policy:</strong> Essential for medical emergencies and trip interruptions.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Credit/debit cards and some cash (USD/EUR):</strong> ATMs are rare in remote areas; small bills are useful for tips.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <strong className="text-primary">Copies of important documents:</strong> Both digital and paper, stored separately from originals.
            </div>
          </li>
        </ul>

        <h2 className="text-3xl font-bold text-primary mt-16 mb-6">
          Optional Extras for Added Comfort
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong className="text-primary">Travel pillow and eye mask:</strong> For long flights and transfers.</li>
          <li><strong className="text-primary">Small lock for your bag:</strong> Extra security for shared vehicles or camps.</li>
          <li><strong className="text-primary">Notebook or journal:</strong> Capture your safari memories.</li>
          <li><strong className="text-primary">Guidebook or wildlife checklist:</strong> Enhance your wildlife spotting skills.</li>
          <li><strong className="text-primary">Snacks and energy bars:</strong> For long days in the bush.</li>
        </ul>

        <blockquote className="bg-muted p-6 rounded-lg my-8 border-l-4 border-primary italic">
          "Pack light, pack smart, and remember: the best safari memories are made with open eyes and an open heart."
          <cite className="block mt-2 text-sm not-italic">— Safari Overland Team</cite>
        </blockquote>

        <div className="bg-muted/30 p-6 rounded-xl mb-6 border border-muted">
          <div className="flex items-center gap-3 mb-3">
            <Luggage className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-lg">Quick Reference: Safari Packing Table</h4>
          </div>
          <div className="overflow-hidden rounded-xl border border-muted mt-4">
            <table className="w-full border-collapse min-w-full">
              <thead>
                <tr className="bg-primary/10">
                  <th className="text-left p-3 border-b border-muted font-semibold">Category</th>
                  <th className="text-left p-3 border-b border-muted font-semibold">Items</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-muted/40 transition-colors">
                  <td className="p-3 border-b border-muted">Clothing</td>
                  <td className="p-3 border-b border-muted">Shirts, trousers, jacket, hat, shoes, swimsuit</td>
                </tr>
                <tr className="hover:bg-muted/40 transition-colors">
                  <td className="p-3 border-b border-muted">Gear</td>
                  <td className="p-3 border-b border-muted">Daypack, duffel, binoculars, camera, power bank</td>
                </tr>
                <tr className="hover:bg-muted/40 transition-colors">
                  <td className="p-3 border-b border-muted">Health</td>
                  <td className="p-3 border-b border-muted">Medications, first-aid, sunscreen, repellent</td>
                </tr>
                <tr className="hover:bg-muted/40 transition-colors">
                  <td className="p-3 border-b border-muted">Documents</td>
                  <td className="p-3 border-b border-muted">Passport, insurance, cash, cards, copies</td>
                </tr>
                <tr className="hover:bg-muted/40 transition-colors">
                  <td className="p-3">Extras</td>
                  <td className="p-3">Pillow, snacks, guidebook, journal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackingListPage; 