"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { track } from "@/lib/analytics/track"
import type { BriefSubmittedProps } from "@/lib/analytics/events"
import {
  BUDGET_TIER_OPTIONS,
  DURATION_OPTIONS,
  INTENT_MAX,
  INTENT_OPTIONS,
  MONTH_OPTIONS,
  PACE_OPTIONS,
  QUIET_OPTIONS,
  SEASON_OPTIONS,
  WILDLIFE_OPTIONS,
  labelFor,
  type BudgetTierOption,
  type DurationOption,
  type IntentOption,
  type MonthOption,
  type PaceOption,
  type QuietOption,
  type SeasonOption,
  type WildlifeOption,
} from "@/lib/briefs/options"
import { cn } from "@/lib/utils"

// ── Form state ──────────────────────────────────────────────────────────

type FormState = {
  // Step 01
  months: MonthOption[]
  flexible_months: boolean
  // Step 02
  intent: IntentOption[]
  intent_other: string
  // Step 03
  pace: PaceOption | ""
  // Step 04
  quiet_markers: QuietOption[]
  // Step 05
  wildlife_priorities: WildlifeOption[]
  rare_specialist_text: string
  // Step 06
  duration: DurationOption | ""
  // Step 07
  season_preference: SeasonOption | ""
  // Step 08
  budget_tier: BudgetTierOption | ""
  // Step 09 — contact + free text
  contact_name: string
  contact_email: string
  contact_phone: string
  free_text: string
}

const EMPTY: FormState = {
  months: [],
  flexible_months: false,
  intent: [],
  intent_other: "",
  pace: "",
  quiet_markers: [],
  wildlife_priorities: [],
  rare_specialist_text: "",
  duration: "",
  season_preference: "",
  budget_tier: "",
  contact_name: "",
  contact_email: "",
  contact_phone: "",
  free_text: "",
}

const STORAGE_KEY = "so_intake_v2"
const HANDOFF_KEY = "so_intake_handoff_v2"

// ── Step list ───────────────────────────────────────────────────────────

const STEPS = [
  { key: "when", title: "When could you travel?", lede: "Months shape season, game-viewing, climate." },
  { key: "intent", title: "What kind of trip are you chasing?", lede: `Pick up to ${INTENT_MAX}.` },
  { key: "pace", title: "The rhythm.", lede: "How busy should the days feel?" },
  { key: "quiet", title: "The kind of quiet you want.", lede: "Optional. The texture more than the substance." },
  { key: "wildlife", title: "The wildlife or landscape you're after.", lede: "The specifics anchor everything." },
  { key: "duration", title: "How long, give or take?", lede: "Rough is fine — we'll narrow on the call." },
  { key: "season", title: "Season preference, if any.", lede: "Different months read different ways on the ground." },
  { key: "budget", title: "A comfortable budget, per person per night.", lede: "Honest is more useful than aspirational." },
  { key: "you", title: "Who shall we get back to?", lede: "Name + email. We'll reply within 48 hours." },
  { key: "review", title: "A last look.", lede: "Everything in one place. Edit anything before sending." },
] as const

type StepKey = (typeof STEPS)[number]["key"]

function isStepValid(step: StepKey, s: FormState): boolean {
  switch (step) {
    case "when":
      return s.months.length > 0 || s.flexible_months
    case "intent":
      return s.intent.length > 0 && s.intent.length <= INTENT_MAX
    case "pace":
      return !!s.pace
    case "quiet":
      return true // optional
    case "wildlife":
      return s.wildlife_priorities.length > 0
    case "duration":
      return !!s.duration
    case "season":
      return !!s.season_preference
    case "budget":
      return !!s.budget_tier
    case "you":
      return (
        s.contact_name.trim().length >= 2 && /\S+@\S+\.\S+/.test(s.contact_email)
      )
    case "review":
      return true
  }
}

// ── Component ───────────────────────────────────────────────────────────

