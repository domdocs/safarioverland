"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Eyebrow } from "@/components/editorial/eyebrow"
import {
  BUDGET_OPTIONS,
  CHAPTER_OPTIONS,
  MONTH_OPTIONS,
  RHYTHM_OPTIONS,
  type BudgetOption,
  type ChapterOption,
  type MonthOption,
  type RhythmOption,
} from "@/lib/briefs/options"
import { cn } from "@/lib/utils"

type FormState = {
  months: MonthOption[]
  chapters: ChapterOption[]
  rhythm: RhythmOption | ""
  nights: string
  travelers: string
  budget_per_person: BudgetOption | ""
  notes: string
  contact_name: string
  contact_email: string
  contact_phone: string
}

const EMPTY: FormState = {
  months: [],
  chapters: [],
  rhythm: "",
  nights: "",
  travelers: "2",
  budget_per_person: "",
  notes: "",
  contact_name: "",
  contact_email: "",
  contact_phone: "",
}

const STORAGE_KEY = "so_trip_builder_v1"

const STEPS = [
  { key: "when", title: "When can you travel?", lede: "Pick the months that work. You can choose more than one." },
  { key: "where", title: "Where are you drawn to?", lede: "Pick one or more regions. We'll narrow inside the brief." },
  { key: "rhythm", title: "What rhythm?", lede: "How do you want to spend the days?" },
  { key: "shape", title: "How long, how many?", lede: "Nights and travelers — your honest working budget." },
  { key: "you", title: "Who shall we get back to?", lede: "Name + email at minimum. Reply within 48 hours." },
] as const

type StepKey = (typeof STEPS)[number]["key"]

function isStepValid(step: StepKey, s: FormState): boolean {
  switch (step) {
    case "when":
      return s.months.length > 0
    case "where":
      return s.chapters.length > 0
    case "rhythm":
      return !!s.rhythm
    case "shape":
      return !!s.nights && Number(s.nights) > 0 && Number(s.travelers) > 0
    case "you":
      return s.contact_name.trim().length >= 2 && /\S+@\S+\.\S+/.test(s.contact_email)
  }
}

