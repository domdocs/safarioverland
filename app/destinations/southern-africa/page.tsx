import type { Metadata } from "next"
import Link from "next/link"

import { Eyebrow } from "@/components/editorial/eyebrow"
import { NumberedList } from "@/components/editorial/numbered-list"
import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { OverviewMap } from "@/components/maps/overview-map"
import { RouteHoverProvider } from "@/components/maps/route-hover"
import { CaptionedImage } from "@/components/media/captioned-image"
import { FullBleedImage } from "@/components/media/full-bleed-image"
import { HeroMedia } from "@/components/media/hero-media"
import { Mosaic } from "@/components/media/mosaic"
import { NumbersStrip, type NumberItem } from "@/components/media/numbers-strip"
import { Button } from "@/components/ui/button"
import { getMedia } from "@/lib/relaunch/media-select"
import { ROUTES } from "@/lib/relaunch/routes"
import { cn } from "@/lib/utils"

const SITE = "https://safarioverland.com"
const PAGE_URL = `${SITE}/destinations/southern-africa`

const TITLE = "Southern Africa: a self-drive safari guide"
const DESCRIPTION =
  "What it is like to drive yourself through Zimbabwe, Namibia, Botswana and Zambia, when to go, and the lodge-based routes we plan, with a road book for each day."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    images: [{ url: getMedia("damaraland-gravel-road").src }],
  },
}

/*
 * Self-drive rewrite (D-48). Every fact here comes from the route
 * records (lib/relaunch/data/*.json), the research notes
 * (handoff/relaunch/research/) or the Field Notes sources
 * (handoff/relaunch/copy/field-notes/). South Africa is left out: no
 * routes there yet. Captions come from lib/relaunch/media-select.ts.
 */

// From the three route records: 3 routes; countries across them
// (four-corners lists Zimbabwe, Botswana, Namibia and Zambia); nights
// 8–10, 10–12 and 14–16; all three give May to October as best months.
const NUMBERS: NumberItem[] = [
  { value: "3", label: "Signature routes" },
  { value: "4", label: "Countries" },
  { value: "8–16", label: "Nights" },
  { value: "May–Oct", label: "Best months" },
]

type Country = {
  id: string
  eyebrow: string
  heading: { lead: string; accent: string; tail: string }
  body: string
  /** Where the vehicle is handed over, from the route record. */
  handover: string
  image: string
  landing: { href: string; label: string }
  route: { href: string; label: string }
}

const COUNTRIES: Country[] = [
  {
    id: "zimbabwe",
    eyebrow: "Zimbabwe",
    heading: { lead: "Shorter days, deeper", accent: "guiding", tail: "." },
    body: "Mostly tar between Victoria Falls, Hwange and Bulawayo; the gravel and sand are inside the parks. Walking in Hwange, rhino tracked on foot in the Matobo Hills. Cash and fuel need a little planning.",
    handover: "Vehicle handed over in Victoria Falls",
    image: "hwange-elephant-zebra-waterhole",
    landing: { href: "/self-drive/zimbabwe", label: "Self-drive in Zimbabwe →" },
    route: { href: "/routes/zimbabwe-falls-hwange-matobo", label: "The route: Falls, Hwange, Matobo →" },
  },
  {
    id: "namibia",
    eyebrow: "Namibia",
    heading: { lead: "Space, and a lot of", accent: "gravel", tail: "." },
    body: "The most established self-drive country in the region. Most roads are gravel and the distances are long, so the days are drawn around them: the Kalahari, Sossusvlei, the coast, Damaraland and Etosha.",
    handover: "Collected and returned in Windhoek",
    image: "sossusvlei-dune-45-sunrise",
    landing: { href: "/self-drive/namibia", label: "Self-drive in Namibia →" },
    route: { href: "/routes/namibia-kalahari-to-etosha", label: "The route: Kalahari to Etosha →" },
  },
  {
    id: "botswana-zambia",
    eyebrow: "Botswana and Zambia",
    heading: { lead: "Where four countries meet on the", accent: "rivers", tail: "." },
    body: "Botswana's parks are deep-sand camping country, so we use it at the edges: Chobe from Kasane, by road and on the river, and the Okavango Delta by light aircraft from Maun. Zambia is the far bank at Victoria Falls, reached by road transfer.",
    handover: "Collected and returned in Kasane",
    image: "chobe-elephants-crossing",
    landing: { href: "/self-drive/botswana-zambia", label: "Self-drive in Botswana and Zambia →" },
    route: { href: "/routes/four-corners-falls-chobe-caprivi", label: "The route: Falls, Chobe, Caprivi →" },
  },
]

