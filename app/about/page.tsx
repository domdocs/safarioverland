import Image from "next/image"
import Link from "next/link"

import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { NumberedList } from "@/components/editorial/numbered-list"
import { FAQ } from "@/components/FAQ"

const SCREENING = [
  {
    title: "Fewer, better.",
    body:
      "We list a small circle of operators we know personally rather than a long catalogue we don't. Volume is a vanity metric; depth is the point. The kept list sits in the low double digits and grows by hand. We are not trying to scale to a hundred lodges; we are trying to keep the bar high as we widen out.",
  },
  {
    title: "Communities, then visitors.",
    body:
      "We favour operators who work closely with the people who live alongside the wildlife — where tourism revenue stays in the place it was earned, and where local employment isn't decorative. We ask for staff-from-community percentages, training-programme details, and lease-payment records where they're shareable, and we publish what we are allowed to publish.",
  },
  {
    title: "Conservation as a brief.",
    body:
      "Anti-poaching levies, habitat management, science partnerships, lease payments to community trusts — every operator in the collection does this work, and we ask them to show it. Conservation isn't a tagline here; it is screening criterion number three and the most common reason an otherwise-good lodge is declined.",
  },
]

const ABOUT_FAQ = [
  {
    question: "Where are you based?",
    answer:
      "Victoria Falls, Zimbabwe — on the Zambezi, between Hwange and the Lower Zambezi, and within a four-hour flight of every major safari country in Southern Africa. We chose Victoria Falls deliberately: it is the geographic centre of the safari continent and lets the editorial work happen close to the camps rather than from a desk in another hemisphere.",
  },
  {
    question: "Are you a tour operator?",
    answer:
      "No. We are an editorial collection and a planner. The booking and the on-the-ground delivery are owned by the listed operator once we make the introduction. We never quote, contract, or host a trip ourselves.",
  },
  {
    question: "Do you cover countries outside Africa?",
    answer:
      "No. The collection is Africa-only and will remain so. There are plenty of editorial planners for the rest of the world; the safari continent deserves a planner that lives on it.",
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
              A small, opinionated collection —{" "}
              <span className="italic text-amber">written from the bush</span>.
            </h1>
            <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
              An editorial second opinion on the African safari, written from
              Victoria Falls.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Opening editorial ────────────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="font-serif text-h4-fluid text-bone leading-snug">
            Safari Overland is a curated African safari collection — a small,
            deliberately under-built kept list of lodges and operators.
            Victoria Falls and Hwange are the closest to fully written; the
            rest of the continent is in progress.
          </p>
          <p className="mt-6 text-bone-mute leading-relaxed">
            The collection is written from Victoria Falls, Zimbabwe — at the
            centre of the safari continent rather than from a tour-desk in
            London — and the planning service that sits alongside it is free
            to travellers, opinionated by design, and editorially
            independent. This page tells you who we are, how the collection
            is built, and how the business works. We publish the criteria
            and the economics in full, because if you can&apos;t see how the
            sausage is made, you can&apos;t trust the sausage.
          </p>
        </div>
      </section>

      <SectionRule className="container" />

      {/* ─── Who builds the collection ────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow withRule>Who builds the collection</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            One editor.{" "}
            <span className="italic text-amber">Written by hand</span>.
          </h2>
          <p className="mt-8 text-bone leading-relaxed">
            Safari Overland is built by{" "}
            <strong className="font-medium">Niels van de Meer</strong>,
            co-founder and editor. Niels lives in Victoria Falls and writes
            the collection from there — every lodge listed is one Niels has
            visited personally or knows by reputation from operators we work
            with directly.
          </p>
          <p className="mt-6 text-bone-mute leading-relaxed">
            Niels is in the bush more than he is at a desk. We don&apos;t
            write about a lodge we don&apos;t know first-hand or by trusted
            reputation.
          </p>
          {/*
           * Photo of Niels + LinkedIn URL pending Dom's supply — once
           * provided, render a portrait + bio link here. Person JSON-LD
           * already emits at the page level with @id "editor-niels" and
           * degrades gracefully with photo: null, sameAs: [] until then
           * (per Brief 1 scaffold).
           */}
        </div>
      </section>

      <SectionRule className="container" />

      {/* ─── Screening criteria (three) ───────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl mb-16">
          <Eyebrow withRule>How operators earn a place</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            Three things we screen{" "}
            <span className="italic text-amber">every operator</span> against.
          </h2>
        </div>
        <NumberedList
          items={SCREENING.map((p) => ({ title: p.title, body: p.body }))}
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

      <SectionRule className="container" />

      {/* ─── How the business actually works ──────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow withRule>How the business actually works</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            Two things travellers always want to know,{" "}
            <span className="italic text-amber">answered plainly</span>.
          </h2>

          <div className="mt-12 space-y-10">
            <div className="border-t border-rule pt-8">
              <h3 className="font-serif text-h3-fluid text-bone leading-tight">
                The planning service is free to travellers.
              </h3>
              <p className="mt-4 text-bone-mute leading-relaxed">
                Tell us what you&apos;re chasing, we come back within 48
                hours with three routes, you pick one, we connect you
                directly to the operator. No fee anywhere in this chain
                for the traveller.
              </p>
            </div>

            <div className="border-t border-rule pt-8">
              <h3 className="font-serif text-h3-fluid text-bone leading-tight">
                No paid placements, no preferred-supplier deals.
              </h3>
              <p className="mt-4 text-bone-mute leading-relaxed">
                Operators don&apos;t pay to be listed. The collection is
                editorially independent because nobody pays to be in it.
                We turn down operators where the conservation or community
                claim couldn&apos;t be evidenced when we asked — that&apos;s
                the most common reason for a decline.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionRule className="container" />

      {/* ─── Where to next ────────────────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow withRule>Where to next</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            Three ways in.
          </h2>
          <ul className="mt-12 space-y-6">
            <li className="border-t border-rule pt-6">
              <Link
                href="/categories"
                className="font-serif text-h3-fluid text-bone hover:text-amber transition-colors"
              >
                Open the collection →
              </Link>
              <p className="mt-2 text-bone-mute leading-relaxed">
                Browse the kept list of lodges and operators.
              </p>
            </li>
            <li className="border-t border-rule pt-6">
              <Link
                href="/plan"
                className="font-serif text-h3-fluid text-bone hover:text-amber transition-colors"
              >
                Start a brief →
              </Link>
              <p className="mt-2 text-bone-mute leading-relaxed">
                Three routes back within 48 hours. Free to travellers.
              </p>
            </li>
            <li className="border-t border-rule pt-6">
              <Link
                href="/field-notes"
                className="font-serif text-h3-fluid text-bone hover:text-amber transition-colors"
              >
                Open the field notes →
              </Link>
              <p className="mt-2 text-bone-mute leading-relaxed">
                What we&apos;ve written from the bush so far.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────── */}
      <section className="container pb-24 md:pb-32">
        <div className="max-w-3xl">
          <FAQ items={ABOUT_FAQ} heading="Frequently asked" />
        </div>
      </section>
    </>
  )
}
