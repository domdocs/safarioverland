"use client"

import { useEffect, useState } from "react"
import { Loader2, Mail, MailCheck, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  STATUS_LABELS,
  TEMPLATE_LABELS,
  type ListingOutreach,
} from "@/lib/email/outreach-types"
import { extractClarifyingQuestions } from "@/lib/email/outreach"
import { cn } from "@/lib/utils"

import { OutreachDraftModal } from "./outreach-draft-modal"

type Listing = {
  id: string
  listing_name: string
  contact_name?: string | null
  contact_email?: string | null
  status: "pending" | "approved" | "rejected"
  featured: boolean
  editor_notes?: string | null
}

type Props = {
  listing: Listing
}

/**
 * Outreach section rendered on the listing edit page. Loads history
 * once on mount, lets the user draft a new outreach via a modal, and
 * mark it as sent once they've opened it in their mail client.
 */
export function OutreachSection({ listing }: Props) {
  const [history, setHistory] = useState<ListingOutreach[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  async function refresh() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/admin/listings/${listing.id}/outreach`,
        { cache: "no-store" },
      )
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || `HTTP ${res.status}`)
      } else {
        setHistory((data.outreach ?? []) as ListingOutreach[])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing.id])

  const latest = history[0] ?? null
  const prepopulatedQuestions = extractClarifyingQuestions(
    listing.editor_notes,
  )

  return (
    <Card className="mt-8">
      <CardContent className="p-6 space-y-6">
        <header className="flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-semibold">Outreach</h2>
            <p className="text-muted-foreground text-sm">
              Personal emails to the operator. Sent from your mail client,
              tracked here.
            </p>
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            data-testid="draft-outreach-button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Draft new outreach
          </Button>
        </header>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading outreach history…
          </div>
        ) : error ? (
          <div className="text-sm text-red-700">Couldn&apos;t load: {error}</div>
        ) : latest ? (
          <CurrentStatus latest={latest} />
        ) : (
          <p className="text-sm text-muted-foreground">
            No outreach yet for this listing.
          </p>
        )}

        {history.length > 0 && (
          <HistoryList
            history={history}
            onMarkSent={async (entryId) => {
              await fetch(
                `/api/admin/listings/${listing.id}/outreach/${entryId}`,
                {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    status: "sent",
                    sent_via: "mailto",
                  }),
                },
              )
              await refresh()
            }}
          />
        )}
      </CardContent>

      <OutreachDraftModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        listing={listing}
        prepopulatedQuestions={prepopulatedQuestions}
        onSaved={refresh}
      />
    </Card>
  )
}

// ── Current-status pill ──────────────────────────────────────────────────

function CurrentStatus({ latest }: { latest: ListingOutreach }) {
  const sentAgo = latest.sent_at
    ? humanRelative(new Date(latest.sent_at))
    : null
  const tone =
    latest.status === "sent"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : latest.status === "replied"
        ? "bg-blue-100 text-blue-800 border-blue-200"
        : latest.status === "drafted"
          ? "bg-amber-100 text-amber-800 border-amber-200"
          : "bg-stone-100 text-stone-700 border-stone-200"

  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={cn(
            "inline-flex items-center gap-1 border px-2 py-0.5 text-xs font-medium uppercase tracking-wider rounded-none",
            tone,
          )}
        >
          {latest.status === "sent" ? (
            <MailCheck className="h-3 w-3" />
          ) : (
            <Mail className="h-3 w-3" />
          )}
          {STATUS_LABELS[latest.status]}
        </span>
        {sentAgo ? (
          <span className="text-muted-foreground">· {sentAgo}</span>
        ) : null}
        {latest.status === "sent" ? (
          <span className="text-muted-foreground">· Awaiting reply</span>
        ) : null}
      </div>
      <div className="text-muted-foreground">
        Last template:{" "}
        <span className="text-foreground">
          {TEMPLATE_LABELS[latest.template]}
        </span>
      </div>
      <div className="text-muted-foreground">
        Recipient:{" "}
        <span className="text-foreground">{latest.recipient_email}</span>
      </div>
    </div>
  )
}

// ── History list ────────────────────────────────────────────────────────

function HistoryList({
  history,
  onMarkSent,
}: {
  history: ListingOutreach[]
  onMarkSent: (id: string) => Promise<void>
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
        Outreach history
      </p>
      <ul className="divide-y divide-border rounded-md border border-border">
        {history.map((entry) => (
          <li
            key={entry.id}
            className="flex items-center gap-4 px-4 py-3 text-sm"
          >
            <span className="font-mono text-xs text-muted-foreground tabular-nums shrink-0">
              {entry.created_at.slice(0, 10)}
            </span>
            <span className="shrink-0">{TEMPLATE_LABELS[entry.template]}</span>
            <span className="text-muted-foreground">
              ·{" "}
              {entry.status === "drafted"
                ? "Drafted, not sent"
                : entry.sent_via
                  ? `Sent via ${entry.sent_via}`
                  : STATUS_LABELS[entry.status]}
            </span>
            <span className="flex-1" />
            {entry.status === "drafted" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onMarkSent(entry.id)}
              >
                Mark as sent
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Helper ───────────────────────────────────────────────────────────────

function humanRelative(date: Date): string {
  const now = Date.now()
  const diffMs = now - date.getTime()
  const diffMin = Math.round(diffMs / 60000)
  if (diffMin < 1) return "just now"
  if (diffMin < 60) return `${diffMin} min ago`
  const diffHour = Math.round(diffMin / 60)
  if (diffHour < 24) return `${diffHour} hr ago`
  const diffDay = Math.round(diffHour / 24)
  if (diffDay < 30) return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`
  return date.toLocaleDateString()
}
