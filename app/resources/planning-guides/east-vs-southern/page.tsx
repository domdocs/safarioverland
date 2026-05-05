import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Compass, Calendar, DollarSign, Users, Camera, MapPin, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'East vs Southern Africa: Choosing Your Safari Destination | Safari Overland',
  description:
    'A practical, side-by-side comparison of East Africa and Southern Africa safari regions — wildlife, scenery, seasons, cost, accessibility — to help you decide where to go.',
  keywords:
    'east africa vs southern africa, safari destination comparison, serengeti vs kruger, masai mara vs okavango, safari regions, africa safari planning',
};

const EastVsSouthernPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3">
          East vs Southern Africa
        </h1>
        <p className="text-xl text-muted-foreground">
          Two extraordinary safari regions, two very different experiences. Here's how to choose between them.
        </p>
      </div>

      {/* Hero */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="relative h-[320px] rounded-lg overflow-hidden">
          <Image
            src="/images/planning-guides/destinations/east-vs-southern.jpg"
            alt="East and Southern Africa safari landscapes side by side"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-3">A region defines the trip</h2>
          <p className="mb-3">
            More than the lodge or the operator, the region you pick shapes nearly everything about your safari — the
            landscapes you'll see, the animals you're most likely to encounter, the style of vehicle you ride in, and
            even the rhythm of the days.
          </p>
          <p className="text-muted-foreground">
            This guide compares the two great safari regions across the things that actually matter when you're choosing.
          </p>
        </div>
      </div>

      {/* TL;DR */}
      <div className="bg-muted rounded-lg p-6 mb-12">
        <h2 className="text-xl font-bold mb-3">The short version</h2>
        <ul className="space-y-2 text-base">
          <li className="flex gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>East Africa</strong> (Kenya, Tanzania, Uganda, Rwanda) — best for sheer wildlife density, the
              Great Migration, gorilla trekking, and the iconic open-savanna safari.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>Southern Africa</strong> (Botswana, South Africa, Namibia, Zimbabwe, Zambia) — best for varied
              landscapes, walking safaris, self-drive options, malaria-free family trips, and generally better value.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>
              First-time safari-goer chasing the classic image? Lean East. Returning traveler, family, or honeymoon
              with broader interests? Lean Southern.
            </span>
          </li>
        </ul>
      </div>

      {/* Side-by-side comparison */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold mb-6">Side-by-side comparison</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-semibold">East Africa</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Kenya · Tanzania · Uganda · Rwanda</p>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-semibold">Signature parks</dt>
                <dd className="text-muted-foreground">Maasai Mara, Serengeti, Ngorongoro Crater, Amboseli, Bwindi.</dd>
              </div>
              <div>
                <dt className="font-semibold">Landscape</dt>
                <dd className="text-muted-foreground">
                  Vast, treeless plains. Open horizons, acacia trees, dramatic escarpments. The classic safari image.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Wildlife highlight</dt>
                <dd className="text-muted-foreground">
                  The Great Migration — 1.5 million wildebeest moving in a circular pattern through the Serengeti–Mara
                  ecosystem. Mountain gorillas in Uganda and Rwanda. Tree-climbing lions.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Game density</dt>
                <dd className="text-muted-foreground">
                  Exceptional, especially during migration months. Big herds visible at distance.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Vehicle style</dt>
                <dd className="text-muted-foreground">
                  Closed 4x4 with pop-top roof. You stand to view; sides stay closed.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Walking safaris</dt>
                <dd className="text-muted-foreground">Limited and tightly regulated.</dd>
              </div>
              <div>
                <dt className="font-semibold">Self-drive</dt>
                <dd className="text-muted-foreground">Not recommended for most travelers.</dd>
              </div>
              <div>
                <dt className="font-semibold">Malaria risk</dt>
                <dd className="text-muted-foreground">Present in most safari areas year-round.</dd>
              </div>
              <div>
                <dt className="font-semibold">Typical cost</dt>
                <dd className="text-muted-foreground">
                  Higher. Park fees alone in the Serengeti and Ngorongoro can exceed $200 per person per day.
                </dd>
              </div>
            </dl>
          </div>

          <div className="border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-semibold">Southern Africa</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Botswana · South Africa · Namibia · Zimbabwe · Zambia
            </p>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-semibold">Signature parks</dt>
                <dd className="text-muted-foreground">
                  Okavango Delta, Chobe, Kruger, Hwange, South Luangwa, Etosha, Sossusvlei.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Landscape</dt>
                <dd className="text-muted-foreground">
                  Hugely varied — Kalahari sands, Okavango wetlands, Namib dunes, miombo woodland, fynbos coastline.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Wildlife highlight</dt>
                <dd className="text-muted-foreground">
                  Africa's largest elephant populations (Chobe, Hwange). Black and white rhino. Wild dog. Leopard.
                  Excellent predator viewing.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Game density</dt>
                <dd className="text-muted-foreground">
                  High in core parks; more variable in wilderness areas — but the bush experience is more intimate.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Vehicle style</dt>
                <dd className="text-muted-foreground">
                  Open-sided 4x4. You sit at eye level with the bush. Mokoro (canoe) and boat safaris are common.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Walking safaris</dt>
                <dd className="text-muted-foreground">
                  A core offering. South Luangwa is the spiritual home of the walking safari.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Self-drive</dt>
                <dd className="text-muted-foreground">
                  Excellent in South Africa, Namibia, and Botswana. Well-marked roads, established camps.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Malaria risk</dt>
                <dd className="text-muted-foreground">
                  Many premium reserves are malaria-free (Madikwe, Welgevonden, parts of Eastern Cape).
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Typical cost</dt>
                <dd className="text-muted-foreground">
                  More flexible. Self-drive in South Africa can be done on a modest budget; Botswana fly-in is among
                  the most expensive safaris in Africa.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Decision tool */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold mb-6">Which is right for you?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: <Camera className="h-5 w-5 text-primary" />,
              title: 'I want the classic safari image',
              answer: 'East Africa — open plains, big herds, the Migration.',
            },
            {
              icon: <Compass className="h-5 w-5 text-primary" />,
              title: 'I want variety in one trip',
              answer:
                'Southern Africa — combine desert (Namibia), delta (Botswana), and falls (Zimbabwe) in two weeks.',
            },
            {
              icon: <Users className="h-5 w-5 text-primary" />,
              title: 'I\'m bringing kids',
              answer:
                'Southern Africa — malaria-free reserves, shorter flight times within the region, more accommodation choice.',
            },
            {
              icon: <DollarSign className="h-5 w-5 text-primary" />,
              title: 'I\'m on a tight budget',
              answer:
                'South Africa self-drive (Kruger) or a Kenya group tour are the two most cost-effective ways onto safari.',
            },
            {
              icon: <Calendar className="h-5 w-5 text-primary" />,
              title: 'I want gorillas',
              answer: 'East Africa — Uganda (Bwindi) or Rwanda (Volcanoes National Park).',
            },
            {
              icon: <Compass className="h-5 w-5 text-primary" />,
              title: 'I want to walk in the bush',
              answer: 'Southern Africa — Zambia\'s South Luangwa, Zimbabwe\'s Mana Pools.',
            },
          ].map((item) => (
            <div key={item.title} className="border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* When to go */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold mb-6">Best time to go</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3">Region</th>
                <th className="text-left p-3">Peak game viewing</th>
                <th className="text-left p-3">Avoid</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3 font-medium">East Africa (Kenya / Tanzania)</td>
                <td className="p-3">July–October (Migration in Mara), January–February (calving in Serengeti)</td>
                <td className="p-3">April–May long rains</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-medium">Southern Africa (Bots / Zim / Zam)</td>
                <td className="p-3">May–October dry season — animals concentrate at water</td>
                <td className="p-3">December–March wet season for game viewing (great for birds though)</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-medium">Gorilla trekking (Uganda / Rwanda)</td>
                <td className="p-3">June–September, December–February (drier trails)</td>
                <td className="p-3">March–May (very wet, slippery)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Can you combine? */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold mb-4">Can you combine both?</h2>
        <p className="mb-3">
          Yes, but it stretches a trip. Most travelers do best picking one region and going deeper, then returning for
          the other on a future visit. If you do combine, the easiest itineraries fly Nairobi → Johannesburg or Kigali →
          Cape Town and treat the two halves as separate trips with a shared start and end.
        </p>
        <p className="text-muted-foreground">
          A two-week budget is the practical minimum for a combined trip; three weeks is more comfortable.
        </p>
      </section>

      {/* Footer nav */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link href="/resources/planning-guides" className="flex items-center text-primary hover:text-primary/80">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back to Planning Guides</span>
        </Link>
        <div className="flex space-x-4">
          <Link
            href="/resources/planning-guides/choosing-destinations"
            className="text-primary hover:text-primary/80"
          >
            Related: Choosing Your Destination
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EastVsSouthernPage;
