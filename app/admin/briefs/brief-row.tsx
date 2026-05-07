"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"

import type { BriefStatus } from "@/lib/briefs/types"
import { STATUS_LABELS } from "@/lib/briefs/types"
import { cn } from "@/lib/utils"

type Brief = {
  id: string
  created_at: string
  contact_name: string
  contact_email: string
  contact_phone: string | null
  chapters: string[]
  months: string[]
  rhythm: string | null
  nights: number | null
  travelers: number | null
  budget_per_person: string | null
  notes: string | null
  status: BriefStatus
  assigned_to: string | null
  internal_notes: string | null
}

const STATUS_TONE: Record<BriefStatus, string> = {
  new: "bg-amber/15 text-amber-deep border-amber/40",
  reviewing: "bg-blue-100 text-blue-800 border-blue-200",
  sent: "bg-emerald-100 text-emerald-800 border-emerald-200",
  closed: "bg-stone-200 text-stone-700 border-stone-300",
}

const STATUS_OPTIONS: BriefStatus[] = ["new", "reviewing", "sent", "closed"]

export function BriefRow({ brief: initial }: { brief: Brief }) {
  const router = useRouter()
  const [brief, setBrief] = useState(initial)
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [internalDraft, setInternalDraft] = useState(brief.internal_notes ?? "")

  async function patch(updates: { status?: BriefStatus; internal_notes?: string }) {
    setError(null)
    try {
      const res = await fetch(`/api/admin/briefs/${brief.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: brief.status, ...updates }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
      if (data.brief) setBrief(data.brief)
      // Refresh the server page so KPI tiles re-count.
      startTransition(() => router.refresh())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed")
    }
  }

  return (
    <>
      <tr className="border-t hover:bg-stone-50">
        <td className="px-4 py-3 align-top">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 text-left text-stone-900 hover:text-stone-700"
          >
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            <span className="font-medium">{brief.contact_name}</span>
          </button>
          <p className="mt-1 text-xs text-stone-500">{brief.contact_email}</p>
        </td>
        <td className="px-4 py-3 align-top text-stone-700">
          {brief.chapters.join(", ") || <span className="text-stone-400">—</span>}
        </td>
        <td className="px-4 py-3 align-top text-stone-700">
          {brief.months.join(", ") || <span className="text-stone-400">—</span>}
        </td>
        <td className="px-4 py-3 align-top tabular-nums text-stone-700">
          {brief.nights ?? "—"}
          {brief.travelers ? ` · ${brief.travelers}p` : ""}
        </td>
        <td className="px-4 py-3 align-top text-stone-700">{brief.budget_per_person ?? "—"}</td>
        <td className="px-4 py-3 align-top">
          <select
            value={brief.status}
            onChange={(e) => {
              const next = e.target.value as BriefStatus
              setBrief((b) => ({ ...b, status: next }))
              patch({ status: next })
            }}
            className={cn(
              "border px-2 py-1 text-xs font-medium uppercase tracking-wider rounded-none",
              STATUS_TONE[brief.status],
            )}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          {pending && <Loader2 className="inline-block ml-2 h-3 w-3 animate-spin text-stone-500" />}
        </td>
        <td className="px-4 py-3 align-top text-xs text-stone-500">
          {new Date(brief.created_at).toLocaleDateString()}
        </td>
      </tr>
      {open && (
        <tr className="bg-stone-50">
          <td colSpan={7} className="px-4 py-5">
            <div className="grid gap-6 md:grid-cols-2 max-w-5xl">
              <div className="space-y-3 text-sm">
                <Field label="Phone" value={brief.contact_phone} />
                <Field label="Rhythm" value={brief.rhythm} />
                <Field
                  label="Notes from traveller"
                  value={brief.notes}
                  multiline
                />
                <Field label="Assigned to" value={brief.assigned_to} />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-2">
                  Internal notes
                </label>
                <textarea
                  value={internalDraft}
                  onChange={(e) => setInternalDraft(e.target.value)}
                  rows={6}
                  className="w-full border border-stone-300 bg-white px-3 py-2 text-sm rounded-none focus:outline-none focus:border-stone-500"
                  placeholder="Triage notes, operator suggestions, follow-up reminders…"
                />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => patch({ internal_notes: internalDraft })}
                    className="bg-stone-900 text-white px-4 py-2 text-xs uppercase tracking-wider hover:bg-stone-700 rounded-none"
                  >
                    Save notes
                  </button>
                  {error && <span className="text-xs text-red-600">{error}</span>}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

function Field({
  label,
  value,
  multiline = false,
}: {
  label: string
  value: string | null
  multiline?: boolean
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-stone-500 mb-1">{label}</p>
      {value ? (
        multiline ? (
          <p className="whitespace-pre-wrap text-stone-800">{value}</p>
        ) : (
          <p className="text-stone-800">{value}</p>
        )
      ) : (
        <p className="text-stone-400">—</p>
      )}
    </div>
  )
}
