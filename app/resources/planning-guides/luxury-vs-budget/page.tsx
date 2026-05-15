import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DollarSign, Star, ArrowLeft, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury vs Budget Safari Guide | Safari Overland',
  description:
    'A frank, practical comparison of luxury, mid-range and budget safaris in Africa — what you actually get at each price point and how to maximise value at any budget.',
  keywords:
    'luxury safari, budget safari, affordable safari, safari cost comparison, safari value, safari accommodation options, safari price points',
};

const tiers = [
  {
    name: 'Budget',
    price: '$150–$350 per person per day',
    summary: 'Group tours, public campsites, self-drive, overland trucks.',
    youGet: [
      'Shared safari vehicle, often with up to 7 fellow travelers',
      'Public-area camping or basic permanent tents with shared bathrooms',
      'Self-catering or simple buffet meals',
      'Limited flexibility — fixed group itinerary',
      'Driver-guide rather than specialist private guide',
    ],
    youGiveUp: [
      'Privacy and flexibility on game drives',
      'Off-road and night drives (only available in private concessions)',
      'Specialist guiding, photographic vehicles, walking safaris',
      "Down-time space — you're back in camp with the group",
    ],
    whoFor:
      'First safari, younger travelers, large groups, anyone whose priority is "get me into the bush at all" rather than "give me the perfect bush experience".',
  },
  {
    name: 'Mid-range',
    price: '$400–$800 per person per day',
    summary: 'Tented camps, small lodges, semi-private safaris, well-known parks.',
    youGet: [
      'Smaller vehicle (4–6 guests), often a window or open seat',
      'En-suite tents or rooms in established camps and lodges',
      'Full board with set menus, often a local-international hybrid',
      'Two game drives a day with a qualified guide',
      "Some flexibility on timing within the lodge's structure",
    ],
    youGiveUp: [
      "Truly private guiding (you'll often share a vehicle)",
      'Access to the most exclusive private concessions',
      'Premium add-ons like helicopter transfers or champagne sundowners',
    ],
    whoFor:
      'The sweet spot for most travelers. You get a real safari experience — proper guides, good vehicles, comfortable nights — without paying for the marble bathtub.',
  },
  {
    name: 'Luxury',
    price: '$900–$2,500+ per person per day',
    summary: 'Private concessions, fly-in camps, premium lodges, fully bespoke trips.',
    youGet: [
      'Private vehicle and guide, off-road driving, night drives, walking safaris',
      'Tented suites or villas with plunge pools, indoor and outdoor showers, butler service',
      'Excellent food and wine; chef can adapt to dietary needs',
      'Helicopter or charter-flight access to remote wilderness areas',
      'Specialist guides — photography, birding, conservation researchers',
    ],
    youGiveUp: [
      'Cost certainty — small extras (drinks, transfers, park fees) compound quickly',
      'Spontaneity — peak-season camps book out 12+ months ahead',
    ],
    whoFor:
      'Returning safari-goers, special occasions, photographers and serious birders, travelers with limited time who want to compress experience into fewer days.',
  },
];

const LuxuryVsBudgetPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Luxury vs Budget Safaris</h1>
        <p className="text-lg text-muted-foreground">
          What you actually get at each price point — and how to spend smart at any budget.
        </p>
      </div>

      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-[360px] rounded-lg overflow-hidden">
          <Image
            src="/images/planning-guides/budgeting/budget-vs-luxury.jpg"
            alt="Comparison of a luxury safari lodge and a budget tented camp"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-3">Price doesn't equal experience</h2>
          <p className="mb-3">
            The relationship between what you pay and what you see in the bush is not linear. A $400-per-night camp in
            Hwange or South Luangwa can deliver wildlife encounters that match anywhere on earth. A $1,800-per-night
            lodge gets you better linen, faster Wi-Fi and a much shorter walk to the bar.
          </p>
          <p className="text-muted-foreground">
            What luxury really buys is access — to private land, to specialist guides, and to logistics that compress
            travel time so more of your trip is spent at game. That can be worth a lot, or very little, depending on
            what you actually care about.
          </p>
        </div>
      </div>

      {/* The three tiers */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold mb-6">The three tiers, honestly described</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div key={tier.name} className="border rounded-lg p-6 flex flex-col">
              <h3 className="text-2xl font-bold text-primary mb-1">{tier.name}</h3>
              <p className="text-sm font-medium text-muted-foreground mb-3">{tier.price}</p>
              <p className="mb-4">{tier.summary}</p>

              <div className="mb-4">
                <h4 className="font-semibold flex items-center gap-1.5 mb-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> What you get
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  {tier.youGet.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold flex items-center gap-1.5 mb-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-amber-500" /> What you give up
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  {tier.youGiveUp.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t">
                <h4 className="font-semibold mb-1 text-sm">Who it suits</h4>
                <p className="text-sm text-muted-foreground">{tier.whoFor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Where to splurge */}
      <section className="mb-14 bg-muted rounded-lg p-6 md:p-8">
        <h2 className="text-3xl font-bold mb-4">Where to splurge, where to save</h2>
        <p className="mb-6 text-muted-foreground">
          Most travelers get the best trip by mixing tiers across a single itinerary. A typical pattern: budget for the
          arrival/transit nights, mid-range for the bulk of the bush time, one luxury splurge for a signature
          experience.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" /> Worth paying up for
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Private guiding in a top concession.</strong> Off-road driving and walking with a senior guide
                changes the experience entirely.
              </li>
              <li>
                <strong>Fly-in to remote areas.</strong> Botswana's Okavango, Zambia's Lower Zambezi — the road
                alternative eats two days of your trip.
              </li>
              <li>
                <strong>Specialist photographic vehicles</strong> if you're serious about the camera. Dedicated bean
                bags, charging points, and only three guests on board.
              </li>
              <li>
                <strong>Gorilla trekking permits.</strong> No way around the cost — but pair them with comfortable
                lodging since trekking days are exhausting.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" /> Don't over-pay for
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>City nights.</strong> Nairobi or Johannesburg airport hotels — book the cheapest reasonable
                option. You'll be there for nine hours.
              </li>
              <li>
                <strong>The first and last bush night.</strong> Travel days; you won't use the lodge's amenities.
              </li>
              <li>
                <strong>Big-name parks during peak.</strong> A premium lodge inside the Mara during Migration costs
                more than a private conservancy next door — with worse off-road rules.
              </li>
              <li>
                <strong>"Brand" lodges.</strong> A few well-marketed groups charge a premium that doesn't reflect a
                better experience. Compare per-camp on independent reviews.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Maximise value */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold mb-4">Practical ways to maximise value at any budget</h2>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>Travel just outside peak.</strong> June and November in Southern Africa offer near-peak game
              viewing at 30–40% off shoulder rates.
            </span>
          </li>
          <li className="flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>Stay longer in fewer places.</strong> Three nights minimum at each camp. Two-night stays burn
              half a day in transfers and you never settle in.
            </span>
          </li>
          <li className="flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>Use private conservancies bordering big parks.</strong> Same wildlife, far fewer vehicles, and
              the rules allow off-road driving and night drives that the national parks don't.
            </span>
          </li>
          <li className="flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>Book through a specialist agent.</strong> Good agents have rates you can't access directly and
              know which lodges are over- or under-priced this season.
            </span>
          </li>
          <li className="flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>Self-drive where it works.</strong> South Africa's Kruger and Namibia's Etosha are world-class
              parks where a self-drive trip costs a fraction of a guided fly-in.
            </span>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="mb-12 bg-primary text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Need help matching budget to experience?</h2>
        <p className="mb-5 max-w-2xl mx-auto">
          Tell us your budget, dates, and what matters most. We'll point you at operators we'd send our friends to,
          who deliver real value at your price point — no paid placement, ever.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-primary font-medium px-6 py-3 rounded-lg hover:bg-white/90"
        >
          Contact our planners
        </Link>
      </section>

      {/* Footer nav */}
      <div className="mt-8 flex items-center justify-between border-t pt-6">
        <Link href="/resources/planning-guides" className="flex items-center text-primary hover:text-primary/80">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back to Planning Guides</span>
        </Link>
        <div className="flex space-x-4">
          <Link
            href="/resources/planning-guides/hidden-costs"
            className="text-primary hover:text-primary/80"
          >
            Related: Hidden Costs of Safari Travel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LuxuryVsBudgetPage;
