import type { Metadata } from "next"
import {
  Eyebrow,
  SectionRule,
  NumberedList,
  PullQuote,
  EditorialHeader,
  EditorialFooter,
  ListingHero,
  ListingCardEditorial,
  StickyCTA,
} from "@/components/editorial"

export const metadata: Metadata = {
  title: "Design review — Editorial primitives",
  description: "Internal QA surface for Phase 1 components.",
  robots: { index: false, follow: false },
}

const fakeAmenities = [
  { title: "Open vehicle game drives", body: "Twice daily, in private 6-seater Land Cruisers." },
  { title: "Walking safaris", body: "Half-day with two armed guides." },
  { title: "Mokoro excursions", body: "Subject to water levels — peak May to August." },
  { title: "Private deck plunge pool", body: "All suites; heated April through September." },
  { title: "Spa & sundowner deck", body: "Treatment menu rotates with the seasons." },
  { title: "Children's programme", body: "Ages 6+, supervised tracking and bush craft." },
]

const fakeListings = [
  {
    href: "#",
    index: 1,
    eyebrow: "Lodges",
    title: "Vumbura Plains, Okavango Delta",
    lede: "Wilderness Safaris' flagship water camp. Three nights minimum, fly-in only, peak game viewing May to October.",
    location: "Botswana · NG-22 concession",
    price: "From $1,890/night",
    category: "lodges",
    imageUrl: null,
  },
  {
    href: "#",
    index: 2,
    eyebrow: "Walking safaris",
    title: "Kakuli Bush Camp, South Luangwa",
    lede: "Norman Carr Safaris' walking-led camp on the Luangwa River. Three to four-night stays; the spiritual home of the African walking safari.",
    location: "Zambia · South Luangwa National Park",
    price: "From $720/night",
    category: "lodges",
    imageUrl: null,
  },
  {
    href: "#",
    index: 3,
    eyebrow: "Conservation",
    title: "Saruni Rhino, Sera Conservancy",
    lede: "Tracking black rhino on foot in the only community-owned conservancy with a free-ranging rhino population.",
    location: "Kenya · Northern Rangelands",
    price: "From $580/night",
    category: "lodges",
    imageUrl: null,
  },
]

