"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Check } from "lucide-react"

type Status = "idle" | "submitting" | "success" | "error"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "submitting") return

    const trimmed = email.trim()
    if (!trimmed) {
      setStatus("error")
      setErrorMessage("Please enter your email address.")
      return
    }

    setStatus("submitting")
    setErrorMessage(null)

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          sourceUrl: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        if (res.status === 400 && data?.error === "invalid_payload") {
          setErrorMessage("That email address doesn't look right.")
        } else {
          setErrorMessage("Something went wrong. Please try again in a moment.")
        }
        setStatus("error")
        return
      }

      setStatus("success")
      setEmail("")
    } catch (err) {
      console.error("newsletter subscribe failed", err)
      setErrorMessage("Couldn't reach the server. Check your connection and try again.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-md mx-auto" aria-live="polite">
        <div className="flex items-center justify-center gap-2 rounded-md bg-primary/15 px-4 py-3 text-primary">
          <Check className="h-5 w-5 flex-shrink-0" />
          <p className="font-medium">You're subscribed. Watch your inbox.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === "error") setStatus("idle")
          }}
          placeholder="Your email address"
          className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
          required
          autoComplete="email"
          disabled={status === "submitting"}
          aria-label="Email address"
          aria-invalid={status === "error" ? true : undefined}
          aria-describedby={errorMessage ? "newsletter-error" : undefined}
        />
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Subscribing
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>
      {errorMessage && (
        <p id="newsletter-error" role="alert" className="mt-2 text-sm text-destructive">
          {errorMessage}
        </p>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        No spam. Unsubscribe anytime. We&apos;ll only email occasional safari planning tips and
        updates from the directory.
      </p>
    </form>
  )
}
