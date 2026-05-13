"use client"

import { useEffect, useState } from "react"
import { Loader2, Mail } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Listing = {
  id: string
  listing_name: string
  contact_name?: string | null
  contact_email?: string | null
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  listing: Listing
  /** Pulled from editor_notes by the parent — pre-filled in the textarea. */
  prepopulatedQuestions: string[]
  /** Refresh history after a save. */
  onSaved: () => Promise<void>
}

/**
 * "Draft new outreach" modal — only the `featured` template ships in
 * this PR (other two intentionally not surfaced yet). The flow is:
 *
 *   1. Fill in recipient + (optionally) edit the clarifying questions
 *   2. Click "Open in mail client" → POST creates a `drafted` row,
 *      response carries the mailto URL, browser opens the user's
 *      default mail client.
 *   3. Once the operator email is actually sent, click "Mark as sent"
 *      to flip the row to status=sent.
 */
export function OutreachDraftModal({
  open,
  onOpenChange,
  listing,
  prepopulatedQuestions,
  onSaved,
}: Props) {
  const [recipientEmail, setRecipientEmail] = useState(
    listing.contact_email ?? "",
  )
  const [recipientName, setRecipientName] = useState(
    listing.contact_name ?? "",
  )
  const [questionsText, setQuestionsText] = useState(
    prepopulatedQuestions.join("\n"),
  )
  const [draftedId, setDraftedId] = useState<string | null>(null)
  const [drafting, setDrafting] = useState(false)
  const [markingSent, setMarkingSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // When the modal opens for a new draft session, reset state.
  useEffect(() => {
    if (open) {
      setRecipientEmail(listing.contact_email ?? "")
      setRecipientName(listing.contact_name ?? "")
      setQuestionsText(prepopulatedQuestions.join("\n"))
      setDraftedId(null)
      setError(null)
    }
  }, [open, listing.contact_email, listing.contact_name, prepopulatedQuestions])

  const customQuestions = questionsText
    .split(/\r?\n/)
    .map((q) => q.trim())
    .filter(Boolean)

  const canOpen = recipientEmail.trim().length > 0 && !drafting

  async function handleOpenInMailClient() {
    if (!canOpen) return
    setDrafting(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/admin/listings/${listing.id}/outreach`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            template: "featured",
            recipient_email: recipientEmail.trim(),
            recipient_name: recipientName.trim() || null,
            custom_questions: customQuestions,
          }),
        },
      )
      const data = await res.json()
      if (!res.ok) {
        setError(
          Array.isArray(data.errors)
            ? data.errors.join("; ")
            : data.error || `HTTP ${res.status}`,
        )
        setDrafting(false)
        return
      }
      setDraftedId(data.outreach.id as string)
      // Pop the user's default mail client. Some browsers prefer
      // window.open; window.location.href is more reliable for mailto.
      window.location.href = data.mailto_url as string
      await onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error")
    } finally {
      setDrafting(false)
    }
  }

  async function handleMarkAsSent() {
    if (!draftedId) return
    setMarkingSent(true)
    try {
      await fetch(
        `/api/admin/listings/${listing.id}/outreach/${draftedId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "sent",
            sent_via: "mailto",
          }),
        },
      )
      await onSaved()
      onOpenChange(false)
    } finally {
      setMarkingSent(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Draft outreach: {listing.listing_name}</DialogTitle>
          <DialogDescription>
            Template A (Featured). Opens in your default mail client; the
            row is saved as drafted until you mark it sent.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="outreach-recipient-name">
                Recipient name
              </Label>
              <Input
                id="outreach-recipient-name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Sarah, or the Gardiner family"
                disabled={drafting || !!draftedId}
              />
            </div>
            <div>
              <Label htmlFor="outreach-recipient-email">
                Recipient email
              </Label>
              <Input
                id="outreach-recipient-email"
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="reservations@matetsi.com"
                disabled={drafting || !!draftedId}
                data-testid="outreach-recipient-email"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="outreach-questions">
              Clarifying questions (one per line)
            </Label>
            <Textarea
              id="outreach-questions"
              value={questionsText}
              onChange={(e) => setQuestionsText(e.target.value)}
              rows={5}
              placeholder={
                "e.g. Are walking safaris part of the offer on the concession?"
              }
              disabled={drafting || !!draftedId}
              data-testid="outreach-questions"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Pulled from the listing&apos;s editor notes when possible.
              Edit before sending.
            </p>
          </div>

          {error && (
            <div className="text-sm text-red-700" role="alert">
              {error}
            </div>
          )}

          {draftedId && (
            <div className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 rounded-md">
              Draft saved. If your mail client didn&apos;t open, copy the
              email body from the listing notes manually. Click{" "}
              <strong>Mark as sent</strong> once you&apos;ve actually sent
              the email.
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={drafting || markingSent}
          >
            Cancel
          </Button>
          {!draftedId ? (
            <Button
              onClick={handleOpenInMailClient}
              disabled={!canOpen}
              data-testid="open-mail-client"
            >
              {drafting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              Open in mail client
            </Button>
          ) : (
            <Button
              onClick={handleMarkAsSent}
              disabled={markingSent}
              data-testid="mark-as-sent"
            >
              {markingSent ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Mark as sent
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
