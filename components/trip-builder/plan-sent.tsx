"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { Button } from "@/components/ui/button"
import { PlannerCallInline } from "@/components/planner-call/planner-call-inline"
import {
  BUDGET_TIER_OPTIONS,
  DURATION_OPTIONS,
  INTENT_OPTIONS,
  PACE_OPTIONS,
  QUIET_OPTIONS,
  SEASON_OPTIONS,
  WILDLIFE_OPTIONS,
  labelFor,
} from "@/lib/briefs/options"
import type { ShortlistEntry } from "@/lib/briefs/shortlist"

const HANDOFF_KEY = "so_intake_handoff_v2"

type Handoff = {
  criteria: {
    wildlife_priorities: string[]
    budget_tier: string | null
    season_preference: string | null
  }
  summary: {
    months: string[]
    flexible: boolean
    intent: string[]
    pace: string | null
    quiet_markers: string[]
    wildlife_priorities: string[]
    duration: string | null
    season_preference: string | null
    budget_tier: string | null
    contact_email: string | null
  }
}

type Status = "loading" | "ready" | "missing"

// ── Helpers to build the prose summary ─────────────────────────────────

function joinList(items: string[]): string {
  if (items.length === 0) return ""
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`
}

function buildProseSummary(s: Handoff["summary"]): string {
  const sentences: string[] = []

  // Sentence 1 — rhythm + duration
  const paceLabel = s.pace ? labelFor(PACE_OPTIONS, s.pace)?.toLowerCase() : null
  const durationLabel = s.duration
    ? labelFor(DURATION_OPTIONS, s.duration)?.toLowerCase()
    : null
  if (paceLabel || durationLabel) {
    const parts: string[] = []
    if (paceLabel) parts.push(`${paceLabel} rhythm`)
    if (durationLabel) parts.push(durationLabel)
    sentences.push(`${parts.join(", ")}.`)
  }

  // Sentence 2 — months / flexibility + season
  const monthStr = s.flexible ? "flexible on months" : s.months.join(" · ")
  const seasonLabel = s.season_preference
    ? labelFor(SEASON_OPTIONS, s.season_preference)
    : null
  if (monthStr) {
    sentences.push(
      seasonLabel
        ? `${monthStr}; ${seasonLabel.toLowerCase()}.`
        : `${monthStr}.`,
    )
  }

  // Sentence 3 — wildlife
  if (s.wildlife_priorities.length) {
    const labels = s.wildlife_priorities
      .map((v) => {
        const opt = WILDLIFE_OPTIONS.find((o) => o.value === v)
        if (!opt) return null
        // Strip the dash-clause for brevity: "The big cats" not
        // "The big cats — lion, leopard, cheetah".
        return opt.label.split(" — ")[0]
      })
      .filter((x): x is string => !!x)
    if (labels.length) sentences.push(`${joinList(labels)}.`)
  }

  // Sentence 4 — quiet markers
  if (s.quiet_markers.length) {
    const labels = s.quiet_markers
      .map((v) => labelFor(QUIET_OPTIONS, v))
      .filter((x): x is string => !!x)
      .map((x) => x.toLowerCase())
    if (labels.length) sentences.push(`${joinList(labels)}.`)
  }

  // Sentence 5 — budget
  const budgetLabel = s.budget_tier
    ? labelFor(BUDGET_TIER_OPTIONS, s.budget_tier)
    : null
  if (budgetLabel) sentences.push(`Budget: ${budgetLabel.toLowerCase()}.`)

  // Sentence 6 — intent (last; least crucial)
  if (s.intent.length) {
    const labels = s.intent
      .map((v) => labelFor(INTENT_OPTIONS, v))
      .filter((x): x is string => !!x)
      .map((x) => x.toLowerCase())
    if (labels.length) sentences.push(`Drawn to ${joinList(labels)}.`)
  }

  return sentences.join(" ")
}

// ── Component ──────────────────────────────────────────────────────────

export function PlanSent() {
  const [status, setStatus] = useState<Status>("loading")
  const [handoff, setHandoff] = useState<Handoff | null>(null)
  const [listings, setListings] = useState<ShortlistEntry[]>([])
  const [shortlistLoaded, setShortlistLoaded] = useState(false)

  // Read the handoff snapshot from sessionStorage on mount.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(HANDOFF_KEY)
      if (!raw) {
        setStatus("missing")
        return
      }
      const parsed = JSON.parse(raw) as Handoff
      setHandoff(parsed)
      setStatus("ready")
    } catch {
      setStatus("missing")
    }
  }, [])

  // Once we have a handoff, fetch the shortlist.
  useEffect(() => {
    if (!handoff) return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch("/api/briefs/shortlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(handoff.criteria),
        })
        const data = await res.json().catch(() => ({}))
        if (cancelled) return
        if (Array.isArray(data.listings)) setListings(data.listings)
      } catch {
        /* ignore — fallback messaging is fine */
      } finally {
        if (!cancelled) setShortlistLoaded(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [handoff])

  // ── Missing handoff (direct nav, refresh, etc) ────────────────────────
  if (status === "missing") {
    return (
      <section className="container py-24 md:py-32">
        <div className="max-w-2xl">
          <Eyebrow withRule>Nothing to show</Eyebrow>
          <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight">
            We don&apos;t have a brief in front of us.
          </h1>
          <p className="mt-6 text-bone-mute leading-relaxed">
            Either this page refreshed and we lost the working draft, or
            you arrived here directly. Start a brief and we&apos;ll come
            back within 48 hours.
          </p>
          <Button asChild size="lg" className="mt-10 rounded-none px-8 py-6 mono">
            <StartBriefLink source="plan-sent">
              Start a brief <ArrowRight className="ml-2 h-4 w-4" />
            </StartBriefLink>
          </Button>
        </div>
      </section>
    )
  }

  if (status === "loading" || !handoff) {
    return (
      <section className="container py-24 md:py-32">
        <p className="mono text-bone-mute">Reading your brief…</p>
      </section>
    )
  }

  const prose = buildProseSummary(handoff.summary)

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────── */}
      <section className="container py-24 md:py-32 border-b border-rule">
        <div className="max-w-3xl">
          <Eyebrow withRule>Brief received</Eyebrow>
          <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
            Three routes — drawn{" "}
            <span className="italic text-amber">by hand</span> — within 48 hours.
          </h1>
          {handoff.summary.contact_email && (
            <p className="mt-8 mono text-bone-mute">
              Confirmation on its way to {handoff.summary.contact_email}.
            </p>
          )}
        </div>
      </section>

      {/* ── What we heard ───────────────────────────────────────── */}
      <section className="container py-16 md:py-24 border-b border-rule">
        <div className="max-w-3xl">
          <Eyebrow>What we heard</Eyebrow>
          <p className="mt-6 font-serif italic text-h3-fluid text-bone leading-snug text-balance">
            {prose || "We've taken a first read. A planner will look closer this week."}
          </p>
        </div>
      </section>

      {/* ── Shortlist ────────────────────────────────────────────── */}
      <section className="container py-16 md:py-24 border-b border-rule">
        {!shortlistLoaded ? (
          <p className="mono text-bone-mute">Looking through the shortlist…</p>
        ) : listings.length >= 2 ? (
          <div className="max-w-4xl">
            <Eyebrow>Already on our shortlist for a trip like this</Eyebrow>
            <ul className="mt-8 space-y-6">
              {listings.map((entry) => (
                <li key={entry.id} className="border-b border-rule pb-6">
                  <Link
                    href={`/listings/${entry.id}`}
                    className="group block"
                  >
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3 className="font-serif text-h3-fluid text-bone leading-tight group-hover:text-amber transition-colors">
                        {entry.listing_name}
                      </h3>
                      <span className="mono text-bone-mute text-sm">
                        — {entry.location}, {entry.country}
                      </span>
                    </div>
                    {entry.verdict && (
                      <p className="mt-3 text-bone-mute leading-relaxed">
                        {entry.verdict}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-10 font-serif italic text-bone-mute leading-relaxed max-w-2xl">
              The three routes will weigh these and others against your
              specific dates, rhythm, and budget.
            </p>
          </div>
        ) : (
          <div className="max-w-2xl">
            <Eyebrow>Shortlist</Eyebrow>
            <p className="mt-6 font-serif italic text-h4-fluid text-bone leading-snug">
              Your brief is unusual enough that we&apos;d rather think on
              it before shortlisting. Niels will read it personally this
              week.
            </p>
          </div>
        )}
      </section>

      {/* ── Call slot ───────────────────────────────────────────── */}
      <PlannerCallInline
        className="container py-16 md:py-24 border-b border-rule"
        source="plan-sent"
      />

      {/* ── What happens next ───────────────────────────────────── */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl">
          <Eyebrow>What happens next</Eyebrow>
          <p className="mt-6 text-bone-mute leading-relaxed">
            Niels and the planning team will read your brief and come back
            with three drawn-by-hand routes, at different rhythms and
            budgets, within 48 hours. We don&apos;t take commission, we
            don&apos;t add markup, and we&apos;ll tell you when a
            different specialist is a better fit than we are.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none px-8 py-6 mono border-rule text-bone hover:border-amber hover:text-amber"
            >
              <Link href="/categories">Open the collection</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none px-8 py-6 mono border-rule text-bone hover:border-amber hover:text-amber"
            >
              <Link href="/destinations">Open the atlas</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