export default function DesignReviewPage() {
  return (
    <>
      <EditorialHeader />

      <main>
        {/* ─── Type & primitive specimens ───────────────────────── */}
        <section className="container py-16 md:py-24">
          <Eyebrow withRule>Phase 1 — primitives</Eyebrow>
          <h1 className="font-serif text-h1-fluid text-bone mt-6 mb-3 text-balance">
            Editorial primitives, in context.
          </h1>
          <p className="font-serif italic text-h4-fluid text-bone-mute max-w-2xl">
            Visual QA surface for the components every Phase 2+ page will depend on.
            One of each, in a believable layout.
          </p>
        </section>

        {/* ─── Type scale ───────────────────────────────────────── */}
        <section className="container py-12 border-t border-rule">
          <Eyebrow className="mb-8">Type scale</Eyebrow>
          <div className="space-y-8">
            <div>
              <p className="mono text-bone-mute mb-2">display-fluid · serif</p>
              <p className="font-serif text-display-fluid text-bone leading-none text-balance">
                Africa, slowly.
              </p>
            </div>
            <div>
              <p className="mono text-bone-mute mb-2">h1-fluid · serif</p>
              <p className="font-serif text-h1-fluid text-bone leading-tight text-balance">
                A directory of operators, lodges, and field notes.
              </p>
            </div>
            <div>
              <p className="mono text-bone-mute mb-2">h2-fluid · serif italic</p>
              <p className="font-serif italic text-h2-fluid text-amber leading-tight text-balance">
                The kind of trips we&apos;d want to take ourselves.
              </p>
            </div>
            <div>
              <p className="mono text-bone-mute mb-2">h3-fluid · serif</p>
              <p className="font-serif text-h3-fluid text-bone leading-tight">
                Walking safaris in the Luangwa
              </p>
            </div>
            <div>
              <p className="mono text-bone-mute mb-2">eyebrow · sans · 0.22em</p>
              <p className="eyebrow">Field notes · 04 / 12</p>
            </div>
            <div>
              <p className="mono text-bone-mute mb-2">mono · 0.16em</p>
              <p className="mono text-bone">May 2026 · season opens</p>
            </div>
            <div>
              <p className="mono text-bone-mute mb-2">body · sans · 16px</p>
              <p className="text-bone leading-relaxed max-w-2xl">
                The relationship between what you pay and what you see in the bush is not linear.
                A $400-per-night camp in Hwange or South Luangwa can deliver wildlife encounters
                that match anywhere on earth.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Eyebrow ──────────────────────────────────────────── */}
        <section className="container py-12 border-t border-rule">
          <Eyebrow className="mb-8">Eyebrow</Eyebrow>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <Eyebrow>Plain</Eyebrow>
              <p className="text-bone-mute mt-2 text-sm">No rule.</p>
            </div>
            <div>
              <Eyebrow withRule>With rule</Eyebrow>
              <p className="text-bone-mute mt-2 text-sm">Hairline lead-in.</p>
            </div>
            <div>
              <Eyebrow withRule>04 — Plan</Eyebrow>
              <p className="text-bone-mute mt-2 text-sm">Numbered chapter.</p>
            </div>
          </div>
        </section>

        {/* ─── SectionRule ──────────────────────────────────────── */}
        <section className="container py-12 border-t border-rule">
          <Eyebrow className="mb-8">SectionRule</Eyebrow>
          <div className="space-y-10">
            <SectionRule />
            <SectionRule label="In season" />
            <SectionRule index={2} total={4} />
          </div>
        </section>

        {/* ─── NumberedList ─────────────────────────────────────── */}
        <section className="container py-12 border-t border-rule">
          <div className="flex items-end justify-between mb-8">
            <Eyebrow>NumberedList</Eyebrow>
            <p className="mono text-bone-mute">06 items</p>
          </div>
          <NumberedList items={fakeAmenities} />
        </section>

        {/* ─── PullQuote ────────────────────────────────────────── */}
        <section className="container py-12 border-t border-rule">
          <Eyebrow className="mb-8">PullQuote</Eyebrow>
          <PullQuote attribution="James, head guide · stayed three nights in May 2024">
            We left at first light, walked nine kilometres along an elephant path, stopped only
            because a leopard had stopped first.
          </PullQuote>
          <div className="mt-12">
            <PullQuote
              size="sm"
              attribution="Field note 04"
            >
              Trust the guide. Always.
            </PullQuote>
          </div>
        </section>

        {/* ─── ListingHero ──────────────────────────────────────── */}
        <section>
          <ListingHero
            breadcrumbs={[
              { href: "/", label: "Home" },
              { href: "/categories", label: "Lodges" },
              { href: "#", label: "Vumbura Plains" },
            ]}
            category="Lodge"
            location="Botswana · Okavango Delta"
            title="Vumbura Plains"
            lede="Wilderness Safaris' flagship water camp on the NG-22 concession. Three nights minimum, fly-in only, peak game viewing May to October."
            imageUrl={null}
          />
        </section>

        {/* ─── ListingCardEditorial ─────────────────────────────── */}
        <section className="container py-16">
          <div className="flex items-end justify-between mb-12">
            <Eyebrow>ListingCardEditorial</Eyebrow>
            <p className="mono text-bone-mute">03 examples</p>
          </div>
          <div>
            {fakeListings.map((l) => (
              <ListingCardEditorial key={l.title} {...l} />
            ))}
          </div>
        </section>

        {/* ─── Buttons / shadcn token QA ────────────────────────── */}
        <section className="container py-12 border-t border-rule">
          <Eyebrow className="mb-8">shadcn primitives — token QA</Eyebrow>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <button className="bg-amber text-night px-6 py-3 mono hover:bg-amber-deep transition-colors">
                Primary CTA
              </button>
              <button className="border border-rule text-bone px-6 py-3 mono hover:border-amber hover:text-amber transition-colors">
                Outline
              </button>
              <button className="text-bone-mute px-6 py-3 mono hover:text-amber transition-colors">
                Ghost
              </button>
              <button className="bg-flame text-bone px-6 py-3 mono hover:opacity-90 transition-opacity">
                Destructive
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="bg-card border border-rule px-3 py-1 mono text-bone-mute">
                Card chip
              </span>
              <span className="bg-amber/15 border border-amber/40 px-3 py-1 mono text-amber">
                Featured
              </span>
              <span className="bg-moss/15 border border-moss/40 px-3 py-1 mono text-moss">
                In season
              </span>
              <span className="bg-flame/15 border border-flame/40 px-3 py-1 mono text-flame">
                Closed
              </span>
            </div>
          </div>
        </section>

        {/* ─── StickyCTA — only renders on mobile ───────────────── */}
        <section className="container py-12 border-t border-rule pb-32">
          <Eyebrow className="mb-4">StickyCTA</Eyebrow>
          <p className="text-bone-mute max-w-xl">
            Mobile-only sticky bottom bar. Resize the viewport below the lg breakpoint to see it
            mounted at the foot of the page.
          </p>
        </section>
      </main>

      <EditorialFooter />

      <StickyCTA href="#" price="From $1,890" label="Add to plan" />
    </>
  )
}
