"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, CheckCircle2, Download } from "lucide-react"

type RequestPayload = {
  slug: string
  title: string
  description: string
}

type Props = {
  request: RequestPayload | null
  pendingMessage: string | null
  onClose: () => void
}

export function DownloadGateModal({ request, pendingMessage, onClose }: Props) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [marketingConsent, setMarketingConsent] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ available: boolean; signedUrl: string | null } | null>(null)

  // Reset state when a new request comes in or the modal closes.
  useEffect(() => {
    if (!request) {
      setEmail("")
      setFirstName("")
      setMarketingConsent(true)
      setError(null)
      setSuccess(null)
      setSubmitting(false)
    }
  }, [request])

  if (!request) return null

  // The "pending — we don't have the file yet" path: subscriber is already
  // captured, no form needed, just inform them.
  if (pendingMessage && !success) {
    return (
      <Dialog open onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{request.title}</DialogTitle>
            <DialogDescription>{pendingMessage}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-2">
            <Button onClick={onClose}>Got it</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!request) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/downloads/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          slug: request.slug,
          email,
          firstName,
          marketingConsent,
          sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error === "invalid_payload" ? "Please check the form fields." : "Something went wrong. Try again?")
        setSubmitting(false)
        return
      }
      setSuccess({ available: !!data.available, signedUrl: data.signedUrl })
      if (data.signedUrl) {
        // Trigger download immediately
        window.open(data.signedUrl, "_blank", "noopener,noreferrer")
      }
    } catch {
      setError("Network error. Try again?")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <Dialog open onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <DialogTitle>{success.available ? "Your download is starting" : "We've got you on the list"}</DialogTitle>
            </div>
            <DialogDescription>
              {success.available
                ? `If the download didn't open in a new tab, you'll also receive ${request.title} by email shortly.`
                : `${request.title} is being finalised — we'll email it to you the moment it's ready.`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-2 gap-2">
            {success.signedUrl && (
              <Button asChild variant="outline">
                <a href={success.signedUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" /> Open again
                </a>
              </Button>
            )}
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download {request.title}</DialogTitle>
          <DialogDescription>{request.description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dl-firstName">First name</Label>
            <Input
              id="dl-firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
              required
              autoComplete="given-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dl-email">Email</Label>
            <Input
              id="dl-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              id="dl-consent"
              checked={marketingConsent}
              onCheckedChange={(v) => setMarketingConsent(v === true)}
              className="mt-1"
            />
            <Label htmlFor="dl-consent" className="text-sm font-normal leading-snug">
              Send me occasional safari planning tips, seasonal guides and operator recommendations. Unsubscribe any
              time.
            </Label>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <p className="text-xs text-muted-foreground">
            By downloading you agree to our{" "}
            <a href="/privacy-policy" className="underline hover:text-primary">
              privacy policy
            </a>
            .
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Get the download</>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
