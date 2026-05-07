import Link from "next/link"
import Image from "next/image"
import { BookOpen, Shield, Leaf, Calendar } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { DownloadButton } from "@/components/download-button"
import { RESOURCES } from "@/lib/downloads/resources"
import { NewsletterForm } from "@/components/newsletter-form"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { SectionRule } from "@/components/editorial/section-rule"
import { Button } from "@/components/ui/button"

type Pillar = {
  href: string
  label: string
  lede: string
  icon: LucideIcon
}

const PILLARS: Pillar[] = [
  {
    href: "/resources/planning-guides",
    label: "Planning",
    lede: "Budgeting, packing, when to go, who to go with. The pre-departure stack.",
    icon: BookOpen,
  },
  {
    href: "/resources/safety-tips",
    label: "Safety",
    lede: "Wildlife behaviour, vaccinations, vehicle protocols, emergency planning.",
    icon: Shield,
  },
  {
    href: "/resources/conservation",
    label: "Conservation",
    lede: "Anti-poaching, community models, sustainable tourism — the bigger picture.",
    icon: Leaf,
  },
  {
    href: "/resources/seasonal-guides",
    label: "Seasonal",
    lede: "When to go, region by region. Migration timing, weather windows, shoulder months.",
    icon: Calendar,
  },
]

const ARTICLES = [
  {
    href: "/resources/planning-guides/what-to-pack",
    eyebrow: "Planning · 03 min",
    title: "The packing list that earned its weight",
    lede: "What to bring, what to skip, and what you really don't need on safari.",
    image: "/images/planning-guides/packing/packing-list.jpg",
  },
  {
    href: "/resources/safety-tips/wildlife-behavior",
    eyebrow: "Safety · 07 min",
    title: "Reading wildlife behaviour",
    lede: "The single most useful safety skill on safari is reading what an animal is telling you.",
    image: "/images/destinations/wildlife/lion.jpg",
  },
  {
    href: "/resources/seasonal-guides/great-migration",
    eyebrow: "Seasonal · 05 min",
    title: "The Great Migration, by month",
    lede: "Where the herds are now, where they'll be in eight weeks, when the crossings happen.",
    image: "/images/seasonal-guides/kenya-migration.jpg",
  },
]

export default function ResourcesPage() {
  return (
    <>
      {/* ─── Field notes opening ──────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow withRule>Field notes — long form</Eyebrow>
          <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
            Notes from the
            <span className="italic text-amber"> bush</span>.
          </h1>
          <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
            The kind of writing we wish had existed when we were planning our own first safari.
            Practical, opinionated, occasionally annoying — never PR.
          </p>
        </div>
      </section>

      <SectionRule className="container" />

      {/* ─── Four pillars ─────────────────────────────────── */}
      <section className="container py-20">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => {
            const Icon = p.icon
            return (
              <Link
                key={p.href}
                href={p.href}
                className="group block border-t border-rule pt-6 transition-colors hover:border-amber"
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="mono text-amber" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-4 w-4 text-amber" aria-hidden />
                  <span className="eyebrow">{p.label}</span>
                </div>
                <h2 className="font-serif text-h3-fluid text-bone leading-tight transition-colors group-hover:text-amber">
                  {p.label}
                </h2>
                <p className="mt-3 text-bone-mute leading-relaxed">{p.lede}</p>
                <p className="mt-6 mono text-amber transition-colors group-hover:text-amber-deep">
                  Open the section →
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ─── Featured download ────────────────────────────── */}
      <section className="border-y border-rule bg-ink py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Free, gated by email</Eyebrow>
              <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
                The Safari Planning Checklist.
              </h2>
              <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
                Two pages. Twenty-eight items. Everything we wish someone had handed us
                before our first trip — booking, paperwork, packing, on-trip rhythm.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <DownloadButton
                  slug="safari-planning-checklist"
                  title={RESOURCES["safari-planning-checklist"].title}
                  description={RESOURCES["safari-planning-checklist"].description}
                  label="Download checklist"
                />
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-none px-8 py-6 mono border-rule text-bone hover:border-amber hover:text-amber"
                >
                  <Link href="/resources/planning-guides">Browse all checklists</Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden bg-card">
                <Image
                  src="/images/planning-guides/packing/packing-list.jpg"
                  alt="Safari packing list and gear laid out before departure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Latest field notes ───────────────────────────── */}
      <section className="container py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <Eyebrow withRule>Latest</Eyebrow>
            <h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              Recent reads.
            </h2>
          </div>
          <Link
            href="/resources/planning-guides"
            className="mono text-amber hover:text-amber-deep transition-colors"
          >
            All field notes →
          </Link>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Link
              key={a.href}
              href={a.href}
              className="group block border-t border-rule pt-6 transition-colors hover:border-amber"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-card mb-6">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="mono text-amber" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow">{a.eyebrow}</span>
              </div>
              <h3 className="font-serif text-h3-fluid text-bone leading-tight transition-colors group-hover:text-amber text-balance">
                {a.title}
              </h3>
              <p className="mt-3 text-bone-mute leading-relaxed">{a.lede}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Newsletter ───────────────────────────────────── */}
      <section className="border-t border-rule bg-ink py-24">
        <div className="container max-w-3xl">
          <Eyebrow>The dispatch</Eyebrow>
          <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            Field notes, monthly.
          </h2>
          <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
            One email a month. Seasonal picks, new field notes, the occasional unsolicited
            opinion. Unsubscribe in one click.
          </p>
          <div className="mt-10">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}