// Seasons, from each route record's best_months.
const SEASONS = [
  {
    label: "May–Oct",
    title: "The dry months.",
    body: "Cooler days, and game gathers at the waterholes in Hwange and Etosha as the bush dries out. The best time on all three routes.",
  },
  {
    label: "Jun–Aug",
    title: "On the rivers.",
    body: "Dry roads, and the rivers still high enough for boats along the Chobe and in the Zambezi Region.",
  },
  {
    label: "Nov–Mar",
    title: "Heat, then rain.",
    body: "Very hot at Sossusvlei from November. The rains come from around December, game spreads away from the water, and some lodge roads become 4×4-only.",
  },
]

export default function SouthernAfricaPage() {
  const hero = getMedia("damaraland-gravel-road")

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <HeroMedia still={hero} kenBurns height="flex min-h-[max(78vh,600px)] flex-col">
        <div className="container relative flex flex-1 flex-col justify-end pt-40 pb-20 md:pt-28 md:pb-24">
          <div className="max-w-4xl">
            <Eyebrow withRule>Southern Africa · self-drive</Eyebrow>
            <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
              Southern Africa, from the <span className="italic text-amber">driver&apos;s</span> seat.
            </h1>
            <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
              Three routes through Zimbabwe, Namibia and Botswana, with Zambia across the river from
              the Falls. A lodge at the end of each day&apos;s drive.
            </p>
          </div>
        </div>
      </HeroMedia>

      <section className="container pt-10">
        <NumbersStrip items={NUMBERS} />
      </section>

      {/* ─── What the driving is like, and the map ────────────── */}
      <RouteHoverProvider>
        <section className="container py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow withRule>The driving</Eyebrow>
              <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                On the left, and <span className="italic text-amber">never</span> after dark.
              </h2>
              <p className="mt-6 text-bone-mute leading-relaxed">
                Tar between the towns; gravel and sand in the parks and, in Namibia, most of the way.
                Days are timed to reach the lodge before the gates close. Our partners on the ground,
                in Victoria Falls, Kasane, Maun and Windhoek, hand over the vehicle and are a call away,
                day or night.
              </p>
            </div>
            <div className="lg:col-span-7">
              <OverviewMap titles={Object.fromEntries(ROUTES.map((r) => [r.slug, r.title]))} />
            </div>
          </div>
        </section>
      </RouteHoverProvider>

      {/* ─── One section per country ──────────────────────────── */}
      <div className="border-t border-rule">
        {COUNTRIES.map((c, i) => (
          <section key={c.id} id={c.id} className="container py-20 md:py-28">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <CaptionedImage
                item={getMedia(c.image)}
                aspect="aspect-[4/3]"
                sizes="(min-width: 1024px) 58vw, 100vw"
                card
                className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2")}
              />
              <div className="lg:col-span-5">
                <Eyebrow withRule>{c.eyebrow}</Eyebrow>
                <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                  {c.heading.lead} <span className="italic text-amber">{c.heading.accent}</span>
                  {c.heading.tail}
                </h2>
                <p className="mt-6 text-bone-mute leading-relaxed">{c.body}</p>
                <p className="mt-6 mono text-bone-mute">{c.handover}</p>
                <ul className="mt-8 space-y-3">
                  <li>
                    <Link href={c.landing.href} className="mono text-amber hover:text-bone transition-colors">
                      {c.landing.label}
                    </Link>
                  </li>
                  <li>
                    <Link href={c.route.href} className="mono text-amber hover:text-bone transition-colors">
                      {c.route.label}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      <FullBleedImage item={getMedia("hwange-dusk-pan")} kenBurns />

      {/* ─── Seasons, in brief ────────────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl mb-12">
          <Eyebrow withRule>When to go</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            The seasons, in <span className="italic text-amber">brief</span>.
          </h2>
        </div>
        <NumberedList
          items={SEASONS.map((s) => ({ label: s.label, title: s.title, body: s.body }))}
          className="max-w-5xl"
        />
      </section>

      <section className="container pb-24 md:pb-32">
        <Mosaic
          items={[getMedia("matobo-granite-kopjes"), getMedia("etosha-pan-edge"), getMedia("popa-falls-golden-light")]}
          label="Southern Africa"
        />
      </section>

      {/* ─── Brief CTA ────────────────────────────────────────── */}
      <FullBleedImage item={getMedia("fire-at-night")} height="min-h-[600px] md:min-h-[75vh]" position="50% 60%">
        <div className="flex min-h-[600px] items-center py-24 md:min-h-[75vh]">
          <div className="container max-w-3xl">
            <Eyebrow withRule>Make it yours</Eyebrow>
            <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              A route, drawn for <span className="italic text-amber">your</span> dates.
            </h2>
            <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
              Tell us when you can travel and how long you&apos;re happy at the wheel. We&apos;ll come
              back with three routes within 48 hours.
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                className="rounded-none px-8 py-6 mono h-auto max-w-full whitespace-normal text-center"
                asChild
              >
                <StartBriefLink source="destination-page">Start a brief →</StartBriefLink>
              </Button>
            </div>
            <p className="mt-6 mono text-bone-mute">Free, no commitment. About five minutes.</p>
          </div>
        </div>
      </FullBleedImage>
    </>
  )
}
