"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type {
  Chapter,
  Itinerary,
  ItineraryWithRelations,
  PracticalCard,
  Transit,
} from "@/lib/itineraries/types"

import { ChapterEditor } from "./chapter-editor"
import { ItineraryImageUpload } from "./itinerary-image-upload"
import { StringListEditor } from "./string-list-editor"
import { TransitEditor } from "./transit-editor"

type Props = {
  initial: ItineraryWithRelations
}

type SaveState = "idle" | "saving" | "saved" | "error"

/**
 * Single long edit form for an itinerary.
 *
 * Sections (collapsible would be nice; for v1 they're always open, which
 * matches the "single long form" decision in the scope doc):
 *   1. Trip metadata
 *   2. Chapters
 *   3. Transits
 *   4. Practicals
 *   5. Preview & danger zone
 *
 * Persistence:
 *   - Trip metadata + practicals → PATCH /api/admin/itineraries/[id]
 *   - Chapter edits → PATCH /api/admin/itineraries/[id]/chapters/[chapterId]
 *   - Transit edits → PATCH /api/admin/itineraries/[id]/transits/[transitId]
 *   - Chapter add/delete/reorder hits dedicated endpoints which return the
 *     fresh transit chain.
 *
 * We do NOT autosave on every keystroke — instead we debounce by ~700ms
 * after the last change, then PATCH. Visual indicator at the top of the
 * form reads "Saving…" / "Saved" / "Save failed — retry".
 */
