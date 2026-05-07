import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"

export const metadata: Metadata = {
  title: "Atlas | Safari Overland",
  description:
    "An atlas of African safari regions — East, Southern, West and North. Field-noted by region.",
}

const REGIONS = [
  {
    slug: "east-africa",
    label: "East Africa",
    image: "/images/destinations/east-africa.jpg",
    countries: "Kenya · Tanzania · Uganda · Rwanda",
    lede: "Open plains, big cats, the Great Migration. The classic safari image — and where most first-timers go.",
    highlights: ["Migration", "Gorilla trekking", "Serengeti", "Ngorongoro"],
    tagline: "Big country, big herds, big distances.",
  },
  {
    slug: "southern-africa",
    label: "Southern Africa",
    image: "/images/destinations/southern-africa.jpg",
    countries: "Botswana · South Africa · Namibia · Zimbabwe · Zambia",
    lede: "From the Okavango to the Namib. Walking-led safaris, malaria-free reserves, and the most varied scenery in Africa.",
    highlights: ["Okavango Delta", "Walking safaris", "Victoria Falls", "Namib desert"],
    tagline: "More variety, more value, fewer crowds.",
  },
  {
    slug: "west-africa",
    label: "West Africa",
    image: "/images/destinations/west-africa.jpg",
    countries: "Ghana · Senegal · Nigeria · Benin",
    lede: "Less-traveled, culturally rich. Coastal reserves, forest elephants, and birding that punches well above its weight.",
    highlights: ["Mole NP", "Pendjari NP", "Coastal reserves", "Cultural depth"],
    tagline: "The continent's most under-rated safari corridor.",
  },
  {
    slug: "north-africa",
    label: "North Africa",
    image: "/images/destinations/north-africa.jpg",
    countries: "Morocco · Egypt · Tunisia",
    lede: "Desert and antiquity. Sahara expeditions, oasis ecosystems, Atlas raptors and Mediterranean migration corridors.",
    highlights: ["Sahara", "Atlas Mountains", "Birding migrations", "Desert wildlife"],
    tagline: "Wildlife in landscapes that read more ancient than wild.",
  },
] as const

export default function DestinationsAtlasPage() {
  return (
    <>
      {/* ─── Atlas opening ─────────────────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow withRule>Atlas — 04 regions</Eyebrow>
          <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
            The continent, by{" "}
            <span className="italic text-amber">region</span>.
          </h1>
          <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
            Africa is not one safari. It&apos;s four — each with its own season, its own
            rhythm, its own answer to the same question. Pick where you&apos;re drawn.
          </p>
        </div>
      </section>

      <SectionRule className="container" />

      {/* ─── Region cards (full-bleed) ─────────────────────────── */}
      <section>
        {REGIONS.map((region, i) => (
          <Link
            key={region.slug}
            href={`/destinations/${region.slug}`}
            className="group block relative overflow-hidden border-t border-rule"
          >
            <div className="relative h-[60vh] min-h-[420px] w-full">
              <Image
                src={region.image}
                alt={region.label}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/40 to-night/0"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-night"
              />

              <div className="container relative h-full flex flex-col justify-end pb-14 md:pb-20">
                <div className="max-w-2xl">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="mono text-amber" aria-hidden>
                      {String(i + 1).padStart(2, "0")} / {String(REGIONS.length).padStart(2, "0")}
                    </span>
                    <span className="eyebrow">{region.countries}</span>
                  </div>
                  <h2 className="font-serif text-h1-fluid text-bone leading-[0.96] tracking-tighter text-balance group-hover:text-amber transition-colors">
                    {region.label}
                  </h2>
                  <p className="mt-4 font-serif italic text-h4-fluid text-bone-mute leading-snug max-w-xl">
                    {region.tagline}
                  </p>
                  <p className="mt-4 text-bone-mute leading-relaxed max-w-xl hidden md:block">
                    {region.lede}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {region.highlights.map((h) => (
                      <span
                        key={h}
                        className="mono text-bone-mute border border-rule px-2 py-1"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <p className="mt-8 mono text-amber transition-colors group-hover:text-amber-deep">
                    Open the chapter →
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* ─── Practical companion ──────────────────────────────── */}
      <section className="border-t border-rule bg-ink py-24 md:py-32">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Plan with the calendar</Eyebrow>
              <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                When to go is a bigger decision than where.
              </h2>
              <p className="mt-6 text-bone-mute leading-relaxed max-w-xl">
                The same park can be exceptional in July and underwhelming in March.
                We track conditions month-by-month so you&apos;re not guessing.
              </p>
              <div className="mt-8">
                <Link
                  href="/resources/seasonal-guides"
                  className="mono text-amber hover:text-amber-deep transition-colors"
                >
                  Seasonal guides →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-0">
                {[
                  ["Dry season", "Jun–Oct", "Animals at water. Best big-game viewing. Premium pricing."],
                  ["Green season", "Nov–Apr", "Lush, dramatic, fewer vehicles. Some camps closed."],
                  ["Migration peak", "Jul–Oct", "Mara crossings. Book 9–12 months ahead."],
                  ["Shoulder", "May & Nov", "Best balance of price, weather, and viewing."],
                ].map(([when, months, body]) => (
                  <li
                    key={when}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-4 border-t border-rule py-6"
                  >
                    <p className="font-serif text-2xl italic text-amber sm:col-span-3">{when}</p>
                    <p className="mono text-bone-mute sm:col-span-2">{months}</p>
                    <p className="text-bone-mute leading-relaxed sm:col-span-7">{body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
