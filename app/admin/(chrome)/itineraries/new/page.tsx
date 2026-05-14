"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function NewItineraryPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const trimmed = title.trim()
    if (trimmed.length === 0) {
      setError("Title is required.")
      return
    }
    if (trimmed.length > 80) {
      setError("Title must be 80 characters or fewer.")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/itineraries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: trimmed }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Failed to create itinerary")
      }
      router.push(`/admin/itineraries/${json.id}/edit`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed")
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href="/admin/itineraries"
          className="text-sm text-stone-500 hover:underline"
        >
          ← Back to itineraries
        </Link>
        <h1 className="text-3xl font-bold mt-2">New itinerary</h1>
        <p className="text-stone-600 mt-1">
          Start with a working title. You can fill in everything else on the
          next screen.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Whitford — Sept 2026"
                maxLength={80}
                autoFocus
                disabled={submitting}
              />
              <p className="text-xs text-stone-500 mt-1">
                Internal reference. Won't appear on the cover — the cover
                title is set separately.
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/itineraries">Cancel</Link>
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Creating…" : "Create itinerary"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
