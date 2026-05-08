import Image from "next/image"
import Link from "next/link"

import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { NumberedList } from "@/components/editorial/numbered-list"
import { EditorialImage } from "@/components/editorial/editorial-image"
import { BlendOverlay } from "@/components/editorial/blend-overlay"

const PRINCIPLES = [
  {
    title: "Curation, not catalogue.",
    body: "We list the lodges and operators we'd send our friends to. Each one earns a place by the depth of the experience it offers — not by paying for one.",
  },
  {
    title: "Trips that leave a mark.",
    body: "We are drawn to stays that ask something of you: a slower pace, a closer look, a moment to listen. The kind that linger long after the dust settles.",
  },
  {
    title: "Travel with consequence.",
    body: "Every operator here contributes to conservation, community, or both. Your booking is part of the work that keeps these places wild.",
  },
]

const VALUES = [
  {
    title: "Fewer, better.",
    body: "We'd rather list a smaller circle of operators we know personally than a long catalogue we don't. Volume is a vanity metric; depth is the point.",
  },
  {
    title: "Communities, then visitors.",
    body: "We favour operators who work closely with the people who live alongside the wildlife — where tourism revenue stays in the place it was earned, and where local employment isn't decorative.",
  },
  {
    title: "Conservation as a brief.",
    body: "Anti-poaching levies, habitat management, science partnerships, lease payments to community trusts — the operators we feature do this work, and we ask them to show it. Conservation isn't a tagline here.",
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
              A small collection,{" "}
              <span className="italic text-amber">written from the bush</span>.
            </h1>
            <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
              Safari Overland is a small, opinionated collection of African lodges and operators —
              chosen for what the wild does to you, not just what it shows you. We are
              headquartered in Victoria Falls, and we start there.
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
              Send travellers to safaris that change them.
            </h2>
            <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute leading-snug">
              The kind of trips that ask something of you and leave you altered — and the
              candid planning information that makes them work.
            </p>
            <p className="mt-6 text-bone-mute leading-relaxed">
              The wild has its own way of restoring people. Our job is to point you to the
              operators who know that, and who design their stays around it: slower drives,
              walking days, time to read a track, time to notice. The collection is small on
              purpose. Every name on it is one we&apos;d send our closest friends to.
            </p>
          </div>
          <div className="lg:col-span-6 lg:border-l lg:border-rule lg:pl-12">
            <Eyebrow>Vision</Eyebrow>
            <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              An honest second opinion, in writing.
            </h2>
            <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute leading-snug">
              A safari resource where the economics point the same way as the conservation —
              not a marketing channel.
            </p>
            <p className="mt-6 text-bone-mute leading-relaxed">
              By steering travellers toward operators who do the work, we want every
              booking made through here to fund the things that keep these places wild —
              anti-poaching units, community trusts, habitat management, lease payments.
              The trip is the means. The continent doing well by the people who live in it
              is the end.
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
                circuits of Zimbabwe, Zambia, Botswana, Namibia and South Africa.
              </p>
              <p className="mt-4 text-bone-mute leading-relaxed max-w-2xl">
                We are starting the collection with the lodges and operators we know
                personally — the ones within our own range — and widening the circle
                outward from there. Slowly, on foot, by hand. The collection is not a
                desk job.
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
            Three things we screen
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