export function TripBuilderForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sourceListingId = searchParams.get("listing")

  const [stepIdx, setStepIdx] = useState(0)
  const [state, setState] = useState<FormState>(EMPTY)
  const [hydrated, setHydrated] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setState({ ...EMPTY, ...parsed })
      }
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  // Auto-save on every change after hydration.
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* ignore */
    }
  }, [hydrated, state])

  const step = STEPS[stepIdx]
  const stepValid = useMemo(() => isStepValid(step.key, state), [step.key, state])
  const isLast = step.key === "review"

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }))
  }

  function toggleArray<T extends string>(
    key: "months" | "intent" | "quiet_markers" | "wildlife_priorities",
    value: T,
    max?: number,
  ) {
    setState((s) => {
      const current = s[key] as readonly string[]
      if (current.includes(value)) {
        return { ...s, [key]: current.filter((v) => v !== value) as FormState[typeof key] }
      }
      if (max && current.length >= max) return s
      return { ...s, [key]: [...current, value] as FormState[typeof key] }
    })
  }

  function buildNotes(): string | undefined {
    const parts: string[] = []
    if (state.intent.includes("other") && state.intent_other.trim()) {
      parts.push(`Other trip type: ${state.intent_other.trim()}`)
    }
    if (
      state.wildlife_priorities.includes("rare-specialist") &&
      state.rare_specialist_text.trim()
    ) {
      parts.push(`Rare / specialist sightings: ${state.rare_specialist_text.trim()}`)
    }
    if (state.free_text.trim()) {
      parts.push(state.free_text.trim())
    }
    return parts.length ? parts.join("\n\n") : undefined
  }

  async function handleSubmit() {
    if (submitting) return
    setSubmitting(true)
    setError(null)
    try {
      const payload = {
        months: state.flexible_months ? [] : state.months,
        intent: state.intent,
        pace: state.pace || undefined,
        quiet_markers: state.quiet_markers,
        wildlife_priorities: state.wildlife_priorities,
        duration: state.duration || undefined,
        season_preference: state.season_preference || undefined,
        budget_tier: state.budget_tier || undefined,
        notes: buildNotes(),
        source_listing_id: sourceListingId || undefined,
        contact_name: state.contact_name.trim(),
        contact_email: state.contact_email.trim(),
        contact_phone: state.contact_phone.trim() || undefined,
        source_url: typeof window !== "undefined" ? window.location.href : undefined,
      }
      const res = await fetch("/api/briefs/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.message || data.error || `Submission failed (HTTP ${res.status})`)
        setSubmitting(false)
        return
      }

      // Funnel event — only fires on 2xx so attempts don't pollute the
      // dashboard. PII (name/email/phone/free_text) deliberately excluded;
      // we capture only the categorical funnel slices.
      const briefEvent: BriefSubmittedProps = {
        pace: (state.pace || null) as BriefSubmittedProps["pace"],
        budget_tier:
          (state.budget_tier || null) as BriefSubmittedProps["budget_tier"],
        duration: state.duration || null,
        has_source_listing: !!sourceListingId,
      }
      track("brief-submitted", briefEvent)

      // Hand off a snapshot for /plan/sent. No PII in the URL.
      try {
        sessionStorage.setItem(
          HANDOFF_KEY,
          JSON.stringify({
            criteria: {
              wildlife_priorities: payload.wildlife_priorities,
              budget_tier: payload.budget_tier ?? null,
              season_preference: payload.season_preference ?? null,
            },
            summary: {
              months: payload.months,
              flexible: state.flexible_months,
              intent: payload.intent,
              pace: payload.pace ?? null,
              quiet_markers: payload.quiet_markers,
              wildlife_priorities: payload.wildlife_priorities,
              duration: payload.duration ?? null,
              season_preference: payload.season_preference ?? null,
              budget_tier: payload.budget_tier ?? null,
              contact_email: data.brief?.contact_email ?? state.contact_email,
            },
          }),
        )
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }

      router.push("/plan/sent")
    } catch {
      setError("Network error. Try again?")
      setSubmitting(false)
    }
  }

  // ── Render ───────────────────────────────────────────────────────────

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Sidebar — step rail */}
      <aside className="lg:col-span-4">
        <div className="sticky top-24">
          <Eyebrow withRule>
            Brief — {String(stepIdx + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </Eyebrow>
          <ol className="mt-8 space-y-3">
            {STEPS.map((s, i) => {
              const reached = i <= stepIdx
              const done = i < stepIdx
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => i <= stepIdx && setStepIdx(i)}
                    disabled={i > stepIdx}
                    className={cn(
                      "flex items-baseline gap-4 w-full text-left transition-colors",
                      i > stepIdx && "cursor-not-allowed opacity-60",
                    )}
                  >
                    <span
                      className={cn(
                        "mono shrink-0",
                        i === stepIdx ? "text-amber" : reached ? "text-bone" : "text-bone-mute",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-serif text-base leading-tight",
                        i === stepIdx
                          ? "text-bone"
                          : done
                            ? "text-bone-mute line-through decoration-amber/40"
                            : "text-bone-mute",
                      )}
                    >
                      {s.title}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
          {hydrated && (
            <p className="mt-12 mono text-bone-mute text-[11px]">
              Saved locally. Close the tab and pick up where you left off.
            </p>
          )}
        </div>
      </aside>

      {/* Step body */}
      <div className="lg:col-span-8">
        <p className="eyebrow">
          {step.key === "review" ? "Final look" : `Step ${String(stepIdx + 1).padStart(2, "0")} / 08`}
        </p>
        <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
          {step.title}
        </h2>
        <p className="mt-4 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
          {step.lede}
        </p>

        <div className="mt-12">
          {step.key === "when" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {MONTH_OPTIONS.map((m) => {
                  const selected = state.months.includes(m)
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        if (state.flexible_months) update("flexible_months", false)
                        toggleArray("months", m)
                      }}
                      aria-pressed={selected}
                      className={cn(
                        "border px-3 py-4 mono transition-colors",
                        selected
                          ? "bg-amber text-night border-amber"
                          : "border-rule text-bone-mute hover:border-amber hover:text-amber",
                      )}
                    >
                      {m}
                    </button>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={() => {
                  const next = !state.flexible_months
                  update("flexible_months", next)
                  if (next) update("months", [])
                }}
                aria-pressed={state.flexible_months}
                className={cn(
                  "block w-full text-left border p-5 transition-colors",
                  state.flexible_months
                    ? "border-amber bg-amber/10"
                    : "border-rule hover:border-amber",
                )}
              >
                <span className="font-serif text-lg text-bone">
                  Open to suggestions
                </span>
                <p className="mono text-bone-mute mt-1">
                  We&apos;re flexible — anywhere in the next twelve months.
                </p>
              </button>
            </div>
          )}

          {step.key === "intent" && (
            <ul className="space-y-3">
              {INTENT_OPTIONS.map((opt) => {
                const selected = (state.intent as string[]).includes(opt.value)
                const atLimit = state.intent.length >= INTENT_MAX && !selected
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => toggleArray("intent", opt.value, INTENT_MAX)}
                      aria-pressed={selected}
                      disabled={atLimit}
                      className={cn(
                        "block w-full text-left border px-5 py-4 transition-colors",
                        selected
                          ? "border-amber bg-amber/10"
                          : "border-rule hover:border-amber",
                        atLimit && "opacity-40 cursor-not-allowed",
                      )}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-serif text-lg text-bone">
                          {opt.label}
                        </span>
                        {selected && (
                          <Check className="h-4 w-4 text-amber shrink-0" aria-hidden />
                        )}
                      </div>
                    </button>
                  </li>
                )
              })}
              {state.intent.includes("other") && (
                <li>
                  <Label htmlFor="intent_other" className="eyebrow block mb-2 mt-4">
                    Tell us more
                  </Label>
                  <Input
                    id="intent_other"
                    value={state.intent_other}
                    onChange={(e) => update("intent_other", e.target.value)}
                    placeholder="Something specific we should know"
                    className="rounded-none bg-card border-rule text-bone"
                  />
                </li>
              )}
              <li className="mono text-bone-mute text-xs pt-2">
                {state.intent.length} / {INTENT_MAX} selected
              </li>
            </ul>
          )}

          {step.key === "pace" && (
            <ul className="space-y-3">
              {PACE_OPTIONS.map((opt) => {
                const selected = state.pace === opt.value
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => update("pace", opt.value)}
                      aria-pressed={selected}
                      className={cn(
                        "block w-full text-left border p-5 transition-colors",
                        selected
                          ? "border-amber bg-amber/10"
                          : "border-rule hover:border-amber",
                      )}
                    >
                      <div className="flex items-baseline gap-3">
                        <span
                          className={cn(
                            "font-serif text-xl leading-tight",
                            selected ? "text-amber" : "text-bone",
                          )}
                        >
                          {opt.label}
                        </span>
                        {selected && (
                          <Check className="h-4 w-4 text-amber ml-auto shrink-0" aria-hidden />
                        )}
                      </div>
                      <p className="mt-1 text-bone-mute">{opt.lede}</p>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {step.key === "quiet" && (
            <ul className="grid sm:grid-cols-2 gap-3">
              {QUIET_OPTIONS.map((opt) => {
                const selected = (state.quiet_markers as string[]).includes(opt.value)
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => toggleArray("quiet_markers", opt.value)}
                      aria-pressed={selected}
                      className={cn(
                        "block w-full text-left border px-4 py-4 transition-colors",
                        selected
                          ? "border-amber bg-amber/10"
                          : "border-rule hover:border-amber",
                      )}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif text-base text-bone leading-snug">
                          {opt.label}
                        </span>
                        {selected && (
                          <Check className="h-4 w-4 text-amber shrink-0 ml-auto" aria-hidden />
                        )}
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {step.key === "wildlife" && (
            <div className="space-y-4">
              <ul className="grid sm:grid-cols-2 gap-3">
                {WILDLIFE_OPTIONS.map((opt) => {
                  const selected = (state.wildlife_priorities as string[]).includes(opt.value)
                  return (
                    <li key={opt.value}>
                      <button
                        type="button"
                        onClick={() => toggleArray("wildlife_priorities", opt.value)}
                        aria-pressed={selected}
                        className={cn(
                          "block w-full h-full text-left border px-4 py-4 transition-colors",
                          selected
                            ? "border-amber bg-amber/10"
                            : "border-rule hover:border-amber",
                        )}
                      >
                        <div className="flex items-baseline gap-3">
                          <span className="font-serif text-base text-bone leading-snug">
                            {opt.label}
                          </span>
                          {selected && (
                            <Check className="h-4 w-4 text-amber shrink-0 ml-auto" aria-hidden />
                          )}
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
              {state.wildlife_priorities.includes("rare-specialist") && (
                <div>
                  <Label htmlFor="rare_specialist" className="eyebrow block mb-2 mt-4">
                    Which sightings?
                  </Label>
                  <Input
                    id="rare_specialist"
                    value={state.rare_specialist_text}
                    onChange={(e) => update("rare_specialist_text", e.target.value)}
                    placeholder="Pangolin, aardvark, painted dog…"
                    className="rounded-none bg-card border-rule text-bone"
                  />
                </div>
              )}
            </div>
          )}

          {step.key === "duration" && (
            <ul className="space-y-3 max-w-xl">
              {DURATION_OPTIONS.map((opt) => {
                const selected = state.duration === opt.value
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => update("duration", opt.value)}
                      aria-pressed={selected}
                      className={cn(
                        "block w-full text-left border px-5 py-4 transition-colors",
                        selected
                          ? "border-amber bg-amber/10"
                          : "border-rule hover:border-amber",
                      )}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif text-lg text-bone">{opt.label}</span>
                        {selected && (
                          <Check className="h-4 w-4 text-amber ml-auto shrink-0" aria-hidden />
                        )}
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {step.key === "season" && (
            <ul className="space-y-3 max-w-2xl">
              {SEASON_OPTIONS.map((opt) => {
                const selected = state.season_preference === opt.value
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => update("season_preference", opt.value)}
                      aria-pressed={selected}
                      className={cn(
                        "block w-full text-left border p-5 transition-colors",
                        selected
                          ? "border-amber bg-amber/10"
                          : "border-rule hover:border-amber",
                      )}
                    >
                      <div className="flex items-baseline gap-3">
                        <span
                          className={cn(
                            "font-serif text-lg leading-tight",
                            selected ? "text-amber" : "text-bone",
                          )}
                        >
                          {opt.label}
                        </span>
                        {selected && (
                          <Check className="h-4 w-4 text-amber ml-auto shrink-0" aria-hidden />
                        )}
                      </div>
                      <p className="mt-1 text-bone-mute">{opt.lede}</p>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {step.key === "budget" && (
            <ul className="space-y-3 max-w-2xl">
              {BUDGET_TIER_OPTIONS.map((opt) => {
                const selected = state.budget_tier === opt.value
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => update("budget_tier", opt.value)}
                      aria-pressed={selected}
                      className={cn(
                        "block w-full text-left border px-5 py-4 transition-colors",
                        selected
                          ? "border-amber bg-amber/10"
                          : "border-rule hover:border-amber",
                      )}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif text-lg text-bone leading-snug">
                          {opt.label}
                        </span>
                        {selected && (
                          <Check className="h-4 w-4 text-amber ml-auto shrink-0" aria-hidden />
                        )}
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {step.key === "you" && (
            <div className="space-y-6 max-w-xl">
              <div>
                <Label htmlFor="contact_name" className="eyebrow block mb-3">
                  Your name
                </Label>
                <Input
                  id="contact_name"
                  value={state.contact_name}
                  onChange={(e) => update("contact_name", e.target.value)}
                  placeholder="Full name"
                  required
                  autoComplete="name"
                  className="rounded-none bg-card border-rule text-bone"
                />
              </div>
              <div>
                <Label htmlFor="contact_email" className="eyebrow block mb-3">
                  Email
                </Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={state.contact_email}
                  onChange={(e) => update("contact_email", e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="rounded-none bg-card border-rule text-bone"
                />
              </div>
              <div>
                <Label htmlFor="contact_phone" className="eyebrow block mb-3">
                  Phone — optional
                </Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  value={state.contact_phone}
                  onChange={(e) => update("contact_phone", e.target.value)}
                  placeholder="+1 555 123 4567"
                  autoComplete="tel"
                  className="rounded-none bg-card border-rule text-bone"
                />
              </div>
              <div>
                <Label htmlFor="free_text" className="eyebrow block mb-3">
                  Anything else we should know?
                </Label>
                <Textarea
                  id="free_text"
                  value={state.free_text}
                  onChange={(e) => update("free_text", e.target.value)}
                  placeholder="Anniversaries, mobility, dietary, allergies, the trip that lodged in your head ten years ago — anything."
                  rows={5}
                  className="rounded-none bg-card border-rule text-bone"
                />
              </div>
            </div>
          )}

          {step.key === "review" && (
            <ReviewSummary state={state} onJump={(i) => setStepIdx(i)} />
          )}
        </div>

        {error && (
          <div className="mt-8 border border-flame/40 bg-flame/10 p-4 text-flame">
            {error}
          </div>
        )}

        <div className="mt-12 flex items-center gap-4 border-t border-rule pt-6">
          <Button
            type="button"
            variant="outline"
            disabled={stepIdx === 0}
            onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
            className="rounded-none px-6 py-5 mono border-rule text-bone hover:border-amber hover:text-amber disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          {!isLast ? (
            <Button
              type="button"
              disabled={!stepValid}
              onClick={() => setStepIdx((i) => Math.min(STEPS.length - 1, i + 1))}
              className="rounded-none px-8 py-5 mono ml-auto"
            >
              Continue <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="rounded-none px-8 py-5 mono ml-auto"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>Send the brief →</>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Review summary ──────────────────────────────────────────────────────

function ReviewSummary({
  state,
  onJump,
}: {
  state: FormState
  onJump: (i: number) => void
}) {
  const rows: Array<{ label: string; value: string | null; stepIdx: number }> = [
    {
      label: "When",
      value: state.flexible_months
        ? "Open to suggestions"
        : state.months.length
          ? state.months.join(" · ")
          : null,
      stepIdx: 0,
    },
    {
      label: "Trip",
      value: state.intent.length
        ? state.intent.map((v) => labelFor(INTENT_OPTIONS, v)).filter(Boolean).join(", ")
        : null,
      stepIdx: 1,
    },
    {
      label: "Rhythm",
      value: labelFor(PACE_OPTIONS, state.pace),
      stepIdx: 2,
    },
    {
      label: "Quiet",
      value: state.quiet_markers.length
        ? state.quiet_markers.map((v) => labelFor(QUIET_OPTIONS, v)).filter(Boolean).join(", ")
        : "—",
      stepIdx: 3,
    },
    {
      label: "Wildlife",
      value: state.wildlife_priorities.length
        ? state.wildlife_priorities
            .map((v) => labelFor(WILDLIFE_OPTIONS, v))
            .filter(Boolean)
            .join(", ")
        : null,
      stepIdx: 4,
    },
    {
      label: "Duration",
      value: labelFor(DURATION_OPTIONS, state.duration),
      stepIdx: 5,
    },
    {
      label: "Season",
      value: labelFor(SEASON_OPTIONS, state.season_preference),
      stepIdx: 6,
    },
    {
      label: "Budget",
      value: labelFor(BUDGET_TIER_OPTIONS, state.budget_tier),
      stepIdx: 7,
    },
    {
      label: "From",
      value:
        state.contact_name && state.contact_email
          ? `${state.contact_name} · ${state.contact_email}`
          : null,
      stepIdx: 8,
    },
  ]

  return (
    <dl className="border-t border-rule">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-start gap-6 border-b border-rule py-4"
        >
          <dt className="eyebrow w-32 shrink-0 pt-1">{row.label}</dt>
          <dd className="flex-1 text-bone leading-relaxed">
            {row.value ?? <span className="text-bone-mute">—</span>}
          </dd>
          <button
            type="button"
            onClick={() => onJump(row.stepIdx)}
            className="mono text-bone-mute hover:text-amber transition-colors text-xs shrink-0"
          >
            Edit
          </button>
        </div>
      ))}
    </dl>
  )
}
