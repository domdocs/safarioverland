"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Chapter, Lodge, RhythmItem } from "@/lib/itineraries/types"
import { toRoman } from "@/lib/itineraries/types"

import { ItineraryImageUpload } from "./itinerary-image-upload"
import { StringListEditor } from "./string-list-editor"

type Props = {
  itineraryId: string
  chapter: Chapter
  index: number
  total: number
  onChange: (patch: Partial<Chapter>) => void
  onDelete: () => void
  onMove: (direction: "up" | "down") => void
}

export function ChapterEditor({
  itineraryId,
  chapter,
  index,
  total,
  onChange,
  onDelete,
  onMove,
}: Props) {
  const [expanded, setExpanded] = useState(true)
  const numeral = toRoman(index)

  function updateLodge(patch: Partial<Lodge>) {
    onChange({ lodge: { ...chapter.lodge, ...patch } })
  }

  function updateRhythm(next: RhythmItem[]) {
    onChange({ rhythm: next })
  }

  return (
    <div className="border border-stone-200 rounded-md bg-white">
      {/* Header — always visible */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-200">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setExpanded((e) => !e)}
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        <span className="font-serif italic text-amber-700 text-lg w-8">
          {numeral}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">
            {chapter.place || "Untitled chapter"}
          </p>
          <p className="text-xs text-stone-500">
            {chapter.country || "—"} · {chapter.nights} night
            {chapter.nights === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onMove("up")}
            disabled={index === 0}
            aria-label="Move up"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onMove("down")}
            disabled={index === total - 1}
            aria-label="Move down"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onDelete}
            aria-label="Delete chapter"
            className="text-red-700 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="p-4 space-y-6">
          {/* Place + country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Place</Label>
              <Input
                value={chapter.place}
                onChange={(e) => onChange({ place: e.target.value })}
                maxLength={60}
              />
            </div>
            <div>
              <Label>Country</Label>
              <Input
                value={chapter.country}
                onChange={(e) => onChange({ country: e.target.value })}
                maxLength={60}
              />
            </div>
          </div>

          {/* Coords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Latitude</Label>
              <Input
                type="number"
                step="0.00001"
                min={-90}
                max={90}
                value={chapter.coords_lat ?? ""}
                onChange={(e) =>
                  onChange({
                    coords_lat:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>Longitude</Label>
              <Input
                type="number"
                step="0.00001"
                min={-180}
                max={180}
                value={chapter.coords_lon ?? ""}
                onChange={(e) =>
                  onChange({
                    coords_lon:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          {/* Nights + dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Nights</Label>
              <Input
                type="number"
                min={1}
                max={14}
                value={chapter.nights}
                onChange={(e) =>
                  onChange({ nights: Math.max(1, Math.min(14, Number(e.target.value) || 1)) })
                }
              />
            </div>
            <div>
              <Label>Dates</Label>
              <Input
                value={chapter.dates}
                onChange={(e) => onChange({ dates: e.target.value })}
                placeholder="14 — 16 September"
                maxLength={60}
              />
            </div>
          </div>

          {/* Palette + epigraph */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Palette (atmosphere)</Label>
              <Select
                value={chapter.palette ?? "none"}
                onValueChange={(v) => onChange({ palette: v === "none" ? null : v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">—</SelectItem>
                  <SelectItem value="spray">spray</SelectItem>
                  <SelectItem value="river">river</SelectItem>
                  <SelectItem value="delta">delta</SelectItem>
                  <SelectItem value="atlantic">atlantic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Epigraph</Label>
              <Input
                value={chapter.epigraph}
                onChange={(e) => onChange({ epigraph: e.target.value })}
                maxLength={120}
                placeholder="Mosi-oa-Tunya — the smoke that thunders."
              />
            </div>
          </div>

          {/* Intro paragraphs */}
          <StringListEditor
            label="Intro paragraphs"
            hint="Editorial narrative copy. First paragraph gets a drop-cap."
            value={chapter.intro}
            onChange={(intro) => onChange({ intro })}
            variant="textarea"
            maxItems={4}
            maxLength={1000}
            placeholder="You arrive on the Zimbabwean side…"
            addLabel="Add paragraph"
          />

          {/* Lodge */}
          <fieldset className="border border-stone-200 rounded-md p-4 space-y-4">
            <legend className="px-2 text-sm font-semibold text-stone-700">
              Lodge
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Name</Label>
                <Input
                  value={chapter.lodge?.name ?? ""}
                  onChange={(e) => updateLodge({ name: e.target.value })}
                  maxLength={80}
                />
              </div>
              <div>
                <Label>Kind</Label>
                <Input
                  value={chapter.lodge?.kind ?? ""}
                  onChange={(e) => updateLodge({ kind: e.target.value })}
                  maxLength={80}
                  placeholder="Grande dame, est. 1904"
                />
              </div>
            </div>
            <div>
              <Label>Room</Label>
              <Input
                value={chapter.lodge?.room ?? ""}
                onChange={(e) => updateLodge({ room: e.target.value })}
                maxLength={80}
                placeholder="Stables Garden Suite"
              />
            </div>
            <div>
              <Label>Blurb</Label>
              <Textarea
                value={chapter.lodge?.blurb ?? ""}
                onChange={(e) => updateLodge({ blurb: e.target.value })}
                maxLength={400}
                rows={3}
              />
            </div>
            <StringListEditor
              label="Amenities"
              value={chapter.lodge?.amenities ?? []}
              onChange={(amenities) => updateLodge({ amenities })}
              maxItems={8}
              maxLength={32}
              placeholder="Edwardian terrace"
              addLabel="Add amenity"
            />
          </fieldset>

          {/* Rhythm */}
          <fieldset className="border border-stone-200 rounded-md p-4 space-y-3">
            <legend className="px-2 text-sm font-semibold text-stone-700">
              Rhythm
            </legend>
            {(chapter.rhythm ?? []).map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-[8rem_1fr_auto] gap-2 items-start"
              >
                <Input
                  value={item.time}
                  onChange={(e) =>
                    updateRhythm(
                      chapter.rhythm.map((r, idx) =>
                        idx === i ? { ...r, time: e.target.value } : r,
                      ),
                    )
                  }
                  placeholder="Dawn"
                  maxLength={32}
                />
                <div className="space-y-2">
                  <Input
                    value={item.title}
                    onChange={(e) =>
                      updateRhythm(
                        chapter.rhythm.map((r, idx) =>
                          idx === i ? { ...r, title: e.target.value } : r,
                        ),
                      )
                    }
                    placeholder="Activity title"
                    maxLength={80}
                  />
                  <Textarea
                    value={item.body}
                    onChange={(e) =>
                      updateRhythm(
                        chapter.rhythm.map((r, idx) =>
                          idx === i ? { ...r, body: e.target.value } : r,
                        ),
                      )
                    }
                    placeholder="Short paragraph…"
                    maxLength={280}
                    rows={2}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    updateRhythm(chapter.rhythm.filter((_, idx) => idx !== i))
                  }
                  aria-label="Remove rhythm item"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {(chapter.rhythm ?? []).length < 6 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  updateRhythm([
                    ...(chapter.rhythm ?? []),
                    { time: "", title: "", body: "" },
                  ])
                }
              >
                Add rhythm item
              </Button>
            )}
          </fieldset>

          {/* Seeing */}
          <StringListEditor
            label="Seeing — what you'll see"
            value={chapter.seeing}
            onChange={(seeing) => onChange({ seeing })}
            maxItems={6}
            maxLength={120}
            placeholder="Verreaux's eagles nesting in the gorge"
            addLabel="Add item"
          />

          {/* Curator's note */}
          <div>
            <Label>Curator's note</Label>
            <Textarea
              value={chapter.note ?? ""}
              onChange={(e) => onChange({ note: e.target.value })}
              maxLength={400}
              rows={4}
              placeholder="Personal recommendation, in first person…"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Rendered in the handwritten Caveat font on the preview.
              Sign-off "— T." is added automatically; don't include it here.
            </p>
          </div>

          {/* Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Hero photo</Label>
              <ItineraryImageUpload
                itineraryId={itineraryId}
                chapterId={chapter.id}
                slot="chapter-hero"
                value={chapter.photo_hero_url}
                onChange={(url) => onChange({ photo_hero_url: url })}
                hint="Full-bleed background, 16:9 or 3:2, ≥1600px."
              />
            </div>
            <div>
              <Label>Lodge photo</Label>
              <ItineraryImageUpload
                itineraryId={itineraryId}
                chapterId={chapter.id}
                slot="chapter-lodge"
                value={chapter.photo_lodge_url}
                onChange={(url) => onChange({ photo_lodge_url: url })}
                hint="4:5 portrait, ≥1200px on the long edge."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
