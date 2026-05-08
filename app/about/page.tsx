import Image from "next/image"
import Link from "next/link"

import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { NumberedList } from "@/components/editorial/numbered-list"
import { EditorialImage } from "@/components/editorial/editorial-image"
import { BlendOverlay } from "@/components/editorial/blend-overlay"

const PRINCIPLES = [
  {
    title: "We curate.",
    body: "Every operator is reviewed before publication. We list the people we'd send our friends to, not whoever paid for placement.",
  },
  {
    title: "We are honest.",
    body: "Crowded crossings, shoulder-season risks, hidden costs — we say it on the page rather than after you've booked.",
  },
  {
    title: "We are on the ground.",
    body: "Our editors visit, walk, and write from the parks themselves. The notes are field notes, not press releases.",
  },
]

const VALUES = [
  {
    title: "Authenticity over volume.",
    body: "Genuine, immersive trips with operators who know their patch — not mass-market product. We'd rather list fewer, better.",
  },
  {
    title: "Communities, then visitors.",
    body: "We favour operators who work closely with local communities, where tourism revenue stays in the place it was earned.",
  },
  {
    title: "Conservation as a brief.",
    body: "Field-level conservation is the long game. The operators we feature take it seriously — anti-poaching levies, habitat management, science partnerships, all on the page.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[78vh] min-h-[600px] w-full overflow-hidden bg-night">
        <Image
          src="/images/about/about-hero.jpg"
          alt="Sunrise over Victoria Falls — Safari Overland's home"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/30 to-night"
        />

        <div className="container relative h-full flex flex-col justify-end pb-20 md:pb-28">
          <div className="max-w-3xl">
            <Eyebrow withRule>About</Eyebrow>
            <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
              A directory{" "}
              <span className="italic text-amber">written from the bush</span>.
            </h1>
            <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
              Safari Overland is a small, opinionated directory of African safari operators,
              lodges, campsites, and the long-form planning notes we wish we&apos;d had on our
              first trip. Headquartered in Victoria Falls.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Principles manifesto ─────────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl mb-16">
          <Eyebrow withRule>What we promise to do properly</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            Three things,
            <span className="italic text-amber"> always</span>.
          </h2>
        </div>
        <NumberedList
          items={PRINCIPLES.map((p) => ({ title: p.title, body: p.body }))}
          twoColumn={false}
          className="max-w-4xl"
        />
      </section>

      <SectionRule className="container" />

      {/* ─── Mission + Vision (two-column editorial) ──────────── */}
      <section className="container py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Eyebrow>Mission</Eyebrow>
            <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              Connect travellers with safaris that stand up to scrutiny.
            </h2>
            <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute leading-snug">
              Authentic, responsible safari experiences across Africa — and the candid
              planning information that makes them work.
            </p>
            <p className="mt-6 text-bone-mute leading-relaxed">
              We believe exceptional safaris should be accessible to travellers at every
              budget tier, while protecting Africa&apos;s wildlife and the people who live
              alongside it. The directory brings together operators we&apos;ve walked through
              ourselves, vetted for quality and committed to sustainable practice.
            </p>
          </div>
          <div className="lg:col-span-6 lg:border-l lg:border-rule lg:pl-12">
            <Eyebrow>Vision</Eyebrow>
            <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              The most trusted independent safari resource on the continent.
            </h2>
            <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute leading-snug">
              A future where safari tourism is a real force for conservation and
              community development — not a marketing claim.
            </p>
            <p className="mt-6 text-bone-mute leading-relaxed">
              By steering travellers toward operators who do the work, we want the
              economics of the directory to point in the same direction as the conservation
              we care about. Visitors fund anti-poaching, communities, habitat management.
              The trip is the means.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Our home: Victoria Falls ─────────────────────────── */}
      <section className="border-t border-rule bg-ink py-24 md:py-32">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow withRule>Our home</Eyebrow>
              <h2 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance">
                Victoria Falls,
                <br />
                <span className="italic text-amber">Mosi-oa-Tunya</span>.
              </h2>
              <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute leading-snug max-w-2xl">
                The smoke that thunders. We chose to be based here — not London, not
                New York — because it puts us at the crossroads of the safari continent.
              </p>
              <p className="mt-6 text-bone-mute leading-relaxed max-w-2xl">
                From Victoria Falls we&apos;re a short flight from the Okavango, an
                afternoon&apos;s drive into Hwange, and within easy reach of the safari
                circuits of Zimbabwe, Zambia, Botswana, Namibia and South Africa. Most of
                our writers and operator visits start from this airfield. The directory is
                not a desk job.
              </p>
              <div className="mt-10">
                <Link
                  href="/about/location"
                  className="mono text-amber hover:text-amber-deep transition-colors"
                >
                  More on the headquarters →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-card">
            <EditorialImage
                  src="/images/about/about-hero.jpg"
                  alt="Victoria Falls — Mosi-oa-Tunya, the smoke that thunders"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover" />
            <BlendOverlay />
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ───────────────────────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl mb-16">
          <Eyebrow withRule>What we stand for</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            Three values we screen
            <span className="italic text-amber"> every operator </span>
            against.
          </h2>
        </div>
        <NumberedList
          items={VALUES.map((v) => ({ title: v.title, body: v.body }))}
          twoColumn={false}
          className="max-w-4xl"
        />
      </section>
    </>
  )
}
