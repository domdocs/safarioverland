import Image from "next/image"

import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { NumberedList } from "@/components/editorial/numbered-list"

// Copy from handoff/relaunch/copy/SITE_COPY.md §2 (draft for Dom's
// approval, D-10). Bracketed placeholders stay visible until Dom
// supplies the value (D-12, D-13).

// The offer. Partner towns (D-02): Victoria Falls only until another
// hub's partner is signed.
const PRINCIPLES = [
  {
    title: "We draw the route.",
    body: "The road book is the heart of it: drive times, road surfaces, fuel, borders and park gate times for each day, in print and offline on your phone. We'd rather tell you a day is long than let you find out at four in the afternoon.",
  },
  {
    title: "We book the nights, and the vehicle.",
    body: "Places from the collection, held for your dates, and a vehicle matched to the roads you'll drive. One booking, one set of people to talk to.",
  },
  {
    title: "We stay on the line.",
    body: "While you're on the road there's a person to call, and partners on the ground who can reach you. Help that is close by, not a ticket number.",
  },
]

const VALUES = [
  {
    title: "More than a bed.",
    body: "Something only it offers — a hide, a walking guide, rhino tracking, a sleep-out, a landscape you can't see from anywhere else — and guided activities, so you're not limited to driving yourself round the park.",
  },
  {
    title: "Worth what it asks.",
    // [US$150] and [US$600]: D-12, confirm Dom is happy to publish the band.
    body: "Honest value at any price. Most of the collection sits between [US$150] and [US$600] per person per night; where a place costs more, we've decided it's worth it, and we say why. Last of all, the friend test: would we send a friend there.",
  },
  {
    title: "Good for the place.",
    body: "Conservation and community, shown rather than claimed. Anti-poaching levies, habitat management, lease payments to community trusts, local people in real jobs — we ask operators to show us the work, and we favour the ones where the money stays where it was earned.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[78vh] min-h-[600px] w-full overflow-hidden bg-night">
        <Image
          src="/images/about/about-hero.jpg"
          alt="Sunrise over Victoria Falls, where our routes begin"
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
              Planned by hand,{" "}
              <span className="italic text-amber">driven by you</span>.
            </h1>
            <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
              Safari Overland plans and books self-drive safaris through southern
              Africa: the route, the vehicle, and a camp or lodge worth the drive at
              the end of each day.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Three things, always (the offer) ─────────────────── */}
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
              Put travellers on the road, and somewhere worth arriving at the end of it.
            </h2>
            <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute leading-snug">
              The drive is half of what people remember: the farm stall, the border
              post, the light on the gravel late in the day.
            </p>
            <p className="mt-6 text-bone-mute leading-relaxed">
              A self-drive safari gives you something a fly-in trip can&apos;t — the
              country between the parks, at your own pace, with the windows down. What
              it usually lacks is a proper bed and a guide in the morning. We put the
              two together. You drive. Each night ends at a camp or lodge with
              something only it offers: a walking guide, a hide, rhino on foot, a
              community that owns the land. The collection is small on purpose. Each
              name on it is one we&apos;d send our closest friends to.
            </p>
          </div>
          <div className="lg:col-span-6 lg:border-l lg:border-rule lg:pl-12">
            <Eyebrow>Vision</Eyebrow>
            <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              An honest second opinion, in writing.
            </h2>
            <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute leading-snug">
              We earn from the trips we book, never from who we list.
            </p>
            <p className="mt-6 text-bone-mute leading-relaxed">
              That&apos;s how we can tell you what other safari sites won&apos;t. A
              drive that&apos;s too long for one day. A park that&apos;s better in the
              shoulder season. A famous name that isn&apos;t worth what it asks. When
              you travel with us, your money goes to places that look after the land
              and the people who live beside it — anti-poaching work, community
              trusts, lease payments, habitat. The trip is the means. Southern Africa
              doing well by the people who live in it is the end.
            </p>
          </div>
        </div>
      </section>

      {/* ─── From Victoria Falls (working hub, STRATEGY §6) ────── */}
      {/*
       * Replaces the retired "Our home" section (see
       * handoff/briefs/2026-05-DROP_OUR_HOME_SECTION.md) with a
       * working-hub framing: no personal home base. Name another hub
       * only once its partner is signed (D-02).
       */}
      <section className="bg-ink border-y border-rule py-24 md:py-32">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow withRule>From Victoria Falls</Eyebrow>
            <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              Where the <span className="italic text-amber">road</span> starts.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-bone-mute leading-relaxed">
            <p>
              Two of our routes begin at Victoria Falls — Mosi-oa-Tunya, the smoke
              that thunders — where Zimbabwe, Zambia, Botswana and Namibia sit within
              a day&apos;s drive of each other. It&apos;s where the first of our
              partners on the ground are.
            </p>
            <p>
              Partners on the ground meet you, hand over the vehicle, walk you
              through the road book, and are the people who come if something goes
              wrong. When a partner is signed in another hub, we&apos;ll name
              the town here, and not before.
            </p>
          </div>
        </div>
      </section>

      {/* ─── What earns a place ───────────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl mb-16">
          <Eyebrow withRule>What earns a place</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            Three things we screen
            <span className="italic text-amber"> each operator </span>
            for.
          </h2>
          <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute leading-snug">
            A place has to be reachable by road, or have a safe place to leave the
            car. After that, these three.
          </p>
        </div>
        <NumberedList
          items={VALUES.map((v) => ({ title: v.title, body: v.body }))}
          twoColumn={false}
          className="max-w-4xl"
        />
      </section>

      <SectionRule className="container" />

      {/* ─── Who we are, and how we're paid ───────────────────── */}
      {/* D-13 (Niels' bio) and D-14 (how much of the commercials to say). */}
      <section className="container py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow withRule>Who we are</Eyebrow>
            <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              One editor, and <span className="italic text-amber">no</span> paid places.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-bone-mute leading-relaxed">
            <p>
              The collection is edited by Niels van de Meer. He decides what&apos;s in
              it and what comes out, and he writes most of what you read here. [One-line
              bio for Niels.]
            </p>
            <p>
              Operators never pay to be listed, and a place can&apos;t pay its way in
              or stay in once it stops earning its place. We&apos;re paid when you book
              a trip with us: by the camps and lodges, and by the partners who supply
              the vehicle and look after you on the ground. The brief and a first
              sketch of your route cost nothing.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