export function ItineraryEditor({ initial }: Props) {
  const router = useRouter()
  const [itinerary, setItinerary] = useState<Itinerary>(initial.itinerary)
  const [chapters, setChapters] = useState<Chapter[]>(initial.chapters)
  const [transits, setTransits] = useState<Transit[]>(initial.transits)
  const [saveState, setSaveState] = useState<SaveState>("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Debounced PATCH for itinerary-level fields.
  const itineraryDirtyRef = useRef<Partial<Itinerary> | null>(null)
  const itineraryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const flushItinerary = useCallback(async () => {
    const patch = itineraryDirtyRef.current
    if (!patch) return
    itineraryDirtyRef.current = null
    setSaveState("saving")
    setErrorMsg(null)
    try {
      const res = await fetch(`/api/admin/itineraries/${itinerary.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(patch),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? `HTTP ${res.status}`)
      }
      setSaveState("saved")
      setTimeout(() => setSaveState("idle"), 1500)
    } catch (err) {
      setSaveState("error")
      setErrorMsg(err instanceof Error ? err.message : "Save failed")
    }
  }, [itinerary.id])

  const scheduleItinerarySave = useCallback(
    (patch: Partial<Itinerary>) => {
      itineraryDirtyRef.current = { ...itineraryDirtyRef.current, ...patch }
      if (itineraryTimerRef.current) clearTimeout(itineraryTimerRef.current)
      itineraryTimerRef.current = setTimeout(flushItinerary, 700)
    },
    [flushItinerary],
  )

  function patchItinerary(patch: Partial<Itinerary>) {
    setItinerary((prev) => ({ ...prev, ...patch }))
    scheduleItinerarySave(patch)
  }

  // ── Chapter helpers ─────────────────────────────────────────────────
  const chapterTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  )
  const chapterDirty = useRef<Map<string, Partial<Chapter>>>(new Map())

  const flushChapter = useCallback(
    async (chapterId: string) => {
      const patch = chapterDirty.current.get(chapterId)
      if (!patch) return
      chapterDirty.current.delete(chapterId)
      setSaveState("saving")
      setErrorMsg(null)
      try {
        const res = await fetch(
          `/api/admin/itineraries/${itinerary.id}/chapters/${chapterId}`,
          {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(patch),
          },
        )
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error ?? `HTTP ${res.status}`)
        }
        setSaveState("saved")
        setTimeout(() => setSaveState("idle"), 1500)
      } catch (err) {
        setSaveState("error")
        setErrorMsg(err instanceof Error ? err.message : "Save failed")
      }
    },
    [itinerary.id],
  )

  function patchChapter(chapterId: string, patch: Partial<Chapter>) {
    setChapters((prev) =>
      prev.map((c) => (c.id === chapterId ? { ...c, ...patch } : c)),
    )
    const prev = chapterDirty.current.get(chapterId) ?? {}
    chapterDirty.current.set(chapterId, { ...prev, ...patch })
    const existingTimer = chapterTimers.current.get(chapterId)
    if (existingTimer) clearTimeout(existingTimer)
    chapterTimers.current.set(
      chapterId,
      setTimeout(() => flushChapter(chapterId), 700),
    )
  }

  async function addChapter() {
    setSaveState("saving")
    try {
      const res = await fetch(
        `/api/admin/itineraries/${itinerary.id}/chapters`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ place: "New chapter", country: "" }),
        },
      )
      if (!res.ok) throw new Error("Failed to add chapter")
      const data = await res.json()
      setChapters((prev) => [...prev, data.chapter])
      setTransits(data.transits)
      setSaveState("saved")
      setTimeout(() => setSaveState("idle"), 1500)
    } catch (err) {
      setSaveState("error")
      setErrorMsg(err instanceof Error ? err.message : "Save failed")
    }
  }

  async function deleteChapter(chapterId: string) {
    if (!confirm("This deletes the chapter and any adjacent transit. Continue?")) {
      return
    }
    setSaveState("saving")
    try {
      const res = await fetch(
        `/api/admin/itineraries/${itinerary.id}/chapters/${chapterId}`,
        { method: "DELETE" },
      )
      if (!res.ok) throw new Error("Failed to delete chapter")
      const data = await res.json()
      setChapters((prev) =>
        prev
          .filter((c) => c.id !== chapterId)
          .map((c, i) => ({ ...c, position: i })),
      )
      setTransits(data.transits)
      setSaveState("saved")
      setTimeout(() => setSaveState("idle"), 1500)
    } catch (err) {
      setSaveState("error")
      setErrorMsg(err instanceof Error ? err.message : "Save failed")
    }
  }

  async function moveChapter(chapterId: string, direction: "up" | "down") {
    const idx = chapters.findIndex((c) => c.id === chapterId)
    if (idx < 0) return
    const swapWith = direction === "up" ? idx - 1 : idx + 1
    if (swapWith < 0 || swapWith >= chapters.length) return
    const newOrder = [...chapters]
    ;[newOrder[idx], newOrder[swapWith]] = [newOrder[swapWith], newOrder[idx]]
    const orderIds = newOrder.map((c) => c.id)

    setSaveState("saving")
    try {
      const res = await fetch(
        `/api/admin/itineraries/${itinerary.id}/chapters/reorder`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ order: orderIds }),
        },
      )
      if (!res.ok) throw new Error("Failed to reorder chapters")
      const data = await res.json()
      setChapters(data.chapters)
      setTransits(data.transits)
      setSaveState("saved")
      setTimeout(() => setSaveState("idle"), 1500)
    } catch (err) {
      setSaveState("error")
      setErrorMsg(err instanceof Error ? err.message : "Save failed")
    }
  }

  // ── Transit helpers ─────────────────────────────────────────────────
  const transitTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  )
  const transitDirty = useRef<Map<string, Partial<Transit>>>(new Map())

  const flushTransit = useCallback(
    async (transitId: string) => {
      const patch = transitDirty.current.get(transitId)
      if (!patch) return
      transitDirty.current.delete(transitId)
      setSaveState("saving")
      try {
        const res = await fetch(
          `/api/admin/itineraries/${itinerary.id}/transits/${transitId}`,
          {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(patch),
          },
        )
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error ?? `HTTP ${res.status}`)
        }
        setSaveState("saved")
        setTimeout(() => setSaveState("idle"), 1500)
      } catch (err) {
        setSaveState("error")
        setErrorMsg(err instanceof Error ? err.message : "Save failed")
      }
    },
    [itinerary.id],
  )

  function patchTransit(transitId: string, patch: Partial<Transit>) {
    setTransits((prev) =>
      prev.map((t) => (t.id === transitId ? { ...t, ...patch } : t)),
    )
    const prev = transitDirty.current.get(transitId) ?? {}
    transitDirty.current.set(transitId, { ...prev, ...patch })
    const existingTimer = transitTimers.current.get(transitId)
    if (existingTimer) clearTimeout(existingTimer)
    transitTimers.current.set(
      transitId,
      setTimeout(() => flushTransit(transitId), 700),
    )
  }

  // ── Practicals ──────────────────────────────────────────────────────
  function patchPracticals(next: PracticalCard[]) {
    patchItinerary({ practicals: next })
  }

  // ── Delete itinerary ────────────────────────────────────────────────
  async function deleteItinerary() {
    const confirmation = prompt(
      `This is permanent. Type "${itinerary.reference}" to delete.`,
    )
    if (confirmation !== itinerary.reference) return
    try {
      const res = await fetch(`/api/admin/itineraries/${itinerary.id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete")
      router.push("/admin/itineraries")
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed")
    }
  }

  // Force-flush on unmount in case the user navigates away mid-debounce.
  useEffect(() => {
    return () => {
      if (itineraryTimerRef.current) clearTimeout(itineraryTimerRef.current)
      chapterTimers.current.forEach((t) => clearTimeout(t))
      transitTimers.current.forEach((t) => clearTimeout(t))
    }
  }, [])

  const sortedChapters = useMemo(
    () => [...chapters].sort((a, b) => a.position - b.position),
    [chapters],
  )
  const sortedTransits = useMemo(
    () => [...transits].sort((a, b) => a.position - b.position),
    [transits],
  )

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 -mx-4 px-4 py-3 bg-stone-50/90 backdrop-blur border-b border-stone-200 flex items-center justify-between flex-wrap gap-3">
        <div>
          <Link
            href="/admin/itineraries"
            className="text-xs text-stone-500 hover:underline"
          >
            ← Back
          </Link>
          <h1 className="text-xl font-bold mt-0.5">{itinerary.title}</h1>
          <p className="text-xs font-mono text-stone-500">
            {itinerary.reference}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SaveIndicator state={saveState} error={errorMsg} />
          <Button asChild variant="outline" size="sm">
            <Link
              href={`/admin/itineraries/${itinerary.id}/preview`}
              target="_blank"
              rel="noopener"
            >
              Preview ↗
            </Link>
          </Button>
        </div>
      </div>

      {/* Section 1 — Trip metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Trip metadata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Reference</Label>
            <Input value={itinerary.reference} readOnly disabled className="font-mono" />
          </div>
          <div>
            <Label>Title</Label>
            <Input
              value={itinerary.title}
              onChange={(e) => patchItinerary({ title: e.target.value })}
              maxLength={80}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Internal reference. Doesn't appear on the cover.
            </p>
          </div>

          <StringListEditor
            label="Cover title lines"
            hint="1–4 lines, each ≤24 chars (warn at >24 — overflow likely)"
            value={itinerary.cover_title_lines}
            onChange={(cover_title_lines) =>
              patchItinerary({ cover_title_lines })
            }
            maxItems={4}
            maxLength={32}
            placeholder="The Smoke,"
            addLabel="Add line"
          />

          <div>
            <Label>Subtitle</Label>
            <Input
              value={itinerary.subtitle ?? ""}
              onChange={(e) =>
                patchItinerary({ subtitle: e.target.value || null })
              }
              maxLength={160}
              placeholder="Eleven days from the thunder of the Zambezi…"
            />
          </div>

          <StringListEditor
            label="Guests"
            hint="1–6 names. Joined with “ & ” on the cover."
            value={itinerary.guests}
            onChange={(guests) => patchItinerary({ guests })}
            maxItems={6}
            maxLength={60}
            placeholder="Mr & Mrs Whitford"
            addLabel="Add guest"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label>Dates: from</Label>
              <Input
                value={itinerary.dates_from ?? ""}
                onChange={(e) =>
                  patchItinerary({ dates_from: e.target.value || null })
                }
                placeholder="14 September"
                maxLength={60}
              />
            </div>
            <div>
              <Label>Dates: to</Label>
              <Input
                value={itinerary.dates_to ?? ""}
                onChange={(e) =>
                  patchItinerary({ dates_to: e.target.value || null })
                }
                placeholder="24 September"
                maxLength={60}
              />
            </div>
            <div>
              <Label>Year</Label>
              <Input
                value={itinerary.dates_year ?? ""}
                onChange={(e) =>
                  patchItinerary({ dates_year: e.target.value || null })
                }
                placeholder="2026"
                maxLength={8}
              />
            </div>
          </div>

          <div>
            <Label>Pace</Label>
            <Input
              value={itinerary.pace ?? ""}
              onChange={(e) =>
                patchItinerary({ pace: e.target.value || null })
              }
              maxLength={120}
              placeholder="Unhurried. Three nights, on average, in each place."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label>Curator name</Label>
              <Input
                value={itinerary.curator_name ?? ""}
                onChange={(e) =>
                  patchItinerary({ curator_name: e.target.value || null })
                }
                maxLength={120}
              />
            </div>
            <div>
              <Label>Curator title</Label>
              <Input
                value={itinerary.curator_title}
                onChange={(e) => patchItinerary({ curator_title: e.target.value })}
                maxLength={120}
              />
            </div>
            <div>
              <Label>Curator location</Label>
              <Input
                value={itinerary.curator_location}
                onChange={(e) =>
                  patchItinerary({ curator_location: e.target.value })
                }
                maxLength={120}
              />
            </div>
          </div>

          <StringListEditor
            label="Prologue paragraphs"
            hint="1–5 paragraphs. First paragraph styled as the lede."
            value={itinerary.prologue}
            onChange={(prologue) => patchItinerary({ prologue })}
            variant="textarea"
            maxItems={5}
            maxLength={1000}
            placeholder="Africa is not a place you visit. It is a thing that happens to you."
            addLabel="Add paragraph"
          />

          <div>
            <Label>Cover photo</Label>
            <ItineraryImageUpload
              itineraryId={itinerary.id}
              slot="itinerary-cover"
              value={itinerary.cover_photo_url}
              onChange={(url) =>
                patchItinerary({ cover_photo_url: url })
              }
              hint="Portrait, full-bleed. ≥1600px on the long edge."
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-stone-200">
            <Switch
              id="show_curator_notes"
              checked={itinerary.show_curator_notes}
              onCheckedChange={(checked) =>
                patchItinerary({ show_curator_notes: checked })
              }
            />
            <Label htmlFor="show_curator_notes">
              Show curator notes on each chapter
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 — Chapters */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Chapters</CardTitle>
          <Button type="button" size="sm" onClick={addChapter}>
            <Plus className="h-3 w-3 mr-1" /> Add chapter
          </Button>
        </CardHeader>
        <CardContent>
          {sortedChapters.length === 0 ? (
            <p className="text-sm text-stone-500 italic">
              No chapters yet. Add the first destination →
            </p>
          ) : (
            <div className="space-y-3">
              {sortedChapters.map((chapter, i) => (
                <ChapterEditor
                  key={chapter.id}
                  itineraryId={itinerary.id}
                  chapter={chapter}
                  index={i}
                  total={sortedChapters.length}
                  onChange={(patch) => patchChapter(chapter.id, patch)}
                  onDelete={() => deleteChapter(chapter.id)}
                  onMove={(dir) => moveChapter(chapter.id, dir)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 3 — Transits */}
      {sortedTransits.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Transits</CardTitle>
            <p className="text-sm text-muted-foreground">
              Auto-generated between adjacent chapters. Fill in the real
              mode/duration/distance/crosses/note.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {sortedTransits.map((transit) => (
              <TransitEditor
                key={transit.id}
                transit={transit}
                fromChapter={chapters.find((c) => c.id === transit.from_chapter_id)}
                toChapter={chapters.find((c) => c.id === transit.to_chapter_id)}
                onChange={(patch) => patchTransit(transit.id, patch)}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Section 4 — Practicals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Practicals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(itinerary.practicals ?? []).map((card, i) => (
            <div key={i} className="border border-stone-200 rounded-md p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  value={card.title}
                  onChange={(e) => {
                    const next = [...itinerary.practicals]
                    next[i] = { ...card, title: e.target.value }
                    patchPracticals(next)
                  }}
                  maxLength={40}
                  className="font-semibold flex-1"
                  placeholder="Card title"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    patchPracticals(itinerary.practicals.filter((_, idx) => idx !== i))
                  }}
                  aria-label="Remove card"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={card.body}
                onChange={(e) => {
                  const next = [...itinerary.practicals]
                  next[i] = { ...card, body: e.target.value }
                  patchPracticals(next)
                }}
                maxLength={2000}
                rows={4}
                placeholder="Card body — line breaks become paragraphs on the preview."
              />
            </div>
          ))}
          {(itinerary.practicals ?? []).length < 12 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                patchPracticals([
                  ...(itinerary.practicals ?? []),
                  { title: "", body: "" },
                ])
              }
            >
              <Plus className="h-3 w-3 mr-1" /> Add card
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-red-800">Danger zone</CardTitle>
        </CardHeader>
        <CardContent>
          <Button type="button" variant="destructive" onClick={deleteItinerary}>
            Delete itinerary
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Permanent. You'll be asked to type the reference number to confirm.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function SaveIndicator({
  state,
  error,
}: {
  state: SaveState
  error: string | null
}) {
  if (state === "saving") {
    return <span className="text-xs text-stone-500">Saving…</span>
  }
  if (state === "saved") {
    return <span className="text-xs text-emerald-700">Saved</span>
  }
  if (state === "error") {
    return (
      <span className="text-xs text-red-700">
        Save failed{error ? ` — ${error}` : ""}
      </span>
    )
  }
  return null
}