export function TripBuilderForm() {
  const [stepIdx, setStepIdx] = useState(0)
  const [state, setState] = useState<FormState>(EMPTY)
  const [hydrated, setHydrated] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submittedId, setSubmittedId] = useState<string | null>(null)

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
  const isLast = stepIdx === STEPS.length - 1

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }))
  }

  function toggleArray<T extends string>(key: "months" | "chapters", value: T) {
    setState((s) => {
      const current = s[key] as readonly string[]
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...s, [key]: next as FormState[typeof key] }
    })
  }

  async function handleSubmit() {
    if (!stepValid) return
    setSubmitting(true)
    setError(null)
    try {
      const payload = {
        chapters: state.chapters,
        months: state.months,
        rhythm: state.rhythm || undefined,
        nights: state.nights ? Number(state.nights) : undefined,
        travelers: state.travelers ? Number(state.travelers) : undefined,
        budget_per_person: state.budget_per_person || undefined,
        notes: state.notes || undefined,
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
      setSubmittedId(data.brief?.id || "ok")
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
    } catch {
      setError("Network error. Try again?")
      setSubmitting(false)
    }
  }

  // ─── Success state ─────────────────────────────────────────
  if (submittedId) {
    return (
      <div className="border border-rule bg-card p-10 max-w-2xl">
        <div className="flex items-baseline gap-3 mb-4">
          <Check className="h-5 w-5 text-amber" aria-hidden />
          <span className="eyebrow">Brief received</span>
        </div>
        <h2 className="font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
          Thanks. We&apos;ll be in touch within{" "}
          <span className="italic text-amber">48 hours</span>.
        </h2>
        <p className="mt-6 text-bone-mute leading-relaxed">
          A confirmation has gone to{" "}
          <span className="text-bone">{state.contact_email || "your inbox"}</span>.
          A planner will come back with three routes within 48 hours.
          If you remember anything else worth knowing, just reply to that email.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild size="lg" className="rounded-none px-8 py-6 mono">
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
    )
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Sidebar — step rail */}
      <aside className="lg:col-span-4">
        <div className="sticky top-24">
          <Eyebrow withRule>
            Brief — {String(stepIdx + 1).padStart(2, "0")} of {String(STEPS.length).padStart(2, "0")}
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
                        "font-serif text-lg leading-tight",
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
        <p className="eyebrow">{`Step ${String(stepIdx + 1).padStart(2, "0")}`}</p>
        <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
          {step.title}
        </h2>
        <p className="mt-4 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
          {step.lede}
        </p>

        <div className="mt-12">
          {step.key === "when" && (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {MONTH_OPTIONS.map((m) => {
                const selected = state.months.includes(m)
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => toggleArray("months", m)}
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
          )}

          {step.key === "where" && (
            <ul className="grid sm:grid-cols-2 gap-4">
              {CHAPTER_OPTIONS.map((c) => {
                const selected = (state.chapters as string[]).includes(c.value)
                return (
                  <li key={c.value}>
                    <button
                      type="button"
                      onClick={() => toggleArray("chapters", c.value as ChapterOption)}
                      aria-pressed={selected}
                      className={cn(
                        "block w-full text-left border p-6 transition-colors",
                        selected
                          ? "border-amber bg-amber/10"
                          : "border-rule hover:border-amber",
                      )}
                    >
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <span className="font-serif text-h4-fluid text-bone leading-tight">
                          {c.value}
                        </span>
                        {selected && (
                          <Check className="h-4 w-4 text-amber shrink-0" aria-hidden />
                        )}
                      </div>
                      <p className="mono text-bone-mute">{c.lede}</p>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {step.key === "rhythm" && (
            <ul className="space-y-3">
              {RHYTHM_OPTIONS.map((r) => {
                const selected = state.rhythm === r.value
                return (
                  <li key={r.value}>
                    <button
                      type="button"
                      onClick={() => update("rhythm", r.value as RhythmOption)}
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
                          {r.value}
                        </span>
                        {selected && (
                          <Check className="h-4 w-4 text-amber ml-auto shrink-0" aria-hidden />
                        )}
                      </div>
                      <p className="mt-1 text-bone-mute">{r.lede}</p>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {step.key === "shape" && (
            <div className="space-y-8 max-w-xl">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nights" className="eyebrow block mb-3">
                    Nights on safari
                  </Label>
                  <Input
                    id="nights"
                    type="number"
                    min={1}
                    max={120}
                    inputMode="numeric"
                    value={state.nights}
                    onChange={(e) => update("nights", e.target.value)}
                    placeholder="10"
                    className="rounded-none bg-card border-rule text-bone"
                  />
                </div>
                <div>
                  <Label htmlFor="travelers" className="eyebrow block mb-3">
                    Travelers
                  </Label>
                  <Input
                    id="travelers"
                    type="number"
                    min={1}
                    max={20}
                    inputMode="numeric"
                    value={state.travelers}
                    onChange={(e) => update("travelers", e.target.value)}
                    placeholder="2"
                    className="rounded-none bg-card border-rule text-bone"
                  />
                </div>
              </div>

              <div>
                <p className="eyebrow mb-3">Working budget per person</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {BUDGET_OPTIONS.map((b) => {
                    const selected = state.budget_per_person === b
                    return (
                      <li key={b}>
                        <button
                          type="button"
                          onClick={() => update("budget_per_person", b)}
                          aria-pressed={selected}
                          className={cn(
                            "w-full text-left border px-4 py-3 mono transition-colors",
                            selected
                              ? "bg-amber text-night border-amber"
                              : "border-rule text-bone-mute hover:border-amber hover:text-amber",
                          )}
                        >
                          {b}
                        </button>
                      </li>
                    )
                  })}
                </ul>
                <p className="mt-3 text-sm text-bone-mute">
                  Honest is more useful than aspirational. We&apos;ll suggest options on either side.
                </p>
              </div>
            </div>
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
                <Label htmlFor="notes" className="eyebrow block mb-3">
                  Anything else?
                </Label>
                <Textarea
                  id="notes"
                  value={state.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Honeymoon, kids' ages, mobility considerations, parks already in mind…"
                  rows={5}
                  className="rounded-none bg-card border-rule text-bone"
                />
              </div>
            </div>
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
              disabled={!stepValid || submitting}
              onClick={handleSubmit}
              className="rounded-none px-8 py-5 mono ml-auto"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>Send brief →</>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
